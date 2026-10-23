import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import {
    FaUser,
    FaCalendar,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaSchool,
    FaUserFriends,
    FaArrowRight,
    FaArrowLeft,
    FaCheckCircle,
    FaExclamationTriangle,
    FaIdCard,
    FaGlobe,
    FaUserGraduate,
    FaSpinner,
    FaRocket
} from 'react-icons/fa';

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);

    const [formData, setFormData] = useState({
        // Personal Details
        name: '',
        dateOfBirth: '',
        fatherName: '',
        community: '',
        address: '',

        // Contact Details
        studentEmail: '',
        studentMobile: '',
        fatherMobile: '',
        motherMobile: '',

        // Academic Details
        admissionCourse: '',
        collegeName: '',
        plus2Group: '',
        plus2ExamNumber: '',
        expectedCutOff: '',
        lastStudiedSchool: '',
        studiedInGovtSchool: false,
        firstGenerationGraduate: false,
    });

    useEffect(() => {
        if (success) {
            const adminNumber = '918073774591';
            const text = `🌟 *NEW SCHOLARSHIP REGISTRATION* 🌟\n\n` +
                `👤 *CANDIDATE IDENTITY:*\n` +
                `• Name: *${success.name}*\n` +
                `• Token: *${success.registrationToken}*\n` +
                `• Group: *${success.plus2Group}*\n\n` +
                `🎓 *ACADEMIC PROFILE:*\n` +
                `• Course: *${formData.admissionCourse}*\n` +
                `• Mobile: *${formData.studentMobile}*\n` +
                `• School: *${formData.lastStudiedSchool}*\n` +
                `• Cut-off: *${formData.expectedCutOff}*\n\n` +
                `✅ _Please verify my registration for the scholarship test._`;

            const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;

            // Automate the redirection after a short delay
            const timer = setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const validateStep = (stepNum) => {
        switch (stepNum) {
            case 1:
                if (!formData.name || !formData.dateOfBirth || !formData.fatherName || !formData.community || !formData.address) {
                    setError('Please fill all required fields');
                    return false;
                }
                break;
            case 2:
                if (!formData.studentMobile || !formData.fatherMobile) {
                    setError('Please fill all required fields');
                    return false;
                }
                // Email validation (only if provided)
                if (formData.studentEmail && !/^\S+@\S+\.\S+$/.test(formData.studentEmail)) {
                    setError('Please enter a valid email address');
                    return false;
                }
                // Mobile validation
                if (!/^[6-9]\d{9}$/.test(formData.studentMobile)) {
                    setError('Please enter a valid 10-digit student mobile number');
                    return false;
                }
                if (!/^[6-9]\d{9}$/.test(formData.fatherMobile)) {
                    setError('Please enter a valid 10-digit father mobile number');
                    return false;
                }
                break;
            case 3:
                if (!formData.admissionCourse || !formData.collegeName || !formData.plus2Group ||
                    !formData.plus2ExamNumber || !formData.expectedCutOff || !formData.lastStudiedSchool) {
                    setError('Please fill all required fields');
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => Math.min(prev + 1, 3));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/scholarship/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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

    const communities = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST', 'Other'];
    const courses = [
        'B.E/B.Tech - Computer Science',
        'B.E/B.Tech - Electronics',
        'B.E/B.Tech - Mechanical',
        'B.E/B.Tech - Civil',
        'B.E/B.Tech - EEE',
        'B.E/B.Tech - IT',
        'B.E/B.Tech - Other',
        'MBBS',
        'BDS',
        'B.Pharm',
        'B.Sc Nursing',
        'MBA',
        'MCA',
        'BBA',
        'B.Com',
        'B.Sc',
        'B.A',
        'Other',
    ];

    if (success) {
        return (
            <Layout title="Registration Successful" description="RASI Foundation Scholarship Test Registration Complete">
                <section className="min-h-screen bg-gray-50 py-24 px-4 overflow-hidden relative">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="container mx-auto relative z-10">
                        <div className="max-w-xl mx-auto bg-white border border-gray-100 rounded-[2.5rem] p-10 md:p-12 shadow-2xl text-center">
                            <div className="w-24 h-24 mx-auto mb-8 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur opacity-50 transition duration-1000"></div>
                                <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-inner">
                                    <FaCheckCircle className="text-5xl text-green-600" />
                                </div>
                            </div>

                            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Registration <span className="text-red-600">Successful!</span></h1>
                            <p className="text-gray-500 mb-10 font-medium">
                                Your application for the RASI Foundation Scholarship Test has been processed.
                            </p>

                            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-10 relative overflow-hidden group">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Registration Token</p>
                                <p className="text-4xl font-black text-green-600 font-mono tracking-tighter mb-4">
                                    {success.registrationToken}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 italic">
                                    Please save this token. It is required to start your test.
                                </p>
                            </div>

                            <div className="space-y-4 text-left mb-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Candidate</span>
                                    <span className="font-bold text-gray-800">{success.name}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Contact</span>
                                    <span className="font-bold text-gray-800">{success.email}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Group</span>
                                    <span className="font-bold text-gray-800">{success.plus2Group}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <Link
                                    href={`/scholarship-test/select-subject?token=${success.registrationToken}`}
                                    className="relative group/btn overflow-hidden rounded-2xl p-[2px] flex items-center justify-center shadow-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-green-600 bg-[length:200%_100%] animate-gradient"></div>
                                    <div className="relative w-full bg-[#020617] py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-white uppercase tracking-[0.2em] text-xs group-hover/btn:bg-transparent transition-colors">
                                        Start Test <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </Link>

                                <a
                                    href={`https://wa.me/918073774591?text=${encodeURIComponent(
                                        `*NEW SCHOLARSHIP REGISTRATION*\n\n` +
                                        `*Token:* ${success.registrationToken}\n` +
                                        `*Name:* ${formData.name}\n` +
                                        `*Course:* ${formData.admissionCourse}\n` +
                                        `*Mobile:* ${formData.studentMobile}\n` +
                                        `*School:* ${formData.lastStudiedSchool}\n` +
                                        `*Cut-off:* ${formData.expectedCutOff}\n\n` +
                                        `_Please verify my registration for the scholarship test._`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-green-700 transition-all shadow-xl shadow-green-100"
                                >
                                    Confirm on WhatsApp <FaCheckCircle className="text-sm" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout
            title="Scholarship Registration"
            description="Register for RASI Foundation Online Scholarship Test"
        >
            <section className="min-h-screen bg-gray-50 py-20 px-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-red-600 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-green-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <Link href="/scholarship-test" className="inline-flex items-center gap-2 text-gray-400 hover:text-red-600 transition-colors mb-8 text-sm group font-bold">
                                <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" /> BACK TO DASHBOARD
                            </Link>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">
                                Test <span className="text-red-600 italic">Registration</span>
                            </h1>
                            <p className="text-gray-500 text-lg font-medium">Complete the registration to obtain your secure examination token.</p>
                        </div>

                        {/* Progress Stepper */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 md:gap-4 max-w-2xl mx-auto px-4">
                            {[
                                { step: 1, label: 'Candidate Identity', icon: FaIdCard },
                                { step: 2, label: 'Secure Liaison', icon: FaGlobe },
                                { step: 3, label: 'Academic Profile', icon: FaUserGraduate }
                            ].map((s) => (
                                <div key={s.step} className="flex-1 w-full flex flex-col items-center group relative">
                                    <div className="flex items-center w-full">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-all duration-700 relative z-10 ${step >= s.step
                                            ? 'bg-red-600 text-white shadow-xl shadow-red-600/20'
                                            : 'bg-white text-gray-300 border border-gray-100 shadow-sm'
                                            }`}>
                                            <s.icon className="text-xl" />
                                        </div>
                                        {s.step < 3 && (
                                            <div className="hidden md:block flex-1 h-[2px] mx-4 relative bg-gray-100 overflow-hidden">
                                                <div className={`absolute inset-0 bg-red-600 transition-all duration-1000 ${step > s.step ? 'translate-x-0' : '-translate-x-full'}`}></div>
                                            </div>
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-4 transition-colors ${step >= s.step ? 'text-red-600' : 'text-gray-300'}`}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Main Form Container */}
                        <div className="relative group/form">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/5 to-green-600/5 rounded-[2.5rem] blur opacity-50"></div>
                            <div className="relative bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-10">

                                    {/* Step 1: Personal Details */}
                                    {step === 1 && (
                                        <div className="space-y-10 animate-fadeIn">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Candidate Full Name *</label>
                                                    <div className="relative group/input">
                                                        <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-red-500 transition-colors" />
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                            placeholder="Personal Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Date of Birth *</label>
                                                    <div className="relative group/input">
                                                        <FaCalendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-red-500 transition-colors" />
                                                        <input
                                                            type="date"
                                                            name="dateOfBirth"
                                                            value={formData.dateOfBirth}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all font-bold block"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Father&apos;s Name *</label>
                                                    <input
                                                        type="text"
                                                        name="fatherName"
                                                        value={formData.fatherName}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Guardian Name"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Community *</label>
                                                    <select
                                                        name="community"
                                                        value={formData.community}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                                                    >
                                                        <option value="">SELECT COMMUNITY</option>
                                                        {communities.map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Current Address *</label>
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    rows={3}
                                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold resize-none"
                                                    placeholder="Complete Residential Address"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Contact Details */}
                                    {step === 2 && (
                                        <div className="space-y-10 animate-fadeIn">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Student Email (Optional)</label>
                                                    <div className="relative group/input">
                                                        <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-red-500 transition-colors" />
                                                        <input
                                                            type="email"
                                                            name="studentEmail"
                                                            value={formData.studentEmail}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                            placeholder="example@email.com"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Mobile Number *</label>
                                                    <div className="relative group/input">
                                                        <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-red-500 transition-colors" />
                                                        <input
                                                            type="tel"
                                                            name="studentMobile"
                                                            value={formData.studentMobile}
                                                            onChange={handleChange}
                                                            maxLength={10}
                                                            className="w-full bg-gray-50 border border-gray-200 text-gray-800 pl-14 pr-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                            placeholder="91-0000000000"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Father&apos;s Mobile *</label>
                                                    <input
                                                        type="tel"
                                                        name="fatherMobile"
                                                        value={formData.fatherMobile}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Primary Guardian Mobile"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Mother&apos;s Mobile</label>
                                                    <input
                                                        type="tel"
                                                        name="motherMobile"
                                                        value={formData.motherMobile}
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Secondary Contact (Optional)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Academic Details */}
                                    {step === 3 && (
                                        <div className="space-y-10 animate-fadeIn">
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Planned Course *</label>
                                                    <select
                                                        name="admissionCourse"
                                                        value={formData.admissionCourse}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                                                    >
                                                        <option value="">SELECT TARGET COURSE</option>
                                                        {courses.map(c => (
                                                            <option key={c} value={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Preferred College *</label>
                                                    <input
                                                        type="text"
                                                        name="collegeName"
                                                        value={formData.collegeName}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Institution Name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">+2 Group *</label>
                                                    <select
                                                        name="plus2Group"
                                                        value={formData.plus2Group}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all font-bold appearance-none cursor-pointer"
                                                    >
                                                        <option value="">SELECT GROUP</option>
                                                        <option value="Academic">ACADEMIC</option>
                                                        <option value="Vocational">VOCATIONAL</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">+2 Exam Number *</label>
                                                    <input
                                                        type="text"
                                                        name="plus2ExamNumber"
                                                        value={formData.plus2ExamNumber}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Registration Number"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Expected Cut Off *</label>
                                                    <input
                                                        type="number"
                                                        name="expectedCutOff"
                                                        value={formData.expectedCutOff}
                                                        onChange={handleChange}
                                                        min="0"
                                                        max="200"
                                                        step="0.1"
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="e.g. 195.5"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">School & Place *</label>
                                                    <input
                                                        type="text"
                                                        name="lastStudiedSchool"
                                                        value={formData.lastStudiedSchool}
                                                        onChange={handleChange}
                                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 px-6 py-5 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500/50 outline-none transition-all placeholder:text-gray-300 font-bold"
                                                        placeholder="Last Institutional Place"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="flex items-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl transition-all hover:bg-white group/check">
                                                    <input
                                                        type="checkbox"
                                                        name="studiedInGovtSchool"
                                                        id="studiedInGovtSchool"
                                                        checked={formData.studiedInGovtSchool}
                                                        onChange={handleChange}
                                                        className="w-6 h-6 rounded-lg text-red-600 focus:ring-red-500 focus:ring-offset-0 border-gray-300 cursor-pointer"
                                                    />
                                                    <label htmlFor="studiedInGovtSchool" className="text-[11px] font-black text-gray-500 uppercase tracking-widest cursor-pointer group-hover/check:text-gray-900 transition-colors">
                                                        Govt School (6th to 12th)
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-4 p-6 bg-gray-50 border border-gray-200 rounded-2xl transition-all hover:bg-white group/check">
                                                    <input
                                                        type="checkbox"
                                                        name="firstGenerationGraduate"
                                                        id="firstGenerationGraduate"
                                                        checked={formData.firstGenerationGraduate}
                                                        onChange={handleChange}
                                                        className="w-6 h-6 rounded-lg text-red-600 focus:ring-red-500 focus:ring-offset-0 border-gray-300 cursor-pointer"
                                                    />
                                                    <label htmlFor="firstGenerationGraduate" className="text-[11px] font-black text-gray-500 uppercase tracking-widest cursor-pointer group-hover/check:text-gray-900 transition-colors">
                                                        First Gen Graduate
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-4 text-red-600 animate-shake text-xs font-bold uppercase tracking-widest">
                                            <FaExclamationTriangle />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-10 border-t border-gray-50">
                                        {step > 1 ? (
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="flex items-center justify-center gap-3 px-10 py-5 bg-gray-50 text-gray-500 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-100 hover:text-gray-900 transition-all border border-gray-200"
                                            >
                                                <FaArrowLeft className="text-[10px]" /> Previous
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}

                                        {step < 3 ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="relative group/next overflow-hidden rounded-2xl p-[2px]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500"></div>
                                                <div className="relative bg-[#020617] px-12 py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-white uppercase tracking-[0.2em] text-[10px] group-hover/next:bg-transparent transition-colors">
                                                    Next Phase <FaArrowRight className="text-[10px] group-hover/next:translate-x-1 transition-transform" />
                                                </div>
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="relative group/submit overflow-hidden rounded-2xl p-[2px]"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"></div>
                                                <div className="relative bg-[#020617] px-12 py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-white uppercase tracking-[0.2em] text-[10px] group-hover/submit:bg-transparent transition-colors">
                                                    {loading ? (
                                                        <FaSpinner className="animate-spin" />
                                                    ) : (
                                                        <><FaRocket className="text-xs" /> Register Now</>
                                                    )}
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-16 text-center">
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">RASI FOUNDATION — SECURE PORTAL</p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient {
                        animation: gradient 3s linear infinite;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-4px); }
                        75% { transform: translateX(4px); }
                    }
                    .animate-shake {
                        animation: shake 0.2s ease-in-out 0s 2;
                    }
                `}</style>
            </section>
        </Layout>
    );
}
