// Central, non-secret site configuration for the redesigned header and home page.
// Contact details below are copied from existing code (Footer.js, FloatingButtons.js, contact.js).

export const CONTACT = {
  // Existing primary number (Footer.js, FloatingButtons.js, Navbar.js)
  phoneDisplay: '+91 97 89 44 61 00',
  phoneTel: '+919789446100',
  // Existing WhatsApp number used by FloatingButtons.js.
  // NOTE: pages/contact.js uses a different WhatsApp number (918073774591): needs owner confirmation.
  whatsappNumber: '919789446100',
  whatsappMessage: 'Hello! I would like to know more about Rasi Foundation counselling.',
  email: 'rasipuramrasifoundation@gmail.com',
};

// Only routes that exist under src/pages.
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Colleges', path: '/colleges' },
  { name: 'Scholarships', path: '/scholarship-test' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Announcements', path: '/announcements' },
  { name: 'Contact', path: '/contact' },
];

// Visible button labels kept in one place. "Secure Your Seat" opens the admission-details form, which continues
// to the general payment page. That page also takes counselling, course-fee, scholarship-test and donation
// payments, so the owner may prefer "Make a Payment": change the string below.
export const LABELS = {
  secureSeat: 'Secure Your Seat',
};

export const ROUTES = {
  // "Secure Your Seat": /payment only works with ?ref=<biodata id> (it redirects to /biodata otherwise),
  // so the real entry point is the biodata form, which continues to /payment. No payment logic is changed.
  secureSeat: '/biodata',
  counselling: '/book-counselling',
  // General enquiries use the existing contact form (POST /api/contact).
  enquiry: '/contact',
};

// Hero slides: the supplied banner artwork (images_for_website_build/banners, copied to public/images/banners).
// The artwork already contains its own headline, bullet text and CTA button, so no HTML text is overlaid.
// `cta.box` is the position of the CTA button drawn inside the image, as percentages of the image,
// so an invisible real link can sit exactly over it. `alt` carries the text that is baked into the image.
export const HERO_SLIDES = [
  {
    id: "tamil-guidance",
    src: "/images/banners/hero-1-tamil-campus-admissions.png",
    alt: "உங்கள் கல்வி பயணத்திற்கு நம்பிக்கையான துணை. Your trusted partner for your education journey: college admission, career guidance, scholarship guidance and personalised counselling, with a smiling student holding books in front of a college building.",
    cta: { label: "இப்போதே ஆலோசனை பெறுங்கள்", href: "/book-counselling", box: { left: 4.1, top: 78.67, width: 29.25, height: 10.93 } },
  },
  {
    id: "brighter-future",
    src: "/images/banners/hero-4-step-into-brighter-future.png",
    alt: "Step Into Your Brighter Future. Right guidance, right college, right career. Personalised career counselling, top college recommendations, scholarship support for eligible students and a wide range of courses.",
    cta: { label: "Explore Courses & Get Guidance", href: "/courses", box: { left: 4.35, top: 78.67, width: 25.15, height: 10.13 } },
  },
  {
    id: "students-tomorrow",
    src: "/images/banners/hero-5-students-today-leaders-tomorrow.png",
    alt: "உங்கள் கனவுக்கு சரியான பாதை இங்கே. The right path for your dream: the right colleges, the right course, scholarship opportunities and personalised guidance. A group of smiling students on a college campus. Students today, leaders tomorrow.",
    cta: { label: "Start Your Admission Journey", href: "/book-counselling", box: { left: 4.6, top: 78.0, width: 25.3, height: 10.93 } },
  },
];

// Social profile URLs, taken from the existing structured data in src/frontend/components/SEO.js (sameAs).
// The old footer icons used "#". The owner should confirm these are the live profiles (not checked online).
// An icon is only rendered for a non-empty entry.
export const SOCIAL = {
  facebook: 'https://www.facebook.com/rasifoundation',
  instagram: 'https://www.instagram.com/rasifoundation',
  youtube: 'https://www.youtube.com/@rasifoundation',
};

// Service area wording taken from the supplied header reference design (needs owner confirmation).
export const SERVICE_AREA = ["Tamil Nadu", "Karnataka", "All India Support"];

// The 38 districts of Tamil Nadu. Display only: the colleges page has no district filter yet.
export const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
  'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur',
  'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris',
  'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga',
  'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
  'Viluppuram', 'Virudhunagar',
];

// Testimonials: leave empty until verified, written consent has been collected.
// The home page renders no testimonials section while both lists are empty.
// Shape: { quote, name, role, institution }
export const TESTIMONIALS = {
  students: [],
  colleges: [],
};

// Google rating / reviews for the About page. DISABLED until the organisation supplies verified data:
// no Google Business Profile, Places API or review link exists in this repository (the only Google URL, in
// pages/contact.js, is a map location pin, not a review page). Never put estimated numbers here.
// To enable: set enabled to true and fill rating (0-5), reviewCount, profileUrl (official Google
// Business Profile / Maps link) and optionally writeReviewUrl, lastVerified (e.g. '2026-01-15'), and
// reviews as [{ author, rating, text, date }] copied exactly from Google.
export const GOOGLE_REVIEWS = {
  enabled: false,
  rating: null,
  reviewCount: null,
  profileUrl: '',
  writeReviewUrl: '',
  lastVerified: '',
  reviews: [],
};
