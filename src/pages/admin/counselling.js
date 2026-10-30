import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Modal from '@/frontend/components/admin/Modal';
import ConfirmDialog from '@/frontend/components/admin/ConfirmDialog';
import {
  FaPlus,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaGraduationCap,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaEdit,
  FaTrash,
  FaComments,
  FaTimes,
  FaUserCheck,
} from 'react-icons/fa';

export default function AdminCounselling() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [counsellorFilter, setCounsellorFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [counsellors, setCounsellors] = useState([]);
  const [stats, setStats] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    studentName: '',
    studentPhone: '',
    scheduledAt: '',
    counsellor: '',
    type: 'in_person',
    preferredCollege: '',
    interestedCourse: '',
    careerInterests: '',
    notes: '',
    recommendations: '',
    followUpDate: '',
    status: 'scheduled',
    outcome: '',
    nextSteps: '',
  });

  useEffect(() => {
    fetchRecords();
  }, [statusFilter, counsellorFilter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (counsellorFilter !== 'all') params.append('counsellor', counsellorFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/counselling?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
        setCounsellors(data.counsellors || []);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Fetch counselling records error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    setForm({
      studentName: '',
      studentPhone: '',
      scheduledAt: new Date(Date.now() + 86400000).toISOString().slice(0, 16),
      counsellor: '',
      type: 'in_person',
      preferredCollege: '',
      interestedCourse: '',
      careerInterests: '',
      notes: '',
      recommendations: '',
      followUpDate: '',
      status: 'scheduled',
      outcome: '',
      nextSteps: '',
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (rec) => {
    setEditingRecord(rec);
    setForm({
      studentName: rec.studentName || '',
      studentPhone: rec.studentPhone || '',
      scheduledAt: rec.scheduledAt ? new Date(rec.scheduledAt).toISOString().slice(0, 16) : '',
      counsellor: rec.counsellor || '',
      type: rec.type || 'in_person',
      preferredCollege: rec.preferredCollege || '',
      interestedCourse: rec.interestedCourse || '',
      careerInterests: rec.careerInterests || '',
      notes: rec.notes || '',
      recommendations: rec.recommendations || '',
      followUpDate: rec.followUpDate ? rec.followUpDate.split('T')[0] : '',
      status: rec.status || 'scheduled',
      outcome: rec.outcome || '',
      nextSteps: rec.nextSteps || '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (saving) return;

    if (!form.studentName.trim() || !form.scheduledAt) {
      setError('Student name and scheduled date/time are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingRecord
        ? `/api/admin/counselling/${editingRecord._id}`
        : '/api/admin/counselling';
      const method = editingRecord ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save counselling session');

      setModalOpen(false);
      fetchRecords();
    } catch (err) {
      setError(err.message || 'Error saving session');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/counselling/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchRecords();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  const closeModal = () => {
    if (!saving) {
      setModalOpen(false);
    }
  };

  return (
    <AdminLayout title="Student Counselling & Guidance">
      <div className="space-y-6">
        {/* Header summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Counselling Sessions & Follow-ups</h2>
            <p className="text-xs text-slate-500">
              Track student career interests, admission advisory discussions, recommendations, and next steps.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <FaPlus />
            <span>Schedule Session</span>
          </button>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
              {['all', 'scheduled', 'completed', 'follow_up_required', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-colors ${
                    statusFilter === tab
                      ? 'bg-white text-slate-800 shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            {counsellors.length > 0 && (
              <select
                value={counsellorFilter}
                onChange={(e) => setCounsellorFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="all">All Counsellors</option>
                <option value="unassigned">Not Assigned</option>
                {counsellors.map((c) => (
                  <option key={c.username || c.id} value={c.displayName || c.username}>
                    {c.displayName || c.username}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student, phone, counsellor..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Counselling Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <FaComments className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No counselling sessions found</p>
              <p className="mt-1">Schedule a session or change search filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Student</th>
                    <th className="px-5 py-3.5">Scheduled Date</th>
                    <th className="px-5 py-3.5">Counsellor</th>
                    <th className="px-5 py-3.5">Target Course & College</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((rec) => (
                    <tr key={rec._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800">{rec.studentName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{rec.studentPhone || 'No phone'}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <FaCalendarAlt className="text-blue-500 text-[10px]" />
                          <span>
                            {rec.scheduledAt
                              ? new Date(rec.scheduledAt).toLocaleString([], {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })
                              : 'Not set'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 capitalize">{rec.type.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-700 font-medium">
                        {rec.counsellor ? (
                          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                            <FaUserCheck className="text-emerald-600 text-xs shrink-0" aria-hidden="true" />
                            <span>{rec.counsellor}</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                            Not assigned
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800">{rec.interestedCourse || 'General Guidance'}</p>
                        <p className="text-[11px] text-slate-400">{rec.preferredCollege || ''}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            rec.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : rec.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : rec.status === 'follow_up_required'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {rec.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(rec)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit / Add Notes"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ id: rec._id, name: rec.studentName })}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Delete"
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
        </div>

        {/* Create / Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={editingRecord ? 'Update Counselling Session' : 'Schedule Counselling Session'}
          subtitle="Record career guidance discussion, parent feedback, and recommendation notes"
          size="xl"
          preventClose={saving}
          footer={
            <>
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="counselling-form"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-950/20 inline-flex items-center gap-2 text-xs"
              >
                {saving && <FaSpinner className="animate-spin text-xs" />}
                <span>{editingRecord ? 'Update Session' : 'Save Session'}</span>
              </button>
            </>
          }
        >

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {error}
                </div>
              )}

              <form id="counselling-form" onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      value={form.studentName}
                      onChange={(e) => setForm((prev) => ({ ...prev, studentName: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Student Mobile Number</label>
                    <input
                      type="text"
                      value={form.studentPhone}
                      onChange={(e) => setForm((prev) => ({ ...prev, studentPhone: e.target.value }))}
                      placeholder="10-digit mobile"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Date & Time *</label>
                    <input
                      type="datetime-local"
                      required
                      value={form.scheduledAt}
                      onChange={(e) => setForm((prev) => ({ ...prev, scheduledAt: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Assigned Counsellor</label>
                    <select
                      value={form.counsellor}
                      onChange={(e) => setForm((prev) => ({ ...prev, counsellor: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      <option value="">Not assigned</option>
                      {counsellors.map((c) => (
                        <option key={c.username || c.id} value={c.displayName || c.username}>
                          {c.displayName || c.username} ({c.role === 'counsellor' ? 'Counsellor' : c.role === 'super_admin' ? 'Super Admin' : 'Admin'})
                        </option>
                      ))}
                      {form.counsellor && !counsellors.some((c) => (c.displayName || c.username) === form.counsellor) && (
                        <option value={form.counsellor}>{form.counsellor} (Current)</option>
                      )}
                    </select>
                    {counsellors.length === 0 && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        No active staff members registered in staff directory.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Session Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      <option value="in_person">In Person (Office)</option>
                      <option value="phone">Phone Call</option>
                      <option value="video">Video Call</option>
                      <option value="walk_in">Walk-in</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Interested Course</label>
                    <input
                      type="text"
                      value={form.interestedCourse}
                      onChange={(e) => setForm((prev) => ({ ...prev, interestedCourse: e.target.value }))}
                      placeholder="e.g. B.Tech Artificial Intelligence"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Preferred College</label>
                    <input
                      type="text"
                      value={form.preferredCollege}
                      onChange={(e) => setForm((prev) => ({ ...prev, preferredCollege: e.target.value }))}
                      placeholder="e.g. Coimbatore District Colleges"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Counsellor Discussion Notes (Confidential)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Summary of student background, cut-off marks, preferences, financial circumstances..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Counsellor Recommendations</label>
                    <textarea
                      rows={2}
                      value={form.recommendations}
                      onChange={(e) => setForm((prev) => ({ ...prev, recommendations: e.target.value }))}
                      placeholder="Recommended college options, quota guidance, scholarship eligibility..."
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Next Steps & Action Items</label>
                    <textarea
                      rows={2}
                      value={form.nextSteps}
                      onChange={(e) => setForm((prev) => ({ ...prev, nextSteps: e.target.value }))}
                      placeholder="Awaiting 12th marksheet, campus visit arranged..."
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="follow_up_required">Follow-up Required</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Follow-up Date (Optional)</label>
                    <input
                      type="date"
                      value={form.followUpDate}
                      onChange={(e) => setForm((prev) => ({ ...prev, followUpDate: e.target.value }))}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

              </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Delete Counselling Session"
          message={`Are you sure you want to delete the counselling session for "${deleteTarget?.name}"? This record will be permanently removed.`}
          confirmLabel="Delete Session"
          variant="danger"
          isLoading={deleting}
        />
      </div>
    </AdminLayout>
  );
}
