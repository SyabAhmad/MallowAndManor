import connectDB from '../_lib/db.js';
import jwt from 'jsonwebtoken';
import User from '../_lib/models/User.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      const { refreshToken } = req.body;
      if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

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

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
