import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

// Number of questions per subject
const QUESTIONS_PER_SUBJECT = 35;
const TEST_DURATION_MINUTES = 90;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { registrationToken, thirdSubject } = req.body;

        if (!registrationToken) {
            return res.status(400).json({
                success: false,
                message: 'Registration token is required',
            });
        }

        if (!thirdSubject) {
            return res.status(400).json({
                success: false,
                message: 'Please select your third subject',
            });
        }

        // Validate third subject
        const validSubjects = ['Mathematics', 'Botany', 'Zoology', 'Biology'];
        if (!validSubjects.includes(thirdSubject)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid third subject selected',
            });
        }

        // Find student
        const student = await ScholarshipStudent.findOne({ registrationToken });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please register first.',
            });
        }

        // Vocational students can only select Mathematics
        if (student.plus2Group === 'Vocational' && thirdSubject !== 'Mathematics') {
            return res.status(400).json({
                success: false,
                message: 'Vocational group students must select Mathematics as third subject',
            });
        }

        // Check if test already completed
        if (student.testStatus === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'You have already completed the scholarship test',
            });
        }

        // Check if test session exists
        let testSession = await TestSession.findOne({ registrationToken });

        if (testSession) {
            // If test is in progress and not expired, return existing session
            if (testSession.status === 'in_progress') {
                const endTime = new Date(testSession.startTime);
                endTime.setMinutes(endTime.getMinutes() + testSession.duration);

                if (new Date() < endTime) {
                    return res.status(200).json({
                        success: true,
                        message: 'Test already in progress',
                        data: {
                            sessionId: testSession._id,
                            resuming: true,
                        },
                    });
                } else {
                    // Mark as expired
                    testSession.status = 'expired';
                    await testSession.save();
                    return res.status(400).json({
                        success: false,
                        message: 'Your test session has expired',
                    });
                }
            }

            if (testSession.status === 'completed') {
                return res.status(400).json({
                    success: false,
                    message: 'You have already completed the test',
                });
            }
        }

        // Update student's third subject choice
        student.thirdSubject = thirdSubject;
        student.testStatus = 'in_progress';
        student.testStartTime = new Date();
        await student.save();

        // Define subjects for this test
        const subjects = ['Physics', 'Chemistry', thirdSubject];

        // Fetch random questions for each subject
        const allQuestions = [];

        for (const subject of subjects) {
            const questions = await ScholarshipQuestion.aggregate([
                { $match: { subject, isActive: true } },
                { $sample: { size: QUESTIONS_PER_SUBJECT } },
                { $project: { _id: 1, subject: 1 } },
            ]);

            // Add order index
            questions.forEach((q, idx) => {
                allQuestions.push({
                    questionId: q._id,
                    subject: q.subject,
                    orderIndex: allQuestions.length,
                });
            });
        }

        // Create test session
        testSession = await TestSession.create({
            studentId: student._id,
            registrationToken,
            subjects,
            questions: allQuestions,
            totalQuestions: allQuestions.length,
            startTime: new Date(),
            duration: TEST_DURATION_MINUTES,
            status: 'in_progress',
            userAgent: req.headers['user-agent'],
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        });

        res.status(201).json({
            success: true,
            message: 'Test started successfully',
            data: {
                sessionId: testSession._id,
                totalQuestions: allQuestions.length,
                duration: TEST_DURATION_MINUTES,
                subjects,
                startTime: testSession.startTime,
            },
        });

    } catch (error) {
        console.error('Start test error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start test. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
