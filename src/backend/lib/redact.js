// Redaction helpers. Everything persisted to logs/audit trails passes through here first.
// Never log passwords, tokens, cookies, DB credentials, full Aadhaar numbers or document contents.

const SENSITIVE_KEY = /pass(word)?|pwd|secret|token|authorization|cookie|session|api[-_]?key|mongodb|connection|aadhaar|aadhar|signature|otp|dataBase64|credential/i;
const AADHAAR_PATTERN = /\b[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}\b/g;
const BEARER_PATTERN = /Bearer\s+[A-Za-z0-9._~+/=-]+/gi;
const MONGO_URI_PATTERN = /mongodb(\+srv)?:\/\/[^\s"']+/gi;
const JWT_PATTERN = /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{5,}\b/g;

export const REDACTED = '[REDACTED]';

/** "123456789012" -> "XXXX XXXX 9012". Returns '' for empty input. */
export function maskAadhaar(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return '';
  const last4 = digits.slice(-4).padStart(4, 'X');
  return `XXXX XXXX ${last4}`;
}

/** Redact secrets embedded inside free text (error messages, stack traces). */
export function redactString(text, maxLength = 2000) {
  if (text === null || text === undefined) return '';
  let out = String(text)
    .replace(MONGO_URI_PATTERN, 'mongodb://[REDACTED]')
    .replace(BEARER_PATTERN, 'Bearer [REDACTED]')
    .replace(JWT_PATTERN, '[REDACTED_JWT]')
    .replace(AADHAAR_PATTERN, (m) => maskAadhaar(m));
  if (out.length > maxLength) out = `${out.slice(0, maxLength)}…[truncated]`;
  return out;
}

/** Deep-copy `value` replacing sensitive keys and secrets inside strings. Cycle-safe and depth-limited. */
export function redactDeep(value, depth = 0, seen = new WeakSet()) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') return redactString(value);
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Date) return value;
  if (typeof value !== 'object') return undefined;
  if (depth > 6) return '[MAX_DEPTH]';
  if (seen.has(value)) return '[CIRCULAR]';
  seen.add(value);
  if (Array.isArray(value)) return value.slice(0, 50).map((v) => redactDeep(v, depth + 1, seen));
  const out = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = SENSITIVE_KEY.test(k) ? REDACTED : redactDeep(v, depth + 1, seen);
  }
  return out;
}

/** Strip the query string (may contain tokens) and cap the length of a request path. */
export function sanitizePath(url) {
  const path = String(url || '').split('?')[0].split('#')[0];
  return redactString(path, 300);
}

/** Produce a short audit "change summary": only changed field NAMES plus redacted scalar values. */
export function summarizeChanges(before = {}, after = {}) {
  const changed = {};
  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);
  for (const key of keys) {
    if (['_id', '__v', 'updatedAt', 'createdAt'].includes(key)) continue;
    const a = JSON.stringify(before?.[key]);
    const b = JSON.stringify(after?.[key]);
    if (a === b) continue;
    if (SENSITIVE_KEY.test(key)) {
      changed[key] = { changed: true };
    } else {
      changed[key] = {
        from: redactDeep(trimScalar(before?.[key])),
        to: redactDeep(trimScalar(after?.[key])),
      };
    }
  }
  return changed;
}

function trimScalar(v) {
  if (typeof v === 'string') return v.length > 120 ? `${v.slice(0, 120)}…` : v;
  if (Array.isArray(v)) return `[${v.length} items]`;
  if (v && typeof v === 'object' && !(v instanceof Date)) return '[object]';
  return v;
}
