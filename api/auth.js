import connectDB from './_lib/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken } from './_lib/auth.js';
import User from './_lib/models/User.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      const { refreshToken } = req.body;
      
      // POST /api/auth/login
      if (req.body?.email && req.body?.password) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
          { userId: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );
        const newRefreshToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: '7d' }
        );

        return res.json({ accessToken, refreshToken: newRefreshToken, user: { id: user._id, email: user.email, role: user.role } });
      }

      // POST /api/auth/refresh
      if (refreshToken) {
        try {
          const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          const user = await User.findById(decoded.userId);
          if (!user) return res.status(401).json({ error: 'User not found' });

          const accessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
          );
          const newRefreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
          );

          return res.json({ accessToken, refreshToken: newRefreshToken });
        } catch {
          return res.status(401).json({ error: 'Invalid refresh token' });
        }
      }

      // POST /api/auth/logout
      if (req.url?.includes('/logout') || req.body?.logout) {
        return res.json({ ok: true });
      }

      return res.status(400).json({ error: 'Invalid auth request' });
    }

    if (req.method === 'GET') {
      // GET /api/auth/me
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const dbUser = await User.findById(user.userId);
      if (!dbUser) return res.status(404).json({ error: 'User not found' });

      return res.json({ _id: dbUser._id, email: dbUser.email, role: dbUser.role });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}