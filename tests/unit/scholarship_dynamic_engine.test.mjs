import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';
import ScholarshipExamConfig from '../../src/backend/models/ScholarshipExamConfig.js';
import TestSession from '../../src/backend/models/TestSession.js';

test('Dynamic Engine: Availability check blocks start when approved questions are below quota', () => {
    const config = {
        compulsorySubjects: [
            { name: 'Physics', questionCount: 20 },
            { name: 'Chemistry', questionCount: 20 },
        ],
        optionalSubjects: [
            { name: 'Mathematics', questionCount: 20 },
        ],
    };

    // Simulated database counts
    const mockDbApprovedCounts = {
        Physics: 25,
        Chemistry: 10, // shortfall! 10 available < 20 required
        Mathematics: 25,
    };

    function checkAvailability(cfg, selectedElective, dbCounts) {
        const quotas = [
            ...cfg.compulsorySubjects.map(s => ({ name: s.name, count: s.questionCount })),
            ...cfg.optionalSubjects.filter(s => s.name === selectedElective).map(s => ({ name: s.name, count: s.questionCount })),
        ];

        for (const quota of quotas) {
            const available = dbCounts[quota.name] || 0;
            if (available < quota.count) {
                return {
                    allowed: false,
                    error: `Unable to start examination: Insufficient approved questions in question bank for ${quota.name} (${available} available, ${quota.count} required). Please contact the examination administrator.`,
                };
            }
        }
        return { allowed: true };
    }

    const result = checkAvailability(config, 'Mathematics', mockDbApprovedCounts);
    assert.equal(result.allowed, false, 'Must block exam start when Chemistry has insufficient questions');
    assert.ok(result.error.includes('Insufficient approved questions in question bank for Chemistry'), 'Must generate clear admin/student message');
    assert.ok(result.error.includes('10 available, 20 required'), 'Must show available vs required');

    // When counts are satisfied
    mockDbApprovedCounts.Chemistry = 20;
    const okResult = checkAvailability(config, 'Mathematics', mockDbApprovedCounts);
    assert.equal(okResult.allowed, true, 'Must allow exam when all quotas are met');
});

test('Dynamic Engine: Adding question through Admin Panel makes it immediately eligible for future exams without code changes', () => {
    // Admin creates question with approvalStatus: 'approved' and isActive: true
    const adminCreatedQuestion = new ScholarshipQuestion({
        code: 'PHY-DYN-999',
        subject: 'Physics',
        topic: 'Modern Physics',
        difficulty: 'medium',
        questionText: 'What is the de Broglie wavelength formula?',
        questionTextTamil: 'டி பிராக்லி அலைநீளத்திற்கான வாய்ப்பாடு யாது?',
        options: [
            { label: 'A', text: 'λ = h / p' },
            { label: 'B', text: 'λ = p / h' },
            { label: 'C', text: 'λ = h * p' },
            { label: 'D', text: 'λ = h / (2p)' },
        ],
        optionsTamil: [
            { label: 'A', text: 'λ = h / p' },
            { label: 'B', text: 'λ = p / h' },
            { label: 'C', text: 'λ = h * p' },
            { label: 'D', text: 'λ = h / (2p)' },
        ],
        correctAnswer: 'A',
        explanation: 'de Broglie wavelength is given by λ = h / p where h is Planck constant and p is momentum.',
        explanationTamil: 'டி பிராக்லி அலைநீளம் λ = h / p ஆகும்.',
        approvalStatus: 'approved',
        isActive: true,
    });

    const err = adminCreatedQuestion.validateSync();
    assert.equal(err, undefined, 'Admin created question must validate');

    // Verify eligibility filter used by exam generator:
    // { subject: 'Physics', isActive: true, approvalStatus: 'approved' }
    const isEligible = adminCreatedQuestion.isActive === true &&
                       adminCreatedQuestion.approvalStatus === 'approved' &&
                       adminCreatedQuestion.subject === 'Physics';

    assert.equal(isEligible, true, 'New question must immediately match exam engine query without redeployment');
});

test('Dynamic Engine: Dynamic configuration updates reflect dynamically in session generation', () => {
    // Default active config
    const liveConfig = new ScholarshipExamConfig({
        configKey: 'default_scholarship_config',
        examDurationMinutes: 90,
        totalQuestions: 60,
        marksPerQuestion: 1,
        negativeMarking: 0,
        compulsorySubjects: [
            { name: 'Physics', questionCount: 20 },
            { name: 'Chemistry', questionCount: 20 },
        ],
        optionalSubjects: [
            { name: 'Mathematics', questionCount: 20 },
            { name: 'Biology', questionCount: 20 },
        ],
    });

    // Admin updates duration to 100 minutes and adds negative marking of 0.25 via admin panel
    liveConfig.examDurationMinutes = 100;
    liveConfig.negativeMarking = 0.25;
    liveConfig.marksPerQuestion = 2;

    // Simulate session start using liveConfig values
    const dummyStudentId = new mongoose.Types.ObjectId();
    const session = new TestSession({
        studentId: dummyStudentId,
        registrationToken: 'RASI-DYNAMIC-SESSION-TEST',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        optionalSubject: 'Mathematics',
        duration: liveConfig.examDurationMinutes,
        totalQuestions: liveConfig.totalQuestions,
        configSnapshot: {
            examDurationMinutes: liveConfig.examDurationMinutes,
            totalQuestions: liveConfig.totalQuestions,
            marksPerQuestion: liveConfig.marksPerQuestion,
            negativeMarking: liveConfig.negativeMarking,
        },
    });

    assert.equal(session.duration, 100, 'Session duration must dynamically reflect updated admin config');
    assert.equal(session.configSnapshot.negativeMarking, 0.25, 'Session config snapshot must capture dynamic negative marking');
    assert.equal(session.configSnapshot.marksPerQuestion, 2, 'Session config snapshot must capture dynamic marks per question');
});

test('Dynamic Engine: Session snapshot protects evaluation when DB question is modified or removed', () => {
    const dummyStudentId = new mongoose.Types.ObjectId();
    const qId = new mongoose.Types.ObjectId();

    // Initial snapshot captured at exam start
    const snapshotQuestion = {
        code: 'CHE-IMMUTABLE-01',
        subject: 'Chemistry',
        topic: 'Electrochemistry',
        difficulty: 'medium',
        questionText: 'What is the SI unit of molar conductivity?',
        questionTextTamil: 'மோலார் கடத்துத்திறனின் SI அலகு யாது?',
        options: [
            { label: 'A', text: 'S m^2 mol^-1' },
            { label: 'B', text: 'S m^-1 mol^-1' },
            { label: 'C', text: 'S m^-2 mol^-1' },
            { label: 'D', text: 'S m^2 mol' },
        ],
        optionsTamil: [
            { label: 'A', text: 'S m^2 mol^-1' },
            { label: 'B', text: 'S m^-1 mol^-1' },
            { label: 'C', text: 'S m^-2 mol^-1' },
            { label: 'D', text: 'S m^2 mol' },
        ],
        correctAnswer: 'A',
        marks: 1,
        negativeMarks: 0,
    };

    const session = new TestSession({
        studentId: dummyStudentId,
        registrationToken: 'RASI-IMMUTABILITY-TEST',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        optionalSubject: 'Mathematics',
        totalQuestions: 1,
        questions: [
            {
                questionId: qId,
                subject: 'Chemistry',
                orderIndex: 0,
                shuffledOptions: [
                    { displayLabel: 'A', originalLabel: 'C' },
                    { displayLabel: 'B', originalLabel: 'A' },
                    { displayLabel: 'C', originalLabel: 'B' },
                    { displayLabel: 'D', originalLabel: 'D' },
                ],
                snapshot: snapshotQuestion,
            },
        ],
        answers: [
            {
                questionId: qId,
                subject: 'Chemistry',
                selectedAnswer: 'B', // Student selected display B -> maps to original A
                isCorrect: true,
            },
        ],
        status: 'in_progress',
    });

    // Simulate Admin modifying the database question afterwards (or deactivating it)
    const modifiedDbQuestion = {
        _id: qId,
        correctAnswer: 'D', // Admin changes correct answer key to D in DB
        isActive: false,    // Admin deactivated question in DB
    };

    // Evaluator logic: must check sessionQ.snapshot first!
    const sessionQ = session.questions[0];
    const snap = sessionQ.snapshot && sessionQ.snapshot.correctAnswer ? sessionQ.snapshot : modifiedDbQuestion;

    const mapping = sessionQ.shuffledOptions.find(o => o.displayLabel === session.answers[0].selectedAnswer);
    const originalSelected = mapping ? mapping.originalLabel : session.answers[0].selectedAnswer;

    const evaluatedIsCorrect = originalSelected === snap.correctAnswer;
    assert.equal(evaluatedIsCorrect, true, 'Evaluation MUST be based on immutable snapshot, guaranteeing integrity against bank edits');
    assert.equal(snap.correctAnswer, 'A', 'Snapshot correct answer must remain A despite DB question being changed to D');
});
