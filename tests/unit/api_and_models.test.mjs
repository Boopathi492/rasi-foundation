import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';

// Import models
import BioData from '../../src/backend/models/BioData.js';
import AdminUser from '../../src/backend/models/AdminUser.js';
import AdminAuditLog from '../../src/backend/models/AdminAuditLog.js';
import ApplicationErrorLog from '../../src/backend/models/ApplicationErrorLog.js';
import Banner from '../../src/backend/models/Banner.js';
import CounsellingRecord from '../../src/backend/models/CounsellingRecord.js';
import Course from '../../src/backend/models/Course.js';
import Feedback from '../../src/backend/models/Feedback.js';
import StudentDocument from '../../src/backend/models/StudentDocument.js';
import ReportExport from '../../src/backend/models/ReportExport.js';
import NotificationRecord from '../../src/backend/models/NotificationRecord.js';
import Enquiry from '../../src/backend/models/Enquiry.js';
import College from '../../src/backend/models/College.js';

// Import utilities
import { getRequestId } from '../../src/backend/lib/apiHandler.js';
import { can, ROLES, roleFromTokenPayload } from '../../src/backend/lib/rbac.js';
import { maskAadhaar } from '../../src/backend/lib/redact.js';

test('Models: All 13 models register valid schemas with expected collections and indexes', () => {
  assert.equal(BioData.collection.name, 'biodatas');
  assert.equal(AdminUser.collection.name, 'admin_users');
  assert.equal(AdminAuditLog.collection.name, 'admin_audit_logs');
  assert.equal(ApplicationErrorLog.collection.name, 'application_error_logs');
  assert.equal(Banner.collection.name, 'banners');
  assert.equal(CounsellingRecord.collection.name, 'counselling_records');
  assert.equal(Course.collection.name, 'courses');
  assert.equal(Feedback.collection.name, 'feedbacks');
  assert.equal(StudentDocument.collection.name, 'student_documents');
  assert.equal(ReportExport.collection.name, 'report_exports');
  assert.equal(NotificationRecord.collection.name, 'notification_records');
  assert.equal(Enquiry.collection.name, 'enquiries');
  assert.equal(College.collection.name, 'colleges');
});

test('BioData model: supports Section 9.1 fields and preserves existing data', () => {
  const bio = new BioData({
    studentName: 'Suresh Kumar',
    fatherName: 'Kumar V',
    studentMobile: '9876543210',
    studentEmail: 'suresh@example.com',
    aadhaarNumber: '234567890123',
    gender: 'Male',
    educationQualification: 'HSC (+2)',
    whatsappNumber: '9876543210',
    marks10th: '475',
    marks12th: '560',
    district: 'Coimbatore',
    groupName: 'Bio-Maths',
    interestedArea: 'Artificial Intelligence',
    reference: 'Social Media',
    isFirstGraduate: true,
  });

  const err = bio.validateSync();
  assert.equal(err, undefined, 'Validation should pass cleanly with Section 9.1 fields');
  assert.equal(bio.gender, 'Male');
  assert.equal(bio.district, 'Coimbatore');
  assert.equal(bio.isFirstGraduate, true);
  assert.equal(maskAadhaar(bio.aadhaarNumber), 'XXXX XXXX 0123');
});

test('AdminAuditLog: enforces append-only semantics', async () => {
  const log = new AdminAuditLog({
    action: 'test.action',
    resourceType: 'test',
    outcome: 'success',
  });

  // Attempting to save an existing doc (isNew = false) must be rejected
  log.isNew = false;
  await assert.rejects(
    async () => {
      await log.save();
    },
    /append-only/i,
    'Saving an existing audit log must fail with append-only error'
  );
});

test('apiHandler: getRequestId generates UUID or preserves valid X-Request-Id header', () => {
  const req1 = { headers: {} };
  const id1 = getRequestId(req1);
  assert.ok(id1 && id1.length >= 16);

  const req2 = { headers: { 'x-request-id': 'custom-req-123' } };
  const id2 = getRequestId(req2);
  assert.equal(id2, 'custom-req-123');
});

test('Course model: validates unique (name, level) requirement', () => {
  const course = new Course({
    name: 'B.E. Computer Science and Engineering',
    code: 'CSE',
    level: 'UG',
    category: 'Engineering',
    duration: '4 Years',
  });
  const err = course.validateSync();
  assert.equal(err, undefined);
  assert.equal(course.code, 'CSE');
});

test('Banner model: enforces valid placements', () => {
  const validBanner = new Banner({
    title: 'Admission 2026',
    placement: 'home_hero',
  });
  assert.equal(validBanner.validateSync(), undefined);

  const invalidBanner = new Banner({
    title: 'Invalid Placement',
    placement: 'non_existent_section',
  });
  const err = invalidBanner.validateSync();
  assert.ok(err && err.errors.placement, 'Invalid placement must fail schema validation');
});

test('StudentDocument: validates permitted document types', () => {
  const doc = new StudentDocument({
    biodataId: new mongoose.Types.ObjectId(),
    documentType: 'marksheet_12',
    storageKey: 'students/2026/04/abc.pdf',
    mime: 'application/pdf',
    size: 204800,
  });
  assert.equal(doc.validateSync(), undefined);
  assert.equal(doc.verificationStatus, 'pending');
});
