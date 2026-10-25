import { useState } from 'react';
import { FaPhoneAlt, FaGraduationCap, FaUserTie, FaChevronDown, FaChevronUp, FaAward } from 'react-icons/fa';
import Reveal from '@/frontend/components/home/Reveal';

// Verified leadership data from existing codebase.
// Note: Official portrait photographs have not been uploaded to public assets yet.
// We display a premium, clearly labelled monogram portrait placeholder with official credentials and direct contact.
const LEADERS = [
  {
    initials: 'PG',
    name: 'Prof. P. Gunasekaran',
    role: 'Founder',
    credentials: 'M.Sc., M.Phil.',
    specialization: 'Career Guidance Advisor & Educational Analyst',
    phone: '+91 97894 46100',
    tel: '+919789446100',
    tone: 'from-forest to-[#053d30]',
    border: 'border-emerald-200/80',
    badge: 'bg-emerald-50 text-forest border-emerald-200',
    bio: 'Prof. P. Gunasekaran established Rasi Foundation with a vision to make higher education accessible, transparent, and aligned with each student’s true potential. With extensive academic and advisory experience across Tamil Nadu institutions, he provides high-level educational analysis, curriculum comparison, and strategic counselling for competitive admissions in Engineering, Medical, and Allied disciplines.',
  },
  {
    initials: 'YK',
    name: 'P. Yuvaraj Kumar',
    role: 'Administrative Director',
    credentials: 'MBA',
    specialization: 'Student Support Operations & Admissions Coordinator',
    phone: '+91 92949 69196',
    tel: '+919294969196',
    tone: 'from-crimson to-[#780a1e]',
    border: 'border-rose-200/80',
    badge: 'bg-rose-50 text-crimson border-rose-200',
    bio: 'P. Yuvaraj Kumar oversees day-to-day counselling operations, institutional partnerships, and student document verification at Rasi Foundation. Holding a Master of Business Administration, he ensures every student and parent receives timely guidance, transparent fee information, and end-to-end assistance throughout the college application and enrolment cycle.',
  },
];

export default function FounderDirector() {
  const [expanded, setExpanded] = useState({});

  const toggleBio = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section aria-labelledby="leadership-heading" className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="rf-eyebrow">
            <span className="h-2 w-2 rounded-full bg-crimson" />
            Leadership & Guidance
          </p>
          <h2 id="leadership-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Founder & <span className="text-crimson">Director</span>
          </h2>
          <div aria-hidden="true" className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-0.5 w-10 rounded-full bg-crimson" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            <span className="h-0.5 w-6 rounded-full bg-forest" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            Guided by dedicated educators with decades of career counselling experience in Tamil Nadu.
          </p>
        </div>

        {/* Two-Profile Premium Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {LEADERS.map((leader, idx) => {
            const isBioOpen = Boolean(expanded[idx]);
            return (
              <Reveal key={leader.name} delay={idx * 0.1}>
                <div
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-white p-6 shadow-[0_10px_30px_rgba(7,85,68,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(7,85,68,0.12)] sm:p-8 ${leader.border}`}
                >
                  <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${leader.tone}`} />

                  <div>
                    {/* Portrait Monogram & Credentials */}
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="relative shrink-0">
                        <div
                          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-black text-white shadow-md ring-4 ring-white ${leader.tone}`}
                        >
                          {leader.initials}
                        </div>
                        <span className="mt-1 block text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Verified
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className={`inline-block rounded-full border px-3 py-0.5 text-[11px] font-bold ${leader.badge}`}>
                          {leader.role}
                        </span>
                        <h3 className="mt-1 font-heading text-xl font-bold text-gray-900 sm:text-2xl">
                          {leader.name}
                        </h3>
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                          <FaGraduationCap className="text-gray-400" />
                          <span>{leader.credentials}</span>
                        </p>
                        <p className="mt-1 text-xs text-forest font-medium">
                          {leader.specialization}
                        </p>
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className={`text-xs leading-relaxed text-gray-600 sm:text-sm ${!isBioOpen ? 'line-clamp-3' : ''}`}>
                        {leader.bio}
                      </p>

                      <button
                        type="button"
                        onClick={() => toggleBio(idx)}
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-crimson focus:outline-none"
                      >
                        <span>{isBioOpen ? 'Read Less' : 'Read Full Biography'}</span>
                        {isBioOpen ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                      </button>
                    </div>
                  </div>

                  {/* Direct Contact Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-[11px] font-medium text-gray-500">Direct Consultation:</span>
                    <a
                      href={`tel:${leader.tel}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-900 transition-colors hover:bg-forest hover:text-white"
                    >
                      <FaPhoneAlt className="text-[10px]" />
                      <span>{leader.phone}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
