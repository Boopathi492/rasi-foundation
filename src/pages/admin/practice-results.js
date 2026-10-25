import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaTrophy,
  FaSearch,
  FaClock,
  FaSpinner,
  FaPercent,
  FaBook,
  FaCheckCircle,
} from 'react-icons/fa';

export default function AdminPracticeResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchResults();
  }, [subjectFilter, search]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (subjectFilter !== 'all') params.append('subject', subjectFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/practice-results?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Fetch practice results error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Scholarship Practice Test Results">
      <div className="space-y-6">
        {/* Header banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaTrophy className="text-amber-500 text-sm" />
              <h2 className="text-base font-bold text-slate-800">Practice Scholarship Examinations</h2>
            </div>
            <p className="text-xs text-slate-500">
              Candidate practice attempts, subject evaluations, average performance, and question engagement.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {stats.total || 0} Total Attempts
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {stats.avgPercentage || 0}% Avg Score
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'General'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubjectFilter(sub)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  subjectFilter === sub
                    ? 'bg-white text-slate-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, email, phone..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <FaTrophy className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No practice attempts recorded</p>
              <p className="mt-1">When students complete mock scholarship tests, their scores appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Student Name</th>
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Subject</th>
                    <th className="px-5 py-3.5">Score</th>
                    <th className="px-5 py-3.5">Percentage</th>
                    <th className="px-5 py-3.5">Duration</th>
                    <th className="px-5 py-3.5">Completed Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-800">{r.studentName}</td>
                      <td className="px-5 py-4">
                        <p className="text-slate-700">{r.email}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{r.phone || '—'}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {r.subject || 'Practice'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-slate-800">
                        {r.score} / {r.totalQuestions || 25}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            (r.percentage || 0) >= 75
                              ? 'bg-emerald-100 text-emerald-800'
                              : (r.percentage || 0) >= 50
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.percentage || 0}%
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-500 font-mono text-[11px]">
                        {r.timeTaken ? `${Math.round(r.timeTaken / 60)} mins` : '—'}
                      </td>
                      <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                        {r.completedAt ? new Date(r.completedAt).toLocaleString() : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
