import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import College from '../../src/backend/models/College.js';

test('TNEA Counselling Code Integrity & Model Tests', async (t) => {
  const mappingPath = path.resolve('data/tnea_counselling_mapping.json');

  await t.test('1. Mapping File Structure & 772 Record Coverage', () => {
    assert.ok(fs.existsSync(mappingPath), 'tnea_counselling_mapping.json must exist');
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

    assert.equal(Array.isArray(mapping), true, 'Mapping must be an array');
    assert.equal(mapping.length, 772, 'Mapping must contain exactly 772 records');

    const validStatuses = new Set(['verified', 'not_applicable', 'pending_verification']);
    mapping.forEach((rec, idx) => {
      assert.ok(rec._id, `Record #${idx} must have _id`);
      assert.ok(rec.name, `Record #${idx} must have name`);
      assert.ok(validStatuses.has(rec.tneaStatus), `Record #${idx} has invalid status: ${rec.tneaStatus}`);

      if (rec.tneaStatus === 'verified') {
        assert.ok(rec.proposedTneaCode, `Verified record ${rec.name} must have a proposedTneaCode`);
        assert.match(rec.proposedTneaCode, /^\d{4}$/, `Code for ${rec.name} must be 4 digits`);
      } else if (rec.tneaStatus === 'not_applicable') {
        assert.equal(rec.proposedTneaCode, '', `Not applicable record ${rec.name} must have empty code`);
      }
    });
  });

  await t.test('2. Uniqueness of Counselling Codes Across Distinct Institutions', () => {
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    const codeMap = new Map();

    mapping.forEach(rec => {
      if (rec.proposedTneaCode) {
        if (!codeMap.has(rec.proposedTneaCode)) codeMap.set(rec.proposedTneaCode, []);
        codeMap.get(rec.proposedTneaCode).push(rec);
      }
    });

    codeMap.forEach((colleges, code) => {
      if (colleges.length > 1) {
        // If code appears more than once, verify all institutions belong to the same parent institution
        const tokensList = colleges.map(c =>
          c.name.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 2 && !['college', 'engineering', 'technology', 'autonomous', 'institutions', 'institute', 'school'].includes(w))
        );
        const sharesDistinctToken = tokensList[0].some(tok =>
          tokensList.slice(1).every(tArr => tArr.includes(tok))
        );
        assert.ok(
          sharesDistinctToken,
          `Code ${code} assigned to conflicting distinct institutions: ${colleges.map(c => c.name).join(' vs ')}`
        );
      }
    });
  });

  await t.test('3. Non-Engineering & Non-TNEA Stream Segregation', () => {
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));

    const nonTneaTypes = ['Medical', 'Arts & Science', 'Polytechnic', 'Law', 'Agriculture', 'Education'];
    const nonTneaRecords = mapping.filter(c => nonTneaTypes.includes(c.type));

    assert.ok(nonTneaRecords.length > 0, 'Must have non-engineering records');
    nonTneaRecords.forEach(c => {
      assert.equal(
        c.tneaStatus,
        'not_applicable',
        `Non-engineering institution [${c.type}] ${c.name} must have tneaStatus not_applicable`
      );
      assert.equal(
        c.proposedTneaCode,
        '',
        `Non-engineering institution [${c.type}] ${c.name} must not have a TNEA code`
      );
    });

    // Check Bengaluru Zone
    const bengaluruColleges = mapping.filter(c => c.district === 'Bengaluru Zone');
    bengaluruColleges.forEach(c => {
      assert.equal(
        c.tneaStatus,
        'not_applicable',
        `Bengaluru zone college ${c.name} must have tneaStatus not_applicable`
      );
    });
  });

  await t.test('4. College Mongoose Schema Definition', () => {
    const paths = College.schema.paths;

    assert.ok(paths.tneaCode, 'tneaCode field must exist in schema');
    assert.ok(paths.tneaStatus, 'tneaStatus field must exist in schema');
    assert.ok(paths.tneaSourceYear, 'tneaSourceYear field must exist in schema');

    const statusEnum = paths.tneaStatus.enumValues;
    assert.deepEqual(
      statusEnum.sort(),
      ['not_applicable', 'pending_verification', 'verified'].sort(),
      'tneaStatus enum must include verified, not_applicable, pending_verification'
    );
  });

  await t.test('5. Public and Admin Filtering Logic Consistency', () => {
    const mockColleges = [
      { name: 'College A', type: 'Engineering', tneaCode: '2006', tneaStatus: 'verified' },
      { name: 'College B', type: 'Engineering', tneaCode: '', tneaStatus: 'pending_verification' },
      { name: 'College C', type: 'Medical', tneaCode: '', tneaStatus: 'not_applicable' },
      { name: 'College D', type: 'Arts & Science', tneaCode: '', tneaStatus: 'not_applicable' },
    ];

    // Simulate 'onlyTnea' filter: (c.tneaStatus === 'verified' && c.tneaCode)
    const filteredOnlyTnea = mockColleges.filter(c => c.tneaStatus === 'verified' && Boolean(c.tneaCode));
    assert.equal(filteredOnlyTnea.length, 1);
    assert.equal(filteredOnlyTnea[0].name, 'College A');

    // Simulate search query by 4-digit code '2006'
    const query = '2006';
    const searched = mockColleges.filter(c => (c.tneaCode || '').includes(query));
    assert.equal(searched.length, 1);
    assert.equal(searched[0].name, 'College A');
  });

  await t.test('6. Local MongoDB State Verification', async () => {
    const { default: dbConnect } = await import('../../src/backend/lib/mongodb.js');
    const { default: Course } = await import('../../src/backend/models/Course.js');
    await dbConnect();

    const activeCollegesCount = await College.countDocuments({ isActive: true });
    assert.equal(activeCollegesCount, 772, 'Local database must contain exactly 772 active colleges');

    const verifiedCount = await College.countDocuments({ isActive: true, tneaStatus: 'verified' });
    assert.equal(verifiedCount, 206, 'Must have exactly 206 verified TNEA colleges');

    const notApplicableCount = await College.countDocuments({ isActive: true, tneaStatus: 'not_applicable' });
    assert.equal(notApplicableCount, 564, 'Must have exactly 564 not_applicable colleges');

    const pendingCount = await College.countDocuments({ isActive: true, tneaStatus: 'pending_verification' });
    assert.equal(pendingCount, 2, 'Must have exactly 2 pending verification colleges');

    // Verify non-engineering colleges in DB have no TNEA codes
    const invalidNonEngCodes = await College.countDocuments({
      isActive: true,
      type: { $in: ['Medical', 'Arts & Science', 'Polytechnic', 'Law', 'Agriculture', 'Education', 'Management'] },
      tneaCode: { $exists: true, $nin: ['', null] }
    });
    assert.equal(invalidNonEngCodes, 0, 'No non-engineering colleges should have a TNEA code in DB');

    // Verify Course collection is intact
    const totalCourses = await Course.countDocuments({});
    assert.equal(totalCourses, 362, 'Courses collection must remain untouched at 362 courses');

    const mongoose = (await import('mongoose')).default;
    await mongoose.disconnect();
  });
});
