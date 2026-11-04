import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import dbConnect from '../src/backend/lib/mongodb.js';
import College from '../src/backend/models/College.js';
import Course from '../src/backend/models/Course.js';

async function main() {
  await dbConnect();
  
  const totalCount = await College.countDocuments({});
  const activeCount = await College.countDocuments({ isActive: true });
  
  // Find colleges by medicalCategory: 'AYUSH'
  const ayushColleges = await College.find({ medicalCategory: 'AYUSH' })
    .select('_id name district type medicalCategory academicLevels codeType codeValue courses')
    .populate('courses', 'name code')
    .lean();

  // Check all 21 additions specifically
  const ayushNames = ayushColleges.map(c => c.name);

  // Check duplicates by name
  const nameDups = await College.aggregate([
    { $group: { _id: '$name', count: { $sum: 1 }, ids: { $push: '$_id' } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  // Check unique IDs
  const allColleges = await College.find({}).select('_id name type district academicLevels').lean();
  const idSet = new Set(allColleges.map(c => String(c._id)));
  const duplicateIds = allColleges.length - idSet.size;

  // Check invalid/null fields
  const missingType = await College.countDocuments({ $or: [{ type: null }, { type: { $exists: false } }, { type: '' }] });
  const missingDistrict = await College.countDocuments({ $or: [{ district: null }, { district: { $exists: false } }, { district: '' }] });
  const missingName = await College.countDocuments({ $or: [{ name: null }, { name: { $exists: false } }, { name: '' }] });
  const missingLevels = await College.countDocuments({ $or: [{ academicLevels: { $exists: false } }, { academicLevels: { $size: 0 } }] });

  // Stream-wise breakdown
  const streamBreakdown = await College.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  console.log(JSON.stringify({
    totalCount,
    activeCount,
    ayushCount: ayushColleges.length,
    ayushCollegesList: ayushColleges.map((c, i) => ({
      index: i + 1,
      id: String(c._id),
      name: c.name,
      district: c.district,
      type: c.type,
      medicalCategory: c.medicalCategory,
      academicLevels: c.academicLevels,
      codeType: c.codeType,
      codeValue: c.codeValue,
      coursesCount: (c.courses || []).length,
      courses: (c.courses || []).map(cr => cr.name)
    })),
    duplicateNamesCount: nameDups.length,
    duplicateNames: nameDups,
    duplicateIds,
    validation: {
      missingType,
      missingDistrict,
      missingName,
      missingLevels
    },
    streamBreakdown
  }, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
