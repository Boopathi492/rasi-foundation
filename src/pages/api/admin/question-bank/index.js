import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { withAuth } from '@/backend/lib/auth';

async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const {
                page = 1,
                limit = 20,
                subject = '',
                topic = '',
                difficulty = '',
                search = '',
                status = 'all',
                approvalStatus = 'all',
                sortBy = 'code',
                sortOrder = 'asc',
            } = req.query;

            const query = {};

            if (subject && subject !== 'all') {
                query.subject = subject;
            }

            if (topic && topic !== 'all') {
                query.topic = topic;
            }

            if (difficulty && difficulty !== 'all') {
                query.difficulty = difficulty;
            }

            if (status === 'active') {
                query.isActive = true;
            } else if (status === 'inactive') {
                query.isActive = false;
            }

            if (approvalStatus && approvalStatus !== 'all') {
                query.approvalStatus = approvalStatus;
            }

            if (search) {
                const s = String(search).trim();
                query.$or = [
                    { code: { $regex: s, $options: 'i' } },
                    { questionText: { $regex: s, $options: 'i' } },
                    { questionTextTamil: { $regex: s, $options: 'i' } },
                    { topic: { $regex: s, $options: 'i' } },
                ];
            }

            const pageNum = Math.max(1, parseInt(page) || 1);
            const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));
            const skip = (pageNum - 1) * limitNum;

            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

            const [questions, totalQuestions] = await Promise.all([
                ScholarshipQuestion.find(query)
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limitNum)
                    .lean(),
                ScholarshipQuestion.countDocuments(query),
            ]);

            // Aggregate subject, difficulty, and approval stats
            const [subjectStats, difficultyStats, totalAll, activeCount, approvedCount, pendingCount, rejectedCount] = await Promise.all([
                ScholarshipQuestion.aggregate([
                    { $group: { _id: '$subject', count: { $sum: 1 } } },
                ]),
                ScholarshipQuestion.aggregate([
                    { $group: { _id: '$difficulty', count: { $sum: 1 } } },
                ]),
                ScholarshipQuestion.countDocuments(),
                ScholarshipQuestion.countDocuments({ isActive: true }),
                ScholarshipQuestion.countDocuments({ approvalStatus: 'approved' }),
                ScholarshipQuestion.countDocuments({ approvalStatus: 'pending' }),
                ScholarshipQuestion.countDocuments({ approvalStatus: 'rejected' }),
            ]);

            // Distinct topics for dropdowns
            const topics = await ScholarshipQuestion.distinct('topic', subject && subject !== 'all' ? { subject } : {});

            const subjectCounts = {};
            subjectStats.forEach(s => { subjectCounts[s._id] = s.count; });

            const difficultyCounts = {};
            difficultyStats.forEach(d => { difficultyCounts[d._id] = d.count; });

            return res.status(200).json({
                success: true,
                questions,
                pagination: {
                    total: totalQuestions,
                    page: pageNum,
                    pages: Math.ceil(totalQuestions / limitNum) || 1,
                    limit: limitNum,
                },
                stats: {
                    total: totalAll,
                    active: activeCount,
                    inactive: totalAll - activeCount,
                    approved: approvedCount,
                    pending: pendingCount,
                    rejected: rejectedCount,
                    subjects: subjectCounts,
                    difficulties: difficultyCounts,
                },
                topics: topics.filter(Boolean).sort(),
            });

        } catch (error) {
            console.error('Admin questions list error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch questions',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    } else if (req.method === 'POST') {
        try {
            const {
                code,
                subject,
                topic,
                difficulty = 'medium',
                questionText,
                questionTextTamil,
                options,
                optionsTamil,
                correctAnswer,
                explanation,
                explanationTamil,
                marks = 1,
                negativeMarks = 0,
                isActive = true,
                approvalStatus = 'approved',
            } = req.body;

            // Basic validation
            if (!code || !subject || !topic || !questionText || !questionTextTamil || !correctAnswer) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required question fields (code, subject, topic, question text in EN/TA, correctAnswer)',
                });
            }

            if (!['Physics', 'Chemistry', 'Mathematics', 'Biology'].includes(subject)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid subject. Allowed: Physics, Chemistry, Mathematics, Biology',
                });
            }

            if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid correctAnswer. Must be A, B, C, or D',
                });
            }

            if (!Array.isArray(options) || options.length !== 4) {
                return res.status(400).json({
                    success: false,
                    message: 'English options must contain exactly 4 items (A, B, C, D)',
                });
            }

            if (!Array.isArray(optionsTamil) || optionsTamil.length !== 4) {
                return res.status(400).json({
                    success: false,
                    message: 'Tamil options must contain exactly 4 items (A, B, C, D)',
                });
            }

            // Check duplicate code
            const existingCode = await ScholarshipQuestion.findOne({ code: String(code).trim().toUpperCase() });
            if (existingCode) {
                return res.status(400).json({
                    success: false,
                    message: `Question code '${code}' already exists. Please choose a unique code.`,
                });
            }

            const newQuestion = await ScholarshipQuestion.create({
                code: String(code).trim().toUpperCase(),
                subject,
                topic: String(topic).trim(),
                difficulty,
                questionText: String(questionText).trim(),
                questionTextTamil: String(questionTextTamil).trim(),
                options,
                optionsTamil,
                correctAnswer,
                explanation: String(explanation || '').trim(),
                explanationTamil: String(explanationTamil || '').trim(),
                marks: Number(marks) || 1,
                negativeMarks: Number(negativeMarks) || 0,
                language: 'Bilingual',
                isActive: Boolean(isActive),
                approvalStatus: ['pending', 'approved', 'rejected'].includes(approvalStatus) ? approvalStatus : 'approved',
                usageCount: 0,
            });

            return res.status(201).json({
                success: true,
                message: 'Question added to question bank successfully',
                data: newQuestion,
            });

        } catch (error) {
            console.error('Admin create question error:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create question',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
