import connectDB from '../../_lib/db.js';

export default async function handler(req, res) {
  try {
    const start = Date.now();
    await connectDB();
    const elapsed = Date.now() - start;
    const { id } = req.query;
    return res.json({ id, method: req.method, elapsed });
  } catch (err) {
    return res.status(500).json({ error: err.message, type: err.name });
  }
}
