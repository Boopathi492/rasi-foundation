# RASI FOUNDATION – MEDICAL & HEALTHCARE MODULE COMPLETE AUDIT, DATA ENRICHMENT & FILTER REDESIGN

I have provided two screenshots:
1. Medical and Healthcare Courses reference chart.
2. Current Rasi Foundation College Directory showing Medical filters and college results.

Your task is to audit and improve the complete Medical & Healthcare college directory functionality, including MongoDB data, courses, departments, filters, APIs, frontend UI and testing.

**IMPORTANT: Do not perform only a UI redesign. The database records, course relationships, department mapping, filters and search functionality must all work correctly.**

## 1. COMPLETE EXISTING DATA AUDIT

First inspect all existing MongoDB college records and course records related to Medical & Healthcare.

Compare the actual database data against the provided Medical & Healthcare reference image.

Audit these three major categories:

### A. MBBS / BDS – Core Medical
- MBBS – Bachelor of Medicine and Bachelor of Surgery.
- BDS – Bachelor of Dental Surgery.

### B. AYUSH – Traditional Systems of Medicine
The following courses must be checked:
- BAMS – Bachelor of Ayurvedic Medicine and Surgery.
- BHMS – Bachelor of Homoeopathic Medicine and Surgery.
- BUMS – Bachelor of Unani Medicine and Surgery.
- BSMS – Bachelor of Siddha Medicine and Surgery.
- BNYS – Bachelor of Naturopathy and Yogic Sciences.

**Critical issue:** Currently the website shows AYUSH (0). Investigate why it shows zero.

Check whether:
- AYUSH colleges are missing.
- AYUSH courses are missing.
- Courses exist but are not linked to the correct colleges.
- Incorrect category values are stored.
- Backend API filters are excluding AYUSH records.
- Frontend category mapping is incorrect.

Search for the actual eligible colleges and their courses. Add missing verified college/course/department records where necessary. Do not invent college names, courses, approvals or identifiers.

### C. Paramedical / Allied Health Sciences

Audit the following departments and courses:

**Nursing**
- ANM – 2 years.
- GNM – 3 years.
- B.Sc Nursing – 4 years.

**Pharmacy**
- D.Pharm – 2 years.
- B.Pharm – 4 years.
- Pharm.D – 6 years.

**Physiotherapy**
- BPT – 4 to 4.5 years.

**Other Allied Health Sciences**
- BOT – Bachelor of Occupational Therapy.
- BASLP – Bachelor of Audiology and Speech-Language Pathology.
- B.Optom – Bachelor of Optometry.

**Additional Allied Health Science courses to audit:**
- B.Sc Medical Laboratory Technology (MLT).
- B.Sc Radiology & Imaging Technology.
- B.Sc Operation Theatre & Anaesthesia Technology.
- B.Sc Cardiac Technology.
- B.Sc Dialysis Technology.
- B.Sc Respiratory Therapy.
- B.Sc Neuro Electrophysiology.
- B.Sc Perfusion Technology.
- B.Sc Physician Assistant.
- B.Sc Critical Care Technology.
- B.Sc Emergency Care Technology.

Verify actual course availability, duration and college eligibility using reliable official sources. Do not blindly assign the same duration to every institution.

## 2. COLLEGE, COURSE AND DEPARTMENT RELATIONSHIP AUDIT

For all 772 existing MongoDB college records:

1. Identify every Medical & Healthcare college.
2. Verify its actual institution type and stream.
3. Identify the courses genuinely offered by that institution.
4. Verify department/course relationships.
5. Identify missing courses and departments.
6. Identify duplicate course records.
7. Identify incorrectly classified colleges.
8. Identify courses assigned to the wrong college.
9. Verify course duration wherever official information is available.
10. Verify AYUSH colleges and their approved courses specifically.

Do not assume every Nursing, Pharmacy or Medical college offers all courses within its category.

Maintain correct college-to-course relationships.

Create or update database fields and collections only where necessary. Preserve existing data and relationships.

## 3. REDESIGN MEDICAL FILTER UI – PREMIUM AND CLEAR

The current filter interface is confusing. Redesign the Medical & Healthcare filtering experience to be clean, intuitive and professional.

Use this hierarchy:

**Main Stream**
- All Streams
- Engineering
- Medical & Healthcare
- Arts & Science
- Management
- Law
- Agriculture
- Education
- Polytechnic

When the user selects Medical & Healthcare, display a clear second-level category selector:

**Medical Category**
- All Medical
- MBBS / BDS
- AYUSH
- Paramedical / Allied Health Sciences

When the user selects one category, show only its relevant filters.

### MBBS / BDS filters
- Course: MBBS / BDS
- District
- Management type
- College search

### AYUSH filters
- AYUSH course: BAMS / BHMS / BUMS / BSMS / BNYS
- District
- Management type
- College search

### Paramedical / Allied Health filters
- Department: Nursing / Pharmacy / Physiotherapy / Allied Health Sciences
- Course: ANM / GNM / B.Sc Nursing / D.Pharm / B.Pharm / Pharm.D / BPT / BOT / BASLP / B.Optom / other verified courses
- District
- Management type
- College search

### Filter behavior requirements
- All filters must work together correctly.
- Dependent dropdowns must update based on the selected category.
- Selecting a category must reset incompatible old filters.
- Selecting a course must show only colleges offering that course.
- Selecting a department must show only its relevant courses.
- Search must support college name, course name, department and district.
- Clear All must reset every filter correctly.
- Counts must represent actual matching records.
- No hardcoded counts.
- No false zero results because of incorrect field mapping.
- Preserve existing pagination and sorting.
- Ensure desktop, tablet and mobile responsiveness.

## 4. COLLEGE CARDS – INFORMATION CLARITY

Improve the Medical college cards to display:

- College name.
- District and location.
- Medical category.
- Department.
- Available courses.
- Course duration where verified.
- Management type.
- Applicable official institution identifier / regulatory code.

Do not display TNEA codes for medical colleges.

Keep the current Rasi Foundation branding, green/red color palette, typography and overall website design language.

## 5. BACKEND AND DATABASE IMPLEMENTATION

Inspect the existing Mongoose models, APIs, services and frontend data mapping.

Implement the necessary changes end-to-end:
- College model.
- Course model.
- Department mapping.
- Medical category mapping.
- API query filters.
- Search and pagination.
- Admin college/course create and edit functionality.
- Correct data persistence.

Ensure the public API returns the correct college-course-department relationships from MongoDB.

Do not use hardcoded arrays to fake database results.

If seed scripts or data migrations are required:
- Make them idempotent.
- Prevent duplicate colleges and courses.
- Preserve existing records.
- Provide before/after counts.
- Test on the intended development database.
- Never execute unverified destructive updates.

## 6. OFFICIAL DATA VERIFICATION

Use appropriate official sources for each stream, including relevant medical, AYUSH, nursing, pharmacy and allied health regulatory authorities.

For each newly added or corrected record, maintain:
- College name.
- Course name.
- Department.
- Course duration.
- Regulatory authority where applicable.
- Official source URL.
- Verification status.

If information cannot be verified, mark it for review rather than inventing data.

## 7. COMPLETE TESTING AND CODE REVIEW

After implementation, perform:

**Unit Tests**
- Medical category filtering.
- MBBS/BDS filtering.
- AYUSH filtering.
- Each AYUSH course filter.
- Nursing filtering.
- Pharmacy filtering.
- Allied Health filtering.
- Course and department mapping.
- Combined district/management/course filters.
- Search.
- Clear All.
- Pagination and result counts.

**Integration Tests**
- MongoDB college-course relationships.
- Public colleges API.
- Admin college/course APIs.
- Create/update persistence.
- Missing and invalid filter parameters.
- Empty-result handling.

**Frontend Tests**
- All filter combinations.
- Responsive layouts.
- Dropdown dependency behavior.
- Correct college cards.
- No broken images or UI overflow.

**Code Quality**
- Review changed files for bugs.
- Check console errors.
- Check API errors.
- Check incorrect database queries.
- Check duplicate records.
- Check missing/null field handling.
- Check performance and unnecessary API calls.
- Run ESLint.
- Run the complete test suite.
- Run the production build.

Fix all discovered issues before reporting completion.

## 8. FINAL VERIFICATION REPORT – MANDATORY

Provide a detailed report with:

1. Total Medical & Healthcare colleges found.
2. MBBS/BDS college count.
3. AYUSH college count.
4. AYUSH course-wise college counts (BAMS, BHMS, BUMS, BSMS, BNYS).
5. Nursing college and course counts.
6. Pharmacy college and course counts.
7. Physiotherapy college count.
8. Other Allied Health college and course counts.
9. Missing colleges added.
10. Missing courses and departments added.
11. Incorrect records corrected.
12. Duplicate records identified and resolved.
13. Official source verification summary.
14. MongoDB before/after record counts.
15. API testing results.
16. Unit test results.
17. Integration test results.
18. ESLint results.
19. Production build results.
20. Remaining bugs, warnings or unresolved items.

Include actual test command outputs and screenshots of the updated Medical filters and college results.

**FINAL ACCEPTANCE CONDITIONS:**
- AYUSH must not remain incorrectly at zero if verified AYUSH records exist.
- Every displayed college must show its correct available courses.
- Every course must map to the correct department.
- Every medical category filter must work correctly.
- Counts must match actual MongoDB query results.
- No fabricated college or course data.
- No broken functionality in existing website modules.
- No console errors or API errors in the tested flows.

also continoue this phase 2 

# ADDITIONAL CRITICAL REQUIREMENTS – PAYMENT SECURITY, SCHOLARSHIP EXAMINATION, AUTOMATIC SCOREBOARD EMAIL & PRODUCTION READINESS

These requirements are mandatory additions to the existing Rasi Foundation Medical & Healthcare implementation task.

IMPORTANT:
The existing website contains multiple working modules. Do not break, redesign, remove, or unnecessarily modify any existing functionality.

The following modules require special attention:
1. Payment and Razorpay security.
2. Scholarship examination and question bank.
3. Automatic student result and scoreboard email.
4. Production security and deployment readiness.
5. Git repository cleanup and dependency optimization.

Complete a proper audit first, then implement necessary fixes, then perform end-to-end testing.

Do not deploy to production during this task.

---

# 9. PAYMENT GATEWAY – COMPLETE SECURITY AUDIT & HARDENING

Payment security is a critical priority.

Inspect the complete existing Razorpay integration, including frontend, backend APIs, database models, payment records, callbacks, webhooks and environment configuration.

Do not assume that the integration is secure simply because a payment succeeds.

## A. Razorpay Integration Audit

Verify:

- Razorpay order creation.
- Payment initiation.
- Payment success handling.
- Payment failure handling.
- Payment verification.
- Signature verification.
- Webhook verification.
- Payment status synchronization.
- Database persistence.
- Duplicate payment prevention.
- Refund handling, if implemented.
- Registration and payment relationship.

## B. Critical Security Requirements

1. Never expose Razorpay Key Secret in frontend code.
2. Keep all sensitive payment credentials in server-side environment variables.
3. Calculate payment amounts on the backend using trusted server-side data.
4. Never trust payment amount, registration ID, payment status or user identity submitted directly by the browser.
5. Verify Razorpay payment signatures on the backend using the official verification mechanism.
6. Verify webhook signatures using the raw request body and webhook secret.
7. Reject invalid or manipulated payment callbacks.
8. Prevent duplicate payment processing using idempotency controls.
9. Prevent the same payment ID from being used for multiple registrations.
10. Ensure an unpaid or failed transaction cannot be marked as successful by modifying frontend requests.
11. Ensure payment status changes are controlled by verified server-side events.
12. Validate all request fields and sanitize inputs.
13. Protect payment endpoints against unauthorized access.
14. Avoid exposing sensitive payment details in API responses or logs.
15. Use HTTPS in production.

## C. Payment State Management

Verify that the payment lifecycle is consistent:

- CREATED
- PENDING
- SUCCESS
- FAILED
- REFUNDED, if supported

Use the existing application's status conventions where possible.

Ensure:

- A payment is not marked SUCCESS before signature verification.
- Failed payments do not create false successful registrations.
- Repeated webhook deliveries do not duplicate records or actions.
- Concurrent requests cannot produce duplicate successful payment records.
- The registration and payment records remain correctly linked.
- Payment reconciliation can identify incomplete or mismatched transactions.

## D. Razorpay Webhook Reliability

Inspect:

- Webhook endpoint authentication.
- Signature verification.
- Event processing.
- Duplicate event detection.
- Retry handling.
- Database transaction safety.
- Error handling.
- Logging without exposing secrets.

Ensure that repeated Razorpay webhook events are handled safely and idempotently.

Do not create a new webhook architecture unnecessarily if the existing implementation is already correct.

## E. Payment Testing

Perform controlled test-mode testing for:

1. Successful payment.
2. Failed payment.
3. Cancelled checkout.
4. Invalid signature.
5. Modified payment amount.
6. Duplicate payment callback.
7. Duplicate webhook delivery.
8. Unauthorized payment request.
9. Repeated payment request.
10. Network failure during payment verification.
11. Database failure during payment processing.
12. Registration/payment relationship verification.

Use Razorpay test credentials only. Never perform real production payments during testing.

Preserve the existing Razorpay integration and its user experience.

---

# 10. SCHOLARSHIP EXAMINATION – QUESTION BANK & EXAM LOGIC AUDIT

The Scholarship module is another critical existing feature.

Audit the complete scholarship examination workflow without breaking the existing registration, eligibility, examination, scoring and result functionality.

## A. Question Bank Audit

Inspect all existing scholarship question records.

Verify:

- Total question count.
- Subject/category distribution.
- Question and option completeness.
- Correct answer availability.
- Question duplication.
- Incorrect answer mappings.
- Missing options.
- Invalid question formats.
- Difficulty levels, if supported.
- Question active/inactive status.
- Question bank relationships.

Ensure that questions are retrieved correctly from the database.

Do not replace the existing question bank with hardcoded sample questions.

Do not delete valid questions.

## B. Exam Generation and Delivery

Verify:

1. Questions are selected correctly from the question bank.
2. The configured question count is respected.
3. Question randomization works where configured.
4. Options are randomized only if the existing design supports it.
5. Students receive the correct examination questions.
6. Questions are not unintentionally repeated within an examination attempt.
7. The correct examination configuration is used.
8. Exam duration is enforced by the backend.
9. Expired examination attempts cannot be submitted as valid new attempts.
10. Unauthorized users cannot access another student's examination.

## C. Exam Security

- Never expose correct answers to the browser before submission.
- Do not calculate the final score using client-side trusted values.
- Validate answers on the backend.
- Validate student identity and exam attempt ownership.
- Prevent duplicate submissions.
- Prevent score manipulation through API requests.
- Validate examination status and timing on the server.
- Protect result APIs against unauthorized access.
- Ensure students cannot access other students' personal details or scorecards.

## D. Scoring and Result Verification

Verify:

- Correct answer calculation.
- Incorrect answer calculation.
- Unanswered question calculation.
- Total marks.
- Percentage.
- Ranking or grade calculation, if implemented.
- Final result persistence.
- Student registration association.
- Duplicate submission prevention.

The backend must remain the source of truth for the final score.

Preserve the existing scholarship scoring rules. Do not change the marking scheme without explicit justification.

---

# 11. AUTOMATIC SCHOLARSHIP RESULT & SCOREBOARD EMAIL – MANDATORY FEATURE

This is a high-priority new feature.

When a student successfully finishes and submits the Scholarship examination, the system must automatically send an email to the student's registered email address.

The email must contain the student's details and examination scoreboard.

The email should be sent immediately after the final result has been successfully calculated and saved.

## A. Required Email Trigger

Expected workflow:

1. Student registers.
2. Student completes the scholarship examination.
3. Student submits the examination.
4. Backend validates the submission.
5. Backend calculates the final score.
6. Backend saves the result successfully.
7. Backend generates the student's scoreboard.
8. System automatically sends the result email to the registered email address.
9. Student receives the result and scoreboard.

Do not send the email before the result is saved successfully.

Do not send an email for an invalid, incomplete or unauthorized submission.

## B. Email Content

Create a professional Rasi Foundation branded HTML email.

Subject:

"Rasi Foundation – Your Scholarship Examination Result & Scorecard"

Include:

**Student Information**
- Student full name.
- Scholarship registration/application ID.
- Registered email.
- Mobile number, where appropriate.
- Examination date.
- Examination completion status.

**Scoreboard**
- Total questions.
- Correct answers.
- Incorrect answers.
- Unanswered questions.
- Total marks.
- Marks obtained.
- Percentage.
- Grade or rank, only if supported by the existing scoring logic.

**Email Footer**
- Rasi Foundation branding.
- Official contact information already configured in the project.
- A short thank-you message.
- Appropriate confidentiality notice.

Do not invent grades, ranks, scholarship awards or eligibility decisions.

Only display values calculated and saved by the backend.

## C. Scoreboard Format

The email must have a clean, professional scoreboard layout.

Example:

RASI FOUNDATION
SCHOLARSHIP EXAMINATION RESULT

Student Name: [Student Name]
Application ID: [Application ID]
Exam Date: [Exam Date]

--------------------------------
TOTAL QUESTIONS: [Total]
CORRECT ANSWERS: [Correct]
INCORRECT ANSWERS: [Incorrect]
UNANSWERED: [Unanswered]
TOTAL MARKS: [Maximum Marks]
SCORE OBTAINED: [Obtained Marks]
PERCENTAGE: [Percentage]
--------------------------------

Thank you for participating in the Rasi Foundation Scholarship Examination.

Use actual backend result values. The above is only a format reference.

## D. PDF Scorecard

If the existing project already supports PDF generation, reuse and integrate the existing PDF generator.

If PDF generation does not exist, implement a secure, server-side PDF scorecard only if it can be completed without unnecessary dependencies or breaking existing functionality.

If a PDF is generated:
- Use the actual saved result.
- Include student and examination details.
- Include the complete scoreboard.
- Use Rasi Foundation branding.
- Validate generated PDF content.
- Attach the PDF to the email or provide an authenticated, secure result download link.

Do not expose public predictable URLs containing student personal information.

## E. Email Service Integration

Inspect the existing email service before adding a new one.

Reuse the configured email provider if one already exists.

If email integration is missing, implement a suitable server-side email service using environment variables.

Never hardcode:
- SMTP passwords.
- API keys.
- Email provider secrets.
- Sender credentials.

Add required environment variable names to `.env.example` without actual credentials.

## F. Email Reliability and Duplicate Prevention

This is critical.

- Send exactly one result email per successfully finalized examination attempt.
- Prevent duplicate emails caused by repeated API calls or duplicate webhook-like events.
- Store email delivery status against the appropriate result/attempt record.
- Maintain statuses such as PENDING, SENT and FAILED using the existing schema conventions.
- Store message ID and delivery timestamps where supported.
- If sending fails, retain the saved examination result.
- Implement safe retry handling.
- Avoid resending an already successfully delivered result email.
- Ensure an email failure never deletes or invalidates the student's saved result.
- Do not block result persistence on external email provider availability.

If reliable asynchronous delivery is needed, implement a lightweight retryable email queue or outbox using the existing database and infrastructure.

Do not introduce unnecessary external queue infrastructure.

## G. Email Testing

Test the following:

1. Successful examination submission triggers one email.
2. Correct registered email receives the email.
3. Student details are accurate.
4. Scoreboard values match MongoDB result records.
5. PDF attachment opens correctly, if implemented.
6. Duplicate submission does not send duplicate emails.
7. Email provider failure does not affect saved results.
8. Retry sends the email successfully.
9. Invalid email handling.
10. Unauthorized users cannot trigger result emails for other students.
11. Sensitive student information is not exposed through public endpoints.
12. Multiple students receive their own correct result emails.

Use a test email account or mocked provider during testing. Do not send test messages to real students without authorization.

---

# 12. PRODUCTION SECURITY & CONFIGURATION AUDIT

Inspect the complete project for production readiness.

## A. Environment Variables

Audit:
- `.env`
- `.env.local`
- `.env.production`, if present.
- `.env.example`
- Vercel environment configuration references.
- Backend/frontend environment usage.

Ensure:
- No credentials are committed.
- No production secrets appear in frontend bundles.
- Server-only secrets remain server-side.
- Environment variable names are consistent.
- Missing mandatory configuration produces safe, clear errors.
- `.env.example` documents required variable names with placeholder values only.

Do not print actual secrets in the final report.

## B. Authentication and Authorization

Audit:
- Admin login.
- Password hashing.
- Session/token validation.
- Role permissions.
- Protected admin routes.
- Student identity verification.
- API authorization.
- Unauthorized access.
- Password reset functionality, if implemented.

Do not weaken existing authentication.

## C. API and Application Security

Check:
- Input validation.
- MongoDB query safety.
- NoSQL injection protection.
- XSS protection.
- CSRF protection where applicable.
- CORS configuration.
- Rate limiting on sensitive endpoints.
- Secure cookie settings.
- File upload validation.
- File type and size validation.
- Path traversal protection.
- Error message leakage.
- Sensitive information in logs.

Apply security improvements only where needed.

## D. Production Deployment Compatibility

Verify:
- MongoDB Atlas connection.
- Vercel serverless compatibility.
- File storage compatibility.
- Email provider configuration.
- Razorpay production configuration references.
- API routes and HTTP methods.
- Runtime and package compatibility.
- Image paths and static asset loading.
- Build and deployment configuration.

Do not claim production readiness solely because `next build` succeeds.

---

# 13. GIT REPOSITORY CLEANUP & DEPENDENCY OPTIMIZATION

The repository must be clean and production-ready.

However, this task must be performed very carefully.

**IMPORTANT: Do not blindly delete files, images, packages, configuration files or existing assets.**

## A. Git Ignore Audit

Inspect `.gitignore` and identify unnecessary generated or local files that should not be committed.

Ensure appropriate ignore rules for:
- node_modules/
- .next/
- build/
- dist/
- coverage/
- local environment files.
- debug logs.
- temporary files.
- local caches.
- editor-specific temporary files.
- OS-generated files.
- temporary test artifacts.

Keep:
- `.env.example`.
- Required package manifests.
- `package-lock.json`.
- Required Next.js configuration.
- Required deployment configuration.
- Required static website assets.
- Required source code.
- Required scripts and migration files.

Do not ignore source files or production assets required by Vercel.

## B. Unused Image and Asset Audit

Inspect all images and static assets.

Identify:
- Truly unused images.
- Duplicate images.
- Old generated images.
- Unreferenced temporary screenshots.
- Unused files in public folders.
- Assets referenced through dynamic paths.

Before removing any image:
1. Search the entire repository for references.
2. Inspect dynamic asset mappings.
3. Check CSS references.
4. Check database-driven image paths.
5. Check admin-uploaded asset references.
6. Check runtime-generated paths.

Do not delete an asset if its usage cannot be confidently ruled out.

Keep all seven newly approved HD Rasi Foundation images and every asset actually referenced by the website.

## C. Unused Package Audit

Inspect `package.json` and `package-lock.json`.

Identify:
- Unused production dependencies.
- Unused development dependencies.
- Duplicate libraries.
- Unnecessary packages.
- Packages required by build scripts.
- Packages used indirectly or dynamically.

Do not remove packages based only on static import searches.

Check:
- Next.js build plugins.
- Dynamic imports.
- CLI scripts.
- Deployment scripts.
- Test tools.
- Runtime dependencies.

Remove a dependency only when its usage has been verified as unnecessary.

After each safe cleanup:
- Run npm install or the appropriate lockfile-safe command.
- Confirm package-lock consistency.
- Run tests.
- Run lint.
- Run production build.

Do not update every dependency to the latest version as part of this cleanup.

Do not introduce breaking package upgrades.

## D. Git Cleanup Report

Provide:

- Files removed.
- Files retained.
- Images removed.
- Images retained.
- Packages removed.
- Packages retained.
- `.gitignore` changes.
- Repository size before and after, if measurable.
- Build and test status after cleanup.

Do not delete or rewrite Git history.

Do not force-push.

Do not remove user-created work or unrelated files.

---

# 14. FULL REGRESSION TESTING – ALL EXISTING MODULES

After implementing Medical & Healthcare changes, payment security improvements, scholarship question audit and automatic result email, run a full regression test.

The following existing modules must continue to work:

1. Homepage.
2. About.
3. Services.
4. Colleges.
5. Courses.
6. Medical & Healthcare filters.
7. Admission guidance.
8. Scholarship registration.
9. Scholarship examination.
10. Scholarship result and scoreboard.
11. Automatic result email.
12. Payment and Razorpay.
13. Enquiry forms.
14. Contact forms.
15. Admin login.
16. Admin dashboard.
17. College management.
18. Course management.
19. Scholarship question management.
20. Other existing modules and APIs.

Verify that changes to one module have not broken another module.

Use existing test data and safe test accounts.

Do not perform real payments or contact real students during testing.

---

# 15. FINAL SECURITY, QA & PRODUCTION READINESS REPORT

At the end of implementation, provide one consolidated report.

## A. Medical Module
- College counts by category.
- Course counts by department.
- AYUSH course-wise counts.
- Missing and corrected records.
- Filter test results.
- Database verification.

## B. Payment Security
- Razorpay integration audit.
- Signature verification result.
- Webhook security result.
- Amount manipulation test.
- Duplicate payment test.
- Unauthorized request test.
- Payment persistence verification.
- Remaining security issues.

## C. Scholarship Module
- Question bank total.
- Valid and invalid question counts.
- Duplicate questions.
- Course/category distribution where applicable.
- Exam generation test.
- Scoring verification.
- Submission security.
- Result persistence.

## D. Automatic Result Email
- Email trigger verification.
- Registered email validation.
- Student details correctness.
- Scoreboard accuracy.
- PDF attachment verification, if implemented.
- Duplicate email prevention.
- Retry behavior.
- Email provider failure handling.

## E. Repository Cleanup
- Git ignore audit.
- Unused image audit.
- Unused package audit.
- Files removed and retained.
- Package lock verification.
- Repository cleanup summary.

## F. Code Quality and Testing

Run and report actual results for:

- Complete unit tests.
- Integration tests.
- Payment security tests.
- Scholarship examination tests.
- Email tests.
- API tests.
- Frontend tests.
- ESLint.
- Type checking, if configured.
- Production build.
- Git working tree status.

## G. Final Production Readiness Verdict

Give separate verdicts:

1. Medical module – PASS / FAIL.
2. Payment security – PASS / FAIL.
3. Scholarship question bank – PASS / FAIL.
4. Scholarship examination security – PASS / FAIL.
5. Automatic result email – PASS / FAIL.
6. Git repository cleanup – PASS / FAIL.
7. Full regression testing – PASS / FAIL.
8. Production deployment readiness – PASS / FAIL.

For every FAIL or WARNING, provide the exact reason and recommended correction.

Never claim 100% secure or bug-free. Report only what was actually tested and verified.

# RASI FOUNDATION – DYNAMIC BACKEND-DRIVEN HOMEPAGE STATISTICS

In the homepage section titled **"Structured Guidance Across Every Stage of Admission"**, the statistics cards currently display:

- Courses Listed – 61
- Academic Streams – 7
- TN Districts Covered – 38
- Admission Roadmap – 6-Step

I need these statistics to be dynamically fetched from the backend/database instead of hardcoded frontend values.

## 1. Courses Listed – Dynamic Count

- Fetch the actual number of valid, active courses from MongoDB.
- Use the existing Course model and actual database records.
- Count unique valid courses without duplicate records.
- Include UG, PG and Diploma courses across all supported streams.
- Exclude inactive, deleted, invalid or duplicate records according to the existing data model.
- Do not use a hardcoded value such as 61.
- Ensure the displayed count matches the actual course directory data.

## 2. Academic Streams – Dynamic Count

- Fetch the number of actual supported academic streams from the database or existing authoritative stream configuration.
- Do not hardcode 7 if the actual supported streams change.
- Avoid counting duplicate stream values.

## 3. TN Districts Covered – Dynamic Count

- Fetch the number of unique Tamil Nadu districts represented by valid active college records.
- Normalize district names to avoid duplicate counting caused by spelling variations or inconsistent formatting.
- Exclude other states and invalid district records.
- Do not simply hardcode 38.

## 4. Admission Roadmap – Existing Configuration

- Inspect the existing admission journey configuration.
- Display the actual configured number of steps.
- Do not change the existing admission roadmap or payment workflow as part of this task.

## 5. Backend API Requirements

Create or extend an appropriate public statistics API using the existing project architecture.

Example response structure:

{
  "success": true,
  "data": {
    "coursesListed": 0,
    "academicStreams": 0,
    "districtsCovered": 0,
    "admissionRoadmapSteps": 0
  }
}

The numbers above are placeholders. Return actual calculated values.

Requirements:
- Use MongoDB as the source of truth for database-driven counts.
- Use efficient aggregation queries.
- Avoid unnecessary database calls.
- Handle empty results and database failures safely.
- Follow existing API response conventions.
- Use appropriate caching or revalidation without showing stale values indefinitely.
- Never expose database credentials or internal database information.

## 6. Frontend Integration

- Remove hardcoded statistics from the homepage.
- Fetch the values from the backend API.
- Display loading, error and empty states appropriately.
- Preserve the existing card design, icons, colors, typography, spacing and animations.
- Ensure the cards remain responsive on desktop, tablet and mobile.
- Do not redesign the homepage.

## 7. Data Accuracy Verification

Compare the homepage statistics against actual database aggregation results and the college/course directory.

Verify:
- Courses Listed matches unique active course records.
- Academic Streams matches supported unique streams.
- TN Districts Covered matches unique valid Tamil Nadu districts.
- Admission Roadmap matches the actual configured step count.

Provide the exact MongoDB aggregation/query results as evidence.

## 8. Testing and Safety

- Add unit tests for the statistics calculations.
- Add API integration tests.
- Test empty database results.
- Test duplicate courses and district names.
- Test inactive records.
- Test database connection failure.
- Test frontend loading and error states.
- Run ESLint and production build.



---

# 16. STRICT CHANGE CONTROL – DO NOT AFFECT UNRELATED MODULES

This is a critical instruction.

- Preserve all existing working features.
- Do not redesign unrelated pages.
- Do not change existing business rules without approval.
- Do not change Razorpay merchant configuration unnecessarily.
- Do not modify scholarship marking rules.
- Do not delete valid question bank data.
- Do not remove required packages.
- Do not delete referenced images.
- Do not alter production environment secrets.
- Do not deploy to production.
- Do not force-push.
- Do not make destructive database changes.
- Do not claim success without actual test evidence.

Before changing any shared model, API, middleware, configuration or common component, inspect every dependent module.

If a change has a risk of affecting an unrelated feature, isolate the implementation and add regression tests.

# ADDITIONAL REQUIREMENT – UG / PG / DIPLOMA COLLEGE FILTER

Update the existing College Directory filters to support Academic Level filtering.

Add a clear filter named **Academic Level** with these options:

1. All Levels
2. Undergraduate (UG)
3. Postgraduate (PG)
4. Diploma

## 1. Filter Behaviour

When the user selects:

- **UG:** Show colleges offering verified UG courses only.
- **PG:** Show colleges offering verified PG courses only.
- **Diploma:** Show colleges offering verified Diploma courses only.
- **All Levels:** Show all matching colleges.

The filter must work across all academic streams:
- Engineering
- Medical & Healthcare
- Arts & Science
- Management
- Law
- Agriculture
- Education
- Polytechnic

## 2. Important College Listing Logic

A college may offer both UG and PG courses.

Do not duplicate the college card when filtering by a particular academic level.

Instead:
- UG filter should show the college if it offers at least one valid UG course.
- PG filter should show the college if it offers at least one valid PG course.
- Diploma filter should show the college if it offers at least one valid Diploma course.

Inside the college details, display the relevant courses matching the selected academic level.

## 3. Dependent Filters

The filters must work together correctly:

- Academic Level
- Main Stream
- Medical Category
- Department
- Course
- District
- Management Type
- College Search

When a stream or category changes, update available academic levels, departments and courses accordingly.

Reset incompatible dependent filters when necessary.

## 4. Backend & Database

- Inspect the existing College and Course models.
- Verify whether academicLevel is already stored.
- Reuse existing fields if they correctly represent UG, PG and Diploma.
- If a schema enhancement is necessary, implement it consistently.
- Correctly map every course to its academic level.
- Do not classify courses using unreliable name-based assumptions.
- Do not create duplicate college records.
- Return actual MongoDB results through the API.
- Avoid hardcoded frontend lists or counts.

## 5. PG-Specific Verification

Audit all existing PG courses and their colleges.

Examples include:
- M.E / M.Tech
- M.Sc
- M.A
- M.Com
- MBA
- MCA
- M.Pharm
- M.Sc Nursing
- MDS
- MD / MS
- Other verified postgraduate programs.

These are examples for auditing, not a list to assign blindly. Use actual course availability and official institutional information.

## 6. Testing

Test:
- All Levels.
- UG only.
- PG only.
- Diploma only.
- UG + District.
- PG + Stream.
- PG + Course.
- Medical + PG.
- Search + Academic Level.
- Clear All.
- Colleges offering both UG and PG.

Ensure accurate result counts, no duplicate college cards, correct course mapping and responsive UI.

Do not affect existing filters, payment, scholarship, admission or unrelated website modules.

Do not deploy to production.

Final report must include actual UG, PG and Diploma college counts, course counts, database verification and test results.

**FINAL OBJECTIVE:**

Deliver a properly tested, secure, stable and production-ready Rasi Foundation website.

The Medical & Healthcare module must work with verified real data.

Payment processing must be securely verified.

Scholarship examinations must be protected against score manipulation and unauthorized access.

Every successfully completed scholarship examination must automatically generate and deliver the correct student result and scoreboard email.

The Git repository must be clean without removing any required production assets or dependencies.

Production deployment must remain disabled until every critical acceptance condition has passed and the final report clearly confirms readiness.

Do not deploy to production. Do not claim 100% completion unless all acceptance conditions have been tested and passed.

Work carefully and complete the full implementation, not just an audit or a visual prototype.

Do not modify unrelated modules.
Do not change existing college, course, scholarship, payment or admission business logic.
Do not deploy to production.

At the end, provide the exact before/after counts and test results.

**Acceptance condition:** Homepage statistics must always be derived from the actual backend data or existing authoritative configuration. No manually hardcoded statistics are allowed.