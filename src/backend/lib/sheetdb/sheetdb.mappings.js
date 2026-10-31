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
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    } catch {
        return String(date);
    }
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
    const sId = String(student._id || extraData._id || '').trim();
    const token = String(student.registrationToken || extraData.registrationToken || '').trim();

    // Preferred colleges secondary fallback
    const preferredColleges = student.preferredColleges || extraData.preferredColleges || [];
    const secCollege = student.preferredCollege2 || extraData.preferredCollege2 || (preferredColleges[1]?.collegeName) || '';
    const secCourse = student.preferredCourse2 || extraData.preferredCourse2 || (preferredColleges[1]?.courseName) || '';

    return {
        student_reference_id: sId,
        application_number: token,
        full_name: String(student.name || extraData.name || '').trim(),
        gender: String(student.gender || extraData.gender || 'Other').trim(),
        date_of_birth: formatDateOnly(student.dateOfBirth || extraData.dateOfBirth),
        father_name: String(student.fatherName || extraData.fatherName || '').trim(),
        community: String(student.community || extraData.community || '').trim(),
        address: String(student.address || extraData.address || '').trim(),
        student_mobile: String(student.studentMobile || extraData.studentMobile || '').replace(/\D/g, ''),
        student_email: String(student.studentEmail || extraData.studentEmail || '').trim(),
        father_mobile: String(student.fatherMobile || extraData.fatherMobile || '').replace(/\D/g, ''),
        mother_mobile: String(student.motherMobile || extraData.motherMobile || '').replace(/\D/g, ''),
        masked_aadhaar: getMaskedAadhaar(student.aadhaarNumber || extraData.aadhaarNumber),
        current_class: String(student.currentClass || extraData.currentClass || '+2 / 12th Standard').trim(),
        academic_year: String(student.academicYear || extraData.academicYear || '2025-2026').trim(),
        board_of_education: String(student.board || extraData.board || 'Tamil Nadu State Board').trim(),
        plus2_group: String(student.plus2Group || extraData.plus2Group || 'Academic').trim(),
        plus2_exam_number: String(student.plus2ExamNumber || extraData.plus2ExamNumber || '').trim(),
        expected_cut_off: Number(student.expectedCutOff || extraData.expectedCutOff || 0).toFixed(2),
        last_studied_school: String(student.lastStudiedSchool || extraData.lastStudiedSchool || '').trim(),
        studied_in_govt_school: (student.studiedInGovtSchool === true || extraData.studiedInGovtSchool === true || student.studiedInGovtSchool === 'true') ? 'Yes' : 'No',
        first_generation_graduate: (student.firstGenerationGraduate === true || extraData.firstGenerationGraduate === true || student.firstGenerationGraduate === 'true') ? 'Yes' : 'No',
        preferred_district: String(student.preferredDistrict || extraData.preferredDistrict || '').trim(),
        primary_college: String(student.collegeName || extraData.collegeName || '').trim(),
        primary_course: String(student.admissionCourse || extraData.admissionCourse || '').trim(),
        secondary_college: String(secCollege).trim(),
        secondary_course: String(secCourse).trim(),
        selected_elective: String(student.selectedElective || student.thirdSubject || extraData.thirdSubject || 'Mathematics').trim(),
        exam_medium: String(student.examLanguage || extraData.examLanguage || 'English').trim(),
        questions_per_page: Number(student.pageSize || extraData.pageSize || 5),
        application_status: String(student.testStatus || extraData.testStatus || 'registered').trim(),
        registration_date: formatIST(student.createdAt || extraData.createdAt || new Date()),
    };
}

/**
 * Maps an exam session and student record to the exact 22 headers for Scholarship_Results tab
 */
export function mapResultToSheetRow(testSession, student = {}) {
    const subjectScores = testSession.subjectWiseScore || {};
    const electiveSubject = testSession.selectedElective || student.selectedElective || student.thirdSubject || 'Mathematics';

    const physicsScore = Number(subjectScores.Physics || subjectScores.physics || 0);
    const chemistryScore = Number(subjectScores.Chemistry || subjectScores.chemistry || 0);
    const electiveScore = Number(subjectScores[electiveSubject] || subjectScores[electiveSubject.toLowerCase()] || 0);

    const totalQuestions = Number(testSession.totalQuestions || 60);
    const attemptedQuestions = Number(testSession.attemptedQuestions || 0);
    const correctAnswers = Number(testSession.correctAnswers || 0);
    const wrongAnswers = Number(testSession.wrongAnswers || Math.max(0, attemptedQuestions - correctAnswers));
    const unansweredQuestions = Number(testSession.unattemptedQuestions || Math.max(0, totalQuestions - attemptedQuestions));

    const totalScore = Number(testSession.score || (physicsScore + chemistryScore + electiveScore));
    const percentage = Number(testSession.percentage || (totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0));

    let durationMinutes = 0;
    if (testSession.startTime && testSession.endTime) {
        durationMinutes = Math.round((new Date(testSession.endTime) - new Date(testSession.startTime)) / 60000);
    } else if (testSession.duration) {
        durationMinutes = Number(testSession.duration);
    }

    return {
        result_reference_id: String(testSession._id || '').trim(),
        student_reference_id: String(testSession.studentId || student._id || '').trim(),
        application_number: String(testSession.registrationToken || student.registrationToken || '').trim(),
        candidate_name: String(student.name || testSession.candidateName || '').trim(),
        student_mobile: String(student.studentMobile || testSession.studentMobile || '').replace(/\D/g, ''),
        exam_date: formatDateOnly(testSession.endTime || testSession.createdAt || new Date()),
        exam_medium: String(testSession.language || student.examLanguage || 'English').trim(),
        optional_subject: String(electiveSubject).trim(),
        physics_score: physicsScore,
        chemistry_score: chemistryScore,
        elective_score: electiveScore,
        total_score: totalScore,
        maximum_marks: 60,
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
        feedback_reference_id: String(feedback._id || '').trim(),
        student_reference_id: String(feedback.studentId || student._id || testSession.studentId || '').trim(),
        result_reference_id: String(feedback.testSessionId || testSession._id || '').trim(),
        application_number: String(feedback.registrationToken || student.registrationToken || testSession.registrationToken || '').trim(),
        student_name: String(feedback.studentName || student.name || '').trim(),
        overall_rating: Number(feedback.overallRating || 5),
        exam_difficulty: String(feedback.difficultyRating || 'moderate').trim(),
        question_clarity: Number(feedback.clarityRating || 5),
        portal_experience: Number(feedback.uiRating || 5),
        comments: String(feedback.comments || '').trim(),
        medium: String(feedback.language || 'English').trim(),
        submitted_at: formatIST(feedback.createdAt || new Date()),
    };
}
