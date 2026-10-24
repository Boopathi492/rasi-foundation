import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getAdminCredentials, getJwtSecret } from '@/backend/lib/adminConfig';

// Constant-time string comparison (hash first so lengths always match)
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Credentials and signing secret come only from environment variables (no fallbacks).
  const admin = getAdminCredentials();
  const secret = getJwtSecret();
  if (!admin || !secret) {
    // Details (variable names) are logged server-side by adminConfig; nothing sensitive is returned.
    return res.status(500).json({ message: 'Admin login is not configured on the server' });
  }

  const userOk = safeEqual(username, admin.username);
  const passOk = safeEqual(password, admin.password);
  if (!userOk || !passOk) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: admin.username, name: admin.name },
    secret,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    token,
    user: { username: admin.username, name: admin.name }
  });
}
