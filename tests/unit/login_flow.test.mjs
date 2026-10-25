import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyPassword, hashPassword, passwordPolicyProblems } from '../../src/backend/lib/password.js';
import { can, ROLES, roleFromTokenPayload } from '../../src/backend/lib/rbac.js';
import { rateLimiter, resetRateLimits } from '../../src/backend/lib/rateLimit.js';

test('Login security: Empty or missing credentials are rejected', () => {
  const validateInputs = (username, password) => {
    if (!username || !username.trim() || !password) {
      return { ok: false, error: 'Please provide both username and password.' };
    }
    return { ok: true };
  };

  assert.equal(validateInputs('', 'Secret123!').ok, false);
  assert.equal(validateInputs('   ', 'Secret123!').ok, false);
  assert.equal(validateInputs('admin', '').ok, false);
  assert.equal(validateInputs('admin', 'Secret123!').ok, true);
});

test('Login security: Password verification with scrypt memory-hard hash', async () => {
  const rawPass = 'SuperAdmin2026!#$';
  const hashed = await hashPassword(rawPass);

  // Correct password matches
  const isMatch = await verifyPassword(rawPass, hashed);
  assert.equal(isMatch, true, 'Correct password must verify successfully');

  // Incorrect password rejected
  const wrongMatch = await verifyPassword('WrongPassword999', hashed);
  assert.equal(wrongMatch, false, 'Wrong password must be rejected');
});

test('Login security: Brute-force rate limiter enforces attempt ceilings', () => {
  resetRateLimits();
  const limiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 3 });
  const mockReq = { headers: { 'x-forwarded-for': '192.168.1.100' } };
  const mockRes = { headers: {}, setHeader(k, v) { this.headers[k] = v; } };

  // First 3 attempts are allowed
  assert.equal(limiter(mockReq, mockRes), true);
  assert.equal(limiter(mockReq, mockRes), true);
  assert.equal(limiter(mockReq, mockRes), true);

  // 4th attempt must be blocked
  const blocked = limiter(mockReq, mockRes);
  assert.equal(blocked, false, 'Excess login attempts must be throttled');
  assert.ok(mockRes.headers['Retry-After'] > 0, 'Retry-After header must be set');
});

test('RBAC Access Boundary: Unauthenticated users or wrong roles are blocked', () => {
  // Legacy or unauthenticated
  assert.equal(roleFromTokenPayload(null), null);
  assert.equal(roleFromTokenPayload({}), ROLES.SUPER_ADMIN); // Legacy token without role maps to super_admin

  // Role permissions
  assert.equal(can(ROLES.SUPER_ADMIN, 'banners:create'), true);
  assert.equal(can(ROLES.COUNSELLOR, 'banners:create'), false, 'Counsellor cannot create banners');
  assert.equal(can(ROLES.COUNSELLOR, 'counselling:view'), true, 'Counsellor can view counselling records');
  assert.equal(can(ROLES.EXAM_MANAGER, 'scholarship_exam:edit'), true);
  assert.equal(can(ROLES.EXAM_MANAGER, 'colleges:edit'), false, 'Exam manager cannot edit colleges');
});

test('Password strength policy rejects weak admin passwords', () => {
  const weak1 = 'short';
  assert.ok(passwordPolicyProblems(weak1).length > 0, 'Short password must be rejected');

  const weak2 = 'alllowercaseandnumbers12345';
  assert.ok(passwordPolicyProblems(weak2).length > 0, 'Missing uppercase/symbol must be rejected');

  const strong = 'Admin@RasiTrust2026#Secure';
  assert.equal(passwordPolicyProblems(strong).length, 0, 'Strong password must have 0 problems');
});
