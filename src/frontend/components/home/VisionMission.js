import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye, FaBullseye, FaPause, FaPlay, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';

// Square crops of the supplied banner photography (2000 x 750 grid), chosen to avoid baked-in banner text.
const SLIDES = [
  { src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', alt: 'Students walking together on a college campus', region: { x: 900, y: 100, w: 580, h: 580 } },
  { src: '/images/banners/hero-4-step-into-brighter-future.png', alt: 'Students walking along a campus path', region: { x: 1120, y: 320, w: 380, h: 380 } },
  { src: '/images/banners/hero-2-right-guidance.png', alt: 'A smiling student holding books on campus', region: { x: 880, y: 60, w: 420, h: 420 } },
];

const INTERVAL_MS = 5000;

function PurposeCard({ icon: Icon, title, shape, className, children }) {
  return (
    <article className={`relative flex flex-col justify-center overflow-hidden px-7 py-8 text-white shadow-[0_18px_40px_rgba(15,40,30,0.22)] sm:px-8 lg:min-h-[300px] lg:py-10 ${shape} ${className}`}>
      <span aria-hidden="true" className="absolute -right-12 -top-14 h-44 w-44 rounded-full border border-white/20" />
      <span aria-hidden="true" className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full border border-gold-300/30" />
      <span className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xl text-white">
        <Icon aria-hidden="true" />
      </span>
      <h3 className="relative font-heading text-2xl font-bold">{title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-white/90">{children}</p>
    </article>
  );
}

export default function VisionMission() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = SLIDES.length;
  const go = useCallback((i) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (reduced || paused || hover) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduced, paused, hover, count]);

  const ctrl = 'flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 text-xs text-brand-900 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700';

  return (
    <section aria-labelledby="vm-heading" className="relative overflow-hidden bg-gradient-to-br from-[#fff7f5] via-[#fffdfa] to-[#fdf6e4] py-14 md:py-20">
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gold-200/40 blur-2xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-rasi-100/60 blur-2xl" />
      <div className="container relative mx-auto grid items-center gap-10 xl:grid-cols-[0.55fr_2fr] xl:gap-6">
        <Reveal>
          <p className="rf-eyebrow">Our Purpose</p>
          <h2 id="vm-heading" className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">Vision and Mission</h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-rasi-700" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600">
            To empower students with the guidance and opportunities to make informed education and career decisions.
          </p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 rounded-full border border-rasi-600 bg-white px-5 py-2.5 text-xs font-semibold text-rasi-700 transition-colors hover:bg-rasi-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rasi-700 focus-visible:ring-offset-2">
            Know More About Us <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-0">
          <Reveal className="lg:z-0 lg:-mr-12 lg:flex-1">
            <PurposeCard icon={FaEye} title="Our Vision" shape="rounded-[2rem] lg:rounded-[2rem_3.5rem_3.5rem_2rem]" className="bg-gradient-to-br from-[#0a6a52] to-[#054534] lg:pr-16">
              To be the most trusted and preferred education consultancy, recognised for transforming lives through quality guidance and creating successful professionals who contribute to society.
            </PurposeCard>
          </Reveal>

          <Reveal delay={0.06} className="relative z-10 mx-auto w-full max-w-[300px] shrink-0 lg:w-[300px]">
            <div
              className="relative aspect-square overflow-hidden rounded-full border-[10px] border-white bg-brand-100 shadow-[0_20px_50px_rgba(20,60,50,.28)] ring-1 ring-gold-300"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(false); }}
            >
              {SLIDES.map((slide, i) => (
                <div key={slide.src} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}>
                  <BannerCrop src={slide.src} alt={i === index ? slide.alt : ''} region={slide.region} fill sizes="300px" className="h-full w-full" />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous image" className={ctrl}><FaChevronLeft aria-hidden="true" /></button>
                <button type="button" disabled={reduced} onClick={() => setPaused((value) => !value)} aria-label={reduced ? 'Automatic slideshow disabled by reduced-motion preference' : paused ? 'Play image slideshow' : 'Pause image slideshow'} className={`${ctrl} disabled:cursor-default disabled:opacity-70`}>
                  {paused || reduced ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
                </button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next image" className={ctrl}><FaChevronRight aria-hidden="true" /></button>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-2" role="group" aria-label="Choose campus image">
              {SLIDES.map((slide, i) => (
                <button key={slide.src} type="button" onClick={() => go(i)} aria-label={`Show image ${i + 1} of ${count}`} aria-current={i === index} className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 ${i === index ? 'w-6 bg-rasi-700' : 'w-2 bg-gray-300'}`} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:z-0 lg:-ml-12 lg:flex-1">
            <PurposeCard icon={FaBullseye} title="Our Mission" shape="rounded-[2rem] lg:rounded-[3.5rem_2rem_2rem_3.5rem]" className="bg-gradient-to-br from-[#a8112c] to-[#7d0a1f] lg:pl-16">
              To empower students with the knowledge, guidance and support they need to make informed career decisions and secure admissions in institutions that align with their aspirations and potential.
            </PurposeCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
