import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Question from '@/backend/models/Question';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const questions = await Question.find().sort({ createdAt: -1 }).lean();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
