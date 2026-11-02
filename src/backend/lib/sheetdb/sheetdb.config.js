/**
 * SheetDB Configuration for Rasi Foundation scholarship storage.
 *
 * This file is the ONLY place that reads SheetDB environment variables.
 * Variable names (exactly as configured in Vercel):
 *   SHEETDB_URL         - API endpoint (https://sheetdb.io/api/v1/<id>)
 *   SHEETDB_API_KEY     - Basic Auth user
 *   SHEETDB_API_SECRET  - Basic Auth password
 * (CRON_SECRET is read by the cron route only.)
 *
 * Safety rules:
 * - Values are read lazily (per call), never at import time, so `next build` does not need them.
 * - Values are never logged, returned in API responses or sent to the browser. Only variable NAMES
 *   and booleans are exposed through getStatus().
 * - Targets ONLY the 3 dedicated scholarship tabs. Sheet1 (Bio Data) is never touched.
 */

const REQUIRED_VARS = ['SHEETDB_URL', 'SHEETDB_API_KEY', 'SHEETDB_API_SECRET'];

/** Reads an env var; treats '', whitespace, and the literal string 'undefined' as "not set". */
function readEnv(name) {
    const raw = process.env[name];
    if (typeof raw !== 'string') return '';
    let value = raw.trim();
    // Vercel/dotenv copy-paste often leaves surrounding quotes behind.
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1).trim();
    }
    if (!value || value === 'undefined' || value === 'null') return '';
    return value;
}

function authRequired() {
    // Enforced on all Vercel deployments (Preview + Production set VERCEL=1) or when explicitly opted in.
    return Boolean(readEnv('VERCEL')) || readEnv('SHEETDB_ENFORCE_AUTH') === 'true';
}

function getEmbeddedUrlAuth() {
    const rawUrl = readEnv('SHEETDB_URL');
    if (!rawUrl) return null;
    try {
        const parsed = new URL(rawUrl);
        if (parsed.username) {
            const pass = parsed.password || '';
            const token = Buffer.from(`${decodeURIComponent(parsed.username)}:${decodeURIComponent(pass)}`).toString('base64');
            return `Basic ${token}`;
        }
    } catch {
        // Unparseable URL: reported through getStatus().
    }
    return null;
}

export const SHEETDB_CONFIG = {
    /** Resolves the clean base API URL (without inline credentials, without trailing slash). */
    getUrl: () => {
        const rawUrl = readEnv('SHEETDB_URL');
        if (!rawUrl) return '';
        try {
            const parsed = new URL(rawUrl);
            return `${parsed.protocol}//${parsed.host}${parsed.pathname.replace(/\/+$/, '')}`;
        } catch {
            return rawUrl.replace(/\/+$/, '');
        }
    },

    /**
     * SheetDB Authentication header, attached to EVERY request by the service layer.
     *  1. SHEETDB_API_KEY + SHEETDB_API_SECRET  -> Basic <base64(key:secret)>
     *  2. Credentials embedded in SHEETDB_URL   -> Basic <base64(user:pass)>
     *  3. SHEETDB_BEARER_TOKEN or lone API key  -> Bearer <token> (legacy / token-mode fallback)
     */
    getAuthHeaders: () => {
        const apiKey = readEnv('SHEETDB_API_KEY');
        const apiSecret = readEnv('SHEETDB_API_SECRET');

        if (apiKey && apiSecret) {
            const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
            return { Authorization: `Basic ${token}` };
        }

        const embedded = getEmbeddedUrlAuth();
        if (embedded) {
            return { Authorization: embedded };
        }

        const bearer = readEnv('SHEETDB_BEARER_TOKEN') || (!authRequired() ? apiKey : '');
        if (bearer) {
            return { Authorization: `Bearer ${bearer}` };
        }

        return {};
    },

    /** Returns sanitized URL with credentials stripped, safe for admin display and logging. */
    getSanitizedUrl: () => {
        const rawUrl = readEnv('SHEETDB_URL');
        if (!rawUrl) return '';
        try {
            const parsed = new URL(rawUrl);
            return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
        } catch {
            return '';
        }
    },

    /**
     * Configuration health WITHOUT any secret values.
     * `ready` is false when SHEETDB_URL is missing, or (in Vercel / enforced mode) when Basic Auth
     * credentials (SHEETDB_API_KEY + SHEETDB_API_SECRET) are missing/partial.
     */
    getStatus: () => {
        const hasUrl = Boolean(SHEETDB_CONFIG.getUrl());
        const hasKey = Boolean(readEnv('SHEETDB_API_KEY'));
        const hasSecret = Boolean(readEnv('SHEETDB_API_SECRET'));
        const hasEmbeddedBasic = Boolean(getEmbeddedUrlAuth());
        const hasBasicAuth = (hasKey && hasSecret) || hasEmbeddedBasic;
        const hasAuthHeader = Boolean(SHEETDB_CONFIG.getAuthHeaders().Authorization);
        const enforce = authRequired();
        const missing = [];
        if (!hasUrl) missing.push('SHEETDB_URL');
        if (enforce && !hasBasicAuth) {
            if (!hasKey) missing.push('SHEETDB_API_KEY');
            if (!hasSecret) missing.push('SHEETDB_API_SECRET');
        }
        return {
            ready: missing.length === 0,
            missing,
            urlConfigured: hasUrl,
            authConfigured: hasBasicAuth || hasAuthHeader,
            basicAuthConfigured: hasBasicAuth,
            authPartial: (hasKey !== hasSecret) && !hasEmbeddedBasic,
            authEnforced: enforce,
            cronSecretConfigured: Boolean(readEnv('CRON_SECRET')),
            environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'unknown',
            requiredVariables: [...REQUIRED_VARS],
        };
    },

    tabs: {
        STUDENTS: 'Scholarship_Students',
        RESULTS: 'Scholarship_Results',
        FEEDBACK: 'Scholarship_Feedback',
    },

    timeoutMs: 8000, // background/worker request abort timeout
    interactiveTimeoutMs: 3500, // student-facing requests (Vercel functions are capped at 10s)
    maxRetries: 3,
    initialRetryDelayMs: 1000,
    maxRetryDelayMs: 8000,
    leaseDurationMs: 3 * 60 * 1000, // 3-minute worker lease expiry
    pageSize: 500, // rows per list request
    maxRows: 5000, // hard safety cap for list-all reads
};
