// Pure, dependency-free validators shared by API routes (and mirrored on the client for UX).
// Server-side validation is authoritative; never trust frontend validation alone.

const EMAIL_RE = /^[^\s@<>()[\]\\,;:]+@[^\s@<>()[\]\\,;:]+\.[A-Za-z]{2,}$/;

export function isEmail(value) {
  const v = String(value ?? '').trim();
  return v.length <= 254 && EMAIL_RE.test(v);
}

/** Indian mobile: 10 digits starting 6-9, optional +91 / 91 / 0 prefix. Returns normalised 10 digits or null. */
export function normalizeIndianMobile(value) {
  let d = String(value ?? '').replace(/[\s()-]/g, '');
  d = d.replace(/^\+?91/, '').replace(/^0/, '');
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export function isIndianMobile(value) {
  return normalizeIndianMobile(value) !== null;
}

/** Aadhaar format: 12 digits, first digit 2-9 (spaces/hyphens tolerated). Returns the 12 digits or null. */
export function normalizeAadhaar(value) {
  const d = String(value ?? '').replace(/[\s-]/g, '');
  return /^[2-9]\d{11}$/.test(d) ? d : null;
}

/** Remove control chars and HTML tags, collapse whitespace, cap length. */
export function sanitizeText(value, max = 500) {
  return String(value ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, max);
}

/**
 * Marks validation. The board mark totals differ per exam, so a max is supplied by the caller
 * (TN State Board: 10th out of 500, 12th out of 600). Percentage-style (<=100) values are still valid.
 */
export function validateMarks(value, { max = 600, label = 'Marks' } = {}) {
  if (value === '' || value === null || value === undefined) return { ok: false, error: `${label} is required` };
  const n = Number(value);
  if (!Number.isFinite(n)) return { ok: false, error: `${label} must be a number` };
  if (n < 0 || n > max) return { ok: false, error: `${label} must be between 0 and ${max}` };
  return { ok: true, value: n };
}

export function isOneOf(value, allowed) {
  return allowed.includes(value);
}

export function isObjectId(value) {
  return /^[a-f\d]{24}$/i.test(String(value ?? ''));
}

/** Only http(s) URLs or site-relative paths ("/colleges") are allowed for banner CTAs, college sites, etc. */
export function isSafeUrl(value, { allowRelative = true } = {}) {
  const v = String(value ?? '').trim();
  if (!v) return false;
  if (allowRelative && /^\/(?!\/)[^\s]*$/.test(v)) return true;
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

/** Pick only allowlisted keys (prevents mass assignment). */
export function pick(source, keys) {
  const out = {};
  for (const k of keys) if (source && Object.prototype.hasOwnProperty.call(source, k) && source[k] !== undefined) out[k] = source[k];
  return out;
}

/** Escape user input for use inside a RegExp (safe search). */
export function escapeRegex(value) {
  return String(value ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(0, 100);
}

/** Parse page/limit/sort with hard caps and an allowlist of sortable fields. */
export function parsePagination(query = {}, { sortable = ['createdAt'], defaultSort = '-createdAt', maxLimit = 100, defaultLimit = 20 } = {}) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  let sort = String(query.sort || defaultSort);
  const desc = sort.startsWith('-');
  const field = sort.replace(/^-/, '');
  if (!sortable.includes(field)) sort = defaultSort;
  else sort = `${desc ? '-' : ''}${field}`;
  return { page, limit, skip: (page - 1) * limit, sort };
}

export function paginationMeta({ page, limit }, total) {
  return { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) };
}
