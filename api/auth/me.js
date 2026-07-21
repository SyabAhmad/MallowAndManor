import connectDB from '../_lib/db.js';
import { verifyToken } from '../_lib/auth.js';
import User from '../_lib/models/User.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const fullUser = await User.findById(user.userId).select('-password');
    if (!fullUser) return res.status(404).json({ error: 'Not found' });
    return res.json(fullUser);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
