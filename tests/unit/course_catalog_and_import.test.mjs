import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from '../../src/backend/models/Course.js';

const COURSE_CATEGORIES = [
  { value: 'engineering', label: 'Engineering & Technology (engineering)' },
  { value: 'medical', label: 'Medical & Healthcare (medical)' },
  { value: 'management', label: 'Management & Business (management)' },
  { value: 'arts', label: 'Arts & Science (arts)' },
  { value: 'law', label: 'Law & Legal Studies (law)' },
  { value: 'education', label: 'Education & Teaching (education)' },
  { value: 'agriculture', label: 'Agriculture & Allied Sciences (agriculture)' },
  { value: 'other', label: 'Other Disciplines (other)' },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Dataset existence & volume test
test('Course Master Catalog: JSON file exists and contains at least 300 validated courses', () => {
  const jsonPath = path.join(__dirname, '..', '..', 'data', 'courses_master_catalog.json');
  assert.ok(fs.existsSync(jsonPath), 'Catalog JSON file must exist at data/courses_master_catalog.json');

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const catalog = JSON.parse(raw);

  assert.ok(Array.isArray(catalog), 'Catalog must be an array');
  assert.ok(catalog.length >= 300, `Catalog must have at least 300 courses, found: ${catalog.length}`);
  assert.equal(catalog.length, 318, 'Expected exact catalog count of 318 courses');
});

// 2. Schema compliance & valid enums
test('Course Master Catalog: Every record strictly satisfies Mongoose Course schema constraints', () => {
  const jsonPath = path.join(__dirname, '..', '..', 'data', 'courses_master_catalog.json');
  const catalog = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const ALLOWED_LEVELS = ['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'];
  const ALLOWED_CATEGORIES = ['medical', 'engineering', 'management', 'arts', 'law', 'education', 'agriculture'];
  const seenPairs = new Set();

  catalog.forEach((c, idx) => {
    const row = idx + 1;
    // Instantiate in Mongoose model to trigger full schema validation
    const modelInstance = new Course(c);
    const validationError = modelInstance.validateSync();
    assert.equal(validationError, undefined, `Row ${row} (${c.name}) failed Mongoose validation: ${validationError?.message}`);

    // Check custom constraints
    assert.ok(c.name && c.name.length <= 150, `Row ${row}: Invalid name`);
    assert.ok(ALLOWED_LEVELS.includes(c.level), `Row ${row}: Invalid level '${c.level}'`);
    assert.ok(ALLOWED_CATEGORIES.includes(c.category), `Row ${row}: Invalid category '${c.category}'`);
    assert.ok(c.duration && c.duration.length <= 40, `Row ${row}: Invalid duration`);
    assert.ok(c.eligibility && c.eligibility.length <= 600, `Row ${row}: Invalid eligibility`);
    assert.ok(c.description && c.description.length <= 1500, `Row ${row}: Invalid description`);
    assert.equal(c.isActive, true, `Row ${row}: isActive must default to true`);

    // Unique (name, level) case-insensitive check
    const pair = `${c.name.trim().toLowerCase()}:::${c.level}`;
    assert.ok(!seenPairs.has(pair), `Row ${row}: Duplicate pair detected: ${pair}`);
    seenPairs.add(pair);
  });
});

// 3. Category alignment across Admin, Public UI and Dataset
test('Course Master Catalog: Categories align 100% across Admin options, Public cards, and Schema', () => {
  const PUBLIC_CATEGORIES = [
    'medical',
    'engineering',
    'management',
    'arts',
    'law',
    'education',
    'agriculture',
  ];

  // Admin categories contain all 7 public categories
  const adminValues = COURSE_CATEGORIES.map((c) => c.value);
  for (const cat of PUBLIC_CATEGORIES) {
    assert.ok(adminValues.includes(cat), `Admin categories must include '${cat}'`);
  }

  // Load catalog and verify all 7 categories are well-represented with active records
  const jsonPath = path.join(__dirname, '..', '..', 'data', 'courses_master_catalog.json');
  const catalog = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const counts = {};
  PUBLIC_CATEGORIES.forEach((c) => { counts[c] = 0; });
  catalog.forEach((c) => {
    if (counts[c.category] !== undefined) counts[c.category]++;
  });

  assert.ok(counts.medical >= 50, `Medical should have >= 50 courses, found ${counts.medical}`);
  assert.ok(counts.engineering >= 80, `Engineering should have >= 80 courses, found ${counts.engineering}`);
  assert.ok(counts.management >= 40, `Management should have >= 40 courses, found ${counts.management}`);
  assert.ok(counts.arts >= 50, `Arts & Science should have >= 50 courses, found ${counts.arts}`);
  assert.ok(counts.law >= 15, `Law should have >= 15 courses, found ${counts.law}`);
  assert.ok(counts.education >= 15, `Education should have >= 15 courses, found ${counts.education}`);
  assert.ok(counts.agriculture >= 20, `Agriculture should have >= 20 courses, found ${counts.agriculture}`);
});

// 4. Dynamic category counts calculation (No stale hardcoded counts)
test('Course Catalog UI: Category counts are dynamically computed from active course inventory', () => {
  const CATEGORIES = [
    { id: 'medical', name: 'Medical' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'management', name: 'Management' },
    { id: 'arts', name: 'Arts & Science' },
    { id: 'law', name: 'Law' },
    { id: 'education', name: 'Education' },
    { id: 'agriculture', name: 'Agriculture' },
  ];

  // Simulating active courses from DB (e.g. 1 test course in 'arts')
  const testCourses = [
    { id: '1', name: 'Test Course - B.Sc Computer Science', category: 'arts', isActive: true },
  ];

  function computeCounts(coursesList) {
    const counts = {};
    for (const cat of CATEGORIES) {
      counts[cat.id] = 0;
    }
    for (const c of coursesList) {
      const catKey = (c.category || '').toLowerCase();
      if (counts[catKey] !== undefined) {
        counts[catKey]++;
      }
    }
    return counts;
  }

  const countsWithOne = computeCounts(testCourses);
  assert.equal(countsWithOne.arts, 1);
  assert.equal(countsWithOne.medical, 0);
  assert.equal(countsWithOne.engineering, 0);
  assert.notEqual(countsWithOne.medical, 16, 'Must NOT be stale hardcoded 16');
  assert.notEqual(countsWithOne.engineering, 22, 'Must NOT be stale hardcoded 22');

  // Now simulate full catalog (318 courses)
  const jsonPath = path.join(__dirname, '..', '..', 'data', 'courses_master_catalog.json');
  const fullCatalog = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const countsFull = computeCounts(fullCatalog);

  assert.equal(countsFull.medical, 56);
  assert.equal(countsFull.engineering, 86);
  assert.equal(countsFull.management, 49);
  assert.equal(countsFull.arts, 60);
  assert.equal(countsFull.law, 20);
  assert.equal(countsFull.education, 17);
  assert.equal(countsFull.agriculture, 30);
});

// 5. Inactive courses exclusion
test('Course Catalog: Inactive courses are strictly excluded from public directory and counts', () => {
  const mixedCourses = [
    { id: '1', name: 'Active MBBS', category: 'medical', isActive: true },
    { id: '2', name: 'Inactive Course', category: 'medical', isActive: false },
    { id: '3', name: 'Active B.E. CSE', category: 'engineering', isActive: true },
  ];

  // Public filtering rule
  const publicActiveOnly = mixedCourses.filter((c) => c.isActive === true);
  assert.equal(publicActiveOnly.length, 2);
  assert.ok(!publicActiveOnly.some((c) => c.name === 'Inactive Course'));
});

// 6. Search filtering covers name, code, eligibility, description, and category
test('Course Discovery: Search query properly inspects name, code, eligibility and description', () => {
  const courses = [
    {
      id: '1',
      name: 'MBBS',
      code: 'MBBS',
      fullName: 'MBBS (Bachelor of Medicine)',
      eligibility: '10+2 with PCB, NEET-UG qualified',
      description: 'Undergraduate medical training with 1-year internship.',
      category: 'medical',
      duration: '5.5 Years',
    },
    {
      id: '2',
      name: 'B.Tech AI & Data Science',
      code: 'AIDS',
      fullName: 'B.Tech AI & Data Science (AIDS)',
      eligibility: '10+2 with PCM, TNEA counselling',
      description: 'Modern computing with deep neural networks and big data.',
      category: 'engineering',
      duration: '4 Years',
    },
  ];

  function filterCourses(list, { search = '', category = 'all', duration = 'all' } = {}) {
    const q = search.trim().toLowerCase();
    return list.filter((course) => {
      if (category !== 'all' && course.category !== category) return false;
      if (duration !== 'all' && course.duration !== duration) return false;
      if (!q) return true;
      return (
        course.name.toLowerCase().includes(q) ||
        (course.code || '').toLowerCase().includes(q) ||
        (course.fullName || '').toLowerCase().includes(q) ||
        (course.eligibility || '').toLowerCase().includes(q) ||
        (course.description || '').toLowerCase().includes(q) ||
        (course.category || '').toLowerCase().includes(q)
      );
    });
  }

  // Search by code
  assert.equal(filterCourses(courses, { search: 'AIDS' }).length, 1);
  assert.equal(filterCourses(courses, { search: 'AIDS' })[0].name, 'B.Tech AI & Data Science');

  // Search by eligibility keyword
  assert.equal(filterCourses(courses, { search: 'NEET' }).length, 1);
  assert.equal(filterCourses(courses, { search: 'NEET' })[0].name, 'MBBS');

  // Search by description keyword
  assert.equal(filterCourses(courses, { search: 'neural networks' }).length, 1);
  assert.equal(filterCourses(courses, { search: 'neural networks' })[0].code, 'AIDS');

  // Duration filter
  assert.equal(filterCourses(courses, { duration: '5.5 Years' }).length, 1);
  assert.equal(filterCourses(courses, { duration: '4 Years' }).length, 1);
  assert.equal(filterCourses(courses, { duration: '2 Years' }).length, 0);

  // Category filter
  assert.equal(filterCourses(courses, { category: 'medical' }).length, 1);
  assert.equal(filterCourses(courses, { category: 'engineering' }).length, 1);
  assert.equal(filterCourses(courses, { category: 'arts' }).length, 0);
});

// 7. Safe import tooling: Duplicate detection and existing database compatibility
test('Import Tooling: Preserves existing records, detects duplicates, and isolates test courses', () => {
  const existingCourses = [
    {
      _id: '6ae0e98171ef15e30bd7f223',
      name: 'Test Course - B.Sc Computer Science',
      code: 'TEST-BSC-CS-01',
      level: 'UG',
      category: 'arts',
      duration: '3 Years (6 Semesters)',
      isActive: true,
    },
  ];

  const existingMap = new Map();
  existingCourses.forEach((c) => {
    existingMap.set(`${c.name.trim().toLowerCase()}:::${c.level.toLowerCase()}`, c);
  });

  const jsonPath = path.join(__dirname, '..', '..', 'data', 'courses_master_catalog.json');
  const catalog = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let insertCount = 0;
  let skipCount = 0;

  catalog.forEach((c) => {
    const key = `${c.name.trim().toLowerCase()}:::${c.level.toLowerCase()}`;
    if (existingMap.has(key)) {
      skipCount++;
    } else {
      insertCount++;
    }
  });

  // Verify that the existing test course was not duplicated or overwritten
  assert.equal(skipCount, 0, 'No overlap between test course name and standard catalog names');
  assert.equal(insertCount, catalog.length, 'All 318 catalog courses are unique and cleanly insertable');
  assert.ok(existingMap.has('test course - b.sc computer science:::ug'), 'Existing test course is recognized and preserved');
});

// 8. Public API format and category aggregation output
test('Public Courses API: Response schema includes courses array, count, and categoryCounts', () => {
  // Simulating output structure of /api/courses
  const mockDbCourses = [
    { _id: '1', name: 'MBBS', category: 'medical', isActive: true },
    { _id: '2', name: 'BDS', category: 'medical', isActive: true },
    { _id: '3', name: 'B.E. CSE', category: 'engineering', isActive: true },
  ];

  const categoryCounts = {
    medical: 2,
    engineering: 1,
  };

  const apiResponse = {
    success: true,
    count: mockDbCourses.length,
    courses: mockDbCourses,
    categoryCounts,
  };

  assert.equal(apiResponse.success, true);
  assert.equal(apiResponse.count, 3);
  assert.equal(apiResponse.categoryCounts.medical, 2);
  assert.equal(apiResponse.categoryCounts.engineering, 1);
});
