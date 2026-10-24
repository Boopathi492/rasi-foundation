# Rasi Foundation – Complete Premium Website Redesign & Implementation

Act as a senior UI/UX designer and full-stack developer. Upgrade my existing Rasi Foundation website into a premium, modern, visually rich educational consultancy platform. Do not just suggest designs or generate sample code—inspect the existing codebase and implement the improvements directly in the project.

## 1. First: Inspect the Existing Project

Project path: `D:\Boopathi\rasi-foundation`

Reference website: `https://mothereducationtrust.com/`

Before editing:
- Inspect the complete project structure, existing routes, components, assets, styling system, APIs, database models, authentication and payment integration.
- Inspect all existing pages, especially Home, About Us, Colleges, Courses, Scholarships, Contact, Secure Your Seat/payment and registration/enquiry forms.
- Inspect the `images_for_website_build` folder and reuse relevant original assets and logos.
- Identify existing reusable components and current functionality before making changes.
- Use the reference website for inspiration only. Create a distinctive Rasi Foundation design rather than copying its exact layout.

## 2. Global Design System – Most Important

Create a centralized global design system so that changing a color in one place updates the entire website consistently.

Brand colors:
- Use the actual Rasi Foundation logo colors as the primary brand palette.
- Use green and red as the initial primary colors, with white/off-white backgrounds and dark readable text.
- Add complementary colors only where visually necessary for education-related cards, highlights, icons and CTAs.
- Do not hardcode brand colors independently throughout components.

Create or update centralized CSS variables/design tokens for:
- Primary, secondary and accent colors
- Background and surface colors
- Text and muted text
- Borders, shadows and gradients
- Button variants
- Card styles
- Border radius and spacing
- Typography and responsive breakpoints

If the logo colors change later, I should be able to update the global variables and apply the new palette across the whole project.

## 3. Header – Premium, Layered and Modern

Completely improve the header while preserving existing navigation and functionality.

Requirements:
- A slim top contact bar with verified phone, WhatsApp, email and social links.
- Original Rasi Foundation logo and tagline.
- Elegant navigation with Home, About Us, Courses, Colleges, Scholarships, Achievements and Contact.
- Professional Enquiry and Book Counselling buttons.
- A prominent Secure Your Seat CTA.
- Subtle depth, layered surfaces, refined shadows, tasteful 3D effects and hover animations.
- Sticky header with a polished scrolling transition.
- Well-designed dropdown menus for Courses and Colleges, if appropriate.
- Mobile navigation with a proper responsive menu.
- Clear active-page indicators, proper spacing and alignment.

Avoid excessive 3D effects, oversized navigation and distracting animations. The header should look premium, trustworthy and suitable for an established educational organisation.

## 4. Homepage – Complete Premium Redesign

The homepage currently feels incomplete and lacks enough visual content. Redesign the entire page so it feels like a complete, professional educational website.

### Section A: Hero Carousel
- Create a visually rich, full-width educational hero section.
- Use genuine project assets or suitable educational images.
- Support multiple slides with distinct themes: college admissions, career guidance, scholarships, course selection and student success.
- Add a clear headline, short supporting content and meaningful CTA buttons.
- Keep the text readable over images using overlays, gradients or suitable contrast.
- Add previous/next controls, dots and automatic slide transitions.
- Autoplay approximately every 5 seconds, with pause-on-hover/focus and reduced-motion support.
- Avoid stretching images, unnecessary blank areas and oversized hero content.

### Section B: Tamil Nadu Districts Automatic Scrolling Strip
I specifically need an automatically scrolling Tamil Nadu districts section.

- Display all 38 Tamil Nadu districts accurately.
- Use a smooth horizontal marquee/ticker animation.
- Make the content responsive and seamless without sudden jumps.
- Avoid duplicated visual glitches, overflow and broken mobile layouts.
- Allow users to select a district where the existing business requirements support it.
- If district selection filters colleges or counselling locations, connect it to existing supported data rather than inventing records.

### Section C: Unique Feature Section Between Districts and Colleges
Between the district ticker and the colleges ticker, create an attractive two-column section.

Left side:
- A large educational image collage.
- Use layered image composition: one primary image with smaller overlapping square or rounded images.
- Add tasteful circular shapes, geometric layers and decorative accents.
- Keep the composition balanced and responsive.

Right side:
- A strong heading explaining why students choose Rasi Foundation.
- Five clear points:
  1. Personalised Career Counselling
  2. Right College Selection
  3. Admission Application Support
  4. Scholarship Guidance
  5. Continued Student Support
- Each point needs a suitable icon, a short explanation and consistent spacing.
- Add a meaningful CTA linking to the existing About Us or counselling route.

This section must look visually distinctive rather than like five ordinary text rows.

### Section D: Automatic College Carousel
Immediately below the above section, create a premium college carousel.

- Reframe the existing college cards and their complete layout.
- Use actual available college logos, names, locations and images from existing data.
- Automatic horizontal scrolling with smooth transitions.
- Add navigation arrows and optional drag/swipe support.
- Keep logos aligned, properly sized and uncropped.
- Each card should have a consistent design, balanced whitespace and clear text.
- Link to the relevant existing college detail page where available.
- Include a View All Colleges CTA.
- Do not create fake college names, logos, partnerships or statistics.

### Section E: Courses
- Redesign the courses section using attractive image cards.
- Include relevant existing course categories such as Engineering, Medical, Arts & Science, Law, Nursing, Pharmacy and Management only where supported by the existing website data.
- Add course imagery, clear category labels and subtle hover animations.
- Include a View All Courses CTA.
- Preserve existing course routes, filters and functionality.

### Section F: Scholarships
The existing Scholarships module must retain its functionality but receive a substantial visual upgrade.

- Preserve existing scholarship information, application flows and routes.
- Improve the hero/banner, layout, scholarship cards, eligibility information and CTA hierarchy.
- Add relevant educational imagery and decorative layered compositions.
- Clearly organise available scholarship details, eligibility, benefits, application guidance and deadlines when actual data exists.
- Add extra helpful content sections only when supported by actual project data or clearly marked static informational content.
- Never invent scholarship amounts, guarantees or eligibility claims.

### Section G: Vision & Mission
Redesign the existing Vision & Mission section.

- Keep the genuine Vision and Mission content.
- Use attractive side cards with green/red brand accents and clear icons.
- Place a central image carousel between them.
- Automatically transition between suitable existing images.
- Include smooth fades or slides, responsive dimensions and proper image cropping.
- Add subtle background patterns, geometric layers and refined shadows.
- Avoid excessive card height or empty space.
- Preserve the original content unless a copy improvement is necessary.

### Section H: Student Testimonials and Feedback
- Create an attractive testimonial carousel using existing genuine student feedback.
- Automatically rotate testimonials every few seconds.
- Include actual student names, feedback and profile images only when available and approved for display.
- Provide navigation controls and readable testimonial cards.
- Use subtle animations, star ratings only where supported by genuine data, and responsive layouts.
- Never generate fake reviews, student identities or ratings.

### Section I: Latest Updates and Achievements
- Display existing announcements, admission updates, events and achievements.
- Use existing APIs or data sources where available.
- Add clear cards, dates, relevant imagery and links.
- If no data is available, show a well-designed empty state instead of fabricated news.

### Section J: Final CTA and Footer
- Create a premium final banner encouraging students to enquire or book counselling.
- Include Enquiry, Book Counselling and Secure Your Seat buttons.
- Redesign the footer with the original logo, a short organisation description, useful navigation, services, verified contact details and social links.
- Preserve existing privacy policy, terms and other important links.

## 5. About Us – Expand and Upgrade

The current About Us page must be redesigned at a higher visual and content quality level.

Build a complete organisation profile with suitable sections:
- Premium About Us hero banner.
- Introduction to Rasi Foundation.
- Organisation story and purpose, using verified existing content.
- Vision and Mission.
- Core values and educational commitment.
- Why Choose Rasi Foundation.
- Student counselling and admission support process.
- Genuine achievements and verified statistics, if available.
- Genuine partner college information.
- Team or leadership section only if real information and images exist.
- Student success stories only where genuine content is available.
- Final enquiry/counselling CTA.
- Relevant testimonials and feedback carousel near the bottom.

Design requirements:
- Mix square image cards, rounded image cards and circular image compositions.
- Use overlapping images, layered shapes, refined gradients and subtle depth.
- Add scroll-reveal animations without harming performance.
- Keep the content detailed, readable, well structured and professional.
- Avoid repeating the same paragraphs across multiple sections.
- Do not invent the organisation's history, team members, achievements or claims.

## 6. Colleges Module – Complete Visual Rework

Completely rework the existing Colleges page while preserving its functionality.

Include:
- Premium college listing hero/banner.
- College search and existing filters.
- District, location, institution category or course filters only if supported by the current data model.
- Attractive college cards with proper logo/image ratios.
- College details, location and available courses.
- A clean college detail page layout if one already exists.
- Relevant related colleges or courses using actual records.
- Pagination or existing load-more behaviour.
- Responsive card grids, useful empty states and loading states.

Ensure the cards look consistent and the listing page feels like a professional college discovery platform.

## 7. Courses Module – Complete Visual Rework

Redesign the existing Courses module.

Include:
- A visually rich course banner.
- A short, clear introduction to course and career selection.
- Existing course categories and filters.
- Attractive square or rounded image cards.
- Clear course descriptions and relevant information.
- Course detail links using existing routes.
- Related college recommendations only when supported by current data.
- Counselling CTA.
- A genuine student testimonial/feedback section near the bottom.

Preserve all current data, routes and business rules. Do not invent course records.

## 8. Contact Module – Premium Form and Information Layout

Redesign the Contact page with a proper banner section at the top.

Create a responsive two-column layout.

Left side:
- A clean, professional enquiry/contact form.
- Appropriate fields based on existing functionality, such as full name, phone number, email, district/location, course interest, enquiry type and message.
- Required-field validation and helpful error messages.
- Accessible labels, clear input spacing and consistent styling.
- A professional submit button and proper loading/success/error states.

Right side:
- Verified contact information.
- Phone and WhatsApp links.
- Email link.
- Office address.
- Working hours, if verified.
- Map or directions only if a genuine address and appropriate map integration are already available.

At the bottom:
- Relevant student testimonials and feedback carousel.
- A clear final CTA.

Preserve existing API submission, validation, notification and data-storage behaviour. Do not make the form look functional while leaving submission disconnected.

## 9. Secure Your Seat – Payment and Registration Form

Keep the existing Secure Your Seat entry point and payment module.

Improve the form design significantly:
- Organised sections and clear visual hierarchy.
- Better field grouping, spacing, typography and input styling.
- Responsive multi-column layouts where appropriate.
- Clear required/optional indicators and inline validation.
- Helpful loading, error and success states.
- Proper confirmation and payment-status messaging.
- A professional, trustworthy payment interface.

Inspect the existing form fields and payment flow before making changes. Add only genuinely useful fields that the existing backend and business process can support.

CRITICAL:
- Preserve the current Razorpay integration and payment verification.
- Preserve payment amounts, order creation, callbacks, webhooks and server-side verification.
- Do not bypass payment verification or expose secrets.
- Do not change payment business logic merely to improve the UI.
- Do not create a second payment system.
- Keep existing API routes and database structure compatible.

## 10. Global Automatic Scrolling and Animations

The following should animate automatically where applicable:
- Hero banners.
- Tamil Nadu districts ticker.
- College carousel.
- Central Vision & Mission image carousel.
- Genuine student testimonials and feedback.
- Any existing image gallery or announcement carousel.

Use polished, consistent motion:
- Smooth transitions.
- Subtle scroll-reveal effects.
- Refined hover states.
- Lightweight layered parallax only where appropriate.
- Consistent timing and easing.
- Pause controls or pause-on-hover where useful.
- Respect `prefers-reduced-motion`.

Do not make every element move simultaneously. Animation must improve the experience, not distract users.

## 11. Image Quality and Visual Composition

- Inspect and use the project's existing image assets first.
- Use genuine logos and preserve their aspect ratios.
- Prefer high-quality education, campus, counselling and student imagery.
- Use square image compositions, circular decorative layers, overlapping images and controlled geometric accents where appropriate.
- Use `object-fit: cover` or `contain` correctly based on the image type.
- Do not stretch, pixelate or crop important parts of logos.
- Use consistent image aspect ratios within repeated cards.
- Optimise image loading and use the project's existing image-handling conventions.
- Do not use one generic image repeatedly across every section.
- Do not embed a fake Rasi Foundation logo into generated banner imagery.
- Avoid excessive decorative shapes, oversized text and unnecessarily tall sections.

## 12. Content Quality

All website content must be crystal clear, professional, student-friendly and relevant to education.

- Use concise headings and useful supporting paragraphs.
- Use English consistently unless the existing website already supports Tamil or bilingual content.
- If bilingual content exists, preserve it and ensure correct Tamil rendering.
- Avoid placeholder text, duplicated paragraphs, vague marketing language and unsupported promises.
- Make every section answer a clear user question.
- Use genuine organisational information and existing data wherever available.
- Maintain consistent tone across Home, About, Colleges, Courses, Scholarships and Contact.

## 13. Technical and Functional Safety

This is an existing production-oriented project. Make targeted, compatible improvements.

- Preserve the existing Next.js architecture, routing and conventions.
- Preserve API routes, MongoDB/Mongoose models, authentication and existing integrations.
- Do not migrate the database or create new collections for purely visual features.
- Do not delete existing functionality just to simplify the redesign.
- Do not overwrite `.env.local` or print secret values.
- Do not connect tests to the production database.
- Do not introduce fake records into any database.
- Reuse existing dependencies where possible; avoid unnecessary packages.
- Ensure mobile, tablet and desktop responsiveness.
- Add accessible keyboard navigation, focus indicators, semantic headings, alt text and sufficient colour contrast.
- Check for layout shifts, horizontal overflow, broken links, console errors and failed requests.

## 14. Implementation Workflow

Work in this order:

1. Inspect the project, pages, data, assets and existing integrations.
2. Identify the global styles and establish the centralized brand design system.
3. Implement the shared header, navigation, buttons, cards, forms and footer.
4. Redesign the homepage and implement the districts ticker, unique two-column feature section and automatic college carousel.
5. Upgrade About Us, Colleges, Courses, Scholarships, Contact and Secure Your Seat.
6. Implement the Vision & Mission carousel and genuine testimonials/feedback carousel.
7. Verify all existing forms, navigation, API integrations and payment behaviour.
8. Run available linting, tests and production build.
9. Fix any errors introduced by the changes.
10. Review the actual rendered pages at desktop, tablet and mobile sizes.

Do not stop after writing a plan or completing only the homepage. Continue implementing the agreed scope across all requested modules. If a specific feature depends on unavailable real data or an existing integration that cannot be safely modified, explain the limitation rather than faking the result.

## 15. Final Restrictions

- Do not commit, push or deploy anything.
- Work locally only.
- Do not delete or overwrite existing user work without checking it first.
- Do not replace real content with mock data.
- Do not silently remove existing routes or functionality.
- Keep the design cohesive across the entire website.
- Prioritise quality, consistency, performance, accessibility and maintainability.

At the end, provide a concise implementation report containing:
- Files created and modified.
- Pages and modules completed.
- New animations and carousels implemented.
- Existing integrations preserved.
- Lint/test/build results.
- Any remaining issues or manual testing still required.

Begin by inspecting the codebase, then implement the redesign directly.