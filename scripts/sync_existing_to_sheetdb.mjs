/**
 * Rasi Foundation — Safe Legacy Scholarship Data Audit & SheetDB Reconciliation Script
 *
 * Usage:
 *   node scripts/sync_existing_to_sheetdb.mjs              # Safe read-only dry-run audit (default)
 *   node scripts/sync_existing_to_sheetdb.mjs --dry-run    # Safe read-only dry-run audit
 *   node scripts/sync_existing_to_sheetdb.mjs --apply      # Reconcile missing records to SheetDB
 *
 * Safety Guarantees:
 *   - Defaults to `--dry-run` (zero writes to SheetDB or MongoDB unless `--apply` is passed).
 *   - Checks SheetDB via `searchRow` BEFORE inserting so duplicate rows are never created.
 *   - Verifies student-to-result and result-to-feedback reference relationships.
 *   - Never deletes existing MongoDB records (`ScholarshipStudent`, `TestSession`, `ScholarshipExamFeedback`).
 *   - Never writes student PII backups into tracked repository directories.
 *   - Never prints student PII (names, mobiles, emails, Aadhaar) or secret values to stdout/stderr.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

import { sanitizeMongoUri } from '../src/backend/lib/mongodb.js';
import ScholarshipStudent from '../src/backend/models/ScholarshipStudent.js';
import TestSession from '../src/backend/models/TestSession.js';
import ScholarshipExamFeedback from '../src/backend/models/ScholarshipExamFeedback.js';
import SheetDBSyncJob from '../src/backend/models/SheetDBSyncJob.js';
import { SHEETDB_CONFIG } from '../src/backend/lib/sheetdb/sheetdb.config.js';
import { searchRow, appendRowWithReconcile } from '../src/backend/lib/sheetdb/sheetdb.service.js';
import {
    mapStudentToSheetRow,
    mapResultToSheetRow,
    mapFeedbackToSheetRow,
} from '../src/backend/lib/sheetdb/sheetdb.mappings.js';

const applyMode = process.argv.includes('--apply');

async function main() {
    console.log('===================================================================');
    console.log(' RASI FOUNDATION — LEGACY SCHOLARSHIP AUDIT & SHEETDB RECONCILIATION');
    console.log(` Mode: ${applyMode ? 'APPLY (Safe Idempotent Reconciliation)' : 'DRY-RUN (Read-Only Audit)'}`);
    console.log('===================================================================');

    const rawMongoUri = process.env.MONGODB_URI;
    if (!rawMongoUri) {
        console.error('[ERROR] MONGODB_URI is not configured in environment.');
        process.exit(1);
    }

    const configStatus = SHEETDB_CONFIG.getStatus();
    console.log('[SheetDB Config Status]:', JSON.stringify({
        urlConfigured: configStatus.urlConfigured,
        basicAuthConfigured: configStatus.basicAuthConfigured,
        cronSecretConfigured: configStatus.cronSecretConfigured,
        endpoint: SHEETDB_CONFIG.getSanitizedUrl() || 'not_set',
    }));

    const cleanUri = sanitizeMongoUri(rawMongoUri);
    const hasCredentials = /^mongodb(\+srv)?:\/\/[^/]+@/.test(cleanUri);
    const hasAuthSource = /[?&]authSource=/i.test(cleanUri);

    await mongoose.connect(cleanUri, {
        ...(hasCredentials && !hasAuthSource ? { authSource: 'admin' } : {}),
    });

    const [students, sessions, feedbacks, syncJobs] = await Promise.all([
        ScholarshipStudent.find().sort({ createdAt: 1 }).lean(),
        TestSession.find().sort({ createdAt: 1 }).lean(),
        ScholarshipExamFeedback.find().sort({ createdAt: 1 }).lean(),
        SheetDBSyncJob.find().sort({ createdAt: 1 }).lean(),
    ]);

    const studentById = new Map(students.map((s) => [String(s._id), s]));
    const sessionById = new Map(sessions.map((s) => [String(s._id), s]));

    // 1. Detect duplicate candidates inside legacy MongoDB by mobile, email, or registrationToken
    const seenMobiles = new Map();
    const seenEmails = new Map();
    const seenTokens = new Map();
    const duplicateCandidateTokens = new Set();

    for (const s of students) {
        const tok = String(s.registrationToken || '').trim().toUpperCase();
        const mob = String(s.studentMobile || '').replace(/\D/g, '');
        const eml = String(s.studentEmail || '').trim().toLowerCase();

        if (tok) {
            if (seenTokens.has(tok)) duplicateCandidateTokens.add(tok);
            seenTokens.set(tok, String(s._id));
        }
        if (mob) {
            if (seenMobiles.has(mob)) duplicateCandidateTokens.add(tok || String(s._id));
            seenMobiles.set(mob, String(s._id));
        }
        if (eml) {
            if (seenEmails.has(eml)) duplicateCandidateTokens.add(tok || String(s._id));
            seenEmails.set(eml, String(s._id));
        }
    }

    // 2. Verify session -> student and feedback -> session relationship integrity
    let orphanedCompletedSessions = 0;
    const completedSessions = sessions.filter((s) => s.status === 'completed');
    for (const sess of completedSessions) {
        if (sess.studentId && !studentById.has(String(sess.studentId))) {
            orphanedCompletedSessions++;
        }
    }

    let orphanedFeedbacks = 0;
    for (const fb of feedbacks) {
        if (fb.testSessionId && !sessionById.has(String(fb.testSessionId))) {
            orphanedFeedbacks++;
        }
    }

    // 3. Reconcile / Audit Students against SheetDB
    let alreadyPresentStudents = 0;
    let reconciledStudents = 0;
    let pendingMigrationStudents = 0;
    let failedStudents = 0;
    let sheetdbProbeError = null;

    for (const student of students) {
        const token = String(student.registrationToken || '').trim();
        const check = await searchRow('Scholarship_Students', 'application_number', token);

        if (!check.success) {
            sheetdbProbeError = `[${check.errorCode || 'ERROR'}] HTTP ${check.statusCode || 0}: ${check.error}`;
            if (student.sheetdbSynced) {
                // Previously confirmed synced via SheetDBSyncJob; probe failed (e.g. local env lacks Vercel Basic Auth keys)
                alreadyPresentStudents++;
            } else {
                pendingMigrationStudents++;
                failedStudents++;
            }
            continue;
        }

        if (check.found) {
            if (check.records.length > 1) {
                duplicateCandidateTokens.add(token);
            }
            alreadyPresentStudents++;
            if (applyMode && !student.sheetdbSynced) {
                await ScholarshipStudent.updateOne(
                    { _id: student._id },
                    { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
                );
            }
            continue;
        }

        if (!applyMode) {
            pendingMigrationStudents++;
            continue;
        }

        const payload = mapStudentToSheetRow(student);
        const writeRes = await appendRowWithReconcile('Scholarship_Students', payload, {
            uniqueColumn: 'application_number',
            uniqueValue: token,
        });

        if (writeRes.success) {
            await ScholarshipStudent.updateOne(
                { _id: student._id },
                { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
            );
            reconciledStudents++;
        } else {
            pendingMigrationStudents++;
            failedStudents++;
        }
    }

    // 4. Reconcile / Audit Completed Sessions against Scholarship_Results
    let alreadyPresentResults = 0;
    let reconciledResults = 0;
    let pendingResults = 0;
    let failedResults = 0;

    for (const session of completedSessions) {
        const refId = String(session._id);
        const check = await searchRow('Scholarship_Results', 'result_reference_id', refId);

        if (!check.success) {
            if (session.sheetdbSynced) {
                alreadyPresentResults++;
            } else {
                pendingResults++;
                failedResults++;
            }
            continue;
        }

        if (check.found) {
            alreadyPresentResults++;
            if (applyMode && !session.sheetdbSynced) {
                await TestSession.updateOne(
                    { _id: session._id },
                    { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
                );
            }
            continue;
        }

        if (!applyMode) {
            pendingResults++;
            continue;
        }

        const student = session.studentId ? studentById.get(String(session.studentId)) : {};
        const payload = mapResultToSheetRow(session, student || {});
        const writeRes = await appendRowWithReconcile('Scholarship_Results', payload, {
            uniqueColumn: 'result_reference_id',
            uniqueValue: refId,
        });

        if (writeRes.success) {
            await TestSession.updateOne(
                { _id: session._id },
                { $set: { sheetdbSynced: true, sheetdbSyncedAt: new Date() } }
            );
            reconciledResults++;
        } else {
            pendingResults++;
            failedResults++;
        }
    }

    // 5. Audit Sync Queue Jobs
    const jobStatusCounts = syncJobs.reduce((acc, j) => {
        acc[j.status] = (acc[j.status] || 0) + 1;
        return acc;
    }, {});

    const report = {
        mode: applyMode ? 'apply' : 'dry-run',
        students: {
            totalExistingStudents: students.length,
            successfullyReconciled: reconciledStudents,
            alreadyPresentInSheetDB: alreadyPresentStudents,
            pendingMigration: pendingMigrationStudents,
            failedRecords: failedStudents,
            duplicateCandidates: duplicateCandidateTokens.size,
        },
        completedResults: {
            totalCompletedSessions: completedSessions.length,
            successfullyReconciled: reconciledResults,
            alreadyPresentInSheetDB: alreadyPresentResults,
            pendingMigration: pendingResults,
            failedRecords: failedResults,
            orphanedStudentRefs: orphanedCompletedSessions,
        },
        feedback: {
            totalExistingFeedback: feedbacks.length,
            orphanedSessionRefs: orphanedFeedbacks,
        },
        syncJobsQueue: {
            totalJobs: syncJobs.length,
            byStatus: jobStatusCounts,
        },
        liveSheetDBProbeWarning: sheetdbProbeError,
    };

    console.log('\n--- MIGRATION & RECONCILIATION REPORT (PII-FREE) ---');
    console.log(JSON.stringify(report, null, 2));

    await mongoose.disconnect();
}

main().catch((err) => {
    console.error('[Migration Audit Error]:', err?.name || 'Error', err?.message || '');
    process.exit(1);
});
