import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import Course from '@/backend/models/Course';

async function handler(req, res) {
  await dbConnect();

  // GET: list all courses
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'courses:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { level, category, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (level && level !== 'all') {
      query.level = level;
    }
    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [courses, totalMatching, total, active] = await Promise.all([
      Course.find(query)
        .populate('colleges', 'name district')
        .sort({ order: 1, name: 1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Course.countDocuments(query),
      Course.countDocuments(),
      Course.countDocuments({ isActive: true }),
    ]);

    return res.status(200).json({
      success: true,
      courses,
      stats: { total, active },
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  // POST: create course
  if (req.method === 'POST') {
    if (!can(req.user?.role, 'courses:create')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      name,
      code = '',
      level = 'UG',
      category = '',
      description = '',
      eligibility = '',
      duration = '',
      colleges = [],
      isActive = true,
      order = 0,
    } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Course name is required' });
    }

    // Check duplicate (name, level)
    const existing = await Course.findOne({
      name: { $regex: `^${name.trim()}$`, $options: 'i' },
      level,
    });
    if (existing) {
      return res.status(409).json({ success: false, message: `Course '${name}' at level '${level}' already exists` });
    }

    const created = await Course.create({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      level,
      category: category.trim(),
      description: description.trim(),
      eligibility: eligibility.trim(),
      duration: duration.trim(),
      colleges: Array.isArray(colleges) ? colleges : [],
      isActive: Boolean(isActive),
      order: parseInt(order, 10) || 0,
    });

    await recordAudit(req, {
      action: 'course.create',
      resourceType: 'course',
      resourceId: created._id,
      summary: { name: created.name, level: created.level },
    });

    return res.status(201).json({ success: true, course: created });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
