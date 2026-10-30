import dbConnect from '@/lib/mongodb';
import PracticeTestResult from '@/models/PracticeTestResult';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import { physicsQuestions } from '@/data/practiceQuestions';
import { chemistryQuestions } from '@/data/chemistryQuestions';
import { mathematicsQuestions } from '@/data/mathematicsQuestions';
import { botanyQuestions, zoologyQuestions } from '@/data/biologyQuestions';

// Combined question map for static fallback
const allStaticQuestions = [
    ...physicsQuestions,
    ...chemistryQuestions,
    ...mathematicsQuestions,
    ...botanyQuestions,
    ...zoologyQuestions,
];

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const {
            studentName,
            email,
            phone,
            answers,
            timeTaken,
            subject = 'Physics'
        } = req.body;

        // Validate required fields
        if (!studentName || !email || !answers || !Array.isArray(answers)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide student name, email, and answers',
            });
        }

        // Map static questions
        const staticMap = {};
        allStaticQuestions.forEach(q => {
            staticMap[q.id] = q;
        });

        // Also query DB questions for any question IDs passed in answers
        const questionIds = answers.map(a => a.questionId).filter(Boolean);
        const dbQuestions = await ScholarshipQuestion.find({
            _id: { $in: questionIds.filter(id => id.length === 24) }
        }).lean();

        const dbMap = {};
        dbQuestions.forEach(q => {
            dbMap[q._id.toString()] = q;
        });

        // Calculate results
        let correctCount = 0;
        let wrongCount = 0;
        let unansweredCount = 0;

        const processedAnswers = answers.map(answer => {
            const question = dbMap[answer.questionId] || staticMap[answer.questionId];
            if (!question) {
                return null;
            }

            const isCorrect = answer.selectedAnswer === question.correctAnswer;

            if (!answer.selectedAnswer) {
                unansweredCount++;
            } else if (isCorrect) {
                correctCount++;
            } else {
                wrongCount++;
            }

            return {
                questionId: answer.questionId,
                selectedAnswer: answer.selectedAnswer || null,
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect,
            };
        }).filter(Boolean);

        const totalQuestions = processedAnswers.length;
        const score = correctCount;
        const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

        const practiceResult = await PracticeTestResult.create({
            studentName,
            email: email.toLowerCase(),
            phone: phone || '',
            subject: subject,
            totalQuestions,
            correctAnswers: correctCount,
            wrongAnswers: wrongCount,
            unanswered: unansweredCount,
            score,
            percentage,
            timeTaken: timeTaken || 0,
            answers: processedAnswers,
            status: 'completed',
        });

        // Generate detailed result for response
        const detailedResults = processedAnswers.map(ans => {
            const question = dbMap[ans.questionId] || staticMap[ans.questionId];
            return {
                questionText: question?.questionText || '',
                topic: question?.topic || '',
                selectedAnswer: ans.selectedAnswer,
                correctAnswer: ans.correctAnswer,
                isCorrect: ans.isCorrect,
                explanation: question?.explanation || '',
                options: question?.options || [],
            };
        });

        res.status(200).json({
            success: true,
            message: 'Practice test submitted successfully',
            data: {
                resultId: practiceResult._id,
                studentName,
                email,
                subject: subject,
                totalQuestions,
                correctAnswers: correctCount,
                wrongAnswers: wrongCount,
                unanswered: unansweredCount,
                score,
                percentage,
                timeTaken,
                detailedResults,
            },
        });

    } catch (error) {
        console.error('Submit practice test error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit practice test',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
