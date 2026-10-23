import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrophy,
  FaUserGraduate,
  FaUniversity,
  FaStar,
  FaQuoteLeft,
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
  FaSpinner
} from 'react-icons/fa';

export default function Achievements() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const [data, setData] = useState({
    stats: [],
    milestones: [],
    recognitions: [],
    placements: [],
    spotlights: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReact = async (id, currentReactions) => {
    try {
      // Optimistic update
      const newData = { ...data };
      Object.keys(newData).forEach(key => {
        const item = newData[key].find(a => a._id === id);
        if (item) item.reactions = (item.reactions || 0) + 1;
      });
      setData(newData);

      await fetch('/api/achievements/react', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (error) {
      console.error('Failed to react:', error);
    }
  };

  const statIcons = [FaUserGraduate, FaUniversity, FaTrophy, FaStar];
  const milestoneIcons = [FaHeart, FaChartLine, FaUserGraduate, FaHandshake, FaTrophy, FaMedal];
  const recognitionIcons = [FaTrophy, FaStar, FaAward, FaMedal];
  const placementIcons = [FaStethoscope, FaCog, FaChartLine, FaBalanceScale, FaGraduationCap, FaUsers];

  return (
    <Layout
      title="Achievements"
      description="Rasi Foundation achievements: 5000+ students guided, 100+ partner colleges, 15+ years excellence. Explore our records of excellence and student placements in top colleges."
      keywords="education consultancy achievements, MBBS admission success, engineering placement stories, career guidance milestones, education excellence"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 via-white to-red-50 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-amber-200"
            >
              <FaTrophy className="text-[10px]" />
              <span>Our Hall of Fame</span>
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-none"
            >
              The Legacy of <br /><span className="text-amber-600 italic">Excellence</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto mb-12"
            >
              Empowering thousands of dreams since 2010. Explore the journeys of students who transformed their potential into success.
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* Spotlight Section */}
      {data.spotlights?.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px bg-gray-100 flex-1"></div>
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Featured Spotlight</h2>
              <div className="h-px bg-gray-100 flex-1"></div>
            </div>
            {data.spotlights.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] rounded-[3rem] p-8 md:p-16 text-white grid md:grid-cols-2 gap-12 items-center relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-amber-500/10 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="bg-amber-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-lg">Featured</span>
                    {item.isVerified && <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><FaCheckCircle /> Verified</span>}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed font-medium italic">&quot;{item.quote}&quot;</p>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black">{item.name?.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-xl">{item.name}</h4>
                      <p className="text-amber-500 font-bold text-xs uppercase tracking-widest">{item.course}</p>
                    </div>
                  </div>
                  {item.videoUrl && (
                    <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                      <FaTrophy /> Watch Success Story
                    </a>
                  )}
                </div>
                <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]">
                  <h4 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-6">The Journey</h4>
                  <div className="space-y-6">
                    {item.journey?.map((pt, idx) => (
                      <div key={idx} className="flex gap-4 relative">
                        <div className="w-1 bg-amber-500/20 absolute left-2 top-8 bottom-0"></div>
                        <div className="w-5 h-5 rounded-full bg-amber-500 border-4 border-[#0f172a] z-10"></div>
                        <div>
                          <p className="text-amber-500 font-black text-[10px] uppercase mb-1">{pt.date}</p>
                          <p className="font-bold text-sm text-slate-100">{pt.label}</p>
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

      {/* Stats Section */}
      {data.stats?.length > 0 && (
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {data.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <motion.div
                    key={stat._id}
                    variants={fadeInUp}
                    className="text-center group"
                  >
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6 ${stat.color === 'red' ? 'bg-red-50 text-red-600' :
                      stat.color === 'green' ? 'bg-green-50 text-green-600' :
                        stat.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                          'bg-blue-50 text-blue-600'
                      }`}>
                      <Icon className="text-4xl" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">{stat.value}</h3>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{stat.title}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}


      {/* Recognitions Section */}
      {data.recognitions?.length > 0 && (
        <section className="py-24 bg-white overflow-hidden border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-amber-600 font-black uppercase tracking-[0.2em] text-xs">Recognitions</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">Awards & Honors</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {data.recognitions.map((item, index) => {
                const Icon = recognitionIcons[index % recognitionIcons.length];
                return (
                  <motion.div
                    key={item._id}
                    variants={fadeInUp}
                    className="bg-gray-50 p-8 rounded-[2.5rem] flex gap-6 items-center shadow-sm border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
                  >
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 ${item.color === 'red' ? 'bg-red-50 text-red-600' :
                      item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        item.color === 'green' ? 'bg-green-50 text-green-600' :
                          'bg-amber-50 text-amber-600'
                      }`}>
                      <Icon className="text-3xl" />
                    </div>
                    <div>
                      <span className="text-amber-600 font-black text-[10px] uppercase tracking-widest">{item.year}</span>
                      <h4 className="text-xl font-black text-gray-900 mt-1 mb-2 leading-tight">{item.title}</h4>
                      <p className="text-gray-500 font-medium text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Placements Section */}
      {data.placements?.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-green-600 font-black uppercase tracking-[0.2em] text-xs">Placements</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">Category-wise Success</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {data.placements.map((item, index) => {
                const Icon = placementIcons[index % placementIcons.length];
                return (
                  <motion.div
                    variants={fadeInUp}
                    key={item._id}
                    className="bg-gray-50 p-8 rounded-[2rem] text-center shadow-sm border border-gray-100 hover:shadow-xl hover:bg-white transition-all duration-500 group"
                  >
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${item.color === 'red' ? 'bg-red-50 text-red-600' :
                      item.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                        item.color === 'green' ? 'bg-green-50 text-green-600' :
                          item.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                            item.color === 'amber' ? 'bg-amber-50 text-amber-600' :
                              'bg-teal-50 text-teal-600'
                      }`}>
                      <Icon className="text-2xl" />
                    </div>
                    <h4 className="text-3xl font-black text-gray-900 mb-1">{item.value}</h4>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">{item.course}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Milestones / Journey Section */}
      {data.milestones?.length > 0 && (
        <section className="py-24 bg-white overflow-hidden border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-24">
              <span className="text-amber-600 font-black uppercase tracking-[0.2em] text-xs">Our Journey</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2 tracking-tighter">Key Milestones</h2>
            </div>

            <div className="max-w-5xl mx-auto relative px-4">
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-amber-500 to-green-500 rounded-full opacity-10"></div>

              <div className="space-y-24">
                {data.milestones.map((milestone, index) => {
                  const Icon = milestoneIcons[index % milestoneIcons.length];
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={milestone._id}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className="flex-1 md:w-5/12 pl-16 md:pl-0">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-50 relative group transition-all duration-500 hover:shadow-2xl hover:border-amber-200">
                          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] bg-red-50 text-red-600 font-black uppercase tracking-widest mb-6 border border-red-100">
                            {milestone.year}
                          </span>
                          <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">{milestone.title}</h3>
                          <p className="text-gray-600 leading-relaxed font-medium">{milestone.description}</p>
                        </div>
                      </div>
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white shadow-2xl z-10 transition-transform duration-500 group-hover:scale-125">
                        <Icon />
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
          >
            Be Our Next Success <br /><span className="text-amber-500 italic">Story!</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            Join the legacy of achievers at Rasi Foundation. Your dreams, our guidance!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/contact" className="bg-amber-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center justify-center gap-3">
              Start Your Journey <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
