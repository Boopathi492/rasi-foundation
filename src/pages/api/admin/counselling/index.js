import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import CounsellingRecord from '@/backend/models/CounsellingRecord';
import { getVerifiedCounsellors, validateCounsellorAssignment } from '@/backend/lib/counsellors';

async function handler(req, res) {
  await dbConnect();

  // GET: List counselling records with search, filter by status, counsellor, date
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'counselling:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { status, counsellor, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }
    if (counsellor && counsellor !== 'all') {
      if (counsellor === 'unassigned') {
        query.$or = [{ counsellor: '' }, { counsellor: null }, { counsellor: { $exists: false } }];
      } else {
        query.counsellor = counsellor;
      }
    }
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { studentPhone: { $regex: search, $options: 'i' } },
        { interestedCourse: { $regex: search, $options: 'i' } },
        { preferredCollege: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [records, totalMatching, total, scheduled, completed, followUp, cancelled, verifiedCounsellors] = await Promise.all([
      CounsellingRecord.find(query).sort({ scheduledAt: -1 }).skip(skip).limit(limitNum).lean(),
      CounsellingRecord.countDocuments(query),
      CounsellingRecord.countDocuments(),
      CounsellingRecord.countDocuments({ status: 'scheduled' }),
      CounsellingRecord.countDocuments({ status: 'completed' }),
      CounsellingRecord.countDocuments({ status: 'follow_up_required' }),
      CounsellingRecord.countDocuments({ status: 'cancelled' }),
      getVerifiedCounsellors(),
    ]);

    return res.status(200).json({
      success: true,
      records,
      counsellors: verifiedCounsellors,
      stats: { total, scheduled, completed, followUp, cancelled },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  // POST: Schedule or log a new counselling session
  if (req.method === 'POST') {
    if (!can(req.user?.role, 'counselling:create')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      studentName,
      studentPhone = '',
      scheduledAt,
      counsellor = '',
      type = 'in_person',
      preferredCollege = '',
      interestedCourse = '',
      careerInterests = '',
      notes = '',
      recommendations = '',
      followUpDate = null,
      outcome = '',
      nextSteps = '',
      status = 'scheduled',
      studentRef = { kind: 'manual' },
    } = req.body || {};

    if (!studentName || !studentName.trim()) {
      return res.status(400).json({ success: false, message: 'Student name is required' });
    }
    if (!scheduledAt) {
      return res.status(400).json({ success: false, message: 'Scheduled date and time is required' });
    }

    const counsellorCheck = await validateCounsellorAssignment(counsellor);
    if (!counsellorCheck.valid) {
      return res.status(400).json({ success: false, message: counsellorCheck.error });
    }

    const created = await CounsellingRecord.create({
      studentName: studentName.trim(),
      studentPhone: studentPhone.trim(),
      scheduledAt: new Date(scheduledAt),
      counsellor: counsellorCheck.assignedName,
      type,
      preferredCollege: preferredCollege.trim(),
      interestedCourse: interestedCourse.trim(),
      careerInterests: careerInterests.trim(),
      notes: notes.trim(),
      recommendations: recommendations.trim(),
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      followUpStatus: followUpDate ? 'pending' : 'none',
      outcome: outcome.trim(),
      nextSteps: nextSteps.trim(),
      status,
      studentRef,
      createdBy: req.user?.username || req.user?.name || 'admin',
    });

    await recordAudit(req, {
      action: 'counselling.create',
      resourceType: 'counselling_record',
      resourceId: created._id,
      summary: { studentName: created.studentName, counsellor: created.counsellor, status: created.status },
    });

    return res.status(201).json({ success: true, record: created });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
