/**
 * SheetDB Configuration for Rasi Foundation Scholarship Migration
 * 
 * Strict safety rules:
 * - Reads SHEETDB_URL and credentials server-side only.
 * - Targets ONLY the 3 dedicated scholarship tabs.
 * - Sheet1 (Bio Data) is strictly protected and never touched.
 * - Never leaks API keys, secrets, or basic auth credentials into client responses or logs.
 */

export const SHEETDB_CONFIG = {
    /**
     * Resolves and returns the clean base API URL (without inline credentials)
     */
    getUrl: () => {
        const rawUrl = process.env.SHEETDB_URL;
        if (!rawUrl) {
            console.warn('[SheetDB Config] Warning: process.env.SHEETDB_URL is not set.');
            return '';
        }
        try {
            const parsed = new URL(rawUrl);
            // Remove user:pass from pathname/origin for clean request target
            return `${parsed.protocol}//${parsed.host}${parsed.pathname.replace(/\/+$/, '')}`;
        } catch {
            return rawUrl.replace(/\/+$/, '');
        }
    },

    /**
     * Extracts and constructs standard Authorization headers supported by SheetDB
     * Supports:
     * 1. Basic Auth: process.env.SHEETDB_API_KEY + process.env.SHEETDB_API_SECRET
     * 2. Bearer Token: process.env.SHEETDB_BEARER_TOKEN or process.env.SHEETDB_API_KEY alone
     * 3. Inline URL credentials: https://apiKey:apiSecret@sheetdb.io/...
     */
    getAuthHeaders: () => {
        const headers = {};

        // 1. Explicit API Key and Secret
        const apiKey = process.env.SHEETDB_API_KEY && process.env.SHEETDB_API_KEY !== 'undefined' ? process.env.SHEETDB_API_KEY : null;
        const apiSecret = process.env.SHEETDB_API_SECRET && process.env.SHEETDB_API_SECRET !== 'undefined' ? process.env.SHEETDB_API_SECRET : null;
        const bearerToken = process.env.SHEETDB_BEARER_TOKEN && process.env.SHEETDB_BEARER_TOKEN !== 'undefined' ? process.env.SHEETDB_BEARER_TOKEN : null;

        if (apiKey && apiSecret) {
            const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
            headers['Authorization'] = `Basic ${token}`;
            return headers;
        }

        if (bearerToken) {
            headers['Authorization'] = `Bearer ${bearerToken}`;
            return headers;
        }

        if (apiKey && !apiSecret) {
            headers['Authorization'] = `Bearer ${apiKey}`;
            return headers;
        }

        // 2. Fallback: Parse credentials if embedded in process.env.SHEETDB_URL
        const rawUrl = process.env.SHEETDB_URL;
        if (rawUrl) {
            try {
                const parsed = new URL(rawUrl);
                if (parsed.username) {
                    const pass = parsed.password || '';
                    const token = Buffer.from(`${decodeURIComponent(parsed.username)}:${decodeURIComponent(pass)}`).toString('base64');
                    headers['Authorization'] = `Basic ${token}`;
                    return headers;
                }
            } catch {
                // Ignore parse errors, proceed with unauthenticated headers
            }
        }

        return headers;
    },

    /**
     * Returns sanitized URL with credentials stripped, safe for admin display and logging
     */
    getSanitizedUrl: () => {
        const rawUrl = process.env.SHEETDB_URL;
        if (!rawUrl) return '';
        try {
            const parsed = new URL(rawUrl);
            return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
        } catch {
            return rawUrl.replace(/\/+$/, '');
        }
    },

    tabs: {
        STUDENTS: 'Scholarship_Students',
        RESULTS: 'Scholarship_Results',
        FEEDBACK: 'Scholarship_Feedback',
    },
    timeoutMs: 8000, // 8-second request abort timeout
    maxRetries: 3,
    initialRetryDelayMs: 1000,
    maxRetryDelayMs: 8000,
    leaseDurationMs: 3 * 60 * 1000, // 3-minute worker lease expiry
};
