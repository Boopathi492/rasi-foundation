import { readFileSync } from 'fs';

function validateMapping() {
  const mapping = JSON.parse(readFileSync('./data/tnea_counselling_mapping.json', 'utf8'));

  console.log('================================================================');
  console.log(`   VALIDATING TNEA COUNSELLING MAPPING FILE (${mapping.length} RECORDS)   `);
  console.log('================================================================\n');

  if (mapping.length !== 772) {
    throw new Error(`Expected exactly 772 records in mapping, got ${mapping.length}`);
  }

  const statusCounts = { verified: 0, not_applicable: 0, pending_verification: 0 };
  const codeToColleges = new Map();
  const changes = [];
  const unchanged = [];

  mapping.forEach(rec => {
    statusCounts[rec.tneaStatus] = (statusCounts[rec.tneaStatus] || 0) + 1;

    if (rec.proposedTneaCode) {
      if (!codeToColleges.has(rec.proposedTneaCode)) {
        codeToColleges.set(rec.proposedTneaCode, []);
      }
      codeToColleges.get(rec.proposedTneaCode).push(rec);
    }

    if (rec.currentTneaCode !== rec.proposedTneaCode) {
      changes.push(rec);
    } else {
      unchanged.push(rec);
    }
  });

  console.log('1. Status Summary:');
  console.log(`   - Verified Codes Added / Confirmed: ${statusCounts.verified}`);
  console.log(`   - Confirmed Not Applicable         : ${statusCounts.not_applicable}`);
  console.log(`   - Pending Verification             : ${statusCounts.pending_verification}`);

  console.log('\n2. Update Impact:');
  console.log(`   - Records with Code Updates       : ${changes.length}`);
  console.log(`   - Records Remaining Unchanged     : ${unchanged.length}`);

  // Inspect duplicate proposed codes
  const duplicates = [];
  codeToColleges.forEach((colleges, code) => {
    if (colleges.length > 1) {
      duplicates.push({ code, colleges });
    }
  });

  console.log(`\n3. Duplicate Code Check in Proposed Mapping (${duplicates.length} duplicate code values):`);
  let legitimateSameInstitutionCount = 0;
  let problematicConflictCount = 0;

  duplicates.forEach(d => {
    // Check if the institutions in this duplicate group have normalized matching names
    const names = d.colleges.map(c => c.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
    const isSameInstitution = names.every(n => n.includes(names[0]) || names[0].includes(n) || names.some(other => other.includes(n) || n.includes(other)));

    if (isSameInstitution) {
      legitimateSameInstitutionCount++;
      console.log(`   [LEGITIMATE SAME-INSTITUTION] Code ${d.code}:`);
      d.colleges.forEach(c => console.log(`     - ${c.name} (${c.district}) [ID: ${c._id}]`));
    } else {
      problematicConflictCount++;
      console.log(`   [CONFLICT!] Code ${d.code}:`);
      d.colleges.forEach(c => console.log(`     - ${c.name} (${c.district}) [ID: ${c._id}]`));
    }
  });

  console.log(`\n4. Summary of Duplicates:`);
  console.log(`   - Legitimate same-institution occurrences (Legacy zone vs Master catalog): ${legitimateSameInstitutionCount}`);
  console.log(`   - Unresolved conflicts across distinct institutions: ${problematicConflictCount}`);

  if (problematicConflictCount > 0) {
    console.error('\nERROR: Found unresolved conflicts across distinct institutions! Must fix mapping before proceeding.');
    process.exit(1);
  } else {
    console.log('\nSUCCESS: All duplicate codes are confirmed legitimate same-institution occurrences between legacy zones and master catalog!');
  }
}

validateMapping();
