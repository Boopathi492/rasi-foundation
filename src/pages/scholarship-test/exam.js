import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
    FaClock,
    FaCheckCircle,
    FaQuestionCircle,
    FaArrowLeft,
    FaArrowRight,
    FaExclamationTriangle,
    FaPaperPlane,
    FaAtom,
    FaFlask,
    FaCalculator,
    FaLeaf,
    FaDna,
    FaBookmark,
    FaTimes
} from 'react-icons/fa';

export default function ExamPage() {
    const router = useRouter();
    const { session } = router.query;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [examData, setExamData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [activeSubject, setActiveSubject] = useState('all');
    const [savingAnswer, setSavingAnswer] = useState(false);

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
        'Physics': 'bg-blue-500',
        'Chemistry': 'bg-green-500',
        'Mathematics': 'bg-purple-500',
        'Botany': 'bg-emerald-500',
        'Zoology': 'bg-rose-500',
        'Biology': 'bg-amber-500',
    };

    // Fetch exam data
    useEffect(() => {
        if (session) {
            fetchExamData();
        }
    }, [session]);

    // Timer countdown
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
    }, [timeRemaining]);

    const fetchExamData = async () => {
        try {
            const response = await fetch(`/api/scholarship/questions?sessionId=${session}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load exam');
            }

            setExamData(data.data);

            // Initialize answers from existing responses
            const existingAnswers = {};
            data.data.questions.forEach(q => {
                if (q.selectedAnswer) {
                    existingAnswers[q.id] = q.selectedAnswer;
                }
            });
            setAnswers(existingAnswers);

            // Set remaining time
            const { remainingMinutes, remainingSeconds } = data.data.timing;
            setTimeRemaining(remainingMinutes * 60 + remainingSeconds);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const saveAnswer = async (questionId, answer) => {
        setSavingAnswer(true);
        try {
            await fetch('/api/scholarship/save-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: session,
                    questionId,
                    answer,
                }),
            });
        } catch (err) {
            console.error('Failed to save answer:', err);
        } finally {
            setSavingAnswer(false);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer,
        }));
        saveAnswer(questionId, answer);
    };

    const handleAutoSubmit = async () => {
        setShowSubmitModal(false);
        await handleSubmit();
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const response = await fetch('/api/scholarship/submit-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: session,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit test');
            }

            // Navigate to results page
            router.push(`/scholarship-test/result?session=${session}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
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

    const getFilteredQuestions = () => {
        if (!examData?.questions) return [];
        if (activeSubject === 'all') return examData.questions;
        return examData.questions.filter(q => q.subject === activeSubject);
    };

    const filteredQuestions = getFilteredQuestions();
    const currentQuestion = filteredQuestions[currentQuestionIndex];

    const getProgress = () => {
        if (!examData?.questions) return { answered: 0, total: 0 };
        const answered = Object.keys(answers).length;
        return { answered, total: examData.questions.length };
    };

    const progress = getProgress();

    if (loading) {
        return (
            <>
                <Head>
                    <title>Loading Exam... | RASI Foundation</title>
                </Head>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your exam...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error && !examData) {
        return (
            <>
                <Head>
                    <title>Error | RASI Foundation</title>
                </Head>
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <FaExclamationTriangle className="text-3xl text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => router.push('/scholarship-test')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Back to Scholarship Test
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Scholarship Exam | RASI Foundation</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <div className="min-h-screen bg-gray-100 flex flex-col">
                {/* Header / Timer Bar */}
                <header className="sticky top-0 z-50 bg-white shadow-md">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            {/* Logo/Title */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <FaQuestionCircle className="text-white text-xl" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="font-bold text-gray-800">RASI Foundation</h1>
                                    <p className="text-xs text-gray-500">Scholarship Test</p>
                                </div>
                            </div>

                            {/* Timer */}
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold ${timeRemaining <= 300
                                    ? 'bg-red-100 text-red-600 animate-pulse'
                                    : timeRemaining <= 600
                                        ? 'bg-amber-100 text-amber-600'
                                        : 'bg-green-100 text-green-600'
                                }`}>
                                <FaClock />
                                <span>{formatTime(timeRemaining)}</span>
                            </div>

                            {/* Progress */}
                            <div className="hidden md:flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Progress</p>
                                    <p className="font-bold text-gray-800">{progress.answered} / {progress.total}</p>
                                </div>
                                <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                                        style={{ width: `${(progress.answered / progress.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => setShowSubmitModal(true)}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
                            >
                                <FaPaperPlane />
                                <span className="hidden sm:inline">Submit</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Question Panel */}
                        <div className="flex-1">
                            {/* Subject Tabs */}
                            <div className="bg-white rounded-xl shadow-md mb-4 p-2 overflow-x-auto">
                                <div className="flex gap-2 min-w-max">
                                    <button
                                        onClick={() => { setActiveSubject('all'); setCurrentQuestionIndex(0); }}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all ${activeSubject === 'all'
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        All ({examData?.questions?.length || 0})
                                    </button>
                                    {examData?.subjects?.map(subject => {
                                        const Icon = subjectIcons[subject] || FaQuestionCircle;
                                        const count = examData.questions.filter(q => q.subject === subject).length;
                                        const answeredCount = examData.questions.filter(q => q.subject === subject && answers[q.id]).length;

                                        return (
                                            <button
                                                key={subject}
                                                onClick={() => { setActiveSubject(subject); setCurrentQuestionIndex(0); }}
                                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeSubject === subject
                                                        ? 'bg-indigo-600 text-white'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Icon />
                                                <span>{subject}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeSubject === subject
                                                        ? 'bg-white/20'
                                                        : 'bg-gray-200'
                                                    }`}>
                                                    {answeredCount}/{count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Question Card */}
                            {currentQuestion && (
                                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                    {/* Question Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className={`${subjectColors[currentQuestion.subject]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                                                {currentQuestion.subject}
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
                                            </span>
                                        </div>
                                        {answers[currentQuestion.id] && (
                                            <span className="flex items-center gap-1 text-green-600 text-sm">
                                                <FaCheckCircle />
                                                Answered
                                            </span>
                                        )}
                                    </div>

                                    {/* Question Text */}
                                    <div className="mb-8">
                                        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                                            {currentQuestion.questionText}
                                        </h2>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-4">
                                        {currentQuestion.options.map((option) => {
                                            const isSelected = answers[currentQuestion.id] === option.label;

                                            return (
                                                <button
                                                    key={option.label}
                                                    onClick={() => handleAnswerSelect(currentQuestion.id, option.label)}
                                                    className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-4 ${isSelected
                                                            ? 'border-indigo-600 bg-indigo-50 shadow-md'
                                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${isSelected
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        {option.label}
                                                    </span>
                                                    <span className={`text-lg ${isSelected ? 'text-indigo-700 font-medium' : 'text-gray-700'}`}>
                                                        {option.text}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Saving indicator */}
                                    {savingAnswer && (
                                        <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                            Saving answer...
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                            disabled={currentQuestionIndex === 0}
                                            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaArrowLeft />
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => setCurrentQuestionIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                                            disabled={currentQuestionIndex === filteredQuestions.length - 1}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Question Navigator (Sidebar) */}
                        <div className="lg:w-72">
                            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
                                <h3 className="font-bold text-gray-800 mb-4">Question Navigator</h3>

                                {/* Legend */}
                                <div className="flex flex-wrap gap-3 mb-4 text-xs">
                                    <span className="flex items-center gap-1">
                                        <span className="w-4 h-4 bg-green-500 rounded"></span>
                                        Answered
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-4 h-4 bg-gray-300 rounded"></span>
                                        Not Answered
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-4 h-4 bg-indigo-600 rounded"></span>
                                        Current
                                    </span>
                                </div>

                                {/* Question Grid */}
                                <div className="max-h-96 overflow-y-auto pr-2">
                                    {examData?.subjects?.map(subject => (
                                        <div key={subject} className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                                                {(() => {
                                                    const Icon = subjectIcons[subject];
                                                    return Icon ? <Icon className="text-gray-500" /> : null;
                                                })()}
                                                {subject}
                                            </h4>
                                            <div className="grid grid-cols-7 gap-1">
                                                {examData.questions
                                                    .filter(q => q.subject === subject)
                                                    .map((q, idx) => {
                                                        const globalIndex = examData.questions.findIndex(gq => gq.id === q.id);
                                                        const isAnswered = answers[q.id];
                                                        const isCurrent = activeSubject === 'all'
                                                            ? currentQuestionIndex === globalIndex
                                                            : activeSubject === subject && currentQuestionIndex === idx;

                                                        return (
                                                            <button
                                                                key={q.id}
                                                                onClick={() => {
                                                                    if (activeSubject !== 'all' && activeSubject !== subject) {
                                                                        setActiveSubject(subject);
                                                                    }
                                                                    const newIndex = activeSubject === 'all' || activeSubject === subject
                                                                        ? (activeSubject === 'all' ? globalIndex : idx)
                                                                        : idx;
                                                                    setCurrentQuestionIndex(newIndex);
                                                                }}
                                                                className={`w-8 h-8 rounded text-xs font-medium transition-all ${isCurrent
                                                                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                                                                        : isAnswered
                                                                            ? 'bg-green-500 text-white'
                                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                                    }`}
                                                            >
                                                                {idx + 1}
                                                            </button>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Mobile Progress Bar */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-bold text-gray-800">{progress.answered} / {progress.total}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                            style={{ width: `${(progress.answered / progress.total) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Submit Confirmation Modal */}
                {showSubmitModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800">Submit Test?</h3>
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Total Questions</span>
                                    <span className="font-bold text-gray-800">{progress.total}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-green-700">Answered</span>
                                    <span className="font-bold text-green-700">{progress.answered}</span>
                                </div>
                                <div className="flex justify-between p-3 bg-amber-50 rounded-lg">
                                    <span className="text-amber-700">Not Answered</span>
                                    <span className="font-bold text-amber-700">{progress.total - progress.answered}</span>
                                </div>
                            </div>

                            {progress.answered < progress.total && (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6 flex items-start gap-3">
                                    <FaExclamationTriangle className="text-amber-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-amber-700">
                                        You have {progress.total - progress.answered} unanswered questions.
                                        Are you sure you want to submit?
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:border-gray-400 transition-all"
                                >
                                    Continue Test
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Submit Test
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
        </>
    );
}
