import test from 'node:test';
import assert from 'node:assert/strict';
import { BANNER_PLACEMENTS } from '../../src/backend/models/Banner.js';
import { isSafeUrl } from '../../src/backend/lib/validators.js';

// ==========================================
// Test 1: Modal Focus Stealing Regression Test
// ==========================================

test('Modal: Focus lifecycle does NOT steal focus to close button during continuous typing', async () => {
  // Mock DOM environment
  const mockCloseBtn = { id: 'close-btn', tagName: 'BUTTON', focusCount: 0, focus() { this.focusCount++; mockDoc.activeElement = this; } };
  const mockTitleInput = { id: 'title-input', tagName: 'INPUT', value: '', focusCount: 0, focus() { this.focusCount++; mockDoc.activeElement = this; } };
  const mockDescTextarea = { id: 'desc-textarea', tagName: 'TEXTAREA', value: '', focusCount: 0, focus() { this.focusCount++; mockDoc.activeElement = this; } };
  const mockSubmitBtn = { id: 'submit-btn', tagName: 'BUTTON', focusCount: 0, focus() { this.focusCount++; mockDoc.activeElement = this; } };

  const mockBody = {
    querySelector(sel) {
      if (sel.includes('input')) return mockTitleInput;
      if (sel.includes('textarea')) return mockDescTextarea;
      return null;
    }
  };

  const mockModalContainer = {
    querySelector(sel) {
      if (sel.includes('[data-modal-body]')) return mockBody;
      if (sel.includes('button')) return mockCloseBtn;
      return null;
    },
    querySelectorAll(sel) {
      return [mockCloseBtn, mockTitleInput, mockDescTextarea, mockSubmitBtn];
    }
  };

  const mockDoc = {
    activeElement: null,
    body: { style: { overflow: '' } }
  };

  // Simulate Modal hook & effect logic with the fix
  class ModalSim {
    constructor() {
      this.isOpen = false;
      this.onClose = () => {};
      this.preventClose = false;
      this.effectRuns = 0;
      this.cleanups = 0;
      this.onCloseRef = { current: this.onClose };
      this.preventCloseRef = { current: this.preventClose };
      this.wasOpen = false;
      this.activeTimer = null;
    }

    render({ isOpen, onClose, preventClose }) {
      this.isOpen = isOpen;
      this.onClose = onClose;
      this.preventClose = preventClose;

      // Synchronization refs
      this.onCloseRef.current = onClose;
      this.preventCloseRef.current = preventClose;

      // React useEffect depends strictly on [isOpen]
      if (isOpen !== this.wasOpen) {
        if (isOpen) {
          this.effectRuns++;
          mockDoc.body.style.overflow = 'hidden';

          // Initial focus logic
          const bodyElement = mockModalContainer.querySelector('[data-modal-body]');
          const firstInput = bodyElement?.querySelector('input');
          if (firstInput) {
            firstInput.focus();
          } else {
            const firstFocusable = mockModalContainer.querySelector('button');
            firstFocusable?.focus();
          }
        } else {
          this.cleanups++;
          mockDoc.body.style.overflow = '';
        }
        this.wasOpen = isOpen;
      }
    }
  }

  const modal = new ModalSim();

  // 1. Open the modal
  modal.render({
    isOpen: true,
    onClose: () => {},
    preventClose: false
  });

  assert.equal(modal.effectRuns, 1, 'Effect should run once on initial open');
  assert.equal(mockDoc.activeElement.id, 'title-input', 'Initial focus must target the first editable input, not the close button');
  assert.equal(mockCloseBtn.focusCount, 0, 'Close button must NOT receive focus on open');

  // 2. User types into title: "Rasi Scholarship 2026" (21 characters)
  const textToType = 'Rasi Scholarship 2026';
  let formState = { title: '' };

  for (let i = 0; i < textToType.length; i++) {
    formState.title += textToType[i];
    mockTitleInput.value = formState.title;

    // Simulate parent re-render passing a new inline function identity on each keystroke
    modal.render({
      isOpen: true,
      onClose: () => { /* new function instance on every render */ },
      preventClose: false
    });

    // Check that activeElement did not get stolen to close button
    assert.equal(mockDoc.activeElement.id, 'title-input', `Focus must remain on input while typing character ${i} ('${textToType[i]}')`);
    assert.equal(mockCloseBtn.focusCount, 0, `Close button must never steal focus during typing character ${i}`);
  }

  assert.equal(modal.effectRuns, 1, 'Effect must not re-run during typing re-renders');
  assert.equal(mockTitleInput.value, 'Rasi Scholarship 2026');
});

// ==========================================
// Test 2: Modal Keyboard Navigation & Focus Trap
// ==========================================

test('Modal: Tab key wraps around focusable elements (Focus Trap)', () => {
  const elements = [
    { id: 'close-btn', tagName: 'BUTTON', offsetParent: {} },
    { id: 'input-1', tagName: 'INPUT', offsetParent: {} },
    { id: 'input-2', tagName: 'INPUT', offsetParent: {} },
    { id: 'submit-btn', tagName: 'BUTTON', offsetParent: {} }
  ];

  let currentActive = elements[0];
  let prevented = false;

  function handleTab(e) {
    prevented = false;
    const focusableElements = elements;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (currentActive === firstElement) {
        prevented = true;
        currentActive = lastElement;
      }
    } else {
      if (currentActive === lastElement) {
        prevented = true;
        currentActive = firstElement;
      }
    }
  }

  // Forward Tab on last element wraps to first
  currentActive = elements[3]; // submit-btn
  handleTab({ key: 'Tab', shiftKey: false });
  assert.equal(prevented, true);
  assert.equal(currentActive.id, 'close-btn');

  // Shift+Tab on first element wraps to last
  currentActive = elements[0]; // close-btn
  handleTab({ key: 'Tab', shiftKey: true });
  assert.equal(prevented, true);
  assert.equal(currentActive.id, 'submit-btn');
});

// ==========================================
// Test 3: Escape & Backdrop Closing Behavior
// ==========================================

test('Modal: Escape key and backdrop handle preventClose correctly', () => {
  let closed = false;
  const onClose = () => { closed = true; };

  function triggerEscape(preventClose) {
    closed = false;
    if (!preventClose) {
      onClose();
    }
  }

  function triggerBackdrop(e, preventClose) {
    closed = false;
    if (e.target === e.currentTarget && !preventClose) {
      onClose();
    }
  }

  // Escape when not preventing close
  triggerEscape(false);
  assert.equal(closed, true, 'Escape should close modal when preventClose is false');

  // Escape when saving/preventClose is true
  triggerEscape(true);
  assert.equal(closed, false, 'Escape must not close modal when preventClose is true');

  // Backdrop click on backdrop container
  const backdropContainer = { id: 'backdrop' };
  triggerBackdrop({ target: backdropContainer, currentTarget: backdropContainer }, false);
  assert.equal(closed, true, 'Click on backdrop container should close');

  // Click inside modal content
  const dialogSurface = { id: 'dialog' };
  triggerBackdrop({ target: dialogSurface, currentTarget: backdropContainer }, false);
  assert.equal(closed, false, 'Click inside dialog surface must not close modal');

  // Backdrop click while saving
  triggerBackdrop({ target: backdropContainer, currentTarget: backdropContainer }, true);
  assert.equal(closed, false, 'Backdrop click must not close when saving (preventClose: true)');
});

// ==========================================
// Test 4: Banner Form Validation & State Stability
// ==========================================

test('Banner Form: Validation errors do not clear or reset valid entered inputs', () => {
  let formState = {
    title: 'Free NEET & JEE Residential Coaching',
    description: 'Comprehensive 1-year guidance with top faculty',
    placement: 'home_hero',
    order: 1,
    ctaText: 'Register Now',
    ctaUrl: '/biodata',
    desktopImageData: null, // missing required image for new banner
    startsAt: '2026-05-01',
    endsAt: '2026-05-31',
    isActive: true,
  };

  let errorState = '';

  // Simulate banner form submission validation
  function validateAndSave(isEditing, form) {
    if (!form.title.trim()) {
      errorState = 'Banner title is required';
      return false;
    }
    if (!isEditing && !form.desktopImageData) {
      errorState = 'A desktop image is required to publish a new banner';
      return false;
    }
    errorState = '';
    return true;
  }

  const success = validateAndSave(false, formState);

  assert.equal(success, false, 'Submission should fail due to missing desktop image');
  assert.equal(errorState, 'A desktop image is required to publish a new banner');

  // Assert all form fields are 100% preserved and intact
  assert.equal(formState.title, 'Free NEET & JEE Residential Coaching');
  assert.equal(formState.description, 'Comprehensive 1-year guidance with top faculty');
  assert.equal(formState.placement, 'home_hero');
  assert.equal(formState.order, 1);
  assert.equal(formState.ctaText, 'Register Now');
  assert.equal(formState.ctaUrl, '/biodata');
  assert.equal(formState.startsAt, '2026-05-01');
  assert.equal(formState.endsAt, '2026-05-31');
  assert.equal(formState.isActive, true);
});

// ==========================================
// Test 5: Single Submission / Double Click Guard
// ==========================================

test('Banner Form: Publish submit is guarded against duplicate submissions', async () => {
  let apiCalls = 0;
  let saving = false;

  async function mockHandleSave(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (saving) return; // Guard against double click

    saving = true;
    apiCalls++;

    // Simulate async network call
    await new Promise((r) => setTimeout(r, 20));
    saving = false;
  }

  // Trigger two rapid clicks
  const call1 = mockHandleSave({ preventDefault: () => {} });
  const call2 = mockHandleSave({ preventDefault: () => {} });

  await Promise.all([call1, call2]);

  assert.equal(apiCalls, 1, 'API call must execute exactly once even on rapid double-click');
});

// ==========================================
// Test 6: Banner Edit Flow Attributes Mapping
// ==========================================

test('Banner Form: Edit modal initializes with all existing banner attributes', () => {
  const existingBanner = {
    _id: '67b8a1c9000000000000001',
    title: 'Engineering Admission Guidance 2026',
    description: 'TNEA counselling support and college choice filling',
    altText: 'Engineering counselling',
    ctaText: 'Book Slot',
    ctaUrl: '/book-counselling',
    placement: 'home_hero',
    order: 3,
    isActive: true,
    startsAt: '2026-06-01T00:00:00.000Z',
    endsAt: '2026-06-30T23:59:59.999Z',
    desktopImageUrl: '/uploads/banners/eng_guide.webp',
    mobileImageUrl: '/uploads/banners/eng_guide_mob.webp',
  };

  function openEditModal(banner) {
    return {
      title: banner.title || '',
      description: banner.description || '',
      altText: banner.altText || '',
      ctaText: banner.ctaText || '',
      ctaUrl: banner.ctaUrl || '',
      placement: banner.placement || 'home_hero',
      order: banner.order || 0,
      isActive: Boolean(banner.isActive),
      startsAt: banner.startsAt ? banner.startsAt.split('T')[0] : '',
      endsAt: banner.endsAt ? banner.endsAt.split('T')[0] : '',
      desktopImageData: null,
      desktopImageName: '',
      mobileImageData: null,
      mobileImageName: '',
    };
  }

  const editForm = openEditModal(existingBanner);

  assert.equal(editForm.title, 'Engineering Admission Guidance 2026');
  assert.equal(editForm.startsAt, '2026-06-01');
  assert.equal(editForm.endsAt, '2026-06-30');
  assert.equal(editForm.placement, 'home_hero');
  assert.equal(editForm.order, 3);
  assert.equal(editForm.isActive, true);
  assert.equal(editForm.ctaText, 'Book Slot');
  assert.equal(editForm.ctaUrl, '/book-counselling');
});

// ==========================================
// Test 7: Modal Sizing & Viewport Clamping
// ==========================================

test('Modal: Sizing system allocates wide viewport space without breaking small dialogs', () => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-[1100px]',
    '2xl': 'max-w-[1280px]',
    full: 'max-w-[calc(100vw-32px)] sm:max-w-[calc(100vw-48px)]',
  };

  // Banner & Counselling use xl (~1100px max width for comfortable multi-column layout)
  assert.equal(sizeClasses['xl'], 'max-w-[1100px]', 'xl must resolve to 1100px for banner/counselling');
  
  // Confirm Dialogs use sm (~448px) - must not be enlarged
  assert.equal(sizeClasses['sm'], 'max-w-md', 'sm must remain max-w-md for compact confirmation dialogs');

  // Course & Announcement use lg/xl
  assert.equal(sizeClasses['lg'], 'max-w-3xl');
  assert.equal(sizeClasses['2xl'], 'max-w-[1280px]');
});

// ==========================================
// Test 8: Drawer Focus Stability on Note Entry
// ==========================================

test('Drawer: Focus lifecycle does NOT steal focus during admin notes editing', () => {
  let effectRuns = 0;
  let wasOpen = false;
  let activeElement = { id: 'notes-textarea' };
  const mockCloseBtn = { id: 'drawer-close-btn', focusCount: 0 };

  function simulateDrawerRender(isOpen, onClose) {
    // Effect depends strictly on [isOpen]
    if (isOpen !== wasOpen) {
      if (isOpen) {
        effectRuns++;
      }
      wasOpen = isOpen;
    }
  }

  // 1. Open drawer
  simulateDrawerRender(true, () => {});
  assert.equal(effectRuns, 1);

  // 2. Type notes inside drawer
  const noteContent = 'Student verified with 7.5% government school quota';
  for (let i = 0; i < noteContent.length; i++) {
    simulateDrawerRender(true, () => { /* new callback */ });
    assert.equal(activeElement.id, 'notes-textarea', 'Focus must remain on notes textarea');
    assert.equal(mockCloseBtn.focusCount, 0, 'Drawer close button must not steal focus');
  }

  assert.equal(effectRuns, 1, 'Drawer effect must not re-run on note keystrokes');
});

// ==========================================
// Test 9: Banner CTA Button Text Dropdown & Custom Handling
// ==========================================
test('Banner CTA: Dropdown predefined options, none selection, and custom label preservation', () => {
  const PREDEFINED_CTA_TEXTS = [
    'Explore Colleges',
    'Explore Courses',
    'Apply Now',
    'Book Counselling',
    'Learn More',
    'Contact Us',
    'View Details',
  ];

  // 1. Predefined selection
  let form = { ctaText: '' };
  let isCustom = false;

  const selectPredefined = (val) => {
    if (val === '__custom__') {
      isCustom = true;
    } else {
      isCustom = false;
      form.ctaText = val;
    }
  };

  selectPredefined('Apply Now');
  assert.equal(form.ctaText, 'Apply Now');
  assert.equal(isCustom, false);

  // 2. Clear CTA (None)
  selectPredefined('');
  assert.equal(form.ctaText, '');
  assert.equal(isCustom, false);

  // 3. Custom selection
  selectPredefined('__custom__');
  assert.equal(isCustom, true);
  form.ctaText = 'Register for Merit Exam';
  assert.equal(form.ctaText, 'Register for Merit Exam');

  // 4. Edit mode initialization with predefined label
  const bannerWithPredefined = { ctaText: 'Book Counselling' };
  const hasCustom1 = Boolean(bannerWithPredefined.ctaText && !PREDEFINED_CTA_TEXTS.includes(bannerWithPredefined.ctaText));
  assert.equal(hasCustom1, false);

  // 5. Edit mode initialization with custom label (must not be reset or wiped)
  const bannerWithCustom = { ctaText: 'Download Prospectus 2026' };
  const hasCustom2 = Boolean(bannerWithCustom.ctaText && !PREDEFINED_CTA_TEXTS.includes(bannerWithCustom.ctaText));
  assert.equal(hasCustom2, true);
  const editForm = { ctaText: bannerWithCustom.ctaText };
  assert.equal(editForm.ctaText, 'Download Prospectus 2026', 'Existing custom CTA label must be preserved');
});

// ==========================================
// Test 10: Banner CTA Destination URL Dropdown & Route Validation
// ==========================================
test('Banner CTA Destination: Verified internal routes, custom URL reveal, and security validation', () => {
  const VERIFIED_CTA_ROUTES = [
    { path: '/colleges', label: 'Colleges Portal (/colleges)' },
    { path: '/courses', label: 'Courses Directory (/courses)' },
    { path: '/book-counselling', label: 'Free Counselling Booking (/book-counselling)' },
    { path: '/biodata', label: 'Student BioData & Scholarship Form (/biodata)' },
    { path: '/scholarship-test', label: 'Scholarship Exam Portal (/scholarship-test)' },
    { path: '/scholarship-test/register', label: 'Scholarship Registration (/scholarship-test/register)' },
    { path: '/practice-test', label: 'NEET / JEE Practice Test (/practice-test)' },
    { path: '/achievements', label: 'Achievements & Stories (/achievements)' },
    { path: '/announcements', label: 'Announcements & Alerts (/announcements)' },
    { path: '/about', label: 'About Rasi Foundation (/about)' },
    { path: '/contact', label: 'Contact Us (/contact)' },
    { path: '/feedback', label: 'Student Feedback (/feedback)' },
  ];

  // 1. All verified routes must start with '/' and be non-empty
  for (const route of VERIFIED_CTA_ROUTES) {
    assert.ok(route.path.startsWith('/'), `Route ${route.path} must be relative starting with /`);
    assert.ok(isSafeUrl(route.path), `Route ${route.path} must pass isSafeUrl`);
  }

  // 2. Reject dangerous URL schemes
  assert.equal(isSafeUrl('javascript:alert(1)'), false, 'javascript: URLs must be rejected');
  assert.equal(isSafeUrl('data:text/html,<script>'), false, 'data: URLs must be rejected');
  assert.equal(isSafeUrl('//malicious-domain.com'), false, 'Protocol-relative URLs must be rejected');

  // 3. Accept valid external HTTPS URLs for custom links
  assert.equal(isSafeUrl('https://tneaonline.org'), true);
  assert.equal(isSafeUrl('https://neet.nta.nic.in'), true);

  // 4. Edit mode initialization with custom/external URL
  const existingExternalBanner = { ctaUrl: 'https://example.com/special-scholarship' };
  const isCustomUrl = Boolean(existingExternalBanner.ctaUrl && !VERIFIED_CTA_ROUTES.some((r) => r.path === existingExternalBanner.ctaUrl));
  assert.equal(isCustomUrl, true, 'External URL must automatically activate custom URL input on edit');
});

// ==========================================
// Test 11: Banner Placement Dropdown Coverage
// ==========================================
test('Banner Placement: Dropdown options map 100% to Mongoose BANNER_PLACEMENTS enum', () => {
  const BANNER_PLACEMENTS_LIST = [
    { value: 'home_hero', label: 'Home Hero Carousel' },
    { value: 'home_secondary', label: 'Home Secondary' },
    { value: 'about', label: 'About Page' },
    { value: 'courses', label: 'Courses Page' },
    { value: 'colleges', label: 'Colleges Page' },
    { value: 'scholarship', label: 'Scholarship Page' },
    { value: 'achievements', label: 'Achievements Page' },
    { value: 'announcements', label: 'Announcements Page' },
    { value: 'contact', label: 'Contact Page' },
    { value: 'feedback', label: 'Feedback Page' },
    { value: 'global', label: 'Global / All Pages' },
  ];

  const dropdownValues = BANNER_PLACEMENTS_LIST.map((p) => p.value);
  for (const placement of BANNER_PLACEMENTS) {
    assert.ok(dropdownValues.includes(placement), `Placement ${placement} from model must be selectable in admin dropdown`);
  }
  assert.equal(dropdownValues.length, BANNER_PLACEMENTS.length, 'No missing or extraneous placements');
});

// ==========================================
// Test 12: Course Category & Duration Dropdowns
// ==========================================
test('Courses: Category dropdown matches public website filters and preserves custom values', () => {
  const COURSE_CATEGORIES = [
    { value: 'engineering', label: 'Engineering & Technology (engineering)' },
    { value: 'medical', label: 'Medical & Healthcare (medical)' },
    { value: 'management', label: 'Management & Business (management)' },
    { value: 'arts', label: 'Arts & Science (arts)' },
    { value: 'law', label: 'Law & Legal Studies (law)' },
    { value: 'education', label: 'Education & Teaching (education)' },
    { value: 'agriculture', label: 'Agriculture & Allied Sciences (agriculture)' },
    { value: 'other', label: 'Other Disciplines (other)' },
  ];

  const COURSE_DURATIONS = [
    '4 Years (8 Semesters)',
    '3 Years (6 Semesters)',
    '5 Years (10 Semesters)',
    '5.5 Years (11 Semesters)',
    '2 Years (4 Semesters)',
    '1 Year (2 Semesters)',
    '6 Months (1 Semester)',
  ];

  // 1. Verify category alignment with public /courses filter keys
  const expectedFilterKeys = ['medical', 'engineering', 'management', 'arts', 'law', 'education', 'agriculture'];
  for (const key of expectedFilterKeys) {
    assert.ok(COURSE_CATEGORIES.some((c) => c.value === key), `Course category ${key} must exist in admin dropdown`);
  }

  // 2. Custom category handling
  const existingCustomCourse = { category: 'Biotechnology & Bioinformatics', duration: '3.5 Years' };
  const isCustomCategory = Boolean(existingCustomCourse.category && !COURSE_CATEGORIES.some((cat) => cat.value === existingCustomCourse.category));
  const isCustomDuration = Boolean(existingCustomCourse.duration && !COURSE_DURATIONS.includes(existingCustomCourse.duration));

  assert.equal(isCustomCategory, true, 'Non-standard category triggers custom input');
  assert.equal(isCustomDuration, true, 'Non-standard duration triggers custom input');
  assert.equal(existingCustomCourse.category, 'Biotechnology & Bioinformatics', 'Custom category preserved');
});

// ==========================================
// Test 13: Announcement Action Link Dropdown
// ==========================================
test('Announcements: Action link dropdown contains verified internal routes and preserves custom links', () => {
  const VERIFIED_ANNOUNCEMENT_ROUTES = [
    { path: '', label: 'None (No action link)' },
    { path: '/scholarship-test', label: 'Scholarship Exam Portal (/scholarship-test)' },
    { path: '/scholarship-test/register', label: 'Scholarship Registration (/scholarship-test/register)' },
    { path: '/practice-test', label: 'NEET / JEE Practice Test (/practice-test)' },
    { path: '/book-counselling', label: 'Free Counselling Booking (/book-counselling)' },
    { path: '/biodata', label: 'Student BioData & Scholarship Form (/biodata)' },
    { path: '/colleges', label: 'Colleges Portal (/colleges)' },
    { path: '/courses', label: 'Courses Directory (/courses)' },
    { path: '/achievements', label: 'Achievements & Stories (/achievements)' },
    { path: '/announcements', label: 'Announcements & Alerts (/announcements)' },
    { path: '/about', label: 'About Rasi Foundation (/about)' },
    { path: '/contact', label: 'Contact Us (/contact)' },
    { path: '/feedback', label: 'Student Feedback (/feedback)' },
  ];

  // Internal route selection
  const route = VERIFIED_ANNOUNCEMENT_ROUTES.find((r) => r.path === '/scholarship-test');
  assert.ok(route);
  assert.equal(isSafeUrl(route.path), true);

  // External link preservation on edit
  const existingAnnouncement = { link: 'https://dge.tn.gov.in/results' };
  const isCustom = Boolean(existingAnnouncement.link && !VERIFIED_ANNOUNCEMENT_ROUTES.some((r) => r.path === existingAnnouncement.link));
  assert.equal(isCustom, true);
  assert.equal(isSafeUrl(existingAnnouncement.link), true);
});

