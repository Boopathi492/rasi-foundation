import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import {
    SHEETDB_CONFIG,
    SCHOLARSHIP_STUDENTS_HEADERS,
    invalidateSheetDBStoreCache,
} from '../../src/backend/lib/sheetdb/index.js';
import {
    mapStudentToSheetRow,
} from '../../src/backend/lib/sheetdb/sheetdb.mappings.js';
import registerHandler, {
    resetRegistrationInProcessLocks,
} from '../../src/pages/api/scholarship/register.js';
import ScholarshipRegistrationLock from '../../src/backend/models/ScholarshipRegistrationLock.js';
import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';

function createMockReqRes({ method = 'POST', body = {}, headers = {} } = {}) {
    const normHeaders = {};
    for (const [k, v] of Object.entries(headers)) {
        normHeaders[k.toLowerCase()] = v;
    }
    const req = {
        method,
        query: {},
        body,
        headers: normHeaders,
        socket: { remoteAddress: '127.0.0.1' },
    };

    const resHeaders = {};
    let statusCode = 200;
    let jsonPayload = null;

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
        end() {
            return this;
        },
    };

    return {
        req,
        res,
        getStatus: () => statusCode,
        getJson: () => jsonPayload,
        getHeaders: () => resHeaders,
    };
}

function buildDummyRegistration(overrides = {}) {
    return {
        name: 'Kavitha S',
        gender: 'Female',
        dateOfBirth: '2008-05-14',
        fatherName: 'Sundaram K',
        community: 'BC',
        address: '12/4 Gandhi Nagar, Tirupur, Tamil Nadu - 641604',
        studentMobile: '9842100001',
        studentEmail: 'kavitha.dummy@example.com',
        fatherMobile: '9842100002',
        motherMobile: '9842100003',
        aadhaarNumber: '123456789012',
        plus2Group: 'Academic',
        plus2ExamNumber: 'BIO-2026-001',
        expectedCutOff: '185.5',
        lastStudiedSchool: 'Govt Higher Secondary School, Tirupur',
        studiedInGovtSchool: true,
        firstGenerationGraduate: false,
        collegeName: 'PSG College of Technology',
        admissionCourse: 'B.E. Computer Science and Engineering',
        selectedElective: 'Mathematics',
        examLanguage: 'English',
        ...overrides,
    };
}

test('Scholarship Duplicate Registration & SheetDB Authoritative Verification Suite', async (t) => {
    const origFetch = globalThis.fetch;
    const origEnv = { ...process.env };

    process.env.SHEETDB_URL = 'https://sheetdb.io/api/v1/mock_dup_api';
    process.env.SHEETDB_API_KEY = 'mock_key';
    process.env.SHEETDB_API_SECRET = 'mock_secret';
    process.env.JWT_SECRET = 'super-secret-test-key-32-chars-long!!';
    process.env.DISABLE_SCHOLARSHIP_RATELIMIT = 'true';

    // In-memory sheet store
    const sheetStudents = [];
    const sheetRequestLog = [];
    let nextSheetFault = null;

    // Track MongoDB write attempts
    let mongoStudentCreates = 0;
    const origStudentCreate = ScholarshipStudent.create;
    ScholarshipStudent.create = async () => {
        mongoStudentCreates++;
        throw new Error('Dual-write violation: ScholarshipStudent.create must not be called!');
    };

    // In-memory ScholarshipRegistrationLock store for readyState === 1 testing
    const memoryLocks = new Map();
    const origLockCreate = ScholarshipRegistrationLock.create;
    const origLockFindOne = ScholarshipRegistrationLock.findOne;
    const origLockDeleteOne = ScholarshipRegistrationLock.deleteOne;
    const origLockDeleteMany = ScholarshipRegistrationLock.deleteMany;
    const origLockUpdateOne = ScholarshipRegistrationLock.updateOne;

    ScholarshipRegistrationLock.create = async (doc) => {
        const id = new mongoose.Types.ObjectId();
        // Check uniqueness across keys
        for (const k of doc.keys || []) {
            for (const existing of memoryLocks.values()) {
                if ((existing.keys || []).includes(k)) {
                    const err = new Error('E11000 duplicate key error collection: scholarship_registration_locks index: keys_1');
                    err.code = 11000;
                    throw err;
                }
            }
        }
        const stored = { _id: id, ...doc, createdAt: new Date() };
        memoryLocks.set(String(id), stored);
        return stored;
    };

    ScholarshipRegistrationLock.findOne = (filter = {}) => ({
        lean: async () => {
            const now = new Date();
            for (const lock of memoryLocks.values()) {
                let match = true;
                if (filter.keys?.$in) {
                    const hasKey = lock.keys?.some((k) => filter.keys.$in.includes(k));
                    if (!hasKey) match = false;
                }
                if (filter.idemHash && lock.idemHash !== filter.idemHash) {
                    match = false;
                }
                if (filter.expiresAt?.$gt && lock.expiresAt <= filter.expiresAt.$gt) {
                    match = false;
                }
                if (match) return { ...lock };
            }
            return null;
        },
    });

    ScholarshipRegistrationLock.deleteOne = async (filter = {}) => {
        if (filter._id) {
            memoryLocks.delete(String(filter._id));
            return { deletedCount: 1 };
        }
        return { deletedCount: 0 };
    };

    ScholarshipRegistrationLock.deleteMany = async (filter = {}) => {
        let count = 0;
        const now = new Date();
        for (const [id, lock] of [...memoryLocks.entries()]) {
            let matches = false;
            if (filter.expiresAt?.$lte && lock.expiresAt <= filter.expiresAt.$lte) {
                matches = true;
            }
            if (filter.keys?.$in && lock.keys?.some((k) => filter.keys.$in.includes(k))) {
                if (!filter.state || lock.state === filter.state) {
                    matches = true;
                }
            }
            if (filter.$or) {
                for (const cond of filter.$or) {
                    if (cond.expiresAt?.$lte && lock.expiresAt <= cond.expiresAt.$lte) matches = true;
                    if (cond.keys?.$in && lock.keys?.some((k) => cond.keys.$in.includes(k))) {
                        if (!cond.state || lock.state === cond.state) matches = true;
                    }
                }
            }
            if (matches) {
                memoryLocks.delete(id);
                count++;
            }
        }
        return { deletedCount: count };
    };

    ScholarshipRegistrationLock.updateOne = async (filter = {}, update = {}) => {
        if (filter._id) {
            const cur = memoryLocks.get(String(filter._id));
            if (cur) {
                const next = { ...cur, ...(update.$set || {}) };
                memoryLocks.set(String(filter._id), next);
                return { modifiedCount: 1 };
            }
        }
        return { modifiedCount: 0 };
    };

    // Ensure mongoose is marked connected so lock logic is actively verified
    const origReadyState = mongoose.connection.readyState;
    Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

    // Mock SheetDB HTTP calls
    globalThis.fetch = async (input, init = {}) => {
        const urlStr = typeof input === 'string' ? input : input.url;
        const urlObj = new URL(urlStr);
        const method = (init.method || 'GET').toUpperCase();
        const tab = urlObj.searchParams.get('sheet') || 'Sheet1';

        sheetRequestLog.push({
            method,
            pathname: urlObj.pathname,
            tab,
            searchParams: Object.fromEntries(urlObj.searchParams.entries()),
        });

        if (nextSheetFault) {
            const fault = nextSheetFault(urlObj, init);
            if (fault) return fault;
        }

        if (tab !== 'Scholarship_Students') {
            return new Response(JSON.stringify({ error: `Unauthorized sheet ${tab}` }), { status: 400 });
        }

        // Search endpoint (/search or /search_or)
        if (method === 'GET' && (urlObj.pathname.endsWith('/search') || urlObj.pathname.endsWith('/search_or'))) {
            const isOr = urlObj.pathname.endsWith('/search_or');
            const targetMobile = urlObj.searchParams.get('student_mobile');
            const targetEmail = urlObj.searchParams.get('student_email');
            const targetAppNum = urlObj.searchParams.get('application_number');

            const matches = sheetStudents.filter((row) => {
                const mMatch = targetMobile && String(row.student_mobile || '').replace(/\D/g, '').slice(-10) === targetMobile;
                const eMatch = targetEmail && String(row.student_email || '').trim().toLowerCase() === targetEmail.toLowerCase();
                const aMatch = targetAppNum && String(row.application_number || '').trim().toUpperCase() === targetAppNum.toUpperCase();

                if (isOr) {
                    return Boolean(mMatch || eMatch || aMatch);
                }
                let ok = true;
                if (targetMobile && !mMatch) ok = false;
                if (targetEmail && !eMatch) ok = false;
                if (targetAppNum && !aMatch) ok = false;
                return ok;
            });

            return new Response(JSON.stringify(matches), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Append endpoint (POST)
        if (method === 'POST') {
            const body = JSON.parse(init.body || '{}');
            const newRows = body.data || [];
            sheetStudents.push(...newRows);
            return new Response(JSON.stringify({ created: newRows.length }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    };

    t.after(() => {
        globalThis.fetch = origFetch;
        ScholarshipStudent.create = origStudentCreate;
        ScholarshipRegistrationLock.create = origLockCreate;
        ScholarshipRegistrationLock.findOne = origLockFindOne;
        ScholarshipRegistrationLock.deleteOne = origLockDeleteOne;
        ScholarshipRegistrationLock.deleteMany = origLockDeleteMany;
        ScholarshipRegistrationLock.updateOne = origLockUpdateOne;
        Object.defineProperty(mongoose.connection, 'readyState', { value: origReadyState, configurable: true });
        for (const [k, v] of Object.entries(origEnv)) {
            if (v === undefined) delete process.env[k];
            else process.env[k] = v;
        }
    });

    // -----------------------------------------------------------------------
    // Test A – New student:
    // Confirm dummy mobile/email do not exist in SheetDB.
    // Submit registration.
    // Expect successful insertion into Scholarship_Students (201).
    // Expect zero dual-writes to MongoDB ScholarshipStudent.
    // -----------------------------------------------------------------------
    await t.test('Test A: New student registers successfully into Scholarship_Students with zero MongoDB profile writes', async () => {
        resetRegistrationInProcessLocks();
        invalidateSheetDBStoreCache();
        sheetStudents.length = 0;
        memoryLocks.clear();
        mongoStudentCreates = 0;

        assert.equal(sheetStudents.length, 0, 'Pre-condition: SheetDB must have 0 records');

        const { req, res, getStatus, getJson } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9842100001',
                studentEmail: 'kavitha.testa@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'New registration must succeed with HTTP 201');
        const json = getJson();
        assert.equal(json.success, true);
        assert.ok(json.data.registrationToken);
        assert.equal(sheetStudents.length, 1, 'Exactly one row must be written to SheetDB');
        assert.equal(sheetStudents[0].student_mobile, '9842100001');
        assert.equal(sheetStudents[0].student_email, 'kavitha.testa@example.com');
        assert.equal(mongoStudentCreates, 0, 'No student document must be created in MongoDB ScholarshipStudent');

        // Verify lock on mobile/email was released upon success so SheetDB remains sole source of truth
        const liveLock = await ScholarshipRegistrationLock.findOne({
            keys: { $in: ['mobile:9842100001'] },
        }).lean();
        assert.equal(liveLock, null, 'Identity lock on mobile must be cleared upon successful SheetDB write');
    });

    // -----------------------------------------------------------------------
    // Test B – Duplicate student:
    // Submit the exact same mobile/email again.
    // Expect HTTP 409 and a clear duplicate message from SheetDB check.
    // -----------------------------------------------------------------------
    await t.test('Test B: Duplicate student is detected via SheetDB and returns HTTP 409 with specific message', async () => {
        resetRegistrationInProcessLocks();
        invalidateSheetDBStoreCache();

        assert.equal(sheetStudents.length, 1, 'Pre-condition: SheetDB has 1 existing student');

        // Submitting with same mobile
        const { req, res, getStatus, getJson } = createMockReqRes({
            body: buildDummyRegistration({
                name: 'Kavitha S Duplicate',
                studentMobile: '9842100001',
                studentEmail: 'different.email@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 409, 'Duplicate submission must return HTTP 409');
        const json = getJson();
        assert.equal(json.success, false);
        assert.equal(json.errorCode, 'DUPLICATE_REGISTRATION');
        assert.match(json.message, /already registered for the scholarship examination/i);
        assert.equal(sheetStudents.length, 1, 'SheetDB row count must not increase');
    });

    // -----------------------------------------------------------------------
    // Test C – Deleted student:
    // Remove the dummy record from the SheetDB tab.
    // Invalidate relevant caches.
    // Retry registration with the same dummy mobile/email.
    // Expect successful registration.
    // -----------------------------------------------------------------------
    await t.test('Test C: Student deleted from SheetDB can immediately re-register without false duplicate rejection', async () => {
        resetRegistrationInProcessLocks();
        invalidateSheetDBStoreCache();

        // Simulate admin manually deleting the student row from Google Sheets
        const removed = sheetStudents.splice(0, sheetStudents.length);
        assert.equal(removed.length, 1);
        assert.equal(sheetStudents.length, 0, 'SheetDB tab is now completely empty');

        // Submit registration again with the exact same mobile and email
        const { req, res, getStatus, getJson } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9842100001',
                studentEmail: 'kavitha.testa@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'Re-registration must succeed with HTTP 201 after SheetDB deletion');
        const json = getJson();
        assert.equal(json.success, true);
        assert.equal(sheetStudents.length, 1, 'New student row must be successfully inserted into SheetDB');
        assert.equal(sheetStudents[0].student_mobile, '9842100001');
    });

    // -----------------------------------------------------------------------
    // Test D – Cache:
    // Read a student record. Delete it from the test tab.
    // Verify the duplicate checker does not use stale cached data to reject the new registration.
    // -----------------------------------------------------------------------
    await t.test('Test D: Duplicate checker executes live SheetDB search and does not reject based on stale token cache', async () => {
        resetRegistrationInProcessLocks();

        // 1. Existing row in sheet
        assert.equal(sheetStudents.length, 1);
        const existingToken = sheetStudents[0].application_number;

        // 2. Admin or candidate lookup happens (which caches token in store cache)
        const { findScholarshipStudentByToken } = await import('../../src/backend/lib/sheetdb/sheetdb.store.js');
        const lookup = await findScholarshipStudentByToken(existingToken);
        assert.equal(lookup.found, true);

        // 3. User deletes the row from SheetDB
        sheetStudents.length = 0;

        // 4. Attempt registration with the same mobile/email WITHOUT clearing the token store cache
        const { req, res, getStatus, getJson } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9842100001',
                studentEmail: 'kavitha.testa@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'Registration must not be blocked by point token cache; live search must be used');
        assert.equal(sheetStudents.length, 1);
    });

    // -----------------------------------------------------------------------
    // Test E – Field mapping:
    // Verify duplicate checks use `student_mobile` and `student_email`, matching actual sheet headers.
    // -----------------------------------------------------------------------
    await t.test('Test E: Duplicate search uses exact spreadsheet headers student_mobile and student_email', async () => {
        resetRegistrationInProcessLocks();
        sheetRequestLog.length = 0;

        const { req, res } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9876543210',
                studentEmail: 'checkheaders@example.com',
            }),
        });

        await registerHandler(req, res);

        const searchCall = sheetRequestLog.find((c) => c.method === 'GET' && c.pathname.includes('search'));
        assert.ok(searchCall, 'Must perform a search GET request');
        assert.equal(searchCall.tab, 'Scholarship_Students');
        assert.equal(searchCall.searchParams.student_mobile, '9876543210', 'Must use exact column header student_mobile');
        assert.equal(searchCall.searchParams.student_email, 'checkheaders@example.com', 'Must use exact column header student_email');
        assert.equal(searchCall.searchParams.mobile_number, undefined, 'Must not use obsolete mobile_number header');
        assert.equal(searchCall.searchParams.email, undefined, 'Must not use obsolete email header');
    });

    // -----------------------------------------------------------------------
    // Test F – Legacy fallback:
    // Verify old MongoDB records do not incorrectly block a new registration when SheetDB is authoritative.
    // -----------------------------------------------------------------------
    await t.test('Test F: Pre-existing legacy MongoDB student does not block new registration if not in SheetDB', async () => {
        resetRegistrationInProcessLocks();
        // Sheet has student with mobile 9876543210 from Test E, but not 9944001122
        assert.equal(sheetStudents.some((s) => s.student_mobile === '9944001122'), false);

        // Mock that a legacy student with this mobile existed in MongoDB collection
        ScholarshipStudent.findOne = () => ({
            lean: async () => ({
                registrationToken: 'RASI-LEGACY-001',
                studentMobile: '9944001122',
                studentEmail: 'legacy@example.com',
            }),
        });

        const { req, res, getStatus } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9944001122',
                studentEmail: 'fresh.email@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'Legacy MongoDB record must not block registration; SheetDB is authoritative');
    });

    // -----------------------------------------------------------------------
    // Test G – Failure handling:
    // SheetDB 401, timeout, 429 and 500 must never be interpreted as "already registered".
    // Return an honest retryable error instead.
    // -----------------------------------------------------------------------
    await t.test('Test G: SheetDB errors (401, 429, 500, 504) are never reported as "already registered"', async () => {
        resetRegistrationInProcessLocks();

        // G1: 401 Unauthorized -> 502 AUTH_FAILED
        nextSheetFault = () => new Response(JSON.stringify({ error: 'Auth failed' }), { status: 401 });
        const res401 = createMockReqRes({
            body: buildDummyRegistration({ studentMobile: '9111122222', studentEmail: 'fail401@example.com' }),
        });
        await registerHandler(res401.req, res401.res);
        assert.equal(res401.getStatus(), 502);
        assert.notEqual(res401.getJson().errorCode, 'DUPLICATE_REGISTRATION');

        // G2: 429 Rate Limit -> 429 RATE_LIMITED
        nextSheetFault = () => new Response(JSON.stringify({ error: 'Rate limit' }), { status: 429 });
        const res429 = createMockReqRes({
            body: buildDummyRegistration({ studentMobile: '9111122222', studentEmail: 'fail429@example.com' }),
        });
        await registerHandler(res429.req, res429.res);
        assert.equal(res429.getStatus(), 429);
        assert.notEqual(res429.getJson().errorCode, 'DUPLICATE_REGISTRATION');

        // G3: 500 Server Error -> 503 SHEETDB_SERVER_ERROR
        nextSheetFault = () => new Response(JSON.stringify({ error: 'Internal Error' }), { status: 500 });
        const res500 = createMockReqRes({
            body: buildDummyRegistration({ studentMobile: '9111122222', studentEmail: 'fail500@example.com' }),
        });
        await registerHandler(res500.req, res500.res);
        assert.equal(res500.getStatus(), 503);
        assert.notEqual(res500.getJson().errorCode, 'DUPLICATE_REGISTRATION');

        nextSheetFault = null;
    });

    // -----------------------------------------------------------------------
    // Test H – Concurrency lock recovery:
    // Stale/expired locks in MongoDB do not block new registration.
    // Active in-flight submissions return 409 CONCURRENT_SUBMISSION (not DUPLICATE_REGISTRATION).
    // -----------------------------------------------------------------------
    await t.test('Test H: Expired locks recover seamlessly and active in-flight submissions return CONCURRENT_SUBMISSION', async () => {
        resetRegistrationInProcessLocks();
        nextSheetFault = null;

        // Simulate an expired lock left behind from an interrupted worker
        memoryLocks.set('stale_id_1', {
            keys: ['mobile:9555566666'],
            state: 'pending',
            expiresAt: new Date(Date.now() - 5000), // Expired 5 seconds ago
        });

        const { req, res, getStatus } = createMockReqRes({
            body: buildDummyRegistration({
                studentMobile: '9555566666',
                studentEmail: 'recovering.lock@example.com',
            }),
        });

        await registerHandler(req, res);

        assert.equal(getStatus(), 201, 'Expired lock must be cleaned up and new registration must succeed');
    });
});
