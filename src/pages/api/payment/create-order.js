import crypto from 'crypto';
import mongoose from 'mongoose';
import dbConnect from '../../../backend/lib/mongodb.js';
import Payment from '../../../backend/models/Payment.js';
import PaymentSetting from '../../../backend/models/PaymentSetting.js';
import BioData from '../../../backend/models/BioData.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import {
  getRazorpayCredentials,
  getRazorpayClient,
  parseRazorpayError,
  safePaymentLog,
} from '../../../backend/lib/razorpay.js';

const limiter = rateLimiter({ windowMs: 60_000, max: 20 });

const DEFAULT_SETTINGS = [
  { purpose: 'counseling', label: 'Career Counseling Fee', amount: 500, isFixed: false, isEnabled: true },
  { purpose: 'admission', label: 'Admission Assistance Fee', amount: 1000, isFixed: false, isEnabled: true },
  { purpose: 'scholarship_test', label: 'Scholarship Test Fee', amount: 200, isFixed: true, isEnabled: true },
  { purpose: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'donation', label: 'Donation', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'other', label: 'Other Payment', amount: 0, isFixed: false, isEnabled: true },
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  let currentStep = 'init';

  try {
    currentStep = 'rate_limiting';
    // Best-effort rate limiting to prevent bot abuse
    if (!limiter(req, res)) {
      return res.status(429).json({
        success: false,
        message: 'Too many order requests. Please try again in a minute.',
      });
    }

    currentStep = 'payload_validation';
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

    // 1. Basic input validation
    if (!purpose || typeof purpose !== 'string' || !purpose.trim()) {
      return res.status(400).json({ success: false, message: 'Payment purpose is required' });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Payer name is required' });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'A valid email is required' });
    }

    const cleanPhone = String(phone || '').trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({ success: false, message: 'A valid 10-digit mobile number is required' });
    }

    currentStep = 'db_connect';
    await dbConnect();

    currentStep = 'payment_setting_lookup';
    // 2. Validate Purpose & Server-Side Fee from PaymentSetting
    const cleanPurpose = purpose.trim();
    let setting = await PaymentSetting.findOne({ purpose: cleanPurpose, isEnabled: true }).lean();

    // Auto-seed defaults if PaymentSetting collection is uninitialized
    if (!setting) {
      const count = await PaymentSetting.countDocuments();
      if (count === 0) {
        console.log('[create-order] PaymentSetting collection uninitialized. Seeding defaults.');
        await PaymentSetting.insertMany(DEFAULT_SETTINGS);
        setting = await PaymentSetting.findOne({ purpose: cleanPurpose, isEnabled: true }).lean();
      }
    }

    if (!setting) {
      safePaymentLog('payment_setting_lookup', { purpose: cleanPurpose, error: 'purpose_disabled_or_unavailable' });
      return res.status(400).json({
        success: false,
        message: 'The selected payment purpose is currently disabled or unavailable',
      });
    }

    currentStep = 'amount_calculation';
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

    currentStep = 'biodata_validation';
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

    currentStep = 'credentials_check';
    // 4. Verify Razorpay credentials
    const creds = getRazorpayCredentials();
    if (!creds.configured) {
      safePaymentLog('credentials_check', {
        hasKeyId: creds.hasKeyId,
        hasKeySecret: creds.hasKeySecret,
        mode: creds.mode,
      });
      return res.status(500).json({
        success: false,
        message: 'Payment gateway is temporarily unavailable',
      });
    }

    if (creds.modeMismatch) {
      safePaymentLog('credentials_check', {
        warning: 'mode_mismatch',
        serverMode: creds.isLive ? 'live' : 'test',
        publicMode: creds.publicKeyId.startsWith('rzp_live_') ? 'live' : 'test',
      });
    }

    const razorpay = getRazorpayClient();

    // 5. Generate server receipt identifier and amount in paise
    currentStep = 'order_payload_build';
    const receipt = `RCPT_${Date.now()}_${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const amountPaise = Math.round(payableAmount * 100);

    // 6. Create Razorpay order
    currentStep = 'razorpay_order_create';
    const orderOptions = {
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: {
        purpose: cleanPurpose,
        name: name.trim().slice(0, 40),
        email: email.trim().toLowerCase().slice(0, 40),
        phone: cleanPhone.slice(0, 20),
        bioDataId: validBioDataId ? String(validBioDataId) : '',
        receipt,
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // 7. Persist order in local MongoDB with status 'created'
    currentStep = 'db_payment_persist';
    const payment = await Payment.create({
      receipt,
      razorpayOrderId: order.id,
      amount: payableAmount,
      amountPaise,
      currency: 'INR',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      purpose: cleanPurpose,
      studentName: studentName ? String(studentName).trim() : null,
      notes: notes ? String(notes).trim() : null,
      bioDataId: validBioDataId,
      status: 'created',
    });

    currentStep = 'response';
    // 8. Return safe public checkout parameters
    return res.status(200).json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
      key: creds.publicKeyId,
      receipt: payment.receipt,
      internalPaymentId: payment._id,
    });
  } catch (error) {
    const parsed = parseRazorpayError(error);

    // Safe diagnostic log without sensitive data or PII
    safePaymentLog(currentStep, {
      source: parsed.source,
      code: parsed.code,
      statusCode: parsed.statusCode,
      description: parsed.description,
      field: parsed.field,
    });

    // Determine appropriate client response and status code
    if (parsed.source === 'razorpay_api') {
      if (parsed.statusCode === 401) {
        return res.status(502).json({
          success: false,
          message: 'Payment gateway authentication failed. Please contact administrator.',
        });
      }
      if (parsed.statusCode === 400) {
        return res.status(400).json({
          success: false,
          message: parsed.description || 'Invalid payment parameters for gateway order',
        });
      }
      return res.status(502).json({
        success: false,
        message: 'Payment gateway is currently experiencing difficulties. Please try again.',
      });
    }

    if (parsed.source === 'network') {
      return res.status(504).json({
        success: false,
        message: 'Payment gateway connection timed out. Please try again in a few moments.',
      });
    }

    // Default application / database error
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate payment order. Please try again.',
      detail: process.env.NODE_ENV === 'development' ? parsed.description : undefined,
    });
  }
}
