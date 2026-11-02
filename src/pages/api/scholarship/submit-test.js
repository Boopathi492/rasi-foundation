import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import ScholarshipStudent from '../../../backend/models/ScholarshipStudent.js';
import ScholarshipQuestion from '../../../backend/models/ScholarshipQuestion.js';
import TestSession from '../../../backend/models/TestSession.js';
import SheetDBSyncJob from '../../../backend/models/SheetDBSyncJob.js';
import {
    SHEETDB_CONFIG,
    mapResultToSheetRow,
    appendRowWithReconcile,
    cacheResultRow,
    findScholarshipStudentByToken,
    findScholarshipResult,
    enqueueAndDispatchSync,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { authorizeScholarshipRequest } from '../../../backend/lib/scholarshipAuth.js';

const inFlightSubmissions = new Set();

function buildSubjectScoresArray(subjects, subjectWiseMap, totalPerSubject = 20) {
    return (subjects || ['Physics', 'Chemistry', 'Mathematics']).map((subject) => {
        const correctCount = Number(subjectWiseMap?.[subject] || 0);
        return {
            subject,
            correct: correctCount,
            total: totalPerSubject,
            percentage: totalPerSubject > 0 ? Math.round((correctCount / totalPerSubject) * 100) : 0,
        };
    });
}

function mapSubmitSheetFailure(failure) {
    const code = failure?.errorCode;
    if (code === 'CONFIG_MISSING') {
        return {
            httpStatus: 503,
            errorCode: 'CONFIG_MISSING',
            retryable: true,
            message: 'Official scorecard storage is not configured on the server. Your answers are safely preserved; please retry shortly.',
        };
    }
    if (code === 'AUTH_FAILED' || failure?.statusCode === 401 || failure?.statusCode === 403) {
        return {
            httpStatus: 502,
            errorCode: 'AUTH_FAILED',
            retryable: false,
            message: 'Scorecard storage authentication failed on the server. Your answers are safely preserved; please contact support.',
        };
    }
    if (code === 'RATE_LIMITED' || failure?.statusCode === 429) {
        return {
            httpStatus: 429,
            errorCode: 'RATE_LIMITED',
            retryable: true,
            message: 'Scorecard storage is busy due to high traffic. Your answers are saved — please click Submit again in a few seconds.',
        };
    }
    if (code === 'TIMEOUT' || failure?.statusCode === 408) {
        return {
            httpStatus: 504,
            errorCode: 'TIMEOUT',
            retryable: true,
            message: 'Scorecard confirmation timed out. Your answers are saved — please click Submit again to finalize.',
        };
    }
    return {
        httpStatus: 503,
        errorCode: code || 'SHEETDB_UNAVAILABLE',
        retryable: true,
        message: 'Could not finalize scorecard in official storage right now. Your answers are safely preserved — please retry.',
    };
}

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { sessionId } = req.body || {};
    if (!sessionId) {
        return res.status(400).json({
            success: false,
            message: 'Session ID is required',
        });
    }

    const cleanSessionId = String(sessionId).trim();
    if (!mongoose.Types.ObjectId.isValid(cleanSessionId)) {
        return res.status(404).json({
            success: false,
            message: 'Examination session not found',
        });
    }

    if (inFlightSubmissions.has(cleanSessionId)) {
        return res.status(409).json({
            success: false,
            errorCode: 'SUBMISSION_IN_PROGRESS',
            retryable: true,
            message: 'Your examination submission is currently being finalized. Please wait a moment.',
        });
    }

    inFlightSubmissions.add(cleanSessionId);

    try {
        await dbConnect();

        const testSession = await TestSession.findById(cleanSessionId);
        if (!testSession) {
            // Check if the session was already completed, synced to SheetDB, and TTL-expired from MongoDB
            const archived = await findScholarshipResult({ sessionId: cleanSessionId }, { allowLegacyMongo: false });
            if (archived.ok && archived.found && archived.result) {
                const r = archived.result;
                const auth = authorizeScholarshipRequest(req, {
                    expectedApplicationNumber: r.registrationToken,
                    expectedStudentRef: r.studentReferenceId || null,
                    expectedSessionId: cleanSessionId,
                });
                if (!auth.ok) {
                    return res.status(auth.statusCode).json({ success: false, message: auth.message });
                }
                return res.status(200).json({
                    success: true,
                    idempotentReplay: true,
                    message: 'Examination already submitted',
                    data: {
                        sessionId: r.sessionId,
                        resultReferenceId: r.resultReferenceId,
                        totalQuestions: r.totalQuestions,
                        attemptedQuestions: r.attemptedQuestions,
                        unattemptedQuestions: r.unattempted,
                        correctAnswers: r.correctAnswers,
                        wrongAnswers: r.wrongAnswers,
                        score: r.score,
                        percentage: r.percentage,
                        subjectWiseScores: r.subjectWiseScores,
                        timeTaken: { durationMinutes: r.timeTaken },
                    },
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Examination session not found',
            });
        }

        // 1. Enforce strict candidate ownership
        const auth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: testSession.registrationToken,
            expectedStudentRef: testSession.studentReferenceId || (testSession.studentId ? String(testSession.studentId) : null),
            expectedSessionId: String(testSession._id),
        });
        if (!auth.ok) {
            return res.status(auth.statusCode).json({
                success: false,
                reason: auth.reason,
                message: auth.message,
            });
        }

        if (testSession.status === 'disqualified') {
            return res.status(403).json({
                success: false,
                message: 'This examination session has been disqualified and cannot be submitted.',
            });
        }

        // 2. If already completed AND confirmed in SheetDB, return authoritative result idempotently (0 duplicate rows)
        if (testSession.status === 'completed' && testSession.sheetdbSynced) {
            const savedResult = await findScholarshipResult(
                { sessionId: String(testSession._id), applicationNumber: testSession.registrationToken },
                { allowLegacyMongo: true }
            );
            if (savedResult.ok && savedResult.found && savedResult.result) {
                const r = savedResult.result;
                return res.status(200).json({
                    success: true,
                    idempotentReplay: true,
                    message: 'Examination already submitted',
                    data: {
                        sessionId: testSession._id,
                        resultReferenceId: r.resultReferenceId,
                        totalQuestions: r.totalQuestions,
                        attemptedQuestions: r.attemptedQuestions,
                        unattemptedQuestions: r.unattempted,
                        correctAnswers: r.correctAnswers,
                        wrongAnswers: r.wrongAnswers,
                        score: r.score,
                        percentage: r.percentage,
                        subjectWiseScores: r.subjectWiseScores,
                        timeTaken: {
                            start: testSession.startTime,
                            end: testSession.endTime,
                            durationMinutes: r.timeTaken,
                        },
                    },
                });
            }
        }

        // 3. Grade strictly on the server from immutable snapshots (ONLY if not already graded on a previous retry)
        let totalQ = testSession.totalQuestions || (Array.isArray(testSession.questions) ? testSession.questions.length : 0) || 60;
        let calculatedScore = testSession.score || 0;
        let calculatedCorrect = testSession.correctAnswers || 0;
        let calculatedAttempted = testSession.attemptedQuestions || 0;
        let calculatedUnattempted = testSession.unattemptedQuestions ?? totalQ;
        let calculatedWrong = testSession.wrongAnswers || 0;
        let calculatedPercentage = testSession.percentage || 0;
        let subjectWiseMap = { ...(testSession.subjectWiseScore?.toObject ? testSession.subjectWiseScore.toObject() : (testSession.subjectWiseScore || {})) };

        if (testSession.status !== 'completed') {
            const questionsArr = Array.isArray(testSession.questions) ? testSession.questions : [];
            const answersArr = Array.isArray(testSession.answers) ? testSession.answers : [];
            const needsDbLookup = questionsArr.some((q) => !q.snapshot || !q.snapshot.correctAnswer);
            let questionMap = new Map();

            if (needsDbLookup && questionsArr.length > 0) {
                const questionIds = questionsArr.map((q) => q.questionId).filter(Boolean);
                const questionsInDb = await ScholarshipQuestion.find({ _id: { $in: questionIds } });
                questionMap = new Map(questionsInDb.map((q) => [q._id.toString(), q]));
            }

            calculatedScore = 0;
            calculatedCorrect = 0;
            calculatedAttempted = 0;
            subjectWiseMap = {};

            (testSession.subjects || ['Physics', 'Chemistry', testSession.optionalSubject || 'Mathematics']).forEach((s) => {
                subjectWiseMap[s] = 0;
            });

            answersArr.forEach((ans) => {
                if (ans.selectedAnswer && ['A', 'B', 'C', 'D'].includes(ans.selectedAnswer)) {
                    calculatedAttempted++;
                    const sessionQ = questionsArr.find((sq) => sq.questionId.toString() === ans.questionId.toString());
                    const snap = sessionQ?.snapshot && sessionQ.snapshot.correctAnswer ? sessionQ.snapshot : null;
                    const dbQ = questionMap.get(ans.questionId.toString());
                    const targetQ = snap || dbQ;

                    if (targetQ) {
                        let originalSelected = ans.selectedAnswer;
                        if (sessionQ && Array.isArray(sessionQ.shuffledOptions) && sessionQ.shuffledOptions.length === 4) {
                            const perm = sessionQ.shuffledOptions.find((o) => o.displayLabel === ans.selectedAnswer);
                            if (perm) {
                                originalSelected = perm.originalLabel;
                            }
                        }

                        const isCorrect = originalSelected === targetQ.correctAnswer;
                        ans.isCorrect = isCorrect;

                        if (isCorrect) {
                            calculatedCorrect++;
                            calculatedScore += Number(targetQ.marks || testSession.configSnapshot?.marksPerQuestion || 1);
                            const sub = ans.subject || targetQ.subject || sessionQ?.subject;
                            subjectWiseMap[sub] = (subjectWiseMap[sub] || 0) + 1;
                        } else if (targetQ.negativeMarks || testSession.configSnapshot?.negativeMarking) {
                            const penalty = Number(targetQ.negativeMarks || testSession.configSnapshot?.negativeMarking || 0);
                            calculatedScore = Math.max(0, calculatedScore - penalty);
                        }
                    }
                } else {
                    ans.isCorrect = false;
                }
            });

            totalQ = testSession.totalQuestions || questionsArr.length || 60;
            const maxMarks = totalQ * Number(testSession.configSnapshot?.marksPerQuestion || 1);
            calculatedUnattempted = Math.max(0, totalQ - calculatedAttempted);
            calculatedWrong = Math.max(0, calculatedAttempted - calculatedCorrect);
            calculatedPercentage = maxMarks > 0 ? Math.round((calculatedScore / maxMarks) * 100) : 0;

            // Clamp endTime to official deadline if auto-submitted slightly past expiry
            const deadline = new Date(new Date(testSession.startTime).getTime() + (testSession.duration || 90) * 60 * 1000);
            const now = new Date();
            testSession.status = 'completed';
            testSession.endTime = now > deadline ? deadline : now;
            testSession.score = calculatedScore;
            testSession.correctAnswers = calculatedCorrect;
            testSession.attemptedQuestions = calculatedAttempted;
            testSession.unattemptedQuestions = calculatedUnattempted;
            testSession.wrongAnswers = calculatedWrong;
            testSession.percentage = calculatedPercentage;
            testSession.subjectWiseScore = subjectWiseMap;
            testSession.sheetdbSynced = false;

            await testSession.save();
        }

        // Resolve candidate identity details for the 22-column result row
        let candidateInfo = {
            student_reference_id: testSession.studentReferenceId || (testSession.studentId ? String(testSession.studentId) : ''),
            application_number: testSession.registrationToken,
            name: testSession.candidateName || '',
            studentMobile: testSession.studentMobile || '',
            examLanguage: testSession.language || 'English',
            selectedElective: testSession.optionalSubject || testSession.subjects?.[2] || 'Mathematics',
        };

        if (!candidateInfo.name || !candidateInfo.student_reference_id) {
            const stuLookup = await findScholarshipStudentByToken(testSession.registrationToken);
            if (stuLookup.ok && stuLookup.found && stuLookup.student) {
                candidateInfo = {
                    student_reference_id: stuLookup.student.studentReferenceId,
                    application_number: stuLookup.student.registrationToken,
                    name: stuLookup.student.name,
                    studentMobile: stuLookup.student.studentMobile,
                    examLanguage: testSession.language || stuLookup.student.examLanguage,
                    selectedElective: testSession.optionalSubject || stuLookup.student.selectedElective,
                };
            }
        }

        const resultSheetPayload = mapResultToSheetRow(
            {
                _id: testSession._id,
                resultReferenceId: String(testSession._id),
                studentReferenceId: candidateInfo.student_reference_id,
                registrationToken: testSession.registrationToken,
                candidateName: candidateInfo.name,
                studentMobile: candidateInfo.studentMobile,
                selectedElective: testSession.optionalSubject || testSession.subjects?.[2] || 'Mathematics',
                optionalSubject: testSession.optionalSubject || testSession.subjects?.[2] || 'Mathematics',
                language: testSession.language || 'English',
                totalQuestions: totalQ,
                attemptedQuestions: calculatedAttempted,
                correctAnswers: calculatedCorrect,
                wrongAnswers: calculatedWrong,
                unattemptedQuestions: calculatedUnattempted,
                score: calculatedScore,
                percentage: calculatedPercentage,
                subjectWiseScore: subjectWiseMap,
                configSnapshot: testSession.configSnapshot,
                startTime: testSession.startTime,
                endTime: testSession.endTime,
                status: 'completed',
            },
            candidateInfo
        );

        // 4. Write final scorecard synchronously to SheetDB `Scholarship_Results` with reconciliation on ambiguous timeouts
        const writeResult = await appendRowWithReconcile(
            SHEETDB_CONFIG.tabs.RESULTS,
            resultSheetPayload,
            {
                uniqueColumn: 'result_reference_id',
                uniqueValue: String(testSession._id),
                timeoutMs: SHEETDB_CONFIG.interactiveTimeoutMs,
                maxAttempts: 2,
            }
        );

        if (!writeResult.success) {
            // Queue durable recovery job so the graded exam cannot be lost, AND return honest retryable error to client
            const errCode = writeResult.errorCode || String(writeResult.statusCode || 'ERR_SYNC');
            await TestSession.updateOne(
                { _id: testSession._id },
                {
                    $set: {
                        sheetdbSynced: false,
                        sheetdbError: `[${errCode}] ${String(writeResult.error || 'SheetDB write failed').slice(0, 300)}`,
                        expiresAt: null,
                    },
                }
            ).catch(() => {});

            await enqueueAndDispatchSync({
                destinationTab: SHEETDB_CONFIG.tabs.RESULTS,
                recordReferenceId: String(testSession._id),
                payload: resultSheetPayload,
                operationType: 'insert',
                syncImmediately: false,
            }).catch(() => {});

            const mapped = mapSubmitSheetFailure(writeResult);
            return res.status(mapped.httpStatus).json({
                success: false,
                errorCode: mapped.errorCode,
                retryable: mapped.retryable,
                message: mapped.message,
            });
        }

        // 5. SheetDB persistence verified -> seed cache, compact transient runtime session (remove duplicate scorecard/PII), set 7d TTL
        cacheResultRow(resultSheetPayload);

        await TestSession.updateOne(
            { _id: testSession._id },
            {
                $set: {
                    sheetdbSynced: true,
                    sheetdbSyncedAt: new Date(),
                    sheetdbError: null,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
                $unset: {
                    questions: 1,
                    answers: 1,
                    candidateName: 1,
                    studentMobile: 1,
                    plus2Group: 1,
                    admissionCourse: 1,
                    collegeName: 1,
                },
            }
        ).catch(() => {});

        // Mark any previous recovery sync job completed so cron never double-processes it
        await SheetDBSyncJob.updateMany(
            {
                destinationTab: SHEETDB_CONFIG.tabs.RESULTS,
                recordReferenceId: String(testSession._id),
                status: { $in: ['pending', 'failed', 'requires_review'] },
            },
            {
                $set: {
                    status: 'completed',
                    successfulSyncTimestamp: new Date(),
                    lastErrorMessage: null,
                    leaseExpiresAt: null,
                    lockedBy: null,
                },
            }
        ).catch(() => {});

        // Update legacy MongoDB student ONLY if pre-existing legacy record
        if (testSession.studentId) {
            await ScholarshipStudent.updateOne(
                { _id: testSession.studentId },
                {
                    $set: {
                        testStatus: 'completed',
                        testEndTime: testSession.endTime,
                        testScore: calculatedScore,
                    },
                }
            ).catch(() => {});
        }

        const perSubjectTotal = Math.max(1, Math.round(totalQ / (testSession.subjects?.length || 3)));
        const subjectScores = buildSubjectScoresArray(testSession.subjects, subjectWiseMap, perSubjectTotal);

        return res.status(200).json({
            success: true,
            message: 'Examination submitted successfully!',
            data: {
                sessionId: testSession._id,
                resultReferenceId: String(testSession._id),
                totalQuestions: totalQ,
                attemptedQuestions: calculatedAttempted,
                unattemptedQuestions: calculatedUnattempted,
                correctAnswers: calculatedCorrect,
                wrongAnswers: calculatedWrong,
                score: calculatedScore,
                percentage: calculatedPercentage,
                subjectWiseScores: subjectScores,
                timeTaken: {
                    start: testSession.startTime,
                    end: testSession.endTime,
                    durationMinutes: Math.max(0, Math.round((new Date(testSession.endTime) - new Date(testSession.startTime)) / 60000)),
                },
            },
        });
    } catch (error) {
        console.error('[Scholarship Submit Test Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to submit examination',
        });
    } finally {
        inFlightSubmissions.delete(cleanSessionId);
    }
}
