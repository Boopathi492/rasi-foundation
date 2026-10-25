// Password hashing with Node's built-in scrypt (memory-hard, established KDF). No third-party dependency.
// Stored format: scrypt$N$r$p$saltHex$hashHex

import crypto from 'node:crypto';

const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;

function scrypt(password, salt, n, r, p, keylen) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keylen, { N: n, r, p, maxmem: 64 * 1024 * 1024 }, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(String(password), salt, N, R, P, KEYLEN);
  return `scrypt$${N}$${R}$${P}$${salt.toString('hex')}$${key.toString('hex')}`;
}

export async function verifyPassword(password, stored) {
  try {
    const [scheme, n, r, p, saltHex, hashHex] = String(stored || '').split('$');
    if (scheme !== 'scrypt' || !saltHex || !hashHex) return false;
    const expected = Buffer.from(hashHex, 'hex');
    const actual = await scrypt(String(password), Buffer.from(saltHex, 'hex'), Number(n), Number(r), Number(p), expected.length);
    return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/** Minimum policy for administrator passwords. Returns an array of problems (empty = acceptable). */
export function passwordPolicyProblems(password) {
  const p = String(password ?? '');
  const problems = [];
  if (p.length < 12) problems.push('must be at least 12 characters');
  if (!/[a-z]/.test(p)) problems.push('must contain a lowercase letter');
  if (!/[A-Z]/.test(p)) problems.push('must contain an uppercase letter');
  if (!/\d/.test(p)) problems.push('must contain a digit');
  if (!/[^A-Za-z0-9]/.test(p)) problems.push('must contain a symbol');
  return problems;
}

/** Constant-time string compare (hash first so lengths always match). */
export function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}
