import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import ScholarshipStudent from '../src/backend/models/ScholarshipStudent.js';
import TestSession from '../src/backend/models/TestSession.js';
import ScholarshipQuestion from '../src/backend/models/ScholarshipQuestion.js';
import SheetDBSyncJob from '../src/backend/models/SheetDBSyncJob.js';
import { mapStudentToSheetRow, mapResultToSheetRow } from '../src/backend/lib/sheetdb/sheetdb.mappings.js';
import { enqueueAndDispatchSync, processJob } from '../src/backend/lib/sheetdb/sheetdb.worker.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rasi-foundation';

async function main() {
    console.log('--- Rasi Foundation: Pre-Migration Backup & Sync ---');

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Audit counts
    const studentCount = await ScholarshipStudent.countDocuments();
    const sessionCount = await TestSession.countDocuments();
    const questionCount = await ScholarshipQuestion.countDocuments();
    console.log(`Current DB State: ${studentCount} Students, ${sessionCount} Sessions, ${questionCount} Questions.`);

    // 2. Safety Backup
    const backupDir = path.resolve('data', 'scholarship_questions');
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }

    const students = await ScholarshipStudent.find().lean();
    const sessions = await TestSession.find().lean();

    const backupFile = path.join(backupDir, `backup_students_sessions_${Date.now()}.json`);
    fs.writeFileSync(backupFile, JSON.stringify({ students, sessions }, null, 2), 'utf-8');
    console.log(`Backup saved to ${backupFile}`);

    // 3. Dry-run / Sync existing students
    console.log('Processing existing student records for SheetDB sync...');
    for (const student of students) {
        console.log(`Enqueueing student: ${student.name} (${student.registrationToken})...`);
        const row = mapStudentToSheetRow(student);
        const job = await enqueueAndDispatchSync({
            destinationTab: 'Scholarship_Students',
            recordReferenceId: student._id.toString(),
            payload: row,
            operationType: 'insert',
        });
        const res = await processJob(job._id);
        console.log(`Sync result for ${student.registrationToken}:`, res?.success ? 'SUCCESS' : res);
    }

    // 4. Dry-run / Sync completed exam sessions
    const completedSessions = await TestSession.find({ status: 'completed' }).lean();
    console.log(`Processing ${completedSessions.length} completed exam sessions...`);
    for (const session of completedSessions) {
        const student = await ScholarshipStudent.findById(session.studentId).lean();
        const row = mapResultToSheetRow(session, student || {});
        const job = await enqueueAndDispatchSync({
            destinationTab: 'Scholarship_Results',
            recordReferenceId: session._id.toString(),
            payload: row,
            operationType: 'insert',
        });
        const res = await processJob(job._id);
        console.log(`Sync result for session ${session._id}:`, res?.success ? 'SUCCESS' : res);
    }

    console.log('Migration sync completed.');
    await mongoose.disconnect();
}

main().catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
});
