// Admin authentication configuration. There are deliberately NO fallback values:
// if a variable is missing, admin login and token checks fail closed with a clear server-side log.
// Values are read lazily (per request) so `next build` does not need them.

const REQUIRED = ['JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
let warnedWeakSecret = false;

export function getMissingAdminConfig() {
  return REQUIRED.filter((name) => !process.env[name] || !process.env[name].trim());
}

/** Returns the JWT secret, or null (after logging variable NAMES only) when it is not configured. */
export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || !secret.trim()) {
    console.error('[admin-config] JWT_SECRET is not set. Admin authentication is disabled. See .env.example.');
    return null;
  }
  if (secret.length < 32 && !warnedWeakSecret) {
    warnedWeakSecret = true;
    console.warn('[admin-config] JWT_SECRET is shorter than 32 characters; use a longer random value.');
  }
  return secret;
}

/** Returns { username, password, name } or null when the admin credentials are not configured. */
export function getAdminCredentials() {
  const missing = getMissingAdminConfig().filter((n) => n !== 'JWT_SECRET');
  if (missing.length > 0) {
    console.error(`[admin-config] Missing environment variable(s): ${missing.join(', ')}. Admin login is disabled. See .env.example.`);
    return null;
  }
  return {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    name: 'Administrator',
  };
}
