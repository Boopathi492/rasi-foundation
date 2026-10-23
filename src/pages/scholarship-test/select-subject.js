import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaAtom,
    FaFlask,
    FaCalculator,
    FaLeaf,
    FaDna,
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaLock,
    FaInfoCircle
} from 'react-icons/fa';

export default function SelectSubjectPage() {
    const router = useRouter();
    const { token } = router.query;

    const [studentInfo, setStudentInfo] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (token) {
            fetchStudentInfo();
        }
    }, [token]);

    const fetchStudentInfo = async () => {
        try {
            const response = await fetch(`/api/scholarship/verify-token?token=${token}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid token');
            }

            setStudentInfo(data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStartTest = async () => {
        if (!selectedSubject) {
            setError('Please select your third subject');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/start-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    registrationToken: token,
                    thirdSubject: selectedSubject,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to start test');
            }

            // Navigate to test page
            router.push(`/scholarship-test/exam?session=${data.data.sessionId}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const subjects = [
        {
            id: 'Mathematics',
            name: 'Mathematics',
            icon: FaCalculator,
            color: 'from-purple-500 to-indigo-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-300',
            selectedBorder: 'border-purple-600',
            description: 'Algebra, Calculus, Trigonometry, Statistics'
        },
        {
            id: 'Botany',
            name: 'Botany',
            icon: FaLeaf,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-300',
            selectedBorder: 'border-green-600',
            description: 'Plant biology, Physiology, Genetics'
        },
        {
            id: 'Zoology',
            name: 'Zoology',
            icon: FaDna,
            color: 'from-rose-500 to-pink-600',
            bgColor: 'bg-rose-50',
            borderColor: 'border-rose-300',
            selectedBorder: 'border-rose-600',
            description: 'Animal biology, Anatomy, Evolution'
        },
        {
            id: 'Biology',
            name: 'Biology',
            icon: FaDna,
            color: 'from-amber-500 to-orange-600',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-300',
            selectedBorder: 'border-amber-600',
            description: 'Combined Botany and Zoology topics'
        },
    ];

    const isVocational = studentInfo?.plus2Group === 'Vocational';

    if (loading) {
        return (
            <Layout title="Loading..." description="Loading subject selection">
                <section className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Verifying your registration...</p>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error && !studentInfo) {
        return (
            <Layout title="Error" description="Invalid registration">
                <section className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
                    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <FaExclamationTriangle className="text-3xl text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Verification Failed</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link
                            href="/scholarship-test"
                            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        >
                            <FaArrowLeft />
                            Back to Scholarship Test
                        </Link>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout
            title="Select Subject"
            description="Select your third subject for RASI Foundation Scholarship Test"
        >
            <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <Link href="/scholarship-test" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">
                                <FaArrowLeft /> Back to Scholarship Test
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Select Your <span className="text-indigo-600">Third Subject</span>
                            </h1>
                            <p className="text-gray-600 mt-2">Choose your elective subject to complete your test</p>
                        </div>

                        {/* Student Info Card */}
                        {studentInfo && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                                        {studentInfo.name?.charAt(0) || 'S'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{studentInfo.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {studentInfo.plus2Group} Group • Token: {token}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Compulsory Subjects */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaLock className="text-indigo-600" />
                                Compulsory Subjects
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <FaAtom className="text-xl text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Physics</h4>
                                        <p className="text-sm text-gray-500">35 Questions</p>
                                    </div>
                                    <FaCheckCircle className="ml-auto text-green-600 text-xl" />
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <FaFlask className="text-xl text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">Chemistry</h4>
                                        <p className="text-sm text-gray-500">35 Questions</p>
                                    </div>
                                    <FaCheckCircle className="ml-auto text-green-600 text-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Vocational Warning */}
                        {isVocational && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                                <FaInfoCircle className="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-amber-800 font-medium">Vocational Group Student</p>
                                    <p className="text-amber-700 text-sm">
                                        As a vocational student, you can only select Mathematics as your third subject.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Elective Subjects */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">
                                Choose Your Third Subject
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {subjects.map((subject) => {
                                    const isDisabled = isVocational && subject.id !== 'Mathematics';
                                    const isSelected = selectedSubject === subject.id;

                                    return (
                                        <button
                                            key={subject.id}
                                            onClick={() => !isDisabled && setSelectedSubject(subject.id)}
                                            disabled={isDisabled}
                                            className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300
                        ${isDisabled
                                                    ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200'
                                                    : isSelected
                                                        ? `${subject.bgColor} ${subject.selectedBorder} ring-2 ring-offset-2 ring-${subject.selectedBorder.replace('border-', '')}`
                                                        : `${subject.bgColor} ${subject.borderColor} hover:shadow-md cursor-pointer`
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 bg-gradient-to-r ${subject.color} rounded-xl flex items-center justify-center`}>
                                                    <subject.icon className="text-xl text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800">{subject.name}</h4>
                                                    <p className="text-sm text-gray-500">{subject.description}</p>
                                                </div>
                                                {isSelected && (
                                                    <FaCheckCircle className="text-green-600 text-xl" />
                                                )}
                                                {isDisabled && (
                                                    <FaLock className="text-gray-400 text-lg" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 mb-6">
                                <FaExclamationTriangle />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Test Info */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                            <h3 className="font-bold text-lg mb-3">Test Information</h3>
                            <ul className="space-y-2 text-white/90">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-300" />
                                    Based on Class 12 TN State Board Syllabus
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-300" />
                                    Total Questions: 105 (35 per subject)
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-300" />
                                    Duration: 90 minutes
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-300" />
                                    Each correct answer: 1 mark
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-300" />
                                    No negative marking
                                </li>
                            </ul>
                        </div>

                        {/* Start Test Button */}
                        <button
                            onClick={handleStartTest}
                            disabled={!selectedSubject || submitting}
                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                'Starting Test...'
                            ) : (
                                <>
                                    Start Scholarship Test
                                    <FaArrowRight />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
