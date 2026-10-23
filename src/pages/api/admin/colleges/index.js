import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import College from '@/backend/models/College';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const colleges = await College.find().sort({ district: 1, order: 1, name: 1 }).lean();
      res.status(200).json(colleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, location, district, tneaCode, note, isActive, order } = req.body;

      if (!name || !location || !district) {
        return res.status(400).json({ message: 'Name, location, and district are required' });
      }

      const college = await College.create({
        name,
        location,
        district,
        tneaCode: tneaCode || '',
        note: note || '',
        isActive: isActive !== undefined ? isActive : true,
        order: order || 0,
      });

      res.status(201).json(college);
    } catch (error) {
      console.error('Error creating college:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
