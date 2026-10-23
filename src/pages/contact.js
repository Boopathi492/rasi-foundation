import Layout from '@/frontend/components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaUser,
  FaGraduationCap,
  FaArrowRight,
  FaHeadset
} from 'react-icons/fa';

export default function Contact() {
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
  // Page SEO structured data for local business
  const contactStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Rasi Foundation',
    description: 'Elite Career Guidance & Education Consultancy',
    telephone: '+91-9789446100',
    email: 'rasipuramrasifoundation@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '11°24\'06.6"N 78°09\'34.6"E',
      addressLocality: 'Rasipuram',
      addressRegion: 'Tamil Nadu',
      postalCode: '637408',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '11.4018417',
      longitude: '78.159599'
    },
    openingHours: 'Mo-Sa 09:00-18:00'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: FaUser,
      title: 'Strategic Advisor',
      name: 'Prof. P. Gunasekaran',
      credentials: 'M.Sc., M.Phil.',
      role: 'Career Guidance Advisor & Analyst',
      phone: '+91 97 89 44 61 00',
      color: 'red'
    },
    {
      icon: FaUser,
      title: 'Administrative Director',
      name: 'P. Yuvaraj Kumar',
      credentials: 'MBA',
      role: 'Career Guidance Advisor',
      phone: '+91 92 94 96 91 96',
      color: 'green'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout
      title="Contact Us"
      description="Connect with Rasi Foundation for career guidance. Our experts provide counseling for MBBS, Engineering, and Admissions."
      keywords="career guidance, education consultancy, medical admission, engineering career advisor"
      structuredData={contactStructuredData}
    >
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-gray-50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-red-200"
            >
              <FaEnvelope className="text-[10px]" />
              <span>Get In Touch</span>
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-10 tracking-tighter leading-none"
            >
              Contact <span className="text-green-600 italic">Us</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-2xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Have questions about admissions or need career guidance? Reach out to us
              and take the first step towards your dream career.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-20">

            {/* Left Column: Form Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/10 to-green-600/10 rounded-[3rem] blur-xl opacity-25 group-hover:opacity-50 transition duration-1000"></div>

                <div className="relative bg-white border border-gray-100 rounded-[3rem] p-10 md:p-16 shadow-2xl">
                  <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter">Send a Message</h2>
                  <p className="text-lg text-gray-500 mb-12 font-medium">Fill out the form below and we&apos;ll get back to you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-6 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold text-lg"
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-6 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold text-lg"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-6 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold text-lg"
                          placeholder="+91 000 000 0000"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-6 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold text-lg"
                          placeholder="How can we help?"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Your Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-8 py-6 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold text-lg resize-none"
                        placeholder="Tell us about your requirements"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group/btn overflow-hidden rounded-2xl p-[2px] disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-[length:200%_100%] animate-gradient"></div>
                      <div className="relative bg-[#020617] py-6 rounded-2xl flex items-center justify-center gap-4 font-black text-white uppercase tracking-[0.25em] text-sm group-hover/btn:bg-transparent transition-colors">
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin text-lg" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="text-sm" /> Send Message
                          </>
                        )}
                      </div>
                    </button>
                  </form>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-10 p-8 bg-green-50 border border-green-200 rounded-3xl flex items-center gap-6"
                      >
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-200">
                          <FaCheckCircle className="text-white text-2xl" />
                        </div>
                        <div>
                          <p className="font-black text-green-900 text-sm uppercase tracking-widest">Message Sent!</p>
                          <p className="text-green-700 text-sm font-bold mt-1 mb-4">We&apos;ll contact you shortly.</p>
                          <a
                            href={`https://wa.me/918073774591?text=${encodeURIComponent(
                              `*NEW ENQUIRY*\n\n` +
                              `*Name:* ${formData.name}\n` +
                              `*Subject:* ${formData.subject}\n` +
                              `*Phone:* ${formData.phone}\n` +
                              `*Email:* ${formData.email}\n` +
                              `*Message:* ${formData.message}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                          >
                            <FaWhatsapp /> Chat on WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-10 p-8 bg-red-50 border border-red-200 rounded-3xl flex items-center gap-6"
                      >
                        <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl shadow-lg shadow-red-200">!</div>
                        <div>
                          <p className="font-black text-red-900 text-sm uppercase tracking-widest">Submission Error</p>
                          <p className="text-red-700 text-sm font-bold mt-1">Please try again or call us directly.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid gap-8"
              >
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white border border-gray-100 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all duration-500 group shadow-lg"
                  >
                    <div className="flex items-center gap-8">
                      <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-110 transition-transform duration-500 ${contact.color === 'red' ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-red-100' : 'bg-gradient-to-br from-green-600 to-green-700 shadow-green-100'
                        }`}>
                        {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1">
                        <span className={`text-[10px] font-black uppercase tracking-[0.25em] block mb-2 ${contact.color === 'red' ? 'text-red-600' : 'text-green-600'
                          }`}>{contact.title}</span>
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{contact.name}</h3>
                        <p className="text-xs text-gray-500 font-black mb-5 uppercase tracking-widest">{contact.role}</p>
                        <a
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="inline-flex items-center gap-3 text-gray-900 font-black hover:text-red-600 transition-colors text-lg"
                        >
                          <FaPhone className="text-sm" /> {contact.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100 rounded-[3rem] p-12 shadow-inner"
              >
                <h3 className="text-3xl font-black text-gray-900 mb-10 tracking-tighter">Information</h3>

                <div className="space-y-12">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm">
                      <FaMapMarkerAlt className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Location</h4>
                      <a
                        href="https://www.google.com/maps/place/11%C2%B024'06.6%22N+78%C2%B009'34.6%22E/@11.4018417,78.1570241,17z/data=!3m1!4b1!4m4!3m3!8m2!3d11.4018417!4d78.159599"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 font-black hover:text-red-600 transition-colors text-lg"
                      >
                        Rasipuram, Tamil Nadu<br />
                        <span className="text-sm font-bold text-red-500">View on Google Maps</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm">
                      <FaEnvelope className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Email</h4>
                      <a href="mailto:rasipuramrasifoundation@gmail.com" className="text-gray-900 font-black hover:text-red-600 transition-colors break-all text-lg">
                        rasipuramrasifoundation@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm">
                      <FaClock className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Availability</h4>
                      <p className="text-gray-900 font-black text-lg">MON — SAT / 09:00 — 18:00</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 pt-6">
                    <Link href="https://wa.me/918073774591" className="flex items-center gap-4 w-full bg-green-600 text-white p-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm justify-center hover:bg-green-700 transition-all shadow-xl shadow-green-100 hover:scale-[1.02]">
                      <FaWhatsapp className="text-2xl" /> WhatsApp Chat
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </Layout>
  );
}
