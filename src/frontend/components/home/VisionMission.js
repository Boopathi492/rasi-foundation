import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEye, FaBullseye, FaArrowRight, FaCompass, FaAward } from 'react-icons/fa';
import BannerCrop from './BannerCrop';
import Reveal from './Reveal';

const CARDS = [
  {
    tag: '01 • Future Outlook',
    title: 'Our Vision',
    Icon: FaEye,
    BadgeIcon: FaCompass,
    badgeLabel: 'Trusted Career Guidance',
    text: 'To be the most trusted and preferred education consultancy, recognised for transforming lives through quality guidance and creating successful professionals who contribute to society.',
    image: {
      src: '/images/banners/hero-5-students-today-leaders-tomorrow.png',
      alt: 'Students walking together on a college campus',
      region: { x: 860, y: 70, w: 720, h: 360 },
    },
    accentBorder: 'border-t-4 border-t-forest',
    iconClass: 'bg-forest/10 text-forest',
    tagClass: 'bg-forest text-white',
    linkClass: 'text-forest hover:text-crimson',
  },
  {
    tag: '02 • Core Commitment',
    title: 'Our Mission',
    Icon: FaBullseye,
    BadgeIcon: FaAward,
    badgeLabel: 'Student-First Support',
    text: 'To empower students with the knowledge, guidance and support they need to make informed career decisions and secure admissions in institutions that align with their aspirations and potential.',
    image: {
      src: '/images/banners/hero-2-right-guidance.png',
      alt: 'A smiling student holding books on campus',
      region: { x: 820, y: 30, w: 680, h: 340 },
    },
    accentBorder: 'border-t-4 border-t-crimson',
    iconClass: 'bg-crimson/10 text-crimson',
    tagClass: 'bg-crimson text-white',
    linkClass: 'text-crimson hover:text-forest',
  },
];

export default function VisionMission() {
  const [cards, setCards] = useState(CARDS);

  useEffect(() => {
    let active = true;
    fetch('/api/site-settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data?.settings) return;
        const s = data.settings;
        if (s.vision_text || s.mission_text) {
          setCards((prev) =>
            prev.map((c, i) => {
              if (i === 0 && s.vision_text) return { ...c, text: s.vision_text, title: s.vision_title || c.title };
              if (i === 1 && s.mission_text) return { ...c, text: s.mission_text, title: s.mission_title || c.title };
              return c;
            })
          );
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return (
    <section
      aria-labelledby="vm-heading"
      className="relative overflow-hidden border-b border-gray-200/80 bg-[#f8faf9] py-16 md:py-20"
    >
      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="rf-eyebrow">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-crimson" />
              Our Purpose
            </p>
            <h2 id="vm-heading" className="mt-2 font-heading text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Vision and <span className="text-crimson">Mission</span>
            </h2>
            <div aria-hidden="true" className="mt-3 h-0.5 w-12 bg-forest" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              To empower students with the guidance and opportunities to make informed education and career decisions.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <Link
              href="/about"
              className="rf-btn-outline px-5 py-2.5 text-xs sm:text-sm"
            >
              <span>Know More About Us</span>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* Two Balanced Institutional Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {cards.map((card, idx) => {
            const { tag, title, Icon, BadgeIcon, badgeLabel, text, image, accentBorder, iconClass, tagClass, linkClass } = card;
            return (
              <Reveal key={title} delay={idx * 0.08} className="h-full">
                <article
                  className={`group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover ${accentBorder}`}
                >
                  {/* Visual Campus Image Header */}
                  <div className="relative aspect-[2/1] w-full overflow-hidden bg-gray-100">
                    <BannerCrop
                      src={image.src}
                      alt={image.alt}
                      region={image.region}
                      fill
                      sizes="(min-width: 1024px) 560px, 95vw"
                      className="h-full w-full"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
                    />

                    {/* Top-left tag pill */}
                    <span className={`absolute left-4 top-4 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm ${tagClass}`}>
                      {tag}
                    </span>

                    {/* Bottom-right visual badge */}
                    <span className="absolute bottom-3 right-4 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                      <BadgeIcon className="text-forest" aria-hidden="true" />
                      <span>{badgeLabel}</span>
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-lg ${iconClass}`}>
                          <Icon aria-hidden="true" />
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-gray-900">
                          {title}
                        </h3>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                        {text}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-medium text-gray-500">
                      <span>Rasi Foundation • Rasipuram, Tamil Nadu</span>
                      <Link
                        href="/about"
                        className={`inline-flex items-center gap-1.5 font-semibold focus:outline-none focus-visible:underline ${linkClass}`}
                      >
                        <span>Learn more</span>
                        <FaArrowRight className="text-[10px]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
