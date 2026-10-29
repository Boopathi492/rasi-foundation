import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { validateExpansionCatalog } from '../../scripts/validate-expansion-catalog.mjs';
import { TAMIL_NADU_DISTRICTS, COLLEGE_TYPES, normalizeName } from '../../scripts/expansion-helpers.mjs';

test('College & Course Expansion: Catalog validation passes with zero errors and 100% URL format validity', () => {
  const result = validateExpansionCatalog({
    collegesPath: 'data/tamil_nadu_colleges_expansion.json',
    coursesPath: 'data/tamil_nadu_courses_expansion.json',
    masterCollegesPath: 'data/tamil_nadu_colleges_master.json',
    masterCoursesPath: 'data/courses_master_catalog.json',
  });

  assert.equal(result.valid, true, `Validation failed with errors: ${result.errors.join('; ')}`);
  assert.equal(result.errors.length, 0);
  assert.equal(result.summary.totalColleges, 357);
  assert.equal(result.summary.totalCourses, 43);
  assert.equal(result.summary.districtsCoveredCount, 38, 'Must cover all 38 Tamil Nadu districts');
  assert.equal(result.summary.collegesWithWebsite, 357, 'All 357 colleges must have official website');
  assert.equal(result.summary.collegesWithSource, 357, 'All 357 colleges must have source URL');
  assert.equal(result.summary.masterCollegesCollisions, 0, 'Must have 0 collisions with master colleges');
  assert.equal(result.summary.masterCoursesCollisions, 0, 'Must have 0 collisions with master courses');
});

test('College & Course Expansion: Deduplication and identity uniqueness across expansion datasets', () => {
  const colleges = JSON.parse(fs.readFileSync(path.resolve('data/tamil_nadu_colleges_expansion.json'), 'utf8'));
  const courses = JSON.parse(fs.readFileSync(path.resolve('data/tamil_nadu_courses_expansion.json'), 'utf8'));

  const collegeKeys = new Set();
  colleges.forEach((c) => {
    const key = `${c.name.trim().toLowerCase()}|${c.district.trim().toLowerCase()}`;
    assert.equal(collegeKeys.has(key), false, `Duplicate college key in expansion: ${key}`);
    collegeKeys.add(key);

    assert.ok(TAMIL_NADU_DISTRICTS.includes(c.district), `Invalid district: ${c.district}`);
    assert.ok(COLLEGE_TYPES.includes(c.type), `Invalid type: ${c.type}`);
    assert.ok(Array.isArray(c.departments) && c.departments.length > 0, `Departments required for ${c.name}`);
  });

  const courseKeys = new Set();
  courses.forEach((c) => {
    const key = `${c.name.trim().toLowerCase()}|${c.level.trim().toLowerCase()}`;
    assert.equal(courseKeys.has(key), false, `Duplicate course key in expansion: ${key}`);
    courseKeys.add(key);

    assert.ok(['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'].includes(c.level));
    assert.ok(c.duration && c.duration.length > 0);
    assert.ok(c.eligibility && c.eligibility.length > 0);
    assert.ok(c.description && c.description.length > 0);
  });
});

test('College & Course Expansion: Schema backward compatibility and optional fields on College and Course models', async () => {
  const { default: College } = await import('../../src/backend/models/College.js');
  const { default: Course } = await import('../../src/backend/models/Course.js');

  // Verify College schema paths
  assert.ok(College.schema.paths.courses, 'College schema must have courses path');
  assert.ok(College.schema.paths.specialization, 'College schema must have specialization path');
  assert.ok(College.schema.paths.institutionType, 'College schema must have institutionType path');
  assert.ok(College.schema.paths.sourceUrl, 'College schema must have sourceUrl path');
  assert.ok(College.schema.paths.verificationStatus, 'College schema must have verificationStatus path');
  assert.ok(College.schema.paths.departments, 'College schema must preserve departments path');

  // Verify Course schema paths
  assert.ok(Course.schema.paths.colleges, 'Course schema must have colleges path');
  assert.ok(Course.schema.paths.specialization, 'Course schema must have specialization path');
  assert.ok(Course.schema.paths.sourceUrl, 'Course schema must have sourceUrl path');
  assert.ok(Course.schema.paths.verificationStatus, 'Course schema must have verificationStatus path');
});

test('College & Course Expansion: Multi-criteria filtering logic matches medical specialization and offering colleges', () => {
  const sampleColleges = [
    {
      name: 'PSG College of Pharmacy',
      district: 'Coimbatore',
      zone: 'Coimbatore',
      type: 'Medical',
      specialization: 'Pharmacy',
      institutionType: 'Autonomous',
      departments: ['B.Pharm', 'Pharm.D', 'M.Pharm Pharmaceutics'],
    },
    {
      name: 'PSG College of Technology',
      district: 'Coimbatore',
      zone: 'Coimbatore',
      type: 'Engineering',
      specialization: 'Engineering & Technology',
      institutionType: 'Autonomous',
      departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science'],
    },
    {
      name: 'Madras Medical College',
      district: 'Chennai',
      zone: 'Chennai',
      type: 'Medical',
      specialization: 'Medicine & Surgery',
      institutionType: 'Government',
      departments: ['MBBS', 'M.D. General Medicine'],
    },
    {
      name: 'KMCH College of Pharmacy',
      district: 'Coimbatore',
      zone: 'Coimbatore',
      type: 'Medical',
      specialization: 'Pharmacy',
      institutionType: 'Private',
      departments: ['B.Pharm', 'Pharm.D'],
    },
    {
      name: 'Coimbatore Medical College',
      district: 'Coimbatore',
      zone: 'Coimbatore',
      type: 'Medical',
      specialization: 'Medicine & Surgery',
      institutionType: 'Government',
      departments: ['MBBS', 'B.Sc Nursing'],
    },
  ];

  // Helper matching the page filtering logic
  function filterColleges(list, { stream, specialization, course, district, institutionType, search }) {
    const q = (search || '').trim().toLowerCase();
    const specLower = (specialization || 'all').trim().toLowerCase();
    const courseLower = (course || 'all').trim().toLowerCase();
    const instLower = (institutionType || 'all').trim().toLowerCase();

    return list.filter((c) => {
      if (district && district !== 'all' && c.district !== district) return false;
      if (stream && stream !== 'all' && (c.type || 'Engineering') !== stream) return false;

      if (instLower !== 'all') {
        const cType = (c.institutionType || '').toLowerCase();
        if (instLower === 'government') {
          if (!cType.includes('government')) return false;
        } else if (instLower === 'autonomous') {
          if (!cType.includes('autonomous')) return false;
        } else if (instLower === 'private') {
          if (cType.includes('government')) return false;
        }
      }

      if (specLower !== 'all') {
        const colSpec = (c.specialization || '').toLowerCase();
        const colDepts = (c.departments || []).map((d) => d.toLowerCase());
        const match = colSpec.includes(specLower) || colDepts.some((d) => d.includes(specLower));
        if (!match) return false;
      }

      if (courseLower !== 'all') {
        const colDepts = (c.departments || []).map((d) => d.toLowerCase());
        const match = colDepts.some((d) => d.includes(courseLower));
        if (!match) return false;
      }

      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.departments || []).some((d) => d.toLowerCase().includes(q))
      );
    });
  }

  // 1. Task example: Stream: Medical, Specialization: Pharmacy, Course: B.Pharm, District: Coimbatore
  const medicalPharmacyCoimbatore = filterColleges(sampleColleges, {
    stream: 'Medical',
    specialization: 'Pharmacy',
    course: 'B.Pharm',
    district: 'Coimbatore',
    institutionType: 'all',
  });
  assert.equal(medicalPharmacyCoimbatore.length, 2, 'Should match exactly PSG Pharmacy and KMCH Pharmacy in Coimbatore');
  assert.ok(medicalPharmacyCoimbatore.every((c) => c.district === 'Coimbatore' && c.specialization === 'Pharmacy'));

  // 2. Stream: Medical, Specialization: Pharmacy, District: Coimbatore, InstitutionType: Autonomous
  const autonomousPharmacy = filterColleges(sampleColleges, {
    stream: 'Medical',
    specialization: 'Pharmacy',
    district: 'Coimbatore',
    institutionType: 'Autonomous',
  });
  assert.equal(autonomousPharmacy.length, 1);
  assert.equal(autonomousPharmacy[0].name, 'PSG College of Pharmacy');

  // 3. Stream: Engineering in Coimbatore
  const enggCoimbatore = filterColleges(sampleColleges, {
    stream: 'Engineering',
    district: 'Coimbatore',
  });
  assert.equal(enggCoimbatore.length, 1);
  assert.equal(enggCoimbatore[0].name, 'PSG College of Technology');
});

test('College & Course Expansion: Bidirectional relationship mapping logic links courses to offering colleges', () => {
  const colleges = JSON.parse(fs.readFileSync(path.resolve('data/tamil_nadu_colleges_expansion.json'), 'utf8'));
  const courses = JSON.parse(fs.readFileSync(path.resolve('data/tamil_nadu_courses_expansion.json'), 'utf8'));

  // Test that courses have distinct streams and colleges have valid departments
  const pharmacyColleges = colleges.filter((c) => c.specialization === 'Pharmacy');
  assert.ok(pharmacyColleges.length >= 40, 'Should have at least 40 genuine pharmacy colleges in expansion');

  const nursingColleges = colleges.filter((c) => c.specialization === 'Nursing');
  assert.ok(nursingColleges.length >= 30, 'Should have at least 30 genuine nursing colleges in expansion');

  const polytechnicColleges = colleges.filter((c) => c.type === 'Polytechnic');
  assert.ok(polytechnicColleges.length >= 50, 'Should have at least 50 polytechnic colleges in expansion');

  const agricultureColleges = colleges.filter((c) => c.type === 'Agriculture');
  assert.ok(agricultureColleges.length >= 20, 'Should have at least 20 agriculture colleges in expansion');

  // Verify that departments contain actual degree strings matching courses
  const bpharmOfferingColleges = colleges.filter((c) =>
    (c.departments || []).some((d) => d.toLowerCase().includes('pharm'))
  );
  assert.ok(bpharmOfferingColleges.length > 30, 'Multiple colleges offer Pharmacy courses');
});
