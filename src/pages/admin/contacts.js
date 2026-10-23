import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { 
  FaSearch, 
  FaFilter, 
  FaEye,
  FaTrash,
  FaSpinner,
  FaEnvelope,
  FaPhone,
  FaTimes,
  FaCheck,
  FaReply
} from 'react-icons/fa';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status } : c));
        if (selectedContact?._id === id) {
          setSelectedContact({ ...selectedContact, status });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        setContacts(contacts.filter(c => c._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const viewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
    if (contact.status === 'new') {
      updateStatus(contact._id, 'read');
    }
  };

  const statusColors = {
    new: 'bg-red-100 text-red-700',
    read: 'bg-yellow-100 text-yellow-700',
    responded: 'bg-green-100 text-green-700'
  };

  return (
    <AdminLayout title="Contacts">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
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
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="responded">Responded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-12">
            <FaEnvelope className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No contacts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 truncate max-w-xs">{contact.subject}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[contact.status]}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => viewContact(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteContact(contact._id)}
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
      {showModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Contact Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium text-gray-800">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[selectedContact.status]}`}>
                      {selectedContact.status}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-500">Subject</label>
                <p className="font-medium text-gray-800">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500">Message</label>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedContact.message}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500">Received On</label>
                <p className="text-gray-600">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedContact._id, 'read')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    selectedContact.status === 'read' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaEye /> Mark Read
                </button>
                <button
                  onClick={() => updateStatus(selectedContact._id, 'responded')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    selectedContact.status === 'responded' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaCheck /> Mark Responded
                </button>
              </div>
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-700"
              >
                <FaReply /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
