import dotenv from 'dotenv';
import { TAMIL_NADU_DISTRICTS } from './expansion-helpers.mjs';

dotenv.config({ path: '.env.local' });

async function verify() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const totalColleges = await College.countDocuments();
  const activeColleges = await College.countDocuments({ isActive: true });
  const totalCourses = await Course.countDocuments();
  const activeCourses = await Course.countDocuments({ isActive: true });

  const testCourse = await Course.findOne({ code: 'TEST-BSC-CS-01' }).lean();

  const collegesByDistrict = await College.aggregate([
    { $group: { _id: '$district', count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  const collegesByType = await College.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  const coursesByCategory = await Course.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Relationship counts
  const collegesWithCourses = await College.countDocuments({ 'courses.0': { $exists: true } });
  const coursesWithColleges = await Course.countDocuments({ 'colleges.0': { $exists: true } });

  const courseCollegesAgg = await Course.aggregate([
    { $project: { numColleges: { $size: { $ifNull: ['$colleges', []] } } } },
    {
      $group: {
        _id: null,
        totalLinks: { $sum: '$numColleges' },
        max: { $max: '$numColleges' },
        avg: { $avg: '$numColleges' },
      },
    },
  ]);

  const collegeCoursesAgg = await College.aggregate([
    { $project: { numCourses: { $size: { $ifNull: ['$courses', []] } } } },
    {
      $group: {
        _id: null,
        totalLinks: { $sum: '$numCourses' },
        max: { $max: '$numCourses' },
        avg: { $avg: '$numCourses' },
      },
    },
  ]);

  console.log(
    JSON.stringify(
      {
        totalColleges,
        activeColleges,
        totalCourses,
        activeCourses,
        testCoursePreserved: !!testCourse && testCourse.code === 'TEST-BSC-CS-01',
        testCourseName: testCourse ? testCourse.name : null,
        districtsCount: collegesByDistrict.length,
        collegesByDistrict,
        collegesByType,
        coursesByCategory,
        collegesWithCourses,
        coursesWithColleges,
        courseCollegesAgg: courseCollegesAgg[0],
        collegeCoursesAgg: collegeCoursesAgg[0],
      },
      null,
      2
    )
  );

  process.exit(0);
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
