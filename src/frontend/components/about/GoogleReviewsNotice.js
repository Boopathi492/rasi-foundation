import Link from 'next/link';
import { FaGoogle, FaInfoCircle, FaStar, FaExternalLinkAlt, FaRegCommentDots } from 'react-icons/fa';
import Reveal from '@/frontend/components/home/Reveal';
import { CONTACT } from '@/data/siteConfig';

export default function GoogleReviewsNotice() {
  return (
    <section aria-labelledby="google-reviews-heading" className="bg-white py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="overflow-hidden rounded-3xl border border-gray-200/90 bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 shadow-sm sm:p-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 text-xs font-bold text-gray-700 shadow-sm">
                <FaGoogle className="text-red-500" />
                <span>Google Business Profile & Reviews</span>
              </div>
              <h3 id="google-reviews-heading" className="mt-3 font-heading text-2xl font-bold text-gray-900">
                Official Google Ratings & Verified Testimonials
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
                In adherence to our strict transparency policy, we do not fabricate star ratings or place synthetic Google reviews.
                Live Google Business reviews will appear here once official Google API authentication is linked to our domain.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <FaInfoCircle className="text-forest shrink-0" />
                <span>Have you attended a counselling session at our Rasipuram office? Your direct feedback helps us continuously improve.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row lg:justify-end">
              <Link
                href="/feedback"
                className="rf-btn-primary !rounded-full px-6 py-3 text-xs sm:text-sm"
              >
                <FaRegCommentDots />
                <span>Submit Student Feedback</span>
              </Link>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent('Rasi Foundation Career Guidance Rasipuram')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rf-btn-outline !rounded-full px-6 py-3 text-xs sm:text-sm"
              >
                <span>Search on Google</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
