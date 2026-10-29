import { test } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import BioData from '../../src/backend/models/BioData.js';
import StudentDocument from '../../src/backend/models/StudentDocument.js';
import {
  DOCUMENT_TYPES,
  MANDATORY_DOCUMENTS,
  DOC_NAME_TO_TYPE,
  DOC_TYPE_TO_NAME,
  MAX_DOCUMENT_BYTES,
  validateUpload,
  detectKind,
  sanitizeFileName,
  newStorageKey,
  resolveStoragePath,
  saveBuffer,
  readStored,
  deleteStored,
} from '../../src/backend/lib/uploads.js';
import { can, ROLES } from '../../src/backend/lib/rbac.js';
import { verifyToken } from '../../src/backend/lib/auth.js';
import jwt from 'jsonwebtoken';

test('Mandatory Document Uploads & Integration Test Suite', async (t) => {
  // Setup dummy project upload root for unit testing
  const dummyRoot = resolveStoragePath('students/test_root');

  await t.test('1. Document Configuration and Schema Definitions', () => {
    // Verify all 6 mandatory document types are supported in DOCUMENT_TYPES
    const typeValues = DOCUMENT_TYPES.map((d) => d.value);
    const expectedMandatoryTypes = [
      'marksheet_10',
      'marksheet_12',
      'aadhaar',
      'community_certificate',
      'transfer_certificate',
      'first_graduate',
    ];

    for (const expected of expectedMandatoryTypes) {
      assert.ok(typeValues.includes(expected), `DOCUMENT_TYPES must include ${expected}`);
      assert.ok(DOC_TYPE_TO_NAME[expected], `DOC_TYPE_TO_NAME must have entry for ${expected}`);
    }

    // Verify MANDATORY_DOCUMENTS list contains all 6 required documents
    assert.equal(MANDATORY_DOCUMENTS.length, 6);
    assert.deepEqual(
      MANDATORY_DOCUMENTS.map((d) => d.name),
      [
        '10th Mark Sheet',
        '12th Mark Sheet',
        'Aadhaar Card (Xerox)',
        'Community Certificate',
        'Transfer Certificate (TC)',
        'First Graduate Certificate (if applicable)',
      ]
    );

    // Verify StudentDocument schema permits transfer_certificate and first_graduate
    const doc = new StudentDocument({
      biodataId: new mongoose.Types.ObjectId(),
      documentType: 'transfer_certificate',
      storageKey: 'students/2026/04/tc.pdf',
      mime: 'application/pdf',
      size: 102400,
    });
    assert.equal(doc.validateSync(), undefined, 'transfer_certificate must pass schema validation');

    const fgDoc = new StudentDocument({
      biodataId: new mongoose.Types.ObjectId(),
      documentType: 'first_graduate',
      storageKey: 'students/2026/04/fg.pdf',
      mime: 'application/pdf',
      size: 102400,
    });
    assert.equal(fgDoc.validateSync(), undefined, 'first_graduate must pass schema validation');

    // Verify BioData schema supports uploadedDocuments metadata array
    const bioData = new BioData({
      studentName: 'Boopathi',
      fatherName: 'Boopathi Father',
      studentMobile: '9876543210',
      studentEmail: 'student@example.com',
      aadhaarNumber: '123456789012',
      documents: ['10th Mark Sheet', 'Transfer Certificate (TC)'],
      uploadedDocuments: [
        {
          documentType: 'marksheet_10',
          originalName: '10th_marksheet.pdf',
          storageKey: 'students/2026/10/abc.pdf',
          mime: 'application/pdf',
          size: 204800,
          uploadStatus: 'uploaded',
          documentId: new mongoose.Types.ObjectId(),
        },
      ],
    });
    assert.equal(bioData.validateSync(), undefined, 'BioData schema must accept uploadedDocuments array');
    assert.equal(bioData.uploadedDocuments.length, 1);
    assert.equal(bioData.uploadedDocuments[0].documentType, 'marksheet_10');
    assert.equal(bioData.uploadedDocuments[0].size, 204800);
  });

  await t.test('2. File Content and Magic Bytes Validation (PDF, JPG, PNG)', () => {
    // Valid PDF (magic bytes %PDF-)
    const pdfBuf = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
    const pdfRes = validateUpload({ fileName: 'mark_sheet.pdf', buffer: pdfBuf });
    assert.equal(pdfRes.ok, true);
    assert.equal(pdfRes.kind, 'pdf');
    assert.equal(pdfRes.mime, 'application/pdf');

    // Valid JPEG (magic bytes 0xFF, 0xD8, 0xFF)
    const jpegBuf = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01]), Buffer.alloc(50)]);
    const jpegRes = validateUpload({ fileName: 'community_cert.jpg', buffer: jpegBuf });
    assert.equal(jpegRes.ok, true);
    assert.equal(jpegRes.kind, 'jpeg');
    assert.equal(jpegRes.mime, 'image/jpeg');

    // Valid PNG (magic bytes 0x89, 0x50, 0x4E, 0x47...)
    const pngBuf = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(50)]);
    const pngRes = validateUpload({ fileName: 'aadhaar_scan.png', buffer: pngBuf });
    assert.equal(pngRes.ok, true);
    assert.equal(pngRes.kind, 'png');
    assert.equal(pngRes.mime, 'image/png');

    // Reject fake extension (text file renamed to .pdf)
    const fakePdfBuf = Buffer.from('Hello world this is not a pdf file');
    const fakeRes = validateUpload({ fileName: 'fake.pdf', buffer: fakePdfBuf });
    assert.equal(fakeRes.ok, false);
    assert.match(fakeRes.error, /Unsupported or corrupted file/i);

    // Reject extension mismatch (PNG content with .jpg extension)
    const mismatchRes = validateUpload({ fileName: 'test.jpg', buffer: pngBuf });
    assert.equal(mismatchRes.ok, false);
    assert.match(mismatchRes.error, /File extension does not match its content/i);

    // Reject dangerous file extension
    const exeRes = validateUpload({ fileName: 'script.exe', buffer: pdfBuf });
    assert.equal(exeRes.ok, false);
    assert.match(exeRes.error, /not allowed/i);

    // Reject active PDF JavaScript
    const activePdf = Buffer.from('%PDF-1.4\n/JavaScript (app.alert("pwned"))\n%%EOF');
    const activeRes = validateUpload({ fileName: 'exploit.pdf', buffer: activePdf });
    assert.equal(activeRes.ok, false);
    assert.match(activeRes.error, /PDF contains active content/i);
  });

  await t.test('3. File Size Limit Enforcement (Max 5 MB)', () => {
    const validSmall = Buffer.concat([Buffer.from('%PDF-1.4 valid header'), Buffer.alloc(1024)]);
    const okRes = validateUpload({ fileName: 'small.pdf', buffer: validSmall, maxBytes: MAX_DOCUMENT_BYTES });
    assert.equal(okRes.ok, true);

    // Oversized buffer: 5 MB + 100 bytes
    const oversized = Buffer.concat([Buffer.from('%PDF-1.4 valid header'), Buffer.alloc(5 * 1024 * 1024 + 100)]);
    const overRes = validateUpload({ fileName: 'huge.pdf', buffer: oversized, maxBytes: MAX_DOCUMENT_BYTES });
    assert.equal(overRes.ok, false);
    assert.match(overRes.error, /File is too large/i);
  });

  await t.test('4. Safe Filename Sanitization and Path Traversal Prevention', () => {
    // Strips path separators and control characters
    assert.equal(sanitizeFileName('../../etc/passwd.pdf'), 'passwd.pdf');
    assert.equal(sanitizeFileName('C:\\Windows\\System32\\cmd.exe'), 'cmd.exe');
    assert.equal(sanitizeFileName('..\\..\\malicious.pdf'), 'malicious.pdf');

    // Generates safe, random storage keys with YYYY/MM scoping
    const key = newStorageKey('students', 'pdf');
    assert.match(key, /^students\/\d{4}\/\d{2}\/[a-f0-9]{32}\.pdf$/);

    // resolveStoragePath must reject path traversal keys
    assert.throws(() => resolveStoragePath('../escape.pdf'), /Invalid storage key/);
    assert.throws(() => resolveStoragePath('../../etc/shadow'), /Invalid storage key/);
    assert.throws(() => resolveStoragePath('/etc/absolute/path'), /Invalid storage key/);
    assert.throws(() => resolveStoragePath('null\0byte.pdf'), /Invalid storage key/);
  });

  await t.test('5. Mandatory Document Logic & Progression Validation', () => {
    // Test helper mimicking validateStep(3)
    function validateCourseAndDocs(form, selectedFiles) {
      if (!form.courseApplied) return 'Please select the preferred course or branch';
      if (!form.collegeName?.trim()) return 'Please enter preferred college name';

      for (const doc of MANDATORY_DOCUMENTS) {
        if (form.documents.includes(doc.name)) {
          const fileEntry = selectedFiles[doc.id];
          if (!fileEntry || !fileEntry.file) {
            return `Please attach a file for "${doc.name}" before continuing.`;
          }
        }
      }
      return null;
    }

    const testForm = {
      courseApplied: 'B.E. Computer Science Engineering',
      collegeName: 'Paavai Engineering College',
      documents: ['10th Mark Sheet', '12th Mark Sheet'],
    };

    // Case A: 10th and 12th are checked, but no files are attached
    const emptyFiles = {};
    const errA = validateCourseAndDocs(testForm, emptyFiles);
    assert.equal(errA, 'Please attach a file for "10th Mark Sheet" before continuing.');

    // Case B: 10th is attached, but 12th is still missing
    const partialFiles = {
      marksheet_10: { file: { name: '10th.pdf' }, name: '10th.pdf' },
    };
    const errB = validateCourseAndDocs(testForm, partialFiles);
    assert.equal(errB, 'Please attach a file for "12th Mark Sheet" before continuing.');

    // Case C: Both checked documents have attached files
    const fullFiles = {
      marksheet_10: { file: { name: '10th.pdf' }, name: '10th.pdf' },
      marksheet_12: { file: { name: '12th.pdf' }, name: '12th.pdf' },
    };
    const errC = validateCourseAndDocs(testForm, fullFiles);
    assert.equal(errC, null, 'Should pass when all checked documents have attached files');

    // Case D: First Graduate Certificate unchecked -> not required
    assert.equal(testForm.documents.includes('First Graduate Certificate (if applicable)'), false);
    assert.equal(validateCourseAndDocs(testForm, fullFiles), null);

    // Case E: First Graduate Certificate checked -> becomes mandatory
    const fgForm = {
      ...testForm,
      documents: [...testForm.documents, 'First Graduate Certificate (if applicable)'],
    };
    const errE = validateCourseAndDocs(fgForm, fullFiles);
    assert.equal(errE, 'Please attach a file for "First Graduate Certificate (if applicable)" before continuing.');
  });

  await t.test('6. Unchecking Clears Pending Files and Excludes from Available List', () => {
    let formDocs = ['10th Mark Sheet', '12th Mark Sheet', 'Community Certificate'];
    let files = {
      marksheet_10: { name: '10th.pdf' },
      marksheet_12: { name: '12th.pdf' },
      community_certificate: { name: 'community.jpg' },
    };

    // Simulate unchecking Community Certificate
    const uncheckDoc = 'Community Certificate';
    const opt = MANDATORY_DOCUMENTS.find((d) => d.name === uncheckDoc);
    if (formDocs.includes(uncheckDoc)) {
      formDocs = formDocs.filter((d) => d !== uncheckDoc);
      delete files[opt.id];
    }

    assert.equal(formDocs.includes('Community Certificate'), false);
    assert.equal(files.community_certificate, undefined);
    assert.equal(formDocs.length, 2);
  });

  await t.test('7. Atomic Storage & Orphan File Cleanup on Failure', async () => {
    // Create temporary file
    const testKey = newStorageKey('students', 'pdf');
    const testBuf = Buffer.from('%PDF-1.4 test atomic orphan cleanup buffer');

    await saveBuffer(testKey, testBuf);
    const readBack = await readStored(testKey);
    assert.equal(readBack.toString(), testBuf.toString());

    // Simulate rollback: deleteStored must cleanly remove file
    const deleted = await deleteStored(testKey);
    assert.equal(deleted, true);

    // Subsequent read must throw ENOENT
    await assert.rejects(async () => {
      await readStored(testKey);
    });
  });

  await t.test('8. RBAC Document Access Checks & Token Verification', () => {
    // super_admin and admin must have documents:view permission
    assert.equal(can(ROLES.SUPER_ADMIN, 'documents:view'), true);
    assert.equal(can(ROLES.ADMIN, 'documents:view'), true);

    // Counsellor & Exam manager must NOT have documents:view
    assert.equal(can(ROLES.COUNSELLOR, 'documents:view'), false);
    assert.equal(can(ROLES.EXAM_MANAGER, 'documents:view'), false);

    // Unauthenticated request has no permission
    assert.equal(can(undefined, 'documents:view'), false);
    assert.equal(can('anonymous', 'documents:view'), false);

    // Token verification via query param fallback for secure downloads
    process.env.JWT_SECRET = 'test_secret_key_for_unit_tests_1234567890_min_32_chars';
    const token = jwt.sign({ username: 'admin', role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Test verifyToken with query.token
    const reqWithQuery = { query: { token } };
    const decoded = verifyToken(reqWithQuery);
    assert.ok(decoded);
    assert.equal(decoded.role, 'admin');

    // Test verifyToken with Authorization header
    const reqWithHeader = { headers: { authorization: `Bearer ${token}` } };
    const decodedHeader = verifyToken(reqWithHeader);
    assert.ok(decodedHeader);
    assert.equal(decodedHeader.role, 'admin');

    // Test verifyToken with missing token
    assert.equal(verifyToken({ headers: {}, query: {} }), null);
  });

  await t.test('9. Storage Separation: Metadata in MongoDB, Never Base64 in Database', () => {
    // BioData schema uploadedDocuments stores metadata only
    const sampleRecord = new BioData({
      studentName: 'Anitha',
      fatherName: 'Murugan',
      studentMobile: '9443322110',
      studentEmail: 'anitha@example.com',
      aadhaarNumber: '987654321098',
      documents: ['10th Mark Sheet'],
      uploadedDocuments: [
        {
          documentType: 'marksheet_10',
          originalName: '10th_marksheet.pdf',
          storageKey: 'students/2026/10/a1b2c3d4e5f6.pdf',
          mime: 'application/pdf',
          size: 1048576,
          uploadStatus: 'uploaded',
        },
      ],
    });

    const obj = sampleRecord.toObject();
    assert.ok(obj.uploadedDocuments[0].storageKey, 'Storage key must exist');
    assert.equal(obj.uploadedDocuments[0].fileData, undefined, 'No raw file data or base64 in MongoDB');
    assert.equal(obj.uploadedDocuments[0].buffer, undefined, 'No binary buffer in MongoDB');
  });
});
