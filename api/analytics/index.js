import connectDB from '../_lib/db.js';
import Analytics from '../../server/models/Analytics.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    await Analytics.create(req.body);
    return res.json({ ok: true });
  }

  if (req.method === 'GET') {
    const { authenticate } = await import('../_lib/auth.js');
    const user = authenticate(req, res);
    if (!user) return;

    const events = await Analytics.find().sort({ createdAt: -1 }).limit(500);
    return res.json(events);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
