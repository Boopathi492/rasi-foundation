import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import ReportExport from '@/backend/models/ReportExport';

export default withAuth(async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!can(req.user?.role, 'reports:view')) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  await dbConnect();

  try {
    const exportsList = await ReportExport.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({ success: true, exports: exportsList });
  } catch (err) {
    console.error('[Reports History Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve report history' });
  }
});
