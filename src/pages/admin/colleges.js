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
  FaToggleOff,
  FaGraduationCap,
  FaGlobe,
  FaExternalLinkAlt
} from 'react-icons/fa';

export const DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kancheepuram',
  'Kanniyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar',
  'Bengaluru Zone',
  'Coimbatore Zone',
  'Erode District',
  'Namakkal District',
  'Salem District',
  'Women Centric Colleges',
  'Well Connected Universities'
];

export const COLLEGE_TYPES = [
  'Engineering',
  'Arts & Science',
  'Medical',
  'Polytechnic',
  'Law',
  'Management',
  'Education',
  'Agriculture',
  'Other'
];

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: 'Chennai',
    type: 'Engineering',
    specialization: '',
    institutionType: '',
    sourceUrl: '',
    verificationStatus: 'directory_listed',
    tneaCode: '',
    tneaStatus: 'not_applicable',
    tneaSourceYear: '',
    website: '',
    departments: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingCollege
        ? `/api/admin/colleges/${editingCollege._id}`
        : '/api/admin/colleges';

      // Parse departments string into array of trimmed non-empty strings
      const deptsArray = typeof formData.departments === 'string'
        ? formData.departments
            .split(/[\n,]+/)
            .map(d => d.trim())
            .filter(Boolean)
        : Array.isArray(formData.departments) ? formData.departments : [];

      const payload = {
        name: formData.name.trim(),
        location: formData.location.trim(),
        district: formData.district.trim(),
        type: formData.type || 'Engineering',
        specialization: formData.specialization ? formData.specialization.trim() : '',
        institutionType: formData.institutionType ? formData.institutionType.trim() : '',
        sourceUrl: formData.sourceUrl ? formData.sourceUrl.trim() : '',
        verificationStatus: formData.verificationStatus || 'directory_listed',
        tneaCode: formData.tneaCode ? formData.tneaCode.trim() : '',
        tneaStatus: formData.tneaStatus || 'not_applicable',
        tneaSourceYear: formData.tneaSourceYear ? formData.tneaSourceYear.trim() : '',
        website: formData.website ? formData.website.trim() : '',
        departments: deptsArray,
        note: formData.note ? formData.note.trim() : '',
        isActive: Boolean(formData.isActive),
        order: parseInt(formData.order, 10) || 0,
      };

      const response = await fetch(url, {
        method: editingCollege ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const saved = await response.json();
        if (editingCollege) {
          setColleges(colleges.map(c => c._id === saved._id ? saved : c));
          setToast({ show: true, message: 'College updated successfully!', type: 'success' });
        } else {
          setColleges([...colleges, saved]);
          setToast({ show: true, message: `${saved.name} added successfully!`, type: 'success' });
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
      name: college.name || '',
      location: college.location || '',
      district: college.district || 'Chennai',
      type: college.type || 'Engineering',
      specialization: college.specialization || '',
      institutionType: college.institutionType || '',
      sourceUrl: college.sourceUrl || '',
      verificationStatus: college.verificationStatus || 'directory_listed',
      tneaCode: college.tneaCode || '',
      tneaStatus: college.tneaStatus || (college.tneaCode ? 'verified' : 'not_applicable'),
      tneaSourceYear: college.tneaSourceYear || '',
      website: college.website || '',
      departments: Array.isArray(college.departments) ? college.departments.join('\n') : '',
      note: college.note || '',
      isActive: college.isActive !== false,
      order: college.order || 0,
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingCollege(null);
    setFormData({
      name: '',
      location: '',
      district: 'Chennai',
      type: 'Engineering',
      specialization: '',
      institutionType: '',
      sourceUrl: '',
      verificationStatus: 'directory_listed',
      tneaCode: '',
      tneaStatus: 'not_applicable',
      tneaSourceYear: '',
      website: '',
      departments: '',
      note: '',
      isActive: true,
      order: colleges.length + 1,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCollege(null);
    setFormData({
      name: '',
      location: '',
      district: 'Chennai',
      type: 'Engineering',
      specialization: '',
      institutionType: '',
      sourceUrl: '',
      verificationStatus: 'directory_listed',
      tneaCode: '',
      tneaStatus: 'not_applicable',
      tneaSourceYear: '',
      website: '',
      departments: '',
      note: '',
      isActive: true,
      order: 0,
    });
  };

  const filteredColleges = colleges.filter(college => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q ||
      college.name.toLowerCase().includes(q) ||
      (college.location || '').toLowerCase().includes(q) ||
      (college.district || '').toLowerCase().includes(q) ||
      (college.type || '').toLowerCase().includes(q) ||
      (college.tneaCode && college.tneaCode.toLowerCase().includes(q)) ||
      (Array.isArray(college.departments) && college.departments.some(d => d.toLowerCase().includes(q)));

    const matchesDistrict = districtFilter === 'all' || college.district === districtFilter;
    const matchesType = typeFilter === 'all' || (college.type || 'Engineering') === typeFilter;
    return matchesSearch && matchesDistrict && matchesType;
  });

  // Group by district
  const groupedColleges = filteredColleges.reduce((acc, college) => {
    const dist = college.district || 'Other';
    if (!acc[dist]) {
      acc[dist] = [];
    }
    acc[dist].push(college);
    return acc;
  }, {});

  const activeCount = colleges.filter(c => c.isActive).length;
  const uniqueDistricts = [...new Set(colleges.map(c => c.district))].length;

  if (loading) {
    return (
      <AdminLayout title="Manage Colleges">
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-crimson" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Colleges">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">College Master Catalog</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage partner institutions, autonomous colleges, and universities across Tamil Nadu
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-crimson text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-crimson-dark transition shadow-sm active:scale-95"
            >
              <FaPlus />
              Add College
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="relative">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, city, course, TNEA code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-crimson text-sm"
            />
          </div>
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-crimson text-sm"
            >
              <option value="all">All Districts ({colleges.length})</option>
              {DISTRICTS.map(district => {
                const count = colleges.filter(c => c.district === district).length;
                return (
                  <option key={district} value={district}>
                    {district} {count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-crimson text-sm"
            >
              <option value="all">All Course Streams / Types</option>
              {COLLEGE_TYPES.map(t => {
                const count = colleges.filter(c => (c.type || 'Engineering') === t).length;
                return (
                  <option key={t} value={t}>
                    {t} {count > 0 ? `(${count})` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Colleges</p>
          <p className="text-2xl font-black text-gray-900 mt-1">{colleges.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Active Colleges</p>
          <p className="text-2xl font-black text-forest mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Districts Represented</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{uniqueDistricts}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Matching Filter</p>
          <p className="text-2xl font-black text-crimson mt-1">{filteredColleges.length}</p>
        </div>
      </div>

      {/* Colleges by District */}
      {Object.keys(groupedColleges).length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <FaUniversity className="text-5xl text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700">No Colleges Found</h3>
          <p className="text-gray-500 text-sm mt-1">
            {colleges.length === 0
              ? 'No colleges in database. You can add new colleges using the Add College button.'
              : 'No colleges match your active search and filter criteria.'}
          </p>
        </div>
      ) : (
        Object.entries(groupedColleges).map(([district, districtColleges]) => (
          <div key={district} className="mb-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-forest to-forest-dark text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gold-300" />
                <h3 className="font-bold text-base">{district}</h3>
              </div>
              <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {districtColleges.length} {districtColleges.length === 1 ? 'college' : 'colleges'}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">College Name</th>
                    <th className="py-3 px-4">Stream / Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">TNEA Code</th>
                    <th className="py-3 px-4">Departments</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districtColleges.map((college) => (
                    <tr key={college._id} className={`hover:bg-slate-50/80 transition-colors ${!college.isActive ? 'opacity-60 bg-gray-50/50' : ''}`}>
                      <td className="py-3.5 px-4 font-medium text-gray-900 max-w-xs">
                        <div>
                          <p className="font-semibold">{college.name}</p>
                          {college.website && (
                            <a
                              href={college.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-0.5"
                            >
                              <FaGlobe className="text-[10px]" /> Official Website <FaExternalLinkAlt className="text-[9px]" />
                            </a>
                          )}
                          {college.note && (
                            <p className="text-xs text-amber-700 mt-0.5 line-clamp-1">{college.note}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-block bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {college.type || 'Engineering'}
                          </span>
                          {college.specialization && (
                            <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200/50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              {college.specialization}
                            </span>
                          )}
                          {college.institutionType && (
                            <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                              {college.institutionType}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-crimson text-xs shrink-0" />
                          <span>{college.location}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {college.tneaStatus === 'verified' && college.tneaCode ? (
                          <span className="inline-flex items-center gap-1 bg-gold-100 text-gold-700 px-2 py-0.5 rounded-md font-mono text-xs font-semibold" title={`TNEA Code: ${college.tneaCode} (${college.tneaSourceYear || '2024'})`}>
                            <FaCode className="text-[10px]" /> {college.tneaCode}
                          </span>
                        ) : college.tneaStatus === 'pending_verification' ? (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md text-xs font-medium">
                            Pending
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">N/A</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        {Array.isArray(college.departments) && college.departments.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-forest font-semibold bg-forest/10 px-2 py-0.5 rounded-full">
                            <FaGraduationCap /> {college.departments.length} depts
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">0 depts</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleActive(college)}
                          className={`flex items-center gap-1 text-xs font-semibold ${
                            college.isActive ? 'text-forest' : 'text-gray-400'
                          }`}
                        >
                          {college.isActive ? (
                            <>
                              <FaToggleOn className="text-lg text-forest" /> Active
                            </>
                          ) : (
                            <>
                              <FaToggleOff className="text-lg text-gray-400" /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(college)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit College"
                          >
                            <FaEdit className="text-base" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCollege(college._id)}
                            className="p-1.5 text-crimson hover:bg-crimson/10 rounded-lg transition"
                            title="Delete College"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92dvh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingCollege ? `Edit: ${editingCollege.name}` : 'Add New College'}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg transition"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 min-h-0 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  College Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  placeholder="e.g. College of Engineering, Guindy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  >
                    {DISTRICTS.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="e.g. Guindy, Chennai"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Stream / Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  >
                    {COLLEGE_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Specialization / Stream Focus
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="e.g. Pharmacy, Nursing, Computer Science, Polytechnic"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Institution Type
                  </label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  >
                    <option value="">Select Institution Type (optional)</option>
                    <option value="Government">Government</option>
                    <option value="Government-Aided">Government-Aided</option>
                    <option value="Autonomous">Autonomous</option>
                    <option value="Private">Private / Self-Financing</option>
                    <option value="Deemed / University">Deemed / University</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    TNEA Code
                  </label>
                  <input
                    type="text"
                    value={formData.tneaCode}
                    onChange={(e) => setFormData({ ...formData, tneaCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="e.g. 0001 or 2006"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    TNEA Status
                  </label>
                  <select
                    value={formData.tneaStatus || 'not_applicable'}
                    onChange={(e) => setFormData({ ...formData, tneaStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  >
                    <option value="verified">Verified (TNEA Participating)</option>
                    <option value="not_applicable">Not Applicable (Non-TNEA)</option>
                    <option value="pending_verification">Pending Verification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    TNEA Source Year
                  </label>
                  <input
                    type="text"
                    value={formData.tneaSourceYear || ''}
                    onChange={(e) => setFormData({ ...formData, tneaSourceYear: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="e.g. 2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Source / Regulatory URL
                  </label>
                  <input
                    type="url"
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                    placeholder="https://pci.nic.in / https://nmc.org.in..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Verification Status
                </label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                >
                  <option value="Official Regulator Listed">Official Regulator Listed</option>
                  <option value="Official University Affiliated">Official University Affiliated</option>
                  <option value="Accredited / Verified Directory">Accredited / Verified Directory</option>
                  <option value="directory_listed">Directory Listed</option>
                  <option value="Self-Reported / Pending Verification">Self-Reported / Pending Verification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Departments / Degrees Offered (one per line or comma-separated)
                </label>
                <textarea
                  rows={4}
                  value={formData.departments}
                  onChange={(e) => setFormData({ ...formData, departments: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson font-mono text-xs"
                  placeholder="B.E. Computer Science and Engineering&#10;B.Tech. Information Technology&#10;B.E. Electronics and Communication Engineering"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Note / Highlights / Affiliation
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crimson focus:border-crimson"
                  placeholder="e.g. Autonomous, NAAC A++, Anna University Affiliate"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-crimson rounded focus:ring-crimson"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (visible in public directory)
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-crimson text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-crimson-dark transition flex items-center justify-center gap-2 shadow-sm"
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
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white font-medium text-sm flex items-center gap-2 ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
            }`}
          >
            <FaCheck /> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
