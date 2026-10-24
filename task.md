
# PHASE 2 — Rasi Foundation Education Modules Redesign

Project: `D:\Boopathi\rasi-foundation`

Implement Phase 2 only. Inspect the current pages, models, APIs and assets. Preserve the Phase 1 work and existing business logic.

## A. About Us — 5 to 6 Meaningful Sections

Completely reframe the existing About Us page.

1. **Hero:** Full-width education banner, strong heading, concise introduction, real Rasi Foundation logo on the right with restrained animation.
2. **About the Foundation:** Four-image collage on the left and meaningful trust/service information on the right.
3. **Our Guidance Process:** Automatic horizontal showcase explaining the real student support process.
4. **Student and Parent Support:** Four relevant images on one side and structured service content on the other.
5. **Vision & Mission:** Premium green and maroon cards with a central circular/organic student or campus image; preserve genuine wording.
6. **Reviews and CTA:** Use real Google reviews only when a verified review source/integration is available. Otherwise link to the official review page if known or omit unsupported data. Finish with a Book Counselling CTA.

Use distinct available images where possible. Do not invent timelines, years of experience, student counts, awards, founder quotes or promises.

## B. Colleges — Full Visual Redesign

Create a premium college directory with:
- Full-width hero.
- Search by college name.
- Filters based only on real data fields.
- Responsive grid with consistent cards.
- Genuine college logos, names and locations.
- View-details/enquiry links using existing routes.
- Functional pagination/load-more if appropriate.
- Automatic college/logo showcase where useful.
- Loading, empty and error states.

Reuse existing college models and APIs. Do not fabricate records, logos or partner claims. Do not create a new MongoDB collection if the current model already supports the page.

## C. Courses — Completely New Design

Do not merely recolour the existing Courses page.

Add 2–3 useful sections in addition to the core course discovery experience:

1. **Hero:** Strong course discovery heading and relevant CTA.
2. **Popular Categories:** Responsive image-led cards for categories actually supported by the project data.
3. **Course Search/Discovery:** Functional search and filters based on real fields.
4. **Guidance Section:** Explain how Rasi Foundation helps students choose courses, understand eligibility and explore colleges.
5. **FAQs:** Accessible accordions containing verified information.
6. **Final CTA:** Book Counselling link to the existing flow.

Use relevant available images, consistent cards, restrained hover/scroll animations and clear typography. Keep existing route and data behaviour intact.

## D. Scholarships — Full Redesign

Rebuild the existing page into a premium scholarship guidance experience with:
- Hero banner.
- Clear explanation of the scholarship guidance service.
- Scholarship cards where genuine records exist.
- Search/filters only when supported by real data.
- Eligibility and benefits only when verified.
- Application/document guidance.
- FAQs where appropriate.
- Counselling CTA.

Do not invent scholarship amounts, deadlines, eligibility, government approval or guaranteed awards.

## E. Design Standards

- Use Rasi maroon, deep green, white/off-white and subtle gold.
- Keep full-width heroes and centred responsive inner containers.
- Maintain consistent typography, buttons, spacing and card styles.
- Each module should have its own layout while retaining the shared brand identity.
- Test desktop, tablet and mobile layouts.
- Keep forms, navigation, APIs and data integrations functional.

Do not modify Razorpay/payment verification, authentication or unrelated database structures. Do not overwrite `.env.local`. Do not commit, push or deploy.

Run lint, build and available tests. Visually verify pages in a browser if available; report clearly if browser testing was not possible.

Stop after Phase 2. Do not start Phase 3. Report the changed files, real data sources used, tests and remaining issues.