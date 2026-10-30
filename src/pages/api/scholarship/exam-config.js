import dbConnect from '@/lib/mongodb';
import ScholarshipExamConfig from '@/backend/models/ScholarshipExamConfig';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const config = await ScholarshipExamConfig.getActiveConfig();

        // Perform live database availability check for all subjects in config
        const allSubjectsToCheck = [
            ...config.compulsorySubjects.map(s => ({ name: s.name, required: s.questionCount, isCompulsory: true })),
            ...config.optionalSubjects.map(s => ({ name: s.name, required: s.questionCount, isCompulsory: false })),
        ];

        const availability = {};
        let isExamReady = true;
        const missingSubjects = [];

        for (const subj of allSubjectsToCheck) {
            const matchQuery = {
                isActive: true,
                approvalStatus: 'approved',
                subject: subj.name === 'Biology' ? { $in: ['Biology', 'Botany', 'Zoology'] } : subj.name,
            };

            const count = await ScholarshipQuestion.countDocuments(matchQuery);
            const isSufficient = count >= subj.required;

            availability[subj.name] = {
                availableApproved: count,
                required: subj.required,
                isSufficient,
                isCompulsory: subj.isCompulsory,
            };

            if (!isSufficient) {
                isExamReady = false;
                missingSubjects.push({ subject: subj.name, available: count, required: subj.required });
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                examTitle: config.examTitle,
                examDurationMinutes: config.examDurationMinutes,
                totalQuestions: config.totalQuestions,
                marksPerQuestion: config.marksPerQuestion,
                negativeMarking: config.negativeMarking,
                compulsorySubjects: config.compulsorySubjects.map(s => ({
                    name: s.name,
                    questionCount: s.questionCount,
                })),
                optionalSubjects: config.optionalSubjects.map(s => ({
                    name: s.name,
                    questionCount: s.questionCount,
                })),
                languages: config.languages,
                practiceTestConfig: config.practiceTestConfig,
                availability,
                isExamReady,
                missingSubjects,
            },
        });

    } catch (error) {
        console.error('Fetch public exam config error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to load examination configuration',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
