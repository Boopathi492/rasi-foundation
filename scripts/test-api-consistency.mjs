import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testMapping() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  // Load all courses with colleges
  const courses = await Course.find({ isActive: true, 'colleges.0': { $exists: true } })
    .select('name code level category specialization duration colleges')
    .lean();

  console.log('Courses with colleges in DB:', courses.length);

  // Build reverse map: collegeId -> courses
  const collegeToCoursesMap = new Map();
  courses.forEach((c) => {
    (c.colleges || []).forEach((colId) => {
      const idStr = String(colId);
      if (!collegeToCoursesMap.has(idStr)) {
        collegeToCoursesMap.set(idStr, []);
      }
      collegeToCoursesMap.get(idStr).push({
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

  console.log('Colleges mapped in reverse map:', collegeToCoursesMap.size);

  // Check an existing college (MMC)
  const mmc = await College.findOne({ name: /Madras Medical College/i }).lean();
  if (mmc) {
    const mmcCourses = collegeToCoursesMap.get(String(mmc._id)) || [];
    console.log('MMC courses from Course.colleges:', mmcCourses.map((c) => c.name));
    console.log('MMC college.courses length in DB document:', (mmc.courses || []).length);
  }

  // Check an existing college (CEG)
  const ceg = await College.findOne({ name: /College of Engineering, Guindy/i }).lean();
  if (ceg) {
    const cegCourses = collegeToCoursesMap.get(String(ceg._id)) || [];
    console.log('CEG courses from Course.colleges:', cegCourses.map((c) => c.name));
    console.log('CEG college.courses length in DB document:', (ceg.courses || []).length);
  }

  // Check an expansion college
  const expCol = await College.findOne({ verificationStatus: 'Official Regulator Listed' }).lean();
  if (expCol) {
    const expCourses = collegeToCoursesMap.get(String(expCol._id)) || [];
    console.log('Expansion College:', expCol.name);
    console.log('Expansion College courses from Course.colleges:', expCourses.map((c) => c.name));
    console.log('Expansion College college.courses in DB document:', (expCol.courses || []).length);
  }

  process.exit(0);
}

testMapping().catch((e) => {
  console.error(e);
  process.exit(1);
});
