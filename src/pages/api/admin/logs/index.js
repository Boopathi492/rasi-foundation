import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import ApplicationErrorLog from '@/backend/models/ApplicationErrorLog';

async function handler(req, res) {
  await dbConnect();

  // GET: List error logs
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'logs:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { severity, module: mod, resolved, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (severity && severity !== 'all') {
      query.severity = severity;
    }
    if (mod && mod !== 'all') {
      query.module = mod;
    }
    if (resolved === 'true') {
      query.resolved = true;
    } else if (resolved === 'false') {
      query.resolved = false;
    }
    if (search) {
      query.$or = [
        { message: { $regex: search, $options: 'i' } },
        { requestId: { $regex: search, $options: 'i' } },
        { path: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [logs, totalMatching, total, criticalCount, errorCount, warningCount, unresolvedCount] = await Promise.all([
      ApplicationErrorLog.find(query).sort({ lastSeenAt: -1 }).skip(skip).limit(limitNum).lean(),
      ApplicationErrorLog.countDocuments(query),
      ApplicationErrorLog.countDocuments(),
      ApplicationErrorLog.countDocuments({ severity: 'critical' }),
      ApplicationErrorLog.countDocuments({ severity: 'error' }),
      ApplicationErrorLog.countDocuments({ severity: 'warning' }),
      ApplicationErrorLog.countDocuments({ resolved: false }),
    ]);

    // Don't leak stack traces if user is not super_admin or admin
    const safeLogs = logs.map((l) => ({
      ...l,
      stack: can(req.user?.role, 'logs:view') ? l.stack : '',
    }));

    return res.status(200).json({
      success: true,
      logs: safeLogs,
      stats: { total, critical: criticalCount, error: errorCount, warning: warningCount, unresolved: unresolvedCount },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  // PATCH: Resolve or unresolve an error fingerprint
  if (req.method === 'PATCH') {
    if (!can(req.user?.role, 'logs:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { id, resolved = true } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, message: 'Log ID is required' });
    }

    const log = await ApplicationErrorLog.findById(id);
    if (!log) {
      return res.status(404).json({ success: false, message: 'Log not found' });
    }

    log.resolved = Boolean(resolved);
    log.resolvedBy = resolved ? (req.user?.username || req.user?.name || 'admin') : '';
    log.resolvedAt = resolved ? new Date() : null;
    await log.save();

    return res.status(200).json({ success: true, log });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
