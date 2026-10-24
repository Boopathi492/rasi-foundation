import dbConnect from '@/backend/lib/mongodb';
import Enquiry from '@/backend/models/Enquiry';

// Public endpoint: submit only. Listing/reading enquiries is admin-only via /api/admin/enquiries.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    // Whitelist fields so visitors cannot set `status` or other server-managed values.
    const { name, email, phone, course, qualification, message } = req.body || {};
    const enquiry = await Enquiry.create({ name, email, phone, course, qualification, message });
    // Do not echo the stored record back to the public caller.
    return res.status(201).json({ success: true, data: { _id: enquiry._id } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.error('Submit error:', error.message);
    return res.status(500).json({ success: false, error: 'Could not save your submission. Please try again.' });
  }
}
