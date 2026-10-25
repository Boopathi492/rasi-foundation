import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import FeedbackForm from '@/frontend/components/feedback/FeedbackForm';

export default function FeedbackPage() {
  return (
    <Layout
      title="Share Your Feedback — Rasi Foundation"
      description="Help us maintain exceptional guidance standards by sharing your experience as a student or parent with Rasi Foundation."
    >
      <div className="bg-gradient-to-b from-[#fbf8f3] via-white to-[#f5f9f7] py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-forest transition-colors hover:text-crimson"
          >
            <FaArrowLeft className="text-[10px]" /> Back to Home
          </Link>

          <div className="mt-4 text-center sm:text-left">
            <p className="rf-eyebrow">
              <span className="h-2 w-2 rounded-full bg-crimson" />
              Community Voice
            </p>
            <h1 className="mt-2 font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              Student &amp; Parent <span className="text-crimson">Feedback</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              Your genuine thoughts help future students make informed choices and inspire our counselling advisors.
              All submissions are moderated before publishing to safeguard student privacy.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200/90 bg-white p-6 shadow-[0_16px_40px_rgba(7,85,68,0.08)] sm:p-10">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
