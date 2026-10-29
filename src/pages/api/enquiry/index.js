import dbConnect from '@/backend/lib/mongodb';
import Enquiry from '@/backend/models/Enquiry';

// Public endpoint: submit only. Listing/reading enquiries is admin-only via /api/admin/enquiries.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const raw = req.body || {};
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
    const phoneRaw = typeof raw.phone === 'string' ? raw.phone.trim() : '';
    const course = typeof raw.course === 'string' ? raw.course.trim() : '';
    const qualification = typeof raw.qualification === 'string' ? raw.qualification.trim().slice(0, 100) : undefined;
    const message = typeof raw.message === 'string' ? raw.message.trim().slice(0, 1000) : undefined;

    // Server-side validation
    if (!name || name.length > 100) {
      return res.status(400).json({ success: false, error: 'Please provide a valid student name (up to 100 characters).' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }
    const phoneDigits = phoneRaw.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(phoneDigits) && phoneRaw.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit mobile number.' });
    }
    if (!course || course.length > 150) {
      return res.status(400).json({ success: false, error: 'Please select a course of interest.' });
    }

    await dbConnect();

    // Prevent accidental rapid duplicate submissions within 60 seconds
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const existingRecent = await Enquiry.findOne({
      phone: phoneDigits,
      email,
      course,
      createdAt: { $gte: oneMinuteAgo },
    })
      .select('_id')
      .lean();

    if (existingRecent) {
      return res.status(200).json({ success: true, data: { _id: existingRecent._id } });
    }

    // Whitelist fields so visitors cannot set `status` or other server-managed values.
    const enquiry = await Enquiry.create({
      name,
      email,
      phone: phoneDigits,
      course,
      qualification,
      message,
    });

    return res.status(201).json({ success: true, data: { _id: enquiry._id } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.error('Submit error:', error.message);
    return res.status(500).json({ success: false, error: 'Could not save your submission. Please try again.' });
  }
}
