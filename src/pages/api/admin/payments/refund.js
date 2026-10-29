import dbConnect from '../../../../backend/lib/mongodb.js';
import { withAuth } from '../../../../backend/lib/auth.js';
import { can } from '../../../../backend/lib/rbac.js';
import { recordAudit } from '../../../../backend/lib/apiHandler.js';
import Payment from '../../../../backend/models/Payment.js';
import { rateLimiter } from '../../../../backend/lib/rateLimit.js';
import { getRazorpayClient, getRazorpayCredentials } from '../../../../backend/lib/razorpay.js';

const limiter = rateLimiter({ windowMs: 60_000, max: 20 });

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!limiter(req, res)) {
    return res.status(429).json({ message: 'Too many refund requests. Please wait.' });
  }

  // 1. RBAC authorization
  if (!can(req.user?.role, 'payments:refund')) {
    return res.status(403).json({ message: 'Forbidden: Insufficient privileges to process refunds' });
  }

  const { paymentId, amount, reason } = req.body || {};

  if (!paymentId) {
    return res.status(400).json({ message: 'Payment identifier is required' });
  }

  const refundAmt = parseFloat(amount);
  if (isNaN(refundAmt) || refundAmt <= 0) {
    return res.status(400).json({ message: 'A valid refund amount greater than 0 is required' });
  }

  await dbConnect();

  try {
    const query = {
      $or: [
        { razorpayPaymentId: paymentId },
        { razorpayOrderId: paymentId },
      ],
    };
    if (/^[0-9a-fA-F]{24}$/.test(paymentId)) {
      query.$or.push({ _id: paymentId });
    }

    const payment = await Payment.findOne(query);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    if (payment.status !== 'completed' && payment.status !== 'refunded') {
      return res.status(400).json({
        message: `Cannot refund payment in status '${payment.status}'. Only completed payments can be refunded.`,
      });
    }

    if (!payment.razorpayPaymentId) {
      return res.status(400).json({ message: 'Payment does not have a gateway payment ID attached' });
    }

    // 2. Validate refundable balance
    const currentRefunded = payment.refundAmount || 0;
    const remainingBalance = payment.amount - currentRefunded;

    if (refundAmt > remainingBalance) {
      return res.status(400).json({
        message: `Requested refund (₹${refundAmt}) exceeds maximum refundable balance of ₹${remainingBalance}`,
      });
    }

    const creds = getRazorpayCredentials();
    if (!creds.configured) {
      return res.status(500).json({ message: 'Razorpay gateway credentials are not configured' });
    }

    const razorpay = getRazorpayClient();

    // 3. Initiate Refund via official Razorpay SDK
    const refundPayload = {
      amount: Math.round(refundAmt * 100), // paise
      notes: {
        reason: (reason || 'Administrative refund').slice(0, 100),
        refundedBy: req.user?.username || req.user?.email || 'admin',
        paymentReceipt: payment.receipt || '',
      },
    };

    const rzpRefund = await razorpay.payments.refund(payment.razorpayPaymentId, refundPayload);

    // 4. Update Payment Document
    const newRefundedTotal = currentRefunded + refundAmt;
    payment.refundId = rzpRefund.id;
    payment.refundAmount = newRefundedTotal;
    payment.refundStatus = newRefundedTotal >= payment.amount ? 'full' : 'partial';
    if (payment.refundStatus === 'full') {
      payment.status = 'refunded';
    }
    payment.refundedAt = new Date();
    await payment.save();

    // 5. Record Audit Trail
    await recordAudit(req, {
      action: 'payment_refund',
      resourceType: 'payments',
      resourceId: payment._id,
      summary: {
        paymentId: payment.razorpayPaymentId,
        refundId: rzpRefund.id,
        amount: refundAmt,
        refundStatus: payment.refundStatus,
        reason: reason || 'Administrative refund',
      },
    });

    return res.status(200).json({
      success: true,
      message: `Refund of ₹${refundAmt} processed successfully`,
      refundId: rzpRefund.id,
      refundAmount: refundAmt,
      refundStatus: payment.refundStatus,
    });
  } catch (error) {
    console.error('[Admin Payments Refund] Error processing refund:', error);
    return res.status(500).json({
      message: 'Failed to process refund with gateway',
      detail: error.message,
    });
  }
}

export default withAuth(handler);
