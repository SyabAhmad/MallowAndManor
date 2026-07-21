import connectDB from '../../_lib/db.js';
import { verifyToken } from '../../_lib/auth.js';
import Product from '../../_lib/models/Product.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;

    if (req.method === 'GET') {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    // Auth check for PUT/DELETE
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'PUT') {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    if (req.method === 'DELETE') {
      await Product.findByIdAndDelete(id);
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Product route error:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
