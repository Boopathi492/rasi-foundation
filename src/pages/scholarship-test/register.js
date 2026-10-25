import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaUser,
    FaCalendar,
    FaPhone,
    FaEnvelope,
    FaGraduationCap,
    FaSchool,
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaIdCard,
    FaGlobe,
    FaUserGraduate,
    FaSpinner,
    FaUniversity,
    FaBookOpen,
    FaLanguage,
    FaClock,
    FaFileAlt,
    FaShieldAlt,
    FaPlay
} from 'react-icons/fa';

const TOTAL_STEPS = 6;

const COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST', 'Other'];

const BOARDS = [
    'Tamil Nadu State Board',
    'CBSE',
    'ICSE / ISC',
    'Matriculation',
    'Other State Board',
];

const DEFAULT_COURSES = [
    'B.E / B.Tech - Computer Science & Engineering',
    'B.E / B.Tech - Artificial Intelligence & Data Science',
    'B.E / B.Tech - Electronics & Communication',
    'B.E / B.Tech - Mechanical Engineering',
    'B.E / B.Tech - Electrical & Electronics',
    'B.E / B.Tech - Information Technology',
    'MBBS / BDS',
    'B.Sc Nursing / Allied Health Sciences',
    'B.Pharm / Pharm.D',
    'B.Sc Agriculture / Horticulture',
    'Law (BL / LLB)',
    'Arts & Science (B.Com / B.Sc / BCA)',
    'MBA / MCA',
];

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [startingExam, setStartingExam] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);

    // Dynamic data from MongoDB
    const [collegesList, setCollegesList] = useState([]);
    const [coursesList, setCoursesList] = useState(DEFAULT_COURSES);
    const [loadingColleges, setLoadingColleges] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Candidate Details
        name: '',
        gender: 'Male',
        dateOfBirth: '',
        fatherName: '',
        community: '',
        address: '',

        // Step 2: Contact & Secure Liaison Details
        studentEmail: '',
        studentMobile: '',
        fatherMobile: '',
        motherMobile: '',
        aadhaarNumber: '', // Optional unless policy required; 12 digits

        // Step 3: Academic Profile
        plus2Group: 'Academic',
        plus2ExamNumber: '',
        board: 'Tamil Nadu State Board',
        expectedCutOff: '',
        lastStudiedSchool: '',
        currentClass: '+2 / 12th Standard',
        academicYear: '2025-2026',
        studiedInGovtSchool: false,
        firstGenerationGraduate: false,

        // Step 4: College & Course Preferences
        preferredDistrict: '',
        collegeName: '', // Primary college
        admissionCourse: '', // Primary course
        preferredCollege2: '',
        preferredCourse2: '',

        // Step 5: Examination Subjects & Language
        thirdSubject: 'Mathematics', // Mathematics or Biology
        examLanguage: 'English', // English or Tamil
        pageSize: 5, // 5 or 10 questions per page
    });

    // Fetch colleges and courses from database
    useEffect(() => {
        async function fetchOptions() {
            setLoadingColleges(true);
            try {
                const [colRes, crsRes] = await Promise.all([
                    fetch('/api/colleges'),
                    fetch('/api/courses'),
                ]);

                if (colRes.ok) {
                    const colData = await colRes.json();
                    if (Array.isArray(colData)) {
                        const flatColleges = colData.flatMap(d => d.colleges || []);
                        setCollegesList(flatColleges);
                    }
                }

                if (crsRes.ok) {
                    const crsData = await crsRes.json();
                    if (crsData.courses && Array.isArray(crsData.courses) && crsData.courses.length > 0) {
                        const courseNames = [...new Set(crsData.courses.map(c => c.name))];
                        setCoursesList(courseNames);
                    }
                }
            } catch (err) {
                console.warn('Could not fetch colleges/courses dynamically:', err.message);
            } finally {
                setLoadingColleges(false);
            }
        }
        fetchOptions();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    // Masked Aadhaar preview for privacy
    const maskedAadhaarDisplay = () => {
        const digits = formData.aadhaarNumber.replace(/\D/g, '');
        if (digits.length === 0) return '';
        if (digits.length <= 4) return 'XXXX-XXXX-' + digits;
        return 'XXXX-XXXX-' + digits.slice(-4);
    };

    const validateStep = (stepNum) => {
        setError('');
        switch (stepNum) {
            case 1:
                if (!formData.name.trim()) {
                    setError('Please enter candidate full name');
                    return false;
                }
                if (!formData.dateOfBirth) {
                    setError('Please select candidate date of birth');
                    return false;
                }
                if (!formData.fatherName.trim()) {
                    setError("Please enter father's or guardian's name");
                    return false;
                }
                if (!formData.community) {
                    setError('Please select your community');
                    return false;
                }
                if (!formData.address.trim()) {
                    setError('Please enter residential address');
                    return false;
                }
                break;

            case 2:
                const cleanStudentMobile = formData.studentMobile.replace(/\D/g, '');
                if (!/^[6-9]\d{9}$/.test(cleanStudentMobile)) {
                    setError('Please enter a valid 10-digit student mobile number (starting with 6-9)');
                    return false;
                }
                const cleanFatherMobile = formData.fatherMobile.replace(/\D/g, '');
                if (!/^[6-9]\d{9}$/.test(cleanFatherMobile)) {
                    setError("Please enter a valid 10-digit father's mobile number");
                    return false;
                }
                if (formData.studentEmail && !/^\S+@\S+\.\S+$/.test(formData.studentEmail.trim())) {
                    setError('Please enter a valid email address');
                    return false;
                }
                if (formData.aadhaarNumber) {
                    const cleanAadhaar = formData.aadhaarNumber.replace(/\D/g, '');
                    if (cleanAadhaar.length !== 12) {
                        setError('Aadhaar number must contain exactly 12 digits');
                        return false;
                    }
                }
                break;

            case 3:
                if (!formData.plus2Group) {
                    setError('Please select +2 group');
                    return false;
                }
                if (!formData.plus2ExamNumber.trim()) {
                    setError('Please enter +2 examination registration number');
                    return false;
                }
                const cutOff = parseFloat(formData.expectedCutOff);
                if (isNaN(cutOff) || cutOff < 0 || cutOff > 200) {
                    setError('Please enter a valid expected cut-off between 0 and 200');
                    return false;
                }
                if (!formData.lastStudiedSchool.trim()) {
                    setError('Please enter last studied school name and place');
                    return false;
                }
                break;

            case 4:
                if (!formData.collegeName.trim()) {
                    setError('Please select or enter your preferred college');
                    return false;
                }
                if (!formData.admissionCourse.trim()) {
                    setError('Please select your preferred course');
                    return false;
                }
                break;

            case 5:
                if (!formData.thirdSubject) {
                    setError('Please select your elective examination subject (Mathematics or Biology)');
                    return false;
                }
                if (formData.plus2Group === 'Vocational' && formData.thirdSubject !== 'Mathematics') {
                    setError('Vocational group students must select Mathematics as the elective subject');
                    return false;
                }
                if (!formData.examLanguage) {
                    setError('Please select question paper language (English or Tamil)');
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setError('');
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Validate all steps before submitting
        for (let s = 1; s <= 5; s++) {
            if (!validateStep(s)) {
                setStep(s);
                return;
            }
        }

        setLoading(true);
        setError('');

        const preferredColleges = [];
        if (formData.collegeName) {
            preferredColleges.push({
                collegeName: formData.collegeName,
                courseName: formData.admissionCourse,
                priority: 1,
            });
        }
        if (formData.preferredCollege2) {
            preferredColleges.push({
                collegeName: formData.preferredCollege2,
                courseName: formData.preferredCourse2 || formData.admissionCourse,
                priority: 2,
            });
        }

        const payload = {
            ...formData,
            preferredColleges,
        };

        try {
            const response = await fetch('/api/scholarship/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            setSuccess(data.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Immediate start exam action right after registration
    const handleStartExamNow = async () => {
        if (!success?.registrationToken) return;
        setStartingExam(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/start-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    registrationToken: success.registrationToken,
                    thirdSubject: formData.thirdSubject,
                    language: formData.examLanguage,
                    pageSize: formData.pageSize || 5,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to start examination session');
            }

            router.push(`/scholarship-test/exam?session=${data.data.sessionId}`);
        } catch (err) {
            setError(err.message);
            setStartingExam(false);
        }
    };

    // SUCCESS SCREEN
    if (success) {
        return (
            <Layout title="Registration Complete — Rasi Foundation Scholarship" description="Scholarship Examination Registration Confirmed">
                <section className="min-h-screen bg-[#f8faf9] py-16 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 sm:p-10 shadow-lg text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest/10 text-forest">
                                <FaCheckCircle className="text-4xl text-forest" />
                            </div>

                            <span className="inline-block rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest mb-2">
                                Official Registration Confirmed
                            </span>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
                                Examination Token Issued
                            </h1>
                            <p className="text-gray-600 text-sm mb-6 max-w-lg mx-auto">
                                Welcome, <strong className="text-gray-900">{success.name}</strong>. Your scholarship candidate profile is registered in the official database.
                            </p>

                            {/* Token Box */}
                            <div className="rounded-xl border-2 border-forest/30 bg-[#f4f9f6] p-6 mb-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-forest/80 mb-1">
                                    Your Registration Token
                                </p>
                                <p className="text-3xl sm:text-4xl font-extrabold font-mono text-forest tracking-wider select-all">
                                    {success.registrationToken}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Keep this token safe. It is your permanent reference for the exam and official results.
                                </p>
                            </div>

                            {/* Summary Card */}
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-left mb-8 space-y-2.5 text-xs sm:text-sm">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Candidate Name:</span>
                                    <span className="font-bold text-gray-800">{success.name}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Exam Structure:</span>
                                    <span className="font-bold text-gray-800">60 Questions (20 Physics + 20 Chemistry + 20 {formData.thirdSubject})</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Paper Language:</span>
                                    <span className="font-bold text-forest">{formData.examLanguage} Medium</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="text-gray-500 font-medium">Official Duration:</span>
                                    <span className="font-bold text-gray-800">90 Minutes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 font-medium">Preferred College:</span>
                                    <span className="font-bold text-gray-800">{formData.collegeName}</span>
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
                                    {error}
                                </div>
                            )}

                            {/* Primary CTAs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <button
                                    type="button"
                                    onClick={handleStartExamNow}
                                    disabled={startingExam}
                                    className="rf-btn-primary w-full py-3.5 text-sm font-bold !rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    {startingExam ? (
                                        <>
                                            <FaSpinner className="animate-spin" />
                                            <span>Starting Examination…</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="text-xs" />
                                            <span>Start Official Exam Now</span>
                                        </>
                                    )}
                                </button>

                                <a
                                    href={`https://wa.me/919789446100?text=${encodeURIComponent(
                                        `Hello Rasi Foundation,\n\nI have registered for the Scholarship Examination.\n` +
                                        `Token: ${success.registrationToken}\n` +
                                        `Name: ${formData.name}\n` +
                                        `Elective: ${formData.thirdSubject}\n` +
                                        `Language: ${formData.examLanguage}\n` +
                                        `Mobile: ${formData.studentMobile}`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rf-btn-outline w-full py-3.5 text-sm font-semibold !rounded-xl flex items-center justify-center gap-2"
                                >
                                    <FaPhone className="text-xs" />
                                    <span>Notify Helpdesk</span>
                                </a>
                            </div>

                            <div className="mt-6 text-center">
                                <Link href="/scholarship-test" className="text-xs font-semibold text-gray-500 hover:text-forest transition-colors">
                                    ← Return to Scholarship Portal Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout
            title="Scholarship Examination Registration — Rasi Foundation"
            description="Multi-step registration for the official Rasi Foundation scholarship test. Choose examination subjects, medium of instruction, and college preferences."
        >
            <section className="min-h-screen bg-[#f8faf9] py-10 sm:py-16 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/scholarship-test" className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-crimson transition-colors mb-3">
                            <FaArrowLeft className="text-[10px]" /> SCHOLARSHIP PORTAL
                        </Link>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Scholarship Examination Registration
                        </h1>
                        <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                            Complete your registration to obtain your official candidate token and start the 60-question scholarship assessment.
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="mb-8">
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
                            {[
                                { num: 1, label: 'Identity' },
                                { num: 2, label: 'Liaison' },
                                { num: 3, label: 'Academic' },
                                { num: 4, label: 'Preferences' },
                                { num: 5, label: 'Exam Setup' },
                                { num: 6, label: 'Review' },
                            ].map((s) => (
                                <button
                                    key={s.num}
                                    type="button"
                                    onClick={() => {
                                        if (s.num < step) setStep(s.num);
                                    }}
                                    disabled={s.num > step}
                                    className={`flex flex-col items-center p-2 rounded-xl border text-xs transition-all ${
                                        step === s.num
                                            ? 'border-forest bg-forest text-white shadow-sm font-bold'
                                            : step > s.num
                                            ? 'border-forest/30 bg-forest/5 text-forest font-semibold hover:bg-forest/10 cursor-pointer'
                                            : 'border-gray-200 bg-white text-gray-400 opacity-60 cursor-not-allowed'
                                    }`}
                                >
                                    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold mb-1 ${
                                        step === s.num
                                            ? 'bg-white text-forest'
                                            : step > s.num
                                            ? 'bg-forest text-white'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {step > s.num ? '✓' : s.num}
                                    </span>
                                    <span className="text-[11px] leading-tight truncate w-full">{s.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-10 shadow-sm">
                        <form onSubmit={(e) => { e.preventDefault(); if (step === TOTAL_STEPS) handleSubmit(); else handleNext(); }}>

                            {/* STEP 1: CANDIDATE IDENTITY */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaIdCard className="text-forest" />
                                            <span>Step 1: Candidate Identity</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Please provide basic personal identification as per official school records.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Candidate Full Name <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Candidate full name"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Gender <span className="text-crimson">*</span>
                                            </label>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Date of Birth <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Father&apos;s / Guardian&apos;s Name <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="fatherName"
                                                value={formData.fatherName}
                                                onChange={handleChange}
                                                placeholder="Father or guardian name"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Community Category <span className="text-crimson">*</span>
                                            </label>
                                            <select
                                                name="community"
                                                value={formData.community}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                            >
                                                <option value="">-- Select Community Category --</option>
                                                {COMMUNITIES.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Residential Address <span className="text-crimson">*</span>
                                            </label>
                                            <textarea
                                                name="address"
                                                rows={3}
                                                value={formData.address}
                                                onChange={handleChange}
                                                placeholder="Door number, street, village/town, taluk, district, pincode"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: SECURE LIAISON DETAILS */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaGlobe className="text-forest" />
                                            <span>Step 2: Secure Liaison & Contact</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Contact numbers for official examination updates and counselling communication.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Student Mobile Number <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="studentMobile"
                                                maxLength={10}
                                                value={formData.studentMobile}
                                                onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none font-mono"
                                            />
                                            <span className="text-[11px] text-gray-400 mt-1 block">Primary login and verification contact</span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Father&apos;s Mobile Number <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="fatherMobile"
                                                maxLength={10}
                                                value={formData.fatherMobile}
                                                onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none font-mono"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Student Email Address <span className="font-normal text-gray-500">(Optional)</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="studentEmail"
                                                value={formData.studentEmail}
                                                onChange={handleChange}
                                                placeholder="candidate@example.com"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Mother&apos;s Mobile Number <span className="font-normal text-gray-500">(Optional)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="motherMobile"
                                                maxLength={10}
                                                value={formData.motherMobile}
                                                onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none font-mono"
                                            />
                                        </div>

                                        {/* Aadhaar Field with Masking Preview */}
                                        <div className="sm:col-span-2 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-900 mb-1">
                                                        Aadhaar Number <span className="font-normal text-gray-500">(Optional eligibility verification)</span>
                                                    </label>
                                                    <p className="text-[11px] text-gray-500 mb-2">
                                                        Protected under institutional privacy policy. Never exposed in public APIs, masked in logs and reports.
                                                    </p>
                                                </div>
                                                <FaShieldAlt className="text-forest text-lg shrink-0 mt-1" />
                                            </div>
                                            <input
                                                type="text"
                                                name="aadhaarNumber"
                                                maxLength={14}
                                                value={formData.aadhaarNumber}
                                                onChange={handleChange}
                                                placeholder="12-digit Aadhaar Number (e.g. 1234 5678 9012)"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none font-mono"
                                            />
                                            {formData.aadhaarNumber && (
                                                <div className="mt-2 flex items-center gap-2 text-xs text-forest font-semibold">
                                                    <span>Masked preview:</span>
                                                    <span className="font-mono bg-forest/10 px-2 py-0.5 rounded">{maskedAadhaarDisplay()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: ACADEMIC PROFILE */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaUserGraduate className="text-forest" />
                                            <span>Step 3: Academic Profile</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Details regarding current +2 studies and examination history.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                +2 Group Stream <span className="text-crimson">*</span>
                                            </label>
                                            <select
                                                name="plus2Group"
                                                value={formData.plus2Group}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        plus2Group: val,
                                                        thirdSubject: val === 'Vocational' ? 'Mathematics' : prev.thirdSubject,
                                                    }));
                                                }}
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white font-medium"
                                            >
                                                <option value="Academic">Academic Stream (Science / Maths / Bio)</option>
                                                <option value="Vocational">Vocational Stream</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                +2 Exam Registration Number <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="plus2ExamNumber"
                                                value={formData.plus2ExamNumber}
                                                onChange={handleChange}
                                                placeholder="Roll / Registration No."
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none font-mono"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Education Board / Syllabus <span className="text-crimson">*</span>
                                            </label>
                                            <select
                                                name="board"
                                                value={formData.board}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                            >
                                                {BOARDS.map(b => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Expected +2 Cut-Off (Out of 200) <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="200"
                                                name="expectedCutOff"
                                                value={formData.expectedCutOff}
                                                onChange={handleChange}
                                                placeholder="e.g. 185.5"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Last Studied School & Place <span className="text-crimson">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="lastStudiedSchool"
                                                value={formData.lastStudiedSchool}
                                                onChange={handleChange}
                                                placeholder="School name, town/city (e.g. Govt Higher Secondary School, Rasipuram)"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>

                                        {/* Eligibility Flags */}
                                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="studiedInGovtSchool"
                                                    checked={formData.studiedInGovtSchool}
                                                    onChange={handleChange}
                                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest"
                                                />
                                                <span className="text-xs text-gray-700 leading-snug">
                                                    <strong>Studied in Government School (6th to 12th)</strong>
                                                    <span className="block text-gray-500 text-[11px] mt-0.5">Eligible for special quota reservation support</span>
                                                </span>
                                            </label>

                                            <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="firstGenerationGraduate"
                                                    checked={formData.firstGenerationGraduate}
                                                    onChange={handleChange}
                                                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest"
                                                />
                                                <span className="text-xs text-gray-700 leading-snug">
                                                    <strong>First Generation Graduate Candidate</strong>
                                                    <span className="block text-gray-500 text-[11px] mt-0.5">Eligible for state tuition fee concession support</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: COLLEGE AND COURSE PREFERENCES */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaUniversity className="text-forest" />
                                            <span>Step 4: College & Course Preferences</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Select your preferred colleges and courses for admission guidance & scholarship mapping.</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Priority 1 Preference */}
                                        <div className="rounded-xl border border-forest/20 bg-forest/5 p-4">
                                            <span className="inline-block rounded bg-forest px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
                                                Primary Preference (Priority 1)
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-800 mb-1">
                                                        Preferred College <span className="text-crimson">*</span>
                                                    </label>
                                                    {collegesList.length > 0 ? (
                                                        <select
                                                            name="collegeName"
                                                            value={formData.collegeName}
                                                            onChange={handleChange}
                                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                                        >
                                                            <option value="">-- Choose from Directory --</option>
                                                            {collegesList.map((c, i) => (
                                                                <option key={c._id || i} value={c.name}>
                                                                    {c.name} {c.location ? `(${c.location})` : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name="collegeName"
                                                            value={formData.collegeName}
                                                            onChange={handleChange}
                                                            placeholder="College name"
                                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                                        />
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-800 mb-1">
                                                        Target Degree / Course <span className="text-crimson">*</span>
                                                    </label>
                                                    <select
                                                        name="admissionCourse"
                                                        value={formData.admissionCourse}
                                                        onChange={handleChange}
                                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                                    >
                                                        <option value="">-- Choose Target Course --</option>
                                                        {coursesList.map((crs, i) => (
                                                            <option key={i} value={crs}>{crs}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Priority 2 Preference (Backup) */}
                                        <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                                            <span className="inline-block rounded bg-gray-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white mb-2">
                                                Alternative Option (Priority 2 — Optional)
                                            </span>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-800 mb-1">
                                                        Second Choice College
                                                    </label>
                                                    {collegesList.length > 0 ? (
                                                        <select
                                                            name="preferredCollege2"
                                                            value={formData.preferredCollege2}
                                                            onChange={handleChange}
                                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                                        >
                                                            <option value="">-- Optional Second College --</option>
                                                            {collegesList.map((c, i) => (
                                                                <option key={c._id || i} value={c.name}>
                                                                    {c.name} {c.location ? `(${c.location})` : ''}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name="preferredCollege2"
                                                            value={formData.preferredCollege2}
                                                            onChange={handleChange}
                                                            placeholder="Second choice college"
                                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                                        />
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold text-gray-800 mb-1">
                                                        Second Choice Course
                                                    </label>
                                                    <select
                                                        name="preferredCourse2"
                                                        value={formData.preferredCourse2}
                                                        onChange={handleChange}
                                                        className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs sm:text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none bg-white"
                                                    >
                                                        <option value="">-- Optional Second Course --</option>
                                                        {coursesList.map((crs, i) => (
                                                            <option key={i} value={crs}>{crs}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-800 mb-1">
                                                Preferred District / Zone
                                            </label>
                                            <input
                                                type="text"
                                                name="preferredDistrict"
                                                value={formData.preferredDistrict}
                                                onChange={handleChange}
                                                placeholder="e.g. Namakkal, Salem, Coimbatore, Chennai, Trichy"
                                                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-forest focus:ring-1 focus:ring-forest outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 5: SCHOLARSHIP EXAMINATION SUBJECTS & LANGUAGE */}
                            {step === 5 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaBookOpen className="text-forest" />
                                            <span>Step 5: Examination Blueprint & Language</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Total 60 questions: 20 Physics + 20 Chemistry + 20 Elective. Duration: 90 Minutes.
                                        </p>
                                    </div>

                                    {/* Mandatory Subjects */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
                                            Mandatory Examination Subjects (Fixed: 40 Questions)
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest/10 text-forest font-bold text-xs">P</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">Physics</p>
                                                        <p className="text-[11px] text-gray-500">Compulsory subject</p>
                                                    </div>
                                                </div>
                                                <span className="rounded-full bg-forest/15 px-2.5 py-1 text-[11px] font-bold text-forest">
                                                    20 Questions
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest/10 text-forest font-bold text-xs">C</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">Chemistry</p>
                                                        <p className="text-[11px] text-gray-500">Compulsory subject</p>
                                                    </div>
                                                </div>
                                                <span className="rounded-full bg-forest/15 px-2.5 py-1 text-[11px] font-bold text-forest">
                                                    20 Questions
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Elective Selection */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
                                            Choose Your Elective Subject (20 Questions) <span className="text-crimson">*</span>
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <label className={`flex items-start justify-between rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                                formData.thirdSubject === 'Mathematics'
                                                    ? 'border-forest bg-forest/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        name="thirdSubject"
                                                        value="Mathematics"
                                                        checked={formData.thirdSubject === 'Mathematics'}
                                                        onChange={handleChange}
                                                        className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">Mathematics</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">Calculus, Algebra, Analytical Geometry, Probability</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">20 Qs</span>
                                            </label>

                                            <label className={`flex items-start justify-between rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                                formData.thirdSubject === 'Biology'
                                                    ? 'border-forest bg-forest/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            } ${formData.plus2Group === 'Vocational' ? 'opacity-40 cursor-not-allowed' : ''}`}>
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        name="thirdSubject"
                                                        value="Biology"
                                                        disabled={formData.plus2Group === 'Vocational'}
                                                        checked={formData.thirdSubject === 'Biology'}
                                                        onChange={handleChange}
                                                        className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">Biology</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">Botany & Zoology, Genetics, Human Physiology, Ecology</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">20 Qs</span>
                                            </label>
                                        </div>
                                        {formData.plus2Group === 'Vocational' && (
                                            <p className="text-[11px] text-amber-700 mt-1.5 font-medium">
                                                * Note: Vocational stream candidates are assigned Mathematics according to university eligibility norms.
                                            </p>
                                        )}
                                    </div>

                                    {/* Question Paper Language */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                                            <FaLanguage className="text-forest text-base" />
                                            <span>Question Paper Language Medium <span className="text-crimson">*</span></span>
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                                formData.examLanguage === 'English'
                                                    ? 'border-forest bg-forest/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <input
                                                    type="radio"
                                                    name="examLanguage"
                                                    value="English"
                                                    checked={formData.examLanguage === 'English'}
                                                    onChange={handleChange}
                                                    className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                                />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">English Medium</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        Questions, options and explanations will appear entirely in English.
                                                    </p>
                                                </div>
                                            </label>

                                            <label className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                                                formData.examLanguage === 'Tamil'
                                                    ? 'border-forest bg-forest/5 shadow-sm'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <input
                                                    type="radio"
                                                    name="examLanguage"
                                                    value="Tamil"
                                                    checked={formData.examLanguage === 'Tamil'}
                                                    onChange={handleChange}
                                                    className="mt-1 h-4 w-4 text-forest focus:ring-forest"
                                                />
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Tamil Medium (தமிழ் வழி)</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        வினாக்கள் மற்றும் விடைகள் தமிழ் வழியில் வழங்கப்படும்.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Configurable Pagination */}
                                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                        <label className="block text-xs font-bold text-gray-800 mb-1">
                                            Questions Display Layout Preference
                                        </label>
                                        <div className="flex items-center gap-4 text-xs text-gray-700">
                                            <label className="flex items-center gap-2 cursor-pointer font-medium">
                                                <input
                                                    type="radio"
                                                    name="pageSize"
                                                    value={5}
                                                    checked={Number(formData.pageSize) === 5}
                                                    onChange={() => setFormData(p => ({ ...p, pageSize: 5 }))}
                                                    className="text-forest focus:ring-forest"
                                                />
                                                <span>5 Questions per page (Recommended for focus)</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer font-medium">
                                                <input
                                                    type="radio"
                                                    name="pageSize"
                                                    value={10}
                                                    checked={Number(formData.pageSize) === 10}
                                                    onChange={() => setFormData(p => ({ ...p, pageSize: 10 }))}
                                                    className="text-forest focus:ring-forest"
                                                />
                                                <span>10 Questions per page</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 6: INSTRUCTIONS & REVIEW BEFORE SUBMIT */}
                            {step === 6 && (
                                <div className="space-y-6">
                                    <div className="border-b border-gray-100 pb-3">
                                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                            <FaFileAlt className="text-forest" />
                                            <span>Step 6: Review & Examination Rules</span>
                                        </h2>
                                        <p className="text-xs text-gray-500 mt-0.5">Please review your registration details and read the examination rules before submitting.</p>
                                    </div>

                                    {/* Registration Summary Box */}
                                    <div className="rounded-xl border border-gray-200 bg-[#f8faf9] p-5 space-y-3 text-xs sm:text-sm">
                                        <h3 className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-2">
                                            Candidate Registration Summary
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                                            <div>
                                                <span className="text-gray-500 font-medium">Full Name:</span>{' '}
                                                <strong className="text-gray-800">{formData.name}</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Contact Mobile:</span>{' '}
                                                <strong className="text-gray-800">{formData.studentMobile}</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">+2 Stream & Reg:</span>{' '}
                                                <strong className="text-gray-800">{formData.plus2Group} ({formData.plus2ExamNumber})</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Expected Cut-off:</span>{' '}
                                                <strong className="text-forest">{formData.expectedCutOff} / 200</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Preferred College:</span>{' '}
                                                <strong className="text-gray-800">{formData.collegeName}</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Preferred Course:</span>{' '}
                                                <strong className="text-gray-800">{formData.admissionCourse}</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Exam Subjects:</span>{' '}
                                                <strong className="text-forest">Physics + Chemistry + {formData.thirdSubject}</strong>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 font-medium">Language Medium:</span>{' '}
                                                <strong className="text-forest">{formData.examLanguage} Medium</strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Authoritative Examination Instructions */}
                                    <div className="rounded-xl border border-forest/30 bg-white p-5 space-y-3">
                                        <h3 className="font-bold text-forest text-sm flex items-center gap-2">
                                            <FaClock />
                                            <span>Official Examination Guidelines</span>
                                        </h3>
                                        <ul className="space-y-2 text-xs text-gray-700 list-disc list-inside">
                                            <li><strong>Total Questions:</strong> 60 Multiple-Choice Questions (20 Physics, 20 Chemistry, 20 {formData.thirdSubject}).</li>
                                            <li><strong>Official Duration:</strong> 90 Minutes (Strict server-tracked countdown).</li>
                                            <li><strong>Scoring Scheme:</strong> +1 mark for each correct answer; no negative marks for incorrect or unattempted questions.</li>
                                            <li><strong>Single Selection:</strong> Each question has 4 options (A, B, C, D) and exactly 1 correct answer.</li>
                                            <li><strong>Real-time Auto-save:</strong> Answers are saved to the server as soon as you select them. Refreshing the browser will resume your session safely.</li>
                                            <li><strong>Auto-Submission:</strong> The examination will automatically submit when the 90-minute timer expires.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* Error Banner */}
                            {error && (
                                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center gap-2">
                                    <FaExclamationTriangle className="shrink-0 text-red-600" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-100">
                                {step > 1 ? (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="rf-btn-outline w-full sm:w-auto px-6 py-2.5 text-xs font-semibold !rounded-lg"
                                    >
                                        <FaArrowLeft className="text-[10px]" />
                                        <span>Previous Step</span>
                                    </button>
                                ) : (
                                    <div />
                                )}

                                {step < TOTAL_STEPS ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="rf-btn-primary w-full sm:w-auto px-7 py-2.5 text-xs font-semibold !rounded-lg"
                                    >
                                        <span>Proceed to Step {step + 1}</span>
                                        <FaArrowRight className="text-[10px]" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="rf-btn-maroon w-full sm:w-auto px-8 py-3 text-sm font-bold !rounded-lg flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        {loading ? (
                                            <>
                                                <FaSpinner className="animate-spin text-xs" />
                                                <span>Submitting Registration…</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaCheckCircle className="text-xs" />
                                                <span>Confirm & Generate Exam Token</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
