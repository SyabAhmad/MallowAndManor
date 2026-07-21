import connectDB from '../_lib/db.js';
import { authenticate } from '../_lib/auth.js';
import Product from '../_lib/models/Product.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    const user = authenticate(req, res);
    if (!user) return;

    const product = await Product.create(req.body);
    return res.status(201).json(product);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
