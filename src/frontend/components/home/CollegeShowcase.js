import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUniversity, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Marquee from './Marquee';

const MAX_CARDS = 30;
const NON_TN = /bengaluru|bangalore/i;

// Reuses GET /api/colleges (grouped by `district`, fields: _id, name, location, tneaCode, note).
// The College model has no logo field, so cards show a neutral icon, never an invented logo.
export default function CollegeShowcase() {
  const [state, setState] = useState({ status: 'loading', colleges: [] });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/colleges');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const groups = await res.json();
        const seen = new Set();
        const colleges = [];
        (Array.isArray(groups) ? groups : []).forEach((g) => {
          (g.colleges || []).forEach((c) => {
            const key = (c.name || '').trim().toLowerCase();
            if (!key || seen.has(key)) return;
            // The directory also holds a "Bengaluru Zone" (Karnataka); this section is Tamil Nadu only.
            if (NON_TN.test(`${g.district} ${c.location}`)) return;
            seen.add(key);
            colleges.push({ id: c._id, name: c.name, location: c.location, zone: g.district });
          });
        });
        if (!cancelled) setState({ status: 'ready', colleges: colleges.slice(0, MAX_CARDS) });
      } catch (err) {
        console.error('College showcase failed to load', err);
        if (!cancelled) setState({ status: 'error', colleges: [] });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section aria-labelledby="colleges-heading" className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="rf-eyebrow">Colleges</p>
            <h2 id="colleges-heading" className="font-heading text-3xl font-bold text-gray-900">
              Tamil Nadu colleges in our directory
            </h2>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 self-start rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 sm:self-auto"
          >
            View All Colleges <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        {state.status === 'loading' && (
          <div className="flex gap-4 overflow-hidden" aria-busy="true" aria-label="Loading colleges">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 w-64 shrink-0 animate-pulse rounded-xl border border-gray-200 bg-white" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <p role="alert" className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
            The college list could not be loaded right now. You can still{' '}
            <Link href="/colleges" className="font-semibold text-brand-700 underline">browse all colleges</Link>.
          </p>
        )}

        {state.status === 'ready' && state.colleges.length === 0 && (
          <p className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
            No colleges have been added yet.
          </p>
        )}

        {state.status === 'ready' && state.colleges.length > 0 && (
          <Marquee label="Colleges in our directory" speed={0.5} arrows>
            {state.colleges.map((c) => (
              <article
                key={c.id || c.name}
                className="flex h-28 w-64 shrink-0 gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:w-72"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-brand-600">
                  <FaUniversity className="text-xl" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-sans text-sm font-semibold leading-snug text-gray-900">{c.name}</h3>
                  {c.location && (
                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-gray-600">
                      <FaMapMarkerAlt className="shrink-0 text-gray-400" aria-hidden="true" />
                      <span className="truncate">{c.location}</span>
                    </p>
                  )}
                </div>
              </article>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
