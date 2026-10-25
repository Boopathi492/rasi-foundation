import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

// Official Examination Blueprint: 20 questions each, 90 minutes total
const QUESTIONS_PER_SUBJECT = 20;
const TEST_DURATION_MINUTES = 90;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { registrationToken, thirdSubject, language = 'English', pageSize = 5 } = req.body;

        if (!registrationToken) {
            return res.status(400).json({
                success: false,
                message: 'Registration token is required',
            });
        }

        if (!thirdSubject) {
            return res.status(400).json({
                success: false,
                message: 'Please select your elective subject (Mathematics or Biology)',
            });
        }

        // Validate elective subject
        const validSubjects = ['Mathematics', 'Biology', 'Botany', 'Zoology'];
        if (!validSubjects.includes(thirdSubject)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid elective subject selected. Choose Mathematics or Biology.',
            });
        }

        const validLanguage = language === 'Tamil' ? 'Tamil' : 'English';
        const validPageSize = Number(pageSize) === 10 ? 10 : 5;

        // Find student
        const student = await ScholarshipStudent.findOne({ registrationToken });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please complete registration first.',
            });
        }

        // Vocational students can only select Mathematics
        if (student.plus2Group === 'Vocational' && thirdSubject !== 'Mathematics') {
            return res.status(400).json({
                success: false,
                message: 'Vocational group students must select Mathematics as elective subject',
            });
        }

        // Check if test already completed
        if (student.testStatus === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'You have already completed the scholarship examination',
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
                        message: 'Examination already in progress',
                        data: {
                            sessionId: testSession._id,
                            resuming: true,
                            language: testSession.language,
                            pageSize: testSession.pageSize || 5,
                        },
                    });
                } else {
                    // Mark as expired
                    testSession.status = 'expired';
                    await testSession.save();
                    return res.status(400).json({
                        success: false,
                        message: 'Your examination time has expired',
                    });
                }
            }

            if (testSession.status === 'completed') {
                return res.status(400).json({
                    success: false,
                    message: 'You have already completed the examination',
                });
            }
        }

        // Update student's choice
        student.thirdSubject = thirdSubject;
        student.selectedElective = thirdSubject;
        student.examLanguage = validLanguage;
        student.testStatus = 'in_progress';
        student.testStartTime = new Date();
        await student.save();

        // 3 examination subjects: Physics (20), Chemistry (20), Elective (20)
        const subjects = ['Physics', 'Chemistry', thirdSubject];
        const allQuestions = [];

        for (const subject of subjects) {
            let matchQuery = { isActive: true };

            if (subject === 'Biology') {
                matchQuery.subject = { $in: ['Biology', 'Botany', 'Zoology'] };
            } else {
                matchQuery.subject = subject;
            }

            // Sample exactly 20 questions
            let questions = await ScholarshipQuestion.aggregate([
                { $match: matchQuery },
                { $sample: { size: QUESTIONS_PER_SUBJECT } },
                { $project: { _id: 1, subject: 1 } },
            ]);

            // Fallback: If not enough questions under specific match, get available questions
            if (questions.length < QUESTIONS_PER_SUBJECT) {
                const existingIds = questions.map(q => q._id);
                const additional = await ScholarshipQuestion.find(
                    { ...matchQuery, _id: { $nin: existingIds } },
                    { _id: 1, subject: 1 }
                ).limit(QUESTIONS_PER_SUBJECT - questions.length);
                questions = [...questions, ...additional];
            }

            // Add order index
            questions.forEach((q) => {
                allQuestions.push({
                    questionId: q._id,
                    subject: subject, // normalize subject name
                    orderIndex: allQuestions.length,
                });
            });
        }

        // Create test session with authoritative server-side timing
        testSession = await TestSession.create({
            studentId: student._id,
            registrationToken,
            subjects,
            language: validLanguage,
            pageSize: validPageSize,
            questions: allQuestions,
            totalQuestions: allQuestions.length,
            startTime: new Date(),
            duration: TEST_DURATION_MINUTES,
            status: 'in_progress',
            userAgent: req.headers['user-agent'],
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
        });

        res.status(201).json({
            success: true,
            message: 'Examination started successfully',
            data: {
                sessionId: testSession._id,
                totalQuestions: allQuestions.length,
                duration: TEST_DURATION_MINUTES,
                subjects,
                language: validLanguage,
                pageSize: validPageSize,
                startTime: testSession.startTime,
            },
        });

    } catch (error) {
        console.error('Start test error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to start examination. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
