import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import BioData from '@/backend/models/BioData';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { search, status } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentEmail: { $regex: search, $options: 'i' } },
        { courseApplied: { $regex: search, $options: 'i' } },
        { studentMobile: { $regex: search, $options: 'i' } },
      ];
    }
    const submissions = await BioData.find(query).sort({ createdAt: -1 }).lean();
    const total = await BioData.countDocuments();
    const pending = await BioData.countDocuments({ status: 'pending' });
    const reviewed = await BioData.countDocuments({ status: 'reviewed' });
    const contacted = await BioData.countDocuments({ status: 'contacted' });
    return res.status(200).json({ submissions, stats: { total, pending, reviewed, contacted } });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
