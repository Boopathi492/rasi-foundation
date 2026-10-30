import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaSearch,
    FaPlus,
    FaFileDownload,
    FaFileUpload,
    FaEye,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaSpinner,
    FaAtom,
    FaFlask,
    FaCalculator,
    FaDna,
    FaBook,
    FaExclamationCircle,
    FaClone,
    FaToggleOn,
    FaToggleOff,
    FaArrowLeft,
    FaArrowRight,
    FaCogs,
    FaHeartbeat,
    FaCheckCircle,
    FaExclamationTriangle,
    FaSave,
} from 'react-icons/fa';

export default function AdminQuestionBankPage() {
    const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'config'

    // Question Bank state
    const [questions, setQuestions] = useState([]);
    const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1, limit: 20 });
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        approved: 0,
        pending: 0,
        rejected: 0,
        subjects: {},
        difficulties: {},
    });
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filters
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');
    const [difficultyFilter, setDifficultyFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [approvalFilter, setApprovalFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Modals
    const [previewQuestion, setPreviewQuestion] = useState(null);
    const [previewLang, setPreviewLang] = useState('both'); // both, en, ta
    const [editQuestion, setEditQuestion] = useState(null);
    const [isAddMode, setIsAddMode] = useState(false);
    const [saving, setSaving] = useState(false);

    // Duplicates modal
    const [duplicatesModal, setDuplicatesModal] = useState(false);
    const [duplicatesData, setDuplicatesData] = useState(null);
    const [checkingDuplicates, setCheckingDuplicates] = useState(false);

    // Form state for Add/Edit Question
    const initialFormState = {
        code: '',
        subject: 'Physics',
        topic: '',
        difficulty: 'medium',
        questionText: '',
        questionTextTamil: '',
        options: [
            { label: 'A', text: '' },
            { label: 'B', text: '' },
            { label: 'C', text: '' },
            { label: 'D', text: '' },
        ],
        optionsTamil: [
            { label: 'A', text: '' },
            { label: 'B', text: '' },
            { label: 'C', text: '' },
            { label: 'D', text: '' },
        ],
        correctAnswer: 'A',
        explanation: '',
        explanationTamil: '',
        isActive: true,
        approvalStatus: 'approved',
    };
    const [formData, setFormData] = useState(initialFormState);

    // Exam Config & Health state
    const [examConfig, setExamConfig] = useState(null);
    const [healthReport, setHealthReport] = useState({});
    const [configLoading, setConfigLoading] = useState(false);
    const [configSaving, setConfigSaving] = useState(false);
    const [configMessage, setConfigMessage] = useState({ type: '', text: '' });

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('adminToken');
            const params = new URLSearchParams({
                page: String(currentPage),
                limit: '20',
                subject: subjectFilter,
                topic: topicFilter,
                difficulty: difficultyFilter,
                status: statusFilter,
                approvalStatus: approvalFilter,
                search: searchQuery,
            });

            const res = await fetch(`/api/admin/question-bank?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch question bank');
            }

            setQuestions(data.questions || []);
            setPagination(data.pagination || { total: 0, page: 1, pages: 1, limit: 20 });
            setStats(data.stats || {
                total: 0,
                active: 0,
                inactive: 0,
                approved: 0,
                pending: 0,
                rejected: 0,
                subjects: {},
                difficulties: {},
            });
            setTopics(data.topics || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage, subjectFilter, topicFilter, difficultyFilter, statusFilter, approvalFilter, searchQuery]);

    const fetchExamConfig = useCallback(async () => {
        setConfigLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/exam-config', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setExamConfig(data.config);
                setHealthReport(data.healthReport || {});
            }
        } catch (err) {
            console.error('Failed to load exam config:', err);
        } finally {
            setConfigLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'questions') {
            fetchQuestions();
        } else if (activeTab === 'config') {
            fetchExamConfig();
        }
    }, [activeTab, fetchQuestions, fetchExamConfig]);

    const handleToggleStatus = async (q) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/admin/question-bank/${q._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ isActive: !q.isActive }),
            });
            if (res.ok) {
                setQuestions(prev => prev.map(item => item._id === q._id ? { ...item, isActive: !item.isActive } : item));
                setStats(prev => ({
                    ...prev,
                    active: q.isActive ? prev.active - 1 : prev.active + 1,
                    inactive: q.isActive ? prev.inactive + 1 : prev.inactive - 1,
                }));
            }
        } catch (err) {
            console.error('Failed to toggle status:', err);
        }
    };

    const handleUpdateApproval = async (q, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/admin/question-bank/${q._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ approvalStatus: newStatus }),
            });
            if (res.ok) {
                setQuestions(prev => prev.map(item => item._id === q._id ? { ...item, approvalStatus: newStatus } : item));
                fetchQuestions();
            }
        } catch (err) {
            console.error('Failed to update approval status:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to deactivate this question? It will not appear in examinations.')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/admin/question-bank/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                fetchQuestions();
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const openAddModal = () => {
        const prefix = subjectFilter === 'Chemistry' ? 'CHE' : subjectFilter === 'Mathematics' ? 'MAT' : subjectFilter === 'Biology' ? 'BIO' : 'PHY';
        setFormData({
            ...initialFormState,
            code: `${prefix}-${String(pagination.total + 1).padStart(3, '0')}`,
            subject: subjectFilter !== 'all' ? subjectFilter : 'Physics',
            approvalStatus: 'approved',
        });
        setIsAddMode(true);
        setEditQuestion(true);
    };

    const openEditModal = (q) => {
        setFormData({
            _id: q._id,
            code: q.code,
            subject: q.subject,
            topic: q.topic || '',
            difficulty: q.difficulty || 'medium',
            questionText: q.questionText,
            questionTextTamil: q.questionTextTamil,
            options: q.options || initialFormState.options,
            optionsTamil: q.optionsTamil || initialFormState.optionsTamil,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || '',
            explanationTamil: q.explanationTamil || '',
            isActive: q.isActive,
            approvalStatus: q.approvalStatus || 'approved',
        });
        setIsAddMode(false);
        setEditQuestion(true);
    };

    const handleSaveQuestion = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = isAddMode ? '/api/admin/question-bank' : `/api/admin/question-bank/${formData._id}`;
            const method = isAddMode ? 'POST' : 'PATCH';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to save question');
            }

            setEditQuestion(null);
            fetchQuestions();
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleCheckDuplicates = async () => {
        setCheckingDuplicates(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/question-bank/duplicates', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setDuplicatesData(data);
            setDuplicatesModal(true);
        } catch (err) {
            alert('Failed to check duplicates');
        } finally {
            setCheckingDuplicates(false);
        }
    };

    const handleSaveExamConfig = async (e) => {
        e.preventDefault();
        setConfigSaving(true);
        setConfigMessage({ type: '', text: '' });
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch('/api/admin/exam-config', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(examConfig),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to save configuration');
            }

            setConfigMessage({ type: 'success', text: 'Exam configuration updated dynamically! Changes are active immediately for future exams.' });
            fetchExamConfig();
        } catch (err) {
            setConfigMessage({ type: 'error', text: err.message });
        } finally {
            setConfigSaving(false);
        }
    };

    const isAllHealthy = Object.values(healthReport).length > 0 && Object.values(healthReport).every(h => h.isHealthy);

    return (
        <AdminLayout title="Question Bank">
            <div className="space-y-6">
                {/* Header Title & Tab Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Scholarship Question Bank</h1>
                        <p className="text-xs text-slate-500 mt-1">
                            100% database-driven question bank, dynamic exam parameters, bilingual content, and live subject health verification.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab('questions')}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                activeTab === 'questions'
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <FaBook className="text-xs" />
                            <span>Question Bank ({stats.total})</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('config')}
                            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                activeTab === 'config'
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            <FaCogs className="text-xs" />
                            <span>Exam Settings & Health</span>
                            <span className={`inline-block h-2 w-2 rounded-full ${isAllHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        </button>
                    </div>
                </div>

                {/* TAB 1: QUESTION BANK */}
                {activeTab === 'questions' && (
                    <>
                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={openAddModal}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                                >
                                    <FaPlus className="text-xs" />
                                    <span>Add Question</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCheckDuplicates}
                                    disabled={checkingDuplicates}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    {checkingDuplicates ? <FaSpinner className="animate-spin text-xs" /> : <FaClone className="text-xs text-amber-600" />}
                                    <span>Check Duplicates</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { window.location.href = '/api/admin/question-bank/export?format=csv'; }}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <FaFileDownload className="text-xs text-slate-500" />
                                    <span>Export CSV</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { window.location.href = '/api/admin/question-bank/export?format=json'; }}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <FaFileDownload className="text-xs text-slate-500" />
                                    <span>Export JSON</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                                <span>Approved: <strong className="text-emerald-700">{stats.approved}</strong></span>
                                <span>Pending: <strong className="text-amber-700">{stats.pending}</strong></span>
                                <span>Active: <strong className="text-slate-900">{stats.active}</strong></span>
                                <span>Total: <strong className="text-slate-900">{stats.total}</strong></span>
                            </div>
                        </div>

                        {/* Filter Bar */}
                        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                                {/* Search */}
                                <div className="lg:col-span-2 relative">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                                    <input
                                        type="text"
                                        placeholder="Search by code, topic, text…"
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                        className="w-full rounded-lg border border-slate-200 pl-8 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <select
                                        value={subjectFilter}
                                        onChange={(e) => { setSubjectFilter(e.target.value); setTopicFilter('all'); setCurrentPage(1); }}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                    >
                                        <option value="all">All Subjects</option>
                                        <option value="Physics">Physics ({stats.subjects?.Physics || 0})</option>
                                        <option value="Chemistry">Chemistry ({stats.subjects?.Chemistry || 0})</option>
                                        <option value="Mathematics">Mathematics ({stats.subjects?.Mathematics || 0})</option>
                                        <option value="Biology">Biology ({stats.subjects?.Biology || 0})</option>
                                    </select>
                                </div>

                                {/* Difficulty */}
                                <div>
                                    <select
                                        value={difficultyFilter}
                                        onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentPage(1); }}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                    >
                                        <option value="all">All Difficulties</option>
                                        <option value="easy">Easy ({stats.difficulties?.easy || 0})</option>
                                        <option value="medium">Medium ({stats.difficulties?.medium || 0})</option>
                                        <option value="hard">Hard ({stats.difficulties?.hard || 0})</option>
                                    </select>
                                </div>

                                {/* Approval Status */}
                                <div>
                                    <select
                                        value={approvalFilter}
                                        onChange={(e) => { setApprovalFilter(e.target.value); setCurrentPage(1); }}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                    >
                                        <option value="all">Approval: All</option>
                                        <option value="approved">Approved ({stats.approved})</option>
                                        <option value="pending">Pending ({stats.pending})</option>
                                        <option value="rejected">Rejected ({stats.rejected})</option>
                                    </select>
                                </div>

                                {/* Active Status */}
                                <div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                                    >
                                        <option value="all">Status: All</option>
                                        <option value="active">Active Only ({stats.active})</option>
                                        <option value="inactive">Inactive Only ({stats.inactive})</option>
                                    </select>
                                </div>
                            </div>

                            {/* Topic Filter Pills */}
                            {topics.length > 0 && (
                                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-[11px]">
                                    <span className="font-bold text-slate-400 shrink-0">Topics:</span>
                                    <button
                                        type="button"
                                        onClick={() => { setTopicFilter('all'); setCurrentPage(1); }}
                                        className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                                            topicFilter === 'all'
                                                ? 'bg-slate-900 text-white font-bold'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        All Topics
                                    </button>
                                    {topics.slice(0, 12).map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => { setTopicFilter(t); setCurrentPage(1); }}
                                            className={`px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                                                topicFilter === t
                                                    ? 'bg-emerald-600 text-white font-bold'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Questions Table */}
                        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                            {loading ? (
                                <div className="py-20 text-center">
                                    <FaSpinner className="animate-spin text-2xl text-emerald-600 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-slate-500">Loading question bank…</p>
                                </div>
                            ) : questions.length === 0 ? (
                                <div className="py-16 text-center">
                                    <FaExclamationCircle className="text-3xl text-slate-300 mx-auto mb-2" />
                                    <p className="text-sm font-semibold text-slate-700">No questions found</p>
                                    <p className="text-xs text-slate-400 mt-1">Try relaxing your search terms or filters.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                                <th className="py-3 px-4">Code</th>
                                                <th className="py-3 px-4">Subject & Topic</th>
                                                <th className="py-3 px-4">Difficulty</th>
                                                <th className="py-3 px-4">Question (English & தமிழ்)</th>
                                                <th className="py-3 px-4 text-center">Key</th>
                                                <th className="py-3 px-4 text-center">Approval</th>
                                                <th className="py-3 px-4 text-center">Active</th>
                                                <th className="py-3 px-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {questions.map((q) => {
                                                const diffColor =
                                                    q.difficulty === 'easy' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                    q.difficulty === 'hard' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                                    'bg-amber-50 text-amber-700 border-amber-200';

                                                const approvalStatus = q.approvalStatus || 'approved';
                                                const approvalBadge =
                                                    approvalStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                                                    approvalStatus === 'rejected' ? 'bg-rose-100 text-rose-800' :
                                                    'bg-amber-100 text-amber-800';

                                                return (
                                                    <tr key={q._id} className="hover:bg-slate-50/70 transition-colors">
                                                        {/* Code */}
                                                        <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                                                            {q.code}
                                                        </td>

                                                        {/* Subject & Topic */}
                                                        <td className="py-3 px-4 whitespace-nowrap">
                                                            <span className="font-bold text-slate-800 block">{q.subject}</span>
                                                            <span className="text-[11px] text-slate-400 block">{q.topic || 'General'}</span>
                                                        </td>

                                                        {/* Difficulty */}
                                                        <td className="py-3 px-4 whitespace-nowrap">
                                                            <span className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold capitalize ${diffColor}`}>
                                                                {q.difficulty}
                                                            </span>
                                                        </td>

                                                        {/* Question Snippets */}
                                                        <td className="py-3 px-4 max-w-md">
                                                            <p className="font-medium text-slate-800 line-clamp-1">{q.questionText}</p>
                                                            <p className="text-[11px] text-slate-500 line-clamp-1 font-sans">{q.questionTextTamil}</p>
                                                        </td>

                                                        {/* Correct Answer */}
                                                        <td className="py-3 px-4 text-center font-bold text-emerald-700">
                                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                                                                {q.correctAnswer}
                                                            </span>
                                                        </td>

                                                        {/* Approval Status */}
                                                        <td className="py-3 px-4 text-center whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-1.5">
                                                                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${approvalBadge}`}>
                                                                    {approvalStatus}
                                                                </span>
                                                                {approvalStatus !== 'approved' && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUpdateApproval(q, 'approved')}
                                                                        className="h-5 w-5 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center"
                                                                        title="Approve Question"
                                                                    >
                                                                        <FaCheck className="text-[10px]" />
                                                                    </button>
                                                                )}
                                                                {approvalStatus !== 'rejected' && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleUpdateApproval(q, 'rejected')}
                                                                        className="h-5 w-5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center"
                                                                        title="Reject Question"
                                                                    >
                                                                        <FaTimes className="text-[10px]" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>

                                                        {/* Status Toggle */}
                                                        <td className="py-3 px-4 text-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleToggleStatus(q)}
                                                                className="text-lg focus:outline-none transition-transform hover:scale-110"
                                                                title={q.isActive ? 'Active (Click to deactivate)' : 'Inactive (Click to activate)'}
                                                            >
                                                                {q.isActive ? (
                                                                    <FaToggleOn className="text-emerald-600 inline" />
                                                                ) : (
                                                                    <FaToggleOff className="text-slate-300 inline" />
                                                                )}
                                                            </button>
                                                        </td>

                                                        {/* Actions */}
                                                        <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                                                            <button
                                                                type="button"
                                                                onClick={() => setPreviewQuestion(q)}
                                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                                title="Bilingual Preview"
                                                            >
                                                                <FaEye className="text-xs" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditModal(q)}
                                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-blue-600 hover:bg-blue-50"
                                                                title="Edit Question"
                                                            >
                                                                <FaEdit className="text-xs" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleDelete(q._id)}
                                                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-rose-600 hover:bg-rose-50"
                                                                title="Deactivate / Delete"
                                                            >
                                                                <FaTrash className="text-xs" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Pagination Footer */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-slate-200 bg-slate-50 text-xs">
                                <span className="text-slate-500">
                                    Showing <strong className="text-slate-900">{pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0}</strong> to{' '}
                                    <strong className="text-slate-900">{Math.min(pagination.page * pagination.limit, pagination.total)}</strong> of{' '}
                                    <strong className="text-slate-900">{pagination.total}</strong> questions
                                </span>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40"
                                    >
                                        <FaArrowLeft className="text-[10px]" />
                                        <span>Previous</span>
                                    </button>
                                    <span className="font-bold text-slate-700">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                    <button
                                        type="button"
                                        disabled={currentPage >= pagination.pages}
                                        onClick={() => setCurrentPage(p => Math.min(pagination.pages, p + 1))}
                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40"
                                    >
                                        <span>Next</span>
                                        <FaArrowRight className="text-[10px]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* TAB 2: EXAM CONFIGURATION & READINESS */}
                {activeTab === 'config' && (
                    <div className="space-y-6">
                        {configLoading ? (
                            <div className="py-20 text-center bg-white rounded-xl border border-slate-200 shadow-xs">
                                <FaSpinner className="animate-spin text-2xl text-emerald-600 mx-auto mb-2" />
                                <p className="text-xs font-semibold text-slate-500">Loading dynamic exam configuration & health report…</p>
                            </div>
                        ) : (
                            <>
                                {/* Overall Exam Readiness Indicator Banner */}
                                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                                    isAllHealthy
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                                        : 'bg-amber-50 border-amber-200 text-amber-900'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        {isAllHealthy ? (
                                            <FaCheckCircle className="text-2xl text-emerald-600 shrink-0" />
                                        ) : (
                                            <FaExclamationTriangle className="text-2xl text-amber-600 shrink-0" />
                                        )}
                                        <div>
                                            <h3 className="font-bold text-sm">
                                                {isAllHealthy ? 'Examination Engine: 100% Ready for Candidates' : 'Action Required: Subject Question Availability Alert'}
                                            </h3>
                                            <p className="text-xs mt-0.5 opacity-90">
                                                {isAllHealthy
                                                    ? 'All configured subject question banks meet or exceed examination quotas. Candidates can start examinations dynamically.'
                                                    : 'One or more subjects have insufficient active approved questions to fulfill exam quotas.'}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={fetchExamConfig}
                                        className="px-3 py-1.5 bg-white border border-current rounded-lg text-xs font-bold hover:shadow-xs transition-shadow shrink-0"
                                    >
                                        Refresh Health
                                    </button>
                                </div>

                                {/* Subject-by-Subject Health Cards */}
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                                        <FaHeartbeat className="text-rose-500" />
                                        <span>Subject Question Bank Availability & Quota Coverage</span>
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {Object.entries(healthReport).map(([subjName, health]) => (
                                            <div
                                                key={subjName}
                                                className={`p-4 rounded-xl border bg-white shadow-xs space-y-3 ${
                                                    health.isHealthy ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-slate-900 text-sm">{subjName}</span>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                        health.isHealthy ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                        {health.status}
                                                    </span>
                                                </div>

                                                <div className="space-y-1 text-xs text-slate-600">
                                                    <div className="flex justify-between">
                                                        <span>Required Quota:</span>
                                                        <strong className="text-slate-900">{health.requiredPerExam} Questions</strong>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Approved in Bank:</span>
                                                        <strong className="text-emerald-700">{health.approved} Available</strong>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Pending Review:</span>
                                                        <span className="text-amber-700 font-medium">{health.pending}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Inactive:</span>
                                                        <span className="text-slate-400 font-medium">{health.inactive}</span>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-slate-100">
                                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className={`h-full ${health.isHealthy ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                            style={{ width: `${Math.min(100, Math.round((health.approved / (health.requiredPerExam || 1)) * 100))}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dynamic Exam Settings Form */}
                                {examConfig && (
                                    <form onSubmit={handleSaveExamConfig} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm">Dynamic Examination Parameters</h3>
                                                <p className="text-xs text-slate-500 mt-0.5">
                                                    Modifying these settings immediately impacts future examination sessions without requiring any code deployment.
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={configSaving}
                                                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors disabled:opacity-50"
                                            >
                                                {configSaving ? <FaSpinner className="animate-spin text-xs" /> : <FaSave className="text-xs" />}
                                                <span>Save Configuration</span>
                                            </button>
                                        </div>

                                        {configMessage.text && (
                                            <div className={`p-3 rounded-lg text-xs font-semibold ${
                                                configMessage.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                                            }`}>
                                                {configMessage.text}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                                            <div className="sm:col-span-2">
                                                <label className="block font-bold text-slate-700 mb-1">Examination Title</label>
                                                <input
                                                    type="text"
                                                    value={examConfig.examTitle || ''}
                                                    onChange={(e) => setExamConfig({ ...examConfig, examTitle: e.target.value })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-bold text-slate-700 mb-1">Duration (Minutes)</label>
                                                <input
                                                    type="number"
                                                    min="10"
                                                    max="300"
                                                    value={examConfig.examDurationMinutes || 90}
                                                    onChange={(e) => setExamConfig({ ...examConfig, examDurationMinutes: Number(e.target.value) })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-bold text-slate-700 mb-1">Marks per Question</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={examConfig.marksPerQuestion || 1}
                                                    onChange={(e) => setExamConfig({ ...examConfig, marksPerQuestion: Number(e.target.value) })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-bold text-slate-700 mb-1">Negative Marking Penalty (0 for none)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.25"
                                                    value={examConfig.negativeMarking || 0}
                                                    onChange={(e) => setExamConfig({ ...examConfig, negativeMarking: Number(e.target.value) })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono font-bold"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-bold text-slate-700 mb-1">Practice Test Duration (Mins/Q)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={examConfig.practiceTestConfig?.durationPerQuestionMinutes || 2}
                                                    onChange={(e) => setExamConfig({
                                                        ...examConfig,
                                                        practiceTestConfig: {
                                                            ...examConfig.practiceTestConfig,
                                                            durationPerQuestionMinutes: Number(e.target.value),
                                                        },
                                                    })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-bold text-slate-700 mb-1">Practice Test Default Q Count</label>
                                                <input
                                                    type="number"
                                                    min="5"
                                                    max="50"
                                                    value={examConfig.practiceTestConfig?.defaultQuestionCount || 15}
                                                    onChange={(e) => setExamConfig({
                                                        ...examConfig,
                                                        practiceTestConfig: {
                                                            ...examConfig.practiceTestConfig,
                                                            defaultQuestionCount: Number(e.target.value),
                                                        },
                                                    })}
                                                    className="w-full rounded-lg border border-slate-200 p-2 text-xs font-mono"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Subject Quotas */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                                            {/* Compulsory Subjects */}
                                            <div className="space-y-3">
                                                <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                                                    Compulsory Subjects & Quota
                                                </label>
                                                {examConfig.compulsorySubjects?.map((subj, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
                                                        <span className="font-bold text-slate-800 w-32">{subj.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                min="5"
                                                                max="100"
                                                                value={subj.questionCount}
                                                                onChange={(e) => {
                                                                    const updated = [...examConfig.compulsorySubjects];
                                                                    updated[idx] = { ...updated[idx], questionCount: Number(e.target.value) };
                                                                    setExamConfig({ ...examConfig, compulsorySubjects: updated });
                                                                }}
                                                                className="w-20 rounded-md border border-slate-300 p-1.5 text-center font-mono font-bold"
                                                            />
                                                            <span className="text-slate-500">questions</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Optional Subjects */}
                                            <div className="space-y-3">
                                                <label className="block font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                                                    Optional Subjects & Quota (Student Chooses One)
                                                </label>
                                                {examConfig.optionalSubjects?.map((subj, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
                                                        <span className="font-bold text-slate-800 w-32">{subj.name}</span>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                min="5"
                                                                max="100"
                                                                value={subj.questionCount}
                                                                onChange={(e) => {
                                                                    const updated = [...examConfig.optionalSubjects];
                                                                    updated[idx] = { ...updated[idx], questionCount: Number(e.target.value) };
                                                                    setExamConfig({ ...examConfig, optionalSubjects: updated });
                                                                }}
                                                                className="w-20 rounded-md border border-slate-300 p-1.5 text-center font-mono font-bold"
                                                            />
                                                            <span className="text-slate-500">questions</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                )}

                {/* Modal 1: Bilingual Preview Modal */}
                {previewQuestion && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                        <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono font-bold text-base text-slate-900">{previewQuestion.code}</span>
                                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                        {previewQuestion.subject} • {previewQuestion.topic}
                                    </span>
                                    <span className="capitalize text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                        {previewQuestion.difficulty}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold">
                                        <button
                                            type="button"
                                            onClick={() => setPreviewLang('both')}
                                            className={`px-2.5 py-1 rounded ${previewLang === 'both' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                                        >
                                            Side-by-side
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPreviewLang('en')}
                                            className={`px-2.5 py-1 rounded ${previewLang === 'en' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                                        >
                                            English
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPreviewLang('ta')}
                                            className={`px-2.5 py-1 rounded ${previewLang === 'ta' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
                                        >
                                            தமிழ்
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPreviewQuestion(null)}
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>

                            {/* Question Body */}
                            <div className={`grid gap-6 ${previewLang === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                                {/* English Version */}
                                {(previewLang === 'both' || previewLang === 'en') && (
                                    <div className="space-y-3">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">English Version</span>
                                        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                                            {previewQuestion.questionText}
                                        </p>
                                        <div className="space-y-2 pt-2">
                                            {previewQuestion.options?.map((opt) => {
                                                const isCorrect = opt.label === previewQuestion.correctAnswer;
                                                return (
                                                    <div
                                                        key={opt.label}
                                                        className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                                                            isCorrect
                                                                  ? 'border-emerald-500 bg-emerald-50/80 font-bold text-emerald-950'
                                                                : 'border-slate-200 bg-slate-50/50 text-slate-700'
                                                        }`}
                                                    >
                                                        <strong className="shrink-0 text-slate-900">({opt.label})</strong>
                                                        <span>{opt.text}</span>
                                                        {isCorrect && (
                                                            <span className="ml-auto text-[10px] font-bold text-emerald-700 uppercase">
                                                                Correct
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {previewQuestion.explanation && (
                                            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs text-slate-700">
                                                <strong className="block text-slate-900 mb-1">Explanation:</strong>
                                                <p>{previewQuestion.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tamil Version */}
                                {(previewLang === 'both' || previewLang === 'ta') && (
                                    <div className="space-y-3 font-sans">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">தமிழ் வடிவம்</span>
                                        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                                            {previewQuestion.questionTextTamil}
                                        </p>
                                        <div className="space-y-2 pt-2">
                                            {previewQuestion.optionsTamil?.map((opt) => {
                                                const isCorrect = opt.label === previewQuestion.correctAnswer;
                                                return (
                                                    <div
                                                        key={opt.label}
                                                        className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                                                            isCorrect
                                                                ? 'border-emerald-500 bg-emerald-50/80 font-bold text-emerald-950'
                                                                : 'border-slate-200 bg-slate-50/50 text-slate-700'
                                                        }`}
                                                    >
                                                        <strong className="shrink-0 text-slate-900">({opt.label})</strong>
                                                        <span>{opt.text}</span>
                                                        {isCorrect && (
                                                            <span className="ml-auto text-[10px] font-bold text-emerald-700 uppercase">
                                                                விடை
                                                            </span>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {previewQuestion.explanationTamil && (
                                            <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs text-slate-700">
                                                <strong className="block text-slate-900 mb-1">விளக்கம்:</strong>
                                                <p>{previewQuestion.explanationTamil}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal 2: Add / Edit Question Modal */}
                {editQuestion && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                        <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                <h3 className="font-bold text-base text-slate-900">
                                    {isAddMode ? 'Add New Bilingual Question' : `Edit Question: ${formData.code}`}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setEditQuestion(null)}
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Code (Unique)</label>
                                        <input
                                            type="text"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            className="w-full rounded-lg border border-slate-300 p-2 font-mono font-bold"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Subject</label>
                                        <select
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 p-2"
                                            required
                                        >
                                            <option value="Physics">Physics</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Mathematics">Mathematics</option>
                                            <option value="Biology">Biology</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Topic</label>
                                        <input
                                            type="text"
                                            value={formData.topic}
                                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                            placeholder="e.g. Electrostatics"
                                            className="w-full rounded-lg border border-slate-300 p-2"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Difficulty</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 p-2"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Approval Status</label>
                                        <select
                                            value={formData.approvalStatus || 'approved'}
                                            onChange={(e) => setFormData({ ...formData, approvalStatus: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 p-2 font-bold text-slate-800"
                                        >
                                            <option value="approved">Approved</option>
                                            <option value="pending">Pending Review</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Questions text */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Question Text (English)</label>
                                        <textarea
                                            value={formData.questionText}
                                            onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                                            rows={3}
                                            className="w-full rounded-lg border border-slate-300 p-2"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">வினா உரை (Tamil)</label>
                                        <textarea
                                            value={formData.questionTextTamil}
                                            onChange={(e) => setFormData({ ...formData, questionTextTamil: e.target.value })}
                                            rows={3}
                                            className="w-full rounded-lg border border-slate-300 p-2 font-sans"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Options 4 pairs */}
                                <div className="space-y-2">
                                    <span className="font-bold text-slate-700 block">Options (A, B, C, D)</span>
                                    {['A', 'B', 'C', 'D'].map((label, idx) => (
                                        <div key={label} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-700 w-6">({label})</span>
                                                <input
                                                    type="text"
                                                    placeholder={`English Option ${label}`}
                                                    value={formData.options[idx]?.text || ''}
                                                    onChange={(e) => {
                                                        const copy = [...formData.options];
                                                        copy[idx] = { label, text: e.target.value };
                                                        setFormData({ ...formData, options: copy });
                                                    }}
                                                    className="w-full rounded-lg border border-slate-300 p-1.5"
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-700 w-6">({label})</span>
                                                <input
                                                    type="text"
                                                    placeholder={`தமிழ் தேர்வு ${label}`}
                                                    value={formData.optionsTamil[idx]?.text || ''}
                                                    onChange={(e) => {
                                                        const copy = [...formData.optionsTamil];
                                                        copy[idx] = { label, text: e.target.value };
                                                        setFormData({ ...formData, optionsTamil: copy });
                                                    }}
                                                    className="w-full rounded-lg border border-slate-300 p-1.5 font-sans"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Correct answer & explanations */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Correct Answer Key</label>
                                        <select
                                            value={formData.correctAnswer}
                                            onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                            className="w-full rounded-lg border border-slate-300 p-2 font-bold text-emerald-700"
                                            required
                                        >
                                            <option value="A">Option A</option>
                                            <option value="B">Option B</option>
                                            <option value="C">Option C</option>
                                            <option value="D">Option D</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">Explanation (English)</label>
                                        <textarea
                                            value={formData.explanation}
                                            onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                                            rows={2}
                                            className="w-full rounded-lg border border-slate-300 p-2"
                                        />
                                    </div>

                                    <div>
                                        <label className="block font-bold text-slate-700 mb-1">விளக்கம் (Tamil)</label>
                                        <textarea
                                            value={formData.explanationTamil}
                                            onChange={(e) => setFormData({ ...formData, explanationTamil: e.target.value })}
                                            rows={2}
                                            className="w-full rounded-lg border border-slate-300 p-2 font-sans"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => setEditQuestion(null)}
                                        className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="rounded-lg bg-emerald-600 px-5 py-2 font-bold text-white hover:bg-emerald-700 inline-flex items-center gap-1.5"
                                    >
                                        {saving ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                                        <span>{isAddMode ? 'Create Question' : 'Save Changes'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modal 3: Duplicates Modal */}
                {duplicatesModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
                        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                                    <FaClone className="text-emerald-600" />
                                    <span>Duplicate Question Detection Results</span>
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setDuplicatesModal(false)}
                                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {duplicatesData?.totalDuplicateGroups === 0 ? (
                                <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800">
                                    <FaCheck className="text-2xl mx-auto mb-2 text-emerald-600" />
                                    <p className="font-bold text-sm">No duplicate questions detected!</p>
                                    <p className="text-xs text-emerald-600 mt-1">All questions in the question bank have unique question texts.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-xs text-rose-600 font-semibold">
                                        Detected {duplicatesData?.totalDuplicateGroups} groups of duplicate questions:
                                    </p>
                                    {duplicatesData?.duplicateEnglish?.map((grp, i) => (
                                        <div key={i} className="rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs space-y-1">
                                            <p className="font-bold text-slate-900">&ldquo;{grp.text}&rdquo;</p>
                                            <p className="text-rose-700">Repeated across codes: {grp.codes.join(', ')}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
