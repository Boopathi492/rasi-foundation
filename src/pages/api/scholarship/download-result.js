import dbConnect from '../../../backend/lib/mongodb.js';
import {
    findScholarshipStudentByToken,
    findScholarshipResult,
} from '../../../backend/lib/sheetdb/index.js';
import { buildPdf } from '../../../backend/lib/pdf.js';
import { setNoCacheHeaders } from '../../../backend/lib/apiSecurity.js';
import { authorizeScholarshipRequest } from '../../../backend/lib/scholarshipAuth.js';

export default async function handler(req, res) {
    setNoCacheHeaders(res);
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const rawToken = req.query?.token ? String(req.query.token).trim().toUpperCase() : '';
        const rawSession = req.query?.session ? String(req.query.session).trim() : '';

        if (!rawToken && !rawSession) {
            return res.status(400).json({
                success: false,
                message: 'Registration token or session ID is required',
            });
        }

        try {
            if (process.env.MONGODB_URI) {
                await dbConnect();
            }
        } catch {
            // Authoritative scorecard and student record live in SheetDB
        }

        // 1. Fetch authoritative saved result from SheetDB `Scholarship_Results`
        const resultLookup = await findScholarshipResult({
            sessionId: rawSession || null,
            applicationNumber: rawToken || null,
        });

        if (!resultLookup.ok) {
            return res.status(resultLookup.statusCode || 503).json({
                success: false,
                errorCode: resultLookup.errorCode,
                message: 'Unable to retrieve scorecard from official storage right now.',
            });
        }

        if (!resultLookup.found || !resultLookup.result) {
            return res.status(404).json({
                success: false,
                message: 'Result not ready or scorecard record not found.',
            });
        }

        const savedResult = resultLookup.result;

        // 2. Enforce strict candidate ownership or RBAC admin permission (`scholarship_exam:view`)
        const auth = authorizeScholarshipRequest(req, {
            expectedApplicationNumber: savedResult.registrationToken,
            expectedStudentRef: savedResult.studentReferenceId || null,
            expectedSessionId: rawSession || null,
            allowAdminPermission: 'scholarship_exam:view',
        });

        if (!auth.ok) {
            return res.status(auth.statusCode).json({
                success: false,
                reason: auth.reason,
                message: auth.message,
            });
        }

        // 3. Load candidate summary from SheetDB `Scholarship_Students` (cached 60s)
        const stuLookup = savedResult.registrationToken
            ? await findScholarshipStudentByToken(savedResult.registrationToken)
            : { ok: true, found: false, student: null };
        const student = stuLookup.found ? stuLookup.student : null;

        const candidateName = student?.name || savedResult.candidateName || 'Candidate';
        const regToken = student?.registrationToken || savedResult.registrationToken || 'RASI';
        const safeFilenameToken = regToken.replace(/[^A-Za-z0-9_-]/g, '');

        const subjectRows = (savedResult.subjectWiseScores || []).map((item) => ({
            subject: String(item.subject || ''),
            total: String(item.total || 20),
            correct: String(item.correct || 0),
            percentage: `${Number(item.percentage || 0)}%`,
        }));

        const totalQ = savedResult.totalQuestions || 60;
        const maxMarks = savedResult.maximumMarks || totalQ;
        const totalScore = savedResult.score || 0;
        const pct = savedResult.percentage ?? (maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0);
        const maskedAadhaar = student?.maskedAadhaar || 'Not Provided';
        const examDateDisplay = savedResult.examDate || savedResult.submittedAt || new Date().toLocaleDateString('en-IN');

        // 4. Generate certified A4 PDF strictly from authoritative saved SheetDB result
        const pdfBuffer = buildPdf({
            title: 'SCHOLARSHIP EXAMINATION SCORE CARD',
            subtitle: `Candidate: ${candidateName} | Token: ${regToken}`,
            brand: 'RASI FOUNDATION — THINK ADMISSION! THINK RASI!!',
            generatedAt: new Date(),
            summary: [
                { label: 'Candidate Name', value: candidateName },
                { label: 'Application / Registration Token', value: regToken },
                { label: 'Result Reference ID', value: savedResult.resultReferenceId || 'N/A' },
                { label: 'Question Paper Language', value: savedResult.language || 'English' },
                { label: 'Examination Date', value: String(examDateDisplay) },
                { label: 'Total Questions', value: String(totalQ) },
                { label: 'Attempted Questions', value: String(savedResult.attemptedQuestions || 0) },
                { label: 'Correct Answers', value: String(savedResult.correctAnswers || 0) },
                { label: 'Total Score Obtained', value: `${totalScore} / ${maxMarks}` },
                { label: 'Percentage', value: `${pct}%` },
                { label: 'School / Institution', value: student?.lastStudiedSchool || 'N/A' },
                { label: 'Preferred College', value: student?.collegeName || 'N/A' },
                { label: 'Aadhaar (Masked)', value: maskedAadhaar },
            ],
            columns: [
                { header: 'Examination Subject', key: 'subject', width: 2.5 },
                { header: 'Total Questions', key: 'total', width: 1.5 },
                { header: 'Correct Answers', key: 'correct', width: 1.5 },
                { header: 'Subject Score %', key: 'percentage', width: 1.5 },
            ],
            rows: subjectRows,
            footer: 'Rasi Foundation Official Scholarship Examination Report • Certified Result • rasi-foundation.org',
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="rasi-scholarship-${safeFilenameToken}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        return res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error('[Scholarship Download Result PDF Error]:', error?.name || 'Error');
        return res.status(500).json({
            success: false,
            message: 'Failed to generate result PDF',
        });
    }
}
