import crypto from 'crypto';
import Razorpay from 'razorpay';
import dbConnect from '../../../backend/lib/mongodb.js';
import Payment from '../../../backend/models/Payment.js';
import BioData from '../../../backend/models/BioData.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import { getRazorpayCredentials, getRazorpayClient } from '../../../backend/lib/razorpay.js';

const limiter = rateLimiter({ windowMs: 60_000, max: 30 });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    if (!limiter(req, res)) {
      return res.status(429).json({
        success: false,
        message: 'Too many verification attempts. Please wait.',
      });
    }

    await dbConnect();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body || {};

    // 1. Validate required inputs
    if (!razorpay_order_id || typeof razorpay_order_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Razorpay order ID is required' });
    }
    if (!razorpay_payment_id || typeof razorpay_payment_id !== 'string') {
      return res.status(400).json({ success: false, message: 'Razorpay payment ID is required' });
    }
    if (!razorpay_signature || typeof razorpay_signature !== 'string') {
      return res.status(400).json({ success: false, message: 'Razorpay signature is required' });
    }

    const creds = getRazorpayCredentials();
    const keySecret = creds.keySecret;
    if (!keySecret) {
      console.error('[Payment Verify] RAZORPAY_KEY_SECRET is not configured');
      return res.status(500).json({ success: false, message: 'Payment gateway configuration error' });
    }

    // 2. Cryptographic signature check with constant-time comparison
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    const sigBuf = Buffer.from(razorpay_signature, 'utf8');
    const expBuf = Buffer.from(expectedSignature, 'utf8');

    const isValid = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: cryptographic signature mismatch',
      });
    }

    // 3. Locate server-created payment record
    let payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

    // Idempotency: If payment was already verified and marked completed, return success safely
    if (payment && payment.status === 'completed') {
      return res.status(200).json({
        success: true,
        message: 'Payment already verified',
        paymentId: payment.razorpayPaymentId || razorpay_payment_id,
        receipt: payment.receipt,
      });
    }

    // 4. Query authoritative payment state from Razorpay API
    let rzpPayment = null;

    try {
      const razorpay = getRazorpayClient();
      rzpPayment = await razorpay.payments.fetch(razorpay_payment_id);
    } catch (fetchErr) {
      console.error('[Payment Verify] Failed to fetch payment from Razorpay API:', fetchErr.message);
      // Fallback: If network to Razorpay API times out, verify signature is still mathematically sound
    }

    if (rzpPayment) {
      // Validate order ID matches
      if (rzpPayment.order_id !== razorpay_order_id) {
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: payment does not match order',
        });
      }

      // Validate payment status
      if (rzpPayment.status !== 'captured' && rzpPayment.status !== 'authorized') {
        return res.status(400).json({
          success: false,
          message: `Payment is not in captured state (current status: ${rzpPayment.status})`,
        });
      }

      // Reconcile amount against stored order record
      if (payment && payment.amountPaise && rzpPayment.amount !== payment.amountPaise) {
        console.error(`[CRITICAL TAMPERING] Amount mismatch! DB expected ${payment.amountPaise} paise, Razorpay authorized ${rzpPayment.amount} paise.`);
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: transaction amount mismatch',
        });
      }
    }

    // 5. Update or Upsert payment record
    if (payment) {
      payment.status = 'completed';
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      if (rzpPayment) {
        payment.paymentMethod = rzpPayment.method || payment.paymentMethod;
        payment.bank = rzpPayment.bank || payment.bank;
        payment.vpa = rzpPayment.vpa || payment.vpa;
      }
      payment.completedAt = new Date();
      await payment.save();
    } else {
      // Fallback for legacy orders created before server persistence
      const capturedAmount = rzpPayment ? Math.round(rzpPayment.amount / 100) : 0;
      payment = await Payment.create({
        receipt: `RCPT_${Date.now()}_LEGACY`,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amount: capturedAmount,
        amountPaise: rzpPayment ? rzpPayment.amount : capturedAmount * 100,
        currency: rzpPayment?.currency || 'INR',
        name: rzpPayment?.notes?.name || 'Customer',
        email: rzpPayment?.email || 'customer@example.com',
        phone: rzpPayment?.contact || '0000000000',
        purpose: rzpPayment?.notes?.purpose || 'other',
        status: 'completed',
        paymentMethod: rzpPayment?.method || null,
        bank: rzpPayment?.bank || null,
        vpa: rzpPayment?.vpa || null,
        completedAt: new Date(),
      });
    }

    // 6. Synchronize with linked student application (BioData)
    if (payment.bioDataId) {
      try {
        await BioData.findByIdAndUpdate(payment.bioDataId, {
          $set: {
            isPaid: true,
            paymentId: payment._id,
            paidAmount: payment.amount,
            paidAt: new Date(),
          },
        });
      } catch (bioErr) {
        console.error('[Payment Verify] Failed to update linked BioData:', bioErr);
        // Do not fail the payment response since the transaction itself is verified
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      receipt: payment.receipt,
    });
  } catch (error) {
    console.error('[Payment Verify] Unexpected error:', error);
    return res.status(500).json({
      success: false,
      message: 'Payment verification failed due to an internal error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
