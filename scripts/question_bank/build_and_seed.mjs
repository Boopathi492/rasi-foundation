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

import { chemistryPart1 } from './chemistry_part1.mjs';
import { chemistryPart2 } from './chemistry_part2.mjs';
import { chemistryPart3 } from './chemistry_part3.mjs';

import { mathematicsPart1 } from './mathematics_part1.mjs';
import { mathematicsPart2 } from './mathematics_part2.mjs';

import { biologyPart1 } from './biology_part1.mjs';
import { biologyPart2 } from './biology_part2.mjs';

import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';

const physics = [...physicsPart1, ...physicsPart2, ...physicsPart3];
const chemistry = [...chemistryPart1, ...chemistryPart2, ...chemistryPart3];
const mathematics = [...mathematicsPart1, ...mathematicsPart2];
const biology = [...biologyPart1, ...biologyPart2];
const allQuestions = [...physics, ...chemistry, ...mathematics, ...biology];

console.log(`\n========================================`);
console.log(`BUILDING QUESTION BANK`);
console.log(`========================================`);
console.log(`Physics:      ${physics.length} questions`);
console.log(`Chemistry:    ${chemistry.length} questions`);
console.log(`Mathematics:  ${mathematics.length} questions`);
console.log(`Biology:      ${biology.length} questions`);
console.log(`Total:        ${allQuestions.length} questions`);

// Validation step
const codesSeen = new Set();
const allowedOptions = ['A', 'B', 'C', 'D'];
let validationErrors = 0;

for (let i = 0; i < allQuestions.length; i++) {
  const q = allQuestions[i];
  if (!q.code) {
    console.error(`Error at index ${i}: missing code`);
    validationErrors++;
  } else if (codesSeen.has(q.code)) {
    console.error(`Duplicate code detected: ${q.code}`);
    validationErrors++;
  }
  codesSeen.add(q.code);

  if (!q.questionText || !q.questionTextTamil) {
    console.error(`Missing question text for ${q.code}`);
    validationErrors++;
  }

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
  q.marks = 1;
  q.negativeMarks = 0;
  q.language = 'Bilingual';
  q.isActive = true;
  q.usageCount = q.usageCount || 0;
}

if (validationErrors > 0) {
  console.error(`\nValidation failed with ${validationErrors} errors! Aborting seed.`);
  process.exit(1);
}

console.log(`\nAll 650 questions passed strict integrity and bilingual validation!`);

// Save JSON files
const outDir = path.resolve(process.cwd(), 'data', 'scholarship_questions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'physics.json'), JSON.stringify(physics, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'chemistry.json'), JSON.stringify(chemistry, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'mathematics.json'), JSON.stringify(mathematics, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'biology.json'), JSON.stringify(biology, null, 2), 'utf8');
fs.writeFileSync(path.join(outDir, 'all_questions.json'), JSON.stringify(allQuestions, null, 2), 'utf8');
console.log(`Exported JSON backups to ${outDir}`);

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

    console.log(`Seeding 650 questions into 'scholarshipquestions' collection (bulk upsert by code)...`);
    const operations = allQuestions.map(q => ({
      updateOne: {
        filter: { code: q.code },
        update: { $set: q },
        upsert: true
      }
    }));

    const result = await ScholarshipQuestion.bulkWrite(operations);
    console.log(`Upsert result:`, {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount
    });

    const counts = await ScholarshipQuestion.aggregate([
      { $group: { _id: "$subject", count: { $sum: 1 } } }
    ]);

    console.log(`\nMongoDB Question Counts by Subject:`);
    counts.forEach(c => {
      console.log(`  - ${c._id}: ${c.count} questions`);
    });

    const totalInDb = await ScholarshipQuestion.countDocuments();
    console.log(`Total questions in database: ${totalInDb}`);

    await mongoose.disconnect();
    console.log(`Disconnected from MongoDB. Seed complete!\n`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
