import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { 
  FaSearch, 
  FaFilter, 
  FaEye,
  FaSpinner,
  FaRupeeSign,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaDownload
} from 'react-icons/fa';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, amount: 0 });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    created: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700'
  };

  const statusIcons = {
    created: FaClock,
    paid: FaCheckCircle,
    failed: FaTimesCircle,
    refunded: FaTimesCircle
  };

  const purposeLabels = {
    consultation: 'Career Consultation',
    counseling: 'Admission Counseling',
    premium: 'Premium Package',
    custom: 'Custom Payment'
  };

  return (
    <AdminLayout title="Payments">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Payments</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-green-600">Successful</p>
          <p className="text-2xl font-bold text-green-700">{stats.paid}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4">
          <p className="text-sm text-yellow-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-600">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-700">₹{stats.amount.toLocaleString()}</p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or order ID..."
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
              <option value="paid">Paid</option>
              <option value="created">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <FaRupeeSign className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No payments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Purpose</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPayments.map((payment) => {
                  const StatusIcon = statusIcons[payment.status];
                  return (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-mono text-sm text-gray-600">{payment.orderId.slice(-12)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{payment.name}</p>
                          <p className="text-sm text-gray-500">{payment.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{purposeLabels[payment.purpose] || payment.purpose}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">₹{payment.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${statusColors[payment.status]}`}>
                          <StatusIcon className="text-xs" />
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => { setSelectedPayment(payment); setShowModal(true); }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Payment Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="text-center pb-4 border-b">
                <p className="text-4xl font-bold text-gray-800">₹{selectedPayment.amount}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full mt-2 ${statusColors[selectedPayment.status]}`}>
                  {selectedPayment.status === 'paid' ? <FaCheckCircle /> : <FaClock />}
                  {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Order ID</label>
                  <p className="font-mono text-sm text-gray-800">{selectedPayment.orderId}</p>
                </div>
                {selectedPayment.paymentId && (
                  <div>
                    <label className="text-sm text-gray-500">Payment ID</label>
                    <p className="font-mono text-sm text-gray-800">{selectedPayment.paymentId}</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Customer Name</label>
                  <p className="font-medium text-gray-800">{selectedPayment.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium text-gray-800">{selectedPayment.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="font-medium text-gray-800">{selectedPayment.email}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500">Purpose</label>
                <p className="font-medium text-gray-800">{purposeLabels[selectedPayment.purpose] || selectedPayment.purpose}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Created At</label>
                  <p className="text-gray-600">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                </div>
                {selectedPayment.paidAt && (
                  <div>
                    <label className="text-sm text-gray-500">Paid At</label>
                    <p className="text-gray-600">{new Date(selectedPayment.paidAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
