import jwt from 'jsonwebtoken';
import dbConnect from '@/backend/lib/mongodb';
import { getAdminCredentials, getJwtSecret } from '@/backend/lib/adminConfig';
import { verifyPassword, safeEqual } from '@/backend/lib/password';
import { rateLimiter } from '@/backend/lib/rateLimit';
import { recordAudit } from '@/backend/lib/apiHandler';
import AdminUser from '@/backend/models/AdminUser';

const loginLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 10 });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!loginLimiter(req, res)) {
    return res.status(429).json({ message: 'Too many login attempts. Please wait 15 minutes.' });
  }

  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const trimmedUsername = String(username).trim().toLowerCase();
  const secret = getJwtSecret();
  if (!secret) {
    return res.status(500).json({ message: 'Admin authentication is not configured on the server' });
  }

  await dbConnect();

  try {
    // 1. Check database for AdminUser
    const dbUser = await AdminUser.findOne({
      $or: [{ username: trimmedUsername }, { email: trimmedUsername }],
      isActive: true,
    }).select('+passwordHash');

    if (dbUser) {
      if (dbUser.lockedUntil && dbUser.lockedUntil > new Date()) {
        await recordAudit(req, {
          action: 'auth.login.locked',
          resourceType: 'admin_user',
          resourceId: dbUser._id,
          outcome: 'denied',
          summary: { username: dbUser.username },
        });
        return res.status(403).json({ message: 'Account is temporarily locked due to repeated failed attempts' });
      }

      const isValid = await verifyPassword(password, dbUser.passwordHash);
      if (isValid) {
        dbUser.failedLoginCount = 0;
        dbUser.lockedUntil = null;
        dbUser.lastLoginAt = new Date();
        await dbUser.save();

        const tokenPayload = {
          id: dbUser._id,
          username: dbUser.username,
          name: dbUser.displayName || dbUser.username,
          role: dbUser.role || 'admin',
        };

        const token = jwt.sign(tokenPayload, secret, { expiresIn: '7d' });

        req.user = tokenPayload;
        await recordAudit(req, {
          action: 'auth.login.success',
          resourceType: 'admin_user',
          resourceId: dbUser._id,
          outcome: 'success',
          summary: { username: dbUser.username, role: dbUser.role },
        });

        return res.status(200).json({
          success: true,
          token,
          user: tokenPayload,
        });
      } else {
        dbUser.failedLoginCount = (dbUser.failedLoginCount || 0) + 1;
        if (dbUser.failedLoginCount >= 5) {
          dbUser.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 min lock
        }
        await dbUser.save();

        await recordAudit(req, {
          action: 'auth.login.failed',
          resourceType: 'admin_user',
          resourceId: dbUser._id,
          outcome: 'failure',
          summary: { username: dbUser.username, reason: 'Invalid password' },
        });

        return res.status(401).json({ message: 'Invalid username or password' });
      }
    }

    // 2. Legacy fallback: check environment credentials
    const envAdmin = getAdminCredentials();
    if (envAdmin) {
      const userOk = safeEqual(trimmedUsername, envAdmin.username.toLowerCase());
      const passOk = safeEqual(password, envAdmin.password);

      if (userOk && passOk) {
        const tokenPayload = {
          username: envAdmin.username,
          name: envAdmin.name || 'Administrator',
          role: 'super_admin',
        };

        const token = jwt.sign(tokenPayload, secret, { expiresIn: '7d' });

        req.user = tokenPayload;
        await recordAudit(req, {
          action: 'auth.login.success',
          resourceType: 'admin_env',
          outcome: 'success',
          summary: { username: envAdmin.username, role: 'super_admin' },
        });

        return res.status(200).json({
          success: true,
          token,
          user: tokenPayload,
        });
      }
    }

    // Failed authentication
    await recordAudit(req, {
      action: 'auth.login.failed',
      resourceType: 'admin_unknown',
      outcome: 'failure',
      summary: { username: trimmedUsername, reason: 'User not found or invalid credentials' },
    });

    return res.status(401).json({ message: 'Invalid username or password' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error during authentication' });
  }
}
