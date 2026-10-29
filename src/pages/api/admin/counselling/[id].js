import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import CounsellingRecord from '@/backend/models/CounsellingRecord';
import { validateCounsellorAssignment } from '@/backend/lib/counsellors';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const record = await CounsellingRecord.findById(id);
  if (!record) {
    return res.status(404).json({ success: false, message: 'Counselling record not found' });
  }

  // GET: single record
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'counselling:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    return res.status(200).json({ success: true, record });
  }

  // PUT: update record
  if (req.method === 'PUT') {
    if (!can(req.user?.role, 'counselling:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const before = record.toObject();
    const {
      studentName,
      studentPhone,
      scheduledAt,
      counsellor,
      type,
      preferredCollege,
      interestedCourse,
      careerInterests,
      notes,
      recommendations,
      followUpDate,
      followUpStatus,
      outcome,
      nextSteps,
      status,
    } = req.body || {};

    if (studentName !== undefined) record.studentName = studentName.trim();
    if (studentPhone !== undefined) record.studentPhone = studentPhone.trim();
    if (scheduledAt !== undefined) record.scheduledAt = new Date(scheduledAt);
    if (counsellor !== undefined) {
      const counsellorCheck = await validateCounsellorAssignment(counsellor);
      if (!counsellorCheck.valid) {
        return res.status(400).json({ success: false, message: counsellorCheck.error });
      }
      record.counsellor = counsellorCheck.assignedName;
    }
    if (type !== undefined) record.type = type;
    if (preferredCollege !== undefined) record.preferredCollege = preferredCollege.trim();
    if (interestedCourse !== undefined) record.interestedCourse = interestedCourse.trim();
    if (careerInterests !== undefined) record.careerInterests = careerInterests.trim();
    if (notes !== undefined) record.notes = notes.trim();
    if (recommendations !== undefined) record.recommendations = recommendations.trim();
    if (followUpDate !== undefined) {
      record.followUpDate = followUpDate ? new Date(followUpDate) : null;
      if (followUpDate && !followUpStatus) record.followUpStatus = 'pending';
    }
    if (followUpStatus !== undefined) record.followUpStatus = followUpStatus;
    if (outcome !== undefined) record.outcome = outcome.trim();
    if (nextSteps !== undefined) record.nextSteps = nextSteps.trim();
    if (status !== undefined) record.status = status;

    record.updatedBy = req.user?.username || req.user?.name || 'admin';
    await record.save();

    await recordAudit(req, {
      action: 'counselling.update',
      resourceType: 'counselling_record',
      resourceId: id,
      summary: summarizeChanges(before, record.toObject()),
    });

    return res.status(200).json({ success: true, record });
  }

  // DELETE: delete record
  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'counselling:manage')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await CounsellingRecord.findByIdAndDelete(id);

    await recordAudit(req, {
      action: 'counselling.delete',
      resourceType: 'counselling_record',
      resourceId: id,
      summary: { studentName: record.studentName },
    });

    return res.status(200).json({ success: true, message: 'Record deleted' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
