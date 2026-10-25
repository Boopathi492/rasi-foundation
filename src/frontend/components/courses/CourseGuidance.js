import Link from 'next/link';
import {
  FaGraduationCap, FaCompass, FaClipboardCheck, FaHospital, FaCog,
  FaBalanceScale, FaLeaf, FaLaptopCode, FaChartLine, FaArrowRight,
  FaCalendarCheck, FaUserTie,
} from 'react-icons/fa';
import Reveal from '@/frontend/components/home/Reveal';
import { ROUTES } from '@/data/siteConfig';

const STREAM_DETAILS = [
  {
    title: 'Medical & Allied Health Sciences',
    icon: FaHospital,
    tag: 'MBBS, BDS, AYUSH, Nursing, Allied Health',
    desc: 'Professional clinical and healthcare programs requiring dedicated science preparation (+2 PCB / NEET qualification). Encompasses traditional medicine (Ayurveda, Siddha, Homeopathy) as well as critical diagnostic fields.',
    tone: 'border-rose-200 bg-rose-50/50 text-crimson',
  },
  {
    title: 'Engineering & Emerging Technologies',
    icon: FaCog,
    tag: 'B.E. / B.Tech (AI & DS, CSE, ECE, Mechanical, Civil)',
    desc: 'Technical programs focusing on computational, electronics, automation, and foundational infrastructure skills. Admission is primarily governed by the Tamil Nadu Engineering Admissions (TNEA) single-window cutoff.',
    tone: 'border-amber-200 bg-amber-50/50 text-[#9a6300]',
  },
  {
    title: 'Management, Commerce & Computing',
    icon: FaChartLine,
    tag: 'MBA, MCA, BBA, B.Com, CA Foundation',
    desc: 'Business administration, data analytics, corporate finance, and enterprise software systems. Suitable for students aiming for managerial, banking, or technology consulting careers.',
    tone: 'border-blue-200 bg-blue-50/50 text-blue-700',
  },
  {
    title: 'Arts, Science & Humanities',
    icon: FaGraduationCap,
    tag: 'B.Sc, B.A, M.Sc, M.A, Research & Ph.D',
    desc: 'Comprehensive degree pathways in Physics, Chemistry, Mathematics, Literature, and Social Sciences. Ideal for public civil services, academic research, and competitive examinations.',
    tone: 'border-emerald-200 bg-emerald-50/50 text-forest',
  },
  {
    title: 'Legal Studies & Jurisprudence',
    icon: FaBalanceScale,
    tag: '5-Year Integrated BA/BBA LLB, 3-Year LLB, LLM',
    desc: 'In-depth legal education encompassing constitutional law, corporate contracts, civil litigation, and human rights advocacy through recognized Bar Council of India law institutions.',
    tone: 'border-purple-200 bg-purple-50/50 text-purple-700',
  },
  {
    title: 'Agriculture & Environmental Sciences',
    icon: FaLeaf,
    tag: 'B.Sc (Hons) Agriculture, Horticulture, Forestry',
    desc: 'Applied sciences covering agronomy, sustainable crop production, post-harvest engineering, and agri-business management through TNAU and affiliated private institutions.',
    tone: 'border-emerald-200 bg-emerald-50/50 text-forest',
  },
];

const PREPARATION_STEPS = [
  'Keep your 10th & 12th mark statements or expected marks estimate ready.',
  'Calculate your subject cut-off (e.g. Maths + Physics/2 + Chemistry/2 for TNEA).',
  'Note down any specific quota eligibility (First Graduate, 7.5% Govt School, Sports, Ex-Servicemen).',
  'Prepare a list of preferred districts or colleges based on transport/hostel convenience.',
];

export default function CourseGuidance() {
  return (
    <div className="space-y-16 py-12">
      {/* 1. Understand Your Course Options */}
      <section aria-labelledby="streams-heading" className="bg-[#fdfbf7] py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="rf-eyebrow">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              Stream Explorer
            </p>
            <h2 id="streams-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">
              Understand Your <span className="text-crimson">Course Options</span>
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
              Verified overviews of the core academic streams available across Tamil Nadu institutions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STREAM_DETAILS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex flex-col justify-between rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                  <div>
                    <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border text-xl ${s.tone}`}>
                      <Icon />
                    </span>
                    <h3 className="mt-4 font-heading text-lg font-bold text-gray-900">{s.title}</h3>
                    <p className="mt-1 text-[11px] font-bold text-gray-500 uppercase tracking-wide">{s.tag}</p>
                    <p className="mt-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Get Personalised Guidance */}
      <section aria-labelledby="prep-heading" className="bg-white">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/50 via-white to-rose-50/40 p-8 shadow-sm md:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-3 py-1 text-xs font-bold text-forest">
                  <FaUserTie />
                  <span>One-to-One Counselling Prep</span>
                </div>
                <h2 id="prep-heading" className="mt-3 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">
                  Get Personalised Course Guidance
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                  Before booking your session with our counselling advisors, having these key details ready helps us provide immediate, accurate college cut-off analysis:
                </p>

                <ul className="mt-4 space-y-2.5">
                  {PREPARATION_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 sm:text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm lg:col-span-5">
                <h3 className="font-heading text-lg font-bold text-gray-900">
                  Ready to Discuss Your Path?
                </h3>
                <p className="text-xs text-gray-600">
                  Our counsellors do not charge any registration fees for initial advisory sessions.
                </p>
                <Link
                  href={ROUTES.counselling}
                  className="rf-btn-primary !rounded-full py-3 text-xs sm:text-sm text-center mt-2"
                >
                  <FaCalendarCheck />
                  <span>Book Free Counselling Session</span>
                </Link>
                <Link
                  href={ROUTES.secureSeat}
                  className="rf-btn-maroon !rounded-full py-3 text-xs sm:text-sm text-center"
                >
                  <span>Apply for Admission (Secure Your Seat)</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
