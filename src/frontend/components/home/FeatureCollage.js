import Link from 'next/link';
import { FaUserGraduate, FaUniversity, FaFileSignature, FaAward, FaHandsHelping, FaArrowRight } from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';
import { ROUTES } from '@/data/siteConfig';

const MAIN_IMAGE = '/images/banners/hero-3-explore-perfect-course.png';
const SUPPORT_IMAGES = '/images/banners/hero-4-step-into-brighter-future.png';

const POINTS = [
  { icon: FaUserGraduate, title: 'Personalised Career Counselling', text: 'One-to-one sessions to understand your marks, interests and goals.' },
  { icon: FaUniversity, title: 'Right College Selection', text: 'Compare colleges and courses that suit you and your family.' },
  { icon: FaFileSignature, title: 'Admission Application Support', text: 'Help with forms and documents, step by step.' },
  { icon: FaAward, title: 'Scholarship Guidance', text: 'Information on scholarship options you may be eligible for.' },
  { icon: FaHandsHelping, title: 'Continued Student Support', text: 'We stay in touch with students after admission.' },
];

export default function FeatureCollage() {
  return (
    <section aria-labelledby="feature-heading" className="relative overflow-hidden bg-brand-50/60 py-16">
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-brand-100/70" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full border-2 border-gold-300/50" />
      <div className="container relative mx-auto grid items-center gap-12 lg:grid-cols-2">
        {/* One main rounded image with two smaller supporting photos layered over its lower edge. */}
        <Reveal className="relative mx-auto w-full max-w-[34rem] pb-16 sm:pb-20">
          <span aria-hidden="true" className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-gold-300/60" />
          <BannerCrop
            src={MAIN_IMAGE}
            alt="A smiling student holding books on a college campus"
            region={{ x: 880, y: 80, w: 400, h: 500 }}
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="relative mx-auto aspect-[4/4.2] w-[78%] rounded-[2.5rem] shadow-card-hover ring-8 ring-white"
          />
          <div className="absolute bottom-0 left-0 w-[46%]">
          <BannerCrop
            src={SUPPORT_IMAGES}
            alt="A student speaking with a counsellor"
            region={{ x: 1490, y: 58, w: 250, h: 134 }}
            sizes="(min-width: 640px) 240px, 45vw"
            className="w-full rounded-2xl shadow-card-hover ring-4 ring-white"
          />
          </div>
          <div className="absolute bottom-6 right-0 w-[46%] sm:bottom-10">
          <BannerCrop
            src={SUPPORT_IMAGES}
            alt="Students discussing their college choices together"
            region={{ x: 1490, y: 210, w: 250, h: 134 }}
            sizes="(min-width: 640px) 240px, 45vw"
            className="w-full rounded-2xl shadow-card-hover ring-4 ring-white"
          />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="rf-eyebrow">Why students choose us</p>
          <h2 id="feature-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Guidance that stays with you from course choice to campus
          </h2>
          <ul className="mt-6 space-y-3">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="flex items-start gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-card transition-shadow hover:shadow-card-hover">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-700 text-lg text-white">
                  <p.icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.counselling} className="rf-btn-primary px-6 py-3">Book Counselling <FaArrowRight aria-hidden="true" /></Link>
            <Link href="/about" className="rf-btn-outline px-6 py-3">About Rasi Foundation</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
