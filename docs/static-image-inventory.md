# Rasi Foundation — Static Image Inventory & HD Replacement Audit

**Report File:** `docs/static-image-inventory.md`  
**Generated At:** 2026-10-29  
**Status:** Complete & Verified Against Codebase  
**Scope:** Verified static assets referenced in application source files, excluding all database, runtime, CMS, and dynamic uploads.

---

## 1. Executive Summary & Inventory Metrics

A comprehensive audit of the entire Rasi Foundation Next.js 14 codebase was conducted to isolate every static image currently referenced in code, inspect its source file, determine its display geometry, identify broken references, and establish an actionable plan for High-Definition (HD) replacement.

Currently, the website heavily relies on **5 wide banner graphics** (`hero-1` through `hero-5`) that have baked-in Tamil and English marketing typography and CTA buttons. The frontend components use CSS clipping via [`BannerCrop.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/BannerCrop.js) to crop around the text and extract student faces for category cards, aside visuals, and collages. Replacing these with clean, uncompressed, un-cropped native HD photography will dramatically elevate visual quality across all viewports.

### Summary Metrics

| Metric | Count | Details |
| :--- | :---: | :--- |
| **Total Physical Image Files in `public/`** | **10** | 5 banner graphics, 3 brand identity assets, 2 unreferenced assets |
| **Unique Static Images Referenced in Code** | **8** | 5 content banners + 3 official brand assets |
| **Total Static Image References (including repeated usage)** | **63** | Traced across 19 components and pages |
| **Images Recommended for HD Replacement** | **5** | All 5 content/hero banners currently serving as cropped multi-page assets |
| **Missing / Broken Static References Identified** | **1** | `/og-image.jpg` referenced in `Layout.js` and `SEO.js`, missing in `public/` |
| **Brand Identity Assets to Retain (Do Not Alter)** | **3** | `rasi-logo.png`, `logo.png`, `graduation-cap.png` |
| **Unused / Orphan Image Files in Assets** | **2** | `admin-login.png`, `logo2.png` |
| **Dynamic / Database Features Excluded** | **4** | Dynamic banners (`/api/banners`), college crests (`/api/colleges`), student docs (`/api/admin/documents`), testimonials (`/api/feedback`) |

---

## 2. Verified Static Images by Page and Section

### A. Home Page (`src/pages/index.js`)

#### 1. Hero Carousel (Static Fallback when no active MongoDB banners exist)
- **Component / Source:** [`src/frontend/components/home/HeroCarousel.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/HeroCarousel.js#L58-L66) via [`src/data/siteConfig.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/data/siteConfig.js#L47-L66)
- **Image Filename 1:** `hero-1-tamil-campus-admissions.png`
  - **Project Path:** `public/images/banners/hero-1-tamil-campus-admissions.png`
  - **Current Dimensions & Format:** 2048 × 768 px, PNG, 1.99 MB (8:3 aspect ratio)
  - **Type:** Full-width Hero Banner Slide 1
  - **Current Purpose:** Primary hero slide in Tamil highlighting education guidance and college admissions.
  - **Recommended Replacement Filename:** `hero-slide-01-tamil-guidance.webp`
  - **Recommended Aspect Ratio & Resolution:** 21:9 or 16:7 (2560 × 1080 px or 2048 × 896 px)
  - **AI Image Generation Prompt:**
    > *"Cinematic wide shot of an ambitious South Indian college student smiling warmly, holding engineering and medical textbooks, standing in front of a majestic, modern South Indian university campus facade under warm golden-hour sunlight. Modern glass and granite architecture, lush green palm and teak trees, clean walkways, students collaborating in the soft-focus background. Pristine high-key lighting, 8k resolution, authentic Indian higher education setting, photorealistic, shot on 35mm lens, f/2.8, no text, no watermark."*

- **Image Filename 2:** `hero-4-step-into-brighter-future.png`
  - **Project Path:** `public/images/banners/hero-4-step-into-brighter-future.png`
  - **Current Dimensions & Format:** 2048 × 768 px, PNG, 2.01 MB (8:3 aspect ratio)
  - **Type:** Full-width Hero Banner Slide 2
  - **Current Purpose:** Hero slide in English illustrating "Step Into Your Brighter Future - Right Guidance, Right College, Right Career".
  - **Recommended Replacement Filename:** `hero-slide-02-career-pathways.webp`
  - **Recommended Aspect Ratio & Resolution:** 21:9 or 16:7 (2560 × 1080 px or 2048 × 896 px)
  - **AI Image Generation Prompt:**
    > *"Wide environmental portrait of an experienced Indian academic career counsellor in professional attire warmly advising a young student and their supportive parents inside a modern, sunlit admissions guidance office. Laptop, college prospectuses, and campus blueprints on the wooden desk. Large panoramic window behind them overlooking a green academic quad. Inspiring, trustworthy atmosphere, soft natural lighting, documentary photography style, ultra-high resolution, 8k, f/4, natural smiles, no text, no logos."*

- **Image Filename 3:** `hero-5-students-today-leaders-tomorrow.png`
  - **Project Path:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png`
  - **Current Dimensions & Format:** 2048 × 768 px, PNG, 2.06 MB (8:3 aspect ratio)
  - **Type:** Full-width Hero Banner Slide 3
  - **Current Purpose:** Hero slide featuring multi-stream university students walking forward together on campus.
  - **Recommended Replacement Filename:** `hero-slide-03-students-leaders.webp`
  - **Recommended Aspect Ratio & Resolution:** 21:9 or 16:7 (2560 × 1080 px or 2048 × 896 px)
  - **AI Image Generation Prompt:**
    > *"Widescreen cinematic tracking shot of an energetic, diverse group of South Indian university students (male and female, wearing contemporary smart-casual attire and backpacks) walking enthusiastically through a sun-dappled college courtyard surrounded by classical stone porticos and modern university buildings. Natural smiles, holding notebooks and laptops, engaging in intellectual discussion. Vivid morning light, rich emerald and gold tones, shallow depth of field, photorealistic, 8k UHD, Hasselblad H6D-100c quality, no text."*

---

#### 2. Popular Course Categories Grid (Section 6)
- **Component / Source:** [`src/pages/index.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/index.js#L29-L93) (`COURSE_CATEGORIES` array)
- **Architecture Note:** Currently, 7 course streams reuse crops from the 5 banner files:
  - **Engineering:** `hero-5-students-today-leaders-tomorrow.png` (Crop region: `{ x: 1470, y: 60, w: 260, h: 416 }`)
  - **Medical:** `hero-2-right-guidance.png` (Crop region: `{ x: 860, y: 0, w: 350, h: 560 }`)
  - **Arts & Science:** `hero-5-students-today-leaders-tomorrow.png` (Crop region: `{ x: 1250, y: 150, w: 350, h: 560 }`)
  - **Law:** `hero-4-step-into-brighter-future.png` (Crop region: `{ x: 800, y: 20, w: 350, h: 560 }`)
  - **Management:** `hero-5-students-today-leaders-tomorrow.png` (Crop region: `{ x: 920, y: 120, w: 350, h: 560 }`)
  - **Education:** `hero-3-explore-perfect-course.png` (Crop region: `{ x: 880, y: 60, w: 350, h: 560 }`)
  - **Agriculture:** `hero-2-right-guidance.png` (Crop region: `{ x: 920, y: 40, w: 350, h: 560 }`)
- **Recommended Strategy:** Rather than cropping stretched banner faces, provide dedicated 4:3 card images:
  - `category-engineering.webp` (4:3, 800 × 600 px): *"Indian engineering student working on robotics and AI circuit boards in a high-tech university laboratory, focused expression, futuristic laboratory equipment."*
  - `category-medical.webp` (4:3, 800 × 600 px): *"Young South Indian female medical student in a crisp white lab coat with stethoscope around her neck, smiling confidently in a modern medical college hospital corridor."*
  - `category-arts-science.webp` (4:3, 800 × 600 px): *"Undergraduate students conducting biological chemistry research with glass beakers and digital microscopes in a bright, well-equipped university science lab."*
  - `category-law.webp` (4:3, 800 × 600 px): *"Focused Indian law student in formal black blazer holding constitutional law books inside an ornate university moot court and law library with mahogany bookshelves."*
  - `category-management.webp` (4:3, 600 × 800 px): *"Young Indian MBA students in business suits presenting data charts on a digital whiteboard in an executive business school seminar room."*
  - `category-education.webp` (4:3, 800 × 600 px): *"Passionate teacher-trainee student holding learning aids, smiling warmly inside a smart classroom setting with interactive screens."*
  - `category-agriculture.webp` (4:3, 800 × 600 px): *"Agricultural science student in field apron examining healthy green organic crops in a modern university greenhouse / research nursery under morning sunlight."*

---

#### 3. Section 8 — Scholarship Support Spotlight
- **Component / Source:** [`src/pages/index.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/index.js#L414-L425)
- **Current Image:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png`
- **Current Dimensions & Format:** 2048 × 768 px (CSS shifted by `-104.76% left`, `-20.7% top`)
- **Type:** Feature Card Visual
- **Current Purpose:** Showcase students who obtained higher education scholarship support.
- **Recommended Replacement Filename:** `home-scholarship-spotlight.webp`
- **Recommended Aspect Ratio & Resolution:** 4:3 or 16:10 (1200 × 900 px)
- **AI Image Generation Prompt:**
  > *"Medium candid shot of two deserving South Indian rural students, brother and sister, looking thrilled and inspired as they review their prestigious academic scholarship award letter on their family front porch. Mother and father smiling proudly in the background. Genuine joy, authentic modest home setting in Tamil Nadu, warm sunset rim light, cinematic documentary photography, 8k, emotional, photorealistic."*

---

#### 4. Section 9 — Vision & Mission Cards
- **Component / Source:** [`src/frontend/components/home/VisionMission.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/VisionMission.js#L16-L36) (Also embedded in `src/pages/about.js:272`)
- **Vision Card Image:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png` (Crop region: `{ x: 860, y: 70, w: 720, h: 360 }`)
  - **Recommended Replacement Filename:** `home-vision-campus-horizon.webp`
  - **Aspect Ratio & Resolution:** 2:1 (1000 × 500 px)
  - **AI Prompt:** *"Panoramic golden-hour view of college graduates tossing their mortarboards into the blue sky on a historic university campus lawn, silhouette and golden backlighting, representing aspirational future outlook, professional education, 8k."*
- **Mission Card Image:** `public/images/banners/hero-2-right-guidance.png` (Crop region: `{ x: 820, y: 30, w: 680, h: 340 }`)
  - **Recommended Replacement Filename:** `home-mission-mentorship.webp`
  - **Aspect Ratio & Resolution:** 2:1 (1000 × 500 px)
  - **AI Prompt:** *"Close-up portrait of an inspiring academic advisor guiding a student through career roadmaps, pointing at college pathways with encouraging smile, clean office, warm tones, high quality."*

---

#### 5. Section 10 — Guidance for Families (Student & Parent Support Panels)
- **Component / Source:** [`src/pages/index.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/index.js#L110-L143) (`SUPPORT_PANELS`) & Line 475
- **Panel 1 (For Students):** `hero-3-explore-perfect-course.png` (Crop: `{ x: 850, y: 40, w: 660, h: 350 }`)
  - **Recommended Replacement Filename:** `home-support-student-direction.webp`
  - **Aspect Ratio & Resolution:** 16:9 (1080 × 608 px)
  - **AI Prompt:** *"Cheerful South Indian student wearing college backpack sitting in a college campus library garden reviewing university application forms with confidence, soft bokeh greenery."*
- **Panel 2 (For Parents):** `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1490, y: 58, w: 250, h: 134 }`)
  - **Recommended Replacement Filename:** `home-support-parent-peace-of-mind.webp`
  - **Aspect Ratio & Resolution:** 16:9 (1080 × 608 px)
  - **AI Prompt:** *"Warm, reassuring interaction between Indian parents and an academic consultant at a modern advisory desk, reviewing college accreditation certificates, trustworthy, respectful."*

---

#### 6. Section 13 — Dedicated Homepage Counselling Enquiry Section
- **Component / Source:** [`src/pages/index.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/index.js#L583-L596)
- **Current Image:** `public/images/banners/hero-2-right-guidance.png` (Crop: `{ x: 860, y: 0, w: 420, h: 360 }`)
- **Type:** Form Panel Visual Header
- **Recommended Replacement Filename:** `home-enquiry-admissions-desk.webp`
- **Recommended Aspect Ratio & Resolution:** 16:9 (960 × 540 px)
- **AI Prompt:**
  > *"A welcoming academic counselling desk at Rasi Foundation, showing an advisor smiling warmly while handing an admission handbook to an applicant. Professional, encouraging, natural ambient light, authentic educational consultancy setting in Tamil Nadu."*

---

#### 7. Feature Collage (4-Image Layered Grid)
- **Component / Source:** [`src/frontend/components/home/FeatureCollage.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/FeatureCollage.js#L12-L33)
- **Current Images Used:**
  - `primary`: `hero-3-explore-perfect-course.png` (Crop: `{ x: 880, y: 60, w: 420, h: 520 }`)
  - `topRight`: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1490, y: 58, w: 250, h: 134 }`)
  - `bottomLeft`: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1490, y: 210, w: 250, h: 134 }`)
  - `bottomRight`: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 890, y: 90, w: 540, h: 450 }`)
- **Recommended Strategy:** Replace with unified photo shoot assets (`collage-hero-student.webp`, `collage-counsellor-chat.webp`, `collage-peer-discussion.webp`, `collage-campus-walk.webp`).

---

### B. About Us Page (`src/pages/about.js` & `AboutHero.js`)

#### 1. About Hero Header Visual
- **Component / Source:** [`src/frontend/components/about/AboutHero.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/about/AboutHero.js#L60-L69)
- **Images Used:**
  - `public/images/banners/hero-1-tamil-campus-admissions.png` (Crop: `{ x: 900, y: 60, w: 480, h: 480 }`)
  - `public/rasi-logo.png` (Official round seal inset badge, width: 96, height: 96)
- **Current Purpose:** Hero visual representing 15+ years of career guidance in Tamil Nadu.
- **Recommended Replacement Filename:** `about-hero-student-campus.webp`
- **Recommended Aspect Ratio & Resolution:** 1:1 Square (1080 × 1080 px)
- **AI Prompt:**
  > *"High-resolution square portrait of an inspired South Indian undergraduate student in traditional-modern fusion college attire standing confidently on a lush university campus lawn, holding study binders, historic red-brick academic hall in background, golden morning sun flare, photorealistic 8k, f/2.0."*

#### 2. About PageBanner Aside Visual
- **Component / Source:** [`src/pages/about.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/about.js#L95-L103)
- **Image:** `public/rasi-logo.png` (Width: 320, Height: 320, Priority)
- **Action:** Retain official brand seal.

#### 3. Section 2 — "Who We Are" 4-Image Grid
- **Component / Source:** [`src/pages/about.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/about.js#L114-L142)
- **Current Images Used:**
  - Card 1: `hero-1-tamil-campus-admissions.png` (Crop: `{ x: 900, y: 60, w: 480, h: 480 }`)
  - Card 2: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 900, y: 100, w: 580, h: 580 }`)
  - Card 3: `hero-2-right-guidance.png` (Crop: `{ x: 900, y: 50, w: 300, h: 300 }`)
  - Card 4: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 980, y: 20, w: 360, h: 360 }`)
- **Recommended Strategy:** Replace with 4 dedicated square images (`about-who-01-guidance.webp`, `about-who-02-campus.webp`, `about-who-03-counselling.webp`, `about-who-04-success.webp`) at 600 × 600 px.

#### 4. Section 6 — "Why Choose Us" 4-Image Collage
- **Component / Source:** [`src/pages/about.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/about.js#L239-L267)
- **Current Images Used:**
  - Card 1: `hero-3-explore-perfect-course.png` (Crop: `{ x: 880, y: 80, w: 400, h: 500 }`)
  - Card 2: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1490, y: 58, w: 250, h: 134 }`)
  - Card 3: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1490, y: 210, w: 250, h: 134 }`)
  - Card 4: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 1000, y: 380, w: 520, h: 330 }`)
- **Recommended Strategy:** Replace with dedicated aspect-matched images (`about-why-01.webp` [4:5], `about-why-02.webp` [16:9], `about-why-03.webp` [16:9], `about-why-04.webp` [16:10]).

---

### C. Courses Page (`src/pages/courses.js`)

#### 1. PageBanner Aside Visual
- **Component / Source:** [`src/pages/courses.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/courses.js#L1031-L1038)
- **Current Image:** `public/images/banners/hero-3-explore-perfect-course.png` (Crop: `{ x: 930, y: 30, w: 360, h: 432 }`)
- **Type:** Hero Aside Card (5:6 aspect ratio)
- **Recommended Replacement Filename:** `courses-header-student.webp`
- **Aspect Ratio & Resolution:** 5:6 (1000 × 1200 px)
- **AI Prompt:**
  > *"Vertical portrait of an engaged South Indian student carrying an iPad and architectural blueprints on a bustling university concourse, natural smile, modern college buildings, sharp focus on student, soft ambient background, 8k."*

#### 2. Popular Categories Section (`CATEGORIES` Array)
- **Component / Source:** [`src/pages/courses.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/courses.js#L703-L711) & Line 1059
- **Current Images Used:**
  - `medical`: `hero-2-right-guidance.png` (Crop: `{ x: 880, y: 60, w: 320, h: 240 }`)
  - `engineering`: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 1260, y: 270, w: 440, h: 330 }`)
  - `management`: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 880, y: 260, w: 480, h: 360 }`)
  - `arts`: `hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 900, y: 30, w: 480, h: 360 }`)
  - `law`: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 810, y: 70, w: 280, h: 210 }`)
  - `education`: `hero-4-step-into-brighter-future.png` (Crop: `{ x: 1150, y: 380, w: 360, h: 270 }`)
  - `agriculture`: `hero-2-right-guidance.png` (Crop: `{ x: 1490, y: 390, w: 300, h: 225 }`)
- **Recommended Strategy:** Share the dedicated `category-*.webp` 4:3 image suite created for the homepage categories.

---

### D. Colleges Page (`src/pages/colleges.js`)

#### 1. PageBanner Aside Visual
- **Component / Source:** [`src/pages/colleges.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/colleges.js#L1143-L1151)
- **Current Image:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 900, y: 80, w: 640, h: 560 }`)
- **Type:** Page Aside Card (8:7 aspect ratio)
- **Current Purpose:** Representing accredited collegiate campuses across Tamil Nadu and Bengaluru.
- **Recommended Replacement Filename:** `colleges-header-campus.webp`
- **Aspect Ratio & Resolution:** 8:7 or 4:3 (1200 × 1050 px)
- **AI Prompt:**
  > *"Architectural wide view of a premier engineering and medical university campus in Tamil Nadu with stately central academic block, green landscaped gardens, students walking along palm-lined avenues under clear blue skies, authentic educational institution, photorealistic 8k, f/8."*

---

### E. Achievements Page (`src/pages/achievements.js`)

#### 1. Hero Spotlight Visual
- **Component / Source:** [`src/pages/achievements.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/achievements.js#L185-L198)
- **Current Image:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 1250, y: 80, w: 520, h: 390 }`)
- **Type:** Hero Spotlight Card (4:3 aspect ratio)
- **Current Purpose:** Visualizing student success, top admissions, and merit achievements.
- **Recommended Replacement Filename:** `achievements-hero-celebration.webp`
- **Aspect Ratio & Resolution:** 4:3 (1200 × 900 px)
- **AI Prompt:**
  > *"A celebratory graduation scene with young Indian graduates in graduation caps and gowns smiling radiantly, holding degree scrolls and achievement certificates on convocation day. Inspiring, celebratory, warm golden confetti in air, high detail, 8k."*

---

### F. Scholarship Test Portal (`src/pages/scholarship-test/`)

#### 1. Scholarship Landing Page Aside Visual
- **Component / Source:** [`src/pages/scholarship-test/index.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/scholarship-test/index.js#L98-L105)
- **Current Image:** `public/images/banners/hero-5-students-today-leaders-tomorrow.png` (Crop: `{ x: 900, y: 100, w: 580, h: 580 }`)
- **Type:** PageBanner Aside Square Visual
- **Recommended Replacement Filename:** `scholarship-landing-hero.webp`
- **Aspect Ratio & Resolution:** 1:1 Square (1000 × 1000 px)
- **AI Prompt:**
  > *"A focused Indian high school student taking an online examination on a tablet computer in a modern study hall, pencil and notebook beside the tablet, determined and hopeful expression, clean soft lighting, academic excellence, 8k."*

#### 2. Scholarship Exam & Result Portal Logos
- **Component / Source:**
  - [`src/pages/scholarship-test/exam.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/scholarship-test/exam.js#L229) (Exam Header, 36 × 36 px)
  - [`src/pages/scholarship-test/result.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/scholarship-test/result.js#L156) (Certificate Header, 56 × 56 px)
- **Image:** `public/rasi-logo.png`
- **Action:** Retain official brand seal.

---

### G. Shared Layout, Headers, Footers & Core UI Components

#### 1. Public Website Navigation Header
- **Component / Source:** [`src/frontend/components/Navbar.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/Navbar.js#L91-L115)
- **Images Used:**
  - `public/rasi-logo.png` (Round seal logo, 96 × 96 px, Priority)
  - `public/graduation-cap.png` (Overlay cap positioned above letter 'R', 36 × 28 px)
- **Action:** Retain authentic brand identity assets.

#### 2. Public Global Footer
- **Component / Source:** [`src/frontend/components/Footer.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/Footer.js#L51-L71)
- **Images Used:**
  - `public/rasi-logo.png` (Round seal logo in white circular badge, 72 × 72 px)
  - `public/graduation-cap.png` (Wordmark cap overlay, 36 × 28 px)
- **Action:** Retain authentic brand identity assets.

#### 3. Route Transition Loading Screen
- **Component / Source:** [`src/pages/_app.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/_app.js#L58-L66)
- **Image Used:** `public/rasi-logo.png` (44 × 44 px central spinner emblem)
- **Action:** Retain official brand seal.

#### 4. HTML Document Head Favicons & Touch Icons
- **Component / Source:** [`src/pages/_document.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/_document.js#L21-L24) & [`public/site.webmanifest`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/public/site.webmanifest)
- **Image Used:** `public/logo.png` (Favicon, Apple Touch Icon 180×180, PWA icons 192×192 and 512×512)
- **Action:** Retain official logo.

#### 5. Payment Checkout Gateway Modal
- **Component / Source:** [`src/pages/payment.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/payment.js#L143)
- **Image Used:** `image: '/logo.png'` (Passed to Razorpay modal checkout configuration)
- **Action:** Retain official logo.

#### 6. Homepage Enquiry Popup & Thank You Confirmation
- **Component / Source:**
  - [`src/frontend/components/home/EnquiryPopup.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/EnquiryPopup.js#L158-L165) (`/rasi-logo.png`, 40 × 40 px)
  - [`src/frontend/components/common/ThankYouConfirmation.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/common/ThankYouConfirmation.js#L27-L35) (`/rasi-logo.png`, 180 × 60 px)
- **Action:** Retain official brand seal.

---

### H. Administrative Dashboard & Login

#### 1. Admin Login Page
- **Component / Source:** [`src/pages/admin/login.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/pages/admin/login.js#L128-L153)
- **Images Used:**
  - `public/rasi-logo.png` (Official seal logo, 56 × 56 px)
  - `public/graduation-cap.png` (Wordmark cap overlay, 32 × 24 px)
- **Action:** Retain brand identity assets.

#### 2. Admin Dashboard Layout Sidebar
- **Component / Source:**
  - [`src/frontend/components/AdminLayout.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/AdminLayout.js#L249-L270) (`/rasi-logo.png` + `/graduation-cap.png`)
  - [`src/components/AdminLayout.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/components/AdminLayout.js#L83-L90) (`/logo.png`, 36 × 36 px)
- **Action:** Retain brand identity assets.

---

## 3. Missing or Broken Static Image References

| Missing Image Path | Referenced By | Error / Status | Impact & Recommended Solution |
| :--- | :--- | :--- | :--- |
| **`/og-image.jpg`** | [`src/frontend/components/Layout.js:12`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/Layout.js#L12), [`src/frontend/components/SEO.js:8`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/SEO.js#L8) | **HTTP 404 (Missing File)** | When users share the website on WhatsApp, Facebook, LinkedIn or X (Twitter), the social share preview card fails because `/og-image.jpg` does not exist in `public/`. **Fix:** Generate an HD 1200 × 630 px OpenGraph banner (`public/og-image.jpg`) featuring the Rasi Foundation logo, motto, and educational theme. |
| **`/images/leadership/founder.jpg`** | [`src/data/leadership.js:8`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/data/leadership.js#L8), [`src/frontend/components/about/Leadership.js:10-27`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/about/Leadership.js#L10-L27) | **Not Provided (SVG Fallback Active)** | Founder profile (`Prof. P. Gunasekaran`) currently displays a neutral placeholder avatar card with *"Photo to be added"*. The management must provide the authentic portrait photo when ready. |
| **`/images/leadership/director.jpg`** | [`src/data/leadership.js:8`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/data/leadership.js#L8), [`src/frontend/components/about/Leadership.js:10-27`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/about/Leadership.js#L10-L27) | **Not Provided (SVG Fallback Active)** | Administrative Director profile (`P. Yuvaraj Kumar`) currently displays a neutral placeholder avatar card with *"Photo to be added"*. The management must provide the authentic portrait photo when ready. |

---

## 4. Unused Image Files in Asset Directories

The following image files exist in `public/` but are **never imported, referenced, or used** anywhere in the application code:

| Filename | File Path | Format & Dimensions | Size | Status & Recommendation |
| :--- | :--- | :---: | :---: | :--- |
| **`admin-login.png`** | `public/admin-login.png` | PNG, 256 × 256 px | 766 KB | **Unused**. The admin login page uses vector SVG icons and CSS cards instead of this bitmap. Can be safely archived or removed in a cleanup phase. |
| **`logo2.png`** | `public/logo2.png` | PNG, 2816 × 1536 px | 3.56 MB | **Unused**. Large redundant logo file. Only mentioned in an obsolete documentation file (`docs/project overall scope/`). Never loaded by any React component. |

*Note on `images_for_website_build/`:* The directory `images_for_website_build/` contains pre-integration source banners (`Explore Your Perfect Course.png`, etc.) and a reference mockup screenshot (`header refrence/`). They are raw build assets and not directly served by Next.js.

---

## 5. Dynamic and Database-Driven Image Exclusions

Per task instructions, the following categories were verified and **excluded** from the static image replacement inventory:

1. **MongoDB Admin Banners (`/api/banners`)**:
   Managed via MongoDB `Banner` model, uploaded through admin dashboard, and loaded dynamically at `/api/banners?placement=...` and `/api/banners/[id]/image`. Handled dynamically by `HeroCarousel.js`.
2. **College Logos & Emblems (`/api/colleges/[id]/logo`)**:
   Rendered by [`CollegeEmblem.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/colleges/CollegeEmblem.js) and [`CollegeShowcase.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/CollegeShowcase.js). Sourced dynamically from MongoDB `College` model or external university URLs.
3. **Student Document & BioData Uploads (`/api/admin/documents/[id]`)**:
   Uploaded by students through the multi-step admission form to private storage (`/storage/uploads` or `/tmp`), addressed by server-generated random `storageKey`.
4. **Student & Parent Testimonials (`/api/feedback`)**:
   Rendered in [`Testimonials.js`](file:///c:/Users/BOOPATHI/OneDrive/Documents/rasi-foundation/rasi-foundation/src/frontend/components/home/Testimonials.js). Sourced dynamically from approved feedback entries in MongoDB.

---

## 6. High-Definition Replacement Master Catalog

Below is the definitive catalog of static image assets planned for HD replacement, organized for image generation and integration:

| Replacement Target | Recommended File Name | Recommended Ratio & Size | Placement / Destination | Purpose / Section |
| :--- | :--- | :---: | :--- | :--- |
| **Hero Slide 1** | `hero-slide-01-tamil-guidance.webp` | 21:9 (2560 × 1080 px) | `public/images/banners/` | Home Page Hero Carousel (Tamil education guidance) |
| **Hero Slide 2** | `hero-slide-02-career-pathways.webp` | 21:9 (2560 × 1080 px) | `public/images/banners/` | Home Page Hero Carousel (Career counselling & admissions) |
| **Hero Slide 3** | `hero-slide-03-students-leaders.webp` | 21:9 (2560 × 1080 px) | `public/images/banners/` | Home Page Hero Carousel (Diverse student group on campus) |
| **Social OpenGraph** | `og-image.jpg` | 1.91:1 (1200 × 630 px) | `public/` | Global social media preview card (Fixes 404 error) |
| **About Hero Visual** | `about-hero-student-campus.webp` | 1:1 (1080 × 1080 px) | `public/images/about/` | About Us hero visual beside brand seal |
| **Courses Aside** | `courses-header-student.webp` | 5:6 (1000 × 1200 px) | `public/images/courses/` | Courses PageBanner aside card |
| **Colleges Aside** | `colleges-header-campus.webp` | 8:7 (1200 × 1050 px) | `public/images/colleges/` | Colleges PageBanner aside card |
| **Achievements Hero** | `achievements-hero-celebration.webp` | 4:3 (1200 × 900 px) | `public/images/achievements/` | Achievements spotlight celebratory visual |
| **Scholarship Hero** | `scholarship-landing-hero.webp` | 1:1 (1000 × 1000 px) | `public/images/scholarship/` | Scholarship Test landing aside card |
| **Course Category: Engineering** | `category-engineering.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Medical** | `category-medical.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Management** | `category-management.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Arts & Science** | `category-arts-science.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Law** | `category-law.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Education** | `category-education.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Course Category: Agriculture** | `category-agriculture.webp` | 4:3 (800 × 600 px) | `public/images/categories/` | Replaces cropped banner face in category cards |
| **Family Support: Students** | `support-student-direction.webp` | 16:9 (1080 × 608 px) | `public/images/home/` | Replaces cropped face in Student Guidance card |
| **Family Support: Parents** | `support-parent-peace-of-mind.webp` | 16:9 (1080 × 608 px) | `public/images/home/` | Replaces cropped face in Family Confidence card |
| **Home Enquiry Visual** | `home-enquiry-admissions-desk.webp` | 16:9 (960 × 540 px) | `public/images/home/` | Replaces cropped face in direct enquiry panel |
