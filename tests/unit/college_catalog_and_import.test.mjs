import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';

import {
  TAMIL_NADU_DISTRICTS,
  COLLEGE_TYPES,
  buildCatalog
} from '../../scripts/build-college-catalog.mjs';
import { validateCollegeCatalog } from '../../scripts/validate-college-catalog.mjs';
import {
  CONFIRMED_LOCAL_DB,
  DISTRICT_ALIAS_MAP,
  normalizeDistrict,
  normalizeName
} from '../../scripts/import-colleges.mjs';
import College from '../../src/backend/models/College.js';

test('1. Master College Dataset Structure & Completeness', async (t) => {
  await t.test('Catalog file exists and has 300+ genuine colleges', () => {
    const catalogPath = path.resolve('data/tamil_nadu_colleges_master.json');
    assert.ok(fs.existsSync(catalogPath), 'tamil_nadu_colleges_master.json must exist');

    const content = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    assert.ok(Array.isArray(content), 'Catalog root must be an array');
    assert.ok(content.length >= 300, `Catalog must have at least 300 records, got ${content.length}`);
  });

  await t.test('All 38 Tamil Nadu districts are represented', () => {
    assert.equal(TAMIL_NADU_DISTRICTS.length, 38, 'Must have exactly 38 districts');

    const content = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_master.json', 'utf8'));
    const districtSet = new Set(content.map(c => c.district));

    for (const d of TAMIL_NADU_DISTRICTS) {
      assert.ok(districtSet.has(d), `District ${d} must be represented in catalog`);
      const count = content.filter(c => c.district === d).length;
      assert.ok(count >= 3, `District ${d} must have at least 3 colleges, got ${count}`);
    }
  });

  await t.test('All 7 key course streams are covered', () => {
    const content = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_master.json', 'utf8'));
    const expectedStreams = [
      'Engineering',
      'Arts & Science',
      'Medical',
      'Management',
      'Law',
      'Agriculture',
      'Education'
    ];

    for (const stream of expectedStreams) {
      const streamColleges = content.filter(c => c.type === stream);
      assert.ok(
        streamColleges.length >= 5,
        `Course stream ${stream} must have at least 5 colleges, got ${streamColleges.length}`
      );
    }
  });

  await t.test('Every college record satisfies Mongoose schema constraints', () => {
    const content = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_master.json', 'utf8'));

    content.forEach((c, idx) => {
      assert.ok(c.name && c.name.length <= 200, `Record ${idx}: name length <= 200`);
      assert.ok(c.location && c.location.length <= 100, `Record ${idx}: location length <= 100`);
      assert.ok(TAMIL_NADU_DISTRICTS.includes(c.district), `Record ${idx}: valid district`);
      assert.ok(COLLEGE_TYPES.includes(c.type), `Record ${idx}: valid type`);
      if (c.tneaCode) {
        assert.ok(c.tneaCode.length <= 20, `Record ${idx}: tneaCode length <= 20`);
      }
      if (c.note) {
        assert.ok(c.note.length <= 500, `Record ${idx}: note length <= 500`);
      }
      assert.ok(Array.isArray(c.departments) && c.departments.length > 0, `Record ${idx}: non-empty departments`);
      assert.ok(c.website && c.website.startsWith('http'), `Record ${idx}: website must start with http`);
      assert.ok(c.website.length <= 200, `Record ${idx}: website length <= 200`);
    });
  });

  await t.test('No duplicate colleges within the catalog', () => {
    const content = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_master.json', 'utf8'));
    const seen = new Set();

    content.forEach((c) => {
      const key = `${c.name.trim().toLowerCase()}|${c.district.trim().toLowerCase()}`;
      assert.ok(!seen.has(key), `Duplicate college found in catalog: ${c.name} in ${c.district}`);
      seen.add(key);
    });
  });
});

test('2. Validation Tooling Behavior', async (t) => {
  await t.test('validateCollegeCatalog returns valid result for master file', () => {
    const res = validateCollegeCatalog('data/tamil_nadu_colleges_master.json');
    assert.equal(res.valid, true, 'Validation must succeed');
    assert.equal(res.errors.length, 0, 'Must have zero validation errors');
    assert.ok(res.count >= 300, 'Validated count must be at least 300');
  });

  await t.test('validateCollegeCatalog flags invalid district or type in test data', () => {
    const tempTestFile = 'data/temp_invalid_test.json';
    const invalidData = [
      {
        name: 'Bad College',
        location: 'Somewhere',
        district: 'NonExistentDistrict',
        type: 'FakeType',
        departments: [],
        website: 'ftp://bad'
      }
    ];

    fs.writeFileSync(tempTestFile, JSON.stringify(invalidData), 'utf8');
    try {
      const res = validateCollegeCatalog(tempTestFile);
      assert.equal(res.valid, false, 'Should fail validation');
      assert.ok(res.errors.length > 0, 'Should have multiple error messages');
    } finally {
      if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
    }
  });
});

test('3. Import Tooling Safety, Normalization & Alias Mapping', async (t) => {
  await t.test('Confirmed DB target is strictly local development database', () => {
    assert.equal(CONFIRMED_LOCAL_DB, '127.0.0.1:27017/rasi-foundation');
  });

  await t.test('District alias mapping maps legacy DB zones to standard districts', () => {
    assert.equal(normalizeDistrict('Namakkal District'), 'Namakkal');
    assert.equal(normalizeDistrict('Salem District'), 'Salem');
    assert.equal(normalizeDistrict('Erode District'), 'Erode');
    assert.equal(normalizeDistrict('Coimbatore Zone'), 'Coimbatore');
    assert.equal(normalizeDistrict('Chennai'), 'Chennai');
    assert.equal(normalizeDistrict('Madurai'), 'Madurai');
  });

  await t.test('normalizeName removes punctuation and lowercases consistently', () => {
    assert.equal(
      normalizeName('K.S. Rangasamy College of Technology (KSRCT)'),
      'ksrangasamycollegeoftechnologyksrct'
    );
    assert.equal(
      normalizeName('St. Joseph\'s College (Autonomous), Trichy'),
      'stjosephscollegeautonomoustrichy'
    );
  });
});

test('4. Backend Model & Enum Support', async (t) => {
  await t.test('College schema type enum supports Agriculture alongside other streams', () => {
    const typeEnum = College.schema.path('type').enumValues;
    assert.ok(Array.isArray(typeEnum), 'type must have enumValues');
    assert.ok(typeEnum.includes('Agriculture'), 'type enum must include Agriculture');
    assert.ok(typeEnum.includes('Engineering'), 'type enum must include Engineering');
    assert.ok(typeEnum.includes('Medical'), 'type enum must include Medical');
    assert.ok(typeEnum.includes('Arts & Science'), 'type enum must include Arts & Science');
    assert.ok(typeEnum.includes('Law'), 'type enum must include Law');
    assert.ok(typeEnum.includes('Management'), 'type enum must include Management');
    assert.ok(typeEnum.includes('Education'), 'type enum must include Education');
    assert.ok(typeEnum.includes('Polytechnic'), 'type enum must include Polytechnic');
  });
});
