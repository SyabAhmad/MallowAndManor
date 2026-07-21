export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; Max-Age=0');
    return res.json({ ok: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
