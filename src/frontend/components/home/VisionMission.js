import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEye, FaBullseye, FaPause, FaPlay } from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';

const SLIDES = [
  { src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', alt: 'Students together on a college campus', region: { x: 790, y: 60, w: 660, h: 650 } },
  { src: '/images/banners/hero-4-step-into-brighter-future.png', alt: 'Students talking together on campus', region: { x: 1230, y: 170, w: 480, h: 360 } },
  { src: '/images/banners/hero-1-tamil-campus-admissions.png', alt: 'A student on a college campus', region: { x: 760, y: 20, w: 540, h: 700 } },
];

function PurposeCard({ icon: Icon, title, tone, children }) {
  return (
    <article className={`purpose-card purpose-${tone} relative flex min-h-[260px] flex-col justify-center overflow-hidden rounded-[2rem] px-6 py-7 text-white shadow-lg sm:px-7`}>
      <span aria-hidden="true" className="absolute -right-10 -top-12 h-40 w-40 rounded-full border border-white/20" />
      <Icon className="relative mb-5 text-2xl text-white/90" aria-hidden="true" />
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

  useEffect(() => {
    if (reduced || paused || hover) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % SLIDES.length), 5000);
    return () => clearInterval(timer);
  }, [reduced, paused, hover]);

  return (
    <section aria-labelledby="vm-heading" className="relative overflow-hidden bg-[#fffdfa] py-14 md:py-16">
      <div className="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-[0.72fr_2fr] lg:gap-10">
        <Reveal>
          <p className="rf-eyebrow">Our Purpose</p>
          <h2 id="vm-heading" className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">Vision and Mission</h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-rasi-700" />
          <p className="mt-5 text-sm leading-relaxed text-gray-600">To empower students with the guidance and opportunities to make informed education and career decisions.</p>
          <Link href="/about" className="rf-btn-outline mt-6 px-4 py-2.5 text-xs">Know More About Us <span aria-hidden="true">→</span></Link>
        </Reveal>

        <div className="grid items-center gap-4 sm:grid-cols-[1fr_0.9fr_1fr] sm:gap-3 xl:gap-5">
          <Reveal>
            <PurposeCard icon={FaEye} title="Our Vision" tone="green">
              To be the most trusted and preferred education consultancy, recognised for transforming lives through quality guidance and creating successful professionals who contribute to society.
            </PurposeCard>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mx-auto w-full max-w-[290px]">
              <div
                className="relative aspect-square overflow-hidden rounded-full border-[9px] border-white bg-brand-100 shadow-[0_15px_40px_rgba(20,60,50,.20)] ring-1 ring-brand-100"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onFocus={() => setHover(true)}
                onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(false); }}
              >
                {SLIDES.map((slide, i) => (
                  <div key={slide.src} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}>
                    <BannerCrop src={slide.src} alt={i === index ? slide.alt : ''} region={slide.region} fill sizes="(min-width: 1280px) 260px, (min-width: 640px) 25vw, 80vw" className="h-full w-full" />
                  </div>
                ))}
                <button type="button" disabled={reduced} onClick={() => setPaused((value) => !value)} aria-label={reduced ? 'Automatic slideshow disabled by reduced-motion preference' : paused ? 'Play image slideshow' : 'Pause image slideshow'} className="absolute bottom-5 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-brand-900 shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 disabled:cursor-default disabled:opacity-70">
                  {paused || reduced ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
                </button>
              </div>
              <div className="mt-3 flex justify-center gap-2" aria-label="Choose campus image">
                {SLIDES.map((slide, i) => <button key={slide.src} type="button" onClick={() => setIndex(i)} aria-label={`Show image ${i + 1} of ${SLIDES.length}`} aria-current={i === index} className={`h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 ${i === index ? 'w-6 bg-brand-700' : 'w-2 bg-gray-300'}`} />)}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <PurposeCard icon={FaBullseye} title="Our Mission" tone="red">
              To empower students with the knowledge, guidance and support they need to make informed career decisions and secure admissions in institutions that align with their aspirations and potential.
            </PurposeCard>
          </Reveal>
        </div>
      </div>
      <style jsx>{`.purpose-green{background:#075544}.purpose-red{background:#9f0c29}@media(max-width:639px){.purpose-card{min-height:0}}`}</style>
    </section>
  );
}
