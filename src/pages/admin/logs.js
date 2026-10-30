import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaServer,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSearch,
  FaSpinner,
  FaMemory,
  FaDatabase,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

export default function AdminErrorLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monitoring, setMonitoring] = useState(null);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [resolvedFilter, setResolvedFilter] = useState('false');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    fetchLogs();
    fetchMonitoring();
  }, [severityFilter, resolvedFilter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({ limit: 40 });
      if (severityFilter !== 'all') params.append('severity', severityFilter);
      if (resolvedFilter !== 'all') params.append('resolved', resolvedFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error('Fetch error logs error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonitoring = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/monitoring', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMonitoring(data);
      }
    } catch (err) {
      console.error('Fetch monitoring error:', err);
    }
  };

  const handleToggleResolve = async (id, currentResolved) => {
    setResolvingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/logs', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, resolved: !currentResolved }),
      });
      if (res.ok) {
        fetchLogs();
        fetchMonitoring();
      }
    } catch (err) {
      console.error('Toggle resolve error:', err);
    } finally {
      setResolvingId(null);
    }
  };

  const formatUptime = (seconds = 0) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d > 0 ? `${d}d ` : ''}${h}h ${m}m`;
  };

  return (
    <AdminLayout title="System Logs & Health Monitoring">
      <div className="space-y-6">
        {/* Health Monitoring Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Database Engine</span>
              <FaDatabase className="text-emerald-600 text-sm" />
            </div>
            <p className="text-xl font-bold text-slate-800 capitalize">
              {monitoring?.database?.status || 'Connected'}
            </p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">
              Host: {monitoring?.database?.host || 'MongoDB'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Unresolved Errors</span>
              <FaExclamationTriangle className="text-rose-500 text-sm" />
            </div>
            <p className="text-xl font-bold text-slate-800">
              {monitoring?.errors?.unresolvedTotal || 0}
            </p>
            <p className="text-[11px] text-rose-600 font-medium mt-0.5">
              {monitoring?.errors?.last24Hours || 0} occurrences in last 24h
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Node.js Runtime</span>
              <FaServer className="text-indigo-600 text-sm" />
            </div>
            <p className="text-xl font-bold text-slate-800">
              {monitoring?.runtime?.nodeVersion || process.version}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Uptime: {formatUptime(monitoring?.runtime?.uptimeSeconds)}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Server Memory</span>
              <FaMemory className="text-teal-600 text-sm" />
            </div>
            <p className="text-xl font-bold text-slate-800">
              {monitoring?.runtime?.memoryHeapUsedMb || 0} MB
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              RSS: {monitoring?.runtime?.memoryRssMb || 0} MB
            </p>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {['false', 'true', 'all'].map((val) => (
              <button
                key={val}
                onClick={() => setResolvedFilter(val)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  resolvedFilter === val
                    ? 'bg-white text-slate-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {val === 'false' ? 'Unresolved' : val === 'true' ? 'Resolved' : 'All Issues'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>

            <div className="relative w-48 sm:w-60">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search error message, path..."
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Errors Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : logs.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <FaCheckCircle className="text-4xl text-emerald-400 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No application exceptions matching this filter</p>
              <p className="mt-1">Backend error interceptor is healthy and watching for uncaught issues.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Severity</th>
                    <th className="px-5 py-3.5">Exception Message</th>
                    <th className="px-5 py-3.5">Path & Method</th>
                    <th className="px-5 py-3.5">Occurrences</th>
                    <th className="px-5 py-3.5">Last Seen</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.map((log) => (
                    <>
                      <tr key={log._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              log.severity === 'critical'
                                ? 'bg-rose-100 text-rose-800'
                                : log.severity === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {log.severity}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 max-w-xs">
                          <p className="font-bold text-slate-800 line-clamp-1">{log.message || 'Unknown error'}</p>
                          <span className="text-[10px] text-slate-400 font-mono">
                            FP: {log.fingerprint} • Module: {log.module}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            {log.method}
                          </span>
                          <span className="font-mono text-[11px] text-slate-500 ml-1.5 truncate max-w-[150px] inline-block align-middle">
                            {log.path}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-700">
                          {log.occurrences || 1}x
                        </td>
                        <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                          {log.lastSeenAt ? new Date(log.lastSeenAt).toLocaleString() : ''}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              log.resolved
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800 font-bold'
                            }`}
                          >
                            {log.resolved ? 'Resolved' : 'Active'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => handleToggleResolve(log._id, log.resolved)}
                              disabled={resolvingId === log._id}
                              className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                log.resolved
                                  ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  : 'bg-emerald-600 text-white hover:bg-emerald-500'
                              }`}
                            >
                              {log.resolved ? 'Reopen' : 'Resolve'}
                            </button>
                            <button
                              onClick={() => setExpandedId(expandedId === log._id ? null : log._id)}
                              className="text-slate-400 hover:text-slate-600 p-1"
                            >
                              {expandedId === log._id ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === log._id && (
                        <tr className="bg-slate-50/90 border-b border-slate-200">
                          <td colSpan={7} className="px-5 py-4">
                            <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-100 pb-2">
                                <span>Request Correlation ID: <code className="font-mono text-blue-600">{log.requestId || 'N/A'}</code></span>
                                <span>First Seen: <code className="font-mono">{log.firstSeenAt ? new Date(log.firstSeenAt).toLocaleString() : 'N/A'}</code></span>
                              </div>
                              {log.stack ? (
                                <div>
                                  <p className="text-[11px] font-semibold text-slate-600 mb-1">Redacted Stack Trace:</p>
                                  <pre className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[10px] overflow-x-auto whitespace-pre-wrap max-h-56">
                                    {log.stack}
                                  </pre>
                                </div>
                              ) : (
                                <p className="text-slate-400 italic text-[11px]">No stack trace recorded for this issue</p>
                              )}
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
        </div>
      </div>
    </AdminLayout>
  );
}
