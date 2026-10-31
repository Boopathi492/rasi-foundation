import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

import {
    SCHOLARSHIP_STUDENTS_HEADERS,
    SCHOLARSHIP_RESULTS_HEADERS,
    SCHOLARSHIP_FEEDBACK_HEADERS,
    validateSheetPayload,
} from '../../src/backend/lib/sheetdb/sheetdb.schemas.js';
import {
    mapStudentToSheetRow,
    mapResultToSheetRow,
    mapFeedbackToSheetRow,
} from '../../src/backend/lib/sheetdb/sheetdb.mappings.js';
import SheetDBSyncJob from '../../src/backend/models/SheetDBSyncJob.js';
import ScholarshipStudent from '../../src/backend/models/ScholarshipStudent.js';
import TestSession from '../../src/backend/models/TestSession.js';
import ScholarshipExamFeedback from '../../src/backend/models/ScholarshipExamFeedback.js';

test('SheetDB Schema: Scholarship_Students tab has exactly 32 validated headers', () => {
    assert.equal(SCHOLARSHIP_STUDENTS_HEADERS.length, 32, 'Scholarship_Students must have exactly 32 columns');
    assert.equal(SCHOLARSHIP_STUDENTS_HEADERS[0], 'student_reference_id');
    assert.equal(SCHOLARSHIP_STUDENTS_HEADERS[1], 'application_number');
    assert.equal(SCHOLARSHIP_STUDENTS_HEADERS[12], 'masked_aadhaar');
    assert.equal(SCHOLARSHIP_STUDENTS_HEADERS[31], 'registration_date');
});

test('SheetDB Schema: Scholarship_Results tab has exactly 22 validated headers', () => {
    assert.equal(SCHOLARSHIP_RESULTS_HEADERS.length, 22, 'Scholarship_Results must have exactly 22 columns');
    assert.equal(SCHOLARSHIP_RESULTS_HEADERS[0], 'result_reference_id');
    assert.equal(SCHOLARSHIP_RESULTS_HEADERS[1], 'student_reference_id');
    assert.equal(SCHOLARSHIP_RESULTS_HEADERS[11], 'total_score');
    assert.equal(SCHOLARSHIP_RESULTS_HEADERS[21], 'submitted_at');
});

test('SheetDB Schema: Scholarship_Feedback tab has exactly 12 validated headers', () => {
    assert.equal(SCHOLARSHIP_FEEDBACK_HEADERS.length, 12, 'Scholarship_Feedback must have exactly 12 columns');
    assert.equal(SCHOLARSHIP_FEEDBACK_HEADERS[0], 'feedback_reference_id');
    assert.equal(SCHOLARSHIP_FEEDBACK_HEADERS[3], 'application_number');
    assert.equal(SCHOLARSHIP_FEEDBACK_HEADERS[11], 'submitted_at');
});

test('SheetDB Schema: Rejects payloads targeting unauthorized Sheet1 tab', () => {
    const invalidValidation = validateSheetPayload('Sheet1', {});
    assert.equal(invalidValidation.isValid, false);
    assert.ok(invalidValidation.error.includes('Unauthorized or unrecognized destination tab'));
});

test('SheetDB Mapping: Converts 6-step registration data into valid 32-column row', () => {
    const mockStudent = {
        _id: '6724a8f9b1c2d3e4f5061728',
        registrationToken: 'RASI-TEST-001',
        name: 'Kavitha S',
        gender: 'Female',
        dateOfBirth: new Date('2005-05-15'),
        fatherName: 'Sengottaiyan',
        community: 'BC',
        address: '45, Perundurai Road, Erode',
        studentMobile: '9876543210',
        studentEmail: 'kavitha@example.com',
        fatherMobile: '9876500000',
        motherMobile: '9876511111',
        aadhaarNumber: '123456789012',
        currentClass: '+2 / 12th Standard',
        academicYear: '2025-2026',
        board: 'Tamil Nadu State Board',
        plus2Group: 'Academic',
        plus2ExamNumber: '124987',
        expectedCutOff: 192.5,
        lastStudiedSchool: 'Govt Girls HSS, Erode',
        studiedInGovtSchool: true,
        firstGenerationGraduate: true,
        preferredDistrict: 'Coimbatore',
        collegeName: 'PSG College of Technology',
        admissionCourse: 'B.E Computer Science',
        preferredCollege2: 'CIT Coimbatore',
        preferredCourse2: 'B.Tech AI & Data Science',
        thirdSubject: 'Mathematics',
        examLanguage: 'Tamil',
        pageSize: 5,
        testStatus: 'registered',
        createdAt: new Date('2026-10-31T18:00:00Z'),
    };

    const row = mapStudentToSheetRow(mockStudent);
    const validation = validateSheetPayload('Scholarship_Students', row);

    assert.equal(validation.isValid, true, 'Mapped student row must pass strict 32-column validation');
    assert.equal(Object.keys(row).length, 32);
    assert.equal(row.student_reference_id, '6724a8f9b1c2d3e4f5061728');
    assert.equal(row.application_number, 'RASI-TEST-001');
    assert.equal(row.full_name, 'Kavitha S');
    assert.equal(row.masked_aadhaar, 'XXXX-XXXX-9012', 'Aadhaar must be strictly masked');
    assert.equal(row.studied_in_govt_school, 'Yes');
    assert.equal(row.first_generation_graduate, 'Yes');
    assert.equal(row.selected_elective, 'Mathematics');
    assert.equal(row.exam_medium, 'Tamil');
    assert.equal(row.questions_per_page, 5);
});

test('SheetDB Mapping: Converts scorecard summary into valid 22-column row', () => {
    const mockSession = {
        _id: 'session_777',
        studentId: 'student_123',
        registrationToken: 'RASI-TEST-001',
        candidateName: 'Kavitha S',
        studentMobile: '9876543210',
        selectedElective: 'Mathematics',
        language: 'English',
        totalQuestions: 60,
        attemptedQuestions: 58,
        correctAnswers: 52,
        wrongAnswers: 6,
        unattemptedQuestions: 2,
        score: 52,
        percentage: 87,
        subjectWiseScore: {
            Physics: 18,
            Chemistry: 17,
            Mathematics: 17,
        },
        duration: 85,
        status: 'completed',
        startTime: new Date('2026-10-31T10:00:00Z'),
        endTime: new Date('2026-10-31T11:25:00Z'),
    };

    const row = mapResultToSheetRow(mockSession, { name: 'Kavitha S', studentMobile: '9876543210' });
    const validation = validateSheetPayload('Scholarship_Results', row);

    assert.equal(validation.isValid, true, 'Mapped result row must pass strict 22-column validation');
    assert.equal(Object.keys(row).length, 22);
    assert.equal(row.result_reference_id, 'session_777');
    assert.equal(row.total_score, 52);
    assert.equal(row.maximum_marks, 60);
    assert.equal(row.physics_score, 18);
    assert.equal(row.chemistry_score, 17);
    assert.equal(row.elective_score, 17);
    assert.equal(row.time_taken_minutes, 85);
    assert.equal(row.result_status, 'completed');
});

test('SheetDB Mapping: Converts feedback into valid 12-column row', () => {
    const mockFeedback = {
        _id: 'feedback_999',
        studentId: 'student_123',
        testSessionId: 'session_777',
        registrationToken: 'RASI-TEST-001',
        studentName: 'Kavitha S',
        overallRating: 5,
        difficultyRating: 'moderate',
        clarityRating: 5,
        uiRating: 5,
        comments: 'Excellent bilingual questions and smooth exam interface.',
        language: 'Tamil',
        createdAt: new Date('2026-10-31T11:30:00Z'),
    };

    const row = mapFeedbackToSheetRow(mockFeedback);
    const validation = validateSheetPayload('Scholarship_Feedback', row);

    assert.equal(validation.isValid, true, 'Mapped feedback row must pass strict 12-column validation');
    assert.equal(Object.keys(row).length, 12);
    assert.equal(row.feedback_reference_id, 'feedback_999');
    assert.equal(row.overall_rating, 5);
    assert.equal(row.exam_difficulty, 'moderate');
    assert.equal(row.medium, 'Tamil');
});

test('SheetDB Models: SheetDBSyncJob registers valid schema with indexes', () => {
    const job = new SheetDBSyncJob({
        jobId: 'sync_test_001',
        recordReferenceId: 'rec_123',
        destinationTab: 'Scholarship_Students',
        payload: { sample: 1 },
        status: 'pending',
    });

    const err = job.validateSync();
    assert.equal(err, undefined, 'SheetDBSyncJob schema must validate');
    assert.equal(job.status, 'pending');
    assert.equal(job.attemptCount, 0);
    assert.equal(job.maxAttempts, 5);
});

test('SheetDB Security & Privacy: No authentication secrets or plaintext Aadhaar in sync payloads', () => {
    const sensitiveStudent = {
        _id: '6724a8f9b1c2d3e4f5061728',
        registrationToken: 'RASI-SECURE-001',
        name: 'Arun Kumar',
        aadhaarNumber: '999988887777',
        passwordHash: 'secret_hash_value',
        token: 'jwt_secret_token_example',
    };

    const row = mapStudentToSheetRow(sensitiveStudent);

    // Verify plaintext Aadhaar is NOT present
    assert.equal(row.masked_aadhaar, 'XXXX-XXXX-7777');
    assert.equal('aadhaarNumber' in row, false);
    assert.equal('passwordHash' in row, false);
    assert.equal('token' in row, false);

    // Verify exact keys match only approved headers
    const keys = Object.keys(row);
    assert.equal(keys.length, 32);
    assert.deepEqual(keys.sort(), [...SCHOLARSHIP_STUDENTS_HEADERS].sort());
});
