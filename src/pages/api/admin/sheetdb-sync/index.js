import mongoose from 'mongoose';
import dbConnect from '../../../../backend/lib/mongodb.js';
import { withPermission } from '../../../../backend/lib/auth.js';
import { can } from '../../../../backend/lib/rbac.js';
import SheetDBSyncJob from '../../../../backend/models/SheetDBSyncJob.js';
import ScholarshipStudent from '../../../../backend/models/ScholarshipStudent.js';
import TestSession from '../../../../backend/models/TestSession.js';
import ScholarshipExamFeedback from '../../../../backend/models/ScholarshipExamFeedback.js';
import {
    getSyncDashboardStats,
    processJob,
    reconcilePendingJobs,
    enqueueAndDispatchSync,
    searchRow,
    mapStudentToSheetRow,
    mapResultToSheetRow,
    mapFeedbackToSheetRow,
} from '../../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../../backend/lib/apiSecurity.js';

async function handler(req, res) {
    setNoCacheHeaders(res);
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { page = 1, limit = 20, tab = 'all', status = 'all' } = req.query;

            const query = {};
            if (tab && tab !== 'all') {
                query.destinationTab = tab;
            }
            if (status && status !== 'all') {
                query.status = status;
            }

            const pageNum = Math.max(1, parseInt(page, 10) || 1);
            const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
            const skip = (pageNum - 1) * limitNum;

            const [jobs, totalJobs, stats] = await Promise.all([
                SheetDBSyncJob.find(query)
                    .sort({ updatedAt: -1 })
                    .skip(skip)
                    .limit(limitNum)
                    .lean(),
                SheetDBSyncJob.countDocuments(query),
                getSyncDashboardStats(),
            ]);

            return res.status(200).json({
                success: true,
                stats,
                jobs,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total: totalJobs,
                    pages: Math.ceil(totalJobs / limitNum) || 1,
                },
            });
        } catch (error) {
            console.error('[Admin SheetDB Sync GET error]:', error?.name || 'Error');
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch SheetDB sync data',
            });
        }
    }

    if (req.method === 'POST') {
        const hasWritePermission =
            can(req.user?.role, 'scholarship_exam:edit') ||
            can(req.user?.role, 'scholarship_exam:manage') ||
            can(req.user?.role, 'settings:manage');

        if (!hasWritePermission) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Insufficient privileges to run synchronization actions',
            });
        }

        try {
            const { action, jobId } = req.body || {};

            if (action === 'retry_job') {
                if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
                    return res.status(400).json({ success: false, message: 'Valid jobId is required' });
                }

                const job = await SheetDBSyncJob.findByIdAndUpdate(
                    jobId,
                    { $set: { status: 'pending', nextRetryTime: new Date(), leaseExpiresAt: null } },
                    { new: true }
                );

                if (!job) {
                    return res.status(404).json({ success: false, message: 'Sync job not found' });
                }

                const processRes = await processJob(job._id);
                return res.status(200).json({
                    success: true,
                    message: processRes?.success ? 'Job retried and synced successfully' : 'Retry completed with warning',
                    result: processRes,
                });
            }

            if (action === 'retry_all') {
                await SheetDBSyncJob.updateMany(
                    { status: { $in: ['failed', 'requires_review'] } },
                    { $set: { status: 'pending', nextRetryTime: new Date(), leaseExpiresAt: null } }
                );

                const results = await reconcilePendingJobs(25);
                return res.status(200).json({
                    success: true,
                    message: `Retried jobs: ${results.completedCount} succeeded, ${results.failedCount} failed, ${results.reclaimedStaleCount} stale reclaimed.`,
                    data: results,
                });
            }

            if (action === 'reconcile_missing') {
                let enqueuedStudents = 0;
                let alreadyPresentStudents = 0;
                const unsyncedStudents = await ScholarshipStudent.find({
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(25);

                for (const student of unsyncedStudents) {
                    const existing = await searchRow(
                        'Scholarship_Students',
                        'application_number',
                        student.registrationToken
                    );
                    if (existing.success && existing.found) {
                        await ScholarshipStudent.updateOne(
                            { _id: student._id },
                            { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
                        );
                        alreadyPresentStudents++;
                        continue;
                    }
                    const payload = mapStudentToSheetRow(student);
                    const job = await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Students',
                        recordReferenceId: student._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    await processJob(job._id);
                    enqueuedStudents++;
                }

                let enqueuedSessions = 0;
                let alreadyPresentSessions = 0;
                const unsyncedSessions = await TestSession.find({
                    status: 'completed',
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(25);

                for (const session of unsyncedSessions) {
                    const existing = await searchRow(
                        'Scholarship_Results',
                        'result_reference_id',
                        session._id.toString()
                    );
                    if (existing.success && existing.found) {
                        await TestSession.updateOne(
                            { _id: session._id },
                            { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
                        );
                        alreadyPresentSessions++;
                        continue;
                    }
                    const student = session.studentId
                        ? await ScholarshipStudent.findById(session.studentId).lean()
                        : null;
                    const payload = mapResultToSheetRow(session, student || {});
                    const job = await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Results',
                        recordReferenceId: session._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    await processJob(job._id);
                    enqueuedSessions++;
                }

                let enqueuedFeedback = 0;
                let alreadyPresentFeedback = 0;
                const unsyncedFeedback = await ScholarshipExamFeedback.find({
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(25);

                for (const fb of unsyncedFeedback) {
                    const existing = await searchRow(
                        'Scholarship_Feedback',
                        'feedback_reference_id',
                        fb._id.toString()
                    );
                    if (existing.success && existing.found) {
                        await ScholarshipExamFeedback.updateOne(
                            { _id: fb._id },
                            { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
                        );
                        alreadyPresentFeedback++;
                        continue;
                    }
                    const session = fb.testSessionId ? await TestSession.findById(fb.testSessionId).lean() : null;
                    const student = fb.studentId ? await ScholarshipStudent.findById(fb.studentId).lean() : null;
                    const payload = mapFeedbackToSheetRow(fb, student || {}, session || {});
                    const job = await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Feedback',
                        recordReferenceId: fb._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    await processJob(job._id);
                    enqueuedFeedback++;
                }

                return res.status(200).json({
                    success: true,
                    message: `Reconciliation complete: ${enqueuedStudents} students, ${enqueuedSessions} results, ${enqueuedFeedback} feedback processed (${alreadyPresentStudents + alreadyPresentSessions + alreadyPresentFeedback} already present in SheetDB).`,
                    enqueued: {
                        students: enqueuedStudents,
                        results: enqueuedSessions,
                        feedback: enqueuedFeedback,
                    },
                    alreadyPresent: {
                        students: alreadyPresentStudents,
                        results: alreadyPresentSessions,
                        feedback: alreadyPresentFeedback,
                    },
                });
            }

            return res.status(400).json({ success: false, message: `Unsupported action: '${action}'` });
        } catch (error) {
            console.error('[Admin SheetDB Sync POST error]:', error?.name || 'Error');
            return res.status(500).json({
                success: false,
                message: 'Failed to execute sync action',
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withPermission('scholarship_exam:view', handler);
