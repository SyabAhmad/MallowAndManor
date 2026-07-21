import connectDB from '../_lib/db.js';
import jwt from 'jsonwebtoken';
import User from '../_lib/models/User.js';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(c => {
    const [key, ...val] = c.trim().split('=');
    cookies[key] = val.join('=');
  });
  return cookies;
}

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      const cookies = parseCookies(req.headers.cookie);
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

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`);
        return res.json({ accessToken });
      } catch {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
