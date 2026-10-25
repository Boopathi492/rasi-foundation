import dbConnect from '@/backend/lib/mongodb';
import Course from '@/backend/models/Course';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const { level, category, search } = req.query;
    const query = { isActive: true };

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
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const courses = await Course.find(query)
      .populate('colleges', 'name location district type')
      .sort({ order: 1, name: 1 })
      .lean();

    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
    return res.status(200).json({ success: true, count: courses.length, courses });
  } catch (err) {
    console.error('[Public Courses API Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
}
