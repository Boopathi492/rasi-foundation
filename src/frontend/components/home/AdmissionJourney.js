import Link from 'next/link';
import {
  FaBookOpen, FaFileAlt, FaComments, FaCreditCard, FaFolderOpen,
  FaUniversity, FaUserFriends, FaGraduationCap, FaArrowRight,
} from 'react-icons/fa';
import Reveal from './Reveal';

// Desktop composition lives on a 1000 x 860 grid. `icon` is the badge centre on the road; `card` is the
// card rectangle. Cards sit in the gaps between road rows, never on the road itself.
const STEPS = [
  { title: 'Explore Programs', text: 'Browse through our courses and colleges to find the right fit for your future.', Icon: FaBookOpen, tone: 'red', href: '/courses', icon: [230, 170], card: [50, 4, 360, 130] },
  { title: 'Fill the Form', text: 'Complete the enquiry or application details to get started.', Icon: FaFileAlt, tone: 'green', href: '/contact', icon: [690, 170], card: [500, 228, 350, 140] },
  { title: 'Attend Counselling', text: 'Get guidance from our experts about course options, college selection, eligibility and more.', Icon: FaComments, tone: 'gold', href: '/book-counselling', icon: [690, 430], card: [500, 488, 350, 140] },
  { title: 'Make the Payment', text: 'Pay the required fee, where applicable, through our secure online payment system.', Icon: FaCreditCard, tone: 'red', href: '/biodata', icon: [310, 430], card: [140, 228, 350, 140] },
  { title: 'Upload Documents', text: 'Submit the academic and identification documents needed for verification.', Icon: FaFolderOpen, tone: 'green', href: '/biodata', icon: [310, 690], card: [190, 488, 300, 140] },
  { title: 'Admission Guidance', text: 'Get help with your next steps and confirmation from the relevant institution.', Icon: FaUniversity, tone: 'gold', href: '/colleges', icon: [690, 690], card: [500, 722, 360, 134] },
];

const ROAD = 'M30 170 H830 A130 130 0 0 1 830 430 H170 A130 130 0 0 0 170 690 H970';
const W = 1000;
const H = 860;
const pct = (v, total) => `${(v / total) * 100}%`;

function StepCopy({ step, i }) {
  return (
    <>
      <span className="journey-title">{step.title}</span>
      <span className="journey-text">{step.text}</span>
      <span className="journey-more">Learn more <FaArrowRight aria-hidden="true" /></span>
    </>
  );
}

export default function AdmissionJourney() {
  return (
    <section aria-labelledby="journey-heading" className="journey-section overflow-hidden bg-[#fffdfb] py-12 md:py-16">
      <div className="container mx-auto grid items-center gap-10 xl:grid-cols-[0.62fr_1.6fr] xl:gap-8">
        <Reveal className="journey-intro">
          <p className="rf-eyebrow">Rasi Foundation</p>
          <h2 id="journey-heading" className="mt-3 max-w-md font-heading text-4xl font-bold leading-[1.04] text-brand-900 md:text-5xl">
            Your <span className="text-rasi-700">Admission</span> Journey
          </h2>
          <p className="mt-4 font-heading text-lg text-gray-700">From Enquiry to a Brighter Future</p>
          <span aria-hidden="true" className="mt-5 block h-1 w-20 rounded-full bg-rasi-700" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
            A simple and transparent process to help you choose the right course, get expert guidance and take your next admission steps with ease.
          </p>
          <div className="mt-6 flex max-w-md flex-wrap gap-x-6 gap-y-3">
            {[[FaUserFriends, 'Expert Guidance'], [FaGraduationCap, 'Trusted Colleges'], [FaComments, 'End-to-End Support']].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-base text-brand-700"><Icon aria-hidden="true" /></span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <Link href="/book-counselling" className="rf-btn-primary mt-7 !rounded-full px-6 py-3 !bg-rasi-700 hover:!bg-rasi-800">
            Start Your Admission Journey <FaArrowRight aria-hidden="true" />
          </Link>
        </Reveal>

        {/* Desktop: winding road */}
        <Reveal className="journey-stage hidden lg:block">
          <div className="journey-canvas relative mx-auto w-full" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`}>
              <path d={ROAD} fill="none" stroke="#06402f" strokeWidth="64" strokeLinecap="round" />
              <path d={ROAD} fill="none" stroke="#0a5a43" strokeWidth="56" strokeLinecap="round" />
              <path d={ROAD} fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeDasharray="16 14" strokeLinecap="round" />
            </svg>
            {STEPS.map((step, i) => {
              const { Icon, icon, card, tone } = step;
              return (
                <div key={step.title}>
                  <span
                    aria-hidden="true"
                    className={`journey-badge journey-${tone}`}
                    style={{ left: pct(icon[0], W), top: pct(icon[1], H) }}
                  >
                    <Icon />
                    <span className="journey-num">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <Link
                    href={step.href}
                    className={`journey-card journey-${tone} group`}
                    style={{ left: pct(card[0], W), top: pct(card[1], H), width: pct(card[2], W), height: pct(card[3], H) }}
                  >
                    <StepCopy step={step} i={i} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Below lg: clean vertical timeline */}
        <ol className="journey-list relative lg:hidden">
          {STEPS.map((step, i) => {
            const { Icon, tone } = step;
            return (
              <li key={step.title} className="relative pb-5 pl-16 last:pb-0 sm:pl-20">
                <span aria-hidden="true" className={`journey-badge journey-badge-static journey-${tone}`}>
                  <Icon />
                  <span className="journey-num">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <Link href={step.href} className={`journey-card journey-card-static journey-${tone}`}>
                  <StepCopy step={step} i={i} />
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
      <style jsx global>{`
        .journey-canvas { container-type: inline-size; }
        .journey-card {
          position: absolute; display: flex; flex-direction: column; justify-content: center; gap: .25em;
          padding: 0 4cqw 0 4.4cqw; overflow: hidden;
          border: 1px solid #fff; border-radius: 2.2cqw; background: #fff;
          box-shadow: 0 10px 24px rgba(23, 48, 43, .12);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .journey-card:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(23, 48, 43, .18); }
        .journey-card:focus-visible { outline: 2px solid #075544; outline-offset: 2px; }
        .journey-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: clamp(14px, 2.3cqw, 21px); line-height: 1.15; }
        .journey-text { color: #4b5563; font-size: clamp(11.5px, 1.6cqw, 15px); line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .journey-more { display: none; }
        .journey-green .journey-title { color: #075544; } .journey-green.journey-card { background: #f4fbf8; }
        .journey-red .journey-title { color: #a20d28; } .journey-red.journey-card { background: #fff6f7; }
        .journey-gold .journey-title { color: #a86300; } .journey-gold.journey-card { background: #fffaf0; }
        .journey-badge {
          position: absolute; z-index: 2; display: flex; align-items: center; justify-content: center;
          width: 8.4cqw; height: 8.4cqw; transform: translate(-50%, -50%);
          border: .6cqw solid #fff; border-radius: 50%; color: #fff; font-size: 3.2cqw;
          box-shadow: 0 6px 16px rgba(0, 0, 0, .25);
        }
        .journey-badge.journey-green { background: #075544; }
        .journey-badge.journey-red { background: #a20d28; }
        .journey-badge.journey-gold { background: #c98400; }
        .journey-num {
          position: absolute; top: -.6cqw; left: -1.2cqw; display: flex; align-items: center; justify-content: center;
          width: 3.6cqw; height: 3.6cqw; border: .3cqw solid #fff; border-radius: 50%;
          background: inherit; font-size: 1.35cqw; font-weight: 800; line-height: 1;
        }
        .journey-list::before { content: ''; position: absolute; left: 24px; top: 24px; bottom: 24px; border-left: 4px dashed #0a5a43; opacity: .55; }
        @media (min-width: 640px) { .journey-list::before { left: 30px; } }
        .journey-badge-static { left: 0; top: 0; transform: none; width: 50px; height: 50px; font-size: 20px; border-width: 3px; }
        @media (min-width: 640px) { .journey-badge-static { width: 60px; height: 60px; font-size: 24px; } }
        .journey-badge-static .journey-num { width: 22px; height: 22px; font-size: 10px; top: -6px; left: -8px; border-width: 2px; }
        .journey-card-static { position: static; padding: 14px 16px; gap: 4px; border-radius: 16px; }
        .journey-card-static .journey-title { font-size: 18px; }
        .journey-card-static .journey-text { font-size: 14px; -webkit-line-clamp: unset; display: block; }
        @media (prefers-reduced-motion: reduce) { .journey-card { transition: none; } .journey-card:hover { transform: none; } }
      `}</style>
    </section>
  );
}
