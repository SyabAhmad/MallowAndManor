import connectDB from '../_lib/db.js';
import Category from '../_lib/models/Category.js';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const categories = await Category.find().sort({ createdAt: 1 });
    return res.json(categories);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
