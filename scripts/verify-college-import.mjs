import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const TAMIL_NADU_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
  'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai',
  'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
  'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
  'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const PRESERVED_MATCHES = [
  { id: '69917d73cf56e5fe32ace5d1', name: 'Coimbatore Institute of Technology (CIT)', district: 'Coimbatore Zone' },
  { id: '69917d73cf56e5fe32ace5d2', name: 'Kumaraguru College of Technology (KCT)', district: 'Coimbatore Zone' },
  { id: '69917d73cf56e5fe32ace5d5', name: 'Sri Krishna College of Engineering and Technology (SKCET)', district: 'Coimbatore Zone' },
  { id: '69917d73cf56e5fe32ace5ac', name: 'K.S. Rangasamy College of Technology (KSRCT)', district: 'Namakkal District' },
  { id: '69917d73cf56e5fe32ace5af', name: 'Selvam College of Technology (Autonomous)', district: 'Namakkal District' },
  { id: '69917d73cf56e5fe32ace5d8', name: 'Karpagam College of Engineering (Autonomous)', district: 'Coimbatore Zone' },
  { id: '69917d73cf56e5fe32ace5bc', name: 'Knowledge Institute of Technology (KIOT)', district: 'Salem District' },
  { id: '69917d73cf56e5fe32ace5fa', name: 'Park College of Engineering and Technology', district: 'Coimbatore Zone' }
];

async function verify() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const total = await College.countDocuments();
  const active = await College.countDocuments({ isActive: true });

  const typeCounts = await College.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const districtCounts = await College.aggregate([
    { $group: { _id: '$district', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  console.log('='.repeat(70));
  console.log('POST-IMPORT DATABASE VERIFICATION REPORT');
  console.log('='.repeat(70));
  console.log(`Total College Documents in DB : ${total}`);
  console.log(`Active Colleges               : ${active}`);
  console.log('-'.repeat(70));
  console.log('COLLEGE COUNTS BY TYPE / STREAM:');
  typeCounts.forEach(t => {
    console.log(`  - ${(t._id || 'Legacy (null)').padEnd(20)}: ${t.count} colleges`);
  });
  console.log('-'.repeat(70));
  console.log(`DISTRICTS REPRESENTED (${districtCounts.length} distinct districts/zones):`);
  districtCounts.forEach(d => {
    console.log(`  - ${(d._id || 'Unknown').padEnd(30)}: ${d.count} colleges`);
  });

  // Verify all 38 TN districts are present
  const presentDistricts = new Set(districtCounts.map(d => d._id));
  const missingDistricts = TAMIL_NADU_DISTRICTS.filter(d => !presentDistricts.has(d));
  console.log('-'.repeat(70));
  console.log(`All 38 TN Districts Covered: ${missingDistricts.length === 0 ? 'YES (100% COVERAGE)' : 'NO'}`);
  if (missingDistricts.length > 0) {
    console.error(`Missing districts: ${missingDistricts.join(', ')}`);
  }

  // Verify the 8 preserved matches
  console.log('-'.repeat(70));
  console.log('VERIFYING 8 PRESERVED MATCHING COLLEGES:');
  let preservedMatchErrors = 0;
  for (const expected of PRESERVED_MATCHES) {
    const doc = await College.findById(expected.id).lean();
    if (!doc) {
      console.error(`  FAIL: Document with ID ${expected.id} not found!`);
      preservedMatchErrors++;
    } else if (doc.name !== expected.name) {
      console.error(`  FAIL: Document ${expected.id} name changed! Expected: '${expected.name}', Got: '${doc.name}'`);
      preservedMatchErrors++;
    } else if (doc.district !== expected.district) {
      console.error(`  FAIL: Document ${expected.id} district changed! Expected: '${expected.district}', Got: '${doc.district}'`);
      preservedMatchErrors++;
    } else {
      console.log(`  PASS: '${doc.name}' preserved with original ID [${doc._id}] and district '${doc.district}'`);
    }
  }

  console.log('='.repeat(70));
  if (total === 415 && active === 415 && missingDistricts.length === 0 && preservedMatchErrors === 0) {
    console.log('DATABASE VERIFICATION SUCCESSFUL: ALL 415 COLLEGES PRESENT AND VERIFIED!');
  } else {
    console.error('DATABASE VERIFICATION COMPLETED WITH WARNINGS/ERRORS.');
  }
  console.log('='.repeat(70));

  const mongooseModule = await import('mongoose');
  await mongooseModule.default.disconnect();
  process.exit(preservedMatchErrors > 0 || missingDistricts.length > 0 ? 1 : 0);
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
