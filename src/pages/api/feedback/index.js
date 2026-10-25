import dbConnect from '@/backend/lib/mongodb';
import Feedback from '@/backend/models/Feedback';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();
      const {
        name,
        category,
        phone,
        email,
        relatedCourse,
        relation,
        rating,
        message,
        consent,
      } = req.body || {};

      // Server-side validation
      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ success: false, error: 'Name is required' });
      }
      if (!['student', 'parent'].includes(category)) {
        return res.status(400).json({ success: false, error: 'Category must be student or parent' });
      }
      const numRating = Number(rating);
      if (!numRating || numRating < 1 || numRating > 5) {
        return res.status(400).json({ success: false, error: 'Rating must be between 1 and 5' });
      }
      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ success: false, error: 'Feedback message is required' });
      }
      if (!consent) {
        return res.status(400).json({ success: false, error: 'Consent to publish is required' });
      }

      // Check for duplicate submission within last 60s
      const recentDuplicate = await Feedback.findOne({
        name: name.trim(),
        message: message.trim(),
        createdAt: { $gte: new Date(Date.now() - 60000) },
      });
      if (recentDuplicate) {
        return res.status(200).json({
          success: true,
          data: { _id: recentDuplicate._id, message: 'Feedback already received' },
        });
      }

      // Save feedback strictly as pending moderation
      const feedback = await Feedback.create({
        name: name.trim(),
        category,
        phone: (phone || '').trim().slice(0, 20),
        email: (email || '').trim().slice(0, 100),
        relatedCourse: (relatedCourse || '').trim().slice(0, 150),
        relation: (relation || '').trim().slice(0, 100),
        rating: numRating,
        message: message.trim().slice(0, 1000),
        consent: Boolean(consent),
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        data: { _id: feedback._id },
        message: 'Thank you! Your feedback has been submitted for review.',
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ success: false, error: error.message });
      }
      console.error('Feedback submit error:', error);
      return res.status(500).json({ success: false, error: 'Failed to submit feedback. Please try again.' });
    }
  }

  if (req.method === 'GET') {
    try {
      await dbConnect();
      // Public reviews must ONLY return approved feedback and never expose phone or email
      const approved = await Feedback.find({ status: 'approved' })
        .sort({ createdAt: -1 })
        .limit(30)
        .select('name category relatedCourse relation rating message createdAt');

      return res.status(200).json({ success: true, data: approved });
    } catch (error) {
      console.error('Feedback fetch error:', error);
      return res.status(200).json({ success: true, data: [] });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
}
