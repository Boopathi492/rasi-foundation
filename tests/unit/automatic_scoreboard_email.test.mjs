import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateScorecardEmailHtml,
  sendScholarshipScorecardEmail,
  getEmailTransporter
} from '../../src/backend/lib/email.js';

test('Automatic Scoreboard Email - Transporter fallback is safe for test environment', () => {
  const transporter = getEmailTransporter();
  assert.ok(transporter, 'Transporter should be initialized');
});

test('Automatic Scoreboard Email - HTML Template includes required student details and scoreboard', () => {
  const html = generateScorecardEmailHtml({
    candidateName: 'Kavitha R',
    applicationNumber: 'RASI-2026-TEST-001',
    examDate: '04 Nov 2026',
    scoreboard: {
      totalQuestions: 60,
      correctAnswers: 52,
      wrongAnswers: 6,
      unattemptedQuestions: 2,
      totalMarks: 60,
      score: 52,
      percentage: 87,
    },
    subjectScores: [
      { subject: 'Physics', total: 20, correct: 18, percentage: 90 },
      { subject: 'Chemistry', total: 20, correct: 17, percentage: 85 },
      { subject: 'Mathematics', total: 20, correct: 17, percentage: 85 },
    ],
  });

  // Verify Branding & Title
  assert.ok(html.includes('RASI FOUNDATION'), 'Includes branding header');
  assert.ok(html.includes('SCHOLARSHIP EXAMINATION RESULT'), 'Includes main title');

  // Verify Student Information
  assert.ok(html.includes('Kavitha R'), 'Includes student name');
  assert.ok(html.includes('RASI-2026-TEST-001'), 'Includes application ID / token');
  assert.ok(html.includes('04 Nov 2026'), 'Includes examination date');
  assert.ok(html.includes('Completed'), 'Includes completion status');

  // Verify Scoreboard Metrics
  assert.ok(html.includes('60'), 'Includes total questions / marks');
  assert.ok(html.includes('52'), 'Includes score obtained / correct answers');
  assert.ok(html.includes('87%'), 'Includes percentage');
  assert.ok(html.includes('Physics'), 'Includes subject Physics');
  assert.ok(html.includes('Chemistry'), 'Includes subject Chemistry');
  assert.ok(html.includes('Mathematics'), 'Includes elective subject');

  // Verify PDF notice & official contact in footer
  assert.ok(html.includes('Certified PDF Scorecard Attached'), 'Includes PDF attachment notice');
  assert.ok(html.includes('rasipuramrasifoundation@gmail.com'), 'Includes official email in footer');
});

test('Automatic Scoreboard Email - Dispatches successfully with PDF attachment', async () => {
  const result = await sendScholarshipScorecardEmail({
    recipientEmail: 'student.test@example.com',
    candidateName: 'Kavitha R',
    applicationNumber: 'RASI-2026-TEST-001',
    examDate: '04 Nov 2026',
    resultReferenceId: 'res_test_123',
    language: 'English',
    preferredCollege: 'Government Engineering College, Salem',
    lastStudiedSchool: 'Government Higher Secondary School',
    scoreboard: {
      totalQuestions: 60,
      attemptedQuestions: 58,
      correctAnswers: 52,
      wrongAnswers: 6,
      unattemptedQuestions: 2,
      totalMarks: 60,
      score: 52,
      percentage: 87,
    },
    subjectScores: [
      { subject: 'Physics', total: 20, correct: 18, percentage: 90 },
      { subject: 'Chemistry', total: 20, correct: 17, percentage: 85 },
      { subject: 'Mathematics', total: 20, correct: 17, percentage: 85 },
    ],
  });

  assert.equal(result.success, true, 'Delivery should report success');
  assert.ok(result.messageId, 'Should generate a valid message ID');
  assert.equal(result.recipient, 'student.test@example.com');
});

test('Automatic Scoreboard Email - Safely rejects invalid or missing email without throwing', async () => {
  const invalidResult = await sendScholarshipScorecardEmail({
    recipientEmail: 'not-an-email',
    candidateName: 'Test Student',
    applicationNumber: 'RASI-INVALID',
    examDate: '04 Nov 2026',
    scoreboard: { totalQuestions: 60, score: 0 },
  });

  assert.equal(invalidResult.success, false);
  assert.equal(invalidResult.skipped, true);
  assert.equal(invalidResult.reason, 'INVALID_OR_MISSING_EMAIL');
});
