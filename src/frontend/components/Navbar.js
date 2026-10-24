import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaBars, FaTimes,
  FaCalendarCheck, FaRegCommentDots, FaArrowRight, FaSearch,
} from 'react-icons/fa';
import { CONTACT, NAV_LINKS, ROUTES, LABELS } from '@/data/siteConfig';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2';
const barFocus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-brand-900 rounded';

function CtaButtons({ onNavigate, stacked = false }) {
  const size = 'whitespace-nowrap text-[12px] px-2.5';
  return (
    <div className={stacked ? 'grid gap-3 sm:grid-cols-3' : 'flex items-center gap-2'}>
      <Link href={ROUTES.enquiry} onClick={onNavigate} className={`rf-btn-outline ${size}`}>
        <FaRegCommentDots aria-hidden="true" /> Enquiry
      </Link>
      <Link href={ROUTES.counselling} onClick={onNavigate} className={`rf-btn-primary ${size}`}>
        <FaCalendarCheck aria-hidden="true" /> Book Counselling
      </Link>
      <Link href={ROUTES.secureSeat} onClick={onNavigate} className={`rf-btn-gold ${size}`}>
        {LABELS.secureSeat} <FaArrowRight className="text-xs" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Brand({ compact = false }) {
  return (
    <Link href="/" className={`flex items-center gap-3 rounded-lg ${focusRing}`} aria-label="Rasi Foundation home">
      <Image
        src="/rasi-logo.png"
        alt="Rasi Foundation logo"
        width={72}
        height={72}
        priority
        className={compact ? 'h-11 w-11 object-contain' : 'h-14 w-14 object-contain lg:h-16 lg:w-16'}
      />
      <span className="leading-tight">
        <span className={`block font-heading font-bold tracking-[0.08em] text-rasi-700 ${compact ? 'text-lg' : 'text-xl lg:text-2xl'}`}>
          RASI FOUNDATION
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500 ${compact ? 'hidden sm:block' : ''}`}>
          Think Admission! Think RASI!!
        </span>
      </span>
    </Link>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu after navigation
  useEffect(() => {
    const close = () => setIsOpen(false);
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  // Escape closes the menu; body scroll is locked while open
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menuRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const isActive = (path) =>
    path === '/' ? router.pathname === '/' : router.pathname === path || router.pathname.startsWith(`${path}/`);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-800"
      >
        Skip to main content
      </a>

      <div className="rasi-header-shell relative z-50 mx-auto w-full overflow-visible">
      {/* Contact ribbon */}
      <div className="rasi-contact-bar bg-brand-900 text-white/90">
        <div className="container mx-auto flex min-h-10 flex-wrap items-center justify-between gap-x-5 gap-y-1 px-4 py-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href={`tel:${CONTACT.phoneTel}`} className={`flex items-center gap-2 hover:text-white ${barFocus}`}>
              <FaPhoneAlt className="text-[11px]" aria-hidden="true" />
              <span>{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 hover:text-white ${barFocus}`}
            >
              <FaWhatsapp aria-hidden="true" />
              <span>{CONTACT.phoneDisplay}<span className="sr-only"> WhatsApp (opens in a new tab)</span></span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className={`hidden items-center gap-2 hover:text-white sm:flex ${barFocus}`}>
              <FaEnvelope className="text-[11px]" aria-hidden="true" />
              <span>{CONTACT.email}</span>
            </a>
          </div>
          <p className="hidden items-center gap-2 font-medium text-white/90 lg:flex"><FaMapMarkerAlt className="text-gold-300" aria-hidden="true" /> College Admissions <span className="text-white/40">|</span> Career Guidance <span className="text-white/40">|</span> Scholarship Support</p>
        </div>
      </div>

      <header className={`rasi-nav relative border-b border-brand-100 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
        <nav aria-label="Main" className="container mx-auto flex min-h-[76px] items-center justify-between gap-4 px-4 py-2 lg:min-h-[88px]">
          <div className="shrink-0"><Brand compact /></div>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.filter((link) => link.path !== '/announcements').map((link) => {
              const active = isActive(link.path);
              return (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block whitespace-nowrap rounded-md px-2 py-2.5 text-xs font-semibold transition-colors ${focusRing} ${
                      active ? 'text-brand-700' : 'text-gray-700 hover:bg-brand-50 hover:text-brand-700'
                    }`}
                  >
                    {link.name === 'About' ? 'About Us' : link.name}
                    {active && <span className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-brand-700" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-1 xl:flex">
            <button type="button" aria-label={searchOpen ? 'Close site search' : 'Open site search'} onClick={() => setSearchOpen((v) => !v)} className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-brand-900 hover:bg-brand-50 ${focusRing}`}><FaSearch aria-hidden="true" /></button>
            <CtaButtons />
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button type="button" aria-label={searchOpen ? 'Close site search' : 'Open site search'} onClick={() => setSearchOpen((v) => !v)} className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-brand-900 hover:bg-brand-50 ${focusRing}`}><FaSearch aria-hidden="true" /></button>
              <Link
              href={ROUTES.counselling}
              className={`hidden items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-800 sm:inline-flex ${focusRing}`}
            >
              <FaCalendarCheck aria-hidden="true" /> Book Counselling
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-800 ${focusRing}`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {searchOpen && <div className="container mx-auto px-4 pb-3">
          <label className="sr-only" htmlFor="site-search">Search pages</label>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2"><FaSearch className="text-brand-700" aria-hidden="true" /><input id="site-search" autoFocus value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search courses, colleges, scholarships…" className="w-full bg-transparent py-1 text-sm outline-none" /></div>
          {searchText.trim() && <ul className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">{NAV_LINKS.filter((item) => item.name.toLowerCase().includes(searchText.trim().toLowerCase()) || (item.name === 'About' && 'about us'.includes(searchText.trim().toLowerCase()))).map((item) => <li key={item.path}><Link href={item.path} onClick={() => { setSearchOpen(false); setSearchText(''); }} className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-800 hover:bg-brand-50">{item.name === 'About' ? 'About Us' : item.name}</Link></li>)}</ul>}
        </div>}

        {/* Mobile / tablet menu */}
        {isOpen && (
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 -z-10 h-screen w-full cursor-default bg-black/40 xl:hidden"
              onClick={closeMenu}
            />
            <div
              id="mobile-menu"
              ref={menuRef}
              className="absolute inset-x-0 top-full max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-gray-200 bg-white shadow-xl xl:hidden"
            >
              <ul className="container mx-auto grid gap-1 px-4 py-4 sm:grid-cols-2">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center rounded-lg border-l-4 px-4 py-3 text-base font-semibold ${focusRing} ${
                          active ? 'border-brand-700 bg-brand-50 text-brand-800' : 'border-transparent text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {link.name === 'About' ? 'About Us' : link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="container mx-auto border-t border-gray-100 px-4 py-4">
                <CtaButtons onNavigate={closeMenu} stacked />
              </div>
            </div>
          </>
        )}
      </header>
      </div>
      <style jsx>{`
        .rasi-contact-bar{background-image:linear-gradient(90deg,#9f0c29 0 1.2%,#075544 1.2% 98.8%,#9f0c29 98.8%)}
        .rasi-nav:before,.rasi-nav:after{content:'';position:absolute;bottom:0;height:6px;pointer-events:none}
        .rasi-nav:before{left:0;width:24%;background:#075544;clip-path:polygon(0 0,100% 0,96% 100%,0 100%)}
        .rasi-nav:after{right:0;width:16%;background:#9f0c29;clip-path:polygon(4% 0,100% 0,100% 100%,0 100%)}
        .rasi-nav nav{position:relative;z-index:1}
      `}</style>
    </>
  );
};

export default Navbar;
