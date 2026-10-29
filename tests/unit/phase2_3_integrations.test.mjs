import test from 'node:test';
import assert from 'node:assert/strict';
import BioData from '../../src/backend/models/BioData.js';
import Contact from '../../src/backend/models/Contact.js';
import Feedback from '../../src/backend/models/Feedback.js';
import Announcement from '../../src/backend/models/Announcement.js';
import Achievement from '../../src/backend/models/Achievement.js';
import StudentDocument from '../../src/backend/models/StudentDocument.js';
import {
  validateUpload,
  sanitizeFileName,
  detectKind,
  resolveStoragePath,
  uploadRoot,
} from '../../src/backend/lib/uploads.js';

// ==========================================
// PHASE 2: Student Forms & Persistence Tests
// ==========================================

test('Phase 2: BioData schema persists isGovtSchool, isFirstGraduate and parent details', () => {
  const record = new BioData({
    studentName: 'Muthu Kumar',
    dateOfBirth: '2007-05-15',
    fatherName: 'P. Murugan',
    motherName: 'M. Lakshmi',
    community: 'MBC',
    address: '12, South Street, Rasipuram',
    district: 'Namakkal',
    studentMobile: '9876543210',
    fatherMobile: '9876543211',
    motherMobile: '9876543212',
    studentEmail: 'muthu@example.com',
    aadhaarNumber: '123456789012',
    courseApplied: 'B.E. Computer Science Engineering',
    admissionType: 'UG',
    collegeName: 'Paavai Engineering College',
    quota: 'GQ',
    plusTwoGroup: 'Maths-Biology',
    plusTwoExamNumber: 'TN202612345',
    expectedCutOff: '185.5',
    lastSchoolAndPlace: 'Govt Model HSS, Rasipuram',
    isGovtSchool: true,
    isFirstGraduate: true,
    documents: ['10th Mark Sheet', '12th Mark Sheet'],
  });

  const err = record.validateSync();
  assert.equal(err, undefined);
  assert.equal(record.isGovtSchool, true);
  assert.equal(record.isFirstGraduate, true);
  assert.equal(record.status, 'pending');
  assert.equal(record.documents.length, 2);
});

test('Phase 2: Contact form schema validates required name, phone, message', () => {
  const validContact = new Contact({
    name: 'Priya Sundaram',
    email: 'priya@example.com',
    phone: '9876543210',
    subject: 'Admission guidance',
    message: 'Seeking guidance for engineering colleges in Namakkal district.',
  });
  const err = validContact.validateSync();
  assert.equal(err, undefined);

  const invalidContact = new Contact({
    name: 'Priya',
    // Missing message
  });
  const err2 = invalidContact.validateSync();
  assert.ok(err2);
  assert.ok(err2.errors.message, 'Message should be required');
});

test('Phase 2: Feedback schema enforces rating bounds (1-5) and moderation status', () => {
  const validFeedback = new Feedback({
    name: 'K. Rajendran',
    category: 'parent',
    rating: 5,
    message: 'Excellent career guidance for my daughter admission in engineering.',
    consent: true,
    status: 'pending',
  });
  const err = validFeedback.validateSync();
  assert.equal(err, undefined);
  assert.equal(validFeedback.status, 'pending');

  const invalidRating = new Feedback({
    name: 'K. Rajendran',
    category: 'parent',
    rating: 7, // Out of bounds
    message: 'Great service',
    consent: true,
  });
  const err2 = invalidRating.validateSync();
  assert.ok(err2);
  assert.ok(err2.errors.rating, 'Rating should be rejected when > 5');
});

test('Phase 2: Document upload validates file types, magic bytes and prevents path traversal', () => {
  // Test 1: Sanitize filenames safely
  assert.equal(sanitizeFileName('../../../etc/passwd.jpg'), 'passwd.jpg');
  assert.equal(sanitizeFileName('..\\..\\boot.ini'), 'boot.ini');
  assert.equal(sanitizeFileName('student_certificate:1.pdf'), 'student_certificate1.pdf');

  // Test 2: Magic bytes detection
  const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]);
  assert.equal(detectKind(jpegHeader), 'jpeg');

  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
  assert.equal(detectKind(pngHeader), 'png');

  const pdfHeader = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\n');
  assert.equal(detectKind(pdfHeader), 'pdf');

  // Test 3: Validation rejects mismatched extensions
  const fakeJpg = Buffer.from('%PDF-1.4 Fake document content with pdf magic bytes');
  const checkMismatched = validateUpload({
    fileName: 'document.jpg',
    buffer: fakeJpg,
    maxBytes: 5 * 1024 * 1024,
  });
  assert.equal(checkMismatched.ok, false);
  assert.equal(checkMismatched.error, 'File extension does not match its content');

  // Test 4: Path traversal safety in storage resolution
  assert.throws(() => resolveStoragePath('../secret.key'), /Invalid storage key/);
  assert.throws(() => resolveStoragePath('..\\secret.key'), /Invalid storage key/);
  assert.throws(() => resolveStoragePath('/etc/passwd'), /Invalid storage key/);
});

// ==========================================
// PHASE 3: Dynamic Content & Branding Tests
// ==========================================

test('Phase 3: Announcement schema validates allowed type categories and showOnHome', () => {
  const ann = new Announcement({
    title: 'Scholarship Exam Registration 2026',
    content: 'Registration is now open for students seeking merit-cum-means scholarship.',
    type: 'scholarship',
    priority: 10,
    showOnHome: true,
    isActive: true,
  });
  const err = ann.validateSync();
  assert.equal(err, undefined);
  assert.equal(ann.type, 'scholarship');
  assert.equal(ann.showOnHome, true);

  const invalidType = new Announcement({
    title: 'Test Alert',
    content: 'Content',
    type: 'unrecognized_type',
  });
  const err2 = invalidType.validateSync();
  assert.ok(err2);
  assert.ok(err2.errors.type);
});

test('Phase 3: Achievement schema validates types and published status', () => {
  const ach = new Achievement({
    type: 'milestone',
    title: 'Over 15,000+ Students Guided in Tamil Nadu',
    description: 'Rasi Foundation has guided students into premier colleges since 2008.',
    year: '2026',
    status: 'published',
    isActive: true,
  });
  const err = ach.validateSync();
  assert.equal(err, undefined);
  assert.equal(ach.status, 'published');
});
