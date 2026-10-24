import Link from 'next/link';
import {
  FaBookOpen, FaFileAlt, FaComments, FaCreditCard, FaFolderOpen,
  FaUniversity, FaUserFriends, FaGraduationCap, FaArrowRight,
} from 'react-icons/fa';

const STEPS = [
  { title: 'Explore Programs', text: 'Browse courses and colleges to find the right fit for your future.', Icon: FaBookOpen, tone: 'red', href: '/courses', side: 'left', position: 'lg:col-start-1 lg:row-start-1' },
  { title: 'Fill the Form', text: 'Complete the enquiry or application details to get started.', Icon: FaFileAlt, tone: 'green', href: '/contact', side: 'right', position: 'lg:col-start-2 lg:row-start-1' },
  { title: 'Attend Counselling', text: 'Get guidance about course options, college selection, eligibility and more.', Icon: FaComments, tone: 'gold', href: '/book-counselling', side: 'right', position: 'lg:col-start-2 lg:row-start-2' },
  { title: 'Make the Payment', text: 'Complete a required fee through the existing secure payment process, when applicable.', Icon: FaCreditCard, tone: 'red', href: '/biodata', side: 'left', position: 'lg:col-start-1 lg:row-start-2' },
  { title: 'Upload Documents', text: 'Provide academic and identification documents when the process requires them.', Icon: FaFolderOpen, tone: 'green', href: '/biodata', side: 'left', position: 'lg:col-start-1 lg:row-start-3' },
  { title: 'Admission Guidance', text: 'Get help with next steps and confirmation from the relevant institution.', Icon: FaUniversity, tone: 'gold', href: '/colleges', side: 'right', position: 'lg:col-start-2 lg:row-start-3' },
];

export default function AdmissionJourney() {
  return (
    <section aria-labelledby="journey-heading" className="journey-section overflow-hidden bg-[#fffdfb] py-12 md:py-16">
      <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-[0.72fr_1.55fr] lg:gap-12">
        <div className="journey-intro lg:sticky lg:top-28">
          <p className="rf-eyebrow">Rasi Foundation</p>
          <h2 id="journey-heading" className="mt-3 max-w-md font-heading text-4xl font-bold leading-[1.04] text-brand-900 md:text-5xl">
            Your <span className="text-rasi-700">Admission</span> Journey
          </h2>
          <p className="mt-4 font-heading text-lg text-gray-700">From Enquiry to a Brighter Future</p>
          <span aria-hidden="true" className="mt-5 block h-1 w-20 rounded-full bg-rasi-700" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-600 md:text-base">
            A simple, supportive process to help you choose a course, get expert guidance and take your next admission steps with confidence.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-white bg-white p-3 shadow-sm">
            {[[FaUserFriends, 'Expert Guidance'], [FaGraduationCap, 'Trusted Colleges'], [FaComments, 'End-to-End Support']].map(([Icon, label]) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center text-[10px] font-semibold leading-tight text-gray-700 sm:text-[11px]">
                <Icon className="text-xl text-brand-700" aria-hidden="true" /><span>{label}</span>
              </div>
            ))}
          </div>
          <Link href="/book-counselling" className="rf-btn-primary mt-6 px-5 py-3">
            Start Your Admission Journey <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="journey-track relative grid gap-5 lg:grid-cols-2 lg:grid-rows-3 lg:gap-x-16 lg:gap-y-7">
          <svg aria-hidden="true" className="journey-road pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block" viewBox="0 0 1000 680" preserveAspectRatio="none">
            <path d="M250 100 C410 100 410 100 500 100 S590 100 750 100 C900 100 900 340 750 340 S590 340 500 340 S410 340 250 340 C100 340 100 580 250 580 S590 580 750 580" fill="none" stroke="#075544" strokeWidth="76" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M250 100 C410 100 410 100 500 100 S590 100 750 100 C900 100 900 340 750 340 S590 340 500 340 S410 340 250 340 C100 340 100 580 250 580 S590 580 750 580" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="18 17" strokeLinecap="round" />
          </svg>
          {STEPS.map(({ title, text, Icon, tone, href, position, side }, i) => (
            <Link key={title} href={href} className={`journey-step journey-${tone} journey-${side} ${position} relative z-10 group flex min-h-[150px] items-center gap-4 rounded-[1.45rem] border border-white px-4 py-5 shadow-[0_10px_24px_rgba(23,48,43,0.11)] transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 sm:px-5`}>
              <span className="journey-number">{String(i + 1).padStart(2, '0')}</span>
              <span className="journey-icon"><Icon aria-hidden="true" /></span>
              <span className="min-w-0">
                <span className="block font-heading text-lg font-bold leading-tight sm:text-xl">{title}</span>
                <span className="mt-2 block text-xs leading-snug text-gray-700 sm:text-sm">{text}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold opacity-80">Learn more <FaArrowRight aria-hidden="true" /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .journey-step { background:#f0faf7; color:#075544; }
        .journey-red { background:#fff0f2; color:#a20d28; }
        .journey-gold { background:#fff7e9; color:#aa6b00; }
        .journey-number { position:absolute; top:-12px; left:12px; z-index:2; display:flex; align-items:center; justify-content:center; width:38px;height:38px;border:4px solid white;border-radius:50%;background:#075544;color:white;font-weight:800;box-shadow:0 4px 10px #0002; }
        .journey-red .journey-number { background:#a20d28; } .journey-gold .journey-number { background:#bf7b00; }
        .journey-icon { display:flex; flex:0 0 auto;align-items:center;justify-content:center;width:62px;height:62px;border:4px solid white;border-radius:50%;background:#075544;color:white;font-size:24px;box-shadow:0 5px 14px #0002; }
        .journey-red .journey-icon { background:#a20d28; } .journey-gold .journey-icon { background:#bf7b00; }
        @media (min-width:640px) and (max-width:1023px) { .journey-track { margin-left:18px; padding-left:18px; } .journey-track::before { content:'';position:absolute;left:0;top:22px;bottom:22px;border-left:4px dashed #075544; } .journey-step { min-height:140px; } }
        @media (min-width:1024px) { .journey-step { min-height:150px; } .journey-left .journey-number { left:auto;right:-12px; } .journey-right .journey-number { left:-12px; } }
        @media (max-width:639px) { .journey-track { margin-left:14px;padding-left:18px; } .journey-track::before { content:'';position:absolute;left:0;top:20px;bottom:20px;border-left:4px dashed #075544; } .journey-step { min-height:122px; } .journey-number { left:-16px; top:8px; } .journey-icon { width:54px;height:54px;font-size:21px; } }
        @media (prefers-reduced-motion: reduce) { .journey-step { transition:none; } }
      `}</style>
    </section>
  );
}
