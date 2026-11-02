import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { saveCandidateAccessToken, buildCandidateHeaders } from '@/frontend/lib/scholarshipSessionClient';
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
    FaSpinner,
    FaBookOpen,
} from 'react-icons/fa';

function getSubjectIcon(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('physic')) return FaAtom;
    if (n.includes('chem')) return FaFlask;
    if (n.includes('math')) return FaCalculator;
    if (n.includes('bio') || n.includes('botany') || n.includes('zoology')) return FaDna;
    return FaBookOpen;
}

export default function SelectSubjectPage() {
    const router = useRouter();
    const { token } = router.query;

    const [studentInfo, setStudentInfo] = useState(null);
    const [examConfig, setExamConfig] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [language, setLanguage] = useState('English');
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [needsMobileVerification, setNeedsMobileVerification] = useState(false);
    const [verifyMobile, setVerifyMobile] = useState('');
    const [verifyingIdentity, setVerifyingIdentity] = useState(false);

    const applyVerifiedPayload = useCallback((studentJson, config) => {
        if (studentJson.data?.accessToken) {
            saveCandidateAccessToken(studentJson.data.accessToken);
        }
        if (studentJson.testCompleted) {
            const dest = studentJson.sessionId
                ? `/scholarship-test/result?session=${encodeURIComponent(studentJson.sessionId)}`
                : `/scholarship-test/result?token=${encodeURIComponent(token)}`;
            router.replace(dest);
            return;
        }
        if (studentJson.testInProgress && studentJson.sessionId) {
            router.replace(`/scholarship-test/exam?session=${encodeURIComponent(studentJson.sessionId)}`);
            return;
        }

        const student = studentJson.data;
        setStudentInfo(student);
        setNeedsMobileVerification(false);

        const availableElectives = config?.optionalSubjects?.map(s => s.name) || ['Mathematics', 'Biology'];
        let initialElective = availableElectives[0] || 'Mathematics';

        if (student.plus2Group === 'Vocational' && availableElectives.includes('Mathematics')) {
            initialElective = 'Mathematics';
        } else if (student.thirdSubject && availableElectives.includes(student.thirdSubject)) {
            initialElective = student.thirdSubject;
        }

        setSelectedSubject(initialElective);

        if (student.examLanguage) {
            setLanguage(student.examLanguage);
        }
        if (student.pageSize) {
            setPageSize(student.pageSize);
        }
    }, [router, token]);

    const fetchConfigAndStudent = useCallback(async () => {
        try {
            // Fetch live dynamic exam configuration
            const configRes = await fetch('/api/scholarship/exam-config');
            const configJson = await configRes.json();
            const config = configJson.data || null;
            setExamConfig(config);

            // Verify candidate session for token
            const studentRes = await fetch(`/api/scholarship/verify-token?token=${encodeURIComponent(token)}`, {
                credentials: 'same-origin',
                headers: buildCandidateHeaders(),
            });
            const studentJson = await studentRes.json();

            if (!studentRes.ok) {
                if (studentRes.status === 401 && studentJson.requiresVerification) {
                    setNeedsMobileVerification(true);
                    setError('');
                    return;
                }
                throw new Error(studentJson.message || 'Invalid token');
            }

            applyVerifiedPayload(studentJson, config);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token, applyVerifiedPayload]);

    const handleIdentityVerify = async (e) => {
        e.preventDefault();
        const cleanMob = verifyMobile.replace(/\D/g, '');
        if (!/^[6-9]\d{9}$/.test(cleanMob)) {
            setError('Please enter your registered 10-digit mobile number');
            return;
        }
        setVerifyingIdentity(true);
        setError('');
        try {
            const res = await fetch('/api/scholarship/verify-token', {
                method: 'POST',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, mobile: cleanMob }),
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message || 'Identity verification failed');
            }
            applyVerifiedPayload(json, examConfig);
        } catch (err) {
            setError(err.message);
        } finally {
            setVerifyingIdentity(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchConfigAndStudent();
        }
    }, [token, fetchConfigAndStudent]);

    const handleStartTest = async () => {
        if (!selectedSubject) {
            setError('Please select your elective subject');
            return;
        }

        if (examConfig && examConfig.isExamReady === false) {
            setError('Examination is currently unavailable due to maintenance. Please contact administration.');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/start-test', {
                method: 'POST',
                credentials: 'same-origin',
                headers: buildCandidateHeaders({ 'Content-Type': 'application/json' }),
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

            if (data.data?.accessToken) {
                saveCandidateAccessToken(data.data.accessToken);
            }

            router.push(`/scholarship-test/exam?session=${data.data.sessionId}`);
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    const isVocational = studentInfo?.plus2Group === 'Vocational';
    const compulsoryList = examConfig?.compulsorySubjects || [
        { name: 'Physics', questionCount: 20 },
        { name: 'Chemistry', questionCount: 20 },
    ];
    const optionalList = examConfig?.optionalSubjects || [
        { name: 'Mathematics', questionCount: 20 },
        { name: 'Biology', questionCount: 20 },
    ];
    const compulsoryTotal = compulsoryList.reduce((acc, s) => acc + (s.questionCount || 0), 0);
    const optionalQuota = optionalList.find(s => s.name === selectedSubject)?.questionCount || optionalList[0]?.questionCount || 20;
    const totalExamQuestions = examConfig?.totalQuestions || (compulsoryTotal + optionalQuota);
    const examDuration = examConfig?.examDurationMinutes || 90;
    const languagesAvailable = examConfig?.languages || ['English', 'Tamil'];

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

    if (needsMobileVerification && !studentInfo) {
        return (
            <Layout title="Verify Candidate Identity — Rasi Foundation" description="Verify your registered mobile number">
                <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4">
                    <form onSubmit={handleIdentityVerify} className="max-w-md w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                        <h1 className="text-xl font-bold text-gray-900 mb-1 text-center">Verify Candidate Identity</h1>
                        <p className="text-xs text-gray-600 mb-5 text-center">
                            Token <strong className="font-mono text-forest">{token}</strong> requires mobile verification before starting or viewing results.
                        </p>
                        <label className="block text-xs font-bold text-gray-800 mb-1">Registered 10-Digit Mobile Number</label>
                        <input
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            value={verifyMobile}
                            onChange={(e) => setVerifyMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            placeholder="Enter 10-digit mobile number"
                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm font-semibold focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                        />
                        {error && <p className="mt-2 text-xs font-semibold text-crimson">{error}</p>}
                        <button
                            type="submit"
                            disabled={verifyingIdentity}
                            className="rf-btn-primary w-full mt-4 py-3 text-xs font-bold !rounded-xl"
                        >
                            {verifyingIdentity ? 'Verifying…' : 'Verify & Continue'}
                        </button>
                    </form>
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
            description="Select elective subject, question-paper language, and commence the scholarship examination."
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
                        {/* Dynamic Mandatory Subjects Notice */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                                Mandatory Subjects ({compulsoryTotal} Questions)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {compulsoryList.map((comp) => {
                                    const CompIcon = getSubjectIcon(comp.name);
                                    return (
                                        <div key={comp.name} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3.5">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                                                <CompIcon className="text-base" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{comp.name}</p>
                                                <p className="text-[11px] text-gray-500">{comp.questionCount} Compulsory Questions</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dynamic Elective Selection */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2">
                                Choose Elective Subject ({optionalQuota} Questions) <span className="text-crimson">*</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {optionalList.map((opt) => {
                                    const OptIcon = getSubjectIcon(opt.name);
                                    const isOptDisabled = isVocational && opt.name !== 'Mathematics' && optionalList.some(s => s.name === 'Mathematics');
                                    const isSelected = selectedSubject === opt.name;

                                    return (
                                        <label
                                            key={opt.name}
                                            className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                                isSelected
                                                    ? 'border-forest bg-forest/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            } ${isOptDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                                        >
                                            <input
                                                type="radio"
                                                name="elective"
                                                value={opt.name}
                                                disabled={isOptDisabled}
                                                checked={isSelected}
                                                onChange={() => setSelectedSubject(opt.name)}
                                                className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                            />
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <OptIcon className="text-forest text-sm" />
                                                    <p className="text-sm font-bold text-gray-900">{opt.name}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {opt.questionCount} Elective Questions
                                                    {isOptDisabled && ' (Vocational students must take Mathematics)'}
                                                </p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dynamic Language Medium */}
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block mb-2 flex items-center gap-1.5">
                                <FaLanguage className="text-forest" />
                                <span>Question Paper Language Medium</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {languagesAvailable.includes('English') && (
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
                                )}

                                {languagesAvailable.includes('Tamil') && (
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
                                )}
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

                        {/* Dynamic Rules Summary */}
                        <div className="rounded-xl border border-forest/20 bg-forest/5 p-4 text-xs text-gray-700 space-y-1.5">
                            <p className="font-bold text-forest flex items-center gap-1.5">
                                <FaClock />
                                <span>Examination Parameters</span>
                            </p>
                            <p>
                                • Total Questions: <strong>{totalExamQuestions} Questions</strong> ({compulsoryList.map(s => `${s.questionCount} ${s.name}`).join(' + ')} + {optionalQuota} {selectedSubject})
                            </p>
                            <p>• Duration: <strong>{examDuration} Minutes</strong> (Server countdown timer begins immediately upon click)</p>
                            <p>• Marking: <strong>{examConfig?.marksPerQuestion || 1} Mark</strong> per correct answer {examConfig?.negativeMarking > 0 ? `(-${examConfig.negativeMarking} negative marks)` : '(No negative marking)'}</p>
                            <p>• Answers are continuously saved in real time</p>
                        </div>

                        {/* Availability Warning if Exam is not ready */}
                        {examConfig && examConfig.isExamReady === false && (
                            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-xs text-amber-800 flex items-start gap-2.5">
                                <FaExclamationTriangle className="text-amber-600 shrink-0 mt-0.5 text-sm" />
                                <div>
                                    <strong className="font-bold">Administrative Notice:</strong>
                                    <p className="mt-0.5">The examination system is currently verifying subject question quotas. Examination launch is temporarily suspended.</p>
                                </div>
                            </div>
                        )}

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
                            disabled={submitting || (examConfig && examConfig.isExamReady === false)}
                            className="rf-btn-primary w-full py-3.5 text-sm font-bold !rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <FaSpinner className="animate-spin text-sm" />
                                    <span>Launching Examination Session…</span>
                                </>
                            ) : (
                                <>
                                    <FaPlay className="text-xs" />
                                    <span>Commence {examDuration}-Minute Examination</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
