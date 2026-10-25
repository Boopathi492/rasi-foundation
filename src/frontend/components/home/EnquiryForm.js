import { useState } from 'react';
import {
  FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle,
} from 'react-icons/fa';
import { CONTACT, TN_DISTRICTS } from '@/data/siteConfig';

export const ENQUIRY_SESSION_KEY = 'rasi_enquiry_popup_dismissed';

export function markEnquiryPopupDismissed() {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(ENQUIRY_SESSION_KEY, '1');
  } catch {
    // Ignore storage errors in restricted browsing modes
  }
}

const COURSE_OPTIONS = [
  'Medical Sciences (MBBS, BDS, AYUSH, Allied Health)',
  'Engineering (B.E / B.Tech, Architecture, Polytechnic)',
  'Management & Commerce (MBA, MCA, BBA, B.Com, CA)',
  'Arts & Science (B.Sc, B.A, M.Sc, M.A)',
  'Law (BA LLB, BBA LLB, LLB, LLM)',
  'Education (B.Ed, M.Ed, D.T.Ed, D.El.Ed)',
  'Agriculture & Veterinary (B.Sc Agri, Horticulture, B.V.Sc)',
  'Not sure yet — Need career guidance',
];

const QUALIFICATIONS = [
  '10th (SSLC)',
  '11th / 12th (Plus Two)',
  'Diploma',
  'Undergraduate (UG)',
  'Postgraduate (PG)',
  'Other',
];

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  course: '',
  qualification: '',
  district: '',
  message: '',
  consent: false,
};

function validateEnquiry(form) {
  const errors = {};
  if (!form.name.trim()) {
    errors.name = 'Please enter the student name.';
  } else if (form.name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  const digits = form.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!form.course) {
    errors.course = 'Select the course stream you are interested in.';
  }

  if (!form.consent) {
    errors.consent = 'Please agree so a counsellor can contact you.';
  }

  return { errors, phone: digits };
}

export default function EnquiryForm({
  idPrefix = 'home-enquiry',
  compact = false,
  firstFieldRef = null,
  onSuccess = null,
}) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextVal = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nextVal }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const fieldId = (name) => `${idPrefix}-${name}`;
  const errorId = (name) => `${idPrefix}-${name}-error`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const { errors: found, phone } = validateEnquiry(form);
    setErrors(found);

    const errorKeys = Object.keys(found);
    if (errorKeys.length > 0) {
      document.getElementById(fieldId(errorKeys[0]))?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');

    const messageParts = [
      compact ? '[Homepage Popup Enquiry]' : '[Homepage Enquiry]',
      form.district && `District: ${form.district}`,
      form.message.trim() && `Message: ${form.message.trim()}`,
    ].filter(Boolean);

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          course: form.course,
          qualification: form.qualification || undefined,
          message: messageParts.join(' | ').slice(0, 1000),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }

      markEnquiryPopupDismissed();
      setStatus('success');
      setForm(EMPTY);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setServerError('We could not save your enquiry right now. Please check your details and try again.');
      setStatus('error');
    }
  };

  const inputClass = (hasErr) =>
    `w-full rounded-lg border bg-white px-3.5 ${
      compact ? 'py-2 text-sm' : 'py-2.5 text-sm'
    } text-gray-900 placeholder:text-gray-400 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
      hasErr ? 'border-red-500 bg-red-50/20' : 'border-gray-300'
    }`;

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-xl border border-emerald-200 bg-emerald-50/90 text-center ${
          compact ? 'p-5' : 'p-7'
        }`}
      >
        <FaCheckCircle className="mx-auto mb-2.5 text-3xl text-forest" aria-hidden="true" />
        <h3 className="font-heading text-xl font-bold text-gray-900">
          Thank you! Your enquiry has been received.
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-700 sm:text-sm">
          Our counselling team will reach out to you on the mobile number or email address you provided.
        </p>
        {!compact && (
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="rf-btn-outline mt-4 px-5 py-2 text-xs"
          >
            Submit another enquiry
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact ? 'space-y-3' : 'space-y-4'}
      aria-describedby={status === 'error' ? `${idPrefix}-form-error` : undefined}
    >
      {status === 'error' && (
        <div
          id={`${idPrefix}-form-error`}
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800 sm:text-sm"
        >
          <FaExclamationCircle className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
          <p>
            {serverError} Or call us directly on{' '}
            <a href={`tel:${CONTACT.phoneTel}`} className="font-bold underline">
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2">
        {/* Student Name */}
        <div>
          <label htmlFor={fieldId('name')} className="mb-1 block text-xs font-bold text-gray-800">
            Student Name <span className="text-crimson" aria-hidden="true">*</span>
          </label>
          <input
            ref={firstFieldRef}
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? errorId('name') : undefined}
            placeholder="Enter full name"
            className={inputClass(errors.name)}
          />
          {errors.name && (
            <p id={errorId('name')} role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor={fieldId('phone')} className="mb-1 block text-xs font-bold text-gray-800">
            Mobile Number <span className="text-crimson" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? errorId('phone') : undefined}
            placeholder="10-digit mobile number"
            className={inputClass(errors.phone)}
          />
          {errors.phone && (
            <p id={errorId('phone')} role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className={compact ? 'grid gap-3.5 sm:grid-cols-2' : 'grid gap-3.5 sm:grid-cols-2'}>
        {/* Email Address */}
        <div>
          <label htmlFor={fieldId('email')} className="mb-1 block text-xs font-bold text-gray-800">
            Email Address <span className="text-crimson" aria-hidden="true">*</span>
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? errorId('email') : undefined}
            placeholder="you@example.com"
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p id={errorId('email')} role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        {/* Interested Course */}
        <div>
          <label htmlFor={fieldId('course')} className="mb-1 block text-xs font-bold text-gray-800">
            Interested Course <span className="text-crimson" aria-hidden="true">*</span>
          </label>
          <select
            id={fieldId('course')}
            name="course"
            value={form.course}
            onChange={handleChange}
            aria-invalid={errors.course ? 'true' : 'false'}
            aria-describedby={errors.course ? errorId('course') : undefined}
            className={inputClass(errors.course)}
          >
            <option value="">Select course stream</option>
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.course && (
            <p id={errorId('course')} role="alert" className="mt-1 text-xs font-medium text-red-700">
              {errors.course}
            </p>
          )}
        </div>
      </div>

      {/* Optional study level & district (shown in full homepage section or compact 2-col row) */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('qualification')} className="mb-1 block text-xs font-bold text-gray-800">
            Current Study Level <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <select
            id={fieldId('qualification')}
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            className={inputClass(false)}
          >
            <option value="">Select qualification</option>
            {QUALIFICATIONS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId('district')} className="mb-1 block text-xs font-bold text-gray-800">
            District <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <select
            id={fieldId('district')}
            name="district"
            value={form.district}
            onChange={handleChange}
            className={inputClass(false)}
          >
            <option value="">Select your district</option>
            {TN_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
            <option value="Outside Tamil Nadu">Outside Tamil Nadu</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor={fieldId('message')} className="mb-1 block text-xs font-bold text-gray-800">
            Your Question or Preferred College <span className="font-normal text-gray-500">(optional)</span>
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={3}
            maxLength={500}
            value={form.message}
            onChange={handleChange}
            placeholder="Share your marks, preferred course, college or questions..."
            className={`${inputClass(false)} resize-y`}
          />
        </div>
      )}

      {/* Consent Checkbox */}
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs text-gray-700">
          <input
            id={fieldId('consent')}
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={handleChange}
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? errorId('consent') : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-forest focus:ring-forest"
          />
          <span className="leading-snug">
            I agree that Rasi Foundation may contact me regarding admission guidance using the details provided above.
          </span>
        </label>
        {errors.consent && (
          <p id={errorId('consent')} role="alert" className="mt-1 text-xs font-medium text-red-700">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`rf-btn-maroon w-full ${compact ? 'py-2.5 text-xs sm:text-sm' : 'py-3 text-sm'}`}
      >
        {status === 'submitting' ? (
          <>
            <FaSpinner className="animate-spin" aria-hidden="true" />
            <span>Submitting Enquiry…</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="text-xs" aria-hidden="true" />
            <span>Submit Admission Enquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
