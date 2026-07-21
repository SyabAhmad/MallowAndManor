import connectDB from '../../_lib/db.js';
import Product from '../../../server/models/Product.js';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.json(product);
  }

  if (req.method === 'PUT') {
    const { authenticate } = await import('../../_lib/auth.js');
    const user = authenticate(req, res);
    if (!user) return;

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    return res.json(product);
  }

  if (req.method === 'DELETE') {
    const { authenticate } = await import('../../_lib/auth.js');
    const user = authenticate(req, res);
    if (!user) return;

    await Product.findByIdAndDelete(id);
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
