import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rasi-foundation-admin-secret-key-2024';

// Admin credentials (in production, use environment variables and hashed passwords)
const ADMIN_USERS = [
  {
    username: process.env.ADMIN_USERNAME || 'bhuvan',
    password: process.env.ADMIN_PASSWORD || 'Rasi@2024',
    name: 'Administrator'
  }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = ADMIN_USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: user.username, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    token,
    user: { username: user.username, name: user.name }
  });
}
