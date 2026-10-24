# Rasi Foundation: Project Overall Scope

> **DRAFT: pending business-owner review.** Derived from the repository (branch `boopathi/dev`, one commit, inspected 2026-10-24). It records what the code shows, not what the business intends. No earlier scope document existed in any branch. Items marked **Unverified** or **Needs confirmation** are not established by code. See also `workflow.md` and `backend api's.md` in this folder.

## 1. Project identity
- **Name:** Rasi Foundation website, "Empowering minds! Igniting future!" (`package.json`, `README.md`). Career guidance and education consultancy (`README.md`).
- **Logo:** the Rasi Foundation logo (red circular seal, graduation cap and "R", motto "Think Admission! Think RASI!!") was supplied by the project owner as the **official logo**. The site currently references `public/logo.png` and `public/logo2.png`; whether they match the official file is **Unverified**. No UI change is part of this task.
- **Contacts recorded in README:** founder Prof. P. Gunasekaran; administrative director P. Yuvaraj Kumar; email `rasipuramrasifoundation@gmail.com` (phone numbers in `README.md`).

## 2. Technology and architecture
| Layer | Implementation |
|---|---|
| Frontend | Next.js 14 (Pages Router), React 18, Tailwind CSS, Framer Motion, react-icons |
| Backend | Next.js API routes (`src/pages/api`), Node |
| Database | MongoDB with Mongoose (14 models in `src/backend/models`) |
| Payments | Razorpay (`razorpay` package, Checkout.js script) plus UPI deep links |
| Data sync | SheetDB webhook for biodata rows (env `SHEETDB_URL`) |
| Hosting config | Vercel (`vercel.json`, region `bom1`) |
| Folders | `src/pages`, `src/frontend/{components,styles}`, `src/backend/{lib,models}`, `src/data` (static practice questions), `scripts/` (seed/debug scripts) |

Note: `README.md` ("MERN stack", `src/lib`, `src/models`) is outdated relative to this layout. Legacy duplicates exist in `src/components/`.

Environment variable **names** read by code: `MONGODB_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `UPI_VPA`, `NEXT_PUBLIC_UPI_VPA`, `SHEETDB_URL` (`.env.example` lists only `MONGODB_URI`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`; no `.env` values were read).

## 3. Implemented functionality (code present; runtime not verified)
1. **Public website pages:** home, about, courses, achievements, announcements, colleges, contact, 404, sitemap (`src/pages/*.js`).
2. **Colleges directory** grouped by district with TNEA code and note; admin CRUD and seeding.
3. **Achievements** (stats, milestones, recognitions, placements, spotlights) with a public reaction counter; admin CRUD, seed, draft/published/archived.
4. **Announcements** with priority, expiry, types general/scholarship/admission/urgent. Public API and admin API exist.
5. **Contact form** with admin status tracking (new / read / responded).
6. **Biodata (admission details) form** with 19 mandatory fields, admin review (pending / reviewed / contacted, notes) and Google Sheets sync.
7. **Scholarship Test:** registration, token, third-subject selection, randomised 35 + 35 + 35 question test, 90-minute timer, server-side scoring, result page, admin results view. See `workflow.md` §1.
8. **Practice Test:** six subject options from static question banks, scoring, grade, saved result.
9. **Payments:** purpose-based payment page, Razorpay order, signature verification, saved `Payment`, admin payment list, admin-editable fees and UPI VPA.
10. **Admin panel:** JWT login, dashboard (contacts/enquiries/questions/colleges counts), pages for achievements, biodata, colleges, contacts, enquiries, payments, payment settings, questions, scholarship results.

## 4. Partially implemented
| Item | What exists | What is missing / unclear |
|---|---|---|
| Enquiry | Model, `POST/GET /api/enquiry`, admin page | No public page found calling it |
| Question Corner | Model, public API, admin page (answer/publish) | No public submission page found |
| Announcements admin | Admin API and nav link in `AdminLayout` | No `admin/announcements.js` page (broken link) |
| Payments | Razorpay flow works on paper | UPI-app payments unrecorded; no webhook; statuses `created/pending/failed/refunded` never written; amount not reconciled |
| Payment ↔ Scholarship | `scholarship_test` fee (₹200, fixed) exists | No code ties payment to test access |
| Site settings | Admin GET/PUT; `upi_vpa` read by payment page | Other keys, if any, unknown |
| Scholarship question bank | Seed API with sample questions | No admin UI to manage; real source/ownership unknown |
| Disqualification | `disqualified` status exists in model | Nothing sets it |
| Google integration | `googleapis` dependency; SheetDB used | `googleapis` unused |

## 5. Documented/expected but not found in code
There was no prior documentation, so nothing is "documented but missing". The following are **commonly expected for this kind of site but absent** and listed only so the owner can confirm whether they are in scope: email/SMS/WhatsApp notifications; file uploads; multiple admin users/roles; Razorpay webhooks, refunds, receipts; scholarship ranking/cut-off/award logic; password reset; automated tests; CI/CD config other than `vercel.json`.

## 6. Implemented but previously undocumented
Practice Test module; Payment settings and UPI link handling; Biodata → Google Sheets sync; achievement reaction counter; site-settings key/value store; seed endpoints and scripts (`scripts/*`); caching and security headers in `vercel.json`.

## 7. Security risks and confirmed defects
**Security (confirmed from source):**
1. **Public endpoints expose personal data:** `GET /api/contact` and `GET /api/enquiry` have no authentication and return every record (names, emails, phones, messages).
2. **Hardcoded fallback secrets/credentials** in source for admin login and JWT signing (`api/admin/login.js`, `backend/lib/auth.js`); a second, different fallback secret in `admin/seed-departments.js`. Exploitable if env vars are unset in production (**Unverified** which are set).
3. **Hardcoded seed key** in `api/scholarship/seed-questions.js`; the endpoint wipes all scholarship questions.
4. **Unauthenticated utility endpoints:** `/api/seed-colleges`, `/api/test-db` (returns raw error text).
5. **Mass assignment:** public POSTs (`contact`, `enquiry`, `questions`, `biodata/submit`) pass `req.body` to the model; `questions` lets a visitor set `isPublished`/`isAnswered`/`answer`.
6. **Payment trust:** `create-order` is public with client-chosen amount; `verify` trusts client `paymentDetails` (amount, purpose) and does not deduplicate payments.
7. **No rate limiting** on login, registration, forms, payment, reactions.
8. **Scholarship identity:** only the registration token; duplicate registration response discloses the existing token.
9. **Sensitive data:** Aadhaar number stored plain in MongoDB and sent to SheetDB.
10. **Admin token in `localStorage`;** 7-day JWT, no server-side revocation.
11. **Caching:** `vercel.json` applies `s-maxage=60` to all `/api/*`, which may cache GET responses including admin and live-test data (**Unverified** effect with `Authorization` headers on Vercel).

**Defects / inconsistencies:**
- Duplicate route files `api/admin/payments.js` and `api/admin/payments/index.js`; the latter counts status `'paid'` that is never stored.
- `admin/scholarship-results` search filters only the current page; deleting a result doesn't reset the student.
- `GET /api/achievements` omits `success_story` type records.
- `compiler.removeConsole` (`next.config.js`) strips all `console.*` in production, removing the error logs the handlers rely on.
- Mixed import aliases (`@/lib`, `@/models`, `@/backend/...`) for the same code.
- `README.md`, `.env.example` outdated/incomplete.

## 8. Proposed enhancements (require confirmation; not in code and not assumed)
Payment gating and reconciliation (webhooks); notifications; multi-admin roles; admin UI for scholarship questions and announcements; result ranking/publishing; data-protection handling for Aadhaar; automated tests. These are suggestions only.

## 9. Dependencies and external services
MongoDB (Atlas or self-hosted: **Unverified**), Razorpay account (keys via env), SheetDB account/endpoint, Vercel hosting, UPI VPA configured through admin site-settings.

## 10. Unresolved questions for the business owner
1. Is the scholarship test free or paid, and what are the award rules after results?
2. Are Enquiry and Question Corner meant to be live public features?
3. Which notifications (email/SMS/WhatsApp) are required, and to whom?
4. Is Aadhaar collection mandatory, and what are the retention and access rules?
5. Single shared admin or multiple staff accounts and roles?
6. Is SheetDB the long-term Google Sheets mechanism?
7. Who maintains the college, achievement and scholarship-question content?
8. Confirm the production hosting/database setup and which env variables are set there.
9. Confirm the official logo file to use on the website.
