import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaUserGraduate, FaUniversity, FaFileSignature,
  FaAward, FaHandsHelping, FaArrowRight, FaCheckCircle,
} from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';
import { ROUTES } from '@/data/siteConfig';

const COLLAGE_IMAGES = {
  primary: {
    src: '/images/banners/hero-3-explore-perfect-course.png',
    alt: 'A smiling student holding books on a college campus',
    region: { x: 880, y: 60, w: 420, h: 520 },
  },
  topRight: {
    src: '/images/banners/hero-4-step-into-brighter-future.png',
    alt: 'A student speaking with a career counsellor one-to-one',
    region: { x: 1490, y: 58, w: 250, h: 134 },
  },
  bottomLeft: {
    src: '/images/banners/hero-4-step-into-brighter-future.png',
    alt: 'Students discussing their college choices together',
    region: { x: 1490, y: 210, w: 250, h: 134 },
  },
  bottomRight: {
    src: '/images/banners/hero-5-students-today-leaders-tomorrow.png',
    alt: 'Smiling students walking together on a college campus',
    region: { x: 890, y: 90, w: 540, h: 450 },
  },
};

const POINTS = [
  { icon: FaUserGraduate, title: 'Personalised Career Counselling', text: 'One-to-one sessions to understand your marks, interests and goals.' },
  { icon: FaUniversity, title: 'Right College Selection', text: 'Compare colleges and courses that suit you and your family.' },
  { icon: FaFileSignature, title: 'Admission Application Support', text: 'Help with forms and documents, step by step.' },
  { icon: FaAward, title: 'Scholarship Guidance', text: 'Information on scholarship options you may be eligible for.' },
  { icon: FaHandsHelping, title: 'Continued Student Support', text: 'We stay in touch with students after admission.' },
];

export default function FeatureCollage() {
  const reduced = usePrefersReducedMotion();

  const layerAnim = (delay, x = 0, y = 16) => ({
    initial: reduced ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x, y, scale: 0.96 },
    whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
    viewport: { once: true, margin: '0px 0px -60px 0px' },
    transition: reduced ? { duration: 0 } : { duration: 0.55, delay, ease: 'easeOut' },
  });

  return (
    <section
      aria-labelledby="feature-heading"
      className="relative overflow-hidden border-b border-gray-100 bg-white py-16 md:py-20"
    >
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:gap-14">
        {/* Left: Layered 4-Image Collage */}
        <div className="relative mx-auto w-full max-w-[33rem] pt-6 pb-20 sm:pt-8 sm:pb-24">
          {/* Subtle neutral frame */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[8%] top-[10%] h-[74%] w-[76%] rounded-2xl border border-gray-200 bg-[#f8faf9]"
          />

          {/* Image 1: Primary Focal Portrait */}
          <motion.div
            {...layerAnim(0.05, 0, 14)}
            className="relative z-10 ml-[6%] w-[68%] sm:ml-[8%] sm:w-[66%]"
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-gray-200 sm:p-2">
              <BannerCrop
                src={COLLAGE_IMAGES.primary.src}
                alt={COLLAGE_IMAGES.primary.alt}
                region={COLLAGE_IMAGES.primary.region}
                sizes="(min-width: 1024px) 380px, 65vw"
                className="w-full rounded-lg"
              />
            </div>
          </motion.div>

          {/* Image 2: Top-Right Supporting Layer (1-on-1 Counselling) */}
          <motion.div
            {...layerAnim(0.14, 10, -8)}
            className="absolute right-0 top-0 z-20 w-[46%] sm:w-[45%]"
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-gray-200">
              <BannerCrop
                src={COLLAGE_IMAGES.topRight.src}
                alt={COLLAGE_IMAGES.topRight.alt}
                region={COLLAGE_IMAGES.topRight.region}
                sizes="(min-width: 640px) 250px, 45vw"
                className="w-full rounded-lg"
              />
              <p className="mt-1.5 px-1 pb-0.5 text-[10.5px] font-semibold text-crimson sm:text-[11px]">
                1-to-1 Career Counselling
              </p>
            </div>
          </motion.div>

          {/* Image 3: Bottom-Left Supporting Layer (Course & College Comparison) */}
          <motion.div
            {...layerAnim(0.22, -10, 10)}
            className="absolute bottom-3 left-0 z-20 w-[46%] sm:bottom-5 sm:w-[45%]"
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-gray-200">
              <BannerCrop
                src={COLLAGE_IMAGES.bottomLeft.src}
                alt={COLLAGE_IMAGES.bottomLeft.alt}
                region={COLLAGE_IMAGES.bottomLeft.region}
                sizes="(min-width: 640px) 250px, 45vw"
                className="w-full rounded-lg"
              />
              <p className="mt-1.5 px-1 pb-0.5 text-[10.5px] font-semibold text-forest sm:text-[11px]">
                Informed Course Selection
              </p>
            </div>
          </motion.div>

          {/* Image 4: Bottom-Right Supporting Layer (Campus Community) */}
          <motion.div
            {...layerAnim(0.3, 10, 10)}
            className="absolute bottom-0 right-1 z-30 w-[44%] sm:right-2 sm:w-[43%]"
          >
            <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-md ring-1 ring-gray-200">
              <BannerCrop
                src={COLLAGE_IMAGES.bottomRight.src}
                alt={COLLAGE_IMAGES.bottomRight.alt}
                region={COLLAGE_IMAGES.bottomRight.region}
                sizes="(min-width: 640px) 240px, 44vw"
                className="w-full rounded-lg"
              />
              <div className="mt-1.5 flex items-center justify-between px-1 pb-0.5">
                <span className="text-[10.5px] font-semibold text-gray-800 sm:text-[11px]">Campus Ready</span>
                <FaCheckCircle className="text-[11px] text-forest" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Why Students Choose Us Content */}
        <Reveal delay={0.08}>
          <p className="rf-eyebrow">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
            Why students choose us
          </p>
          <h2 id="feature-heading" className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Guidance that stays with you from{' '}
            <span className="text-forest">course choice</span> to{' '}
            <span className="text-crimson">campus</span>
          </h2>
          <div aria-hidden="true" className="mt-3 h-0.5 w-12 bg-forest" />

          <ul className="mt-6 space-y-3">
            {POINTS.map((p, i) => {
              const isMaroon = i % 2 === 1;
              return (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 0.05}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-[#f8faf9] p-4 transition-colors duration-150 hover:border-forest/35 hover:bg-white"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base ${
                      isMaroon ? 'bg-crimson/10 text-crimson' : 'bg-forest/10 text-forest'
                    }`}
                  >
                    <p.icon aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-sans text-[15px] font-bold text-gray-900">{p.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href={ROUTES.counselling} className="rf-btn-primary px-6 py-2.5">
              <span>Book Counselling</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
            <Link href="/about" className="rf-btn-outline px-6 py-2.5">
              About Rasi Foundation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
