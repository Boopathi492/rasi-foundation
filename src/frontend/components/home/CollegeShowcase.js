import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUniversity, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Marquee from './Marquee';

const MAX_CARDS = 30;
const NON_TN = /bengaluru|bangalore/i;

// Reuses GET /api/colleges (grouped by `district`, fields: _id, name, location, tneaCode, note).
// The College model has no logo field yet. A card shows a logo only if the API supplies one (logo / logoUrl);
// otherwise it shows a neutral institution icon, never an invented logo.
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
            colleges.push({ id: c._id, name: c.name, location: c.location, zone: g.district, logo: c.logo || c.logoUrl || '' });
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
    <section aria-labelledby="colleges-heading" className="bg-white py-12 md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="rf-eyebrow">College Directory</p>
            <h2 id="colleges-heading" className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Colleges in Our Directory
            </h2>
            <p className="mt-1 text-sm text-gray-600">Browse the colleges listed in the Rasi Foundation directory.</p>
          </div>
          <Link
            href="/colleges"
            className="rf-btn-outline self-start whitespace-nowrap px-4 py-2.5 text-xs sm:self-auto"
          >
            View All Colleges <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        {state.status === 'loading' && (
          <div className="flex gap-4 overflow-hidden" aria-busy="true" aria-label="Loading colleges">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-44 w-52 shrink-0 animate-pulse rounded-xl border border-gray-200 bg-white sm:w-56" />
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
              <Link
                key={c.id || c.name}
                href="/colleges"
                aria-label={`View ${c.name} in the college directory`}
                className="group flex h-44 w-52 shrink-0 flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 sm:w-56"
              >
                <div className="flex h-16 w-full shrink-0 items-center justify-center">
                  {c.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.logo} alt="" loading="lazy" className="max-h-16 max-w-[80%] object-contain" />
                  ) : (
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                      <FaUniversity className="text-2xl" aria-hidden="true" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 w-full">
                  <h3 className="line-clamp-2 font-sans text-[13px] font-semibold leading-snug text-gray-900">{c.name}</h3>
                  {c.location && (
                    <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-gray-600">
                      <FaMapMarkerAlt className="shrink-0 text-rasi-600" aria-hidden="true" />
                      <span className="truncate">{c.location}</span>
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
