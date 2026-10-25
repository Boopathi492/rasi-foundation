import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReduced(mq.matches);
      update();
      if (mq.addEventListener) {
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
      } else if (mq.addListener) {
        mq.addListener(update);
        return () => mq.removeListener(update);
      }
    } catch {
      // ignore
    }
  }, []);
  return reduced;
}

/**
 * Continuously scrolling horizontal strip that is also natively scrollable by touch / trackpad.
 * Items are rendered twice so the loop is seamless; the second copy is hidden from assistive tech
 * and removed from the tab order. Auto-scroll pauses on hover, focus, touch, and when off-screen,
 * and is disabled entirely when the user prefers reduced motion.
 */
export default function Marquee({ children, label, speed = 0.5, className = '', arrows = false }) {
  const scrollerRef = useRef(null);
  const cloneRef = useRef(null);
  const pausedRef = useRef(false);
  const inViewRef = useRef(true);
  const posRef = useRef(0);
  const nudgeTimerRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    const measure = () => {
      const items = el.firstElementChild;
      setOverflowing(Boolean(items && items.scrollWidth > el.clientWidth + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  // Remove cloned focusable elements from keyboard tab order
  useEffect(() => {
    const cloneEl = cloneRef.current;
    if (!cloneEl) return;
    const focusables = cloneEl.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    focusables.forEach((node) => node.setAttribute('tabindex', '-1'));
  }, [children, overflowing]);

  // Pause animation loop when off-screen to save CPU/battery
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { rootMargin: '100px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reduced || !overflowing) return undefined;
    let frame;
    let lastTimestamp = 0;
    posRef.current = el.scrollLeft;
    const tick = (timestamp) => {
      if (!pausedRef.current && inViewRef.current) {
        const loop = el.scrollWidth / 2;
        const elapsed = lastTimestamp ? Math.min(timestamp - lastTimestamp, 40) : 16.67;
        posRef.current += speed * (elapsed / 16.67);
        if (posRef.current >= loop) posRef.current -= loop;
        el.scrollLeft = posRef.current;
      } else {
        posRef.current = el.scrollLeft;
      }
      lastTimestamp = timestamp;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(nudgeTimerRef.current);
    };
  }, [reduced, overflowing, speed]);

  // Keep manual scrolling inside the seamless loop
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !overflowing) return;
    const loop = el.scrollWidth / 2;
    if (el.scrollLeft >= loop) el.scrollLeft -= loop;
    else if (el.scrollLeft <= 0 && pausedRef.current) el.scrollLeft += loop;
    if (pausedRef.current) posRef.current = el.scrollLeft;
  };

  // Mouse drag-to-scroll
  const dragRef = useRef(null);
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return;
    dragRef.current = { x: e.clientX, left: scrollerRef.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!dragRef.current) return;
    scrollerRef.current.scrollLeft = dragRef.current.left - (e.clientX - dragRef.current.x);
  };
  const endDrag = () => { dragRef.current = null; };

  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    pausedRef.current = true;
    window.clearTimeout(nudgeTimerRef.current);
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.6), behavior: reduced ? 'auto' : 'smooth' });
    nudgeTimerRef.current = window.setTimeout(() => {
      posRef.current = el.scrollLeft;
      pausedRef.current = false;
    }, reduced ? 0 : 480);
  };

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const arrowBtn =
    'absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-gray-700 shadow-sm transition-colors duration-150 hover:border-forest hover:bg-forest hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700';

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`flex overflow-x-auto overscroll-x-contain py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-rasi-600 rounded-xl ${className}`}
      >
        <div className="flex shrink-0 gap-4 pr-4">{children}</div>
        {overflowing && (
          <div ref={cloneRef} className="flex shrink-0 gap-4 pr-4" aria-hidden="true" data-marquee-clone>
            {children}
          </div>
        )}
      </div>
      {arrows && overflowing && (
        <>
          <button
            type="button"
            aria-label="Scroll backward"
            onClick={() => nudge(-1)}
            className={`${arrowBtn} left-1`}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Scroll forward"
            onClick={() => nudge(1)}
            className={`${arrowBtn} right-1`}
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
