import Layout from '@/frontend/components/Layout';
import Link from 'next/link';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

export default function Custom404() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has been moved."
      noIndex={true}
    >
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Text */}
            <div className="relative mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold text-gray-100 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FaSearch className="text-5xl text-red-500 mx-auto mb-2" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
                <FaHome /> Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                <FaArrowLeft /> Go Back
              </button>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4">Maybe you were looking for:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Courses', path: '/courses' },
                  { name: 'About Us', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Questions', path: '/questions' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
