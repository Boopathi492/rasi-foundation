import jwt from 'jsonwebtoken';
import { getJwtSecret } from './adminConfig.js';
import { can, roleFromTokenPayload } from './rbac.js';

export function verifyToken(req) {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  // No fallback secret: if JWT_SECRET is not configured, every token is rejected.
  const secret = getJwtSecret();
  if (!secret) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
    if (decoded) {
      decoded.role = roleFromTokenPayload(decoded) || 'admin';
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
