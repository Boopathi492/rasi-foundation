import Link from 'next/link';
import Image from 'next/image';
import {
  FaPhoneAlt, FaArrowRight, FaCalendarCheck, FaUniversity, FaUserGraduate, FaFileSignature, FaHandsHelping,
  FaRoute, FaAward, FaCheckCircle, FaHandHoldingHeart, FaUsers,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import Reveal from '@/frontend/components/home/Reveal';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Marquee from '@/frontend/components/home/Marquee';
import VisionMission from '@/frontend/components/home/VisionMission';
import Testimonials from '@/frontend/components/home/Testimonials';
import { ROUTES, LABELS } from '@/data/siteConfig';

// Informational outline of the services Rasi Foundation lists on its site; not a claim about timelines or outcomes.
const PROCESS = [
  { icon: FaUserGraduate, title: 'Counselling', text: 'We learn about your marks, interests and goals in a one-to-one conversation.' },
  { icon: FaRoute, title: 'Course and college choice', text: 'We help you compare courses and colleges that suit you and your family.' },
  { icon: FaFileSignature, title: 'Admission support', text: 'Guidance with applications and the documents needed for admission.' },
  { icon: FaAward, title: 'Scholarship information', text: 'Information on scholarship options you may be eligible for.' },
  { icon: FaHandsHelping, title: 'Continued support', text: 'We stay in touch with students after admission.' },
];

const SERVICES = [
  'Course selection guidance',
  'College selection guidance',
  'Admission process support',
  'Scholarship information',
];

const SUPPORT = {
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

// Names and credentials from the existing site; no photographs are available.
const LEADERS = [
  { initials: 'PG', name: 'Prof. P. Gunasekaran', role: 'Founder', credentials: 'M.Sc., M.Phil.', bio: 'Career Guidance Advisor and Analyst with experience in the education sector.', phone: '+91 97894 46100', tel: '+919789446100', tone: 'bg-forest' },
  { initials: 'YK', name: 'P. Yuvaraj Kumar', role: 'Administrative Director', credentials: 'MBA', bio: 'Career Guidance Advisor responsible for administration and day-to-day service to students.', phone: '+91 92949 69196', tel: '+919294969196', tone: 'bg-crimson' },
];

const shot = 'shadow-card-hover ring-4 ring-white';

function Heading({ id, label, title, center }) {
  return (
    <div className={`mb-8 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="rf-eyebrow">{label}</p>
      <h2 id={id} className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      <div aria-hidden="true" className={`mt-3 flex items-center gap-2 ${center ? 'justify-center' : ''}`}>
        <span className="h-0.5 w-10 rounded-full bg-crimson" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Layout
      title="About Us"
      description="About Rasi Foundation: a career guidance and education consultancy in Rasipuram, Tamil Nadu, founded by Prof. P. Gunasekaran."
      keywords="about Rasi Foundation, career guidance Rasipuram, education consultant, Prof Gunasekaran, career counsellor Tamil Nadu"
    >
      {/* 1. Hero */}
      <PageBanner
        eyebrow="About Rasi Foundation"
        title="Shaping futures through guidance"
        actions={
          <>
            <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
            <Link href="/colleges" className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">Browse Colleges</Link>
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
        Think Admission! Think RASI!! We help students choose the right course and college, and support them through admission.
      </PageBanner>

      {/* 2. About the Foundation */}
      <section aria-labelledby="foundation-heading" className="bg-[#fbfaf6] py-14 md:py-16">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            <BannerCrop src="/images/banners/hero-1-tamil-campus-admissions.png" alt="A smiling student holding books in front of a college building" region={{ x: 900, y: 60, w: 480, h: 480 }} sizes="(min-width: 1024px) 20vw, 45vw" className={`aspect-square rounded-[2rem] ${shot}`} />
            <BannerCrop src="/images/banners/hero-5-students-today-leaders-tomorrow.png" alt="Students walking together on a campus" region={{ x: 900, y: 100, w: 580, h: 580 }} sizes="(min-width: 1024px) 20vw, 45vw" className={`aspect-square rounded-[2rem] ${shot}`} />
            <BannerCrop src="/images/banners/hero-2-right-guidance.png" alt="A student smiling with books" region={{ x: 900, y: 50, w: 300, h: 300 }} sizes="(min-width: 1024px) 20vw, 45vw" className={`aspect-square rounded-[2rem] ${shot}`} />
            <BannerCrop src="/images/banners/hero-5-students-today-leaders-tomorrow.png" alt="Students gathered outside a college building" region={{ x: 980, y: 20, w: 360, h: 360 }} sizes="(min-width: 1024px) 20vw, 45vw" className={`aspect-square rounded-[2rem] ${shot}`} />
          </Reveal>

          <Reveal delay={0.08}>
            <Heading id="foundation-heading" label="Who we are" title="A career guidance and education consultancy" />
            <div className="space-y-4 text-gray-700">
              <p>
                Rasi Foundation is a career guidance and education consultancy based in Rasipuram, Tamil Nadu. It was founded by
                Prof. P. Gunasekaran and is led day to day by Administrative Director P. Yuvaraj Kumar.
              </p>
              <p>
                We guide students and parents on course selection, college selection, admissions and scholarship information, so that
                important decisions are made with clear information.
              </p>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm">
                  <FaCheckCircle className="shrink-0 text-forest" aria-hidden="true" /> {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {LEADERS.map((l) => (
                <div key={l.name} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-card">
                  <span aria-hidden="true" className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${l.tone}`}>{l.initials}</span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-gray-900">{l.name}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider text-crimson">{l.role}</p>
                    <p className="text-xs text-gray-600">{l.credentials}</p>
                    <a href={`tel:${l.tel}`} className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline"><FaPhoneAlt aria-hidden="true" /> {l.phone}</a>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Our Guidance Process (automatic horizontal showcase) */}
      <section aria-labelledby="process-heading" className="bg-gradient-to-br from-forest-dark to-forest py-14 text-white md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">How we support you</p>
            <h2 id="process-heading" className="mt-1 font-heading text-3xl font-bold md:text-4xl">Our guidance process</h2>
          </div>
          <Marquee label="Our guidance process" speed={0.6} arrows>
            {PROCESS.map((s, i) => (
              <article key={s.title} className="flex h-56 w-72 shrink-0 flex-col rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-lg text-forest-dark"><s.icon aria-hidden="true" /></span>
                  <span className="font-heading text-4xl font-bold text-white/25">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-sans text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/80">{s.text}</p>
              </article>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 4. Student and Parent Support */}
      <section aria-labelledby="support-heading" className="bg-white py-14 md:py-16">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal delay={0.04}>
            <Heading id="support-heading" label="Guidance for families" title="Student and parent support" />
            <div className="grid gap-5 sm:grid-cols-2">
              {[['For students', FaUserGraduate, SUPPORT.students], ['For parents', FaHandHoldingHeart, SUPPORT.parents]].map(([title, Icon, items]) => (
                <div key={title} className="rf-card p-6">
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-forest/10 text-lg text-forest"><Icon aria-hidden="true" /></span>
                  <h3 className="font-sans text-lg font-semibold text-gray-900">{title}</h3>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((t) => (
                      <li key={t} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <FaCheckCircle className="mt-0.5 shrink-0 text-forest" aria-hidden="true" /><span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href={ROUTES.counselling} className="rf-btn-primary mt-6 !rounded-full px-6 py-3">Talk to a counsellor <FaArrowRight aria-hidden="true" /></Link>
          </Reveal>

          <Reveal className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <BannerCrop src="/images/banners/hero-3-explore-perfect-course.png" alt="A smiling student holding books on a college campus" region={{ x: 880, y: 80, w: 400, h: 500 }} sizes="(min-width: 1024px) 18vw, 45vw" className={`row-span-2 aspect-[4/5] rounded-[2rem] ${shot}`} />
            <BannerCrop src="/images/banners/hero-4-step-into-brighter-future.png" alt="A student speaking with a counsellor" region={{ x: 1490, y: 58, w: 250, h: 134 }} sizes="(min-width: 1024px) 18vw, 45vw" className={`aspect-[250/134] rounded-2xl ${shot}`} />
            <BannerCrop src="/images/banners/hero-4-step-into-brighter-future.png" alt="Students discussing their college choices together" region={{ x: 1490, y: 210, w: 250, h: 134 }} sizes="(min-width: 1024px) 18vw, 45vw" className={`aspect-[250/134] rounded-2xl ${shot}`} />
            <BannerCrop src="/images/banners/hero-5-students-today-leaders-tomorrow.png" alt="Students together on a college campus" region={{ x: 1000, y: 380, w: 520, h: 330 }} sizes="(min-width: 1024px) 18vw, 45vw" className={`col-span-2 aspect-[520/330] rounded-[2rem] ${shot}`} />
          </Reveal>
        </div>
      </section>

      {/* 5. Vision & Mission (existing wording and component) */}
      <VisionMission />

      {/* Colleges pointer */}
      <section aria-labelledby="partners-heading" className="bg-white py-10">
        <div className="container mx-auto flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest text-2xl text-white"><FaUniversity aria-hidden="true" /></span>
            <div>
              <h2 id="partners-heading" className="font-heading text-2xl font-bold text-gray-900">Colleges in our directory</h2>
              <p className="mt-1 max-w-xl text-gray-600">Browse the colleges we guide students towards, grouped by zone.</p>
            </div>
          </div>
          <Link href="/colleges" className="rf-btn-primary px-6 py-3">View All Colleges <FaArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      {/* 6. Reviews (only verified testimonials; renders nothing until they exist) and CTA */}
      <Testimonials />

      <section aria-labelledby="about-cta" className="bg-white pb-16 pt-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-dark to-forest px-8 py-12 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <FaUsers className="mx-auto mb-3 text-3xl text-gold-300" aria-hidden="true" />
            <h2 id="about-cta" className="font-heading text-3xl font-bold md:text-4xl">Ready to plan your next step?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">Talk to a counsellor about courses, colleges and admission.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
              <Link href={ROUTES.enquiry} className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">Enquiry</Link>
              <Link href={ROUTES.secureSeat} className="rf-btn-light px-6 py-3">{LABELS.secureSeat}</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
