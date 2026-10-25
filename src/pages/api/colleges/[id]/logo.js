import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';
import { readStored } from '@/backend/lib/uploads';

// Default SVG placeholder for colleges without a logo
const DEFAULT_PLACEHOLDER_SVG = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect width="100" height="100" rx="20" fill="#f1f5f9"/>
    <path d="M50 25 L80 40 L50 55 L20 40 Z" fill="#2563eb"/>
    <path d="M30 46 L30 65 Q50 78 70 65 L70 46" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
    <rect x="75" y="42" width="4" height="24" fill="#0f766e" rx="2"/>
    <circle cx="77" cy="68" r="4" fill="#0f766e"/>
  </svg>`,
  'utf8'
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();
  const { id } = req.query;

  try {
    const college = await College.findById(id).lean();
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    if (college.logo?.storageKey) {
      try {
        const buffer = await readStored(college.logo.storageKey);
        res.setHeader('Content-Type', college.logo.mime || 'image/png');
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
        return res.send(buffer);
      } catch (fileErr) {
        // Fall back to default placeholder if stored file is missing
      }
    }

    // Serve default placeholder SVG
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Length', DEFAULT_PLACEHOLDER_SVG.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(DEFAULT_PLACEHOLDER_SVG);
  } catch (err) {
    console.error('[College Logo Serve Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to serve college logo' });
  }
}
