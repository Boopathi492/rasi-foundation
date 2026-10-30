import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaCheckCircle,
    FaTimesCircle,
    FaQuestionCircle,
    FaDownload,
    FaShare,
    FaAtom,
    FaFlask,
    FaCalculator,
    FaDna,
    FaClock,
    FaGraduationCap,
    FaExclamationTriangle,
    FaPhone,
    FaHome,
    FaFilePdf,
    FaCalendarAlt,
    FaUniversity,
    FaStar,
    FaRegStar,
    FaCommentDots,
    FaSpinner,
    FaAward,
} from 'react-icons/fa';

export default function ResultPage() {
    const router = useRouter();
    const { session, token } = router.query;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);

    // Feedback state
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackLoading, setFeedbackLoading] = useState(false);
    const [feedbackSuccess, setFeedbackSuccess] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');
    const [rating, setRating] = useState(5);
    const [difficultyRating, setDifficultyRating] = useState('Moderate');
    const [clarityRating, setClarityRating] = useState('Clear');
    const [portalRating, setPortalRating] = useState(5);
    const [comments, setComments] = useState('');

    // Subject icon resolver
    const getSubjectIcon = (subject) => {
        switch (subject) {
            case 'Physics': return FaAtom;
            case 'Chemistry': return FaFlask;
            case 'Mathematics': return FaCalculator;
            default: return FaDna;
        }
    };

    const fetchResult = useCallback(async () => {
        try {
            let url = '/api/scholarship/result';
            if (token) {
                url += `?token=${token}`;
            } else if (session) {
                url += `?session=${session}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load result');
            }

            setResult(data.data);
            if (data.data?.result?.feedbackSubmitted) {
                setFeedbackSubmitted(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token, session]);

    useEffect(() => {
        if (session || token) {
            fetchResult();
        }
    }, [session, token, fetchResult]);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setFeedbackLoading(true);
        setFeedbackError('');

        try {
            const targetSessionId = session || result?.result?.sessionId;
            const res = await fetch('/api/scholarship/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: targetSessionId,
                    rating,
                    difficultyRating,
                    clarityRating,
                    portalRating,
                    comments,
                    language: result?.result?.language || 'English',
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to submit feedback');
            }

            setFeedbackSuccess(true);
            setFeedbackSubmitted(true);
        } catch (err) {
            setFeedbackError(err.message);
        } finally {
            setFeedbackLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout title="Loading Official Result — Rasi Foundation" description="Loading examination scorecard">
                <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm font-semibold text-gray-700">Retrieving certified examination score…</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !result) {
        return (
            <Layout title="Result Unavailable — Rasi Foundation" description="Examination result not ready">
                <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                    <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-crimson">
                            <FaExclamationTriangle className="text-2xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">Scorecard Unavailable</h1>
                        <p className="text-xs text-gray-600 mb-6">{error || 'Result record not found.'}</p>
                        <Link
                            href="/scholarship-test"
                            className="rf-btn-primary px-6 py-2.5 text-xs font-semibold !rounded-lg inline-flex items-center gap-2"
                        >
                            <FaHome />
                            <span>Return to Scholarship Portal</span>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const { student, result: testResult } = result;
    const downloadUrl = `/api/scholarship/download-result?${session ? `session=${session}` : `token=${student.registrationToken}`}`;

    const totalQuestions = testResult.totalQuestions || 60;
    const scoreObtained = testResult.score || 0;
    const percentage = testResult.percentage || Math.round((scoreObtained / totalQuestions) * 100);

    const shareToWhatsApp = () => {
        const text = `🌟 *RASI FOUNDATION SCHOLARSHIP SCORECARD* 🌟\n\n` +
            `👤 *Candidate:* ${student.name}\n` +
            `🎫 *Token:* ${student.registrationToken}\n` +
            `🎯 *Medium:* ${testResult.language || 'English'} Medium\n` +
            `🏆 *Official Score:* ${scoreObtained} / ${totalQuestions} (${percentage}%)\n` +
            `✅ *Correct:* ${testResult.correctAnswers} | ❌ *Wrong:* ${testResult.wrongAnswers} | ⏳ *Unattempted:* ${testResult.unattempted}\n\n` +
            `🎓 *Preferred College:* ${student.college || 'N/A'}\n` +
            `Verified by Rasi Foundation Admission Guidance Council.`;

        const whatsappUrl = `https://wa.me/919789446100?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <Layout
            title={`Scholarship Result — ${student.name} — Rasi Foundation`}
            description="Official candidate score card for Rasi Foundation Scholarship Examination."
        >
            <section className="min-h-screen bg-[#f8faf9] py-10 sm:py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest mb-2">
                            Certified Official Score Card
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Scholarship Examination Result
                        </h1>
                        <p className="mt-2 text-xs sm:text-sm text-gray-600">
                            Candidate Token: <strong className="font-mono text-gray-900">{student.registrationToken}</strong>
                        </p>
                    </div>

                    {/* Main Score Banner Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/rasi-logo.png"
                                    alt="Rasi Foundation"
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-full object-contain bg-white p-1 border border-gray-200"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        +2 Stream: <strong className="text-gray-800">{student.plus2Group}</strong> • {testResult.language || 'English'} Medium
                                    </p>
                                    {student.school && (
                                        <p className="text-xs text-gray-500 mt-0.5 truncate max-w-md">
                                            {student.school}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Score Dial / Badge */}
                            <div className="text-center sm:text-right shrink-0">
                                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                                    Overall Score
                                </span>
                                <div className="inline-flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-forest">{scoreObtained}</span>
                                    <span className="text-lg font-bold text-gray-400">/ {totalQuestions}</span>
                                </div>
                                <span className="block text-xs font-bold text-forest mt-0.5">
                                    {percentage}% Marks
                                </span>
                            </div>
                        </div>

                        {/* Metrics Bar */}
                        <div className="grid grid-cols-3 gap-3 pt-6 text-center">
                            <div className="rounded-xl border border-forest/20 bg-forest/5 p-3 sm:p-4">
                                <FaCheckCircle className="text-forest text-base sm:text-lg mx-auto mb-1" />
                                <span className="block text-lg sm:text-2xl font-extrabold text-forest">
                                    {testResult.correctAnswers}
                                </span>
                                <span className="text-[11px] font-semibold text-gray-600">Correct Answers</span>
                            </div>

                            <div className="rounded-xl border border-red-200 bg-red-50/60 p-3 sm:p-4">
                                <FaTimesCircle className="text-crimson text-base sm:text-lg mx-auto mb-1" />
                                <span className="block text-lg sm:text-2xl font-extrabold text-crimson">
                                    {testResult.wrongAnswers}
                                </span>
                                <span className="text-[11px] font-semibold text-gray-600">Incorrect</span>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                                <FaQuestionCircle className="text-gray-400 text-base sm:text-lg mx-auto mb-1" />
                                <span className="block text-lg sm:text-2xl font-extrabold text-gray-700">
                                    {testResult.unattempted}
                                </span>
                                <span className="text-[11px] font-semibold text-gray-600">Unattempted</span>
                            </div>
                        </div>
                    </div>

                    {/* Subject-Wise Performance Breakdown */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
                        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FaGraduationCap className="text-forest" />
                            <span>Subject-Wise Performance (20 Questions Each)</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {testResult.subjectWiseScores?.map((item) => {
                                const SubIcon = getSubjectIcon(item.subject);
                                return (
                                    <div key={item.subject} className="rounded-xl border border-gray-200 bg-[#f8faf9] p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <SubIcon className="text-forest text-sm" />
                                                <span className="text-sm font-bold text-gray-800">{item.subject}</span>
                                            </div>
                                            <span className="text-xs font-bold text-forest">{item.percentage}%</span>
                                        </div>

                                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                                            <div
                                                className="bg-forest h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>

                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Score:</span>
                                            <strong className="text-gray-900">{item.correct} / {item.total}</strong>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Post-Exam Feedback Section */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <FaCommentDots className="text-forest" />
                                <span>Examination Experience & Feedback</span>
                            </h3>
                            {feedbackSubmitted && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">
                                    <FaCheckCircle className="text-xs" /> Feedback Submitted
                                </span>
                            )}
                        </div>

                        {feedbackSubmitted ? (
                            <div className="rounded-xl bg-forest/5 border border-forest/20 p-4 text-center">
                                <p className="text-xs sm:text-sm font-semibold text-forest">
                                    Thank you for your valuable feedback! Your response helps us continuously improve the examination portal.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                                <p className="text-xs text-gray-600">
                                    Please rate your scholarship examination experience. Your genuine feedback helps us improve our academic evaluation standards.
                                </p>

                                {feedbackError && (
                                    <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                                        {feedbackError}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Overall Rating */}
                                    <div className="rounded-xl border border-gray-100 bg-[#fbfdfc] p-3.5">
                                        <label className="block text-xs font-bold text-gray-800 mb-2">
                                            Overall Examination Rating
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                    className="text-xl text-amber-400 hover:scale-110 transition-transform"
                                                >
                                                    {star <= rating ? <FaStar /> : <FaRegStar className="text-gray-300" />}
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-gray-600 ml-2">{rating} / 5</span>
                                        </div>
                                    </div>

                                    {/* Portal Experience */}
                                    <div className="rounded-xl border border-gray-100 bg-[#fbfdfc] p-3.5">
                                        <label className="block text-xs font-bold text-gray-800 mb-2">
                                            Portal Experience & Speed
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setPortalRating(star)}
                                                    className="text-xl text-amber-400 hover:scale-110 transition-transform"
                                                >
                                                    {star <= portalRating ? <FaStar /> : <FaRegStar className="text-gray-300" />}
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-gray-600 ml-2">{portalRating} / 5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Difficulty Rating */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                                            Exam Difficulty
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Easy', 'Moderate', 'Hard'].map((diff) => (
                                                <button
                                                    key={diff}
                                                    type="button"
                                                    onClick={() => setDifficultyRating(diff)}
                                                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                                                        difficultyRating === diff
                                                            ? 'border-forest bg-forest text-white shadow-xs'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {diff}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question Clarity */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-800 mb-1.5">
                                            Question Clarity
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Clear', 'Fair', 'Unclear'].map((clarity) => (
                                                <button
                                                    key={clarity}
                                                    type="button"
                                                    onClick={() => setClarityRating(clarity)}
                                                    className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                                                        clarityRating === clarity
                                                            ? 'border-forest bg-forest text-white shadow-xs'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {clarity}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Box */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                                        Suggestions or Comments (English or தமிழ்)
                                    </label>
                                    <textarea
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        rows={2}
                                        placeholder="Share any comments regarding the questions, Tamil translation, or test interface..."
                                        className="w-full rounded-lg border border-gray-200 p-2.5 text-xs text-gray-800 focus:border-forest focus:ring-1 focus:ring-forest"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={feedbackLoading}
                                    className="rf-btn-primary py-2.5 px-6 text-xs font-bold !rounded-lg inline-flex items-center gap-2"
                                >
                                    {feedbackLoading ? (
                                        <>
                                            <FaSpinner className="animate-spin text-xs" />
                                            <span>Submitting…</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle className="text-xs" />
                                            <span>Submit Feedback</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Candidate Identity & Preferences Summary */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm mb-6">
                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FaUniversity className="text-forest" />
                            <span>Candidate Record & Preferences</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 text-xs sm:text-sm">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Candidate Name:</span>
                                <strong className="text-gray-800">{student.name}</strong>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Mobile Number:</span>
                                <strong className="font-mono text-gray-800">{student.mobile}</strong>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Aadhaar (Protected):</span>
                                <strong className="font-mono text-gray-800">{student.maskedAadhaar || 'Not Provided'}</strong>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Target Course:</span>
                                <strong className="text-gray-800">{student.course || 'N/A'}</strong>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Preferred College:</span>
                                <strong className="text-gray-800">{student.college || 'N/A'}</strong>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500">Time Taken:</span>
                                <strong className="text-gray-800">{testResult.timeTaken} Minutes</strong>
                            </div>
                        </div>
                    </div>

                    {/* Actions / Export Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <a
                            href={downloadUrl}
                            download
                            className="rf-btn-primary py-3.5 text-xs font-bold !rounded-xl flex items-center justify-center gap-2 shadow-sm"
                        >
                            <FaFilePdf className="text-sm" />
                            <span>Download Official PDF Scorecard</span>
                        </a>

                        <button
                            type="button"
                            onClick={shareToWhatsApp}
                            className="rf-btn-outline py-3.5 text-xs font-semibold !rounded-xl flex items-center justify-center gap-2"
                        >
                            <FaPhone className="text-sm text-forest" />
                            <span>Share with Admission Helpdesk</span>
                        </button>

                        <Link
                            href="/book-counselling"
                            className="rf-btn-maroon py-3.5 text-xs font-bold !rounded-xl flex items-center justify-center gap-2 shadow-sm"
                        >
                            <FaCalendarAlt className="text-sm" />
                            <span>Book Free 1-on-1 Counselling</span>
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/scholarship-test" className="text-xs font-semibold text-gray-500 hover:text-forest transition-colors">
                            ← Return to Scholarship Portal Home
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
