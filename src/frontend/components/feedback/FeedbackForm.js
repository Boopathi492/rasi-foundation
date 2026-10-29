import { useState } from 'react';
import Link from 'next/link';
import {
  FaStar, FaRegStar, FaUserGraduate, FaUserFriends, FaPaperPlane,
  FaCheckCircle, FaExclamationCircle, FaSpinner, FaShieldAlt,
} from 'react-icons/fa';
import { ROUTES } from '@/data/siteConfig';

const RATING_LABELS = {
  1: '1 - Poor (Did not meet expectations)',
  2: '2 - Fair (Acceptable, needs improvement)',
  3: '3 - Good (Satisfactory guidance)',
  4: '4 - Very Good (Helpful and professional)',
  5: '5 - Excellent (Highly recommended)',
};

const INITIAL = {
  name: '',
  category: 'student', // 'student' | 'parent'
  phone: '',
  email: '',
  relatedCourse: '',
  relation: '',
  rating: 5,
  message: '',
  consent: false,
};

export default function FeedbackForm({ onSuccess, isModal = false, onCloseModal }) {
  const [form, setForm] = useState(INITIAL);
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [serverMsg, setServerMsg] = useState('');
  const [reference, setReference] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRatingClick = (rate) => {
    setForm((prev) => ({ ...prev, rating: rate }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Please provide your name.';
    } else if (form.name.trim().length > 100) {
      newErrors.name = 'Name must be 100 characters or fewer.';
    }

    if (form.phone.trim()) {
      const digits = form.phone.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
      if (!/^[6-9]\d{9}$/.test(digits)) {
        newErrors.phone = 'Please enter a valid 10-digit mobile number.';
      }
    }

    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.rating || form.rating < 1 || form.rating > 5) {
      newErrors.rating = 'Please choose a rating from 1 to 5 stars.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please share your experience or comments.';
    } else if (form.message.trim().length < 15) {
      newErrors.message = 'Feedback message must be at least 15 characters long.';
    } else if (form.message.trim().length > 1000) {
      newErrors.message = 'Feedback message must not exceed 1000 characters.';
    }

    if (!form.consent) {
      newErrors.consent = 'Please give consent for your feedback to be reviewed and displayed.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setServerMsg('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          category: form.category,
          phone: form.phone.trim(),
          email: form.email.trim(),
          relatedCourse: form.relatedCourse.trim(),
          relation: form.relation.trim(),
          rating: form.rating,
          message: form.message.trim(),
          consent: form.consent,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      const refId = json.data?._id;
      if (refId) setReference('REF-' + String(refId).slice(-8).toUpperCase());
      setStatus('success');
      setServerMsg(json.message || 'Thank you! Your feedback has been submitted for review.');
      setForm(INITIAL);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Feedback submit error:', err);
      setStatus('error');
      setServerMsg('We could not save your feedback right now. Please check your network and try again.');
    }
  };

  const activeRating = hoverRating || form.rating;

  if (status === 'success') {
    return (
      <div role="status" className="py-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-forest shadow-inner">
          <FaCheckCircle className="text-3xl" />
        </div>
        <h3 className="mt-4 font-heading text-2xl font-bold text-gray-900">
          Thank You for Your Feedback!
        </h3>
        {reference && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white/80 px-3 py-1 font-mono text-xs font-semibold text-emerald-900">
            <span>Feedback Reference:</span> <span>{reference}</span>
          </div>
        )}
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
          {serverMsg}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-xs text-gray-500">
          <FaShieldAlt className="text-forest" />
          <span>Submitted reviews remain private until reviewed under our Authentic Feedback Policy.</span>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="rf-btn-outline !rounded-full px-6 py-2.5 text-xs"
          >
            Submit Another Review
          </button>
          {isModal && onCloseModal ? (
            <button
              type="button"
              onClick={onCloseModal}
              className="rf-btn-primary !rounded-full px-6 py-2.5 text-xs"
            >
              Done / Close
            </button>
          ) : (
            <Link href={ROUTES.counselling} className="rf-btn-primary !rounded-full px-6 py-2.5 text-xs">
              Book Counselling Session
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'error' && (
        <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-crimson sm:text-sm">
          <FaExclamationCircle className="mt-0.5 text-base shrink-0" />
          <p>{serverMsg}</p>
        </div>
      )}

      {/* Category Selector Tabs */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-600">
          I am submitting feedback as: <span className="text-crimson">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setForm((p) => ({ ...p, category: 'student' }))}
            className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 text-xs sm:text-sm font-bold transition-all ${
              form.category === 'student'
                ? 'border-crimson bg-gradient-to-r from-rose-50 to-[#fff5f6] text-crimson shadow-sm ring-1 ring-crimson/20'
                : 'border-gray-200 bg-gray-50/70 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaUserGraduate className={form.category === 'student' ? 'text-crimson' : 'text-gray-400'} />
            <span>Student Feedback</span>
          </button>

          <button
            type="button"
            onClick={() => setForm((p) => ({ ...p, category: 'parent' }))}
            className={`flex items-center justify-center gap-2 rounded-2xl border p-3.5 text-xs sm:text-sm font-bold transition-all ${
              form.category === 'parent'
                ? 'border-forest bg-gradient-to-r from-emerald-50 to-[#f2fbf7] text-forest shadow-sm ring-1 ring-forest/20'
                : 'border-gray-200 bg-gray-50/70 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
            }`}
          >
            <FaUserFriends className={form.category === 'parent' ? 'text-forest' : 'text-gray-400'} />
            <span>Parent / Guardian Feedback</span>
          </button>
        </div>
      </div>

      {/* Name & Contact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={isModal ? 'm-fb-name' : 'fb-name'} className="mb-1 block text-xs font-bold text-gray-800">
            Full Name <span className="text-crimson">*</span>
          </label>
          <input
            id={isModal ? 'm-fb-name' : 'fb-name'}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={form.category === 'student' ? 'e.g. Boopathi K' : 'e.g. S. Ramanathan'}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 ${
              errors.name ? 'border-crimson bg-rose-50/30' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-crimson">{errors.name}</p>}
        </div>

        {form.category === 'parent' ? (
          <div>
            <label htmlFor={isModal ? 'm-fb-relation' : 'fb-relation'} className="mb-1 block text-xs font-bold text-gray-800">
              Relationship to Student <span className="font-normal text-gray-500">(e.g. Father, Mother)</span>
            </label>
            <input
              id={isModal ? 'm-fb-relation' : 'fb-relation'}
              name="relation"
              type="text"
              value={form.relation}
              onChange={handleChange}
              placeholder="Father / Mother / Guardian"
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25"
            />
          </div>
        ) : (
          <div>
            <label htmlFor={isModal ? 'm-fb-course' : 'fb-course'} className="mb-1 block text-xs font-bold text-gray-800">
              Course / Academic Stream <span className="font-normal text-gray-500">(e.g. B.E. CSE, MBBS)</span>
            </label>
            <input
              id={isModal ? 'm-fb-course' : 'fb-course'}
              name="relatedCourse"
              type="text"
              value={form.relatedCourse}
              onChange={handleChange}
              placeholder="e.g. B.Tech AI & DS / MBBS"
              className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25"
            />
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={isModal ? 'm-fb-phone' : 'fb-phone'} className="mb-1 block text-xs font-bold text-gray-800">
            Mobile Number <span className="font-normal text-gray-500">(for internal verification)</span>
          </label>
          <input
            id={isModal ? 'm-fb-phone' : 'fb-phone'}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 ${
              errors.phone ? 'border-crimson' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-crimson">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={isModal ? 'm-fb-email' : 'fb-email'} className="mb-1 block text-xs font-bold text-gray-800">
            Email Address <span className="font-normal text-gray-500">(kept strictly private)</span>
          </label>
          <input
            id={isModal ? 'm-fb-email' : 'fb-email'}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 ${
              errors.email ? 'border-crimson' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-crimson">{errors.email}</p>}
        </div>
      </div>

      {/* Rating Control */}
      <div>
        <label id={isModal ? 'm-rating-label' : 'rating-label'} className="mb-1 block text-xs font-bold text-gray-800">
          Your Overall Rating <span className="text-crimson">*</span>
        </label>
        <div
          role="radiogroup"
          aria-labelledby={isModal ? 'm-rating-label' : 'rating-label'}
          className="flex flex-wrap items-center gap-2"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={form.rating === star}
              aria-label={`${star} Star - ${RATING_LABELS[star]}`}
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="rounded-lg p-1 text-2xl transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              {star <= activeRating ? (
                <FaStar className="text-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]" />
              ) : (
                <FaRegStar className="text-gray-300" />
              )}
            </button>
          ))}
          <span className="ml-2 text-xs font-bold text-gray-700">
            {RATING_LABELS[activeRating] || `${activeRating} Stars`}
          </span>
        </div>
        {errors.rating && <p className="mt-1 text-xs text-crimson">{errors.rating}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor={isModal ? 'm-fb-message' : 'fb-message'} className="mb-1 block text-xs font-bold text-gray-800">
          Your Feedback &amp; Counselling Experience <span className="text-crimson">*</span>
        </label>
        <textarea
          id={isModal ? 'm-fb-message' : 'fb-message'}
          name="message"
          rows={3}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          placeholder="Share how Rasi Foundation assisted your college selection, career clarity, admission steps, or document guidance..."
          className={`w-full rounded-2xl border px-3.5 py-2.5 text-sm text-gray-900 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/25 ${
            errors.message ? 'border-crimson bg-rose-50/30' : 'border-gray-300'
          }`}
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
          <span>Minimum 15 characters. Respectful, authentic language.</span>
          <span>{form.message.length} / 1000</span>
        </div>
        {errors.message && <p className="mt-1 text-xs text-crimson">{errors.message}</p>}
      </div>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs text-gray-700">
          <input
            name="consent"
            type="checkbox"
            checked={form.consent}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-forest focus:ring-forest"
          />
          <span className="leading-snug">
            I confirm this feedback is based on my genuine interaction with Rasi Foundation. I consent to its
            publication on the official website following administrative moderation. My phone and email will
            remain strictly private.
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-xs text-crimson">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rf-btn-maroon w-full !rounded-full py-3 text-sm font-bold"
      >
        {status === 'submitting' ? (
          <>
            <FaSpinner className="animate-spin text-sm" />
            <span>Submitting Feedback…</span>
          </>
        ) : (
          <>
            <FaPaperPlane className="text-xs" />
            <span>Submit Verified Feedback</span>
          </>
        )}
      </button>
    </form>
  );
}
