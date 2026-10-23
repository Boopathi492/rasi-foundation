import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import Payment from '@/backend/models/Payment';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const payments = await Payment.find().sort({ createdAt: -1 }).lean();

    // Calculate stats
    const total = payments.length;
    const paid = payments.filter(p => p.status === 'paid').length;
    const pending = payments.filter(p => p.status === 'created').length;
    const amount = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    res.status(200).json({
      payments,
      stats: { total, paid, pending, amount }
    });

  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default withAuth(handler);
