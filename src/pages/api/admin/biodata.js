import dbConnect from '@/backend/lib/mongodb';
import { withPermission } from '@/backend/lib/auth';
import { maskAadhaar } from '@/backend/lib/redact';
import { can } from '@/backend/lib/rbac';
import BioData from '@/backend/models/BioData';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { search, status, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentEmail: { $regex: search, $options: 'i' } },
        { courseApplied: { $regex: search, $options: 'i' } },
        { studentMobile: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [submissions, totalMatching, total, pending, reviewed, contacted] = await Promise.all([
      BioData.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      BioData.countDocuments(query),
      BioData.countDocuments(),
      BioData.countDocuments({ status: 'pending' }),
      BioData.countDocuments({ status: 'reviewed' }),
      BioData.countDocuments({ status: 'contacted' }),
    ]);

    // Check if the current user has aadhaar:view permission and explicitly requested unmasked
    const allowUnmasked = can(req.user?.role, 'aadhaar:view') && req.query.unmask === 'true';

    const safeSubmissions = submissions.map((sub) => ({
      ...sub,
      aadhaarNumber: allowUnmasked ? sub.aadhaarNumber : maskAadhaar(sub.aadhaarNumber),
    }));

    return res.status(200).json({
      submissions: safeSubmissions,
      stats: { total, pending, reviewed, contacted },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withPermission('students:view', handler);
