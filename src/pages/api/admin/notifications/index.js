import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import NotificationRecord from '@/backend/models/NotificationRecord';

export default withAuth(async function handler(req, res) {
  await dbConnect();
  const userId = req.user?.username || req.user?.id || 'admin';
  const role = req.user?.role || 'admin';

  // GET: List notifications
  if (req.method === 'GET') {
    try {
      const query = {
        $or: [
          { audienceRoles: { $size: 0 } },
          { audienceRoles: role },
        ],
      };

      const notifications = await NotificationRecord.find(query)
        .sort({ createdAt: -1 })
        .limit(30)
        .lean();

      const formatted = notifications.map((n) => ({
        id: n._id,
        type: n.type,
        title: n.title,
        body: n.body,
        link: n.link,
        severity: n.severity,
        createdAt: n.createdAt,
        isRead: (n.readBy || []).includes(userId),
      }));

      const unreadCount = formatted.filter((n) => !n.isRead).length;

      return res.status(200).json({ success: true, notifications: formatted, unreadCount });
    } catch (err) {
      console.error('[Notifications GET Error]', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
    }
  }

  // PATCH: Mark notification(s) as read
  if (req.method === 'PATCH' || req.method === 'POST') {
    try {
      const { id, all } = req.body || {};

      if (all) {
        await NotificationRecord.updateMany(
          { readBy: { $ne: userId } },
          { $addToSet: { readBy: userId } }
        );
        return res.status(200).json({ success: true, message: 'All marked as read' });
      }

      if (id) {
        await NotificationRecord.findByIdAndUpdate(id, {
          $addToSet: { readBy: userId },
        });
        return res.status(200).json({ success: true, message: 'Notification marked as read' });
      }

      return res.status(400).json({ success: false, message: 'id or all:true is required' });
    } catch (err) {
      console.error('[Notifications PATCH Error]', err);
      return res.status(500).json({ success: false, message: 'Failed to update notification' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
});
