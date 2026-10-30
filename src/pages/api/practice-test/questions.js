import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { getBalancedQuestions } from '@/data/practiceQuestions';
import { chemistryQuestions } from '@/data/chemistryQuestions';
import { mathematicsQuestions } from '@/data/mathematicsQuestions';
import { botanyQuestions, zoologyQuestions } from '@/data/biologyQuestions';

// Helper to get balanced questions from static pool as fallback
function getBalancedFromPool(pool, count) {
    const easy = pool.filter(q => q.difficulty === 'easy');
    const medium = pool.filter(q => q.difficulty === 'medium');
    const hard = pool.filter(q => q.difficulty === 'hard');

    const easyCount = Math.floor(count * 0.3);
    const mediumCount = Math.floor(count * 0.4);
    const hardCount = count - easyCount - mediumCount;

    const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());

    const selected = [
        ...shuffle(easy).slice(0, easyCount),
        ...shuffle(medium).slice(0, mediumCount),
        ...shuffle(hard).slice(0, hardCount),
    ];

    if (selected.length < count) {
        const selectedIds = new Set(selected.map(q => q.id));
        const remaining = shuffle(pool.filter(q => !selectedIds.has(q.id)));
        selected.push(...remaining.slice(0, count - selected.length));
    }

    return shuffle(selected);
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const { count = 15, subject = 'Physics', language = 'English' } = req.query;
        const questionCount = Math.min(Math.max(parseInt(count) || 15, 5), 60);

        let subjectName = subject;
        let questions = [];

        // Try querying from the production ScholarshipQuestion database first
        try {
            await dbConnect();
            let querySubject = subject;
            if (subject === 'Biology') {
                querySubject = { $in: ['Biology', 'Botany', 'Zoology'] };
            }

            const dbQuestions = await ScholarshipQuestion.aggregate([
                { $match: { subject: querySubject, isActive: true } },
                { $sample: { size: questionCount } },
            ]);

            if (dbQuestions && dbQuestions.length >= questionCount) {
                const isTamil = language === 'Tamil';
                questions = dbQuestions.map(q => ({
                    id: q._id.toString(),
                    code: q.code,
                    questionText: isTamil && q.questionTextTamil ? q.questionTextTamil : q.questionText,
                    options: isTamil && q.optionsTamil && q.optionsTamil.length === 4 ? q.optionsTamil : q.options,
                    difficulty: q.difficulty,
                    topic: q.topic,
                    subject: q.subject,
                }));
            }
        } catch (dbErr) {
            console.warn('Could not fetch practice questions from DB, falling back to static pool:', dbErr.message);
        }

        // Fallback to static pool if DB had fewer questions
        if (questions.length === 0) {
            let poolQuestions;
            switch (subject) {
                case 'Chemistry':
                    poolQuestions = getBalancedFromPool(chemistryQuestions, questionCount);
                    break;
                case 'Mathematics':
                    poolQuestions = getBalancedFromPool(mathematicsQuestions, questionCount);
                    break;
                case 'Botany':
                    poolQuestions = getBalancedFromPool(botanyQuestions, questionCount);
                    break;
                case 'Zoology':
                    poolQuestions = getBalancedFromPool(zoologyQuestions, questionCount);
                    break;
                case 'Biology':
                    const bioPool = [...botanyQuestions, ...zoologyQuestions];
                    poolQuestions = getBalancedFromPool(bioPool, questionCount);
                    subjectName = 'Biology';
                    break;
                case 'Physics':
                default:
                    poolQuestions = getBalancedQuestions(questionCount);
                    subjectName = 'Physics';
                    break;
            }

            questions = poolQuestions.map(q => ({
                id: q.id,
                questionText: q.questionText,
                options: q.options,
                difficulty: q.difficulty,
                topic: q.topic,
                subject: q.subject || subjectName,
            }));
        }

        res.status(200).json({
            success: true,
            data: {
                questions,
                totalQuestions: questions.length,
                duration: questions.length * 2, // 2 minutes per question
                subject: subjectName,
            },
        });
    } catch (error) {
        console.error('Get practice questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch practice questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
