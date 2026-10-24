import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  FaPhoneAlt, FaEnvelope, FaWhatsapp, FaBars, FaTimes, FaHome, FaChevronDown,
  FaCalendarCheck, FaRegCommentDots, FaArrowRight, FaSearch,
  FaUniversity, FaUsers, FaShieldAlt, FaChartLine,
} from 'react-icons/fa';
import { CONTACT, ROUTES, LABELS } from '@/data/siteConfig';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2';
const barFocus =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-forest rounded';

// Top information links (existing routes)
const STRIP_LINKS = [
  [FaUniversity, 'College Admissions', '/colleges'],
  [FaUsers, 'Career Guidance', ROUTES.counselling],
  [FaShieldAlt, 'Scholarship Support', '/scholarship-test'],
  [FaChartLine, 'Brighter Futures', '/about'],
];

// Main navigation. `children` become a dropdown; every path is an existing page.
const NAV = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'About Us', path: '/about' },
  {
    name: 'Courses',
    path: '/courses',
    children: [
      { name: 'All Courses', path: '/courses' },
      { name: 'Practice Test', path: '/practice-test' },
    ],
  },
  {
    name: 'Colleges',
    path: '/colleges',
    children: [
      { name: 'College Directory', path: '/colleges' },
      { name: 'Announcements', path: '/announcements' },
    ],
  },
  { name: 'Scholarships', path: '/scholarship-test' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Announcements', path: '/announcements', wide: true },
  { name: 'Contact', path: '/contact' },
];

const SEARCHABLE = NAV.flatMap((item) => [item, ...(item.children || [])]).filter(
  (item, i, all) => all.findIndex((o) => o.path === item.path) === i
);

function CtaButtons({ onNavigate, stacked = false }) {
  const base = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0';
  const size = stacked ? 'px-5 py-3 text-sm' : 'h-9 px-3 text-[12.5px] min-[1700px]:px-4';
  return (
    <div className={stacked ? 'grid gap-3 sm:grid-cols-3' : 'flex items-center gap-1.5 min-[1700px]:gap-2'}>
      <Link href={ROUTES.enquiry} onClick={onNavigate} className={`${base} ${size} border-2 border-forest bg-white text-forest hover:bg-forest/5 ${focusRing}`}>
        <FaRegCommentDots className={stacked ? "" : "hidden min-[1700px]:inline"} aria-hidden="true" /> Enquiry
      </Link>
      <Link href={ROUTES.counselling} onClick={onNavigate} className={`${base} ${size} bg-forest text-white shadow-md hover:bg-forest-dark ${focusRing}`}>
        <FaCalendarCheck className={stacked ? "" : "hidden min-[1700px]:inline"} aria-hidden="true" /> Book Counselling
      </Link>
      <Link href={ROUTES.secureSeat} onClick={onNavigate} className={`${base} ${size} bg-crimson text-white shadow-md hover:bg-crimson-dark ${focusRing}`}>
        {LABELS.secureSeat} <FaArrowRight className="text-xs" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className={`flex min-w-0 shrink items-center gap-2 rounded-lg sm:gap-3 ${focusRing}`} aria-label="Rasi Foundation home">
      <Image
        src="/rasi-logo.png"
        alt="Rasi Foundation logo"
        width={160}
        height={160}
        priority
        className="h-11 w-11 shrink-0 rounded-full object-contain shadow-md sm:h-12 sm:w-12"
      />
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-[18px] font-bold uppercase tracking-[0.01em] sm:text-[22px]">
          <span className="text-crimson">Rasi</span> <span className="text-forest">Foundation</span>
        </span>
        <span className="mt-1 hidden items-center gap-1.5 whitespace-nowrap text-[10px] font-medium text-forest sm:flex">
          <span aria-hidden="true" className="h-px w-3 bg-forest/60" />
          Think Admission ! Think RASI !!
          <span aria-hidden="true" className="h-px w-3 bg-forest/60" />
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
  const [openMenu, setOpenMenu] = useState(null);
  const router = useRouter();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus after navigation
  useEffect(() => {
    const close = () => { setIsOpen(false); setOpenMenu(null); setSearchOpen(false); };
    router.events.on('routeChangeComplete', close);
    return () => router.events.off('routeChangeComplete', close);
  }, [router.events]);

  // Escape closes the mobile menu; body scroll is locked while open
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

  // Desktop dropdowns: Escape and outside click close them
  useEffect(() => {
    if (!openMenu) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        const trigger = navRef.current?.querySelector(`[data-menu="${openMenu}"]`);
        setOpenMenu(null);
        trigger?.focus();
      }
    };
    const onClick = (e) => { if (!navRef.current?.contains(e.target)) setOpenMenu(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [openMenu]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const isActive = (path) =>
    path === '/' ? router.pathname === '/' : router.pathname === path || router.pathname.startsWith(`${path}/`);

  const closeMenu = () => setIsOpen(false);
  const query = searchText.trim().toLowerCase();

  const hoverOpen = (name) => { window.clearTimeout(closeTimer.current); setOpenMenu(name); };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const searchButton = (
    <button
      type="button"
      aria-label={searchOpen ? 'Close site search' : 'Open site search'}
      aria-expanded={searchOpen}
      onClick={() => setSearchOpen((v) => !v)}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm text-forest shadow-[0_2px_10px_rgba(7,85,68,0.18)] transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white motion-reduce:hover:translate-y-0 ${focusRing}`}
    >
      <FaSearch aria-hidden="true" />
    </button>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-forest"
      >
        Skip to main content
      </a>

      <div className="relative z-50 w-full overflow-visible">
        {/* Row 1: contact strip with curved maroon edges */}
        <div className="relative overflow-hidden bg-forest text-white">
          <svg aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 h-full w-16 sm:w-20" viewBox="0 0 80 44" preserveAspectRatio="none">
            <path d="M0 0H20C30 16 48 34 76 44H0Z" fill="#b0102e" />
            <path d="M20 0C30 16 48 34 76 44" fill="none" stroke="#dfaa32" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="relative flex min-h-[34px] w-full items-center justify-between gap-x-5 py-1.5 pl-[72px] pr-4 text-[12.5px] sm:pl-20 lg:pr-6 min-[1680px]:pr-56">
            <div className="flex items-center">
              <a href={`tel:${CONTACT.phoneTel}`} className={`flex items-center gap-2 whitespace-nowrap hover:text-gold-300 ${barFocus}`}>
                <FaPhoneAlt className="text-[13px]" aria-hidden="true" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="mx-3 hidden h-4 w-px bg-white/35 min-[420px]:block min-[1700px]:mx-4" />
              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden items-center gap-2 whitespace-nowrap hover:text-gold-300 min-[420px]:flex ${barFocus}`}
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                <span>{CONTACT.phoneDisplay}<span className="sr-only"> WhatsApp (opens in a new tab)</span></span>
              </a>
              <span aria-hidden="true" className="mx-3 hidden h-4 w-px bg-white/35 md:block min-[1700px]:mx-4" />
              <a href={`mailto:${CONTACT.email}`} className={`hidden items-center gap-2 whitespace-nowrap hover:text-gold-300 md:flex ${barFocus}`}>
                <FaEnvelope className="text-base" aria-hidden="true" />
                <span>{CONTACT.email}</span>
              </a>
            </div>
            <ul className="hidden items-center font-medium min-[1366px]:flex">
              {STRIP_LINKS.map(([Icon, text, href], i) => (
                <li key={text} className="flex items-center">
                  {i > 0 && <span aria-hidden="true" className="mx-2.5 h-4 w-px bg-white/35 min-[1700px]:mx-3.5" />}
                  <Link href={href} className={`flex items-center gap-2 whitespace-nowrap hover:text-gold-300 ${barFocus}`}>
                    <Icon className="text-base text-gold-300" aria-hidden="true" />{text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-52 min-[1680px]:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 44" preserveAspectRatio="none">
              <path d="M0 0H240V44H112C70 40 26 22 0 0Z" fill="#b0102e" />
              <path d="M0 0C26 22 70 40 112 44" fill="none" stroke="#dfaa32" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="absolute inset-y-0 right-5 flex flex-col items-end justify-center font-script text-[15px] font-semibold italic leading-[13px] text-white">
              <span>Think Admission !</span>
              <span>Think RASI !!</span>
            </p>
          </div>
        </div>

        {/* Row 2: logo, navigation and actions */}
        <header className={`relative bg-white transition-shadow duration-300 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>
          {/* left maroon / green ribbon corner */}
          <svg aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 hidden h-full w-20 sm:block" viewBox="0 0 80 84" preserveAspectRatio="none">
            <path d="M0 4C16 24 32 56 58 84H0Z" fill="#075544" />
            <path d="M0 4C16 24 32 56 58 84" fill="none" stroke="#b0102e" strokeWidth="5" vectorEffect="non-scaling-stroke" />
            <path d="M0 10C14 28 30 58 52 84" fill="none" stroke="#dfaa32" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
          <nav ref={navRef} aria-label="Main" className="relative mx-auto flex min-h-[58px] w-full items-center justify-between gap-3 py-1.5 pl-4 pr-4 sm:pl-[72px] lg:pr-6 min-[1366px]:min-h-[62px] min-[1366px]:gap-2 min-[1700px]:pr-6">
            <div className="relative flex items-center self-stretch">
              <Brand />
              {/* curved maroon band closing the logo panel */}
              <svg aria-hidden="true" className="pointer-events-none ml-2 hidden h-[calc(100%+8px)] w-6 self-end min-[1366px]:block" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M100 0C74 8 54 78 0 100V92C46 74 62 14 100 0Z" fill="#b0102e" />
                <path d="M100 0C74 8 54 78 0 100" fill="none" stroke="#dfaa32" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>

            <ul className="hidden min-w-0 flex-1 items-center justify-center min-[1366px]:flex">
              {NAV.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.name;
                const linkClass = `rf-navlink relative flex items-center gap-1 whitespace-nowrap px-1 py-2 text-[13.5px] font-semibold min-[1700px]:px-2.5 ${focusRing} ${
                  active ? 'is-active text-crimson' : 'text-forest hover:text-crimson'
                } ${Icon ? 'flex-col !gap-0.5' : ''}`;
                return (
                  <li
                    key={item.path}
                    className={`relative ${item.wide ? "hidden min-[1700px]:block" : ""}`}
                    onMouseEnter={hasMenu ? () => hoverOpen(item.name) : undefined}
                    onMouseLeave={hasMenu ? hoverClose : undefined}
                  >
                    <div className="flex items-center">
                      <Link href={item.path} aria-current={active ? 'page' : undefined} className={`${linkClass} ${hasMenu ? '!pr-0.5 min-[1700px]:!pr-1' : ''}`}>
                        {Icon && <Icon className="text-base" aria-hidden="true" />}
                        {item.name}
                      </Link>
                      {hasMenu && (
                        <button
                          type="button"
                          data-menu={item.name}
                          aria-label={`${item.name} submenu`}
                          aria-haspopup="true"
                          aria-expanded={open}
                          onClick={() => setOpenMenu(open ? null : item.name)}
                          className={`flex h-8 w-6 items-center justify-center rounded text-[11px] ${active ? 'text-crimson' : 'text-forest'} hover:text-crimson ${focusRing}`}
                        >
                          <FaChevronDown aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    {hasMenu && (
                      <ul
                        className={`absolute left-0 top-full z-50 min-w-[200px] origin-top rounded-xl border border-gray-100 bg-white p-2 shadow-xl transition-all duration-200 motion-reduce:transition-none ${
                          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                        }`}
                      >
                        {item.children.map((child) => (
                          <li key={child.path}>
                            <Link
                              href={child.path}
                              tabIndex={open ? 0 : -1}
                              onClick={() => setOpenMenu(null)}
                              className={`block whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-forest hover:bg-forest/5 hover:text-crimson ${focusRing}`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden shrink-0 items-center gap-1.5 min-[1366px]:flex min-[1700px]:gap-3">
              <span aria-hidden="true" className="mr-1 hidden h-7 w-px bg-gold-300/70 min-[1700px]:block" />
              {searchButton}
              <CtaButtons />
            </div>

            <div className="flex items-center gap-2 min-[1366px]:hidden">
              {searchButton}
              <Link
                href={ROUTES.counselling}
                className={`hidden h-10 items-center gap-2 whitespace-nowrap rounded-full bg-forest px-4 text-[13px] font-semibold text-white hover:bg-forest-dark md:inline-flex ${focusRing}`}
              >
                <FaCalendarCheck aria-hidden="true" /> Book Counselling
              </Link>
              <button
                ref={menuButtonRef}
                type="button"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-forest text-forest ${focusRing}`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen((v) => !v)}
              >
                {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
              </button>
            </div>
          </nav>

          {/* bottom ribbon under the logo panel */}
          <span aria-hidden="true" className="rasi-ribbon pointer-events-none absolute bottom-0 left-0 hidden h-[5px] w-[44%] sm:block" />

          {searchOpen && (
            <div className="relative mx-auto w-full border-t border-gray-100 px-4 pb-3 pt-3 lg:px-6">
              <label className="sr-only" htmlFor="site-search">Search pages</label>
              <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2">
                <FaSearch className="text-forest" aria-hidden="true" />
                <input
                  id="site-search"
                  autoFocus
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                  placeholder="Search courses, colleges, scholarships…"
                  className="w-full bg-transparent py-1 text-sm outline-none"
                />
              </div>
              {query && (
                <ul className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
                  {SEARCHABLE.filter((item) => item.name.toLowerCase().includes(query)).map((item) => (
                    <li key={item.path}>
                      <Link href={item.path} onClick={() => { setSearchOpen(false); setSearchText(''); }} className="block rounded-lg px-3 py-2 text-sm font-medium text-forest hover:bg-forest/5">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {SEARCHABLE.filter((item) => item.name.toLowerCase().includes(query)).length === 0 && (
                    <li className="px-3 py-2 text-sm text-gray-600">No matching pages.</li>
                  )}
                </ul>
              )}
            </div>
          )}

          {/* Mobile / tablet menu */}
          {isOpen && (
            <>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="fixed inset-0 -z-10 h-screen w-full cursor-default bg-black/40 min-[1366px]:hidden"
                onClick={closeMenu}
              />
              <div
                id="mobile-menu"
                ref={menuRef}
                className="absolute inset-x-0 top-full max-h-[calc(100vh-7rem)] overflow-y-auto border-t-4 border-crimson bg-white shadow-xl min-[1366px]:hidden"
              >
                <ul className="mx-auto grid w-full gap-1 px-4 py-4 sm:grid-cols-2 lg:px-6">
                  {NAV.filter((item) => !item.wide).map((item) => {
                    const active = isActive(item.path);
                    return (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={closeMenu}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center rounded-lg border-l-4 px-4 py-3 text-base font-semibold ${focusRing} ${
                            active ? 'border-crimson bg-crimson/5 text-crimson' : 'border-transparent text-forest hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                        {item.children && (
                          <ul className="ml-6 border-l border-gray-200">
                            {item.children.map((child) => (
                              <li key={child.path}>
                                <Link href={child.path} onClick={closeMenu} className={`block rounded px-4 py-2 text-sm font-medium text-gray-700 hover:text-crimson ${focusRing}`}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div className="mx-auto w-full border-t border-gray-100 px-4 py-4 lg:px-6">
                  <CtaButtons onNavigate={closeMenu} stacked />
                </div>
              </div>
            </>
          )}
        </header>
      </div>
      <style jsx global>{`
        .rasi-ribbon{background:linear-gradient(90deg,#075544 0 62%,#dfaa32 62% 65%,#b0102e 65%);clip-path:polygon(0 0,100% 0,97% 100%,0 100%)}
        .rf-navlink::after{content:'';position:absolute;left:8px;right:8px;bottom:0;height:2px;border-radius:2px;background:#b0102e;transform:scaleX(0);transform-origin:left;transition:transform .28s ease}
        .rf-navlink:hover::after,.rf-navlink:focus-visible::after,.rf-navlink.is-active::after{transform:scaleX(1)}
        @media (prefers-reduced-motion:reduce){.rf-navlink::after{transition:none}}
      `}</style>
    </>
  );
};

export default Navbar;
