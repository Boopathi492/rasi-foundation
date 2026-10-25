import dbConnect from '@/backend/lib/mongodb';
import Banner from '@/backend/models/Banner';
import { readStored } from '@/backend/lib/uploads';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();
  const { id, type = 'desktop' } = req.query;

  try {
    const banner = await Banner.findById(id).lean();
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    const imageRef = type === 'mobile' && banner.mobileImage?.storageKey
      ? banner.mobileImage
      : banner.desktopImage;

    if (!imageRef || !imageRef.storageKey) {
      return res.status(404).json({ success: false, message: 'No image found for this banner' });
    }

    const buffer = await readStored(imageRef.storageKey);
    res.setHeader('Content-Type', imageRef.mime || 'image/jpeg');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    return res.send(buffer);
  } catch (err) {
    console.error('[Banner Image Serve Error]', err);
    return res.status(500).json({ success: false, message: 'Error retrieving banner image' });
  }
}
