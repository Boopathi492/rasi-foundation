import crypto from 'crypto';
import dbConnect from '@/backend/lib/mongodb';
import Payment from '@/backend/models/Payment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentDetails,
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid signature.',
      });
    }

    // Save payment to database
    const payment = new Payment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      amount: paymentDetails?.amount || 0,
      currency: paymentDetails?.currency || 'INR',
      status: 'completed',
      name: paymentDetails?.name,
      email: paymentDetails?.email,
      phone: paymentDetails?.phone,
      purpose: paymentDetails?.purpose,
      studentName: paymentDetails?.studentName,
      notes: paymentDetails?.notes,
    });

    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
