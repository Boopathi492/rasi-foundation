import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap,
    FaClipboardCheck,
    FaUserGraduate,
    FaFlask,
    FaAtom,
    FaCalculator,
    FaLeaf,
    FaDna,
    FaArrowRight,
    FaClock,
    FaQuestionCircle,
    FaTrophy,
    FaShieldAlt,
    FaCheckCircle
} from 'react-icons/fa';

export default function ScholarshipTestPage() {
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

    const router = useRouter();
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTokenSubmit = async (e) => {
        e.preventDefault();
        if (!token.trim()) {
            setError('Please enter your registration token');
            return;
        }
        setLoading(true);
        setError('');

        // Navigate to subject selection with token
        router.push(`/scholarship-test/select-subject?token=${token.trim()}`);
    };

    const features = [
        {
            icon: FaClipboardCheck,
            title: 'Multiple Choice Questions',
            description: 'Simple choose-the-best-answer format with 1 mark per question',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: FaClock,
            title: '90 Minutes Duration',
            description: 'Ample time to complete all questions at your own pace',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: FaQuestionCircle,
            title: 'Random Questions',
            description: 'Unique question set for each student ensuring fairness',
            color: 'from-purple-500 to-violet-600'
        },
        {
            icon: FaTrophy,
            title: 'Instant Results',
            description: 'Get your score immediately after completing the test',
            color: 'from-amber-500 to-orange-600'
        },
    ];

    const subjects = [
        { name: 'Physics', icon: FaAtom, color: 'bg-blue-100 text-blue-600', required: true },
        { name: 'Chemistry', icon: FaFlask, color: 'bg-green-100 text-green-600', required: true },
        { name: 'Mathematics', icon: FaCalculator, color: 'bg-purple-100 text-purple-600', required: false },
        { name: 'Botany', icon: FaLeaf, color: 'bg-emerald-100 text-emerald-600', required: false },
        { name: 'Zoology', icon: FaDna, color: 'bg-rose-100 text-rose-600', required: false },
        { name: 'Biology', icon: FaDna, color: 'bg-amber-100 text-amber-600', required: false },
    ];

    return (
        <Layout
            title="Scholarship Test"
            description="RASI Foundation Online Scholarship Test - Fair and transparent scholarship selection for students in Tamil Nadu"
            keywords="scholarship test, RASI Foundation scholarship, online exam, engineering scholarship Tamil Nadu"
        >
            {/* Hero Section */}
            <section className="relative min-h-[90vh] bg-[#020617] overflow-hidden flex items-center">
                {/* Elite Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Floating Science Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-24 right-1/4">
                        <FaAtom className="text-7xl text-purple-400" />
                    </motion.div>
                    <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-32 left-1/4">
                        <FaFlask className="text-6xl text-pink-400" />
                    </motion.div>
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 left-20">
                        <FaCalculator className="text-5xl text-blue-400" />
                    </motion.div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={staggerContainer}
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10 border border-white/10 text-white"
                            >
                                <FaGraduationCap className="text-amber-400" />
                                <span>RASI Foundation Scholarship 2024</span>
                            </motion.span>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 leading-none tracking-tighter text-white"
                            >
                                Ignite Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 italic">Potential</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-2xl md:text-3xl text-white/60 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                            >
                                Your gateway to educational excellence. Take our online scholarship test and
                                unlock opportunities for your future.
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="flex justify-center mb-16"
                            >
                                <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-500/30 px-6 py-3 rounded-2xl">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-red-400 text-xs font-black uppercase tracking-widest">
                                        Curriculum: Tamil Nadu State Board (Class 12)
                                    </span>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                            >
                                <Link
                                    href="/scholarship-test/register"
                                    className="group relative inline-flex items-center justify-center gap-4 bg-white text-black px-12 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest hover:scale-105 transition-all duration-500 overflow-hidden"
                                >
                                    <span className="relative z-10">Register Now</span>
                                    <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                </Link>

                                <button
                                    onClick={() => setShowTokenInput(!showTokenInput)}
                                    className="group inline-flex items-center justify-center gap-4 bg-white/5 backdrop-blur-xl text-white px-12 py-6 rounded-[2rem] font-black text-lg uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all duration-500"
                                >
                                    <FaClipboardCheck className="text-pink-400" />
                                    <span>Registered? Login</span>
                                </button>
                            </motion.div>

                            {/* Token Input */}
                            <AnimatePresence>
                                {showTokenInput && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                        className="max-w-xl mx-auto mt-16 bg-white/5 backdrop-blur-[40px] p-10 rounded-[3rem] border border-white/10 shadow-2xl"
                                    >
                                        <form onSubmit={handleTokenSubmit} className="space-y-8">
                                            <div className="space-y-4">
                                                <label className="block text-white/40 text-[10px] font-black uppercase tracking-[0.3em] text-center">
                                                    Enter Registration Token
                                                </label>
                                                <input
                                                    type="text"
                                                    value={token}
                                                    onChange={(e) => setToken(e.target.value.toUpperCase())}
                                                    placeholder="RASI-XXX-XXX"
                                                    className="w-full px-8 py-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all font-black text-2xl text-center tracking-widest uppercase"
                                                />
                                            </div>
                                            {error && (
                                                <p className="text-red-400 font-bold bg-red-400/10 py-3 rounded-xl">{error}</p>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:shadow-2xl hover:shadow-purple-500/30 transition-all disabled:opacity-50"
                                            >
                                                {loading ? <FaSpinner className="animate-spin mx-auto text-xl" /> : 'Begin Assessment'}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-purple-600 font-black uppercase tracking-[0.2em] text-[10px]">Test Architecture</span>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-6 mb-8 tracking-tighter">
                            Designed for <span className="text-pink-600 italic">Excellence</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500"
                            >
                                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <feature.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight uppercase tracking-tight">{feature.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pattern Section */}
            <section className="py-32 bg-[#020617] text-white overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <span className="text-amber-400 font-black uppercase tracking-[0.2em] text-[10px]">Exam Pattern</span>
                        <h2 className="text-5xl md:text-6xl font-black mt-6 mb-8 tracking-tighter">
                            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 italic">Assessment</span>
                        </h2>
                        <p className="text-white/40 text-xl max-w-2xl mx-auto font-medium">
                            Our test ensures a complete evaluation of core scientific principles.
                        </p>
                    </motion.div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Compulsory */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10"
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20">
                                        <FaShieldAlt className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black tracking-tight">Compulsory</h3>
                                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Mandatory for all students</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    {subjects.filter(s => s.required).map((subject, index) => (
                                        <div key={index} className="flex items-center justify-between p-8 bg-white/5 rounded-3xl group hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-14 h-14 rounded-2xl ${subject.color} flex items-center justify-center text-xl shadow-lg`}>
                                                    <subject.icon />
                                                </div>
                                                <span className="text-2xl font-black tracking-tight">{subject.name}</span>
                                            </div>
                                            <span className="px-4 py-1.5 bg-purple-500/20 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-widest">Required</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Elective */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-xl rounded-[3rem] p-12 border border-white/10"
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/20">
                                        <FaCheckCircle className="text-2xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black tracking-tight">Electives</h3>
                                        <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Choose any one subject</p>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {subjects.filter(s => !s.required).map((subject, index) => (
                                        <div key={index} className="p-6 bg-white/5 rounded-3xl group hover:bg-white/10 transition-all border border-transparent hover:border-white/10 text-center">
                                            <div className={`w-14 h-14 mx-auto rounded-2xl ${subject.color} flex items-center justify-center text-xl shadow-lg mb-4`}>
                                                <subject.icon />
                                            </div>
                                            <span className="text-xl font-black tracking-tight">{subject.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructions Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-24">
                        <span className="text-purple-600 font-black uppercase tracking-[0.2em] text-[10px]">How It Works</span>
                        <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-6 tracking-tighter">
                            Test <span className="text-pink-600 italic">Protocol</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                step: '01',
                                title: 'Register',
                                description: 'Fill in your personal and academic details in the registration form',
                                color: 'from-blue-500 to-indigo-600',
                            },
                            {
                                step: '02',
                                title: 'Select Subject',
                                description: 'Choose your third elective subject based on your +2 group',
                                color: 'from-purple-500 to-pink-600',
                            },
                            {
                                step: '03',
                                title: 'Take Test',
                                description: 'Answer all questions within 90 minutes and submit to get your result',
                                color: 'from-pink-500 to-amber-500',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className={`w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-3xl font-black shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    {item.step}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight uppercase tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Test Support CTA */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#020617] to-purple-900 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter leading-none">
                                Need Technical <br /><span className="text-purple-400 italic">Support?</span>
                            </h2>
                            <p className="text-xl text-white/40 mb-16 max-w-2xl mx-auto font-medium">
                                Facing issues with registration or login? Our support team is active 24/7 to assist you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                                <Link href="/contact" className="bg-white text-black px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
                                    Contact Support
                                </Link>
                                <a href="tel:+919789446100" className="text-white/60 font-black uppercase tracking-widest text-sm hover:text-white transition-colors">
                                    Call Now: +91 97894 46100
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}

const FaSpinner = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
