import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';

// Official Examination Blueprint: 20 questions each, 90 minutes total
const QUESTIONS_PER_SUBJECT = 20;
const TEST_DURATION_MINUTES = 90;

// Target difficulty distribution per 20 questions: 7 easy, 9 medium, 4 hard
const DIFFICULTY_TARGETS = {
    easy: 7,
    medium: 9,
    hard: 4,
};

// Fisher-Yates array shuffle helper
function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Generate randomized option mapping (A, B, C, D)
function generateShuffledOptions() {
    const originalLabels = ['A', 'B', 'C', 'D'];
    const shuffled = shuffleArray(originalLabels);
    return [
        { displayLabel: 'A', originalLabel: shuffled[0] },
        { displayLabel: 'B', originalLabel: shuffled[1] },
        { displayLabel: 'C', originalLabel: shuffled[2] },
        { displayLabel: 'D', originalLabel: shuffled[3] },
    ];
}

// Select balanced 20 questions for a subject
async function selectBalancedQuestions(subjectName) {
    const matchQuery = {
        isActive: true,
        subject: subjectName === 'Biology'
            ? { $in: ['Biology', 'Botany', 'Zoology'] }
            : subjectName,
    };

    const selected = [];
    const selectedIds = new Set();

    // Fetch by difficulty buckets
    for (const [diff, targetCount] of Object.entries(DIFFICULTY_TARGETS)) {
        const diffQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, difficulty: diff, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: targetCount } },
            { $project: { _id: 1, subject: 1, difficulty: 1, code: 1 } },
        ]);

        diffQuestions.forEach(q => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    // If any bucket fell short, fill remaining from available active questions
    if (selected.length < QUESTIONS_PER_SUBJECT) {
        const remainingNeeded = QUESTIONS_PER_SUBJECT - selected.length;
        const fillQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: remainingNeeded } },
            { $project: { _id: 1, subject: 1, difficulty: 1, code: 1 } },
        ]);

        fillQuestions.forEach(q => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    // Shuffle question order within the subject
    return shuffleArray(selected).slice(0, QUESTIONS_PER_SUBJECT);
}

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

        // Validate elective subject: strictly Mathematics OR Biology
        const normalizedElective = thirdSubject === 'Mathematics' ? 'Mathematics' : (thirdSubject === 'Biology' ? 'Biology' : null);
        if (!normalizedElective) {
            return res.status(400).json({
                success: false,
                message: 'Invalid elective subject selected. You must choose either Mathematics or Biology.',
            });
        }

        const validLanguage = language === 'Tamil' ? 'Tamil' : 'English';
        const validPageSize = Number(pageSize) === 10 ? 10 : 5;

        // Find candidate student
        const student = await ScholarshipStudent.findOne({ registrationToken });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please complete registration first.',
            });
        }

        // Vocational students can only select Mathematics
        if (student.plus2Group === 'Vocational' && normalizedElective !== 'Mathematics') {
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
            // If test is in progress and not expired, resume existing session idempotently
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
                            subjects: testSession.subjects,
                            startTime: testSession.startTime,
                            totalQuestions: testSession.totalQuestions,
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

        // Update student record
        student.thirdSubject = normalizedElective;
        student.selectedElective = normalizedElective;
        student.examLanguage = validLanguage;
        student.testStatus = 'in_progress';
        student.testStartTime = new Date();
        await student.save();

        // 3 examination subjects: Physics (20), Chemistry (20), Elective (20)
        const subjects = ['Physics', 'Chemistry', normalizedElective];
        const allQuestions = [];
        const questionIdsToIncrement = [];

        for (const subject of subjects) {
            const subjectQuestions = await selectBalancedQuestions(subject);

            subjectQuestions.forEach((q) => {
                questionIdsToIncrement.push(q._id);
                allQuestions.push({
                    questionId: q._id,
                    subject: subject,
                    orderIndex: allQuestions.length,
                    markedForReview: false,
                    shuffledOptions: generateShuffledOptions(),
                });
            });
        }

        // Track question usage count
        if (questionIdsToIncrement.length > 0) {
            ScholarshipQuestion.updateMany(
                { _id: { $in: questionIdsToIncrement } },
                { $inc: { usageCount: 1 } }
            ).catch(err => console.error('Error incrementing usage count:', err));
        }

        // Create test session with authoritative server-side timing
        testSession = await TestSession.create({
            studentId: student._id,
            registrationToken,
            subjects,
            optionalSubject: normalizedElective,
            medium: validLanguage,
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
