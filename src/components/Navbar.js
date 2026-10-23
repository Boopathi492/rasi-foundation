import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaPhone, FaEnvelope, FaBars, FaTimes, FaGraduationCap } from 'react-icons/fa';

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
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'COURSES', path: '/courses' },
    { name: 'COLLEGES', path: '/colleges' },
    { name: 'SCHOLARSHIP', path: '/scholarship-test' },
    { name: 'ACHIEVEMENTS', path: '/achievements' },
    { name: 'UPDATES', path: '/announcements' },
    { name: 'PAYMENT', path: '/payment' },
  ];

  const isActive = (path) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Red Accent Line at the very top */}
      <div className="h-1.5 bg-[#dc2626] w-full sticky top-0 z-[60]" />

      {/* Main Navbar */}
      <nav className={`sticky top-1.5 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white shadow-sm'
        }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-3">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="relative h-20 md:h-28 w-60 md:w-80">
                  <Image
                    src="/logo.png"
                    alt="RASI FOUNDATION"
                    fill
                    className="object-contain object-left"
                    priority
                    unoptimized
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-grow gap-x-1 xl:gap-x-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 xl:px-5 py-2.5 rounded-xl text-[13px] xl:text-[15px] font-bold tracking-wide transition-all duration-200 whitespace-nowrap ${isActive(link.path)
                    ? 'bg-[#10a345] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#10a345] hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/courses"
                className="bg-[#10a345] hover:bg-[#0e8f3c] text-white px-5 xl:px-8 py-3 rounded-2xl font-bold text-[13px] xl:text-[14px] flex items-center gap-2.5 shadow-md shadow-green-200/50 transition-all active:scale-95 group"
              >
                <FaGraduationCap className="text-lg xl:text-xl group-hover:rotate-12 transition-transform" />
                <span className="tracking-tight">FIND YOUR COURSE</span>
              </Link>

              {/* Mobile Menu Button (Tablet) */}
              <button
                className="lg:hidden text-2xl text-gray-700 hover:text-[#10a345] transition-colors p-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Mobile Menu Button (Mobile) */}
            <button
              className="md:hidden text-2xl text-gray-700 hover:text-[#10a345] transition-colors p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t' : 'max-h-0 opacity-0 pointer-events-none'}`}>
          <div className="container mx-auto px-4 py-6 bg-white space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block py-3.5 px-6 rounded-xl font-bold text-center transition-all ${isActive(link.path)
                  ? 'bg-[#10a345] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/courses"
                className="w-full bg-[#10a345] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100"
                onClick={() => setIsOpen(false)}
              >
                <FaGraduationCap className="text-xl" />
                FIND YOUR COURSE
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
