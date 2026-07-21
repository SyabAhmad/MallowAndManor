import connectDB from '../../_lib/db.js';
import Analytics from '../../../server/models/Analytics.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const events = await Analytics.find({ eventType: { $in: ['product_view', 'add_to_cart'] } });
    const stats = {};
    events.forEach(e => {
      const pid = e.eventData?.productId;
      if (!pid) return;
      if (!stats[pid]) stats[pid] = { views: 0, cartAdds: 0 };
      if (e.eventType === 'product_view') stats[pid].views += 1;
      if (e.eventType === 'add_to_cart') stats[pid].cartAdds += 1;
    });
    return res.json(stats);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
