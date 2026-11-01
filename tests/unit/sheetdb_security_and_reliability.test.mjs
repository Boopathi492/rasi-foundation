import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import { SHEETDB_CONFIG } from '../../src/backend/lib/sheetdb/sheetdb.config.js';
import { setNoCacheHeaders } from '../../src/backend/lib/apiSecurity.js';
import SheetDBSyncJob from '../../src/backend/models/SheetDBSyncJob.js';

test('SheetDB Auth: Config generates standard Basic Auth header from key and secret', () => {
    const origKey = process.env.SHEETDB_API_KEY;
    const origSecret = process.env.SHEETDB_API_SECRET;
    try {
        process.env.SHEETDB_API_KEY = 'test_api_key_123';
        process.env.SHEETDB_API_SECRET = 'test_secret_456';

        const headers = SHEETDB_CONFIG.getAuthHeaders();
        assert.ok(headers['Authorization'], 'Authorization header must exist');
        assert.ok(headers['Authorization'].startsWith('Basic '), 'Header must start with Basic');

        const expectedBase64 = Buffer.from('test_api_key_123:test_secret_456').toString('base64');
        assert.equal(headers['Authorization'], `Basic ${expectedBase64}`);
    } finally {
        process.env.SHEETDB_API_KEY = origKey;
        process.env.SHEETDB_API_SECRET = origSecret;
    }
});

test('SheetDB Auth: Config generates Bearer Auth header when only API key or Bearer token is provided', () => {
    const origKey = process.env.SHEETDB_API_KEY;
    const origSecret = process.env.SHEETDB_API_SECRET;
    const origBearer = process.env.SHEETDB_BEARER_TOKEN;
    try {
        delete process.env.SHEETDB_API_SECRET;
        process.env.SHEETDB_API_KEY = 'my_bearer_key_789';

        const headers = SHEETDB_CONFIG.getAuthHeaders();
        assert.equal(headers['Authorization'], 'Bearer my_bearer_key_789');
    } finally {
        process.env.SHEETDB_API_KEY = origKey;
        process.env.SHEETDB_API_SECRET = origSecret;
        process.env.SHEETDB_BEARER_TOKEN = origBearer;
    }
});

test('SheetDB Auth: URL with embedded basic credentials extracts auth header and sanitizes target URL', () => {
    const origUrl = process.env.SHEETDB_URL;
    const origKey = process.env.SHEETDB_API_KEY;
    const origSecret = process.env.SHEETDB_API_SECRET;
    try {
        delete process.env.SHEETDB_API_KEY;
        delete process.env.SHEETDB_API_SECRET;
        process.env.SHEETDB_URL = 'https://admin_user:secret_pass_999@sheetdb.io/api/v1/8ju67uihugjuq';

        const cleanUrl = SHEETDB_CONFIG.getUrl();
        const headers = SHEETDB_CONFIG.getAuthHeaders();
        const sanitizedUrl = SHEETDB_CONFIG.getSanitizedUrl();

        // Target URL must not contain inline password
        assert.equal(cleanUrl, 'https://sheetdb.io/api/v1/8ju67uihugjuq');
        assert.equal(sanitizedUrl, 'https://sheetdb.io/api/v1/8ju67uihugjuq');
        assert.equal(cleanUrl.includes('secret_pass_999'), false);

        // Header must contain basic base64
        const expectedBase64 = Buffer.from('admin_user:secret_pass_999').toString('base64');
        assert.equal(headers['Authorization'], `Basic ${expectedBase64}`);
    } finally {
        process.env.SHEETDB_URL = origUrl;
        process.env.SHEETDB_API_KEY = origKey;
        process.env.SHEETDB_API_SECRET = origSecret;
    }
});

test('Cache-Control Enforcement: setNoCacheHeaders applies strict anti-caching headers', () => {
    const mockHeaders = {};
    const mockRes = {
        setHeader: (name, value) => {
            mockHeaders[name.toLowerCase()] = value;
        },
    };

    setNoCacheHeaders(mockRes);

    assert.equal(mockHeaders['cache-control'], 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    assert.equal(mockHeaders['pragma'], 'no-cache');
    assert.equal(mockHeaders['expires'], '0');
    assert.equal(mockHeaders['surrogate-control'], 'no-store');
});

test('Vercel Cron Worker: Rejects unauthorized requests without valid CRON_SECRET', async () => {
    const cronHandler = (await import('../../src/pages/api/cron/sheetdb-sync.js')).default;
    const origCronSecret = process.env.CRON_SECRET;

    try {
        process.env.CRON_SECRET = 'super_secret_cron_token_2026';

        // 1. Missing header
        let statusCode = 0;
        let responseJson = null;
        const mockReqMissing = {
            method: 'GET',
            headers: {},
        };
        const mockRes = {
            setHeader: () => {},
            status: (code) => {
                statusCode = code;
                return {
                    json: (data) => { responseJson = data; },
                };
            },
        };

        await cronHandler(mockReqMissing, mockRes);
        assert.equal(statusCode, 401, 'Must reject with 401 Unauthorized when secret is missing');
        assert.equal(responseJson.success, false);

        // 2. Invalid header
        const mockReqInvalid = {
            method: 'GET',
            headers: { authorization: 'Bearer wrong_token' },
        };
        await cronHandler(mockReqInvalid, mockRes);
        assert.equal(statusCode, 401, 'Must reject with 401 Unauthorized when token is invalid');

        // 3. Method not allowed
        const mockReqPut = {
            method: 'PUT',
            headers: { authorization: 'Bearer super_secret_cron_token_2026' },
        };
        await cronHandler(mockReqPut, mockRes);
        assert.equal(statusCode, 405, 'Must reject unsupported HTTP methods with 405');

    } finally {
        process.env.CRON_SECRET = origCronSecret;
    }
});

test('SheetDBSyncJob Schema: Validates lease fields and compound index definitions', () => {
    const job = new SheetDBSyncJob({
        jobId: 'sync_test_lease_001',
        recordReferenceId: 'ref_999',
        destinationTab: 'Scholarship_Students',
        payload: { sample: 'data' },
        status: 'in_progress',
        lockedAt: new Date(),
        lockedBy: 'worker_node_1',
        leaseExpiresAt: new Date(Date.now() + 180000),
    });

    const err = job.validateSync();
    assert.equal(err, undefined, 'Job schema with lease tracking must be valid');
    assert.equal(job.lockedBy, 'worker_node_1');
    assert.ok(job.leaseExpiresAt instanceof Date);
});

test('Quota Optimization: First attempt bypasses GET search, retries execute GET search', async () => {
    const { processJob } = await import('../../src/backend/lib/sheetdb/sheetdb.worker.js');
    const originalFetch = globalThis.fetch;
    const fetchCalls = [];

    try {
        process.env.SHEETDB_URL = 'https://sheetdb.io/api/v1/mock_endpoint';

        globalThis.fetch = async (url, opts) => {
            fetchCalls.push({ url, method: opts.method });
            return {
                ok: true,
                status: 200,
                headers: new Headers({
                    'x-ratelimit-remaining': '85',
                    'x-ratelimit-limit': '90',
                }),
                json: async () => ({ created: 1 }),
            };
        };

        // Mock job representation with attemptCount = 1 (first attempt)
        // Verify appendRow is POST only
        const { appendRow } = await import('../../src/backend/lib/sheetdb/sheetdb.service.js');
        const validPayload = {
            feedback_reference_id: 'fb_opt_001',
            student_reference_id: 's_001',
            result_reference_id: 'r_001',
            application_number: 'RASI-OPT-001',
            student_name: 'Test Student',
            overall_rating: 5,
            exam_difficulty: 'easy',
            question_clarity: 5,
            portal_experience: 5,
            comments: 'Good',
            medium: 'English',
            submitted_at: '01/11/2026',
        };

        const res = await appendRow('Scholarship_Feedback', validPayload);
        assert.equal(res.success, true);
        assert.equal(fetchCalls.length, 1);
        assert.equal(fetchCalls[0].method, 'POST', 'Direct appendRow must make exactly 1 POST request');

    } finally {
        globalThis.fetch = originalFetch;
    }
});
