import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Link from 'next/link';
import {
  FaEnvelope,
  FaUserGraduate,
  FaQuestionCircle,
  FaUniversity,
  FaArrowRight,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrophy,
  FaAward,
  FaCreditCard,
  FaChartLine,
  FaPlusCircle
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentItems, setRecentItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentItems(data.recent);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats?.contacts?.total || 0,
      new: stats?.contacts?.new || 0,
      icon: FaEnvelope,
      color: 'blue',
      href: '/admin/contacts'
    },
    {
      title: 'Total Enquiries',
      value: stats?.enquiries?.total || 0,
      new: stats?.enquiries?.pending || 0,
      icon: FaUserGraduate,
      color: 'green',
      href: '/admin/enquiries'
    },
    {
      title: 'Total Questions',
      value: stats?.questions?.total || 0,
      new: stats?.questions?.unanswered || 0,
      icon: FaQuestionCircle,
      color: 'purple',
      href: '/admin/questions'
    },
    {
      title: 'Partner Colleges',
      value: stats?.colleges?.total || 0,
      new: stats?.colleges?.active || 0,
      newLabel: 'active',
      icon: FaUniversity,
      color: 'orange',
      href: '/admin/colleges'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'bg-blue-500',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'bg-green-500',
      text: 'text-green-600',
      badge: 'bg-green-100 text-green-700'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'bg-purple-500',
      text: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'bg-orange-500',
      text: 'text-orange-600',
      badge: 'bg-orange-100 text-orange-700'
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-red-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="System Overview">
      {/* Welcome & Time Banner */}
      <div className="relative overflow-hidden bg-[#0f172a] rounded-[2rem] p-8 mb-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black mb-2 tracking-tight">System Control Center</h2>
            <p className="text-slate-400 font-medium">Monitoring RASI Foundation digital infrastructure and student success metrics.</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
            <FaClock className="text-red-500" />
            <span className="font-mono text-sm font-bold">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="group bg-white rounded-[2rem] p-8 border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 cursor-pointer relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
              <div className="relative z-10">
                <div className={`w-14 h-14 ${colorClasses[stat.color].icon} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-500 text-white text-2xl`}>
                  <stat.icon />
                </div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                  {stat.new > 0 && (
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${colorClasses[stat.color].badge}`}>
                      +{stat.new} {stat.newLabel || 'New'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Quick Actions */}
        <div className="lg:col-span-1 bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-black mb-8 tracking-tight flex items-center gap-3">
            <FaPlusCircle className="text-red-500" />
            Quick Entry
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Add Scholarship Question', icon: FaQuestionCircle, href: '/admin/questions' },
              { label: 'Register Partner College', icon: FaUniversity, href: '/admin/colleges' },
              { label: 'Post Achievement', icon: FaAward, href: '/admin/achievements' },
              { label: 'Check Payments', icon: FaCreditCard, href: '/admin/payments' }
            ].map((action, i) => (
              <Link key={i} href={action.href} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <action.icon />
                </div>
                <span className="font-bold text-sm tracking-tight">{action.label}</span>
                <FaArrowRight className="ml-auto text-xs opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Scholarship Pulse</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Test Completion Metrics</p>
            </div>
            <FaChartLine className="text-slate-200 text-4xl" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Completion Rate', value: '84%', color: 'from-blue-500 to-indigo-600' },
              { label: 'Avg. Score', value: '68/100', color: 'from-purple-500 to-pink-600' },
              { label: 'Active Sessions', value: '12', color: 'from-orange-500 to-amber-600' },
              { label: 'Pending Verification', value: '28', color: 'from-red-500 to-rose-600' }
            ].map((metric, i) => (
              <div key={i} className="text-center">
                <div className={`w-full aspect-square rounded-[2rem] bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <span className="text-white font-black text-xl">{metric.value}</span>
                </div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interaction Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Contacts */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Direct Communications</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Recent Portal Messages</p>
            </div>
            <Link href="/admin/contacts" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentItems?.contacts?.length > 0 ? (
              recentItems.contacts.map((contact) => (
                <div key={contact._id} className="p-5 flex items-center gap-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-slate-900 shadow-sm group-hover:scale-110 transition-transform">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-900">{contact.name}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${contact.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">{contact.subject}</p>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono">{new Date(contact.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-slate-300 font-bold italic tracking-tight">Digital silence... No recent logs.</div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Prospect Pipeline</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Live Admission Enquiries</p>
            </div>
            <Link href="/admin/enquiries" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentItems?.enquiries?.length > 0 ? (
              recentItems.enquiries.map((enquiry) => (
                <div key={enquiry._id} className="p-5 flex items-center gap-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
                    <FaUserGraduate />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-bold text-slate-900">{enquiry.name}</p>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${enquiry.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                        }`}>
                        {enquiry.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{enquiry.course}</p>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono">{new Date(enquiry.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-slate-300 font-bold italic tracking-tight">Awaiting new prospects...</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}



