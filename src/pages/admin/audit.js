import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

export default function AdminAuditTrail() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [expandedId, setExpandedId] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page,
        limit: 25,
      });
      if (outcomeFilter !== 'all') params.append('outcome', outcomeFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/audit?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
        setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
      }
    } catch (err) {
      console.error('Fetch audit logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [outcomeFilter, search, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <AdminLayout title="Administrative Audit Trail">
      <div className="space-y-6">
        {/* Header banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaShieldAlt className="text-emerald-600 text-sm" />
              <h2 className="text-base font-bold text-slate-800">Append-Only Governance Audit Trail</h2>
            </div>
            <p className="text-xs text-slate-500">
              Immutable chronological record of administrative actions, role permissions, content updates, and authentication events.
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 font-mono text-xs rounded-xl border border-emerald-200 font-bold">
            {pagination.total || 0} Total Events Logged
          </span>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {['all', 'success', 'failure', 'denied'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setOutcomeFilter(tab);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  outcomeFilter === tab
                    ? 'bg-white text-slate-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search actor, action, IP..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Audit Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <FaShieldAlt className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No audit records found</p>
              <p className="mt-1">Administrative operations automatically record here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Timestamp</th>
                    <th className="px-5 py-3.5">Actor</th>
                    <th className="px-5 py-3.5">Action</th>
                    <th className="px-5 py-3.5">Resource</th>
                    <th className="px-5 py-3.5">Outcome</th>
                    <th className="px-5 py-3.5">IP Address</th>
                    <th className="px-5 py-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <>
                      <tr key={log._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">
                          {log.createdAt ? new Date(log.createdAt).toLocaleString() : ''}
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="font-bold text-slate-800">{log.actorName || log.actorId}</p>
                          <span className="text-[10px] text-slate-400 font-medium capitalize">{log.actorRole || 'staff'}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <code className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-blue-700 font-semibold">
                            {log.action}
                          </code>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-medium text-slate-700 capitalize">{log.resourceType || 'system'}</span>
                          {log.resourceId && (
                            <p className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">{log.resourceId}</p>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              log.outcome === 'success'
                                ? 'bg-emerald-100 text-emerald-800'
                                : log.outcome === 'failure'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {log.outcome}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-500 font-mono text-[11px]">{log.ip || '—'}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => toggleExpand(log._id)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                          >
                            <span>{expandedId === log._id ? 'Hide' : 'View'}</span>
                            {expandedId === log._id ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                          </button>
                        </td>
                      </tr>
                      {expandedId === log._id && (
                        <tr className="bg-slate-50/90 border-b border-slate-200">
                          <td colSpan={7} className="px-5 py-4">
                            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-100 pb-2">
                                <span>Request ID: <code className="font-mono">{log.requestId || 'N/A'}</code></span>
                                <span>Actor ID: <code className="font-mono">{log.actorId}</code></span>
                              </div>
                              <div>
                                <p className="text-[11px] font-semibold text-slate-600 mb-1">Redacted Change Summary:</p>
                                <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
                                  {JSON.stringify(log.summary || {}, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination controls */}
          {pagination.pages > 1 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Page {pagination.page} of {pagination.pages} ({pagination.total} total)
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
                >
                  Previous
                </button>
                <button
                  disabled={page >= pagination.pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-50 hover:bg-slate-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
