import Razorpay from 'razorpay';
import dbConnect from './mongodb.js';
import Payment from '../models/Payment.js';
import BioData from '../models/BioData.js';

/**
 * Reconciles a single payment record against Razorpay gateway status.
 * Authoritative: Updates database state only if Razorpay confirms capture.
 */
export async function reconcilePaymentOrder(razorpayOrderId) {
  await dbConnect();

  const payment = await Payment.findOne({ razorpayOrderId });
  if (!payment) {
    return { success: false, message: 'Order not found in database' };
  }

  if (payment.status === 'completed') {
    return { success: true, message: 'Already marked completed', payment };
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return { success: false, message: 'Razorpay credentials not configured' };
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const orderData = await razorpay.orders.fetch(razorpayOrderId);
    const paymentsList = await razorpay.orders.fetchPayments(razorpayOrderId);

    const capturedPayment = paymentsList?.items?.find(p => p.status === 'captured');

    if (capturedPayment) {
      payment.status = 'completed';
      payment.razorpayPaymentId = capturedPayment.id;
      payment.paymentMethod = capturedPayment.method || payment.paymentMethod;
      payment.bank = capturedPayment.bank || payment.bank;
      payment.vpa = capturedPayment.vpa || payment.vpa;
      payment.completedAt = new Date();

      if (payment.bioDataId) {
        await BioData.findByIdAndUpdate(payment.bioDataId, {
          $set: {
            isPaid: true,
            paymentId: payment._id,
            paidAmount: payment.amount,
            paidAt: new Date(),
          },
        });
      }

      await payment.save();
      return { success: true, message: 'Reconciled: Payment was captured on gateway', payment };
    }

    const failedPayment = paymentsList?.items?.find(p => p.status === 'failed');
    if (failedPayment && payment.status === 'created') {
      payment.status = 'failed';
      payment.errorCode = failedPayment.error_code;
      payment.errorDescription = failedPayment.error_description;
      payment.failedAt = new Date();
      await payment.save();
      return { success: true, message: 'Reconciled: Payment was failed on gateway', payment };
    }

    return {
      success: true,
      message: `No captured payment found on gateway (order status: ${orderData.status})`,
      payment,
    };
  } catch (err) {
    console.error(`[reconcilePaymentOrder] Failed to reconcile order ${razorpayOrderId}:`, err.message);
    return { success: false, message: err.message };
  }
}
