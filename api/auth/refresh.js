import connectDB from '../_lib/db.js';
import jwt from 'jsonwebtoken';
import User from '../_lib/models/User.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const cookieHeader = req.headers.cookie || '';
    const cookies = Object.fromEntries(cookieHeader.split(';').map(c => c.trim().split('=')));
    const token = cookies.refreshToken;

    if (!token) return res.status(401).json({ error: 'No refresh token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) return res.status(401).json({ error: 'User not found' });

      const accessToken = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
      );

      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`);
      return res.json({ accessToken });
    } catch {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
