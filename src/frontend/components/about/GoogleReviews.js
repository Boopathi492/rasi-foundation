import { FaGoogle, FaStar, FaRegStar, FaExternalLinkAlt } from 'react-icons/fa';
import Reveal from '../home/Reveal';
import { GOOGLE_REVIEWS } from '@/data/siteConfig';

function Stars({ value, className = '' }) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className={`inline-flex gap-0.5 text-gold-400 ${className}`}>
      {[1, 2, 3, 4, 5].map((n) => (value >= n - 0.25 ? <FaStar key={n} aria-hidden="true" /> : <FaRegStar key={n} aria-hidden="true" />))}
    </span>
  );
}

// Renders ONLY when GOOGLE_REVIEWS in siteConfig.js is enabled and holds a real rating and review count.
// Otherwise nothing is shown: no rating, count or review is ever invented.
export default function GoogleReviews({ config = GOOGLE_REVIEWS }) {
  const { enabled, rating, reviewCount, profileUrl, writeReviewUrl, lastVerified, reviews = [] } = config;
  const valid = enabled && typeof rating === 'number' && rating > 0 && rating <= 5 && Number(reviewCount) > 0 && Boolean(profileUrl);
  if (!valid) return null;

  const link = 'inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2';
  return (
    <section aria-labelledby="google-heading" className="bg-[#fbfaf6] py-14 md:py-16">
      <div className="container mx-auto">
        <Reveal className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
            <div className="flex flex-col items-center">
              <FaGoogle aria-hidden="true" className="text-3xl text-forest" />
              <p className="mt-2 font-heading text-5xl font-bold text-gray-900">{rating.toFixed(1)}</p>
              <Stars value={rating} className="mt-1 text-lg" />
              <p className="mt-1 text-xs text-gray-600">{Number(reviewCount).toLocaleString('en-IN')} Google reviews</p>
            </div>
            <div className="flex-1">
              <h2 id="google-heading" className="font-heading text-2xl font-bold text-gray-900">Rated on Google</h2>
              <p className="mt-1 text-sm text-gray-600">
                Rating and reviews as shown on our Google Business Profile{lastVerified ? `, last checked ${lastVerified}` : ''}.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={`${link} bg-forest text-white hover:bg-forest-dark`}>
                  Read reviews on Google <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
                </a>
                {writeReviewUrl && (
                  <a href={writeReviewUrl} target="_blank" rel="noopener noreferrer" className={`${link} border border-forest/40 text-forest hover:bg-forest/5`}>
                    Write a review
                  </a>
                )}
              </div>
            </div>
          </div>
          {reviews.length > 0 && (
            <ul className="mt-6 grid gap-4 border-t border-gray-100 pt-6 md:grid-cols-2">
              {reviews.map((r, i) => (
                <li key={`${r.author}-${i}`} className="rounded-2xl bg-[#f7fbf9] p-4 text-sm text-gray-700">
                  <Stars value={Number(r.rating) || 0} />
                  <p className="mt-2">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-2 text-xs font-semibold text-gray-900">{r.author}{r.date ? <span className="font-normal text-gray-500"> · {r.date}</span> : null}</p>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
