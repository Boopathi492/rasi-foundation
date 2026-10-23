import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import BioData from '@/backend/models/BioData';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const record = await BioData.findById(id).lean();
    if (!record) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ record });
  }

  if (req.method === 'PUT') {
    const updated = await BioData.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ success: true, record: updated });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
