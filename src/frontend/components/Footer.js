import Link from 'next/link';
import Image from 'next/image';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';
import { SOCIAL } from '@/data/siteConfig';

// Social icons render only for URLs configured in siteConfig (none are set yet).
const SOCIAL_LINKS = [
  { key: 'facebook', label: 'Facebook', Icon: FaFacebook },
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
].filter((l) => SOCIAL[l.key]);

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Scholarships', path: '/scholarship-test' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Book Counselling', path: '/book-counselling' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const courses = [
    'MBBS / AYUSH / BDS',
    'Engineering / Architecture',
    'MBA / MCA / B.Com',
    'B.Ed / M.Ed / D.T.Ed',
    'Law (BL / LLB)',
    'Arts & Science',
  ];

  return (
    <footer className="bg-brand-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Rasi Foundation home">
              <Image
                src="/rasi-logo.png"
                alt="Rasi Foundation logo"
                width={72}
                height={72}
                className="h-16 w-16 rounded-full bg-white object-contain p-0.5"
              />
              <span className="leading-tight">
                <span className="block font-heading text-xl font-bold tracking-[0.08em]">RASI FOUNDATION</span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60">Think Admission! Think RASI!!</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students with the right career guidance and helping them achieve their dreams
              through quality education consultancy services.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="flex gap-4" aria-label="Social media">
                {SOCIAL_LINKS.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={SOCIAL[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Icon aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gold-400 -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-xs text-gold-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Our Courses
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gold-400 -mb-2"></span>
            </h4>
            <ul className="space-y-3">
              {courses.map((course, index) => (
                <li key={index}>
                  <Link
                    href="/courses"
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaArrowRight className="text-xs text-gold-300" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-gold-500 -mb-2"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="text-gold-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Founder:</p>
                    <a href="tel:+919789446100" className="text-white hover:text-gold-300 font-semibold">
                      +91 97 89 44 61 00
                    </a>
                    <p className="text-gray-500 text-sm">Prof. P. Gunasekaran</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaPhone className="text-gold-300" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Admin Director:</p>
                    <a href="tel:+919294969196" className="text-white hover:text-gold-300 font-semibold">
                      +91 92 94 96 91 96
                    </a>
                    <p className="text-gray-500 text-sm">P. Yuvaraj Kumar</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gold-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaEnvelope className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email:</p>
                    <a href="mailto:rasipuramrasifoundation@gmail.com" className="text-white hover:text-gold-400 text-sm break-all">
                      rasipuramrasifoundation@gmail.com
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Address:</p>
                    <a
                      href="https://www.google.com/maps/place/11%C2%B024'06.6%22N+78%C2%B009'34.6%22E/@11.4018417,78.1570241,17z/data=!3m1!4b1!4m4!3m3!8m2!3d11.4018417!4d78.159599"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 text-sm"
                    >
                      Rasipuram, Tamil Nadu<br />
                      <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Open in Maps</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Rasi Foundation. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm italic">
              &quot;Empowering minds! Igniting future!&quot;
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
