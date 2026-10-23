import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaSearch,
    FaChartBar,
    FaTrash,
    FaSpinner,
    FaTrophy,
    FaUsers,
    FaPercent,
    FaCalendarAlt,
    FaEye,
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaArrowUp,
    FaClock,
    FaGraduationCap
} from 'react-icons/fa';

export default function AdminScholarshipResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [statistics, setStatistics] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [selectedResult, setSelectedResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchResults();
    }, [pagination.page, searchQuery, statusFilter]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: pagination.page,
                limit: 20,
                search: searchQuery,
                status: statusFilter
            });

            const response = await fetch(`/api/admin/scholarship-results?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results);
                setPagination(data.pagination);
                setStatistics(data.statistics);
            }
        } catch (error) {
            console.error('Failed to fetch results:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteResult = async (id) => {
        if (!confirm('Are you sure you want to delete this result?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/scholarship-results?id=${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.ok) {
                setResults(results.filter(r => r._id !== id));
                setShowModal(false);
            }
        } catch (error) {
            console.error('Failed to delete result:', error);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout title="Scholarship Results">
            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Registrations</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <FaUsers className="text-indigo-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-green-600 flex items-center gap-1">
                            <FaArrowUp />
                            <span>{statistics.last7Days} in last 7 days</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Completed Tests</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.completed}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                            Avg Score: {statistics.avgScore}%
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Highest Score</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.highestScore}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FaTrophy className="text-yellow-600 text-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">In Progress</p>
                                <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.inProgress}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaClock className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search student, email, or token..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white font-medium text-gray-700"
                >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                </select>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <FaSpinner className="animate-spin text-4xl text-red-600" />
                    </div>
                ) : results.length === 0 ? (
                    <div className="text-center py-12">
                        <FaChartBar className="text-5xl text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No scholarship results found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Student</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Token</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Score</th>
                                    <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Date</th>
                                    <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {results.map((session) => (
                                    <tr key={session._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-bold text-gray-800">{session.studentId?.name || 'Unknown'}</p>
                                                <p className="text-xs text-gray-400 font-medium">{session.studentId?.studentEmail || '-'}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {session.registrationToken}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${session.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    session.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                        session.status === 'expired' ? 'bg-red-100 text-red-700' :
                                                            'bg-gray-100 text-gray-600'
                                                }`}>
                                                {session.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-800">
                                                    {session.status === 'completed' ? `${session.score}/${session.totalQuestions}` : '-'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                                            {formatDate(session.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedResult(session); setShowModal(true); }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => deleteResult(session._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <FaTrash />
                                                </button>
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
                            Page {pagination.page} of {pagination.pages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.pages}
                                className="px-4 py-2 border rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {showModal && selectedResult && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b flex items-center justify-between sticky top-0 bg-white">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Student Details</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Registration Token: {selectedResult.registrationToken}</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8 mb-10">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</label>
                                    <p className="text-lg font-bold text-gray-800">{selectedResult.studentId?.name || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
                                    <p className="text-lg font-bold text-gray-800">{selectedResult.studentId?.studentMobile || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Admission For</label>
                                    <p className="text-lg font-bold text-gray-800">{selectedResult.studentId?.admissionCourse || '-'}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Plus Two Group</label>
                                    <p className="text-lg font-bold text-gray-800">{selectedResult.studentId?.plus2Group || '-'}</p>
                                </div>
                            </div>

                            {selectedResult.status === 'completed' && (
                                <div className="bg-slate-900 rounded-3xl p-8 mb-10 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-3xl"></div>
                                    <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-3xl font-black text-red-500">{selectedResult.score}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Correct</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-white">{selectedResult.totalQuestions}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black text-green-500">{Math.round((selectedResult.score / selectedResult.totalQuestions) * 100)}%</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Percentage</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={() => deleteResult(selectedResult._id)}
                                    className="flex-1 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Delete Record
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-colors"
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
