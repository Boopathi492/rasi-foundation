import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaHome, 
  FaEnvelope, 
  FaQuestionCircle, 
  FaUserGraduate,
  FaUniversity,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaChartLine,
  FaCog,
  FaCreditCard
} from 'react-icons/fa';

export default function AdminLayout({ children, title = 'Dashboard' }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');
    
    if (!token) {
      router.push('/admin/login');
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: FaHome },
    { name: 'Contacts', href: '/admin/contacts', icon: FaEnvelope },
    { name: 'Enquiries', href: '/admin/enquiries', icon: FaUserGraduate },
    { name: 'Questions', href: '/admin/questions', icon: FaQuestionCircle },
    { name: 'Colleges', href: '/admin/colleges', icon: FaUniversity },
    { name: 'Payments', href: '/admin/payments', icon: FaCreditCard },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return router.pathname === '/admin';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <Head>
        <title>{title} | Admin - Rasi Foundation</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
            <Link href="/admin" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Rasi Foundation" 
                width={36} 
                height={36}
                className="rounded-lg"
              />
              <span className="text-white font-bold text-lg">Admin</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="text-lg" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-all"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:ml-64">
          {/* Top navbar */}
          <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <FaBars className="text-xl" />
            </button>

            <h1 className="text-xl font-semibold text-gray-800 hidden lg:block">{title}</h1>

            <div className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-gray-500 hover:text-gray-700 text-sm">
                View Site →
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.username || 'Admin'}
                </span>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
