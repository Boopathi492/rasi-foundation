import Link from 'next/link';
import {
  FaHeart, FaLightbulb, FaHandshake, FaAward, FaPhoneAlt, FaArrowRight, FaCalendarCheck,
  FaBullseye, FaEye, FaUniversity, FaUserGraduate, FaFileSignature, FaHandsHelping, FaRoute,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageHero from '@/frontend/components/PageHero';
import Reveal from '@/frontend/components/home/Reveal';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Testimonials from '@/frontend/components/home/Testimonials';
import { ROUTES, LABELS } from '@/data/siteConfig';

const VALUES = [
  { icon: FaHeart, title: 'Student-centric', text: "Every decision is centred on what is best for the student's future." },
  { icon: FaLightbulb, title: 'Expert guidance', text: 'Informed, personalised advice from our counsellors.' },
  { icon: FaHandshake, title: 'Trust and integrity', text: 'Honesty and transparency in all our dealings.' },
  { icon: FaAward, title: 'Excellence', text: 'High standards in every service for students and parents.' },
];

// Informational outline of the services Rasi Foundation lists on its site; not a claim about timelines or outcomes.
const PROCESS = [
  { icon: FaUserGraduate, title: 'Counselling', text: 'We learn about your marks, interests and goals.' },
  { icon: FaRoute, title: 'Course and college choice', text: 'We help you compare options that suit you.' },
  { icon: FaFileSignature, title: 'Admission support', text: 'Guidance with applications and documents.' },
  { icon: FaAward, title: 'Scholarship information', text: 'Information on scholarships you may qualify for.' },
  { icon: FaHandsHelping, title: 'Continued support', text: 'We stay in touch after admission.' },
];

const LEADERS = [
  {
    initials: 'PG', name: 'Prof. P. Gunasekaran', role: 'Founder', credentials: 'M.Sc., M.Phil.',
    bio: 'Career Guidance Advisor and Analyst with experience in the education sector.',
    phone: '+91 97894 46100', tel: '+919789446100', tone: 'bg-brand-700',
  },
  {
    initials: 'YK', name: 'P. Yuvaraj Kumar', role: 'Administrative Director', credentials: 'MBA',
    bio: 'Career Guidance Advisor responsible for administration and day-to-day service to students.',
    phone: '+91 92949 69196', tel: '+919294969196', tone: 'bg-rasi-700',
  },
];

// PENDING VERIFICATION: these two figures are the site's existing defaults and have not been confirmed.
const STATS = [
  { number: '5000+', label: 'Students guided' },
  { number: '100+', label: 'Partner colleges' },
];

function Heading({ id, label, title, center, light }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${light ? 'text-gold-300' : 'text-rasi-700'}`}>{label}</p>
      <h2 id={id} className={`mt-1 font-heading text-3xl font-bold md:text-4xl ${light ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
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
      <PageHero eyebrow="About Rasi Foundation" title="Shaping futures through guidance">
        Think Admission! Think RASI!! We help students choose the right course and college, and support them through admission.
      </PageHero>

      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="bg-white py-16">
        <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal>
            <p className="rf-eyebrow">Who we are</p>
            <h2 id="intro-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">A career guidance and education consultancy</h2>
            <div className="mt-5 space-y-4 text-gray-700">
              <p>
                Rasi Foundation is a career guidance and education consultancy based in Rasipuram, Tamil Nadu. It was founded by
                Prof. P. Gunasekaran and is led day to day by Administrative Director P. Yuvaraj Kumar.
              </p>
              <p>
                We guide students and parents on course selection, college selection, admissions and scholarship information, so that
                important decisions are made with clear information.
              </p>
            </div>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
                  <dd className="font-heading text-3xl font-bold text-brand-800">{s.number}</dd>
                  <dt className="text-sm text-gray-600">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs text-gray-500">Figures pending verification by Rasi Foundation.</p>
          </Reveal>

          <Reveal delay={0.08} className="relative mx-auto w-full max-w-lg pb-8 pl-8">
            <span aria-hidden="true" className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-gold-300/60" />
            <BannerCrop
              src="/images/banners/hero-1-tamil-campus-admissions.png"
              alt="A smiling student holding books in front of a college building"
              region={{ x: 920, y: 20, w: 640, h: 720 }}
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="relative rounded-[2.5rem] shadow-card-hover ring-8 ring-brand-50"
            />
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a campus"
              region={{ x: 1000, y: 380, w: 520, h: 330 }}
              sizes="240px"
              className="absolute bottom-0 left-0 w-44 rounded-2xl shadow-card-hover ring-4 ring-white sm:w-52"
            />
          </Reveal>
        </div>
      </section>

      {/* Vision and mission */}
      <section aria-labelledby="vm-about-heading" className="relative overflow-hidden bg-brand-50/60 py-16">
        <div className="container mx-auto px-4">
          <Heading id="vm-about-heading" label="Our purpose" title="Vision and mission" center />
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: FaBullseye, title: 'Our Mission', tone: 'bg-brand-800', text: 'To empower students with the knowledge, guidance and support they need to make informed career decisions and secure admissions in institutions that align with their aspirations and potential.' },
              { icon: FaEye, title: 'Our Vision', tone: 'bg-rasi-700', text: 'To be the most trusted and preferred education consultancy, recognised for transforming lives through quality guidance and creating successful professionals who contribute to society.' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-card-hover ${c.tone}`}>
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
                <span className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl"><c.icon aria-hidden="true" /></span>
                <h3 className="relative font-heading text-2xl font-bold">{c.title}</h3>
                <p className="relative mt-3 text-lg leading-relaxed text-white/90">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Heading id="values-heading" label="Our values" title="What we stand for" center />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.06} className="rf-card p-6 text-center transition-shadow hover:shadow-card-hover">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand-700"><v.icon aria-hidden="true" /></span>
                <h3 className="font-sans text-lg font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Counselling and admission support */}
      <section aria-labelledby="process-heading" className="bg-brand-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <Heading id="process-heading" label="How we support you" title="Counselling and admission support" center light />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-lg text-brand-900"><s.icon aria-hidden="true" /></span>
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Step {i + 1}</p>
                <h3 className="mt-1 font-sans text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/75">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership (names and credentials from the existing site; no photographs are available) */}
      <section aria-labelledby="leaders-heading" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Heading id="leaders-heading" label="Our team" title="Leadership" center />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {LEADERS.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.08} className="rf-card p-8 text-center">
                <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white ring-4 ring-brand-50 ${l.tone}`} aria-hidden="true">{l.initials}</div>
                <h3 className="font-heading text-2xl font-bold text-gray-900">{l.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-rasi-700">{l.role}</p>
                <p className="mt-1 font-semibold text-gray-600">{l.credentials}</p>
                <p className="mt-4 text-gray-600">{l.bio}</p>
                <a href={`tel:${l.tel}`} className="rf-btn-outline mt-5 px-5 py-2.5"><FaPhoneAlt aria-hidden="true" /> {l.phone}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partner colleges */}
      <section aria-labelledby="partners-heading" className="bg-brand-50/60 py-14">
        <div className="container mx-auto flex flex-col items-start justify-between gap-5 px-4 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-700 text-2xl text-white"><FaUniversity aria-hidden="true" /></span>
            <div>
              <h2 id="partners-heading" className="font-heading text-2xl font-bold text-gray-900">Colleges in our directory</h2>
              <p className="mt-1 max-w-xl text-gray-600">Browse the colleges we guide students towards, grouped by zone.</p>
            </div>
          </div>
          <Link href="/colleges" className="rf-btn-primary px-6 py-3">View All Colleges <FaArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <Testimonials />

      {/* Final CTA */}
      <section aria-labelledby="about-cta" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-12 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <h2 id="about-cta" className="font-heading text-3xl font-bold md:text-4xl">Ready to plan your next step?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">Talk to a counsellor about courses, colleges and admission.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
              <Link href={ROUTES.enquiry} className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10">Enquiry</Link>
              <Link href={ROUTES.secureSeat} className="rf-btn-light px-6 py-3">{LABELS.secureSeat}</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
