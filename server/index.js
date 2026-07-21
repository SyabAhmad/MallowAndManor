import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import analyticsRouter from './routes/analytics.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';
import postsRouter from './routes/posts.js';
import { authenticate } from './middleware/auth.js';
import Product from './models/Product.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mallowandmanor.vercel.app',
    'https://mallowandmanor.com',
  ],
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Public routes
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api', postsRouter);

// Admin routes
app.post('/api/admin/products', authenticate, async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) { next(err); }
});

app.put('/api/admin/products/:id', authenticate, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) { next(err); }
});

app.delete('/api/admin/products/:id', authenticate, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

// Protected analytics route for dashboard
app.get('/api/admin/analytics', authenticate, async (req, res, next) => {
  try {
    const Analytics = (await import('./models/Analytics.js')).default;
    const events = await Analytics.find().sort({ createdAt: -1 }).limit(500);
    res.json(events);
  } catch (err) { next(err); }
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
});
