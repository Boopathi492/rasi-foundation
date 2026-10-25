import { FaMapMarkerAlt } from 'react-icons/fa';
import { TN_DISTRICTS } from '@/data/siteConfig';
import Marquee from './Marquee';

// Display-only: the college directory has no district filter, so these stay non-clickable.
// The strip auto-scrolls continuously (no previous/next controls); Marquee pauses on hover/focus/touch and when
// off-screen, supports touch swipe, and does not auto-move under prefers-reduced-motion.
export default function DistrictExplorer() {
  return (
    <section
      aria-label="Tamil Nadu districts"
      className="relative overflow-hidden border-b border-gray-200 bg-white py-3.5 md:py-4"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-3 sm:px-5 md:flex-row md:items-center md:gap-5 lg:px-8">
        <div className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-lg bg-forest px-3.5 py-2 text-white shadow-sm md:self-auto">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/15 text-gold-300">
            <FaMapMarkerAlt className="text-xs" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-[13px] font-semibold tracking-wide">Tamil Nadu Districts</span>
            <span className="block whitespace-nowrap text-[10.5px] font-medium text-white/80">
              {TN_DISTRICTS.length} districts we serve
            </span>
          </span>
        </div>

        <div
          className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_24px,#000_calc(100%-24px),transparent)]"
        >
          <Marquee label={`All ${TN_DISTRICTS.length} districts of Tamil Nadu`} speed={0.65} className="w-full py-1">
            {TN_DISTRICTS.map((name, idx) => (
              <span
                key={name}
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-gray-200 bg-[#f8faf9] px-3.5 py-1.5 text-[13px] font-medium text-gray-800 transition-colors duration-150 hover:border-forest/35 hover:bg-white hover:text-forest"
              >
                <FaMapMarkerAlt
                  className={`text-[11px] ${idx % 2 === 0 ? 'text-crimson' : 'text-forest'}`}
                  aria-hidden="true"
                />
                <span>{name}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
