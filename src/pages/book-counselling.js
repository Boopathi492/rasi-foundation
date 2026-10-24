import { useState } from 'react';
import Link from 'next/link';
import { FaCalendarCheck, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import { CONTACT, TN_DISTRICTS } from '@/data/siteConfig';

// Course categories already used on the home page / courses page.
const COURSE_OPTIONS = [
  'Medical Sciences (MBBS, BDS, AYUSH, Para Medical)',
  'Engineering (B.E/B.Tech, Polytechnic, Architecture)',
  'Management (MBA, MCA, CA, B.Com)',
  'Law (BL, LLB, LLM, BA LLB)',
  'Education (B.Ed, M.Ed, D.T.Ed, D.El.Ed)',
  'Arts & Science (BA, BSc, MA, MSc)',
  'Abroad Studies',
  'Not sure yet',
];
const QUALIFICATIONS = ['10th (SSLC)', '11th / 12th (Plus Two)', 'Diploma', 'Undergraduate (UG)', 'Postgraduate (PG)', 'Other'];

const EMPTY = {
  name: '', phone: '', email: '', qualification: '', course: '',
  district: '', college: '', preferredTime: '', message: '', consent: false,
};

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30 aria-[invalid=true]:border-red-600';

function validate(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = 'Please enter the student name.';
  else if (f.name.trim().length > 100) errors.name = 'Name must be 100 characters or fewer.';
  const digits = f.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'Enter a valid 10-digit mobile number.';
  // The existing Enquiry model requires an email, so it cannot be optional here.
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = 'Enter a valid email address.';
  if (!f.qualification) errors.qualification = 'Select the current qualification.';
  if (!f.course) errors.course = 'Select the course you are interested in.';
  if (!f.district) errors.district = 'Select a preferred district.';
  if (!f.consent) errors.consent = 'Please agree so we can contact you.';
  return { errors, phone: digits };
}

function Field({ id, label, required, hint, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label} {required ? <span className="text-red-700" aria-hidden="true">*</span> : <span className="font-normal text-gray-500">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function BookCounselling() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const a11y = (id) => ({
    id,
    name: id,
    value: form[id],
    onChange: set,
    'aria-invalid': errors[id] ? 'true' : 'false',
    'aria-describedby': errors[id] ? `${id}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { errors: found, phone } = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');

    // Counselling bookings reuse POST /api/enquiry (no dedicated model exists). They are tagged
    // with "[Counselling Booking]" so staff can tell them apart from general enquiries.
    const details = [
      '[Counselling Booking]',
      `Preferred district: ${form.district}`,
      form.college.trim() && `Preferred college: ${form.college.trim()}`,
      form.preferredTime && `Preferred date/time: ${form.preferredTime.replace('T', ' ')}`,
      form.message.trim() && `Message: ${form.message.trim()}`,
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          course: form.course,
          qualification: form.qualification,
          message: details,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }
      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error('Counselling booking failed', err);
      setServerError('We could not save your request. Please try again, or call us.');
      setStatus('error');
    }
  };

  return (
    <Layout
      title="Book Counselling"
      description="Book a career counselling session with Rasi Foundation for course and college guidance in Tamil Nadu."
    >
      <section className="bg-brand-900 py-10 text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold md:text-4xl">Book Counselling</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Tell us a little about the student and we will get back to you. For a general question, use the{' '}
            <Link href="/contact" className="font-semibold underline">Enquiry form</Link> instead.
          </p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto max-w-3xl px-4">
          {status === 'success' ? (
            <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <FaCheckCircle className="mx-auto mb-3 text-4xl text-green-700" aria-hidden="true" />
              <h2 className="font-heading text-2xl font-bold text-gray-900">Request received</h2>
              <p className="mt-2 text-gray-700">
                Your counselling request has been saved. Our team will contact you on the mobile number you gave.
                Preferred date/time, if given, is a request and not a confirmed slot.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="mt-5 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:border-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={status === 'error' ? 'form-error' : undefined}>
              {status === 'error' && (
                <div id="form-error" role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                  <FaExclamationCircle className="mt-0.5 shrink-0" aria-hidden="true" />
                  <p>{serverError} Call <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold underline">{CONTACT.phoneDisplay}</a>.</p>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Student name" required error={errors.name}>
                  <input type="text" autoComplete="name" maxLength={100} {...a11y('name')} className={inputClass} />
                </Field>
                <Field id="phone" label="Mobile number" required error={errors.phone} hint="10-digit Indian mobile number">
                  <input type="tel" inputMode="numeric" autoComplete="tel" {...a11y('phone')} className={inputClass} />
                </Field>
              </div>

              <Field id="email" label="Email" required error={errors.email} hint="Required by our enquiry system.">
                <input type="email" autoComplete="email" {...a11y('email')} className={inputClass} />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="qualification" label="Current qualification / study level" required error={errors.qualification}>
                  <select {...a11y('qualification')} className={inputClass}>
                    <option value="">Select</option>
                    {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </Field>
                <Field id="course" label="Interested course" required error={errors.course}>
                  <select {...a11y('course')} className={inputClass}>
                    <option value="">Select</option>
                    {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="district" label="Preferred district" required error={errors.district}>
                  <select {...a11y('district')} className={inputClass}>
                    <option value="">Select</option>
                    {TN_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    <option value="Outside Tamil Nadu">Outside Tamil Nadu</option>
                  </select>
                </Field>
                <Field id="college" label="Preferred college" error={errors.college}>
                  <input type="text" maxLength={150} {...a11y('college')} className={inputClass} />
                </Field>
              </div>

              <Field id="preferredTime" label="Preferred counselling date/time" hint="A request only; we will confirm the slot with you.">
                <input type="datetime-local" {...a11y('preferredTime')} className={inputClass} />
              </Field>

              <Field id="message" label="Additional message">
                <textarea rows={4} maxLength={500} {...a11y('message')} className={inputClass} />
              </Field>

              <div>
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="consent"
                    id="consent"
                    checked={form.consent}
                    onChange={set}
                    aria-invalid={errors.consent ? 'true' : 'false'}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-700 focus:ring-brand-600"
                  />
                  <span>
                    I agree that Rasi Foundation may contact me about counselling using the details I have provided.
                    These details are used only to respond to this request.
                  </span>
                </label>
                {errors.consent && <p id="consent-error" role="alert" className="mt-1 text-sm text-red-700">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === 'submitting'
                  ? (<><FaSpinner className="animate-spin" aria-hidden="true" /> Submitting…</>)
                  : (<><FaCalendarCheck aria-hidden="true" /> Book Counselling</>)}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
