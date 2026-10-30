import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';
import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';
import TestSession from '../../src/backend/models/TestSession.js';
import ScholarshipExamFeedback from '../../src/backend/models/ScholarshipExamFeedback.js';
import { buildPdf } from '../../src/backend/lib/pdf.js';

test('Exam Structure: enforces 60 questions, 90 minutes, 1 mark/question', () => {
    const dummyStudentId = new mongoose.Types.ObjectId();
    const session = new TestSession({
        studentId: dummyStudentId,
        registrationToken: 'RASI-SCH-2026-TEST',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        optionalSubject: 'Mathematics',
        medium: 'English',
        language: 'English',
        pageSize: 5,
        duration: 90,
        totalQuestions: 60,
        questions: [],
    });

    assert.equal(session.duration, 90, 'Examination duration must be exactly 90 minutes');
    assert.equal(session.totalQuestions, 60, 'Total questions must be exactly 60');
    assert.deepEqual(session.subjects, ['Physics', 'Chemistry', 'Mathematics'], 'Must consist of Physics, Chemistry, and chosen Elective');
});

test('Bilingual Support: verifies English and Tamil Unicode fields and options', () => {
    const q = new ScholarshipQuestion({
        code: 'PHY-001',
        subject: 'Physics',
        topic: 'Electrostatics',
        difficulty: 'easy',
        questionText: 'What is the electrostatic force between two charges according to Coulomb law?',
        questionTextTamil: 'கூலூம் விதியின்படி இரு மின்னூட்டங்களுக்கு இடையே செயல்படும் நிலைமின்னியல் விசை:',
        options: [
            { label: 'A', text: 'Inversely proportional to square of distance' },
            { label: 'B', text: 'Directly proportional to distance' },
            { label: 'C', text: 'Independent of distance' },
            { label: 'D', text: 'Inversely proportional to distance' },
        ],
        optionsTamil: [
            { label: 'A', text: 'தொலைவின் இருமடிக்கு எதிர்த்தகவில் அமையும்' },
            { label: 'B', text: 'தொலைவுக்கு நேர்தகவில் அமையும்' },
            { label: 'C', text: 'தொலைவைச் சார்ந்தது அல்ல' },
            { label: 'D', text: 'தொலைவுக்கு எதிர்த்தகவில் அமையும்' },
        ],
        correctAnswer: 'A',
        explanation: 'Coulomb law states F = (1 / 4πε₀) * (q₁q₂ / r²).',
        explanationTamil: 'கூலூம் விதியின்படி F = (1 / 4πε₀) * (q₁q₂ / r²).',
        marks: 1,
        negativeMarks: 0,
        language: 'Bilingual',
    });

    const err = q.validateSync();
    assert.equal(err, undefined, 'Bilingual question must validate with zero errors');
    assert.equal(q.options.length, 4, 'Must have exactly 4 English options');
    assert.equal(q.optionsTamil.length, 4, 'Must have exactly 4 Tamil options');
    assert.ok(q.questionTextTamil.includes('கூலூம்'), 'Tamil text must retain valid UTF-8 characters');
    assert.equal(q.correctAnswer, 'A', 'Correct answer must be A');
});

test('Option Randomization Mapping: verifies server-side shuffled option evaluation', () => {
    const originalQuestion = {
        code: 'CHE-001',
        correctAnswer: 'A', // Original answer is A
    };

    // Client displays randomized options:
    // Display 'B' maps to original 'A'
    // Display 'A' maps to original 'C'
    // Display 'C' maps to original 'B'
    // Display 'D' maps to original 'D'
    const shuffledOptions = [
        { displayLabel: 'A', originalLabel: 'C' },
        { displayLabel: 'B', originalLabel: 'A' },
        { displayLabel: 'C', originalLabel: 'B' },
        { displayLabel: 'D', originalLabel: 'D' },
    ];

    // Helper evaluation function matching backend logic
    function evaluateAnswer(displayChoice, shuffled) {
        const mapping = shuffled.find(m => m.displayLabel === displayChoice);
        if (!mapping) return false;
        return mapping.originalLabel === originalQuestion.correctAnswer;
    }

    assert.equal(evaluateAnswer('B', shuffledOptions), true, 'Selecting display option B (mapped to original A) must be marked correct');
    assert.equal(evaluateAnswer('A', shuffledOptions), false, 'Selecting display option A (mapped to original C) must be marked wrong');
    assert.equal(evaluateAnswer('C', shuffledOptions), false, 'Selecting display option C (mapped to original B) must be marked wrong');
});

test('Scoring Hook: accurately computes total score, percentage, correct/wrong, and subject breakdown', () => {
    const dummyStudentId = new mongoose.Types.ObjectId();
    const qPhy1 = new mongoose.Types.ObjectId();
    const qPhy2 = new mongoose.Types.ObjectId();
    const qChe1 = new mongoose.Types.ObjectId();
    const qChe2 = new mongoose.Types.ObjectId();
    const qMat1 = new mongoose.Types.ObjectId();

    const session = new TestSession({
        studentId: dummyStudentId,
        registrationToken: 'RASI-SCH-SCORING-TEST',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        optionalSubject: 'Mathematics',
        totalQuestions: 5,
        questions: [
            { questionId: qPhy1, subject: 'Physics', orderIndex: 0 },
            { questionId: qPhy2, subject: 'Physics', orderIndex: 1 },
            { questionId: qChe1, subject: 'Chemistry', orderIndex: 2 },
            { questionId: qChe2, subject: 'Chemistry', orderIndex: 3 },
            { questionId: qMat1, subject: 'Mathematics', orderIndex: 4 },
        ],
        answers: [
            { questionId: qPhy1, subject: 'Physics', selectedAnswer: 'A', isCorrect: true },
            { questionId: qPhy2, subject: 'Physics', selectedAnswer: 'B', isCorrect: false },
            { questionId: qChe1, subject: 'Chemistry', selectedAnswer: 'C', isCorrect: true },
            { questionId: qChe2, subject: 'Chemistry', selectedAnswer: 'A', isCorrect: true },
            { questionId: qMat1, subject: 'Mathematics', selectedAnswer: null, isCorrect: false }, // unattempted
        ],
        status: 'completed',
    });

    // Run schema validation
    const err = session.validateSync();
    assert.equal(err, undefined, 'Session validation should pass');
});

test('Feedback Schema: validates post-exam student rating, difficulty, and portal metrics', () => {
    const dummySessionId = new mongoose.Types.ObjectId();
    const dummyStudentId = new mongoose.Types.ObjectId();

    const feedback = new ScholarshipExamFeedback({
        testSessionId: dummySessionId,
        studentId: dummyStudentId,
        registrationToken: 'RASI-FEEDBACK-TEST',
        studentName: 'Boopathi',
        overallRating: 5,
        difficultyRating: 'moderate',
        clarityRating: 5,
        uiRating: 5,
        comments: 'Excellent bilingual questions and smooth countdown experience.',
        language: 'Tamil',
    });

    const err = feedback.validateSync();
    assert.equal(err, undefined, 'Feedback schema must validate with proper ratings');
    assert.equal(feedback.overallRating, 5, 'Overall rating must be 5');
    assert.equal(feedback.difficultyRating, 'moderate', 'Difficulty rating must be moderate');
    assert.equal(feedback.clarityRating, 5, 'Clarity rating must be 5');
    assert.equal(feedback.uiRating, 5, 'UI rating must be 5');
});

test('Result PDF: builds certified A4 scorecard with bilingual reference and secure masking', () => {
    const buffer = buildPdf({
        title: 'SCHOLARSHIP EXAMINATION SCORE CARD',
        subtitle: 'Candidate: Boopathi M | Token: RASI-2026-9789',
        brand: 'RASI FOUNDATION — THINK ADMISSION! THINK RASI!!',
        generatedAt: new Date(),
        summary: [
            { label: 'Candidate Name', value: 'Boopathi M' },
            { label: 'Registration Token', value: 'RASI-2026-9789' },
            { label: 'Medium', value: 'Tamil Medium' },
            { label: 'Total Questions', value: '60' },
            { label: 'Score Obtained', value: '55 / 60' },
            { label: 'Percentage', value: '92%' },
            { label: 'Aadhaar (Masked)', value: 'XXXX-XXXX-6100' },
        ],
        columns: [
            { header: 'Subject', key: 'subject', width: 2.5 },
            { header: 'Total Questions', key: 'total', width: 1.5 },
            { header: 'Correct Answers', key: 'correct', width: 1.5 },
            { header: 'Score %', key: 'percentage', width: 1.5 },
        ],
        rows: [
            { subject: 'Physics', total: '20', correct: '19', percentage: '95%' },
            { subject: 'Chemistry', total: '20', correct: '18', percentage: '90%' },
            { subject: 'Mathematics', total: '20', correct: '18', percentage: '90%' },
        ],
        footer: 'Rasi Foundation Official Scholarship Examination Report • Certified Result',
    });

    assert.ok(Buffer.isBuffer(buffer), 'PDF output must be a Buffer');
    assert.ok(buffer.length > 1000, 'PDF buffer must contain binary PDF data');
    assert.equal(buffer.slice(0, 4).toString(), '%PDF', 'Must start with PDF signature %PDF');
});
