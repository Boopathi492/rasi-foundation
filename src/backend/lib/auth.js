import jwt from 'jsonwebtoken';
import { getJwtSecret } from './adminConfig';

export function verifyToken(req) {
  const authHeader = req.headers.authorization;

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
