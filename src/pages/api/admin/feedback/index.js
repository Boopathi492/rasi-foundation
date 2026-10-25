import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import Feedback from '@/backend/models/Feedback';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'feedback:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { relatedCourse: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [feedbacks, totalMatching, total, pending, approved, rejected, archived] = await Promise.all([
      Feedback.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Feedback.countDocuments(query),
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: 'pending' }),
      Feedback.countDocuments({ status: 'approved' }),
      Feedback.countDocuments({ status: 'rejected' }),
      Feedback.countDocuments({ status: 'archived' }),
    ]);

    return res.status(200).json({
      success: true,
      feedback: feedbacks,
      stats: { total, pending, approved, rejected, archived },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
