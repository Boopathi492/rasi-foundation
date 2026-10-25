import Link from 'next/link';
import {
  FaBookOpen, FaUniversity, FaComments, FaFileAlt, FaAward, FaArrowRight,
} from 'react-icons/fa';
import Reveal from '@/frontend/components/home/Reveal';
import { ROUTES } from '@/data/siteConfig';

const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Explore Academic Streams',
    desc: 'Understand diverse career options in Engineering, Medical, Arts & Science, Law, and Agriculture tailored to your marks.',
    icon: FaBookOpen,
    href: '/courses',
    linkText: 'Explore Courses',
    tone: 'border-amber-200 bg-amber-50/50 text-[#9a6300]',
  },
  {
    step: '02',
    title: 'Review Accredited Colleges',
    desc: 'Compare Tamil Nadu colleges by district, zone, TNEA codes, facilities, and available department specializations.',
    icon: FaUniversity,
    href: '/colleges',
    linkText: 'College Directory',
    tone: 'border-emerald-200 bg-emerald-50/50 text-forest',
  },
  {
    step: '03',
    title: 'Personalised Counselling',
    desc: 'Meet our senior educational analysts for one-to-one discussions covering cut-off trends, quota eligibility, and family preferences.',
    icon: FaComments,
    href: ROUTES.counselling,
    linkText: 'Book Counselling',
    tone: 'border-rose-200 bg-rose-50/50 text-crimson',
  },
  {
    step: '04',
    title: 'Application & BioData Form',
    desc: 'Submit your academic records, category details, and preferred choices through our structured online BioData portal.',
    icon: FaFileAlt,
    href: ROUTES.secureSeat,
    linkText: 'Submit Application',
    tone: 'border-blue-200 bg-blue-50/50 text-blue-700',
  },
  {
    step: '05',
    title: 'Scholarship & Final Admission',
    desc: 'Receive guidance on eligible government or institutional scholarships and complete your enrollment with total peace of mind.',
    icon: FaAward,
    href: '/scholarship-test',
    linkText: 'Scholarship Guidance',
    tone: 'border-purple-200 bg-purple-50/50 text-purple-700',
  },
];

export default function AboutJourney() {
  return (
    <section aria-labelledby="about-journey-heading" className="bg-[#fcfbf9] py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="rf-eyebrow">
            <span className="h-2 w-2 rounded-full bg-crimson" />
            Clear Roadmap
          </p>
          <h2 id="about-journey-heading" className="mt-2 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
            Your Admission Journey, <span className="text-crimson">Step by Step</span>
          </h2>
          <div aria-hidden="true" className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-0.5 w-10 rounded-full bg-crimson" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            <span className="h-0.5 w-6 rounded-full bg-forest" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            How Rasi Foundation partners with students and parents from initial career curiosity to confirmed college admission.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {JOURNEY_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={idx * 0.08}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg ${item.tone}`}>
                        <Icon />
                      </span>
                      <span className="font-display text-sm font-black text-gray-300">
                        STEP {item.step}
                      </span>
                    </div>
                    <h3 className="mt-4 font-heading text-base font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600">
                      {item.desc}
                    </p>
                  </div>

                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-forest transition-colors hover:text-crimson"
                  >
                    <span>{item.linkText}</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
