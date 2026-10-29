import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import Course from '@/backend/models/Course';

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ success: false, message: 'Course not found' });
  }

  // GET: single course
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'courses:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const populated = await Course.findById(id).populate('colleges', 'name district').lean();
    return res.status(200).json({ success: true, course: populated });
  }

  // PUT: update course
  if (req.method === 'PUT' || req.method === 'PATCH') {
    if (!can(req.user?.role, 'courses:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const before = course.toObject();
    const {
      name,
      code,
      level,
      category,
      specialization,
      description,
      eligibility,
      duration,
      colleges,
      sourceUrl,
      verificationStatus,
      isActive,
      order,
    } = req.body || {};

    if (name !== undefined) course.name = name.trim();
    if (code !== undefined) course.code = code.trim().toUpperCase();
    if (level !== undefined) course.level = level;
    if (category !== undefined) course.category = category.trim();
    if (specialization !== undefined) course.specialization = specialization.trim();
    if (description !== undefined) course.description = description.trim();
    if (eligibility !== undefined) course.eligibility = eligibility.trim();
    if (duration !== undefined) course.duration = duration.trim();
    if (colleges !== undefined) course.colleges = Array.isArray(colleges) ? colleges : [];
    if (sourceUrl !== undefined) course.sourceUrl = sourceUrl.trim();
    if (verificationStatus !== undefined) course.verificationStatus = verificationStatus.trim();
    if (isActive !== undefined) course.isActive = Boolean(isActive);
    if (order !== undefined) course.order = parseInt(order, 10) || 0;

    await course.save();

    await recordAudit(req, {
      action: 'course.update',
      resourceType: 'course',
      resourceId: id,
      summary: summarizeChanges(before, course.toObject()),
    });

    return res.status(200).json({ success: true, course });
  }

  // DELETE: delete course
  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'courses:manage')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await Course.findByIdAndDelete(id);

    await recordAudit(req, {
      action: 'course.delete',
      resourceType: 'course',
      resourceId: id,
      summary: { name: course.name, level: course.level },
    });

    return res.status(200).json({ success: true, message: 'Course deleted successfully' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
