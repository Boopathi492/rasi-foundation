import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Modal from '@/frontend/components/admin/Modal';
import ConfirmDialog from '@/frontend/components/admin/ConfirmDialog';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaImage,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaEye,
} from 'react-icons/fa';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placementFilter, setPlacementFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    altText: '',
    ctaText: '',
    ctaUrl: '',
    placement: 'home_hero',
    order: 0,
    isActive: true,
    startsAt: '',
    endsAt: '',
    desktopImageData: null,
    desktopImageName: '',
    mobileImageData: null,
    mobileImageName: '',
  });

  useEffect(() => {
    fetchBanners();
  }, [placementFilter, statusFilter]);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (placementFilter !== 'all') params.append('placement', placementFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);

      const res = await fetch(`/api/admin/banners?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBanners(data.banners || []);
      }
    } catch (err) {
      console.error('Fetch banners error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBanner(null);
    setForm({
      title: '',
      description: '',
      altText: '',
      ctaText: '',
      ctaUrl: '',
      placement: 'home_hero',
      order: 0,
      isActive: true,
      startsAt: '',
      endsAt: '',
      desktopImageData: null,
      desktopImageName: '',
      mobileImageData: null,
      mobileImageName: '',
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (banner) => {
    setEditingBanner(banner);
    setForm({
      title: banner.title || '',
      description: banner.description || '',
      altText: banner.altText || '',
      ctaText: banner.ctaText || '',
      ctaUrl: banner.ctaUrl || '',
      placement: banner.placement || 'home_hero',
      order: banner.order || 0,
      isActive: Boolean(banner.isActive),
      startsAt: banner.startsAt ? banner.startsAt.split('T')[0] : '',
      endsAt: banner.endsAt ? banner.endsAt.split('T')[0] : '',
      desktopImageData: null,
      desktopImageName: '',
      mobileImageData: null,
      mobileImageName: '',
    });
    setError('');
    setModalOpen(true);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setError(`File is too large (max 3MB): ${file.name}`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'desktop') {
        setForm((prev) => ({
          ...prev,
          desktopImageData: reader.result,
          desktopImageName: file.name,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          mobileImageData: reader.result,
          mobileImageName: file.name,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Banner title is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBanner
        ? `/api/admin/banners/${editingBanner._id}`
        : '/api/admin/banners';
      const method = editingBanner ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save banner');
      }

      setModalOpen(false);
      fetchBanners();
    } catch (err) {
      setError(err.message || 'An error occurred while saving the banner');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/banners/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setDeleteTarget(null);
        fetchBanners();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Dynamic Banner Management">
      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">Website Banners & Promotions</h2>
            <p className="text-xs text-slate-500">Manage promotional carousels across the home page and public portals.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <FaPlus />
            <span>Create Banner</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={placementFilter}
            onChange={(e) => setPlacementFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Placements</option>
            <option value="home_hero">Home Hero Carousel</option>
            <option value="home_secondary">Home Secondary</option>
            <option value="courses">Courses Page</option>
            <option value="colleges">Colleges Page</option>
            <option value="scholarship">Scholarship Page</option>
            <option value="about">About Page</option>
            <option value="contact">Contact Page</option>
            <option value="feedback">Feedback Page</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Banners Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-2xl text-blue-600" />
          </div>
        ) : banners.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FaImage className="text-4xl text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No banners configured</p>
            <p className="text-xs text-slate-400 mt-1">Create your first dynamic banner to display on the public website.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {banners.map((b) => (
              <div key={b._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
                {/* Banner Thumbnail */}
                <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {b.desktopImageUrl ? (
                    <img
                      src={b.desktopImageUrl}
                      alt={b.altText || b.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <FaImage className="text-3xl mx-auto mb-1 opacity-40" />
                      <span className="text-[11px]">No image uploaded</span>
                    </div>
                  )}
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      b.isActive ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                    }`}
                  >
                    {b.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-900/80 text-white">
                    {b.placement} • Order #{b.order}
                  </span>
                </div>

                {/* Banner Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{b.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{b.description || 'No description provided'}</p>
                    {b.ctaText && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                        <span>CTA: {b.ctaText}</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">
                      {b.startsAt ? `From ${b.startsAt.split('T')[0]}` : 'Immediate'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(b)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Banner"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteTarget({ id: b._id, title: b.title })}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Archive Banner"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingBanner ? 'Edit Promotional Banner' : 'Create New Promotional Banner'}
          subtitle="Configure dynamic promotional banners for home and academic pages"
          size="xl"
          preventClose={saving}
          footer={
            <>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="banner-form"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-950/20 inline-flex items-center gap-2 text-xs"
              >
                {saving && <FaSpinner className="animate-spin text-xs" />}
                <span>{editingBanner ? 'Update Banner' : 'Publish Banner'}</span>
              </button>
            </>
          }
        >

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {error}
                </div>
              )}

              <form id="banner-form" onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Banner Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Free Engineering & Medical Counselling 2026"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description / Tagline</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Brief description visible on the hero card..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Placement Section</label>
                    <select
                      value={form.placement}
                      onChange={(e) => setForm({ ...form, placement: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="home_hero">Home Hero Carousel</option>
                      <option value="home_secondary">Home Secondary</option>
                      <option value="courses">Courses Page</option>
                      <option value="colleges">Colleges Page</option>
                      <option value="scholarship">Scholarship Page</option>
                      <option value="about">About Page</option>
                      <option value="contact">Contact Page</option>
                      <option value="feedback">Feedback Page</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Display Order (Sort Index)</label>
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) => setForm({ ...form, order: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={form.ctaText}
                      onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                      placeholder="e.g. Apply Now"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">CTA Destination Link</label>
                    <input
                      type="text"
                      value={form.ctaUrl}
                      onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
                      placeholder="e.g. /biodata or /book-counselling"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Desktop Image (JPG/PNG/WebP)</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileChange(e, 'desktop')}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {form.desktopImageName && <p className="text-[10px] text-emerald-600 mt-1">Selected: {form.desktopImageName}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile Image (Optional)</label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => handleFileChange(e, 'mobile')}
                      className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {form.mobileImageName && <p className="text-[10px] text-emerald-600 mt-1">Selected: {form.mobileImageName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Schedule Start Date (Optional)</label>
                    <input
                      type="date"
                      value={form.startsAt}
                      onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Schedule End Date (Optional)</label>
                    <input
                      type="date"
                      value={form.endsAt}
                      onChange={(e) => setForm({ ...form, endsAt: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-xs font-semibold text-slate-700">
                    Active & visible on configured website pages
                  </label>
                </div>

              </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Archive Banner"
          message={`Are you sure you want to archive banner "${deleteTarget?.title}"? It will no longer be visible on public pages.`}
          confirmLabel="Archive Banner"
          variant="danger"
          isLoading={deleting}
        />
      </div>
    </AdminLayout>
  );
}
