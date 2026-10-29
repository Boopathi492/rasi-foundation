import { useState } from 'react';
import Link from 'next/link';
import {
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle,
  FaSpinner, FaWhatsapp, FaExclamationCircle, FaCalendarCheck,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageHero from '@/frontend/components/PageHero';
import Testimonials from '@/frontend/components/home/Testimonials';
import Reveal from '@/frontend/components/home/Reveal';
import ThankYouConfirmation from '@/frontend/components/common/ThankYouConfirmation';
import { CONTACT, ROUTES, TN_DISTRICTS, LABELS } from '@/data/siteConfig';

// The WhatsApp number used on this page before the redesign. It differs from CONTACT.whatsappNumber
// (header/floating buttons): the owner needs to confirm which is official.
const CONTACT_PAGE_WHATSAPP = '918073774591';

const ENQUIRY_TYPES = ['General enquiry', 'Admission guidance', 'Course selection', 'College selection', 'Scholarship information', 'Counselling'];
const COURSE_INTERESTS = ['Medical', 'Engineering', 'Management', 'Law', 'Education', 'Arts & Science', 'Agriculture', 'Not sure yet'];

const OFFICE_MAP_URL =
  'https://www.google.com/maps/place/11%C2%B024\'06.6%22N+78%C2%B009\'34.6%22E/@11.4018417,78.1570241,17z/data=!3m1!4b1!4m4!3m3!8m2!3d11.4018417!4d78.159599';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Rasi Foundation',
  description: 'Career guidance and education consultancy',
  telephone: '+91-9789446100',
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11°24\'06.6"N 78°09\'34.6"E',
    addressLocality: 'Rasipuram',
    addressRegion: 'Tamil Nadu',
    postalCode: '637408',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: '11.4018417', longitude: '78.159599' },
  openingHours: 'Mo-Sa 09:00-18:00',
};

const EMPTY = { name: '', email: '', phone: '', district: '', course: '', type: ENQUIRY_TYPES[0], message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your full name.';
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a phone number with at least 10 digits.';
  if (!v.message.trim()) e.message = 'Please tell us how we can help.';
  return e;
}

const fieldClass = (bad) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-600 ${bad ? 'border-red-500' : 'border-gray-300'}`;

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label} {required ? <span className="text-red-600" aria-hidden="true">*</span> : <span className="font-normal text-gray-500">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <FaExclamationCircle aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [reference, setReference] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus('submitting');
    // POST /api/contact only stores name, email, phone, subject and message. District and course interest are
    // added to the message text so staff see them, without changing the API or the database model.
    const extra = [values.district && `District: ${values.district}`, values.course && `Course interest: ${values.course}`].filter(Boolean);
    const message = [values.message.trim(), extra.length ? `\n\n${extra.join(' | ')}` : ''].join('').slice(0, 2000);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          subject: values.type,
          message,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        const refId = json.data?._id;
        setReference(refId ? `REF-${String(refId).slice(-8).toUpperCase()}` : '');
        setLastSubmitted({
          name: values.name.trim(),
          type: values.type,
          course: values.course,
          district: values.district,
        });
        setStatus('success');
        setValues(EMPTY);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact submit failed', err);
      setStatus('error');
    }
  };

  const describe = (n) => (errors[n] ? `${n}-error` : undefined);
  const submitting = status === 'submitting';

  const details = [
    {
      Icon: FaPhoneAlt,
      label: 'Phone',
      node: (
        <a href={`tel:${CONTACT.phoneTel}`} className="rf-phone-link">
          <FaPhoneAlt className="text-forest text-[10px]" aria-hidden="true" />
          <span>{CONTACT.phoneDisplay}</span>
        </a>
      ),
    },
    {
      Icon: FaWhatsapp,
      label: 'WhatsApp',
      node: (
        <a href={`https://wa.me/${CONTACT_PAGE_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="rf-phone-link">
          <FaWhatsapp className="text-forest text-xs" aria-hidden="true" />
          <span>Chat on WhatsApp</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
    {
      Icon: FaEnvelope,
      label: 'Email',
      node: (
        <a href={`mailto:${CONTACT.email}`} className="break-all font-semibold text-gray-900 transition-colors hover:text-brand-700">
          {CONTACT.email}
        </a>
      ),
    },
    {
      Icon: FaMapMarkerAlt,
      label: 'Office',
      node: (
        <>
          <p className="font-semibold text-gray-900">Rasipuram, Tamil Nadu 637408</p>
          <a href={OFFICE_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-xs font-bold text-forest underline hover:text-crimson">
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </>
      ),
    },
    { Icon: FaClock, label: 'Working hours', node: <p className="font-semibold text-gray-900">Monday to Saturday, 9:00 am to 6:00 pm</p> },
  ];

  return (
    <Layout
      title="Contact Us"
      description="Contact Rasi Foundation for career guidance, course and college selection, and admission support."
      keywords="career guidance, education consultancy, admission support, Rasipuram"
      structuredData={structuredData}
    >
      <PageHero eyebrow="Get in touch" title="Contact Rasi Foundation">
        Questions about admissions, courses or scholarships? Send us a message and a counsellor will get back to you.
      </PageHero>

      <section className="bg-brand-50/50 py-14">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rf-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900">Send an enquiry</h2>
              <p className="mt-1 text-gray-600">Fields marked * are required.</p>

              {status === 'success' ? (
                <div className="mt-6">
                  <ThankYouConfirmation
                    title="Enquiry Received"
                    subtitle="Thank you for reaching out to Rasi Foundation. Your message has been received and saved."
                    reference={reference}
                    details={[
                      ...(lastSubmitted?.name ? [{ label: 'Name', value: lastSubmitted.name }] : []),
                      ...(lastSubmitted?.type ? [{ label: 'Enquiry Type', value: lastSubmitted.type }] : []),
                      ...(lastSubmitted?.course ? [{ label: 'Course Interest', value: lastSubmitted.course }] : []),
                      ...(lastSubmitted?.district ? [{ label: 'District', value: lastSubmitted.district }] : []),
                    ]}
                    nextSteps="Our educational counselling team will review your enquiry and contact you on the phone number or email you provided."
                    onReset={() => {
                      setStatus('idle');
                      setLastSubmitted(null);
                    }}
                    resetLabel="Send Another Enquiry"
                    homeHref="/"
                  />
                </div>
              ) : (
                <>
                  {status === 'error' && (
                    <div role="alert" className="mt-6 flex gap-4 rounded-xl border border-red-200 bg-red-50 p-5">
                      <FaExclamationCircle className="mt-1 shrink-0 text-2xl text-red-700" aria-hidden="true" />
                      <div>
                        <p className="font-semibold text-red-900">We could not send your enquiry.</p>
                        <p className="mt-1 text-sm text-gray-700">Please check your details and try again, or call us on {CONTACT.phoneDisplay}.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full name" required error={errors.name}>
                  <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={onChange}
                    aria-invalid={!!errors.name} aria-describedby={describe('name')} className={fieldClass(errors.name)} placeholder="Your full name" />
                </Field>
                <Field id="phone" label="Phone number" required error={errors.phone}>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={onChange}
                    aria-invalid={!!errors.phone} aria-describedby={describe('phone')} className={fieldClass(errors.phone)} placeholder="10-digit mobile number" />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="email" label="Email address" required error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange}
                      aria-invalid={!!errors.email} aria-describedby={describe('email')} className={fieldClass(errors.email)} placeholder="you@example.com" />
                  </Field>
                </div>
                <Field id="district" label="District">
                  <select id="district" name="district" value={values.district} onChange={onChange} className={fieldClass(false)}>
                    <option value="">Select your district</option>
                    {TN_DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    <option value="Outside Tamil Nadu">Outside Tamil Nadu</option>
                  </select>
                </Field>
                <Field id="course" label="Course interest">
                  <select id="course" name="course" value={values.course} onChange={onChange} className={fieldClass(false)}>
                    <option value="">Select a course area</option>
                    {COURSE_INTERESTS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field id="type" label="Enquiry type" required>
                    <select id="type" name="type" value={values.type} onChange={onChange} className={fieldClass(false)}>
                      {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="Message" required error={errors.message}>
                    <textarea id="message" name="message" rows={5} maxLength={1800} value={values.message} onChange={onChange}
                      aria-invalid={!!errors.message} aria-describedby={describe('message')} className={`${fieldClass(errors.message)} resize-y`} placeholder="Tell us about your marks, interests or questions" />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={submitting} className="rf-btn-primary w-full px-6 py-3.5 text-base sm:w-auto">
                    {submitting ? <><FaSpinner className="animate-spin" aria-hidden="true" /> Sending...</> : <><FaPaperPlane aria-hidden="true" /> Send enquiry</>}
                  </button>
                </div>
              </form>
            </>
          )}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6 lg:col-span-5">
            <div className="rf-card p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900">Contact details</h2>
              <ul className="mt-5 space-y-5">
                {details.map(({ Icon, label, node }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon aria-hidden="true" /></span>
                    <div><p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</p>{node}</div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-gray-500">
                The office location and working hours are carried over from the previous contact page and still need confirming.
              </p>
            </div>

            <div className="rounded-2xl bg-brand-800 p-6 text-white md:p-8">
              <h2 className="font-heading text-xl font-bold">Prefer to talk it through?</h2>
              <p className="mt-2 text-white/80">Book a one-to-one counselling session for course and college guidance.</p>
              <Link href={ROUTES.counselling} className="rf-btn-gold mt-4 px-5 py-2.5"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <section aria-labelledby="contact-cta" className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-8 py-10 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <h2 id="contact-cta" className="font-heading text-3xl font-bold">Ready to secure your admission?</h2>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-6 py-3">Book Counselling</Link>
              <Link href={ROUTES.secureSeat} className="rf-btn-light px-6 py-3">{LABELS.secureSeat}</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
