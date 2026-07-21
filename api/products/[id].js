export default async function handler(req, res) {
  const { id } = req.query;
  return res.json({ id, method: req.method });
}
