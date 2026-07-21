import { Router } from 'express';
import Product from '../models/Product.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET /api/products — public
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (err) { next(err); }
});

// GET /api/products/:id — public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
});

// POST /api/admin/products — protected
router.post('/', authenticate, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
});

// PUT /api/admin/products/:id — protected
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
});

// DELETE /api/admin/products/:id — protected
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
