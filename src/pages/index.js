import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaUserGraduate, FaStethoscope, FaCog, FaBalanceScale, FaArrowRight, FaFlask,
  FaBullhorn, FaCalendarCheck, FaRegCommentDots, FaHandHoldingHeart, FaCheckCircle,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import HeroCarousel from '@/frontend/components/home/HeroCarousel';
import CollegeShowcase from '@/frontend/components/home/CollegeShowcase';
import Testimonials from '@/frontend/components/home/Testimonials';
import DistrictExplorer from '@/frontend/components/home/DistrictExplorer';
import FeatureCollage from '@/frontend/components/home/FeatureCollage';
import VisionMission from '@/frontend/components/home/VisionMission';
import AdmissionJourney from '@/frontend/components/home/AdmissionJourney';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Reveal from '@/frontend/components/home/Reveal';
import { ROUTES, TESTIMONIALS } from '@/data/siteConfig';

const eyebrow = 'rf-eyebrow';


// The categories offered on /courses (src/pages/courses.js). Example courses are real entries from that
// page's course list. /courses has no URL filter, so every card links to the course page.
const COURSE_CATEGORIES = [
  { icon: FaCog, name: 'Engineering', courses: ['B.E. CSE', 'B.E. Mechanical', 'B.E. Civil'], src: '/images/banners/hero-4-step-into-brighter-future.png', region: { x: 1250, y: 220, w: 500, h: 360 }, color: 'gold' },
  { icon: FaStethoscope, name: 'Medical', courses: ['MBBS', 'BDS', 'B.Sc Nursing'], src: '/images/banners/hero-1-tamil-campus-admissions.png', region: { x: 720, y: 20, w: 540, h: 700 }, color: 'red' },
  { icon: FaFlask, name: 'Arts & Science', courses: ['B.Sc', 'B.A.', 'M.Sc'], src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', region: { x: 730, y: 70, w: 650, h: 620 }, color: 'green' },
  { icon: FaBalanceScale, name: 'Law', courses: ['BA LLB', 'BBA LLB', 'LLB'], src: '/images/banners/hero-4-step-into-brighter-future.png', region: { x: 1480, y: 45, w: 320, h: 180 }, color: 'rose' },
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

function SectionHeading({ label, title, children, id, center = false }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={eyebrow}>{label}</p>
      <h2 id={id} className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      <div aria-hidden="true" className={`mt-3 flex items-center gap-2 ${center ? 'justify-center' : ''}`}>
        <span className="h-0.5 w-10 rounded-full bg-brand-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      </div>
      {children && <p className="mt-4 text-gray-600">{children}</p>}
    </div>
  );
}

function LatestAnnouncements() {
  const [state, setState] = useState({ status: 'loading', items: [] });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/announcements');
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error('Bad response');
        if (!cancelled) setState({ status: 'ready', items: json.data.slice(0, 3) });
      } catch (err) {
        console.error('Announcements failed to load', err);
        if (!cancelled) setState({ status: 'error', items: [] });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section aria-labelledby="updates-heading" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Announcements</p>
            <h2 id="updates-heading" className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">Latest updates</h2>
          </div>
          <Link href="/announcements" className="inline-flex items-center gap-2 rounded text-sm font-semibold text-brand-700 hover:text-brand-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2">
            View all announcements <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        {state.status === 'loading' && (
          <div className="grid gap-4 md:grid-cols-3" aria-busy="true" aria-label="Loading announcements">
            {[0, 1, 2].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-gray-50" />)}
          </div>
        )}

        {state.status === 'error' && (
          <p role="alert" className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
            Announcements could not be loaded right now. Please try the{' '}
            <Link href="/announcements" className="font-semibold text-brand-700 underline">announcements page</Link>.
          </p>
        )}

        {state.status === 'ready' && state.items.length === 0 && (
          <p className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-sm text-gray-700">
            There are no announcements at the moment. Please check back soon.
          </p>
        )}

        {state.status === 'ready' && state.items.length > 0 && (
          <ul className="grid gap-4 md:grid-cols-3">
            {state.items.map((a, i) => (
              <Reveal as="li" key={a._id} delay={i * 0.08} className="rf-card p-6 transition-shadow hover:shadow-card-hover">
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rasi-700">
                  <FaBullhorn aria-hidden="true" /> {a.type || 'general'}
                </p>
                <h3 className="font-sans text-base font-semibold text-gray-900">{a.title}</h3>
                {a.content && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{a.content}</p>}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function Home() {
  const hasTestimonials = [...TESTIMONIALS.students, ...TESTIMONIALS.colleges].length > 0;

  return (
    <Layout
      title="Home"
      description="Rasi Foundation - career guidance and education consultancy in Tamil Nadu. Expert counselling for college admissions, career choices and scholarships."
      keywords="NEET counseling, medical college admission Tamil Nadu, engineering admission guidance, MBA admission consultant, career counselor Rasipuram, Namakkal education consultancy"
    >
      <h1 className="sr-only">Rasi Foundation: career guidance and college admission support in Tamil Nadu</h1>

      {/* Homepage sequence follows the supplied reference. */}
      <HeroCarousel />
      <DistrictExplorer />
      <AdmissionJourney />
      <CollegeShowcase />
      <FeatureCollage />

      <section aria-labelledby="courses-heading" className="relative overflow-hidden bg-[#fffdfa] py-14 md:py-16">
        <div className="container mx-auto px-4">
          <Reveal className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={eyebrow}>Courses</p>
              <h2 id="courses-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Explore Popular Courses</h2>
              <p className="mt-2 max-w-xl text-sm text-gray-600">Choose from a wide range of undergraduate and postgraduate programs.</p>
            </div>
            <Link href="/courses" className="rf-btn-outline self-start whitespace-nowrap px-4 py-2.5 text-xs sm:self-auto">View All Courses <FaArrowRight aria-hidden="true" /></Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {COURSE_CATEGORIES.map(({ icon: Icon, name, courses, src, region, color }, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <Link href="/courses" className={`course-card course-${color} group relative flex min-h-[220px] overflow-hidden rounded-2xl border border-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2`}>
                  <span className="absolute inset-y-0 right-0 w-[48%] overflow-hidden" style={{ clipPath: 'polygon(22% 0,100% 0,100% 100%,0 100%)' }}>
                    <BannerCrop src={src} alt="" region={region} fill sizes="(min-width: 1280px) 14vw, (min-width: 640px) 40vw, 60vw" className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
                  </span>
                  <span className="relative z-10 flex w-[64%] flex-col items-start justify-center p-5 pr-3">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-xl shadow-sm"><Icon aria-hidden="true" /></span>
                    <span className="font-heading text-lg font-bold text-gray-900">{name}</span>
                    <span className="mt-2 text-xs leading-relaxed text-gray-700">{courses.join(' · ')}</span>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-rasi-700">Explore <FaArrowRight aria-hidden="true" /></span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <style jsx>{`
          .course-gold{background:#fff7e9}.course-red{background:#fff0f2}.course-green{background:#eef8f3}.course-rose{background:#fff2f3}
          .course-gold .rounded-xl{color:#ab6900}.course-red .rounded-xl,.course-rose .rounded-xl{color:#a20d28}.course-green .rounded-xl{color:#075544}
        `}</style>
      </section>
      {/* 6. Scholarship support: image is a crop of the supplied student banner artwork */}
      <section aria-labelledby="scholarship-heading" className="bg-brand-50/60 py-16">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <Reveal className="relative aspect-[840/580] overflow-hidden rounded-3xl bg-brand-100 shadow-card-hover">
            <Image
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a college campus"
              width={2048}
              height={768}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="absolute max-w-none"
              style={{ width: '238.1%', height: 'auto', left: '-104.76%', top: '-20.7%' }}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading id="scholarship-heading" label="Scholarship Support" title="Scholarship information and guidance">
              We help students find out about scholarship options and take the Rasi Foundation scholarship test. Eligibility and
              outcomes depend on each scholarship&apos;s own rules; we cannot guarantee a scholarship, financial assistance or admission.
            </SectionHeading>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/scholarship-test" className="rf-btn-primary px-6 py-3">
                Explore Scholarship Support <FaArrowRight aria-hidden="true" />
              </Link>
              <Link href="/practice-test" className="rf-btn-outline px-6 py-3">
                Try the Practice Test
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <VisionMission />

      {/* 7. Student success: verified testimonials when configured, otherwise a service-benefits section */}
      {hasTestimonials ? (
        <Testimonials />
      ) : (
        <section aria-labelledby="benefits-heading" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <Reveal>
              <SectionHeading id="benefits-heading" label="Guidance for families" title="How we support students and parents" center />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {[['For students', FaUserGraduate, BENEFITS.students], ['For parents', FaHandHoldingHeart, BENEFITS.parents]].map(([title, Icon, items], i) => (
                <Reveal key={title} delay={i * 0.08} className="rf-card p-8">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-xl text-brand-700">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="font-sans text-xl font-semibold text-gray-900">{title}</h3>
                  <ul className="mt-4 space-y-3">
                    {items.map((t) => (
                      <li key={t} className="flex items-start gap-3 text-gray-700">
                        <FaCheckCircle className="mt-1 shrink-0 text-brand-600" aria-hidden="true" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Latest updates (existing announcements API) */}
      <LatestAnnouncements />

      {/* 9. Final call to action (footer follows from Layout) */}
      <section aria-labelledby="cta-heading" className="bg-white pb-16 pt-4">
        <div className="container mx-auto px-4">
          <Reveal className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-12 text-center text-white md:px-16">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <h2 id="cta-heading" className="font-heading text-3xl font-bold md:text-4xl">
              Ready to plan your next step?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Book a counselling session for course and college guidance, or send us a general enquiry.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3">
                <FaCalendarCheck aria-hidden="true" /> Book Counselling
              </Link>
              <Link href={ROUTES.enquiry} className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-brand-900">
                <FaRegCommentDots aria-hidden="true" /> Enquiry
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
