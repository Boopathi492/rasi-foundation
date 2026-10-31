// scripts/question_bank/build_and_seed.mjs
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env files
dotenv.config({ path: '.env.local' });
dotenv.config();

import { physicsPart1 } from './physics_part1.mjs';
import { physicsPart2 } from './physics_part2.mjs';
import { physicsPart3 } from './physics_part3.mjs';
import { physicsPart4 } from './physics_part4.mjs';
import { physicsPart5 } from './physics_part5.mjs';

import { chemistryPart1 } from './chemistry_part1.mjs';
import { chemistryPart2 } from './chemistry_part2.mjs';
import { chemistryPart3 } from './chemistry_part3.mjs';
import { chemistryPart4 } from './chemistry_part4.mjs';
import { chemistryPart5 } from './chemistry_part5.mjs';

import { mathematicsPart1 } from './mathematics_part1.mjs';
import { mathematicsPart2 } from './mathematics_part2.mjs';
import { mathematicsPart3 } from './mathematics_part3.mjs';
import { mathematicsPart4 } from './mathematics_part4.mjs';
import { mathematicsPart5 } from './mathematics_part5.mjs';

import { biologyPart1 } from './biology_part1.mjs';
import { biologyPart2 } from './biology_part2.mjs';
import { biologyPart3 } from './biology_part3.mjs';
import { biologyPart4 } from './biology_part4.mjs';
import { biologyPart5 } from './biology_part5.mjs';

import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';

const physics = [
  ...physicsPart1,
  ...physicsPart2,
  ...physicsPart3,
  ...physicsPart4,
  ...physicsPart5
];

const chemistry = [
  ...chemistryPart1,
  ...chemistryPart2,
  ...chemistryPart3,
  ...chemistryPart4,
  ...chemistryPart5
];

const mathematics = [
  ...mathematicsPart1,
  ...mathematicsPart2,
  ...mathematicsPart3,
  ...mathematicsPart4,
  ...mathematicsPart5
];

const biology = [
  ...biologyPart1,
  ...biologyPart2,
  ...biologyPart3,
  ...biologyPart4,
  ...biologyPart5
];

const allQuestions = [...physics, ...chemistry, ...mathematics, ...biology];

console.log(`\n========================================`);
console.log(`BUILDING QUESTION BANK (1,600 QUESTIONS TARGET)`);
console.log(`========================================`);
console.log(`Physics:      ${physics.length} / 400`);
console.log(`Chemistry:    ${chemistry.length} / 400`);
console.log(`Mathematics:  ${mathematics.length} / 400`);
console.log(`Biology:      ${biology.length} / 400`);
console.log(`Total:        ${allQuestions.length} / 1600`);

if (allQuestions.length !== 1600) {
  console.error(`ERROR: Expected exactly 1600 questions, got ${allQuestions.length}`);
  process.exit(1);
}

// Validation & duplicate detection step
const codesSeen = new Set();
const enTextsSeen = new Map();
const taTextsSeen = new Map();
const allowedOptions = ['A', 'B', 'C', 'D'];
let validationErrors = 0;
let enDuplicates = 0;
let taDuplicates = 0;

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];

  // Code validation
  if (!q.code) {
    console.error(`Error at index ${i}: missing code`);
    validationErrors++;
  } else if (codesSeen.has(q.code)) {
    console.error(`Duplicate code detected: ${q.code}`);
    validationErrors++;
  }
  codesSeen.add(q.code);

  // Content validation
  if (!q.questionText || !q.questionTextTamil) {
    console.error(`Missing question text for ${q.code}`);
    validationErrors++;
  }

  // Duplicate question text detection
  const normEn = q.questionText.trim().toLowerCase().replace(/\s+/g, ' ');
  const normTa = q.questionTextTamil.trim().replace(/\s+/g, ' ');

  if (enTextsSeen.has(normEn)) {
    console.warn(`[DUPLICATE WARNING EN] '${q.code}' shares English text with '${enTextsSeen.get(normEn)}'`);
    enDuplicates++;
  } else {
    enTextsSeen.set(normEn, q.code);
  }

  if (taTextsSeen.has(normTa)) {
    console.warn(`[DUPLICATE WARNING TA] '${q.code}' shares Tamil text with '${taTextsSeen.get(normTa)}'`);
    taDuplicates++;
  } else {
    taTextsSeen.set(normTa, q.code);
  }

  // Options validation
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    console.error(`Invalid options length for ${q.code}`);
    validationErrors++;
  }

  if (!Array.isArray(q.optionsTamil) || q.optionsTamil.length !== 4) {
    console.error(`Invalid optionsTamil length for ${q.code}`);
    validationErrors++;
  }

  if (!allowedOptions.includes(q.correctAnswer)) {
    console.error(`Invalid correctAnswer '${q.correctAnswer}' for ${q.code}`);
    validationErrors++;
  }

  if (!q.explanation || !q.explanationTamil) {
    console.error(`Missing explanation for ${q.code}`);
    validationErrors++;
  }

  // Set default fields
  q.chapter = q.chapter || q.topic || 'General';
  q.marks = 1;
  q.negativeMarks = 0;
  q.language = 'Bilingual';
  q.isActive = true;
  q.approvalStatus = 'approved';
  q.usageCount = q.usageCount || 0;
}

if (validationErrors > 0) {
  console.error(`\nValidation failed with ${validationErrors} errors! Aborting seed.`);
  process.exit(1);
}

console.log(`\nIntegrity Validation Complete:`);
console.log(`  - 1,600 unique question codes verified.`);
console.log(`  - All questions contain bilingual text, 4 English/Tamil options, verified keys, and explanations.`);
console.log(`  - Duplicate English text count: ${enDuplicates}`);
console.log(`  - Duplicate Tamil text count: ${taDuplicates}`);

// Save JSON files
const outDir = path.resolve(process.cwd(), 'data', 'scholarship_questions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'physics.json'), JSON.stringify(physics, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'chemistry.json'), JSON.stringify(chemistry, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'mathematics.json'), JSON.stringify(mathematics, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'biology.json'), JSON.stringify(biology, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'all_1600_questions.json'), JSON.stringify(allQuestions, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'all_questions.json'), JSON.stringify(allQuestions, null, 2), 'utf8');
console.log(`Exported JSON backups (400 per subject, 1,600 total) to ${outDir}`);

// Connect to MongoDB and seed
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI environment variable not set!');
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`Connected to MongoDB successfully.`);

    console.log(`Seeding 1,600 questions into 'scholarshipquestions' collection (bulk upsert by code)...`);
    const operations = allQuestions.map(q => ({
      updateOne: {
        filter: { code: q.code },
        update: { $set: q },
        upsert: true
      }
    }));

    // Process in batches of 400 for maximum memory safety and performance
    const batchSize = 400;
    let totalMatched = 0;
    let totalModified = 0;
    let totalUpserted = 0;

    for (let i = 0; i < operations.length; i += batchSize) {
      const batch = operations.slice(i, i + batchSize);
      const res = await ScholarshipQuestion.bulkWrite(batch);
      totalMatched += res.matchedCount;
      totalModified += res.modifiedCount;
      totalUpserted += res.upsertedCount;
      console.log(`  Processed batch ${i / batchSize + 1}/${Math.ceil(operations.length / batchSize)}: ${batch.length} items`);
    }

    console.log(`Upsert summary:`, {
      totalProcessed: operations.length,
      matchedCount: totalMatched,
      modifiedCount: totalModified,
      upsertedCount: totalUpserted
    });

    const counts = await ScholarshipQuestion.aggregate([
      {
        $group: {
          _id: "$subject",
          total: { $sum: 1 },
          approved: { $sum: { $cond: [{ $eq: ["$approvalStatus", "approved"] }, 1, 0] } },
          active: { $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log(`\n========================================`);
    console.log(`MONGODB LIVE VERIFICATION COUNTS:`);
    console.log(`========================================`);
    counts.forEach(c => {
      console.log(`  - ${c._id.padEnd(12)}: Total = ${c.total.toString().padStart(4)}, Approved = ${c.approved.toString().padStart(4)}, Active = ${c.active.toString().padStart(4)}`);
    });

    const diffCounts = await ScholarshipQuestion.aggregate([
      {
        $group: {
          _id: { subject: "$subject", difficulty: "$difficulty" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.subject": 1, "_id.difficulty": 1 } }
    ]);

    console.log(`\nDifficulty Breakdown by Subject:`);
    diffCounts.forEach(d => {
      console.log(`  - ${d._id.subject.padEnd(12)} [${(d._id.difficulty || 'medium').padEnd(6)}]: ${d.count} questions`);
    });

    const totalInDb = await ScholarshipQuestion.countDocuments();
    console.log(`\n>>> Total questions currently in MongoDB: ${totalInDb} <<<`);

    await mongoose.disconnect();
    console.log(`Disconnected from MongoDB. Seed complete!\n`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
