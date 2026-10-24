import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
import { HERO_SLIDES } from '@/data/siteConfig';
import { usePrefersReducedMotion } from './Marquee';

const INTERVAL_MS = 5500;
const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2';

// The banner artwork is 2048x768 and carries its own text. On desktop it is shown whole. On narrow
// screens the viewport is taller and shows the left part of the artwork (where the text sits) so the
// text stays legible instead of shrinking to an unreadable strip.
export default function HeroCarousel({ slides = HERO_SLIDES }) {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(() => new Set([0, 1]));
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchStartX = useRef(null);
  const count = slides.length;

  const go = useCallback(
    (i) => {
      const next = ((i % count) + count) % count;
      setIndex(next);
      // Mount the following slide's image ahead of time so transitions never show an empty frame
      setSeen((prev) => new Set(prev).add(next).add((next + 1) % count));
    },
    [count]
  );

  const autoPlay = !reduced && !userPaused && !hovered && !focused && count > 1;

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

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-800 shadow-sm transition-colors hover:bg-brand-50 ' +
    focusRing;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Rasi Foundation highlights"
      className="container mx-auto px-4 pt-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
      onKeyDown={onKeyDown}
    >
      <div
        className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-brand-50 shadow-lg ring-1 ring-black/5 md:aspect-[2048/768] md:rounded-3xl"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
          touchStartX.current = null;
        }}
      >
        <div aria-live={autoPlay ? 'off' : 'polite'}>
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!active}
                className={`absolute inset-0 ${active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'} transition-opacity ${reduced ? 'duration-0' : 'duration-700 ease-in-out'}`}
              >
                {/* Image box: full width on md+, full height (cropped from the right) on mobile */}
                <div className="absolute left-0 top-0 h-full aspect-[2048/768] md:static md:h-auto md:w-full">
                  {seen.has(i) && (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 767px) 215vw, 1200px"
                      className="object-cover"
                    />
                  )}
                  {/* Real link laid over the CTA button that is drawn in the artwork */}
                  <Link
                    href={slide.cta.href}
                    tabIndex={active ? 0 : -1}
                    aria-label={slide.cta.label}
                    className="absolute rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-800"
                    style={{
                      left: `${slide.cta.box.left}%`,
                      top: `${slide.cta.box.top}%`,
                      width: `${slide.cta.box.width}%`,
                      height: `${slide.cta.box.height}%`,
                    }}
                  >
                    <span className="sr-only">{slide.cta.label}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className={btn}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1} of ${count}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-brand-700' : 'w-2.5 bg-brand-200 hover:bg-brand-400'} ${focusRing}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className={btn}>
            <FaChevronRight aria-hidden="true" />
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? 'Play automatic slide rotation' : 'Pause automatic slide rotation'}
              className={btn}
            >
              {userPaused ? <FaPlay aria-hidden="true" /> : <FaPause aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
