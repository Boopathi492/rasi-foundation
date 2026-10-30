import dbConnect from '@/lib/mongodb';
import ScholarshipExamConfig from '@/backend/models/ScholarshipExamConfig';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const config = await ScholarshipExamConfig.getActiveConfig();

            // Calculate live health and availability stats dynamically from config
            const subjectMap = new Map();
            (config.compulsorySubjects || []).forEach(s => subjectMap.set(s.name, s.questionCount));
            (config.optionalSubjects || []).forEach(s => {
                if (!subjectMap.has(s.name)) subjectMap.set(s.name, s.questionCount);
            });

            const healthReport = {};

            for (const [subjName, required] of subjectMap.entries()) {
                const matchBase = {
                    subject: subjName === 'Biology' ? { $in: ['Biology', 'Botany', 'Zoology'] } : subjName,
                };

                const [approvedCount, pendingCount, inactiveCount] = await Promise.all([
                    ScholarshipQuestion.countDocuments({ ...matchBase, isActive: true, approvalStatus: 'approved' }),
                    ScholarshipQuestion.countDocuments({ ...matchBase, approvalStatus: 'pending' }),
                    ScholarshipQuestion.countDocuments({ ...matchBase, isActive: false }),
                ]);

                healthReport[subjName] = {
                    approved: approvedCount,
                    pending: pendingCount,
                    inactive: inactiveCount,
                    total: approvedCount + pendingCount + inactiveCount,
                    requiredPerExam: required,
                    isHealthy: approvedCount >= required,
                    status: approvedCount >= required ? 'Healthy' : 'Insufficient Questions',
                };
            }

            return res.status(200).json({
                success: true,
                config,
                healthReport,
            });

        } catch (error) {
            console.error('Get admin exam config error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve examination settings',
            });
        }
    } else if (req.method === 'PUT' || req.method === 'PATCH') {
        try {
            const {
                examTitle,
                examDurationMinutes,
                totalQuestions,
                marksPerQuestion,
                negativeMarking,
                compulsorySubjects,
                optionalSubjects,
                languages,
                practiceTestConfig,
            } = req.body;

            const config = await ScholarshipExamConfig.getActiveConfig();

            if (examTitle !== undefined) config.examTitle = String(examTitle).trim();
            if (examDurationMinutes !== undefined) config.examDurationMinutes = Math.max(10, Number(examDurationMinutes));
            if (marksPerQuestion !== undefined) config.marksPerQuestion = Math.max(1, Number(marksPerQuestion));
            if (negativeMarking !== undefined) config.negativeMarking = Math.max(0, Number(negativeMarking));

            if (Array.isArray(compulsorySubjects) && compulsorySubjects.length > 0) {
                config.compulsorySubjects = compulsorySubjects;
            }

            if (Array.isArray(optionalSubjects) && optionalSubjects.length > 0) {
                config.optionalSubjects = optionalSubjects;
            }

            // Recalculate total questions dynamically: sum of compulsory + first optional quota
            const compulsoryTotal = config.compulsorySubjects.reduce((acc, s) => acc + (Number(s.questionCount) || 0), 0);
            const optionalQuota = config.optionalSubjects[0]?.questionCount || 0;
            config.totalQuestions = compulsoryTotal + optionalQuota;

            if (Array.isArray(languages)) {
                config.languages = languages;
            }

            if (practiceTestConfig) {
                config.practiceTestConfig = {
                    ...config.practiceTestConfig,
                    ...practiceTestConfig,
                };
            }

            config.updatedBy = req.user?.username || req.user?.email || 'admin';
            await config.save();

            return res.status(200).json({
                success: true,
                message: 'Examination configuration updated dynamically',
                config,
            });

        } catch (error) {
            console.error('Update admin exam config error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update examination settings',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
