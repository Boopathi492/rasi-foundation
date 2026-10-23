import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Enquiry from '@/backend/models/Enquiry';

async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const enquiry = await Enquiry.findById(id).lean();
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.status(200).json(enquiry);
    } catch (error) {
      console.error('Error fetching enquiry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      ).lean();
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.status(200).json(enquiry);
    } catch (error) {
      console.error('Error updating enquiry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const enquiry = await Enquiry.findByIdAndDelete(id);
      if (!enquiry) {
        return res.status(404).json({ message: 'Enquiry not found' });
      }
      res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
