import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import {
    SHEETDB_CONFIG,
    SCHOLARSHIP_STUDENTS_HEADERS,
    SCHOLARSHIP_RESULTS_HEADERS,
    SCHOLARSHIP_FEEDBACK_HEADERS,
    invalidateSheetDBStoreCache,
    resetSheetDBTelemetry,
    getSheetDBQuotaMetrics,
} from '../../src/backend/lib/sheetdb/index.js';
import {
    signScholarshipToken,
    verifyScholarshipToken,
    revokeScholarshipToken,
} from '../../src/backend/lib/scholarshipAuth.js';
import { verifyToken as verifyAdminToken } from '../../src/backend/lib/auth.js';
import { sanitizeMongoUri, getSafeMongoDiagnostics } from '../../src/backend/lib/mongodb.js';

import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';
import ScholarshipRegistrationLock from '../../src/backend/models/ScholarshipRegistrationLock.js';
import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';
import ScholarshipExamConfig from '../../src/backend/models/ScholarshipExamConfig.js';
import ScholarshipExamFeedback from '../../src/backend/models/ScholarshipExamFeedback.js';
import TestSession from '../../src/backend/models/TestSession.js';
import SheetDBSyncJob from '../../src/backend/models/SheetDBSyncJob.js';
import AdminAuditLog from '../../src/backend/models/AdminAuditLog.js';
import College from '../../src/backend/models/College.js';
import Course from '../../src/backend/models/Course.js';
import Announcement from '../../src/backend/models/Announcement.js';
import SiteSetting from '../../src/backend/models/SiteSetting.js';
import BioData from '../../src/backend/models/BioData.js';
import CounsellingRecord from '../../src/backend/models/CounsellingRecord.js';
import Payment from '../../src/backend/models/Payment.js';

import registerHandler from '../../src/pages/api/scholarship/register.js';
import verifyTokenHandler from '../../src/pages/api/scholarship/verify-token.js';
import startTestHandler from '../../src/pages/api/scholarship/start-test.js';
import questionsHandler from '../../src/pages/api/scholarship/questions.js';
import saveAnswerHandler from '../../src/pages/api/scholarship/save-answer.js';
import submitTestHandler from '../../src/pages/api/scholarship/submit-test.js';
import resultHandler from '../../src/pages/api/scholarship/result.js';
import downloadResultHandler from '../../src/pages/api/scholarship/download-result.js';
import feedbackHandler from '../../src/pages/api/scholarship/feedback.js';
import adminScholarshipHandler from '../../src/pages/api/admin/scholarship-results.js';
import cronSyncHandler from '../../src/pages/api/cron/sheetdb-sync.js';

// ---------------------------------------------------------------------------
// Test Harness Helpers (Mock HTTP Req/Res, Mock SheetDB Server, In-Memory Runtime State)
// ---------------------------------------------------------------------------

function createMockReqRes({ method = 'GET', query = {}, body = {}, headers = {} } = {}) {
    const normHeaders = {};
    for (const [k, v] of Object.entries(headers)) {
        normHeaders[k.toLowerCase()] = v;
    }
    const req = {
        method,
        query,
        body,
        headers: normHeaders,
        socket: { remoteAddress: '127.0.0.1' },
    };

    const resHeaders = {};
    let statusCode = 200;
    let jsonPayload = null;
    let rawPayload = null;

    const res = {
        setHeader(name, value) {
            resHeaders[name.toLowerCase()] = value;
            return this;
        },
        getHeader(name) {
            return resHeaders[name.toLowerCase()];
        },
        status(code) {
            statusCode = code;
            return this;
        },
        json(payload) {
            jsonPayload = payload;
            return this;
        },
        send(payload) {
            rawPayload = payload;
            return this;
        },
        end(payload) {
            if (payload !== undefined) rawPayload = payload;
            return this;
        },
    };

    return {
        req,
        res,
        getStatus: () => statusCode,
        getJson: () => jsonPayload,
        getRaw: () => rawPayload,
        getHeaders: () => resHeaders,
    };
}

function buildValidRegistrationPayload(overrides = {}) {
    return {
        name: 'Kavin Kumar S',
        gender: 'Male',
        dateOfBirth: '2008-05-14',
        fatherName: 'Senthil Kumar',
        community: 'BC',
        address: '12 Anna Nagar, Rasipuram, Namakkal - 637408',
        studentMobile: '9876543210',
        studentEmail: 'kavin.test@example.com',
        fatherMobile: '9876500001',
        motherMobile: '9876500002',
        aadhaarNumber: '234567899012',
        currentClass: '+2 / 12th Standard',
        academicYear: '2025-2026',
        board: 'Tamil Nadu State Board',
        plus2Group: 'Academic',
        plus2ExamNumber: 'TN2600123',
        expectedCutOff: 188.5,
        lastStudiedSchool: 'Govt Boys Higher Secondary School, Rasipuram',
        studiedInGovtSchool: true,
        firstGenerationGraduate: true,
        preferredDistrict: 'Namakkal',
        collegeName: 'Paavai Engineering College',
        admissionCourse: 'B.E. Computer Science and Engineering',
        preferredColleges: [
            {
                district: 'Salem',
                collegeName: 'Sona College of Technology',
                courseName: 'B.Tech. Information Technology',
            },
        ],
        selectedElective: 'Mathematics',
        examLanguage: 'English',
        declarationAccepted: true,
        ...overrides,
    };
}

function createSampleQuestionBank() {
    const bank = [];
    const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
    for (const sub of subjects) {
        for (let i = 1; i <= 25; i++) {
            const id = new mongoose.Types.ObjectId();
            bank.push({
                _id: id,
                code: `${sub.slice(0, 3).toUpperCase()}-${String(i).padStart(3, '0')}`,
                subject: sub,
                topic: `${sub} Topic ${i}`,
                difficulty: i % 3 === 0 ? 'hard' : i % 2 === 0 ? 'medium' : 'easy',
                questionText: `[${sub} Q${i}] What is the standard unit in ${sub} problem ${i}?`,
                questionTextTamil: `[${sub} வினா ${i}] ${sub} கணக்கு ${i}-இன் அலகு என்ன?`,
                options: [
                    { label: 'A', text: `Correct ${sub} Option ${i}` },
                    { label: 'B', text: `Distractor B ${i}` },
                    { label: 'C', text: `Distractor C ${i}` },
                    { label: 'D', text: `Distractor D ${i}` },
                ],
                optionsTamil: [
                    { label: 'A', text: `சரியான விடை ${i}` },
                    { label: 'B', text: `தவறான விடை B ${i}` },
                    { label: 'C', text: `தவறான விடை C ${i}` },
                    { label: 'D', text: `தவறான விடை D ${i}` },
                ],
                correctAnswer: 'A',
                marks: 1,
                negativeMarks: 0,
                isActive: true,
            });
        }
    }
    return bank;
}

function signAdminJwt(role = 'super_admin', username = 'admin_tester') {
    return jwt.sign(
        { username, role, name: 'Test Admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

// ---------------------------------------------------------------------------
// Complete Production-Readiness Test Suite (Categories A – H)
// ---------------------------------------------------------------------------

test('Complete SheetDB Architecture Refactor & Production Readiness Suite (A–H)', async (t) => {
    const origEnv = {
        SHEETDB_URL: process.env.SHEETDB_URL,
        SHEETDB_API_KEY: process.env.SHEETDB_API_KEY,
        SHEETDB_API_SECRET: process.env.SHEETDB_API_SECRET,
        SHEETDB_ENFORCE_AUTH: process.env.SHEETDB_ENFORCE_AUTH,
        CRON_SECRET: process.env.CRON_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI,
        DISABLE_SCHOLARSHIP_RATELIMIT: process.env.DISABLE_SCHOLARSHIP_RATELIMIT,
        VERCEL: process.env.VERCEL,
    };

    const origFetch = globalThis.fetch;

    // Save original Mongoose methods we stub in-memory so zero real DB writes happen
    const origMethods = {
        studentCreate: ScholarshipStudent.create,
        studentFindOne: ScholarshipStudent.findOne,
        studentFindById: ScholarshipStudent.findById,
        studentFind: ScholarshipStudent.find,
        studentUpdateOne: ScholarshipStudent.updateOne,
        feedbackCreate: ScholarshipExamFeedback.create,
        feedbackFind: ScholarshipExamFeedback.find,
        lockCreate: ScholarshipRegistrationLock.create,
        lockFindOne: ScholarshipRegistrationLock.findOne,
        lockUpdateOne: ScholarshipRegistrationLock.updateOne,
        lockDeleteOne: ScholarshipRegistrationLock.deleteOne,
        configGetActive: ScholarshipExamConfig.getActiveConfig,
        questionFind: ScholarshipQuestion.find,
        questionCountDocuments: ScholarshipQuestion.countDocuments,
        questionAggregate: ScholarshipQuestion.aggregate,
        questionUpdateMany: ScholarshipQuestion.updateMany,
        sessionCreate: TestSession.create,
        sessionFindOne: TestSession.findOne,
        sessionFindById: TestSession.findById,
        sessionFind: TestSession.find,
        sessionUpdateOne: TestSession.updateOne,
        sessionFindByIdAndDelete: TestSession.findByIdAndDelete,
        syncJobFindOneAndUpdate: SheetDBSyncJob.findOneAndUpdate,
        syncJobUpdateMany: SheetDBSyncJob.updateMany,
        syncJobFindById: SheetDBSyncJob.findById,
        syncJobFind: SheetDBSyncJob.find,
        auditCreate: AdminAuditLog.create,
    };
    const origGlobalConn = global.mongoose?.conn ?? null;
    const origGlobalPromise = global.mongoose?.promise ?? null;

    // In-memory state stores
    const sheets = {
        Sheet1: [{ legacy_bio_id: 'BIO-001', student_name: 'Legacy Protected Row' }],
        Scholarship_Students: [],
        Scholarship_Results: [],
        Scholarship_Feedback: [],
    };
    const sheetRequestLog = [];
    let nextSheetFault = null; // Function(urlObj, init, sheets) => Response | throw | null

    const memorySessions = new Map();
    const memorySyncJobs = new Map();
    let mongoStudentWriteAttempts = 0;
    let mongoFeedbackWriteAttempts = 0;
    const questionBank = createSampleQuestionBank();

    // Install deterministic SheetDB v1 mock server
    const expectedBasicAuth = 'Basic ' + Buffer.from('rasi_key_test:rasi_secret_test').toString('base64');

    globalThis.fetch = async (input, init = {}) => {
        const urlStr = typeof input === 'string' ? input : input.url;
        const urlObj = new URL(urlStr);
        const method = (init.method || 'GET').toUpperCase();
        const tab = urlObj.searchParams.get('sheet') || 'Sheet1';
        const authHeader = init.headers?.Authorization || init.headers?.authorization || '';

        sheetRequestLog.push({
            method,
            pathname: urlObj.pathname,
            tab,
            mode: urlObj.searchParams.get('mode'),
            hasBasicAuth: authHeader === expectedBasicAuth,
            searchParams: Object.fromEntries(urlObj.searchParams.entries()),
        });

        // Strict safeguard: Sheet1 must NEVER be touched by scholarship code!
        assert.notEqual(tab, 'Sheet1', 'CRITICAL VIOLATION: Scholarship flow attempted to access legacy Sheet1!');

        // Enforce Basic Auth whenever SHEETDB_API_KEY & SHEETDB_API_SECRET are configured
        if (process.env.SHEETDB_API_KEY && process.env.SHEETDB_API_SECRET && authHeader !== expectedBasicAuth) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (typeof nextSheetFault === 'function') {
            const faultResult = await nextSheetFault(urlObj, init, sheets, method, tab);
            if (faultResult) return faultResult;
        }

        const table = sheets[tab] || [];

        if (method === 'GET' && urlObj.pathname.endsWith('/count')) {
            return new Response(JSON.stringify({ rows: table.length }), {
                status: 200,
                headers: { 'Content-Type': 'application/json', 'x-ratelimit-remaining': '480', 'x-ratelimit-limit': '500' },
            });
        }

        if (method === 'GET' && urlObj.pathname.endsWith('/search_or')) {
            const criteria = [...urlObj.searchParams.entries()].filter(([k]) => k !== 'sheet');
            const matches = table.filter((row) =>
                criteria.some(([col, val]) => String(row[col] ?? '').toLowerCase() === String(val).toLowerCase())
            );
            return new Response(JSON.stringify(matches), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (method === 'GET' && urlObj.pathname.endsWith('/search')) {
            const criteria = [...urlObj.searchParams.entries()].filter(([k]) => k !== 'sheet');
            const matches = table.filter((row) =>
                criteria.every(([col, val]) => String(row[col] ?? '').toLowerCase() === String(val).toLowerCase())
            );
            return new Response(JSON.stringify(matches), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (method === 'GET') {
            return new Response(JSON.stringify(table), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (method === 'POST') {
            const parsed = JSON.parse(init.body || '{}');
            const rowsToInsert = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
            for (const r of rowsToInsert) {
                table.push({ ...r });
            }
            return new Response(JSON.stringify({ created: rowsToInsert.length }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ error: 'Unsupported route' }), { status: 404 });
    };

    // Install lightweight in-memory Mongoose runtime stubs (avoiding real DB mutations & sandbox TCP EACCES)
    process.env.SHEETDB_URL = 'https://sheetdb.io/api/v1/mock_rasi_sheet';
    process.env.SHEETDB_API_KEY = 'rasi_key_test';
    process.env.SHEETDB_API_SECRET = 'rasi_secret_test';
    process.env.SHEETDB_ENFORCE_AUTH = 'true';
    process.env.CRON_SECRET = 'cron_secret_unit_test_999';
    process.env.JWT_SECRET = 'unit_test_jwt_secret_key_with_32_plus_chars_2026';
    process.env.DISABLE_SCHOLARSHIP_RATELIMIT = 'true';
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/rasi-unit-mock';
    if (global.mongoose) {
        global.mongoose.conn = mongoose;
        global.mongoose.promise = Promise.resolve(mongoose);
    }

    ScholarshipStudent.create = async () => {
        mongoStudentWriteAttempts++;
        throw new Error('Dual-write violation: ScholarshipStudent.create should NOT be called!');
    };
    ScholarshipStudent.findOne = () => ({ lean: async () => null });
    ScholarshipStudent.findById = () => ({ lean: async () => null });
    ScholarshipStudent.find = () => ({ lean: async () => [] });

    ScholarshipExamFeedback.create = async () => {
        mongoFeedbackWriteAttempts++;
        throw new Error('Dual-write violation: ScholarshipExamFeedback.create should NOT be called!');
    };
    ScholarshipExamFeedback.find = () => ({ lean: async () => [] });

    ScholarshipExamConfig.getActiveConfig = async () => ({
        examDurationMinutes: 90,
        compulsorySubjects: [
            { name: 'Physics', questionCount: 20 },
            { name: 'Chemistry', questionCount: 20 },
        ],
        optionalSubjects: [
            { name: 'Mathematics', questionCount: 20 },
            { name: 'Biology', questionCount: 20 },
        ],
        languages: ['English', 'Tamil'],
        marksPerQuestion: 1,
        negativeMarking: 0,
    });

    ScholarshipQuestion.aggregate = async (pipeline = []) => {
        const match = pipeline.find((s) => s.$match)?.$match || {};
        const sampleSize = pipeline.find((s) => s.$sample)?.$sample?.size || 20;
        const ninSet = new Set((match._id?.$nin || []).map(String));
        const pool = questionBank.filter((q) => {
            if (ninSet.has(String(q._id))) return false;
            if (typeof match.subject === 'string' && q.subject !== match.subject) return false;
            if (match.subject?.$in && !match.subject.$in.includes(q.subject)) return false;
            if (match.difficulty && q.difficulty !== match.difficulty) return false;
            return true;
        });
        return pool.slice(0, sampleSize);
    };

    ScholarshipQuestion.countDocuments = async () => 25;
    ScholarshipQuestion.updateMany = async () => ({ modifiedCount: 0 });

    ScholarshipQuestion.find = (filter = {}) => ({
        lean: async () => {
            if (filter.subject) {
                return questionBank.filter((q) => q.subject === filter.subject && q.isActive);
            }
            if (filter._id?.$in) {
                const ids = new Set(filter._id.$in.map(String));
                return questionBank.filter((q) => ids.has(String(q._id)));
            }
            return questionBank;
        },
    });

    function wrapSessionDoc(raw) {
        if (!raw) return null;
        return {
            ...raw,
            toObject() {
                return { ...raw };
            },
            async save() {
                memorySessions.set(String(this._id), {
                    ...this,
                    answers: Array.isArray(this.answers) ? [...this.answers] : [],
                    questions: Array.isArray(this.questions) ? [...this.questions] : [],
                });
                return this;
            },
        };
    }

    TestSession.create = async (doc) => {
        const id = new mongoose.Types.ObjectId();
        const stored = {
            _id: id,
            status: 'in_progress',
            answers: [],
            createdAt: new Date(),
            ...doc,
        };
        memorySessions.set(String(id), stored);
        return wrapSessionDoc(stored);
    };

    TestSession.findById = (id) => {
        const found = memorySessions.get(String(id)) || null;
        const p = Promise.resolve(wrapSessionDoc(found));
        p.lean = async () => (found ? { ...found } : null);
        p.select = () => ({
            lean: async () => (found ? { ...found } : null),
        });
        return p;
    };

    TestSession.findOne = (query = {}) => {
        let match = null;
        for (const sess of memorySessions.values()) {
            let ok = true;
            if (query.registrationToken && sess.registrationToken !== query.registrationToken) ok = false;
            if (query.status) {
                if (typeof query.status === 'string' && sess.status !== query.status) ok = false;
                if (query.status.$in && !query.status.$in.includes(sess.status)) ok = false;
            }
            if (ok) {
                match = sess;
                break;
            }
        }
        const p = Promise.resolve(wrapSessionDoc(match));
        p.sort = () => ({
            lean: async () => (match ? { ...match } : null),
            then: (resolve, reject) => Promise.resolve(wrapSessionDoc(match)).then(resolve, reject),
        });
        p.lean = async () => (match ? { ...match } : null);
        return p;
    };

    TestSession.find = () => ({
        select: () => ({
            lean: async () => [...memorySessions.values()],
        }),
        lean: async () => [...memorySessions.values()],
    });

    TestSession.updateOne = async (filter, update) => {
        const id = String(filter._id);
        const cur = memorySessions.get(id);
        if (!cur) return { modifiedCount: 0 };
        const next = { ...cur, ...(update.$set || {}) };
        if (update.$unset) {
            for (const k of Object.keys(update.$unset)) {
                delete next[k];
            }
        }
        memorySessions.set(id, next);
        return { modifiedCount: 1 };
    };

    TestSession.findByIdAndDelete = async (id) => {
        const cur = memorySessions.get(String(id)) || null;
        memorySessions.delete(String(id));
        return cur;
    };

    SheetDBSyncJob.findOneAndUpdate = async (filter, update) => {
        const key = `${filter.destinationTab}:${filter.recordReferenceId}:${filter.operationType}`;
        const existing = memorySyncJobs.get(key);
        if (existing) return existing;
        const id = new mongoose.Types.ObjectId();
        const created = {
            _id: id,
            ...filter,
            ...(update.$setOnInsert || {}),
            status: 'pending',
            attemptCount: 0,
            maxAttempts: 5,
        };
        memorySyncJobs.set(key, created);
        return created;
    };

    SheetDBSyncJob.updateMany = async () => ({ modifiedCount: 1 });
    SheetDBSyncJob.findById = async () => null;
    SheetDBSyncJob.find = () => ({
        sort: () => ({
            limit: async () => [],
        }),
    });

    AdminAuditLog.create = async (doc) => doc;

    t.after(() => {
        globalThis.fetch = origFetch;
        if (global.mongoose) {
            global.mongoose.conn = origGlobalConn;
            global.mongoose.promise = origGlobalPromise;
        }
        for (const [k, v] of Object.entries(origEnv)) {
            if (v === undefined) delete process.env[k];
            else process.env[k] = v;
        }
        Object.assign(ScholarshipStudent, {
            create: origMethods.studentCreate,
            findOne: origMethods.studentFindOne,
            findById: origMethods.studentFindById,
            find: origMethods.studentFind,
            updateOne: origMethods.studentUpdateOne,
        });
        Object.assign(ScholarshipExamFeedback, {
            create: origMethods.feedbackCreate,
            find: origMethods.feedbackFind,
        });
        ScholarshipExamConfig.getActiveConfig = origMethods.configGetActive;
        ScholarshipQuestion.find = origMethods.questionFind;
        ScholarshipQuestion.countDocuments = origMethods.questionCountDocuments;
        ScholarshipQuestion.aggregate = origMethods.questionAggregate;
        ScholarshipQuestion.updateMany = origMethods.questionUpdateMany;
        Object.assign(TestSession, {
            create: origMethods.sessionCreate,
            findOne: origMethods.sessionFindOne,
            findById: origMethods.sessionFindById,
            find: origMethods.sessionFind,
            updateOne: origMethods.sessionUpdateOne,
            findByIdAndDelete: origMethods.sessionFindByIdAndDelete,
        });
        Object.assign(SheetDBSyncJob, {
            findOneAndUpdate: origMethods.syncJobFindOneAndUpdate,
            updateMany: origMethods.syncJobUpdateMany,
            findById: origMethods.syncJobFindById,
            find: origMethods.syncJobFind,
        });
        AdminAuditLog.create = origMethods.auditCreate;
        invalidateSheetDBStoreCache();
    });

    // Shared artifacts captured across sequential steps for realistic E2E workflow
    let studentAToken = '';
    let studentAAccessToken = '';
    let studentASessionId = '';
    let studentBToken = '';
    let studentBAccessToken = '';

    // =========================================================================
    // CATEGORY A: REGISTRATION
    // =========================================================================

    await t.test('A1. Valid registration writes exact 32-column RAW row to SheetDB with masked Aadhaar & zero MongoDB student writes', async () => {
        invalidateSheetDBStoreCache();
        resetSheetDBTelemetry();
        sheetRequestLog.length = 0;

        const { req, res, getStatus, getJson, getHeaders } = createMockReqRes({
            method: 'POST',
            body: buildValidRegistrationPayload({ idempotencyKey: 'idem-student-a-001' }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'Registration must succeed with HTTP 201 after SheetDB confirmation');
        const body = getJson();
        assert.equal(body.success, true);
        assert.match(body.data.registrationToken, /^RASI-[A-Z0-9]{6}-\d{3}$/);
        assert.ok(body.data.accessToken, 'Response must include candidate JWT accessToken');
        assert.ok(getHeaders()['set-cookie']?.includes('HttpOnly'), 'Must set HttpOnly session cookie');
        assert.ok(getHeaders()['cache-control']?.includes('no-store'), 'Must set Cache-Control: no-store');

        // Verify zero dual-write to MongoDB ScholarshipStudent
        assert.equal(mongoStudentWriteAttempts, 0, 'Must NOT insert student record into MongoDB ScholarshipStudent');

        // Verify SheetDB row structure & contents
        assert.equal(sheets.Scholarship_Students.length, 1);
        const savedRow = sheets.Scholarship_Students[0];
        assert.deepEqual(Object.keys(savedRow), SCHOLARSHIP_STUDENTS_HEADERS, 'Saved row must match exact 32 SCHOLARSHIP_STUDENTS_HEADERS in order');
        assert.equal(savedRow.current_class, '12th Standard (+2)', 'Must normalize +2 label so Google Sheets never shows #ERROR!');
        assert.equal(savedRow.masked_aadhaar, 'XXXX-XXXX-9012', 'Must store only masked Aadhaar, never plaintext 12 digits');
        assert.equal(JSON.stringify(savedRow).includes('234567899012'), false, 'Plaintext Aadhaar must NEVER appear in SheetDB');

        // Verify POST used mode=RAW and Basic Auth
        const postCall = sheetRequestLog.find((c) => c.method === 'POST' && c.tab === 'Scholarship_Students');
        assert.ok(postCall, 'Must POST to Scholarship_Students');
        assert.equal(postCall.mode, 'RAW', 'Must pass mode=RAW to prevent Google Sheets formula evaluation');
        assert.equal(postCall.hasBasicAuth, true, 'Must include Basic Auth header');

        studentAToken = body.data.registrationToken;
        studentAAccessToken = body.data.accessToken;
    });

    await t.test('A2. Idempotent replay with same idempotencyKey returns original registration without duplicate SheetDB row', async () => {
        const { req, res, getStatus, getJson } = createMockReqRes({
            method: 'POST',
            body: buildValidRegistrationPayload({ idempotencyKey: 'idem-student-a-001' }),
        });

        await registerHandler(req, res);
        assert.equal(getStatus(), 200);
        assert.equal(getJson().data.registrationToken, studentAToken);
        assert.equal(getJson().idempotentReplay, true);
        assert.equal(sheets.Scholarship_Students.length, 1, 'SheetDB must still have exactly 1 row');
    });

    await t.test('A3. Missing mandatory fields & raw base64 document blobs are rejected with HTTP 400 before SheetDB call', async () => {
        const beforeCalls = sheetRequestLog.length;

        const missingRes = createMockReqRes({
            method: 'POST',
            body: { name: 'Incomplete Student', studentMobile: '9999988888' },
        });
        await registerHandler(missingRes.req, missingRes.res);
        assert.equal(missingRes.getStatus(), 400);
        assert.equal(missingRes.getJson().success, false);

        const base64Res = createMockReqRes({
            method: 'POST',
            body: buildValidRegistrationPayload({
                studentMobile: '9123456780',
                studentEmail: 'blob@example.com',
                documents: [{ docType: 'photo', fileData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==' }],
            }),
        });
        await registerHandler(base64Res.req, base64Res.res);
        assert.equal(base64Res.getStatus(), 400);
        assert.equal(sheetRequestLog.length, beforeCalls, 'Invalid payloads must not consume SheetDB quota');
    });

    await t.test('A4. Duplicate application (mobile or email) is blocked via /search_or with HTTP 409', async () => {
        const dupRes = createMockReqRes({
            method: 'POST',
            body: buildValidRegistrationPayload({
                name: 'Another Name Same Mobile',
                studentEmail: 'different@example.com',
                idempotencyKey: 'idem-dup-mobile',
            }),
        });
        await registerHandler(dupRes.req, dupRes.res);
        assert.equal(dupRes.getStatus(), 409);
        assert.equal(dupRes.getJson().errorCode, 'DUPLICATE_REGISTRATION');
        assert.equal(sheets.Scholarship_Students.length, 1);
    });

    await t.test('A5. Concurrent duplicate submission allows only one registration and blocks the second with HTTP 409', async () => {
        const payload1 = buildValidRegistrationPayload({
            name: 'Priya Dharshini M',
            studentMobile: '9789012345',
            studentEmail: 'priya.concurrent@example.com',
        });
        const payload2 = buildValidRegistrationPayload({
            name: 'Priya Dharshini M',
            studentMobile: '9789012345',
            studentEmail: 'priya.concurrent@example.com',
        });

        const call1 = createMockReqRes({ method: 'POST', body: payload1 });
        const call2 = createMockReqRes({ method: 'POST', body: payload2 });

        await Promise.all([
            registerHandler(call1.req, call1.res),
            registerHandler(call2.req, call2.res),
        ]);

        const statuses = [call1.getStatus(), call2.getStatus()].sort((a, b) => a - b);
        assert.deepEqual(statuses, [201, 409], 'Exactly one concurrent submission must succeed (201) and one must reject (409)');
        assert.equal(sheets.Scholarship_Students.length, 2, 'Only 1 new row must be inserted for Priya');

        const winner = call1.getStatus() === 201 ? call1.getJson() : call2.getJson();
        studentBToken = winner.data.registrationToken;
        studentBAccessToken = winner.data.accessToken;
    });

    await t.test('A6. SheetDB failure modes (Auth 401, Missing URL 503, Rate Limit 429, Server 500, Timeout 504) never fake success & allow clean retry recovery', async () => {
        const retryCandidate = buildValidRegistrationPayload({
            name: 'Arun Prakash R',
            studentMobile: '9654321098',
            studentEmail: 'arun.retry@example.com',
        });

        // 1) SheetDB 401 Auth Failure -> 502
        nextSheetFault = async () => new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        const authFail = createMockReqRes({ method: 'POST', body: retryCandidate });
        await registerHandler(authFail.req, authFail.res);
        assert.equal(authFail.getStatus(), 502);
        nextSheetFault = null;

        // 2) Missing SHEETDB_URL -> 503
        const savedUrl = process.env.SHEETDB_URL;
        delete process.env.SHEETDB_URL;
        const noUrl = createMockReqRes({ method: 'POST', body: retryCandidate });
        await registerHandler(noUrl.req, noUrl.res);
        assert.equal(noUrl.getStatus(), 503);
        process.env.SHEETDB_URL = savedUrl;

        // 3) SheetDB HTTP 429 Quota/Rate Limit -> 429
        nextSheetFault = async () => new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
        const rateFail = createMockReqRes({ method: 'POST', body: retryCandidate });
        await registerHandler(rateFail.req, rateFail.res);
        assert.equal(rateFail.getStatus(), 429);
        nextSheetFault = null;

        // 4) SheetDB HTTP 500 -> 503
        nextSheetFault = async () => new Response(JSON.stringify({ error: 'Upstream failure' }), { status: 500 });
        const srvFail = createMockReqRes({ method: 'POST', body: retryCandidate });
        await registerHandler(srvFail.req, srvFail.res);
        assert.equal(srvFail.getStatus(), 503);
        nextSheetFault = null;

        // 5) SheetDB Timeout (when POST did not land) -> 504
        nextSheetFault = async (_urlObj, _init, _sheets, method) => {
            if (method === 'POST') {
                const err = new Error('The operation was aborted');
                err.name = 'AbortError';
                throw err;
            }
            return null;
        };
        const timeoutFail = createMockReqRes({ method: 'POST', body: retryCandidate });
        await registerHandler(timeoutFail.req, timeoutFail.res);
        assert.equal(timeoutFail.getStatus(), 504);
        nextSheetFault = null;

        assert.equal(sheets.Scholarship_Students.length, 2, 'Zero rows must have been added during failed attempts');
        assert.equal(mongoStudentWriteAttempts, 0, 'Zero MongoDB fallback writes during SheetDB outages');

        // Vocational + Biology must be rejected at registration with 400
        const vocBioReject = createMockReqRes({
            method: 'POST',
            body: {
                ...retryCandidate,
                plus2Group: 'Vocational',
                selectedElective: 'Biology',
            },
        });
        await registerHandler(vocBioReject.req, vocBioReject.res);
        assert.equal(vocBioReject.getStatus(), 400, 'Vocational + Biology must be rejected with HTTP 400');

        // 6) Ambiguous Timeout where POST DID land in SheetDB before network drop -> Reconciles cleanly to 201 with 1 row!
        let injectedAmbiguousOnce = false;
        nextSheetFault = async (_urlObj, init, mockSheets, method, tab) => {
            if (method === 'POST' && !injectedAmbiguousOnce) {
                injectedAmbiguousOnce = true;
                const parsed = JSON.parse(init.body || '{}');
                const rows = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
                mockSheets[tab].push({ ...rows[0] });
                const err = new Error('Socket hang up after server commit');
                err.name = 'AbortError';
                throw err;
            }
            return null;
        };

        const recovered = createMockReqRes({
            method: 'POST',
            body: {
                ...retryCandidate,
                address: '=CMD("calc") 14 Main Road, Rasipuram', // Verify formula-injection neutralization!
                plus2Group: 'Vocational',
                selectedElective: 'Mathematics',
            },
        });
        await registerHandler(recovered.req, recovered.res);
        nextSheetFault = null;

        assert.equal(recovered.getStatus(), 201, 'Reconciled write after transient failures must succeed cleanly');
        assert.equal(sheets.Scholarship_Students.length, 3, 'Must insert exactly 1 reconciled row without duplicates');
        const arunRow = sheets.Scholarship_Students[2];
        assert.equal(arunRow.address.startsWith('='), false, 'Formula-injection prefix = must be neutralized');
        assert.equal(arunRow.selected_elective, 'Mathematics', 'Vocational group must store Mathematics elective');
    });

    // =========================================================================
    // CATEGORY B: STUDENT AUTHENTICATION & AUTHORIZATION
    // =========================================================================

    await t.test('B1. Bare token lookup without session or mobile requires identity verification (HTTP 401, zero PII leaked)', async () => {
        const bare = createMockReqRes({
            method: 'POST',
            body: { token: studentAToken },
        });
        await verifyTokenHandler(bare.req, bare.res);
        assert.equal(bare.getStatus(), 401);
        assert.equal(bare.getJson().requiresVerification, true);
        assert.equal(bare.getJson().student, undefined, 'Must NEVER leak student PII on unverified token lookup');

        const wrongMob = createMockReqRes({
            method: 'POST',
            body: { token: studentAToken, mobile: '9000000000' },
        });
        await verifyTokenHandler(wrongMob.req, wrongMob.res);
        assert.equal(wrongMob.getStatus(), 401);
        assert.equal(wrongMob.getJson().student, undefined);
    });

    await t.test('B2. Valid login (token + registered mobile) issues non-PII JWT; invalid token returns 404', async () => {
        const missingTok = createMockReqRes({
            method: 'POST',
            body: { token: 'RASI-209999-NONEXT', mobile: '9876543210' },
        });
        await verifyTokenHandler(missingTok.req, missingTok.res);
        assert.equal(missingTok.getStatus(), 404);

        const validLogin = createMockReqRes({
            method: 'POST',
            body: { token: studentAToken, mobile: '9876543210' },
        });
        await verifyTokenHandler(validLogin.req, validLogin.res);
        assert.equal(validLogin.getStatus(), 200);
        const body = validLogin.getJson();
        assert.equal(body.success, true);
        assert.ok(body.data.accessToken);
        assert.equal(body.data.registrationToken, studentAToken);

        // Inspect decoded JWT payload: zero PII allowed
        const decoded = jwt.decode(body.data.accessToken);
        assert.equal(decoded.purpose, 'scholarship_student');
        assert.equal(decoded.appNo, studentAToken);
        assert.equal(decoded.name, undefined);
        assert.equal(decoded.mobile, undefined);
        assert.equal(decoded.aadhaar, undefined);
    });

    await t.test('B3. Expired token, revoked token, and privilege-escalation against Admin verifyToken are strictly blocked', async () => {
        // Expired student token (-10 seconds TTL)
        const expiredJwt = signScholarshipToken(
            { studentReferenceId: 'stu_exp_1', applicationNumber: studentAToken },
            { expiresInSeconds: -10 }
        );
        const expCheck = verifyScholarshipToken({
            headers: { authorization: `Bearer ${expiredJwt}` },
        });
        assert.equal(expCheck.valid, false);
        assert.equal(expCheck.reason, 'EXPIRED');

        // Revoked student token
        const tempJwt = signScholarshipToken({
            studentReferenceId: 'stu_rev_1',
            applicationNumber: studentAToken,
        });
        revokeScholarshipToken(tempJwt);
        const revCheck = verifyScholarshipToken({
            headers: { authorization: `Bearer ${tempJwt}` },
        });
        assert.equal(revCheck.valid, false);
        assert.equal(revCheck.reason, 'REVOKED');

        // Privilege escalation guard: Student JWT presented as Admin Bearer token MUST return null!
        const adminVerifyResult = verifyAdminToken({
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            query: {},
        });
        assert.equal(adminVerifyResult, null, 'Candidate JWT must NEVER be accepted by Admin verifyToken()');
    });

    // =========================================================================
    // CATEGORY C: OFFICIAL 60-QUESTION EXAMINATION FLOW
    // =========================================================================

    await t.test('C1. Cross-student start-test is blocked (403); owner starts 60-question (20+20+20) 90-minute exam', async () => {
        // Student B trying to start Student A's exam -> 403
        const crossStart = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            body: { registrationToken: studentAToken, thirdSubject: 'Mathematics', language: 'English' },
        });
        await startTestHandler(crossStart.req, crossStart.res);
        assert.equal(crossStart.getStatus(), 403);

        // Student A starts exam with Tamil medium & Biology elective (Academic group allows Biology)
        const startA = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { registrationToken: studentAToken, thirdSubject: 'Biology', language: 'Tamil' },
        });
        await startTestHandler(startA.req, startA.res);
        assert.equal(startA.getStatus(), 201);
        const startBody = startA.getJson();
        assert.equal(startBody.data.totalQuestions, 60);
        assert.equal(startBody.data.duration, 90);
        assert.equal(startBody.data.language, 'Tamil');
        assert.deepEqual(startBody.data.subjects, ['Physics', 'Chemistry', 'Biology']);

        studentASessionId = String(startBody.data.sessionId);
        studentAAccessToken = startBody.data.accessToken;

        // Resume check: calling start-test again while in_progress resumes same session without creating a 2nd session
        const resumeA = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { registrationToken: studentAToken, thirdSubject: 'Biology', language: 'Tamil' },
        });
        await startTestHandler(resumeA.req, resumeA.res);
        assert.equal(resumeA.getStatus(), 200);
        assert.equal(resumeA.getJson().data.resuming, true);
        assert.equal(String(resumeA.getJson().data.sessionId), studentASessionId);
    });

    await t.test('C2. Questions endpoint renders Tamil medium without leaking correctAnswer, and blocks Student B (403)', async () => {
        const crossQ = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            query: { sessionId: studentASessionId },
        });
        await questionsHandler(crossQ.req, crossQ.res);
        assert.equal(crossQ.getStatus(), 403);

        const qRes = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            query: { sessionId: studentASessionId },
        });
        await questionsHandler(qRes.req, qRes.res);
        assert.equal(qRes.getStatus(), 200);
        const body = qRes.getJson().data;
        assert.equal(body.questions.length, 60);
        assert.equal(body.language, 'Tamil');

        const phyCount = body.questions.filter((q) => q.subject === 'Physics').length;
        const cheCount = body.questions.filter((q) => q.subject === 'Chemistry').length;
        const bioCount = body.questions.filter((q) => q.subject === 'Biology').length;
        assert.equal(phyCount, 20);
        assert.equal(cheCount, 20);
        assert.equal(bioCount, 20);

        // Verify Tamil text rendered and zero answer leakage
        assert.ok(body.questions[0].questionText.includes('வினா'), 'Tamil medium must render Tamil Unicode text');
        for (const q of body.questions) {
            assert.equal(q.correctAnswer, undefined, 'Must NEVER leak correctAnswer to client');
            assert.equal(q.isCorrect, undefined, 'Must NEVER leak isCorrect to client');
        }
    });

    await t.test('C3. Answer persistence maps shuffled options accurately & rejects saves after 90-minute timer expiry', async () => {
        const storedSession = memorySessions.get(studentASessionId);
        assert.ok(storedSession);

        // Answer 45 questions correctly (finding whichever shuffled displayLabel maps to originalLabel 'A')
        // and 5 questions wrongly (choosing a displayLabel that maps to 'B')
        for (let i = 0; i < 50; i++) {
            const qSlot = storedSession.questions[i];
            const targetOriginal = i < 45 ? 'A' : 'B';
            const mappedChoice = qSlot.shuffledOptions.find((o) => o.originalLabel === targetOriginal);

            const saveRes = createMockReqRes({
                method: 'POST',
                headers: { authorization: `Bearer ${studentAAccessToken}` },
                body: {
                    sessionId: studentASessionId,
                    questionId: String(qSlot.questionId),
                    answer: mappedChoice.displayLabel,
                    markedForReview: i === 0,
                },
            });
            await saveAnswerHandler(saveRes.req, saveRes.res);
            assert.equal(saveRes.getStatus(), 200);
        }

        // Simulate expired timer (> 90 minutes elapsed) and verify save-answer rejects with 400 testExpired: true
        const latestSession = memorySessions.get(studentASessionId);
        latestSession.startTime = new Date(Date.now() - 95 * 60 * 1000);
        const lateRes = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: {
                sessionId: studentASessionId,
                questionId: String(latestSession.questions[55].questionId),
                answer: 'A',
            },
        });
        await saveAnswerHandler(lateRes.req, lateRes.res);
        assert.equal(lateRes.getStatus(), 400);
        assert.equal(lateRes.getJson().testExpired, true);

        // Restore in_progress status & startTime (35 minutes elapsed) before testing normal submission in D1
        const afterLateSession = memorySessions.get(studentASessionId);
        afterLateSession.status = 'in_progress';
        afterLateSession.startTime = new Date(Date.now() - 35 * 60 * 1000);
    });

    // =========================================================================
    // CATEGORY D: RESULTS, RECOVERY, IDEMPOTENCY & PDF SCORECARD
    // =========================================================================

    await t.test('D1. Submit-test handles transient SheetDB outage safely (503 + recovery job), then persists exact 22-column result & compacts session', async () => {
        // Student B trying to submit Student A's exam -> 403
        const crossSub = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            body: { sessionId: studentASessionId },
        });
        await submitTestHandler(crossSub.req, crossSub.res);
        assert.equal(crossSub.getStatus(), 403);

        // Simulate transient SheetDB 503 during first submit attempt
        nextSheetFault = async (_u, _i, _s, method, tab) => {
            if (method === 'POST' && tab === 'Scholarship_Results') {
                return new Response(JSON.stringify({ error: 'Service unavailable' }), { status: 503 });
            }
            return null;
        };

        const failedSubmit = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: {
                sessionId: studentASessionId,
                score: 60, // Tampered client score must be completely ignored!
            },
        });
        await submitTestHandler(failedSubmit.req, failedSubmit.res);
        nextSheetFault = null;

        assert.equal(failedSubmit.getStatus(), 503, 'Must NOT report fake 200 when SheetDB result write fails');
        assert.equal(failedSubmit.getJson().retryable, true);
        assert.equal(sheets.Scholarship_Results.length, 0);
        assert.equal(memorySyncJobs.size, 1, 'Must enqueue durable SheetDBSyncJob for recovery');

        // Retry submit once SheetDB recovers -> 200, writes 22-column row, compacts TestSession!
        const okSubmit = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { sessionId: studentASessionId, score: 60 },
        });
        await submitTestHandler(okSubmit.req, okSubmit.res);
        assert.equal(okSubmit.getStatus(), 200);
        const resBody = okSubmit.getJson();
        assert.equal(resBody.success, true);
        assert.equal(resBody.data.score, 45, 'Server must compute authoritative score (45/60), ignoring client tampering');
        assert.equal(resBody.data.attemptedQuestions, 50);
        assert.equal(resBody.data.correctAnswers, 45);
        assert.equal(resBody.data.wrongAnswers, 5);
        assert.equal(resBody.data.unattemptedQuestions, 10);
        assert.equal(resBody.data.percentage, 75);

        assert.equal(sheets.Scholarship_Results.length, 1);
        const resultRow = sheets.Scholarship_Results[0];
        assert.deepEqual(Object.keys(resultRow), SCHOLARSHIP_RESULTS_HEADERS, 'Result row must match exact 22 SCHOLARSHIP_RESULTS_HEADERS');
        assert.equal(resultRow.optional_subject, 'Biology');
        assert.equal(resultRow.total_score, 45);
        assert.equal(resultRow.percentage, '75%');

        // Verify TestSession snapshot bloat was compacted after SheetDB confirmed persistence
        const compacted = memorySessions.get(studentASessionId);
        assert.equal(compacted.sheetdbSynced, true);
        assert.equal(compacted.questions, undefined, 'Heavy question snapshots must be $unset after SheetDB sync');
        assert.equal(compacted.answers, undefined, 'Raw answers array must be $unset after SheetDB sync');
        assert.ok(compacted.expiresAt instanceof Date, 'TTL expiresAt must be set on compacted session');

        // Repeated submit protection: 3rd call returns alreadySubmitted without duplicating SheetDB row
        const dupSubmit = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { sessionId: studentASessionId },
        });
        await submitTestHandler(dupSubmit.req, dupSubmit.res);
        assert.equal(dupSubmit.getStatus(), 200);
        assert.equal(dupSubmit.getJson().idempotentReplay, true);
        assert.equal(sheets.Scholarship_Results.length, 1, 'Repeated submit must NEVER create a duplicate row');
    });

    await t.test('D2. Result API & Certified PDF Scorecard enforce ownership (401/403) and serve valid scorecard to owner & admin', async () => {
        // Unauthenticated -> 401
        const unauthRes = createMockReqRes({ method: 'GET', query: { token: studentAToken } });
        await resultHandler(unauthRes.req, unauthRes.res);
        assert.equal(unauthRes.getStatus(), 401);

        // Student B trying to read Student A's result -> 403
        const crossRes = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            query: { token: studentAToken },
        });
        await resultHandler(crossRes.req, crossRes.res);
        assert.equal(crossRes.getStatus(), 403);

        // Student A reading own result -> 200
        const ownRes = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            query: { token: studentAToken },
        });
        await resultHandler(ownRes.req, ownRes.res);
        assert.equal(ownRes.getStatus(), 200);
        assert.equal(ownRes.getJson().data.result.score, 45);
        assert.equal(ownRes.getJson().data.student.name, 'Kavin Kumar S');

        // Student B trying to download Student A's PDF -> 403
        const crossPdf = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            query: { token: studentAToken },
        });
        await downloadResultHandler(crossPdf.req, crossPdf.res);
        assert.equal(crossPdf.getStatus(), 403);

        // Student A downloading own PDF -> 200 valid %PDF buffer
        const ownPdf = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            query: { token: studentAToken },
        });
        await downloadResultHandler(ownPdf.req, ownPdf.res);
        assert.equal(ownPdf.getStatus(), 200);
        const pdfBuf = ownPdf.getRaw();
        assert.ok(Buffer.isBuffer(pdfBuf) && pdfBuf.length > 500, 'Must generate non-empty PDF buffer');
        assert.equal(pdfBuf.subarray(0, 5).toString('ascii'), '%PDF-', 'Buffer must have valid %PDF- header');
        assert.ok(ownPdf.getHeaders()['cache-control']?.includes('no-store'));
    });

    // =========================================================================
    // CATEGORY E: FEEDBACK
    // =========================================================================

    await t.test('E1. Feedback validates required fields, enforces ownership, writes exact 12-column SheetDB row, and blocks duplicates', async () => {
        // Missing rating -> 400
        const badFb = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { sessionId: studentASessionId, difficultyRating: 'moderate' },
        });
        await feedbackHandler(badFb.req, badFb.res);
        assert.equal(badFb.getStatus(), 400);

        // Student B trying to post feedback on Student A's session -> 403
        const crossFb = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentBAccessToken}` },
            body: { sessionId: studentASessionId, overallRating: 5, difficultyRating: 'moderate' },
        });
        await feedbackHandler(crossFb.req, crossFb.res);
        assert.equal(crossFb.getStatus(), 403);

        // Valid feedback by Student A -> 201
        const okFb = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: {
                sessionId: studentASessionId,
                token: studentAToken,
                overallRating: 5,
                difficultyRating: 'moderate',
                clarityRating: 5,
                uiRating: 4,
                comments: 'Smooth bilingual Tamil/English scholarship test experience!',
            },
        });
        await feedbackHandler(okFb.req, okFb.res);
        assert.equal(okFb.getStatus(), 201);
        assert.equal(mongoFeedbackWriteAttempts, 0, 'Must NOT insert feedback into MongoDB ScholarshipExamFeedback');
        assert.equal(sheets.Scholarship_Feedback.length, 1);
        assert.deepEqual(Object.keys(sheets.Scholarship_Feedback[0]), SCHOLARSHIP_FEEDBACK_HEADERS, 'Must match exact 12 SCHOLARSHIP_FEEDBACK_HEADERS');

        // Duplicate feedback submission -> 409
        const dupFb = createMockReqRes({
            method: 'POST',
            headers: { authorization: `Bearer ${studentAAccessToken}` },
            body: { sessionId: studentASessionId, overallRating: 4, difficultyRating: 'easy' },
        });
        await feedbackHandler(dupFb.req, dupFb.res);
        assert.equal(dupFb.getStatus(), 409);
        assert.equal(sheets.Scholarship_Feedback.length, 1);

        // GET feedback summary requires admin permission
        const unauthGetFb = createMockReqRes({ method: 'GET' });
        await feedbackHandler(unauthGetFb.req, unauthGetFb.res);
        assert.equal(unauthGetFb.getStatus(), 401);
    });

    // =========================================================================
    // CATEGORY F: ADMIN SCHOLARSHIP DASHBOARD, RBAC & EXPORTS
    // =========================================================================

    await t.test('F1. Admin scholarship API joins SheetDB Students + Results + Feedback, supports search/filter/detail/exports & enforces RBAC', async () => {
        const superAdminJwt = signAdminJwt('super_admin');
        const standardAdminJwt = signAdminJwt('admin');
        const examManagerJwt = signAdminJwt('exam_manager');
        const counsellorJwt = signAdminJwt('counsellor');
        const unknownRoleJwt = signAdminJwt('viewer');

        // Counsellor & unknown roles fail closed on `scholarship_exam:view` -> 403
        const deniedCounsellor = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${counsellorJwt}` },
        });
        await adminScholarshipHandler(deniedCounsellor.req, deniedCounsellor.res);
        assert.equal(deniedCounsellor.getStatus(), 403);

        const deniedUnknown = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${unknownRoleJwt}` },
        });
        await adminScholarshipHandler(deniedUnknown.req, deniedUnknown.res);
        assert.equal(deniedUnknown.getStatus(), 401, 'Unrecognized role in JWT must fail closed');

        // Super Admin unified view -> 200 with all 3 registered candidates (1 completed, 2 registered) + 1 feedback
        const listAll = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${superAdminJwt}` },
            query: { view: 'all', page: '1', limit: '10', refresh: 'true' },
        });
        await adminScholarshipHandler(listAll.req, listAll.res);
        assert.equal(listAll.getStatus(), 200);
        const listData = listAll.getJson();
        assert.equal(listData.statistics.total, 3);
        assert.equal(listData.statistics.completed, 1);
        assert.equal(listData.statistics.registered, 2);
        assert.equal(listData.statistics.feedbackCount, 1);
        assert.equal(listData.statistics.avgFeedbackRating, 5);

        // Search filter + status filter
        const filtered = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${superAdminJwt}` },
            query: { search: 'Kavin', status: 'completed' },
        });
        await adminScholarshipHandler(filtered.req, filtered.res);
        assert.equal(filtered.getJson().results.length, 1);
        assert.equal(filtered.getJson().results[0].registrationToken, studentAToken);

        // Single-candidate detail lookup
        const detail = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${superAdminJwt}` },
            query: { detailToken: studentAToken },
        });
        await adminScholarshipHandler(detail.req, detail.res);
        assert.equal(detail.getStatus(), 200);
        assert.equal(detail.getJson().candidate.studentId.maskedAadhaar, 'XXXX-XXXX-9012');
        assert.equal(detail.getJson().candidate.feedback.overallRating, 5);

        // Standard Admin can view (200) but cannot DELETE exam sessions (403)
        const adminView = createMockReqRes({
            method: 'GET',
            headers: { authorization: `Bearer ${standardAdminJwt}` },
        });
        await adminScholarshipHandler(adminView.req, adminView.res);
        assert.equal(adminView.getStatus(), 200);

        const adminDelete = createMockReqRes({
            method: 'DELETE',
            headers: { authorization: `Bearer ${standardAdminJwt}` },
            query: { id: studentASessionId },
        });
        await adminScholarshipHandler(adminDelete.req, adminDelete.res);
        assert.equal(adminDelete.getStatus(), 403);

        // Exam Manager & Super Admin export XLSX, CSV, and PDF (200)
        for (const fmt of ['xlsx', 'csv', 'pdf']) {
            const expRes = createMockReqRes({
                method: 'GET',
                headers: { authorization: `Bearer ${examManagerJwt}` },
                query: { export: fmt },
            });
            await adminScholarshipHandler(expRes.req, expRes.res);
            assert.equal(expRes.getStatus(), 200, `Export format ${fmt} must return 200`);
            assert.ok(Buffer.isBuffer(expRes.getRaw()) && expRes.getRaw().length > 50, `Export ${fmt} must return non-empty buffer`);
        }

        // Verify legacy Sheet1 still has its untouched row
        assert.equal(sheets.Sheet1.length, 1);
        assert.equal(sheets.Sheet1[0].legacy_bio_id, 'BIO-001');
    });

    // =========================================================================
    // CATEGORY G & H: REGRESSION, QUOTA TELEMETRY & INFRASTRUCTURE READINESS
    // =========================================================================

    await t.test('G1. Core non-scholarship Mongoose models & public static assets remain intact', () => {
        for (const Model of [College, Course, Announcement, SiteSetting, BioData, CounsellingRecord, Payment, ScholarshipRegistrationLock]) {
            assert.ok(Model?.schema, `${Model?.modelName || 'Model'} schema must remain registered and valid`);
        }
        assert.ok(fs.existsSync(path.resolve('public/rasi-logo.png')), 'Public rasi-logo.png asset must exist');
        assert.ok(fs.existsSync(path.resolve('data/scholarship_questions/all_1600_questions.json')), '1,600-question master bank JSON must remain intact');
    });

    await t.test('H1. Infrastructure: MongoDB URI sanitization, Vercel SheetDB Basic Auth enforcement, Cron schedule & quota telemetry', async () => {
        // 1) MongoDB URI quote/whitespace sanitization & secret-free diagnostics
        const dirtyUri = '  "mongodb+srv://db_user:MyS3cr3tP@ss@cluster1.n12u8v2.mongodb.net/rasi-foundation?retryWrites=true" \r\n';
        const cleaned = sanitizeMongoUri(dirtyUri);
        assert.equal(cleaned.startsWith('mongodb+srv://'), true);
        assert.equal(cleaned.includes('"'), false);

        const diag = getSafeMongoDiagnostics(cleaned);
        assert.equal(JSON.stringify(diag).includes('MyS3cr3tP'), false, 'Diagnostics must NEVER expose MongoDB password');

        // 2) Vercel Basic Auth enforcement when SHEETDB_API_SECRET is missing
        const savedSecret = process.env.SHEETDB_API_SECRET;
        process.env.VERCEL = '1';
        delete process.env.SHEETDB_API_SECRET;
        const statusWhenPartial = SHEETDB_CONFIG.getStatus();
        assert.equal(statusWhenPartial.ready, false, 'Vercel environment must report ready=false when Basic Auth secret is missing');
        assert.ok(statusWhenPartial.missing.includes('SHEETDB_API_SECRET'));
        process.env.SHEETDB_API_SECRET = savedSecret;
        delete process.env.VERCEL;

        // 3) vercel.json cron & header verification
        const vercelCfg = JSON.parse(fs.readFileSync(path.resolve('vercel.json'), 'utf8'));
        assert.equal(vercelCfg.crons[0].path, '/api/cron/sheetdb-sync');
        assert.equal(vercelCfg.crons[0].schedule, '0 6 * * *', 'Cron must use Hobby-compatible once-daily schedule');

        const apiHeaderRule = vercelCfg.headers.find((h) => h.source === '/api/(.*)');
        assert.ok(apiHeaderRule, 'vercel.json must enforce Cache-Control headers on /api/(.*)');
        const ccHeader = apiHeaderRule.headers.find((h) => h.key.toLowerCase() === 'cache-control');
        assert.ok(ccHeader?.value.includes('no-store'));

        // 4) Cron endpoint rejects invalid secret (401)
        const badCron = createMockReqRes({
            method: 'GET',
            headers: { authorization: 'Bearer wrong_secret' },
        });
        await cronSyncHandler(badCron.req, badCron.res);
        assert.equal(badCron.getStatus(), 401);

        // 5) Verify SheetDB quota telemetry tracked requests cleanly
        const metrics = getSheetDBQuotaMetrics();
        assert.ok(metrics.requestsThisProcess > 0, 'SheetDB telemetry must count outgoing API requests');
    });
});
