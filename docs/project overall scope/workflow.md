# Rasi Foundation: Workflows (as implemented in code)

> **DRAFT: pending business-owner review.** Traced from source on 2026-10-24. Each workflow lists the user action, frontend call, backend processing, DB change and status transitions. Steps not visible in code are marked **Not found in code** / **Needs confirmation**. Nothing here was executed at runtime.

## 1. Scholarship Test

Pages: `src/pages/scholarship-test/{index,register,select-subject,exam,result}.js`. APIs: `src/pages/api/scholarship/*`.

| # | User action | Frontend | Backend | DB change / status |
|---|---|---|---|---|
| 1 | Student fills registration form | `register.js` → `POST /api/scholarship/register` | Validates 13 required fields; rejects duplicate mobile/email (400, response includes existing token) | Creates `ScholarshipStudent`, `testStatus: registered`, generates `registrationToken` |
| 2 | Student enters token on landing page | `index.js` → navigates to `select-subject?token=` | none | none |
| 3 | Token checked | `select-subject.js` → `GET /api/scholarship/verify-token` | Finds student; reports completed / in-progress / ready | none |
| 4 | Student picks third subject | `select-subject.js` → `POST /api/scholarship/start-test` | Valid: Mathematics, Botany, Zoology, Biology; Vocational → Mathematics only. Resume if live session; expire if over time. Samples 35 questions per subject (Physics, Chemistry, third subject) | Student: `testStatus: in_progress`, `thirdSubject`, `testStartTime`. Creates `TestSession` (`in_progress`, 90 min) |
| 5 | Exam | `exam.js` → `GET /api/scholarship/questions?sessionId=`, `POST /api/scholarship/save-answer` per answer | Hides correct answers; enforces time and session membership; computes correctness | `TestSession.answers` upserted; score fields recalculated in pre-save hook |
| 6 | Submit (manual) | `exam.js` → `POST /api/scholarship/submit-test`, then `result?session=` | Marks completed; returns scores | Session: `completed`, `endTime`. Student: `completed`, `testEndTime` |
| 7 | View result | `result.js` → `GET /api/scholarship/result` | Only when session completed | none |
| 8 | Admin review | `admin/scholarship-results.js` → `GET/DELETE /api/admin/scholarship-results` | Paginated list, stats; delete removes the session | Deleting a session does **not** reset the student's `testStatus` |

Status values in code:
- Student: `registered` → `in_progress` → `completed`.
- Session: `pending`, `in_progress`, `completed`, `expired`, and `disqualified`. `pending` is the model default; the code that sets `expired` is in `start-test`, `questions` and `save-answer`; **nothing sets `disqualified`**.

Observations / gaps:
- **Auto-submit at timeout:** the exam page has a timer (`setInterval`); whether it auto-submits on expiry is **Unverified** (not traced). The server has no background job; an expired session is only marked `expired` when someone calls an endpoint on it.
- **Scoring:** 1 mark per correct answer, no negative marking.
- **Payment gating:** a `scholarship_test` payment purpose (₹200, fixed, in defaults) exists, but **no code links payment to test access**. **Needs confirmation:** is the test free or paid?
- **Results/awards:** no cut-off, ranking, scholarship-amount, or notification logic found. **Needs confirmation.**
- **Question bank:** loaded by `POST /api/scholarship/seed-questions` (admin key) from sample questions in source; there is **no admin page** for scholarship questions (`admin/questions.js` manages the public Question Corner). **Needs confirmation:** how real questions are meant to be maintained.
- The registration token is the only credential and is disclosed in the duplicate-registration response.

## 2. Practice Test

Page `src/pages/practice-test.js`; APIs `api/practice-test/*`.

1. Student chooses a subject → `GET /api/practice-test/questions?count=15&subject=…` (static question files in `src/data/`, answers stripped).
2. Timer runs in the page (2 min per question, from API `duration`).
3. Student submits name, email, optional phone, answers → `POST /api/practice-test/submit`.
4. Server scores against the static banks, saves `PracticeTestResult` (status `completed`), returns grade and per-question correct answers.

No admin screen for practice results was found. The model has status `abandoned`, but nothing sets it. No email is sent.

## 3. Payment

Page `src/pages/payment.js` (purposes and UPI VPA loaded server-side from `PaymentSetting` / `SiteSetting key=upi_vpa`; falls back to built-in defaults).

**Razorpay path**
1. Student enters name, email, phone, purpose (and optional student name); amount comes from the purpose's setting or user input.
2. `POST /api/payment/create-order` → Razorpay order (no DB write).
3. Razorpay Checkout opens in browser (script from `checkout.razorpay.com`).
4. On success the page calls `POST /api/payment/verify` → HMAC check → `Payment` saved with `status: completed`.
5. Admin sees it in `admin/payments.js` (shown as `paid`).

**UPI-app path:** if `upiVpa` is configured the page builds `upi://` / app-specific deep links (Google Pay, PhonePe, Paytm, BHIM) and redirects the browser. **No record is created and no confirmation is received**; there is no way for the system to know whether a UPI payment happened. If no VPA is set it falls back to the Razorpay path.

Gaps / risks: amount is client-controlled and not reconciled; no webhook, so a paid order whose browser callback fails is never recorded; `created` / `pending` / `failed` / `refunded` statuses are never written; no receipt or notification. **Needs confirmation:** required reconciliation and refund process.

## 4. Biodata (Admission Details) Form

1. Student submits form at `src/pages/biodata.js` → `POST /api/biodata/submit`.
2. Server validates 19 required fields and saves `BioData` with `status: pending`.
3. Server asynchronously appends a row to a Google Sheet through SheetDB if `SHEETDB_URL` is set (failures are only logged).
4. Admin (`admin/biodata.js`) searches/filters, opens a record, updates `status` (`pending` → `reviewed` → `contacted`) and `adminNotes` via `PUT /api/admin/biodata/[id]`.

`documents` is a list of document names the student ticks as "ready to submit" (`biodata.js`); **no file upload** exists. Not found in code: notification to student or staff, link between a biodata record and a scholarship registration or payment.

## 5. Contact

1. Visitor submits `src/pages/contact.js` → `POST /api/contact` → `Contact` created (default status `new`).
2. Admin (`admin/contacts.js`) views the list and updates status (`new` / `read` / `responded`) or deletes (`/api/admin/contacts/[id]`).
3. Dashboard counts "new" contacts.

No email notification to staff or acknowledgement to the visitor was found.

## 6. Enquiry and Question Corner

- APIs `POST /api/enquiry` and `POST /api/questions` exist, with admin management pages (`admin/enquiries.js`, `admin/questions.js`).
- **No public page calling these endpoints was found**, so the end-to-end user flow is unconfirmed. **Needs confirmation:** are these features meant to be live?
- Intended admin flow per models: enquiry status `pending` → `contacted` → `enrolled` / `closed`; question `isAnswered` + `answer` + `isPublished`. Only published and answered questions are shown by `GET /api/questions`.

## 7. Admin workflows

1. `admin/login.js` → `POST /api/admin/login` → token stored in `localStorage` (`adminToken`), redirect to `/admin`.
2. Admin pages call `/api/admin/*` with `Authorization: Bearer`. Token lifetime 7 days; no refresh; logout only clears `adminToken`/`adminUser` from `localStorage` (the JWT stays valid until expiry).
3. Content admin: colleges (CRUD, seed), achievements (CRUD, seed), announcements (API exists and `AdminLayout` links to `/admin/announcements`, but **no `src/pages/admin/announcements.js` page exists**, so the nav link is broken), payment settings and UPI VPA (`admin/payment-settings.js`, uses `/api/admin/payment-settings` and `/api/admin/site-settings`).
4. Review admin: biodata, contacts, enquiries, questions, payments, scholarship results.

## 8. Public content display

Colleges, achievements, announcements (also via `NotificationBar` component: **Unverified**), home page, courses, about: data from the public GET APIs in `backend api's.md`. `src/pages/sitemap.xml.js` generates the sitemap (content **Unverified**).

## 9. Open workflow questions (need business-owner confirmation)

1. Is the scholarship test free or paid? Should payment gate access?
2. What happens after the test (ranking, scholarship slabs, notifications, result publication date)?
3. Who maintains scholarship questions and how?
4. Are Enquiry and Question Corner meant to be publicly submitted?
5. What notifications (email/SMS/WhatsApp) are required for contact, biodata, payment and test events?
6. How should UPI payments be confirmed and reconciled?
7. Should deleting a scholarship result allow the student to retake?
