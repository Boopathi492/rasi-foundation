import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import AdminAuditLog from '@/backend/models/AdminAuditLog';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'audit:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges to view audit logs' });
    }

    const { action, actorId, resourceType, outcome, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (action && action !== 'all') {
      query.action = { $regex: action, $options: 'i' };
    }
    if (actorId && actorId !== 'all') {
      query.actorId = actorId;
    }
    if (resourceType && resourceType !== 'all') {
      query.resourceType = resourceType;
    }
    if (outcome && outcome !== 'all') {
      query.outcome = outcome;
    }
    if (search) {
      query.$or = [
        { action: { $regex: search, $options: 'i' } },
        { actorName: { $regex: search, $options: 'i' } },
        { resourceType: { $regex: search, $options: 'i' } },
        { requestId: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [logs, totalMatching, total, successCount, failureCount, deniedCount] = await Promise.all([
      AdminAuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      AdminAuditLog.countDocuments(query),
      AdminAuditLog.countDocuments(),
      AdminAuditLog.countDocuments({ outcome: 'success' }),
      AdminAuditLog.countDocuments({ outcome: 'failure' }),
      AdminAuditLog.countDocuments({ outcome: 'denied' }),
    ]);

    return res.status(200).json({
      success: true,
      logs,
      stats: { total, success: successCount, failure: failureCount, denied: deniedCount },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  // Audit logs are append-only. Modification/deletion is strictly prohibited.
  return res.status(405).json({
    success: false,
    message: 'Audit logs are append-only and cannot be updated or deleted',
  });
}

export default withAuth(handler);
