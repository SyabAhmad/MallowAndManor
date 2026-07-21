import connectDB from './_lib/db.js';
import Product from './_lib/models/Product.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const products = await Product.find().sort({ createdAt: 1 });
      return res.json(products);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
