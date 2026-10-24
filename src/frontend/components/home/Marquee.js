import { useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Continuously scrolling horizontal strip that is also natively scrollable by touch / trackpad.
 * Items are rendered twice so the loop is seamless; the second copy is hidden from assistive tech
 * and removed from the tab order. Auto-scroll pauses on hover, focus, and touch, and is disabled
 * entirely when the user prefers reduced motion.
 */
export default function Marquee({ children, label, speed = 0.5, className = '', arrows = false }) {
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const nudgeTimerRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    // Measure the original item set. Before the clone is rendered, scrollWidth is
    // only one set wide, so dividing it by two incorrectly disables many tickers.
    const measure = () => {
      const items = el.firstElementChild;
      setOverflowing(Boolean(items && items.scrollWidth > el.clientWidth + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reduced || !overflowing) return undefined;
    let frame;
    let lastTimestamp = 0;
    posRef.current = el.scrollLeft;
    const tick = (timestamp) => {
      if (!pausedRef.current) {
        const loop = el.scrollWidth / 2;
        const elapsed = lastTimestamp ? Math.min(timestamp - lastTimestamp, 40) : 16.67;
        posRef.current += speed * (elapsed / 16.67);
        if (posRef.current >= loop) posRef.current -= loop;
        el.scrollLeft = posRef.current;
      } else {
        posRef.current = el.scrollLeft; // keep in sync with manual scrolling
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
    // Only follow manual scrolling. While auto-scrolling, scrollLeft is rounded by the browser and
    // copying it back would swallow the sub-pixel steps, so slow tickers would never move.
    if (pausedRef.current) posRef.current = el.scrollLeft;
  };

  // Mouse drag-to-scroll (touch and trackpad already scroll natively)
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
    }, reduced ? 0 : 450);
  };

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

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
      className={`flex overflow-x-auto overscroll-x-contain py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-rasi-600 ${className}`}
    >
      <div className="flex shrink-0 gap-4 pr-4">{children}</div>
      {overflowing && (
        <div className="flex shrink-0 gap-4 pr-4" aria-hidden="true" data-marquee-clone>
          {children}
        </div>
      )}
    </div>
    {arrows && overflowing && (
      <>
        <button type="button" aria-label="Scroll backward" onClick={() => nudge(-1)} className="absolute left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-800 shadow-card hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">&#8249;</button>
        <button type="button" aria-label="Scroll forward" onClick={() => nudge(1)} className="absolute right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-800 shadow-card hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">&#8250;</button>
      </>
    )}
    </div>
  );
}
