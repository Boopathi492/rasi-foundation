import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaHome,
  FaEnvelope,
  FaUserGraduate,
  FaUniversity,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaCog,
  FaCreditCard,
  FaAward,
  FaTrophy,
  FaBullhorn,
  FaIdCard,
  FaSearch,
  FaComments,
  FaFileAlt,
  FaShieldAlt,
  FaServer,
  FaBook,
  FaImages,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from 'react-icons/fa';

export default function AdminLayout({ children, title = 'Dashboard' }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Search state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef(null);

  // Notifications state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }

    // Fetch initial notifications
    fetchNotifications(token);

    // Keyboard shortcut for search (Ctrl+K or /)
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const fetchNotifications = async (token) => {
    try {
      const t = token || localStorage.getItem('adminToken');
      if (!t) return;
      const res = await fetch('/api/admin/notifications', {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {
      // Ignore background notification fetch errors
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch {
      // Ignore
    }
  };

  const handleSearch = async (q) => {
    setSearchQuery(q);
    if (!q || q.trim().length < 2) {
      setSearchResults(null);
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q.trim())}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSearchResults(data.results || {});
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const userRole = user?.role || 'admin';

  // Navigation menu grouped by operational categories with RBAC filtering
  const menuGroups = [
    {
      group: 'Overview',
      items: [{ name: 'Dashboard', href: '/admin', icon: FaHome, roles: ['super_admin', 'admin', 'counsellor', 'exam_manager'] }],
    },
    {
      group: 'Admissions & Guidance',
      items: [
        { name: 'Student BioData', href: '/admin/biodata', icon: FaIdCard, roles: ['super_admin', 'admin', 'counsellor', 'exam_manager'] },
        { name: 'Enquiries', href: '/admin/enquiries', icon: FaUserGraduate, roles: ['super_admin', 'admin', 'counsellor'] },
        { name: 'Counselling', href: '/admin/counselling', icon: FaComments, roles: ['super_admin', 'admin', 'counsellor'] },
        { name: 'Contact Messages', href: '/admin/contacts', icon: FaEnvelope, roles: ['super_admin', 'admin'] },
      ],
    },
    {
      group: 'Academics & Testing',
      items: [
        { name: 'Colleges', href: '/admin/colleges', icon: FaUniversity, roles: ['super_admin', 'admin', 'counsellor'] },
        { name: 'Courses', href: '/admin/courses', icon: FaBook, roles: ['super_admin', 'admin', 'counsellor'] },
        { name: 'Question Bank', href: '/admin/question-bank', icon: FaBook, roles: ['super_admin', 'admin', 'exam_manager'] },
        { name: 'Scholarship Exam', href: '/admin/scholarship-results', icon: FaAward, roles: ['super_admin', 'admin', 'exam_manager'] },
        { name: 'Practice Test', href: '/admin/practice-results', icon: FaTrophy, roles: ['super_admin', 'admin', 'exam_manager'] },
      ],
    },
    {
      group: 'Website Content',
      items: [
        { name: 'Banners', href: '/admin/banners', icon: FaImages, roles: ['super_admin', 'admin'] },
        { name: 'Feedback Moderation', href: '/admin/feedback', icon: FaCheckCircle, roles: ['super_admin', 'admin'] },
        { name: 'Achievements', href: '/admin/achievements', icon: FaTrophy, roles: ['super_admin', 'admin'] },
        { name: 'Announcements', href: '/admin/announcements', icon: FaBullhorn, roles: ['super_admin', 'admin'] },
      ],
    },
    {
      group: 'Governance & Analytics',
      items: [
        { name: 'Reports & Exports', href: '/admin/reports', icon: FaFileAlt, roles: ['super_admin', 'admin', 'counsellor', 'exam_manager'] },
        { name: 'Audit Trail', href: '/admin/audit', icon: FaShieldAlt, roles: ['super_admin', 'admin', 'exam_manager'] },
        { name: 'System Logs & Health', href: '/admin/logs', icon: FaServer, roles: ['super_admin', 'admin'] },
      ],
    },
    {
      group: 'Payments (Read-only)',
      items: [
        { name: 'Payment Transactions', href: '/admin/payments', icon: FaCreditCard, roles: ['super_admin', 'admin'] },
        { name: 'Payment Settings', href: '/admin/payment-settings', icon: FaCog, roles: ['super_admin', 'admin'] },
      ],
    },
  ];

  const isActive = (href) => {
    if (href === '/admin') return router.pathname === '/admin';
    return router.pathname.startsWith(href);
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'counsellor': return 'Counsellor';
      case 'exam_manager': return 'Exam Manager';
      default: return 'Staff';
    }
  };

  return (
    <>
      <Head>
        <title>{title} | Admin — Rasi Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-slate-50 flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-slate-300 flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Brand header */}
          <div className="h-20 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
            <Link href="/admin" className="flex items-center gap-3 group">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md shadow-red-950/40 ring-2 ring-red-500/25">
                <Image
                  src="/rasi-logo.png"
                  alt="Rasi Foundation"
                  width={40}
                  height={40}
                  priority
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              <div className="leading-tight">
                <span className="font-extrabold text-white text-xs tracking-wider font-heading block">
                  <span className="text-red-500 relative inline-block">
                    <Image
                      src="/graduation-cap.png"
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={15}
                      priority
                      unoptimized
                      className="pointer-events-none absolute -top-[0.38em] -left-[0.22em] w-[1.08em] h-auto max-w-none select-none"
                    />
                    R
                  </span>
                  <span className="text-red-500">ASI </span>
                  <span className="text-emerald-400">FOUNDATION</span>
                </span>
                <span className="text-[9.5px] uppercase font-bold text-amber-400/90 tracking-wider flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Management Suite
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
              aria-label="Close menu"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Navigation links with categories */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs scrollbar-thin scrollbar-thumb-slate-800">
            {menuGroups.map((grp) => {
              const visibleItems = grp.items.filter((item) => item.roles.includes(userRole));
              if (visibleItems.length === 0) return null;

              return (
                <div key={grp.group} className="space-y-1">
                  <p className="px-3 text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                    {grp.group}
                  </p>
                  <div className="space-y-0.5">
                    {visibleItems.map((item) => {
                      const active = isActive(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            active
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/30 font-semibold border-l-2 border-amber-400'
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <item.icon className={`text-sm shrink-0 ${active ? 'text-amber-300' : 'text-slate-400'}`} />
                          <span className="truncate">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* User profile & Logout */}
          <div className="p-3 border-t border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between gap-2 px-2 py-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
                  {(user?.name || user?.username || 'A')[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{user?.name || user?.username || 'Admin'}</p>
                  <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-blue-900/40 text-blue-300 border border-blue-800/50">
                    {getRoleLabel(userRole)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Log out"
                className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800/60 transition-colors shrink-0"
              >
                <FaSignOutAlt className="text-sm" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main page content area */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
          {/* Top navigation header */}
          <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg border border-slate-200"
                aria-label="Open sidebar"
              >
                <FaBars className="text-base" />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium leading-none mb-1">
                  <Link href="/admin" className="hover:text-emerald-700 transition-colors">Admin</Link>
                  <span>/</span>
                  <span className="text-slate-600 font-semibold">{title}</span>
                </div>
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none">
                  {title}
                </h1>
              </div>
            </div>

            {/* Global Search button / shortcut */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Operational Status Indicator */}
              <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>MongoDB Active</span>
              </div>

              {/* Quick Record Action */}
              <Link
                href="/admin/biodata"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 px-3 py-1.5 rounded-xl shadow-xs transition-all"
              >
                <span>+ BioData</span>
              </Link>

              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors"
                title="Search (Ctrl+K)"
              >
                <FaSearch className="text-slate-400" />
                <span className="hidden sm:inline">Search records...</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-500 shadow-2xs">
                  Ctrl K
                </kbd>
              </button>

              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Notifications"
                >
                  <FaBell className="text-base" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications drawer */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                      <span className="text-xs font-bold text-slate-800">Notifications ({unreadCount})</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-blue-600 hover:underline font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-6">No new notifications</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3 text-xs transition-colors ${
                              n.isRead ? 'bg-white text-slate-600' : 'bg-blue-50/50 text-slate-800 font-medium'
                            }`}
                          >
                            <p className="font-semibold text-slate-900 mb-0.5">{n.title}</p>
                            <p className="text-[11px] text-slate-500 mb-1">{n.body}</p>
                            <span className="text-[10px] text-slate-400">
                              {n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* View Public Site */}
              <Link
                href="/"
                target="_blank"
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors hidden md:inline-flex items-center gap-1.5"
              >
                <span>Live Site</span>
                <span className="text-[10px]">↗</span>
              </Link>
            </div>
          </header>

          {/* Main content body */}
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>

        {/* Global Search Modal */}
        {searchOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
                <FaSearch className="text-slate-400 text-sm" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search students, enquiries, counselling, colleges, courses..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 font-medium"
                />
                {searching && <FaSpinner className="animate-spin text-blue-500 text-sm" />}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 text-xs"
                >
                  <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-slate-200 rounded">ESC</kbd>
                </button>
              </div>

              {/* Results panel */}
              <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                {searchResults && Object.keys(searchResults).length > 0 ? (
                  Object.entries(searchResults).map(([group, items]) => {
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={group} className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 block">
                          {group}
                        </span>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <Link
                              key={item.id}
                              href={item.link}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 transition-colors group"
                            >
                              <div>
                                <p className="text-xs font-semibold text-slate-800 group-hover:text-blue-600">
                                  {item.title}
                                </p>
                                <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                              </div>
                              {item.status && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-200 text-slate-700">
                                  {item.status}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : searchQuery.length >= 2 && !searching ? (
                  <p className="text-xs text-slate-400 text-center py-8">No results found for &quot;{searchQuery}&quot;</p>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Type at least 2 characters to search across all records
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
