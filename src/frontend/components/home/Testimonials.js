import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS } from '@/data/siteConfig';
import { usePrefersReducedMotion } from './Marquee';

const TABS = [
  { key: 'students', label: 'Student feedback' },
  { key: 'colleges', label: 'College feedback' },
];

// Renders nothing until verified testimonials exist in TESTIMONIALS (src/data/siteConfig.js).
export default function Testimonials({ data = TESTIMONIALS }) {
  const available = TABS.filter((t) => (data[t.key] || []).length > 0);
  const [tab, setTab] = useState(available[0]?.key);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const items = data[tab] || [];
  const count = items.length;

  useEffect(() => { setIndex(0); }, [tab]);

  useEffect(() => {
    if (reduced || paused || count < 2) return undefined;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(t);
  }, [reduced, paused, count]);

  if (available.length === 0) return null;
  const current = items[index % count];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-white py-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="rf-eyebrow">Testimonials</p>
        <h2 id="testimonials-heading" className="mb-6 font-heading text-3xl font-bold text-gray-900">
          What they say about Rasi Foundation
        </h2>

        {available.length > 1 && (
          <div role="tablist" aria-label="Testimonial category" className="mb-6 inline-flex rounded-lg border border-gray-200 p-1">
            {available.map((t) => (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${tab === t.key ? 'bg-brand-700 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <figure className="rounded-2xl border border-gray-200 bg-gray-50 p-8" aria-live={paused || reduced ? 'polite' : 'off'}>
          <FaQuoteLeft className="mx-auto mb-4 text-2xl text-brand-300" aria-hidden="true" />
          <blockquote className="text-lg leading-relaxed text-gray-800">{current.quote}</blockquote>
          <figcaption className="mt-5 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{current.name}</span>
            {current.role && <span>, {current.role}</span>}
            {current.institution && <span> · {current.institution}</span>}
          </figcaption>
        </figure>

        {count > 1 && (
          <div className="mt-5 flex items-center justify-center gap-3">
            <button type="button" aria-label="Previous testimonial" onClick={() => setIndex((index - 1 + count) % count)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              <FaChevronLeft aria-hidden="true" />
            </button>
            <span className="text-sm text-gray-600" aria-hidden="true">{index + 1} / {count}</span>
            <button type="button" aria-label="Next testimonial" onClick={() => setIndex((index + 1) % count)} className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
