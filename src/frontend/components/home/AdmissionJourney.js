import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  FaBookOpen, FaCreditCard, FaFileAlt, FaFolderOpen,
  FaComments, FaUniversity, FaUserFriends, FaGraduationCap, FaArrowRight,
} from 'react-icons/fa';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';

// The six admission steps, their order, wording and destinations are unchanged (verified workflow).
// Only the visual presentation was redesigned: a connected milestone timeline instead of the old serpentine road.
const STEPS = [
  {
    num: '01',
    title: 'Explore Programs',
    text: 'Browse through our courses and colleges to find the right fit for your future.',
    Icon: FaBookOpen,
    tone: 'maroon',
    href: '/courses',
  },
  {
    num: '02',
    title: 'Make the Payment',
    text: 'Pay the required fee, where applicable, through our secure online payment system.',
    Icon: FaCreditCard,
    tone: 'green',
    href: '/biodata',
  },
  {
    num: '03',
    title: 'Fill the Form',
    text: 'Complete the enquiry or application details to get started.',
    Icon: FaFileAlt,
    tone: 'gold',
    href: '/contact',
  },
  {
    num: '04',
    title: 'Upload Documents',
    text: 'Submit the academic and identification documents needed for verification.',
    Icon: FaFolderOpen,
    tone: 'green',
    href: '/biodata',
  },
  {
    num: '05',
    title: 'Attend Counselling',
    text: 'Get guidance from our experts about course options, college selection, eligibility and more.',
    Icon: FaComments,
    tone: 'maroon',
    href: '/book-counselling',
  },
  {
    num: '06',
    title: 'Admission Guidance',
    text: 'Get help with your next steps and confirmation from the relevant institution.',
    Icon: FaUniversity,
    tone: 'gold',
    href: '/colleges',
  },
];

const TONES = {
  maroon: {
    node: 'border-crimson bg-crimson text-white',
    icon: 'bg-crimson/10 text-crimson',
    hover: 'hover:border-crimson/40',
    active: 'border-crimson/50 shadow-card-hover',
    link: 'text-crimson',
  },
  green: {
    node: 'border-forest bg-forest text-white',
    icon: 'bg-forest/10 text-forest',
    hover: 'hover:border-forest/40',
    active: 'border-forest/50 shadow-card-hover',
    link: 'text-forest',
  },
  gold: {
    node: 'border-[#b77d12] bg-[#c88d1d] text-white',
    icon: 'bg-amber-50 text-[#9a6808]',
    hover: 'hover:border-amber-500/45',
    active: 'border-amber-500/55 shadow-card-hover',
    link: 'text-[#9a6808]',
  },
};

const CYCLE_MS = 3200;

function Node({ step, revealed, reduced, index }) {
  const t = TONES[step.tone];
  return (
    <motion.span
      aria-hidden="true"
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={revealed ? { opacity: 1, scale: 1 } : {}}
      transition={reduced ? { duration: 0 } : { duration: 0.35, delay: 0.1 + index * 0.12, ease: 'easeOut' }}
      className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-bold shadow-sm ring-4 ring-white ${t.node}`}
    >
      <span>{step.num}</span>
    </motion.span>
  );
}

function StepCard({ step, active, revealed, reduced, index, onActivate, onDeactivate }) {
  const t = TONES[step.tone];
  const { Icon } = step;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? { duration: 0 } : { duration: 0.35, delay: 0.15 + index * 0.12, ease: 'easeOut' }}
      className="h-full"
    >
      <Link
        href={step.href}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        className={`group relative flex h-full min-h-[248px] flex-col justify-between overflow-hidden rounded-xl border bg-white p-5 shadow-card transition-all duration-200 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
          active ? t.active : `border-gray-200 ${t.hover} hover:shadow-card-hover`
        }`}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base ${t.icon}`}>
              <Icon aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Step {step.num}
            </span>
          </div>
          <h3 className="mt-3.5 font-heading text-base font-bold leading-snug text-gray-900">
            <span className="sr-only">Step {step.num}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{step.text}</p>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${t.link}`}>
            <span>Proceed to step</span>
            <FaArrowRight
              className="text-[10px] transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AdmissionJourney() {
  const stageRef = useRef(null);
  const revealed = useInView(stageRef, { once: true, margin: '0px 0px -80px 0px' });
  const onScreen = useInView(stageRef, { margin: '0px 0px 0px 0px' });
  const reduced = usePrefersReducedMotion();
  const [cycleIdx, setCycleIdx] = useState(0);
  const [pinnedIdx, setPinnedIdx] = useState(null);

  useEffect(() => {
    if (!revealed || !onScreen || reduced || pinnedIdx !== null) return undefined;
    const id = window.setInterval(() => setCycleIdx((i) => (i + 1) % STEPS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [revealed, onScreen, reduced, pinnedIdx]);

  const activeIdx = pinnedIdx !== null ? pinnedIdx : revealed && !reduced ? cycleIdx : null;

  const fillTransition = reduced ? { duration: 0 } : { duration: 1.4, ease: 'easeOut', delay: 0.1 };

  const stepProps = (idx) => ({
    step: STEPS[idx],
    index: idx,
    active: activeIdx === idx,
    revealed,
    reduced,
  });

  return (
    <section
      aria-labelledby="journey-heading"
      className="relative overflow-hidden border-b border-gray-100 bg-white py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 grid items-end gap-8 lg:mb-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="rf-eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Rasi Foundation Roadmap
            </p>
            <h2 id="journey-heading" className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Your <span className="text-crimson">Admission</span> Journey
            </h2>
            <p className="mt-2 font-heading text-base font-medium text-forest">
              From Enquiry to a Brighter Future — 6 Clear Steps
            </p>
            <div aria-hidden="true" className="mt-3 h-0.5 w-12 bg-forest" />
          </Reveal>

          <Reveal delay={0.06} className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              A simple and transparent process to help you choose the right course, get expert guidance and take your next admission steps with ease.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {[
                [FaUserFriends, 'Expert Guidance'],
                [FaGraduationCap, 'Trusted Colleges'],
                [FaComments, 'End-to-End Support'],
              ].map(([Icon, label]) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-[#f8faf9] px-3 py-1.5 text-xs font-semibold text-gray-800"
                >
                  <Icon className="text-forest" aria-hidden="true" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div ref={stageRef}>
          {/* XL: one connected horizontal milestone line with six steps */}
          <ol className="relative hidden grid-cols-6 gap-4 xl:grid">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[8.333%] right-[8.333%] top-[21px] h-0.5 bg-gray-200"
            >
              <motion.span
                className="absolute inset-0 origin-left bg-forest/45"
                initial={{ scaleX: reduced ? 1 : 0 }}
                animate={revealed ? { scaleX: 1 } : {}}
                transition={fillTransition}
              />
            </span>
            {STEPS.map((step, idx) => (
              <li key={step.title} className="relative flex flex-col items-center">
                <Node {...stepProps(idx)} />
                <div className="mt-4 w-full flex-1">
                  <StepCard
                    {...stepProps(idx)}
                    onActivate={() => setPinnedIdx(idx)}
                    onDeactivate={() => setPinnedIdx(null)}
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* Below XL: connected vertical timeline */}
          <ol className="relative mx-auto max-w-3xl xl:hidden">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 left-[21px] top-6 w-0.5 bg-gray-200"
            >
              <motion.span
                className="absolute inset-0 origin-top bg-forest/45"
                initial={{ scaleY: reduced ? 1 : 0 }}
                animate={revealed ? { scaleY: 1 } : {}}
                transition={fillTransition}
              />
            </span>
            {STEPS.map((step, idx) => (
              <li key={step.title} className="relative flex gap-4 pb-4 last:pb-0 sm:gap-5">
                <Node {...stepProps(idx)} />
                <div className="min-w-0 flex-1">
                  <StepCard
                    {...stepProps(idx)}
                    onActivate={() => setPinnedIdx(idx)}
                    onDeactivate={() => setPinnedIdx(null)}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-gray-200 bg-[#f8faf9] px-6 py-5 sm:flex-row">
          <div>
            <p className="font-heading text-lg font-bold text-gray-900">Need help deciding where to begin?</p>
            <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
              Speak with a Rasi Foundation counsellor for step-by-step admission guidance.
            </p>
          </div>
          <Link href="/book-counselling" className="rf-btn-maroon shrink-0 px-6 py-2.5">
            <span>Start Your Admission Journey</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
