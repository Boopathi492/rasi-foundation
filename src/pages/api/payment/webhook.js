import crypto from 'crypto';
import dbConnect from '../../../backend/lib/mongodb.js';
import Payment from '../../../backend/models/Payment.js';
import BioData from '../../../backend/models/BioData.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Buffer stream helper for raw request body
 */
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let rawBody;
  try {
    rawBody = await buffer(req);
  } catch (bufErr) {
    console.error('[Razorpay Webhook] Failed to read request body stream:', bufErr);
    return res.status(400).json({ error: 'Could not read request body' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured in environment');
    return res.status(500).json({ error: 'Webhook secret is not configured' });
  }

  const signature = req.headers['x-razorpay-signature'];
  if (!signature || typeof signature !== 'string') {
    return res.status(400).json({ error: 'Missing webhook signature header' });
  }

  // 1. Verify Webhook Signature (HMAC-SHA256 of raw body)
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expectedSignature, 'utf8');

  const isValid = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
  if (!isValid) {
    console.warn('[Razorpay Webhook] Invalid webhook signature received');
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  // 2. Parse event payload
  let eventPayload;
  try {
    eventPayload = JSON.parse(rawBody.toString('utf8'));
  } catch (parseErr) {
    console.error('[Razorpay Webhook] Malformed JSON payload:', parseErr.message);
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }

  const eventType = eventPayload?.event;
  const eventId = eventPayload?.id || `evt_${Date.now()}`;
  const payloadData = eventPayload?.payload;

  console.log(`[Razorpay Webhook] Processing event: ${eventType} (ID: ${eventId})`);

  try {
    await dbConnect();

    // 3. Handle Events
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = payloadData?.payment?.entity;
      const orderEntity = payloadData?.order?.entity;
      const orderId = paymentEntity?.order_id || orderEntity?.id;
      const paymentId = paymentEntity?.id;

      if (!orderId) {
        console.warn('[Razorpay Webhook] No order_id present in captured event payload');
        return res.status(200).json({ status: 'ignored_no_order' });
      }

      const payment = await Payment.findOne({ razorpayOrderId: orderId });
      if (payment) {
        // Idempotency: Check if this event was already processed
        const alreadyProcessed = payment.webhookEvents?.some(e => e.eventId === eventId);
        if (alreadyProcessed) {
          return res.status(200).json({ status: 'already_processed' });
        }

        if (payment.status !== 'completed') {
          payment.status = 'completed';
          if (paymentId) payment.razorpayPaymentId = paymentId;
          if (paymentEntity?.method) payment.paymentMethod = paymentEntity.method;
          if (paymentEntity?.bank) payment.bank = paymentEntity.bank;
          if (paymentEntity?.vpa) payment.vpa = paymentEntity.vpa;
          payment.completedAt = new Date();

          // Synchronize linked BioData
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
        }

        payment.webhookEvents.push({
          eventId,
          event: eventType,
          receivedAt: new Date(),
        });

        await payment.save();
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = payloadData?.payment?.entity;
      const orderId = paymentEntity?.order_id;

      if (orderId) {
        const payment = await Payment.findOne({ razorpayOrderId: orderId });
        if (payment && payment.status !== 'completed') {
          payment.status = 'failed';
          payment.errorCode = paymentEntity?.error_code || 'PAYMENT_FAILED';
          payment.errorDescription = paymentEntity?.error_description || 'Payment was declined or failed';
          payment.failedAt = new Date();

          payment.webhookEvents.push({
            eventId,
            event: eventType,
            receivedAt: new Date(),
          });

          await payment.save();
        }
      }
    } else if (eventType === 'refund.processed' || eventType === 'refund.created') {
      const refundEntity = payloadData?.refund?.entity;
      const paymentId = refundEntity?.payment_id;

      if (paymentId) {
        const payment = await Payment.findOne({ razorpayPaymentId: paymentId });
        if (payment) {
          const refundAmt = Math.round((refundEntity?.amount || 0) / 100);
          payment.refundId = refundEntity?.id || payment.refundId;
          payment.refundAmount = (payment.refundAmount || 0) + refundAmt;
          payment.refundStatus = payment.refundAmount >= payment.amount ? 'full' : 'partial';
          payment.status = payment.refundStatus === 'full' ? 'refunded' : payment.status;
          payment.refundedAt = new Date();

          payment.webhookEvents.push({
            eventId,
            event: eventType,
            receivedAt: new Date(),
          });

          await payment.save();
        }
      }
    }

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('[Razorpay Webhook] Processing error:', error);
    // Return 500 so Razorpay will retry transient errors
    return res.status(500).json({ error: 'Internal server error processing webhook' });
  }
}
