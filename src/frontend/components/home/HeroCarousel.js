import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronLeft, FaChevronRight, FaArrowRight,
  FaGraduationCap, FaUserTie, FaAward, FaFileSignature,
  FaCog, FaStethoscope, FaFlask, FaBalanceScale,
} from 'react-icons/fa';
import { HERO_SLIDES } from '@/data/siteConfig';
import BannerCrop from './BannerCrop';
import { usePrefersReducedMotion } from './Marquee';

const INTERVAL_MS = 5500;
const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2';

// Verified slide metadata matching the exact text and crops in the 3 banner artworks for mobile readability
const SLIDE_META = {
  'tamil-guidance': {
    badge: 'உங்கள் கனவுகள்... எங்கள் வழிகாட்டுதல்...',
    title: 'உங்கள் கல்வி பயணத்திற்கு நம்பிக்கையான துணை',
    subtitle: 'சிறந்த கல்லூரி தேர்வு முதல் உங்கள் கனவு தொழில்வரை நாங்கள் உங்களுடன்...',
    region: { x: 850, y: 20, w: 680, h: 520 },
    pills: [
      { icon: FaGraduationCap, label: 'கல்லூரி சேர்க்கை', href: '/colleges' },
      { icon: FaUserTie, label: 'தொழில் வழிகாட்டுதல்', href: '/book-counselling' },
      { icon: FaAward, label: 'உதவித்தொகை வழிகாட்டுதல்', href: '/scholarship-test' },
      { icon: FaFileSignature, label: 'தனிப்பயன் கவனிப்பு', href: '/book-counselling' },
    ],
  },
  'brighter-future': {
    badge: 'College Admissions • Career Guidance • Scholarships',
    title: 'Step Into Your Brighter Future',
    subtitle: 'Right Guidance • Right College • Right Career. We support students at every step — from choosing the right course to getting admission in the right college.',
    region: { x: 760, y: 40, w: 680, h: 520 },
    pills: [
      { icon: FaCog, label: 'Engineering', href: '/courses' },
      { icon: FaStethoscope, label: 'Medical', href: '/courses' },
      { icon: FaFlask, label: 'Arts & Science', href: '/courses' },
      { icon: FaBalanceScale, label: 'Law', href: '/courses' },
    ],
  },
  'students-tomorrow': {
    badge: 'Students Today, Leaders Tomorrow',
    title: 'உங்கள் கனவுக்கு சரியான பாதை இங்கே...',
    subtitle: 'சிறந்த கல்லூரிகள், சரியான படிப்பு தேர்வு, உதவித்தொகை வாய்ப்புகள் மற்றும் தனிப்பயன் வழிகாட்டுதல்.',
    region: { x: 840, y: 40, w: 860, h: 650 },
    pills: [
      { icon: FaUserTie, label: 'Career Counselling', href: '/book-counselling' },
      { icon: FaAward, label: 'Scholarship Support', href: '/scholarship-test' },
      { icon: FaGraduationCap, label: 'College Directory', href: '/colleges' },
      { icon: FaFileSignature, label: 'Admission Assistance', href: '/contact' },
    ],
  },
};

export default function HeroCarousel({ slides = HERO_SLIDES }) {
  const [carouselSlides, setCarouselSlides] = useState(slides);
  const [index, setIndex] = useState(0);
  // Load only the first slide on initial render; preload the next slide after mount
  const [seen, setSeen] = useState(() => new Set([0]));
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchStartX = useRef(null);
  const count = carouselSlides.length;

  // Dynamically load active MongoDB-managed banners from /api/banners
  useEffect(() => {
    let active = true;
    fetch('/api/banners?placement=home_hero')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data || !Array.isArray(data.banners) || data.banners.length === 0) return;
        const valid = data.banners.filter((b) => b.desktopImageUrl || b.mobileImageUrl);
        if (valid.length > 0) {
          const dynamicList = valid.map((b, i) => ({
            id: String(b.id || `banner-${i}`),
            src: b.desktopImageUrl || b.mobileImageUrl,
            mobileSrc: b.mobileImageUrl || b.desktopImageUrl,
            alt: b.altText || b.title || 'Rasi Foundation banner',
            title: b.title,
            description: b.description || '',
            cta: {
              label: b.ctaText || 'Learn More',
              href: b.ctaUrl || '/book-counselling',
              box: { left: 4.1, top: 78.67, width: 29.25, height: 10.93 },
            },
            isDynamic: true,
          }));
          setCarouselSlides(dynamicList);
          setIndex(0);
          setSeen(new Set([0]));
        }
      })
      .catch(() => {
        // Retain fallback to static HERO_SLIDES
      });

    return () => {
      active = false;
    };
  }, []);

  // Preload the second slide gently after initial hydration so first paint prioritises slide 0
  useEffect(() => {
    if (count < 2) return undefined;
    const timer = window.setTimeout(() => {
      setSeen((prev) => new Set(prev).add(1));
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [count]);

  const go = useCallback(
    (i) => {
      const next = ((i % count) + count) % count;
      setIndex(next);
      setSeen((prev) => new Set(prev).add(next).add((next + 1) % count));
    },
    [count]
  );

  // Rotation keeps running automatically (no visible pause control). It pauses while the visitor hovers or focuses
  // the banner, and under prefers-reduced-motion the slides still advance but swap instantly, without any transition.
  const autoPlay = !hovered && !focused && count > 1;

  useEffect(() => {
    if (!autoPlay) return undefined;
    const t = setInterval(() => go(index + 1), INTERVAL_MS);
    return () => clearInterval(t);
  }, [autoPlay, go, index]);

  if (count === 0) return null;

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  };

  const activeSlide = carouselSlides[index] || carouselSlides[0] || {};
  const activeMeta = SLIDE_META[activeSlide.id] || {
    badge: activeSlide.description || 'College Admissions • Career Guidance • Scholarships',
    title: activeSlide.title || 'Step Into Your Brighter Future',
    subtitle: activeSlide.description || 'Personalised career guidance and college admissions support.',
    pills: [
      { icon: FaGraduationCap, label: 'College Directory', href: '/colleges' },
      { icon: FaUserTie, label: 'Career Counselling', href: '/book-counselling' },
      { icon: FaAward, label: 'Scholarship Support', href: '/scholarship-test' },
      { icon: FaFileSignature, label: 'Admission Assistance', href: '/contact' },
    ],
  };

  const navBtn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-800 shadow-md transition-colors duration-150 hover:border-forest hover:bg-forest hover:text-white md:h-11 md:w-11 ' +
    focusRing;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Rasi Foundation highlights"
      className="relative w-full overflow-hidden border-b border-gray-200/80 bg-[#f8faf9]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative mx-auto w-full max-w-[1920px]"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
      >
        {/* DESKTOP & TABLET BANNER (md+): Preserves full 2048x768 banner artwork with clean transitions */}
        <div className="relative hidden w-full overflow-hidden bg-gray-100 md:block md:aspect-[2048/768]">
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className={`${navBtn} absolute left-3 top-1/2 z-20 -translate-y-1/2 lg:left-5`}
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className={`${navBtn} absolute right-3 top-1/2 z-20 -translate-y-1/2 lg:right-5`}
              >
                <FaChevronRight aria-hidden="true" />
              </button>
            </>
          )}

          <div aria-live={autoPlay ? 'off' : 'polite'} className="relative h-full w-full">
            {carouselSlides.map((slide, i) => {
              const active = i === index;
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={!active}
                  className={`absolute inset-0 ${
                    active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
                  } transition-opacity ${reduced ? 'duration-0' : 'duration-500 ease-out'}`}
                >
                  <div className="relative h-full w-full">
                    {seen.has(i) && (
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        unoptimized={Boolean(slide.isDynamic)}
                        priority={i === 0}
                        sizes="100vw"
                        className="object-cover"
                      />
                    )}
                    {/* Interactive CTA overlay aligned over the artwork button */}
                    <Link
                      href={slide.cta?.href || '/book-counselling'}
                      tabIndex={active ? 0 : -1}
                      aria-label={slide.cta?.label || 'Learn More'}
                      className="group/cta absolute rounded-full transition-shadow duration-200 hover:ring-2 hover:ring-white/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
                      style={{
                        left: `${slide.cta?.box?.left ?? 4.1}%`,
                        top: `${slide.cta?.box?.top ?? 78.67}%`,
                        width: `${slide.cta?.box?.width ?? 29.25}%`,
                        height: `${slide.cta?.box?.height ?? 10.93}%`,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="block h-full w-full rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover/cta:opacity-100"
                      />
                      <span className="sr-only">{slide.cta?.label || 'Learn More'}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Controls Overlay (Dots) */}
          {count > 1 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-center justify-center px-6">
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                {carouselSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-200 ${focusRing} ${
                      i === index ? 'w-6 bg-crimson' : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MOBILE HERO (< md): Clean portrait crop + legible Tamil & English typography */}
        <div className="px-3 py-4 md:hidden">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
            {/* Student/Campus Image Reveal */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
                  className="h-full w-full"
                >
                  {activeMeta?.region && !activeSlide.isDynamic ? (
                    <BannerCrop
                      src={activeSlide.src}
                      alt={activeSlide.alt}
                      region={activeMeta.region}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="h-full w-full"
                    />
                  ) : (
                    <Image
                      src={activeSlide.mobileSrc || activeSlide.src}
                      alt={activeSlide.alt}
                      fill
                      unoptimized={Boolean(activeSlide.isDynamic)}
                      priority={index === 0}
                      sizes="100vw"
                      className="h-full w-full object-cover"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    aria-label="Previous slide"
                    className="absolute left-2.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-xs text-gray-800 shadow-sm"
                  >
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    aria-label="Next slide"
                    className="absolute right-2.5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-xs text-gray-800 shadow-sm"
                  >
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Text, Feature Icons & CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
                className="p-4 sm:p-5"
              >
                <span className="inline-block rounded-md border border-forest/20 bg-[#f3f8f5] px-2.5 py-1 text-xs font-semibold leading-normal tracking-normal text-forest">
                  {activeMeta.badge}
                </span>

                <h2 className="mt-2.5 font-heading text-xl font-bold leading-[1.42] tracking-normal text-gray-900 sm:text-2xl">
                  {activeMeta.title}
                </h2>

                <p className="mt-2 text-[13.5px] leading-[1.65] tracking-normal text-gray-600 sm:text-sm">
                  {activeMeta.subtitle}
                </p>

                {/* 4 Quick Feature Pills */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {activeMeta.pills.map(({ icon: PillIcon, label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/80 px-2.5 py-2 text-xs font-medium tracking-normal text-gray-800 transition-colors hover:border-forest/40 hover:bg-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest/10 text-forest">
                        <PillIcon aria-hidden="true" />
                      </span>
                      <span className="truncate leading-normal">{label}</span>
                    </Link>
                  ))}
                </div>

                {/* Primary Mobile CTA */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Link
                    href={activeSlide.cta?.href || '/book-counselling'}
                    className="rf-btn-maroon flex-1 py-2.5 text-sm tracking-normal"
                  >
                    <span>{activeSlide.cta?.label || 'Learn More'}</span>
                    <FaArrowRight className="text-[11px]" aria-hidden="true" />
                  </Link>
                </div>

                {/* Mobile Pagination Dots */}
                {count > 1 && (
                  <div className="mt-3.5 flex items-center justify-center gap-2">
                    {carouselSlides.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => go(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index}
                        className={`h-2 rounded-full transition-all ${
                          i === index ? 'w-5 bg-crimson' : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
