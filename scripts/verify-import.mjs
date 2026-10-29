import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function verify() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const total = await Course.countDocuments();
  const active = await Course.countDocuments({ isActive: true });
  const inactive = await Course.countDocuments({ isActive: false });

  const categoryAgg = await Course.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: { $toLower: '$category' }, count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // Check test course
  const testCourse = await Course.findOne({ name: 'Test Course - B.Sc Computer Science' });

  console.log('--- POST-IMPORT DATABASE VERIFICATION ---');
  console.log('TOTAL_COURSES:', total);
  console.log('ACTIVE_COURSES:', active);
  console.log('INACTIVE_COURSES:', inactive);
  console.log('CATEGORY_COUNTS:', JSON.stringify(categoryAgg, null, 2));
  console.log('TEST_COURSE_PRESERVED:', testCourse ? {
    _id: testCourse._id.toString(),
    name: testCourse.name,
    code: testCourse.code,
    category: testCourse.category,
    duration: testCourse.duration,
    isActive: testCourse.isActive
  } : 'MISSING!');

  const mongooseModule = await import('mongoose');
  await mongooseModule.default.disconnect();
  process.exit(0);
}
verify().catch((e) => {
  console.error(e);
  process.exit(1);
});
