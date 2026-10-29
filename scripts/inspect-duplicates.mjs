import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function inspectDuplicates() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const colleges = await College.find({ isActive: true }).lean();
  const codeMap = new Map();

  colleges.forEach(c => {
    if (c.tneaCode && c.tneaCode.trim()) {
      const code = c.tneaCode.trim();
      if (!codeMap.has(code)) codeMap.set(code, []);
      codeMap.get(code).push(c);
    }
  });

  console.log('--- ALL DUPLICATE TNEA CODES IN CURRENT DATABASE ---');
  let duplicateGroups = 0;
  codeMap.forEach((list, code) => {
    if (list.length > 1) {
      duplicateGroups++;
      console.log(`\n[CODE: ${code}] (${list.length} colleges):`);
      list.forEach(c => {
        console.log(`  - ID: ${c._id}`);
        console.log(`    Name: ${c.name}`);
        console.log(`    District: ${c.district}`);
        console.log(`    Type: ${c.type || 'undefined'}`);
        console.log(`    Location: ${c.location}`);
      });
    }
  });
  console.log(`\nTotal duplicate code groups: ${duplicateGroups}`);
  process.exit(0);
}

inspectDuplicates().catch(console.error);
