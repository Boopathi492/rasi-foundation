import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  FaBars, FaTimes, FaHome, FaChevronDown,
  FaCalendarCheck, FaArrowRight, FaSearch,
  FaUniversity, FaTrophy, FaClipboardCheck, FaAward,
} from 'react-icons/fa';
import { ROUTES, LABELS } from '@/data/siteConfig';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2';

// Main navigation (exact order required by Phase 2). `children` become a dropdown; every path is an existing page.
// Courses links straight to /courses (no submenu). Achievements lives inside the Colleges dropdown only.
const NAV = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  {
    name: 'Colleges',
    path: '/colleges',
    children: [
      { name: 'College Directory', path: '/colleges', desc: 'Browse colleges by district & zone', icon: FaUniversity },
      { name: 'Achievements', path: '/achievements', desc: 'Milestones & student success', icon: FaTrophy },
    ],
  },
  {
    name: 'Scholarships',
    path: '/scholarship-test',
    children: [
      { name: 'Scholarship Test', path: '/scholarship-test', desc: 'Register for the scholarship exam', icon: FaAward },
      { name: 'Practice Test', path: '/practice-test', desc: 'Subject-wise practice MCQs', icon: FaClipboardCheck },
    ],
  },
  { name: 'Announcements', path: '/announcements' },
  { name: 'Contact', path: '/contact' },
];

const MOBILE_NAV = NAV;

// Search covers every navigation destination plus the Feedback and workflow pages that are not in the main bar.
const EXTRA_SEARCHABLE = [
  { name: 'Share Feedback', path: '/feedback' },
  { name: 'Book Counselling', path: '/book-counselling' },
  { name: 'Secure Your Seat', path: '/biodata' },
];

const SEARCHABLE = [
  ...MOBILE_NAV.flatMap((item) => [item, ...(item.children || [])]),
  ...EXTRA_SEARCHABLE,
].filter(
  (item, i, all) => all.findIndex((o) => o.path === item.path) === i
);

function CtaButtons({ onNavigate, stacked = false }) {
  const size = stacked
    ? 'w-full px-5 py-3 text-sm !rounded-full'
    : 'h-9 px-3.5 text-[12px] xl:h-10 xl:px-4 xl:text-[13px] !rounded-full whitespace-nowrap';
  return (
    <div className={stacked ? 'grid gap-3 sm:grid-cols-2' : 'flex items-center gap-2 xl:gap-2.5'}>
      <Link
        href={ROUTES.counselling}
        onClick={onNavigate}
        className={`rf-btn-primary ${size}`}
      >
        <FaCalendarCheck className="text-xs xl:text-sm shrink-0" aria-hidden="true" />
        <span>Book Counselling</span>
      </Link>
      <Link
        href={ROUTES.secureSeat}
        onClick={onNavigate}
        className={`rf-btn-maroon ${size}`}
      >
        <span>{LABELS.secureSeat}</span>
        <FaArrowRight className="text-[11px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function Brand() {
  return (
    <Link
      href="/"
      className={`group flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl py-0.5 pr-1 transition-transform duration-200 hover:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100 ${focusRing}`}
      aria-label="Rasi Foundation home"
    >
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-[0_2px_10px_rgba(176,16,46,0.18)] ring-1 ring-crimson/15 transition-shadow duration-200 group-hover:shadow-[0_4px_14px_rgba(176,16,46,0.28)] sm:h-12 sm:w-12">
        <Image
          src="/rasi-logo.png"
          alt="Rasi Foundation logo"
          width={96}
          height={96}
          sizes="48px"
          priority
          className="h-full w-full rounded-full object-contain"
        />
      </span>
      <span className="leading-none">
        <span className="block whitespace-nowrap font-display text-[17px] font-bold uppercase tracking-[0.02em] sm:text-[20px] xl:text-[22px]">
          <span className="text-crimson">
            <span className="relative inline-block">
              {/* Graduation cap positioned directly above the 'R' in the Rasi wordmark matching reference image */}
              <Image
                src="/graduation-cap.png"
                alt=""
                aria-hidden="true"
                width={36}
                height={28}
                priority
                unoptimized
                className="pointer-events-none absolute -top-[0.36em] -left-[0.22em] w-[1.08em] h-auto max-w-none select-none transition-transform duration-200 group-hover:-translate-y-0.5"
              />
              R
            </span>
            asi
          </span>{' '}
          <span className="text-forest">Foundation</span>
        </span>
        <span className="mt-1 hidden items-center gap-1.5 whitespace-nowrap text-[9.5px] font-semibold tracking-wide text-forest/90 sm:flex">
          <span aria-hidden="true" className="h-px w-2.5 bg-gold-400" />
          Think Admission ! Think RASI !!
          <span aria-hidden="true" className="h-px w-2.5 bg-gold-400" />
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

  const isRouteActive = (path) =>
    path === '/' ? router.pathname === '/' : router.pathname === path || router.pathname.startsWith(`${path}/`);

  const isItemActive = (item) =>
    isRouteActive(item.path) || (item.children ? item.children.some((c) => isRouteActive(c.path)) : false);

  const closeMenu = () => setIsOpen(false);
  const query = searchText.trim().toLowerCase();

  const hoverOpen = (name) => { window.clearTimeout(closeTimer.current); setOpenMenu(name); };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
  };

  const searchButton = (
    <button
      type="button"
      aria-label={searchOpen ? 'Close site search' : 'Open site search'}
      aria-expanded={searchOpen}
      onClick={() => setSearchOpen((v) => !v)}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs text-forest transition-colors duration-150 hover:border-forest hover:bg-forest hover:text-white xl:h-9 xl:w-9 ${focusRing}`}
    >
      <FaSearch aria-hidden="true" />
    </button>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-forest focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Fixed Institutional Header */}
      <header
        className={`rf-header-enter fixed inset-x-0 top-0 z-50 transition-shadow duration-200 ${
          scrolled
            ? 'border-b border-gray-200 bg-white/[0.98] shadow-[0_2px_12px_rgba(15,23,42,0.06)] backdrop-blur-md'
            : 'border-b border-gray-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
        }`}
      >
        <nav
          ref={navRef}
          aria-label="Main"
          className="mx-auto flex h-[69px] max-w-[1600px] items-center justify-between gap-2 px-3 sm:px-5 lg:h-[73.1px] lg:px-6 2xl:px-10"
        >
          {/* Left: Brand Identity */}
          <Brand />

          {/* Center: Navigation Links (Desktop lg+) */}
          <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-center lg:px-2">
            <ul className="flex items-center gap-0.5 px-1 py-1 xl:gap-1 xl:px-2">
              {NAV.map((item) => {
                const active = isItemActive(item);
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.name;
                return (
                  <li
                    key={item.path}
                    className="relative"
                    onMouseEnter={hasMenu ? () => hoverOpen(item.name) : undefined}
                    onMouseLeave={hasMenu ? hoverClose : undefined}
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.path}
                        aria-current={isRouteActive(item.path) ? 'page' : undefined}
                        className={`rf-navlink relative flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 xl:px-3.5 xl:text-[13.5px] ${focusRing} ${
                          active
                            ? 'is-active font-bold text-crimson'
                            : 'text-forest hover:text-crimson'
                        } ${hasMenu ? '!pr-1 xl:!pr-1.5' : ''}`}
                      >
                        <span>{item.name}</span>
                      </Link>
                      {hasMenu && (
                        <button
                          type="button"
                          data-menu={item.name}
                          aria-label={`${item.name} submenu`}
                          aria-haspopup="true"
                          aria-expanded={open}
                          onClick={() => setOpenMenu(open ? null : item.name)}
                          className={`mr-0.5 flex h-7 w-5 items-center justify-center rounded-md text-[10px] transition-colors ${
                            active ? 'text-crimson' : 'text-forest/80'
                          } hover:bg-forest/5 hover:text-crimson ${focusRing}`}
                        >
                          <FaChevronDown
                            aria-hidden="true"
                            className={`transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180 text-crimson' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {hasMenu && (
                      <ul
                        className={`absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 origin-top rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg transition-all duration-150 motion-reduce:transition-none ${
                          open
                            ? 'visible translate-y-0 scale-100 opacity-100'
                            : 'pointer-events-none invisible -translate-y-1 scale-[0.98] opacity-0'
                        }`}
                      >
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          const childActive = isRouteActive(child.path);
                          return (
                            <li key={child.path}>
                              <Link
                                href={child.path}
                                tabIndex={open ? 0 : -1}
                                onClick={() => setOpenMenu(null)}
                                className={`group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors ${focusRing} ${
                                  childActive ? 'bg-crimson/8 text-crimson' : 'text-gray-800 hover:bg-gray-50 hover:text-forest'
                                }`}
                              >
                                {ChildIcon && (
                                  <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm transition-colors ${
                                    childActive ? 'bg-crimson text-white' : 'bg-forest/10 text-forest group-hover/item:bg-forest group-hover/item:text-white'
                                  }`}>
                                    <ChildIcon aria-hidden="true" />
                                  </span>
                                )}
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold leading-tight">{child.name}</span>
                                  {child.desc && (
                                    <span className="mt-0.5 block text-xs text-gray-500">{child.desc}</span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Distinct CTA Group (Desktop lg+) */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-2.5">
            {searchButton}
            <CtaButtons />
          </div>

          {/* Tablet / Mobile Controls (< lg) */}
          <div className="flex items-center gap-2 lg:hidden">
            {searchButton}
            <Link
              href={ROUTES.counselling}
              className="rf-btn-primary hidden h-9 px-3.5 text-xs !rounded-full md:inline-flex"
            >
              <FaCalendarCheck aria-hidden="true" /> Book Counselling
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest/25 bg-white text-forest shadow-sm transition-colors hover:bg-forest hover:text-white ${focusRing}`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Search Drawer */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white/95 px-4 pb-3 pt-2.5 backdrop-blur-lg lg:px-6">
            <div className="mx-auto max-w-4xl">
              <label className="sr-only" htmlFor="site-search">Search pages</label>
              <div className="flex items-center gap-3 rounded-full border border-forest/25 bg-gray-50/90 px-4 py-1.5 shadow-inner focus-within:border-forest focus-within:bg-white">
                <FaSearch className="text-forest text-sm" aria-hidden="true" />
                <input
                  id="site-search"
                  autoFocus
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false); }}
                  placeholder="Search courses, colleges, scholarships, announcements…"
                  className="w-full bg-transparent py-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                >
                  <FaTimes className="text-xs" aria-hidden="true" />
                </button>
              </div>
              {query && (
                <ul className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
                  {SEARCHABLE.filter((item) => item.name.toLowerCase().includes(query)).map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => { setSearchOpen(false); setSearchText(''); }}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-forest hover:bg-forest/5 hover:text-crimson"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  {SEARCHABLE.filter((item) => item.name.toLowerCase().includes(query)).length === 0 && (
                    <li className="px-3 py-2 text-sm text-gray-600">No matching pages found.</li>
                  )}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Mobile / Tablet Hamburger Drawer */}
        {isOpen && (
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-x-0 top-[69px] bottom-0 -z-10 h-[calc(100vh-69px)] w-full cursor-default bg-black/40 lg:hidden"
              onClick={closeMenu}
            />
            <div
              id="mobile-menu"
              ref={menuRef}
              className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-gray-200 bg-white shadow-xl lg:hidden"
            >
              <ul className="mx-auto grid max-w-2xl gap-1 px-4 py-4 sm:grid-cols-2">
                {MOBILE_NAV.map((item) => {
                  const active = isRouteActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={closeMenu}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-lg border-l-4 px-4 py-2.5 text-sm font-semibold transition-colors ${focusRing} ${
                          active
                            ? 'border-crimson bg-crimson/8 text-crimson'
                            : 'border-transparent text-forest hover:bg-gray-50'
                        }`}
                      >
                        <span>{item.name}</span>
                        <FaArrowRight className="text-[10px] opacity-40" aria-hidden="true" />
                      </Link>
                      {item.children && (
                        <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-gray-200 pl-2">
                          {item.children.map((child) => (
                            <li key={child.path}>
                              <Link
                                href={child.path}
                                onClick={closeMenu}
                                className={`block rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-crimson ${focusRing}`}
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
              <div className="mx-auto max-w-2xl border-t border-gray-100 bg-gray-50 px-4 py-4">
                <CtaButtons onNavigate={closeMenu} stacked />
              </div>
            </div>
          </>
        )}
      </header>

      {/* Spacer so fixed header never overlaps page content */}
      <div aria-hidden="true" className="h-[69px] lg:h-[73.1px]" />

      <style jsx global>{`
        .rf-navlink::after {
          content: '';
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 3px;
          height: 2px;
          border-radius: 1px;
          background: #b0102e;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.2s ease;
        }
        .rf-navlink:hover::after,
        .rf-navlink:focus-visible::after,
        .rf-navlink.is-active::after {
          transform: scaleX(1);
        }
        @media (prefers-reduced-motion: reduce) {
          .rf-navlink::after { transition: none; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
