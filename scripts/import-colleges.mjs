import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const CONFIRMED_LOCAL_DB = '127.0.0.1:27017/rasi-foundation';

// District alias mapping between legacy DB districts and standard 38 TN districts
export const DISTRICT_ALIAS_MAP = {
  'namakkal district': 'Namakkal',
  'salem district': 'Salem',
  'erode district': 'Erode',
  'coimbatore zone': 'Coimbatore',
  'bengaluru zone': 'Bengaluru Zone',
  'women centric colleges': 'Women Centric Colleges',
  'well connected universities': 'Well Connected Universities'
};

export function normalizeDistrict(d) {
  if (!d) return '';
  const trimmed = d.trim();
  const lower = trimmed.toLowerCase();
  if (DISTRICT_ALIAS_MAP[lower]) {
    return DISTRICT_ALIAS_MAP[lower];
  }
  return trimmed;
}

export function normalizeName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

export async function importColleges({
  catalogPath = 'data/tamil_nadu_colleges_master.json',
  execute = false,
  confirmDb = ''
} = {}) {
  const fullCatalogPath = path.resolve(catalogPath);
  if (!fs.existsSync(fullCatalogPath)) {
    throw new Error(`College catalog file not found at: ${fullCatalogPath}`);
  }

  const catalog = JSON.parse(fs.readFileSync(fullCatalogPath, 'utf8'));
  console.log(`Loaded ${catalog.length} college records from ${catalogPath}`);

  // 1. Safety Check: Verify Database Connection Target
  const envMongoUri = process.env.MONGODB_URI || '';
  console.log(`Checking MongoDB connection URI: ${envMongoUri}`);

  const isLocalConfirmed =
    envMongoUri.includes('127.0.0.1:27017/rasi-foundation') ||
    envMongoUri.includes('localhost:27017/rasi-foundation');

  if (!isLocalConfirmed) {
    throw new Error(
      `SAFETY ABORT: MONGODB_URI is not pointing to confirmed local development database ${CONFIRMED_LOCAL_DB} (Got: ${envMongoUri})`
    );
  }

  // If execute requested, verify --confirm-db argument
  if (execute) {
    if (confirmDb !== CONFIRMED_LOCAL_DB && confirmDb !== 'localhost:27017/rasi-foundation') {
      throw new Error(
        `SAFETY ABORT: Real execution requires exact --confirm-db=${CONFIRMED_LOCAL_DB}`
      );
    }
  }

  // Connect to DB
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  // 2. Query Existing Colleges
  const existingColleges = await College.find({}).lean();
  console.log(`Found ${existingColleges.length} existing colleges in database`);

  // Build lookup index of existing colleges
  // Match on:
  // 1. Exact name + district (case-insensitive)
  // 2. Normalized name + normalized district
  // 3. Normalized name alone (if unique institution)
  const existingByExactKey = new Set();
  const existingByNormalizedKey = new Set();
  const existingByNameOnly = new Map();

  existingColleges.forEach(c => {
    const origDistrict = (c.district || '').trim();
    const normDistrict = normalizeDistrict(origDistrict);
    const origName = (c.name || '').trim();
    const normName = normalizeName(origName);

    existingByExactKey.add(`${origName.toLowerCase()}|${origDistrict.toLowerCase()}`);
    existingByExactKey.add(`${origName.toLowerCase()}|${normDistrict.toLowerCase()}`);

    const normKey1 = `${normName}|${normDistrict.toLowerCase()}`;
    const normKey2 = `${normName}|${origDistrict.toLowerCase()}`;
    existingByNormalizedKey.add(normKey1);
    existingByNormalizedKey.add(normKey2);

    if (normName) {
      existingByNameOnly.set(normName, c);
    }
  });

  const toBeInserted = [];
  const alreadyExisting = [];

  for (const item of catalog) {
    const catName = item.name.trim();
    const catDistrict = item.district.trim();
    const normCatName = normalizeName(catName);
    const normCatDistrict = normalizeDistrict(catDistrict);

    const exactKey = `${catName.toLowerCase()}|${catDistrict.toLowerCase()}`;
    const normKey = `${normCatName}|${normCatDistrict.toLowerCase()}`;

    let match = null;
    if (existingByExactKey.has(exactKey) || existingByNormalizedKey.has(normKey)) {
      match = 'Exact or district-alias match';
    } else if (existingByNameOnly.has(normCatName)) {
      // Name matches an existing college in DB
      const existingDoc = existingByNameOnly.get(normCatName);
      match = `Matched existing college '${existingDoc.name}' in '${existingDoc.district}'`;
    }

    if (match) {
      alreadyExisting.push({
        college: item,
        reason: match
      });
    } else {
      toBeInserted.push(item);
    }
  }

  console.log('='.repeat(70));
  console.log(`COLLEGE IMPORT EVALUATION SUMMARY`);
  console.log('='.repeat(70));
  console.log(`Target Database     : ${CONFIRMED_LOCAL_DB}`);
  console.log(`Mode                : ${execute ? 'EXECUTE (REAL IMPORT)' : 'DRY RUN (NO WRITES)'}`);
  console.log(`Catalog Records     : ${catalog.length}`);
  console.log(`Existing in DB      : ${existingColleges.length}`);
  console.log(`Already Present     : ${alreadyExisting.length} (will be preserved/skipped)`);
  console.log(`New To Be Inserted  : ${toBeInserted.length}`);
  console.log('='.repeat(70));

  if (!execute) {
    console.log('\n[DRY RUN COMPLETE] No records were inserted into MongoDB.');
    console.log(`To execute real import after review, run:\nnode scripts/import-colleges.mjs --execute --confirm-db=${CONFIRMED_LOCAL_DB}`);
    return {
      mode: 'dry-run',
      totalCatalog: catalog.length,
      existingCount: existingColleges.length,
      alreadyExistingCount: alreadyExisting.length,
      toBeInsertedCount: toBeInserted.length,
      insertedCount: 0
    };
  }

  // Real execution
  console.log(`\nExecuting insertion of ${toBeInserted.length} new colleges...`);
  const docsToInsert = toBeInserted.map((c, idx) => ({
    name: c.name,
    location: c.location,
    district: c.district,
    type: c.type,
    tneaCode: c.tneaCode || '',
    note: c.note || '',
    departments: c.departments || [],
    website: c.website || '',
    isActive: true,
    order: existingColleges.length + idx + 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  let insertedCount = 0;
  if (docsToInsert.length > 0) {
    const result = await College.insertMany(docsToInsert, { ordered: false });
    insertedCount = result.length;
    console.log(`Successfully inserted ${insertedCount} colleges into MongoDB!`);
  }

  const finalTotal = await College.countDocuments();
  console.log(`New total college count in database: ${finalTotal}`);

  return {
    mode: 'execute',
    totalCatalog: catalog.length,
    existingCount: existingColleges.length,
    alreadyExistingCount: alreadyExisting.length,
    toBeInsertedCount: toBeInserted.length,
    insertedCount,
    finalTotal
  };
}

if (process.argv[1] && process.argv[1].endsWith('import-colleges.mjs')) {
  const args = process.argv.slice(2);
  const isExecute = args.includes('--execute');
  const confirmArg = (args.find(a => a.startsWith('--confirm-db=')) || '').replace('--confirm-db=', '');

  importColleges({
    execute: isExecute,
    confirmDb: confirmArg
  })
    .then(async () => {
      const mongooseModule = await import('mongoose');
      await mongooseModule.default.disconnect();
      process.exit(0);
    })
    .catch(async err => {
      console.error('\nIMPORT ERROR / ABORT:', err.message);
      try {
        const mongooseModule = await import('mongoose');
        await mongooseModule.default.disconnect();
      } catch (_) {}
      process.exit(1);
    });
}
