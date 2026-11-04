import nodemailer from 'nodemailer';
import { buildPdf } from './pdf.js';
import { CONTACT } from '../../data/siteConfig.js';

let cachedTransporter = null;

/**
 * Create or reuse nodemailer transporter with support for environment variables
 * and graceful fallback in local dev or test mode.
 */
export function getEmailTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
  } else {
    // Development / test fallback using stream/json transport so tests and local dev run smoothly
    cachedTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'windows',
      buffer: true,
    });
    cachedTransporter.__isMock = true;
  }

  return cachedTransporter;
}

/**
 * Generate Rasi Foundation branded HTML for scholarship scorecard email
 */
export function generateScorecardEmailHtml({ candidateName, applicationNumber, examDate, scoreboard, subjectScores }) {
  const brandGreen = '#1a472a';
  const brandDarkGreen = '#0f2918';
  const brandCrimson = '#c8102e';
  const brandGold = '#d4af37';

  const subjectRowsHtml = (subjectScores || []).map(s => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 10px 14px; font-weight: 600; color: #1f2937;">${s.subject || ''}</td>
      <td style="padding: 10px 14px; text-align: center; color: #4b5563;">${s.total ?? 20}</td>
      <td style="padding: 10px 14px; text-align: center; font-weight: 600; color: ${brandGreen};">${s.correct ?? 0}</td>
      <td style="padding: 10px 14px; text-align: right; font-weight: 700; color: #1f2937;">${s.percentage ?? 0}%</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Rasi Foundation – Scholarship Examination Result</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 24px 0;">
    <tr>
      <td align="center">
        <!-- Main Email Container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, ${brandGreen} 0%, ${brandDarkGreen} 100%); padding: 32px 24px; text-align: center; color: #ffffff;">
              <div style="font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: ${brandGold}; margin-bottom: 6px;">
                RASI FOUNDATION
              </div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.3; color: #ffffff;">
                SCHOLARSHIP EXAMINATION RESULT
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #e5e7eb; letter-spacing: 0.5px;">
                Official Verified Scorecard &amp; Performance Summary
              </p>
            </td>
          </tr>

          <!-- Candidate Details Card -->
          <tr>
            <td style="padding: 24px 28px 12px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #6b7280; width: 40%;">Student Name:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 700; color: #111827;">${candidateName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Application ID / Token:</td>
                  <td style="padding: 6px 0; font-size: 15px; font-weight: 700; color: ${brandCrimson}; font-family: monospace;">${applicationNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Examination Date:</td>
                  <td style="padding: 6px 0; font-size: 14px; color: #111827;">${examDate}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 14px; color: #6b7280;">Examination Status:</td>
                  <td style="padding: 6px 0; font-size: 13px; font-weight: 700; color: ${brandGreen};">
                    <span style="background-color: #d1fae5; color: #065f46; padding: 3px 10px; border-radius: 9999px;">Completed</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Key Metrics Scoreboard Highlights -->
          <tr>
            <td style="padding: 12px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="31%" style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; text-align: center;">
                    <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #047857; letter-spacing: 0.5px;">Score Obtained</div>
                    <div style="font-size: 26px; font-weight: 800; color: #065f46; margin-top: 4px;">${scoreboard.score} <span style="font-size: 14px; font-weight: 600; color: #6b7280;">/ ${scoreboard.totalMarks}</span></div>
                  </td>
                  <td width="3.5%"></td>
                  <td width="31%" style="background-color: #fefce8; border: 1px solid #fde047; border-radius: 12px; padding: 16px; text-align: center;">
                    <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #a16207; letter-spacing: 0.5px;">Percentage</div>
                    <div style="font-size: 26px; font-weight: 800; color: #854d0e; margin-top: 4px;">${scoreboard.percentage}%</div>
                  </td>
                  <td width="3.5%"></td>
                  <td width="31%" style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 16px; text-align: center;">
                    <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #1d4ed8; letter-spacing: 0.5px;">Accuracy</div>
                    <div style="font-size: 26px; font-weight: 800; color: #1e40af; margin-top: 4px;">${scoreboard.correctAnswers} / ${scoreboard.attemptedQuestions || scoreboard.totalQuestions}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Detailed Scoreboard Breakdown Table -->
          <tr>
            <td style="padding: 16px 28px;">
              <div style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                Examination Scoreboard
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; border-collapse: collapse;">
                <tr style="background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px 14px; font-size: 14px; color: #4b5563;">TOTAL QUESTIONS</td>
                  <td style="padding: 10px 14px; font-size: 15px; font-weight: 700; text-align: right; color: #111827;">${scoreboard.totalQuestions}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px 14px; font-size: 14px; color: #4b5563;">CORRECT ANSWERS</td>
                  <td style="padding: 10px 14px; font-size: 15px; font-weight: 700; text-align: right; color: ${brandGreen};">${scoreboard.correctAnswers}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px 14px; font-size: 14px; color: #4b5563;">INCORRECT ANSWERS</td>
                  <td style="padding: 10px 14px; font-size: 15px; font-weight: 700; text-align: right; color: ${brandCrimson};">${scoreboard.wrongAnswers}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px 14px; font-size: 14px; color: #4b5563;">UNANSWERED</td>
                  <td style="padding: 10px 14px; font-size: 15px; font-weight: 700; text-align: right; color: #6b7280;">${scoreboard.unattemptedQuestions}</td>
                </tr>
                <tr style="border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 10px 14px; font-size: 14px; color: #4b5563;">TOTAL MARKS</td>
                  <td style="padding: 10px 14px; font-size: 15px; font-weight: 700; text-align: right; color: #111827;">${scoreboard.totalMarks}</td>
                </tr>
                <tr style="background-color: #f0fdf4; border-bottom: 1px solid #e5e7eb;">
                  <td style="padding: 12px 14px; font-size: 15px; font-weight: 700; color: ${brandGreen};">SCORE OBTAINED</td>
                  <td style="padding: 12px 14px; font-size: 16px; font-weight: 800; text-align: right; color: ${brandGreen};">${scoreboard.score}</td>
                </tr>
                <tr style="background-color: #fefce8;">
                  <td style="padding: 12px 14px; font-size: 15px; font-weight: 700; color: #854d0e;">PERCENTAGE</td>
                  <td style="padding: 12px 14px; font-size: 16px; font-weight: 800; text-align: right; color: #854d0e;">${scoreboard.percentage}%</td>
                </tr>
              </table>
            </td>
          </tr>

          ${subjectScores && subjectScores.length > 0 ? `
          <!-- Subject-wise performance -->
          <tr>
            <td style="padding: 8px 28px 16px 28px;">
              <div style="font-size: 14px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                Subject-Wise Performance
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f3f4f6; border-bottom: 2px solid #e5e7eb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #4b5563;">
                    <th style="padding: 10px 14px; text-align: left;">Subject</th>
                    <th style="padding: 10px 14px; text-align: center;">Total</th>
                    <th style="padding: 10px 14px; text-align: center;">Correct</th>
                    <th style="padding: 10px 14px; text-align: right;">Score %</th>
                  </tr>
                </thead>
                <tbody>
                  ${subjectRowsHtml}
                </tbody>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- PDF Scorecard Notice -->
          <tr>
            <td style="padding: 12px 28px 24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ecfdf5; border: 1px dashed #059669; border-radius: 10px; padding: 14px;">
                <tr>
                  <td>
                    <div style="font-weight: 700; color: #065f46; font-size: 14px;">
                      Certified PDF Scorecard Attached
                    </div>
                    <div style="font-size: 13px; color: #047857; margin-top: 4px;">
                      An official, certified PDF copy of your examination scoreboard is attached to this email for your educational records and admission counselling.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 24px 28px; text-align: center; color: #6b7280; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 8px 0; font-weight: 700; color: #111827; font-size: 13px;">
                Thank you for participating in the Rasi Foundation Scholarship Examination.
              </p>
              <p style="margin: 0 0 12px 0;">
                For counselling assistance and admission guidance, contact our team:<br />
                <strong>Helpline:</strong> ${CONTACT.phoneDisplay} | <strong>Email:</strong> ${CONTACT.email}
              </p>
              <p style="margin: 0; font-size: 11px; color: #9ca3af;">
                Confidentiality Notice: This message and its attachments are intended solely for the registered candidate.
                If you received this in error, please notify ${CONTACT.email} and delete it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send scholarship scoreboard email with attached PDF scorecard
 * Safe & Idempotent: Never throws unhandled errors; returns structured status.
 */
export async function sendScholarshipScorecardEmail({
  recipientEmail,
  candidateName,
  applicationNumber,
  examDate,
  scoreboard,
  subjectScores,
  resultReferenceId,
  language = 'English',
  preferredCollege = 'N/A',
  lastStudiedSchool = 'N/A',
}) {
  const cleanEmail = String(recipientEmail || '').trim().toLowerCase();
  if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return {
      success: false,
      skipped: true,
      reason: 'INVALID_OR_MISSING_EMAIL',
      message: 'No valid recipient email address provided',
    };
  }

  const subject = 'Rasi Foundation – Your Scholarship Examination Result & Scorecard';

  try {
    // 1. Generate certified A4 PDF Scorecard
    const totalQ = scoreboard.totalQuestions || 60;
    const maxMarks = scoreboard.totalMarks || totalQ;
    const totalScore = scoreboard.score ?? 0;
    const pct = scoreboard.percentage ?? (maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0);

    const pdfSubjectRows = (subjectScores || []).map(s => ({
      subject: String(s.subject || ''),
      total: String(s.total ?? 20),
      correct: String(s.correct ?? 0),
      percentage: `${Number(s.percentage ?? 0)}%`,
    }));

    const pdfBuffer = buildPdf({
      title: 'SCHOLARSHIP EXAMINATION SCORE CARD',
      subtitle: `Candidate: ${candidateName} | Token: ${applicationNumber}`,
      brand: 'RASI FOUNDATION — THINK ADMISSION! THINK RASI!!',
      generatedAt: new Date(),
      summary: [
        { label: 'Candidate Name', value: candidateName },
        { label: 'Application / Registration Token', value: applicationNumber },
        { label: 'Result Reference ID', value: resultReferenceId || 'N/A' },
        { label: 'Question Paper Language', value: language },
        { label: 'Examination Date', value: String(examDate) },
        { label: 'Total Questions', value: String(totalQ) },
        { label: 'Attempted Questions', value: String(scoreboard.attemptedQuestions ?? 0) },
        { label: 'Correct Answers', value: String(scoreboard.correctAnswers ?? 0) },
        { label: 'Incorrect Answers', value: String(scoreboard.wrongAnswers ?? 0) },
        { label: 'Unanswered Questions', value: String(scoreboard.unattemptedQuestions ?? 0) },
        { label: 'Total Score Obtained', value: `${totalScore} / ${maxMarks}` },
        { label: 'Percentage', value: `${pct}%` },
        { label: 'School / Institution', value: lastStudiedSchool },
        { label: 'Preferred College', value: preferredCollege },
      ],
      columns: [
        { header: 'Examination Subject', key: 'subject', width: 2.5 },
        { header: 'Total Questions', key: 'total', width: 1.5 },
        { header: 'Correct Answers', key: 'correct', width: 1.5 },
        { header: 'Subject Score %', key: 'percentage', width: 1.5 },
      ],
      rows: pdfSubjectRows,
      footer: 'Rasi Foundation Official Scholarship Examination Report • Certified Result • rasi-foundation.org',
    });

    // 2. Generate HTML body
    const htmlBody = generateScorecardEmailHtml({
      candidateName,
      applicationNumber,
      examDate,
      scoreboard: {
        totalQuestions: totalQ,
        attemptedQuestions: scoreboard.attemptedQuestions ?? 0,
        correctAnswers: scoreboard.correctAnswers ?? 0,
        wrongAnswers: scoreboard.wrongAnswers ?? 0,
        unattemptedQuestions: scoreboard.unattemptedQuestions ?? 0,
        totalMarks: maxMarks,
        score: totalScore,
        percentage: pct,
      },
      subjectScores,
    });

    // 3. Dispatch email
    const transporter = getEmailTransporter();
    const fromAddress = process.env.SMTP_FROM || `Rasi Foundation <${CONTACT.email || 'noreply@rasi-foundation.org'}>`;

    const mailOptions = {
      from: fromAddress,
      to: cleanEmail,
      subject,
      html: htmlBody,
      attachments: [
        {
          filename: `rasi-scholarship-${applicationNumber.replace(/[^A-Za-z0-9_-]/g, '')}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    const messageId = info?.messageId || `msg_${Date.now()}`;

    return {
      success: true,
      messageId,
      recipient: cleanEmail,
      simulated: Boolean(transporter.__isMock),
    };
  } catch (err) {
    console.error('[Scorecard Email Delivery Error]:', err.message);
    return {
      success: false,
      error: err.message,
      recipient: cleanEmail,
    };
  }
}
