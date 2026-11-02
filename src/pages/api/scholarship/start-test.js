import dbConnect from '../../../backend/lib/mongodb.js';
import ScholarshipStudent from '../../../backend/models/ScholarshipStudent.js';
import ScholarshipQuestion from '../../../backend/models/ScholarshipQuestion.js';
import TestSession from '../../../backend/models/TestSession.js';
import ScholarshipExamConfig from '../../../backend/models/ScholarshipExamConfig.js';
import {
    findScholarshipStudentByToken,
    findScholarshipResult,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import {
    authorizeScholarshipRequest,
    issueScholarshipSession,
} from '../../../backend/lib/scholarshipAuth.js';

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
    const diffTargets = difficultyDistribution || {
        easy: Math.floor(targetCount * 0.35),
        medium: Math.floor(targetCount * 0.45),
        hard: targetCount - Math.floor(targetCount * 0.35) - Math.floor(targetCount * 0.45),
    };

    for (const [diff, countNeeded] of Object.entries(diffTargets)) {
        if (countNeeded <= 0) continue;
        const diffQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, difficulty: diff, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: countNeeded } },
        ]);

        diffQuestions.forEach((q) => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    if (selected.length < targetCount) {
        const remainingNeeded = targetCount - selected.length;
        const fillQuestions = await ScholarshipQuestion.aggregate([
            { $match: { ...matchQuery, _id: { $nin: Array.from(selectedIds) } } },
            { $sample: { size: remainingNeeded } },
        ]);

        fillQuestions.forEach((q) => {
            selected.push(q);
            selectedIds.add(q._id.toString());
        });
    }

    return shuffleArray(selected).slice(0, targetCount);
}

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const body = req.body || {};
        const cleanToken = String(body.registrationToken || '').trim().toUpperCase();
        const { thirdSubject, language = 'English', pageSize = 5 } = body;

        if (!cleanToken) {
            return res.status(400).json({
                success: false,
                message: 'Registration token is required',
            });
        }

        // 1. Verify signed candidate authentication & prevent cross-student exam initiation
        const auth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: cleanToken,
        });
        if (!auth.ok) {
            return res.status(auth.statusCode).json({
                success: false,
                reason: auth.reason,
                message: auth.message,
            });
        }

        await dbConnect();

        // 2. Fetch active examination configuration from MongoDB
        const examConfig = await ScholarshipExamConfig.getActiveConfig();
        const testDurationMinutes = examConfig.examDurationMinutes || 90;
        const compulsorySubjects = examConfig.compulsorySubjects || [
            { name: 'Physics', questionCount: 20 },
            { name: 'Chemistry', questionCount: 20 },
        ];
        const optionalSubjects = examConfig.optionalSubjects || [
            { name: 'Mathematics', questionCount: 20 },
            { name: 'Biology', questionCount: 20 },
        ];

        const matchedOptional = optionalSubjects.find(
            (s) => s.name.toLowerCase() === String(thirdSubject || '').trim().toLowerCase()
        );

        if (!matchedOptional) {
            const allowedNames = optionalSubjects.map((s) => s.name).join(' or ');
            return res.status(400).json({
                success: false,
                message: `Please select a valid elective subject (${allowedNames})`,
            });
        }

        const normalizedElective = matchedOptional.name;
        const validLanguage = (examConfig.languages || ['English', 'Tamil']).includes(language) ? language : 'English';
        const validPageSize = Number(pageSize) === 10 ? 10 : 5;

        // 3. Lookup candidate profile from SheetDB (with 60s cache + legacy MongoDB read-only fallback)
        const studentLookup = await findScholarshipStudentByToken(cleanToken);
        if (!studentLookup.ok) {
            return res.status(studentLookup.statusCode || 503).json({
                success: false,
                errorCode: studentLookup.errorCode,
                retryable: studentLookup.retryable,
                message: 'Unable to verify candidate registration right now. Please try again shortly.',
            });
        }

        if (!studentLookup.found || !studentLookup.student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please complete registration first.',
            });
        }

        const student = studentLookup.student;

        // Vocational students restriction check
        if (
            student.plus2Group === 'Vocational' &&
            normalizedElective !== 'Mathematics' &&
            optionalSubjects.some((s) => s.name === 'Mathematics')
        ) {
            return res.status(400).json({
                success: false,
                message: 'Vocational group students must select Mathematics as elective subject',
            });
        }

        if (student.testStatus === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'You have already completed the scholarship examination',
            });
        }

        // 4. Check existing runtime TestSession or authoritative SheetDB result
        let testSession = await TestSession.findOne({ registrationToken: cleanToken });

        if (testSession) {
            if (testSession.status === 'in_progress') {
                const endTime = new Date(new Date(testSession.startTime).getTime() + (testSession.duration || 90) * 60 * 1000);

                if (new Date() < endTime) {
                    const accessToken = issueScholarshipSession(res, {
                        studentReferenceId: student.studentReferenceId,
                        applicationNumber: cleanToken,
                        sessionId: String(testSession._id),
                    });

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
                            accessToken,
                        },
                    });
                }

                testSession.status = 'expired';
                await testSession.save();
                return res.status(400).json({
                    success: false,
                    message: 'Your examination time has expired',
                });
            }

            if (testSession.status === 'completed' || testSession.status === 'disqualified' || testSession.status === 'expired') {
                return res.status(400).json({
                    success: false,
                    message: testSession.status === 'completed'
                        ? 'You have already completed the examination'
                        : `Examination session is ${testSession.status}`,
                });
            }
        } else if (!auth.claims?.freshReg) {
            // Ensure completed candidates whose runtime session has TTL-expired cannot retake the exam
            const priorResult = await findScholarshipResult({ applicationNumber: cleanToken });
            if (priorResult.ok && priorResult.found) {
                return res.status(400).json({
                    success: false,
                    message: 'You have already completed the examination',
                });
            }
        }

        // 5. Verify question bank availability
        const subjectQuotas = [
            ...compulsorySubjects.map((s) => ({ name: s.name, count: s.questionCount, diff: s.difficultyDistribution })),
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

        // Update legacy MongoDB student status ONLY if this was a pre-existing legacy record; never insert new student profiles
        if (student.source === 'legacy_mongodb' && student.legacyMongoId) {
            await ScholarshipStudent.updateOne(
                { _id: student.legacyMongoId },
                {
                    $set: {
                        thirdSubject: normalizedElective,
                        selectedElective: normalizedElective,
                        examLanguage: validLanguage,
                        testStatus: 'in_progress',
                        testStartTime: new Date(),
                    },
                }
            ).catch(() => {});
        }

        const subjectsList = subjectQuotas.map((s) => s.name);
        const allQuestions = [];
        const questionIdsToIncrement = [];

        for (const quota of subjectQuotas) {
            const subjectQuestions = await selectBalancedQuestions(quota.name, quota.count, quota.diff);

            subjectQuestions.forEach((q) => {
                questionIdsToIncrement.push(q._id);

                const snapshot = {
                    code: q.code || '',
                    subject: quota.name,
                    topic: q.topic || 'General',
                    difficulty: q.difficulty || 'medium',
                    questionText: q.questionText,
                    questionTextTamil: q.questionTextTamil || '',
                    options: q.options || [],
                    optionsTamil: q.optionsTamil || [],
                    correctAnswer: q.correctAnswer,
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

        if (questionIdsToIncrement.length > 0) {
            ScholarshipQuestion.updateMany(
                { _id: { $in: questionIdsToIncrement } },
                { $inc: { usageCount: 1 } }
            ).catch(() => {});
        }

        // 6. Create transient runtime TestSession (active exam state + immutable question snapshots)
        testSession = await TestSession.create({
            studentId: student.legacyMongoId || null,
            studentReferenceId: student.studentReferenceId,
            registrationToken: cleanToken,
            candidateName: student.name,
            studentMobile: student.studentMobile,
            plus2Group: student.plus2Group,
            admissionCourse: student.admissionCourse,
            collegeName: student.collegeName,
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
            userAgent: req.headers?.['user-agent'] || '',
            ipAddress: String(req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim(),
        });

        const accessToken = issueScholarshipSession(res, {
            studentReferenceId: student.studentReferenceId,
            applicationNumber: cleanToken,
            sessionId: String(testSession._id),
        });

        return res.status(201).json({
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
                accessToken,
            },
        });
    } catch (error) {
        console.error('[Scholarship Start Test Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to start examination. Please try again.',
        });
    }
}
