import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Link from 'next/link';
import {
  FaEnvelope,
  FaUserGraduate,
  FaUniversity,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrophy,
  FaAward,
  FaIdCard,
  FaComments,
  FaImages,
  FaBook,
  FaFileAlt,
  FaShieldAlt,
  FaServer,
  FaArrowRight,
  FaPlus,
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const stored = localStorage.getItem('adminUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // Ignore
      }
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="System Control Center">
        <div className="flex flex-col items-center justify-center h-80 gap-3">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
          <p className="text-xs text-slate-500 font-medium">Loading real-time analytics...</p>
        </div>
      </AdminLayout>
    );
  }

  const stats = data?.stats || {};
  const distributions = data?.distributions || {};
  const recent = data?.recent || {};

  const kpis = [
    {
      title: 'Student BioData',
      value: stats.students?.total || 0,
      subValue: `+${stats.students?.new30d || 0} this month`,
      subColor: 'text-emerald-600 font-semibold',
      icon: FaIdCard,
      color: 'blue',
      href: '/admin/biodata',
    },
    {
      title: 'Enquiries Received',
      value: stats.enquiries?.total || 0,
      subValue: `${stats.enquiries?.pending || 0} pending action`,
      subColor: stats.enquiries?.pending > 0 ? 'text-amber-600 font-semibold' : 'text-slate-500',
      icon: FaUserGraduate,
      color: 'amber',
      href: '/admin/enquiries',
    },
    {
      title: 'Counselling Sessions',
      value: stats.counselling?.total || 0,
      subValue: `${stats.counselling?.scheduled || 0} scheduled upcoming`,
      subColor: 'text-blue-600 font-semibold',
      icon: FaComments,
      color: 'teal',
      href: '/admin/counselling',
    },
    {
      title: 'Feedback & Reviews',
      value: stats.feedback?.total || 0,
      subValue: `${stats.feedback?.pending || 0} pending approval`,
      subColor: stats.feedback?.pending > 0 ? 'text-rose-600 font-semibold' : 'text-emerald-600',
      icon: FaCheckCircle,
      color: 'rose',
      href: '/admin/feedback',
    },
    {
      title: 'Partner Colleges',
      value: stats.colleges?.total || 0,
      subValue: `${stats.colleges?.active || 0} active in catalogue`,
      subColor: 'text-slate-500',
      icon: FaUniversity,
      color: 'indigo',
      href: '/admin/colleges',
    },
    {
      title: 'Degree Courses',
      value: stats.courses?.total || 0,
      subValue: `${stats.courses?.active || 0} active branches`,
      subColor: 'text-slate-500',
      icon: FaBook,
      color: 'cyan',
      href: '/admin/courses',
    },
    {
      title: 'Active Banners',
      value: stats.banners?.active || 0,
      subValue: 'Dynamic home & pages',
      subColor: 'text-slate-500',
      icon: FaImages,
      color: 'purple',
      href: '/admin/banners',
    },
    {
      title: 'System Health',
      value: stats.monitoring?.unresolvedErrors === 0 ? 'Optimal' : `${stats.monitoring?.unresolvedErrors} Issues`,
      subValue: stats.monitoring?.unresolvedErrors === 0 ? '0 unresolved errors' : 'Requires admin attention',
      subColor: stats.monitoring?.unresolvedErrors === 0 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold',
      icon: FaServer,
      color: stats.monitoring?.unresolvedErrors === 0 ? 'emerald' : 'rose',
      href: '/admin/logs',
    },
  ];

  const colorStyles = {
    blue: { bg: 'bg-emerald-50/60', icon: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-500/25', border: 'border-emerald-100 hover:border-emerald-300' },
    amber: { bg: 'bg-amber-50/60', icon: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-amber-500/25', border: 'border-amber-100 hover:border-amber-300' },
    teal: { bg: 'bg-teal-50/60', icon: 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-teal-500/25', border: 'border-teal-100 hover:border-teal-300' },
    rose: { bg: 'bg-rose-50/60', icon: 'bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-rose-500/25', border: 'border-rose-100 hover:border-rose-300' },
    indigo: { bg: 'bg-indigo-50/60', icon: 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-indigo-500/25', border: 'border-indigo-100 hover:border-indigo-300' },
    cyan: { bg: 'bg-cyan-50/60', icon: 'bg-gradient-to-br from-cyan-600 to-teal-700 text-white shadow-cyan-500/25', border: 'border-cyan-100 hover:border-cyan-300' },
    purple: { bg: 'bg-purple-50/60', icon: 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-purple-500/25', border: 'border-purple-100 hover:border-purple-300' },
    emerald: { bg: 'bg-emerald-50/60', icon: 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-emerald-500/25', border: 'border-emerald-100 hover:border-emerald-300' },
  };

  return (
    <AdminLayout title="Operational Control Center">
      {/* Welcome Hero Banner with 3D Depth & Brand Styling */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#075544] via-[#0b1329] to-[#0a101f] rounded-3xl p-6 lg:p-9 mb-8 text-white shadow-xl border border-emerald-900/40 relative">
        {/* Subtle background ambient glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Rasi Trust Management Suite • Live Active
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight mb-2 text-white">
              Welcome back, {user?.name || user?.username || 'Administrator'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Monitoring real-time student registrations, admissions counselling, affiliated institutions, and website engagement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/admin/reports"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaFileAlt />
              <span>Export Reports</span>
            </Link>
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-700/80 text-xs text-slate-300">
              <FaClock className="text-amber-400" />
              <span className="font-mono">
                {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with 3D Depth and Elevated Shadows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => {
          const style = colorStyles[kpi.color] || colorStyles.blue;
          return (
            <Link key={kpi.title} href={kpi.href}>
              <div className={`p-5 rounded-2xl bg-white border ${style.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group cursor-pointer relative overflow-hidden shadow-xs`}>
                <div className="flex items-start justify-between mb-3.5">
                  <div className={`w-11 h-11 rounded-2xl ${style.icon} flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform`}>
                    <kpi.icon />
                  </div>
                  <FaArrowRight className="text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all text-xs mt-1" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{kpi.title}</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight mb-1">{kpi.value}</p>
                <p className={`text-xs ${kpi.subColor}`}>{kpi.subValue}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions Strip */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Administrative Actions</p>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/banners"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <FaPlus className="text-[10px] text-emerald-600" />
            <span>Add Banner</span>
          </Link>
          <Link
            href="/admin/feedback"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <FaCheckCircle className="text-[10px] text-emerald-600" />
            <span>Moderate Testimonials</span>
          </Link>
          <Link
            href="/admin/counselling"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <FaComments className="text-[10px] text-teal-600" />
            <span>Schedule Counselling</span>
          </Link>
          <Link
            href="/admin/colleges"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <FaUniversity className="text-[10px] text-indigo-600" />
            <span>Manage Colleges</span>
          </Link>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold transition-all hover:scale-[1.02]"
          >
            <FaBook className="text-[10px] text-cyan-600" />
            <span>Manage Courses</span>
          </Link>
          <Link
            href="/admin/reports"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold transition-all hover:scale-[1.02]"
          >
            <FaFileAlt className="text-[10px] text-emerald-600" />
            <span>Download Excel / PDF Report</span>
          </Link>
        </div>
      </div>

      {/* Analytics Breakdown & Recent Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* District Distribution (Real DB aggregation) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Student District Distribution</h3>
              <p className="text-[11px] text-slate-400">Top registrations by Tamil Nadu district</p>
            </div>
            <Link href="/admin/biodata" className="text-xs text-emerald-700 hover:underline font-semibold">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {distributions.districts && distributions.districts.length > 0 ? (
              distributions.districts.map((dist, idx) => {
                const totalStudents = stats.students?.total || 1;
                const pct = Math.min(100, Math.round((dist.count / totalStudents) * 100));
                return (
                  <div key={dist.name || idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{dist.name || 'Unspecified'}</span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {dist.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(8, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">No district records yet</p>
            )}
          </div>
        </div>

        {/* Recent Administrative Audit Trail */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Administrative Audit Trail</h3>
              <p className="text-[11px] text-slate-400">Tamper-resistant audit log of recent staff actions</p>
            </div>
            <Link href="/admin/audit" className="text-xs text-blue-600 hover:underline font-medium">
              Full log →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recent.activity && recent.activity.length > 0 ? (
              recent.activity.map((act) => (
                <div key={act._id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 text-xs shrink-0 font-bold">
                      {(act.actorName || 'A')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {act.actorName || 'System'} <span className="text-slate-400 font-normal">performed</span>{' '}
                        <code className="text-[11px] px-1 py-0.5 bg-slate-100 text-slate-700 rounded font-mono">
                          {act.action}
                        </code>
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Resource: {act.resourceType || 'general'} • IP: {act.ip || 'local'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        act.outcome === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {act.outcome}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {act.createdAt ? new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 text-center py-8">No audit actions logged yet</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
