import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaUserTie,
  FaLightbulb,
  FaHandshake,
  FaPhone,
  FaEnvelope,
  FaStar,
  FaAward,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteLeft,
  FaHeart,
  FaEye,
  FaBullseye
} from 'react-icons/fa';

export default function About() {
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
  const values = [
    {
      icon: FaHeart,
      title: 'Student-Centric',
      description: 'Every decision we make is centered around what\'s best for our students and their future.'
    },
    {
      icon: FaLightbulb,
      title: 'Expert Guidance',
      description: 'Our team of experienced counselors provides informed and personalized advice.'
    },
    {
      icon: FaHandshake,
      title: 'Trust & Integrity',
      description: 'We maintain the highest standards of honesty and transparency in all our dealings.'
    },
    {
      icon: FaAward,
      title: 'Excellence',
      description: 'We strive for excellence in every service we provide to our students and parents.'
    }
  ];

  const timeline = [
    { year: 'Foundation', event: 'Rasi Foundation was established with a vision to guide students towards successful careers' },
    { year: 'Growth', event: 'Expanded services to cover Medical, Engineering, and Management courses' },
    { year: 'Network', event: 'Built partnerships with 100+ prestigious colleges across India' },
    { year: 'Today', event: 'Successfully guided 5000+ students in achieving their educational dreams' }
  ];

  return (
    <Layout
      title="About Us"
      description="Learn about Rasi Foundation - 15+ years of excellence in career guidance. Founded by Prof. P. Gunasekaran, we've helped 5000+ students achieve their educational dreams in Medical, Engineering, MBA & Law."
      keywords="about Rasi Foundation, career guidance Rasipuram, education consultant history, Prof Gunasekaran, career counselor Tamil Nadu"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-white to-green-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <FaGraduationCap />
              <span>About Rasi Foundation</span>
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-6 tracking-tight"
            >
              Shaping <span className="text-red-600">Futures</span>, Building <span className="text-green-600">Dreams</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 leading-relaxed font-medium"
            >
              Rasi Foundation is a premier career guidance and education consultancy dedicated to
              helping students navigate their educational journey and achieve their professional dreams.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FaBullseye className="text-3xl" />
                </div>
                <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">Our Mission</h2>
                <p className="text-white/90 text-lg leading-relaxed font-medium">
                  To empower students with the knowledge, guidance, and support they need to make
                  informed career decisions and secure admissions in prestigious institutions that
                  align with their aspirations and potential.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-600 to-green-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FaEye className="text-3xl" />
                </div>
                <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">Our Vision</h2>
                <p className="text-white/90 text-lg leading-relaxed font-medium">
                  To be the most trusted and preferred education consultancy, recognized for
                  transforming lives through quality guidance and creating successful professionals
                  who contribute to society.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Our Team</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-4 mb-4 tracking-tighter">
              Meet Our <span className="text-green-600">Leaders</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Our foundation is led by experienced professionals dedicated to student success.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          >
            {/* Founder */}
            <motion.div variants={fadeInUp} className="card p-10 text-center group hover:border-red-500/30 transition-all duration-500">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-500">
                PG
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Prof. P. Gunasekaran</h3>
              <p className="text-red-600 font-bold mb-2 uppercase tracking-widest text-xs">Founder</p>
              <p className="text-gray-500 mb-4 font-bold">M.Sc., M.Phil.</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                Career Guidance Advisor & Analyst with extensive experience in the education sector.
                Prof. Gunasekaran has dedicated his career to helping students find their path to success.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a href="tel:+919789446100" className="inline-flex items-center gap-2 bg-gray-50 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm">
                  <FaPhone className="text-sm" /> +91 97894 46100
                </a>
              </div>
            </motion.div>

            {/* Administrative Director */}
            <motion.div variants={fadeInUp} className="card p-10 text-center group hover:border-green-500/30 transition-all duration-500">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform duration-500">
                YK
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">P. Yuvaraj Kumar</h3>
              <p className="text-green-600 font-bold mb-2 uppercase tracking-widest text-xs">Administrative Director</p>
              <p className="text-gray-500 mb-4 font-bold">MBA</p>
              <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                Career Guidance Advisor with strong administrative and management skills.
                Yuvaraj Kumar ensures smooth operations and excellent service delivery to all students.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a href="tel:+919294969196" className="inline-flex items-center gap-2 bg-gray-50 text-gray-800 px-6 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm">
                  <FaPhone className="text-sm" /> +91 92949 69196
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mt-4 mb-6 tracking-tighter">
                The Journey of <span className="text-green-600">Rasi Foundation</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-medium">
                <p>
                  Rasi Foundation was born out of a deep passion for education and a sincere desire
                  to help students navigate the complex world of higher education and career choices.
                </p>
                <p>
                  Founded by Prof. P. Gunasekaran, a seasoned career guidance expert, the foundation
                  has grown from a small consultancy to a trusted name in education guidance across
                  Tamil Nadu and beyond.
                </p>
                <p>
                  Today, with a team of dedicated professionals and a network of prestigious
                  institutional partners, we continue to fulfill our mission of empowering minds
                  and igniting futures.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100">
                  <h4 className="text-4xl font-black text-red-600 mb-1">5000+</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Students Guided</p>
                </div>
                <div className="p-6 bg-green-50 rounded-[2rem] border border-green-100">
                  <h4 className="text-4xl font-black text-green-600 mb-1">100+</h4>
                  <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Partner Colleges</p>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-amber-500 to-green-500 rounded-full opacity-20"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20 group"
                  >
                    <div className={`absolute left-4 w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-black shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 ${index === 0 ? 'bg-red-500 shadow-red-200' :
                      index === 1 ? 'bg-orange-500 shadow-orange-200' :
                        index === 2 ? 'bg-amber-500 shadow-amber-200' :
                          'bg-green-500 shadow-green-200'
                      }`}>
                      {index + 1}
                    </div>
                    <div className="card p-8 group-hover:border-red-500/20 transition-all duration-300">
                      <h4 className="text-xl font-black text-gray-800 mb-2 uppercase tracking-tight">{item.year}</h4>
                      <p className="text-gray-600 font-medium">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-400 font-black uppercase tracking-[0.2em] text-xs">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-4 tracking-tighter">
              What We Stand For
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
              Our core values guide everything we do at Rasi Foundation.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500 group"
              >
                <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-red-500 to-green-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <value.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{value.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-[100px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <FaQuoteLeft className="text-6xl mx-auto mb-10 opacity-30" />
            <blockquote className="text-2xl md:text-4xl font-black italic leading-tight mb-12 tracking-tight">
              &quot;Every student has potential. Our job is to help them discover it and guide them
              towards the right path that will help them shine.&quot;
            </blockquote>
            <div className="flex items-center justify-center gap-6">
              <div className="w-20 h-20 bg-white rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                <span className="text-3xl font-black text-red-600">PG</span>
              </div>
              <div className="text-left">
                <p className="font-black text-2xl tracking-tighter">Prof. P. Gunasekaran</p>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs">Founder, Rasi Foundation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-8 tracking-tighter">
              Ready to Start Your <span className="text-red-600 italic">Journey?</span>
            </h2>
            <p className="text-xl text-gray-500 mb-12 font-medium max-w-2xl mx-auto">
              Let us help you make the right career decisions. Contact us for a free counseling session.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="btn-primary flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg group">
                Contact Us <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/courses" className="btn-outline flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-lg group">
                View Our Courses <FaGraduationCap className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
