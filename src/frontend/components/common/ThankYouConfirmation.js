import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaHome, FaRedo, FaInfoCircle } from 'react-icons/fa';
import { CONTACT } from '@/data/siteConfig';

export default function ThankYouConfirmation({
  title = 'Request Received',
  subtitle = 'Thank you for reaching out to Rasi Foundation.',
  reference = '',
  details = [],
  nextSteps = 'Our academic counselling advisors will review your details and reach out to you shortly.',
  notice = '',
  showLogo = false,
  onReset = null,
  resetLabel = 'Submit Another Request',
  homeHref = '/',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8 shadow-sm text-center"
    >
      {/* Official Rasi Foundation Logo (Optional, omitted by default to avoid clutter when header logo is visible) */}
      {showLogo && (
        <div className="flex justify-center mb-4">
          <Image
            src="/rasi-logo.png"
            alt="Rasi Foundation logo"
            width={180}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>
      )}

      {/* Success Badge */}
      <div className="mx-auto my-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner">
        <FaCheckCircle className="text-3xl" aria-hidden="true" />
      </div>

      <h2 className="font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600 leading-relaxed">
        {subtitle}
      </p>

      {/* Reference Badge */}
      {reference && (
        <div className="mx-auto my-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-2 text-xs text-emerald-900">
          <span className="font-medium text-emerald-800">Booking / Reference ID:</span>
          <span className="font-mono font-bold tracking-wider text-emerald-950 text-sm">
            {reference}
          </span>
        </div>
      )}

      {/* Non-sensitive details summary */}
      {details.length > 0 && (
        <div className="mx-auto my-4 max-w-md rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-left text-xs">
          <p className="font-semibold text-gray-700 mb-2">Submission Summary:</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-gray-600">
            {details.map((d, idx) => (
              <div key={idx} className="flex justify-between sm:block border-b border-gray-200/50 sm:border-0 pb-1 sm:pb-0">
                <dt className="text-gray-500 font-medium">{d.label}:</dt>
                <dd className="font-semibold text-gray-800 truncate">{d.value || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Advisory Notice (e.g. Counselling pending callback note) */}
      {notice && (
        <div className="mx-auto my-4 max-w-lg rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs text-amber-900 flex items-start gap-2.5 text-left">
          <FaInfoCircle className="mt-0.5 shrink-0 text-amber-600 text-sm" aria-hidden="true" />
          <p className="leading-relaxed">{notice}</p>
        </div>
      )}

      {/* Next steps */}
      <div className="mx-auto my-3 max-w-lg text-xs text-gray-600 leading-relaxed">
        <p className="font-semibold text-gray-800">What happens next?</p>
        <p className="mt-1">{nextSteps}</p>
      </div>

      {/* Immediate assistance call-outs */}
      <div className="mx-auto my-4 flex flex-wrap justify-center items-center gap-3 text-xs text-gray-500">
        <span>Need urgent assistance?</span>
        <a
          href={`tel:${CONTACT.phoneTel}`}
          className="inline-flex items-center gap-1.5 font-bold text-forest hover:underline"
        >
          <FaPhoneAlt className="text-[10px]" /> {CONTACT.phoneDisplay}
        </a>
        <span aria-hidden="true">•</span>
        <a
          href={`https://wa.me/${CONTACT.whatsappNumber || '918073774591'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-bold text-forest hover:underline"
        >
          <FaWhatsapp className="text-xs" /> WhatsApp Support
        </a>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="rf-btn-outline !rounded-xl px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
          >
            <FaRedo className="text-[10px]" /> {resetLabel}
          </button>
        )}
        <Link
          href={homeHref}
          className="rf-btn-primary !rounded-xl px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
