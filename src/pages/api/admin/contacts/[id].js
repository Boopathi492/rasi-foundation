import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Contact from '@/backend/models/Contact';

async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const contact = await Contact.findById(id).lean();
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error('Error fetching contact:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const contact = await Contact.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      ).lean();
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const contact = await Contact.findByIdAndDelete(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
