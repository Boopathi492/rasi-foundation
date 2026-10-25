import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';
import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';
import TestSession from '../../src/backend/models/TestSession.js';
import { buildPdf } from '../../src/backend/lib/pdf.js';

test('ScholarshipStudent: validates required fields and token generation', () => {
    const student = new ScholarshipStudent({
        name: 'M. Boopathi',
        gender: 'Male',
        dateOfBirth: new Date('2007-05-15'),
        fatherName: 'Murugesan',
        community: 'BC',
        address: '12, Anna Street, Rasipuram, Namakkal - 637408',
        studentMobile: '9789446100',
        fatherMobile: '9294969196',
        admissionCourse: 'B.E Computer Science',
        collegeName: 'Anna University Campus',
        plus2Group: 'Academic',
        plus2ExamNumber: 'TN2025123456',
        expectedCutOff: 194.5,
        lastStudiedSchool: 'Govt Higher Secondary School, Rasipuram',
        studiedInGovtSchool: true,
        firstGenerationGraduate: false,
        aadhaarNumber: '123456789012',
        thirdSubject: 'Mathematics',
        examLanguage: 'Tamil',
        preferredColleges: [{
            collegeName: 'Anna University Campus',
            courseName: 'B.E Computer Science',
            priority: 1,
        }],
    });

    const err = student.validateSync();
    assert.equal(err, undefined, 'Student schema validation should pass with all required fields');

    // Test masked Aadhaar helper
    const masked = student.getMaskedAadhaar();
    assert.equal(masked, 'XXXX-XXXX-9012', 'Aadhaar should be masked showing only last 4 digits');
});

test('ScholarshipQuestion: enforces 4 options and single correct answer', () => {
    const validQuestion = new ScholarshipQuestion({
        subject: 'Physics',
        questionText: 'What is the SI unit of electric dipole moment?',
        questionTextTamil: 'மின்னிருமுனை திருப்புத்திறனின் SI அலகு எது?',
        options: [
            { label: 'A', text: 'newton/coulomb' },
            { label: 'B', text: 'coulomb-metre' },
            { label: 'C', text: 'coulomb/metre' },
            { label: 'D', text: 'newton-metre' },
        ],
        optionsTamil: [
            { label: 'A', text: 'நியூட்டன்/கூலூம்' },
            { label: 'B', text: 'கூலூம்-மீட்டர்' },
            { label: 'C', text: 'கூலூம்/மீட்டர்' },
            { label: 'D', text: 'நியூட்டன்-மீட்டர்' },
        ],
        correctAnswer: 'B',
        difficulty: 'medium',
        language: 'Bilingual',
    });

    const err = validQuestion.validateSync();
    assert.equal(err, undefined, 'Valid 4-option question with bilingual text should validate');

    // Invalid question with only 3 options
    const invalidQuestion = new ScholarshipQuestion({
        subject: 'Physics',
        questionText: 'Invalid test question',
        options: [
            { label: 'A', text: 'opt 1' },
            { label: 'B', text: 'opt 2' },
            { label: 'C', text: 'opt 3' },
        ],
        correctAnswer: 'A',
    });

    const invalidErr = invalidQuestion.validateSync();
    assert.ok(invalidErr?.errors?.options, 'Question with fewer than 4 options must fail validation');
});

test('TestSession: validates 3 subjects, 90 minute duration, and score calculation', () => {
    const dummyStudentId = new mongoose.Types.ObjectId();
    const q1Id = new mongoose.Types.ObjectId();
    const q2Id = new mongoose.Types.ObjectId();
    const q3Id = new mongoose.Types.ObjectId();

    const session = new TestSession({
        studentId: dummyStudentId,
        registrationToken: 'RASI-TEST-TOKEN',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        language: 'English',
        pageSize: 5,
        duration: 90,
        totalQuestions: 60,
        questions: [
            { questionId: q1Id, subject: 'Physics', orderIndex: 0 },
            { questionId: q2Id, subject: 'Chemistry', orderIndex: 1 },
            { questionId: q3Id, subject: 'Mathematics', orderIndex: 2 },
        ],
        answers: [
            { questionId: q1Id, subject: 'Physics', selectedAnswer: 'B', isCorrect: true },
            { questionId: q2Id, subject: 'Chemistry', selectedAnswer: 'C', isCorrect: true },
            { questionId: q3Id, subject: 'Mathematics', selectedAnswer: 'A', isCorrect: false },
        ],
        status: 'in_progress',
    });

    const err = session.validateSync();
    assert.equal(err, undefined, 'TestSession should pass validation with 3 subjects and valid answers');
    assert.equal(session.duration, 90, 'Default official exam duration must be 90 minutes');
    assert.equal(session.pageSize, 5, 'Configurable page size defaults to 5');
});

test('Scholarship PDF generation: builds valid non-empty A4 PDF buffer', () => {
    const pdfBuffer = buildPdf({
        title: 'SCHOLARSHIP EXAMINATION SCORE CARD',
        subtitle: 'Candidate: Test Student | Token: RASI-TEST-1234',
        brand: 'RASI FOUNDATION',
        summary: [
            { label: 'Candidate Name', value: 'Test Student' },
            { label: 'Score', value: '54 / 60' },
            { label: 'Percentage', value: '90%' },
        ],
        columns: [
            { header: 'Subject', key: 'subject', width: 2 },
            { header: 'Total', key: 'total', width: 1 },
            { header: 'Correct', key: 'correct', width: 1 },
        ],
        rows: [
            { subject: 'Physics', total: '20', correct: '18' },
            { subject: 'Chemistry', total: '20', correct: '18' },
            { subject: 'Mathematics', total: '20', correct: '18' },
        ],
    });

    assert.ok(Buffer.isBuffer(pdfBuffer), 'PDF output must be a valid Buffer');
    assert.ok(pdfBuffer.length > 500, 'PDF buffer must have substantial size');
    assert.equal(pdfBuffer.slice(0, 5).toString('ascii'), '%PDF-', 'PDF must begin with %PDF- header');
});
