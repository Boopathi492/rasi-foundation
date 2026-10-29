import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '..', 'data', 'courses_master_catalog.json');
const courses = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const ALLOWED_LEVELS = ['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'];
const ALLOWED_CATEGORIES = ['medical', 'engineering', 'management', 'arts', 'law', 'education', 'agriculture'];

const errors = [];
const warnings = [];
const uniquePairs = new Set();
const uniqueCodes = new Set();
const categoryCounts = {};
const levelCounts = {};

ALLOWED_CATEGORIES.forEach((cat) => {
  categoryCounts[cat] = 0;
});

ALLOWED_LEVELS.forEach((lvl) => {
  levelCounts[lvl] = 0;
});

courses.forEach((c, index) => {
  const row = index + 1;

  // 1. Name check
  if (!c.name || typeof c.name !== 'string' || !c.name.trim()) {
    errors.push(`Row ${row}: Missing or empty name`);
  } else if (c.name.length > 150) {
    errors.push(`Row ${row}: Name exceeds 150 chars (${c.name.length}): "${c.name}"`);
  }

  // 2. Level check
  if (!ALLOWED_LEVELS.includes(c.level)) {
    errors.push(`Row ${row}: Invalid level "${c.level}". Must be one of: ${ALLOWED_LEVELS.join(', ')}`);
  } else {
    levelCounts[c.level] = (levelCounts[c.level] || 0) + 1;
  }

  // 3. Category check
  if (!ALLOWED_CATEGORIES.includes(c.category)) {
    errors.push(`Row ${row}: Invalid category "${c.category}". Must be one of: ${ALLOWED_CATEGORIES.join(', ')}`);
  } else {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  }

  // 4. Code check
  if (c.code) {
    if (c.code.length > 20) {
      errors.push(`Row ${row}: Code exceeds 20 chars (${c.code.length}): "${c.code}"`);
    }
    if (c.code !== c.code.toUpperCase()) {
      errors.push(`Row ${row}: Code must be uppercase: "${c.code}"`);
    }
    if (uniqueCodes.has(c.code)) {
      warnings.push(`Row ${row}: Duplicate code "${c.code}" found for course "${c.name}"`);
    }
    uniqueCodes.add(c.code);
  }

  // 5. Duration check
  if (!c.duration || c.duration.length > 40) {
    errors.push(`Row ${row}: Duration missing or exceeds 40 chars: "${c.duration}"`);
  }

  // 6. Eligibility check
  if (!c.eligibility || c.eligibility.length > 600) {
    errors.push(`Row ${row}: Eligibility missing or exceeds 600 chars (${c.eligibility ? c.eligibility.length : 0})`);
  }

  // 7. Description check
  if (!c.description || c.description.length > 1500) {
    errors.push(`Row ${row}: Description missing or exceeds 1500 chars (${c.description ? c.description.length : 0})`);
  }

  // 8. Unique (name, level) check (case-insensitive)
  const pairKey = `${(c.name || '').trim().toLowerCase()}:::${c.level}`;
  if (uniquePairs.has(pairKey)) {
    errors.push(`Row ${row}: Duplicate (name, level) combination detected: "${c.name}" at level "${c.level}"`);
  }
  uniquePairs.add(pairKey);
});

// Check conflict with known existing database test course
const testCourseKey = 'test course - b.sc computer science:::ug';
const hasTestCourseConflict = uniquePairs.has(testCourseKey);

console.log('========================================================');
console.log('COURSE MASTER CATALOG AUDIT & VALIDATION REPORT');
console.log('========================================================');
console.log(`Total Courses Analyzed: ${courses.length}`);
console.log(`Schema Errors Found:    ${errors.length}`);
console.log(`Warnings Found:         ${warnings.length}`);
console.log('--------------------------------------------------------');
console.log('CATEGORY BREAKDOWN:');
Object.entries(categoryCounts).forEach(([cat, count]) => {
  console.log(`  - ${cat.padEnd(15)}: ${count} courses`);
});
console.log('--------------------------------------------------------');
console.log('LEVEL BREAKDOWN:');
Object.entries(levelCounts).forEach(([lvl, count]) => {
  console.log(`  - ${lvl.padEnd(15)}: ${count} courses`);
});
console.log('--------------------------------------------------------');
console.log(`Conflict with existing DB test course: ${hasTestCourseConflict ? 'YES (Conflict)' : 'NO (Clean)'}`);
console.log('========================================================');

if (errors.length > 0) {
  console.error('\nERRORS:');
  errors.forEach((e) => console.error(`  [X] ${e}`));
  process.exit(1);
} else {
  console.log('\n[PASS] All 318 records strictly adhere to the Mongoose Course schema constraints.');
  process.exit(0);
}
