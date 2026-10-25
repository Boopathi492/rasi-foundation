import { useEffect, useState } from 'react';
import { FaUniversity } from 'react-icons/fa';
import { logoOf } from './collegeUtils';

const SIZES = {
  sm: { box: 'h-11 w-11 rounded-xl', icon: 'text-lg', px: 44 },
  md: { box: 'h-16 w-16 rounded-2xl', icon: 'text-2xl', px: 64 },
  lg: { box: 'h-20 w-20 rounded-2xl', icon: 'text-3xl', px: 80 },
};

/**
 * Shows the college's real logo only when the record has a `logoUrl`/`logo`. If there is none (or it fails to
 * load) a neutral university emblem is shown instead; no logo is ever invented.
 */
export default function CollegeEmblem({ college, size = 'md', className = '' }) {
  const logo = logoOf(college);
  const [failed, setFailed] = useState(false);
  const s = SIZES[size] || SIZES.md;

  useEffect(() => {
    setFailed(false);
  }, [logo]);

  if (logo && !failed) {
    return (
      <span className={`flex shrink-0 items-center justify-center overflow-hidden bg-white p-1.5 ring-4 ring-white ${s.box} ${className}`}>
        {/* Remote logo host is unknown, so a plain <img> (not next/image) is used with a graceful onError fallback. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={`${college.name} logo`}
          width={s.px}
          height={s.px}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-white to-gold-50 text-forest ring-4 ring-white ${s.box} ${s.icon} ${className}`}
    >
      <FaUniversity />
    </span>
  );
}
