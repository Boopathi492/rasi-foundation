import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { normalizeName, TAMIL_NADU_DISTRICTS } from './expansion-helpers.mjs';

dotenv.config({ path: '.env.local' });

export const CONFIRMED_LOCAL_DB = '127.0.0.1:27017/rasi-foundation';

// Helper to normalize course names for cross-linking
function normalizeCourseKey(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export async function importExpansion({
  collegesPath = 'data/tamil_nadu_colleges_expansion.json',
  coursesPath = 'data/tamil_nadu_courses_expansion.json',
  execute = false,
  confirmDb = '',
} = {}) {
  const fullCollegesPath = path.resolve(collegesPath);
  const fullCoursesPath = path.resolve(coursesPath);

  if (!fs.existsSync(fullCollegesPath)) {
    throw new Error(`Colleges expansion file not found at: ${fullCollegesPath}`);
  }
  if (!fs.existsSync(fullCoursesPath)) {
    throw new Error(`Courses expansion file not found at: ${fullCoursesPath}`);
  }

  const expansionColleges = JSON.parse(fs.readFileSync(fullCollegesPath, 'utf8'));
  const expansionCourses = JSON.parse(fs.readFileSync(fullCoursesPath, 'utf8'));

  console.log('================================================================');
  console.log('  RASI FOUNDATION — DEEP COLLEGE & COURSE EXPANSION IMPORT');
  console.log('================================================================');
  console.log(`Execution Mode : ${execute ? '*** LIVE WRITE (EXECUTE) ***' : 'DRY-RUN (Safe Simulation, Read-Only)'}`);
  console.log(`Colleges File  : ${collegesPath} (${expansionColleges.length} records)`);
  console.log(`Courses File   : ${coursesPath} (${expansionCourses.length} records)`);

  // 1. Safety check: Target Database URI
  const envMongoUri = process.env.MONGODB_URI || '';
  const isLocalConfirmed =
    envMongoUri.includes('127.0.0.1:27017/rasi-foundation') ||
    envMongoUri.includes('localhost:27017/rasi-foundation');

  if (!isLocalConfirmed) {
    throw new Error(
      `SAFETY ABORT: MONGODB_URI is not pointing to confirmed local development database ${CONFIRMED_LOCAL_DB}. Actual URI: ${envMongoUri}`
    );
  }

  if (execute) {
    if (confirmDb !== CONFIRMED_LOCAL_DB && confirmDb !== 'localhost:27017/rasi-foundation') {
      throw new Error(
        `SAFETY ABORT: Live execution requires explicit argument: --confirm-db=${CONFIRMED_LOCAL_DB}`
      );
    }
  }

  // Connect to Database
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');

  await dbConnect();

  // 2. Query Existing Database Documents
  const existingColleges = await College.find({}).lean();
  const existingCourses = await Course.find({}).lean();

  console.log('\n--- CURRENT MONGODB SNAPSHOT ---');
  console.log(`Existing Colleges in DB : ${existingColleges.length}`);
  console.log(`Existing Courses in DB  : ${existingCourses.length}`);

  // Safety check on existing test course
  const testCourse = existingCourses.find((c) => c.code === 'TEST-BSC-CS-01');
  if (testCourse) {
    console.log(`Confirmed existing test course 'TEST-BSC-CS-01' present: '${testCourse.name}'`);
  }

  // Build lookup index of existing colleges
  const existingCollegeKeys = new Set();
  existingColleges.forEach((c) => {
    const key = `${(c.name || '').trim().toLowerCase()}|${(c.district || '').trim().toLowerCase()}`;
    existingCollegeKeys.add(key);
    existingCollegeKeys.add(normalizeName(c.name));
  });

  // Build lookup index of existing courses: (name, level)
  const existingCourseKeys = new Set();
  existingCourses.forEach((c) => {
    const key = `${(c.name || '').trim().toLowerCase()}|${(c.level || '').trim().toLowerCase()}`;
    existingCourseKeys.add(key);
  });

  // 3. Course Analysis & Insertion Planning
  let coursesPlannedToInsert = 0;
  let coursesSkipped = 0;
  const newCoursesToInsert = [];

  expansionCourses.forEach((c) => {
    const key = `${c.name.trim().toLowerCase()}|${c.level.trim().toLowerCase()}`;
    if (existingCourseKeys.has(key)) {
      coursesSkipped++;
    } else {
      coursesPlannedToInsert++;
      newCoursesToInsert.push(c);
    }
  });

  // 4. College Analysis & Insertion Planning
  let collegesPlannedToInsert = 0;
  let collegesSkipped = 0;
  const newCollegesToInsert = [];

  expansionColleges.forEach((c) => {
    const key = `${c.name.trim().toLowerCase()}|${c.district.trim().toLowerCase()}`;
    const normKey = normalizeName(c.name);
    if (existingCollegeKeys.has(key) || existingCollegeKeys.has(normKey)) {
      collegesSkipped++;
    } else {
      collegesPlannedToInsert++;
      newCollegesToInsert.push(c);
    }
  });

  // 5. Build Comprehensive Course Map (Existing + New Courses)
  // Maps normalized course keywords/names to course identities
  const allCourses = [...existingCourses, ...newCoursesToInsert];
  const courseLookupMap = new Map();

  allCourses.forEach((c) => {
    const id = c._id ? String(c._id) : `new_${c.name}_${c.level}`;
    const exactName = c.name.toLowerCase();
    const normName = normalizeCourseKey(c.name);

    if (!courseLookupMap.has(exactName)) courseLookupMap.set(exactName, { id, doc: c });
    if (!courseLookupMap.has(normName)) courseLookupMap.set(normName, { id, doc: c });

    // Also index common degree prefixes
    // e.g. "B.Tech Artificial Intelligence and Data Science" -> also index "Artificial Intelligence and Data Science"
    const stripped = c.name.replace(/^(B\.E\.|B\.Tech\.|B\.Sc|M\.Sc|M\.E\.|M\.Tech\.|Diploma in|M\.Pharm|B\.Pharm)\s+/i, '').trim();
    if (stripped.length > 3) {
      const normStripped = normalizeCourseKey(stripped);
      if (!courseLookupMap.has(normStripped)) {
        courseLookupMap.set(normStripped, { id, doc: c });
      }
    }
  });

  // 6. Relationship Resolution Simulation
  let totalCollegeCourseLinks = 0;
  const collegesWithLinks = [];
  const courseOfferingCounts = new Map();

  const allCollegesList = [...existingColleges, ...newCollegesToInsert];

  allCollegesList.forEach((col) => {
    const matchedCourseIds = new Set();
    const departments = Array.isArray(col.departments) ? col.departments : [];

    departments.forEach((dept) => {
      const exactDept = dept.toLowerCase();
      const normDept = normalizeCourseKey(dept);

      if (courseLookupMap.has(exactDept)) {
        matchedCourseIds.add(courseLookupMap.get(exactDept).id);
      } else if (courseLookupMap.has(normDept)) {
        matchedCourseIds.add(courseLookupMap.get(normDept).id);
      } else {
        // Partial token matching for standard degree patterns
        const strippedDept = dept.replace(/^(B\.E\.|B\.Tech\.|B\.Sc|M\.Sc|M\.E\.|M\.Tech\.|Diploma in|M\.Pharm|B\.Pharm)\s+/i, '').trim();
        const normStripped = normalizeCourseKey(strippedDept);
        if (normStripped && courseLookupMap.has(normStripped)) {
          matchedCourseIds.add(courseLookupMap.get(normStripped).id);
        }
      }
    });

    // Also match by specialization if set (e.g. Pharmacy, Nursing, Physiotherapy)
    if (col.specialization) {
      const normSpec = normalizeCourseKey(col.specialization);
      if (courseLookupMap.has(normSpec)) {
        matchedCourseIds.add(courseLookupMap.get(normSpec).id);
      }
    }

    if (matchedCourseIds.size > 0) {
      totalCollegeCourseLinks += matchedCourseIds.size;
      collegesWithLinks.push({ name: col.name, district: col.district, links: matchedCourseIds.size });
      matchedCourseIds.forEach((courseId) => {
        courseOfferingCounts.set(courseId, (courseOfferingCounts.get(courseId) || 0) + 1);
      });
    }
  });

  // 7. Stream and District breakdown of new colleges
  const newCollegesByStream = {};
  const newCollegesByDistrict = {};
  TAMIL_NADU_DISTRICTS.forEach((d) => { newCollegesByDistrict[d] = 0; });

  newCollegesToInsert.forEach((c) => {
    newCollegesByStream[c.type] = (newCollegesByStream[c.type] || 0) + 1;
    newCollegesByDistrict[c.district] = (newCollegesByDistrict[c.district] || 0) + 1;
  });

  // 8. Output Simulation Results
  console.log('\n--- SIMULATION & VALIDATION SUMMARY ---');
  console.log(`Colleges planned to insert : ${collegesPlannedToInsert}`);
  console.log(`Colleges skipped (existing): ${collegesSkipped}`);
  console.log(`Courses planned to insert  : ${coursesPlannedToInsert}`);
  console.log(`Courses skipped (existing) : ${coursesSkipped}`);
  console.log(`Total Bidirectional Links  : ${totalCollegeCourseLinks} relationships across ${collegesWithLinks.length} colleges`);

  console.log('\n--- NEW COLLEGES BY STREAM ---');
  Object.entries(newCollegesByStream).forEach(([stream, count]) => {
    console.log(`  ${stream.padEnd(20)}: ${count}`);
  });

  console.log('\n--- NEW COLLEGES DISTRICT SPREAD (ALL 38 DISTRICTS) ---');
  Object.entries(newCollegesByDistrict).forEach(([dist, count]) => {
    console.log(`  ${dist.padEnd(20)}: ${count}`);
  });

  // 9. Execute Mode: If --execute was specified and verified
  if (execute) {
    console.log('\n================================================================');
    console.log('  EXECUTING DATABASE WRITES ON 127.0.0.1:27017/rasi-foundation');
    console.log('================================================================');

    // A. Insert New Courses First
    let coursesInserted = 0;
    const insertedCourseDocs = [];
    if (newCoursesToInsert.length > 0) {
      console.log(`Inserting ${newCoursesToInsert.length} new courses...`);
      for (const courseData of newCoursesToInsert) {
        const created = await Course.create({
          name: courseData.name.trim(),
          code: (courseData.code || '').trim().toUpperCase(),
          level: courseData.level || 'UG',
          category: (courseData.category || '').trim(),
          specialization: (courseData.specialization || '').trim(),
          duration: (courseData.duration || '').trim(),
          eligibility: (courseData.eligibility || '').trim(),
          description: (courseData.description || '').trim(),
          sourceUrl: (courseData.sourceUrl || '').trim(),
          verificationStatus: courseData.verificationStatus || 'verified',
          isActive: true,
          order: courseData.order || 0,
          colleges: [],
        });
        insertedCourseDocs.push(created);
        coursesInserted++;
      }
      console.log(`Successfully inserted ${coursesInserted} course records.`);
    }

    // Refresh course lookup with actual ObjectIds from DB
    const refreshedCourses = await Course.find({}).lean();
    const liveCourseLookup = new Map();
    refreshedCourses.forEach((c) => {
      const exactName = c.name.toLowerCase();
      const normName = normalizeCourseKey(c.name);
      if (!liveCourseLookup.has(exactName)) liveCourseLookup.set(exactName, c._id);
      if (!liveCourseLookup.has(normName)) liveCourseLookup.set(normName, c._id);
      const stripped = c.name.replace(/^(B\.E\.|B\.Tech\.|B\.Sc|M\.Sc|M\.E\.|M\.Tech\.|Diploma in|M\.Pharm|B\.Pharm)\s+/i, '').trim();
      if (stripped.length > 3) {
        const normStripped = normalizeCourseKey(stripped);
        if (!liveCourseLookup.has(normStripped)) {
          liveCourseLookup.set(normStripped, c._id);
        }
      }
    });

    // B. Insert New Colleges with Linked Course References
    let collegesInserted = 0;
    const insertedColleges = [];
    if (newCollegesToInsert.length > 0) {
      console.log(`Inserting ${newCollegesToInsert.length} new colleges...`);
      for (const colData of newCollegesToInsert) {
        const matchedCourseIds = new Set();
        (colData.departments || []).forEach((dept) => {
          const exactDept = dept.toLowerCase();
          const normDept = normalizeCourseKey(dept);
          if (liveCourseLookup.has(exactDept)) matchedCourseIds.add(liveCourseLookup.get(exactDept));
          else if (liveCourseLookup.has(normDept)) matchedCourseIds.add(liveCourseLookup.get(normDept));
          else {
            const strippedDept = dept.replace(/^(B\.E\.|B\.Tech\.|B\.Sc|M\.Sc|M\.E\.|M\.Tech\.|Diploma in|M\.Pharm|B\.Pharm)\s+/i, '').trim();
            const normStripped = normalizeCourseKey(strippedDept);
            if (normStripped && liveCourseLookup.has(normStripped)) {
              matchedCourseIds.add(liveCourseLookup.get(normStripped));
            }
          }
        });

        if (colData.specialization) {
          const normSpec = normalizeCourseKey(colData.specialization);
          if (liveCourseLookup.has(normSpec)) matchedCourseIds.add(liveCourseLookup.get(normSpec));
        }

        const createdCol = await College.create({
          name: colData.name.trim(),
          location: colData.location.trim(),
          district: colData.district.trim(),
          type: colData.type || 'Engineering',
          specialization: (colData.specialization || '').trim(),
          institutionType: (colData.institutionType || '').trim(),
          tneaCode: (colData.tneaCode || '').trim(),
          note: (colData.note || '').trim(),
          departments: Array.isArray(colData.departments) ? colData.departments : [],
          website: (colData.website || '').trim(),
          sourceUrl: (colData.sourceUrl || '').trim(),
          verificationStatus: colData.verificationStatus || 'directory_listed',
          courses: Array.from(matchedCourseIds),
          isActive: true,
          order: colData.order || 0,
        });

        insertedColleges.push(createdCol);
        collegesInserted++;

        // Update Course.colleges array for each matched course (bidirectional link)
        for (const courseId of matchedCourseIds) {
          await Course.findByIdAndUpdate(courseId, {
            $addToSet: { colleges: createdCol._id },
          });
        }
      }
      console.log(`Successfully inserted ${collegesInserted} college records with bidirectional course links.`);
    }

    // C. Associate Existing Colleges with Canonical Courses by updating Course.colleges
    console.log(`\nAssociating existing colleges with canonical courses in Course.colleges using $addToSet...`);
    let existingCollegeLinksApplied = 0;
    for (const exCol of existingColleges) {
      const matchedCourseIds = new Set();
      (exCol.departments || []).forEach((dept) => {
        const exactDept = dept.toLowerCase();
        const normDept = normalizeCourseKey(dept);
        if (liveCourseLookup.has(exactDept)) matchedCourseIds.add(liveCourseLookup.get(exactDept));
        else if (liveCourseLookup.has(normDept)) matchedCourseIds.add(liveCourseLookup.get(normDept));
        else {
          const strippedDept = dept.replace(/^(B\.E\.|B\.Tech\.|B\.Sc|M\.Sc|M\.E\.|M\.Tech\.|Diploma in|M\.Pharm|B\.Pharm)\s+/i, '').trim();
          const normStripped = normalizeCourseKey(strippedDept);
          if (normStripped && liveCourseLookup.has(normStripped)) {
            matchedCourseIds.add(liveCourseLookup.get(normStripped));
          }
        }
      });

      if (exCol.specialization) {
        const normSpec = normalizeCourseKey(exCol.specialization);
        if (liveCourseLookup.has(normSpec)) matchedCourseIds.add(liveCourseLookup.get(normSpec));
      }

      for (const courseId of matchedCourseIds) {
        await Course.findByIdAndUpdate(courseId, {
          $addToSet: { colleges: exCol._id },
        });
        existingCollegeLinksApplied++;
      }
    }
    console.log(`Successfully updated Course.colleges for existing colleges (${existingCollegeLinksApplied} links applied).`);

    // Final Post-Import DB Counts
    const postCollegesCount = await College.countDocuments();
    const postCoursesCount = await Course.countDocuments();

    console.log('\n--- FINAL POST-IMPORT DATABASE COUNTS ---');
    console.log(`Total Colleges in DB : ${postCollegesCount} (was ${existingColleges.length})`);
    console.log(`Total Courses in DB  : ${postCoursesCount} (was ${existingCourses.length})`);
    console.log(`Import completed safely and successfully!`);
  } else {
    console.log('\n================================================================');
    console.log('  DRY-RUN COMPLETE: NO DATABASE WRITES PERFORMED.');
    console.log('  To execute writes, re-run with:');
    console.log(`  node scripts/import-expansion.mjs --execute --confirm-db=${CONFIRMED_LOCAL_DB}`);
    console.log('================================================================');
  }

  return {
    existingCollegesCount: existingColleges.length,
    existingCoursesCount: existingCourses.length,
    collegesPlannedToInsert,
    collegesSkipped,
    coursesPlannedToInsert,
    coursesSkipped,
    totalCollegeCourseLinks,
    newCollegesByStream,
    newCollegesByDistrict,
  };
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('import-expansion.mjs')) {
  const args = process.argv.slice(2);
  const execute = args.includes('--execute');
  const confirmDbArg = args.find((a) => a.startsWith('--confirm-db='));
  const confirmDb = confirmDbArg ? confirmDbArg.split('=')[1] : '';

  importExpansion({ execute, confirmDb })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(`\n❌ IMPORT ERROR: ${err.message}`);
      process.exit(1);
    });
}
