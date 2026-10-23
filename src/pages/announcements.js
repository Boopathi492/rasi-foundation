import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaBullhorn, FaGraduationCap, FaUniversity, FaExclamationTriangle,
  FaInfoCircle, FaArrowRight, FaCalendarAlt, FaExternalLinkAlt, FaSpinner
} from 'react-icons/fa';

const TYPE_CONFIG = {
  admission: { label: 'Admission', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500', icon: FaUniversity },
  scholarship: { label: 'Scholarship', color: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500', icon: FaGraduationCap },
  urgent: { label: 'Urgent', color: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', icon: FaExclamationTriangle },
  general: { label: 'General', color: 'bg-gray-50 text-gray-700 border-gray-200', dot: 'bg-gray-400', icon: FaInfoCircle },
};

const FILTERS = ['all', 'admission', 'scholarship', 'urgent', 'general'];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then(res => setAnnouncements(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? announcements : announcements.filter(a => a.type === filter);

  return (
    <Layout
      title="Announcements"
      description="Latest announcements from Rasi Foundation — admissions, scholarships, and important updates."
      keywords="Rasi Foundation announcements, admission updates, scholarship news, education consultancy"
    >
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-red-200"
            >
              <FaBullhorn className="text-[10px]" />
              <span>Latest Updates</span>
            </motion.span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter leading-none">
              Announcements
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Stay updated with the latest news on admissions, scholarships, and important events from Rasi Foundation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border transition-all duration-200 ${
                  filter === f
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 bg-gray-50 min-h-[400px]">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-400">
              <FaSpinner className="text-3xl animate-spin" />
              <p className="font-medium">Loading announcements...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-400">
              <FaBullhorn className="text-5xl opacity-30" />
              <p className="font-bold text-lg">No announcements found</p>
              {filter !== 'all' && (
                <button onClick={() => setFilter('all')} className="text-sm text-red-600 font-bold hover:underline">
                  Show all
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filtered.map((item, i) => {
                const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${config.color} border`}>
                        <Icon className="text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${config.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            {config.label}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                            <FaCalendarAlt className="text-[10px]" />
                            {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-3 leading-snug">{item.title}</h3>
                        <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">{item.content}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-5 text-red-600 font-black text-sm hover:gap-3 transition-all"
                          >
                            Learn more <FaExternalLinkAlt className="text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-black text-white mb-6 tracking-tighter">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-400 font-medium mb-10 max-w-xl mx-auto">
            Get expert guidance on admissions, scholarships, and your career path.
          </p>
          <Link
            href="/contact"
            className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-3"
          >
            Contact Us <FaArrowRight />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
