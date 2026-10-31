import dbConnect from '@/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import SheetDBSyncJob from '@/backend/models/SheetDBSyncJob';
import ScholarshipStudent from '@/backend/models/ScholarshipStudent';
import TestSession from '@/backend/models/TestSession';
import ScholarshipExamFeedback from '@/backend/models/ScholarshipExamFeedback';
import {
    getSyncDashboardStats,
    processJob,
    reconcilePendingJobs,
    enqueueAndDispatchSync,
    mapStudentToSheetRow,
    mapResultToSheetRow,
    mapFeedbackToSheetRow,
} from '@/backend/lib/sheetdb';

async function handler(req, res) {
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
            console.error('[Admin SheetDB Sync GET error]:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch SheetDB sync data',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    } else if (req.method === 'POST') {
        try {
            const { action, jobId } = req.body;

            if (action === 'retry_job') {
                if (!jobId) {
                    return res.status(400).json({ success: false, message: 'jobId is required' });
                }

                // Reset job status to pending so worker can claim it
                const job = await SheetDBSyncJob.findByIdAndUpdate(
                    jobId,
                    { $set: { status: 'pending', nextRetryTime: new Date() } },
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

            } else if (action === 'retry_all') {
                // Reset failed jobs to pending
                await SheetDBSyncJob.updateMany(
                    { status: { $in: ['failed', 'requires_review'] } },
                    { $set: { status: 'pending', nextRetryTime: new Date() } }
                );

                const results = await reconcilePendingJobs(50);
                return res.status(200).json({
                    success: true,
                    message: `Retried ${results.length} pending/failed jobs`,
                    count: results.length,
                });

            } else if (action === 'reconcile_missing') {
                // Find any unsynced student records and enqueue them
                const unsyncedStudents = await ScholarshipStudent.find({
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(50);

                let enqueuedStudents = 0;
                for (const student of unsyncedStudents) {
                    const payload = mapStudentToSheetRow(student);
                    await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Students',
                        recordReferenceId: student._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    enqueuedStudents++;
                }

                // Find any unsynced completed test sessions and enqueue them
                const unsyncedSessions = await TestSession.find({
                    status: 'completed',
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(50);

                let enqueuedSessions = 0;
                for (const session of unsyncedSessions) {
                    const student = await ScholarshipStudent.findById(session.studentId);
                    const payload = mapResultToSheetRow(session, student || {});
                    await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Results',
                        recordReferenceId: session._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    enqueuedSessions++;
                }

                // Find any unsynced feedback
                const unsyncedFeedback = await ScholarshipExamFeedback.find({
                    $or: [{ sheetdbSynced: false }, { sheetdbSynced: { $exists: false } }],
                }).limit(50);

                let enqueuedFeedback = 0;
                for (const fb of unsyncedFeedback) {
                    const session = await TestSession.findById(fb.testSessionId);
                    const student = await ScholarshipStudent.findById(fb.studentId);
                    const payload = mapFeedbackToSheetRow(fb, student || {}, session || {});
                    await enqueueAndDispatchSync({
                        destinationTab: 'Scholarship_Feedback',
                        recordReferenceId: fb._id.toString(),
                        payload,
                        operationType: 'insert',
                    });
                    enqueuedFeedback++;
                }

                return res.status(200).json({
                    success: true,
                    message: `Reconciliation dispatched: ${enqueuedStudents} students, ${enqueuedSessions} exam results, ${enqueuedFeedback} feedback records.`,
                    enqueued: {
                        students: enqueuedStudents,
                        results: enqueuedSessions,
                        feedback: enqueuedFeedback,
                    },
                });

            } else {
                return res.status(400).json({ success: false, message: `Unsupported action: '${action}'` });
            }

        } catch (error) {
            console.error('[Admin SheetDB Sync POST error]:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to execute sync action',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
