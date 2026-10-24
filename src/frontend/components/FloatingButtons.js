import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaWhatsapp, FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { CONTACT, ROUTES } from '@/data/siteConfig';

// Pages where the floating group would sit on top of a form's submit controls.
const HIDDEN_ON = ['/book-counselling', '/contact', '/payment', '/biodata', '/scholarship-test/register'];

const tooltip =
  'pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100';
const iconButton =
  'group relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900';

export default function FloatingButtons() {
  const { pathname } = useRouter();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3"
      role="group"
      aria-label="Quick contact actions"
    >
      <Link
        href={ROUTES.counselling}
        className="group flex items-center gap-2 rounded-full bg-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
      >
        <FaCalendarCheck aria-hidden="true" />
        <span className="hidden sm:inline">Book Counselling</span>
        <span className="sr-only sm:hidden">Book Counselling</span>
      </Link>

      <a
        href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconButton} bg-[#1f8f4e]`}
        aria-label="Chat on WhatsApp (opens in a new tab)"
      >
        <FaWhatsapp className="text-2xl" aria-hidden="true" />
        <span className={tooltip} aria-hidden="true">Chat on WhatsApp</span>
      </a>

      <a
        href={`tel:${CONTACT.phoneTel}`}
        className={`${iconButton} bg-gray-800`}
        aria-label={`Call ${CONTACT.phoneDisplay}`}
      >
        <FaPhoneAlt className="text-lg" aria-hidden="true" />
        <span className={tooltip} aria-hidden="true">Call {CONTACT.phoneDisplay}</span>
      </a>
    </div>
  );
}
