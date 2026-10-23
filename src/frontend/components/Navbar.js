import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaPhone, FaEnvelope, FaBars, FaTimes, FaGraduationCap, FaChevronRight } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Scholarship', path: '/scholarship-test' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Payment', path: '/payment' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <>
      {/* Restored Original Color Theme Top Bar */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-green-700 text-white py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] relative z-[60]">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4 md:gap-8">
            <a href="tel:+919789446100" className="flex items-center gap-2 hover:text-amber-300 transition-colors group">
              <FaPhone className="text-white group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">+91 97 89 44 61 00</span>
              <span className="sm:hidden">9789446100</span>
            </a>
            <a href="mailto:rasipuramrasifoundation@gmail.com" className="hidden lg:flex items-center gap-2 hover:text-amber-300 transition-colors group">
              <FaEnvelope className="text-white group-hover:scale-110 transition-transform" />
              <span>RASIFOUNDATION@GMAIL.COM</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden xl:inline text-white/90 italic font-medium tracking-normal normal-case">&quot;Empowering minds! Igniting future!&quot;</span>
            <Link href="/contact" className="hover:text-amber-300 transition-colors border-l border-white/20 pl-4 ml-2">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
        : 'bg-white shadow-sm py-4'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center group relative z-[60]">
              <div className="relative h-12 md:h-16 lg:h-20 w-auto">
                <Image
                  src="/logo.png"
                  alt="RASI FOUNDATION"
                  width={400}
                  height={100}
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-102"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation - Original Color Theme Integration */}
            <div className="hidden md:flex items-center justify-center flex-1 gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-1 lg:px-2 xl:px-3 py-2 text-[10px] lg:text-[11px] xl:text-[12px] font-bold uppercase tracking-wider transition-all duration-300 rounded-lg group whitespace-nowrap ${isActive(link.path)
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 lg:gap-3 relative z-[60] ml-2 flex-shrink-0">
              <Link
                href="/contact"
                className="hidden lg:flex items-center gap-2 bg-green-600 text-white px-3 lg:px-6 py-2.5 lg:py-3 rounded-xl text-[9px] lg:text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-600/20 hover:bg-green-700 hover:-translate-y-0.5 transition-all whitespace-nowrap"
              >
                <FaGraduationCap className="text-sm" />
                Find Your Course
              </Link>

              {/* Mobile Menu Icon */}
              <button
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-[-1] bg-black/40 backdrop-blur-sm transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setIsOpen(false)}
        ></div>

        <div className={`absolute top-full left-0 w-full bg-white md:hidden border-t border-gray-100 transition-all duration-500 ease-in-out origin-top shadow-2xl ${isOpen ? 'scale-y-100 opacity-100 pointer-events-auto' : 'scale-y-0 opacity-0 pointer-events-none'
          }`}>
          <div className="container mx-auto px-6 py-8">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center justify-between py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isActive(link.path)
                    ? 'bg-green-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <FaChevronRight className={`text-[10px] ${isActive(link.path) ? 'text-white/60' : 'text-gray-300'}`} />
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-red-600/20"
                onClick={() => setIsOpen(false)}
              >
                <FaGraduationCap className="text-lg" />
                Contact Us Now
              </Link>
            </div>
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;
