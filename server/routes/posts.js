import { Router } from 'express';
import Post from '../models/Post.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true }).select('-content').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
});

router.get('/posts/:slug', async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
});

// Admin
router.get('/admin/posts', authenticate, async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { next(err); }
});

router.post('/admin/posts', authenticate, async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) { next(err); }
});

router.put('/admin/posts/:id', authenticate, async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
});

router.delete('/admin/posts/:id', authenticate, async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
