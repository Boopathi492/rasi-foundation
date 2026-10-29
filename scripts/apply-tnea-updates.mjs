import { readFileSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const args = process.argv.slice(2);
  const isExecute = args.includes('--execute');
  const confirmDbArg = args.find(a => a.startsWith('--confirm-db='));
  const confirmedDb = confirmDbArg ? confirmDbArg.split('=')[1] : null;

  console.log('================================================================');
  console.log(`   APPLY TNEA COUNSELLING CODE UPDATES (${isExecute ? 'EXECUTE MODE' : 'DRY RUN MODE'})   `);
  console.log('================================================================\n');

  const mongoUri = process.env.MONGODB_URI || '';
  console.log(`Target MongoDB URI: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);

  // Safeguard: strictly verify target DB
  const expectedDb = '127.0.0.1:27017/rasi-foundation';
  if (!mongoUri.includes(expectedDb) && !mongoUri.includes('localhost:27017/rasi-foundation')) {
    console.error(`FATAL: MONGODB_URI does not match expected target: ${expectedDb}`);
    process.exit(1);
  }

  if (isExecute) {
    if (confirmedDb !== expectedDb) {
      console.error(`FATAL: In --execute mode, you must provide --confirm-db=${expectedDb}`);
      process.exit(1);
    }
  }

  // Load Mapping File
  const mapping = JSON.parse(readFileSync('./data/tnea_counselling_mapping.json', 'utf8'));
  console.log(`Loaded mapping records: ${mapping.length}`);
  if (mapping.length !== 772) {
    console.error(`FATAL: Expected exactly 772 mapping records, found ${mapping.length}`);
    process.exit(1);
  }

  // Connect to DB
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const totalBefore = await College.countDocuments({ isActive: true });
  console.log(`Colleges in DB before update: ${totalBefore}`);
  if (totalBefore !== 772) {
    console.error(`FATAL: Expected exactly 772 active colleges in DB, found ${totalBefore}`);
    process.exit(1);
  }

  // Analyze proposed operations
  let toUpdateCount = 0;
  let alreadyMatchingCount = 0;
  let verifiedCount = 0;
  let notApplicableCount = 0;
  let pendingCount = 0;

  const bulkOps = [];

  for (const item of mapping) {
    const existing = await College.findById(item._id).lean();
    if (!existing) {
      console.error(`FATAL: College ID ${item._id} not found in DB!`);
      process.exit(1);
    }

    if (item.tneaStatus === 'verified') verifiedCount++;
    else if (item.tneaStatus === 'not_applicable') notApplicableCount++;
    else if (item.tneaStatus === 'pending_verification') pendingCount++;

    const currentCode = (existing.tneaCode || '').trim();
    const proposedCode = (item.proposedTneaCode || '').trim();
    const currentStatus = existing.tneaStatus || '';
    const proposedStatus = item.tneaStatus;
    const currentYear = existing.tneaSourceYear || '';
    const proposedYear = item.sourceYear || '';

    const needsUpdate = currentCode !== proposedCode || currentStatus !== proposedStatus || currentYear !== proposedYear;

    if (needsUpdate) {
      toUpdateCount++;
      bulkOps.push({
        updateOne: {
          filter: { _id: item._id },
          update: {
            $set: {
              tneaCode: proposedCode,
              tneaStatus: proposedStatus,
              tneaSourceYear: proposedYear,
            },
          },
        },
      });
    } else {
      alreadyMatchingCount++;
    }
  }

  console.log('\n--- Analysis of Operations ---');
  console.log(`Verified Status Total        : ${verifiedCount}`);
  console.log(`Not Applicable Total         : ${notApplicableCount}`);
  console.log(`Pending Verification Total   : ${pendingCount}`);
  console.log(`Records needing update       : ${toUpdateCount}`);
  console.log(`Records already matching     : ${alreadyMatchingCount}`);
  console.log(`Total records checked        : ${mapping.length}`);

  if (!isExecute) {
    console.log('\n[DRY RUN COMPLETE] No records were modified in MongoDB.');
    console.log('To apply these changes, rerun with:');
    console.log(`node scripts/apply-tnea-updates.mjs --execute --confirm-db=${expectedDb}`);
    process.exit(0);
  }

  // Execute Phase
  console.log('\n--- Executing Bulk Updates in MongoDB ---');
  if (bulkOps.length > 0) {
    const bulkRes = await College.bulkWrite(bulkOps);
    console.log(`Matched Count   : ${bulkRes.matchedCount}`);
    console.log(`Modified Count  : ${bulkRes.modifiedCount}`);
  } else {
    console.log('No updates required; all records match mapping.');
  }

  // Post-Execution Verification
  const totalAfter = await College.countDocuments({ isActive: true });
  console.log(`\nColleges in DB after update : ${totalAfter}`);
  if (totalAfter !== 772) {
    console.error(`ERROR: Active college count changed! Expected 772, got ${totalAfter}`);
    process.exit(1);
  }

  const dbVerified = await College.countDocuments({ isActive: true, tneaStatus: 'verified' });
  const dbNotApp = await College.countDocuments({ isActive: true, tneaStatus: 'not_applicable' });
  const dbPending = await College.countDocuments({ isActive: true, tneaStatus: 'pending_verification' });
  const dbWithCode = await College.countDocuments({ isActive: true, tneaCode: { $exists: true, $nin: ['', null] } });

  console.log(`Post-update verification:`);
  console.log(`  - Verified Status in DB     : ${dbVerified}`);
  console.log(`  - Not Applicable in DB      : ${dbNotApp}`);
  console.log(`  - Pending Verification in DB: ${dbPending}`);
  console.log(`  - Total with Populated Code : ${dbWithCode}`);

  console.log('\nSUCCESS: Database update completed successfully without altering college counts!');
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
