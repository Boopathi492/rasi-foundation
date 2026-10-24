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
  const reduced = usePrefersReducedMotion();
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;
    const measure = () => setOverflowing(el.scrollWidth / 2 > el.clientWidth + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || reduced || !overflowing) return undefined;
    let frame;
    posRef.current = el.scrollLeft;
    const tick = () => {
      if (!pausedRef.current) {
        const loop = el.scrollWidth / 2;
        posRef.current += speed;
        if (posRef.current >= loop) posRef.current -= loop;
        el.scrollLeft = posRef.current;
      } else {
        posRef.current = el.scrollLeft; // keep in sync with manual scrolling
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, overflowing, speed, children]);

  // Keep manual scrolling inside the seamless loop
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !overflowing) return;
    const loop = el.scrollWidth / 2;
    if (el.scrollLeft >= loop) el.scrollLeft -= loop;
    else if (el.scrollLeft <= 0 && pausedRef.current) el.scrollLeft += loop;
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
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.6), behavior: reduced ? 'auto' : 'smooth' });
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
