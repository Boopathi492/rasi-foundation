import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testFilters() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  console.log('Testing Database Filter Queries Directly:');

  // 1. Medical -> Pharmacy -> Coimbatore
  const q1 = {
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Coimbatore$/i },
    $or: [{ specialization: /Pharmacy/i }, { departments: /Pharmacy/i }]
  };
  const res1 = await College.find(q1).select('name district type specialization departments').lean();
  console.log('\n1. Medical -> Pharmacy -> Coimbatore:', res1.length);
  res1.forEach(c => console.log(`   - ${c.name} [${c.specialization}] (${(c.departments || []).slice(0, 3).join(', ')})`));

  // 2. Medical -> Nursing -> Chennai
  const q2 = {
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Chennai$/i },
    $or: [{ specialization: /Nursing/i }, { departments: /Nursing/i }]
  };
  const res2 = await College.find(q2).select('name district type specialization departments').lean();
  console.log('\n2. Medical -> Nursing -> Chennai:', res2.length);
  res2.forEach(c => console.log(`   - ${c.name} [${c.specialization}]`));

  // 3. Medical -> Dental/BDS -> Madurai
  const q3 = {
    isActive: true,
    type: 'Medical',
    district: { $regex: /^Madurai$/i },
    $or: [{ specialization: /Dental/i }, { departments: /BDS|Dental/i }]
  };
  const res3 = await College.find(q3).select('name district type specialization departments').lean();
  console.log('\n3. Medical -> Dental/BDS -> Madurai:', res3.length);
  res3.forEach(c => console.log(`   - ${c.name} [${c.specialization}]`));

  // 4. Engineering -> AI & Data Science -> Coimbatore
  const q4 = {
    isActive: true,
    type: 'Engineering',
    district: { $regex: /^Coimbatore$/i },
    $or: [
      { specialization: /Artificial Intelligence|AI|Data Science/i },
      { departments: /Artificial Intelligence|AI & ML|Data Science/i }
    ]
  };
  const res4 = await College.find(q4).select('name district type specialization departments').lean();
  console.log('\n4. Engineering -> AI & Data Science -> Coimbatore:', res4.length);
  res4.slice(0, 5).forEach(c => console.log(`   - ${c.name}`));

  // 5. Agriculture in relevant district
  const q5 = {
    isActive: true,
    type: 'Agriculture',
  };
  const res5 = await College.find(q5).select('name district type specialization').lean();
  console.log('\n5. Agriculture Colleges Total in TN:', res5.length);
  res5.slice(0, 5).forEach(c => console.log(`   - ${c.name} (${c.district})`));

  // 6. Test Course Colleges reverse count:
  const pharmacyCourse = await Course.findOne({ name: 'B.Pharm' }).populate('colleges', 'name district').lean();
  console.log('\n6. B.Pharm Offering Colleges in TN:', (pharmacyCourse?.colleges || []).length);
  const cbtrBPharm = (pharmacyCourse?.colleges || []).filter(c => c.district.toLowerCase() === 'coimbatore');
  console.log('   In Coimbatore:', cbtrBPharm.length);
  cbtrBPharm.forEach(c => console.log(`     * ${c.name} (${c.district})`));

  const nursingCourse = await Course.findOne({ name: 'B.Sc Nursing' }).populate('colleges', 'name district').lean();
  console.log('\n7. B.Sc Nursing Offering Colleges in TN:', (nursingCourse?.colleges || []).length);
  const chnNursing = (nursingCourse?.colleges || []).filter(c => c.district.toLowerCase() === 'chennai');
  console.log('   In Chennai:', chnNursing.length);
  chnNursing.forEach(c => console.log(`     * ${c.name} (${c.district})`));

  process.exit(0);
}
testFilters().catch(e => {
  console.error(e);
  process.exit(1);
});
