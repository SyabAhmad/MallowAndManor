import { Router } from 'express';
import Analytics from '../models/Analytics.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// POST /api/analytics — public (fire-and-forget)
router.post('/', async (req, res, next) => {
  try {
    await Analytics.create(req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

// GET /api/analytics/stats — public (for product stats on homepage)
router.get('/stats', async (req, res, next) => {
  try {
    const events = await Analytics.find({ eventType: { $in: ['product_view', 'add_to_cart'] } });
    const stats = {};
    events.forEach(e => {
      const pid = e.eventData?.productId;
      if (!pid) return;
      if (!stats[pid]) stats[pid] = { views: 0, cartAdds: 0 };
      if (e.eventType === 'product_view') stats[pid].views += 1;
      if (e.eventType === 'add_to_cart') stats[pid].cartAdds += 1;
    });
    res.json(stats);
  } catch (err) { next(err); }
});

// GET /api/admin/analytics — protected (for dashboard)
router.get('/', authenticate, async (req, res, next) => {
  try {
    const events = await Analytics.find().sort({ createdAt: -1 }).limit(500);
    res.json(events);
  } catch (err) { next(err); }
});

export default router;
