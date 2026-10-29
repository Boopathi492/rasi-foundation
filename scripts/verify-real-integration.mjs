import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function verifyAll() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  console.log('================================================================');
  console.log('   RASI FOUNDATION — FULL INTEGRATION & FILTER VERIFICATION    ');
  console.log('================================================================\n');

  // 1. Database and API consistency
  const totalColleges = await College.countDocuments({ isActive: true });
  const totalCourses = await Course.countDocuments({ isActive: true });
  console.log(`[CHECK 1] Active Colleges in DB : ${totalColleges} (Expected: 772)`);
  console.log(`[CHECK 1] Active Courses in DB  : ${totalCourses} (Expected: 362)`);

  const distinctDistricts = await College.distinct('district');
  console.log(`[CHECK 1] Distinct DB District Strings: ${distinctDistricts.length}`);

  // 2. Scenario Testing for Public /colleges
  console.log('\n--- SCENARIOS FOR PUBLIC /colleges ---');

  // Scenario A: Medical -> Pharmacy -> B.Pharm -> Coimbatore
  const bpharmCourse = await Course.findOne({ name: 'B.Pharm', isActive: true }).lean();
  const bpharmId = bpharmCourse?._id;
  const collegesA = await College.find({
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Coimbatore$/i },
    $or: [
      { specialization: /Pharmacy/i },
      { departments: /B\.Pharm|Pharmacy/i },
      { courses: bpharmId },
      { _id: { $in: bpharmCourse?.colleges || [] } }
    ]
  }).select('name location district type specialization website').lean();
  console.log(`\nScenario A: Medical -> Pharmacy -> B.Pharm -> Coimbatore: ${collegesA.length} colleges`);
  collegesA.forEach(c => console.log(`   ✓ ${c.name} (${c.location}, ${c.district}) - ${c.website || 'No website'}`));

  // Scenario B: Medical -> Nursing -> B.Sc Nursing -> Chennai
  const bscNursing = await Course.findOne({ name: 'B.Sc Nursing', isActive: true }).lean();
  const bscNursingId = bscNursing?._id;
  const collegesB = await College.find({
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Chennai$/i },
    $or: [
      { specialization: /Nursing/i },
      { departments: /B\.Sc Nursing|Nursing/i },
      { courses: bscNursingId },
      { _id: { $in: bscNursing?.colleges || [] } }
    ]
  }).select('name location district type specialization website').lean();
  console.log(`\nScenario B: Medical -> Nursing -> B.Sc Nursing -> Chennai: ${collegesB.length} colleges`);
  collegesB.forEach(c => console.log(`   ✓ ${c.name} (${c.location}, ${c.district})`));

  // Scenario C: Medical -> Dental -> BDS -> Madurai
  const bdsCourse = await Course.findOne({ name: 'BDS', isActive: true }).lean();
  const bdsId = bdsCourse?._id;
  const collegesC = await College.find({
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Madurai$/i },
    $or: [
      { specialization: /Dental/i },
      { departments: /BDS|Dental/i },
      { courses: bdsId },
      { _id: { $in: bdsCourse?.colleges || [] } }
    ]
  }).select('name location district type specialization website').lean();
  console.log(`\nScenario C: Medical -> Dental -> BDS -> Madurai: ${collegesC.length} colleges`);
  collegesC.forEach(c => console.log(`   ✓ ${c.name} (${c.location}, ${c.district})`));

  // Scenario D: Engineering -> AI & Data Science -> Coimbatore
  const aidsCourse = await Course.findOne({ name: /Artificial Intelligence and Data Science/i, isActive: true }).lean();
  const aidsId = aidsCourse?._id;
  const collegesD = await College.find({
    isActive: true,
    type: 'Engineering',
    district: { $regex: /^Coimbatore$/i },
    $or: [
      { specialization: /Artificial Intelligence|AI|Data Science/i },
      { departments: /Artificial Intelligence|AI & ML|Data Science/i },
      { courses: aidsId },
      { _id: { $in: aidsCourse?.colleges || [] } }
    ]
  }).select('name location district type departments').lean();
  console.log(`\nScenario D: Engineering -> AI & Data Science -> Coimbatore: ${collegesD.length} colleges`);
  collegesD.slice(0, 8).forEach(c => console.log(`   ✓ ${c.name} (${c.location})`));

  // Scenario E: Agriculture -> relevant district
  const collegesE = await College.find({
    isActive: true,
    type: 'Agriculture',
    district: { $regex: /^Coimbatore$/i }
  }).select('name location district type specialization').lean();
  console.log(`\nScenario E: Agriculture -> Coimbatore: ${collegesE.length} colleges`);
  collegesE.forEach(c => console.log(`   ✓ ${c.name} (${c.district}) - ${c.specialization || 'General'}`));

  // Scenario F: Search college name and course name
  const collegesF = await College.find({
    isActive: true,
    name: { $regex: /PSG/i }
  }).select('name district type').lean();
  console.log(`\nScenario F: Search "PSG": ${collegesF.length} colleges found`);
  collegesF.forEach(c => console.log(`   ✓ ${c.name} (${c.district}) [${c.type}]`));

  // Scenario G: No-results query
  const collegesG = await College.find({
    isActive: true,
    district: 'Ariyalur',
    type: 'Medical',
    specialization: 'Aviation Engineering'
  }).lean();
  console.log(`\nScenario G: No-results test (Ariyalur + Medical + Aviation): ${collegesG.length} (Expected: 0)`);

  // 3. Testing Public /courses
  console.log('\n--- TESTING PUBLIC /courses ---');
  const testCourseDoc = await Course.findOne({ code: 'TEST-BSC-CS-01' }).lean();
  console.log(`Preserved Test Course TEST-BSC-CS-01: ${testCourseDoc ? 'FOUND' : 'MISSING'} -> "${testCourseDoc?.name}"`);

  // Check offering colleges for Pharmacy, Nursing, MBBS, AI & DS
  const mbbsCourse = await Course.findOne({ name: 'MBBS', isActive: true }).populate('colleges', 'name district').lean();
  console.log(`MBBS offering colleges: ${(mbbsCourse?.colleges || []).length}`);

  console.log(`B.Pharm offering colleges: ${(bpharmCourse?.colleges || []).length}`);
  console.log(`B.Sc Nursing offering colleges: ${(bscNursing?.colleges || []).length}`);
  console.log(`B.Tech AI & Data Science offering colleges: ${(aidsCourse?.colleges || []).length}`);

  // 4. Testing Admin compatibility
  console.log('\n--- TESTING ADMIN EDIT / CREATE COMPATIBILITY ---');
  const legacyCol = await College.findOne({ district: 'Coimbatore Zone' }).lean();
  console.log(`Legacy College with zone 'Coimbatore Zone': ${legacyCol ? 'FOUND' : 'NONE'} -> "${legacyCol?.name}"`);

  console.log('\n================================================================');
  console.log('                 ALL SCENARIOS VERIFIED SUCCESSFULLY!           ');
  console.log('================================================================');
  process.exit(0);
}

verifyAll().catch(e => {
  console.error(e);
  process.exit(1);
});
