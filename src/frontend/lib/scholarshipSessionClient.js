const STORAGE_KEY = 'rasi_sch_access_token';

export function saveCandidateAccessToken(token) {
    if (typeof window === 'undefined' || !token) return;
    try {
        window.sessionStorage.setItem(STORAGE_KEY, String(token));
    } catch {
        // HttpOnly cookie still works when sessionStorage is blocked
    }
}

export function getCandidateAccessToken() {
    if (typeof window === 'undefined') return null;
    try {
        return window.sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
        return null;
    }
}

export function buildCandidateHeaders(extra = {}) {
    const headers = { ...extra };
    const token = getCandidateAccessToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}
