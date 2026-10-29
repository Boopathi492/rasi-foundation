import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkCourses() {
  const masterCourses = JSON.parse(fs.readFileSync('data/courses_master_catalog.json', 'utf8'));
  console.log(`Master courses count: ${masterCourses.length}`);

  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const dbCourses = await Course.find({}).lean();
  console.log(`DB courses count: ${dbCourses.length}`);

  const courseKeys = new Set();
  masterCourses.forEach(c => courseKeys.add(`${c.name.toLowerCase().trim()}|${c.level.toLowerCase().trim()}`));
  dbCourses.forEach(c => courseKeys.add(`${(c.name || '').toLowerCase().trim()}|${(c.level || '').toLowerCase().trim()}`));

  console.log(`Total unique (name, level) pairs known: ${courseKeys.size}`);
  process.exit(0);
}

checkCourses();
