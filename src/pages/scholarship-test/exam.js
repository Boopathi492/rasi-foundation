import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import {
    FaClock,
    FaCheckCircle,
    FaQuestionCircle,
    FaArrowLeft,
    FaArrowRight,
    FaExclamationTriangle,
    FaPaperPlane,
    FaTimes,
    FaListOl,
    FaSpinner,
    FaCheck,
    FaBookmark,
    FaRegBookmark,
    FaEraser,
    FaTag,
} from 'react-icons/fa';

export default function ExamPage() {
    const router = useRouter();
    const { session } = router.query;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [examData, setExamData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [markedReviews, setMarkedReviews] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeSubject, setActiveSubject] = useState('all');
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [savingId, setSavingId] = useState(null);

    // Fetch exam data
    const fetchExamData = useCallback(async () => {
        try {
            const response = await fetch(`/api/scholarship/questions?sessionId=${session}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load examination');
            }

            setExamData(data.data);
            if (data.data.pageSize) {
                setPageSize(data.data.pageSize);
            }

            // Populate answers and marked reviews from server session
            const existingAnswers = {};
            const initialMarked = {};
            data.data.questions.forEach(q => {
                if (q.selectedAnswer) {
                    existingAnswers[q.id] = q.selectedAnswer;
                }
                if (q.markedForReview) {
                    initialMarked[q.id] = true;
                }
            });
            setAnswers(existingAnswers);
            setMarkedReviews(initialMarked);

            // Authoritative server remaining time
            const { remainingSeconds } = data.data.timing;
            setTimeRemaining(Math.max(0, remainingSeconds));

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (session) {
            fetchExamData();
        }
    }, [session, fetchExamData]);

    const handleSubmit = useCallback(async () => {
        if (submitting) return;
        setSubmitting(true);
        try {
            const response = await fetch('/api/scholarship/submit-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId: session }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit examination');
            }

            router.push(`/scholarship-test/result?session=${session}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    }, [session, submitting, router]);

    const handleAutoSubmit = useCallback(async () => {
        setShowSubmitModal(false);
        await handleSubmit();
    }, [handleSubmit]);

    // Timer countdown with auto-submit on expiry
    useEffect(() => {
        if (timeRemaining <= 0) return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, handleAutoSubmit]);

    // Autosave single answer selection
    const saveAnswer = async (questionId, answer, markedForReview) => {
        setSavingId(questionId);
        try {
            const payload = {
                sessionId: session,
                questionId,
            };
            if (answer !== undefined) {
                payload.answer = answer;
            }
            if (markedForReview !== undefined) {
                payload.markedForReview = markedForReview;
            }

            await fetch('/api/scholarship/save-answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            console.error('Failed to save answer:', err);
        } finally {
            setSavingId(null);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer,
        }));
        saveAnswer(questionId, answer);
    };

    const handleClearAnswer = (questionId) => {
        setAnswers(prev => {
            const next = { ...prev };
            delete next[questionId];
            return next;
        });
        saveAnswer(questionId, null);
    };

    const handleToggleMarkReview = (questionId) => {
        const nextVal = !markedReviews[questionId];
        setMarkedReviews(prev => ({
            ...prev,
            [questionId]: nextVal,
        }));
        saveAnswer(questionId, undefined, nextVal);
    };

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Filter by subject tab
    const filteredQuestions = useMemo(() => {
        if (!examData?.questions) return [];
        if (activeSubject === 'all') return examData.questions;
        return examData.questions.filter(q => q.subject === activeSubject);
    }, [examData, activeSubject]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
    const paginatedQuestions = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredQuestions.slice(start, start + pageSize);
    }, [filteredQuestions, currentPage, pageSize]);

    // Counts
    const answeredCount = Object.keys(answers).filter(k => answers[k] !== null && answers[k] !== '').length;
    const markedCount = Object.keys(markedReviews).filter(k => markedReviews[k]).length;
    const totalQuestionsCount = examData?.questions?.length || 60;
    const unansweredCount = Math.max(0, totalQuestionsCount - answeredCount);

    // Timer visual status
    const isCritical = timeRemaining < 300; // < 5 mins
    const isWarning = timeRemaining < 900 && !isCritical; // < 15 mins

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700">Loading your examination session…</p>
                </div>
            </div>
        );
    }

    if (error && !examData) {
        return (
            <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                <div className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-md">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-crimson">
                        <FaExclamationTriangle className="text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Examination Unavailable</h1>
                    <p className="text-xs text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/scholarship-test')}
                        className="rf-btn-primary px-6 py-2.5 text-xs font-semibold !rounded-lg"
                    >
                        Return to Scholarship Portal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Official Scholarship Examination — Rasi Foundation</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="min-h-screen bg-[#f4f7f5] flex flex-col font-sans">
                {/* Authoritative Examination Fixed Header */}
                <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <Image
                                src="/rasi-logo.png"
                                alt="Rasi Foundation"
                                width={36}
                                height={36}
                                className="h-9 w-9 rounded-full object-contain"
                            />
                            <div>
                                <span className="font-heading text-sm font-bold tracking-tight text-forest block leading-tight">
                                    RASI FOUNDATION
                                </span>
                                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                                    Scholarship Examination • {examData?.language || 'English'} Medium
                                </span>
                            </div>
                        </div>

                        {/* Center / Right: Timer & Pagination toggle */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Page size toggle */}
                            <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-1 text-[11px] font-semibold text-gray-600">
                                <span>Show:</span>
                                <button
                                    type="button"
                                    onClick={() => { setPageSize(5); setCurrentPage(1); }}
                                    className={`px-2 py-0.5 rounded ${pageSize === 5 ? 'bg-forest text-white' : 'hover:text-forest'}`}
                                >
                                    5 / page
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setPageSize(10); setCurrentPage(1); }}
                                    className={`px-2 py-0.5 rounded ${pageSize === 10 ? 'bg-forest text-white' : 'hover:text-forest'}`}
                                >
                                    10 / page
                                </button>
                            </div>

                            {/* Authoritative Countdown Timer */}
                            <div className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 border font-mono text-sm sm:text-base font-bold shadow-sm ${
                                isCritical
                                    ? 'border-crimson bg-red-50 text-crimson animate-pulse'
                                    : isWarning
                                    ? 'border-amber-400 bg-amber-50 text-amber-800'
                                    : 'border-forest/25 bg-[#f4f9f6] text-forest'
                            }`}>
                                <FaClock className={`text-xs ${isCritical ? 'text-crimson' : 'text-forest'}`} />
                                <span>{formatTime(timeRemaining)}</span>
                            </div>

                            {/* Finish Button */}
                            <button
                                type="button"
                                onClick={() => setShowSubmitModal(true)}
                                className="rf-btn-maroon px-4 py-2 text-xs font-bold !rounded-lg flex items-center gap-1.5 shadow-sm"
                            >
                                <FaPaperPlane className="text-[10px]" />
                                <span className="hidden sm:inline">Finish &</span>
                                <span>Submit</span>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-1">
                        <div
                            className="bg-forest h-1 transition-all duration-300"
                            style={{ width: `${(answeredCount / totalQuestionsCount) * 100}%` }}
                        />
                    </div>
                </header>

                {/* Main Exam Content Area */}
                <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row gap-6 p-4 sm:p-6">
                    {/* Questions Column */}
                    <div className="flex-1 space-y-4">
                        {/* Subject Tabs & Pagination header */}
                        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-xs flex flex-wrap items-center justify-between gap-2">
                            {/* Subject filter tabs */}
                            <div className="flex flex-wrap items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => { setActiveSubject('all'); setCurrentPage(1); }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                        activeSubject === 'all'
                                            ? 'bg-forest text-white shadow-xs'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    All Questions ({totalQuestionsCount})
                                </button>
                                {examData?.subjects?.map(s => {
                                    const count = examData.questions.filter(q => q.subject === s).length;
                                    return (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => { setActiveSubject(s); setCurrentPage(1); }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                                                activeSubject === s
                                                    ? 'bg-forest text-white shadow-xs'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {s} ({count})
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Page Info */}
                            <span className="text-xs font-medium text-gray-500">
                                Page <strong className="text-gray-900">{currentPage}</strong> of {totalPages}
                            </span>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4">
                            {paginatedQuestions.map((q) => {
                                const selected = answers[q.id];
                                const isMarked = Boolean(markedReviews[q.id]);
                                const isSavingThis = savingId === q.id;

                                return (
                                    <div
                                        key={q.id}
                                        id={`question-${q.index}`}
                                        className={`rounded-xl border bg-white p-5 shadow-xs transition-shadow hover:shadow-sm ${
                                            isMarked ? 'border-amber-400 bg-amber-50/20' : 'border-gray-200'
                                        }`}
                                    >
                                        {/* Question Header */}
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-gray-100 pb-2.5">
                                            <div className="flex items-center gap-2">
                                                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-forest/10 font-bold text-xs text-forest">
                                                    Q{q.index}
                                                </span>
                                                <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                                                    {q.subject}
                                                </span>
                                                {q.topic && (
                                                    <span className="hidden sm:inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                                                        <FaTag className="text-[8px]" /> {q.topic}
                                                    </span>
                                                )}
                                                {q.difficulty && (
                                                    <span className={`capitalize text-[10px] px-1.5 py-0.5 rounded font-medium ${
                                                        q.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                                                        q.difficulty === 'hard' ? 'bg-red-50 text-red-700' :
                                                        'bg-amber-50 text-amber-700'
                                                    }`}>
                                                        {q.difficulty}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {/* Mark for review toggle */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleToggleMarkReview(q.id)}
                                                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border transition-all ${
                                                        isMarked
                                                            ? 'border-purple-300 bg-purple-50 text-purple-700 font-bold'
                                                            : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    title="Mark this question to review later"
                                                >
                                                    {isMarked ? (
                                                        <>
                                                            <FaBookmark className="text-purple-600 text-[10px]" />
                                                            <span>Marked for Review</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaRegBookmark className="text-gray-400 text-[10px]" />
                                                            <span>Mark for Review</span>
                                                        </>
                                                    )}
                                                </button>

                                                {selected ? (
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-forest">
                                                        <FaCheck className="text-[10px]" /> Answered
                                                    </span>
                                                ) : (
                                                    <span className="text-[11px] font-medium text-gray-400">
                                                        Unanswered
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Question Text with Tamil Unicode rendering support */}
                                        <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed mb-4 break-words">
                                            {q.questionText}
                                        </p>

                                        {/* 4 Options */}
                                        <div className="space-y-2">
                                            {q.options?.map((opt) => {
                                                const isSelected = selected === opt.label;
                                                return (
                                                    <label
                                                        key={opt.label}
                                                        className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                                                            isSelected
                                                                ? 'border-forest bg-forest/10 text-gray-900 font-semibold shadow-xs'
                                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70 text-gray-700'
                                                        }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name={`question-${q.id}`}
                                                            value={opt.label}
                                                            checked={isSelected}
                                                            onChange={() => handleAnswerSelect(q.id, opt.label)}
                                                            className="mt-0.5 h-4 w-4 text-forest focus:ring-forest"
                                                        />
                                                        <span className="flex-1 text-xs sm:text-sm leading-snug">
                                                            <strong className="mr-1.5 font-bold text-gray-900">({opt.label})</strong>
                                                            {opt.text}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>

                                        {/* Question Card Bottom Toolbar: Clear Answer & Auto-save status */}
                                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                                            <div>
                                                {selected && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleClearAnswer(q.id)}
                                                        className="inline-flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors text-[11px] font-semibold"
                                                    >
                                                        <FaEraser className="text-[10px]" /> Clear Selected Answer
                                                    </button>
                                                )}
                                            </div>

                                            <div>
                                                {isSavingThis ? (
                                                    <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 italic">
                                                        <FaSpinner className="animate-spin text-[8px]" /> saving answer…
                                                    </span>
                                                ) : selected ? (
                                                    <span className="text-[10px] text-gray-400">Answer saved</span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Pagination Footer Controls */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs flex items-center justify-between gap-3">
                            <button
                                type="button"
                                disabled={currentPage === 1}
                                onClick={() => {
                                    setCurrentPage(p => Math.max(1, p - 1));
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="rf-btn-outline px-4 py-2 text-xs font-semibold !rounded-lg disabled:opacity-40 flex items-center gap-1.5"
                            >
                                <FaArrowLeft className="text-[10px]" />
                                <span>Previous Page</span>
                            </button>

                            <span className="text-xs font-medium text-gray-600">
                                Showing questions {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredQuestions.length)} of {filteredQuestions.length}
                            </span>

                            {currentPage < totalPages ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentPage(p => Math.min(totalPages, p + 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="rf-btn-primary px-5 py-2 text-xs font-semibold !rounded-lg flex items-center gap-1.5"
                                >
                                    <span>Next Page</span>
                                    <FaArrowRight className="text-[10px]" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowSubmitModal(true)}
                                    className="rf-btn-maroon px-5 py-2 text-xs font-bold !rounded-lg shadow-sm flex items-center gap-1.5"
                                >
                                    <span>Review & Submit</span>
                                    <FaPaperPlane className="text-[10px]" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Question Navigator Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-4">
                        {/* Summary Box */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
                            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 flex items-center gap-1.5">
                                <FaListOl className="text-forest" />
                                <span>Question Navigator</span>
                            </h3>

                            {/* 3 Metric counters */}
                            <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                                <div className="rounded-lg bg-forest/10 p-2 text-center">
                                    <span className="block text-base font-extrabold text-forest">{answeredCount}</span>
                                    <span className="text-[10px] font-semibold text-forest/90">Answered</span>
                                </div>
                                <div className="rounded-lg bg-purple-50 p-2 text-center">
                                    <span className="block text-base font-extrabold text-purple-700">{markedCount}</span>
                                    <span className="text-[10px] font-semibold text-purple-700">Review</span>
                                </div>
                                <div className="rounded-lg bg-gray-100 p-2 text-center">
                                    <span className="block text-base font-extrabold text-gray-700">{unansweredCount}</span>
                                    <span className="text-[10px] font-semibold text-gray-600">Pending</span>
                                </div>
                            </div>

                            {/* All 60 Question Pills in Palette */}
                            <div className="max-h-[360px] overflow-y-auto pr-1">
                                <div className="grid grid-cols-5 gap-1.5">
                                    {examData?.questions?.map((q) => {
                                        const isAnswered = Boolean(answers[q.id]);
                                        const isMarked = Boolean(markedReviews[q.id]);

                                        // Find which page this question belongs to in current filter
                                        const questionIndexInFiltered = filteredQuestions.findIndex(fq => fq.id === q.id);
                                        const targetPage = questionIndexInFiltered >= 0
                                            ? Math.floor(questionIndexInFiltered / pageSize) + 1
                                            : null;

                                        // 4 distinct states
                                        let pillClasses = 'border border-gray-200 bg-white text-gray-700 hover:border-forest/50';
                                        if (isAnswered && isMarked) {
                                            pillClasses = 'bg-purple-600 text-white ring-2 ring-forest shadow-xs font-black';
                                        } else if (isMarked) {
                                            pillClasses = 'bg-amber-100 text-amber-900 border-2 border-amber-500 font-extrabold';
                                        } else if (isAnswered) {
                                            pillClasses = 'bg-forest text-white shadow-xs font-bold';
                                        }

                                        return (
                                            <button
                                                key={q.id}
                                                type="button"
                                                onClick={() => {
                                                    if (activeSubject !== 'all' && q.subject !== activeSubject) {
                                                        setActiveSubject('all');
                                                    }
                                                    if (targetPage) {
                                                        setCurrentPage(targetPage);
                                                    }
                                                    setTimeout(() => {
                                                        const el = document.getElementById(`question-${q.index}`);
                                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                    }, 50);
                                                }}
                                                className={`h-8 rounded-md text-xs transition-all relative ${pillClasses}`}
                                            >
                                                {q.index}
                                                {isMarked && (
                                                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 ring-1 ring-white" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Palette Legend */}
                            <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[10px] text-gray-600">
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-forest" /> Answered
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm border border-gray-300 bg-white" /> Unanswered
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-amber-400 border border-amber-500" /> Marked for Review
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-sm bg-purple-600 ring-1 ring-forest" /> Answered & Review
                                </span>
                            </div>
                        </div>

                        {/* Candidate Reference Card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-xs text-xs text-gray-600 space-y-1.5">
                            <p className="font-bold text-gray-800">Examination Reference</p>
                            <p><strong>Total:</strong> 60 Questions (20 Physics, 20 Chemistry, 20 Elective)</p>
                            <p><strong>Duration:</strong> 90 Minutes (Server Enforced)</p>
                            <p><strong>Marking:</strong> +1 mark per correct answer, 0 negative</p>
                            <p><strong>Auto-Save:</strong> Answers & review flags save immediately</p>
                        </div>
                    </aside>
                </main>

                {/* Final Submission Confirmation Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl animate-fadeIn">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest/10 text-forest">
                                <FaQuestionCircle className="text-2xl" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                                Confirm Final Examination Submission?
                            </h3>
                            <p className="text-xs text-gray-500 text-center mb-4">
                                Once submitted, you cannot change your answers. Official scores will be evaluated immediately.
                            </p>

                            {/* Summary Box in Modal */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 mb-5 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Questions:</span>
                                    <strong className="text-gray-900">{totalQuestionsCount}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-forest font-semibold">Answered Questions:</span>
                                    <strong className="text-forest">{answeredCount}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-purple-700 font-semibold">Marked for Review:</span>
                                    <strong className="text-purple-700">{markedCount}</strong>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-amber-700 font-semibold">Unanswered Questions:</span>
                                    <strong className="text-amber-800">{unansweredCount}</strong>
                                </div>
                                <div className="flex justify-between border-t border-gray-200 pt-1.5">
                                    <span className="text-gray-600">Time Remaining:</span>
                                    <strong className="font-mono text-gray-900">{formatTime(timeRemaining)}</strong>
                                </div>
                            </div>

                            {/* Modal CTAs */}
                            <div className="flex flex-col sm:flex-row gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setShowSubmitModal(false)}
                                    disabled={submitting}
                                    className="rf-btn-outline flex-1 py-2.5 text-xs font-semibold !rounded-lg"
                                >
                                    Return to Examination
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="rf-btn-maroon flex-1 py-2.5 text-xs font-bold !rounded-lg flex items-center justify-center gap-1.5"
                                >
                                    {submitting ? (
                                        <>
                                             <FaSpinner className="animate-spin text-xs" />
                                            <span>Submitting…</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaCheckCircle className="text-xs" />
                                            <span>Yes, Submit Now</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
