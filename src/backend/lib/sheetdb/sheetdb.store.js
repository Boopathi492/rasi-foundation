/**
 * SheetDB Scholarship Data Store & Short-TTL Cache Layer
 *
 * Centralizes read/write coordination for:
 *   - Scholarship_Students  (32 columns)
 *   - Scholarship_Results   (22 columns)
 *   - Scholarship_Feedback  (12 columns)
 *
 * Quota discipline (SheetDB Free Tier ~500 requests/month, 90 req/min):
 *   - Point lookups use exact `/search` queries and a 60-second per-instance cache.
 *   - Freshly written rows are seeded directly into cache so immediate follow-up steps
 *     (e.g. Register -> Start Exam -> Submit -> Result -> PDF Download) avoid redundant GETs.
 *   - Admin list/analytics views share a 45-second tab cache invalidated on every write.
 *   - Legacy pre-refactor MongoDB records are supported as a read-only fallback without
 *     writing any new student profiles, scorecards, or feedback to MongoDB.
 */

import mongoose from 'mongoose';
import ScholarshipStudent from '../../models/ScholarshipStudent.js';
import TestSession from '../../models/TestSession.js';
import ScholarshipExamFeedback from '../../models/ScholarshipExamFeedback.js';
import { SHEETDB_CONFIG } from './sheetdb.config.js';
import {
    searchRow,
    listAllRows,
    countRows,
} from './sheetdb.service.js';
import {
    normalizeSheetStudentRow,
    normalizeSheetResultRow,
    normalizeSheetFeedbackRow,
} from './sheetdb.mappings.js';

const POINT_TTL_MS = 60 * 1000; // 60s for individual candidate/result lookups
const ADMIN_TTL_MS = 45 * 1000; // 45s for admin full-tab snapshots & counts
const MAX_POINT_ENTRIES = 500;

const studentByTokenCache = new Map();
const resultBySessionCache = new Map();
const resultByTokenCache = new Map();
const feedbackByResultCache = new Map();

let adminDatasetCache = { expiresAt: 0, data: null };
let studentCountCache = { expiresAt: 0, count: null };

function putBounded(map, key, value, ttlMs = POINT_TTL_MS) {
    if (!key) return;
    const normKey = String(key).trim().toUpperCase();
    const now = Date.now();
    if (map.size >= MAX_POINT_ENTRIES) {
        for (const [k, entry] of map) {
            if (entry.expiresAt <= now) map.delete(k);
        }
        if (map.size >= MAX_POINT_ENTRIES) map.clear();
    }
    map.set(normKey, { value, expiresAt: now + ttlMs });
}

function getBounded(map, key) {
    if (!key) return null;
    const normKey = String(key).trim().toUpperCase();
    const entry = map.get(normKey);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
        map.delete(normKey);
        return null;
    }
    return entry.value;
}

/**
 * Seeds a newly written `Scholarship_Students` row into point cache and invalidates list/count caches.
 */
export function cacheStudentRow(rawOrNormalizedRow) {
    const normalized = rawOrNormalizedRow?.source === 'sheetdb'
        ? rawOrNormalizedRow
        : normalizeSheetStudentRow(rawOrNormalizedRow);
    if (normalized?.registrationToken) {
        putBounded(studentByTokenCache, normalized.registrationToken, normalized);
    }
    adminDatasetCache = { expiresAt: 0, data: null };
    studentCountCache = { expiresAt: 0, count: null };
    return normalized;
}

/**
 * Seeds a newly written `Scholarship_Results` row into point cache and invalidates admin list cache.
 */
export function cacheResultRow(rawOrNormalizedRow) {
    const normalized = rawOrNormalizedRow?.source === 'sheetdb'
        ? rawOrNormalizedRow
        : normalizeSheetResultRow(rawOrNormalizedRow);
    if (normalized?.sessionId) {
        putBounded(resultBySessionCache, normalized.sessionId, normalized);
    }
    if (normalized?.registrationToken) {
        putBounded(resultByTokenCache, normalized.registrationToken, normalized);
    }
    adminDatasetCache = { expiresAt: 0, data: null };
    return normalized;
}

/**
 * Seeds a newly written `Scholarship_Feedback` row into point cache and invalidates admin list cache.
 */
export function cacheFeedbackRow(rawOrNormalizedRow) {
    const normalized = rawOrNormalizedRow?.source === 'sheetdb'
        ? rawOrNormalizedRow
        : normalizeSheetFeedbackRow(rawOrNormalizedRow);
    if (normalized?.resultReferenceId) {
        putBounded(feedbackByResultCache, normalized.resultReferenceId, normalized);
    }
    adminDatasetCache = { expiresAt: 0, data: null };
    return normalized;
}

/** Test & admin helper to clear all in-memory SheetDB caches. */
export function invalidateSheetDBStoreCache() {
    studentByTokenCache.clear();
    resultBySessionCache.clear();
    resultByTokenCache.clear();
    feedbackByResultCache.clear();
    adminDatasetCache = { expiresAt: 0, data: null };
    studentCountCache = { expiresAt: 0, count: null };
}

function normalizeLegacyMongoStudent(doc) {
    if (!doc) return null;
    const rawAadhaar = doc.aadhaarNumber ? String(doc.aadhaarNumber).replace(/\D/g, '') : '';
    return {
        studentReferenceId: String(doc._id),
        legacyMongoId: doc._id,
        registrationToken: String(doc.registrationToken || '').trim(),
        name: String(doc.name || '').trim(),
        gender: doc.gender || 'Other',
        dateOfBirth: doc.dateOfBirth ? new Date(doc.dateOfBirth).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) : '',
        fatherName: doc.fatherName || '',
        community: doc.community || '',
        address: doc.address || '',
        studentMobile: String(doc.studentMobile || '').replace(/\D/g, ''),
        studentEmail: String(doc.studentEmail || '').trim().toLowerCase(),
        fatherMobile: String(doc.fatherMobile || '').replace(/\D/g, ''),
        motherMobile: String(doc.motherMobile || '').replace(/\D/g, ''),
        maskedAadhaar: rawAadhaar.length >= 4 ? `XXXX-XXXX-${rawAadhaar.slice(-4)}` : '',
        currentClass: doc.currentClass || '12th Standard (+2)',
        academicYear: doc.academicYear || '2025-2026',
        board: doc.board || 'Tamil Nadu State Board',
        plus2Group: doc.plus2Group || 'Academic',
        plus2ExamNumber: doc.plus2ExamNumber || '',
        expectedCutOff: Number(doc.expectedCutOff || 0),
        lastStudiedSchool: doc.lastStudiedSchool || '',
        studiedInGovtSchool: Boolean(doc.studiedInGovtSchool),
        firstGenerationGraduate: Boolean(doc.firstGenerationGraduate),
        preferredDistrict: doc.preferredDistrict || '',
        collegeName: doc.collegeName || '',
        admissionCourse: doc.admissionCourse || '',
        preferredColleges: Array.isArray(doc.preferredColleges) ? doc.preferredColleges : [],
        selectedElective: doc.selectedElective || doc.thirdSubject || 'Mathematics',
        thirdSubject: doc.thirdSubject || doc.selectedElective || 'Mathematics',
        examLanguage: doc.examLanguage === 'Tamil' ? 'Tamil' : 'English',
        pageSize: 5,
        testStatus: doc.testStatus || 'registered',
        registrationDate: doc.createdAt ? new Date(doc.createdAt).toISOString() : '',
        source: 'legacy_mongodb',
    };
}

/**
 * Looks up a candidate by `application_number` (`RASI-...`) in SheetDB first, with read-only
 * fallback to pre-existing legacy MongoDB records.
 */
export async function findScholarshipStudentByToken(
    applicationNumber,
    { allowLegacyMongo = true, bypassCache = false, timeoutMs = SHEETDB_CONFIG.interactiveTimeoutMs } = {}
) {
    const token = String(applicationNumber || '').trim().toUpperCase();
    if (!token) {
        return { ok: false, found: false, statusCode: 400, errorCode: 'BAD_REQUEST', error: 'Registration token is required' };
    }

    if (!bypassCache) {
        const cached = getBounded(studentByTokenCache, token);
        if (cached) return { ok: true, found: true, student: cached, source: cached.source };
    }

    const search = await searchRow(SHEETDB_CONFIG.tabs.STUDENTS, 'application_number', token, { timeoutMs });
    if (search.success && search.found && search.records[0]) {
        const normalized = cacheStudentRow(search.records[0]);
        return { ok: true, found: true, student: normalized, source: 'sheetdb' };
    }

    if (allowLegacyMongo && mongoose.connection.readyState === 1) {
        const legacy = await ScholarshipStudent.findOne({ registrationToken: token }).lean();
        if (legacy) {
            const normalized = normalizeLegacyMongoStudent(legacy);
            putBounded(studentByTokenCache, token, normalized);
            return { ok: true, found: true, student: normalized, source: 'legacy_mongodb' };
        }
    }

    if (!search.success) {
        return {
            ok: false,
            found: false,
            statusCode: search.statusCode || 503,
            errorCode: search.errorCode || 'SHEETDB_ERROR',
            error: search.error || 'Unable to verify registration record at this moment',
            retryable: Boolean(search.retryable),
        };
    }

    return { ok: true, found: false, student: null };
}

/**
 * Looks up an authoritative completed scorecard from `Scholarship_Results` (by `sessionId` or `applicationNumber`),
 * falling back to legacy/unsynced completed `TestSession` in MongoDB only when needed.
 */
export async function findScholarshipResult(
    { sessionId = null, applicationNumber = null },
    { allowLegacyMongo = true, bypassCache = false, timeoutMs = SHEETDB_CONFIG.interactiveTimeoutMs } = {}
) {
    const cleanSessionId = sessionId ? String(sessionId).trim() : '';
    const cleanToken = applicationNumber ? String(applicationNumber).trim().toUpperCase() : '';

    if (!bypassCache) {
        if (cleanSessionId) {
            const cached = getBounded(resultBySessionCache, cleanSessionId);
            if (cached) return { ok: true, found: true, result: cached, source: cached.source };
        }
        if (cleanToken) {
            const cached = getBounded(resultByTokenCache, cleanToken);
            if (cached) return { ok: true, found: true, result: cached, source: cached.source };
        }
    }

    const searchCol = cleanSessionId ? 'result_reference_id' : 'application_number';
    const searchVal = cleanSessionId || cleanToken;
    if (!searchVal) {
        return { ok: false, found: false, statusCode: 400, errorCode: 'BAD_REQUEST', error: 'Session ID or registration token is required' };
    }

    const search = await searchRow(SHEETDB_CONFIG.tabs.RESULTS, searchCol, searchVal, { timeoutMs });
    if (search.success && search.found && search.records[0]) {
        const normalized = cacheResultRow(search.records[0]);
        return { ok: true, found: true, result: normalized, source: 'sheetdb' };
    }

    if (allowLegacyMongo && mongoose.connection.readyState === 1) {
        let legacySession = null;
        if (cleanSessionId && mongoose.Types.ObjectId.isValid(cleanSessionId)) {
            legacySession = await TestSession.findById(cleanSessionId).lean();
        } else if (cleanToken) {
            legacySession = await TestSession.findOne({ registrationToken: cleanToken }).lean();
        }
        if (legacySession && legacySession.status === 'completed') {
            const subjects = Array.isArray(legacySession.subjects) && legacySession.subjects.length === 3
                ? legacySession.subjects
                : ['Physics', 'Chemistry', legacySession.optionalSubject || 'Mathematics'];
            const totalQuestions = legacySession.totalQuestions || 60;
            const subjectWiseScores = subjects.map((sub) => {
                const count = Array.isArray(legacySession.questions) && legacySession.questions.length > 0
                    ? legacySession.questions.filter((q) => q.subject === sub).length || 20
                    : 20;
                const correct = legacySession.subjectWiseScore?.[sub] || 0;
                return {
                    subject: sub,
                    correct,
                    total: count,
                    percentage: count > 0 ? Math.round((correct / count) * 100) : 0,
                };
            });
            const normalizedLegacy = {
                resultReferenceId: String(legacySession._id),
                sessionId: String(legacySession._id),
                studentReferenceId: String(legacySession.studentReferenceId || legacySession.studentId || ''),
                registrationToken: String(legacySession.registrationToken || ''),
                candidateName: legacySession.candidateName || '',
                studentMobile: legacySession.studentMobile || '',
                examDate: legacySession.endTime ? new Date(legacySession.endTime).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) : '',
                language: legacySession.language || 'English',
                optionalSubject: legacySession.optionalSubject || subjects[2] || 'Mathematics',
                score: legacySession.score || 0,
                maximumMarks: totalQuestions,
                percentage: legacySession.percentage ?? (totalQuestions > 0 ? Math.round(((legacySession.score || 0) / totalQuestions) * 100) : 0),
                totalQuestions,
                attemptedQuestions: legacySession.attemptedQuestions || 0,
                correctAnswers: legacySession.correctAnswers || 0,
                wrongAnswers: legacySession.wrongAnswers ?? Math.max(0, (legacySession.attemptedQuestions || 0) - (legacySession.correctAnswers || 0)),
                unattempted: legacySession.unattemptedQuestions ?? Math.max(0, totalQuestions - (legacySession.attemptedQuestions || 0)),
                timeTaken: legacySession.endTime && legacySession.startTime
                    ? Math.max(0, Math.round((new Date(legacySession.endTime) - new Date(legacySession.startTime)) / 60000))
                    : 0,
                status: 'completed',
                submittedAt: legacySession.endTime ? new Date(legacySession.endTime).toISOString() : '',
                feedbackSubmitted: Boolean(legacySession.feedbackSubmitted),
                subjectWiseScores,
                source: 'legacy_mongodb',
            };
            return { ok: true, found: true, result: normalizedLegacy, source: 'legacy_mongodb' };
        }
    }

    if (!search.success) {
        return {
            ok: false,
            found: false,
            statusCode: search.statusCode || 503,
            errorCode: search.errorCode || 'SHEETDB_ERROR',
            error: search.error || 'Unable to fetch examination result at this moment',
            retryable: Boolean(search.retryable),
        };
    }

    return { ok: true, found: false, result: null };
}

/**
 * Checks if feedback already exists in `Scholarship_Feedback` for a `result_reference_id`.
 */
export async function findScholarshipFeedbackByResultRef(
    resultReferenceId,
    { bypassCache = false, timeoutMs = SHEETDB_CONFIG.interactiveTimeoutMs } = {}
) {
    const refId = String(resultReferenceId || '').trim();
    if (!refId) return { ok: false, found: false, errorCode: 'BAD_REQUEST', error: 'Result reference ID is required' };

    if (!bypassCache) {
        const cached = getBounded(feedbackByResultCache, refId);
        if (cached) return { ok: true, found: true, feedback: cached };
    }

    const search = await searchRow(SHEETDB_CONFIG.tabs.FEEDBACK, 'result_reference_id', refId, { timeoutMs });
    if (search.success && search.found && search.records[0]) {
        const normalized = cacheFeedbackRow(search.records[0]);
        return { ok: true, found: true, feedback: normalized };
    }
    if (!search.success) {
        return { ok: false, found: false, statusCode: search.statusCode, errorCode: search.errorCode, error: search.error, retryable: search.retryable };
    }
    return { ok: true, found: false, feedback: null };
}

/**
 * Returns total scholarship registrations for Admin Dashboard overview using a 60s cache.
 */
export async function getCachedScholarshipCount() {
    if (studentCountCache.expiresAt > Date.now() && typeof studentCountCache.count === 'number') {
        return studentCountCache.count;
    }
    if (adminDatasetCache.expiresAt > Date.now() && adminDatasetCache.data) {
        return adminDatasetCache.data.students.length;
    }

    const countRes = await countRows(SHEETDB_CONFIG.tabs.STUDENTS, { timeoutMs: 3500 });
    if (countRes.success) {
        studentCountCache = { count: countRes.count, expiresAt: Date.now() + POINT_TTL_MS };
        return countRes.count;
    }

    if (mongoose.connection.readyState === 1) {
        return ScholarshipStudent.countDocuments().catch(() => 0);
    }
    return 0;
}

/**
 * Loads and joins `Scholarship_Students`, `Scholarship_Results`, and `Scholarship_Feedback`
 * from SheetDB (cached 45s) + active runtime `TestSession` state + any unsynced legacy records.
 */
export async function fetchAdminScholarshipDataset({ forceRefresh = false } = {}) {
    if (!forceRefresh && adminDatasetCache.expiresAt > Date.now() && adminDatasetCache.data) {
        return adminDatasetCache.data;
    }

    const [studentsRes, resultsRes, feedbackRes] = await Promise.all([
        listAllRows(SHEETDB_CONFIG.tabs.STUDENTS, { timeoutMs: SHEETDB_CONFIG.timeoutMs }),
        listAllRows(SHEETDB_CONFIG.tabs.RESULTS, { timeoutMs: SHEETDB_CONFIG.timeoutMs }),
        listAllRows(SHEETDB_CONFIG.tabs.FEEDBACK, { timeoutMs: SHEETDB_CONFIG.timeoutMs }),
    ]);

    const sheetStudents = studentsRes.success ? studentsRes.rows.map(normalizeSheetStudentRow).filter(Boolean) : [];
    const sheetResults = resultsRes.success ? resultsRes.rows.map(normalizeSheetResultRow).filter(Boolean) : [];
    const sheetFeedback = feedbackRes.success ? feedbackRes.rows.map(normalizeSheetFeedbackRow).filter(Boolean) : [];

    // Index by uppercase application_number for O(1) joins
    const studentByAppNo = new Map();
    for (const s of sheetStudents) {
        if (s.registrationToken) studentByAppNo.set(s.registrationToken.toUpperCase(), s);
    }

    const resultByAppNo = new Map();
    for (const r of sheetResults) {
        if (r.registrationToken) resultByAppNo.set(r.registrationToken.toUpperCase(), r);
    }

    const feedbackByAppNo = new Map();
    const feedbackByResultRef = new Map();
    for (const fb of sheetFeedback) {
        if (fb.registrationToken) feedbackByAppNo.set(fb.registrationToken.toUpperCase(), fb);
        if (fb.resultReferenceId) feedbackByResultRef.set(fb.resultReferenceId, fb);
    }

    // Merge active runtime sessions & any legacy unsynced MongoDB records without duplicating synced rows
    let activeSessions = [];
    if (mongoose.connection.readyState === 1) {
        const [legacyStudents, mongoSessions, legacyFeedbacks] = await Promise.all([
            ScholarshipStudent.find().lean().catch(() => []),
            TestSession.find()
                .select('-questions.snapshot -answers')
                .lean()
                .catch(() => []),
            ScholarshipExamFeedback.find().lean().catch(() => []),
        ]);

        for (const leg of legacyStudents) {
            const key = String(leg.registrationToken || '').trim().toUpperCase();
            if (key && !studentByAppNo.has(key)) {
                studentByAppNo.set(key, normalizeLegacyMongoStudent(leg));
            }
        }

        activeSessions = mongoSessions;
        for (const sess of mongoSessions) {
            const key = String(sess.registrationToken || '').trim().toUpperCase();
            if (sess.status === 'completed' && key && !resultByAppNo.has(key)) {
                resultByAppNo.set(key, {
                    resultReferenceId: String(sess._id),
                    sessionId: String(sess._id),
                    studentReferenceId: String(sess.studentReferenceId || sess.studentId || ''),
                    registrationToken: sess.registrationToken,
                    candidateName: sess.candidateName || studentByAppNo.get(key)?.name || '',
                    studentMobile: sess.studentMobile || studentByAppNo.get(key)?.studentMobile || '',
                    examDate: sess.endTime ? new Date(sess.endTime).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }) : '',
                    language: sess.language || 'English',
                    optionalSubject: sess.optionalSubject || 'Mathematics',
                    physicsScore: sess.subjectWiseScore?.Physics || 0,
                    chemistryScore: sess.subjectWiseScore?.Chemistry || 0,
                    electiveScore: sess.subjectWiseScore?.[sess.optionalSubject || 'Mathematics'] || 0,
                    score: sess.score || 0,
                    maximumMarks: sess.totalQuestions || 60,
                    percentage: sess.percentage || 0,
                    totalQuestions: sess.totalQuestions || 60,
                    attemptedQuestions: sess.attemptedQuestions || 0,
                    correctAnswers: sess.correctAnswers || 0,
                    wrongAnswers: sess.wrongAnswers || 0,
                    unattempted: sess.unattemptedQuestions || 0,
                    timeTaken: sess.endTime && sess.startTime ? Math.max(0, Math.round((new Date(sess.endTime) - new Date(sess.startTime)) / 60000)) : 0,
                    status: 'completed',
                    submittedAt: sess.endTime ? new Date(sess.endTime).toISOString() : '',
                    source: 'legacy_mongodb',
                });
            }
        }

        for (const lfb of legacyFeedbacks) {
            const refId = String(lfb.testSessionId || '');
            const key = String(lfb.registrationToken || '').trim().toUpperCase();
            if (refId && !feedbackByResultRef.has(refId) && (!key || !feedbackByAppNo.has(key))) {
                const normFb = {
                    feedbackReferenceId: String(lfb._id),
                    studentReferenceId: String(lfb.studentId || ''),
                    resultReferenceId: refId,
                    registrationToken: lfb.registrationToken || '',
                    studentName: lfb.studentName || '',
                    overallRating: lfb.overallRating || 5,
                    difficultyRating: lfb.difficultyRating || 'moderate',
                    clarityRating: lfb.clarityRating || 5,
                    uiRating: lfb.uiRating || 5,
                    comments: lfb.comments || '',
                    language: lfb.language || 'English',
                    submittedAt: lfb.createdAt ? new Date(lfb.createdAt).toISOString() : '',
                    source: 'legacy_mongodb',
                };
                if (key) feedbackByAppNo.set(key, normFb);
                if (refId) feedbackByResultRef.set(refId, normFb);
            }
        }
    }

    const sessionByAppNo = new Map();
    for (const s of activeSessions) {
        const key = String(s.registrationToken || '').trim().toUpperCase();
        if (key) sessionByAppNo.set(key, s);
    }

    // Build unified candidate records across Students + Results + Active Sessions + Feedback
    const allKeys = new Set([
        ...studentByAppNo.keys(),
        ...resultByAppNo.keys(),
        ...sessionByAppNo.keys(),
    ]);

    const unified = [];
    for (const key of allKeys) {
        const student = studentByAppNo.get(key) || null;
        const result = resultByAppNo.get(key) || null;
        const liveSession = sessionByAppNo.get(key) || null;
        const feedback = (result?.resultReferenceId && feedbackByResultRef.get(result.resultReferenceId))
            || feedbackByAppNo.get(key)
            || null;

        let examStatus = 'registered';
        if (result) {
            examStatus = 'completed';
        } else if (liveSession) {
            if (liveSession.status === 'in_progress') {
                const end = new Date(new Date(liveSession.startTime).getTime() + (liveSession.duration || 90) * 60000);
                examStatus = new Date() > end ? 'expired' : 'in_progress';
            } else {
                examStatus = liveSession.status || 'registered';
            }
        } else if (student?.testStatus && student.testStatus !== 'registered') {
            examStatus = student.testStatus;
        }

        unified.push({
            _id: result?.resultReferenceId || (liveSession?._id ? String(liveSession._id) : null) || student?.studentReferenceId || key,
            studentReferenceId: student?.studentReferenceId || result?.studentReferenceId || '',
            registrationToken: student?.registrationToken || result?.registrationToken || liveSession?.registrationToken || key,
            status: examStatus,
            score: result ? result.score : null,
            totalQuestions: result ? result.totalQuestions : (liveSession?.totalQuestions || 60),
            percentage: result ? result.percentage : null,
            attemptedQuestions: result ? result.attemptedQuestions : null,
            correctAnswers: result ? result.correctAnswers : null,
            wrongAnswers: result ? result.wrongAnswers : null,
            unansweredQuestions: result ? result.unattempted : null,
            timeTakenMinutes: result ? result.timeTaken : null,
            language: result?.language || liveSession?.language || student?.examLanguage || 'English',
            optionalSubject: result?.optionalSubject || liveSession?.optionalSubject || student?.selectedElective || 'Mathematics',
            subjectWiseScore: result?.subjectWiseScore || liveSession?.subjectWiseScore || null,
            createdAt: result?.submittedAt || result?.examDate || student?.registrationDate || (liveSession?.createdAt ? new Date(liveSession.createdAt).toISOString() : ''),
            source: result?.source || student?.source || 'sheetdb',
            student: student || {
                name: result?.candidateName || liveSession?.candidateName || 'Candidate',
                studentMobile: result?.studentMobile || liveSession?.studentMobile || '',
                studentEmail: '',
                plus2Group: liveSession?.plus2Group || '',
                admissionCourse: liveSession?.admissionCourse || '',
                collegeName: liveSession?.collegeName || '',
                registrationToken: result?.registrationToken || key,
            },
            // Keep backwards-compatible `studentId` shape used by existing Admin UI components
            studentId: {
                name: student?.name || result?.candidateName || liveSession?.candidateName || 'Unknown',
                studentEmail: student?.studentEmail || '',
                studentMobile: student?.studentMobile || result?.studentMobile || liveSession?.studentMobile || '',
                fatherName: student?.fatherName || '',
                fatherMobile: student?.fatherMobile || '',
                gender: student?.gender || '',
                dateOfBirth: student?.dateOfBirth || '',
                community: student?.community || '',
                address: student?.address || '',
                maskedAadhaar: student?.maskedAadhaar || '',
                board: student?.board || '',
                currentClass: student?.currentClass || '',
                academicYear: student?.academicYear || '',
                plus2Group: student?.plus2Group || liveSession?.plus2Group || '',
                plus2ExamNumber: student?.plus2ExamNumber || '',
                expectedCutOff: student?.expectedCutOff ?? null,
                lastStudiedSchool: student?.lastStudiedSchool || '',
                studiedInGovtSchool: student?.studiedInGovtSchool ?? false,
                firstGenerationGraduate: student?.firstGenerationGraduate ?? false,
                preferredDistrict: student?.preferredDistrict || '',
                admissionCourse: student?.admissionCourse || liveSession?.admissionCourse || '',
                collegeName: student?.collegeName || liveSession?.collegeName || '',
                preferredCollege2: student?.preferredCollege2 || '',
                preferredCourse2: student?.preferredCourse2 || '',
                selectedElective: student?.selectedElective || result?.optionalSubject || '',
                examLanguage: student?.examLanguage || result?.language || 'English',
                registrationDate: student?.registrationDate || '',
            },
            result,
            feedback,
        });
    }

    const payload = {
        sheetdbHealthy: studentsRes.success && resultsRes.success && feedbackRes.success,
        sheetdbErrors: [
            !studentsRes.success ? `Scholarship_Students: ${studentsRes.error}` : null,
            !resultsRes.success ? `Scholarship_Results: ${resultsRes.error}` : null,
            !feedbackRes.success ? `Scholarship_Feedback: ${feedbackRes.error}` : null,
        ].filter(Boolean),
        students: [...studentByAppNo.values()],
        results: [...resultByAppNo.values()],
        feedback: [...feedbackByResultRef.values(), ...[...feedbackByAppNo.values()].filter((f) => !f.resultReferenceId)],
        unified,
    };

    if (payload.sheetdbHealthy) {
        adminDatasetCache = { data: payload, expiresAt: Date.now() + ADMIN_TTL_MS };
        studentCountCache = { count: payload.students.length, expiresAt: Date.now() + POINT_TTL_MS };
    }

    return payload;
}
