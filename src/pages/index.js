import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserGraduate, FaStethoscope, FaCog, FaBalanceScale, FaArrowRight, FaFlask,
  FaBullhorn, FaCalendarCheck, FaRegCommentDots, FaHandHoldingHeart, FaCheckCircle,
  FaChartLine, FaChalkboardTeacher, FaSeedling, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaCalendarAlt,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import HeroCarousel from '@/frontend/components/home/HeroCarousel';
import CollegeShowcase from '@/frontend/components/home/CollegeShowcase';
import Testimonials from '@/frontend/components/home/Testimonials';
import DistrictExplorer from '@/frontend/components/home/DistrictExplorer';
import FeatureCollage from '@/frontend/components/home/FeatureCollage';
import VisionMission from '@/frontend/components/home/VisionMission';
import AdmissionJourney from '@/frontend/components/home/AdmissionJourney';
import StatsBanner from '@/frontend/components/home/StatsBanner';
import EnquiryForm from '@/frontend/components/home/EnquiryForm';
import EnquiryPopup from '@/frontend/components/home/EnquiryPopup';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Marquee from '@/frontend/components/home/Marquee';
import Reveal from '@/frontend/components/home/Reveal';
import { CONTACT, ROUTES } from '@/data/siteConfig';

const eyebrow = 'rf-eyebrow';

// All 7 verified course categories from src/pages/courses.js with real course entries from that page.
const COURSE_CATEGORIES = [
  {
    icon: FaCog,
    name: 'Engineering',
    stream: 'UG & Diploma',
    courses: ['B.E. CSE', 'B.Tech AI & DS', 'B.E. ECE', 'B.E. Mechanical'],
    src: '/images/banners/hero-5-students-today-leaders-tomorrow.png',
    region: { x: 1470, y: 60, w: 260, h: 416 },
    badgeTone: 'bg-forest/10 text-forest',
  },
  {
    icon: FaStethoscope,
    name: 'Medical',
    stream: 'Health & Allied',
    courses: ['MBBS', 'BDS', 'B.Sc Nursing', 'B.Pharm'],
    src: '/images/banners/hero-2-right-guidance.png',
    region: { x: 860, y: 0, w: 350, h: 560 },
    badgeTone: 'bg-crimson/10 text-crimson',
  },
  {
    icon: FaFlask,
    name: 'Arts & Science',
    stream: 'UG & PG Degrees',
    courses: ['B.Sc', 'B.A.', 'M.Sc', 'M.A.'],
    src: '/images/banners/hero-5-students-today-leaders-tomorrow.png',
    region: { x: 1250, y: 150, w: 350, h: 560 },
    badgeTone: 'bg-forest/10 text-forest',
  },
  {
    icon: FaBalanceScale,
    name: 'Law',
    stream: 'Integrated & LLB',
    courses: ['BA LLB', 'BBA LLB', 'LLB', 'LLM'],
    src: '/images/banners/hero-4-step-into-brighter-future.png',
    region: { x: 800, y: 20, w: 350, h: 560 },
    badgeTone: 'bg-crimson/10 text-crimson',
  },
  {
    icon: FaChartLine,
    name: 'Management',
    stream: 'Business & IT',
    courses: ['MBA', 'BBA', 'MCA', 'B.Com / CA'],
    src: '/images/banners/hero-5-students-today-leaders-tomorrow.png',
    region: { x: 920, y: 120, w: 350, h: 560 },
    badgeTone: 'bg-forest/10 text-forest',
  },
  {
    icon: FaChalkboardTeacher,
    name: 'Education',
    stream: 'Teacher Training',
    courses: ['B.Ed', 'M.Ed', 'D.T.Ed', 'D.El.Ed'],
    src: '/images/banners/hero-3-explore-perfect-course.png',
    region: { x: 880, y: 60, w: 350, h: 560 },
    badgeTone: 'bg-amber-50 text-[#9a6300]',
  },
  {
    icon: FaSeedling,
    name: 'Agriculture',
    stream: 'Agri & Veterinary',
    courses: ['B.Sc Agriculture', 'B.Sc Horticulture', 'B.Sc Forestry', 'B.V.Sc'],
    src: '/images/banners/hero-2-right-guidance.png',
    region: { x: 920, y: 40, w: 350, h: 560 },
    badgeTone: 'bg-forest/10 text-forest',
  },
];

const BENEFITS = {
  students: [
    'Choose a course and college that fit your marks and interests',
    'Understand the admission process before you apply',
    'Learn about scholarship options',
    'Talk to a counsellor one-to-one',
  ],
  parents: [
    'Clear information about courses and colleges',
    'Guidance on the documents needed for admission',
    'Help comparing options so the decision is an informed one',
    'A counsellor to answer your questions',
  ],
};

const SUPPORT_PANELS = [
  {
    key: 'students',
    tag: 'Student Guidance',
    title: 'For Students',
    subtitle: 'Clear direction for your academic and career choices after 10th, 12th or graduation.',
    Icon: FaUserGraduate,
    items: BENEFITS.students,
    ctaLabel: 'Book Student Counselling',
    ctaHref: ROUTES.counselling,
    tone: 'forest',
    image: {
      src: '/images/banners/hero-3-explore-perfect-course.png',
      alt: 'A smiling student holding books on a college campus',
      region: { x: 850, y: 40, w: 660, h: 350 },
    },
  },
  {
    key: 'parents',
    tag: 'Family Confidence',
    title: 'For Parents',
    subtitle: 'Transparent information on colleges, eligibility and documentation for peace of mind.',
    Icon: FaHandHoldingHeart,
    items: BENEFITS.parents,
    ctaLabel: 'Speak with an Advisor',
    ctaHref: ROUTES.enquiry,
    tone: 'crimson',
    image: {
      src: '/images/banners/hero-4-step-into-brighter-future.png',
      alt: 'A student and parent speaking with a career counsellor',
      region: { x: 1490, y: 58, w: 250, h: 134 },
    },
  },
];

function SectionHeading({ label, title, children, id, center = false }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`${eyebrow} ${center ? 'justify-center' : ''}`}>
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
        {label}
      </p>
      <h2 id={id} className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      <div aria-hidden="true" className={`mt-3 h-0.5 w-12 bg-forest ${center ? 'mx-auto' : ''}`} />
      {children && <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">{children}</p>}
    </div>
  );
}

function formatAnnouncementDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const ANNOUNCEMENT_TONES = {
  urgent: 'bg-rose-50 text-crimson border-rose-200',
  admission: 'bg-emerald-50 text-forest border-emerald-200',
  scholarship: 'bg-amber-50 text-[#9a6300] border-amber-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200',
};

function LatestAnnouncements() {
  const [state, setState] = useState({ status: 'loading', items: [] });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/announcements');
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error('Bad response');
        const all = Array.isArray(json.data) ? json.data : [];
        const homeItems = all.filter((a) => a.showOnHome !== false);
        if (!cancelled) {
          setState({
            status: 'ready',
            items: (homeItems.length > 0 ? homeItems : all).slice(0, 12),
          });
        }
      } catch (err) {
        console.error('Announcements failed to load', err);
        if (!cancelled) setState({ status: 'error', items: [] });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section aria-labelledby="updates-heading" className="border-b border-gray-100 bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={eyebrow}>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Announcements
            </p>
            <h2 id="updates-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Latest <span className="text-crimson">Updates</span> &amp; Notifications
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-gray-600">
              Stay informed about admission schedules, counselling dates and scholarship notifications.
            </p>
          </div>
          <Link
            href="/announcements"
            className="rf-btn-outline self-start whitespace-nowrap px-5 py-2.5 text-xs sm:self-auto"
          >
            <span>View All Announcements</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        {state.status === 'loading' && (
          <div className="grid gap-5 md:grid-cols-3" aria-busy="true" aria-label="Loading announcements">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-44 animate-pulse rounded-xl border border-gray-200 bg-gray-50 p-6" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div role="alert" className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
            Announcements could not be loaded right now. Please try the{' '}
            <Link href="/announcements" className="font-semibold text-brand-700 underline">
              announcements page
            </Link>
            .
          </div>
        )}

        {state.status === 'ready' && state.items.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
            There are no active announcements at the moment. Please check back soon or visit the{' '}
            <Link href="/announcements" className="font-semibold text-brand-700 underline">
              announcements page
            </Link>
            .
          </div>
        )}

        {state.status === 'ready' && state.items.length > 0 && (
          <Marquee label="Latest announcements" speed={0.5} arrows className="py-1.5">
            {state.items.map((a) => {
              const dateLabel = formatAnnouncementDate(a.createdAt);
              const badgeStyle = ANNOUNCEMENT_TONES[a.type] || ANNOUNCEMENT_TONES.general;
              const targetHref = a.link || '/announcements';
              return (
                <article
                  key={a._id}
                  className="group relative flex w-80 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all duration-200 hover:border-forest/40 hover:shadow-card-hover sm:w-96"
                >
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${badgeStyle}`}>
                        <FaBullhorn className="text-[10px]" aria-hidden="true" />
                        {a.type || 'general'}
                      </span>
                      {dateLabel && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500">
                          <FaCalendarAlt className="text-[10px] text-gray-400" aria-hidden="true" />
                          {dateLabel}
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans text-base font-bold leading-snug text-gray-900 group-hover:text-forest">
                      {a.title}
                    </h3>
                    {a.content && (
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                        {a.content}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-3">
                    <Link
                      href={targetHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-crimson focus:outline-none focus-visible:underline"
                    >
                      <span>Read update</span>
                      <FaArrowRight className="text-[10px] transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </Marquee>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Rasi Foundation - career guidance and education consultancy in Tamil Nadu. Expert counselling for college admissions, career choices and scholarships."
      keywords="NEET counseling, medical college admission Tamil Nadu, engineering admission guidance, MBA admission consultant, career counselor Rasipuram, Namakkal education consultancy"
    >
      <h1 className="sr-only">Rasi Foundation: career guidance and college admission support in Tamil Nadu</h1>

      {/* 1. Hero Banner (First major section after fixed header) */}
      <HeroCarousel />

      {/* 2. Tamil Nadu District Ticker */}
      <DistrictExplorer />

      {/* 3. 6-Step Admission Roadmap */}
      <AdmissionJourney />

      {/* 4. College Showcase */}
      <CollegeShowcase />

      {/* 5. Four-Image Layered Collage ("Why Students Choose Us") */}
      <FeatureCollage />

      {/* 6. Explore Popular Courses (Automatic Horizontal Carousel) */}
      <section aria-labelledby="courses-heading" className="relative overflow-hidden border-b border-gray-200/80 bg-[#f8faf9] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={eyebrow}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest" />
                Courses &amp; Programs
              </p>
              <h2 id="courses-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
                Explore Popular <span className="text-forest">Courses</span>
              </h2>
              <p className="mt-2 max-w-xl text-sm text-gray-600">
                Choose from undergraduate, postgraduate and diploma programs across 7 major academic streams.
              </p>
            </div>
            <Link
              href="/courses"
              className="rf-btn-outline self-start whitespace-nowrap px-5 py-2.5 text-xs sm:self-auto"
            >
              <span>View All Courses</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <Marquee label="Popular course categories" speed={0.5} arrows className="py-1.5">
            {COURSE_CATEGORIES.map(({ icon: Icon, name, stream, courses, src, region, badgeTone }) => (
              <Link
                key={name}
                href="/courses"
                className="group relative flex h-60 w-80 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-all duration-200 hover:border-forest/40 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 sm:w-[340px]"
              >
                <span className="relative z-10 flex min-w-0 flex-1 flex-col items-start justify-between p-5">
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${badgeTone}`}>
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                        {stream}
                      </span>
                    </div>

                    <span className="mt-3 block font-heading text-lg font-bold text-gray-900 group-hover:text-forest">
                      {name}
                    </span>

                    <span className="mt-2 block space-y-1 text-xs leading-relaxed text-gray-600">
                      {courses.map((c) => (
                        <span key={c} className="flex items-center gap-1.5">
                          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gray-400" />
                          <span>{c}</span>
                        </span>
                      ))}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest group-hover:text-crimson">
                    <span>Explore</span>
                    <FaArrowRight className="text-[10px] transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </span>

                <span className="relative w-[124px] shrink-0 overflow-hidden border-l border-gray-100 bg-gray-100 sm:w-[134px]">
                  <BannerCrop
                    src={src}
                    alt=""
                    region={region}
                    fill
                    sizes="180px"
                    className="h-full w-full"
                  />
                </span>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 7. Student Achievements & Statistics Banner */}
      <StatsBanner />

      {/* 8. Scholarship Support Section */}
      <section aria-labelledby="scholarship-heading" className="border-b border-gray-100 bg-white py-16 md:py-20">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <Reveal className="relative aspect-[840/580] overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-card">
            <Image
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a college campus"
              width={2048}
              height={768}
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute max-w-none"
              style={{ width: '238.1%', height: 'auto', left: '-104.76%', top: '-20.7%' }}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading
              id="scholarship-heading"
              label="Scholarship Support"
              title="Scholarship information and guidance"
            >
              We help students find out about scholarship options and take the Rasi Foundation scholarship test. Eligibility and
              outcomes depend on each scholarship&apos;s own rules; we cannot guarantee a scholarship, financial assistance or admission.
            </SectionHeading>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/scholarship-test" className="rf-btn-primary px-6 py-2.5">
                <span>Explore Scholarship Support</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
              <Link href="/practice-test" className="rf-btn-outline px-6 py-2.5">
                Try the Practice Test
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. Vision and Mission Section */}
      <VisionMission />

      {/* 10. Student and Parent Support Section */}
      <section aria-labelledby="benefits-heading" className="border-b border-gray-100 bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Reveal>
            <SectionHeading
              id="benefits-heading"
              label="Guidance for Families"
              title="How We Support Students and Parents"
              center
            >
              Choosing a course and college is a family milestone. We provide clear, step-by-step guidance tailored to both students and parents.
            </SectionHeading>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-2">
            {SUPPORT_PANELS.map((panel, idx) => {
              const { key, tag, title, subtitle, Icon, items, ctaLabel, ctaHref, tone, image } = panel;
              const isCrimson = tone === 'crimson';
              return (
                <Reveal key={key} delay={idx * 0.08} className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover">
                    {/* Visual Image Header */}
                    <div className="relative aspect-[16/8.5] w-full overflow-hidden bg-gray-100">
                      <BannerCrop
                        src={image.src}
                        alt={image.alt}
                        region={image.region}
                        fill
                        sizes="(min-width: 1024px) 540px, 95vw"
                        className="h-full w-full"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                      />
                      <span
                        className={`absolute left-4 top-4 rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm ${
                          isCrimson ? 'bg-crimson' : 'bg-forest'
                        }`}
                      >
                        {tag}
                      </span>
                    </div>

                    {/* Panel Body */}
                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                      <div>
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg ${
                              isCrimson ? 'bg-crimson/10 text-crimson' : 'bg-forest/10 text-forest'
                            }`}
                          >
                            <Icon aria-hidden="true" />
                          </span>
                          <div>
                            <h3 className="font-heading text-2xl font-bold text-gray-900">{title}</h3>
                            <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">{subtitle}</p>
                          </div>
                        </div>

                        <ul className="mt-6 space-y-2.5">
                          {items.map((t) => (
                            <li
                              key={t}
                              className="flex items-start gap-3 rounded-lg border border-gray-100 bg-[#f8faf9] px-3.5 py-2.5 text-sm text-gray-700"
                            >
                              <FaCheckCircle
                                className={`mt-0.5 shrink-0 ${isCrimson ? 'text-crimson' : 'text-forest'}`}
                                aria-hidden="true"
                              />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-2">
                        <Link
                          href={ctaHref}
                          className={`${
                            isCrimson ? 'rf-btn-maroon' : 'rf-btn-primary'
                          } px-6 py-2.5 text-xs sm:text-sm`}
                        >
                          <span>{ctaLabel}</span>
                          <FaArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Student Testimonials Section */}
      <Testimonials showEmptyState />

      {/* 12. Latest Announcements Carousel */}
      <LatestAnnouncements />

      {/* 13. Dedicated Homepage Enquiry Form Section */}
      <section
        id="homepage-enquiry"
        aria-labelledby="home-enquiry-heading"
        className="relative overflow-hidden border-b border-gray-200/80 bg-[#f8faf9] py-16 md:py-20"
      >
        {/* Section Heading above the columns */}
        <div className="container mx-auto mb-10 px-4 text-center">
          <Reveal>
            <p className={`${eyebrow} justify-center`}>
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Direct Admission Guidance
            </p>
            <h2 id="home-enquiry-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              Connect with Our <span className="text-forest">Academic Advisors</span>
            </h2>
            <div aria-hidden="true" className="mx-auto mt-3 h-0.5 w-12 bg-forest" />
            <p className="mx-auto mt-3.5 max-w-2xl text-sm text-gray-600 sm:text-base">
              Have questions about colleges, eligible courses, cut-offs, or documentation? Submit your enquiry below or connect with our senior counselling team.
            </p>
          </Reveal>
        </div>

        <div className="container mx-auto grid items-stretch gap-8 px-4 lg:grid-cols-12">
          {/* Left: Visual Panel with Verified Image, Benefits, and Workflow Indicator */}
          <Reveal className="flex flex-col lg:col-span-5">
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-card sm:p-7">
              <div>
                {/* Campus / Student Image Header */}
                <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-100">
                  <BannerCrop
                    src="/images/banners/hero-2-right-guidance.png"
                    alt="Students receiving career counselling from Rasi Foundation advisors"
                    region={{ x: 860, y: 0, w: 420, h: 360 }}
                    sizes="(min-width: 1024px) 35vw, 90vw"
                    className="h-full w-full"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-forest shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                    Free Career Counselling Support
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">
                  Personalised Guidance for Every Student
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  Our certified counsellors map student cut-offs and career goals to reputable government, aided, and private colleges across Tamil Nadu.
                </p>

                {/* 4 Verified Benefits */}
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {[
                    { title: 'Cut-off & Stream Mapping', desc: 'Advice tailored to your marks & interests' },
                    { title: 'TNEA & College Shortlisting', desc: 'Compare engineering, medical & arts colleges' },
                    { title: 'Impartial Guidance', desc: 'No hidden agency fees or bias' },
                    { title: 'Document & Application Aid', desc: 'Step-by-step checklist for smooth admission' },
                  ].map((b) => (
                    <div key={b.title} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-[#f8faf9] p-2.5">
                      <FaCheckCircle className="mt-0.5 shrink-0 text-xs text-forest" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{b.title}</p>
                        <p className="text-[11px] text-gray-500">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Compact Workflow Indicator */}
                <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-forest">Simple 3-Step Process</p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-gray-800">
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crimson text-[10px] text-white">1</span>
                      Submit Enquiry
                    </span>
                    <FaArrowRight className="text-[10px] text-gray-400" aria-hidden="true" />
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[10px] text-white">2</span>
                      Counselling
                    </span>
                    <FaArrowRight className="text-[10px] text-gray-400" aria-hidden="true" />
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#9a6300] text-[10px] text-white">3</span>
                      Next Steps
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Helpline strip */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-xs text-gray-600">
                <span className="flex items-center gap-2">
                  <a href={`tel:${CONTACT.phoneTel}`} className="rf-phone-link">
                    <FaPhoneAlt className="text-[10px] text-forest" aria-hidden="true" />
                    <span>{CONTACT.phoneDisplay}</span>
                  </a>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <FaMapMarkerAlt className="text-crimson" aria-hidden="true" />
                  <span>Rasipuram, Namakkal</span>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col lg:col-span-7">
            <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-card sm:p-8">
              <div>
                <div className="mb-5 border-b border-gray-100 pb-4">
                  <h3 className="font-heading text-2xl font-bold text-gray-900">
                    Send an Admission Enquiry
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                    Fields marked <span className="font-bold text-crimson">*</span> are required.
                  </p>
                </div>
                <EnquiryForm idPrefix="home-section" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 14. Final Call to Action (Footer follows from Layout) */}
      <section aria-labelledby="cta-heading" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Reveal className="relative overflow-hidden rounded-2xl border border-[#054235] bg-[#075544] px-8 py-12 text-center text-white shadow-md md:px-16">
            <h2 id="cta-heading" className="font-heading text-3xl font-bold md:text-4xl">
              Ready to plan your next step?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">
              Book a counselling session for course and college guidance, or send us a general enquiry.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3">
                <FaCalendarCheck aria-hidden="true" /> Book Counselling
              </Link>
              <Link
                href={ROUTES.enquiry}
                className="rf-btn border border-white/35 bg-white/10 px-6 py-3 text-white hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-brand-900"
              >
                <FaRegCommentDots aria-hidden="true" /> Enquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 15. Automatic Centred Enquiry Popup (Opens once per session on homepage entry) */}
      <EnquiryPopup />
    </Layout>
  );
}
