import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Modal from '@/frontend/components/admin/Modal';
import ConfirmDialog from '@/frontend/components/admin/ConfirmDialog';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaBullhorn,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaGraduationCap,
  FaInfoCircle,
  FaSearch,
} from 'react-icons/fa';

const TYPE_CONFIG = {
  general: { label: 'General Update', badge: 'bg-blue-100 text-blue-800' },
  scholarship: { label: 'Scholarship', badge: 'bg-emerald-100 text-emerald-800' },
  admission: { label: 'Admission Guidance', badge: 'bg-purple-100 text-purple-800' },
  urgent: { label: 'Urgent Announcement', badge: 'bg-rose-100 text-rose-800' },
};

export const VERIFIED_ANNOUNCEMENT_ROUTES = [
  { path: '', label: 'None (No action link)' },
  { path: '/scholarship-test', label: 'Scholarship Exam Portal (/scholarship-test)' },
  { path: '/scholarship-test/register', label: 'Scholarship Registration (/scholarship-test/register)' },
  { path: '/practice-test', label: 'NEET / JEE Practice Test (/practice-test)' },
  { path: '/book-counselling', label: 'Free Counselling Booking (/book-counselling)' },
  { path: '/biodata', label: 'Student BioData & Scholarship Form (/biodata)' },
  { path: '/colleges', label: 'Colleges Portal (/colleges)' },
  { path: '/courses', label: 'Courses Directory (/courses)' },
  { path: '/achievements', label: 'Achievements & Stories (/achievements)' },
  { path: '/announcements', label: 'Announcements & Alerts (/announcements)' },
  { path: '/about', label: 'About Rasi Foundation (/about)' },
  { path: '/contact', label: 'Contact Us (/contact)' },
  { path: '/feedback', label: 'Student Feedback (/feedback)' },
];

const INITIAL_FORM = {
  title: '',
  content: '',
  link: '',
  type: 'general',
  priority: 0,
  showOnHome: true,
  isActive: true,
  expiryDate: '',
};

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isCustomLink, setIsCustomLink] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/announcements', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setAnnouncements(json.data || []);
      }
    } catch (err) {
      console.error('Fetch announcements error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setIsCustomLink(false);
    setForm(INITIAL_FORM);
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    const hasCustom = Boolean(item.link && !VERIFIED_ANNOUNCEMENT_ROUTES.some((r) => r.path === item.link));
    setIsCustomLink(hasCustom);
    setForm({
      title: item.title || '',
      content: item.content || '',
      link: item.link || '',
      type: item.type || 'general',
      priority: item.priority || 0,
      showOnHome: item.showOnHome !== false,
      isActive: item.isActive !== false,
      expiryDate: item.expiryDate ? item.expiryDate.split('T')[0] : '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (saving) return;

    if (!form.title.trim()) {
      setError('Announcement title is required');
      return;
    }
    if (!form.content.trim()) {
      setError('Announcement content/summary is required');
      return;
    }
    if (form.link && form.link.trim()) {
      const urlVal = form.link.trim();
      const isRelative = /^\/(?!\/)[^\s]*$/.test(urlVal);
      let isAbsolute = false;
      try {
        const u = new URL(urlVal);
        isAbsolute = u.protocol === 'http:' || u.protocol === 'https:';
      } catch {
        isAbsolute = false;
      }
      if (!isRelative && !isAbsolute) {
        setError('Action link must be a valid internal path (e.g. /scholarship-test) or a safe http(s) URL');
        return;
      }
    }

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        title: form.title.trim(),
        content: form.content.trim(),
        link: form.link.trim(),
        type: form.type,
        priority: parseInt(form.priority, 10) || 0,
        showOnHome: Boolean(form.showOnHome),
        isActive: Boolean(form.isActive),
        expiryDate: form.expiryDate ? new Date(form.expiryDate) : undefined,
      };

      const url = editingItem
        ? '/api/admin/announcements'
        : '/api/admin/announcements';
      const method = editingItem ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingItem ? { _id: editingItem._id, ...payload } : payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to save announcement');
      }

      setModalOpen(false);
      fetchAnnouncements();
    } catch (err) {
      setError(err.message || 'An error occurred while saving announcement');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (item) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/announcements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          _id: item._id,
          isActive: !item.isActive,
        }),
      });
      if (res.ok) {
        fetchAnnouncements();
      }
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/announcements?id=${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchAnnouncements();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  const filtered = announcements.filter((a) => {
    if (typeFilter !== 'all' && a.type !== typeFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (a.title || '').toLowerCase().includes(q) ||
      (a.content || '').toLowerCase().includes(q)
    );
  });

  const closeModal = () => {
    if (!saving) {
      setModalOpen(false);
    }
  };

  return (
    <AdminLayout title="Public Announcements & News Ticker">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">Public Announcements & Alerts</h2>
            <p className="text-xs text-slate-500">
              Manage breaking announcements displayed on the top notification bar and public announcements portal.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <FaPlus />
            <span>New Announcement</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">All Categories</option>
              <option value="general">General Updates</option>
              <option value="scholarship">Scholarship News</option>
              <option value="admission">Admission Guidance</option>
              <option value="urgent">Urgent Alerts</option>
            </select>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-2xl text-blue-600" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FaBullhorn className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No announcements found</p>
            <p className="text-xs text-slate-400 mt-1">
              Create an announcement to post live updates on the website top bar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const conf = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
              const isExpired = item.expiryDate && new Date(item.expiryDate) < new Date();
              const closeModal = () => {
    if (!saving) {
      setModalOpen(false);
    }
  };

  return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${conf.badge}`}>
                        {conf.label}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item)}
                        title="Click to toggle status"
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                          item.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">{item.content}</p>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:underline mb-2"
                      >
                        <span>Link: {item.link}</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-[10px] text-slate-400 space-y-0.5">
                      <p>Priority: #{item.priority || 0} • {item.showOnHome ? 'On Home Bar' : 'Portal Only'}</p>
                      {item.expiryDate && (
                        <p className={isExpired ? 'text-rose-600 font-semibold' : ''}>
                          Expires: {item.expiryDate.split('T')[0]} {isExpired && '(Expired)'}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Announcement"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ id: item._id, title: item.title })}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Delete Announcement"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create / Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={editingItem ? 'Edit Announcement' : 'Create Public Announcement'}
          subtitle="Configure updates, scholarship alerts, and notification bar tickers."
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
                form="announcement-form"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2 text-xs"
              >
                {saving && <FaSpinner className="animate-spin text-xs" />}
                <span>{editingItem ? 'Update Announcement' : 'Post Announcement'}</span>
              </button>
            </>
          }
        >
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          <form id="announcement-form" onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g. TNEA 2026 Engineering Counselling Dates Announced"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Content / Summary *</label>
              <textarea
                rows={3}
                required
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Details of the announcement for student and parent information..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="general">General Update</option>
                  <option value="scholarship">Scholarship</option>
                  <option value="admission">Admission Guidance</option>
                  <option value="urgent">Urgent Alert</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Display Priority (Higher = First)</label>
                <input
                  type="number"
                  value={form.priority}
                  onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Action Link (Optional)</label>
                <select
                  value={isCustomLink ? '__custom__' : (form.link || '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '__custom__') {
                      setIsCustomLink(true);
                    } else {
                      setIsCustomLink(false);
                      setForm((prev) => ({ ...prev, link: val }));
                    }
                  }}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {VERIFIED_ANNOUNCEMENT_ROUTES.map((r) => (
                    <option key={r.path} value={r.path}>{r.label}</option>
                  ))}
                  <option value="__custom__">Custom URL...</option>
                </select>
                {isCustomLink && (
                  <input
                    type="text"
                    value={form.link}
                    onChange={(e) => setForm((prev) => ({ ...prev, link: e.target.value }))}
                    placeholder="e.g. /custom-page or https://..."
                    className="mt-2 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.showOnHome}
                  onChange={(e) => setForm((prev) => ({ ...prev, showOnHome: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Display on Homepage Top Notification Bar</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <span>Active & Visible</span>
              </label>
            </div>
          </form>
        </Modal>

        {/* Confirm Delete */}
        <ConfirmDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Delete Announcement"
          message={`Are you sure you want to permanently delete announcement "${deleteTarget?.title}"?`}
          confirmLabel="Delete"
          variant="danger"
          isLoading={deleting}
        />
      </div>
    </AdminLayout>
  );
}
