import connectDB from '../../_lib/db.js';
import { authenticate } from '../../_lib/auth.js';
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

    if (req.method === 'PUT') {
      const user = authenticate(req, res);
      if (!user) return;
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.json(product);
    }

    if (req.method === 'DELETE') {
      const user = authenticate(req, res);
      if (!user) return;
      await Product.findByIdAndDelete(id);
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
