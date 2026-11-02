import jwt from 'jsonwebtoken';
import { getJwtSecret } from './adminConfig.js';
import { can, roleFromTokenPayload } from './rbac.js';

export function verifyToken(req) {
  let token = null;
  const authHeader = req.headers?.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query?.token && typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (!token) {
    return null;
  }

  // No fallback secret: if JWT_SECRET is not configured, every token is rejected.
  const secret = getJwtSecret();
  if (!secret) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    if (decoded) {
      // Never accept candidate/student-scoped tokens on administrative endpoints
      if (decoded.purpose === 'scholarship_student') {
        return null;
      }
      const resolvedRole = roleFromTokenPayload(decoded);
      if (!resolvedRole) {
        return null;
      }
      decoded.role = resolvedRole;
    }
    return decoded;
  } catch (error) {
    return null;
  }
}

export function withAuth(handler) {
  return async (req, res) => {
    const user = verifyToken(req);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return handler(req, res);
  };
}

export function withPermission(permission, handler) {
  return async (req, res) => {
    const user = verifyToken(req);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;

    if (permission && !can(user.role, permission)) {
      return res.status(403).json({ message: `Forbidden: Lacks required permission '${permission}'` });
    }

    return handler(req, res);
  };
}
