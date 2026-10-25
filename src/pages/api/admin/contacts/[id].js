import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import Contact from '@/backend/models/Contact';

async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  const contact = await Contact.findById(id);
  if (!contact) {
    return res.status(404).json({ message: 'Contact message not found' });
  }

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'contacts:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return res.status(200).json(contact);
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!can(req.user?.role, 'contacts:edit')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const before = contact.toObject();
    const { status } = req.body || {};

    if (status) {
      if (!['new', 'read', 'responded'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
      contact.status = status;
    }

    await contact.save();

    await recordAudit(req, {
      action: 'contact.update',
      resourceType: 'contact',
      resourceId: id,
      summary: summarizeChanges(before, contact.toObject()),
    });

    return res.status(200).json(contact);
  }

  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'contacts:manage')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Contact.findByIdAndDelete(id);

    await recordAudit(req, {
      action: 'contact.delete',
      resourceType: 'contact',
      resourceId: id,
      summary: { name: contact.name, email: contact.email },
    });

    return res.status(200).json({ message: 'Contact deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
