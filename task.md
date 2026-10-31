# RASI FOUNDATION – SCHOLARSHIP DATA STORAGE MIGRATION TO SHEETDB

We currently use MongoDB Atlas Free Tier for our Rasi Foundation website.

Existing MongoDB collections must remain unchanged for:
- Colleges
- Courses
- Enquiries
- ScholarshipQuestion (1,600 questions)
- ScholarshipExamConfig
- Active examination sessions and answers
- Other existing website modules

Our existing SheetDB API is named Rasi Foundation.

Existing environment variable:
SHEETDB_URL

Use the existing environment variable. Do not hardcode the endpoint in source code.

## 1. New Storage Architecture

We want to evaluate and implement SheetDB as the primary storage destination for scholarship student registration records and final scholarship result summaries, while retaining MongoDB for the remaining website and examination engine.

Target allocation:

MongoDB:
- Colleges
- Courses
- Enquiries
- Question bank
- Exam configurations
- Active exam sessions
- Exam question snapshots
- Temporary/necessary examination answers

SheetDB:
- Scholarship student registration records
- Scholarship application details
- Final scorecard summaries
- Scholarship feedback, if supported and approved

Do not migrate unrelated MongoDB collections.

## 2. First Audit Existing SheetDB

Before implementation:
- Inspect the existing SheetDB integration.
- Verify the actual spreadsheet and tab structure.
- Check current API permissions and authentication settings.
- Check read/write/delete access.
- Check monthly request quota and current usage.
- Verify whether multiple spreadsheet tabs are supported by the current plan.
- Identify any existing data before modifying the spreadsheet.

Do not expose the SheetDB endpoint in frontend code.

## 3. Spreadsheet Structure

Use separate tabs where supported:

Scholarship_Students:
- student_reference_id
- application_number
- full_name
- date_of_birth (only if required)
- email
- phone
- medium 
- selected_subject
- registration_date
- application_status
pls check student regitration for scolorshoip test to add all feilds ok don't forget it 

Scholarship_Results:
- result_reference_id
- student_reference_id
- application_number
- exam_date
- exam_medium
- optional_subject
- physics_score
- chemistry_score
- elective_score
- total_score
- maximum_marks
- percentage
- correct_answers
- incorrect_answers
- unanswered_questions
- time_taken
- result_status

Scholarship_Feedback:
- feedback_reference_id
- student_reference_id
- result_reference_id
- rating
- difficulty
- comments
- submitted_at

Use only necessary personal data. Never store passwords, authentication tokens, full Aadhaar numbers, or uploaded identity documents.

## 4. Student Registration

Update the existing scholarship registration flow:

- Validate all registration fields on the server.
- Generate a unique student reference ID and application number.
- Prevent duplicate registrations.
- Save registration data to the configured SheetDB destination.
- Verify successful creation before confirming registration.
- If SheetDB is unavailable, do not display false success.
- Implement a reliable retry/recovery strategy.
- Preserve existing students and registrations.
- Do not break the current login or student ownership workflow.

Important: Determine how existing student authentication will work if student records are no longer stored in MongoDB. Do not remove existing authentication records or change login behavior without a safe migration plan.

## 5. Examination and Scorecard

Keep the existing examination engine and its active sessions in MongoDB.

On exam completion:
- Calculate marks on the backend.
- Generate a unique result reference.
- Save the result summary to SheetDB.
- Ensure duplicate submissions cannot create duplicate result rows.
- Never calculate scores using spreadsheet values.
- Never let SheetDB changes overwrite the official exam answers or marks.
- Make the result accessible only to its authorized student and admin.

If result storage fails, do not lose the result or show a false success message. Provide a durable recovery mechanism and admin alert.

## 6. Security

Implement:
- Backend-only SheetDB calls.
- Server-side environment variables.
- Authentication and authorization.
- Student ownership validation.
- Input validation and sanitization.
- Rate limiting.
- Duplicate prevention.
- Safe request timeouts.
- Error handling.
- No sensitive information in logs.
- No public read/write access to student records.
- Minimum necessary SheetDB permissions.
- CORS restrictions as an additional layer, not as authentication.

Check whether the current SheetDB plan supports the required access restrictions. If it does not, stop and report the limitation instead of pretending the data is secured.

## 7. Storage and Quota Management

Our current SheetDB account may be on the Free plan.

Verify the actual monthly request allowance and usage.

Avoid unnecessary API requests. Monitor usage and provide admin warnings at 70% and 90% where reliable usage data is available.

Do not assume unlimited requests.

If the expected student volume exceeds the free quota, provide a cost and architecture recommendation before deployment.

## 8. Testing

Test:
- New student registration.
- Duplicate student registration.
- SheetDB API failure.
- SheetDB rate-limit response.
- Student login and ownership.
- Official exam start and resume.
- Official exam submission.
- Result storage.
- Duplicate result prevention.
- Result retrieval.
- Unauthorized student result access.
- Admin result access.
- Feedback submission.
- Existing MongoDB question bank and exam functionality.

Mock SheetDB in automated tests. Never send fake production student data.

Run all existing tests, new tests, lint, and production build.

## 9. Critical Migration Rules

- Do not delete existing MongoDB student records.
- Do not delete existing exam sessions.
- Do not delete results.
- Do not change the 1,600-question bank.
- Create backups before any migration.
- Preserve existing login behavior.
- Do not deploy until the migration and rollback strategy is reviewed.
- Clearly explain any limitations of SheetDB for this use case.

First provide an architecture audit and migration plan. Wait for approval before destructive changes or production migration.

Final report must clearly distinguish implemented, tested, and pending items.