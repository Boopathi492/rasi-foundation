import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rasi-foundation-admin-secret-key-2024';

export function verifyToken(req) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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
