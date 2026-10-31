import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

async function backup() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  await mongoose.connect(uri);
  const coll = mongoose.connection.collection('scholarshipquestions');
  const existingQuestions = await coll.find({}).toArray();

  const backupDir = path.resolve(process.cwd(), 'data', 'scholarship_questions');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const backupPath = path.join(backupDir, 'backup_pre_expansion_650.json');
  fs.writeFileSync(backupPath, JSON.stringify(existingQuestions, null, 2), 'utf8');

  console.log(`Successfully backed up ${existingQuestions.length} existing questions to: ${backupPath}`);
  await mongoose.disconnect();
}

backup().catch(console.error);
