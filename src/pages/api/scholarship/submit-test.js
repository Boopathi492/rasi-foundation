import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { sessionId } = req.body;

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

        // Check if already submitted
        if (testSession.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Examination has already been submitted',
            });
        }

        // Mark test as completed
        testSession.status = 'completed';
        testSession.endTime = new Date();

        // Score calculation happens in pre-save hook
        await testSession.save();

        // Update student record
        await ScholarshipStudent.findByIdAndUpdate(testSession.studentId, {
            testStatus: 'completed',
            testEndTime: new Date(),
        });

        // Prepare subject scores
        const subjectScores = [];
        testSession.subjects.forEach(subject => {
            const subjectQuestions = testSession.questions.filter(q => q.subject === subject).length;
            const correctCount = testSession.subjectWiseScore?.[subject] || 0;
            subjectScores.push({
                subject,
                correct: correctCount,
                total: subjectQuestions || 20,
                percentage: subjectQuestions > 0
                    ? Math.round((correctCount / subjectQuestions) * 100)
                    : 0,
            });
        });

        res.status(200).json({
            success: true,
            message: 'Examination submitted successfully!',
            data: {
                totalQuestions: testSession.totalQuestions || 60,
                attemptedQuestions: testSession.attemptedQuestions,
                correctAnswers: testSession.correctAnswers,
                score: testSession.score,
                percentage: testSession.totalQuestions > 0
                    ? Math.round((testSession.score / testSession.totalQuestions) * 100)
                    : 0,
                subjectWiseScores: subjectScores,
                timeTaken: {
                    start: testSession.startTime,
                    end: testSession.endTime,
                    durationMinutes: Math.round(
                        (testSession.endTime - testSession.startTime) / 60000
                    ),
                },
            },
        });

    } catch (error) {
        console.error('Submit test error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit examination',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
