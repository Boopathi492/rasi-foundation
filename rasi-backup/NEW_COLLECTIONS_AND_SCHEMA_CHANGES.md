# Rasi Foundation — MongoDB Architecture & Schema Modernization

This document records all new collections, schema modifications, and indexes added to support the High Pro Max Admin Dashboard refactor (`task.md`).

---

## 1. Safety & Preservation Policy
- **ZERO Destructive Operations**: No collections were dropped or overwritten. Existing reference data in `rasi-backup/` remains intact and read-only.
- **Strict Payment Boundary**: Payment collections (`payments`, `paymentsettings`) remain untouched and read-only.
- **Additive Evolution**: Existing models (`BioData`, `Enquiry`, `Feedback`, `College`) were extended additively with default values to maintain 100% backward compatibility.

---

## 2. New Collections Added

### 2.1 `admin_users`
- **Model**: `src/backend/models/AdminUser.js`
- **Collection**: `admin_users`
- **Purpose**: RBAC administrator accounts with `scrypt` password hashing.
- **Fields**:
  - `username`: String (lowercase, unique)
  - `email`: String (lowercase)
  - `displayName`: String
  - `passwordHash`: String (format: `scrypt$N$r$p$salt$hash`, select: false)
  - `role`: Enum `['super_admin', 'admin', 'counsellor', 'exam_manager']`
  - `isActive`: Boolean
  - `failedLoginCount`: Number
  - `lockedUntil`: Date
  - `lastLoginAt`: Date
  - `createdBy`: String
- **Indexes**: `username` (unique, lowercase).

### 2.2 `admin_audit_logs`
- **Model**: `src/backend/models/AdminAuditLog.js`
- **Collection**: `admin_audit_logs`
- **Purpose**: Append-only tamper-resistant audit trail. Updates and deletions are blocked at the schema level.
- **Fields**:
  - `actorId`: String
  - `actorName`: String
  - `actorRole`: String
  - `action`: String (e.g., `banner.create`, `feedback.approved`, `auth.login.success`)
  - `resourceType`: String
  - `resourceId`: String
  - `outcome`: Enum `['success', 'failure', 'denied']`
  - `summary`: Mixed (deep-redacted change summary)
  - `ip`: String
  - `requestId`: String
- **Indexes**:
  - `{ resourceType: 1, resourceId: 1, createdAt: -1 }`
  - `{ action: 1, createdAt: -1 }`
  - `{ actorId: 1, createdAt: -1 }`

### 2.3 `application_error_logs`
- **Model**: `src/backend/models/ApplicationErrorLog.js`
- **Collection**: `application_error_logs`
- **Purpose**: Centralized backend error capture with de-duplication and 90-day TTL auto-cleanup.
- **Fields**:
  - `fingerprint`: String (SHA-256 hash of method, sanitized path, and error message)
  - `severity`: Enum `['info', 'warning', 'error', 'critical']`
  - `category`: String (`server`, `database`, `auth`, `validation`)
  - `module`: String
  - `message`: String (redacted)
  - `stack`: String (redacted, admin-only)
  - `method`: String
  - `path`: String (sanitized, query stripped)
  - `status`: Number
  - `requestId`: String
  - `occurrences`: Number
  - `firstSeenAt`, `lastSeenAt`: Date
  - `resolved`: Boolean
  - `resolvedBy`, `resolvedAt`: Date
  - `expiresAt`: Date
- **Indexes**:
  - `{ expiresAt: 1 }` (TTL: `expireAfterSeconds: 0`)
  - `{ fingerprint: 1 }`
  - `{ module: 1, lastSeenAt: -1 }`

### 2.4 `banners`
- **Model**: `src/backend/models/Banner.js`
- **Collection**: `banners`
- **Purpose**: Dynamic promotional banners and carousels across the website.
- **Fields**:
  - `title`: String
  - `description`: String
  - `altText`: String
  - `desktopImage`: `{ storageKey, mime, width, height, size }`
  - `mobileImage`: `{ storageKey, mime, width, height, size }`
  - `ctaText`, `ctaUrl`: String
  - `placement`: Enum `['home_hero', 'home_secondary', 'about', 'courses', 'colleges', 'scholarship', 'achievements', 'announcements', 'contact', 'feedback', 'global']`
  - `order`: Number
  - `transitionMs`: Number
  - `isActive`: Boolean
  - `archived`: Boolean
  - `startsAt`, `endsAt`: Date
- **Indexes**: `{ placement: 1, isActive: 1, archived: 1, startsAt: 1, endsAt: 1, order: 1 }`.

### 2.5 `counselling_records`
- **Model**: `src/backend/models/CounsellingRecord.js`
- **Collection**: `counselling_records`
- **Purpose**: Persistent student admissions counselling sessions and follow-up tracking.
- **Fields**:
  - `studentRef`: `{ kind, id }`
  - `studentName`: String
  - `studentPhone`: String
  - `scheduledAt`: Date
  - `counsellor`: String
  - `type`: Enum `['in_person', 'phone', 'video', 'walk_in']`
  - `preferredCollege`: String
  - `interestedCourse`: String
  - `careerInterests`: String
  - `notes`: String (confidential)
  - `recommendations`: String
  - `followUpDate`: Date
  - `followUpStatus`: Enum `['none', 'pending', 'done']`
  - `outcome`: String
  - `nextSteps`: String
  - `status`: Enum `['scheduled', 'completed', 'follow_up_required', 'cancelled']`
- **Indexes**: `{ 'studentRef.kind': 1, 'studentRef.id': 1, scheduledAt: -1 }`.

### 2.6 `courses`
- **Model**: `src/backend/models/Course.js`
- **Collection**: `courses`
- **Purpose**: Academic degree programs and diploma branches.
- **Fields**:
  - `name`: String
  - `code`: String (uppercase)
  - `level`: Enum `['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other']`
  - `category`: String
  - `description`: String
  - `eligibility`: String
  - `duration`: String
  - `colleges`: Array of `ObjectId` ref `College`
  - `isActive`: Boolean
  - `order`: Number
- **Indexes**: `{ name: 1, level: 1 }` (unique, case-insensitive collation).

### 2.7 `student_documents`
- **Model**: `src/backend/models/StudentDocument.js`
- **Collection**: `student_documents`
- **Purpose**: Secure metadata for private document storage (marksheet, photo, certificates).
- **Fields**:
  - `biodataId`: `ObjectId` ref `BioData`
  - `documentType`: Enum `['photo', 'aadhaar', 'marksheet_10', 'marksheet_12', 'community_certificate', 'other']`
  - `originalName`: String
  - `storageKey`: String (unique relative key, verified path-traversal safe)
  - `mime`: String
  - `size`: Number
  - `uploadStatus`: Enum `['uploaded', 'removed']`
  - `verificationStatus`: Enum `['pending', 'verified', 'rejected']`
  - `verifiedBy`: String
  - `verifiedAt`: Date
  - `rejectionReason`: String
- **Indexes**: `{ biodataId: 1, documentType: 1 }`.

### 2.8 `report_exports`
- **Model**: `src/backend/models/ReportExport.js`
- **Collection**: `report_exports`
- **Purpose**: Track report generation requests and audit exports.
- **Fields**:
  - `reportType`: String
  - `format`: Enum `['pdf', 'xlsx']`
  - `status`: Enum `['requested', 'processing', 'completed', 'failed']`
  - `filters`: Mixed
  - `rowCount`: Number
  - `requestedBy`, `requestedRole`: String
  - `durationMs`: Number
  - `completedAt`: Date
- **Indexes**: `{ createdAt: -1 }`.

### 2.9 `notification_records`
- **Model**: `src/backend/models/NotificationRecord.js`
- **Collection**: `notification_records`
- **Purpose**: Dynamic admin notifications for registrations, enquiries, and alerts.
- **Fields**:
  - `type`: Enum `['enquiry', 'registration', 'feedback', 'followup', 'document', 'report_failure', 'error', 'scholarship']`
  - `title`, `body`, `link`, `refId`: String
  - `severity`: Enum `['info', 'warning', 'critical']`
  - `audienceRoles`: Array of String
  - `readBy`: Array of String (User IDs)
  - `expiresAt`: Date (TTL: 60 days)
- **Indexes**:
  - `{ type: 1, refId: 1 }` (partial unique)
  - `{ expiresAt: 1 }` (TTL)

---

## 3. Extended Existing Collections

### 3.1 `BioData` (`biodatas`)
- Added fields: `gender`, `educationQualification`, `whatsappNumber`, `marks10th`, `marks12th`, `district`, `groupName`, `interestedArea`, `reference`.
- **Aadhaar Masking**: In all public and administrative API listings, Aadhaar numbers are masked by default (`XXXX XXXX 1234`). Full Aadhaar viewing requires explicit `aadhaar:view` RBAC privilege.
- Indexes: `{ studentEmail: 1 }`, `{ studentMobile: 1 }`, `{ createdAt: -1 }`.

### 3.2 `Enquiry` (`enquiries`)
- Added fields: `assignedTo`, `followUpDate`, `internalNotes`, `contactAttempts`, `resolution`, `resolvedAt`, `statusHistory`.
- Statuses supported: `pending` (new), `contacted`, `follow_up`, `in_progress`, `resolved`, `enrolled`, `closed`.
- Indexes: `{ status: 1, createdAt: -1 }`, `{ assignedTo: 1, followUpDate: 1 }`.

### 3.3 `Feedback` (`feedbacks`)
- Added fields: `moderationNotes`, `moderatedBy`, `moderatedAt`, `displayOrder`.
- Statuses supported: `pending`, `approved`, `rejected`, `archived`.
- **Strict Public Rule**: `/api/feedback` GET strictly filters `{ status: 'approved' }` and strips email and phone numbers.
- Indexes: `{ status: 1, displayOrder: 1, createdAt: -1 }`.

### 3.4 `College` (`colleges`)
- Added fields: `type` (Engineering, Arts & Science, Medical, etc.), `logo` (`{ storageKey, mime }`).
- Served via `/api/colleges/[id]/logo` with fallback to default vector SVG placeholder.
- Unique Index: `{ name: 1, district: 1 }` with case-insensitive collation.

---

## 4. Rollback Plan
If any model changes need to be rolled back:
1. All changes are strictly additive: existing database records have not had any fields removed or renamed.
2. New collections can be removed without affecting core site operations.
3. Legacy single administrator authentication via `.env.local` (`ADMIN_USERNAME`, `ADMIN_PASSWORD`) remains completely functional alongside the new `admin_users` collection.
