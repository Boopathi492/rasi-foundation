import fs from 'fs';
import path from 'path';
import { TAMIL_NADU_DISTRICTS, COLLEGE_TYPES } from './expansion-helpers.mjs';

export function validateExpansionCatalog({
  collegesPath = 'data/tamil_nadu_colleges_expansion.json',
  coursesPath = 'data/tamil_nadu_courses_expansion.json',
  masterCollegesPath = 'data/tamil_nadu_colleges_master.json',
  masterCoursesPath = 'data/courses_master_catalog.json',
} = {}) {
  const fullCollegesPath = path.resolve(collegesPath);
  const fullCoursesPath = path.resolve(coursesPath);

  if (!fs.existsSync(fullCollegesPath)) {
    throw new Error(`Expansion colleges file not found at: ${fullCollegesPath}`);
  }
  if (!fs.existsSync(fullCoursesPath)) {
    throw new Error(`Expansion courses file not found at: ${fullCoursesPath}`);
  }

  const colleges = JSON.parse(fs.readFileSync(fullCollegesPath, 'utf8'));
  const courses = JSON.parse(fs.readFileSync(fullCoursesPath, 'utf8'));

  const errors = [];
  const warnings = [];

  // ==================== 1. Validate Colleges ====================
  if (!Array.isArray(colleges)) {
    errors.push(`Colleges catalog root must be an array`);
  }

  const seenCollegeKeys = new Map();
  const districtCounts = {};
  const typeCounts = {};
  const specializationCounts = {};
  TAMIL_NADU_DISTRICTS.forEach((d) => { districtCounts[d] = 0; });
  COLLEGE_TYPES.forEach((t) => { typeCounts[t] = 0; });

  let collegesWithWebsite = 0;
  let collegesWithSource = 0;

  colleges.forEach((c, index) => {
    const row = index + 1;

    // name
    if (!c.name || typeof c.name !== 'string' || !c.name.trim()) {
      errors.push(`College Row ${row}: 'name' is required`);
    } else if (c.name.length > 200) {
      errors.push(`College Row ${row}: 'name' exceeds 200 characters`);
    }

    // location
    if (!c.location || typeof c.location !== 'string' || !c.location.trim()) {
      errors.push(`College Row ${row}: 'location' is required`);
    } else if (c.location.length > 100) {
      errors.push(`College Row ${row}: 'location' exceeds 100 characters`);
    }

    // district
    if (!c.district || typeof c.district !== 'string' || !c.district.trim()) {
      errors.push(`College Row ${row}: 'district' is required`);
    } else if (!TAMIL_NADU_DISTRICTS.includes(c.district.trim())) {
      errors.push(`College Row ${row}: 'district' '${c.district}' is not one of 38 official TN districts`);
    } else {
      districtCounts[c.district.trim()] = (districtCounts[c.district.trim()] || 0) + 1;
    }

    // type
    if (!c.type || typeof c.type !== 'string') {
      errors.push(`College Row ${row}: 'type' is required`);
    } else if (!COLLEGE_TYPES.includes(c.type)) {
      errors.push(`College Row ${row}: 'type' '${c.type}' is invalid. Allowed: ${COLLEGE_TYPES.join(', ')}`);
    } else {
      typeCounts[c.type] = (typeCounts[c.type] || 0) + 1;
    }

    // departments
    if (!Array.isArray(c.departments) || c.departments.length === 0) {
      errors.push(`College Row ${row}: 'departments' must be a non-empty array of strings`);
    } else {
      for (const dept of c.departments) {
        if (!dept || typeof dept !== 'string' || !dept.trim()) {
          errors.push(`College Row ${row}: empty department string found`);
          break;
        }
      }
    }

    // specialization
    if (c.specialization) {
      specializationCounts[c.specialization] = (specializationCounts[c.specialization] || 0) + 1;
    }

    // website
    if (c.website) {
      if (!c.website.startsWith('http://') && !c.website.startsWith('https://')) {
        errors.push(`College Row ${row}: 'website' must start with http:// or https:// (Got: ${c.website})`);
      }
      collegesWithWebsite++;
    }

    // sourceUrl
    if (c.sourceUrl) {
      if (!c.sourceUrl.startsWith('http://') && !c.sourceUrl.startsWith('https://')) {
        errors.push(`College Row ${row}: 'sourceUrl' must start with http:// or https:// (Got: ${c.sourceUrl})`);
      }
      collegesWithSource++;
    }

    // duplicate check within expansion catalog
    const key = `${(c.name || '').toLowerCase()}|${(c.district || '').toLowerCase()}`;
    if (seenCollegeKeys.has(key)) {
      errors.push(`College Row ${row}: Duplicate college '${c.name}' in '${c.district}' (already at Row ${seenCollegeKeys.get(key)})`);
    } else {
      seenCollegeKeys.set(key, row);
    }
  });

  // Cross-check against master colleges catalog if present
  let masterCollegesCollisions = 0;
  if (fs.existsSync(masterCollegesPath)) {
    const masterColleges = JSON.parse(fs.readFileSync(masterCollegesPath, 'utf8'));
    const masterCollegeKeys = new Set(masterColleges.map((c) => `${c.name.toLowerCase()}|${c.district.toLowerCase()}`));
    colleges.forEach((c) => {
      const key = `${c.name.toLowerCase()}|${c.district.toLowerCase()}`;
      if (masterCollegeKeys.has(key)) {
        errors.push(`Collision with master colleges catalog: '${c.name}' in '${c.district}'`);
        masterCollegesCollisions++;
      }
    });
  }

  // ==================== 2. Validate Courses ====================
  if (!Array.isArray(courses)) {
    errors.push(`Courses catalog root must be an array`);
  }

  const seenCourseKeys = new Map();
  const allowedLevels = ['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'];
  const courseCategoryCounts = {};

  courses.forEach((c, index) => {
    const row = index + 1;

    // name
    if (!c.name || typeof c.name !== 'string' || !c.name.trim()) {
      errors.push(`Course Row ${row}: 'name' is required`);
    } else if (c.name.length > 150) {
      errors.push(`Course Row ${row}: 'name' exceeds 150 characters`);
    }

    // level
    if (!c.level || !allowedLevels.includes(c.level)) {
      errors.push(`Course Row ${row}: 'level' '${c.level}' is invalid. Allowed: ${allowedLevels.join(', ')}`);
    }

    // category
    if (!c.category || typeof c.category !== 'string' || !c.category.trim()) {
      errors.push(`Course Row ${row}: 'category' is required`);
    } else {
      courseCategoryCounts[c.category] = (courseCategoryCounts[c.category] || 0) + 1;
    }

    // duration
    if (!c.duration || typeof c.duration !== 'string' || !c.duration.trim()) {
      errors.push(`Course Row ${row}: 'duration' is required`);
    }

    // eligibility
    if (!c.eligibility || typeof c.eligibility !== 'string' || !c.eligibility.trim()) {
      errors.push(`Course Row ${row}: 'eligibility' is required`);
    }

    // description
    if (!c.description || typeof c.description !== 'string' || !c.description.trim()) {
      errors.push(`Course Row ${row}: 'description' is required`);
    }

    // duplicate check within expansion catalog: (name, level)
    const key = `${c.name.toLowerCase()}|${c.level.toLowerCase()}`;
    if (seenCourseKeys.has(key)) {
      errors.push(`Course Row ${row}: Duplicate course '${c.name}' (${c.level}) (already at Row ${seenCourseKeys.get(key)})`);
    } else {
      seenCourseKeys.set(key, row);
    }
  });

  // Cross-check against master courses catalog if present
  let masterCoursesCollisions = 0;
  if (fs.existsSync(masterCoursesPath)) {
    const masterCourses = JSON.parse(fs.readFileSync(masterCoursesPath, 'utf8'));
    const masterCourseKeys = new Set(masterCourses.map((c) => `${c.name.toLowerCase()}|${c.level.toLowerCase()}`));
    courses.forEach((c) => {
      const key = `${c.name.toLowerCase()}|${c.level.toLowerCase()}`;
      if (masterCourseKeys.has(key)) {
        errors.push(`Collision with master courses catalog: '${c.name}' (${c.level})`);
        masterCoursesCollisions++;
      }
    });
  }

  // Check district coverage across all 38 districts
  const districtsWithZeroColleges = TAMIL_NADU_DISTRICTS.filter((d) => (districtCounts[d] || 0) === 0);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalColleges: colleges.length,
      collegesWithWebsite,
      collegesWithSource,
      totalCourses: courses.length,
      districtsCoveredCount: 38 - districtsWithZeroColleges.length,
      districtsWithZeroColleges,
      districtCounts,
      typeCounts,
      specializationCounts,
      courseCategoryCounts,
      masterCollegesCollisions,
      masterCoursesCollisions,
    },
  };
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith('validate-expansion-catalog.mjs')) {
  console.log('Running Deep Expansion Catalog Validation...');
  const result = validateExpansionCatalog();

  console.log('\n--- COLLEGE EXPANSION METRICS ---');
  console.log(`Total colleges in expansion: ${result.summary.totalColleges}`);
  console.log(`Colleges with official website: ${result.summary.collegesWithWebsite} (${Math.round((result.summary.collegesWithWebsite / result.summary.totalColleges) * 100)}%)`);
  console.log(`Colleges with source URL: ${result.summary.collegesWithSource} (${Math.round((result.summary.collegesWithSource / result.summary.totalColleges) * 100)}%)`);
  console.log(`Districts covered in expansion: ${result.summary.districtsCoveredCount} of 38 districts`);

  console.log('\n--- COLLEGES BY STREAM ---');
  Object.entries(result.summary.typeCounts).forEach(([type, count]) => {
    console.log(`  ${type.padEnd(20)}: ${count}`);
  });

  console.log('\n--- COURSE EXPANSION METRICS ---');
  console.log(`Total courses in expansion: ${result.summary.totalCourses}`);
  console.log('\n--- COURSES BY CATEGORY ---');
  Object.entries(result.summary.courseCategoryCounts).forEach(([cat, count]) => {
    console.log(`  ${cat.padEnd(20)}: ${count}`);
  });

  if (result.errors.length > 0) {
    console.error(`\n❌ VALIDATION FAILED WITH ${result.errors.length} ERRORS:`);
    result.errors.slice(0, 20).forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
    if (result.errors.length > 20) {
      console.error(`  ... and ${result.errors.length - 20} more errors`);
    }
    process.exit(1);
  } else {
    console.log('\n✅ VALIDATION PASSED: 0 errors found! Expansion catalog is fully valid and clean.');
    process.exit(0);
  }
}
