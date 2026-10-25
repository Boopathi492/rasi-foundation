import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import Enquiry from '@/backend/models/Enquiry';

async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    return res.status(404).json({ message: 'Enquiry not found' });
  }

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'enquiries:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return res.status(200).json(enquiry);
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!can(req.user?.role, 'enquiries:edit')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const before = enquiry.toObject();
    const {
      status,
      assignedTo,
      followUpDate,
      note,
      contactAttempt,
      resolution,
    } = req.body || {};

    if (status && status !== enquiry.status) {
      enquiry.status = status;
      enquiry.statusHistory.push({
        status,
        by: req.user?.username || req.user?.name || 'admin',
        at: new Date(),
      });
      if (status === 'resolved') {
        enquiry.resolvedAt = new Date();
      }
    }

    if (assignedTo !== undefined) {
      enquiry.assignedTo = String(assignedTo).trim().slice(0, 100);
    }

    if (followUpDate !== undefined) {
      enquiry.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }

    if (note && typeof note === 'string' && note.trim()) {
      enquiry.internalNotes.push({
        text: note.trim().slice(0, 1000),
        by: req.user?.username || req.user?.name || 'admin',
        at: new Date(),
      });
    }

    if (contactAttempt && typeof contactAttempt === 'object') {
      enquiry.contactAttempts.push({
        by: req.user?.username || req.user?.name || 'admin',
        method: contactAttempt.method || 'phone',
        outcome: String(contactAttempt.outcome || '').slice(0, 300),
        at: new Date(),
      });
    }

    if (resolution !== undefined) {
      enquiry.resolution = String(resolution).trim().slice(0, 1000);
      if (enquiry.resolution && !enquiry.resolvedAt) {
        enquiry.resolvedAt = new Date();
      }
    }

    await enquiry.save();

    await recordAudit(req, {
      action: 'enquiry.update',
      resourceType: 'enquiry',
      resourceId: id,
      summary: summarizeChanges(before, enquiry.toObject()),
    });

    return res.status(200).json(enquiry);
  }

  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'enquiries:manage')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Enquiry.findByIdAndDelete(id);

    await recordAudit(req, {
      action: 'enquiry.delete',
      resourceType: 'enquiry',
      resourceId: id,
      summary: { name: enquiry.name, email: enquiry.email },
    });

    return res.status(200).json({ message: 'Enquiry deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
