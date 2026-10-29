import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function runAudit() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const allColleges = await College.find({ isActive: true }).lean();
  console.log(`\n================================================================`);
  console.log(`   PHASE 1 AUDIT: TNEA COUNSELLING CODES (TOTAL: ${allColleges.length})   `);
  console.log(`================================================================\n`);

  const populated = [];
  const missing = [];
  const codesMap = new Map(); // code -> array of colleges
  const byType = {};

  allColleges.forEach(col => {
    const type = col.type || 'Unknown';
    byType[type] = byType[type] || { total: 0, withCode: 0, withoutCode: 0 };
    byType[type].total++;

    const rawCode = col.tneaCode;
    const hasCode = typeof rawCode === 'string' && rawCode.trim().length > 0;

    if (hasCode) {
      const code = rawCode.trim();
      byType[type].withCode++;
      populated.push({ ...col, code });
      if (!codesMap.has(code)) codesMap.set(code, []);
      codesMap.get(code).push(col);
    } else {
      byType[type].withoutCode++;
      missing.push(col);
    }
  });

  console.log(`1. Total Active College Records: ${allColleges.length}`);
  console.log(`2. Records with a Populated Code: ${populated.length}`);
  console.log(`3. Records with Missing Codes   : ${missing.length}`);

  console.log(`\n4. Code Distribution by College Type:`);
  console.table(Object.keys(byType).map(t => ({
    Type: t,
    Total: byType[t].total,
    With_Code: byType[t].withCode,
    Without_Code: byType[t].withoutCode,
    TNEA_Eligible: t === 'Engineering' ? 'YES' : 'NO (Different counselling / Not TNEA)'
  })));

  // Analyze populated codes: duplicates & suspicious values
  const duplicates = [];
  const suspicious = [];

  codesMap.forEach((colleges, code) => {
    if (colleges.length > 1) {
      duplicates.push({ code, colleges: colleges.map(c => ({ id: c._id, name: c.name, district: c.district, type: c.type })) });
    }
    // TNEA codes are standard 4-digit numbers (or 1-4 digits)
    if (!/^\d{1,5}$/.test(code)) {
      suspicious.push({ code, reason: 'Non-numeric or invalid length', colleges: colleges.map(c => c.name) });
    }
  });

  console.log(`\n5. Duplicate Codes Found (${duplicates.length}):`);
  if (duplicates.length === 0) {
    console.log('   None.');
  } else {
    duplicates.forEach(d => {
      console.log(`   Code: ${d.code} (${d.colleges.length} institutions):`);
      d.colleges.forEach(c => console.log(`     - [${c.type}] ${c.name} (${c.district})`));
    });
  }

  console.log(`\n6. Suspicious / Non-standard Code Values (${suspicious.length}):`);
  if (suspicious.length === 0) {
    console.log('   None.');
  } else {
    suspicious.forEach(s => {
      console.log(`   Code: "${s.code}" -> ${s.reason} for: ${s.colleges.join(', ')}`);
    });
  }

  // Non-eligible institutions that have a TNEA code
  const nonEligibleWithCode = populated.filter(c => c.type !== 'Engineering');
  console.log(`\n7. Non-Engineering Records with a TNEA Code Assigned (${nonEligibleWithCode.length}):`);
  if (nonEligibleWithCode.length === 0) {
    console.log('   None.');
  } else {
    nonEligibleWithCode.forEach(c => {
      console.log(`   - [${c.type}] ${c.name} (Code: "${c.code}", District: ${c.district})`);
    });
  }

  // Engineering colleges missing codes
  const engineeringMissing = missing.filter(c => c.type === 'Engineering');
  console.log(`\n8. Engineering Colleges Missing TNEA Code (${engineeringMissing.length} out of ${byType['Engineering']?.total || 0}):`);
  console.log(`   Sample missing engineering colleges:`);
  engineeringMissing.slice(0, 10).forEach(c => {
    console.log(`     - ${c.name} (${c.location}, ${c.district})`);
  });

  process.exit(0);
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
