import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// GET /api/products — public (supports ?id= and ?categories=true)
router.get('/', async (req, res, next) => {
  try {
    const { id, categories, admin } = req.query;

    // Categories
    if (categories === 'true') {
      const categories = await Category.find().sort({ createdAt: 1 });
      return res.json(categories);
    }

    // Single product by id
    if (id) {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Admin: all products
    if (admin === 'true') {
      const user = authenticate(req, res);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }

    // Default: all products
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (err) { next(err); }
});

// POST /api/products — admin (supports ?categories=true for categories)
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { categories } = req.query;

    if (categories === 'true') {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
});

// PUT /api/products — admin
router.put('/', authenticate, async (req, res, next) => {
  try {
    const { id, categories } = { ...req.body, ...req.query };

    if (categories === 'true') {
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!category) return res.status(404).json({ error: 'Not found' });
      return res.json(category);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
});

// DELETE /api/products — admin
router.delete('/', authenticate, async (req, res, next) => {
  try {
    const { id, categories } = req.query;

    if (categories === 'true') {
      await Category.findByIdAndDelete(id);
      return res.json({ success: true });
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
