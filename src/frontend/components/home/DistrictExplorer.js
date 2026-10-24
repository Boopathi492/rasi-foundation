import { FaMapMarkerAlt } from 'react-icons/fa';
import { TN_DISTRICTS } from '@/data/siteConfig';
import Marquee from './Marquee';

// Display-only: the college directory has no district filter, so these stay non-clickable.
export default function DistrictExplorer() {
  return (
    <section aria-label="Tamil Nadu districts" className="border-y border-rose-100 bg-[#fff7f6] py-3 md:py-4">
      <div className="container mx-auto flex flex-col gap-3 px-4 sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-3 rounded-full bg-rasi-700 px-4 py-2.5 text-white shadow-sm sm:max-w-[205px]">
          <FaMapMarkerAlt className="shrink-0 text-xl" aria-hidden="true" />
          <span className="text-xs font-bold leading-tight">Explore Tamil Nadu Districts</span>
        </div>
        <div className="min-w-0 flex-1">
          <Marquee label={`All ${TN_DISTRICTS.length} districts of Tamil Nadu`} speed={0.8} arrows className="w-full">
            {TN_DISTRICTS.map((name) => (
              <span key={name} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-100 bg-white px-3.5 py-2 text-xs font-semibold text-gray-800 shadow-sm">
                <FaMapMarkerAlt className="text-rasi-700" aria-hidden="true" />{name}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
