import dbConnect from '@/backend/lib/mongodb';
import SiteSetting from '@/backend/models/SiteSetting';

// Whitelist of public setting keys that can be exposed without auth
const PUBLIC_KEYS = [
  'vision_text',
  'mission_text',
  'vision_title',
  'mission_title',
  'leadership_profiles',
  'founder_bio',
  'director_bio',
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const settings = await SiteSetting.find({ key: { $in: PUBLIC_KEYS } }).lean();
    const map = {};
    settings.forEach((s) => {
      map[s.key] = s.value;
    });

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ success: true, settings: map });
  } catch (error) {
    console.error('[Public Site Settings Error]', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
