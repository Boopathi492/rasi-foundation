import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Link from 'next/link';
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
  FaDownload,
  FaUndo,
  FaFilePdf,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaCreditCard,
} from 'react-icons/fa';

const PURPOSE_LABELS = {
  counseling: 'Career Counseling',
  admission: 'Admission Assistance',
  scholarship_test: 'Scholarship Test',
  course_fee: 'Course Fee',
  donation: 'Donation',
  other: 'Other Payment',
};

const STATUS_COLORS = {
  created: 'bg-amber-100 text-amber-800 border border-amber-200',
  pending: 'bg-amber-100 text-amber-800 border border-amber-200',
  paid: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  completed: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
  failed: 'bg-rose-100 text-rose-800 border border-rose-200',
  refunded: 'bg-slate-100 text-slate-700 border border-slate-300',
};

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, totalPages: 1 });
  const [stats, setStats] = useState({ total: 0, paid: 0, pending: 0, failed: 0, refunded: 0, amount: 0 });

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Refund Modal State
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [refunding, setRefunding] = useState(false);
  const [refundError, setRefundError] = useState('');
  const [refundSuccess, setRefundSuccess] = useState('');

  const fetchPayments = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams({
        page: String(page),
        limit: '20',
      });
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (purposeFilter !== 'all') params.set('purpose', purposeFilter);

      const response = await fetch(`/api/admin/payments?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
        setPagination(data.pagination || { total: 0, page: 1, limit: 20, totalPages: 1 });
        setStats(data.stats || { total: 0, paid: 0, pending: 0, failed: 0, refunded: 0, amount: 0 });
      } else if (response.status === 401) {
        window.location.href = '/admin/login';
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, purposeFilter]);

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage, fetchPayments]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPayments(1);
  };

  const handleOpenRefund = (payment) => {
    setSelectedPayment(payment);
    const refundable = payment.amount - (payment.refundAmount || 0);
    setRefundAmount(String(refundable));
    setRefundReason('');
    setRefundError('');
    setRefundSuccess('');
    setShowRefundModal(true);
  };

  const handleProcessRefund = async (e) => {
    e.preventDefault();
    if (!selectedPayment) return;
    setRefunding(true);
    setRefundError('');
    setRefundSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/payments/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentId: selectedPayment.paymentId || selectedPayment._id,
          amount: parseFloat(refundAmount),
          reason: refundReason.trim(),
        }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setRefundSuccess(json.message || 'Refund successfully processed');
        setTimeout(() => {
          setShowRefundModal(false);
          setShowModal(false);
          fetchPayments(currentPage);
        }, 1500);
      } else {
        setRefundError(json.message || 'Refund processing failed');
      }
    } catch (err) {
      setRefundError(err.message || 'Network error processing refund');
    } finally {
      setRefunding(false);
    }
  };

  return (
    <AdminLayout title="Payment Transactions">
      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Transactions</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Successful (Paid)</p>
          <p className="text-2xl font-black text-emerald-900 mt-1">{stats.paid}</p>
        </div>
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800">Initiated / Pending</p>
          <p className="text-2xl font-black text-amber-900 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-4 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-rose-800">Failed Attempts</p>
          <p className="text-2xl font-black text-rose-900 mt-1">{stats.failed}</p>
        </div>
        <div className="bg-sky-50/70 border border-sky-200/90 rounded-2xl p-4 shadow-xs col-span-2 md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-800">Total Revenue</p>
          <p className="text-2xl font-black text-sky-950 mt-1">₹{Number(stats.amount).toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-4 mb-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by payer name, email, phone, receipt or Razorpay ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-forest focus:border-forest"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-forest bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid (Successful)</option>
              <option value="created">Created (Incomplete)</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={purposeFilter}
              onChange={(e) => { setPurposeFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-forest bg-white"
            >
              <option value="all">All Categories</option>
              {Object.entries(PURPOSE_LABELS).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>

            <button
              type="submit"
              className="px-4 py-2.5 bg-forest hover:bg-forest-dark text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <FaSpinner className="animate-spin text-3xl text-forest" />
            <span className="text-xs font-semibold text-slate-500">Loading payment ledger...</span>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-16 px-4">
            <FaCreditCard className="text-5xl text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No Transactions Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No payment transactions match your active search and filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Receipt / Order</th>
                  <th className="py-3 px-4">Payer Contact</th>
                  <th className="py-3 px-4">Application / Student</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => {
                  const isPaid = p.status === 'paid' || p.status === 'completed';
                  return (
                    <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono">
                          <p className="font-bold text-slate-900">{p.receipt}</p>
                          <p className="text-[10px] text-slate-400">{p.orderId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-[11px] text-slate-500">{p.phone} • {p.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {p.bioDataId ? (
                          <div>
                            <Link
                              href={`/admin/biodata`}
                              className="font-bold text-forest hover:underline inline-flex items-center gap-1"
                            >
                              {p.studentName || 'Student Application'}
                              <FaExternalLinkAlt className="text-[9px]" />
                            </Link>
                            {p.studentDetails?.courseApplied && (
                              <p className="text-[10px] text-slate-400">{p.studentDetails.courseApplied}</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">{p.studentName || '— (Direct)'}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {PURPOSE_LABELS[p.purpose] || p.purpose}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">
                          ₹{Number(p.amount).toLocaleString('en-IN')}
                          {p.refundStatus && p.refundStatus !== 'none' && (
                            <span className="block text-[9px] font-bold text-amber-700">
                              (Refunded: ₹{p.refundAmount})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${STATUS_COLORS[p.status] || 'bg-slate-100 text-slate-700'}`}>
                          {isPaid ? <FaCheckCircle className="text-[9px]" /> : p.status === 'failed' ? <FaTimesCircle className="text-[9px]" /> : <FaClock className="text-[9px]" />}
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => { setSelectedPayment(p); setShowModal(true); }}
                            className="p-1.5 text-slate-600 hover:text-forest hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Transaction Details"
                          >
                            <FaEye />
                          </button>
                          {isPaid && (
                            <a
                              href={`/api/payment/receipt?paymentId=${p.paymentId || p.receipt || p._id}${typeof window !== 'undefined' && localStorage.getItem('adminToken') ? `&token=${localStorage.getItem('adminToken')}` : ''}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-forest hover:text-forest-dark hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Download PDF Receipt"
                            >
                              <FaFilePdf />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong> ({pagination.total} total transactions)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={pagination.page <= 1}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 font-semibold"
              >
                <FaChevronLeft className="text-[10px]" /> Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                disabled={pagination.page >= pagination.totalPages}
                className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 flex items-center gap-1 font-semibold"
              >
                Next <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Payment Breakdown</h3>
                <p className="text-xs text-slate-400 font-mono">Reference: {selectedPayment.receipt}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes className="text-base" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="text-center pb-4 border-b border-slate-100">
                <p className="text-3xl font-black text-slate-900">₹{selectedPayment.amount.toLocaleString('en-IN')}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full mt-2 ${STATUS_COLORS[selectedPayment.status]}`}>
                  {selectedPayment.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Razorpay Order ID</span>
                  <span className="font-mono font-medium text-slate-800">{selectedPayment.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Razorpay Payment ID</span>
                  <span className="font-mono font-medium text-slate-800">{selectedPayment.paymentId || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Payment Rail / Method</span>
                  <span className="font-medium text-slate-800 uppercase">{selectedPayment.paymentMethod || 'Online'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Payment Purpose</span>
                  <span className="font-medium text-slate-800">{PURPOSE_LABELS[selectedPayment.purpose] || selectedPayment.purpose}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payer Full Name:</span>
                  <span className="font-bold text-slate-800">{selectedPayment.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Payer Contact:</span>
                  <span className="text-slate-800">{selectedPayment.phone} • {selectedPayment.email}</span>
                </div>
                {selectedPayment.studentName && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Candidate Name:</span>
                    <span className="font-bold text-slate-800">{selectedPayment.studentName}</span>
                  </div>
                )}
                {selectedPayment.notes && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Remarks / Notes:</span>
                    <span className="text-slate-800 italic">{selectedPayment.notes}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Created Timestamp:</span>
                  <span className="text-slate-600">{new Date(selectedPayment.createdAt).toLocaleString('en-IN')}</span>
                </div>
                {selectedPayment.paidAt && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Captured Timestamp:</span>
                    <span className="text-emerald-700 font-semibold">{new Date(selectedPayment.paidAt).toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-2">
                {(selectedPayment.status === 'paid' || selectedPayment.status === 'completed') && (
                  <>
                    <a
                      href={`/api/payment/receipt?paymentId=${selectedPayment.paymentId || selectedPayment.receipt || selectedPayment._id}${typeof window !== 'undefined' && localStorage.getItem('adminToken') ? `&token=${localStorage.getItem('adminToken')}` : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-forest hover:bg-forest-dark text-white font-bold py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-xs"
                    >
                      <FaFilePdf /> Download Receipt (PDF)
                    </a>
                    {(!selectedPayment.refundStatus || selectedPayment.refundStatus !== 'full') && (
                      <button
                        type="button"
                        onClick={() => handleOpenRefund(selectedPayment)}
                        className="px-4 py-2.5 border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <FaUndo /> Issue Refund
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refund Confirmation Modal */}
      {showRefundModal && selectedPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-rose-900 flex items-center gap-2">
                <FaUndo /> Issue Gateway Refund
              </h3>
              <button onClick={() => setShowRefundModal(false)} className="text-slate-400 hover:text-slate-600">
                <FaTimes />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Initiates an official refund via Razorpay for transaction <strong className="font-mono text-slate-700">{selectedPayment.paymentId}</strong>.
            </p>

            <form onSubmit={handleProcessRefund} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Refund Amount (₹ INR)
                </label>
                <input
                  type="number"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  max={selectedPayment.amount - (selectedPayment.refundAmount || 0)}
                  min="1"
                  required
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Maximum available to refund: ₹{selectedPayment.amount - (selectedPayment.refundAmount || 0)}
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Administrative Reason
                </label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  placeholder="e.g. Student requested fee cancellation / duplicate payment"
                  rows="2"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>

              {refundError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs font-medium">
                  {refundError}
                </div>
              )}
              {refundSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl text-xs font-bold">
                  {refundSuccess}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={refunding}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs"
                >
                  {refunding ? 'Processing...' : 'Confirm Refund'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
