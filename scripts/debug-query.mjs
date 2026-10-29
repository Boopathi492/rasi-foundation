import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function debugQuery() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const course = 'BDS';
  const type = 'Medical';
  const district = 'Madurai';

  const query = { isActive: true };
  if (district) query.district = { $regex: new RegExp(`^${district.trim()}$`, 'i') };
  if (type) query.type = type.trim();

  const courseRegex = new RegExp(course.trim(), 'i');
  const matchedCourse = await Course.findOne({
    isActive: true,
    $or: [
      { name: { $regex: new RegExp(`^${course.trim()}$`, 'i') } },
      { code: { $regex: new RegExp(`^${course.trim()}$`, 'i') } }
    ]
  }).select('_id colleges').lean();

  console.log('Matched Course:', matchedCourse?.name || matchedCourse?.code, 'Colleges in course:', matchedCourse?.colleges?.length);

  const courseOrConditions = [
    { departments: courseRegex },
    { specialization: courseRegex }
  ];

  if (matchedCourse) {
    courseOrConditions.push({ courses: matchedCourse._id });
    if (Array.isArray(matchedCourse.colleges) && matchedCourse.colleges.length > 0) {
      courseOrConditions.push({ _id: { $in: matchedCourse.colleges } });
    }
  }

  query.$or = courseOrConditions;

  console.log('Final Query:', JSON.stringify(query, null, 2));

  try {
    const colleges = await College.find(query)
      .populate('courses', 'name code level category specialization duration')
      .sort({ district: 1, order: 1, name: 1 })
      .lean();
    console.log('Colleges returned:', colleges.length);
  } catch (err) {
    console.error('FIND ERROR:', err);
  }

  process.exit(0);
}

debugQuery();
