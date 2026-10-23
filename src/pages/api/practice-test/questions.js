import { getBalancedQuestions } from '@/data/practiceQuestions';
import { chemistryQuestions } from '@/data/chemistryQuestions';
import { mathematicsQuestions } from '@/data/mathematicsQuestions';
import { botanyQuestions, zoologyQuestions } from '@/data/biologyQuestions';

// Helper to get balanced questions from any pool
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

    // If not enough questions in difficulty buckets, fill from all
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
        const { count = 15, subject = 'Physics' } = req.query;
        const questionCount = Math.min(Math.max(parseInt(count) || 15, 5), 35);

        let questions;
        let subjectName = subject;

        switch (subject) {
            case 'Chemistry':
                questions = getBalancedFromPool(chemistryQuestions, questionCount);
                break;
            case 'Mathematics':
                questions = getBalancedFromPool(mathematicsQuestions, questionCount);
                break;
            case 'Botany':
                questions = getBalancedFromPool(botanyQuestions, questionCount);
                break;
            case 'Zoology':
                questions = getBalancedFromPool(zoologyQuestions, questionCount);
                break;
            case 'Biology':
                // Mix botany and zoology
                const bioPool = [...botanyQuestions, ...zoologyQuestions];
                questions = getBalancedFromPool(bioPool, questionCount);
                subjectName = 'Biology';
                break;
            case 'Physics':
            default:
                questions = getBalancedQuestions(questionCount);
                subjectName = 'Physics';
                break;
        }

        // Remove correct answers for security
        const questionsWithoutAnswers = questions.map(q => ({
            id: q.id,
            questionText: q.questionText,
            options: q.options,
            difficulty: q.difficulty,
            topic: q.topic,
            subject: q.subject || subjectName,
        }));

        res.status(200).json({
            success: true,
            data: {
                questions: questionsWithoutAnswers,
                totalQuestions: questionsWithoutAnswers.length,
                duration: questionCount * 2, // 2 minutes per question
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
