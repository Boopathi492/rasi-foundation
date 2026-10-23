import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaTrophy,
    FaCheckCircle,
    FaTimesCircle,
    FaQuestionCircle,
    FaArrowRight,
    FaHome,
    FaDownload,
    FaShare,
    FaAtom,
    FaFlask,
    FaCalculator,
    FaLeaf,
    FaDna,
    FaClock,
    FaGraduationCap,
    FaExclamationTriangle,
    FaWhatsapp
} from 'react-icons/fa';

export default function ResultPage() {
    const router = useRouter();
    const { session, token } = router.query;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    // Subject icons mapping
    const subjectIcons = {
        'Physics': FaAtom,
        'Chemistry': FaFlask,
        'Mathematics': FaCalculator,
        'Botany': FaLeaf,
        'Zoology': FaDna,
        'Biology': FaDna,
    };

    // Subject colors
    const subjectColors = {
        'Physics': 'from-blue-500 to-indigo-600',
        'Chemistry': 'from-green-500 to-emerald-600',
        'Mathematics': 'from-purple-500 to-violet-600',
        'Botany': 'from-emerald-500 to-teal-600',
        'Zoology': 'from-rose-500 to-pink-600',
        'Biology': 'from-amber-500 to-orange-600',
    };

    useEffect(() => {
        if (session || token) {
            fetchResult();
        }
    }, [session, token]);

    const fetchResult = async () => {
        try {
            let url = '/api/scholarship/result';
            if (token) {
                url += `?token=${token}`;
            } else if (session) {
                // We need to get the token from session
                url += `?session=${session}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load result');
            }

            setResult(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getGrade = (percentage) => {
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
        if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
        if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
        if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
        if (percentage >= 50) return { grade: 'C', color: 'text-amber-600', bg: 'bg-amber-100' };
        if (percentage >= 40) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' };
        return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' };
    };

    const getMessage = (percentage) => {
        if (percentage >= 80) return "Outstanding Performance! 🎉";
        if (percentage >= 60) return "Great Job! Keep it up! 👏";
        if (percentage >= 40) return "Good Effort! Room for improvement 📚";
        return "Don't give up! Keep learning! 💪";
    };

    if (loading) {
        return (
            <Layout title="Loading Result..." description="Loading your test result">
                <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your result...</p>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Error" description="Error loading result">
                <section className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <FaExclamationTriangle className="text-3xl text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Cannot Load Result</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link
                            href="/scholarship-test"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                            <FaHome />
                            Back to Scholarship Test
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    const { student, result: testResult } = result || {};
    const gradeInfo = getGrade(testResult?.percentage || 0);

    const shareToWhatsApp = () => {
        const adminNumber = '918073774591'; // WhatsApp format with country code
        const text = `🌟 *RASI FOUNDATION SCHOLARSHIP RESULT* 🌟\n\n` +
            `👤 *STUDENT IDENTITY:*\n` +
            `• Name: *${student?.name}*\n` +
            `• Reg Token: *${student?.registrationToken}*\n` +
            `• Plus 2 Group: *${student?.plus2Group || 'N/A'}*\n\n` +
            `🎓 *ACADEMIC INTEREST:*\n` +
            `• Course: *${student?.course || 'N/A'}*\n` +
            `• Target College: *${student?.college || 'N/A'}*\n\n` +
            `📊 *EVALUATION SUMMARY:*\n` +
            `• Total Questions: *${testResult?.totalQuestions}*\n` +
            `• Attempted: *${testResult?.attemptedQuestions}*\n` +
            `• Correct Answers: *${testResult?.correctAnswers}*\n\n` +
            `🏆 *OFFICIAL SCORE:* *${testResult?.score} / ${testResult?.totalQuestions}*\n` +
            `📈 *PERCENTAGE:* *${testResult?.percentage}%*\n` +
            `🎖️ *MERIT GRADE:* *${gradeInfo.grade}*\n\n` +
            `⏱️ *TIME TAKEN:* *${testResult?.timeTaken} Minutes*\n\n` +
            `✅ *Authenticated by RASI Foundation Digital Portal*`;

        const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Layout
            title="Test Result"
            description="Your RASI Foundation Scholarship Test Result"
        >
            {/* Hero Section */}
            <section className="relative py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-sm font-semibold mb-6 border border-white/20">
                            <FaTrophy className="text-amber-400" />
                            <span>Scholarship Test Result</span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {getMessage(testResult?.percentage || 0)}
                        </h1>

                        {/* Score Circle */}
                        <div className="relative w-48 h-48 mx-auto my-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - (testResult?.percentage || 0) / 100)}
                                    className="transition-all duration-1000"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f472b6" />
                                        <stop offset="100%" stopColor="#fbbf24" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold">{testResult?.percentage || 0}%</span>
                                <span className={`text-xl font-bold mt-1 px-3 py-1 rounded-full ${gradeInfo.bg} ${gradeInfo.color}`}>
                                    Grade: {gradeInfo.grade}
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <FaCheckCircle className="text-2xl text-green-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{testResult?.correctAnswers || 0}</p>
                                <p className="text-xs text-white/70">Correct</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <FaTimesCircle className="text-2xl text-red-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{testResult?.wrongAnswers || 0}</p>
                                <p className="text-xs text-white/70">Wrong</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <FaQuestionCircle className="text-2xl text-amber-400 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{testResult?.unattempted || 0}</p>
                                <p className="text-xs text-white/70">Unattempted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Results */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Student Info */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {student?.name?.charAt(0) || 'S'}
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-xl font-bold text-gray-800">{student?.name}</h2>
                                    <p className="text-gray-600">{student?.email}</p>
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-sm text-gray-500">Registration Token</p>
                                    <p className="font-mono font-bold text-indigo-600">{student?.registrationToken}</p>
                                </div>
                            </div>
                        </div>

                        {/* Score Summary */}
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center shadow-lg">
                                <FaGraduationCap className="text-3xl text-indigo-600 mx-auto mb-2" />
                                <p className="text-3xl font-bold text-gray-800">{testResult?.score || 0}</p>
                                <p className="text-sm text-gray-500">Total Score</p>
                            </div>
                            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center shadow-lg">
                                <FaQuestionCircle className="text-3xl text-purple-600 mx-auto mb-2" />
                                <p className="text-3xl font-bold text-gray-800">{testResult?.totalQuestions || 0}</p>
                                <p className="text-sm text-gray-500">Total Questions</p>
                            </div>
                            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center shadow-lg">
                                <FaCheckCircle className="text-3xl text-green-600 mx-auto mb-2" />
                                <p className="text-3xl font-bold text-gray-800">{testResult?.attemptedQuestions || 0}</p>
                                <p className="text-sm text-gray-500">Attempted</p>
                            </div>
                            <div className="bg-white border-2 border-gray-100 rounded-xl p-4 text-center shadow-lg">
                                <FaClock className="text-3xl text-amber-600 mx-auto mb-2" />
                                <p className="text-3xl font-bold text-gray-800">{testResult?.timeTaken || 0}</p>
                                <p className="text-sm text-gray-500">Minutes Taken</p>
                            </div>
                        </div>

                        {/* Subject-wise Scores */}
                        <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                                <h3 className="text-lg font-bold">Subject-wise Performance</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {testResult?.subjectWiseScores?.map((subject, index) => {
                                        const Icon = subjectIcons[subject.subject] || FaQuestionCircle;
                                        const colorClass = subjectColors[subject.subject] || 'from-gray-500 to-gray-600';

                                        return (
                                            <div key={index} className="group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                                                            <Icon className="text-white text-lg" />
                                                        </div>
                                                        <span className="font-bold text-gray-800">{subject.subject}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="font-bold text-lg text-gray-800">{subject.correct}</span>
                                                        <span className="text-gray-500">/{subject.total}</span>
                                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${subject.percentage >= 70
                                                            ? 'bg-green-100 text-green-700'
                                                            : subject.percentage >= 40
                                                                ? 'bg-amber-100 text-amber-700'
                                                                : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {subject.percentage}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 rounded-full`}
                                                        style={{ width: `${subject.percentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all border border-gray-200"
                            >
                                <FaHome />
                                Home
                            </Link>

                            <button
                                onClick={shareToWhatsApp}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-1"
                            >
                                <FaWhatsapp className="text-xl" />
                                Send Result to WhatsApp
                            </button>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1"
                            >
                                Contact RASI
                                <FaArrowRight />
                            </Link>
                        </div>

                        {/* Note */}
                        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                            <p className="text-amber-800">
                                <strong>Note:</strong> Scholarship selection will be based on your test score along with other eligibility criteria.
                                Our team will contact you regarding the scholarship decision.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
