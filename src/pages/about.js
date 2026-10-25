import Link from 'next/link';
import Image from 'next/image';
import {
  FaPhoneAlt, FaArrowRight, FaCalendarCheck, FaUniversity, FaUserGraduate, FaFileSignature, FaHandsHelping,
  FaRoute, FaAward, FaCheckCircle, FaHandHoldingHeart, FaUsers, FaEnvelope, FaMapMarkerAlt,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import Reveal from '@/frontend/components/home/Reveal';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Marquee from '@/frontend/components/home/Marquee';
import VisionMission from '@/frontend/components/home/VisionMission';
import Testimonials from '@/frontend/components/home/Testimonials';
import FounderDirector from '@/frontend/components/about/FounderDirector';
import AboutJourney from '@/frontend/components/about/AboutJourney';
import GoogleReviewsNotice from '@/frontend/components/about/GoogleReviewsNotice';
import { ROUTES, LABELS, CONTACT } from '@/data/siteConfig';

const PROCESS = [
  { icon: FaUserGraduate, title: 'Personalised Counselling', text: 'We learn about your marks, interests and aspirations in a one-to-one conversation.' },
  { icon: FaRoute, title: 'Course & College Choice', text: 'We help you compare academic streams and accredited colleges that suit you and your family.' },
  { icon: FaFileSignature, title: 'Admission & BioData Support', text: 'Systematic guidance with application forms and document verification for error-free admission.' },
  { icon: FaAward, title: 'Scholarship Guidance', text: 'Information on eligible merit, community and government scholarship options.' },
  { icon: FaHandsHelping, title: 'Continued Student Care', text: 'We stay in touch with students throughout their academic journey.' },
];

const SERVICES = [
  'Personalised Course Stream Selection',
  'TNEA & Direct College Shortlisting',
  'Admission Application & BioData Assistance',
  'Government & Private Scholarship Information',
  'Parent & Student Joint Counselling Sessions',
  'Documentation & Quota Eligibility Guidance',
];

const SUPPORT = {
  students: [
    'Choose a course and college that match your marks and genuine interests',
    'Understand the admission procedure before submitting applications',
    'Learn about scholarship eligibility and financial aid options',
    'Talk one-to-one with an experienced career counsellor',
  ],
  parents: [
    'Clear, unbiased information about course value and institution reputation',
    'Transparent fee structure analysis without hidden agency charges',
    'Complete checklist of documents needed for institutional enrolment',
    'Dedicated support to address parental concerns about campus life and safety',
  ],
};

const shot = 'shadow-card-hover ring-4 ring-white';

function Heading({ id, label, title, center }) {
  return (
    <div className={`mb-8 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="rf-eyebrow">{label}</p>
      <h2 id={id} className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      <div aria-hidden="true" className={`mt-3 flex items-center gap-2 ${center ? 'justify-center' : ''}`}>
        <span className="h-0.5 w-10 rounded-full bg-crimson" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        <span className="h-0.5 w-6 rounded-full bg-forest" />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Layout
      title="About Us — Rasi Foundation"
      description="About Rasi Foundation: a career guidance and education consultancy in Rasipuram, Tamil Nadu, founded by Prof. P. Gunasekaran and led by P. Yuvaraj Kumar."
      keywords="about Rasi Foundation, career guidance Rasipuram, education consultant, Prof Gunasekaran, career counsellor Tamil Nadu"
    >
      {/* 1. Hero with Working CTAs */}
      <PageBanner
        eyebrow="About Rasi Foundation"
        title="Shaping Futures Through Dedicated Guidance"
        actions={
          <>
            <Link href={ROUTES.counselling} className="rf-btn-gold !rounded-full px-6 py-3">
              <FaCalendarCheck aria-hidden="true" /> Book Counselling
            </Link>
            <Link href="/colleges" className="rf-btn border border-white/40 !rounded-full px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">
              Explore Colleges
            </Link>
            <Link href="/contact" className="rf-btn border border-white/40 !rounded-full px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">
              Contact Us
            </Link>
          </>
        }
        aside={
          <div className="relative mx-auto flex aspect-square w-64 items-center justify-center sm:w-72 lg:w-80">
            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-gold-300/40 motion-safe:animate-pulse" />
            <span aria-hidden="true" className="absolute inset-5 rounded-full bg-white/10" />
            <Image
              src="/rasi-logo.png"
              alt="Rasi Foundation logo"
              width={320}
              height={320}
              priority
              className="relative h-[78%] w-[78%] rounded-full object-contain shadow-2xl animate-float"
            />
          </div>
        }
      >
        Think Admission! Think RASI!! We empower students and families across Tamil Nadu with trustworthy,
        transparent guidance for Engineering, Medical, Arts & Science, Law, and Management admissions.
      </PageBanner>

      {/* 2. Who We Are */}
      <section aria-labelledby="foundation-heading" className="bg-[#fbfaf6] py-14 md:py-20">
        <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <BannerCrop
              src="/images/banners/hero-1-tamil-campus-admissions.png"
              alt="A smiling student holding books in front of a college building"
              region={{ x: 900, y: 60, w: 480, h: 480 }}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className={`aspect-square rounded-[2rem] ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a campus"
              region={{ x: 900, y: 100, w: 580, h: 580 }}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className={`aspect-square rounded-[2rem] ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-2-right-guidance.png"
              alt="A student smiling with books"
              region={{ x: 900, y: 50, w: 300, h: 300 }}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className={`aspect-square rounded-[2rem] ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students gathered outside a college building"
              region={{ x: 980, y: 20, w: 360, h: 360 }}
              sizes="(min-width: 1024px) 20vw, 45vw"
              className={`aspect-square rounded-[2rem] ${shot}`}
            />
          </Reveal>

          <Reveal delay={0.08}>
            <Heading id="foundation-heading" label="Who We Are" title="A Career Guidance & Education Consultancy" />
            <div className="space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base">
              <p>
                Rasi Foundation is a premier educational consultancy rooted in Rasipuram, Namakkal District, Tamil Nadu.
                Founded by <strong>Prof. P. Gunasekaran</strong> and directed by <strong>P. Yuvaraj Kumar</strong>, our institution
                operates on the principles of academic integrity, clarity, and genuine student advocacy.
              </p>
              <p>
                Navigating higher education admissions can often be overwhelming with complex counseling portals, quota rules,
                and countless colleges. We simplify this journey by matching student capabilities with verified courses,
                ensuring families make well-informed investments in their children’s future.
              </p>
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 py-3 text-xs font-semibold text-gray-800 shadow-sm">
                  <FaCheckCircle className="shrink-0 text-forest text-sm" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 3. Mandatory Dedicated Founder & Director Section */}
      <FounderDirector />

      {/* 4. Your Admission Journey, Step by Step */}
      <AboutJourney />

      {/* 5. Our Guidance Process (Automatic Horizontal Showcase) */}
      <section aria-labelledby="process-heading" className="bg-gradient-to-br from-forest-dark to-forest py-16 text-white md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">How We Support You</p>
            <h2 id="process-heading" className="mt-1 font-heading text-3xl font-bold md:text-4xl">Our Guidance Process</h2>
            <div aria-hidden="true" className="mt-2.5 flex items-center gap-2">
              <span className="h-0.5 w-10 rounded-full bg-gold-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>
          <Marquee label="Our guidance process" speed={0.65} arrows>
            {PROCESS.map((s, i) => (
              <article key={s.title} className="flex h-60 w-80 shrink-0 flex-col justify-between rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400 text-lg text-forest-dark shadow">
                      <s.icon aria-hidden="true" />
                    </span>
                    <span className="font-heading text-3xl font-extrabold text-white/30">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/85">{s.text}</p>
                </div>
                <div className="text-[10px] font-semibold text-gold-200">
                  Step {i + 1} of {PROCESS.length}
                </div>
              </article>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 6. Student and Parent Support */}
      <section aria-labelledby="support-heading" className="bg-white py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal delay={0.04}>
            <Heading id="support-heading" label="Guidance for Families" title="Student and Parent Support" />
            <div className="grid gap-5 sm:grid-cols-2">
              {[['For Students', FaUserGraduate, SUPPORT.students], ['For Parents', FaHandHoldingHeart, SUPPORT.parents]].map(([title, Icon, items]) => (
                <div key={title} className="rf-card p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-lg text-forest">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-gray-900">{title}</h3>
                  <ul className="mt-3.5 space-y-2.5">
                    {items.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-700 sm:text-sm">
                        <FaCheckCircle className="mt-0.5 shrink-0 text-forest" aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href={ROUTES.counselling} className="rf-btn-primary mt-6 !rounded-full px-6 py-3">
              <span>Talk to a Counsellor</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <BannerCrop
              src="/images/banners/hero-3-explore-perfect-course.png"
              alt="A smiling student holding books on a college campus"
              region={{ x: 880, y: 80, w: 400, h: 500 }}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className={`row-span-2 aspect-[4/5] rounded-[2rem] ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-4-step-into-brighter-future.png"
              alt="A student speaking with a counsellor"
              region={{ x: 1490, y: 58, w: 250, h: 134 }}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className={`aspect-[250/134] rounded-2xl ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-4-step-into-brighter-future.png"
              alt="Students discussing their college choices together"
              region={{ x: 1490, y: 210, w: 250, h: 134 }}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className={`aspect-[250/134] rounded-2xl ${shot}`}
            />
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students together on a college campus"
              region={{ x: 1000, y: 380, w: 520, h: 330 }}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className={`col-span-2 aspect-[520/330] rounded-[2rem] ${shot}`}
            />
          </Reveal>
        </div>
      </section>

      {/* 7. Vision & Mission Cards */}
      <VisionMission />

      {/* 8. Google Ratings and Reviews Section */}
      <GoogleReviewsNotice />

      {/* 9. Student and Parent Testimonials (Uses Verified Reviews & Authentic Policy) */}
      <Testimonials showEmptyState />

      {/* 10. Final Call to Action */}
      <section aria-labelledby="about-cta" className="bg-white pb-16 pt-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-dark via-[#075544] to-[#7a091e] px-8 py-14 text-center text-white shadow-xl">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <FaUsers className="mx-auto mb-3 text-3xl text-gold-300" aria-hidden="true" />
            <h2 id="about-cta" className="font-heading text-3xl font-bold md:text-4xl">Ready to Plan Your Next Step?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              Talk to a dedicated counsellor about courses, college options, cutoff trends, and admission requirements.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold !rounded-full px-6 py-3">
                <FaCalendarCheck aria-hidden="true" /> Book Counselling
              </Link>
              <Link href="/feedback" className="rf-btn border border-white/40 !rounded-full px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">
                Share Feedback
              </Link>
              <Link href={ROUTES.secureSeat} className="rf-btn-light !rounded-full px-6 py-3">
                {LABELS.secureSeat}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
