import dbConnect from '../../../backend/lib/mongodb.js';
import { withAuth } from '../../../backend/lib/auth.js';
import { can } from '../../../backend/lib/rbac.js';
import Payment from '../../../backend/models/Payment.js';

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 1. RBAC authorization guard
  if (!can(req.user?.role, 'payments:view')) {
    return res.status(403).json({ message: 'Forbidden: Insufficient privileges to view financial payments' });
  }

  await dbConnect();

  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      status = 'all',
      purpose = 'all',
      startDate,
      endDate,
    } = req.query;

    const query = {};

    // Filter by lifecycle status
    if (status && status !== 'all') {
      if (status === 'paid') {
        query.status = 'completed';
      } else {
        query.status = status;
      }
    }

    // Filter by purpose
    if (purpose && purpose !== 'all') {
      query.purpose = purpose;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Search by name, email, phone, orderId, paymentId, or receipt
    if (search && search.trim()) {
      const q = escapeRegex(search.trim());
      const regex = new RegExp(q, 'i');
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { razorpayOrderId: regex },
        { razorpayPaymentId: regex },
        { receipt: regex },
        { studentName: regex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [payments, totalMatching, allStatsDocs] = await Promise.all([
      Payment.find(query)
        .populate('bioDataId', 'studentName studentMobile studentEmail courseApplied collegeName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Payment.countDocuments(query),
      Payment.find({}, 'amount status refundAmount').lean(),
    ]);

    // Aggregate overall KPI metrics
    let totalRevenue = 0;
    let completedCount = 0;
    let createdCount = 0;
    let failedCount = 0;
    let refundedCount = 0;

    for (const doc of allStatsDocs) {
      if (doc.status === 'completed') {
        completedCount++;
        totalRevenue += (doc.amount || 0);
      } else if (doc.status === 'created' || doc.status === 'pending') {
        createdCount++;
      } else if (doc.status === 'failed') {
        failedCount++;
      } else if (doc.status === 'refunded') {
        refundedCount++;
      }
    }

    const mapped = payments.map(p => ({
      _id: p._id,
      receipt: p.receipt || `RCPT_${p._id}`,
      orderId: p.razorpayOrderId,
      paymentId: p.razorpayPaymentId,
      amount: p.amount,
      currency: p.currency || 'INR',
      name: p.name,
      email: p.email,
      phone: p.phone,
      purpose: p.purpose,
      studentName: p.studentName || p.bioDataId?.studentName || null,
      bioDataId: p.bioDataId?._id || p.bioDataId || null,
      studentDetails: p.bioDataId || null,
      notes: p.notes,
      paymentMethod: p.paymentMethod,
      bank: p.bank,
      vpa: p.vpa,
      status: p.status === 'completed' ? 'paid' : p.status,
      refundStatus: p.refundStatus || 'none',
      refundAmount: p.refundAmount || 0,
      refundId: p.refundId || null,
      createdAt: p.createdAt,
      paidAt: p.completedAt,
    }));

    return res.status(200).json({
      payments: mapped,
      pagination: {
        total: totalMatching,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalMatching / limitNum) || 1,
      },
      stats: {
        total: allStatsDocs.length,
        paid: completedCount,
        pending: createdCount,
        failed: failedCount,
        refunded: refundedCount,
        amount: totalRevenue,
      },
    });
  } catch (error) {
    console.error('[Admin Payments] Failed to query payments:', error);
    return res.status(500).json({ message: 'Internal server error fetching payments' });
  }
}

export default withAuth(handler);
