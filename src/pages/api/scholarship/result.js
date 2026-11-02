import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import TestSession from '../../../backend/models/TestSession.js';
import {
    findScholarshipStudentByToken,
    findScholarshipResult,
    findScholarshipFeedbackByResultRef,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { authorizeScholarshipRequest } from '../../../backend/lib/scholarshipAuth.js';

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const rawToken = req.query?.token ? String(req.query.token).trim().toUpperCase() : '';
        const rawSession = req.query?.session ? String(req.query.session).trim() : '';

        if (!rawToken && !rawSession) {
            return res.status(400).json({
                success: false,
                message: 'Registration token or session ID is required',
            });
        }

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
            }
        } catch {
            // Authoritative result and profile live in SheetDB
        }

        // 1. Fetch authoritative scorecard from SheetDB `Scholarship_Results` (with legacy MongoDB fallback)
        const resultLookup = await findScholarshipResult({
            sessionId: rawSession || null,
            applicationNumber: rawToken || null,
        });

        if (!resultLookup.ok) {
            return res.status(resultLookup.statusCode || 503).json({
                success: false,
                errorCode: resultLookup.errorCode,
                retryable: resultLookup.retryable,
                message: 'Unable to retrieve examination scorecard right now. Please try again shortly.',
            });
        }

        if (!resultLookup.found || !resultLookup.result) {
            // Distinguish between an in-progress session vs an unknown session/token
            if (rawSession && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(rawSession)) {
                const live = await TestSession.findById(rawSession).select('status registrationToken studentReferenceId').lean();
                if (live) {
                    const authLive = authorizeScholarshipRequest(req, {
                        expectedApplicationNumber: live.registrationToken,
                        expectedStudentRef: live.studentReferenceId || null,
                        expectedSessionId: String(live._id),
                        allowAdminPermission: 'scholarship_exam:view',
                    });
                    if (!authLive.ok) {
                        return res.status(authLive.statusCode).json({ success: false, message: authLive.message });
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'Examination results not available. Please complete the examination first.',
                    });
                }
            }
            if (rawToken) {
                const stuExists = await findScholarshipStudentByToken(rawToken);
                if (stuExists.ok && stuExists.found) {
                    const authStu = authorizeScholarshipRequest(req, {
                        expectedApplicationNumber: rawToken,
                        allowAdminPermission: 'scholarship_exam:view',
                    });
                    if (!authStu.ok) {
                        return res.status(authStu.statusCode).json({ success: false, message: authStu.message });
                    }
                    return res.status(400).json({
                        success: false,
                        message: 'Examination results not available. Please complete the examination first.',
                    });
                }
            }

            return res.status(404).json({
                success: false,
                message: 'Scorecard record not found',
            });
        }

        const savedResult = resultLookup.result;

        // 2. Enforce strict candidate ownership (or RBAC admin permission `scholarship_exam:view`)
        const auth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: savedResult.registrationToken,
            expectedStudentRef: savedResult.studentReferenceId || null,
            expectedSessionId: rawSession || null,
            allowAdminPermission: 'scholarship_exam:view',
        });

        if (!auth.ok) {
            return res.status(auth.statusCode).json({
                success: false,
                reason: auth.reason,
                message: auth.message,
            });
        }

        // 3. Fetch candidate profile details from SheetDB `Scholarship_Students` (cached 60s)
        const stuLookup = savedResult.registrationToken
            ? await findScholarshipStudentByToken(savedResult.registrationToken)
            : { ok: true, found: false, student: null };
        const student = stuLookup.found ? stuLookup.student : null;

        // 4. Determine feedback submission status without burning unnecessary GETs if already flagged
        let feedbackSubmitted = Boolean(savedResult.feedbackSubmitted);
        if (!feedbackSubmitted && mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(savedResult.sessionId)) {
            const sessionStub = await TestSession.findById(savedResult.sessionId).select('feedbackSubmitted').lean();
            if (sessionStub?.feedbackSubmitted) {
                feedbackSubmitted = true;
            }
        }
        if (!feedbackSubmitted && savedResult.resultReferenceId) {
            const fbCheck = await findScholarshipFeedbackByResultRef(savedResult.resultReferenceId);
            if (fbCheck.ok && fbCheck.found) {
                feedbackSubmitted = true;
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                student: {
                    studentReferenceId: student?.studentReferenceId || savedResult.studentReferenceId || '',
                    name: student?.name || savedResult.candidateName || 'Candidate',
                    email: student?.studentEmail || '',
                    mobile: student?.studentMobile || savedResult.studentMobile || '',
                    registrationToken: student?.registrationToken || savedResult.registrationToken,
                    plus2Group: student?.plus2Group || 'Academic',
                    college: student?.collegeName || '',
                    course: student?.admissionCourse || '',
                    preferredColleges: student?.preferredColleges || [],
                    maskedAadhaar: student?.maskedAadhaar || '',
                    board: student?.board || '',
                    school: student?.lastStudiedSchool || '',
                },
                result: {
                    sessionId: savedResult.sessionId,
                    resultReferenceId: savedResult.resultReferenceId,
                    language: savedResult.language || 'English',
                    totalQuestions: savedResult.totalQuestions || 60,
                    attemptedQuestions: savedResult.attemptedQuestions,
                    unattempted: savedResult.unattempted,
                    correctAnswers: savedResult.correctAnswers,
                    wrongAnswers: savedResult.wrongAnswers,
                    score: savedResult.score,
                    maximumMarks: savedResult.maximumMarks || 60,
                    percentage: savedResult.percentage,
                    subjectWiseScores: savedResult.subjectWiseScores,
                    optionalSubject: savedResult.optionalSubject || student?.thirdSubject || 'Mathematics',
                    feedbackSubmitted,
                    completedAt: savedResult.submittedAt || savedResult.examDate,
                    timeTaken: savedResult.timeTaken,
                },
            },
        });
    } catch (error) {
        console.error('[Scholarship Get Result Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch examination result',
        });
    }
}
