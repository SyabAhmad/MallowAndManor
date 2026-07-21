import connectDB from './_lib/db.js';
import { verifyToken } from './_lib/auth.js';
import Product from './_lib/models/Product.js';
import Category from './_lib/models/Category.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    // Admin: GET /api/products?admin=true - all products (must be before public catch-all)
    if (req.method === 'GET' && req.query?.admin === 'true') {
      const user = verifyToken(req);
      if (!user) return res.status(401).json({ error: 'Unauthorized' });
      const products = await Product.find().sort({ createdAt: -1 });
      return res.json(products);
    }

    // Public: GET /api/products - all products
    if (req.method === 'GET' && !req.query?.id && !req.query?.categories) {
      const products = await Product.find().sort({ createdAt: 1 });
      return res.json(products);
    }

    // Public: GET /api/products?categories=true - all categories
    if (req.method === 'GET' && req.query?.categories === 'true') {
      const categories = await Category.find().sort({ createdAt: 1 });
      return res.json(categories);
    }

    // Public: GET /api/products/:id - single product
    if (req.method === 'GET' && req.query?.id) {
      const product = await Product.findById(req.query.id);
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Admin operations
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    // Admin: POST /api/products - create product
    if (req.method === 'POST' && !req.query?.categories) {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    }

    // Admin: POST /api/products?categories=true - create category
    if (req.method === 'POST' && req.query?.categories === 'true') {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    }

    // Admin: PUT /api/products/:id - update product
    if (req.method === 'PUT' && !req.query?.categories) {
      const { id, ...data } = req.body;
      const product = await Product.findByIdAndUpdate(id, data, { new: true });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Admin: PUT /api/products?categories=true - update category
    if (req.method === 'PUT' && req.query?.categories === 'true') {
      const { id, ...data } = req.body;
      const category = await Category.findByIdAndUpdate(id, data, { new: true });
      if (!category) return res.status(404).json({ error: 'Not found' });
      return res.json(category);
    }

    // Admin: DELETE /api/products/:id - delete product
    if (req.method === 'DELETE' && !req.query?.categories) {
      await Product.findByIdAndDelete(req.body.id);
      return res.json({ success: true });
    }

    // Admin: DELETE /api/products?categories=true - delete category
    if (req.method === 'DELETE' && req.query?.categories === 'true') {
      await Category.findByIdAndDelete(req.body.id);
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}