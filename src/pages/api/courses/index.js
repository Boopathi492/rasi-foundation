import dbConnect from '@/backend/lib/mongodb';
import Course from '@/backend/models/Course';
import College from '@/backend/models/College';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { level, category, specialization, duration, district, collegeId, search, limit, page } = req.query;
    const query = { isActive: true };

    if (level && level !== 'all') {
      query.level = level;
    }
    if (category && category !== 'all') {
      // Allow exact match or case-insensitive match
      query.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }
    if (specialization && specialization !== 'all') {
      query.specialization = { $regex: specialization.trim(), $options: 'i' };
    }
    if (duration && duration !== 'all') {
      query.duration = { $regex: duration.trim(), $options: 'i' };
    }
    if (collegeId && collegeId !== 'all') {
      query.colleges = collegeId;
    } else if (district && district !== 'all') {
      const districtColleges = await College.find({
        district: { $regex: new RegExp(`^${district.trim()}$`, 'i') },
        isActive: true,
      }).select('_id').lean();
      query.colleges = { $in: districtColleges.map((c) => c._id) };
    }

    if (search) {
      const q = search.trim();
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { code: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { specialization: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { eligibility: { $regex: q, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = parseInt(limit, 10) || 0;

    const queryExec = Course.find(query)
      .populate('colleges', 'name location district type specialization institutionType website')
      .sort({ order: 1, name: 1 })
      .lean();

    if (limitNum > 0) {
      queryExec.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const [courses, total, categoryStats] = await Promise.all([
      queryExec,
      Course.countDocuments(query),
      Course.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: { $toLower: '$category' }, count: { $sum: 1 } } },
      ])
    ]);

    const categoryCounts = Object.fromEntries(categoryStats.map((s) => [s._id, s.count]));

    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({
      success: true,
      total,
      count: courses.length,
      page: pageNum,
      totalPages: limitNum > 0 ? Math.ceil(total / limitNum) : 1,
      courses,
      categoryCounts,
    });
  } catch (err) {
    console.error('[Public Courses API Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
}
