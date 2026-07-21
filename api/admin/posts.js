import connectDB from '../_lib/db.js';
import { verifyToken } from '../_lib/auth.js';
import Post from '../_lib/models/Post.js';

export default async function handler(req, res) {
  try {
    await connectDB();

    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    if (req.method === 'GET') {
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.json(posts);
    }

    if (req.method === 'POST') {
      const post = await Post.create(req.body);
      return res.status(201).json(post);
    }

    if (req.method === 'PUT') {
      const { id, ...data } = req.body;
      const post = await Post.findByIdAndUpdate(id, data, { new: true });
      if (!post) return res.status(404).json({ error: 'Not found' });
      return res.json(post);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await Post.findByIdAndDelete(id);
      return res.json({ success: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
