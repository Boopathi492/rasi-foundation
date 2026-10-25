import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaChevronDown, FaUserTie } from 'react-icons/fa';
import Reveal from '../home/Reveal';
import { usePrefersReducedMotion } from '../home/Marquee';
import { LEADERSHIP } from '@/data/leadership';

function Portrait({ leader }) {
  if (leader.photo) {
    return (
      <div className="relative h-36 w-36 overflow-hidden rounded-full ring-4 ring-white shadow-card-hover sm:h-40 sm:w-40">
        <Image src={leader.photo} alt={leader.photoAlt || leader.name} fill sizes="160px" loading="lazy" className="object-cover" />
      </div>
    );
  }
  // Neutral, clearly labelled placeholder: no photograph has been supplied yet.
  return (
    <div
      role="img"
      aria-label={`Portrait of ${leader.name} not yet available`}
      className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-dashed border-forest/30 bg-gradient-to-br from-forest/10 to-gold-300/20 text-forest ring-4 ring-white sm:h-40 sm:w-40"
    >
      <FaUserTie aria-hidden="true" className="text-4xl" />
      <span className="mt-1 px-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-forest/80">Photo to be added</span>
    </div>
  );
}

function ProfileCard({ leader, index }) {
  const [open, setOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const panelId = `leader-more-${leader.id}`;
  const extra = (leader.more || []).filter(Boolean);

  return (
    <Reveal delay={index * 0.12} className="h-full">
      <article
        aria-labelledby={`leader-name-${leader.id}`}
        className="relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-white via-white to-[#f4f9f6] p-6 pt-8 text-center shadow-card sm:p-8"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-forest via-gold-400 to-crimson" />
        <motion.div
          animate={reduced ? undefined : { y: [0, -4, 0] }}
          transition={reduced ? undefined : { duration: 6, ease: 'easeInOut', repeat: Infinity }}
        >
          <Portrait leader={leader} />
        </motion.div>
        <h3 id={`leader-name-${leader.id}`} className="mt-5 font-heading text-2xl font-bold text-gray-900">{leader.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-crimson">{leader.designation}</p>
        {leader.credentials && (
          <p className="mt-2 inline-block rounded-full bg-forest/10 px-3 py-0.5 text-xs font-semibold text-forest">{leader.credentials}</p>
        )}
        <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-700">{leader.bio}</p>

        <div id={panelId} hidden={!open} className="mt-4 w-full max-w-md space-y-3 text-left text-sm leading-relaxed text-gray-700">
          {extra.map((p) => <p key={p}>{p}</p>)}
          {leader.message && (
            <blockquote className="border-l-4 border-gold-400 pl-3 italic text-gray-700">{leader.message}</blockquote>
          )}
          {leader.tel && (
            <a href={`tel:${leader.tel}`} className="inline-flex items-center gap-1.5 font-semibold text-forest hover:underline">
              <FaPhoneAlt aria-hidden="true" className="text-xs" /> {leader.phone}
            </a>
          )}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-forest/30 px-4 py-1.5 text-xs font-bold text-forest transition-colors hover:bg-forest hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
        >
          {open ? 'Read less' : 'Read more'}
          <FaChevronDown aria-hidden="true" className={`text-[10px] transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`} />
        </button>
      </article>
    </Reveal>
  );
}

export default function Leadership() {
  return (
    <section aria-labelledby="leadership-heading" className="bg-white py-14 md:py-16">
      <div className="container mx-auto">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="rf-eyebrow justify-center">Leadership</p>
          <h2 id="leadership-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Founder &amp; Director</h2>
          <p className="mt-3 text-gray-600">The people who lead Rasi Foundation and its day-to-day service to students and families.</p>
        </Reveal>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {LEADERSHIP.map((leader, i) => <ProfileCard key={leader.id} leader={leader} index={i} />)}
        </div>
      </div>
    </section>
  );
}
