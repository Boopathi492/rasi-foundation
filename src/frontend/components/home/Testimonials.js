import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaQuoteLeft, FaUserGraduate, FaRegCommentDots,
  FaCalendarCheck, FaCheckCircle, FaArrowRight,
} from 'react-icons/fa';
import { TESTIMONIALS, ROUTES } from '@/data/siteConfig';
import Marquee from './Marquee';
import Reveal from './Reveal';
import FeedbackModal from '@/frontend/components/feedback/FeedbackModal';

const TABS = [
  { key: 'students', label: 'Student Feedback' },
  { key: 'colleges', label: 'Institution Feedback' },
];

export default function Testimonials({ data = TESTIMONIALS, showEmptyState = false }) {
  const [feedbackData, setFeedbackData] = useState(data);
  const available = TABS.filter((t) => (feedbackData[t.key] || []).length > 0);
  const [tab, setTab] = useState(available[0]?.key || 'students');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  // Dynamic fetch of approved testimonials from MongoDB backend
  useEffect(() => {
    let active = true;
    fetch('/api/feedback')
      .then((res) => (res.ok ? res.json() : null))
      .then((resData) => {
        if (!active || !resData || !Array.isArray(resData.data)) return;
        if (resData.data.length > 0) {
          const liveApproved = resData.data.map((f) => ({
            name: f.name,
            quote: f.message,
            role: f.category === 'student' ? 'Student' : 'Parent',
            institution: f.relatedCourse || f.relation || 'Rasi Mentee',
            photo: null,
          }));
          setFeedbackData((prev) => ({
            ...prev,
            students: [...liveApproved, ...(prev.students || [])],
          }));
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const items = feedbackData[tab] || [];
  const hasItems = available.length > 0 && items.length > 0;

  if (!hasItems && !showEmptyState) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden border-b border-gray-100 bg-[#f8faf9] py-16 md:py-20"
    >
      <div className="container mx-auto px-4">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="rf-eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest" />
              Student Testimonials
            </p>
            <h2 id="testimonials-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Student &amp; Family <span className="text-forest">Feedback</span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-gray-600">
              Verified experiences shared by students and parents who have used Rasi Foundation&apos;s admission counselling services.
            </p>
          </div>

          {available.length > 1 && (
            <div role="tablist" aria-label="Testimonial category" className="inline-flex self-start rounded-lg border border-gray-200 bg-white p-1 shadow-sm sm:self-auto">
              {available.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  type="button"
                  aria-selected={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                    tab === t.key ? 'bg-forest text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </Reveal>

        {hasItems ? (
          <Marquee label="Verified student testimonials" speed={0.5} arrows className="py-1.5">
            {items.map((item, idx) => (
              <figure
                key={`${item.name}-${idx}`}
                className="flex w-80 shrink-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-card transition-all duration-200 hover:border-forest/35 hover:shadow-card-hover sm:w-96"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-sm text-forest">
                      <FaQuoteLeft aria-hidden="true" />
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-forest">
                      <FaCheckCircle className="text-[10px]" aria-hidden="true" />
                      Verified
                    </span>
                  </div>
                  <blockquote className="text-sm leading-relaxed text-gray-700">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                  {item.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.photo}
                      alt={item.name}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover ring-1 ring-gray-200"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-white">
                      <FaUserGraduate aria-hidden="true" />
                    </span>
                  )}
                  <div className="min-w-0 text-xs">
                    <p className="truncate font-bold text-gray-900">{item.name}</p>
                    {(item.role || item.institution) && (
                      <p className="truncate text-gray-500">
                        {[item.role, item.institution].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            ))}
          </Marquee>
        ) : (
          /* Authentic institutional empty state when no verified written-consent testimonials are configured */
          <Reveal className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-card sm:p-8 md:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-forest/20 bg-[#f3f8f5] px-3 py-1 text-xs font-semibold text-forest">
                  <FaCheckCircle aria-hidden="true" />
                  <span>Authentic Feedback Policy</span>
                </div>
                <h3 className="mt-3 font-heading text-2xl font-bold text-gray-900">
                  We publish only verified student and parent feedback
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                  Rasi Foundation is committed to transparent, honest guidance. Student testimonials appear here once written consent and admission details are verified. Attended a counselling session with us? We would love to hear about your experience.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row lg:justify-end">
                <button
                  type="button"
                  onClick={() => setFeedbackModalOpen(true)}
                  className="rf-btn-outline px-5 py-2.5 text-xs sm:text-sm"
                >
                  <FaRegCommentDots aria-hidden="true" />
                  <span>Share Feedback</span>
                </button>
                <Link
                  href={ROUTES.counselling}
                  className="rf-btn-primary px-5 py-2.5 text-xs sm:text-sm"
                >
                  <FaCalendarCheck aria-hidden="true" />
                  <span>Book Counselling</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {/* Accessible Centred Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </section>
  );
}
