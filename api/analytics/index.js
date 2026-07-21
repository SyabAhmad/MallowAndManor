import connectDB from '../_lib/db.js';
import Analytics from '../_lib/models/Analytics.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      await Analytics.create(req.body);
      return res.json({ ok: true });
    }

    if (req.method === 'GET') {
      const { authenticate } = await import('../_lib/auth.js');
      const user = authenticate(req, res);
      if (!user) return;

      const { days } = req.query;
      const dayLimit = parseInt(days) || 0;
      let dateFilter = {};
      if (dayLimit > 0) {
        const since = new Date();
        since.setDate(since.getDate() - dayLimit);
        dateFilter = { createdAt: { $gte: since } };
      }

      const events = await Analytics.find(dateFilter).sort({ createdAt: -1 }).limit(500);
      return res.json(events);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
