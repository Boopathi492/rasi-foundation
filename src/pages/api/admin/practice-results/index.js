import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import PracticeTestResult from '@/backend/models/PracticeTestResult';

export default withAuth(async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!can(req.user?.role, 'scholarship_practice:view')) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  await dbConnect();

  try {
    const { subject, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (subject && subject !== 'all') {
      query.subject = subject;
    }
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [results, totalMatching, total, statsAgg] = await Promise.all([
      PracticeTestResult.find(query).sort({ completedAt: -1, createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      PracticeTestResult.countDocuments(query),
      PracticeTestResult.countDocuments(),
      PracticeTestResult.aggregate([
        {
          $group: {
            _id: null,
            avgPercentage: { $avg: '$percentage' },
            avgScore: { $avg: '$score' },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      success: true,
      results,
      stats: {
        total,
        matching: totalMatching,
        avgPercentage: statsAgg[0]?.avgPercentage ? Math.round(statsAgg[0].avgPercentage) : 0,
      },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  } catch (err) {
    console.error('[Admin Practice Results Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch practice test results' });
  }
});
