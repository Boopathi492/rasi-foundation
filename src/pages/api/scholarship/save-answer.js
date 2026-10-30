import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { sessionId, questionId, answer, markedForReview } = req.body;

        if (!sessionId || !questionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID and Question ID are required',
            });
        }

        // Find test session
        const testSession = await TestSession.findById(sessionId);

        if (!testSession) {
            return res.status(404).json({
                success: false,
                message: 'Examination session not found',
            });
        }

        // Check if test is still in progress
        if (testSession.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                message: `Cannot modify answer. Examination is ${testSession.status}.`,
            });
        }

        // Authoritative server-side deadline check
        const startTime = new Date(testSession.startTime);
        const endTime = new Date(startTime.getTime() + (testSession.duration * 60 * 1000));

        if (new Date() > endTime) {
            testSession.status = 'expired';
            await testSession.save();
            return res.status(400).json({
                success: false,
                message: 'Examination time has expired',
            });
        }

        // Verify question belongs to this session
        const sessionQuestion = testSession.questions.find(
            q => q.questionId.toString() === questionId.toString()
        );

        if (!sessionQuestion) {
            return res.status(400).json({
                success: false,
                message: 'This question does not belong to your examination paper',
            });
        }

        // Update marked for review status if provided
        if (markedForReview !== undefined) {
            sessionQuestion.markedForReview = Boolean(markedForReview);
        }

        // Process answer update if provided in request body
        if (answer !== undefined) {
            const validAnswer = answer && ['A', 'B', 'C', 'D'].includes(answer) ? answer : null;

            // Fetch question to check correct answer
            const question = await ScholarshipQuestion.findById(questionId);
            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: 'Question not found in question bank',
                });
            }

            // Map display label back to original label using stored shuffledOptions
            let isCorrect = false;
            if (validAnswer) {
                let originalSelected = validAnswer;
                if (Array.isArray(sessionQuestion.shuffledOptions) && sessionQuestion.shuffledOptions.length === 4) {
                    const match = sessionQuestion.shuffledOptions.find(o => o.displayLabel === validAnswer);
                    if (match) {
                        originalSelected = match.originalLabel;
                    }
                }
                isCorrect = originalSelected === question.correctAnswer;
            }

            // Find existing answer or create new
            const existingAnswerIndex = testSession.answers.findIndex(
                a => a.questionId.toString() === questionId.toString()
            );

            const answerData = {
                questionId,
                subject: sessionQuestion.subject || question.subject,
                selectedAnswer: validAnswer,
                isCorrect,
                timeTaken: 0,
            };

            if (existingAnswerIndex >= 0) {
                testSession.answers[existingAnswerIndex] = answerData;
            } else {
                testSession.answers.push(answerData);
            }
        }

        await testSession.save();

        const answeredCount = testSession.answers.filter(
            a => a.selectedAnswer !== null && a.selectedAnswer !== ''
        ).length;
        const markedCount = testSession.questions.filter(q => q.markedForReview).length;

        res.status(200).json({
            success: true,
            message: 'Answer updated successfully',
            data: {
                questionId,
                selectedAnswer: answer !== undefined ? (answer || null) : undefined,
                markedForReview: sessionQuestion.markedForReview,
                answeredCount,
                markedCount,
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
