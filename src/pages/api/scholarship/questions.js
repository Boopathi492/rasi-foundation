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
                message: 'Examination session not found',
            });
        }

        // Check if test is still valid
        if (testSession.status !== 'in_progress') {
            return res.status(400).json({
                success: false,
                message: `Examination is ${testSession.status}. Cannot fetch questions.`,
            });
        }

        // Authoritative server-side deadline check
        const startTime = new Date(testSession.startTime);
        const endTime = new Date(startTime.getTime() + (testSession.duration * 60 * 1000));
        const now = new Date();

        if (now > endTime) {
            testSession.status = 'expired';
            await testSession.save();
            return res.status(400).json({
                success: false,
                message: 'Examination duration has expired',
            });
        }

        // Calculate remaining seconds
        const remainingMs = Math.max(0, endTime.getTime() - now.getTime());
        const remainingMinutes = Math.floor(remainingMs / 60000);
        const remainingSeconds = Math.floor(remainingMs / 1000);

        // Get question IDs from session
        const questionIds = testSession.questions.map(q => q.questionId);

        // Fetch questions without exposing correctAnswer or explanation
        const questions = await ScholarshipQuestion.find(
            { _id: { $in: questionIds } },
            { correctAnswer: 0, explanation: 0, explanationTamil: 0 }
        );

        const questionMap = {};
        questions.forEach(q => {
            questionMap[q._id.toString()] = q;
        });

        const isTamil = (testSession.medium || testSession.language) === 'Tamil';

        // Build ordered question list with server-mapped randomized options
        const orderedQuestions = testSession.questions.map((q, index) => {
            const fullQuestion = questionMap[q.questionId?.toString()];
            if (!fullQuestion) return null;

            const existingAnswer = testSession.answers.find(
                a => a.questionId.toString() === q.questionId.toString()
            );

            // Select language-specific content
            const useTamil = isTamil && fullQuestion.questionTextTamil && fullQuestion.optionsTamil && fullQuestion.optionsTamil.length === 4;
            const questionText = useTamil ? fullQuestion.questionTextTamil : fullQuestion.questionText;
            const rawOptions = useTamil ? fullQuestion.optionsTamil : fullQuestion.options;

            // Map options using stored session option permutation
            let mappedOptions = [];
            if (Array.isArray(q.shuffledOptions) && q.shuffledOptions.length === 4) {
                mappedOptions = q.shuffledOptions.map(perm => {
                    const foundOpt = rawOptions.find(o => o.label === perm.originalLabel);
                    return {
                        label: perm.displayLabel, // 'A', 'B', 'C', 'D'
                        text: foundOpt ? foundOpt.text : '',
                    };
                });
            } else {
                mappedOptions = rawOptions.map(o => ({ label: o.label, text: o.text }));
            }

            return {
                index: index + 1,
                id: fullQuestion._id,
                code: fullQuestion.code,
                subject: q.subject || fullQuestion.subject,
                topic: fullQuestion.topic,
                difficulty: fullQuestion.difficulty,
                questionText,
                options: mappedOptions,
                isTamil: Boolean(useTamil),
                selectedAnswer: existingAnswer?.selectedAnswer || null,
                markedForReview: Boolean(q.markedForReview),
            };
        }).filter(Boolean);

        // Group by subject
        const questionsBySubject = {};
        testSession.subjects.forEach(subject => {
            questionsBySubject[subject] = orderedQuestions.filter(q => q.subject === subject);
        });

        res.status(200).json({
            success: true,
            data: {
                sessionId: testSession._id,
                subjects: testSession.subjects,
                language: testSession.medium || testSession.language || 'English',
                pageSize: testSession.pageSize || 5,
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
                    answered: testSession.answers.filter(a => a.selectedAnswer !== null && a.selectedAnswer !== '').length,
                    markedForReview: testSession.questions.filter(q => q.markedForReview).length,
                    total: orderedQuestions.length,
                },
            },
        });

    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch examination questions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
