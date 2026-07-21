import connectDB from '../_lib/db.js';
import { authenticate } from '../_lib/auth.js';
import sharp from 'sharp';

export const config = {
  api: { bodyParser: false },
};

const MAX_BODY_SIZE = 10 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);
    if (contentLength > MAX_BODY_SIZE) {
      return res.status(413).json({ error: 'File too large. Maximum size is 10 MB.' });
    }
  }

  try {
    await connectDB();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  if (req.method === 'POST') {
    const user = authenticate(req, res);
    if (!user) return;

    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const buffer = Buffer.concat(chunks);

      const boundary = req.headers['content-type']?.split('boundary=')[1];
      if (!boundary) return res.status(400).json({ error: 'No boundary' });

      const parts = buffer.toString('binary').split('--' + boundary);
      for (const part of parts) {
        const fileMatch = part.match(/filename="(.+?)"/);
        if (!fileMatch) continue;

        const dataStart = part.indexOf('\r\n\r\n') + 4;
        const dataEnd = part.lastIndexOf('\r\n');
        const fileData = Buffer.from(part.substring(dataStart, dataEnd), 'binary');

        const compressed = await sharp(fileData)
          .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 75 })
          .toBuffer();

        const b64 = compressed.toString('base64');
        const dataURI = `data:image/jpeg;base64,${b64}`;

        return res.json({ url: dataURI });
      }

      return res.status(400).json({ error: 'No file found' });
    } catch (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
