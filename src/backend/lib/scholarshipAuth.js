/**
 * Scholarship Candidate Authentication & Authorization
 *
 * Security model:
 *  1. Authentication state is carried in a short-lived (4h default) HS256 JWT stored in an
 *     `HttpOnly; SameSite=Lax; Path=/api/scholarship` cookie (`Secure` in production) and also
 *     returned as `accessToken` for API clients.
 *  2. Signing key is cryptographically derived from `JWT_SECRET` via HMAC-SHA256 domain separation
 *     (`rasi:scholarship:student:v1`) so a candidate token is mathematically incompatible with
 *     administrative JWTs verified by `src/backend/lib/auth.js`.
 *  3. Zero plaintext PII, Aadhaar, or passwords are stored in the JWT or in Google Sheets.
 *     Claims contain only `{ purpose, sub (student_reference_id), appNo (application_number), sid (sessionId), jti }`.
 *  4. Invalidation occurs via:
 *       - Short `exp` claim (4 hours),
 *       - Explicit cookie clearing + `jti` revocation (`revokeScholarshipToken`),
 *       - Authoritative server-side `TestSession.status` transition (`completed` / `expired` / `disqualified`).
 */

import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from './adminConfig.js';
import { verifyToken as verifyAdminToken } from './auth.js';
import { can } from './rbac.js';

export const SCHOLARSHIP_COOKIE_NAME = 'rasi_sch_auth';
export const DEFAULT_STUDENT_TOKEN_TTL_SEC = 4 * 60 * 60; // 4 hours
const ISSUER = 'rasi-foundation-scholarship';
const AUDIENCE = 'scholarship-candidate';

// Bounded per-instance revocation set for explicit logout/invalidation before natural `exp`.
const revokedJtis = new Map();
const MAX_REVOKED = 2000;

function deriveStudentSigningKey() {
    const baseSecret = getJwtSecret();
    if (!baseSecret) return null;
    return crypto.createHmac('sha256', baseSecret).update('rasi:scholarship:student:v1').digest('hex');
}

function deriveLockKey() {
    const baseSecret = getJwtSecret() || 'rasi-dev-fallback-lock-key-only';
    return crypto.createHmac('sha256', baseSecret).update('rasi:scholarship:lock:v1').digest();
}

/**
 * Computes a keyed HMAC-SHA256 hash for non-PII concurrency locks (mobile, email, idempotency key).
 */
export function hashIdentityKey(namespace, value) {
    const clean = String(value ?? '').trim().toLowerCase();
    if (!clean) return '';
    return `${namespace}:${crypto.createHmac('sha256', deriveLockKey()).update(`${namespace}|${clean}`).digest('hex')}`;
}

/**
 * Constant-time string comparison for secondary verifiers (mobile number / date of birth).
 */
export function timingSafeStringEqual(a, b) {
    const strA = String(a ?? '').trim();
    const strB = String(b ?? '').trim();
    if (!strA || !strB) return false;
    const bufA = Buffer.from(strA, 'utf8');
    const bufB = Buffer.from(strB, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

function parseCookies(cookieHeader) {
    const out = {};
    if (!cookieHeader || typeof cookieHeader !== 'string') return out;
    for (const part of cookieHeader.split(';')) {
        const idx = part.indexOf('=');
        if (idx <= 0) continue;
        const k = part.slice(0, idx).trim();
        const v = part.slice(idx + 1).trim();
        if (k) {
            try {
                out[k] = decodeURIComponent(v);
            } catch {
                out[k] = v;
            }
        }
    }
    return out;
}

function appendSetCookieHeader(res, cookieValue) {
    if (!res || typeof res.setHeader !== 'function') return;
    const existing = typeof res.getHeader === 'function' ? res.getHeader('Set-Cookie') : undefined;
    if (!existing) {
        res.setHeader('Set-Cookie', cookieValue);
    } else if (Array.isArray(existing)) {
        res.setHeader('Set-Cookie', [...existing, cookieValue]);
    } else {
        res.setHeader('Set-Cookie', [String(existing), cookieValue]);
    }
}

export function setScholarshipCookie(res, token, maxAgeSec = DEFAULT_STUDENT_TOKEN_TTL_SEC) {
    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const cookie = `${SCHOLARSHIP_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/api/scholarship; HttpOnly; SameSite=Lax; Max-Age=${Math.max(0, Math.floor(maxAgeSec))}${secureFlag}`;
    appendSetCookieHeader(res, cookie);
}

export function clearScholarshipCookie(res) {
    const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    const cookie = `${SCHOLARSHIP_COOKIE_NAME}=; Path=/api/scholarship; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag}`;
    appendSetCookieHeader(res, cookie);
}

/**
 * Signs a short-lived candidate JWT containing ONLY reference identifiers (never PII or secrets).
 */
export function signScholarshipToken(
    { studentReferenceId, applicationNumber, sessionId = null, freshRegistration = false },
    { expiresInSeconds = DEFAULT_STUDENT_TOKEN_TTL_SEC } = {}
) {
    const signingKey = deriveStudentSigningKey();
    if (!signingKey) {
        throw new Error('Server authentication configuration (JWT_SECRET) is missing');
    }
    const appNo = String(applicationNumber || '').trim().toUpperCase();
    const sub = String(studentReferenceId || '').trim();
    if (!appNo || !sub) {
        throw new Error('Both studentReferenceId and applicationNumber are required to sign a candidate token');
    }

    const payload = {
        purpose: 'scholarship_student',
        sub,
        appNo,
        jti: crypto.randomBytes(12).toString('hex'),
    };
    if (sessionId) payload.sid = String(sessionId).trim();
    if (freshRegistration) payload.freshReg = true;

    return jwt.sign(payload, signingKey, {
        algorithm: 'HS256',
        expiresIn: expiresInSeconds,
        issuer: ISSUER,
        audience: AUDIENCE,
    });
}

/**
 * Issues both the HttpOnly cookie and the raw `accessToken` string for API responses.
 */
export function issueScholarshipSession(res, identity, options = {}) {
    const ttl = options.expiresInSeconds || DEFAULT_STUDENT_TOKEN_TTL_SEC;
    const accessToken = signScholarshipToken(identity, { expiresInSeconds: ttl });
    setScholarshipCookie(res, accessToken, ttl);
    return accessToken;
}

/**
 * Explicitly revokes a candidate token (by raw JWT or jti) on this instance until its natural expiry.
 */
export function revokeScholarshipToken(tokenOrJti, expUnixSec = Math.floor(Date.now() / 1000) + DEFAULT_STUDENT_TOKEN_TTL_SEC) {
    const nowSec = Math.floor(Date.now() / 1000);
    if (revokedJtis.size >= MAX_REVOKED) {
        for (const [k, exp] of revokedJtis) {
            if (exp <= nowSec) revokedJtis.delete(k);
        }
        if (revokedJtis.size >= MAX_REVOKED) revokedJtis.clear();
    }
    let jti = String(tokenOrJti || '').trim();
    if (jti.includes('.')) {
        const decoded = jwt.decode(jti);
        jti = decoded?.jti || '';
        if (decoded?.exp) expUnixSec = decoded.exp;
    }
    if (jti) revokedJtis.set(jti, expUnixSec);
}

export function extractScholarshipToken(req) {
    if (!req) return null;
    const customHeader = req.headers?.['x-scholarship-token'];
    if (typeof customHeader === 'string' && customHeader.trim()) {
        return customHeader.trim();
    }
    const authHeader = req.headers?.authorization;
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        const bearer = authHeader.slice(7).trim();
        if (bearer) return bearer;
    }
    if (req.cookies?.[SCHOLARSHIP_COOKIE_NAME]) {
        return String(req.cookies[SCHOLARSHIP_COOKIE_NAME]).trim();
    }
    const parsedCookies = parseCookies(req.headers?.cookie);
    if (parsedCookies[SCHOLARSHIP_COOKIE_NAME]) {
        return parsedCookies[SCHOLARSHIP_COOKIE_NAME];
    }
    return null;
}

/**
 * Verifies a candidate JWT from a request object or raw token string.
 */
export function verifyScholarshipToken(reqOrToken) {
    const rawToken = typeof reqOrToken === 'string' ? reqOrToken.trim() : extractScholarshipToken(reqOrToken);
    if (!rawToken) {
        return { valid: false, reason: 'MISSING', message: 'Authentication required. Please verify your registration token.' };
    }

    const signingKey = deriveStudentSigningKey();
    if (!signingKey) {
        return { valid: false, reason: 'CONFIG_MISSING', message: 'Server authentication is not configured.' };
    }

    try {
        const decoded = jwt.verify(rawToken, signingKey, {
            algorithms: ['HS256'],
            issuer: ISSUER,
            audience: AUDIENCE,
        });

        if (!decoded || decoded.purpose !== 'scholarship_student' || !decoded.appNo || !decoded.sub) {
            return { valid: false, reason: 'INVALID', message: 'Invalid candidate authentication token.' };
        }

        if (decoded.jti && revokedJtis.has(decoded.jti)) {
            const exp = revokedJtis.get(decoded.jti);
            if (exp > Math.floor(Date.now() / 1000)) {
                return { valid: false, reason: 'REVOKED', message: 'Candidate session has been signed out. Please log in again.' };
            }
            revokedJtis.delete(decoded.jti);
        }

        return { valid: true, claims: decoded };
    } catch (err) {
        if (err?.name === 'TokenExpiredError') {
            return { valid: false, reason: 'EXPIRED', message: 'Your session has expired. Please verify your registration token again.' };
        }
        return { valid: false, reason: 'INVALID', message: 'Invalid candidate authentication token.' };
    }
}

/**
 * Enforces strict candidate ownership (or optional RBAC admin override for admin scorecard views).
 * Returns:
 *   - { ok: true, isAdmin: boolean, claims }
 *   - { ok: false, statusCode: 401 | 403, reason, message }
 */
export function authorizeScholarshipRequest(
    req,
    {
        expectedApplicationNumber = null,
        expectedStudentRef = null,
        expectedSessionId = null,
        allowAdminPermission = null,
    } = {}
) {
    if (allowAdminPermission) {
        const adminUser = verifyAdminToken(req);
        if (adminUser && can(adminUser.role, allowAdminPermission)) {
            return { ok: true, isAdmin: true, adminUser, claims: null };
        }
    }

    const verified = verifyScholarshipToken(req);
    if (!verified.valid) {
        return {
            ok: false,
            statusCode: 401,
            reason: verified.reason,
            message: verified.message,
        };
    }

    const { claims } = verified;

    if (expectedApplicationNumber) {
        const normExpected = String(expectedApplicationNumber).trim().toUpperCase();
        if (claims.appNo.toUpperCase() !== normExpected) {
            return {
                ok: false,
                statusCode: 403,
                reason: 'FORBIDDEN',
                message: 'Access denied: You are not authorized to access another candidate record.',
            };
        }
    }

    if (expectedStudentRef) {
        const normRef = String(expectedStudentRef).trim();
        if (claims.sub !== normRef) {
            return {
                ok: false,
                statusCode: 403,
                reason: 'FORBIDDEN',
                message: 'Access denied: Candidate reference mismatch.',
            };
        }
    }

    if (expectedSessionId && claims.sid) {
        const normSid = String(expectedSessionId).trim();
        if (claims.sid !== normSid) {
            return {
                ok: false,
                statusCode: 403,
                reason: 'FORBIDDEN',
                message: 'Access denied: Examination session mismatch.',
            };
        }
    }

    return { ok: true, isAdmin: false, claims };
}
