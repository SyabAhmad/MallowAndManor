import connectDB from '../../_lib/db.js';

export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;
    return res.json({ id, method: req.method, connected: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
