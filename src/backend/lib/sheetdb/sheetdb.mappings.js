/**
 * SheetDB Data Mappings
 *
 * Deterministic mapping layer that transforms internal MongoDB models
 * into strict, verified row objects matching the Google Spreadsheet headers.
 */

function formatIST(date) {
    if (!date) return '';
    try {
        return new Date(date).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    } catch {
        return String(date);
    }
}

function formatDateOnly(date) {
    if (!date) return '';
    try {
        const d = new Date(date);
        if (Number.isNaN(d.getTime())) return '';
        // en-CA renders YYYY-MM-DD; fixed to IST so the value never depends on the server timezone.
        return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    } catch {
        return String(date);
    }
}

/**
 * Class labels such as "+2 / 12th Standard" start with "+", which Google Sheets evaluates as a
 * formula (-> `#ERROR!`). Store the readable, formula-safe label instead.
 */
export function normalizeClassLabel(value) {
    const text = String(value || '').trim();
    if (!text || /^\+?\s*2\s*\/\s*12(th)?\s*standard$/i.test(text)) return '12th Standard (+2)';
    return text;
}

function getMaskedAadhaar(aadhaar) {
    if (!aadhaar) return '';
    const clean = String(aadhaar).replace(/\D/g, '');
    if (clean.length < 4) return '';
    return `XXXX-XXXX-${clean.slice(-4)}`;
}

/**
 * Maps a student record to the exact 32 headers for Scholarship_Students tab
 */
export function mapStudentToSheetRow(student, extraData = {}) {
    const sId = String(student.studentReferenceId || student.student_reference_id || student._id || extraData.studentReferenceId || extraData._id || '').trim();
    const token = String(student.registrationToken || student.application_number || extraData.registrationToken || extraData.applicationNumber || '').trim();

    // Preferred colleges secondary fallback
    const preferredColleges = student.preferredColleges || extraData.preferredColleges || [];
    const secCollege = student.preferredCollege2 || extraData.preferredCollege2 || (preferredColleges[1]?.collegeName) || '';
    const secCourse = student.preferredCourse2 || extraData.preferredCourse2 || (preferredColleges[1]?.courseName) || '';

    const rawMasked = student.maskedAadhaar || extraData.maskedAadhaar || '';
    const maskedAadhaar = rawMasked && /^XXXX-XXXX-\d{4}$/.test(String(rawMasked))
        ? String(rawMasked)
        : getMaskedAadhaar(student.aadhaarNumber || extraData.aadhaarNumber);

    return {
        student_reference_id: sId,
        application_number: token,
        full_name: String(student.name || student.full_name || extraData.name || '').trim(),
        gender: String(student.gender || extraData.gender || 'Other').trim(),
        date_of_birth: formatDateOnly(student.dateOfBirth || student.date_of_birth || extraData.dateOfBirth),
        father_name: String(student.fatherName || student.father_name || extraData.fatherName || '').trim(),
        community: String(student.community || extraData.community || '').trim(),
        address: String(student.address || extraData.address || '').trim(),
        student_mobile: String(student.studentMobile || student.student_mobile || extraData.studentMobile || '').replace(/\D/g, '').slice(-10),
        student_email: String(student.studentEmail || student.student_email || extraData.studentEmail || '').trim().toLowerCase(),
        father_mobile: String(student.fatherMobile || student.father_mobile || extraData.fatherMobile || '').replace(/\D/g, ''),
        mother_mobile: String(student.motherMobile || student.mother_mobile || extraData.motherMobile || '').replace(/\D/g, ''),
        masked_aadhaar: maskedAadhaar,
        current_class: normalizeClassLabel(student.currentClass || student.current_class || extraData.currentClass),
        academic_year: String(student.academicYear || student.academic_year || extraData.academicYear || '2025-2026').trim(),
        board_of_education: String(student.board || student.board_of_education || extraData.board || 'Tamil Nadu State Board').trim(),
        plus2_group: String(student.plus2Group || student.plus2_group || extraData.plus2Group || 'Academic').trim(),
        plus2_exam_number: String(student.plus2ExamNumber || student.plus2_exam_number || extraData.plus2ExamNumber || '').trim(),
        expected_cut_off: Number(student.expectedCutOff ?? student.expected_cut_off ?? extraData.expectedCutOff ?? 0).toFixed(2),
        last_studied_school: String(student.lastStudiedSchool || student.last_studied_school || extraData.lastStudiedSchool || '').trim(),
        studied_in_govt_school: (
            student.studiedInGovtSchool === true ||
            extraData.studiedInGovtSchool === true ||
            student.studiedInGovtSchool === 'true' ||
            student.studied_in_govt_school === 'Yes'
        ) ? 'Yes' : 'No',
        first_generation_graduate: (
            student.firstGenerationGraduate === true ||
            extraData.firstGenerationGraduate === true ||
            student.firstGenerationGraduate === 'true' ||
            student.first_generation_graduate === 'Yes'
        ) ? 'Yes' : 'No',
        preferred_district: String(student.preferredDistrict || student.preferred_district || extraData.preferredDistrict || '').trim(),
        primary_college: String(student.collegeName || student.primary_college || extraData.collegeName || '').trim(),
        primary_course: String(student.admissionCourse || student.primary_course || extraData.admissionCourse || '').trim(),
        secondary_college: String(secCollege || student.secondary_college || '').trim(),
        secondary_course: String(secCourse || student.secondary_course || '').trim(),
        selected_elective: String(student.selectedElective || student.selected_elective || student.thirdSubject || extraData.thirdSubject || 'Mathematics').trim(),
        exam_medium: String(student.examLanguage || student.exam_medium || extraData.examLanguage || 'English').trim(),
        questions_per_page: Number(student.pageSize || student.questions_per_page || extraData.pageSize || 5),
        application_status: String(student.testStatus || student.application_status || extraData.testStatus || 'registered').trim(),
        registration_date: formatIST(student.createdAt || extraData.createdAt || new Date()),
    };
}

/**
 * Maps an exam session and student record to the exact 22 headers for Scholarship_Results tab
 */
export function mapResultToSheetRow(testSession, student = {}) {
    const subjectScores = testSession.subjectWiseScore || {};
    const electiveSubject =
        testSession.selectedElective ||
        testSession.optionalSubject ||
        student.selectedElective ||
        student.selected_elective ||
        student.thirdSubject ||
        (Array.isArray(testSession.subjects) && testSession.subjects[2]) ||
        'Mathematics';

    const physicsScore = Number(subjectScores.Physics ?? subjectScores.physics ?? 0);
    const chemistryScore = Number(subjectScores.Chemistry ?? subjectScores.chemistry ?? 0);
    const electiveScore = Number(subjectScores[electiveSubject] ?? subjectScores[String(electiveSubject).toLowerCase()] ?? 0);

    const totalQuestions = Number(testSession.totalQuestions || 60);
    const attemptedQuestions = Number(testSession.attemptedQuestions || 0);
    const correctAnswers = Number(testSession.correctAnswers || 0);
    const wrongAnswers = Number(testSession.wrongAnswers ?? Math.max(0, attemptedQuestions - correctAnswers));
    const unansweredQuestions = Number(testSession.unattemptedQuestions ?? Math.max(0, totalQuestions - attemptedQuestions));

    const totalScore = Number(testSession.score ?? (physicsScore + chemistryScore + electiveScore));
    const marksPerQuestion = Number(testSession.configSnapshot?.marksPerQuestion || 1);
    const maxMarks = Number(testSession.maximumMarks || (totalQuestions * marksPerQuestion) || 60);
    const percentage = Number(testSession.percentage ?? (maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0));

    let durationMinutes = 0;
    if (testSession.startTime && testSession.endTime) {
        durationMinutes = Math.max(0, Math.round((new Date(testSession.endTime) - new Date(testSession.startTime)) / 60000));
    } else if (testSession.duration) {
        durationMinutes = Number(testSession.duration);
    }

    return {
        result_reference_id: String(testSession.resultReferenceId || testSession._id || '').trim(),
        student_reference_id: String(testSession.studentReferenceId || testSession.studentId || student.student_reference_id || student._id || '').trim(),
        application_number: String(testSession.registrationToken || student.application_number || student.registrationToken || '').trim(),
        candidate_name: String(student.name || student.full_name || testSession.candidateName || '').trim(),
        student_mobile: String(student.studentMobile || student.student_mobile || testSession.studentMobile || '').replace(/\D/g, ''),
        exam_date: formatDateOnly(testSession.endTime || testSession.createdAt || new Date()),
        exam_medium: String(testSession.language || testSession.medium || student.examLanguage || student.exam_medium || 'English').trim(),
        optional_subject: String(electiveSubject).trim(),
        physics_score: physicsScore,
        chemistry_score: chemistryScore,
        elective_score: electiveScore,
        total_score: totalScore,
        maximum_marks: maxMarks,
        percentage: `${percentage}%`,
        total_questions: totalQuestions,
        attempted_questions: attemptedQuestions,
        correct_answers: correctAnswers,
        incorrect_answers: wrongAnswers,
        unanswered_questions: unansweredQuestions,
        time_taken_minutes: durationMinutes,
        result_status: String(testSession.status || 'completed').trim(),
        submitted_at: formatIST(testSession.endTime || testSession.updatedAt || new Date()),
    };
}

/**
 * Maps feedback, student, and session records to the exact 12 headers for Scholarship_Feedback tab
 */
export function mapFeedbackToSheetRow(feedback, student = {}, testSession = {}) {
    return {
        feedback_reference_id: String(feedback.feedbackReferenceId || feedback._id || '').trim(),
        student_reference_id: String(
            feedback.studentReferenceId ||
            feedback.studentId ||
            student.student_reference_id ||
            student._id ||
            testSession.studentReferenceId ||
            testSession.studentId ||
            ''
        ).trim(),
        result_reference_id: String(feedback.resultReferenceId || feedback.testSessionId || testSession.resultReferenceId || testSession._id || '').trim(),
        application_number: String(
            feedback.registrationToken ||
            feedback.applicationNumber ||
            student.application_number ||
            student.registrationToken ||
            testSession.registrationToken ||
            ''
        ).trim(),
        student_name: String(feedback.studentName || student.name || student.full_name || testSession.candidateName || '').trim(),
        overall_rating: Number(feedback.overallRating || 5),
        exam_difficulty: String(feedback.difficultyRating || 'moderate').trim(),
        question_clarity: Number(feedback.clarityRating || 5),
        portal_experience: Number(feedback.uiRating || 5),
        comments: String(feedback.comments || '').trim(),
        medium: String(feedback.language || testSession.language || 'English').trim(),
        submitted_at: formatIST(feedback.createdAt || new Date()),
    };
}

function stripLeadingFormulaQuote(value) {
    const str = String(value ?? '');
    return str.startsWith("'") ? str.slice(1) : str;
}

/**
 * Converts a raw `Scholarship_Students` row from SheetDB into the canonical internal student shape.
 */
export function normalizeSheetStudentRow(row) {
    if (!row || typeof row !== 'object') return null;
    const preferredColleges = [];
    if (row.primary_college) {
        preferredColleges.push({
            collegeName: stripLeadingFormulaQuote(row.primary_college),
            courseName: stripLeadingFormulaQuote(row.primary_course),
            priority: 1,
        });
    }
    if (row.secondary_college) {
        preferredColleges.push({
            collegeName: stripLeadingFormulaQuote(row.secondary_college),
            courseName: stripLeadingFormulaQuote(row.secondary_course || row.primary_course),
            priority: 2,
        });
    }

    const currentClassRaw = stripLeadingFormulaQuote(row.current_class);
    return {
        studentReferenceId: String(row.student_reference_id || '').trim(),
        registrationToken: String(row.application_number || '').trim(),
        name: stripLeadingFormulaQuote(row.full_name).trim(),
        gender: String(row.gender || 'Other').trim(),
        dateOfBirth: String(row.date_of_birth || '').trim(),
        fatherName: stripLeadingFormulaQuote(row.father_name).trim(),
        community: String(row.community || '').trim(),
        address: stripLeadingFormulaQuote(row.address).trim(),
        studentMobile: String(row.student_mobile || '').replace(/\D/g, ''),
        studentEmail: String(row.student_email || '').trim().toLowerCase(),
        fatherMobile: String(row.father_mobile || '').replace(/\D/g, ''),
        motherMobile: String(row.mother_mobile || '').replace(/\D/g, ''),
        maskedAadhaar: String(row.masked_aadhaar || '').trim(),
        currentClass: currentClassRaw === '#ERROR!' ? '12th Standard (+2)' : normalizeClassLabel(currentClassRaw),
        academicYear: String(row.academic_year || '2025-2026').trim(),
        board: stripLeadingFormulaQuote(row.board_of_education || 'Tamil Nadu State Board').trim(),
        plus2Group: String(row.plus2_group || 'Academic').trim(),
        plus2ExamNumber: stripLeadingFormulaQuote(row.plus2_exam_number).trim(),
        expectedCutOff: Number.parseFloat(row.expected_cut_off) || 0,
        lastStudiedSchool: stripLeadingFormulaQuote(row.last_studied_school).trim(),
        studiedInGovtSchool: String(row.studied_in_govt_school || '').toLowerCase() === 'yes',
        firstGenerationGraduate: String(row.first_generation_graduate || '').toLowerCase() === 'yes',
        preferredDistrict: stripLeadingFormulaQuote(row.preferred_district).trim(),
        collegeName: stripLeadingFormulaQuote(row.primary_college).trim(),
        admissionCourse: stripLeadingFormulaQuote(row.primary_course).trim(),
        preferredCollege2: stripLeadingFormulaQuote(row.secondary_college).trim(),
        preferredCourse2: stripLeadingFormulaQuote(row.secondary_course).trim(),
        preferredColleges,
        selectedElective: String(row.selected_elective || 'Mathematics').trim(),
        thirdSubject: String(row.selected_elective || 'Mathematics').trim(),
        examLanguage: String(row.exam_medium || 'English').trim() === 'Tamil' ? 'Tamil' : 'English',
        pageSize: Number(row.questions_per_page) === 10 ? 10 : 5,
        testStatus: String(row.application_status || 'registered').trim(),
        registrationDate: String(row.registration_date || '').trim(),
        source: 'sheetdb',
    };
}

/**
 * Converts a raw `Scholarship_Results` row from SheetDB into the canonical internal result shape.
 */
export function normalizeSheetResultRow(row) {
    if (!row || typeof row !== 'object') return null;
    const totalQuestions = Number(row.total_questions) || 60;
    const totalScore = Number(row.total_score) || 0;
    const maxMarks = Number(row.maximum_marks) || totalQuestions;
    const rawPct = String(row.percentage || '').replace('%', '').trim();
    const percentage = Number.isFinite(Number(rawPct)) && rawPct !== ''
        ? Number(rawPct)
        : (maxMarks > 0 ? Math.round((totalScore / maxMarks) * 100) : 0);

    const optionalSubject = String(row.optional_subject || 'Mathematics').trim();
    const physicsScore = Number(row.physics_score) || 0;
    const chemistryScore = Number(row.chemistry_score) || 0;
    const electiveScore = Number(row.elective_score) || 0;
    const perSubTotal = Math.max(1, Math.round(totalQuestions / 3));

    const subjectWiseScores = [
        { subject: 'Physics', correct: physicsScore, total: perSubTotal, percentage: Math.round((physicsScore / perSubTotal) * 100) },
        { subject: 'Chemistry', correct: chemistryScore, total: perSubTotal, percentage: Math.round((chemistryScore / perSubTotal) * 100) },
        { subject: optionalSubject, correct: electiveScore, total: perSubTotal, percentage: Math.round((electiveScore / perSubTotal) * 100) },
    ];

    return {
        resultReferenceId: String(row.result_reference_id || '').trim(),
        sessionId: String(row.result_reference_id || '').trim(),
        studentReferenceId: String(row.student_reference_id || '').trim(),
        registrationToken: String(row.application_number || '').trim(),
        candidateName: stripLeadingFormulaQuote(row.candidate_name).trim(),
        studentMobile: String(row.student_mobile || '').replace(/\D/g, ''),
        examDate: String(row.exam_date || '').trim(),
        language: String(row.exam_medium || 'English').trim(),
        optionalSubject,
        physicsScore,
        chemistryScore,
        electiveScore,
        score: totalScore,
        maximumMarks: maxMarks,
        percentage,
        totalQuestions,
        attemptedQuestions: Number(row.attempted_questions) || 0,
        correctAnswers: Number(row.correct_answers) || 0,
        wrongAnswers: Number(row.incorrect_answers) || 0,
        unattempted: Number(row.unanswered_questions) || 0,
        timeTaken: Number(row.time_taken_minutes) || 0,
        status: String(row.result_status || 'completed').trim(),
        submittedAt: String(row.submitted_at || '').trim(),
        subjectWiseScore: {
            Physics: physicsScore,
            Chemistry: chemistryScore,
            [optionalSubject]: electiveScore,
        },
        subjectWiseScores,
        source: 'sheetdb',
    };
}

/**
 * Converts a raw `Scholarship_Feedback` row from SheetDB into a clean internal feedback object.
 */
export function normalizeSheetFeedbackRow(row) {
    if (!row || typeof row !== 'object') return null;
    return {
        feedbackReferenceId: String(row.feedback_reference_id || '').trim(),
        studentReferenceId: String(row.student_reference_id || '').trim(),
        resultReferenceId: String(row.result_reference_id || '').trim(),
        registrationToken: String(row.application_number || '').trim(),
        studentName: stripLeadingFormulaQuote(row.student_name).trim(),
        overallRating: Number(row.overall_rating) || 5,
        difficultyRating: String(row.exam_difficulty || 'moderate').trim(),
        clarityRating: Number(row.question_clarity) || 5,
        uiRating: Number(row.portal_experience) || 5,
        comments: stripLeadingFormulaQuote(row.comments).trim(),
        language: String(row.medium || 'English').trim(),
        submittedAt: String(row.submitted_at || '').trim(),
        source: 'sheetdb',
    };
}
