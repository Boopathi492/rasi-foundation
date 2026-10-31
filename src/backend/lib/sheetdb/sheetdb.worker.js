/**
 * SheetDB Background Synchronization Worker
 *
 * Manages durable persistence of sync jobs in MongoDB, idempotent duplicate
 * prevention, exponential backoff retries, and atomic state updates.
 */

import SheetDBSyncJob from '../../models/SheetDBSyncJob.js';
import ScholarshipStudent from '../../models/ScholarshipStudent.js';
import TestSession from '../../models/TestSession.js';
import ScholarshipExamFeedback from '../../models/ScholarshipExamFeedback.js';
import { appendRow, searchRow, getSheetDBQuotaMetrics } from './sheetdb.service.js';
import { SHEETDB_CONFIG } from './sheetdb.config.js';

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
 * Enqueues a sync job in MongoDB and triggers immediate non-blocking processing
 */
export async function enqueueAndDispatchSync({
    destinationTab,
    recordReferenceId,
    payload,
    operationType = 'insert',
}) {
    const jobId = `sync_${destinationTab.toLowerCase()}_${recordReferenceId}_${Date.now()}`;

    // Create or update durable sync job
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
            },
        },
        { upsert: true, new: true }
    );

    // Trigger asynchronous background dispatch (non-blocking)
    if (typeof setImmediate !== 'undefined') {
        setImmediate(() => {
            processJob(job._id).catch(err => {
                console.error(`[SheetDB Worker] Uncaught dispatch error for job ${job._id}:`, err);
            });
        });
    } else {
        setTimeout(() => {
            processJob(job._id).catch(err => {
                console.error(`[SheetDB Worker] Uncaught dispatch error for job ${job._id}:`, err);
            });
        }, 10);
    }

    return job;
}

/**
 * Processes a single sync job atomically
 */
export async function processJob(jobId) {
    // Atomically claim the job
    const job = await SheetDBSyncJob.findOneAndUpdate(
        {
            _id: jobId,
            status: { $in: ['pending', 'failed'] },
        },
        {
            $set: { status: 'in_progress' },
            $inc: { attemptCount: 1 },
        },
        { new: true }
    );

    if (!job) {
        // Job already in progress or completed by another worker
        return null;
    }

    try {
        const { destinationTab, payload, recordReferenceId } = job;

        // Idempotency: Check if record already exists in SheetDB before writing
        let alreadyExists = false;
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

        let writeResult;
        if (alreadyExists) {
            // Already synced, no need to duplicate
            writeResult = { success: true, alreadyExisted: true };
        } else {
            writeResult = await appendRow(destinationTab, payload);
        }

        if (writeResult.success) {
            // Mark job completed
            job.status = 'completed';
            job.successfulSyncTimestamp = new Date();
            job.lastErrorMessage = null;
            await job.save();

            // Update underlying operational model with sync timestamp
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

            return { success: true, job };
        }

        // Job failed
        const isMaxReached = job.attemptCount >= job.maxAttempts;
        const newStatus = isMaxReached ? 'requires_review' : 'failed';
        const backoffMs = calculateBackoffMs(job.attemptCount);

        job.status = newStatus;
        job.lastErrorCode = String(writeResult.statusCode || 'ERR_SYNC');
        job.lastErrorMessage = String(writeResult.error || 'Unknown SheetDB error').slice(0, 500);
        job.nextRetryTime = new Date(Date.now() + backoffMs);
        await job.save();

        // Update model with error flag
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

        return { success: false, job, retryable: writeResult.retryable };

    } catch (error) {
        console.error(`[SheetDB Worker] Error processing job ${jobId}:`, error);
        job.status = job.attemptCount >= job.maxAttempts ? 'requires_review' : 'failed';
        job.lastErrorCode = 'EXCEPTION';
        job.lastErrorMessage = error.message.slice(0, 500);
        job.nextRetryTime = new Date(Date.now() + calculateBackoffMs(job.attemptCount));
        await job.save();
        return { success: false, error: error.message };
    }
}

/**
 * Reconciles and retries pending or failed jobs whose retry timer has arrived
 */
export async function reconcilePendingJobs(limit = 20) {
    const dueJobs = await SheetDBSyncJob.find({
        status: { $in: ['pending', 'failed'] },
        nextRetryTime: { $lte: new Date() },
    })
        .sort({ nextRetryTime: 1 })
        .limit(limit);

    const results = [];
    for (const job of dueJobs) {
        const res = await processJob(job._id);
        results.push(res);
    }
    return results;
}

/**
 * Returns overall synchronization metrics for admin dashboard
 */
export async function getSyncDashboardStats() {
    const [
        totalJobs,
        completedJobs,
        pendingJobs,
        failedJobs,
        reviewJobs,
        recentErrors,
    ] = await Promise.all([
        SheetDBSyncJob.countDocuments(),
        SheetDBSyncJob.countDocuments({ status: 'completed' }),
        SheetDBSyncJob.countDocuments({ status: 'pending' }),
        SheetDBSyncJob.countDocuments({ status: 'failed' }),
        SheetDBSyncJob.countDocuments({ status: 'requires_review' }),
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
            lastSuccessfulSync: lastCompleted?.successfulSyncTimestamp || null,
        },
        perTab: perTabStats,
        recentErrors,
        quotaMetrics: getSheetDBQuotaMetrics(),
    };
}
