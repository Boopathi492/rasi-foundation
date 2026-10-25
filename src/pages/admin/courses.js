import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Modal from '@/frontend/components/admin/Modal';
import ConfirmDialog from '@/frontend/components/admin/ConfirmDialog';
import {
  FaPlus,
  FaSearch,
  FaBook,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaGraduationCap,
  FaCheck,
  FaTimes,
  FaUniversity,
} from 'react-icons/fa';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    code: '',
    level: 'UG',
    category: '',
    description: '',
    eligibility: '',
    duration: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchCourses();
  }, [levelFilter, search]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (levelFilter !== 'all') params.append('level', levelFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`/api/admin/courses?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (err) {
      console.error('Fetch courses error:', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setForm({
      name: '',
      code: '',
      level: 'UG',
      category: '',
      description: '',
      eligibility: '',
      duration: '',
      isActive: true,
      order: 0,
    });
    setError('');
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingCourse(c);
    setForm({
      name: c.name || '',
      code: c.code || '',
      level: c.level || 'UG',
      category: c.category || '',
      description: c.description || '',
      eligibility: c.eligibility || '',
      duration: c.duration || '',
      isActive: Boolean(c.isActive),
      order: c.order || 0,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Course name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingCourse
        ? `/api/admin/courses/${editingCourse._id}`
        : '/api/admin/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save course');

      setModalOpen(false);
      fetchCourses();
    } catch (err) {
      setError(err.message || 'Error saving course');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/courses/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeleteTarget(null);
        fetchCourses();
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout title="Course Management">
      <div className="space-y-6">
        {/* Header summary */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Academic Programs & Branches</h2>
            <p className="text-xs text-slate-500">
              Manage degree programs, diploma streams, eligibility requirements, and duration for student advisory.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <FaPlus />
            <span>Add Course</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            {['all', 'UG', 'PG', 'Diploma', 'Doctorate', 'Certificate'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  levelFilter === lvl
                    ? 'bg-white text-slate-800 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search course name or code..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Courses Grid / Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              <FaBook className="text-4xl text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-700">No courses found</p>
              <p className="mt-1">Add a program or adjust search filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Course Name & Code</th>
                    <th className="px-5 py-3.5">Level</th>
                    <th className="px-5 py-3.5">Category / Discipline</th>
                    <th className="px-5 py-3.5">Duration</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800">{c.name}</p>
                        {c.code && (
                          <span className="text-[10px] font-mono text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                            {c.code}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {c.level}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-700 font-medium">{c.category || '—'}</td>
                      <td className="px-5 py-4 text-slate-600">{c.duration || '—'}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(c)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Course"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => setDeleteTarget({ id: c._id, name: c.name })}
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

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingCourse ? 'Edit Degree / Diploma Program' : 'Add New Academic Course'}
          subtitle="Configure degree programs, eligibility requirements, duration and branches"
          size="lg"
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
                form="course-form"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-950/20 inline-flex items-center gap-2 text-xs"
              >
                {saving && <FaSpinner className="animate-spin text-xs" />}
                <span>{editingCourse ? 'Update Course' : 'Create Course'}</span>
              </button>
            </>
          }
        >

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {error}
                </div>
              )}

              <form id="course-form" onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. B.Tech Artificial Intelligence and Data Science"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                    <input
                      type="text"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      placeholder="e.g. AI-DS"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none uppercase"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Level</label>
                    <select
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                    >
                      <option value="UG">UG (Undergraduate)</option>
                      <option value="PG">PG (Postgraduate)</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Doctorate">Doctorate (Ph.D)</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="e.g. 4 Years (8 Semesters)"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category / Discipline</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Engineering & Technology / Computer Sciences"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                  <textarea
                    rows={2}
                    value={form.eligibility}
                    onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                    placeholder="e.g. Pass in 10+2 with Physics, Chemistry, and Mathematics..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description / Curriculum Overview</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the course specializations and industry prospects..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isCourseActive"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor="isCourseActive" className="text-xs font-semibold text-slate-700">
                    Active & visible in student forms and course directory
                  </label>
                </div>

              </form>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={Boolean(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          title="Delete Academic Course"
          message={`Are you sure you want to delete course "${deleteTarget?.name}"? Students will no longer be able to select this program.`}
          confirmLabel="Delete Course"
          variant="danger"
          isLoading={deleting}
        />
      </div>
    </AdminLayout>
  );
}
