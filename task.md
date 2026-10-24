# Rasi Foundation – Match the Provided Homepage Reference Precisely

Project path: `D:\Boopathi\rasi-foundation`

I have provided a reference screenshot showing the exact homepage style and section arrangement I want. Use that screenshot as the primary visual reference and update my existing website to match it as closely as possible.

**Do not just create a similar concept. Implement the actual layout, styling, animations and responsive behaviour in the existing project.** Inspect the current code before changing anything, and preserve all existing business logic.

## 1. Header – Match My Approved Header Reference

The current header still does not match the approved design. Rework it to closely follow the header in the provided reference image.

Requirements:
- Full-width, two-row header.
- Top contact strip with the existing verified phone, WhatsApp, email and useful information links.
- Main navigation with the original Rasi Foundation logo, including the graduation cap above the letter R.
- Use the approved layered maroon, deep green, white and subtle gold decorative styling.
- Keep the logo on the left and navigation/action buttons aligned in one clean row.
- Include Home, About Us, Courses, Colleges, Scholarships, Achievements, Announcements and Contact as appropriate to existing routes.
- Include search, Enquiry, Book Counselling and Secure Your Seat.
- Use polished hover states, subtle shadows, clean spacing and professional typography.
- Make sure labels do not wrap awkwardly. In the current header, the About Us and action buttons wrap onto multiple lines; fix this.
- Use responsive navigation on smaller screens.

Do not use the reference screenshot as a flat image. Rebuild the header with HTML/CSS and the real logo/assets.

## 2. Hero Banner – Full Width

- Keep the hero slider edge-to-edge at 100% viewport width.
- Place previous and next arrows directly on the left and right sides of the banner.
- Remove the old control row beneath the banner, including its dots and play/pause controls.
- Remove the statistics strip beneath the banner completely, including the `5000+`, `100+`, Trusted and Expert figures.
- Remove the statistics ribbon baked into the bottom of the hero design if it appears in the rendered slide.
- Do not leave unnecessary blank spacing after the hero.
- Preserve autoplay, slide transitions and existing CTA navigation.
- Ensure banner text and faces remain visible at desktop and mobile sizes.

## 3. Tamil Nadu Districts Ticker – Directly Above Admission Journey

The reference clearly places the district ticker between the hero banner and the Admission Journey section.

Move the existing Tamil Nadu districts ticker to this position.

Requirements:
- Show all 38 Tamil Nadu districts accurately.
- Use a premium horizontal ticker with a maroon location label, clean district chips and suitable location icons.
- Automatically scroll continuously from right to left.
- Loop seamlessly without jumps, empty gaps or visible resets.
- Keep the ticker directly below the hero, with a small, balanced gap.
- Add functional arrows only if appropriate to the existing design.
- Support touch interaction and reduced-motion preferences.
- Avoid duplicated content glitches, horizontal overflow and layout shifts.
- Do not turn it into a static row of district buttons.

**Automatic scrolling is mandatory.** Inspect and fix the existing implementation so the ticker actually moves in the browser.

## 4. Admission Journey – Match the Reference Layout

Place the Admission Journey immediately after the district ticker.

Use a two-column layout:

### Left column
- Small Rasi Foundation label.
- Large heading: “Your Admission Journey”.
- Subtitle: “From Enquiry to a Brighter Future”.
- Short, clear supporting paragraph.
- Three small benefit indicators: Expert Guidance, Trusted Colleges and End-to-End Support.
- A clear Start Your Admission Journey CTA.

### Right column
Build a visually balanced winding-road timeline containing six numbered steps:

1. Explore Programs
2. Fill the Form
3. Attend Counselling
4. Make the Payment
5. Upload Documents
6. Admission Guidance

Each step must have:
- A circular numbered badge.
- A suitable education-related icon.
- A compact white or softly tinted content card.
- A clear heading and short description.
- Consistent spacing and typography.

Design requirements:
- Use a curved dark-green road with a subtle dashed centre line.
- Alternate the milestone cards naturally along the road.
- Ensure the road connects the steps without passing through text.
- Prevent cards, badges and icons from overlapping incorrectly.
- Use maroon, green, gold and white consistently.
- Keep the composition balanced and visually appealing, like the provided reference.

The current roadmap has a major alignment problem: the road crosses the cards and text, the cards overlap, and the layout feels cramped. Fix the actual component layout, not just its colours.

On mobile, replace the winding-road composition with a clean vertical timeline. Do not shrink the desktop layout until everything becomes unreadable.

The payment step must remain informational and use the existing Secure Your Seat/payment route only when applicable. Never claim that a payment or admission is completed merely because a visitor sees this section.

## 5. Colleges – Automatic Carousel With Genuine College Logos

Immediately after Admission Journey, create the college section shown in the reference.

Section heading:
**Our Partner Colleges**

Supporting text:
“Explore top colleges across Tamil Nadu with expert admission support.”

Requirements:
- Automatically scrolling horizontal college carousel.
- Smooth, continuous movement.
- Functional previous/next controls.
- Properly aligned cards with consistent dimensions.
- Display each available college's genuine logo, name and location.
- Keep the logo prominent and correctly proportioned.
- Add subtle borders, shadows and hover effects.
- Include a View All Colleges CTA.
- Ensure cards stay inside the shared content container.
- Support mobile swipe and prevent overflow.

Important:
- Inspect existing college data and project assets first.
- Use actual logos only when available and verified.
- Do not invent partner relationships, college logos or college records.
- If a college logo is unavailable, use a clean institution icon placeholder rather than a fabricated logo.
- If the existing API cannot load data locally because of missing environment configuration, do not add fake database records. Preserve the real integration.

Verify that automatic scrolling really works, including after React rerenders. Fix the root cause of any ticker or carousel that fails to start.

## 6. Courses – Completely Reframe the Current Design

The current Courses section needs a fresh layout. Do not simply recolour the existing cards.

Use the reference's **Explore Popular Courses** style as inspiration, while creating a polished and maintainable implementation.

Section heading:
**Explore Popular Courses**

Supporting text:
“Choose from a wide range of undergraduate and postgraduate programs.”

Requirements:
- Use a responsive grid of attractive image-led course cards.
- Each card should have a category icon, course category, concise description or existing course examples, a suitable genuine image and an Explore link.
- Create distinct but consistent cards for relevant existing categories such as Engineering, Medical, Arts & Science and Law.
- Include other categories such as Nursing, Pharmacy or Management only where supported by the actual project data.
- Use asymmetric image compositions or diagonal/curved image edges sparingly, with clean text alignment.
- Use subtle hover elevation, image transitions and scroll-reveal animation.
- Keep the card heights and content spacing consistent.
- Include a View All Courses CTA.
- Preserve existing course data, links and functionality.

Do not use the same banner crop repeatedly as a substitute for genuine course photography if better existing assets are available. Inspect the asset folder first.

## 7. Vision & Mission – Completely Redesign

The current Vision & Mission design is not acceptable. Replace its layout with a much stronger design inspired by the provided reference.

Create a single cohesive section with:
- A small section label: “OUR PURPOSE”.
- A clear heading: “Vision and Mission”.
- A short, readable introduction.
- A visually balanced composition containing:
  - A green Vision card.
  - A central circular or organically shaped student/campus image.
  - A maroon Mission card.
- Layered shapes, tasteful borders and subtle shadows.
- Clear icons and comfortable text spacing.
- Responsive alignment without excessive blank space.

Keep the genuine existing Vision and Mission text. Do not invent organisational promises or claims.

### Central Image Carousel
- Use suitable existing student/campus images.
- Automatically rotate the central image.
- Add subtle transitions and optional unobtrusive navigation controls.
- Ensure the image remains centred between the two cards.
- Respect reduced-motion preferences.

The previous layout was too plain and widely spaced. Create a polished composition that visually connects the three elements without making the text cards too large.

## 8. Improve the Feature Section's Images

In the existing “Why Students Choose Us” / guidance section:
- Remove the current large side image collage if it causes the image to be cropped or looks repetitive.
- Replace it with a clean, purposeful three-image composition.
- Use one main square or rounded image with two smaller supporting images layered beside or below it.
- Use different relevant existing images where available.
- Keep the five guidance points on the opposite side, with clear icons, headings and short descriptions.
- Ensure the images are balanced, well cropped and responsive.
- Do not use arbitrary crops of the same banner if better images exist in the assets folder.

## 9. Global Visual Consistency

Use the approved Rasi Foundation palette:
- Deep green.
- Maroon/red.
- White/off-white.
- Subtle gold accents.

Keep global colours centralised in the existing design tokens so a palette change can update the whole site.

Use consistent typography, spacing, border radii, shadows, button styles and container widths.

Layout rules:
- Header: full width.
- Hero: full width.
- District ticker: full width background with a centred inner container where appropriate.
- Main content: approximately 90% width and centred on desktop.
- Footer: full width with a centred inner container.
- On mobile, use comfortable side padding and prevent horizontal overflow.

## 10. Animations and Interaction

Implement and verify:
- Hero autoplay and banner arrows.
- Continuous district ticker.
- Continuous college carousel.
- Vision & Mission image carousel.
- Scroll-reveal animations for major sections.
- Refined hover states for cards and buttons.

Animations must be smooth and restrained. Avoid making every element move simultaneously.

Use appropriate cleanup for timers and event listeners, avoid duplicate intervals, and respect reduced-motion settings.

## 11. Preserve Existing Functionality

This is an existing working project. Do not break it.

- Preserve Next.js architecture and current routing.
- Preserve APIs, database models, authentication and existing integrations.
- Preserve Razorpay and server-side payment verification.
- Do not modify payment amounts or payment business logic.
- Do not overwrite `.env.local`.
- Do not add fake testimonials, statistics, college records or scholarship claims.
- Do not remove other existing homepage sections unless explicitly requested.
- Do not commit, push or deploy.

## 12. Required Implementation and Verification

Before editing, inspect the actual components and identify the causes of the current layout issues.

Then implement the changes directly in the existing project.

After implementation:
1. Run lint and the production build.
2. Test at 375px, 768px, 1024px, 1280px and 1440px if browser tools are available.
3. Verify the header has no awkward text wrapping.
4. Verify the hero arrows are on the banner and the old controls/statistics strip are gone.
5. Verify the district ticker is directly above Admission Journey and scrolls automatically.
6. Verify the road connects all six roadmap steps without overlapping cards or text.
7. Verify the college carousel scrolls automatically and displays available genuine logos.
8. Verify the courses cards have the new layout.
9. Verify the Vision & Mission composition and central image carousel.
10. Verify the three-image guidance composition.
11. Check for horizontal overflow, broken images, console errors and failed API requests.

If browser automation is unavailable, clearly state that browser testing has not been performed. Do not claim a visual issue is fixed unless the rendered result has been checked.

At the end, report the files changed, the issues corrected, lint/build results and any remaining manual verification required.