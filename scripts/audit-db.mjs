import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function audit() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');

  await dbConnect();

  const collegeCount = await College.countDocuments();
  const collegeActive = await College.countDocuments({ isActive: true });
  const courseCount = await Course.countDocuments();
  const courseActive = await Course.countDocuments({ isActive: true });

  const collegeTypes = await College.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } }
  ]);

  const courseCategories = await Course.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  const courseLevels = await Course.aggregate([
    { $group: { _id: '$level', count: { $sum: 1 } } }
  ]);

  const coursesWithColleges = await Course.countDocuments({
    colleges: { $exists: true, $not: { $size: 0 } }
  });

  const sampleCourse = await Course.findOne({
    colleges: { $exists: true, $not: { $size: 0 } }
  }).lean();

  const sampleCollege = await College.findOne({ departments: { $exists: true, $not: { $size: 0 } } }).lean();

  console.log(JSON.stringify({
    collegeCount,
    collegeActive,
    courseCount,
    courseActive,
    collegeTypes,
    courseCategories,
    courseLevels,
    coursesWithColleges,
    sampleCourseWithColleges: sampleCourse ? { name: sampleCourse.name, collegesCount: sampleCourse.colleges.length } : null,
    sampleCollegeDepartments: sampleCollege ? { name: sampleCollege.name, type: sampleCollege.type, deptCount: sampleCollege.departments.length } : null
  }, null, 2));

  process.exit(0);
}

audit().catch(err => {
  console.error(err);
  process.exit(1);
});
