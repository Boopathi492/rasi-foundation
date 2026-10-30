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

export const PREDEFINED_CTA_TEXTS = [
  'Explore Colleges',
  'Explore Courses',
  'Apply Now',
  'Book Counselling',
  'Learn More',
  'Contact Us',
  'View Details',
];

export const VERIFIED_CTA_ROUTES = [
  { path: '/colleges', label: 'Colleges Portal (/colleges)' },
  { path: '/courses', label: 'Courses Directory (/courses)' },
  { path: '/book-counselling', label: 'Free Counselling Booking (/book-counselling)' },
  { path: '/biodata', label: 'Student BioData & Scholarship Form (/biodata)' },
  { path: '/scholarship-test', label: 'Scholarship Exam Portal (/scholarship-test)' },
  { path: '/scholarship-test/register', label: 'Scholarship Registration (/scholarship-test/register)' },
  { path: '/practice-test', label: 'NEET / JEE Practice Test (/practice-test)' },
  { path: '/achievements', label: 'Achievements & Stories (/achievements)' },
  { path: '/announcements', label: 'Announcements & Alerts (/announcements)' },
  { path: '/about', label: 'About Rasi Foundation (/about)' },
  { path: '/contact', label: 'Contact Us (/contact)' },
  { path: '/feedback', label: 'Student Feedback (/feedback)' },
];

export const BANNER_PLACEMENTS_LIST = [
  { value: 'home_hero', label: 'Home Hero Carousel' },
  { value: 'home_secondary', label: 'Home Secondary' },
  { value: 'about', label: 'About Page' },
  { value: 'courses', label: 'Courses Page' },
  { value: 'colleges', label: 'Colleges Page' },
  { value: 'scholarship', label: 'Scholarship Page' },
  { value: 'achievements', label: 'Achievements Page' },
  { value: 'announcements', label: 'Announcements Page' },
  { value: 'contact', label: 'Contact Page' },
  { value: 'feedback', label: 'Feedback Page' },
  { value: 'global', label: 'Global / All Pages' },
];

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
  const [isCustomCtaText, setIsCustomCtaText] = useState(false);
  const [isCustomCtaUrl, setIsCustomCtaUrl] = useState(false);

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
  }, [placementFilter, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

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
    setIsCustomCtaText(false);
    setIsCustomCtaUrl(false);
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
    const hasCustomText = Boolean(banner.ctaText && !PREDEFINED_CTA_TEXTS.includes(banner.ctaText));
    const hasCustomUrl = Boolean(banner.ctaUrl && !VERIFIED_CTA_ROUTES.some((r) => r.path === banner.ctaUrl));
    setIsCustomCtaText(hasCustomText);
    setIsCustomCtaUrl(hasCustomUrl);
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

    if (file.size > 5 * 1024 * 1024) {
      setError(`File is too large (max 5MB): ${file.name}`);
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
    if (e && e.preventDefault) e.preventDefault();
    if (saving) return;

    if (!form.title.trim()) {
      setError('Banner title is required');
      return;
    }
    if (!editingBanner && !form.desktopImageData) {
      setError('A desktop image is required to publish a new banner');
      return;
    }
    if (form.ctaUrl && form.ctaUrl.trim()) {
      const urlVal = form.ctaUrl.trim();
      const isRelative = /^\/(?!\/)[^\s]*$/.test(urlVal);
      let isAbsolute = false;
      try {
        const u = new URL(urlVal);
        isAbsolute = u.protocol === 'http:' || u.protocol === 'https:';
      } catch {
        isAbsolute = false;
      }
      if (!isRelative && !isAbsolute) {
        setError('CTA Destination Link must be a valid internal path (e.g. /colleges) or a safe http(s) URL');
        return;
      }
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

  const handleToggleActive = async (banner) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/banners/${banner._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !banner.isActive }),
      });
      if (res.ok) {
        fetchBanners();
      }
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const closeModal = () => {
    if (!saving) {
      setModalOpen(false);
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
            {BANNER_PLACEMENTS_LIST.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
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
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-slate-400">
                      <FaImage className="text-3xl mx-auto mb-1 opacity-40" />
                      <span className="text-[11px]">No image uploaded</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(b)}
                    title="Click to toggle active status"
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-all hover:scale-105 shadow-xs ${
                      b.isActive ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-500 text-white hover:bg-slate-600'
                    }`}
                  >
                    {b.isActive ? 'Active' : 'Inactive'}
                  </button>
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
          onClose={closeModal}
          title={editingBanner ? 'Edit Promotional Banner' : 'Create New Promotional Banner'}
          subtitle="Configure dynamic promotional banners for home and academic pages"
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Form Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Banner Title *</label>
                      <input
                        type="text"
                        required
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="e.g. Free Engineering & Medical Counselling 2026"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Description / Tagline</label>
                      <textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Brief description visible on the hero card..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Placement Section</label>
                        <select
                          value={form.placement}
                          onChange={(e) => setForm((prev) => ({ ...prev, placement: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          {BANNER_PLACEMENTS_LIST.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Display Order (Sort Index)</label>
                        <input
                          type="number"
                          value={form.order}
                          onChange={(e) => setForm((prev) => ({ ...prev, order: parseInt(e.target.value, 10) || 0 }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">CTA Button Text</label>
                        <select
                          value={isCustomCtaText ? '__custom__' : (form.ctaText || '')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '__custom__') {
                              setIsCustomCtaText(true);
                            } else {
                              setIsCustomCtaText(false);
                              setForm((prev) => ({ ...prev, ctaText: val }));
                            }
                          }}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="">None (No CTA Button)</option>
                          {PREDEFINED_CTA_TEXTS.map((text) => (
                            <option key={text} value={text}>{text}</option>
                          ))}
                          <option value="__custom__">Custom Button Text...</option>
                        </select>
                        {isCustomCtaText && (
                          <input
                            type="text"
                            value={form.ctaText}
                            onChange={(e) => setForm((prev) => ({ ...prev, ctaText: e.target.value }))}
                            placeholder="Enter custom button text"
                            className="mt-2 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">CTA Destination Link</label>
                        <select
                          value={isCustomCtaUrl ? '__custom__' : (form.ctaUrl || '')}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '__custom__') {
                              setIsCustomCtaUrl(true);
                            } else {
                              setIsCustomCtaUrl(false);
                              setForm((prev) => ({ ...prev, ctaUrl: val }));
                            }
                          }}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="">None (No Link)</option>
                          {VERIFIED_CTA_ROUTES.map((route) => (
                            <option key={route.path} value={route.path}>{route.label}</option>
                          ))}
                          <option value="__custom__">Custom URL...</option>
                        </select>
                        {isCustomCtaUrl && (
                          <input
                            type="text"
                            value={form.ctaUrl}
                            onChange={(e) => setForm((prev) => ({ ...prev, ctaUrl: e.target.value }))}
                            placeholder="e.g. /custom-page or https://..."
                            className="mt-2 w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Schedule Start Date (Optional)</label>
                        <input
                          type="date"
                          value={form.startsAt}
                          onChange={(e) => setForm((prev) => ({ ...prev, startsAt: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Schedule End Date (Optional)</label>
                        <input
                          type="date"
                          value={form.endsAt}
                          onChange={(e) => setForm((prev) => ({ ...prev, endsAt: e.target.value }))}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={form.isActive}
                        onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <label htmlFor="isActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                        Active & visible on configured website pages
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Visual Previews & Uploads */}
                  <div className="lg:col-span-5 space-y-5">
                    {/* Desktop Image */}
                    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800 text-xs">
                          Desktop Image {!editingBanner && <span className="text-rose-500">*</span>}
                        </label>
                        <span className="text-[10px] text-slate-400">JPG/PNG/WebP</span>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleFileChange(e, 'desktop')}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {form.desktopImageName && (
                        <p className="text-[10px] font-medium text-emerald-600">Selected: {form.desktopImageName}</p>
                      )}
                      <div className="h-44 sm:h-48 w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative flex items-center justify-center">
                        {(form.desktopImageData || editingBanner?.desktopImageUrl) ? (
                          <>
                            <img
                              src={form.desktopImageData || editingBanner?.desktopImageUrl}
                              alt="Desktop preview"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                              Desktop Preview
                            </span>
                          </>
                        ) : (
                          <div className="text-center text-slate-400 p-4">
                            <FaImage className="text-3xl mx-auto mb-2 opacity-40" />
                            <span className="text-[11px] font-medium block">No desktop image selected</span>
                            <span className="text-[10px] text-slate-400">Recommended: 1920 × 600</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Image */}
                    <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800 text-xs">
                          Mobile Image <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <span className="text-[10px] text-slate-400">JPG/PNG/WebP</span>
                      </div>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => handleFileChange(e, 'mobile')}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      {form.mobileImageName && (
                        <p className="text-[10px] font-medium text-emerald-600">Selected: {form.mobileImageName}</p>
                      )}
                      <div className="h-44 sm:h-48 w-full rounded-xl border border-slate-200 overflow-hidden bg-slate-100 relative flex items-center justify-center">
                        {(form.mobileImageData || editingBanner?.mobileImageUrl) ? (
                          <>
                            <img
                              src={form.mobileImageData || editingBanner?.mobileImageUrl}
                              alt="Mobile preview"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                              Mobile Preview
                            </span>
                          </>
                        ) : (
                          <div className="text-center text-slate-400 p-4">
                            <FaImage className="text-3xl mx-auto mb-2 opacity-40" />
                            <span className="text-[11px] font-medium block">No mobile image selected</span>
                            <span className="text-[10px] text-slate-400">Optional: 800 × 600</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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
