import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FaCalendarCheck, FaCheckCircle, FaSpinner, FaUser, FaGraduationCap, FaCommentDots, FaClipboardCheck,
  FaChevronRight, FaChevronLeft, FaPhoneAlt, FaRegLightbulb, FaUniversity, FaRoute, FaPaperPlane, FaHeadset,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import Reveal from '@/frontend/components/home/Reveal';
import Stepper from '@/frontend/components/forms/Stepper';
import StepPanel from '@/frontend/components/forms/StepPanel';
import ReviewSection from '@/frontend/components/forms/ReviewSection';
import FormAlert from '@/frontend/components/forms/FormAlert';
import ThankYouConfirmation from '@/frontend/components/common/ThankYouConfirmation';
import { Field, ChoiceGroup, CheckboxField, inputClass } from '@/frontend/components/forms/Field';
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
const CONTACT_TIMES = ['Morning (9 AM – 12 PM)', 'Afternoon (12 PM – 4 PM)', 'Evening (4 PM – 8 PM)', 'Any time'];
const CONTACT_METHODS = [
  { value: 'Phone call', label: 'Phone call' },
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Either', label: 'Either is fine' },
];

const STEPS = [
  { id: 'student', label: 'Student details', fields: ['name', 'phone', 'email'] },
  { id: 'interests', label: 'Academic interests', fields: ['qualification', 'course', 'district', 'college'] },
  { id: 'preferences', label: 'Preferences', fields: ['contactMethod', 'contactTime', 'message'] },
  { id: 'review', label: 'Review & submit', fields: ['consent'] },
];

const EMPTY = {
  name: '', phone: '', email: '', qualification: '', course: '',
  district: '', college: '', contactMethod: '', contactTime: '', message: '', consent: false,
};

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
  if (f.college.trim().length > 150) errors.college = 'College name must be 150 characters or fewer.';
  if (f.message.trim().length > 500) errors.message = 'Please keep the message within 500 characters.';
  if (!f.consent) errors.consent = 'Please agree so we can contact you.';
  return { errors, phone: digits };
}

const PROCESS = [
  { icon: FaUser, title: 'Share the student details', text: 'Name, mobile number and email so we know who to contact.' },
  { icon: FaGraduationCap, title: 'Tell us what interests you', text: 'Current level, course interest and preferred district.' },
  { icon: FaClipboardCheck, title: 'Review and submit', text: 'Check everything, edit if needed, then send your request.' },
  { icon: FaHeadset, title: 'We get in touch', text: 'Our team contacts you on the mobile number you provide.' },
];

export default function BookCounselling() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [reference, setReference] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [colleges, setColleges] = useState([]);
  const submitLock = useRef(false);
  const formTop = useRef(null);

  // Verified college records (active colleges from the database) are offered as suggestions only.
  useEffect(() => {
    if (step !== 1 || colleges.length > 0) return undefined;
    let cancelled = false;
    fetch('/api/colleges')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { if (!cancelled && Array.isArray(data)) setColleges(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [step, colleges.length]);

  const collegeSuggestions = useMemo(() => {
    const wanted = form.district.trim().toLowerCase();
    const groups = wanted ? colleges.filter((g) => String(g.district).toLowerCase() === wanted) : colleges;
    const list = groups.length ? groups : colleges;
    return list.flatMap((g) => (g.colleges || []).map((c) => c.name)).slice(0, 300);
  }, [colleges, form.district]);

  const set = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const focusField = (id) => {
    if (typeof window === 'undefined') return;
    window.requestAnimationFrame(() => document.getElementById(id)?.focus());
  };

  const goTo = useCallback((i) => {
    setInteracted(true);
    setStep(i);
    setMaxReached((m) => Math.max(m, i));
    formTop.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }, []);

  const next = () => {
    const { errors: found } = validate(form);
    const stepErrors = Object.fromEntries(STEPS[step].fields.filter((k) => found[k]).map((k) => [k, found[k]]));
    setErrors((prev) => ({ ...prev, ...stepErrors }));
    const first = Object.keys(stepErrors)[0];
    if (first) { focusField(first); return; }
    goTo(step + 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current || status === 'submitting') return; // duplicate-submit guard
    const { errors: found, phone } = validate(form);
    setErrors(found);
    const firstKey = Object.keys(found)[0];
    if (firstKey) {
      const target = STEPS.findIndex((s) => s.fields.includes(firstKey));
      if (target !== step) goTo(target);
      focusField(firstKey);
      return;
    }

    submitLock.current = true;
    setStatus('submitting');
    setServerError('');

    // Counselling requests route to dedicated endpoint POST /api/counselling (persisted in CounsellingRecord)
    try {
      const res = await fetch('/api/counselling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone,
          course: form.course,
          qualification: form.qualification,
          district: form.district,
          college: form.college.trim(),
          contactMethod: form.contactMethod,
          contactTime: form.contactTime,
          message: form.message.trim(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Request failed (${res.status})`);
      }
      const refId = json.booking?._id || json.data?._id;
      setReference(refId ? `REF-${String(refId).slice(-8).toUpperCase()}` : '');
      setLastSubmitted({
        name: form.name.trim(),
        course: form.course,
        contactMethod: form.contactMethod,
        district: form.district,
      });
      setStatus('success');
      setForm(EMPTY);
      setStep(0);
      setMaxReached(0);
    } catch (err) {
      console.error('Counselling request failed', err);
      setServerError('We could not save your request. Please try again, or call us.');
      setStatus('error');
    } finally {
      submitLock.current = false;
    }
  };

  const a11y = (id) => ({ name: id, value: form[id], onChange: set });
  const submitting = status === 'submitting';

  return (
    <Layout
      title="Book Counselling"
      description="Request a career counselling session with Rasi Foundation for course and college guidance in Tamil Nadu."
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rasi-900 via-rasi-700 to-brand-900 text-white">
        <span aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/5" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full border border-white/10" />
        <span aria-hidden="true" className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-brand-700/40" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">
              <FaRegLightbulb aria-hidden="true" /> Student counselling request
            </p>
            <h1 className="mt-3 font-heading text-4xl font-bold leading-tight md:text-5xl">
              Talk through your course and college options
            </h1>
            <div aria-hidden="true" className="mt-4 flex items-center gap-2">
              <span className="h-0.5 w-12 rounded-full bg-gold-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            </div>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Send us a few details and our team will get in touch to discuss your academic interests and the next steps
              in the admission process.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#counselling-form" className="rf-btn-gold !rounded-full px-6 py-3">
                <FaCalendarCheck aria-hidden="true" /> Start the request
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="rf-btn-light !rounded-full px-6 py-3">
                <FaPhoneAlt aria-hidden="true" /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="font-heading text-lg font-bold">What a counselling session covers</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li className="flex gap-3"><FaGraduationCap aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300" /> Understanding the course options that suit your interests.</li>
              <li className="flex gap-3"><FaUniversity aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300" /> Discussing college options in your preferred districts.</li>
              <li className="flex gap-3"><FaRoute aria-hidden="true" className="mt-0.5 shrink-0 text-gold-300" /> Clarifying admission-related next steps and documents.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="border-b border-gray-200 bg-white py-10">
        <div className="container mx-auto px-4">
          <h2 id="process-heading" className="text-center font-heading text-2xl font-bold text-gray-900">How the request works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="rf-card p-5">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#0b6b55] to-[#054235] text-white">
                  <p.icon />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-rasi-700">Step {i + 1}</p>
                <h3 className="mt-0.5 font-heading text-base font-bold text-gray-900">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Form + aside */}
      <section id="counselling-form" ref={formTop} className="scroll-mt-24 bg-gradient-to-b from-brand-50/60 to-white py-10 md:py-14">
        <div className={`container mx-auto ${status === 'success' ? 'max-w-2xl px-4' : 'grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_340px]'}`}>
          <div className={status === 'success' ? '' : 'rf-card p-5 sm:p-8'}>
            {status === 'success' ? (
              <ThankYouConfirmation
                title="Counselling Request Received"
                subtitle="Your career counselling request has been saved. Our counselling team will review your academic goals and contact you."
                reference={reference}
                details={[
                  ...(lastSubmitted?.name ? [{ label: 'Student', value: lastSubmitted.name }] : []),
                  ...(lastSubmitted?.course ? [{ label: 'Course Interest', value: lastSubmitted.course }] : []),
                  ...(lastSubmitted?.contactMethod ? [{ label: 'Preferred Contact', value: lastSubmitted.contactMethod }] : []),
                  ...(lastSubmitted?.district ? [{ label: 'District', value: lastSubmitted.district }] : []),
                ]}
                nextSteps="Our team will reach out via your preferred contact method to discuss course eligibility, college cut-offs, and admissions."
                onReset={() => {
                  setStatus('idle');
                  setInteracted(false);
                  setLastSubmitted(null);
                }}
                resetLabel="Submit Another Request"
                homeHref="/"
              />
            ) : (
              <form onSubmit={onSubmit} noValidate aria-busy={submitting}>
                <Stepper steps={STEPS} current={step} maxReached={maxReached} onStepClick={goTo} label="Counselling request progress" />

                <div className="mt-8">
                  {status === 'error' && (
                    <div className="mb-5">
                      <FormAlert kind="error" id="form-error" title="Request not sent">
                        {serverError} Call <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold underline">{CONTACT.phoneDisplay}</a>.
                      </FormAlert>
                    </div>
                  )}

                  {step === 0 && (
                    <StepPanel key="student" focusHeading={interacted} icon={FaUser} title="Student details"
                      description="Tell us who the counselling is for and how we can reach you.">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="name" label="Student name" required error={errors.name} hint="As the student would like to be addressed." className="sm:col-span-2">
                          <input type="text" autoComplete="name" maxLength={100} {...a11y('name')} className={inputClass} />
                        </Field>
                        <Field id="phone" label="Mobile number" required error={errors.phone} hint="10-digit Indian mobile number. We will contact you on this number.">
                          <input type="tel" inputMode="numeric" autoComplete="tel" {...a11y('phone')} className={inputClass} />
                        </Field>
                        <Field id="email" label="Email" required error={errors.email} hint="Required by our enquiry system.">
                          <input type="email" autoComplete="email" {...a11y('email')} className={inputClass} />
                        </Field>
                      </div>
                    </StepPanel>
                  )}

                  {step === 1 && (
                    <StepPanel key="interests" focusHeading={interacted} icon={FaGraduationCap} title="Academic interests"
                      description="This helps us prepare for the conversation. You can still change your mind during counselling.">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field id="qualification" label="Current qualification / study level" required error={errors.qualification}>
                          <select {...a11y('qualification')} className={inputClass}>
                            <option value="">Select</option>
                            {QUALIFICATIONS.map((q) => <option key={q} value={q}>{q}</option>)}
                          </select>
                        </Field>
                        <Field id="course" label="Interested course" required error={errors.course} hint="Choose “Not sure yet” if you want help deciding.">
                          <select {...a11y('course')} className={inputClass}>
                            <option value="">Select</option>
                            {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </Field>
                        <Field id="district" label="Preferred district" required error={errors.district}>
                          <select {...a11y('district')} className={inputClass}>
                            <option value="">Select</option>
                            {TN_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                            <option value="Outside Tamil Nadu">Outside Tamil Nadu</option>
                          </select>
                        </Field>
                        <Field id="college" label="Preferred college" error={errors.college}
                          hint={collegeSuggestions.length ? 'Pick from our listed colleges or type any college name.' : 'Type a college name if you have one in mind.'}>
                          <input type="text" list="college-suggestions" autoComplete="off" maxLength={150} {...a11y('college')} className={inputClass} />
                        </Field>
                        <datalist id="college-suggestions">
                          {collegeSuggestions.map((n) => <option key={n} value={n} />)}
                        </datalist>
                      </div>
                    </StepPanel>
                  )}

                  {step === 2 && (
                    <StepPanel key="preferences" focusHeading={interacted} icon={FaCommentDots} title="Counselling preferences"
                      description="All optional. These are preferences only and help our team plan the call; they are not a booked slot.">
                      <div className="space-y-5">
                        <ChoiceGroup id="contactMethod" name="contactMethod" legend="Preferred contact method" options={CONTACT_METHODS}
                          value={form.contactMethod} onChange={(v) => setForm((f) => ({ ...f, contactMethod: f.contactMethod === v ? '' : v }))} />
                        <Field id="contactTime" label="Best time to contact you" hint="We will try to reach you around this time, but cannot guarantee it.">
                          <select {...a11y('contactTime')} className={inputClass}>
                            <option value="">No preference</option>
                            {CONTACT_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                        <Field id="message" label="Your questions" error={errors.message}
                          hint={`Briefly describe what you would like to discuss. ${form.message.length}/500`}>
                          <textarea rows={4} maxLength={500} {...a11y('message')} className={inputClass} />
                        </Field>
                      </div>
                    </StepPanel>
                  )}

                  {step === 3 && (
                    <StepPanel key="review" focusHeading={interacted} icon={FaClipboardCheck} title="Review and submit"
                      description="Check your details. Use Edit to correct anything before sending.">
                      <div className="space-y-4">
                        <ReviewSection title="Student details" onEdit={() => goTo(0)} items={[
                          ['Student name', form.name], ['Mobile number', form.phone], ['Email', form.email, true],
                        ]} />
                        <ReviewSection title="Academic interests" onEdit={() => goTo(1)} items={[
                          ['Qualification', form.qualification], ['Interested course', form.course],
                          ['Preferred district', form.district], ['Preferred college', form.college],
                        ]} />
                        <ReviewSection title="Preferences" onEdit={() => goTo(2)} items={[
                          ['Contact method', form.contactMethod], ['Best time', form.contactTime], ['Questions', form.message, true],
                        ]} />
                        <CheckboxField id="consent" name="consent" checked={form.consent} onChange={set} error={errors.consent}>
                          I agree that Rasi Foundation may contact me about counselling using the details I have provided.
                          These details are used only to respond to this request.
                        </CheckboxField>
                      </div>
                    </StepPanel>
                  )}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  {step > 0 ? (
                    <button type="button" onClick={() => goTo(step - 1)} disabled={submitting} className="rf-btn-outline">
                      <FaChevronLeft aria-hidden="true" className="text-xs" /> Back
                    </button>
                  ) : <span />}
                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={next} className="rf-btn-primary px-7 py-3 text-base">
                      Continue <FaChevronRight aria-hidden="true" className="text-xs" />
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting} className="rf-btn-maroon px-7 py-3 text-base">
                      {submitting
                        ? (<><FaSpinner aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> Sending request…</>)
                        : (<><FaPaperPlane aria-hidden="true" /> Submit counselling request</>)}
                    </button>
                  )}
                </div>
                <p className="sr-only" role="status" aria-live="polite">{submitting ? 'Sending your request' : ''}</p>
              </form>
            )}
          </div>

          {status !== 'success' && (
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start" aria-label="About counselling">
              <div className="rf-card p-5">
                <h2 className="font-heading text-lg font-bold text-gray-900">About counselling</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-700">
                  <li>Counselling helps students understand course and college options.</li>
                  <li>You can discuss academic interests and admission-related next steps.</li>
                  <li>Recommendations depend on the student&apos;s preferences and the information available.</li>
                </ul>
              </div>
              <div className="rf-card p-5 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Prefer to talk now?</p>
                <p className="mt-1">Call <a href={`tel:${CONTACT.phoneTel}`} className="font-semibold text-brand-800 underline">{CONTACT.phoneDisplay}</a>.</p>
                <p className="mt-2">For a general question, use the <Link href="/contact" className="font-semibold text-brand-800 underline">enquiry form</Link>.</p>
              </div>
            </aside>
          )}
        </div>
      </section>
    </Layout>
  );
}
