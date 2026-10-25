import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUniversity, FaMapMarkerAlt, FaArrowRight, FaHashtag } from 'react-icons/fa';
import Marquee from './Marquee';
import Reveal from './Reveal';

const MAX_CARDS = 30;
const NON_TN = /bengaluru|bangalore/i;

function CollegeCrest({ logo, index }) {
  const [failed, setFailed] = useState(false);
  const validLogo = typeof logo === 'string' && logo.trim().length > 0 && !failed;

  if (validLogo) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-11 max-w-full object-contain"
        />
      </div>
    );
  }

  const isMaroon = index % 2 === 1;
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
        isMaroon
          ? 'border-crimson/20 bg-crimson/[0.06] text-crimson group-hover:bg-crimson group-hover:text-white'
          : 'border-forest/20 bg-forest/[0.06] text-forest group-hover:bg-forest group-hover:text-white'
      }`}
    >
      <FaUniversity className="text-lg" aria-hidden="true" />
    </div>
  );
}

// Reuses GET /api/colleges (grouped by `district`, fields: _id, name, location, tneaCode, note).
// Shows actual college logo when a valid logo is available; otherwise displays a neutral institutional emblem.
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
            if (NON_TN.test(`${g.district} ${c.location}`)) return;
            seen.add(key);
            colleges.push({
              id: c._id,
              name: c.name,
              location: c.location,
              zone: g.district,
              tneaCode: c.tneaCode || '',
              note: c.note || '',
              logo: c.logo || c.logoUrl || '',
            });
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
    <section
      aria-labelledby="colleges-heading"
      className="relative overflow-hidden border-b border-gray-200/80 bg-[#f8faf9] py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="rf-eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest" />
              College Directory
            </p>
            <h2 id="colleges-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Colleges in Our <span className="text-forest">Directory</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-600">
              Browse verified institutions listed in the Rasi Foundation college directory across Tamil Nadu zones.
            </p>
          </div>
          <Link
            href="/colleges"
            className="rf-btn-outline self-start whitespace-nowrap px-5 py-2.5 text-xs sm:self-auto"
          >
            <span>View All Colleges</span>
            <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        {state.status === 'loading' && (
          <div className="flex gap-4 overflow-hidden py-2" aria-busy="true" aria-label="Loading colleges">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-48 w-64 shrink-0 animate-pulse rounded-xl border border-gray-200 bg-white p-5 sm:w-72"
              />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div role="alert" className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-card">
            The college list could not be loaded right now. You can still{' '}
            <Link href="/colleges" className="font-semibold text-forest underline hover:text-crimson">
              browse all colleges in our directory
            </Link>
            .
          </div>
        )}

        {state.status === 'ready' && state.colleges.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-700 shadow-card">
            No colleges have been added yet. Visit the{' '}
            <Link href="/colleges" className="font-semibold text-forest underline">
              Colleges page
            </Link>{' '}
            to explore listed institutions.
          </div>
        )}

        {state.status === 'ready' && state.colleges.length > 0 && (
          <Marquee label="Colleges in our directory" speed={0.5} arrows className="py-1.5">
            {state.colleges.map((c, idx) => (
              <Link
                key={c.id || c.name}
                href="/colleges"
                aria-label={`View ${c.name} in the college directory`}
                className="group relative flex h-48 w-64 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-left shadow-card transition-all duration-200 hover:border-forest/40 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:w-72"
              >
                {/* Top row: Crest/Logo + Metadata badges */}
                <div className="flex items-start justify-between gap-3">
                  <CollegeCrest logo={c.logo} index={idx} />
                  <div className="flex flex-col items-end gap-1.5">
                    {c.tneaCode && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-amber-200/80 bg-amber-50 px-2 py-0.5 text-[10.5px] font-semibold text-[#8c5d00]">
                        <FaHashtag className="text-[8px]" aria-hidden="true" />
                        TNEA {c.tneaCode}
                      </span>
                    )}
                    {c.zone && (
                      <span className="max-w-[130px] truncate rounded-md bg-gray-100 px-2 py-0.5 text-[10.5px] font-medium text-gray-600">
                        {c.zone.replace(/ District| Zone/i, '')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Middle: College Name */}
                <div className="my-2 min-w-0">
                  <h3 className="line-clamp-2 font-sans text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-forest">
                    {c.name}
                  </h3>
                </div>

                {/* Bottom: Location & Action */}
                <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-2.5 text-xs">
                  {c.location ? (
                    <span className="flex min-w-0 items-center gap-1.5 font-medium text-gray-600">
                      <FaMapMarkerAlt className="shrink-0 text-crimson" aria-hidden="true" />
                      <span className="truncate">{c.location}</span>
                    </span>
                  ) : (
                    <span className="text-gray-400">Tamil Nadu</span>
                  )}
                  <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-forest group-hover:text-crimson">
                    <span>Details</span>
                    <FaArrowRight className="text-[9px] transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
