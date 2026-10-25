import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import BannerCrop from '../home/BannerCrop';
import { usePrefersReducedMotion } from '../home/Marquee';
import { ROUTES } from '@/data/siteConfig';

// About hero: restrained entrance (heading fade-up, image wipe-reveal). Transform/opacity/clip-path only;
// all motion is skipped when the visitor prefers reduced motion.
export default function AboutHero() {
  const reduced = usePrefersReducedMotion();
  const enter = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0 } : { duration: 0.6, ease: 'easeOut', delay },
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-dark via-forest to-[#0a6a52] text-white">
      <span aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full border border-gold-300/30" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-crimson/40" />

      <div className="container relative mx-auto grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p {...enter(0)} className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">
            About Rasi Foundation
          </motion.p>
          <motion.h1 {...enter(0.08)} className="mt-2 max-w-3xl font-heading text-4xl font-bold leading-tight md:text-5xl">
            Shaping futures through guidance
          </motion.h1>
          <motion.div {...enter(0.14)} aria-hidden="true" className="mt-4 flex items-center gap-2">
            <span className="h-0.5 w-14 rounded-full bg-gold-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          </motion.div>
          <motion.p {...enter(0.2)} className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Think Admission! Think RASI!! We help students choose the right course and college, and support them through admission.
          </motion.p>
          <motion.div {...enter(0.28)} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3">
              <FaCalendarCheck aria-hidden="true" /> Book Counselling
            </Link>
            <Link href="/colleges" className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">
              Explore Colleges
            </Link>
            <Link href={ROUTES.enquiry} className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-gold-300 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
              Contact Us <FaArrowRight aria-hidden="true" className="text-xs" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, clipPath: reduced ? 'inset(0 0 0 0 round 2rem)' : 'inset(0 100% 0 0 round 2rem)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0 0 round 2rem)' }}
          transition={reduced ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          <BannerCrop
            src="/images/banners/hero-1-tamil-campus-admissions.png"
            alt="A smiling student holding books in front of a college building"
            region={{ x: 900, y: 60, w: 480, h: 480 }}
            sizes="(min-width: 1024px) 28rem, 24rem"
            priority
            className="aspect-square rounded-[2rem] shadow-2xl ring-4 ring-white/80"
          />
          <span className="absolute -bottom-4 -left-3 flex h-20 w-20 items-center justify-center rounded-full bg-white p-1.5 shadow-xl ring-2 ring-gold-300 sm:h-24 sm:w-24">
            <Image src="/rasi-logo.png" alt="Rasi Foundation logo" width={96} height={96} className="h-full w-full rounded-full object-contain" />
          </span>
        </motion.div>
      </div>
      <svg aria-hidden="true" className="relative block h-6 w-full text-[#fbfaf6] md:h-8" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path d="M0 40V18C240 0 480 36 720 22C960 8 1200 34 1440 12V40Z" fill="currentColor" />
      </svg>
    </section>
  );
}
