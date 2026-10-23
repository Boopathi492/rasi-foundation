import Layout from '@/frontend/components/Layout';
import WomenCollegesScroller from '@/components/WomenCollegesScroller';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaUserGraduate,
  FaAward,
  FaHandshake,
  FaStethoscope,
  FaCog,
  FaBalanceScale,
  FaChartLine,
  FaArrowRight,
  FaPhone,
  FaQuoteLeft,
  FaCheckCircle,
  FaGlobe,
  FaChalkboardTeacher,
  FaFlask
} from 'react-icons/fa';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({
    stats: [
      { icon: FaUserGraduate, number: '5000+', label: 'Students Guided', color: 'red' },
      { icon: FaGraduationCap, number: '50+', label: 'Courses Offered', color: 'green' },
      { icon: FaAward, number: '15+', label: 'Years Experience', color: 'amber' },
      { icon: FaHandshake, number: '100+', label: 'Partner Colleges', color: 'blue' },
    ]
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('/api/achievements');
      const result = await response.json();

      if (result) {
        const dynamicStats = result.stats && result.stats.length > 0
          ? result.stats.map((s, idx) => ({
            icon: data.stats[idx]?.icon || FaAward,
            number: s.value,
            label: s.title,
            color: s.color || 'blue'
          }))
          : data.stats;

        setData({
          stats: dynamicStats
        });
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featuredCourses = [
    { icon: FaStethoscope, name: 'Medical Sciences', courses: ['MBBS', 'BDS', 'AYUSH', 'Para Medical'], color: 'red' },
    { icon: FaCog, name: 'Engineering', courses: ['B.E/B.Tech', 'Polytechnic', 'Architecture'], color: 'blue' },
    { icon: FaChartLine, name: 'Management', courses: ['MBA', 'MCA', 'CA', 'B.Com'], color: 'green' },
    { icon: FaBalanceScale, name: 'Law', courses: ['BL', 'LLB', 'LLM', 'BA LLB'], color: 'purple' },
    { icon: FaChalkboardTeacher, name: 'Education', courses: ['B.Ed', 'M.Ed', 'D.T.Ed', 'D.El.Ed'], color: 'amber' },
    { icon: FaFlask, name: 'Arts & Science', courses: ['BA', 'BSc', 'MA', 'MSc'], color: 'teal' },
    { icon: FaGlobe, name: 'Abroad Studies', courses: ['MBBS Abroad', 'Engineering', 'MBA', 'Masters'], color: 'indigo' },
  ];

  const colorClasses = {
    red: 'bg-red-100 text-red-600 group-hover:bg-red-600',
    green: 'bg-green-100 text-green-600 group-hover:bg-green-600',
    amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600',
    blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
    purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600',
    teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600',
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600',
  };

  return (
    <Layout
      title="Home"
      description="Rasi Foundation - Premier career guidance & education consultancy in Tamil Nadu. Expert counseling for MBBS, Engineering, MBA, Law admissions. 5000+ students guided, 100+ partner colleges."
      keywords="NEET counseling, medical college admission Tamil Nadu, engineering admission guidance, MBA admission consultant, career counselor Rasipuram, Namakkal education consultancy"
    >

      {/* Hero Section */}
      <section className="relative min-h-[85vh] bg-gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              >
                <FaGraduationCap />
                <span>Career Guidance & Education Consultancy</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              >
                <span className="text-red-600">Empowering</span> Minds!
                <br />
                <span className="text-green-600">Igniting</span> Future!
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl"
              >
                Your trusted partner in shaping successful careers. We provide expert guidance
                for admissions in top colleges across India for Medical, Engineering, Management,
                Law, and more.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              >
                <Link href="/courses" className="btn-primary flex items-center justify-center gap-2">
                  Explore Courses <FaArrowRight />
                </Link>
                <Link href="/contact" className="btn-outline flex items-center justify-center gap-2">
                  <FaPhone /> Get Free Counseling
                </Link>
              </motion.div>

              {/* Quick Contact */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FaPhone className="text-red-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500">Call Now</p>
                    <a href="tel:+919789446100" className="font-bold text-gray-800 hover:text-red-600">
                      +91 97 89 44 61 00
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>


            {/* Right Content - Circular Floating Courses */}
            <div className="relative hidden lg:flex items-center justify-center" style={{ minHeight: '520px', width: '100%' }}>
              {/* Container for circular layout */}
              <div className="relative" style={{ width: '520px', height: '520px' }}>

                {/* Large Gradient Ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '280px',
                    height: '280px',
                    background: 'conic-gradient(from 180deg, #f97316 0deg, #f97316 60deg, #eab308 120deg, #22c55e 180deg, #22c55e 300deg, #f97316 360deg)',
                    padding: '12px',
                  }}
                >
                  {/* Inner white circle to create ring effect */}
                  <div className="w-full h-full bg-white rounded-full shadow-inner"></div>
                </div>

                {/* Graduation Cap - centered in the ring */}
                <div
                  className="absolute flex items-center justify-center z-10"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <FaGraduationCap className="text-6xl text-gray-800" />
                </div>

                {/* Engineering Card - TOP LEFT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    top: '8%',
                    left: '-10px',
                    minWidth: '175px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaCog className="text-lg text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Engineering</p>
                      <p className="text-xs text-gray-500">B.E, B.Tech, Arch</p>
                    </div>
                  </div>
                </div>

                {/* Medical Courses Card - TOP RIGHT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    top: '8%',
                    right: '-20px',
                    animationDelay: '0.3s',
                    minWidth: '190px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaStethoscope className="text-lg text-red-500" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Medical Courses</p>
                      <p className="text-xs text-gray-500">MBBS, BDS, AYUSH</p>
                    </div>
                  </div>
                </div>

                {/* Law Card - MIDDLE LEFT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    top: '42%',
                    left: '-40px',
                    transform: 'translateY(-50%)',
                    animationDelay: '0.6s',
                    minWidth: '170px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaBalanceScale className="text-lg text-purple-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Law</p>
                      <p className="text-xs text-gray-500">LLB, BA LLB, LLM</p>
                    </div>
                  </div>
                </div>

                {/* Management Card - MIDDLE RIGHT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    top: '42%',
                    right: '-30px',
                    transform: 'translateY(-50%)',
                    animationDelay: '0.9s',
                    minWidth: '170px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaChartLine className="text-lg text-amber-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Management</p>
                      <p className="text-xs text-gray-500">MBA, MCA, CA</p>
                    </div>
                  </div>
                </div>

                {/* Education Card - BOTTOM LEFT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    bottom: '12%',
                    left: '20px',
                    animationDelay: '1.2s',
                    minWidth: '155px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-cyan-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaChalkboardTeacher className="text-lg text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Education</p>
                      <p className="text-xs text-gray-500">B.Ed, M.Ed</p>
                    </div>
                  </div>
                </div>

                {/* Abroad Studies Card - BOTTOM RIGHT */}
                <div
                  className="absolute bg-white rounded-xl shadow-lg p-3 animate-float z-20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  style={{
                    bottom: '12%',
                    right: '10px',
                    animationDelay: '1.5s',
                    minWidth: '180px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaGlobe className="text-lg text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">Abroad Studies</p>
                      <p className="text-xs text-gray-500">MBBS, MBA Abroad</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
          </svg>
        </div>
      </section>



      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {data.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${stat.color === 'red' ? 'bg-red-100 group-hover:bg-red-600' :
                  stat.color === 'green' ? 'bg-green-100 group-hover:bg-green-600' :
                    stat.color === 'amber' ? 'bg-amber-100 group-hover:bg-amber-600' :
                      'bg-blue-100 group-hover:bg-blue-600'
                  }`}>
                  {typeof stat.icon === 'string' ? (
                    <span className={`text-3xl transition-colors duration-300 ${stat.color === 'red' ? 'text-red-600 group-hover:text-white' :
                      stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
                        stat.color === 'amber' ? 'text-amber-600 group-hover:text-white' :
                          'text-blue-600 group-hover:text-white'
                      }`}>{stat.icon}</span>
                  ) : (
                    <stat.icon className={`text-3xl transition-colors duration-300 ${stat.color === 'red' ? 'text-red-600 group-hover:text-white' :
                      stat.color === 'green' ? 'text-green-600 group-hover:text-white' :
                        stat.color === 'amber' ? 'text-amber-600 group-hover:text-white' :
                          'text-blue-600 group-hover:text-white'
                      }`} />
                  )}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-semibold uppercase tracking-wider">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-6">
                Your Trusted Partner in <span className="text-green-600">Education</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Rasi Foundation is a premier career guidance and education consultancy founded by
                <strong> Prof. P. Gunasekaran (M.Sc., M.Phil.)</strong>, a renowned Career Guidance
                Advisor & Analyst with decades of experience in the education sector.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Led by Administrative Director <strong>P. Yuvaraj Kumar (MBA)</strong>, our team is
                dedicated to helping students make informed decisions about their careers and secure
                admissions in prestigious institutions.
              </p>

              <div className="space-y-4 mb-8">
                {['Expert Career Counseling', 'Admission Assistance', 'Scholarship Guidance', 'Documentation Support'].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex items-center gap-2">
                Learn More About Us <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white shadow-2xl relative z-10">
                <FaQuoteLeft className="text-4xl text-red-300 mb-4" />
                <p className="text-xl italic leading-relaxed mb-6">
                  &quot;Education is the most powerful weapon which you can use to change the world.
                  At Rasi Foundation, we are committed to guiding every student towards their dreams.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-red-600">PG</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">Prof. P. Gunasekaran</p>
                    <p className="text-red-200">Founder, M.Sc., M.Phil.</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-500 rounded-2xl -z-10 shadow-lg"
              ></motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400 rounded-full -z-10 shadow-lg"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Women-Centric Engineering Colleges */}
      <WomenCollegesScroller />

      {/* Featured Courses Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-red-600 font-semibold uppercase tracking-wider">Our Courses</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">
              Courses We <span className="text-green-600">Offer</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide guidance and admission assistance for a wide range of professional courses
              in top colleges across India.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredCourses.map((course, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card card-hover group p-6"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${colorClasses[course.color]} group-hover:text-white`}>
                  <course.icon className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{course.name}</h3>
                <ul className="space-y-2 mb-6">
                  {course.courses.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className={`w-2 h-2 rounded-full ${course.color === 'red' ? 'bg-red-500' :
                        course.color === 'green' ? 'bg-green-500' :
                          course.color === 'amber' ? 'bg-amber-500' :
                            course.color === 'blue' ? 'bg-blue-500' :
                              course.color === 'purple' ? 'bg-purple-500' :
                                course.color === 'indigo' ? 'bg-indigo-500' :
                                  'bg-teal-500'
                        }`}></span>
                      {c}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className={`inline-flex items-center gap-2 font-semibold transition-colors ${course.color === 'red' ? 'text-red-600 hover:text-red-700' :
                  course.color === 'green' ? 'text-green-600 hover:text-green-700' :
                    course.color === 'amber' ? 'text-amber-600 hover:text-amber-700' :
                      course.color === 'blue' ? 'text-blue-600 hover:text-blue-700' :
                        course.color === 'purple' ? 'text-purple-600 hover:text-purple-700' :
                          course.color === 'indigo' ? 'text-indigo-600 hover:text-indigo-700' :
                            'text-teal-600 hover:text-teal-700'
                  }`}>
                  Learn More <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn-secondary inline-flex items-center gap-2">
              View All Courses <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-300 font-semibold uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Your Success is Our Mission
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              We go beyond just admission assistance. Our comprehensive approach ensures
              your educational journey is smooth and successful.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: 'Expert Guidance', desc: 'Personalized counseling by experienced professionals', icon: FaUserGraduate },
              { title: 'Wide Network', desc: 'Partnerships with 100+ top colleges across India', icon: FaHandshake },
              { title: 'Complete Support', desc: 'From course selection to admission completion', icon: FaCheckCircle },
              { title: 'Proven Track Record', desc: '5000+ students successfully guided', icon: FaAward },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <item.icon className="text-3xl text-amber-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-green-200"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Shape Your Future?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get expert career guidance and secure admission in your dream college.
                Contact us today for a free counseling session!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center justify-center gap-2">
                  <FaPhone /> Get Free Counseling
                </Link>
                <a href="tel:+919789446100" className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105">
                  Call: +91 97 89 44 61 00
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout >
  );
}
