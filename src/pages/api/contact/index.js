import dbConnect from '@/backend/lib/mongodb';
import Contact from '@/backend/models/Contact';

// Public endpoint: submit only. Listing/reading contacts is admin-only via /api/admin/contacts.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await dbConnect();
    // Whitelist fields so visitors cannot set `status` or other server-managed values.
    const { name, email, phone, subject, message } = req.body || {};
    const contact = await Contact.create({ name, email, phone, subject, message });
    // Do not echo the stored record back to the public caller.
    return res.status(201).json({ success: true, data: { _id: contact._id } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.error('Submit error:', error.message);
    return res.status(500).json({ success: false, error: 'Could not save your submission. Please try again.' });
  }
}
