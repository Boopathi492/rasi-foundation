import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import TestSession from '@/models/TestSession';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { token, session } = req.query;

        if (!token && !session) {
            return res.status(400).json({
                success: false,
                message: 'Registration token or session ID is required',
            });
        }

        let testSession;
        let student;

        if (session) {
            // Find by session ID
            testSession = await TestSession.findById(session);
            if (!testSession) {
                return res.status(404).json({
                    success: false,
                    message: 'Test session not found',
                });
            }
            student = await ScholarshipStudent.findById(testSession.studentId);
        } else {
            // Find by token
            student = await ScholarshipStudent.findOne({ registrationToken: token });

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid registration token',
                });
            }

            testSession = await TestSession.findOne({ registrationToken: token });
        }

        if (!testSession || testSession.status !== 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Test results not available. Please complete the test first.',
            });
        }

        // Calculate subject-wise scores
        const subjectScores = [];
        testSession.subjects.forEach(subject => {
            const subjectQuestions = testSession.questions.filter(q => q.subject === subject).length;
            subjectScores.push({
                subject,
                correct: testSession.subjectWiseScore[subject] || 0,
                total: subjectQuestions,
                percentage: subjectQuestions > 0
                    ? Math.round((testSession.subjectWiseScore[subject] / subjectQuestions) * 100)
                    : 0,
            });
        });

        res.status(200).json({
            success: true,
            data: {
                student: {
                    name: student.name,
                    email: student.studentEmail,
                    registrationToken: student.registrationToken,
                    plus2Group: student.plus2Group,
                    college: student.collegeName,
                    course: student.admissionCourse,
                },
                result: {
                    totalQuestions: testSession.totalQuestions,
                    attemptedQuestions: testSession.attemptedQuestions,
                    unattempted: testSession.totalQuestions - testSession.attemptedQuestions,
                    correctAnswers: testSession.correctAnswers,
                    wrongAnswers: testSession.attemptedQuestions - testSession.correctAnswers,
                    score: testSession.score,
                    percentage: testSession.totalQuestions > 0
                        ? Math.round((testSession.score / testSession.totalQuestions) * 100)
                        : 0,
                    subjectWiseScores: subjectScores,
                    completedAt: testSession.endTime,
                    timeTaken: Math.round(
                        (testSession.endTime - testSession.startTime) / 60000
                    ),
                },
            },
        });

    } catch (error) {
        console.error('Get result error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch result',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
