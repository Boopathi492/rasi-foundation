import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaUniversity,
  FaMapMarkerAlt,
  FaTimes,
  FaCheck,
  FaSeedling,
  FaCode,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';

const DISTRICTS = [
  'Namakkal District',
  'Salem District',
  'Erode District',
  'Coimbatore Zone',
  'Bengaluru Zone',
  'Women Centric Colleges',
  'Well Connected Universities',
];

const districtColors = {
  'Namakkal District': 'from-red-500 to-red-600',
  'Salem District': 'from-green-500 to-green-600',
  'Erode District': 'from-blue-500 to-blue-600',
  'Coimbatore Zone': 'from-purple-500 to-purple-600',
  'Bengaluru Zone': 'from-indigo-500 to-indigo-600',
  'Women Centric Colleges': 'from-pink-500 to-rose-600',
  'Well Connected Universities': 'from-teal-500 to-cyan-600',
};

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: DISTRICTS[0],
    tneaCode: '',
    note: '',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        window.location.href = '/admin/login';
        return;
      }

      const response = await fetch('/api/admin/colleges', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 401) {
        // Token expired or invalid, redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setColleges(data);
      } else {
        console.error('Failed to fetch colleges:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch colleges:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedColleges = async () => {
    if (!confirm('This will seed initial colleges data. Continue?')) return;

    setSeeding(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/colleges/seed', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Successfully seeded ${data.count} colleges!`);
        fetchColleges();
      } else {
        alert(data.message || 'Failed to seed colleges');
      }
    } catch (error) {
      console.error('Failed to seed colleges:', error);
      alert('Failed to seed colleges');
    } finally {
      setSeeding(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingCollege
        ? `/api/admin/colleges/${editingCollege._id}`
        : '/api/admin/colleges';

      const response = await fetch(url, {
        method: editingCollege ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const college = await response.json();
        if (editingCollege) {
          setColleges(colleges.map(c => c._id === college._id ? college : c));
          setToast({ show: true, message: 'College updated successfully!', type: 'success' });
        } else {
          setColleges([...colleges, college]);
          setToast({ show: true, message: `${college.name} added successfully!`, type: 'success' });
        }
        closeModal();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to save college');
      }
    } catch (error) {
      console.error('Failed to save college:', error);
      alert('Failed to save college');
    }
  };

  const toggleActive = async (college) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/colleges/${college._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !college.isActive })
      });

      if (response.ok) {
        setColleges(colleges.map(c =>
          c._id === college._id ? { ...c, isActive: !c.isActive } : c
        ));
        setToast({
          show: true,
          message: `College ${!college.isActive ? 'activated' : 'deactivated'} successfully!`,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const deleteCollege = async (id) => {
    if (!confirm('Are you sure you want to delete this college?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/colleges/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setColleges(colleges.filter(c => c._id !== id));
        setToast({ show: true, message: 'College deleted successfully!', type: 'success' });
      } else {
        setToast({ show: true, message: 'Failed to delete college', type: 'error' });
      }
    } catch (error) {
      console.error('Failed to delete college:', error);
    }
  };

  const openEditModal = (college) => {
    setEditingCollege(college);
    setFormData({
      name: college.name,
      location: college.location,
      district: college.district,
      tneaCode: college.tneaCode || '',
      note: college.note || '',
      isActive: college.isActive,
      order: college.order || 0,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCollege(null);
    setFormData({
      name: '',
      location: '',
      district: DISTRICTS[0],
      code: '',
      note: '',
      isActive: true,
      order: colleges.length,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCollege(null);
    setFormData({
      name: '',
      location: '',
      district: DISTRICTS[0],
      tneaCode: '',
      note: '',
      isActive: true,
      order: 0,
    });
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (college.tneaCode && college.tneaCode.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDistrict = districtFilter === 'all' || college.district === districtFilter;
    return matchesSearch && matchesDistrict;
  });

  // Group by district
  const groupedColleges = filteredColleges.reduce((acc, college) => {
    if (!acc[college.district]) {
      acc[college.district] = [];
    }
    acc[college.district].push(college);
    return acc;
  }, {});

  if (loading) {
    return (
      <AdminLayout title="Manage Colleges">
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-red-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Colleges">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Colleges</h2>
            <p className="text-gray-500 text-sm">Manage partner colleges and institutions</p>
          </div>
          <div className="flex gap-2">
            {colleges.length === 0 && (
              <button
                onClick={seedColleges}
                disabled={seeding}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {seeding ? <FaSpinner className="animate-spin" /> : <FaSeedling />}
                Seed Initial Data
              </button>
            )}
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <FaPlus />
              Add College
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">All Districts</option>
            {DISTRICTS.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {DISTRICTS.map(district => (
          <button
            key={district}
            onClick={() => setDistrictFilter(district)}
            className={`bg-gradient-to-r ${districtColors[district]} text-white rounded-xl p-4 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden active:scale-95`}
          >
            <div className="relative z-10">
              <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider mb-1">{district}</p>
              <p className="text-3xl font-black">
                {colleges.filter(c => c.district === district).length}
              </p>
            </div>
            {/* Visual indicator for active filter */}
            {districtFilter === district && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              </div>
            )}
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FaUniversity className="text-6xl -rotate-12" />
            </div>
          </button>
        ))}
      </div>

      {/* Colleges by District */}
      {Object.keys(groupedColleges).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FaUniversity className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Colleges Found</h3>
          <p className="text-gray-500 mb-4">
            {colleges.length === 0
              ? 'Get started by seeding initial data or adding a new college.'
              : 'No colleges match your search criteria.'}
          </p>
        </div>
      ) : (
        Object.entries(groupedColleges).map(([district, districtColleges]) => (
          <div key={district} className="mb-6">
            <div className={`bg-gradient-to-r ${districtColors[district] || 'from-gray-500 to-gray-600'} text-white rounded-t-xl p-4`}>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <h3 className="font-semibold">{district}</h3>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  {districtColleges.length} colleges
                </span>
              </div>
            </div>
            <div className="bg-white rounded-b-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">College Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Location</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">TNEA Code</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {districtColleges.map((college) => (
                      <tr key={college._id} className={`hover:bg-gray-50 ${!college.isActive ? 'opacity-50' : ''}`}>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{college.name}</p>
                            {college.note && (
                              <p className="text-xs text-amber-600 mt-1">{college.note}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-red-500 text-xs" />
                            {college.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {college.tneaCode ? (
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                              <FaCode className="text-xs" />
                              {college.tneaCode}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleActive(college)}
                            className={`flex items-center gap-1 text-sm ${college.isActive ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            {college.isActive ? (
                              <>
                                <FaToggleOn className="text-xl" />
                                Active
                              </>
                            ) : (
                              <>
                                <FaToggleOff className="text-xl" />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(college)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteCollege(college._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
            </div>
          </div>
        ))
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {editingCollege ? 'Edit College' : 'Add New College'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  College Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter college name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="City/Town"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {DISTRICTS.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    TNEA Code
                  </label>
                  <input
                    type="text"
                    value={formData.tneaCode}
                    onChange={(e) => setFormData({ ...formData, tneaCode: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g., 2607"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Any additional notes"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Active (visible on public page)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <FaCheck />
                  {editingCollege ? 'Update College' : 'Add College'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
          >
            <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${toast.type === 'success'
              ? 'bg-green-600/90 border-green-500 text-white'
              : 'bg-red-600/90 border-red-500 text-white'
              }`}>
              {toast.type === 'success' ? (
                <div className="bg-white/20 p-2 rounded-full">
                  <FaCheck className="text-sm" />
                </div>
              ) : (
                <div className="bg-white/20 p-2 rounded-full">
                  <FaTimes className="text-sm" />
                </div>
              )}
              <p className="font-bold tracking-tight">{toast.message}</p>
              <button
                onClick={() => setToast({ ...toast, show: false })}
                className="ml-4 hover:opacity-70 transition-opacity"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
