import dbConnect from '@/lib/mongodb';
import PracticeTestResult from '@/models/PracticeTestResult';
import { physicsQuestions } from '@/data/practiceQuestions';
import { chemistryQuestions } from '@/data/chemistryQuestions';
import { mathematicsQuestions } from '@/data/mathematicsQuestions';
import { botanyQuestions, zoologyQuestions } from '@/data/biologyQuestions';

// Combined question map for all subjects
const allQuestions = [
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

        // Create a map of questions for quick lookup
        const questionMap = {};
        allQuestions.forEach(q => {
            questionMap[q.id] = q;
        });

        // Calculate results
        let correctCount = 0;
        let wrongCount = 0;
        let unansweredCount = 0;

        const processedAnswers = answers.map(answer => {
            const question = questionMap[answer.questionId];
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

        // Connect to database and save result
        await dbConnect();

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
            const question = questionMap[ans.questionId];
            return {
                questionText: question?.questionText || '',
                topic: question?.topic || '',
                selectedAnswer: ans.selectedAnswer,
                correctAnswer: ans.correctAnswer,
                isCorrect: ans.isCorrect,
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
                grade: getGrade(percentage),
                details: detailedResults,
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

function getGrade(percentage) {
    if (percentage >= 90) return { grade: 'A+', label: 'Excellent!', color: 'green' };
    if (percentage >= 80) return { grade: 'A', label: 'Very Good!', color: 'green' };
    if (percentage >= 70) return { grade: 'B+', label: 'Good!', color: 'blue' };
    if (percentage >= 60) return { grade: 'B', label: 'Above Average', color: 'blue' };
    if (percentage >= 50) return { grade: 'C', label: 'Average', color: 'yellow' };
    if (percentage >= 40) return { grade: 'D', label: 'Below Average', color: 'orange' };
    return { grade: 'F', label: 'Needs Improvement', color: 'red' };
}
