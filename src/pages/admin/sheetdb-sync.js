import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaServer,
    FaSync,
    FaCheckCircle,
    FaExclamationTriangle,
    FaTimesCircle,
    FaClock,
    FaSpinner,
    FaDatabase,
    FaFileAlt,
    FaArrowRight,
    FaInfoCircle,
    FaExclamationCircle,
    FaPlay,
    FaFilter,
} from 'react-icons/fa';

export default function SheetDBSyncDashboardPage() {
    const [stats, setStats] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Filters
    const [tabFilter, setTabFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const fetchSyncData = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: String(currentPage),
                limit: '20',
                tab: tabFilter,
                status: statusFilter,
            });

            const res = await fetch(`/api/admin/sheetdb-sync?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setStats(data.stats);
                setJobs(data.jobs || []);
                setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 1 });
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to load sync status' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    }, [currentPage, tabFilter, statusFilter]);

    useEffect(() => {
        fetchSyncData();
    }, [fetchSyncData]);

    const handleAction = async (action, jobId = null) => {
        setActionLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/sheetdb-sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ action, jobId }),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setMessage({ type: 'success', text: data.message });
                fetchSyncData();
            } else {
                setMessage({ type: 'error', text: data.message || 'Action failed' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setActionLoading(false);
        }
    };

    // Calculate Quota metrics
    const quota = stats?.quotaMetrics || {};
    const remaining = typeof quota.remainingRequests === 'number' ? quota.remainingRequests : null;
    const limit = typeof quota.limit === 'number' ? quota.limit : null;
    const usagePercent = (remaining !== null && limit) ? Math.round(((limit - remaining) / limit) * 100) : null;
    const isQuotaWarning = usagePercent !== null && usagePercent >= 70;
    const isQuotaCritical = usagePercent !== null && usagePercent >= 90;

    return (
        <AdminLayout title="SheetDB Synchronization">
            <div className="space-y-6">
                {/* Header Title & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                            <FaServer className="text-emerald-600" />
                            <span>SheetDB Synchronization Manager</span>
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">
                            Durable real-time replication of scholarship registrations, scorecard summaries, and feedback to Google Sheets.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleAction('retry_all')}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors shadow-xs"
                            title="Retry all pending and failed synchronization jobs"
                        >
                            {actionLoading ? <FaSpinner className="animate-spin text-xs" /> : <FaSync className="text-xs" />}
                            <span>Retry Pending/Failed</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAction('reconcile_missing')}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                            title="Find any unsynced MongoDB records and enqueue them"
                        >
                            {actionLoading ? <FaSpinner className="animate-spin text-xs" /> : <FaDatabase className="text-xs" />}
                            <span>Reconcile Unsynced</span>
                        </button>
                        <button
                            type="button"
                            onClick={fetchSyncData}
                            disabled={loading}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <FaSync className={`text-xs ${loading ? 'animate-spin text-emerald-600' : 'text-slate-500'}`} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Notifications / Alerts */}
                {message.text && (
                    <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between animate-fadeIn ${
                        message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                        <div className="flex items-center gap-2">
                            {message.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                            <span>{message.text}</span>
                        </div>
                        <button type="button" onClick={() => setMessage({ type: '', text: '' })} className="text-slate-400 hover:text-slate-600">
                            ✕
                        </button>
                    </div>
                )}

                {/* Quota Warning Banner */}
                {isQuotaWarning && (
                    <div className={`p-4 rounded-xl text-xs flex items-start gap-3 border shadow-xs animate-fadeIn ${
                        isQuotaCritical ? 'bg-rose-50 text-rose-900 border-rose-200' : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                        <FaExclamationTriangle className={`text-base shrink-0 mt-0.5 ${isQuotaCritical ? 'text-rose-600' : 'text-amber-600'}`} />
                        <div>
                            <h4 className="font-bold text-sm">
                                {isQuotaCritical ? 'Critical SheetDB Quota Alert (>90% Usage)' : 'SheetDB Free Tier Quota Notice (>70% Usage)'}
                            </h4>
                            <p className="mt-0.5 leading-relaxed">
                                Rate Limit Telemetry indicates <strong>{remaining}</strong> requests remaining out of {limit} ({usagePercent}% used).
                                If the quota is exhausted, registrations and exam scorecards will be safely held in the local MongoDB retry queue without data loss.
                            </p>
                        </div>
                    </div>
                )}

                {/* Secret-Free Configuration Readiness Banner */}
                {stats?.configStatus && (
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${stats.configStatus.ready ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <span className="font-bold text-slate-800">
                                SheetDB Environment ({stats.configStatus.environment || 'runtime'}):
                            </span>
                            <span className="font-mono text-[11px] text-slate-500">
                                {stats.sanitizedEndpoint || 'Endpoint Not Configured'}
                            </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${stats.configStatus.urlConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                                SHEETDB_URL: {stats.configStatus.urlConfigured ? 'SET' : 'MISSING'}
                            </span>
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${stats.configStatus.basicAuthConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                                BASIC AUTH: {stats.configStatus.basicAuthConfigured ? 'CONFIGURED' : 'NOT SET'}
                            </span>
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${stats.configStatus.cronSecretConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                                CRON_SECRET: {stats.configStatus.cronSecretConfigured ? 'CONFIGURED' : 'NOT SET'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Top Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sync Jobs</span>
                        <span className="text-xl font-bold text-slate-900 font-mono mt-1 block">
                            {stats?.overall?.total ?? 0}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">Queued across all tabs</span>
                    </div>

                    <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 shadow-xs">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Successfully Replicated</span>
                        <span className="text-xl font-bold text-emerald-800 font-mono mt-1 block">
                            {stats?.overall?.completed ?? 0}
                        </span>
                        <span className="text-[10px] text-emerald-600 mt-0.5 block">Live in Google Sheets</span>
                    </div>

                    <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5 shadow-xs">
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Pending Replication</span>
                        <span className="text-xl font-bold text-amber-800 font-mono mt-1 block">
                            {stats?.overall?.pending ?? 0}
                        </span>
                        <span className="text-[10px] text-amber-600 mt-0.5 block">Queued in worker retry cycle</span>
                    </div>

                    <div className="rounded-xl border border-rose-200/80 bg-rose-50/40 p-3.5 shadow-xs">
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">Failed / Review</span>
                        <span className="text-xl font-bold text-rose-800 font-mono mt-1 block">
                            {(stats?.overall?.failed || 0) + (stats?.overall?.requiresReview || 0)}
                        </span>
                        <span className="text-[10px] text-rose-600 mt-0.5 block">Requires attention</span>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Live Sync</span>
                        <span className="text-xs font-bold text-slate-800 mt-1 block truncate">
                            {stats?.overall?.lastSuccessfulSync
                                ? new Date(stats.overall.lastSuccessfulSync).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                                : 'No live sync yet'}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5 block">Google Sheets replica status</span>
                    </div>
                </div>

                {/* 3 Tab Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Scholarship_Students */}
                    <div className="rounded-xl border border-blue-200/80 bg-linear-to-b from-blue-50/40 to-white p-4 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                <span>Scholarship_Students (32 Cols)</span>
                            </h3>
                            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                Tab A
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-slate-500 block">Total</span>
                                <span className="text-sm font-bold text-slate-900 font-mono">{stats?.perTab?.Scholarship_Students?.total ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-emerald-600 block">Synced</span>
                                <span className="text-sm font-bold text-emerald-700 font-mono">{stats?.perTab?.Scholarship_Students?.completed ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-amber-600 block">Pending</span>
                                <span className="text-sm font-bold text-amber-700 font-mono">
                                    {(stats?.perTab?.Scholarship_Students?.pending ?? 0) + (stats?.perTab?.Scholarship_Students?.failed ?? 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scholarship_Results */}
                    <div className="rounded-xl border border-emerald-200/80 bg-linear-to-b from-emerald-50/40 to-white p-4 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                <span>Scholarship_Results (22 Cols)</span>
                            </h3>
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                                Tab B
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-slate-500 block">Total</span>
                                <span className="text-sm font-bold text-slate-900 font-mono">{stats?.perTab?.Scholarship_Results?.total ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-emerald-600 block">Synced</span>
                                <span className="text-sm font-bold text-emerald-700 font-mono">{stats?.perTab?.Scholarship_Results?.completed ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-amber-600 block">Pending</span>
                                <span className="text-sm font-bold text-amber-700 font-mono">
                                    {(stats?.perTab?.Scholarship_Results?.pending ?? 0) + (stats?.perTab?.Scholarship_Results?.failed ?? 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Scholarship_Feedback */}
                    <div className="rounded-xl border border-purple-200/80 bg-linear-to-b from-purple-50/40 to-white p-4 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-xs text-purple-900 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-purple-600" />
                                <span>Scholarship_Feedback (12 Cols)</span>
                            </h3>
                            <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                                Tab C
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-slate-500 block">Total</span>
                                <span className="text-sm font-bold text-slate-900 font-mono">{stats?.perTab?.Scholarship_Feedback?.total ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-emerald-600 block">Synced</span>
                                <span className="text-sm font-bold text-emerald-700 font-mono">{stats?.perTab?.Scholarship_Feedback?.completed ?? 0}</span>
                            </div>
                            <div className="bg-white rounded-lg p-2 border border-slate-100">
                                <span className="text-[10px] text-amber-600 block">Pending</span>
                                <span className="text-sm font-bold text-amber-700 font-mono">
                                    {(stats?.perTab?.Scholarship_Feedback?.pending ?? 0) + (stats?.perTab?.Scholarship_Feedback?.failed ?? 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 font-bold text-slate-700">
                            <FaFilter className="text-slate-400 text-xs" />
                            <span>Filters:</span>
                        </div>

                        <select
                            value={tabFilter}
                            onChange={(e) => { setTabFilter(e.target.value); setCurrentPage(1); }}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        >
                            <option value="all">All Destination Tabs</option>
                            <option value="Scholarship_Students">Scholarship_Students</option>
                            <option value="Scholarship_Results">Scholarship_Results</option>
                            <option value="Scholarship_Feedback">Scholarship_Feedback</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                        >
                            <option value="all">All Sync Statuses</option>
                            <option value="completed">Completed (Synced)</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="requires_review">Requires Review</option>
                        </select>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium">
                        Showing {jobs.length} of {pagination.total} sync jobs
                    </div>
                </div>

                {/* Sync Jobs Table */}
                <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                    {loading ? (
                        <div className="py-16 text-center">
                            <FaSpinner className="animate-spin text-2xl text-emerald-600 mx-auto mb-2" />
                            <p className="text-xs font-semibold text-slate-500">Loading sync queue…</p>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="py-16 text-center">
                            <FaCheckCircle className="text-3xl text-emerald-400 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-slate-700">Queue is completely synchronized</p>
                            <p className="text-xs text-slate-400 mt-1">No pending or failed jobs match the current filter.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        <th className="py-3 px-4">Job ID / Reference</th>
                                        <th className="py-3 px-4">Destination Tab</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                        <th className="py-3 px-4 text-center">Attempts</th>
                                        <th className="py-3 px-4">Last Error / Message</th>
                                        <th className="py-3 px-4">Timestamps</th>
                                        <th className="py-3 px-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {jobs.map((job) => {
                                        const statusColor =
                                            job.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                                            job.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                            job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-rose-100 text-rose-800';

                                        return (
                                            <tr key={job._id} className="hover:bg-slate-50/70 transition-colors">
                                                <td className="py-3 px-4 font-mono">
                                                    <span className="font-bold text-slate-900 block">{job.jobId}</span>
                                                    <span className="text-[10px] text-slate-400 block font-sans">Ref: {job.recordReferenceId}</span>
                                                </td>

                                                <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                                                    {job.destinationTab}
                                                </td>

                                                <td className="py-3 px-4 text-center whitespace-nowrap">
                                                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${statusColor}`}>
                                                        {job.status}
                                                    </span>
                                                </td>

                                                <td className="py-3 px-4 text-center font-mono font-bold text-slate-700">
                                                    {job.attemptCount} / {job.maxAttempts}
                                                </td>

                                                <td className="py-3 px-4 max-w-xs truncate text-[11px] text-slate-600">
                                                    {job.lastErrorMessage ? (
                                                        <span className="text-rose-700 font-mono text-[10px] block truncate">
                                                            [{job.lastErrorCode}] {job.lastErrorMessage}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 italic">None (Synchronized)</span>
                                                    )}
                                                </td>

                                                <td className="py-3 px-4 text-[10px] text-slate-500 whitespace-nowrap">
                                                    <span>Created: {new Date(job.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {job.successfulSyncTimestamp && (
                                                        <span className="text-emerald-700 block">
                                                            Synced: {new Date(job.successfulSyncTimestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setSelectedJob(job)}
                                                            className="px-2 py-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 text-[10px] font-semibold"
                                                        >
                                                            Inspect
                                                        </button>
                                                        {job.status !== 'completed' && (
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAction('retry_job', job._id)}
                                                                disabled={actionLoading}
                                                                className="px-2 py-1 rounded bg-amber-500 text-white hover:bg-amber-600 text-[10px] font-bold"
                                                            >
                                                                Retry
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Inspect Modal */}
                {selectedJob && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                    <h3 className="font-bold text-sm text-slate-900">Job Inspection: {selectedJob.jobId}</h3>
                                    <span className="text-xs text-slate-500">Destination: {selectedJob.destinationTab}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(null)}
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                    <div><strong>Status:</strong> <span className="capitalize">{selectedJob.status}</span></div>
                                    <div><strong>Attempts:</strong> {selectedJob.attemptCount} / {selectedJob.maxAttempts}</div>
                                    <div><strong>Record ID:</strong> <span className="font-mono">{selectedJob.recordReferenceId}</span></div>
                                    <div><strong>Next Retry:</strong> {selectedJob.nextRetryTime ? new Date(selectedJob.nextRetryTime).toLocaleString('en-IN') : 'N/A'}</div>
                                    {selectedJob.lastErrorCode && <div className="col-span-2 text-rose-700"><strong>Error:</strong> [{selectedJob.lastErrorCode}] {selectedJob.lastErrorMessage}</div>}
                                </div>

                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">Payload Sent to SheetDB:</h4>
                                    <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-60">
                                        {JSON.stringify(selectedJob.payload, null, 2)}
                                    </pre>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedJob(null)}
                                    className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
