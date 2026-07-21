import connectDB from '../_lib/db.js';
import Category from '../_lib/models/Category.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const categories = await Category.find().sort({ createdAt: 1 });
      return res.json(categories);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Categories error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
