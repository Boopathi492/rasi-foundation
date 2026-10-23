import dbConnect from '@/backend/lib/mongodb';
import Enquiry from '@/backend/models/Enquiry';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: enquiries });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const enquiry = await Enquiry.create(req.body);
        res.status(201).json({ success: true, data: enquiry });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
