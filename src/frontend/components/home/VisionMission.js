import { useEffect, useState } from 'react';
import { FaEye, FaBullseye, FaPause, FaPlay } from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';
import { usePrefersReducedMotion } from './Marquee';

const SLIDES = [
  { src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', alt: 'Students walking together on a college campus', region: { x: 1000, y: 0, w: 688, h: 750 } },
  { src: '/images/banners/hero-4-step-into-brighter-future.png', alt: 'Students walking along a campus path', region: { x: 1150, y: 345, w: 330, h: 360 } },
  { src: '/images/banners/hero-3-explore-perfect-course.png', alt: 'A historic college building among trees', region: { x: 1640, y: 110, w: 360, h: 393 } },
];

function Card({ icon: Icon, title, children, tone }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl p-7 text-white shadow-card-hover ${tone}`}>
      <span aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
      <span className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-xl"><Icon aria-hidden="true" /></span>
      <h3 className="relative font-heading text-2xl font-bold">{title}</h3>
      <p className="relative mt-3 leading-relaxed text-white/90">{children}</p>
    </div>
  );
}

// Vision and mission wording is carried over from the existing About page.
export default function VisionMission() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || paused || hover) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [reduced, paused, hover]);

  return (
    <section aria-labelledby="vm-heading" className="relative overflow-hidden bg-white py-16">
      <div className="container mx-auto px-4">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="rf-eyebrow">Our purpose</p>
          <h2 id="vm-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Vision and mission</h2>
        </Reveal>
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_minmax(0,22rem)_1fr]">
          <Reveal>
            <Card icon={FaBullseye} title="Our Mission" tone="bg-brand-800">
              To empower students with the knowledge, guidance and support they need to make informed career decisions and secure
              admissions in institutions that align with their aspirations and potential.
            </Card>
          </Reveal>

          <Reveal delay={0.06} className="order-first lg:order-none">
            <div
              className="relative mx-auto w-full max-w-sm"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
            >
              <div className="relative aspect-[11/12] overflow-hidden rounded-[2rem] shadow-card-hover ring-8 ring-brand-50">
                {SLIDES.map((s, i) => (
                  <div key={s.src} aria-hidden={i !== index} className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}>
                    <BannerCrop src={s.src} alt={i === index ? s.alt : ''} region={s.region} fill sizes="352px" className="h-full w-full" />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play image slideshow' : 'Pause image slideshow'} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">
                  {paused ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
                </button>
                {SLIDES.map((s, i) => (
                  <button key={s.src} type="button" onClick={() => setIndex(i)} aria-label={`Show image ${i + 1} of ${SLIDES.length}`} aria-current={i === index} className={`h-2.5 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 ${i === index ? 'w-7 bg-brand-700' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <Card icon={FaEye} title="Our Vision" tone="bg-rasi-700">
              To be the most trusted and preferred education consultancy, recognised for transforming lives through quality
              guidance and creating successful professionals who contribute to society.
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
