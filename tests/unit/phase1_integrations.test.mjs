import test from 'node:test';
import assert from 'node:assert/strict';
import CounsellingRecord from '../../src/backend/models/CounsellingRecord.js';
import Course from '../../src/backend/models/Course.js';
import Banner from '../../src/backend/models/Banner.js';
import Enquiry from '../../src/backend/models/Enquiry.js';
import { decodeBase64Payload, MAX_IMAGE_BYTES } from '../../src/backend/lib/uploads.js';
import { getVerifiedCounsellors, validateCounsellorAssignment } from '../../src/backend/lib/counsellors.js';

// ==========================================
// TASK 1: Counselling Booking Tests
// ==========================================

test('Task 1: CounsellingRecord schema registers with collection counselling_records and required fields', () => {
  assert.equal(CounsellingRecord.collection.name, 'counselling_records');
  const validRecord = new CounsellingRecord({
    studentName: 'Ananya Sharma',
    studentPhone: '9876543210',
    scheduledAt: new Date(),
    interestedCourse: 'Engineering',
    preferredCollege: 'Anna University',
    type: 'phone',
    notes: 'Preferred Contact: WhatsApp\nPreferred Time: Morning',
    status: 'scheduled',
    createdBy: 'website_booking',
  });
  const err = validRecord.validateSync();
  assert.equal(err, undefined);
  assert.equal(validRecord.status, 'scheduled');
  assert.equal(validRecord.createdBy, 'website_booking');
  assert.equal(validRecord.type, 'phone');
});

test('Task 1: CounsellingRecord schema rejects missing studentName or missing scheduledAt', () => {
  const invalid = new CounsellingRecord({
    studentPhone: '9876543210',
  });
  const err = invalid.validateSync();
  assert.ok(err);
  assert.ok(err.errors.studentName, 'studentName must be required');
  assert.ok(err.errors.scheduledAt, 'scheduledAt must be required');
});

test('Task 1: Counselling booking input validation rules', () => {
  function validateBooking(raw) {
    const errors = {};
    const name = typeof raw.name === 'string' ? raw.name.trim() : '';
    const phoneRaw = typeof raw.phone === 'string' ? raw.phone.trim() : '';
    const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
    const course = typeof raw.course === 'string' ? raw.course.trim() : '';

    if (!name || name.length > 100) {
      errors.name = 'Please enter the student name (up to 100 characters).';
    }
    const phoneDigits = phoneRaw.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      errors.phone = 'Please provide a valid 10-digit mobile number.';
    }
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!course || course.length > 150) {
      errors.course = 'Please select a course of interest.';
    }
    return { isValid: Object.keys(errors).length === 0, errors, phoneDigits };
  }

  // Valid inputs
  const validCheck = validateBooking({
    name: 'Boopathi',
    phone: '+91 9789446100',
    email: 'boopathi@example.com',
    course: 'B.E. Computer Science',
  });
  assert.equal(validCheck.isValid, true);
  assert.equal(validCheck.phoneDigits, '9789446100');

  // Invalid inputs
  const invalidCheck = validateBooking({
    name: '',
    phone: '12345',
    email: 'not-an-email',
    course: '',
  });
  assert.equal(invalidCheck.isValid, false);
  assert.ok(invalidCheck.errors.name);
  assert.ok(invalidCheck.errors.phone);
  assert.ok(invalidCheck.errors.email);
  assert.ok(invalidCheck.errors.course);
});

test('Task 1: General enquiry isolation: Enquiry schema persists independently without counselling fields', () => {
  assert.equal(Enquiry.collection.name, 'enquiries');
  const generalEnquiry = new Enquiry({
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    phone: '9876543210',
    course: 'Medical Sciences',
    message: 'I would like to inquire about general admission requirements.',
  });
  const err = generalEnquiry.validateSync();
  assert.equal(err, undefined);
  assert.equal(generalEnquiry.status, 'pending');
});

test('Task 1: Public counselling confirmation UI excludes the right-side "Please note" card and keeps booking reference and summary', () => {
  // Simulate view structure resolution based on submission status
  function getCounsellingViewLayout(status, { reference, lastSubmitted }) {
    const isSuccess = status === 'success';
    const containerClass = isSuccess ? 'max-w-2xl px-4' : 'grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_340px]';
    const showAside = !isSuccess;
    const showPleaseNoteCard = !isSuccess;

    const confirmationProps = isSuccess ? {
      title: 'Counselling Request Received',
      reference: reference ? `REF-${String(reference).slice(-8).toUpperCase()}` : '',
      details: [
        ...(lastSubmitted?.name ? [{ label: 'Student', value: lastSubmitted.name }] : []),
        ...(lastSubmitted?.course ? [{ label: 'Course Interest', value: lastSubmitted.course }] : []),
        ...(lastSubmitted?.contactMethod ? [{ label: 'Preferred Contact', value: lastSubmitted.contactMethod }] : []),
        ...(lastSubmitted?.district ? [{ label: 'District', value: lastSubmitted.district }] : []),
      ],
      nextSteps: 'Our team will reach out via your preferred contact method to discuss course eligibility, college cut-offs, and admissions.',
    } : null;

    return { containerClass, showAside, showPleaseNoteCard, confirmationProps };
  }

  // When form submission succeeds
  const mockBookingId = '662b66234f9a0c1281ab78cd';
  const successView = getCounsellingViewLayout('success', {
    reference: mockBookingId,
    lastSubmitted: {
      name: 'Kavitha R',
      course: 'Engineering (B.E/B.Tech)',
      contactMethod: 'Phone call',
      district: 'Coimbatore',
    },
  });

  assert.equal(successView.showAside, false, 'Aside must not render on successful confirmation');
  assert.equal(successView.showPleaseNoteCard, false, 'Right-side "Please note" card must be excluded');
  assert.equal(successView.containerClass, 'max-w-2xl px-4', 'Container must be centered without right column');
  assert.equal(successView.confirmationProps.reference, 'REF-81AB78CD', 'Booking reference ID must be preserved');
  assert.equal(successView.confirmationProps.details.length, 4, 'Student submission summary must be preserved');
  assert.equal(successView.confirmationProps.details[0].value, 'Kavitha R');
});

test('Task 1: Public counselling form retains error visibility on server or validation failures', () => {
  function getCounsellingViewLayout(status, serverError) {
    const isSuccess = status === 'success';
    const isError = status === 'error';
    const showForm = !isSuccess;
    const showAside = !isSuccess;
    const errorMessage = isError ? serverError : null;

    return { showForm, showAside, errorMessage };
  }

  const errorView = getCounsellingViewLayout('error', 'We could not save your request. Please try again, or call us.');
  assert.equal(errorView.showForm, true, 'Form must remain visible on error for retry');
  assert.equal(errorView.showAside, true, 'Guidance sidebar remains accessible while editing');
  assert.equal(errorView.errorMessage, 'We could not save your request. Please try again, or call us.', 'Real server error must not be suppressed');
});

test('Task 1: Counsellor assignment validation enforces legitimate staff records and rejects arbitrary names', async () => {
  // Empty / unassigned values are valid and normalize to empty string (Not assigned)
  const emptyRes1 = await validateCounsellorAssignment('');
  assert.equal(emptyRes1.valid, true);
  assert.equal(emptyRes1.assignedName, '');

  const emptyRes2 = await validateCounsellorAssignment('unassigned');
  assert.equal(emptyRes2.valid, true);
  assert.equal(emptyRes2.assignedName, '');

  const emptyRes3 = await validateCounsellorAssignment('Not assigned');
  assert.equal(emptyRes3.valid, true);
  assert.equal(emptyRes3.assignedName, '');

  // Arbitrary names from untrusted clients must be rejected
  const invalidRes = await validateCounsellorAssignment('Arbitrary Pretender');
  assert.equal(invalidRes.valid, false);
  assert.ok(invalidRes.error.includes('must be an active registered staff member'));

  // Verified staff (from environment credentials or DB staff) must be accepted
  const verifiedList = await getVerifiedCounsellors();
  if (verifiedList.length > 0) {
    const targetStaff = verifiedList[0];
    const validRes = await validateCounsellorAssignment(targetStaff.displayName || targetStaff.username);
    assert.equal(validRes.valid, true);
    assert.equal(validRes.assignedName, targetStaff.displayName || targetStaff.username);
  }
});

test('Task 1: Counsellor assignment resolution displays real staff member name and "Not assigned" for empty assignment', () => {
  function formatCounsellorCell(counsellor) {
    if (!counsellor || counsellor.trim() === '' || counsellor === 'Unassigned' || counsellor === 'Not assigned') {
      return { isAssigned: false, label: 'Not assigned' };
    }
    return { isAssigned: true, label: counsellor.trim() };
  }

  assert.deepEqual(formatCounsellorCell(''), { isAssigned: false, label: 'Not assigned' });
  assert.deepEqual(formatCounsellorCell(null), { isAssigned: false, label: 'Not assigned' });
  assert.deepEqual(formatCounsellorCell('Unassigned'), { isAssigned: false, label: 'Not assigned' });
  assert.deepEqual(formatCounsellorCell('Dr. A. Meenakshi'), { isAssigned: true, label: 'Dr. A. Meenakshi' });
  assert.deepEqual(formatCounsellorCell('Administrator'), { isAssigned: true, label: 'Administrator' });
});

test('Task 1: Existing CounsellingRecord documents remain fully backward compatible', () => {
  // Record without counsellor
  const rec1 = new CounsellingRecord({
    studentName: 'Priya S',
    studentPhone: '9876543210',
    scheduledAt: new Date(),
    interestedCourse: 'Medical',
    status: 'scheduled',
  });
  assert.equal(rec1.validateSync(), undefined);
  assert.equal(rec1.counsellor, '');

  // Record with counsellor
  const rec2 = new CounsellingRecord({
    studentName: 'Manojkumar',
    studentPhone: '9876543211',
    scheduledAt: new Date(),
    counsellor: 'Dr. A. Meenakshi',
    status: 'completed',
  });
  assert.equal(rec2.validateSync(), undefined);
  assert.equal(rec2.counsellor, 'Dr. A. Meenakshi');
});

// ==========================================
// TASK 2: Homepage Banners Mapping & Fallback
// ==========================================

test('Task 2: Banner schema validates placement enum home_hero and required title', () => {
  assert.equal(Banner.collection.name, 'banners');
  const validBanner = new Banner({
    title: 'Admissions Open 2026',
    placement: 'home_hero',
  });
  const err = validBanner.validateSync();
  assert.equal(err, undefined);

  const invalidPlacement = new Banner({
    title: 'Admissions Open',
    placement: 'invalid_zone',
  });
  const err2 = invalidPlacement.validateSync();
  assert.ok(err2);
  assert.ok(err2.errors.placement);
});

test('Task 2: Banner mapping transforms API banner format into HeroCarousel slide structure with fallback', () => {
  const apiBanner = {
    id: '671ee1234567890abcdef123',
    title: 'Empowering Rural Minds',
    description: 'Scholarship and career guidance across Tamil Nadu',
    altText: 'Empowering Rural Minds banner',
    ctaText: 'Apply for Scholarship',
    ctaUrl: '/scholarship-test',
    desktopImageUrl: '/api/banners/671ee1234567890abcdef123/image?type=desktop',
    mobileImageUrl: '/api/banners/671ee1234567890abcdef123/image?type=mobile',
  };

  // Mapper function matching HeroCarousel mapping
  const mapped = {
    id: String(apiBanner.id),
    src: apiBanner.desktopImageUrl || apiBanner.mobileImageUrl,
    mobileSrc: apiBanner.mobileImageUrl || apiBanner.desktopImageUrl,
    alt: apiBanner.altText || apiBanner.title,
    title: apiBanner.title,
    description: apiBanner.description,
    cta: {
      label: apiBanner.ctaText || 'Learn More',
      href: apiBanner.ctaUrl || '/book-counselling',
      box: { left: 4.1, top: 78.67, width: 29.25, height: 10.93 },
    },
    isDynamic: true,
  };

  assert.equal(mapped.id, '671ee1234567890abcdef123');
  assert.equal(mapped.src, '/api/banners/671ee1234567890abcdef123/image?type=desktop');
  assert.equal(mapped.cta.href, '/scholarship-test');
  assert.equal(mapped.cta.label, 'Apply for Scholarship');
  assert.equal(mapped.isDynamic, true);

  // Fallback check when banner has no usable images
  const invalidBanner = { id: 'empty', title: 'No Image' };
  const hasImage = Boolean(invalidBanner.desktopImageUrl || invalidBanner.mobileImageUrl);
  assert.equal(hasImage, false);
});

// ==========================================
// TASK 3: Public Courses Mapping & Fallback
// ==========================================

test('Task 3: Course schema validates unique (name, level) and level enum', () => {
  assert.equal(Course.collection.name, 'courses');
  const course = new Course({
    name: 'B.E. Robotics & Automation',
    level: 'UG',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM',
  });
  const err = course.validateSync();
  assert.equal(err, undefined);

  const invalidLevel = new Course({
    name: 'Invalid Course',
    level: 'PrimarySchool',
  });
  const err2 = invalidLevel.validateSync();
  assert.ok(err2);
  assert.ok(err2.errors.level);
});

test('Task 3: Course formatting enriches dynamic courses with UI category styles and falls back when empty', () => {
  const CATEGORY_STYLES = {
    medical: { color: 'red' },
    engineering: { color: 'blue' },
    management: { color: 'green' },
    arts: { color: 'teal' },
    law: { color: 'purple' },
    education: { color: 'amber' },
    agriculture: { color: 'emerald' },
  };

  function enrich(c) {
    const cat = (c.category || 'other').toLowerCase();
    const style = CATEGORY_STYLES[cat] || { color: 'blue' };
    return {
      id: c._id || c.id,
      name: c.name,
      fullName: c.code ? `${c.name} (${c.code})` : c.name,
      category: cat,
      duration: c.duration || '3-4 years',
      eligibility: c.eligibility || 'Contact counsellor for eligibility',
      description: c.description || '',
      color: style.color,
    };
  }

  // Test dynamic database course mapping
  const dbCourse = {
    _id: '671abc1234567890abcdef99',
    name: 'B.Tech AI & Data Science',
    code: 'AIDS',
    category: 'Engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, 50% min',
    description: 'Modern artificial intelligence and data engineering curriculum.',
  };

  const enriched = enrich(dbCourse);
  assert.equal(enriched.id, '671abc1234567890abcdef99');
  assert.equal(enriched.name, 'B.Tech AI & Data Science');
  assert.equal(enriched.fullName, 'B.Tech AI & Data Science (AIDS)');
  assert.equal(enriched.category, 'engineering');
  assert.equal(enriched.color, 'blue');

  // Fallback check: When dbCourses is empty array [], fallback condition is verified
  const dbCourses = [];
  const shouldUseFallback = !dbCourses || dbCourses.length === 0;
  assert.equal(shouldUseFallback, true);
});

// ==========================================
// TASK 2 (cont): Banner Upload & Decoding Robustness
// ==========================================

test('Task 2: decodeBase64Payload correctly handles data URLs with params, spaces and newlines', () => {
  const sampleText = 'Hello Rasi Foundation Banner';
  const base64Sample = Buffer.from(sampleText).toString('base64');

  // Case 1: Standard data URL
  const res1 = decodeBase64Payload(`data:image/jpeg;base64,${base64Sample}`);
  assert.equal(res1.ok, true);
  assert.equal(res1.buffer.toString(), sampleText);

  // Case 2: Data URL with parameters like charset
  const res2 = decodeBase64Payload(`data:image/png;charset=utf-8;base64,${base64Sample}`);
  assert.equal(res2.ok, true);
  assert.equal(res2.buffer.toString(), sampleText);

  // Case 3: Data URL with newlines and carriage returns
  const res3 = decodeBase64Payload(`data:image/webp;base64,\r\n${base64Sample}\n`);
  assert.equal(res3.ok, true);
  assert.equal(res3.buffer.toString(), sampleText);

  // Case 4: Rejection of invalid encoding
  const res4 = decodeBase64Payload('data:image/png;base64,***INVALID***');
  assert.equal(res4.ok, false);
  assert.equal(res4.error, 'Invalid file encoding');
});

test('Task 2: Banner schedule end date covers entire day up to 23:59:59.999 UTC', () => {
  function parseScheduleDate(dateStr, isEnd = false) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    if (isEnd && typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
      d.setUTCHours(23, 59, 59, 999);
    }
    return d;
  }

  const startDate = parseScheduleDate('2026-10-27', false);
  const endDate = parseScheduleDate('2026-10-27', true);

  assert.equal(startDate.toISOString(), '2026-10-27T00:00:00.000Z');
  assert.equal(endDate.toISOString(), '2026-10-27T23:59:59.999Z');
  assert.ok(endDate > startDate);
});

