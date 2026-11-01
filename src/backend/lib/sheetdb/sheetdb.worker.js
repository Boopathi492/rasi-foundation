/**
 * SheetDB Background Synchronization Worker
 *
 * Manages durable persistence of sync jobs in MongoDB, worker lease locking,
 * stale job recovery, quota optimization, exponential backoff retries,
 * and atomic state updates.
 */

import mongoose from 'mongoose';
import SheetDBSyncJob from '../../models/SheetDBSyncJob.js';
import ScholarshipStudent from '../../models/ScholarshipStudent.js';
import TestSession from '../../models/TestSession.js';
import ScholarshipExamFeedback from '../../models/ScholarshipExamFeedback.js';
import { appendRow, searchRow, getSheetDBQuotaMetrics } from './sheetdb.service.js';
import { SHEETDB_CONFIG } from './sheetdb.config.js';

/**
 * Generates a unique worker identifier for distributed lock ownership
 */
function generateWorkerId() {
    const pid = typeof process !== 'undefined' && process.pid ? process.pid : 'srv';
    const rand = Math.random().toString(36).substring(2, 8);
    return `worker_${pid}_${Date.now()}_${rand}`;
}

/**
 * Calculates exponential backoff with bounded jitter
 */
function calculateBackoffMs(attempt) {
    const base = SHEETDB_CONFIG.initialRetryDelayMs || 1000;
    const max = SHEETDB_CONFIG.maxRetryDelayMs || 10000;
    const exp = Math.min(max, base * Math.pow(2, attempt));
    const jitter = Math.floor(Math.random() * 500);
    return Math.min(max, exp + jitter);
}

/**
 * Enqueues a sync job durably in MongoDB.
 * In serverless environments, an optional bounded synchronous attempt (max 4s)
 * can be awaited. If it times out or fails, the job remains safely queued in MongoDB
 * for scheduled cron worker execution.
 */
export async function enqueueAndDispatchSync({
    destinationTab,
    recordReferenceId,
    payload,
    operationType = 'insert',
    syncImmediately = true,
}) {
    const jobId = `sync_${destinationTab.toLowerCase()}_${recordReferenceId}_${Date.now()}`;

    // Create or update durable sync job in MongoDB
    const job = await SheetDBSyncJob.findOneAndUpdate(
        {
            destinationTab,
            recordReferenceId,
            status: { $in: ['pending', 'in_progress', 'failed', 'requires_review'] },
        },
        {
            $setOnInsert: {
                jobId,
                recordReferenceId,
                destinationTab,
                operationType,
                payloadVersion: 1,
            },
            $set: {
                payload,
                status: 'pending',
                nextRetryTime: new Date(),
                leaseExpiresAt: null,
                lockedAt: null,
                lockedBy: null,
            },
        },
        { upsert: true, new: true }
    );

    // If syncImmediately requested, execute a bounded synchronous attempt
    // (Awaited to avoid Vercel frozen-promise hazards)
    if (syncImmediately && job?._id) {
        try {
            const timeoutPromise = new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 4000));
            await Promise.race([processJob(job._id), timeoutPromise]);
        } catch (err) {
            console.warn(`[SheetDB Worker] Immediate sync attempt warning for job ${job._id}:`, err.message);
        }
    }

    return job;
}

/**
 * Processes a single sync job atomically with worker lease locking and stale recovery
 */
export async function processJob(jobId, explicitWorkerId = null) {
    const workerId = explicitWorkerId || generateWorkerId();
    const now = new Date();
    const leaseDuration = SHEETDB_CONFIG.leaseDurationMs || (3 * 60 * 1000);
    const leaseExpiry = new Date(now.getTime() + leaseDuration);

    // Atomically claim the job if it is pending, ready for retry, OR stale lease
    const job = await SheetDBSyncJob.findOneAndUpdate(
        {
            _id: jobId,
            $or: [
                { status: 'pending' },
                { status: 'failed', nextRetryTime: { $lte: now } },
                // Stale lease recovery: In progress but lease has expired
                { status: 'in_progress', leaseExpiresAt: { $lte: now } },
            ],
        },
        {
            $set: {
                status: 'in_progress',
                lockedAt: now,
                lockedBy: workerId,
                leaseExpiresAt: leaseExpiry,
            },
            $inc: { attemptCount: 1 },
        },
        { new: true }
    );

    if (!job) {
        // Job already actively locked by another worker with valid lease, or already completed
        return null;
    }

    try {
        const { destinationTab, payload, recordReferenceId, attemptCount } = job;

        // Quota Optimization:
        // On first attempt (attemptCount <= 1), write directly with appendRow (POST).
        // Only run duplicate searchRow (GET) on retries (attemptCount > 1) to verify
        // if a previous attempt actually succeeded at the Google Sheet layer before network drop.
        let alreadyExists = false;
        if (attemptCount > 1) {
            if (destinationTab === 'Scholarship_Students' && payload.application_number) {
                const check = await searchRow(destinationTab, 'application_number', payload.application_number);
                alreadyExists = Boolean(check.success && check.found);
            } else if (destinationTab === 'Scholarship_Results' && payload.result_reference_id) {
                const check = await searchRow(destinationTab, 'result_reference_id', payload.result_reference_id);
                alreadyExists = Boolean(check.success && check.found);
            } else if (destinationTab === 'Scholarship_Feedback' && payload.feedback_reference_id) {
                const check = await searchRow(destinationTab, 'feedback_reference_id', payload.feedback_reference_id);
                alreadyExists = Boolean(check.success && check.found);
            }
        }

        let writeResult;
        if (alreadyExists) {
            // Already synced on a prior attempt, no need to duplicate
            writeResult = { success: true, alreadyExisted: true };
        } else {
            writeResult = await appendRow(destinationTab, payload);
        }

        if (writeResult.success) {
            // Mark job completed and release lock
            job.status = 'completed';
            job.successfulSyncTimestamp = new Date();
            job.lastErrorMessage = null;
            job.leaseExpiresAt = null;
            job.lockedBy = null;
            await job.save();

            // Update underlying operational model with sync timestamp
            if (mongoose.Types.ObjectId.isValid(recordReferenceId)) {
                if (destinationTab === 'Scholarship_Students') {
                    await ScholarshipStudent.findByIdAndUpdate(recordReferenceId, {
                        sheetdbSynced: true,
                        sheetdbSyncedAt: new Date(),
                        sheetdbError: null,
                    });
                } else if (destinationTab === 'Scholarship_Results') {
                    await TestSession.findByIdAndUpdate(recordReferenceId, {
                        sheetdbSynced: true,
                        sheetdbSyncedAt: new Date(),
                        sheetdbError: null,
                    });
                } else if (destinationTab === 'Scholarship_Feedback') {
                    await ScholarshipExamFeedback.findByIdAndUpdate(recordReferenceId, {
                        sheetdbSynced: true,
                        sheetdbSyncedAt: new Date(),
                        sheetdbError: null,
                    });
                }
            }

            return { success: true, job };
        }

        // Job failed: inspect status code
        const isQuotaExhausted = writeResult.statusCode === 402;
        const isAuthError = writeResult.statusCode === 401 || writeResult.statusCode === 403;
        const isMaxReached = job.attemptCount >= job.maxAttempts;

        let newStatus = 'failed';
        if (isQuotaExhausted || isAuthError || isMaxReached) {
            newStatus = 'requires_review';
        }

        const backoffMs = calculateBackoffMs(job.attemptCount);

        job.status = newStatus;
        job.lastErrorCode = isQuotaExhausted ? 'QUOTA_EXCEEDED' : (isAuthError ? 'AUTH_FAILED' : String(writeResult.statusCode || 'ERR_SYNC'));
        job.lastErrorMessage = String(writeResult.error || 'Unknown SheetDB error').slice(0, 500);
        job.nextRetryTime = (isQuotaExhausted || isAuthError) ? null : new Date(Date.now() + backoffMs);
        job.leaseExpiresAt = null;
        job.lockedBy = null;
        await job.save();

        // Update model with error flag
        if (mongoose.Types.ObjectId.isValid(recordReferenceId)) {
            const errNotice = `[${job.lastErrorCode}] ${job.lastErrorMessage}`;
            if (destinationTab === 'Scholarship_Students') {
                await ScholarshipStudent.findByIdAndUpdate(recordReferenceId, {
                    sheetdbSynced: false,
                    sheetdbError: errNotice,
                });
            } else if (destinationTab === 'Scholarship_Results') {
                await TestSession.findByIdAndUpdate(recordReferenceId, {
                    sheetdbSynced: false,
                    sheetdbError: errNotice,
                });
            } else if (destinationTab === 'Scholarship_Feedback') {
                await ScholarshipExamFeedback.findByIdAndUpdate(recordReferenceId, {
                    sheetdbSynced: false,
                    sheetdbError: errNotice,
                });
            }
        }

        return { success: false, job, retryable: writeResult.retryable && !isQuotaExhausted && !isAuthError };

    } catch (error) {
        console.error(`[SheetDB Worker] Error processing job ${jobId}:`, error);
        job.status = job.attemptCount >= job.maxAttempts ? 'requires_review' : 'failed';
        job.lastErrorCode = 'EXCEPTION';
        job.lastErrorMessage = error.message.slice(0, 500);
        job.nextRetryTime = new Date(Date.now() + calculateBackoffMs(job.attemptCount));
        job.leaseExpiresAt = null;
        job.lockedBy = null;
        await job.save();
        return { success: false, error: error.message };
    }
}

/**
 * Reconciles pending, failed, and stale-leased jobs whose retry timer has arrived
 */
export async function reconcilePendingJobs(limit = 20) {
    const now = new Date();
    const workerId = generateWorkerId();

    const dueJobs = await SheetDBSyncJob.find({
        $or: [
            { status: 'pending', nextRetryTime: { $lte: now } },
            { status: 'failed', nextRetryTime: { $lte: now } },
            // Stale lease recovery
            { status: 'in_progress', leaseExpiresAt: { $lte: now } },
        ],
    })
        .sort({ nextRetryTime: 1 })
        .limit(limit);

    const results = [];
    let completedCount = 0;
    let failedCount = 0;
    let reclaimedStaleCount = 0;

    for (const job of dueJobs) {
        if (job.status === 'in_progress') {
            reclaimedStaleCount++;
        }
        const res = await processJob(job._id, workerId);
        if (res?.success) {
            completedCount++;
        } else if (res) {
            failedCount++;
        }
        results.push(res);
    }

    return {
        processedCount: results.length,
        completedCount,
        failedCount,
        reclaimedStaleCount,
        results,
    };
}

/**
 * Returns overall synchronization metrics for admin dashboard
 */
export async function getSyncDashboardStats() {
    const now = new Date();
    const [
        totalJobs,
        completedJobs,
        pendingJobs,
        failedJobs,
        reviewJobs,
        inProgressJobs,
        staleLeaseJobs,
        recentErrors,
    ] = await Promise.all([
        SheetDBSyncJob.countDocuments(),
        SheetDBSyncJob.countDocuments({ status: 'completed' }),
        SheetDBSyncJob.countDocuments({ status: 'pending' }),
        SheetDBSyncJob.countDocuments({ status: 'failed' }),
        SheetDBSyncJob.countDocuments({ status: 'requires_review' }),
        SheetDBSyncJob.countDocuments({ status: 'in_progress' }),
        SheetDBSyncJob.countDocuments({ status: 'in_progress', leaseExpiresAt: { $lte: now } }),
        SheetDBSyncJob.find({ status: { $in: ['failed', 'requires_review'] } })
            .sort({ updatedAt: -1 })
            .limit(10)
            .select('jobId recordReferenceId destinationTab attemptCount lastErrorCode lastErrorMessage updatedAt')
            .lean(),
    ]);

    // Per tab counts
    const perTabStats = {};
    for (const tab of ['Scholarship_Students', 'Scholarship_Results', 'Scholarship_Feedback']) {
        const [total, completed, pending, failed] = await Promise.all([
            SheetDBSyncJob.countDocuments({ destinationTab: tab }),
            SheetDBSyncJob.countDocuments({ destinationTab: tab, status: 'completed' }),
            SheetDBSyncJob.countDocuments({ destinationTab: tab, status: 'pending' }),
            SheetDBSyncJob.countDocuments({ destinationTab: tab, status: { $in: ['failed', 'requires_review'] } }),
        ]);
        perTabStats[tab] = { total, completed, pending, failed };
    }

    const lastCompleted = await SheetDBSyncJob.findOne({ status: 'completed' })
        .sort({ successfulSyncTimestamp: -1 })
        .select('successfulSyncTimestamp destinationTab')
        .lean();

    return {
        overall: {
            total: totalJobs,
            completed: completedJobs,
            pending: pendingJobs,
            failed: failedJobs,
            requiresReview: reviewJobs,
            inProgress: inProgressJobs,
            staleLeaseCount: staleLeaseJobs,
            lastSuccessfulSync: lastCompleted?.successfulSyncTimestamp || null,
        },
        perTab: perTabStats,
        recentErrors,
        quotaMetrics: getSheetDBQuotaMetrics(),
    };
}
