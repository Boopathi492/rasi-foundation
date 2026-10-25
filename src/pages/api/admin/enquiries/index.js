import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import Enquiry from '@/backend/models/Enquiry';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'enquiries:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { status, search, assignedTo, page, limit } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (assignedTo && assignedTo !== 'all') {
      query.assignedTo = assignedTo;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } },
      ];
    }

    // If explicit pagination was requested
    if (page || limit) {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
      const skip = (pageNum - 1) * limitNum;

      const [enquiries, totalMatching, total, pending, contacted, followUp, inProgress, resolved] = await Promise.all([
        Enquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
        Enquiry.countDocuments(query),
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: 'pending' }),
        Enquiry.countDocuments({ status: 'contacted' }),
        Enquiry.countDocuments({ status: 'follow_up' }),
        Enquiry.countDocuments({ status: 'in_progress' }),
        Enquiry.countDocuments({ status: 'resolved' }),
      ]);

      return res.status(200).json({
        success: true,
        enquiries,
        stats: { total, pending, contacted, followUp, inProgress, resolved },
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalMatching,
          pages: Math.ceil(totalMatching / limitNum) || 1,
        },
      });
    }

    // Default legacy-compatible response (returns array directly so legacy callers don't break)
    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 }).limit(300).lean();
    return res.status(200).json(enquiries);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
