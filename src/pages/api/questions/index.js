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
        const question = await Question.create(req.body);
        res.status(201).json({ success: true, data: question });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
