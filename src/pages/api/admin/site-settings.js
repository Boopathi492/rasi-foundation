import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import SiteSetting from '@/backend/models/SiteSetting';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const settings = await SiteSetting.find().lean();
    const map = {};
    settings.forEach(s => { map[s.key] = s.value; });
    return res.status(200).json({ settings: map });
  }

  if (req.method === 'PUT') {
    const { settings } = req.body;
    const ops = Object.entries(settings).map(([key, value]) =>
      SiteSetting.findOneAndUpdate({ key }, { value, updatedAt: new Date() }, { upsert: true, new: true })
    );
    await Promise.all(ops);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
