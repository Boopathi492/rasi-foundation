import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function inspectColleges() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const total = await College.countDocuments();
  const active = await College.countDocuments({ isActive: true });
  const districts = await College.aggregate([
    { $group: { _id: '$district', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  const types = await College.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  const samples = await College.find({}).limit(10).lean();

  console.log('TOTAL_COLLEGES:', total);
  console.log('ACTIVE_COLLEGES:', active);
  console.log('DISTRICT_COUNTS:', JSON.stringify(districts, null, 2));
  console.log('TYPE_COUNTS:', JSON.stringify(types, null, 2));
  console.log('SAMPLE_COLLEGES:', samples.map(c => ({
    _id: c._id,
    name: c.name,
    district: c.district,
    location: c.location,
    type: c.type,
    departmentsCount: (c.departments || []).length
  })));

  const mongooseModule = await import('mongoose');
  await mongooseModule.default.disconnect();
  process.exit(0);
}
inspectColleges().catch(e => { console.error(e); process.exit(1); });
