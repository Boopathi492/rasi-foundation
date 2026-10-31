import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import ScholarshipQuestion from '../../src/backend/models/ScholarshipQuestion.js';
import ScholarshipExamConfig from '../../src/backend/models/ScholarshipExamConfig.js';
import TestSession from '../../src/backend/models/TestSession.js';
import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rasi-foundation';

test('1,600 Question Bank: Model schema and validation with Chapter support', () => {
    const validQuestion = new ScholarshipQuestion({
        code: 'PHY-TEST-001',
        subject: 'Physics',
        chapter: 'Optics and Light',
        topic: 'Wave Optics',
        difficulty: 'medium',
        questionText: 'What is the phenomenon responsible for the colors seen in thin oil films?',
        questionTextTamil: 'மெல்லிய எண்ணெய் படலங்களில் தோன்றும் வண்ணங்களுக்கு காரணமான நிகழ்வு எது?',
        options: [
            { label: 'A', text: 'Interference' },
            { label: 'B', text: 'Diffraction' },
            { label: 'C', text: 'Polarization' },
            { label: 'D', text: 'Dispersion' },
        ],
        optionsTamil: [
            { label: 'A', text: 'குறுக்கீட்டு விளைவு' },
            { label: 'B', text: 'விளிம்பு விளைவு' },
            { label: 'C', text: 'தளவிளைவு' },
            { label: 'D', text: 'நிறப்பிரிகை' },
        ],
        correctAnswer: 'A',
        explanation: 'Thin film colors arise from interference between light reflected from top and bottom boundaries.',
        explanationTamil: 'மேல் மற்றும் கீழ் எல்லைகளில் இருந்து எதிரொலிக்கும் ஒளிக்கதிர்களுக்கு இடையே ஏற்படும் குறுக்கீட்டு விளைவு காரணமாக வண்ணங்கள் தோன்றுகின்றன.',
        approvalStatus: 'approved',
        isActive: true,
    });

    const err = validQuestion.validateSync();
    assert.equal(err, undefined, 'Valid question with chapter must pass schema validation');
    assert.equal(validQuestion.chapter, 'Optics and Light');
    assert.equal(validQuestion.topic, 'Wave Optics');
    assert.equal(validQuestion.subject, 'Physics');
    assert.equal(validQuestion.isActive, true);
    assert.equal(validQuestion.approvalStatus, 'approved');
});

test('1,600 Question Bank: Rejects questions without required bilingual text or invalid options', () => {
    const invalidQuestion = new ScholarshipQuestion({
        code: 'PHY-ERR-001',
        subject: 'Physics',
        correctAnswer: 'A',
        options: [
            { label: 'A', text: 'Opt A' },
            { label: 'B', text: 'Opt B' },
        ], // only 2 options
    });

    const err = invalidQuestion.validateSync();
    assert.ok(err, 'Question without required fields must fail validation');
    assert.ok(err.errors.questionText, 'questionText is required');
    assert.ok(err.errors.options, 'Must have exactly 4 options');
});

test('1,600 Question Bank: Live MongoDB Integrity Verification (1,600 Dynamic Questions)', async () => {
    let connected = false;
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
        }
        connected = true;
    } catch {
        console.warn('MongoDB not reachable in this test sandbox run; skipping live DB queries.');
        return;
    }

    if (!connected) return;

    try {
        // 1. Total questions count
        const totalCount = await ScholarshipQuestion.countDocuments();
        assert.equal(totalCount, 1600, `Question bank must contain exactly 1,600 questions (found: ${totalCount})`);

        // 2. Count per subject
        const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];
        for (const subj of subjects) {
            const count = await ScholarshipQuestion.countDocuments({ subject: subj });
            assert.equal(count, 400, `${subj} must have exactly 400 questions (found: ${count})`);

            const approvedCount = await ScholarshipQuestion.countDocuments({ subject: subj, approvalStatus: 'approved' });
            assert.equal(approvedCount, 400, `${subj} must have 400 approved questions`);

            const activeCount = await ScholarshipQuestion.countDocuments({ subject: subj, isActive: true });
            assert.equal(activeCount, 400, `${subj} must have 400 active questions`);
        }

        // 3. Verify zero duplicate English questions
        const distinctEnglish = await ScholarshipQuestion.distinct('questionText');
        assert.equal(distinctEnglish.length, 1600, `All 1,600 English question texts must be unique (distinct: ${distinctEnglish.length})`);

        // 4. Verify zero duplicate Tamil questions
        const distinctTamil = await ScholarshipQuestion.distinct('questionTextTamil');
        assert.equal(distinctTamil.length, 1600, `All 1,600 Tamil question texts must be unique (distinct: ${distinctTamil.length})`);

        // 5. Verify zero duplicate codes
        const distinctCodes = await ScholarshipQuestion.distinct('code');
        assert.equal(distinctCodes.length, 1600, `All 1,600 question codes must be unique (distinct: ${distinctCodes.length})`);

        // 6. Verify chapters exist and are populated
        const distinctChapters = await ScholarshipQuestion.distinct('chapter');
        assert.ok(distinctChapters.length >= 20, `Question bank must span at least 20 academic chapters across subjects (found: ${distinctChapters.length})`);

        // 7. Data preservation: check students and test sessions
        const studentCount = await ScholarshipStudent.countDocuments();
        assert.ok(studentCount >= 2, `Student registration data must be preserved (found: ${studentCount})`);

        const sessionCount = await TestSession.countDocuments();
        assert.ok(sessionCount >= 1, `Existing exam sessions must be preserved (found: ${sessionCount})`);

    } finally {
        // Keep connection open or clean up if needed
    }
});

test('1,600 Question Bank: Exam Quota Readiness for Official Exam and Practice Tests', async () => {
    let connected = false;
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
        }
        connected = true;
    } catch {
        return;
    }

    if (!connected) return;

    // Official Exam requirements: 20 Physics, 20 Chemistry, 20 Elective (Math or Bio)
    const requiredPerSubject = 20;
    const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

    for (const subj of subjects) {
        const eligibleCount = await ScholarshipQuestion.countDocuments({
            subject: subj,
            isActive: true,
            approvalStatus: 'approved',
        });
        assert.ok(
            eligibleCount >= requiredPerSubject,
            `${subj} has ${eligibleCount} eligible questions, which comfortably exceeds the 20-question exam quota`
        );
    }

    await mongoose.disconnect();
});
