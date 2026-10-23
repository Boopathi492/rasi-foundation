import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Enquiry from '@/backend/models/Enquiry';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
      res.status(200).json(enquiries);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
