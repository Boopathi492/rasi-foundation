import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'framer-motion';
import {
  FaBookOpen, FaLayerGroup, FaMapMarkedAlt, FaRoute,
  FaCalendarCheck, FaRegCommentDots, FaArrowRight,
} from 'react-icons/fa';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';
import { ROUTES, TN_DISTRICTS } from '@/data/siteConfig';

// Verified figures derived directly from the project's actual course, stream, district and roadmap data
const VERIFIED_STATS = [
  {
    id: 'courses',
    target: 61,
    suffix: '',
    label: 'Courses Listed',
    detail: 'UG, PG & Diploma programs across major career streams',
    Icon: FaBookOpen,
    accent: 'text-gold-300 bg-white/10 border-white/20',
  },
  {
    id: 'streams',
    target: 7,
    suffix: '',
    label: 'Academic Streams',
    detail: 'Medical, Engineering, Management, Law, Arts, Education & Agri',
    Icon: FaLayerGroup,
    accent: 'text-emerald-300 bg-white/10 border-white/20',
  },
  {
    id: 'districts',
    target: TN_DISTRICTS.length,
    suffix: '',
    label: 'TN Districts Covered',
    detail: 'Admission guidance accessible across all Tamil Nadu districts',
    Icon: FaMapMarkedAlt,
    accent: 'text-rose-200 bg-white/10 border-white/20',
  },
  {
    id: 'stages',
    target: 6,
    suffix: '-Step',
    label: 'Admission Roadmap',
    detail: 'Structured support from course exploration to college guidance',
    Icon: FaRoute,
    accent: 'text-gold-300 bg-white/10 border-white/20',
  },
];

function AnimatedCounter({ target, suffix = '', inView, reduced }) {
  const [display, setDisplay] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimatedRef.current) return undefined;
    hasAnimatedRef.current = true;

    if (reduced) {
      setDisplay(target);
      return undefined;
    }

    let rafId;
    const duration = 1350;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, reduced, target]);

  return (
    <span>
      {reduced || hasAnimatedRef.current ? display : 0}
      {suffix}
    </span>
  );
}

export default function StatsBanner() {
  const bannerRef = useRef(null);
  const inView = useInView(bannerRef, { once: true, margin: '0px 0px -60px 0px' });
  const reduced = usePrefersReducedMotion();

  return (
    <section
      ref={bannerRef}
      aria-labelledby="stats-banner-heading"
      className="relative overflow-hidden border-y border-[#054235] bg-[#075544] py-16 text-white md:py-20"
    >
      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-gold-300">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Student Achievements &amp; Admission Support
            </p>
            <h2
              id="stats-banner-heading"
              className="mt-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl"
            >
              Structured Guidance Across Every Stage of Admission
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
              We connect students and families with verified course information, directory colleges and one-to-one counselling across Tamil Nadu.
            </p>
          </Reveal>

          {/* Two Prominent CTA Buttons */}
          <Reveal delay={0.08} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href={ROUTES.counselling}
              className="rf-btn-gold px-6 py-3 text-sm"
            >
              <FaCalendarCheck aria-hidden="true" />
              <span>Book Counselling</span>
            </Link>
            <Link
              href={ROUTES.enquiry}
              className="rf-btn border border-white/35 bg-white/10 px-6 py-3 text-sm text-white hover:bg-white/20 focus-visible:ring-white focus-visible:ring-offset-forest"
            >
              <FaRegCommentDots aria-hidden="true" />
              <span>Make an Enquiry</span>
              <FaArrowRight className="text-xs" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Balanced Horizontal Counter Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VERIFIED_STATS.map(({ id, target, suffix, label, detail, Icon }, idx) => (
            <Reveal
              key={id}
              delay={idx * 0.06}
              className="flex flex-col justify-between rounded-xl border border-white/15 bg-white/[0.06] p-6 transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.1]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg text-gold-300">
                  <Icon aria-hidden="true" />
                </span>
                <span className="font-display text-4xl font-bold tracking-tight text-white">
                  <AnimatedCounter target={target} suffix={suffix} inView={inView} reduced={reduced} />
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-sans text-base font-bold text-white">{label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/75">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-white/70">
          Admission and scholarship decisions are made by respective institutions and awarding bodies according to their official eligibility criteria.
        </p>
      </div>
    </section>
  );
}
