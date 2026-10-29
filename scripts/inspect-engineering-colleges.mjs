import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function inspectCollegesForTNEA() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const all = await College.find({ isActive: true }).select('name district location type tneaCode departments specialization institutionType').lean();

  console.log(`Total active colleges in DB: ${all.length}`);

  const typesCount = {};
  all.forEach(c => {
    const t = c.type || 'Legacy / Untyped';
    typesCount[t] = (typesCount[t] || 0) + 1;
  });
  console.log('\nBreakdown by Type:');
  console.table(typesCount);

  // Check the "Legacy / Untyped" colleges: which ones are Engineering?
  const legacy = all.filter(c => !c.type);
  console.log(`\nLegacy / Untyped colleges count: ${legacy.length}`);
  const legacyEngineering = [];
  const legacyNonEngineering = [];

  legacy.forEach(c => {
    const nameLower = c.name.toLowerCase();
    const isEng = nameLower.includes('engineering') ||
                  nameLower.includes('technology') ||
                  nameLower.includes('institute of tech') ||
                  (c.departments || []).some(d => /B\.E|B\.Tech|Mechanical|Civil|Electrical|Computer Science|ECE|EEE/i.test(d));

    if (isEng) {
      legacyEngineering.push(c);
    } else {
      legacyNonEngineering.push(c);
    }
  });

  console.log(`- Legacy Engineering Candidates: ${legacyEngineering.length}`);
  console.log(`- Legacy Non-Engineering (Universities, Arts, Bengaluru, etc.): ${legacyNonEngineering.length}`);
  console.log('\nSample Legacy Non-Engineering:');
  legacyNonEngineering.forEach(c => console.log(`   * ${c.name} (${c.district}, ${c.location}) - tneaCode: "${c.tneaCode || ''}"`));

  process.exit(0);
}

inspectCollegesForTNEA().catch(console.error);
