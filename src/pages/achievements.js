import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FaTrophy,
  FaUserGraduate,
  FaUniversity,
  FaStar,
  FaArrowRight,
  FaMedal,
  FaAward,
  FaHandshake,
  FaChartLine,
  FaHeart,
  FaUsers,
  FaGraduationCap,
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaCheckCircle,
  FaSpinner,
  FaCalendarCheck,
  FaPhoneAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import { ROUTES, CONTACT } from '@/data/siteConfig';

export default function Achievements() {
  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const [data, setData] = useState({
    stats: [],
    milestones: [],
    recognitions: [],
    placements: [],
    spotlights: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      const result = await response.json();
      setData(result || {});
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReact = async (id) => {
    try {
      // Optimistic update
      const newData = { ...data };
      Object.keys(newData).forEach((key) => {
        if (Array.isArray(newData[key])) {
          const item = newData[key].find((a) => a._id === id);
          if (item) item.reactions = (item.reactions || 0) + 1;
        }
      });
      setData(newData);

      await fetch('/api/achievements/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  const statIcons = [FaUserGraduate, FaUniversity, FaTrophy, FaStar];
  const milestoneIcons = [FaHeart, FaChartLine, FaUserGraduate, FaHandshake, FaTrophy, FaMedal];
  const recognitionIcons = [FaTrophy, FaStar, FaAward, FaMedal];
  const placementIcons = [FaStethoscope, FaCog, FaChartLine, FaBalanceScale, FaGraduationCap, FaUsers];

  const hasAchievements =
    (data.stats && data.stats.length > 0) ||
    (data.milestones && data.milestones.length > 0) ||
    (data.recognitions && data.recognitions.length > 0) ||
    (data.placements && data.placements.length > 0) ||
    (data.spotlights && data.spotlights.length > 0);

  return (
    <Layout
      title="Achievements & Milestones — Rasi Foundation"
      description="Explore Rasi Foundation's track record of educational guidance, institutional partnerships, and student admissions in top engineering, medical, and professional colleges."
      keywords="education consultancy achievements, MBBS admission success, engineering placement stories, career guidance milestones, education excellence"
    >
      {/* 1. Premium Hero Banner (Left Content & CTAs, Right Verified Visual Composition) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f2f9f5] via-[#fbfaf6] to-[#fff6f7] py-14 md:py-20">
        <span aria-hidden="true" className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-forest/5 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-crimson/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Side: Heading, Description & Working CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#9a6300]">
                <FaTrophy className="text-xs text-gold-500" aria-hidden="true" />
                <span>Excellence &amp; Milestones</span>
              </div>

              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-5xl">
                The Legacy of <span className="text-crimson">Guidance</span> &amp;{' '}
                <span className="text-forest">Student Success</span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Since 2010, Rasi Foundation has empowered ambitious students across Tamil Nadu to secure admissions
                into premier engineering, medical, management, and arts institutions with honest, merit-based counselling.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href={ROUTES.counselling} className="rf-btn-primary !rounded-full px-6 py-3.5 text-sm">
                  <FaCalendarCheck aria-hidden="true" />
                  <span>Book Counselling</span>
                </Link>
                <Link href="/courses" className="rf-btn-outline !rounded-full px-6 py-3.5 text-sm">
                  <span>Explore Courses</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
                <a href={`tel:${CONTACT.phoneTel}`} className="rf-phone-link !py-2.5 !px-4">
                  <FaPhoneAlt className="text-forest text-xs" aria-hidden="true" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-gray-200/80 pt-6">
                <div>
                  <p className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">15+ Years</p>
                  <p className="text-[11px] font-medium text-gray-500 sm:text-xs">Academic Guidance</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-forest sm:text-2xl">Verified</p>
                  <p className="text-[11px] font-medium text-gray-500 sm:text-xs">Institutional Advice</p>
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-crimson sm:text-2xl">100% Free</p>
                  <p className="text-[11px] font-medium text-gray-500 sm:text-xs">Initial Consultation</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Animated Visual Composition with Verified Project Assets */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md">
                {/* Decorative border backdrop */}
                <div aria-hidden="true" className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-forest/15 via-gold-400/20 to-crimson/15 blur-lg" />

                <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-3 shadow-[0_20px_50px_rgba(7,85,68,0.14)] backdrop-blur-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-brand-50">
                    <Image
                      src="/images/achievements/achievements-hero-celebration.webp"
                      alt="A radiant student celebrating graduation with diploma"
                      fill
                      sizes="(min-width: 1024px) 30vw, 90vw"
                      className="h-full w-full object-cover object-center"
                      priority
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-forest shadow">
                      <FaCheckCircle className="text-xs text-forest" />
                      Empowering Minds · Igniting Future
                    </span>
                  </div>

                  {/* Highlight pill cards */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-left">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-forest">
                        <FaGraduationCap className="text-sm" /> Higher Education
                      </span>
                      <p className="mt-1 text-[11px] text-gray-600">Engineering, MBBS, Arts, Law &amp; Management.</p>
                    </div>
                    <div className="rounded-xl border border-rose-100 bg-rose-50/70 p-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-crimson">
                        <FaShieldAlt className="text-xs" /> Authentic Ethics
                      </span>
                      <p className="mt-1 text-[11px] text-gray-600">Transparent guidance with no misleading promises.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loading Indicator */}
      {loading && (
        <div className="py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
            <FaSpinner className="animate-spin text-2xl" />
          </div>
          <p className="mt-3 text-sm font-semibold text-gray-600">Loading verified achievements…</p>
        </div>
      )}

      {/* 2. Spotlight Section */}
      {!loading && data.spotlights?.length > 0 && (
        <section className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-gray-200 flex-1"></div>
              <h2 className="text-xs font-bold text-forest uppercase tracking-[0.25em]">Featured Spotlight</h2>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            {data.spotlights.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-200 bg-gradient-to-br from-[#075544] via-[#054235] to-[#043328] p-8 md:p-14 text-white grid md:grid-cols-2 gap-10 items-center relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-gold-400 text-brand-900 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                      Spotlight
                    </span>
                    {item.isVerified && (
                      <span className="text-emerald-300 text-xs font-semibold flex items-center gap-1">
                        <FaCheckCircle /> Verified Record
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-emerald-100 text-base mb-6 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold text-gold-400">
                      {item.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white">{item.name}</h4>
                      <p className="text-gold-300 font-semibold text-xs uppercase tracking-wider">{item.course}</p>
                    </div>
                  </div>
                  {item.videoUrl && (
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 bg-white text-forest px-6 py-3 rounded-full font-bold text-xs hover:bg-gold-400 hover:text-brand-950 transition-colors shadow"
                    >
                      <FaTrophy /> Watch Story
                    </a>
                  )}
                </div>
                <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/15 p-6 md:p-8 rounded-2xl">
                  <h4 className="text-gold-400 font-bold uppercase tracking-wider text-xs mb-5">Journey Milestones</h4>
                  <div className="space-y-5">
                    {item.journey?.map((pt, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        <div className="w-0.5 bg-gold-400/30 absolute left-2 top-6 bottom-0"></div>
                        <div className="w-4 h-4 rounded-full bg-gold-400 border-2 border-[#075544] z-10"></div>
                        <div>
                          <p className="text-gold-300 font-bold text-[10px] uppercase">{pt.date}</p>
                          <p className="font-semibold text-sm text-white">{pt.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Stats Section */}
      {!loading && data.stats?.length > 0 && (
        <section className="py-16 md:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="rf-eyebrow">Key Metrics</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Guidance Numbers at a Glance
              </h2>
            </div>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {data.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <motion.div
                    key={stat._id}
                    variants={fadeInUp}
                    className="text-center rounded-2xl border border-gray-200/90 bg-white p-6 shadow-card hover:shadow-card-hover transition-all"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-forest/10 text-forest text-2xl shadow-sm">
                      <Icon />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-600 font-semibold text-xs uppercase tracking-wider">{stat.title}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. Recognitions Section */}
      {!loading && data.recognitions?.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-[#fbfaf6] to-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="rf-eyebrow text-crimson">Honors &amp; Recognitions</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Awards &amp; Institutional Commendations
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {data.recognitions.map((item, index) => {
                const Icon = recognitionIcons[index % recognitionIcons.length];
                return (
                  <motion.div
                    key={item._id}
                    variants={fadeInUp}
                    className="bg-white p-6 rounded-2xl flex gap-5 items-center shadow-card border border-gray-200/90 hover:border-forest/40 transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-crimson/10 text-crimson text-2xl">
                      <Icon />
                    </div>
                    <div>
                      <span className="text-crimson font-bold text-xs uppercase tracking-wider">{item.year}</span>
                      <h4 className="text-lg font-bold text-gray-900 mt-0.5 leading-snug">{item.title}</h4>
                      <p className="text-gray-600 text-xs mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Placements Section */}
      {!loading && data.placements?.length > 0 && (
        <section className="py-16 md:py-20 bg-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="rf-eyebrow text-forest">Course Admissions</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Stream-wise Student Placements
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {data.placements.map((item, index) => {
                const Icon = placementIcons[index % placementIcons.length];
                return (
                  <motion.div
                    variants={fadeInUp}
                    key={item._id}
                    className="bg-white p-5 rounded-2xl text-center shadow-card border border-gray-200/90 hover:border-forest/40 transition-all"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-forest/10 text-forest text-xl">
                      <Icon />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-0.5">{item.value}</h4>
                    <p className="text-gray-500 font-semibold text-[11px] uppercase tracking-wider">{item.course}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. Milestones Section */}
      {!loading && data.milestones?.length > 0 && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#fbfaf6] to-white overflow-hidden border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="rf-eyebrow text-crimson">Institutional Timeline</p>
              <h2 className="mt-1 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                Key Foundation Milestones
              </h2>
            </div>

            <div className="max-w-4xl mx-auto relative px-4">
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-crimson via-gold-400 to-forest rounded-full opacity-30"></div>

              <div className="space-y-12">
                {data.milestones.map((milestone, index) => {
                  const Icon = milestoneIcons[index % milestoneIcons.length];
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={milestone._id}
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center md:justify-between ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      <div className="flex-1 md:w-5/12 pl-16 md:pl-0">
                        <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-200/90 hover:border-forest/40 transition-all">
                          <span className="inline-block px-3 py-1 rounded-full text-[11px] bg-rose-50 text-crimson font-bold uppercase tracking-wider mb-2 border border-rose-100">
                            {milestone.year}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">{milestone.title}</h3>
                          <p className="text-gray-600 text-xs leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white shadow-md z-10">
                        <Icon className="text-sm" />
                      </div>
                      <div className="hidden md:block md:w-5/12"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Safe Fallback Empty State (When no achievement records are published yet) */}
      {!loading && !hasAchievements && (
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="overflow-hidden rounded-3xl border border-gray-200/90 bg-gradient-to-br from-white via-[#fcfbf7] to-[#f4faf7] p-8 md:p-12 shadow-card">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-[#9a6300] shadow-sm">
                <FaTrophy className="text-2xl" />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Annual Placement &amp; Merit Records Under Verification
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Our administration is currently compiling and moderating student admission records and scholarship
                results for the upcoming academic session. Verified records will appear here shortly under our Authentic
                Publication Policy.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={ROUTES.counselling} className="rf-btn-primary !rounded-full px-6 py-3 text-xs sm:text-sm">
                  <FaCalendarCheck aria-hidden="true" />
                  <span>Book Counselling Session</span>
                </Link>
                <Link href="/contact" className="rf-btn-outline !rounded-full px-6 py-3 text-xs sm:text-sm">
                  <span>Contact Our Office</span>
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. Bottom Call to Action */}
      <section className="py-16 bg-gradient-to-r from-brand-900 via-[#075544] to-[#7a091e] text-white overflow-hidden relative">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Start Your Journey Toward <span className="text-gold-300">Excellence</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85 text-sm sm:text-base">
            Join the hundreds of students guided each year into their dream degrees. Talk to our senior counselling advisors today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ROUTES.counselling} className="rf-btn-gold !rounded-full px-8 py-3.5 text-sm font-bold">
              <FaCalendarCheck aria-hidden="true" />
              <span>Book Counselling Session</span>
            </Link>
            <Link href={ROUTES.secureSeat} className="rf-btn-maroon !rounded-full px-8 py-3.5 text-sm font-bold">
              <span>Secure Your Seat</span>
              <FaArrowRight className="text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
