import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaAtom,
    FaFlask,
    FaCalculator,
    FaDna,
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaLanguage,
    FaClock,
    FaPlay,
    FaSpinner
} from 'react-icons/fa';

export default function SelectSubjectPage() {
    const router = useRouter();
    const { token } = router.query;

    const [studentInfo, setStudentInfo] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [language, setLanguage] = useState('English');
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchStudentInfo = useCallback(async () => {
        try {
            const response = await fetch(`/api/scholarship/verify-token?token=${token}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid token');
            }

            setStudentInfo(data.data);
            if (data.data.plus2Group === 'Vocational') {
                setSelectedSubject('Mathematics');
            }
            if (data.data.thirdSubject) {
                setSelectedSubject(data.data.thirdSubject);
            }
            if (data.data.examLanguage) {
                setLanguage(data.data.examLanguage);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            fetchStudentInfo();
        }
    }, [token, fetchStudentInfo]);

    const handleStartTest = async () => {
        if (!selectedSubject) {
            setError('Please select your elective subject (Mathematics or Biology)');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/start-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registrationToken: token,
                    thirdSubject: selectedSubject,
                    language,
                    pageSize,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to start examination');
            }

            router.push(`/scholarship-test/exam?session=${data.data.sessionId}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    const isVocational = studentInfo?.plus2Group === 'Vocational';

    if (loading) {
        return (
            <Layout title="Verifying Token — Rasi Foundation" description="Loading candidate registration">
                <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-700">Verifying registration token…</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error && !studentInfo) {
        return (
            <Layout title="Invalid Token — Rasi Foundation" description="Token verification failed">
                <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                    <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-crimson">
                            <FaExclamationTriangle className="text-2xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Token Verification Failed</h1>
                        <p className="text-xs text-gray-600 mb-6">{error}</p>
                        <Link
                            href="/scholarship-test/register"
                            className="rf-btn-primary px-6 py-2.5 text-xs font-semibold !rounded-lg inline-flex items-center gap-2"
                        >
                            <span>Go to Candidate Registration</span>
                            <FaArrowRight className="text-xs" />
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Start Examination — Rasi Foundation Scholarship"
            description="Select elective subject, question-paper language, and commence the 60-question examination."
        >
            <section className="min-h-screen bg-[#f8faf9] py-10 sm:py-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center mb-8">
                        <Link href="/scholarship-test" className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-crimson transition-colors mb-3">
                            <FaArrowLeft className="text-[10px]" /> SCHOLARSHIP PORTAL
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Start Scholarship Examination
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Candidate: <strong className="text-gray-900">{studentInfo?.name}</strong> • Token: <strong className="font-mono text-forest">{token}</strong>
                        </p>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm space-y-8">
                        {/* Mandatory Subjects Notice */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                                Mandatory Subjects (40 Questions)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                                        <FaAtom className="text-base" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Physics</p>
                                        <p className="text-[11px] text-gray-500">20 Compulsory Questions</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                                        <FaFlask className="text-base" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Chemistry</p>
                                        <p className="text-[11px] text-gray-500">20 Compulsory Questions</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Elective Selection */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                                Choose Elective Subject (20 Questions) <span className="text-crimson">*</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                    selectedSubject === 'Mathematics'
                                        ? 'border-forest bg-forest/5 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                    <input
                                        type="radio"
                                        name="elective"
                                        value="Mathematics"
                                        checked={selectedSubject === 'Mathematics'}
                                        onChange={() => setSelectedSubject('Mathematics')}
                                        className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FaCalculator className="text-forest text-sm" />
                                            <p className="text-sm font-bold text-gray-900">Mathematics</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Calculus, Algebra, Geometry, Probability</p>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                    selectedSubject === 'Biology'
                                        ? 'border-forest bg-forest/5 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                } ${isVocational ? 'opacity-40 cursor-not-allowed' : ''}`}>
                                    <input
                                        type="radio"
                                        name="elective"
                                        value="Biology"
                                        disabled={isVocational}
                                        checked={selectedSubject === 'Biology'}
                                        onChange={() => setSelectedSubject('Biology')}
                                        className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <FaDna className="text-forest text-sm" />
                                            <p className="text-sm font-bold text-gray-900">Biology</p>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Botany & Zoology, Human Physiology, Genetics</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Language Medium */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2 flex items-center gap-1.5">
                                <FaLanguage className="text-forest" />
                                <span>Question Paper Language Medium</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className={`flex items-start gap-3 rounded-xl border-2 p-3.5 cursor-pointer transition-all ${
                                    language === 'English'
                                        ? 'border-forest bg-forest/5 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                    <input
                                        type="radio"
                                        name="language"
                                        value="English"
                                        checked={language === 'English'}
                                        onChange={() => setLanguage('English')}
                                        className="mt-0.5 h-4 w-4 text-forest focus:ring-forest"
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">English Medium</p>
                                        <p className="text-xs text-gray-500">English question text and options</p>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-3 rounded-xl border-2 p-3.5 cursor-pointer transition-all ${
                                    language === 'Tamil'
                                        ? 'border-forest bg-forest/5 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}>
                                    <input
                                        type="radio"
                                        name="language"
                                        value="Tamil"
                                        checked={language === 'Tamil'}
                                        onChange={() => setLanguage('Tamil')}
                                        className="mt-0.5 h-4 w-4 text-forest focus:ring-forest"
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Tamil Medium (தமிழ்)</p>
                                        <p className="text-xs text-gray-500">தமிழ் வழியில் வினாக்கள் மற்றும் விடைகள்</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Layout Preference */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <span className="text-xs font-bold text-gray-800 block mb-1">
                                Layout Preference: Questions per page
                            </span>
                            <div className="flex items-center gap-4 text-xs text-gray-700">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="pagesize"
                                        value={5}
                                        checked={pageSize === 5}
                                        onChange={() => setPageSize(5)}
                                        className="text-forest focus:ring-forest"
                                    />
                                    <span>5 Questions per page (Recommended)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="pagesize"
                                        value={10}
                                        checked={pageSize === 10}
                                        onChange={() => setPageSize(10)}
                                        className="text-forest focus:ring-forest"
                                    />
                                    <span>10 Questions per page</span>
                                </label>
                            </div>
                        </div>

                        {/* Rules Summary */}
                        <div className="rounded-xl border border-forest/20 bg-forest/5 p-4 text-xs text-gray-700 space-y-1.5">
                            <p className="font-bold text-forest flex items-center gap-1.5">
                                <FaClock />
                                <span>Examination Parameters</span>
                            </p>
                            <p>• Total Questions: <strong>60 Questions</strong> (20 Physics + 20 Chemistry + 20 {selectedSubject})</p>
                            <p>• Duration: <strong>90 Minutes</strong> (Server countdown timer begins immediately upon click)</p>
                            <p>• Answers are continuously saved in real time</p>
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700 flex items-center gap-2">
                                <FaExclamationTriangle className="text-red-600 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Start Exam CTA */}
                        <button
                            type="button"
                            onClick={handleStartTest}
                            disabled={submitting}
                            className="rf-btn-primary w-full py-3.5 text-sm font-bold !rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        >
                            {submitting ? (
                                <>
                                    <FaSpinner className="animate-spin text-sm" />
                                    <span>Launching Examination Session…</span>
                                </>
                            ) : (
                                <>
                                    <FaPlay className="text-xs" />
                                    <span>Commence 90-Minute Examination</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
