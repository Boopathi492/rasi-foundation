# RASI FOUNDATION – COMPLETE SHEETDB ARCHITECTURE REFACTOR, BUG FIX & PRODUCTION READINESS

Repository: `Boopathi492/rasi-foundation`  
Branch: `boopathi/dev`  
Framework: Next.js 14.2.35  
Database: MongoDB Atlas  
External storage: SheetDB / Google Sheets  
Deployment: Vercel

## 1. BUSINESS REQUIREMENT – FINAL DECISION

We have decided to use SheetDB / Google Sheets as the primary persistent storage for scholarship student application records, scholarship examination scorecards, and student feedback.

**Student scholarship data must NOT be newly inserted or duplicated in MongoDB.**

Required data destinations:

| Data | Required storage |
|---|---|
| Scholarship student registration/profile | SheetDB – Scholarship_Students |
| Scholarship examination final scorecard | SheetDB – Scholarship_Results |
| Scholarship feedback | SheetDB – Scholarship_Feedback |
| Colleges | Existing MongoDB architecture |
| Courses | Existing MongoDB architecture |
| Question bank | Existing MongoDB architecture |
| Exam configuration | Existing MongoDB architecture |
| Admin authentication and permissions | Existing secure architecture |

Do not remove MongoDB from the entire application. Only refactor scholarship student data persistence according to this requirement.

Before implementation, inspect every dependency on ScholarshipStudent, TestSession, registrationToken, results and feedback. Design a safe solution for exam-session state and temporary answers without persisting duplicate student profiles/results in MongoDB.

## 2. CONFIRMED LIVE BUG

A real student registration and completed examination currently produce this MongoDB error:

`[ERR_SYNC] SHEETDB_URL environment variable is missing on server`

Observed behavior:
- Student record gets inserted into MongoDB.
- `sheetdbSynced` remains false.
- SheetDB does not receive the registration.
- Student result is not reliably persisted in SheetDB.

Fix the actual root cause, not just the displayed error.

## 3. ENVIRONMENT VARIABLE AUDIT

Audit the complete SheetDB configuration.

Verify:
- SHEETDB_URL
- SHEETDB_API_KEY
- SHEETDB_API_SECRET
- CRON_SECRET

Important:
- Existing Vercel environment variable configuration must be respected.
- Inspect exact variable names and every place they are read.
- Verify server-side environment loading in Preview and Production.
- Do not expose values in logs, API responses, browser bundles or reports.
- Do not invent alternative variable names.
- Ensure the SheetDB endpoint is configured centrally and consistently.
- Ensure SheetDB Basic Authentication is attached to every relevant request.
- Fail clearly and safely when a required variable is missing.

Never print environment variable values.

## 4. COMPLETE STUDENT REGISTRATION REFACTOR

Refactor scholarship registration so that:

1. Validate all registration fields on the server.
2. Validate required documents and upload references.
3. Generate a unique student_reference_id and application_number.
4. Save the student record to SheetDB Scholarship_Students.
5. Verify that the SheetDB write succeeded.
6. Only then confirm successful registration to the student.
7. Do not create a duplicate ScholarshipStudent document in MongoDB.
8. Prevent duplicate registration using a reliable idempotency strategy.
9. Handle concurrent submissions safely as far as SheetDB permits.
10. Do not report success when SheetDB has rejected or failed the write.

Do not use a fake success response or silently fall back to MongoDB.

Important: SheetDB does not provide a transactional database guarantee. Design retries and duplicate protection accordingly. If a write has an ambiguous timeout, reconcile before retrying.

## 5. STUDENT LOGIN AND EXAM ACCESS

Inspect and refactor all student authentication flows.

The student must be able to:
- Register successfully.
- Receive application/reference details.
- Verify identity securely.
- Access the correct examination.
- Resume an eligible active examination.
- Submit answers.
- View the final result.
- Download the scorecard.

Do not expose Aadhaar, passwords, registration tokens or private student data.

Do not store plaintext passwords or authentication secrets in Google Sheets.

Use secure, short-lived signed tokens or an appropriate authentication mechanism. Explain where authentication state is stored and how it is invalidated.

## 6. EXAMINATION AND RESULT PERSISTENCE

Maintain the existing examination rules:

Official exam:
- Physics: 20 questions.
- Chemistry: 20 questions.
- Mathematics OR Biology: 20 questions.
- Total: 60 questions.
- Duration: 90 minutes.
- English and Tamil medium.
- Unique randomized question set per student.

Practice exam:
- Continue using the existing configurable question count.

After final submission:

1. Grade answers on the server.
2. Calculate correct, incorrect, unanswered, total marks and percentage.
3. Save the final scorecard to SheetDB Scholarship_Results.
4. Ensure the result is linked using student_reference_id, application_number and result_reference_id.
5. Prevent duplicate result rows on retries or repeated submission.
6. Generate downloadable PDF from the authoritative saved result.
7. Never calculate official results from browser-submitted totals.

Preserve immutable exam snapshots and protect active examination integrity.

Do not store duplicate final student result documents in MongoDB.

## 7. FEEDBACK PERSISTENCE

After exam completion:
- Save feedback in Scholarship_Feedback.
- Link feedback to student_reference_id and result_reference_id.
- Prevent duplicate feedback submissions.
- Confirm success only after SheetDB accepts the write.

## 8. SHEETDB SCHEMA AND DATA MAPPING

Verify exact live spreadsheet tab names and headers.

Scholarship_Students:
`student_reference_id, application_number, full_name, gender, date_of_birth, father_name, community, address, student_mobile, student_email, father_mobile, mother_mobile, masked_aadhaar, current_class, academic_year, board_of_education, plus2_group, plus2_exam_number, expected_cut_off, last_studied_school, studied_in_govt_school, first_generation_graduate, preferred_district, primary_college, primary_course, secondary_college, secondary_course, selected_elective, exam_medium, questions_per_page, application_status, registration_date`

Scholarship_Results:
`result_reference_id, student_reference_id, application_number, candidate_name, student_mobile, exam_date, exam_medium, optional_subject, physics_score, chemistry_score, elective_score, total_score, maximum_marks, percentage, total_questions, attempted_questions, correct_answers, incorrect_answers, unanswered_questions, time_taken_minutes, result_status, submitted_at`

Scholarship_Feedback:
`feedback_reference_id, student_reference_id, result_reference_id, application_number, student_name, overall_rating, exam_difficulty, question_clarity, portal_experience, comments, medium, submitted_at`

Verify every field mapping, type conversion, date format and optional value.

Investigate and fix the `#ERROR!` values currently appearing in the `current_class` column. Ensure no formula or malformed data is written into spreadsheet cells.

Do not modify or delete legacy Sheet1 records.

## 9. DOCUMENT UPLOADS

Audit scholarship document uploads.

- Preserve required documents.
- Verify actual file storage and access permissions.
- Store secure file references in SheetDB, not base64 blobs.
- Validate file type and size on the server.
- Prevent public exposure of sensitive student documents.
- Ensure PDF scorecard download works after SheetDB persistence.

Do not assume SheetDB itself stores uploaded files.

## 10. EXISTING DATA MIGRATION

Audit existing MongoDB ScholarshipStudent records and pending SheetDB sync jobs.

For existing students:
- Identify records that are not synced.
- Create a safe migration/reconciliation process.
- Migrate only after checking whether the corresponding SheetDB row already exists.
- Do not create duplicate rows.
- Verify all student references and result relationships.
- Preserve original data until migration is fully verified.

Do not delete existing MongoDB records during this task without explicit approval.

Provide a migration report showing:
- Total existing students.
- Successfully reconciled.
- Already present in SheetDB.
- Pending migration.
- Failed records.
- Duplicate candidates.

## 11. REMOVE DUAL-WRITE ARCHITECTURE

The current dual-write design must be examined and replaced for new scholarship student registrations, final results and feedback.

Do not:
- Insert full student records into MongoDB and mirror them to SheetDB.
- Report registration success before SheetDB persistence.
- Return fake success after a sync failure.
- Use an unreliable unawaited background promise as the only persistence mechanism.

If SheetDB is unavailable, return a clear retryable error and preserve a safe recovery mechanism without silently writing a duplicate student profile to MongoDB.

Explicitly document any temporary exam-session data that must remain outside SheetDB because of reliability or performance constraints.

## 12. ADMIN DASHBOARD INTEGRATION

Audit all scholarship admin modules and make sure they use the correct data source.

Verify:
- Student list and search.
- Student details.
- Registration/application status.
- Examination completion status.
- Scorecards and result reports.
- Feedback management.
- Export/download functionality.
- Pagination and filtering.
- Admin permissions.

New scholarship student records, results and feedback must be read from SheetDB.

Do not break existing colleges, courses, announcements, admin login, payment, counselling or other modules.

## 13. SHEETDB FREE-TIER QUOTA AND PERFORMANCE

Audit the actual SheetDB request usage.

- Minimize unnecessary GET requests.
- Avoid repeatedly fetching all rows for individual student lookups.
- Reuse safe cached metadata where appropriate.
- Respect rate limits and HTTP 429.
- Implement bounded retries with backoff.
- Never create duplicate records on retry.
- Document estimated requests per student and monthly quota.
- Never claim unlimited scalability on a free plan.

## 14. SECURITY AUDIT

Verify:
- Basic Auth on every SheetDB operation.
- No API credentials exposed to client code.
- Aadhaar is never stored as plaintext in Google Sheets.
- Only masked Aadhaar is stored when needed.
- No student passwords or JWT secrets in Sheets.
- Admin-only access to private records.
- Student-specific access checks.
- No sensitive API caching.
- No PII or credentials in logs.
- No public access to private student records.

## 15. COMPLETE TESTING – REQUIRED

Create and run tests for:

A. Registration:
- Valid registration.
- Missing mandatory fields.
- Duplicate application.
- Concurrent duplicate submission.
- SheetDB authentication failure.
- Missing SHEETDB_URL.
- SheetDB timeout.
- SheetDB HTTP 429.
- SheetDB HTTP 500.
- Recovery after temporary failure.

B. Student authentication:
- Valid login.
- Invalid token.
- Expired token.
- Wrong student accessing another student's record.
- Registration and login after deployment.

C. Examination:
- Official 60-question exam.
- Correct optional subject selection.
- Tamil and English medium.
- Timer and auto-submit.
- Answer persistence.
- Server-side scoring.
- Repeated submit protection.
- Exam resume behavior.

D. Results:
- Correct score calculation.
- SheetDB result insertion.
- Duplicate result prevention.
- PDF download.
- Result access authorization.

E. Feedback:
- SheetDB insertion.
- Duplicate prevention.
- Required-field validation.

F. Admin:
- Student list and detail.
- Search, filters, pagination.
- Results and scorecard.
- Feedback.
- Export.

G. Existing application regression:
- Colleges.
- Courses.
- Announcements.
- Site settings.
- Admin login.
- Dashboard.
- Counselling.
- Payment.
- Public website images and assets.

H. Infrastructure:
- MongoDB connection.
- SheetDB Basic Auth.
- Vercel Preview environment variables.
- Production environment variable names.
- Cron authentication and daily Hobby-compatible schedule.
- Cache-Control headers.
- Build and deployment compatibility.

## 16. FINAL VERIFICATION

Run:
- Full automated test suite.
- Relevant integration tests.
- npm run lint.
- npm run build.

Use dummy test students only. Never create fake real student registrations or payments in Production.

Verify Preview deployment end-to-end before recommending Production deployment.

Do not change Production environment variables or database credentials without approval.

## 17. GIT AND DELIVERY

Work only on `boopathi/dev`.

After implementation:
- Review every changed file.
- Ensure no secrets or real student PII are committed.
- Run all required tests.
- Commit the completed work with a meaningful message.
- Push to origin/boopathi/dev.

Provide a final detailed report:
1. Root causes found.
2. Files changed.
3. MongoDB versus SheetDB final architecture.
4. Registration flow.
5. Exam and result flow.
6. Admin dashboard changes.
7. Migration/reconciliation results.
8. Security findings.
9. Test counts and results.
10. Build status.
11. Commit hash.
12. Vercel Preview deployment status.
13. Remaining manual actions or limitations.

IMPORTANT:
Do not claim 100% completion merely because unit tests pass.
Do not delete existing student records.
Do not deploy to Production without explicit approval.
Do not expose credentials or personal student information.

The final goal is a reliable, secure, fully tested Rasi Foundation website where new scholarship registrations, scorecards and feedback are saved correctly in their designated SheetDB tabs.