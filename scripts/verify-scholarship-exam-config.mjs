import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import dbConnect from '../src/backend/lib/mongodb.js';
import ScholarshipExamConfig from '../src/backend/models/ScholarshipExamConfig.js';
import ScholarshipQuestion from '../src/backend/models/ScholarshipQuestion.js';
import TestSession from '../src/backend/models/TestSession.js';

async function main() {
  await dbConnect();
  
  // 1. Fetch active exam configuration
  const activeConfig = await ScholarshipExamConfig.getActiveConfig();

  // 2. Questions breakdown by subject and difficulty
  const questionBreakdown = await ScholarshipQuestion.aggregate([
    {
      $group: {
        _id: { subject: '$subject', difficulty: '$difficulty', status: '$approvalStatus' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.subject': 1, '_id.difficulty': 1 } }
  ]);

  // 3. Check language support (English & Tamil) across questions
  const tamilCoverage = await ScholarshipQuestion.countDocuments({
    questionTextTamil: { $exists: true, $ne: '' },
    'optionsTamil.3': { $exists: true }
  });

  // 4. Sample completed TestSession to verify saved result structure & subjectWiseScore
  const sampleCompletedSession = await TestSession.findOne({ status: 'completed' })
    .select('registrationToken candidateName subjects optionalSubject score totalQuestions correctAnswers wrongAnswers unattemptedQuestions percentage subjectWiseScore emailStatus')
    .lean();

  console.log(JSON.stringify({
    examConfig: {
      examDurationMinutes: activeConfig.examDurationMinutes,
      totalQuestions: activeConfig.totalQuestions,
      marksPerQuestion: activeConfig.marksPerQuestion,
      negativeMarking: activeConfig.negativeMarking,
      passingPercentage: activeConfig.passingPercentage,
      compulsorySubjects: activeConfig.compulsorySubjects,
      optionalSubjects: activeConfig.optionalSubjects,
      supportedLanguages: activeConfig.supportedLanguages
    },
    totalQuestions: await ScholarshipQuestion.countDocuments(),
    tamilQuestionsCoverage: tamilCoverage,
    questionBreakdown,
    sampleCompletedSession: sampleCompletedSession || 'No sample completed session found (fresh DB or purged)'
  }, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
