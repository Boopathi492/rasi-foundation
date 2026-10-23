import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { 
  FaSearch, 
  FaFilter, 
  FaEye,
  FaTrash,
  FaSpinner,
  FaUserGraduate,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaGraduationCap
} from 'react-icons/fa';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/enquiries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        setEnquiries(enquiries.map(e => e._id === id ? { ...e, status } : e));
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        setEnquiries(enquiries.filter(e => e._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to delete enquiry:', error);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          enquiry.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    enrolled: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700'
  };

  return (
    <AdminLayout title="Enquiries">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12">
            <FaUserGraduate className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No enquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Student</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Course</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Phone</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{enquiry.name}</p>
                        <p className="text-sm text-gray-500">{enquiry.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-sm">
                        <FaGraduationCap className="text-xs" />
                        {enquiry.course}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${enquiry.phone}`} className="text-blue-600 hover:underline">
                        {enquiry.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[enquiry.status]}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedEnquiry(enquiry); setShowModal(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteEnquiry(enquiry._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* View Modal */}
      {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Enquiry Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-gray-800">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[selectedEnquiry.status]}`}>
                      {selectedEnquiry.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline">
                      {selectedEnquiry.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 hover:underline">
                      {selectedEnquiry.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Course Interested</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaGraduationCap className="text-purple-600" />
                    {selectedEnquiry.course}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Qualification</label>
                  <p className="font-medium text-gray-800">{selectedEnquiry.qualification || 'Not specified'}</p>
                </div>
              </div>
              
              {selectedEnquiry.message && (
                <div>
                  <label className="text-sm text-gray-500">Message</label>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedEnquiry.message}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm text-gray-500">Enquiry Date</label>
                <p className="text-gray-600">
                  {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t">
              <label className="text-sm text-gray-500 mb-2 block">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {['pending', 'contacted', 'enrolled', 'closed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(selectedEnquiry._id, status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                      selectedEnquiry.status === status 
                        ? statusColors[status]
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
