/**
 * Rasi Foundation - Course Master Data Safe Import Script
 *
 * SAFETY INVARIANTS:
 * 1. DEFAULTS TO DRY-RUN: No writes to MongoDB occur unless explicitly invoked with:
 *      --execute --confirm-db=127.0.0.1:27017/rasi-foundation
 * 2. TARGET VALIDATION: Strictly validates against the local development database.
 *    Refuses to execute if the connection string points to production (Atlas, AWS, non-localhost).
 * 3. NO DESTRUCTIVE WRITES: Never drops, clears, or replaces the `courses` collection.
 * 4. IDEMPOTENT & NON-DESTRUCTIVE:
 *    - Existing real records and custom descriptions are preserved.
 *    - Uses unique compound key (name, level) with collation { locale: 'en', strength: 2 }.
 *    - Skips existing courses without overwriting unless explicit updates are requested.
 *
 * Usage:
 *   Dry-Run (Default, Safe):
 *     node scripts/import-courses.mjs
 *
 *   Actual Local Import (Requires approval and explicit flags):
 *     node scripts/import-courses.mjs --execute --confirm-db=127.0.0.1:27017/rasi-foundation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables safely from .env.local without exposing secrets
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const args = process.argv.slice(2);
const isExecute = args.includes('--execute') || args.includes('--import');
const confirmDbArg = args.find((a) => a.startsWith('--confirm-db='));
const confirmedTarget = confirmDbArg ? confirmDbArg.split('=')[1] : null;

const ALLOWED_LOCAL_HOSTS = ['127.0.0.1', 'localhost'];
const REQUIRED_LOCAL_DB = 'rasi-foundation';

async function run() {
  console.log('================================================================');
  console.log('   RASI FOUNDATION — COURSE MASTER CATALOG IMPORT TOOL');
  console.log('================================================================');
  console.log(`MODE: ${isExecute ? '⚠️  EXECUTE (WRITE PERMITTED)' : '🛡️  DRY-RUN (SIMULATION ONLY - NO DATABASE WRITES)'}`);

  // 1. Load dataset
  const datasetPath = path.join(__dirname, '..', 'data', 'courses_master_catalog.json');
  if (!fs.existsSync(datasetPath)) {
    console.error(`❌ Dataset file not found at: ${datasetPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(datasetPath, 'utf8');
  let courses;
  try {
    courses = JSON.parse(rawData);
  } catch (err) {
    console.error('❌ Failed to parse JSON dataset:', err.message);
    process.exit(1);
  }

  console.log(`\n📦 Dataset Source: ${datasetPath}`);
  console.log(`📊 Total Records in Catalog: ${courses.length}`);

  // Category breakdown of input
  const catSummary = {};
  for (const c of courses) {
    catSummary[c.category] = (catSummary[c.category] || 0) + 1;
  }
  console.log('\nInput Category Breakdown:');
  Object.entries(catSummary).forEach(([cat, count]) => {
    console.log(`  - ${cat.padEnd(16)}: ${count} courses`);
  });

  // 2. Validate input records
  const ALLOWED_LEVELS = ['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'];
  const ALLOWED_CATEGORIES = ['medical', 'engineering', 'management', 'arts', 'law', 'education', 'agriculture'];
  const seenPairs = new Set();
  const validationErrors = [];

  courses.forEach((c, i) => {
    const idx = i + 1;
    if (!c.name || typeof c.name !== 'string' || !c.name.trim()) {
      validationErrors.push(`Record #${idx}: Missing name`);
    }
    if (!ALLOWED_LEVELS.includes(c.level)) {
      validationErrors.push(`Record #${idx} (${c.name}): Invalid level '${c.level}'`);
    }
    if (!ALLOWED_CATEGORIES.includes(c.category)) {
      validationErrors.push(`Record #${idx} (${c.name}): Invalid category '${c.category}'`);
    }
    const pair = `${(c.name || '').trim().toLowerCase()}:::${c.level}`;
    if (seenPairs.has(pair)) {
      validationErrors.push(`Record #${idx}: Duplicate within dataset '${c.name}' (${c.level})`);
    }
    seenPairs.add(pair);
  });

  if (validationErrors.length > 0) {
    console.error(`\n❌ Input validation failed with ${validationErrors.length} errors:`);
    validationErrors.slice(0, 10).forEach((e) => console.error(`  - ${e}`));
    if (validationErrors.length > 10) console.error(`  ... and ${validationErrors.length - 10} more`);
    process.exit(1);
  }
  console.log('\n✅ Input validation passed: 0 duplicate or invalid entries found in catalog.');

  // 3. Database Safety Checks
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('\n❌ MONGODB_URI is not defined in environment.');
    process.exit(1);
  }

  // Parse connection URI without printing credentials
  let isLocal = false;
  let targetDbName = '';

  try {
    const parsed = new URL(MONGODB_URI);
    const host = parsed.hostname;
    isLocal = ALLOWED_LOCAL_HOSTS.includes(host);
    targetDbName = parsed.pathname.replace(/^\//, '');
  } catch (err) {
    // If standard URL parsing fails on mongodb:// strings without protocol parser
    if (MONGODB_URI.includes('127.0.0.1') || MONGODB_URI.includes('localhost')) {
      isLocal = true;
      const match = MONGODB_URI.match(/(?:127\.0\.0\.1|localhost)(?::\d+)?\/([a-zA-Z0-9_-]+)/);
      if (match) targetDbName = match[1];
    }
  }

  if (!isLocal) {
    console.error('\n🚫 SAFETY ABORT: Configured MONGODB_URI does not point to a verified local instance.');
    console.error('Import is strictly restricted to local development (127.0.0.1 / localhost).');
    process.exit(1);
  }

  if (isExecute) {
    const expectedConfirm = `127.0.0.1:27017/${REQUIRED_LOCAL_DB}`;
    if (confirmedTarget !== expectedConfirm) {
      console.error('\n🚫 SAFETY ABORT: Missing or incorrect target database confirmation.');
      console.error(`To perform actual import, you must supply the explicit flag:`);
      console.error(`  --confirm-db=${expectedConfirm}`);
      process.exit(1);
    }
  }

  // 4. Connect to MongoDB using existing Mongoose setup
  let mongooseModule;
  let dbConnect;
  let Course;

  try {
    const mongodbModule = await import('../src/backend/lib/mongodb.js');
    dbConnect = mongodbModule.default;
    const courseModule = await import('../src/backend/models/Course.js');
    Course = courseModule.default;
    mongooseModule = await import('mongoose');
    await dbConnect();
    console.log(`\n🔌 Connected to local development database.`);
  } catch (err) {
    console.error('\n❌ Database connection failed:', err.message);
    if (err.message.includes('EACCES')) {
      console.log('ℹ️  Note: Inside sandbox isolation, direct TCP sockets to MongoDB are blocked.');
      console.log('   Run with proper permissions outside sandbox when performing local import.');
    }
    process.exit(1);
  }

  // 5. Inspect existing MongoDB records
  const existingCourses = await Course.find({}).lean();
  console.log(`🔍 Existing records in 'courses' collection: ${existingCourses.length}`);

  const existingMap = new Map();
  for (const ec of existingCourses) {
    const key = `${(ec.name || '').trim().toLowerCase()}:::${(ec.level || '').toLowerCase()}`;
    existingMap.set(key, ec);
  }

  // 6. Simulate or Execute Import
  let insertCount = 0;
  let skipCount = 0;
  let conflictCount = 0;
  const toInsert = [];

  for (const c of courses) {
    const key = `${(c.name || '').trim().toLowerCase()}:::${(c.level || '').toLowerCase()}`;
    if (existingMap.has(key)) {
      const existingDoc = existingMap.get(key);
      skipCount++;
      // If code or other key attributes diverge, note as potential conflict
      if (existingDoc.code && existingDoc.code !== c.code) {
        conflictCount++;
      }
    } else {
      insertCount++;
      toInsert.push(c);
    }
  }

  console.log('\n----------------------------------------------------------------');
  console.log('SIMULATION & AUDIT RESULTS:');
  console.log('----------------------------------------------------------------');
  console.log(`Records to Insert (New):        ${insertCount}`);
  console.log(`Records Skipped (Already Exist): ${skipCount}`);
  console.log(`Potential Code Variations:      ${conflictCount}`);
  console.log('----------------------------------------------------------------');

  if (!isExecute) {
    console.log('\n🛡️  DRY-RUN COMPLETED SUCCESSFULLY.');
    console.log('No modifications were made to the database.');
    console.log('\nTo execute actual import, review the validation report and run:');
    console.log(`node scripts/import-courses.mjs --execute --confirm-db=127.0.0.1:27017/${REQUIRED_LOCAL_DB}`);
    await mongooseModule.default.disconnect();
    process.exit(0);
  }

  // ACTUAL EXECUTION (Opt-in only)
  console.log(`\n🚀 Executing import of ${toInsert.length} new records...`);
  if (toInsert.length > 0) {
    const result = await Course.insertMany(toInsert, { ordered: false });
    console.log(`✅ Successfully inserted ${result.length} new courses into 'courses' collection!`);
  } else {
    console.log('ℹ️  No new records to insert. Collection is already up to date.');
  }

  const finalCount = await Course.countDocuments();
  console.log(`📊 Final total courses in database: ${finalCount}`);
  console.log('================================================================\n');

  await mongooseModule.default.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error('\n❌ Unhandled error:', err);
  process.exit(1);
});
