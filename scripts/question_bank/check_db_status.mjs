import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const coll = mongoose.connection.collection('scholarshipquestions');
  const counts = await coll.aggregate([
    { $group: { _id: '$subject', count: { $sum: 1 } } }
  ]).toArray();
  console.log('Current DB Counts:', counts);
  const total = await coll.countDocuments();
  console.log('Total in DB:', total);
  const testSessions = await mongoose.connection.collection('testsessions').countDocuments();
  console.log('Test Sessions in DB:', testSessions);
  const students = await mongoose.connection.collection('scholarshipstudents').countDocuments();
  console.log('Students in DB:', students);
  await mongoose.disconnect();
}
run().catch(console.error);
