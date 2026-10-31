import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import ScholarshipExamConfig from '@/backend/models/ScholarshipExamConfig';
import { withAuth } from '@/backend/lib/auth';

const TARGET_PER_SUBJECT = 400;
const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const config = await ScholarshipExamConfig.getActiveConfig();

        // 1. KPI per subject
        const kpis = {};
        for (const subj of SUBJECTS) {
            const matchSubject = subj === 'Biology'
                ? { subject: { $in: ['Biology', 'Botany', 'Zoology'] } }
                : { subject: subj };

            const [actualCount, approvedCount, activeCount, pendingCount] = await Promise.all([
                ScholarshipQuestion.countDocuments(matchSubject),
                ScholarshipQuestion.countDocuments({ ...matchSubject, approvalStatus: 'approved' }),
                ScholarshipQuestion.countDocuments({ ...matchSubject, isActive: true }),
                ScholarshipQuestion.countDocuments({ ...matchSubject, approvalStatus: 'pending' }),
            ]);

            const requiredForOfficial = 20; // 20 per subject
            const requiredForPractice = config.practiceTestConfig?.defaultQuestionCount || 20;

            kpis[subj] = {
                subject: subj,
                targetCount: TARGET_PER_SUBJECT,
                actualCount,
                approvedCount,
                activeCount,
                pendingCount,
                isTargetMet: actualCount >= TARGET_PER_SUBJECT,
                progressPercent: Math.min(100, Math.round((actualCount / TARGET_PER_SUBJECT) * 100)),
                examAvailability: {
                    officialExamReady: approvedCount >= requiredForOfficial && activeCount >= requiredForOfficial,
                    practiceTestReady: approvedCount >= requiredForPractice && activeCount >= requiredForPractice,
                    requiredOfficial: requiredForOfficial,
                    requiredPractice: requiredForPractice,
                },
            };
        }

        // 2. Chapter-wise breakdown
        const chapterBreakdown = await ScholarshipQuestion.aggregate([
            {
                $group: {
                    _id: {
                        subject: "$subject",
                        chapter: { $ifNull: ["$chapter", "$topic"] }
                    },
                    total: { $sum: 1 },
                    approved: { $sum: { $cond: [{ $eq: ["$approvalStatus", "approved"] }, 1, 0] } },
                    active: { $sum: { $cond: ["$isActive", 1, 0] } },
                    easy: { $sum: { $cond: [{ $eq: ["$difficulty", "easy"] }, 1, 0] } },
                    medium: { $sum: { $cond: [{ $eq: ["$difficulty", "medium"] }, 1, 0] } },
                    hard: { $sum: { $cond: [{ $eq: ["$difficulty", "hard"] }, 1, 0] } },
                }
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id.subject",
                    chapter: "$_id.chapter",
                    total: 1,
                    approved: 1,
                    active: 1,
                    easy: 1,
                    medium: 1,
                    hard: 1,
                }
            },
            { $sort: { subject: 1, chapter: 1 } }
        ]);

        // 3. Difficulty-wise breakdown
        const difficultyBreakdown = await ScholarshipQuestion.aggregate([
            {
                $group: {
                    _id: { subject: "$subject", difficulty: "$difficulty" },
                    count: { $sum: 1 },
                    approved: { $sum: { $cond: [{ $eq: ["$approvalStatus", "approved"] }, 1, 0] } },
                    active: { $sum: { $cond: ["$isActive", 1, 0] } },
                }
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id.subject",
                    difficulty: "$_id.difficulty",
                    count: 1,
                    approved: 1,
                    active: 1,
                }
            },
            { $sort: { subject: 1, difficulty: 1 } }
        ]);

        // 4. Grand Totals
        const grandTotalActual = Object.values(kpis).reduce((acc, k) => acc + k.actualCount, 0);
        const grandTotalApproved = Object.values(kpis).reduce((acc, k) => acc + k.approvedCount, 0);
        const grandTotalActive = Object.values(kpis).reduce((acc, k) => acc + k.activeCount, 0);
        const grandTotalPending = Object.values(kpis).reduce((acc, k) => acc + k.pendingCount, 0);

        return res.status(200).json({
            success: true,
            summary: {
                targetTotal: TARGET_PER_SUBJECT * SUBJECTS.length, // 1600
                actualTotal: grandTotalActual,
                approvedTotal: grandTotalApproved,
                activeTotal: grandTotalActive,
                pendingTotal: grandTotalPending,
                isTargetMet: grandTotalActual >= (TARGET_PER_SUBJECT * SUBJECTS.length),
            },
            kpis,
            chapterBreakdown,
            difficultyBreakdown,
        });

    } catch (error) {
        console.error('Question bank reports error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate question bank reports',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}

export default withAuth(handler);
