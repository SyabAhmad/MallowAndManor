import connectDB from '../_lib/db.js';
import Category from '../_lib/models/Category.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: 1 });
    return res.json(categories);
  } catch (err) {
    console.error('Categories error:', err);
    return res.status(500).json({
      error: err.message,
      name: err.name,
      code: err.code,
    });
  }
}
