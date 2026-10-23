import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Question from '@/backend/models/Question';

async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const question = await Question.findById(id).lean();
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const question = await Question.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      ).lean();
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const question = await Question.findByIdAndDelete(id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
