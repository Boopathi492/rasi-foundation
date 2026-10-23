import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { sessionId, questionId, answer } = req.body;

        if (!sessionId || !questionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and Question ID are required',
            });
        }

        // Validate answer
        if (answer && !['A', 'B', 'C', 'D'].includes(answer)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid answer. Must be A, B, C, or D',
            });
        }

        // Find test session
        const testSession = await TestSession.findById(sessionId);

        if (!testSession) {
            return res.status(404).json({
                success: false,
                message: 'Test session not found',
            });
        }

        // Check if test is still in progress
        if (testSession.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                message: `Cannot submit answer. Test is ${testSession.status}.`,
            });
        }

        // Check if time has expired
        const endTime = new Date(testSession.startTime);
        endTime.setMinutes(endTime.getMinutes() + testSession.duration);

        if (new Date() > endTime) {
            testSession.status = 'expired';
            await testSession.save();
            return res.status(400).json({
                success: false,
                message: 'Test time has expired',
            });
        }

        // Verify question belongs to this session
        const sessionQuestion = testSession.questions.find(
            q => q.questionId.toString() === questionId
        );

        if (!sessionQuestion) {
            return res.status(400).json({
                success: false,
                message: 'This question is not part of your test',
            });
        }

        // Get correct answer from database
        const question = await ScholarshipQuestion.findById(questionId);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found',
            });
        }

        const isCorrect = answer === question.correctAnswer;

        // Find existing answer or create new
        const existingAnswerIndex = testSession.answers.findIndex(
            a => a.questionId.toString() === questionId
        );

        const answerData = {
            questionId,
            subject: question.subject,
            selectedAnswer: answer || null,
            isCorrect: answer ? isCorrect : false,
            timeTaken: 0, // Can be tracked from frontend
        };

        if (existingAnswerIndex >= 0) {
            // Update existing answer
            testSession.answers[existingAnswerIndex] = answerData;
        } else {
            // Add new answer
            testSession.answers.push(answerData);
        }

        await testSession.save();

        res.status(200).json({
            success: true,
            message: 'Answer saved',
            data: {
                saved: true,
                answered: testSession.answers.filter(a => a.selectedAnswer).length,
                total: testSession.totalQuestions,
            },
        });

    } catch (error) {
        console.error('Save answer error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save answer',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
