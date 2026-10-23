import dbConnect from '@/lib/mongodb';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { sessionId } = req.query;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID is required',
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

        // Check if test is still valid
        if (testSession.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                message: `Test is ${testSession.status}. Cannot fetch questions.`,
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

        // Calculate remaining time
        const remainingMs = endTime.getTime() - new Date().getTime();
        const remainingMinutes = Math.floor(remainingMs / 60000);
        const remainingSeconds = Math.floor((remainingMs % 60000) / 1000);

        // Get question IDs from session
        const questionIds = testSession.questions.map(q => q.questionId);

        // Fetch full question details (without correct answers for security)
        const questions = await ScholarshipQuestion.find(
            { _id: { $in: questionIds } },
            { correctAnswer: 0, explanation: 0 } // Exclude answer and explanation
        );

        // Create a map for quick lookup
        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        // Build response with questions in order
        const orderedQuestions = testSession.questions.map((q, index) => {
            const fullQuestion = questionMap[q.questionId.toString()];
            if (!fullQuestion) return null;

            // Find if student already answered this question
            const existingAnswer = testSession.answers.find(
                a => a.questionId.toString() === q.questionId.toString()
            );

            return {
                index: index + 1,
                id: fullQuestion._id,
                subject: fullQuestion.subject,
                questionText: fullQuestion.questionText,
                options: fullQuestion.options,
                selectedAnswer: existingAnswer?.selectedAnswer || null,
            };
        }).filter(Boolean);

        // Group questions by subject
        const questionsBySubject = {};
        testSession.subjects.forEach(subject => {
            questionsBySubject[subject] = orderedQuestions.filter(q => q.subject === subject);
        });

        res.status(200).json({
            success: true,
            data: {
                sessionId: testSession._id,
                subjects: testSession.subjects,
                totalQuestions: orderedQuestions.length,
                questions: orderedQuestions,
                questionsBySubject,
                timing: {
                    startTime: testSession.startTime,
                    duration: testSession.duration,
                    remainingMinutes,
                    remainingSeconds,
                    endTime,
                },
                progress: {
                    answered: testSession.answers.filter(a => a.selectedAnswer).length,
                    total: orderedQuestions.length,
                },
            },
        });

    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
