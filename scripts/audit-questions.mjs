import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import dbConnect from '../src/backend/lib/mongodb.js';
import ScholarshipQuestion from '../src/backend/models/ScholarshipQuestion.js';

async function main() {
  await dbConnect();
  const count = await ScholarshipQuestion.countDocuments();
  const activeCount = await ScholarshipQuestion.countDocuments({ isActive: true });
  const subjects = await ScholarshipQuestion.aggregate([
    { $group: { _id: '$subject', count: { $sum: 1 }, active: { $sum: { $cond: ['$isActive', 1, 0] } } } }
  ]);
  
  // Check options completeness and correct answer validity
  const invalidQuestions = await ScholarshipQuestion.find({
    $or: [
      { 'options.3': { $exists: false } },
      { correctAnswer: { $nin: ['A', 'B', 'C', 'D'] } },
      { questionText: { $in: ['', null] } }
    ]
  }).lean();

  // Check duplicates by questionText
  const duplicates = await ScholarshipQuestion.aggregate([
    { $group: { _id: '$questionText', count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } }
  ]);

  console.log(JSON.stringify({
    totalCount: count,
    activeCount,
    subjects,
    invalidCount: invalidQuestions.length,
    duplicateCount: duplicates.length
  }, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
