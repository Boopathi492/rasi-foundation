/**
 * SheetDB Payload Schemas & Header Validations
 *
 * Enforces exact spelling, case, and ordering of headers across all 3 scholarship tabs.
 */

export const SCHOLARSHIP_STUDENTS_HEADERS = [
    'student_reference_id',
    'application_number',
    'full_name',
    'gender',
    'date_of_birth',
    'father_name',
    'community',
    'address',
    'student_mobile',
    'student_email',
    'father_mobile',
    'mother_mobile',
    'masked_aadhaar',
    'current_class',
    'academic_year',
    'board_of_education',
    'plus2_group',
    'plus2_exam_number',
    'expected_cut_off',
    'last_studied_school',
    'studied_in_govt_school',
    'first_generation_graduate',
    'preferred_district',
    'primary_college',
    'primary_course',
    'secondary_college',
    'secondary_course',
    'selected_elective',
    'exam_medium',
    'questions_per_page',
    'application_status',
    'registration_date',
];

export const SCHOLARSHIP_RESULTS_HEADERS = [
    'result_reference_id',
    'student_reference_id',
    'application_number',
    'candidate_name',
    'student_mobile',
    'exam_date',
    'exam_medium',
    'optional_subject',
    'physics_score',
    'chemistry_score',
    'elective_score',
    'total_score',
    'maximum_marks',
    'percentage',
    'total_questions',
    'attempted_questions',
    'correct_answers',
    'incorrect_answers',
    'unanswered_questions',
    'time_taken_minutes',
    'result_status',
    'submitted_at',
];

export const SCHOLARSHIP_FEEDBACK_HEADERS = [
    'feedback_reference_id',
    'student_reference_id',
    'result_reference_id',
    'application_number',
    'student_name',
    'overall_rating',
    'exam_difficulty',
    'question_clarity',
    'portal_experience',
    'comments',
    'medium',
    'submitted_at',
];

/**
 * Validates that an object contains all required headers for a destination tab.
 * Ensures no unexpected extra keys or missing keys.
 */
export function validateSheetPayload(tabName, payload) {
    let expectedHeaders;
    if (tabName === 'Scholarship_Students') {
        expectedHeaders = SCHOLARSHIP_STUDENTS_HEADERS;
    } else if (tabName === 'Scholarship_Results') {
        expectedHeaders = SCHOLARSHIP_RESULTS_HEADERS;
    } else if (tabName === 'Scholarship_Feedback') {
        expectedHeaders = SCHOLARSHIP_FEEDBACK_HEADERS;
    } else {
        return {
            isValid: false,
            error: `Unauthorized or unrecognized destination tab: '${tabName}'. Must be one of Scholarship_Students, Scholarship_Results, or Scholarship_Feedback.`,
        };
    }

    const payloadKeys = Object.keys(payload);
    const missingKeys = expectedHeaders.filter(h => !(h in payload));

    if (missingKeys.length > 0) {
        return {
            isValid: false,
            error: `Payload for tab '${tabName}' is missing required fields: ${missingKeys.join(', ')}`,
        };
    }

    const extraKeys = payloadKeys.filter(k => !expectedHeaders.includes(k));
    if (extraKeys.length > 0) {
        return {
            isValid: false,
            error: `Payload for tab '${tabName}' contains unexpected extra fields: ${extraKeys.join(', ')}`,
        };
    }

    return { isValid: true };
}
