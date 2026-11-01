/**
 * SheetDB Centralized Client Service
 *
 * Implements server-only HTTP calls with AbortController timeouts,
 * API authentication headers, payload validation, rate-limit tracking,
 * and duplicate prevention.
 */

import { SHEETDB_CONFIG } from './sheetdb.config.js';
import { validateSheetPayload } from './sheetdb.schemas.js';

// In-memory telemetry cache for quota tracking
let lastQuotaMetrics = {
    remainingRequests: null,
    limit: null,
    lastCheckedAt: null,
    lastStatusCode: null,
    isQuotaExceeded: false,
};

export function getSheetDBQuotaMetrics() {
    return { ...lastQuotaMetrics };
}

/**
 * Searches for existing rows in a tab by column match (e.g. application_number or result_reference_id)
 * Used to ensure idempotent writes without creating duplicates.
 */
export async function searchRow(tabName, queryParam, queryValue) {
    const baseUrl = SHEETDB_CONFIG.getUrl();
    if (!baseUrl) {
        return { success: false, error: 'SHEETDB_URL is not configured', found: false };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SHEETDB_CONFIG.timeoutMs);

    try {
        const authHeaders = SHEETDB_CONFIG.getAuthHeaders();
        const searchUrl = `${baseUrl}/search?sheet=${encodeURIComponent(tabName)}&${encodeURIComponent(queryParam)}=${encodeURIComponent(queryValue)}`;
        const res = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                ...authHeaders,
            },
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (res.headers.has('x-ratelimit-remaining')) {
            lastQuotaMetrics = {
                remainingRequests: parseInt(res.headers.get('x-ratelimit-remaining'), 10),
                limit: parseInt(res.headers.get('x-ratelimit-limit'), 10),
                lastCheckedAt: new Date(),
                lastStatusCode: res.status,
                isQuotaExceeded: res.status === 402,
            };
        }

        if (res.ok) {
            const data = await res.json();
            const exists = Array.isArray(data) && data.length > 0;
            return {
                success: true,
                found: exists,
                count: Array.isArray(data) ? data.length : 0,
                records: exists ? data : [],
            };
        }

        // Handle specific HTTP error cases
        let errorDetails = `SheetDB search failed with status ${res.status}`;
        if (res.status === 401 || res.status === 403) {
            errorDetails = 'SheetDB Authentication Failure: Invalid or missing API credentials';
        } else if (res.status === 402) {
            errorDetails = 'SheetDB Quota Exhausted: 500 requests/month free tier allowance reached';
            lastQuotaMetrics.isQuotaExceeded = true;
        } else if (res.status === 429) {
            errorDetails = 'SheetDB Rate Limit: 90 requests/minute exceeded';
        }

        return {
            success: false,
            found: false,
            status: res.status,
            error: errorDetails,
        };
    } catch (err) {
        clearTimeout(timeout);
        return {
            success: false,
            found: false,
            error: err.name === 'AbortError' ? 'SheetDB search request timed out' : err.message,
        };
    }
}

/**
 * Appends a validated row to one of the 3 dedicated scholarship tabs.
 * Never touches Sheet1 or any unauthorized sheet.
 */
export async function appendRow(tabName, rowData) {
    // 1. Enforce allowed tabs only
    const allowedTabs = Object.values(SHEETDB_CONFIG.tabs);
    if (!allowedTabs.includes(tabName)) {
        return {
            success: false,
            error: `Forbidden destination tab '${tabName}'. Must be one of: ${allowedTabs.join(', ')}`,
            retryable: false,
        };
    }

    // 2. Strict schema and header validation
    const validation = validateSheetPayload(tabName, rowData);
    if (!validation.isValid) {
        return {
            success: false,
            error: validation.error,
            retryable: false,
        };
    }

    // 3. Verify server-side URL
    const baseUrl = SHEETDB_CONFIG.getUrl();
    if (!baseUrl) {
        return {
            success: false,
            error: 'SHEETDB_URL environment variable is missing on server',
            retryable: false,
        };
    }

    // 4. HTTP POST with AbortController timeout and Auth headers
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SHEETDB_CONFIG.timeoutMs);

    try {
        const authHeaders = SHEETDB_CONFIG.getAuthHeaders();
        const targetUrl = `${baseUrl}?sheet=${encodeURIComponent(tabName)}`;
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...authHeaders,
            },
            body: JSON.stringify({ data: [rowData] }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        // Update quota telemetry
        if (response.headers.has('x-ratelimit-remaining')) {
            lastQuotaMetrics = {
                remainingRequests: parseInt(response.headers.get('x-ratelimit-remaining'), 10),
                limit: parseInt(response.headers.get('x-ratelimit-limit'), 10),
                lastCheckedAt: new Date(),
                lastStatusCode: response.status,
                isQuotaExceeded: response.status === 402,
            };
        }

        if (response.status === 201 || response.status === 200) {
            const resultData = await response.json();
            return {
                success: true,
                statusCode: response.status,
                data: resultData,
                metrics: getSheetDBQuotaMetrics(),
            };
        }

        // Handle specific error codes
        let errorDetails = `HTTP ${response.status} ${response.statusText}`;
        let isRetryable = false;

        if (response.status === 401 || response.status === 403) {
            errorDetails = 'SheetDB Authentication Failure: Invalid or missing API credentials';
            isRetryable = false; // Never retry auth failures in loop
        } else if (response.status === 402) {
            errorDetails = 'SheetDB Quota Exhausted: 500 requests/month free tier allowance reached';
            lastQuotaMetrics.isQuotaExceeded = true;
            isRetryable = false; // Cannot retry until quota reset or upgrade
        } else if (response.status === 429) {
            errorDetails = 'SheetDB Rate Limit: 90 requests/minute exceeded';
            isRetryable = true; // Retry with exponential backoff
        } else if (response.status >= 500 && response.status <= 599) {
            try {
                const errJson = await response.json();
                if (errJson?.error) errorDetails = errJson.error;
            } catch {
                // Not JSON
            }
            isRetryable = true; // Temporary server failure
        } else {
            try {
                const errJson = await response.json();
                if (errJson?.error) errorDetails = errJson.error;
            } catch {
                // Not JSON
            }
            isRetryable = false;
        }

        return {
            success: false,
            statusCode: response.status,
            error: errorDetails,
            retryable: isRetryable,
            metrics: getSheetDBQuotaMetrics(),
        };

    } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err.name === 'AbortError';
        return {
            success: false,
            statusCode: isTimeout ? 408 : 503,
            error: isTimeout ? `SheetDB append timed out after ${SHEETDB_CONFIG.timeoutMs}ms` : err.message,
            retryable: true,
        };
    }
}
