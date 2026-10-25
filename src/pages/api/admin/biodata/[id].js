import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { maskAadhaar, summarizeChanges } from '@/backend/lib/redact';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import BioData from '@/backend/models/BioData';
import StudentDocument from '@/backend/models/StudentDocument';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'students:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const record = await BioData.findById(id).lean();
    if (!record) return res.status(404).json({ message: 'Record not found' });

    const documents = await StudentDocument.find({ biodataId: id, uploadStatus: 'uploaded' }).lean();

    const allowUnmasked = can(req.user?.role, 'aadhaar:view') && req.query.unmask === 'true';
    record.aadhaarNumber = allowUnmasked ? record.aadhaarNumber : maskAadhaar(record.aadhaarNumber);

    return res.status(200).json({ record, documents });
  }

  if (req.method === 'PUT') {
    if (!can(req.user?.role, 'students:edit')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const existing = await BioData.findById(id);
    if (!existing) return res.status(404).json({ message: 'Record not found' });

    // Strict allowlist of editable administrative fields
    const ALLOWED_FIELDS = [
      'status', 'adminNotes', 'quota', 'admissionType', 'courseApplied', 'collegeName',
      'interestedArea', 'reference', 'subCaste', 'gender', 'educationQualification',
    ];

    const updates = {};
    for (const key of ALLOWED_FIELDS) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (updates.status && !['pending', 'reviewed', 'contacted'].includes(updates.status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const before = existing.toObject();
    Object.assign(existing, updates);
    const updated = await existing.save();

    await recordAudit(req, {
      action: 'student.biodata.update',
      resourceType: 'biodata',
      resourceId: id,
      summary: summarizeChanges(before, updated.toObject()),
    });

    const safeRecord = updated.toObject();
    safeRecord.aadhaarNumber = maskAadhaar(safeRecord.aadhaarNumber);

    return res.status(200).json({ success: true, record: safeRecord });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
