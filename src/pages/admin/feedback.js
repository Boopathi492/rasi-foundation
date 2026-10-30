import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Modal from '@/frontend/components/admin/Modal';
import {
  FaCheck,
  FaTimes,
  FaArchive,
  FaStar,
  FaSpinner,
  FaSearch,
  FaUser,
  FaQuoteLeft,
  FaEdit,
  FaComments,
} from 'react-icons/fa';

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({});
  const [moderatingId, setModeratingId] = useState(null);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [moderationNote, setModerationNote] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, [statusFilter, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/feedback?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data.feedback || []);
        setStats(data.stats || {});
      }
    } catch (err) {
      console.error('Fetch feedback error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status, notes = '') => {
    setModeratingId(id);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, moderationNotes: notes }),
      });
      if (res.ok) {
        fetchFeedback();
        setNotesModalOpen(false);
      }
    } catch (err) {
      console.error('Update status error:', err);
    } finally {
      setModeratingId(null);
    }
  };

  const openNotesModal = (item, action) => {
    setSelectedItem({ ...item, targetAction: action });
    setModerationNote(item.moderationNotes || '');
    setNotesModalOpen(true);
  };

  return (
    <AdminLayout title="Student & Parent Feedback Moderation">
      <div className="space-y-6">
        {/* Header summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Testimonials Moderation Queue</h2>
            <p className="text-xs text-slate-500">
              Only testimonials approved by an authorized administrator are displayed publicly on the live website.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
              {stats.pending || 0} Pending Moderation
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {stats.approved || 0} Live Approved
            </span>
          </div>
        </div>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {['pending', 'approved', 'rejected', 'archived', 'all'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  statusFilter === tab
                    ? 'bg-white text-slate-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab} {stats[tab] !== undefined && `(${stats[tab]})`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, message..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Feedback Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-2xl text-blue-600" />
          </div>
        ) : feedbackList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FaComments className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No testimonials found in this category</p>
            <p className="text-xs text-slate-400 mt-1">Submissions appear here when students or parents leave reviews.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedbackList.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                        {(item.name || 'S')[0].toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-800">{item.name}</h3>
                        <p className="text-[11px] text-slate-400">
                          <span className="capitalize font-semibold text-slate-600">{item.category}</span>
                          {item.relation && ` • ${item.relation}`}
                          {item.relatedCourse && ` • ${item.relatedCourse}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400 text-xs shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={i < (item.rating || 5) ? 'text-amber-400' : 'text-slate-200'}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl italic mb-3 leading-relaxed relative">
                    &ldquo;{item.message}&rdquo;
                  </p>

                  {item.moderationNotes && (
                    <div className="mb-3 p-2.5 rounded-lg bg-amber-50 border border-amber-100 text-[11px] text-amber-800">
                      <span className="font-semibold">Internal Note:</span> {item.moderationNotes}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : item.status === 'archived'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>

                  {/* Moderation Action Buttons */}
                  <div className="flex items-center gap-1.5">
                    {item.status !== 'approved' && (
                      <button
                        onClick={() => handleUpdateStatus(item._id, 'approved')}
                        disabled={moderatingId === item._id}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-2xs"
                        title="Approve for public website"
                      >
                        <FaCheck className="text-[9px]" />
                        <span>Approve</span>
                      </button>
                    )}
                    {item.status !== 'rejected' && (
                      <button
                        onClick={() => openNotesModal(item, 'rejected')}
                        disabled={moderatingId === item._id}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1"
                        title="Reject feedback"
                      >
                        <FaTimes className="text-[9px]" />
                        <span>Reject</span>
                      </button>
                    )}
                    {item.status !== 'archived' && (
                      <button
                        onClick={() => handleUpdateStatus(item._id, 'archived')}
                        disabled={moderatingId === item._id}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                        title="Archive"
                      >
                        <FaArchive />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Moderation Notes Modal */}
        <Modal
          isOpen={notesModalOpen}
          onClose={() => setNotesModalOpen(false)}
          title={`Moderation Note for "${selectedItem?.name}"`}
          subtitle={`Optional internal justification for ${selectedItem?.targetAction}ing this submission.`}
          size="sm"
          footer={
            <>
              <button
                type="button"
                onClick={() => setNotesModalOpen(false)}
                className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedItem._id, selectedItem.targetAction, moderationNote)}
                className={`px-4 py-1.5 text-white font-bold rounded-xl text-xs transition-colors shadow-xs ${
                  selectedItem?.targetAction === 'approve'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600'
                    : 'bg-rose-600 hover:bg-rose-500'
                }`}
              >
                Confirm {selectedItem?.targetAction}
              </button>
            </>
          }
        >
          <textarea
            rows={3}
            value={moderationNote}
            onChange={(e) => setModerationNote(e.target.value)}
            placeholder="Reason for decision..."
            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </Modal>
      </div>
    </AdminLayout>
  );
}
