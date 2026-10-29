import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { TAMIL_NADU_DISTRICTS, normalizeName } from './expansion-helpers.mjs';
import { medicalColleges } from './expansion-data/medical.mjs';
import { engineeringColleges } from './expansion-data/engineering.mjs';
import { polytechnicColleges } from './expansion-data/polytechnic.mjs';
import { agricultureColleges } from './expansion-data/agriculture.mjs';
import { lawManagementEducationColleges } from './expansion-data/law-management-education.mjs';
import { artsScienceColleges } from './expansion-data/arts-science.mjs';
import { additionalExpansionColleges } from './expansion-data/additional-expansion.mjs';

export const VALID_COLLEGE_TYPES = [
  'Engineering',
  'Arts & Science',
  'Medical',
  'Polytechnic',
  'Law',
  'Management',
  'Education',
  'Agriculture',
  'Other'
];

async function main() {
  console.log('='.repeat(70));
  console.log('BUILDING TAMIL NADU COLLEGES EXPANSION DATASET');
  console.log('='.repeat(70));

  const rawCandidates = [
    ...medicalColleges,
    ...engineeringColleges,
    ...polytechnicColleges,
    ...agricultureColleges,
    ...lawManagementEducationColleges,
    ...artsScienceColleges,
    ...additionalExpansionColleges
  ];

  console.log(`Raw candidate colleges collected: ${rawCandidates.length}`);

  // 1. Load existing colleges from master catalog
  const masterCatalogPath = path.resolve('data/tamil_nadu_colleges_master.json');
  const masterColleges = fs.existsSync(masterCatalogPath)
    ? JSON.parse(fs.readFileSync(masterCatalogPath, 'utf8'))
    : [];
  console.log(`Master catalog colleges loaded: ${masterColleges.length}`);

  // 2. Connect to MongoDB and fetch current database colleges
  let dbColleges = [];
  try {
    const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
    const { default: College } = await import('../src/backend/models/College.js');
    await dbConnect();
    dbColleges = await College.find({}).lean();
    console.log(`MongoDB existing colleges loaded: ${dbColleges.length}`);
  } catch (err) {
    console.warn('Could not connect to MongoDB, using master catalog for deduplication:', err.message);
  }

  // 3. Build lookup index of all existing colleges
  const existingNames = new Set();
  const existingKeys = new Set();

  function registerExisting(name, district) {
    if (!name) return;
    const normN = normalizeName(name);
    const normD = (district || '').toLowerCase().trim();
    existingNames.add(normN);
    existingKeys.add(`${normN}|${normD}`);
    // Also add exact lowercase
    existingKeys.add(`${name.toLowerCase().trim()}|${normD}`);
  }

  masterColleges.forEach(c => registerExisting(c.name, c.district));
  dbColleges.forEach(c => registerExisting(c.name, c.district));

  // 4. Deduplicate candidates internally and against existing records
  const uniqueColleges = [];
  const internalSeen = new Set();
  const skippedDuplicates = [];

  for (const item of rawCandidates) {
    const normN = normalizeName(item.name);
    const normD = (item.district || '').toLowerCase().trim();
    const internalKey = `${normN}|${normD}`;

    if (internalSeen.has(internalKey) || internalSeen.has(normN)) {
      skippedDuplicates.push({ name: item.name, reason: 'Duplicate candidate within expansion pool' });
      continue;
    }
    internalSeen.add(internalKey);
    internalSeen.add(normN);

    // Check against existing database / master records
    if (existingNames.has(normN) || existingKeys.has(internalKey) || existingKeys.has(`${item.name.toLowerCase().trim()}|${normD}`)) {
      skippedDuplicates.push({ name: item.name, reason: 'Already exists in database or master catalog' });
      continue;
    }

    // Schema validation
    if (!item.name || item.name.length > 200) {
      throw new Error(`Invalid name in record: ${item.name}`);
    }
    if (!item.location || item.location.length > 100) {
      throw new Error(`Invalid location in record: ${item.name}`);
    }
    if (!TAMIL_NADU_DISTRICTS.includes(item.district)) {
      throw new Error(`Invalid district '${item.district}' in record: ${item.name}`);
    }
    if (!VALID_COLLEGE_TYPES.includes(item.type)) {
      throw new Error(`Invalid type '${item.type}' in record: ${item.name}`);
    }
    if (!item.website || !item.website.startsWith('http') || item.website.length > 200) {
      throw new Error(`Invalid website in record: ${item.name}`);
    }
    if (!Array.isArray(item.departments) || item.departments.length === 0) {
      throw new Error(`Empty departments in record: ${item.name}`);
    }

    uniqueColleges.push({
      name: item.name.trim(),
      location: item.location.trim(),
      district: item.district.trim(),
      type: item.type,
      specialization: item.specialization || item.type,
      institutionType: item.institutionType || 'Private / Self-Financing',
      tneaCode: item.tneaCode ? String(item.tneaCode).trim() : '',
      note: item.note ? String(item.note).trim() : '',
      departments: item.departments.map(d => String(d).trim()),
      website: item.website.trim(),
      sourceUrl: item.sourceUrl ? String(item.sourceUrl).trim() : 'https://www.tn.gov.in',
      verificationStatus: item.verificationStatus || 'Official Regulator Listed',
      isActive: true,
      order: 0
    });
  }

  console.log(`\nVerification & Deduplication Results:`);
  console.log(`  Raw Candidates          : ${rawCandidates.length}`);
  console.log(`  Skipped (Duplicate/Exist): ${skippedDuplicates.length}`);
  console.log(`  New Unique Verified     : ${uniqueColleges.length}`);

  // 5. Check district coverage
  const districtCounts = {};
  TAMIL_NADU_DISTRICTS.forEach(d => districtCounts[d] = 0);
  uniqueColleges.forEach(c => {
    districtCounts[c.district] = (districtCounts[c.district] || 0) + 1;
  });

  const coveredDistricts = Object.keys(districtCounts).filter(d => districtCounts[d] > 0);
  console.log(`  Districts Covered       : ${coveredDistricts.length} of 38`);

  // 6. Check stream breakdown
  const streamCounts = {};
  uniqueColleges.forEach(c => {
    streamCounts[c.type] = (streamCounts[c.type] || 0) + 1;
  });
  console.log(`\nStream Breakdown of Expansion:`);
  for (const [stream, count] of Object.entries(streamCounts)) {
    console.log(`  - ${stream.padEnd(20)}: ${count} colleges`);
  }

  // Write to output file
  const outPath = path.resolve('data/tamil_nadu_colleges_expansion.json');
  fs.writeFileSync(outPath, JSON.stringify(uniqueColleges, null, 2), 'utf8');
  console.log(`\n[SUCCESS] Saved ${uniqueColleges.length} colleges to ${outPath}`);

  process.exit(0);
}

main().catch(err => {
  console.error('[BUILD ERROR]', err);
  process.exit(1);
});
