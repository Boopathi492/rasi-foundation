import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';
import Course from '@/backend/models/Course';

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const { district, type, search, format, specialization, course, institutionType } = req.query;

      const query = { isActive: true };

      if (district && district !== 'all') {
        const escapedDistrict = escapeRegex(district.trim());
        query.district = { $regex: new RegExp(`^${escapedDistrict}$`, 'i') };
      }

      if (type && type !== 'all') {
        query.type = type.trim();
      }

      if (specialization && specialization !== 'all') {
        const escapedSpec = escapeRegex(specialization.trim());
        const specRegex = new RegExp(escapedSpec, 'i');
        query.$or = [
          { specialization: specRegex },
          { departments: specRegex }
        ];
      }

      if (institutionType && institutionType !== 'all') {
        const escapedInstType = escapeRegex(institutionType.trim());
        query.institutionType = { $regex: new RegExp(`^${escapedInstType}$`, 'i') };
      }

      if (course && course !== 'all') {
        const rawCourse = course.trim();
        const escapedCourse = escapeRegex(rawCourse);
        const courseRegex = new RegExp(escapedCourse, 'i');

        // Match canonical Course document by exact name, escaped regex, code, or name containing query
        const matchedCourses = await Course.find({
          isActive: true,
          $or: [
            { name: rawCourse },
            { name: { $regex: new RegExp(`^${escapedCourse}$`, 'i') } },
            { name: { $regex: courseRegex } },
            { code: rawCourse.toUpperCase() },
            { code: { $regex: new RegExp(`^${escapedCourse}$`, 'i') } }
          ]
        }).select('_id colleges').lean();

        const courseOrConditions = [
          { departments: courseRegex },
          { specialization: courseRegex }
        ];

        if (matchedCourses && matchedCourses.length > 0) {
          const matchedIds = matchedCourses.map(mc => mc._id);
          const allCollegesInCourses = Array.from(
            new Set(matchedCourses.flatMap(mc => (mc.colleges || []).map(id => String(id))))
          );

          courseOrConditions.push({ courses: { $in: matchedIds } });
          if (allCollegesInCourses.length > 0) {
            courseOrConditions.push({ _id: { $in: allCollegesInCourses } });
          }
        }

        if (query.$or) {
          query.$and = [
            { $or: query.$or },
            { $or: courseOrConditions }
          ];
          delete query.$or;
        } else {
          query.$or = courseOrConditions;
        }
      }

      if (search && search.trim()) {
        const escapedSearch = escapeRegex(search.trim());
        const regex = new RegExp(escapedSearch, 'i');
        const searchOr = [
          { name: regex },
          { location: regex },
          { district: regex },
          { tneaCode: regex },
          { departments: regex },
          { specialization: regex },
          { institutionType: regex }
        ];
        if (query.$or) {
          query.$and = (query.$and || []).concat([{ $or: query.$or }, { $or: searchOr }]);
          delete query.$or;
        } else if (query.$and) {
          query.$and.push({ $or: searchOr });
        } else {
          query.$or = searchOr;
        }
      }

      const [colleges, courseLinks] = await Promise.all([
        College.find(query)
          .populate('courses', 'name code level category specialization duration')
          .sort({ district: 1, order: 1, name: 1 })
          .lean(),
        Course.find({ isActive: true, 'colleges.0': { $exists: true } })
          .select('name code level category specialization duration colleges')
          .lean()
      ]);

      const collegeCoursesMap = new Map();
      courseLinks.forEach(c => {
        (c.colleges || []).forEach(colId => {
          const idStr = String(colId);
          if (!collegeCoursesMap.has(idStr)) collegeCoursesMap.set(idStr, []);
          collegeCoursesMap.get(idStr).push({
            _id: c._id,
            name: c.name,
            code: c.code,
            level: c.level,
            category: c.category,
            specialization: c.specialization,
            duration: c.duration,
          });
        });
      });

      const enrichedColleges = colleges.map(college => {
        const idStr = String(college._id);
        const resolvedCourses = (Array.isArray(college.courses) && college.courses.length > 0)
          ? college.courses
          : (collegeCoursesMap.get(idStr) || []);

        return {
          _id: college._id,
          name: college.name,
          location: college.location,
          district: college.district,
          type: college.type || 'Engineering',
          specialization: college.specialization || '',
          institutionType: college.institutionType || '',
          courses: resolvedCourses,
          tneaCode: college.tneaCode || '',
          tneaStatus: college.tneaStatus || 'not_applicable',
          tneaSourceYear: college.tneaSourceYear || '',
          note: college.note || '',
          departments: Array.isArray(college.departments) ? college.departments : [],
          website: college.website || '',
          sourceUrl: college.sourceUrl || '',
          verificationStatus: college.verificationStatus || 'directory_listed',
          logoUrl: college.logo?.storageKey ? `/api/colleges/${college._id}/logo` : null,
          isActive: college.isActive !== false
        };
      });

      // If flat format requested, return flat list with pagination
      if (format === 'flat') {
        const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limitNum = parseInt(req.query.limit, 10);
        const total = enrichedColleges.length;
        const paged = limitNum > 0
          ? enrichedColleges.slice((pageNum - 1) * limitNum, pageNum * limitNum)
          : enrichedColleges;

        return res.status(200).json({
          colleges: paged,
          total,
          count: paged.length,
          page: pageNum,
          totalPages: limitNum > 0 ? Math.ceil(total / limitNum) : 1
        });
      }

      // Default format: Group colleges by district for backward compatibility with existing components
      const groupedColleges = enrichedColleges.reduce((acc, college) => {
        const dist = college.district || 'Other';
        if (!acc[dist]) {
          acc[dist] = [];
        }
        acc[dist].push(college);
        return acc;
      }, {});

      const result = Object.keys(groupedColleges).map(dist => ({
        district: dist,
        colleges: groupedColleges[dist],
      }));

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      return res.status(500).json({ message: 'Internal server error', detail: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
