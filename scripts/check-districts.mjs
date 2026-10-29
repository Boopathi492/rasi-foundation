import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function checkDistricts() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const districtCounts = await College.aggregate([
    { $group: { _id: '$district', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  console.log('Current District Counts in DB:');
  districtCounts.forEach(d => console.log(`  ${d._id}: ${d.count}`));
  process.exit(0);
}

checkDistricts();
