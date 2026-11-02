/**
 * SheetDB Centralized Client Service
 *
 * Server-only HTTP layer. EVERY request goes through request(), which:
 *  - reads the endpoint centrally from SHEETDB_CONFIG (never hard-coded),
 *  - attaches SheetDB Basic Authentication,
 *  - applies an AbortController timeout,
 *  - classifies failures (auth / quota / rate-limit / timeout / network / server),
 *  - tracks rate-limit telemetry,
 *  - never logs or returns credentials or row contents.
 *
 * Writes are sanitised so no cell can ever be interpreted as a spreadsheet formula
 * (root cause of the `#ERROR!` values previously seen in the current_class column).
 */

import { SHEETDB_CONFIG } from './sheetdb.config.js';
import { validateSheetPayload } from './sheetdb.schemas.js';

// In-memory telemetry (per server instance).
let lastQuotaMetrics = {
    remainingRequests: null,
    limit: null,
    lastCheckedAt: null,
    lastStatusCode: null,
    isQuotaExceeded: false,
};
let requestsThisProcess = 0;

export function getSheetDBQuotaMetrics() {
    return { ...lastQuotaMetrics, requestsThisProcess };
}

/** Test helper: reset telemetry between tests. */
export function resetSheetDBTelemetry() {
    lastQuotaMetrics = { remainingRequests: null, limit: null, lastCheckedAt: null, lastStatusCode: null, isQuotaExceeded: false };
    requestsThisProcess = 0;
}

// ---------------------------------------------------------------------------
// Cell sanitisation
// ---------------------------------------------------------------------------

const MAX_CELL_LENGTH = 1000;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Makes a single value safe to write into a Google Sheet cell.
 *  - strips control characters,
 *  - caps the length,
 *  - neutralises formula triggers (= + - @) with a leading apostrophe so Sheets stores plain text.
 * Numbers and booleans are passed through untouched; null/undefined become ''.
 */
export function sanitizeCell(value) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return Number.isFinite(value) ? value : '';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    let text = String(value).replace(CONTROL_CHARS, '').trim();
    if (text.length > MAX_CELL_LENGTH) text = text.slice(0, MAX_CELL_LENGTH);
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return text;
}

export function sanitizeRow(row) {
    const clean = {};
    for (const [key, value] of Object.entries(row || {})) {
        clean[key] = sanitizeCell(value);
    }
    return clean;
}

// ---------------------------------------------------------------------------
// Core request
// ---------------------------------------------------------------------------

function classifyStatus(status) {
    if (status === 401 || status === 403) {
        return { errorCode: 'AUTH_FAILED', error: 'SheetDB Authentication Failure: Invalid or missing API credentials', retryable: false, ambiguous: false };
    }
    if (status === 402) {
        return { errorCode: 'QUOTA_EXCEEDED', error: 'SheetDB Quota Exhausted: monthly request allowance reached', retryable: false, ambiguous: false };
    }
    if (status === 429) {
        return { errorCode: 'RATE_LIMITED', error: 'SheetDB Rate Limit: 90 requests/minute exceeded', retryable: true, ambiguous: false };
    }
    if (status >= 500 && status <= 599) {
        return { errorCode: 'SERVER_ERROR', error: `SheetDB server error (HTTP ${status})`, retryable: true, ambiguous: true };
    }
    return { errorCode: 'BAD_REQUEST', error: `SheetDB request rejected (HTTP ${status})`, retryable: false, ambiguous: false };
}

function updateTelemetry(response) {
    try {
        const headers = response.headers;
        if (headers && typeof headers.has === 'function' && headers.has('x-ratelimit-remaining')) {
            lastQuotaMetrics = {
                remainingRequests: parseInt(headers.get('x-ratelimit-remaining'), 10),
                limit: parseInt(headers.get('x-ratelimit-limit'), 10),
                lastCheckedAt: new Date(),
                lastStatusCode: response.status,
                isQuotaExceeded: response.status === 402,
            };
        }
    } catch {
        // telemetry is best-effort
    }
    if (response.status === 402) {
        lastQuotaMetrics = { ...lastQuotaMetrics, isQuotaExceeded: true, lastStatusCode: 402, lastCheckedAt: new Date() };
    }
}

/**
 * Performs one authenticated SheetDB request.
 * Returns { success, statusCode, data, errorCode, error, retryable, ambiguous }.
 */
export async function sheetdbRequest({ method = 'GET', path = '', query = {}, body, timeoutMs, tab = null }) {
    const status = SHEETDB_CONFIG.getStatus();
    if (!status.ready) {
        return {
            success: false,
            statusCode: 503,
            errorCode: 'CONFIG_MISSING',
            error: `SheetDB is not configured on this server (missing: ${status.missing.join(', ')})`,
            retryable: true,
            ambiguous: false,
            missing: status.missing,
        };
    }

    const baseUrl = SHEETDB_CONFIG.getUrl();
    const params = new URLSearchParams();
    if (tab) params.set('sheet', tab);
    for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) params.set(key, String(value));
    }
    const url = `${baseUrl}${path}?${params.toString()}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs || SHEETDB_CONFIG.timeoutMs);
    requestsThisProcess += 1;

    try {
        const headers = {
            Accept: 'application/json',
            ...SHEETDB_CONFIG.getAuthHeaders(),
        };
        if (body !== undefined) headers['Content-Type'] = 'application/json';

        const response = await fetch(url, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller.signal,
        });
        clearTimeout(timeout);
        updateTelemetry(response);

        if (response.status >= 200 && response.status < 300) {
            let data = null;
            try {
                data = await response.json();
            } catch {
                data = null;
            }
            return { success: true, statusCode: response.status, data };
        }

        const classified = classifyStatus(response.status);
        return { success: false, statusCode: response.status, ...classified };
    } catch (err) {
        clearTimeout(timeout);
        const isTimeout = err?.name === 'AbortError';
        return {
            success: false,
            statusCode: isTimeout ? 408 : 503,
            errorCode: isTimeout ? 'TIMEOUT' : 'NETWORK',
            error: isTimeout ? `SheetDB request timed out after ${timeoutMs || SHEETDB_CONFIG.timeoutMs}ms` : 'SheetDB network error',
            retryable: true,
            ambiguous: true,
        };
    }
}

// ---------------------------------------------------------------------------
// Public operations
// ---------------------------------------------------------------------------

function assertAllowedTab(tabName) {
    const allowedTabs = Object.values(SHEETDB_CONFIG.tabs);
    if (!allowedTabs.includes(tabName)) {
        return `Forbidden destination tab '${tabName}'. Must be one of: ${allowedTabs.join(', ')}`;
    }
    return null;
}

/**
 * Searches rows by exact column match(es). Used for idempotent writes and lookups.
 *  - Multi-column OR uses SheetDB's documented `/search_or` endpoint; AND uses `/search`.
 *  - Rejects SheetDB search operators (`*`, leading `!`, `<`, `>`) so lookups are strictly exact.
 */
export async function searchRows(tabName, criteria, { mode = 'and', timeoutMs } = {}) {
    const forbidden = assertAllowedTab(tabName);
    if (forbidden) return { success: false, found: false, errorCode: 'BAD_REQUEST', error: forbidden, retryable: false };

    const query = {};
    for (const [key, value] of Object.entries(criteria || {})) {
        const text = String(value ?? '').trim();
        if (!text || text.includes('*') || /^[!<>]/.test(text)) {
            return { success: false, found: false, errorCode: 'BAD_REQUEST', error: 'Invalid search value', retryable: false };
        }
        query[key] = text;
    }

    const keys = Object.keys(query);
    if (keys.length === 0) {
        return { success: false, found: false, errorCode: 'BAD_REQUEST', error: 'At least one search criterion is required', retryable: false };
    }

    const searchPath = (mode === 'or' && keys.length > 1) ? '/search_or' : '/search';
    const res = await sheetdbRequest({ method: 'GET', path: searchPath, tab: tabName, query, timeoutMs });
    if (!res.success) {
        return {
            success: false,
            found: false,
            status: res.statusCode,
            statusCode: res.statusCode,
            errorCode: res.errorCode,
            error: res.error,
            retryable: res.retryable,
        };
    }
    const records = Array.isArray(res.data) ? res.data : [];
    return { success: true, found: records.length > 0, count: records.length, records };
}

/** Single-column convenience wrapper (kept for the sync worker). */
export async function searchRow(tabName, queryParam, queryValue, options = {}) {
    return searchRows(tabName, { [queryParam]: queryValue }, options);
}

/**
 * Appends one validated, sanitised row to one of the 3 dedicated scholarship tabs.
 * Uses SheetDB `mode=RAW` (Google Sheets valueInputOption=RAW) + cell sanitisation so formulas
 * never execute and leading zeroes are preserved. Never touches Sheet1 or any unauthorized sheet.
 */
export async function appendRow(tabName, rowData, { timeoutMs } = {}) {
    const forbidden = assertAllowedTab(tabName);
    if (forbidden) {
        return { success: false, error: forbidden, errorCode: 'BAD_REQUEST', retryable: false, ambiguous: false };
    }

    const validation = validateSheetPayload(tabName, rowData);
    if (!validation.isValid) {
        return { success: false, error: validation.error, errorCode: 'BAD_REQUEST', retryable: false, ambiguous: false };
    }

    const res = await sheetdbRequest({
        method: 'POST',
        tab: tabName,
        query: { mode: 'RAW' },
        body: { data: [sanitizeRow(rowData)] },
        timeoutMs,
    });

    if (res.success) {
        return {
            success: true,
            statusCode: res.statusCode,
            data: res.data,
            metrics: getSheetDBQuotaMetrics(),
        };
    }

    return {
        success: false,
        statusCode: res.statusCode,
        errorCode: res.errorCode,
        error: res.error,
        retryable: res.retryable,
        ambiguous: res.ambiguous,
        missing: res.missing,
        metrics: getSheetDBQuotaMetrics(),
    };
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Appends a row with safe reconciliation on ambiguous failures (timeout / network / 5xx)
 * and bounded backoff retry, guaranteeing no duplicate rows are written on retry.
 */
export async function appendRowWithReconcile(
    tabName,
    rowData,
    { uniqueColumn, uniqueValue, timeoutMs = SHEETDB_CONFIG.interactiveTimeoutMs, maxAttempts = 2, retryDelayMs = 350 } = {}
) {
    let lastRes = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const res = await appendRow(tabName, rowData, { timeoutMs });
        if (res.success) {
            return { ...res, attempts: attempt, reconciled: false };
        }
        lastRes = res;

        // Config missing, auth error (401/403), quota exhausted (402), or validation error (400): fail fast.
        if (!res.retryable || res.errorCode === 'CONFIG_MISSING') {
            return { ...res, attempts: attempt, reconciled: false };
        }

        // Ambiguous write (timeout / network / 5xx): reconcile BEFORE retrying so we never duplicate a row.
        if (res.ambiguous && uniqueColumn && uniqueValue) {
            const check = await searchRow(tabName, uniqueColumn, uniqueValue, { timeoutMs });
            if (check.success && check.found) {
                return {
                    success: true,
                    statusCode: 200,
                    reconciled: true,
                    alreadyExisted: true,
                    existingRow: check.records[0],
                    attempts: attempt,
                    metrics: getSheetDBQuotaMetrics(),
                };
            }
            // If even the reconciliation GET failed with auth/quota/config, abort immediately.
            if (!check.success && !check.retryable) {
                return { ...lastRes, errorCode: check.errorCode || lastRes.errorCode, error: check.error || lastRes.error, attempts: attempt, reconciled: false };
            }
        }

        if (attempt < maxAttempts) {
            await sleep(retryDelayMs * attempt);
        }
    }

    return { ...lastRes, attempts: maxAttempts, reconciled: false };
}

/** Counts rows in a tab (1 request). */
export async function countRows(tabName, { timeoutMs } = {}) {
    const forbidden = assertAllowedTab(tabName);
    if (forbidden) return { success: false, errorCode: 'BAD_REQUEST', error: forbidden };
    const res = await sheetdbRequest({ method: 'GET', path: '/count', tab: tabName, timeoutMs });
    if (!res.success) return { success: false, errorCode: res.errorCode, error: res.error, statusCode: res.statusCode };
    const rows = Number(res.data?.rows);
    return { success: true, count: Number.isFinite(rows) ? rows : 0 };
}

/** Lists one page of rows (1 request). */
export async function listRows(tabName, { limit = SHEETDB_CONFIG.pageSize, offset = 0, timeoutMs } = {}) {
    const forbidden = assertAllowedTab(tabName);
    if (forbidden) return { success: false, errorCode: 'BAD_REQUEST', error: forbidden };
    const res = await sheetdbRequest({ method: 'GET', tab: tabName, query: { limit, offset }, timeoutMs });
    if (!res.success) return { success: false, errorCode: res.errorCode, error: res.error, statusCode: res.statusCode };
    return { success: true, rows: Array.isArray(res.data) ? res.data : [] };
}

/** Reads every row of a tab, page by page, bounded by SHEETDB_CONFIG.maxRows. */
export async function listAllRows(tabName, { timeoutMs } = {}) {
    const all = [];
    let offset = 0;
    while (all.length < SHEETDB_CONFIG.maxRows) {
        const page = await listRows(tabName, { limit: SHEETDB_CONFIG.pageSize, offset, timeoutMs });
        if (!page.success) return page;
        all.push(...page.rows);
        if (page.rows.length < SHEETDB_CONFIG.pageSize) break;
        offset += SHEETDB_CONFIG.pageSize;
    }
    return { success: true, rows: all, truncated: all.length >= SHEETDB_CONFIG.maxRows };
}
