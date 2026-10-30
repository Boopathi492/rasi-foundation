import dbConnect from '../src/backend/lib/mongodb.js';
import ScholarshipQuestion from '../src/backend/models/ScholarshipQuestion.js';
import TestSession from '../src/backend/models/TestSession.js';
import ScholarshipStudent from '../src/backend/models/ScholarshipStudent.js';

async function main() {
  await dbConnect();
  const qCounts = await ScholarshipQuestion.aggregate([
    { $group: { _id: '$subject', count: { $sum: 1 } } }
  ]);
  const totalQ = await ScholarshipQuestion.countDocuments();
  const totalStudents = await ScholarshipStudent.countDocuments();
  const totalSessions = await TestSession.countDocuments();
  console.log('Question counts by subject:', qCounts);
  console.log('Total Questions:', totalQ);
  console.log('Total Students:', totalStudents);
  console.log('Total Sessions:', totalSessions);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
