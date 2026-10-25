import dbConnect from '@/lib/mongodb';
import ScholarshipStudent from '@/models/ScholarshipStudent';
import TestSession from '@/models/TestSession';
import { buildPdf } from '@/backend/lib/pdf';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { token, session } = req.query;

        if (!token && !session) {
            return res.status(400).json({
                success: false,
                message: 'Registration token or session ID is required',
            });
        }

        let testSession;
        let student;

        if (session) {
            testSession = await TestSession.findById(session);
            if (!testSession) {
                return res.status(404).json({ success: false, message: 'Examination session not found' });
            }
            student = await ScholarshipStudent.findById(testSession.studentId);
        } else {
            student = await ScholarshipStudent.findOne({ registrationToken: token });
            if (!student) {
                return res.status(404).json({ success: false, message: 'Candidate registration not found' });
            }
            testSession = await TestSession.findOne({ registrationToken: token });
        }

        if (!testSession || testSession.status !== 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Result not ready. Examination must be completed first.',
            });
        }

        // Calculate subject performance
        const subjectRows = [];
        testSession.subjects.forEach(subject => {
            const count = testSession.questions.filter(q => q.subject === subject).length || 20;
            const correct = testSession.subjectWiseScore?.[subject] || 0;
            const pct = count > 0 ? Math.round((correct / count) * 100) : 0;
            subjectRows.push({
                subject,
                total: String(count),
                correct: String(correct),
                percentage: `${pct}%`,
            });
        });

        const totalQ = testSession.totalQuestions || 60;
        const totalScore = testSession.score || 0;
        const pct = totalQ > 0 ? Math.round((totalScore / totalQ) * 100) : 0;

        let maskedAadhaar = 'Not Provided';
        if (student.aadhaarNumber) {
            const clean = String(student.aadhaarNumber).replace(/\D/g, '');
            maskedAadhaar = clean.length >= 4 ? `XXXX-XXXX-${clean.slice(-4)}` : 'XXXX';
        }

        const pdfBuffer = buildPdf({
            title: 'SCHOLARSHIP EXAMINATION SCORE CARD',
            subtitle: `Candidate: ${student.name} | Token: ${student.registrationToken}`,
            brand: 'RASI FOUNDATION — THINK ADMISSION! THINK RASI!!',
            generatedAt: new Date(),
            summary: [
                { label: 'Candidate Name', value: student.name },
                { label: 'Registration Token', value: student.registrationToken },
                { label: 'Question Paper Language', value: testSession.language || 'English' },
                { label: 'Examination Date', value: new Date(testSession.endTime || testSession.createdAt).toLocaleDateString('en-IN') },
                { label: 'Total Questions', value: String(totalQ) },
                { label: 'Attempted Questions', value: String(testSession.attemptedQuestions || 0) },
                { label: 'Correct Answers', value: String(testSession.correctAnswers || 0) },
                { label: 'Total Score Obtained', value: `${totalScore} / ${totalQ}` },
                { label: 'Percentage', value: `${pct}%` },
                { label: 'School / Institution', value: student.lastStudiedSchool || 'N/A' },
                { label: 'Preferred College', value: student.collegeName || 'N/A' },
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
        res.setHeader('Content-Disposition', `attachment; filename="rasi-scholarship-${student.registrationToken}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        return res.status(200).send(pdfBuffer);

    } catch (error) {
        console.error('Download result PDF error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate result PDF',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
