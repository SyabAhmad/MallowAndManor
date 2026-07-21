import connectDB from '../_lib/db.js';
import Post from '../_lib/models/Post.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const posts = await Post.find({ published: true })
      .select('-content')
      .sort({ createdAt: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
