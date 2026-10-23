import { useState, useEffect, useCallback } from 'react';
import Layout from '@/frontend/components/Layout';
import Head from 'next/head';
import Link from 'next/link';
import {
    FaAtom,
    FaClock,
    FaCheckCircle,
    FaArrowRight,
    FaArrowLeft,
    FaExclamationTriangle,
    FaPaperPlane,
    FaPlay,
    FaTimes,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaTrophy,
    FaRedo,
    FaTimesCircle,
    FaQuestionCircle,
    FaFlask,
    FaCalculator,
    FaLeaf,
    FaDna,
} from 'react-icons/fa';

export default function PracticeTestPage() {
    const [stage, setStage] = useState('info'); // info, register, test, result
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('Physics');

    // Subject config
    const subjectConfig = {
        Physics: { icon: FaAtom, color: 'from-blue-600 to-indigo-600', bg: 'bg-blue-50', border: 'border-blue-300', activeBorder: 'border-blue-600', ring: 'ring-blue-300', desc: 'Optics, Electrostatics, Magnetism, Nuclear Physics' },
        Chemistry: { icon: FaFlask, color: 'from-green-600 to-emerald-600', bg: 'bg-green-50', border: 'border-green-300', activeBorder: 'border-green-600', ring: 'ring-green-300', desc: 'Organic, Inorganic, Physical Chemistry' },
        Mathematics: { icon: FaCalculator, color: 'from-purple-600 to-violet-600', bg: 'bg-purple-50', border: 'border-purple-300', activeBorder: 'border-purple-600', ring: 'ring-purple-300', desc: 'Calculus, Matrices, Probability, Vectors' },
        Botany: { icon: FaLeaf, color: 'from-emerald-600 to-teal-600', bg: 'bg-emerald-50', border: 'border-emerald-300', activeBorder: 'border-emerald-600', ring: 'ring-emerald-300', desc: 'Plant Biology, Genetics, Biotechnology' },
        Zoology: { icon: FaDna, color: 'from-rose-600 to-pink-600', bg: 'bg-rose-50', border: 'border-rose-300', activeBorder: 'border-rose-600', ring: 'ring-rose-300', desc: 'Human Physiology, Evolution, Immunology' },
        Biology: { icon: FaDna, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', border: 'border-amber-300', activeBorder: 'border-amber-600', ring: 'ring-amber-300', desc: 'Combined Botany and Zoology topics' },
    };
    const currentConfig = subjectConfig[selectedSubject] || subjectConfig.Physics;
    const SubjectIcon = currentConfig.icon;

    // Registration form
    const [formData, setFormData] = useState({
        studentName: '',
        email: '',
        phone: '',
    });

    // Test state
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    // Result state
    const [result, setResult] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // Timer effect
    useEffect(() => {
        if (stage !== 'test' || timeRemaining <= 0) return;

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
    }, [stage, timeRemaining]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const validateRegistration = () => {
        if (!formData.studentName.trim()) {
            setError('Please enter your name');
            return false;
        }
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        return true;
    };

    const startTest = async () => {
        if (!validateRegistration()) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/practice-test/questions?count=15&subject=${selectedSubject}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to load questions');
            }

            setQuestions(data.data.questions);
            setTimeRemaining(data.data.duration * 60); // Convert minutes to seconds
            setStartTime(Date.now());
            setStage('test');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleAutoSubmit = useCallback(() => {
        setShowSubmitModal(false);
        submitTest();
    }, []);

    const submitTest = async () => {
        setLoading(true);
        try {
            const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

            const answersArray = questions.map(q => ({
                questionId: q.id,
                selectedAnswer: answers[q.id] || null,
            }));

            const response = await fetch('/api/practice-test/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentName: formData.studentName,
                    email: formData.email,
                    phone: formData.phone,
                    answers: answersArray,
                    timeTaken,
                    subject: selectedSubject,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit test');
            }

            setResult(data.data);
            setStage('result');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const resetTest = () => {
        setStage('info');
        setQuestions([]);
        setAnswers({});
        setCurrentIndex(0);
        setResult(null);
        setTimeRemaining(0);
        setError('');
    };

    const currentQuestion = questions[currentIndex];
    const progress = {
        answered: Object.keys(answers).length,
        total: questions.length,
    };

    // Info Page
    if (stage === 'info') {
        return (
            <Layout
                title={`Practice Test - ${selectedSubject}`}
                description={`Free ${selectedSubject} practice test with questions from Half-Yearly Examination 2025`}
            >
                <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${currentConfig.color} rounded-2xl mb-6 shadow-lg transition-all duration-500`}>
                                    <SubjectIcon className="text-4xl text-white" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                    Practice <span className="text-indigo-600">Test</span>
                                </h1>
                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                    Select a subject and test your knowledge with exam-style questions
                                </p>
                            </div>

                            {/* Subject Selection */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Your Subject</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {Object.entries(subjectConfig).map(([key, config]) => {
                                        const Icon = config.icon;
                                        const isSelected = selectedSubject === key;
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => setSelectedSubject(key)}
                                                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${isSelected
                                                    ? `${config.bg} ${config.activeBorder} ring-2 ring-offset-2 ${config.ring} shadow-md`
                                                    : `${config.bg} ${config.border} hover:shadow-md cursor-pointer`
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className="text-lg text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-800 text-sm">{key}</h4>
                                                        <p className="text-xs text-gray-500 truncate">{config.desc}</p>
                                                    </div>
                                                    {isSelected && <FaCheckCircle className="text-green-600 text-lg flex-shrink-0" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                        <FaQuestionCircle className="text-2xl text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">15 Questions</h3>
                                    <p className="text-gray-600">Carefully selected MCQ questions covering various topics</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                        <FaClock className="text-2xl text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">30 Minutes</h3>
                                    <p className="text-gray-600">Complete the test within the time limit for best practice</p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                        <FaTrophy className="text-2xl text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Instant Results</h3>
                                    <p className="text-gray-600">Get detailed analysis and correct answers immediately</p>
                                </div>
                            </div>

                            {/* Start Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => setStage('register')}
                                    className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${currentConfig.color} text-white text-lg font-bold rounded-2xl hover:shadow-xl transition-all transform hover:scale-105`}
                                >
                                    <FaPlay />
                                    Start {selectedSubject} Practice Test
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    // Registration Form
    if (stage === 'register') {
        return (
            <Layout
                title="Register - Practice Test"
                description="Enter your details to start the practice test"
            >
                <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-md mx-auto">
                            <div className="bg-white rounded-3xl shadow-2xl p-8">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <FaAtom className="text-2xl text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">Enter Your Details</h2>
                                    <p className="text-gray-600 mt-2">Start your {selectedSubject} practice test</p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                name="studentName"
                                                value={formData.studentName}
                                                onChange={handleFormChange}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleFormChange}
                                                maxLength={10}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder="9876543210"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                                            <FaExclamationTriangle />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => setStage('info')}
                                            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-gray-400 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={startTest}
                                            disabled={loading}
                                            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Loading...
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlay />
                                                    Start Test
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    // Test Page
    if (stage === 'test' && currentQuestion) {
        return (
            <>
                <Head>
                    <title>Practice Test | {selectedSubject}</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>

                <div className="min-h-screen bg-gray-100 flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-50 bg-white shadow-md">
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 bg-gradient-to-r ${currentConfig.color} rounded-lg flex items-center justify-center`}>
                                        <SubjectIcon className="text-white text-xl" />
                                    </div>
                                    <div className="hidden sm:block">
                                        <h1 className="font-bold text-gray-800">{selectedSubject} Practice Test</h1>
                                        <p className="text-xs text-gray-500">{formData.studentName}</p>
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
                        <div className="max-w-4xl mx-auto">
                            {/* Question Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                {/* Question Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {currentQuestion.topic}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {currentQuestion.difficulty}
                                        </span>
                                    </div>
                                    <span className="text-gray-500 text-sm">
                                        Question {currentIndex + 1} of {questions.length}
                                    </span>
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

                                {/* Navigation */}
                                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                                        disabled={currentIndex === 0}
                                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:border-indigo-500 hover:text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FaArrowLeft />
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                                        disabled={currentIndex === questions.length - 1}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                        <FaArrowRight />
                                    </button>
                                </div>
                            </div>

                            {/* Question Navigator */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                                <h3 className="font-bold text-gray-800 mb-4">Question Navigator</h3>
                                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                    {questions.map((q, idx) => {
                                        const isAnswered = answers[q.id];
                                        const isCurrent = currentIndex === idx;

                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentIndex(idx)}
                                                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${isCurrent
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
                                <div className="flex gap-4 mt-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 bg-green-500 rounded"></span> Answered
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 bg-gray-300 rounded"></span> Not Answered
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-3 h-3 bg-indigo-600 rounded"></span> Current
                                    </span>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Submit Modal */}
                    {showSubmitModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
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
                                        onClick={submitTest}
                                        disabled={loading}
                                        className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
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
            </>
        );
    }

    // Result Page
    if (stage === 'result' && result) {
        const gradeColors = {
            green: 'from-green-500 to-emerald-500',
            blue: 'from-blue-500 to-indigo-500',
            yellow: 'from-yellow-500 to-amber-500',
            orange: 'from-orange-500 to-red-400',
            red: 'from-red-500 to-red-600',
        };

        return (
            <Layout
                title="Practice Test Results"
                description="Your physics practice test results"
            >
                <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            {/* Score Card */}
                            <div className={`bg-gradient-to-r ${gradeColors[result.grade.color]} rounded-3xl p-8 text-white text-center mb-8 shadow-2xl`}>
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaTrophy className="text-5xl" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-2">{result.percentage}%</h1>
                                <p className="text-2xl font-semibold mb-1">Grade: {result.grade.grade}</p>
                                <p className="text-white/80">{result.grade.label}</p>
                            </div>

                            {/* Details */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">Test Summary</h2>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">Total Questions</p>
                                        <p className="text-2xl font-bold text-gray-800">{result.totalQuestions}</p>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 text-center">
                                        <p className="text-green-600 text-sm mb-1">Correct</p>
                                        <p className="text-2xl font-bold text-green-700">{result.correctAnswers}</p>
                                    </div>
                                    <div className="bg-red-50 rounded-xl p-4 text-center">
                                        <p className="text-red-600 text-sm mb-1">Wrong</p>
                                        <p className="text-2xl font-bold text-red-700">{result.wrongAnswers}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <p className="text-gray-500 text-sm mb-1">Unanswered</p>
                                        <p className="text-2xl font-bold text-gray-600">{result.unanswered}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                                    <div>
                                        <p className="text-gray-600">Student</p>
                                        <p className="font-bold text-gray-800">{result.studentName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600">Time Taken</p>
                                        <p className="font-bold text-gray-800">{formatTime(result.timeTaken)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Details */}
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className="w-full bg-white rounded-2xl shadow-lg p-4 mb-8 flex items-center justify-between hover:bg-gray-50 transition-all"
                            >
                                <span className="font-bold text-gray-800">View Detailed Answers</span>
                                <FaArrowRight className={`text-gray-400 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                            </button>

                            {/* Detailed Answers */}
                            {showDetails && (
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Analysis</h3>
                                    <div className="space-y-4">
                                        {result.details.map((detail, idx) => (
                                            <div key={idx} className={`p-4 rounded-xl border-2 ${detail.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                                }`}>
                                                <div className="flex items-start gap-3 mb-3">
                                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${detail.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                                        } text-white`}>
                                                        {detail.isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                                                    </span>
                                                    <div>
                                                        <p className="text-sm text-gray-500">{detail.topic}</p>
                                                        <p className="font-medium text-gray-800">{detail.questionText}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-11 grid md:grid-cols-2 gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-500">Your answer:</span>
                                                        <span className={`font-medium ${detail.selectedAnswer ? (detail.isCorrect ? 'text-green-700' : 'text-red-700') : 'text-gray-400'}`}>
                                                            {detail.selectedAnswer || 'Not answered'}
                                                        </span>
                                                    </div>
                                                    {!detail.isCorrect && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-gray-500">Correct:</span>
                                                            <span className="font-medium text-green-700">{detail.correctAnswer}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={resetTest}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                                >
                                    <FaRedo />
                                    Take Another Test
                                </button>
                                <Link
                                    href="/"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-gray-400 transition-all"
                                >
                                    Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    // Loading/Error fallback
    return (
        <Layout title="Practice Test" description="Loading...">
            <div className="min-h-screen flex items-center justify-center">
                {error ? (
                    <div className="text-center">
                        <FaExclamationTriangle className="text-5xl text-red-500 mx-auto mb-4" />
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={resetTest}
                            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                )}
            </div>
        </Layout>
    );
}
