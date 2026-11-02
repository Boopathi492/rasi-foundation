import crypto from 'node:crypto';
import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import TestSession from '../../../backend/models/TestSession.js';
import {
    SHEETDB_CONFIG,
    mapFeedbackToSheetRow,
    appendRowWithReconcile,
    cacheFeedbackRow,
    findScholarshipStudentByToken,
    findScholarshipResult,
    findScholarshipFeedbackByResultRef,
    fetchAdminScholarshipDataset,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import { authorizeScholarshipRequest } from '../../../backend/lib/scholarshipAuth.js';

const feedbackRateLimiter = rateLimiter({ windowMs: 60_000, max: 15 });
const inFlightFeedbackRefs = new Set();

function generateFeedbackReferenceId() {
    return `fb_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
}

function mapFeedbackFailure(failure) {
    const code = failure?.errorCode;
    if (code === 'CONFIG_MISSING') {
        return { httpStatus: 503, errorCode: 'CONFIG_MISSING', retryable: true, message: 'Feedback storage is not configured on the server.' };
    }
    if (code === 'AUTH_FAILED' || failure?.statusCode === 401 || failure?.statusCode === 403) {
        return { httpStatus: 502, errorCode: 'AUTH_FAILED', retryable: false, message: 'Feedback storage authentication failed on the server.' };
    }
    if (code === 'RATE_LIMITED' || failure?.statusCode === 429) {
        return { httpStatus: 429, errorCode: 'RATE_LIMITED', retryable: true, message: 'Feedback service is busy. Please try again in a few seconds.' };
    }
    if (code === 'TIMEOUT' || failure?.statusCode === 408) {
        return { httpStatus: 504, errorCode: 'TIMEOUT', retryable: true, message: 'Feedback storage timed out. Please try submitting again.' };
    }
    return { httpStatus: 503, errorCode: code || 'SHEETDB_UNAVAILABLE', retryable: true, message: 'Unable to save feedback right now. Please retry.' };
}

export default async function handler(req, res) {
    setNoCacheHeaders(res);

    try {
        if (process.env.MONGODB_URI) {
            await dbConnect();
        }
    } catch {
        // Feedback persists directly to SheetDB `Scholarship_Feedback`
    }

    if (req.method === 'POST') {
        if (process.env.DISABLE_SCHOLARSHIP_RATELIMIT !== 'true' && !feedbackRateLimiter(req, res)) {
            return res.status(429).json({
                success: false,
                retryable: true,
                message: 'Too many feedback requests. Please wait a moment and try again.',
            });
        }

        const body = req.body && typeof req.body === 'object' ? req.body : {};
        const rawSessionId = String(body.sessionId || body.resultReferenceId || '').trim();

        // 1. Validate required fields on the server
        if (!rawSessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session / Result reference ID is required',
            });
        }

        const rawOverall = body.overallRating !== undefined ? body.overallRating : body.rating;
        if (rawOverall === undefined || rawOverall === null || rawOverall === '') {
            return res.status(400).json({
                success: false,
                message: 'Overall rating (1 to 5) is required',
            });
        }

        const normOverall = Number(rawOverall);
        if (!Number.isFinite(normOverall) || normOverall < 1 || normOverall > 5) {
            return res.status(400).json({
                success: false,
                message: 'Overall rating must be between 1 and 5',
            });
        }

        const rawDiff = String(body.difficultyRating || '').trim().toLowerCase();
        if (!rawDiff) {
            return res.status(400).json({
                success: false,
                message: 'Examination difficulty rating is required',
            });
        }

        let normDifficulty = null;
        if (rawDiff === 'easy' || rawDiff.includes('easy')) normDifficulty = 'easy';
        else if (rawDiff === 'moderate' || rawDiff.includes('moderate') || rawDiff === 'medium') normDifficulty = 'moderate';
        else if (rawDiff === 'hard' || rawDiff === 'challenging' || rawDiff.includes('hard') || rawDiff.includes('challenging')) normDifficulty = 'challenging';

        if (!normDifficulty) {
            return res.status(400).json({
                success: false,
                message: 'Invalid difficulty rating. Expected Easy, Moderate, or Challenging.',
            });
        }

        let normClarity = 5;
        if (body.clarityRating !== undefined && body.clarityRating !== null && body.clarityRating !== '') {
            if (typeof body.clarityRating === 'number' || /^\d+$/.test(String(body.clarityRating).trim())) {
                normClarity = Number(body.clarityRating);
                if (normClarity < 1 || normClarity > 5) {
                    return res.status(400).json({ success: false, message: 'Question clarity rating must be between 1 and 5' });
                }
            } else {
                const cLabel = String(body.clarityRating).trim().toLowerCase();
                if (cLabel === 'clear') normClarity = 5;
                else if (cLabel === 'fair') normClarity = 3;
                else if (cLabel === 'unclear') normClarity = 1;
                else return res.status(400).json({ success: false, message: 'Invalid question clarity rating' });
            }
        }

        let normUi = 5;
        const rawPortal = body.uiRating !== undefined ? body.uiRating : body.portalRating;
        if (rawPortal !== undefined && rawPortal !== null && rawPortal !== '') {
            normUi = Number(rawPortal);
            if (!Number.isFinite(normUi) || normUi < 1 || normUi > 5) {
                return res.status(400).json({ success: false, message: 'Portal experience rating must be between 1 and 5' });
            }
        }

        const configStatus = SHEETDB_CONFIG.getStatus();
        if (!configStatus.ready) {
            const mapped = mapFeedbackFailure({ errorCode: 'CONFIG_MISSING' });
            return res.status(mapped.httpStatus).json({
                success: false,
                errorCode: mapped.errorCode,
                retryable: mapped.retryable,
                message: mapped.message,
            });
        }

        if (inFlightFeedbackRefs.has(rawSessionId)) {
            return res.status(409).json({
                success: false,
                message: 'Feedback submission is already in progress.',
            });
        }
        inFlightFeedbackRefs.add(rawSessionId);

        try {
            // 2. Verify completed result exists in SheetDB `Scholarship_Results` (or runtime session)
            const resultLookup = await findScholarshipResult({ sessionId: rawSessionId });
            if (!resultLookup.ok) {
                const mapped = mapFeedbackFailure(resultLookup);
                return res.status(mapped.httpStatus).json({
                    success: false,
                    errorCode: mapped.errorCode,
                    retryable: mapped.retryable,
                    message: mapped.message,
                });
            }

            if (!resultLookup.found || !resultLookup.result) {
                if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(rawSessionId)) {
                    const live = await TestSession.findById(rawSessionId).select('status registrationToken').lean();
                    if (live && live.status !== 'completed') {
                        return res.status(400).json({
                            success: false,
                            message: 'Feedback can only be submitted after completing the examination',
                        });
                    }
                }
                return res.status(404).json({
                    success: false,
                    message: 'Completed examination scorecard not found',
                });
            }

            const savedResult = resultLookup.result;

            // 3. Enforce strict candidate ownership
            const auth = authorizeScholarshipRequest(req, {
                expectedApplicationNumber: savedResult.registrationToken,
                expectedStudentRef: savedResult.studentReferenceId || null,
                expectedSessionId: savedResult.sessionId || rawSessionId,
            });
            if (!auth.ok) {
                return res.status(auth.statusCode).json({
                    success: false,
                    reason: auth.reason,
                    message: auth.message,
                });
            }

            // 4. Prevent duplicate feedback submission (runtime flag + SheetDB `Scholarship_Feedback` lookup)
            let runtimeStub = null;
            if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(rawSessionId)) {
                runtimeStub = await TestSession.findById(rawSessionId).select('feedbackSubmitted');
                if (runtimeStub?.feedbackSubmitted) {
                    return res.status(409).json({
                        success: false,
                        errorCode: 'DUPLICATE_FEEDBACK',
                        message: 'Feedback has already been submitted for this examination',
                    });
                }
            }

            const existingFb = await findScholarshipFeedbackByResultRef(savedResult.resultReferenceId);
            if (!existingFb.ok) {
                const mapped = mapFeedbackFailure(existingFb);
                return res.status(mapped.httpStatus).json({
                    success: false,
                    errorCode: mapped.errorCode,
                    retryable: mapped.retryable,
                    message: mapped.message,
                });
            }

            if (existingFb.found) {
                if (runtimeStub) {
                    runtimeStub.feedbackSubmitted = true;
                    await runtimeStub.save().catch(() => {});
                }
                return res.status(409).json({
                    success: false,
                    errorCode: 'DUPLICATE_FEEDBACK',
                    message: 'Feedback has already been submitted for this examination',
                });
            }

            // Resolve candidate name & student_reference_id
            let studentName = savedResult.candidateName || '';
            let studentReferenceId = savedResult.studentReferenceId || '';
            if (!studentName || !studentReferenceId) {
                const stuLookup = await findScholarshipStudentByToken(savedResult.registrationToken);
                if (stuLookup.ok && stuLookup.found && stuLookup.student) {
                    studentName = studentName || stuLookup.student.name;
                    studentReferenceId = studentReferenceId || stuLookup.student.studentReferenceId;
                }
            }

            const feedbackReferenceId = generateFeedbackReferenceId();
            const feedbackSheetPayload = mapFeedbackToSheetRow({
                feedbackReferenceId,
                studentReferenceId,
                resultReferenceId: savedResult.resultReferenceId,
                registrationToken: savedResult.registrationToken,
                studentName: studentName || 'Candidate',
                overallRating: Math.round(normOverall),
                difficultyRating: normDifficulty,
                clarityRating: Math.round(normClarity),
                uiRating: Math.round(normUi),
                comments: body.comments ? String(body.comments).trim().slice(0, 1000) : '',
                language: body.language === 'Tamil' || savedResult.language === 'Tamil' ? 'Tamil' : 'English',
                createdAt: new Date(),
            });

            // 5. Persist directly to SheetDB `Scholarship_Feedback` (NEVER dual-write to ScholarshipExamFeedback in MongoDB)
            const writeResult = await appendRowWithReconcile(
                SHEETDB_CONFIG.tabs.FEEDBACK,
                feedbackSheetPayload,
                {
                    uniqueColumn: 'result_reference_id',
                    uniqueValue: savedResult.resultReferenceId,
                    timeoutMs: SHEETDB_CONFIG.interactiveTimeoutMs,
                    maxAttempts: 2,
                }
            );

            if (!writeResult.success) {
                const mapped = mapFeedbackFailure(writeResult);
                return res.status(mapped.httpStatus).json({
                    success: false,
                    errorCode: mapped.errorCode,
                    retryable: mapped.retryable,
                    message: mapped.message,
                });
            }

            // 6. SheetDB write confirmed -> cache feedback row & mark transient session flag
            const cached = cacheFeedbackRow(feedbackSheetPayload);
            if (runtimeStub) {
                runtimeStub.feedbackSubmitted = true;
                await runtimeStub.save().catch(() => {});
            }

            return res.status(201).json({
                success: true,
                message: 'Thank you! Your feedback has been recorded successfully.',
                data: cached,
            });
        } catch (error) {
            console.error('[Scholarship Submit Feedback Error]:', error?.name || 'Error');
            return res.status(500).json({
                success: false,
                message: 'Failed to record feedback',
            });
        } finally {
            inFlightFeedbackRefs.delete(rawSessionId);
        }
    }

    if (req.method === 'GET') {
        try {
            const rawSessionId = req.query?.sessionId ? String(req.query.sessionId).trim() : '';

            if (rawSessionId) {
                const resultLookup = await findScholarshipResult({ sessionId: rawSessionId });
                if (!resultLookup.ok || !resultLookup.found) {
                    return res.status(404).json({ success: false, message: 'Result reference not found' });
                }

                const auth = authorizeScholarshipRequest(req, {
                    expectedApplicationNumber: resultLookup.result.registrationToken,
                    expectedStudentRef: resultLookup.result.studentReferenceId || null,
                    expectedSessionId: rawSessionId,
                    allowAdminPermission: 'scholarship_exam:view',
                });
                if (!auth.ok) {
                    return res.status(auth.statusCode).json({ success: false, message: auth.message });
                }

                const fbCheck = await findScholarshipFeedbackByResultRef(resultLookup.result.resultReferenceId);
                return res.status(200).json({
                    success: true,
                    submitted: Boolean(fbCheck.ok && fbCheck.found),
                    data: fbCheck.found ? fbCheck.feedback : null,
                });
            }

            // Summary metrics require admin permission `scholarship_exam:view`
            const adminAuth = authorizeScholarshipRequest(req, { allowAdminPermission: 'scholarship_exam:view' });
            if (!adminAuth.ok || !adminAuth.isAdmin) {
                return res.status(adminAuth.ok ? 403 : adminAuth.statusCode).json({
                    success: false,
                    message: 'Forbidden: Administrative access required',
                });
            }

            const dataset = await fetchAdminScholarshipDataset();
            const feedbackList = dataset.feedback || [];
            const totalFeedbacks = feedbackList.length;
            const avgRating = totalFeedbacks > 0
                ? Number((feedbackList.reduce((acc, f) => acc + (f.overallRating || 0), 0) / totalFeedbacks).toFixed(2))
                : 0;
            const avgPortal = totalFeedbacks > 0
                ? Number((feedbackList.reduce((acc, f) => acc + (f.uiRating || 0), 0) / totalFeedbacks).toFixed(2))
                : 0;

            const diffCounts = {};
            for (const f of feedbackList) {
                const d = f.difficultyRating || 'moderate';
                diffCounts[d] = (diffCounts[d] || 0) + 1;
            }
            const difficultyBreakdown = Object.entries(diffCounts).map(([_id, count]) => ({ _id, count }));

            return res.status(200).json({
                success: true,
                total: totalFeedbacks,
                averages: { avgRating, avgPortal },
                difficultyBreakdown,
                feedback: feedbackList,
            });
        } catch (error) {
            console.error('[Scholarship Get Feedback Error]:', error?.name || 'Error');
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve feedback data',
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}
