import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import ScholarshipQuestion from '@/models/ScholarshipQuestion';
import TestSession from '@/models/TestSession';
import ScholarshipExamConfig from '@/backend/models/ScholarshipExamConfig';

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

// Select balanced questions for a subject dynamically based on config
async function selectBalancedQuestions(subjectName, targetCount, difficultyDistribution) {
    const matchQuery = {
        isActive: true,
        approvalStatus: 'approved',
        subject: subjectName === 'Biology'
            ? { $in: ['Biology', 'Botany', 'Zoology'] }
            : subjectName,
    };

    const selected = [];
    const selectedIds = new Set();
    const diffTargets = difficultyDistribution || { easy: Math.floor(targetCount * 0.35), medium: Math.floor(targetCount * 0.45), hard: targetCount - Math.floor(targetCount * 0.35) - Math.floor(targetCount * 0.45) };

    // Fetch by difficulty buckets
    for (const [diff, countNeeded] of Object.entries(diffTargets)) {
        if (countNeeded <= 0) continue;
        const diffQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, difficulty: diff, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: countNeeded } },
        ]);

        diffQuestions.forEach(q => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    // If any bucket fell short, fill remaining from available active approved questions
    if (selected.length < targetCount) {
        const remainingNeeded = targetCount - selected.length;
        const fillQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: remainingNeeded } },
        ]);

        fillQuestions.forEach(q => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    // Shuffle question order within the subject
    return shuffleArray(selected).slice(0, targetCount);
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

        // Dynamically fetch active examination configuration from database
        const examConfig = await ScholarshipExamConfig.getActiveConfig();
        const testDurationMinutes = examConfig.examDurationMinutes || 90;
        const compulsorySubjects = examConfig.compulsorySubjects || [];
        const optionalSubjects = examConfig.optionalSubjects || [];

        // Validate elective subject dynamically against database optionalSubjects list
        const matchedOptional = optionalSubjects.find(
            s => s.name.toLowerCase() === String(thirdSubject || '').toLowerCase()
        );

        if (!matchedOptional) {
            const allowedNames = optionalSubjects.map(s => s.name).join(' or ');
            return res.status(400).json({
                success: false,
                message: `Please select a valid elective subject (${allowedNames})`,
            });
        }

        const normalizedElective = matchedOptional.name;
        const validLanguage = (examConfig.languages || ['English', 'Tamil']).includes(language) ? language : 'English';
        const validPageSize = Number(pageSize) === 10 ? 10 : 5;

        // Find candidate student
        const student = await ScholarshipStudent.findOne({ registrationToken });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please complete registration first.',
            });
        }

        // Vocational students restriction check (if Mathematics is in optional subjects)
        if (student.plus2Group === 'Vocational' && normalizedElective !== 'Mathematics' && optionalSubjects.some(s => s.name === 'Mathematics')) {
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

        // Database-driven question availability check before starting exam
        const subjectQuotas = [
            ...compulsorySubjects.map(s => ({ name: s.name, count: s.questionCount, diff: s.difficultyDistribution })),
            { name: matchedOptional.name, count: matchedOptional.questionCount, diff: matchedOptional.difficultyDistribution },
        ];

        for (const quota of subjectQuotas) {
            const matchQuery = {
                isActive: true,
                approvalStatus: 'approved',
                subject: quota.name === 'Biology' ? { $in: ['Biology', 'Botany', 'Zoology'] } : quota.name,
            };

            const availableCount = await ScholarshipQuestion.countDocuments(matchQuery);
            if (availableCount < quota.count) {
                return res.status(400).json({
                    success: false,
                    message: `Unable to start examination: Insufficient approved questions in question bank for ${quota.name} (${availableCount} available, ${quota.count} required). Please contact the examination administrator.`,
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

        const subjectsList = subjectQuotas.map(s => s.name);
        const allQuestions = [];
        const questionIdsToIncrement = [];

        // Dynamically select questions for each subject quota
        for (const quota of subjectQuotas) {
            const subjectQuestions = await selectBalancedQuestions(quota.name, quota.count, quota.diff);

            subjectQuestions.forEach((q) => {
                questionIdsToIncrement.push(q._id);

                // Build complete immutable snapshot of question content at time of exam start
                const snapshot = {
                    code: q.code || '',
                    subject: quota.name,
                    topic: q.topic || 'General',
                    difficulty: q.difficulty || 'medium',
                    questionText: q.questionText,
                    questionTextTamil: q.questionTextTamil || '',
                    options: q.options || [],
                    optionsTamil: q.optionsTamil || [],
                    correctAnswer: q.correctAnswer, // safely encapsulated on server session
                    explanation: q.explanation || '',
                    explanationTamil: q.explanationTamil || '',
                    marks: q.marks || examConfig.marksPerQuestion || 1,
                    negativeMarks: q.negativeMarks || examConfig.negativeMarking || 0,
                };

                allQuestions.push({
                    questionId: q._id,
                    subject: quota.name,
                    orderIndex: allQuestions.length,
                    markedForReview: false,
                    shuffledOptions: generateShuffledOptions(),
                    snapshot,
                });
            });
        }

        // Track question usage count asynchronously
        if (questionIdsToIncrement.length > 0) {
            ScholarshipQuestion.updateMany(
                { _id: { $in: questionIdsToIncrement } },
                { $inc: { usageCount: 1 } }
            ).catch(err => console.error('Error incrementing usage count:', err));
        }

        // Create test session with authoritative server-side timing and immutable config snapshot
        testSession = await TestSession.create({
            studentId: student._id,
            registrationToken,
            subjects: subjectsList,
            optionalSubject: normalizedElective,
            medium: validLanguage,
            language: validLanguage,
            pageSize: validPageSize,
            questions: allQuestions,
            totalQuestions: allQuestions.length,
            duration: testDurationMinutes,
            startTime: new Date(),
            status: 'in_progress',
            configSnapshot: {
                examDurationMinutes: testDurationMinutes,
                totalQuestions: allQuestions.length,
                marksPerQuestion: examConfig.marksPerQuestion || 1,
                negativeMarking: examConfig.negativeMarking || 0,
            },
            userAgent: req.headers['user-agent'],
            ipAddress: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
        });

        res.status(201).json({
            success: true,
            message: 'Examination started successfully',
            data: {
                sessionId: testSession._id,
                totalQuestions: allQuestions.length,
                duration: testDurationMinutes,
                subjects: subjectsList,
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
