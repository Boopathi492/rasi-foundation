import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import Feedback from '@/backend/models/Feedback';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const item = await Feedback.findById(id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Feedback entry not found' });
  }

  // GET: single feedback
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'feedback:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    return res.status(200).json({ success: true, feedback: item });
  }

  // PATCH / PUT: moderate feedback
  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!can(req.user?.role, 'feedback:approve') && !can(req.user?.role, 'feedback:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges to moderate feedback' });
    }

    const before = item.toObject();
    const { status, moderationNotes, displayOrder } = req.body || {};

    if (status) {
      if (!['pending', 'approved', 'rejected', 'archived'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
      }
      item.status = status;
      item.moderatedBy = req.user?.username || req.user?.name || 'admin';
      item.moderatedAt = new Date();
    }

    if (moderationNotes !== undefined) {
      item.moderationNotes = String(moderationNotes || '').slice(0, 500);
    }

    if (displayOrder !== undefined) {
      item.displayOrder = parseInt(displayOrder, 10) || 0;
    }

    await item.save();

    await recordAudit(req, {
      action: `feedback.${item.status}`,
      resourceType: 'feedback',
      resourceId: id,
      summary: summarizeChanges(before, item.toObject()),
    });

    return res.status(200).json({ success: true, feedback: item });
  }

  // DELETE: delete or archive
  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'feedback:manage')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    item.status = 'archived';
    await item.save();

    await recordAudit(req, {
      action: 'feedback.archive',
      resourceType: 'feedback',
      resourceId: id,
      summary: { name: item.name },
    });

    return res.status(200).json({ success: true, message: 'Feedback archived' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
