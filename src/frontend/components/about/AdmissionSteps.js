import Link from 'next/link';
import {
  FaBookOpen, FaUniversity, FaComments, FaFileAlt, FaCreditCard, FaHandsHelping, FaArrowRight,
} from 'react-icons/fa';
import Reveal from '../home/Reveal';
import { ROUTES } from '@/data/siteConfig';

// Practical walk-through of the real routes on this site. Every href below exists under src/pages.
// /payment only works with ?ref=<biodata id>, so the payment step starts from the admission-details form
// (ROUTES.secureSeat = /biodata), which continues to payment. No fee, timeline or outcome is promised.
const STEPS = [
  { title: 'Explore courses', Icon: FaBookOpen, href: '/courses', cta: 'View courses',
    text: 'Read about the courses listed on our site and note the ones that match your marks and interests.' },
  { title: 'Compare colleges', Icon: FaUniversity, href: '/colleges', cta: 'Browse colleges',
    text: 'Look through the college directory by zone and department and shortlist the options you like.' },
  { title: 'Talk to a counsellor', Icon: FaComments, href: ROUTES.counselling, cta: 'Book counselling',
    text: 'Book a one-to-one session to discuss your shortlist, eligibility and scholarship information.' },
  { title: 'Ask your questions', Icon: FaFileAlt, href: ROUTES.enquiry, cta: 'Contact us',
    text: 'Not sure about something? Send an enquiry or call us before you decide.' },
  { title: 'Share admission details', Icon: FaCreditCard, href: ROUTES.secureSeat, cta: 'Secure Your Seat',
    text: 'Fill in the admission-details form. It continues to the payment page, where fees apply.' },
  { title: 'Follow-up support', Icon: FaHandsHelping, href: ROUTES.counselling, cta: 'Get in touch',
    text: 'We guide you on the next steps with the college. Admission itself is confirmed by the institution.' },
];

export default function AdmissionSteps() {
  return (
    <section aria-labelledby="journey-heading" className="bg-[#fbfaf6] py-14 md:py-16">
      <div className="container mx-auto">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="rf-eyebrow justify-center">How it works</p>
          <h2 id="journey-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Your Admission Journey, Step by Step
          </h2>
          <p className="mt-3 text-gray-600">
            From first look at courses to your next steps with a college. Each step opens the page or form you need.
          </p>
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(({ title, Icon, href, cta, text }, i) => (
            <li key={title}>
              <Reveal delay={Math.min(i, 3) * 0.06} className="group relative h-full">
                <Link
                  href={href}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-forest motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-forest via-gold-400 to-crimson transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-lg text-white">
                      <Icon aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-heading text-4xl font-bold text-gray-200">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-crimson">Step {i + 1} of {STEPS.length}</p>
                  <h3 className="mt-1 font-sans text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-2 flex-1 text-sm text-gray-600">{text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                    {cta} <FaArrowRight aria-hidden="true" className="text-xs transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
