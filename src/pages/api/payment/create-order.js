import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import Payment from '../../../backend/models/Payment.js';
import PaymentSetting from '../../../backend/models/PaymentSetting.js';
import BioData from '../../../backend/models/BioData.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';

const limiter = rateLimiter({ windowMs: 60_000, max: 20 });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Best-effort rate limiting to prevent bot abuse
    if (!limiter(req, res)) {
      return res.status(429).json({
        success: false,
        message: 'Too many order requests. Please try again in a minute.',
      });
    }

    const {
      purpose,
      name,
      email,
      phone,
      studentName,
      notes,
      amount,
      bioDataId,
    } = req.body || {};

    // 1. Basic validation
    if (!purpose || typeof purpose !== 'string') {
      return res.status(400).json({ success: false, message: 'Payment purpose is required' });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Payer name is required' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email is required' });
    }
    if (!phone || typeof phone !== 'string' || !/^[6-9]\d{9}$/.test(phone.trim().replace(/\D/g, '').slice(-10))) {
      return res.status(400).json({ success: false, message: 'A valid 10-digit mobile number is required' });
    }

    await dbConnect();

    // 2. Validate Purpose & Server-Side Fee from PaymentSetting
    const setting = await PaymentSetting.findOne({ purpose, isEnabled: true }).lean();
    if (!setting) {
      return res.status(400).json({
        success: false,
        message: 'The selected payment purpose is currently disabled or unavailable',
      });
    }

    let payableAmount;
    if (setting.isFixed) {
      // Server-authoritative fee enforcement: ignore any client-supplied amount
      payableAmount = setting.amount;
    } else {
      // Variable fee (e.g. course fee, donation)
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount < 1) {
        return res.status(400).json({
          success: false,
          message: 'A valid payment amount (minimum ₹1) is required',
        });
      }
      if (parsedAmount > 500000) {
        return res.status(400).json({
          success: false,
          message: 'Single payment cannot exceed ₹5,00,000. Please contact administration.',
        });
      }
      // If setting has a default minimum, enforce it
      if (setting.amount > 0 && parsedAmount < setting.amount) {
        return res.status(400).json({
          success: false,
          message: `Minimum required amount for ${setting.label} is ₹${setting.amount}`,
        });
      }
      payableAmount = Math.round(parsedAmount);
    }

    // 3. Optional BioData Reference validation
    let validBioDataId = null;
    if (bioDataId) {
      if (!mongoose.Types.ObjectId.isValid(bioDataId)) {
        return res.status(400).json({ success: false, message: 'Invalid student application reference' });
      }
      const bioExists = await BioData.findById(bioDataId).select('_id studentName').lean();
      if (!bioExists) {
        return res.status(404).json({ success: false, message: 'Referenced student application was not found' });
      }
      validBioDataId = bioExists._id;
    }

    // 4. Verify Razorpay credentials
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error('[Payment] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured');
      return res.status(500).json({ success: false, message: 'Payment gateway is temporarily unavailable' });
    }

    // 5. Generate server receipt identifier
    const receipt = `RCPT_${Date.now()}_${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const amountPaise = Math.round(payableAmount * 100);

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // 6. Create Razorpay order
    const orderOptions = {
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: {
        purpose,
        name: name.trim().slice(0, 40),
        email: email.trim().toLowerCase().slice(0, 40),
        phone: phone.trim().slice(0, 20),
        bioDataId: validBioDataId ? String(validBioDataId) : '',
        receipt,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // 7. Persist order in local MongoDB with status 'created'
    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
    const payment = await Payment.create({
      receipt,
      razorpayOrderId: order.id,
      amount: payableAmount,
      amountPaise,
      currency: 'INR',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      purpose,
      studentName: studentName ? String(studentName).trim() : null,
      notes: notes ? String(notes).trim() : null,
      bioDataId: validBioDataId,
      status: 'created',
    });

    // 8. Return safe public checkout parameters
    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || keyId,
      receipt: payment.receipt,
      internalPaymentId: payment._id,
    });
  } catch (error) {
    console.error('[create-order] Error creating order:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate payment order. Please try again.',
      detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
