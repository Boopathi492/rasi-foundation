import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { readStored, deleteStored } from '@/backend/lib/uploads';
import StudentDocument from '@/backend/models/StudentDocument';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const doc = await StudentDocument.findById(id);
  if (!doc) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }

  // GET: Serve document securely
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'documents:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    try {
      const buffer = await readStored(doc.storageKey);
      res.setHeader('Content-Type', doc.mime);
      res.setHeader('Content-Length', buffer.length);
      const disposition = req.query.download === 'true' ? 'attachment' : 'inline';
      res.setHeader('Content-Disposition', `${disposition}; filename="${encodeURIComponent(doc.originalName)}"`);
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return res.send(buffer);
    } catch (readErr) {
      console.error('[Document Read Error]', readErr);
      return res.status(500).json({ success: false, message: 'Unable to read stored document file' });
    }
  }

  // PATCH / PUT: Update verification status
  if (req.method === 'PATCH' || req.method === 'PUT') {
    if (!can(req.user?.role, 'documents:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { verificationStatus, rejectionReason } = req.body || {};
    if (!['pending', 'verified', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid verificationStatus' });
    }

    doc.verificationStatus = verificationStatus;
    doc.verifiedBy = req.user?.username || req.user?.name || 'admin';
    doc.verifiedAt = new Date();
    if (verificationStatus === 'rejected') {
      doc.rejectionReason = String(rejectionReason || '').slice(0, 300);
    } else {
      doc.rejectionReason = '';
    }

    await doc.save();

    await recordAudit(req, {
      action: 'student.document.verify',
      resourceType: 'student_document',
      resourceId: id,
      summary: {
        documentType: doc.documentType,
        verificationStatus,
        rejectionReason: doc.rejectionReason,
      },
    });

    return res.status(200).json({ success: true, document: doc });
  }

  // DELETE: Mark removed or delete
  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'documents:manage')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    doc.uploadStatus = 'removed';
    await doc.save();
    await deleteStored(doc.storageKey).catch(() => {});

    await recordAudit(req, {
      action: 'student.document.delete',
      resourceType: 'student_document',
      resourceId: id,
      summary: { documentType: doc.documentType, originalName: doc.originalName },
    });

    return res.status(200).json({ success: true, message: 'Document removed' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
