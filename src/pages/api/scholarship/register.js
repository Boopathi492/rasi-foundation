import crypto from 'node:crypto';
import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import ScholarshipRegistrationLock from '../../../backend/models/ScholarshipRegistrationLock.js';
import StudentDocument from '../../../backend/models/StudentDocument.js';
import {
    SHEETDB_CONFIG,
    mapStudentToSheetRow,
    searchRows,
    appendRowWithReconcile,
    cacheStudentRow,
} from '../../../backend/lib/sheetdb/index.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import {
    hashIdentityKey,
    issueScholarshipSession,
} from '../../../backend/lib/scholarshipAuth.js';
import {
    DOCUMENT_TYPES,
    DOC_NAME_TO_TYPE,
    MAX_DOCUMENT_BYTES,
    resolveStoragePath,
    verifyDocumentToken,
} from '../../../backend/lib/uploads.js';

const registerRateLimiter = rateLimiter({ windowMs: 60_000, max: 20 });

// In-process concurrency guard (supplements MongoDB TTL lock and protects tests when DB is mocked/offline)
const inProcessPendingKeys = new Set();
const inProcessCompletedIdem = new Map();

const ALLOWED_COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST', 'Other'];
const ALLOWED_GENDERS = ['Male', 'Female', 'Other'];
const ALLOWED_GROUPS = ['Academic', 'Vocational', 'CBSE', 'ICSE', 'Other'];

function generateStudentReferenceId() {
    return `stu_${Date.now().toString(36)}_${crypto.randomBytes(5).toString('hex')}`;
}

function generateApplicationNumber() {
    const yearSuffix = String(new Date().getFullYear()).slice(-2);
    const partA = crypto.randomBytes(2).toString('hex').toUpperCase();
    const partB = String(crypto.randomInt(100, 1000));
    return `RASI-${yearSuffix}${partA}-${partB}`;
}

function containsBase64Blob(obj) {
    if (!obj || typeof obj !== 'object') return false;
    for (const val of Object.values(obj)) {
        if (typeof val === 'string') {
            if (/^data:[a-z0-9.+-]+\/[a-z0-9.+-]+;base64,/i.test(val.trim()) || val.length > 5000) {
                return true;
            }
        } else if (Array.isArray(val)) {
            for (const item of val) {
                if (containsBase64Blob(item)) return true;
            }
        }
    }
    return false;
}

function validateStagedDocuments(documentsList, uploadedDocuments) {
    const selectedNames = Array.isArray(documentsList) ? documentsList.map((d) => String(d).trim()).filter(Boolean) : [];
    const uploaded = Array.isArray(uploadedDocuments) ? uploadedDocuments : [];

    if (selectedNames.length === 0 && uploaded.length === 0) {
        return { ok: true, verifiedDocs: [] };
    }

    const allowedTypes = new Set(DOCUMENT_TYPES.map((d) => d.value));
    const verifiedDocs = [];

    for (const item of uploaded) {
        if (!item || typeof item !== 'object') {
            return { ok: false, message: 'Invalid document upload metadata' };
        }
        if (item.fileData || item.buffer) {
            return { ok: false, message: 'Raw base64 file payloads are not accepted; use staged document references.' };
        }
        const docType = String(item.documentType || '').trim();
        const storageKey = String(item.storageKey || '').trim();
        const size = Number(item.size || 0);
        const mime = String(item.mime || 'application/pdf').trim();
        const originalName = String(item.originalName || 'document').trim().slice(0, 120);
        const token = String(item.token || '').trim();

        if (!allowedTypes.has(docType)) {
            return { ok: false, message: `Invalid document type: ${docType || 'unknown'}` };
        }
        if (!Number.isFinite(size) || size <= 0 || size > MAX_DOCUMENT_BYTES) {
            return { ok: false, message: `Invalid file size for ${docType}` };
        }
        try {
            resolveStoragePath(storageKey);
        } catch {
            return { ok: false, message: `Invalid document storage reference for ${docType}` };
        }
        if (!verifyDocumentToken(token, storageKey, docType, size)) {
            return { ok: false, message: `Unverified or tampered upload token for ${docType}` };
        }

        verifiedDocs.push({ documentType: docType, storageKey, size, mime, originalName });
    }

    const uploadedTypeSet = new Set(verifiedDocs.map((d) => d.documentType));
    for (const docName of selectedNames) {
        const expectedType = DOC_NAME_TO_TYPE[docName];
        if (expectedType && !uploadedTypeSet.has(expectedType)) {
            return { ok: false, message: `Required document "${docName}" was selected but no verified upload reference was provided.` };
        }
    }

    return { ok: true, verifiedDocs };
}

function mapSheetFailureToHttp(failure) {
    const code = failure?.errorCode;
    if (code === 'CONFIG_MISSING') {
        return {
            httpStatus: 503,
            errorCode: 'CONFIG_MISSING',
            retryable: true,
            message: 'Scholarship registration service is temporarily unavailable due to server storage configuration. Please try again later.',
        };
    }
    if (code === 'AUTH_FAILED' || failure?.statusCode === 401 || failure?.statusCode === 403) {
        return {
            httpStatus: 502,
            errorCode: 'AUTH_FAILED',
            retryable: false,
            message: 'Scholarship registration storage authentication failed on the server. Please contact the helpdesk.',
        };
    }
    if (code === 'QUOTA_EXCEEDED' || failure?.statusCode === 402) {
        return {
            httpStatus: 503,
            errorCode: 'QUOTA_EXCEEDED',
            retryable: false,
            message: 'Scholarship registration portal has reached its current storage capacity. Please contact Rasi Foundation support.',
        };
    }
    if (code === 'RATE_LIMITED' || failure?.statusCode === 429) {
        return {
            httpStatus: 429,
            errorCode: 'RATE_LIMITED',
            retryable: true,
            message: 'High registration traffic detected. Please wait a few seconds and submit again.',
        };
    }
    if (code === 'TIMEOUT' || failure?.statusCode === 408) {
        return {
            httpStatus: 504,
            errorCode: 'TIMEOUT',
            retryable: true,
            message: 'Registration storage timed out before confirmation. Please click Submit again; duplicate protection is active.',
        };
    }
    return {
        httpStatus: 503,
        errorCode: code || 'SHEETDB_UNAVAILABLE',
        retryable: true,
        message: 'Unable to save your registration right now. Please retry in a moment.',
    };
}

/** Test helper to clear in-process registration state between isolated unit tests. */
export function resetRegistrationInProcessLocks() {
    inProcessPendingKeys.clear();
    inProcessCompletedIdem.clear();
}

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    if (process.env.DISABLE_SCHOLARSHIP_RATELIMIT !== 'true' && !registerRateLimiter(req, res)) {
        return res.status(429).json({
            success: false,
            errorCode: 'RATE_LIMITED',
            retryable: true,
            message: 'Too many registration attempts from this network. Please wait a minute and try again.',
        });
    }

    const body = req.body && typeof req.body === 'object' ? req.body : {};

    if (containsBase64Blob(body)) {
        return res.status(400).json({
            success: false,
            message: 'Inline base64 file blobs are not permitted in registration payloads.',
        });
    }

    // 1. Strict server-side field validation BEFORE touching external services
    const requiredFields = [
        'name', 'dateOfBirth', 'fatherName', 'community', 'address',
        'studentMobile', 'fatherMobile',
        'admissionCourse', 'collegeName', 'plus2Group', 'plus2ExamNumber',
        'expectedCutOff', 'lastStudiedSchool',
    ];

    for (const field of requiredFields) {
        const val = body[field];
        if (val === undefined || val === null || (typeof val === 'string' && !val.trim())) {
            return res.status(400).json({
                success: false,
                message: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`,
            });
        }
    }

    const parsedDob = new Date(body.dateOfBirth);
    if (Number.isNaN(parsedDob.getTime())) {
        return res.status(400).json({ success: false, message: 'Please provide a valid date of birth' });
    }

    if (!ALLOWED_COMMUNITIES.includes(String(body.community).trim())) {
        return res.status(400).json({ success: false, message: 'Please select a valid community category' });
    }

    const cleanGender = ALLOWED_GENDERS.includes(String(body.gender || '').trim())
        ? String(body.gender).trim()
        : 'Other';

    const cleanGroup = String(body.plus2Group).trim();
    if (!ALLOWED_GROUPS.includes(cleanGroup)) {
        return res.status(400).json({ success: false, message: 'Please select a valid +2 academic group' });
    }

    const cleanMobile = String(body.studentMobile).replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid 10-digit student mobile number',
        });
    }

    const cleanFatherMobile = String(body.fatherMobile).replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanFatherMobile)) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid 10-digit father's mobile number",
        });
    }

    let cleanMotherMobile = '';
    if (body.motherMobile && String(body.motherMobile).trim()) {
        cleanMotherMobile = String(body.motherMobile).replace(/\D/g, '');
        if (!/^[6-9]\d{9}$/.test(cleanMotherMobile)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit mother's mobile number",
            });
        }
    }

    let cleanEmail = '';
    if (body.studentEmail && String(body.studentEmail).trim()) {
        cleanEmail = String(body.studentEmail).trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid student email address',
            });
        }
    }

    // Validate Aadhaar if provided and immediately mask it; plaintext Aadhaar is NEVER persisted anywhere.
    let maskedAadhaar = '';
    if (body.aadhaarNumber && String(body.aadhaarNumber).trim()) {
        const cleanedAadhaar = String(body.aadhaarNumber).replace(/\D/g, '');
        if (!/^\d{12}$/.test(cleanedAadhaar)) {
            return res.status(400).json({
                success: false,
                message: 'Aadhaar number must contain exactly 12 digits',
            });
        }
        maskedAadhaar = `XXXX-XXXX-${cleanedAadhaar.slice(-4)}`;
    }

    const cutOffNum = Number.parseFloat(body.expectedCutOff);
    if (!Number.isFinite(cutOffNum) || cutOffNum < 0 || cutOffNum > 200) {
        return res.status(400).json({
            success: false,
            message: 'Expected cut-off must be a valid number between 0 and 200',
        });
    }

    const rawElective = String(body.selectedElective || body.thirdSubject || 'Mathematics').trim();
    if (!['Mathematics', 'Biology', 'Botany', 'Zoology'].includes(rawElective)) {
        return res.status(400).json({
            success: false,
            message: 'Please select a valid elective subject (Mathematics or Biology)',
        });
    }
    if (cleanGroup === 'Vocational' && rawElective !== 'Mathematics') {
        return res.status(400).json({
            success: false,
            message: 'Vocational group students must select Mathematics as the elective subject',
        });
    }

    const cleanLanguage = String(body.examLanguage || 'English').trim() === 'Tamil' ? 'Tamil' : 'English';
    const cleanPageSize = Number(body.pageSize) === 10 ? 10 : 5;

    // 2. Validate staged document upload references if supplied
    const docCheck = validateStagedDocuments(body.documents, body.uploadedDocuments);
    if (!docCheck.ok) {
        return res.status(400).json({ success: false, message: docCheck.message });
    }

    // 3. Verify SheetDB readiness BEFORE acquiring locks or generating misleading success
    const configStatus = SHEETDB_CONFIG.getStatus();
    if (!configStatus.ready) {
        const mapped = mapSheetFailureToHttp({ errorCode: 'CONFIG_MISSING' });
        return res.status(mapped.httpStatus).json({
            success: false,
            errorCode: mapped.errorCode,
            retryable: mapped.retryable,
            message: mapped.message,
        });
    }

    // 4. Idempotency & Concurrency Lock (stores only HMAC hashes, zero PII)
    const rawIdemKey = String(req.headers?.['x-idempotency-key'] || body.idempotencyKey || '').trim().slice(0, 128);
    const mobileHash = hashIdentityKey('mobile', cleanMobile);
    const emailHash = cleanEmail ? hashIdentityKey('email', cleanEmail) : '';
    const idemHash = rawIdemKey ? hashIdentityKey('idem', `${cleanMobile}:${rawIdemKey}`) : '';
    const lockKeys = [mobileHash, emailHash, idemHash].filter(Boolean);

    // Check idempotent replay in current process
    if (idemHash && inProcessCompletedIdem.has(idemHash)) {
        const prev = inProcessCompletedIdem.get(idemHash);
        if (prev.expiresAt > Date.now()) {
            let accessToken = null;
            try {
                accessToken = issueScholarshipSession(res, {
                    studentReferenceId: prev.studentReferenceId,
                    applicationNumber: prev.applicationNumber,
                    freshRegistration: true,
                });
            } catch {
                // JWT_SECRET check handled on protected routes
            }
            return res.status(200).json({
                success: true,
                idempotentReplay: true,
                message: 'Scholarship registration confirmed!',
                data: { ...prev.responseData, accessToken },
            });
        }
        inProcessCompletedIdem.delete(idemHash);
    }

    for (const k of lockKeys) {
        if (inProcessPendingKeys.has(k)) {
            return res.status(409).json({
                success: false,
                errorCode: 'CONCURRENT_SUBMISSION',
                message: 'A registration submission for this candidate is already in progress. Please wait a moment.',
            });
        }
    }
    lockKeys.forEach((k) => inProcessPendingKeys.add(k));

    let mongoLockDoc = null;
    let studentReferenceId = generateStudentReferenceId();
    let applicationNumber = generateApplicationNumber();

    try {
        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
            }
        } catch {
            // Registration persists to SheetDB; MongoDB is optional here for cross-instance lock/document metadata
        }

        if (mongoose.connection.readyState === 1) {
            const now = new Date();
            await ScholarshipRegistrationLock.deleteMany({ expiresAt: { $lte: now } }).catch(() => {});

            if (idemHash) {
                const existingIdem = await ScholarshipRegistrationLock.findOne({ idemHash, expiresAt: { $gt: now } }).lean();
                if (existingIdem && existingIdem.state === 'registered') {
                    let accessToken = null;
                    try {
                        accessToken = issueScholarshipSession(res, {
                            studentReferenceId: existingIdem.studentReferenceId,
                            applicationNumber: existingIdem.applicationNumber,
                            freshRegistration: true,
                        });
                    } catch {
                        // Ignore if JWT_SECRET unset in unit test
                    }
                    return res.status(200).json({
                        success: true,
                        idempotentReplay: true,
                        message: 'Scholarship registration confirmed!',
                        data: {
                            studentReferenceId: existingIdem.studentReferenceId,
                            registrationToken: existingIdem.applicationNumber,
                            name: String(body.name).trim(),
                            email: cleanEmail,
                            studentMobile: cleanMobile,
                            plus2Group: cleanGroup,
                            thirdSubject: rawElective,
                            examLanguage: cleanLanguage,
                            college: String(body.collegeName).trim(),
                            course: String(body.admissionCourse).trim(),
                            maskedAadhaar,
                            accessToken,
                        },
                    });
                }
            }

            try {
                mongoLockDoc = await ScholarshipRegistrationLock.create({
                    keys: lockKeys,
                    idemHash: idemHash || null,
                    studentReferenceId,
                    applicationNumber,
                    state: 'pending',
                    expiresAt: new Date(Date.now() + 2 * 60 * 1000), // 2-minute in-flight TTL
                });
            } catch (lockErr) {
                if (lockErr?.code === 11000) {
                    const colliding = await ScholarshipRegistrationLock.findOne({
                        keys: { $in: lockKeys },
                        expiresAt: { $gt: new Date() },
                    }).lean();

                    if (colliding?.state === 'pending') {
                        return res.status(409).json({
                            success: false,
                            errorCode: 'CONCURRENT_SUBMISSION',
                            message: 'A registration submission for this candidate is already in progress. Please wait a moment.',
                        });
                    }
                    return res.status(409).json({
                        success: false,
                        errorCode: 'DUPLICATE_REGISTRATION',
                        message: 'A student with this mobile number or email has already registered.',
                    });
                }
                throw lockErr;
            }
        }

        // 5. Check SheetDB `Scholarship_Students` for pre-existing mobile or email
        const dupCriteria = { student_mobile: cleanMobile };
        if (cleanEmail) {
            dupCriteria.student_email = cleanEmail;
        }

        const dupCheck = await searchRows(SHEETDB_CONFIG.tabs.STUDENTS, dupCriteria, {
            mode: 'or',
            timeoutMs: SHEETDB_CONFIG.interactiveTimeoutMs,
        });

        if (!dupCheck.success) {
            if (mongoLockDoc) {
                await ScholarshipRegistrationLock.deleteOne({ _id: mongoLockDoc._id }).catch(() => {});
            }
            const mapped = mapSheetFailureToHttp(dupCheck);
            return res.status(mapped.httpStatus).json({
                success: false,
                errorCode: mapped.errorCode,
                retryable: mapped.retryable,
                message: mapped.message,
            });
        }

        if (dupCheck.found && dupCheck.records.length > 0) {
            if (mongoLockDoc) {
                await ScholarshipRegistrationLock.updateOne(
                    { _id: mongoLockDoc._id },
                    { $set: { state: 'registered', expiresAt: new Date(Date.now() + 10 * 60 * 1000) } }
                ).catch(() => {});
            }
            const matchedMobile = dupCheck.records.some(
                (r) => String(r.student_mobile || '').replace(/\D/g, '') === cleanMobile
            );
            return res.status(409).json({
                success: false,
                errorCode: 'DUPLICATE_REGISTRATION',
                message: matchedMobile
                    ? 'A student with this mobile number has already registered for the scholarship examination.'
                    : 'A student with this email address has already registered for the scholarship examination.',
            });
        }

        // 6. Build verified 32-column `Scholarship_Students` row (zero raw Aadhaar, formula-safe class label)
        const sheetPayload = mapStudentToSheetRow({
            studentReferenceId,
            registrationToken: applicationNumber,
            name: String(body.name).trim(),
            gender: cleanGender,
            dateOfBirth: parsedDob,
            fatherName: String(body.fatherName).trim(),
            community: String(body.community).trim(),
            address: String(body.address).trim(),
            studentMobile: cleanMobile,
            studentEmail: cleanEmail,
            fatherMobile: cleanFatherMobile,
            motherMobile: cleanMotherMobile,
            maskedAadhaar,
            currentClass: body.currentClass || '12th Standard (+2)',
            academicYear: body.academicYear || '2025-2026',
            board: body.board || 'Tamil Nadu State Board',
            plus2Group: cleanGroup,
            plus2ExamNumber: String(body.plus2ExamNumber).trim(),
            expectedCutOff: cutOffNum,
            lastStudiedSchool: String(body.lastStudiedSchool).trim(),
            studiedInGovtSchool: body.studiedInGovtSchool === true || body.studiedInGovtSchool === 'true',
            firstGenerationGraduate: body.firstGenerationGraduate === true || body.firstGenerationGraduate === 'true',
            preferredDistrict: body.preferredDistrict || '',
            collegeName: String(body.collegeName).trim(),
            admissionCourse: String(body.admissionCourse).trim(),
            preferredCollege2: body.preferredCollege2 || (Array.isArray(body.preferredColleges) ? body.preferredColleges[1]?.collegeName : '') || '',
            preferredCourse2: body.preferredCourse2 || (Array.isArray(body.preferredColleges) ? body.preferredColleges[1]?.courseName : '') || '',
            selectedElective: rawElective,
            thirdSubject: rawElective,
            examLanguage: cleanLanguage,
            pageSize: cleanPageSize,
            testStatus: 'registered',
            createdAt: new Date(),
        });

        // 7. Persist directly to SheetDB `Scholarship_Students` with timeout reconciliation (NEVER dual-write to ScholarshipStudent)
        const writeResult = await appendRowWithReconcile(
            SHEETDB_CONFIG.tabs.STUDENTS,
            sheetPayload,
            {
                uniqueColumn: 'application_number',
                uniqueValue: applicationNumber,
                timeoutMs: SHEETDB_CONFIG.interactiveTimeoutMs,
                maxAttempts: 2,
            }
        );

        if (!writeResult.success) {
            if (mongoLockDoc) {
                await ScholarshipRegistrationLock.deleteOne({ _id: mongoLockDoc._id }).catch(() => {});
            }
            const mapped = mapSheetFailureToHttp(writeResult);
            return res.status(mapped.httpStatus).json({
                success: false,
                errorCode: mapped.errorCode,
                retryable: mapped.retryable,
                message: mapped.message,
            });
        }

        // 8. SheetDB write confirmed -> finalize short-lived non-PII lock, link optional staged documents, prime cache & issue JWT
        if (mongoLockDoc) {
            await ScholarshipRegistrationLock.updateOne(
                { _id: mongoLockDoc._id },
                { $set: { state: 'registered', expiresAt: new Date(Date.now() + 15 * 60 * 1000) } }
            ).catch(() => {});
        }

        if (docCheck.verifiedDocs.length > 0 && mongoose.connection.readyState === 1) {
            for (const doc of docCheck.verifiedDocs) {
                await StudentDocument.create({
                    studentReferenceId,
                    applicationNumber,
                    documentType: doc.documentType,
                    originalName: doc.originalName,
                    storageKey: doc.storageKey,
                    mime: doc.mime,
                    size: doc.size,
                    uploadStatus: 'uploaded',
                }).catch(() => {});
            }
        }

        cacheStudentRow(sheetPayload);

        let accessToken = null;
        try {
            accessToken = issueScholarshipSession(res, {
                studentReferenceId,
                applicationNumber,
                freshRegistration: true,
            });
        } catch {
            // Handled if JWT_SECRET is absent in an isolated test
        }

        const responseData = {
            studentReferenceId,
            registrationToken: applicationNumber,
            name: sheetPayload.full_name,
            email: sheetPayload.student_email,
            studentMobile: sheetPayload.student_mobile,
            plus2Group: sheetPayload.plus2_group,
            thirdSubject: sheetPayload.selected_elective,
            examLanguage: sheetPayload.exam_medium,
            pageSize: cleanPageSize,
            college: sheetPayload.primary_college,
            course: sheetPayload.primary_course,
            maskedAadhaar: sheetPayload.masked_aadhaar,
        };

        if (idemHash) {
            inProcessCompletedIdem.set(idemHash, {
                studentReferenceId,
                applicationNumber,
                responseData,
                expiresAt: Date.now() + 15 * 60 * 1000,
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Scholarship registration successful!',
            data: {
                ...responseData,
                accessToken,
            },
        });
    } catch (error) {
        if (mongoLockDoc) {
            await ScholarshipRegistrationLock.deleteOne({ _id: mongoLockDoc._id }).catch(() => {});
        }
        console.error('[Scholarship Register Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            retryable: true,
            message: 'Registration failed due to an unexpected server error. Please try again.',
        });
    } finally {
        lockKeys.forEach((k) => inProcessPendingKeys.delete(k));
    }
}
