import connectDB from '../_lib/db.js';
import { verifyToken } from '../_lib/auth.js';
import Product from '../_lib/models/Product.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const products = await Product.find().sort({ createdAt: 1 });
      return res.json(products);
    }

    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'POST') {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin products error:', err);
    return res.status(500).json({ error: err.message });
  }
}
