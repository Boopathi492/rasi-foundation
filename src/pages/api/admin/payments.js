import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Payment from '@/backend/models/Payment';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  const payments = await Payment.find().sort({ createdAt: -1 }).lean();

  const mapped = payments.map(p => ({
    _id: p._id,
    orderId: p.razorpayOrderId,
    paymentId: p.razorpayPaymentId,
    amount: p.amount,
    currency: p.currency,
    name: p.name,
    email: p.email,
    phone: p.phone,
    purpose: p.purpose,
    studentName: p.studentName,
    notes: p.notes,
    status: p.status === 'completed' ? 'paid' : p.status,
    createdAt: p.createdAt,
    paidAt: p.completedAt,
  }));

  const paid = mapped.filter(p => p.status === 'paid');
  const pending = mapped.filter(p => p.status === 'created' || p.status === 'pending');
  const stats = {
    total: mapped.length,
    paid: paid.length,
    pending: pending.length,
    amount: paid.reduce((sum, p) => sum + p.amount, 0),
  };

  return res.status(200).json({ payments: mapped, stats });
}

export default withAuth(handler);
