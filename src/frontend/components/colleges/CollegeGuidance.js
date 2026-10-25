import Link from 'next/link';
import {
  FaCheckCircle, FaMapMarkedAlt, FaBalanceScale, FaAward,
  FaFileContract, FaArrowRight, FaQuestionCircle,
} from 'react-icons/fa';
import Reveal from '@/frontend/components/home/Reveal';
import { ROUTES } from '@/data/siteConfig';

export default function CollegeGuidance({ onSelectZone, zones = [] }) {
  return (
    <div className="space-y-16 py-8">
      {/* 1. Explore Colleges by Region */}
      <section aria-labelledby="region-heading" className="bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-gray-200/90 bg-gradient-to-br from-[#fbf8f4] via-white to-[#f4f9f6] p-6 shadow-sm sm:p-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-emerald-50 px-3 py-1 text-xs font-bold text-forest">
                <FaMapMarkedAlt />
                <span>Geographic Exploration</span>
              </div>
              <h2 id="region-heading" className="mt-2 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                Explore Institutions by <span className="text-crimson">Region</span>
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                Filter partner institutions across Tamil Nadu and nearby educational hubs. Click any region to jump straight to filtered results.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {zones.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => onSelectZone && onSelectZone(z)}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-crimson hover:bg-rose-50/50 hover:text-crimson"
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Practical College Selection Guidance */}
      <section aria-labelledby="selection-guidance-heading" className="bg-[#fcfbf9] py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="rf-eyebrow">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              Admissions Advice
            </p>
            <h2 id="selection-guidance-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900">
              College Selection <span className="text-crimson">Guidance</span>
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
              Key objective criteria every student and parent should evaluate before finalizing a college choice.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'TNEA Code & Affiliation',
                desc: 'Confirm whether the college is Anna University affiliated, autonomous, or a deemed university, along with its official counseling code.',
                icon: FaFileContract,
                tone: 'text-crimson bg-rose-50 border-rose-200',
              },
              {
                title: 'NBA & NAAC Accreditation',
                desc: 'Verify department-specific NBA accreditation and institution-level NAAC grading to ensure standard lab facilities and syllabus updates.',
                icon: FaAward,
                tone: 'text-forest bg-emerald-50 border-emerald-200',
              },
              {
                title: 'Location & Commute Safety',
                desc: 'Consider daily bus transport routes, on-campus residential hostel infrastructure, and proximity to your hometown.',
                icon: FaMapMarkedAlt,
                tone: 'text-[#9a6300] bg-amber-50 border-amber-200',
              },
              {
                title: 'Fee Transparency & Concessions',
                desc: 'Check government vs management quota tuition fees, hostel expenses, and applicability of 7.5% government school or First Graduate waivers.',
                icon: FaBalanceScale,
                tone: 'text-blue-700 bg-blue-50 border-blue-200',
              },
              {
                title: 'Department Specialization',
                desc: 'Ensure the college excels in your chosen stream (e.g. AI & DS, Mechanical, Biomedical) rather than judging solely by general campus size.',
                icon: FaCheckCircle,
                tone: 'text-purple-700 bg-purple-50 border-purple-200',
              },
              {
                title: 'Professional Counselling',
                desc: 'Confused between multiple good colleges? Discuss cutoff probabilities with our counsellors before choice filling.',
                icon: FaQuestionCircle,
                tone: 'text-forest bg-emerald-50 border-emerald-200',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border text-lg ${card.tone}`}>
                    <Icon />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link href={ROUTES.counselling} className="rf-btn-primary !rounded-full px-8 py-3 text-xs sm:text-sm">
              <span>Discuss College Options with a Counsellor</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
