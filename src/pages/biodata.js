import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  FaCheckCircle, FaChevronRight, FaChevronLeft, FaShieldAlt,
  FaUser, FaPhoneAlt, FaGraduationCap, FaFileAlt, FaLock,
  FaPaperPlane, FaSpinner, FaInfoCircle, FaUniversity,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import Reveal from '@/frontend/components/home/Reveal';
import Stepper from '@/frontend/components/forms/Stepper';
import StepPanel from '@/frontend/components/forms/StepPanel';
import ReviewSection from '@/frontend/components/forms/ReviewSection';
import FormAlert from '@/frontend/components/forms/FormAlert';
import { CONTACT } from '@/data/siteConfig';

const UG_COURSES = [
  'B.E. Computer Science Engineering',
  'B.E. Electronics & Communication',
  'B.E. Mechanical Engineering',
  'B.E. Civil Engineering',
  'B.E. Electrical & Electronics',
  'B.Tech Information Technology',
  'B.Tech Artificial Intelligence & Data Science',
  'B.Tech Computer Science & Business Systems',
  'B.Sc Computer Science',
  'B.Sc Mathematics',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Com',
  'B.Com (Computer Applications)',
  'BBA',
  'BCA',
  'B.Sc Nursing',
  'Other Undergraduate Program',
];

const PG_COURSES = [
  'M.E. Computer Science Engineering',
  'M.E. Electronics & Communication',
  'M.Tech Information Technology',
  'M.Tech Artificial Intelligence',
  'MCA',
  'MBA',
  'M.Sc Computer Science',
  'M.Sc Mathematics',
  'M.Sc Chemistry',
  'M.Sc Physics',
  'M.Com',
  'Other Postgraduate Program',
];

const COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'ST', 'SCA'];

const DOCUMENTS = [
  '10th Mark Sheet',
  '12th Mark Sheet',
  'Aadhaar Card (Xerox)',
  'Community Certificate',
  'Transfer Certificate (TC)',
  'First Graduate Certificate (if applicable)',
];

const STEPS = [
  { id: 'personal', label: 'Personal & Family' },
  { id: 'contact', label: 'Contact Details' },
  { id: 'academic', label: 'Academic & School' },
  { id: 'preferences', label: 'Course & Documents' },
  { id: 'review', label: 'Review & Submit' },
];

const INITIAL = {
  studentName: '', dateOfBirth: '', courseApplied: '', admissionType: 'UG', collegeName: '',
  quota: 'GQ', fatherName: '', motherName: '', community: 'BC', subCaste: '', address: '',
  studentMobile: '', studentEmail: '', aadhaarNumber: '',
  fatherMobile: '', motherMobile: '',
  plusTwoGroup: '', plusTwoExamNumber: '', expectedCutOff: '',
  lastSchoolAndPlace: '', isGovtSchool: 'no', isFirstGraduate: 'no',
  documents: ['10th Mark Sheet', '12th Mark Sheet'],
};

export default function BioDataPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const formTopRef = useRef(null);

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleDoc = (doc) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.includes(doc)
        ? prev.documents.filter((d) => d !== doc)
        : [...prev.documents, doc],
    }));
  };

  const validateStep = (stepIdx) => {
    if (stepIdx === 0) {
      if (!form.studentName.trim()) return 'Student name is required';
      if (!form.dateOfBirth) return 'Date of birth is required';
      if (!form.fatherName.trim()) return "Father's name is required";
      if (!form.motherName.trim()) return "Mother's name is required";
      if (!form.community) return 'Community selection is required';
      if (!form.address.trim()) return 'Full communication address is required';
    } else if (stepIdx === 1) {
      const sMobile = form.studentMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      if (!/^[6-9]\d{9}$/.test(sMobile)) return 'Enter a valid 10-digit student mobile number';
      if (!/^\S+@\S+\.\S+$/.test(form.studentEmail.trim())) return 'Enter a valid student email address';
      const aNum = form.aadhaarNumber.replace(/[\s-]/g, '');
      if (!/^\d{12}$/.test(aNum)) return 'Enter a valid 12-digit Aadhaar number';
      const fMobile = form.fatherMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      if (!/^[6-9]\d{9}$/.test(fMobile)) return "Enter a valid 10-digit father's mobile number";
      const mMobile = form.motherMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      if (!/^[6-9]\d{9}$/.test(mMobile)) return "Enter a valid 10-digit mother's mobile number";
    } else if (stepIdx === 2) {
      if (!form.plusTwoGroup.trim()) return 'Plus Two group or current academic branch is required';
      if (!form.plusTwoExamNumber.trim()) return 'Exam / Register number is required';
      if (!form.expectedCutOff.trim()) return 'Expected cut-off marks or percentage is required';
      if (!form.lastSchoolAndPlace.trim()) return 'Last studied institution name and location are required';
    } else if (stepIdx === 3) {
      if (!form.courseApplied) return 'Please select the preferred course or branch';
      if (!form.collegeName.trim()) return 'Please enter preferred college name';
    } else if (stepIdx === 4) {
      if (!consent) return 'Please agree to the declaration before submitting your application';
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep(currentStep);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    formTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validateStep(4);
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        isGovtSchool: form.isGovtSchool === 'yes',
        isFirstGraduate: form.isFirstGraduate === 'yes',
        aadhaarNumber: form.aadhaarNumber.replace(/[\s-]/g, ''),
        studentMobile: form.studentMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''),
        fatherMobile: form.fatherMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''),
        motherMobile: form.motherMobile.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, ''),
      };

      const res = await fetch('/api/biodata/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');

      setSubmitted(true);
      router.push(`/payment?ref=${data.id}`);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    'w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest bg-white transition-all shadow-sm placeholder:text-gray-400';

  if (submitted) {
    return (
      <Layout title="BioData Application Submitted — Rasi Foundation">
        <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-4 py-16">
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-forest text-3xl shadow-sm">
              <FaCheckCircle />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Application Received!</h2>
            <p className="text-sm text-gray-600 mb-4">
              Thank you, <strong>{form.studentName}</strong>. Your BioData has been recorded in our admission system.
              Proceeding to the secure payment portal...
            </p>
            <div className="w-6 h-6 border-2 border-forest border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Secure Your Seat — BioData Application 2026–27 | Rasi Foundation"
      description="Fill in your student BioData form to initiate application verification and secure your college admission guidance."
    >
      <div className="bg-gradient-to-b from-[#f9f7f2] via-white to-[#f4f8f5] py-10 md:py-16">
        <div className="container mx-auto w-full max-w-5xl xl:max-w-6xl px-4 sm:px-6 lg:px-8" ref={formTopRef}>
          {/* Header */}
          <div className="text-center sm:text-left mb-8">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              <p className="rf-eyebrow">Academic Year 2026–27</p>
            </div>
            <h1 className="mt-1 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              Secure Your <span className="text-crimson">Seat</span> — Student BioData
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Complete the structured application below. Verified student details are reviewed by our senior admission
              counsellors to verify quota eligibility, documentation, and enrollment procedures.
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="mb-10">
            <Stepper steps={STEPS} current={currentStep} onSelect={(idx) => idx < currentStep && setCurrentStep(idx)} />
          </div>

          {/* Main Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_16px_45px_rgba(7,85,68,0.08)]">
            {error && (
              <div role="alert" className="mb-6 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-crimson sm:text-sm">
                <FaInfoCircle className="mt-0.5 text-base shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Step 0: Personal & Family */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h2 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                      <FaUser className="text-forest text-sm" /> Student Personal & Family Details
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Please ensure names match your official 10th/12th certificate.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Student Full Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.studentName}
                        onChange={(e) => set('studentName', e.target.value)}
                        placeholder="As per school certificate"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Date of Birth <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="date"
                        value={form.dateOfBirth}
                        onChange={(e) => set('dateOfBirth', e.target.value)}
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Father&apos;s Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fatherName}
                        onChange={(e) => set('fatherName', e.target.value)}
                        placeholder="Father's full name"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Mother&apos;s Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.motherName}
                        onChange={(e) => set('motherName', e.target.value)}
                        placeholder="Mother's full name"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Community Category <span className="text-crimson">*</span>
                      </label>
                      <select
                        value={form.community}
                        onChange={(e) => set('community', e.target.value)}
                        className={inputCls}
                      >
                        {COMMUNITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Sub-Caste <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={form.subCaste}
                        onChange={(e) => set('subCaste', e.target.value)}
                        placeholder="e.g. Kongu Vellalar, Sengunthar"
                        className={inputCls}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Complete Permanent Address <span className="text-crimson">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={form.address}
                        onChange={(e) => set('address', e.target.value)}
                        placeholder="Door No, Street, Village/Town, District, Pincode"
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Contact Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h2 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                      <FaPhoneAlt className="text-forest text-sm" /> Contact & Identification Information
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Used strictly for admission calls and document verification.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Student Mobile Number <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={form.studentMobile}
                        onChange={(e) => set('studentMobile', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Student Email Address <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.studentEmail}
                        onChange={(e) => set('studentEmail', e.target.value)}
                        placeholder="student@example.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        12-Digit Aadhaar Number <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={12}
                        value={form.aadhaarNumber}
                        onChange={(e) => set('aadhaarNumber', e.target.value)}
                        placeholder="12 digits without spaces"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Father&apos;s Mobile Number <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={form.fatherMobile}
                        onChange={(e) => set('fatherMobile', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Mother&apos;s Mobile Number <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={form.motherMobile}
                        onChange={(e) => set('motherMobile', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h2 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                      <FaGraduationCap className="text-forest text-sm" /> Academic Details & School History
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Assists in verifying TNEA cutoff eligibility and government quotas.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        12th Subject Group / Branch <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.plusTwoGroup}
                        onChange={(e) => set('plusTwoGroup', e.target.value)}
                        placeholder="e.g. Bio-Maths, Computer Science, Commerce"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        12th Board Exam / Registration No. <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.plusTwoExamNumber}
                        onChange={(e) => set('plusTwoExamNumber', e.target.value)}
                        placeholder="Register / Roll Number"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Expected Cut-Off / Percentage <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.expectedCutOff}
                        onChange={(e) => set('expectedCutOff', e.target.value)}
                        placeholder="e.g. 182.5 or 85%"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Last Studied School / College & Place <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.lastSchoolAndPlace}
                        onChange={(e) => set('lastSchoolAndPlace', e.target.value)}
                        placeholder="School name, Town / City"
                        className={inputCls}
                      />
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
                      <label className="block text-xs font-bold text-gray-800 mb-2">
                        Studied in Tamil Nadu Govt School (6th–12th)? <span className="text-crimson">*</span>
                      </label>
                      <div className="flex gap-4">
                        {[
                          ['yes', 'Yes (Eligible for 7.5% Quota)'],
                          ['no', 'No'],
                        ].map(([val, label]) => (
                          <label key={val} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                            <input
                              type="radio"
                              name="isGovtSchool"
                              value={val}
                              checked={form.isGovtSchool === val}
                              onChange={(e) => set('isGovtSchool', e.target.value)}
                              className="accent-forest"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-4">
                      <label className="block text-xs font-bold text-gray-800 mb-2">
                        Are you a First Graduate in your family? <span className="text-crimson">*</span>
                      </label>
                      <div className="flex gap-4">
                        {[
                          ['yes', 'Yes (Tuition Fee Concession)'],
                          ['no', 'No'],
                        ].map(([val, label]) => (
                          <label key={val} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                            <input
                              type="radio"
                              name="isFirstGraduate"
                              value={val}
                              checked={form.isFirstGraduate === val}
                              onChange={(e) => set('isFirstGraduate', e.target.value)}
                              className="accent-forest"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences & Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h2 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                      <FaUniversity className="text-forest text-sm" /> Course Preferences & Documents Ready
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Indicate your primary course preference and certificates available.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Admission Stream Level <span className="text-crimson">*</span>
                      </label>
                      <div className="flex gap-4 mt-2">
                        {['UG', 'PG', 'Lateral Entry'].map((t) => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                            <input
                              type="radio"
                              name="admissionType"
                              value={t}
                              checked={form.admissionType === t}
                              onChange={(e) => {
                                set('admissionType', e.target.value);
                                set('courseApplied', '');
                              }}
                              className="accent-forest"
                            />
                            <span>{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Seat Quota Preference <span className="text-crimson">*</span>
                      </label>
                      <div className="flex gap-4 mt-2">
                        {[
                          ['GQ', 'Government Quota (TNEA / Single Window)'],
                          ['MQ', 'Management Quota'],
                        ].map(([q, label]) => (
                          <label key={q} className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
                            <input
                              type="radio"
                              name="quota"
                              value={q}
                              checked={form.quota === q}
                              onChange={(e) => set('quota', e.target.value)}
                              className="accent-forest"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Course / Branch Applied <span className="text-crimson">*</span>
                      </label>
                      <select
                        value={form.courseApplied}
                        onChange={(e) => set('courseApplied', e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select Course</option>
                        {(form.admissionType === 'PG' ? PG_COURSES : UG_COURSES).map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Preferred College Name / Location <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.collegeName}
                        onChange={(e) => set('collegeName', e.target.value)}
                        placeholder="e.g. Paavai, KSRCT, or Coimbatore zone"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      Documents Available to Submit:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DOCUMENTS.map((doc) => {
                        const checked = form.documents.includes(doc);
                        return (
                          <label
                            key={doc}
                            className={`flex items-center gap-3 p-3 rounded-2xl border text-xs font-medium cursor-pointer transition-all ${
                              checked
                                ? 'border-forest/40 bg-emerald-50/60 text-forest'
                                : 'border-gray-200 bg-gray-50/60 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDoc(doc)}
                              className="accent-forest h-4 w-4 rounded"
                            />
                            <span>{doc}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-3">
                    <h2 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
                      <FaShieldAlt className="text-forest text-sm" /> Review Application Details
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">Please confirm your details before submitting to the admission registry.</p>
                  </div>

                  <div className="space-y-4">
                    <ReviewSection
                      title="Personal & Family"
                      onEdit={() => setCurrentStep(0)}
                      items={[
                        ['Student Name', form.studentName],
                        ['Date of Birth', form.dateOfBirth],
                        ["Father's Name", form.fatherName],
                        ["Mother's Name", form.motherName],
                        ['Community', `${form.community} ${form.subCaste ? `(${form.subCaste})` : ''}`],
                        ['Address', form.address],
                      ]}
                    />

                    <ReviewSection
                      title="Contact Information"
                      onEdit={() => setCurrentStep(1)}
                      items={[
                        ['Student Mobile', form.studentMobile],
                        ['Student Email', form.studentEmail],
                        ['Aadhaar No.', form.aadhaarNumber],
                        ['Father Mobile', form.fatherMobile],
                        ['Mother Mobile', form.motherMobile],
                      ]}
                    />

                    <ReviewSection
                      title="Academic Profile"
                      onEdit={() => setCurrentStep(2)}
                      items={[
                        ['+2 Group / Stream', form.plusTwoGroup],
                        ['Exam / Register No.', form.plusTwoExamNumber],
                        ['Expected Cut-Off', form.expectedCutOff],
                        ['Institution', form.lastSchoolAndPlace],
                        ['Govt School Quota (7.5%)', form.isGovtSchool === 'yes' ? 'Yes' : 'No'],
                        ['First Graduate', form.isFirstGraduate === 'yes' ? 'Yes' : 'No'],
                      ]}
                    />

                    <ReviewSection
                      title="Course & Document Preferences"
                      onEdit={() => setCurrentStep(3)}
                      items={[
                        ['Admission Level', form.admissionType],
                        ['Quota', form.quota === 'GQ' ? 'Government Quota' : 'Management Quota'],
                        ['Applied Course', form.courseApplied],
                        ['Preferred College', form.collegeName],
                        ['Documents Attached', form.documents.join(', ') || 'None selected'],
                      ]}
                    />

                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded accent-forest text-forest"
                        />
                        <span className="leading-relaxed">
                          I declare that the information provided above is accurate to the best of my knowledge. I understand
                          that this BioData submission is for official career guidance and admission processing with Rasi Foundation.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={submitting}
                    className="rf-btn-outline !rounded-full px-6 py-2.5 text-xs"
                  >
                    <FaChevronLeft className="text-[10px]" /> Back
                  </button>
                ) : (
                  <span />
                )}

                {currentStep < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="rf-btn-primary !rounded-full px-7 py-3 text-sm"
                  >
                    <span>Save & Continue</span>
                    <FaChevronRight className="text-[10px]" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rf-btn-maroon !rounded-full px-8 py-3 text-sm"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin text-sm" />
                        <span>Submitting BioData…</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-xs" />
                        <span>Submit & Proceed to Fee Portal</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
