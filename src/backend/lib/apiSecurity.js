/**
 * Security and Header Enforcement Utilities for Dynamic & Sensitive APIs
 */

export function setNoCacheHeaders(res) {
    if (!res || typeof res.setHeader !== 'function') return;
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
}
