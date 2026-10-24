import dbConnect from '@/backend/lib/mongodb';
import Question from '@/backend/models/Question';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // Only return published and answered questions for public view
        const questions = await Question.find({ isPublished: true, isAnswered: true })
          .sort({ createdAt: -1 })
          .select('-email -phone');
        res.status(200).json({ success: true, data: questions });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // Whitelist: visitors must not be able to set isAnswered / isPublished / answer.
        const { name, email, phone, category, question: text } = req.body || {};
        const question = await Question.create({ name, email, phone, category, question: text });
        res.status(201).json({ success: true, data: { _id: question._id } });
      } catch (error) {
        if (error.name === 'ValidationError') {
          return res.status(400).json({ success: false, error: error.message });
        }
        console.error('Submit error:', error.message);
        res.status(500).json({ success: false, error: 'Could not save your submission. Please try again.' });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
