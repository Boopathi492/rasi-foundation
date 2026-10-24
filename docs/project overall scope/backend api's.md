# Rasi Foundation: Backend API Reference

> **DRAFT: pending business-owner review.** Written from source inspection on 2026-10-24 (branch `boopathi/dev`). No route was executed; "declared in code" does not mean "verified working". Items marked **Unverified** or **Needs confirmation** are not established by code.

## 1. Architecture

- Backend = Next.js 14 **Pages Router API routes** in `src/pages/api/**` (no separate server). Handlers contain the logic directly; there is no controller/service layer.
- DB: MongoDB via Mongoose. Connection helper `src/backend/lib/mongodb.js`; models in `src/backend/models/*`.
- Import aliases (`jsconfig.json`): `@/lib/*` → `src/backend/lib/*`, `@/models/*` → `src/backend/models/*`, `@/backend/...` → `src/backend/...`. Both styles are used across routes.
- Deployment config: `vercel.json` (region `bom1`, API `maxDuration` 10 s, `Cache-Control: s-maxage=60, stale-while-revalidate=300` on `/api/*`).
- No tests exist. `scripts/test-*.js` are manual scripts (contents not reviewed).

## 2. Authentication & authorization (as implemented)

| Aspect | Code behaviour | File |
|---|---|---|
| Login | `POST /api/admin/login` compares `username`/`password` to a single admin from env `ADMIN_USERNAME` / `ADMIN_PASSWORD`, with **hardcoded fallback values in source** if unset | `src/pages/api/admin/login.js` |
| Token | JWT signed with env `JWT_SECRET` (**hardcoded fallback in source**), payload `{username, name}`, expiry 7 days | `login.js` |
| Guard | `withAuth(handler)` requires `Authorization: Bearer <jwt>`; returns `401 {message:'Unauthorized'}` otherwise | `src/backend/lib/auth.js` |
| Roles | None. Any valid token is full admin. | |
| Client storage | Admin token kept in browser `localStorage` (`adminToken`) | `src/pages/admin/login.js` |
| Student access | No accounts. Scholarship test is gated only by a `registrationToken` / `sessionId`. | `api/scholarship/*` |

Legend below: **P** = public (no auth in code), **A** = admin JWT via `withAuth`, **Other** = described in row.

## 3. Public API

### 3.1 Content
| Method | Path | Auth | Behaviour (from code) | Status codes | File |
|---|---|---|---|---|---|
| GET | `/api/announcements` | P | Active announcements with no expiry or a future `expiryDate`, sorted by `priority` desc, `createdAt` desc. Returns `{success, data}`. | 200, 405, 500 | `api/announcements.js` |
| GET | `/api/colleges` | P | Active colleges grouped by `district` → `[{district, colleges:[{_id,name,location,tneaCode,note}]}]`. | 200, 405, 500 | `api/colleges/index.js` |
| GET | `/api/achievements` | P | Published + active achievements grouped as `{stats, milestones, recognitions, placements, spotlights}`. Types `success_story` are **not returned** by this route (no group for it). | 200, 405, 500 | `api/achievements/index.js` |
| POST | `/api/achievements/react` | P | Body `{id}`. Atomically increments `reactions` by 1; returns `{success, reactions}`. No per-user/IP limit (repeatable). | 200, 400, 404, 405, 500 | `api/achievements/react.js` |

### 3.2 Enquiries, contact, questions
| Method | Path | Auth | Behaviour | File |
|---|---|---|---|---|
| GET | `/api/contact` | **P** | Returns **all** Contact documents (name, email, phone, subject, message, status). | `api/contact/index.js` |
| POST | `/api/contact` | P | `Contact.create(req.body)`; returns 201 `{success,data}`; validation errors → 400 `{success:false,error}`. Required fields per model: see §6. | same |
| GET | `/api/enquiry` | **P** | Returns **all** Enquiry documents. | `api/enquiry/index.js` |
| POST | `/api/enquiry` | P | `Enquiry.create(req.body)`. | same |
| GET | `/api/questions` | P | Published **and** answered questions, excluding `email` and `phone`. | `api/questions/index.js` |
| POST | `/api/questions` | P | `Question.create(req.body)`: whole body is passed to the model (can include `isAnswered`, `isPublished`, `answer`). | same |

Frontend consumers: `pages/contact.js` calls `POST /api/contact`. No page calling `/api/enquiry` or `/api/questions` was found (**Needs confirmation**: are these features live?).

### 3.3 Biodata (admission form)
| Method | Path | Auth | Behaviour | File |
|---|---|---|---|---|
| POST | `/api/biodata/submit` | P | Requires 19 fields (`studentName, dateOfBirth, courseApplied, admissionType, collegeName, quota, fatherName, motherName, community, address, studentMobile, studentEmail, aadhaarNumber, fatherMobile, motherMobile, plusTwoGroup, plusTwoExamNumber, expectedCutOff, lastSchoolAndPlace`), else 400 `{message:'<field> is required'}`. Saves `BioData` (status default `pending`), then fire-and-forget `appendBioDataRow` to SheetDB (only if env `SHEETDB_URL` is set; failure is logged only). Returns 201 `{success, id}`. Passes `req.body` straight to the model. | `api/biodata/submit.js`, `backend/lib/googleSheets.js` |

Side effect: Aadhaar number is stored in MongoDB and sent to SheetDB in plain text.

### 3.4 Payments
| Method | Path | Auth | Behaviour | File |
|---|---|---|---|---|
| GET | `/api/payment/settings` | P | If no `PaymentSetting` exists, **inserts 6 defaults**; returns enabled settings. **No frontend caller found**: `pages/payment.js` reads settings directly in `getServerSideProps`. | `api/payment/settings.js` |
| POST | `/api/payment/create-order` | P | Body `{amount, currency='INR', receipt?, notes?}`. `amount` < 1 → 400. Creates a Razorpay order for `Math.round(amount*100)` paise. Returns `{success, order:{id,amount,currency,receipt}}`. Amount is client-supplied, **not checked against `PaymentSetting`**. No DB write. | `api/payment/create-order.js` |
| POST | `/api/payment/verify` | P | Body `{razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentDetails}`. Recomputes HMAC-SHA256 (`order_id|payment_id`, key `RAZORPAY_KEY_SECRET`); mismatch → 400. On match saves `Payment` with `status:'completed'`; `amount`, `purpose`, contact fields come from client `paymentDetails`. No duplicate check, no amount reconciliation with Razorpay. | `api/payment/verify.js` |
| POST | `/api/payment/create-qr` | P | Body `{amount, purpose}`. Returns `{upiLink, ref}` (`upi://pay?pa=<UPI_VPA>…`). No DB write. **No frontend caller found**; the UI builds UPI links itself with `upiVpa` from SiteSetting key `upi_vpa`. | `api/payment/create-qr.js` |

Not found in code: Razorpay webhooks, refunds, receipts/invoices, any record of UPI-app payments, any code that sets `Payment.status` to `created`/`pending`/`failed`/`refunded`.

### 3.5 Practice test (no login)
| Method | Path | Behaviour | File |
|---|---|---|---|
| GET | `/api/practice-test/questions?subject=&count=` | Subjects `Physics` (default), `Chemistry`, `Mathematics`, `Botany`, `Zoology`, `Biology` (Botany+Zoology). `count` clamped 5–35 (default 15). Picks ~30% easy / 40% medium / rest hard from **static files** `src/data/*Questions.js`. Strips `correctAnswer`. `duration` = count × 2 minutes. | `api/practice-test/questions.js` |
| POST | `/api/practice-test/submit` | Body `{studentName, email, phone?, answers[], timeTaken?, subject}`; name, email, answers required. Scores against static banks (unknown question IDs are dropped). Saves `PracticeTestResult`. Returns score, percentage, grade (A+ ≥90 … F <40) and per-question details **including correct answers**. | `api/practice-test/submit.js` |

### 3.6 Scholarship test
| Method | Path | Behaviour | File |
|---|---|---|---|
| POST | `/api/scholarship/register` | 13 required fields (`name, dateOfBirth, fatherName, community, address, studentMobile, fatherMobile, admissionCourse, collegeName, plus2Group, plus2ExamNumber, expectedCutOff, lastStudiedSchool`); `studentEmail`, `motherMobile` optional. Duplicate mobile (or email, if given) → 400 **and the response includes the existing `registrationToken`**. Creates `ScholarshipStudent`; token format `RASI-<base36 time>-<random>` (pre-save hook). 201 returns `{registrationToken, name, email, plus2Group}`. | `api/scholarship/register.js` |
| GET | `/api/scholarship/verify-token?token=` | 400 missing token; 404 unknown; 400 `testCompleted:true` if session completed; 200 `testInProgress:true` + `sessionId` if a live session exists; otherwise 200 student summary. | `api/scholarship/verify-token.js` |
| POST | `/api/scholarship/start-test` | Body `{registrationToken, thirdSubject}`; `thirdSubject` ∈ Mathematics, Botany, Zoology, Biology. `Vocational` students must pick Mathematics. Rejects completed students. Resumes a live in-progress session; marks an over-time one `expired` (400). Otherwise samples **35 questions each** of Physics, Chemistry and the third subject from active `ScholarshipQuestion`s, creates `TestSession` (duration **90 min**, stores IP and user-agent), sets student `testStatus:'in_progress'`. 201 returns `{sessionId, totalQuestions, duration, subjects, startTime}`. If a subject has fewer than 35 active questions the session is smaller (code does not check): **Needs confirmation**. | `api/scholarship/start-test.js` |
| GET | `/api/scholarship/questions?sessionId=` | Session must be `in_progress` and within time (else sets `expired`, 400). Returns ordered questions **without** `correctAnswer`/`explanation`, saved answers, and remaining time. | `api/scholarship/questions.js` |
| POST | `/api/scholarship/save-answer` | Body `{sessionId, questionId, answer}`; `answer` must be A/B/C/D (or empty to clear). Enforces in-progress, time limit, and that the question belongs to the session. Computes `isCorrect` server-side and upserts the answer. | `api/scholarship/save-answer.js` |
| POST | `/api/scholarship/submit-test` | Body `{sessionId}`. 404 unknown; 400 if already completed. Sets session `completed` + `endTime`, student `testStatus:'completed'`. Score is computed in the `TestSession` pre-save hook (1 mark per correct answer; no negative marking in code). **No explicit time-limit check on this route** (answers after expiry are rejected by `save-answer`). | `api/scholarship/submit-test.js` |
| GET | `/api/scholarship/result?token=` or `?session=` | Only when session `completed`. Returns student summary (including `registrationToken`) and score breakdown. | `api/scholarship/result.js` |
| POST | `/api/scholarship/seed-questions` | **Not JWT.** Body `adminKey` must equal a **string literal in source**; then **deletes all** `ScholarshipQuestion`s and inserts bundled sample questions (repeated to reach ≥50 per subject). | `api/scholarship/seed-questions.js` |

Not found in code: payment check before test start, ranking/cut-off/award logic, result publishing step, email/SMS to students, anti-cheating beyond IP/UA capture (status `disqualified` exists in the model but nothing sets it).

### 3.7 Utility / seed (unauthenticated)
| Method | Path | Behaviour | File |
|---|---|---|---|
| GET, POST | `/api/seed-colleges` | If **no** colleges exist, inserts the bundled list; otherwise returns `action:'none'`. | `api/seed-colleges.js` |
| GET | `/api/test-db` | Connects to MongoDB; 200 `{success:true,message}` or 500 `{success:false,error:<message>}` (leaks error text). | `api/test-db.js` |

## 4. Admin API (all require JWT unless noted)

| Method | Path | Behaviour | File |
|---|---|---|---|
| POST | `/api/admin/login` | **Public.** Body `{username,password}` → 400 / 401 / 200 `{token,user}`. | `admin/login.js` |
| GET | `/api/admin/dashboard` | Counts: contacts (total/new), enquiries (total/pending), questions (total/unanswered), colleges (total/active); 5 latest contacts & enquiries. | `admin/dashboard.js` |
| GET, POST | `/api/admin/colleges` | List all; create (requires `name, location, district`). | `admin/colleges/index.js` |
| GET, PUT/PATCH, DELETE | `/api/admin/colleges/[id]` | Read; partial update of whitelisted fields (`name, location, district, tneaCode, note, isActive, order, departments, website`); hard delete. | `admin/colleges/[id].js` |
| POST | `/api/admin/colleges/seed` | Seeds only if the collection is empty (else 400). | `admin/colleges/seed.js` |
| POST | `/api/admin/seed-departments` | Seeds department data (seed content **Unverified**). Does its own `jwt.verify` with fallback secret `'rasi-secret-key'` (differs from `auth.js`). | `admin/seed-departments.js` |
| GET, POST | `/api/admin/achievements` | List all; create from raw body. | `admin/achievements/index.js` |
| GET, PUT/PATCH, DELETE | `/api/admin/achievements/[id]` | CRUD, raw body update with validators. | `admin/achievements/[id].js` |
| POST | `/api/admin/achievements/seed` | Seeds only if empty. | `admin/achievements/seed.js` |
| GET, POST, PUT/PATCH, DELETE | `/api/admin/announcements` | CRUD; id from `?id=` (or body for PUT/PATCH). DELETE returns 200 even if the id did not exist. | `admin/announcements.js` |
| GET | `/api/admin/biodata?search=&status=` | Lists submissions (regex search on name/email/course/mobile), plus counts per status. | `admin/biodata.js` |
| GET, PUT | `/api/admin/biodata/[id]` | Read; update with raw body (used for `status`, `adminNotes`). | `admin/biodata/[id].js` |
| GET | `/api/admin/contacts` | List. | `admin/contacts/index.js` |
| GET, PATCH, DELETE | `/api/admin/contacts/[id]` | PATCH uses `$set: req.body` (unvalidated). | `admin/contacts/[id].js` |
| GET | `/api/admin/enquiries` | List. | `admin/enquiries/index.js` |
| GET, PATCH, DELETE | `/api/admin/enquiries/[id]` | Same pattern as contacts. | `admin/enquiries/[id].js` |
| GET | `/api/admin/questions` | List. | `admin/questions/index.js` |
| GET, PATCH, DELETE | `/api/admin/questions/[id]` | Same pattern (used to answer/publish). | `admin/questions/[id].js` |
| GET | `/api/admin/payments` | **Two files define this route:** `admin/payments.js` and `admin/payments/index.js` (**Next.js route conflict; which one is served is Unverified**). `payments.js` maps `completed`→`paid` and counts paid/pending/amount. `payments/index.js` filters on status `'paid'`, which the model never stores, so its stats would show 0 paid. | both files |
| GET, PUT | `/api/admin/payment-settings` | GET seeds defaults if empty and returns all; PUT upserts by `purpose` from `{settings:[…]}` (400 if not an array). | `admin/payment-settings.js` |
| GET, PUT | `/api/admin/site-settings` | Key/value store (`SiteSetting`); `upi_vpa` is read by `pages/payment.js`. PUT does not validate the payload shape. | `admin/site-settings.js` |
| GET, DELETE | `/api/admin/scholarship-results` | GET: paginated `TestSession`s (`page`, `limit`, `search`, `status`) with student summary and stats (completed, in progress, pending, expired, avg %, highest score, last 7 days). Search is applied **after** pagination, so it only filters the current page. DELETE `?id=` removes a session (the student record's `testStatus` is **not** reset). | `admin/scholarship-results.js` |

## 5. Documentation-vs-code consistency notes

- `README.md` describes `src/lib`, `src/models`, `src/components`; actual folders are `src/backend/*`, `src/frontend/*` (plus legacy duplicates in `src/components/`).
- `.env.example` lists 4 variables; code also reads `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `UPI_VPA`, `NEXT_PUBLIC_UPI_VPA`, `SHEETDB_URL`.
- `package.json` includes `googleapis` but only SheetDB (plain `fetch`) is used: **Needs confirmation** whether Google API integration is planned.

## 6. Data models (fields summarised from `src/backend/models/*`)

`Achievement`, `Announcement`, `BioData`, `College`, `Contact`, `Enquiry`, `Payment`, `PaymentSetting`, `PracticeTestResult`, `Question`, `ScholarshipQuestion`, `ScholarshipStudent`, `SiteSetting`, `TestSession`. Enumerations confirmed in code:

- `BioData.status`: pending / reviewed / contacted; `admissionType`: UG / PG / Lateral Entry; `quota`: GQ / MQ.
- `Contact.status`: new / read / responded. `Enquiry.status`: pending / contacted / enrolled / closed.
- `Question.category`: medical, engineering, management, law, arts, other.
- `Payment.purpose` and `PaymentSetting.purpose`: counseling, admission, scholarship_test, course_fee, donation, other. `Payment.status`: created, pending, completed, failed, refunded.
- `Announcement.type`: general, scholarship, admission, urgent.
- `Achievement.type`: milestone, success_story, stat, recognition, placement, spotlight; `status`: draft, published, archived.
- `ScholarshipStudent.community`: OC, BC, BCM, MBC, SC, SCA, ST, Other; `plus2Group`: Academic, Vocational; `testStatus`: registered, in_progress, completed.
- `TestSession.status`: pending, in_progress, completed, expired, disqualified.

Full field-level schemas were summarised, not exhaustively reviewed; consult the model files for exact required/default rules.
