import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testMapping() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const courses = await Course.find({ isActive: true }).lean();
  console.log(`Loaded ${courses.length} courses from DB.`);

  const expansionColleges = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_expansion.json', 'utf8'));
  console.log(`Loaded ${expansionColleges.length} expansion colleges.`);

  // Build name-to-course map
  const courseMap = new Map();
  courses.forEach(c => {
    courseMap.set(c.name.toLowerCase().trim(), c);
    // Also clean name: remove dots, e.g. "B.E. " -> "be"
    const clean = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    courseMap.set(clean, c);
  });

  let matchedDepts = 0;
  let totalDepts = 0;
  let collegeMappings = 0;

  expansionColleges.forEach(col => {
    let collegeHasMatch = false;
    (col.departments || []).forEach(dept => {
      totalDepts++;
      const dLower = dept.toLowerCase().trim();
      const dClean = dept.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (courseMap.has(dLower) || courseMap.has(dClean)) {
        matchedDepts++;
        collegeHasMatch = true;
      }
    });
    if (collegeHasMatch) collegeMappings++;
  });

  console.log(`Total departments evaluated: ${totalDepts}`);
  console.log(`Matched to canonical courses: ${matchedDepts} (${Math.round((matchedDepts/totalDepts)*100)}%)`);
  console.log(`Colleges with at least 1 mapped course: ${collegeMappings} of ${expansionColleges.length} (${Math.round((collegeMappings/expansionColleges.length)*100)}%)`);

  process.exit(0);
}

testMapping();
