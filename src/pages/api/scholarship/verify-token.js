import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import TestSession from '../../../backend/models/TestSession.js';
import {
    findScholarshipStudentByToken,
    findScholarshipResult,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import {
    authorizeScholarshipRequest,
    issueScholarshipSession,
    timingSafeStringEqual,
} from '../../../backend/lib/scholarshipAuth.js';

const verifyRateLimiter = rateLimiter({ windowMs: 60_000, max: 25 });

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    if (process.env.DISABLE_SCHOLARSHIP_RATELIMIT !== 'true' && !verifyRateLimiter(req, res)) {
        return res.status(429).json({
            success: false,
            retryable: true,
            message: 'Too many verification attempts. Please wait a minute and try again.',
        });
    }

    try {
        const sourceParams = req.method === 'POST' ? (req.body || {}) : (req.query || {});
        const rawToken = String(sourceParams.token || sourceParams.registrationToken || '').trim().toUpperCase();
        const rawMobile = String(sourceParams.mobile || sourceParams.studentMobile || '').replace(/\D/g, '');
        const rawDob = String(sourceParams.dob || sourceParams.dateOfBirth || '').trim();

        if (!rawToken) {
            return res.status(400).json({
                success: false,
                message: 'Registration token is required',
            });
        }

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
            }
        } catch {
            // SheetDB lookup can proceed; MongoDB is used for active runtime session checks
        }

        // 1. Lookup candidate in SheetDB `Scholarship_Students` (with read-only legacy MongoDB fallback)
        const lookup = await findScholarshipStudentByToken(rawToken);
        if (!lookup.ok) {
            return res.status(lookup.statusCode || 503).json({
                success: false,
                errorCode: lookup.errorCode,
                retryable: lookup.retryable,
                message: 'Unable to reach registration records right now. Please try again shortly.',
            });
        }

        if (!lookup.found || !lookup.student) {
            return res.status(404).json({
                success: false,
                message: 'Invalid registration token. Please check and try again.',
            });
        }

        const student = lookup.student;

        // 2. Authenticate candidate: accept either an existing valid signed session for this token
        //    OR secondary identity verification (registered 10-digit mobile number or date of birth).
        const existingAuth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: student.registrationToken,
        });

        if (!existingAuth.ok) {
            // If an expired or cross-student token was presented WITHOUT fresh credentials, report why unless credentials are supplied
            if (!rawMobile && !rawDob) {
                if (existingAuth.statusCode === 403) {
                    return res.status(403).json({
                        success: false,
                        message: existingAuth.message,
                    });
                }
                return res.status(401).json({
                    success: false,
                    requiresVerification: true,
                    reason: existingAuth.reason,
                    message: existingAuth.reason === 'EXPIRED'
                        ? 'Your session has expired. Please enter your registered 10-digit mobile number to verify your identity.'
                        : 'Please enter your registered 10-digit mobile number along with your registration token.',
                });
            }

            let verified = false;
            if (rawMobile && student.studentMobile) {
                verified = timingSafeStringEqual(rawMobile, student.studentMobile);
            } else if (rawDob && student.dateOfBirth) {
                verified = timingSafeStringEqual(rawDob, student.dateOfBirth);
            }

            if (!verified) {
                return res.status(401).json({
                    success: false,
                    message: 'Identity verification failed. Registered mobile number does not match this registration token.',
                });
            }
        }

        // 3. Check active runtime session in MongoDB & authoritative result in SheetDB
        let testSession = null;
        if (mongoose.connection.readyState === 1) {
            testSession = await TestSession.findOne({ registrationToken: student.registrationToken });
        }

        // Check if exam is already completed (either in SheetDB `Scholarship_Results` or runtime session)
        let completedSessionId = testSession?.status === 'completed' ? String(testSession._id) : null;
        let isCompleted = Boolean(completedSessionId) || student.testStatus === 'completed';

        if (!isCompleted && !existingAuth.claims?.freshReg) {
            const resultCheck = await findScholarshipResult({ applicationNumber: student.registrationToken });
            if (resultCheck.ok && resultCheck.found && resultCheck.result) {
                isCompleted = true;
                completedSessionId = resultCheck.result.sessionId || null;
            }
        }

        if (isCompleted) {
            let accessToken = null;
            try {
                accessToken = issueScholarshipSession(res, {
                    studentReferenceId: student.studentReferenceId,
                    applicationNumber: student.registrationToken,
                    sessionId: completedSessionId,
                });
            } catch {
                // Handled on downstream calls if JWT_SECRET unset
            }

            return res.status(200).json({
                success: true,
                testCompleted: true,
                sessionId: completedSessionId,
                message: 'You have already completed the scholarship examination.',
                data: {
                    studentReferenceId: student.studentReferenceId,
                    registrationToken: student.registrationToken,
                    name: student.name,
                    plus2Group: student.plus2Group,
                    thirdSubject: student.thirdSubject,
                    examLanguage: student.examLanguage,
                    testStatus: 'completed',
                    accessToken,
                },
            });
        }

        // Check if an active exam session can be resumed
        if (testSession?.status === 'in_progress') {
            const endTime = new Date(new Date(testSession.startTime).getTime() + (testSession.duration || 90) * 60 * 1000);
            if (new Date() < endTime) {
                let accessToken = null;
                try {
                    accessToken = issueScholarshipSession(res, {
                        studentReferenceId: student.studentReferenceId,
                        applicationNumber: student.registrationToken,
                        sessionId: String(testSession._id),
                    });
                } catch {
                    // Handled downstream
                }

                return res.status(200).json({
                    success: true,
                    message: 'Examination in progress',
                    testInProgress: true,
                    sessionId: String(testSession._id),
                    data: {
                        studentReferenceId: student.studentReferenceId,
                        registrationToken: student.registrationToken,
                        name: student.name,
                        plus2Group: student.plus2Group,
                        thirdSubject: testSession.optionalSubject || student.thirdSubject,
                        examLanguage: testSession.language || student.examLanguage,
                        pageSize: testSession.pageSize || student.pageSize || 5,
                        accessToken,
                    },
                });
            }

            testSession.status = 'expired';
            await testSession.save();
            return res.status(400).json({
                success: false,
                testExpired: true,
                message: 'Your examination duration has expired.',
            });
        }

        if (testSession?.status === 'expired') {
            return res.status(400).json({
                success: false,
                testExpired: true,
                message: 'Your examination duration has expired.',
            });
        }

        let accessToken = null;
        try {
            accessToken = issueScholarshipSession(res, {
                studentReferenceId: student.studentReferenceId,
                applicationNumber: student.registrationToken,
            });
        } catch {
            // Handled downstream
        }

        return res.status(200).json({
            success: true,
            data: {
                studentReferenceId: student.studentReferenceId,
                registrationToken: student.registrationToken,
                name: student.name,
                plus2Group: student.plus2Group,
                thirdSubject: student.thirdSubject,
                examLanguage: student.examLanguage,
                pageSize: student.pageSize || 5,
                testStatus: student.testStatus || 'registered',
                accessToken,
            },
        });
    } catch (error) {
        console.error('[Scholarship Verify Token Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to verify registration token',
        });
    }
}
