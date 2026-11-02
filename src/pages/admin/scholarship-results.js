import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaSearch,
    FaChartBar,
    FaTrash,
    FaSpinner,
    FaTrophy,
    FaUsers,
    FaEye,
    FaTimes,
    FaCheckCircle,
    FaArrowUp,
    FaClock,
    FaDownload,
    FaFileExcel,
    FaFileCsv,
    FaFilePdf,
    FaSync,
    FaStar,
    FaExclamationTriangle,
    FaCommentDots,
} from 'react-icons/fa';

export default function AdminScholarshipResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState('');
    const [detailLoading, setDetailLoading] = useState(false);
    const [activeView, setActiveView] = useState('all'); // 'all' | 'results' | 'feedback'
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [statistics, setStatistics] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bannerError, setBannerError] = useState('');

    const fetchResults = useCallback(async (forceRefresh = false) => {
        setLoading(true);
        setBannerError('');
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: String(pagination.page),
                limit: '20',
                search: searchQuery,
                status: statusFilter,
                view: activeView,
            });
            if (forceRefresh) params.set('refresh', 'true');

            const response = await fetch(`/api/admin/scholarship-results?${params}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setResults(data.results || []);
                setPagination(data.pagination || { page: 1, pages: 1, total: 0 });
                setStatistics(data.statistics || null);
            } else {
                setBannerError(data.message || 'Failed to load scholarship records');
            }
        } catch (error) {
            setBannerError('Unable to reach server while loading scholarship records.');
        } finally {
            setLoading(false);
        }
    }, [pagination.page, searchQuery, statusFilter, activeView]);

    useEffect(() => {
        fetchResults(false);
    }, [fetchResults]);

    const openCandidateDetail = async (session) => {
        setSelectedResult(session);
        setShowModal(true);
        if (!session?.registrationToken) return;

        setDetailLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(
                `/api/admin/scholarship-results?detailToken=${encodeURIComponent(session.registrationToken)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await res.json();
            if (res.ok && data.success && data.candidate) {
                setSelectedResult(data.candidate);
            }
        } catch {
            // Keep existing row summary if detail enrichment fails
        } finally {
            setDetailLoading(false);
        }
    };

    const handleExport = async (format) => {
        setExporting(format);
        setBannerError('');
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                export: format,
                view: activeView,
                status: statusFilter,
                search: searchQuery,
            });
            const res = await fetch(`/api/admin/scholarship-results?${params}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                setBannerError(errData.message || `Export (${format.toUpperCase()}) failed`);
                return;
            }
            const blob = await res.blob();
            const disposition = res.headers.get('Content-Disposition') || '';
            const match = disposition.match(/filename="([^"]+)"/);
            const filename = match ? match[1] : `Rasi_Scholarship_${activeView}.${format}`;

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setBannerError(`Unable to download ${format.toUpperCase()} export.`);
        } finally {
            setExporting('');
        }
    };

    const downloadScorecardPdf = async (registrationToken) => {
        if (!registrationToken) return;
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(
                `/api/scholarship/download-result?token=${encodeURIComponent(registrationToken)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                setBannerError(err.message || 'Unable to generate candidate scorecard PDF');
                return;
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Rasi_Scorecard_${registrationToken}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch {
            setBannerError('Unable to download candidate scorecard PDF.');
        }
    };

    const deleteRuntimeSession = async (id) => {
        if (!confirm('Remove this transient active/expired runtime exam session? Authoritative SheetDB rows are preserved.')) {
            return;
        }
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/scholarship-results?id=${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json().catch(() => ({}));
            if (response.ok) {
                setShowModal(false);
                fetchResults(true);
            } else {
                setBannerError(data.message || 'Unable to delete session');
            }
        } catch {
            setBannerError('Failed to delete runtime session.');
        }
    };

    const formatDate = (dateVal) => {
        if (!dateVal) return '-';
        const d = new Date(dateVal);
        if (Number.isNaN(d.getTime())) return String(dateVal);
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout title="Scholarship Candidates & Results">
            {/* SheetDB Connectivity Warning */}
            {statistics && statistics.sheetdbHealthy === false && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900 text-xs">
                    <FaExclamationTriangle className="text-amber-600 text-base shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold text-sm">SheetDB Connectivity Warning</p>
                        <p className="mt-0.5">
                            Live Google Sheets synchronization reported an issue ({(statistics.sheetdbErrors || []).join('; ') || 'check SheetDB credentials'}).
                            Showing cached/fallback records until connectivity resumes.
                        </p>
                    </div>
                </div>
            )}

            {bannerError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between text-red-800 text-xs font-semibold">
                    <span>{bannerError}</span>
                    <button onClick={() => setBannerError('')} className="text-red-500 hover:text-red-700">✕</button>
                </div>
            )}

            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-semibold">Total Registrations</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.total}</p>
                            </div>
                            <div className="w-11 h-11 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-indigo-600 text-lg" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-green-600 flex items-center gap-1 font-medium">
                            <FaArrowUp />
                            <span>{statistics.last7Days} in last 7 days</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-semibold">Completed Scorecards</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.completed}</p>
                            </div>
                            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-green-600 text-lg" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 font-medium">
                            Avg Score: {statistics.avgScore}%
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-semibold">Highest Score</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.highestScore}/60</p>
                            </div>
                            <div className="w-11 h-11 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-yellow-600 text-lg" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 font-medium">
                            Registered Only: {statistics.registered ?? 0}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-semibold">Active Exams</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.inProgress}</p>
                            </div>
                            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaClock className="text-blue-600 text-lg" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500 font-medium">
                            Expired Unsubmitted: {statistics.expired ?? 0}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-xs font-semibold">Exam Feedback</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.feedbackCount ?? 0}</p>
                            </div>
                            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaCommentDots className="text-purple-600 text-lg" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-amber-600 flex items-center gap-1 font-medium">
                            <FaStar />
                            <span>Avg Rating: {statistics.avgFeedbackRating || 0} / 5</span>
                        </div>
                    </div>
                </div>
            )}

            {/* View Tabs & Export Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div className="inline-flex bg-white p-1 rounded-xl border border-gray-200 shadow-xs">
                    {[
                        { id: 'all', label: 'All Candidates' },
                        { id: 'results', label: 'Completed Scorecards' },
                        { id: 'feedback', label: 'Exam Feedback' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => {
                                setActiveView(tab.id);
                                setPagination((prev) => ({ ...prev, page: 1 }));
                            }}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                                activeView === tab.id
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleExport('xlsx')}
                        disabled={Boolean(exporting)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-60"
                    >
                        {exporting === 'xlsx' ? <FaSpinner className="animate-spin" /> : <FaFileExcel />}
                        <span>Export XLSX</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleExport('csv')}
                        disabled={Boolean(exporting)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-60"
                    >
                        {exporting === 'csv' ? <FaSpinner className="animate-spin" /> : <FaFileCsv />}
                        <span>Export CSV</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleExport('pdf')}
                        disabled={Boolean(exporting)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-60"
                    >
                        {exporting === 'pdf' ? <FaSpinner className="animate-spin" /> : <FaFilePdf />}
                        <span>Export PDF</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => fetchResults(true)}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold transition-colors"
                    >
                        <FaSync className={loading ? 'animate-spin text-red-600' : ''} />
                        <span>Refresh SheetDB</span>
                    </button>
                </div>
            </div>

            {/* Search & Status Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={
                            activeView === 'feedback'
                                ? 'Search feedback by student name, application number, or comment...'
                                : 'Search candidate name, mobile, email, college, district, or token...'
                        }
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPagination((prev) => ({ ...prev, page: 1 }));
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
                    />
                </div>
                {activeView !== 'feedback' && (
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPagination((prev) => ({ ...prev, page: 1 }));
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white font-medium text-gray-700 text-sm"
                    >
                        <option value="all">All Statuses</option>
                        <option value="registered">Registered (Exam Not Started)</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="expired">Expired</option>
                    </select>
                )}
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-red-600" />
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-12">
                        <FaChartBar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No scholarship records match the current filter</p>
                    </div>
                ) : activeView === 'feedback' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Student</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Token</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Rating</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Difficulty</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Comments</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {results.map((fb) => (
                                    <tr key={fb._id || fb.feedbackReferenceId} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">{fb.studentName || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {fb.registrationToken}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1 font-bold text-amber-600 text-sm">
                                                <FaStar /> {fb.overallRating}/5
                                            </span>
                                            <span className="block text-[11px] text-gray-400">
                                                Clarity: {fb.clarityRating}/5 · UX: {fb.uiRating}/5
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 capitalize text-xs font-semibold text-gray-700">
                                            {fb.difficultyRating || '-'} ({fb.language || 'English'})
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-600 max-w-md">
                                            {fb.comments || <span className="italic text-gray-400">No written comment</span>}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{formatDate(fb.submittedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Candidate</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Application No</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Preferred Course / College</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Score</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Date</th>
                                    <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {results.map((session) => (
                                    <tr key={session._id || session.registrationToken} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-gray-800 text-sm">{session.studentId?.name || 'Unknown'}</p>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {session.studentId?.studentMobile || '-'}
                                                {session.studentId?.studentEmail ? ` · ${session.studentId.studentEmail}` : ''}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {session.registrationToken}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-gray-700 truncate max-w-xs">
                                                {session.studentId?.admissionCourse || '-'}
                                            </p>
                                            <p className="text-[11px] text-gray-400 truncate max-w-xs">
                                                {session.studentId?.collegeName || session.studentId?.preferredDistrict || '-'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                    session.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : session.status === 'in_progress'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : session.status === 'expired'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-amber-50 text-amber-700'
                                                }`}
                                            >
                                                {(session.status || 'registered').replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {session.status === 'completed' ? (
                                                <div>
                                                    <span className="font-bold text-gray-800 text-sm">
                                                        {session.score}/{session.totalQuestions}
                                                    </span>
                                                    <span className="ml-1.5 text-xs font-semibold text-emerald-600">
                                                        ({session.percentage ?? Math.round((session.score / (session.totalQuestions || 60)) * 100)}%)
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                                            {formatDate(session.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => openCandidateDetail(session)}
                                                    title="View Full Candidate Details"
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <FaEye />
                                                </button>
                                                {session.status === 'completed' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => downloadScorecardPdf(session.registrationToken)}
                                                        title="Download Official Scorecard PDF"
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                    >
                                                        <FaDownload />
                                                    </button>
                                                )}
                                                {(session.status === 'in_progress' || session.status === 'expired') && (
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteRuntimeSession(session._id)}
                                                        title="Clear Runtime Session"
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="p-4 border-t flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Page {pagination.page} of {pagination.pages} ({pagination.total} records)
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.pages}
                                className="px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Full Candidate & Scorecard Detail Modal */}
            {showModal && selectedResult && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">
                                    {selectedResult.studentId?.name || 'Candidate Profile'}
                                </h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                    Application No: {selectedResult.registrationToken} · Source: {selectedResult.source || 'sheetdb'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="w-9 h-9 bg-gray-100 text-gray-500 hover:text-red-600 rounded-xl flex items-center justify-center transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {detailLoading && (
                                <div className="text-xs text-gray-400 flex items-center gap-2">
                                    <FaSpinner className="animate-spin" /> Loading full candidate details...
                                </div>
                            )}

                            {/* Personal & Contact Info */}
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-red-600 mb-3">
                                    Personal & Contact Information
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4 text-xs">
                                    <div>
                                        <span className="text-gray-400 font-bold block">Student Mobile</span>
                                        <span className="font-bold text-gray-800">{selectedResult.studentId?.studentMobile || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Email</span>
                                        <span className="font-bold text-gray-800 break-all">{selectedResult.studentId?.studentEmail || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Gender / DOB</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.studentId?.gender || '-'} · {selectedResult.studentId?.dateOfBirth || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Father / Guardian</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.studentId?.fatherName || '-'} ({selectedResult.studentId?.fatherMobile || '-'})
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Community</span>
                                        <span className="font-bold text-gray-800">{selectedResult.studentId?.community || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Aadhaar (Masked)</span>
                                        <span className="font-mono font-bold text-gray-800">{selectedResult.studentId?.maskedAadhaar || 'Not Provided'}</span>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <span className="text-gray-400 font-bold block">Address</span>
                                        <span className="font-semibold text-gray-700">{selectedResult.studentId?.address || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Academic & Admission Preferences */}
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-red-600 mb-3">
                                    Academic & Admission Preferences
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4 text-xs">
                                    <div>
                                        <span className="text-gray-400 font-bold block">Class & Board</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.studentId?.currentClass || '-'} ({selectedResult.studentId?.board || '-'})
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">+2 Group & Roll No</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.studentId?.plus2Group || '-'} · {selectedResult.studentId?.plus2ExamNumber || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Expected Cut-Off</span>
                                        <span className="font-bold text-gray-800">{selectedResult.studentId?.expectedCutOff ?? '-'} / 200</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="text-gray-400 font-bold block">School</span>
                                        <span className="font-bold text-gray-800">{selectedResult.studentId?.lastStudiedSchool || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Special Quota Flags</span>
                                        <span className="font-bold text-gray-800">
                                            Govt School: {selectedResult.studentId?.studiedInGovtSchool ? 'Yes' : 'No'} · First Grad: {selectedResult.studentId?.firstGenerationGraduate ? 'Yes' : 'No'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Preferred District</span>
                                        <span className="font-bold text-gray-800">{selectedResult.studentId?.preferredDistrict || '-'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Choice 1 College & Course</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.studentId?.collegeName || '-'} — {selectedResult.studentId?.admissionCourse || '-'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 font-bold block">Exam Medium & Elective</span>
                                        <span className="font-bold text-gray-800">
                                            {selectedResult.language || selectedResult.studentId?.examLanguage || 'English'} · {selectedResult.optionalSubject || selectedResult.studentId?.selectedElective || '-'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Completed Scorecard Breakdown */}
                            {selectedResult.status === 'completed' && (
                                <div className="bg-slate-900 rounded-2xl p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-red-400">
                                            Official Examination Scorecard
                                        </h4>
                                        <span className="text-xs text-slate-400">
                                            Time Taken: {selectedResult.timeTakenMinutes ?? selectedResult.result?.timeTaken ?? 0} mins
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mb-4">
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <p className="text-2xl font-black text-emerald-400">
                                                {selectedResult.score}/{selectedResult.totalQuestions}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Total Score</p>
                                        </div>
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <p className="text-2xl font-black text-white">
                                                {selectedResult.percentage ?? Math.round((selectedResult.score / (selectedResult.totalQuestions || 60)) * 100)}%
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Percentage</p>
                                        </div>
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <p className="text-2xl font-black text-blue-400">
                                                {selectedResult.attemptedQuestions ?? selectedResult.result?.attemptedQuestions ?? '-'}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Attempted</p>
                                        </div>
                                        <div className="bg-slate-800/80 rounded-xl p-3">
                                            <p className="text-2xl font-black text-rose-400">
                                                {selectedResult.wrongAnswers ?? selectedResult.result?.wrongAnswers ?? '-'}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Wrong</p>
                                        </div>
                                    </div>
                                    {selectedResult.result?.subjectWiseScores && (
                                        <div className="grid grid-cols-3 gap-3 text-center text-xs">
                                            {selectedResult.result.subjectWiseScores.map((s) => (
                                                <div key={s.subject} className="bg-slate-800/50 rounded-lg p-2.5 border border-slate-700">
                                                    <span className="text-slate-300 font-bold block">{s.subject}</span>
                                                    <span className="text-white font-black text-sm">{s.correct}/{s.total}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Feedback Summary if submitted */}
                            {selectedResult.feedback && (
                                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 text-xs">
                                    <h4 className="font-black uppercase tracking-widest text-purple-700 mb-2">
                                        Candidate Feedback ({selectedResult.feedback.overallRating}/5 Stars · {selectedResult.feedback.difficultyRating})
                                    </h4>
                                    <p className="text-gray-700">
                                        {selectedResult.feedback.comments || 'No written comments submitted.'}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-2">
                                {selectedResult.status === 'completed' && (
                                    <button
                                        type="button"
                                        onClick={() => downloadScorecardPdf(selectedResult.registrationToken)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors"
                                    >
                                        <FaDownload />
                                        <span>Download Scorecard PDF</span>
                                    </button>
                                )}
                                {(selectedResult.status === 'in_progress' || selectedResult.status === 'expired') && (
                                    <button
                                        type="button"
                                        onClick={() => deleteRuntimeSession(selectedResult._id)}
                                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-colors"
                                    >
                                        Clear Runtime Session
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200 transition-colors ml-auto"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
