import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkNames() {
  const master = JSON.parse(fs.readFileSync('data/tamil_nadu_colleges_master.json', 'utf8'));
  console.log(`Master catalog length: ${master.length}`);

  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const dbColleges = await College.find({}).lean();
  console.log(`DB colleges count: ${dbColleges.length}`);

  const namesSet = new Set();
  master.forEach(c => namesSet.add(c.name.toLowerCase().trim()));
  dbColleges.forEach(c => namesSet.add((c.name || '').toLowerCase().trim()));

  console.log(`Total unique college names known: ${namesSet.size}`);
  process.exit(0);
}

checkNames();
