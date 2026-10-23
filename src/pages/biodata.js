import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FaCheckCircle,
  FaChevronRight,
  FaShieldAlt,
  FaUser,
  FaPhone,
  FaBook,
  FaFileAlt,
} from 'react-icons/fa';

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
  'Other',
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
  'Other',
];

const COMMUNITIES = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'ST', 'SCA'];

const DOCUMENTS = [
  '10th Mark Sheet',
  '12th Mark Sheet',
  'Aadhaar Card (Xerox)',
  'Community Certificate',
];

const INITIAL = {
  studentName: '', dateOfBirth: '', courseApplied: '', admissionType: '', collegeName: '',
  quota: '', fatherName: '', motherName: '', community: '', subCaste: '', address: '',
  studentMobile: '', studentEmail: '', aadhaarNumber: '',
  fatherMobile: '', motherMobile: '',
  plusTwoGroup: '', plusTwoExamNumber: '', expectedCutOff: '',
  lastSchoolAndPlace: '', isGovtSchool: '', isFirstGraduate: '',
  documents: [],
};

export default function BioDataPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleDoc = (doc) => {
    setForm(prev => ({
      ...prev,
      documents: prev.documents.includes(doc)
        ? prev.documents.filter(d => d !== doc)
        : [...prev.documents, doc],
    }));
  };

  const validate = () => {
    if (!form.studentName.trim()) return 'Student name is required';
    if (!form.dateOfBirth) return 'Date of birth is required';
    if (!form.courseApplied) return 'Course applied is required';
    if (!form.admissionType) return 'Admission type is required';
    if (!form.collegeName.trim()) return 'College name is required';
    if (!form.quota) return 'Quota is required';
    if (!form.fatherName.trim()) return "Father's name is required";
    if (!form.motherName.trim()) return "Mother's name is required";
    if (!form.community) return 'Community is required';
    if (!form.address.trim()) return 'Address is required';
    if (!/^[6-9]\d{9}$/.test(form.studentMobile)) return 'Enter a valid 10-digit student mobile number';
    if (!form.studentEmail.trim() || !/\S+@\S+\.\S+/.test(form.studentEmail)) return 'Enter a valid student email';
    if (!/^\d{12}$/.test(form.aadhaarNumber.replace(/\s/g, ''))) return 'Enter a valid 12-digit Aadhaar number';
    if (!/^[6-9]\d{9}$/.test(form.fatherMobile)) return "Enter a valid father's mobile number";
    if (!/^[6-9]\d{9}$/.test(form.motherMobile)) return "Enter a valid mother's mobile number";
    if (!form.plusTwoGroup.trim()) return '+2 Group is required';
    if (!form.plusTwoExamNumber.trim()) return '+2 Exam Number is required';
    if (!form.expectedCutOff.trim()) return 'Expected cut-off is required';
    if (!form.lastSchoolAndPlace.trim()) return 'Last studied school & place is required';
    if (form.isGovtSchool === '') return 'Please select whether you studied in a Govt school';
    if (form.isFirstGraduate === '') return 'Please select whether you are a first graduate';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        isGovtSchool: form.isGovtSchool === 'yes',
        isFirstGraduate: form.isFirstGraduate === 'yes',
        aadhaarNumber: form.aadhaarNumber.replace(/\s/g, ''),
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
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Head><title>Bio Data Submitted — RASI Foundation</title></Head>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bio Data Submitted!</h2>
            <p className="text-gray-500 mb-4">
              Thank you, <strong>{form.studentName}</strong>. Redirecting you to the payment page...
            </p>
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Bio Data Form 2026–27 — RASI Foundation</title>
        <meta name="description" content="Student Bio Data Form for RASI Foundation 2026-27" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">

          {/* Left Panel */}
          <div className="md:w-72 bg-[#1a1a2e] text-white flex flex-col p-8 shrink-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">R</div>
              <div>
                <p className="font-bold text-lg leading-tight">RASI Foundation</p>
                <p className="text-xs text-gray-400">Education & Counseling</p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Academic Year</p>
              <p className="text-3xl font-bold">2026–27</p>
              <p className="text-sm text-gray-300 mt-1">Bio Data Form</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <FaUser className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Student Details</p>
                  <p className="text-xs text-gray-400">Personal & family info</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhone className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Contact Info</p>
                  <p className="text-xs text-gray-400">Mobile, email & Aadhaar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaBook className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Academic Details</p>
                  <p className="text-xs text-gray-400">+2 scores & school info</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaFileAlt className="text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Documents</p>
                  <p className="text-xs text-gray-400">Mark sheets & certificates</p>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FaShieldAlt className="text-green-400" />
                <span>Your data is securely stored</span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit}>
              <div className="p-8 space-y-8">

                {/* Section 1: Student Details */}
                <section>
                  <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <FaUser className="text-blue-500 text-sm" /> Student Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Student Name" required>
                      <input type="text" value={form.studentName} onChange={e => set('studentName', e.target.value)}
                        placeholder="Full name as per certificate" className={inputCls} />
                    </Field>
                    <Field label="Date of Birth" required>
                      <input type="date" value={form.dateOfBirth} onChange={e => set('dateOfBirth', e.target.value)} className={inputCls} />
                    </Field>
                    <Field label="Course / Branch Applied" required>
                      <select value={form.courseApplied} onChange={e => set('courseApplied', e.target.value)} className={inputCls}>
                        <option value="">Select course</option>
                        {(form.admissionType === 'PG' ? PG_COURSES : UG_COURSES).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Admission Type" required>
                      <div className="flex gap-4 mt-1 flex-wrap">
                        {['UG', 'PG', 'Lateral Entry'].map(t => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="admissionType" value={t} checked={form.admissionType === t}
                              onChange={e => { set('admissionType', e.target.value); set('courseApplied', ''); }}
                              className="accent-blue-600" />
                            <span className="text-sm text-gray-700 font-medium">{t}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="College Name" required>
                      <input type="text" value={form.collegeName} onChange={e => set('collegeName', e.target.value)}
                        placeholder="Preferred college name" className={inputCls} />
                    </Field>
                    <Field label="Quota" required>
                      <div className="flex gap-4 mt-1">
                        {['GQ', 'MQ'].map(q => (
                          <label key={q} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="quota" value={q} checked={form.quota === q}
                              onChange={e => set('quota', e.target.value)} className="accent-blue-600" />
                            <span className="text-sm text-gray-700 font-medium">{q}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="Father's Name" required>
                      <input type="text" value={form.fatherName} onChange={e => set('fatherName', e.target.value)}
                        placeholder="Father's full name" className={inputCls} />
                    </Field>
                    <Field label="Mother's Name" required>
                      <input type="text" value={form.motherName} onChange={e => set('motherName', e.target.value)}
                        placeholder="Mother's full name" className={inputCls} />
                    </Field>
                    <Field label="Community" required>
                      <select value={form.community} onChange={e => set('community', e.target.value)} className={inputCls}>
                        <option value="">Select community</option>
                        {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Sub Caste">
                      <input type="text" value={form.subCaste} onChange={e => set('subCaste', e.target.value)}
                        placeholder="Sub caste (if applicable)" className={inputCls} />
                    </Field>
                    <Field label="Full Address" required className="sm:col-span-2">
                      <textarea value={form.address} onChange={e => set('address', e.target.value)}
                        rows="3" placeholder="Door no, Street, City, District, Pincode"
                        className={`${inputCls} resize-none`} />
                    </Field>
                  </div>
                </section>

                {/* Section 2: Contact Info */}
                <section>
                  <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <FaPhone className="text-blue-500 text-sm" /> Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Student Mobile Number" required>
                      <input type="tel" value={form.studentMobile} onChange={e => set('studentMobile', e.target.value)}
                        placeholder="10-digit mobile" maxLength="10" className={inputCls} />
                    </Field>
                    <Field label="Student Email ID" required>
                      <input type="email" value={form.studentEmail} onChange={e => set('studentEmail', e.target.value)}
                        placeholder="student@email.com" className={inputCls} />
                    </Field>
                    <Field label="Aadhaar Number" required>
                      <input type="text" value={form.aadhaarNumber} onChange={e => set('aadhaarNumber', e.target.value)}
                        placeholder="12-digit Aadhaar" maxLength="12" className={inputCls} />
                    </Field>
                    <Field label="Father Mobile Number" required>
                      <input type="tel" value={form.fatherMobile} onChange={e => set('fatherMobile', e.target.value)}
                        placeholder="10-digit mobile" maxLength="10" className={inputCls} />
                    </Field>
                    <Field label="Mother Mobile Number" required>
                      <input type="tel" value={form.motherMobile} onChange={e => set('motherMobile', e.target.value)}
                        placeholder="10-digit mobile" maxLength="10" className={inputCls} />
                    </Field>
                  </div>
                </section>

                {/* Section 3: Academic Details */}
                <section>
                  <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <FaBook className="text-blue-500 text-sm" /> Academic Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="12th Group / Diploma Branch / UG Branch" required>
                      <input type="text" value={form.plusTwoGroup} onChange={e => set('plusTwoGroup', e.target.value)}
                        placeholder="e.g. Bio-Maths, CS-Maths, Computer Science" className={inputCls} />
                    </Field>
                    <Field label="12th Exam Number / Register Number" required>
                      <input type="text" value={form.plusTwoExamNumber} onChange={e => set('plusTwoExamNumber', e.target.value)}
                        placeholder="Register / Exam number" className={inputCls} />
                    </Field>
                    <Field label="Expected Cut-Off / Percentage / CGPA" required>
                      <input type="text" value={form.expectedCutOff} onChange={e => set('expectedCutOff', e.target.value)}
                        placeholder="e.g. 185, 87%, or 8.5 CGPA" className={inputCls} />
                    </Field>
                    <Field label="Last Studied Institution & Place" required>
                      <input type="text" value={form.lastSchoolAndPlace} onChange={e => set('lastSchoolAndPlace', e.target.value)}
                        placeholder="Institution name, City" className={inputCls} />
                    </Field>
                    <Field label="Govt School (6th–12th)?" required>
                      <div className="flex gap-4 mt-1">
                        {[['yes', 'Yes'], ['no', 'No']].map(([val, label]) => (
                          <label key={val} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="isGovtSchool" value={val} checked={form.isGovtSchool === val}
                              onChange={e => set('isGovtSchool', e.target.value)} className="accent-blue-600" />
                            <span className="text-sm text-gray-700 font-medium">{label}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="First Graduate?" required>
                      <div className="flex gap-4 mt-1">
                        {[['yes', 'Yes'], ['no', 'No']].map(([val, label]) => (
                          <label key={val} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="isFirstGraduate" value={val} checked={form.isFirstGraduate === val}
                              onChange={e => set('isFirstGraduate', e.target.value)} className="accent-blue-600" />
                            <span className="text-sm text-gray-700 font-medium">{label}</span>
                          </label>
                        ))}
                      </div>
                    </Field>
                  </div>
                </section>

                {/* Section 4: Documents */}
                <section>
                  <h2 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <FaFileAlt className="text-blue-500 text-sm" /> Documents to Attach
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">Check the documents you have ready to submit:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DOCUMENTS.map(doc => (
                      <label key={doc} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                        form.documents.includes(doc)
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                      }`}>
                        <input type="checkbox" checked={form.documents.includes(doc)}
                          onChange={() => toggleDoc(doc)} className="accent-blue-600 w-4 h-4" />
                        <span className="text-sm font-medium text-gray-700">{doc}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Bio Data
                      <FaChevronRight className="text-sm" />
                    </>
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50';

function Field({ label, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
