import { FaMapMarkerAlt } from 'react-icons/fa';
import { TN_DISTRICTS } from '@/data/siteConfig';
import Marquee from './Marquee';

// Display-only strip: /colleges has no district filter (no query handling in src/pages/colleges.js),
// so district chips are deliberately not links.
export default function DistrictExplorer() {
  return (
    <section aria-labelledby="district-heading" className="border-y border-gray-200 bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="district-heading" className="font-heading text-2xl font-bold text-gray-900">
              Tamil Nadu District Explorer
            </h2>
            <p className="text-sm text-gray-600">
              The {TN_DISTRICTS.length} districts of Tamil Nadu. Scroll or swipe to browse.
            </p>
          </div>
        </div>
        <Marquee label="Tamil Nadu districts" speed={0.4}>
          {TN_DISTRICTS.map((name) => (
            <span
              key={name}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-brand-50/50 px-4 py-2 text-sm font-medium text-gray-800"
            >
              <FaMapMarkerAlt className="text-brand-600" aria-hidden="true" />
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
