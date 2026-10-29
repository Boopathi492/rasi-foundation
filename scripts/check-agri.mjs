import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  const { default: Course } = await import('../src/backend/models/Course.js');
  await dbConnect();

  const vanavarayar = await College.findOne({ name: /Vanavarayar/i }).populate('courses').lean();
  console.log('Vanavarayar populated courses:', vanavarayar.courses);

  const bscAgri = await Course.findOne({ name: /Agriculture/i }).lean();
  console.log('bscAgri course:', { _id: bscAgri?._id, name: bscAgri?.name });
}

check().catch(console.error);
