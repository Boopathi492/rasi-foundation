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

  // Correlate with Vercel request tracking
  const headers = req.headers || {};
  const rawReqId = headers['x-vercel-id'] || headers['x-request-id'];
  const requestId = Array.isArray(rawReqId) ? rawReqId[0] : (rawReqId || `req_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`);
  res.setHeader('x-request-id', String(requestId));

  let currentStep = 'init';
  const requestStartTime = Date.now();

  try {
    currentStep = 'rate_limiting';
    // Best-effort rate limiting to prevent bot abuse
    if (!limiter(req, res)) {
      safePaymentLog('rate_limiting', { requestId, status: 'rate_limited' });
      return res.status(429).json({
        success: false,
        message: 'Too many order requests. Please try again in a minute.',
        requestId,
        stage: currentStep,
        code: 'RATE_LIMITED',
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
      safePaymentLog('payload_validation', { requestId, field: 'purpose', error: 'missing_purpose' });
      return res.status(400).json({
        success: false,
        message: 'Payment purpose is required',
        requestId,
        stage: currentStep,
        code: 'MISSING_PURPOSE',
      });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      safePaymentLog('payload_validation', { requestId, field: 'name', error: 'missing_name' });
      return res.status(400).json({
        success: false,
        message: 'Payer name is required',
        requestId,
        stage: currentStep,
        code: 'MISSING_NAME',
      });
    }
    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      safePaymentLog('payload_validation', { requestId, field: 'email', error: 'invalid_email' });
      return res.status(400).json({
        success: false,
        message: 'A valid email is required',
        requestId,
        stage: currentStep,
        code: 'INVALID_EMAIL',
      });
    }

    const cleanPhone = String(phone || '').trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      safePaymentLog('payload_validation', { requestId, field: 'phone', error: 'invalid_phone' });
      return res.status(400).json({
        success: false,
        message: 'A valid 10-digit mobile number is required',
        requestId,
        stage: currentStep,
        code: 'INVALID_PHONE',
      });
    }

    // Stage 1: db_connect
    currentStep = 'db_connect';
    const dbStart = Date.now();
    await dbConnect();
    safePaymentLog('db_connect', {
      requestId,
      status: 'connected',
      durationMs: Date.now() - dbStart,
      readyState: mongoose.connection.readyState,
    });

    // Stage 2: payment_setting
    currentStep = 'payment_setting';
    const cleanPurpose = purpose.trim();
    let setting = await PaymentSetting.findOne({ purpose: cleanPurpose, isEnabled: true }).lean();

    // Auto-seed defaults if PaymentSetting collection is uninitialized
    if (!setting) {
      const count = await PaymentSetting.countDocuments();
      if (count === 0) {
        await PaymentSetting.insertMany(DEFAULT_SETTINGS);
        safePaymentLog('payment_setting', {
          requestId,
          action: 'auto_seeded_defaults',
          count: DEFAULT_SETTINGS.length,
        });
        setting = await PaymentSetting.findOne({ purpose: cleanPurpose, isEnabled: true }).lean();
      }
    }

    if (!setting) {
      safePaymentLog('payment_setting', {
        requestId,
        status: 'disabled_or_unavailable',
        purpose: cleanPurpose,
      });
      return res.status(400).json({
        success: false,
        message: 'The selected payment purpose is currently disabled or unavailable',
        requestId,
        stage: currentStep,
        code: 'PURPOSE_UNAVAILABLE',
      });
    }

    safePaymentLog('payment_setting', {
      requestId,
      status: 'found',
      purpose: cleanPurpose,
      isFixed: setting.isFixed,
      settingAmount: setting.amount,
    });

    // Amount Calculation & Validation
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
          requestId,
          stage: currentStep,
          code: 'INVALID_AMOUNT',
        });
      }
      if (parsedAmount > 500000) {
        return res.status(400).json({
          success: false,
          message: 'Single payment cannot exceed ₹5,00,000. Please contact administration.',
          requestId,
          stage: currentStep,
          code: 'AMOUNT_EXCEEDS_MAX',
        });
      }
      // If setting has a default minimum, enforce it
      if (setting.amount > 0 && parsedAmount < setting.amount) {
        return res.status(400).json({
          success: false,
          message: `Minimum required amount for ${setting.label} is ₹${setting.amount}`,
          requestId,
          stage: currentStep,
          code: 'AMOUNT_BELOW_MINIMUM',
        });
      }
      payableAmount = Math.round(parsedAmount);
    }

    // Stage 3: biodata_lookup
    currentStep = 'biodata_lookup';
    let validBioDataId = null;
    if (bioDataId) {
      if (!mongoose.Types.ObjectId.isValid(bioDataId)) {
        safePaymentLog('biodata_lookup', { requestId, status: 'invalid_id_format' });
        return res.status(400).json({
          success: false,
          message: 'Invalid student application reference',
          requestId,
          stage: currentStep,
          code: 'INVALID_BIODATA_REF',
        });
      }
      const bioExists = await BioData.findById(bioDataId).select('_id').lean();
      if (!bioExists) {
        safePaymentLog('biodata_lookup', { requestId, status: 'not_found' });
        return res.status(404).json({
          success: false,
          message: 'Referenced student application was not found',
          requestId,
          stage: currentStep,
          code: 'BIODATA_NOT_FOUND',
        });
      }
      validBioDataId = bioExists._id;
      safePaymentLog('biodata_lookup', { requestId, status: 'found', bioDataId: String(validBioDataId) });
    }

    // Stage 4: credentials_check
    currentStep = 'credentials_check';
    const creds = getRazorpayCredentials();
    safePaymentLog('credentials_check', {
      requestId,
      hasKeyId: creds.hasKeyId,
      hasKeySecret: creds.hasKeySecret,
      keyPrefix: creds.keyPrefix,
      mode: creds.mode,
      modeMismatch: creds.modeMismatch,
    });

    if (!creds.configured) {
      return res.status(500).json({
        success: false,
        message: 'Payment gateway is temporarily unavailable',
        requestId,
        stage: currentStep,
        code: 'CONFIG_MISSING',
      });
    }

    const razorpay = getRazorpayClient();

    // Generate server receipt identifier and amount in paise
    currentStep = 'order_payload_build';
    const receipt = `RCPT_${Date.now()}_${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const amountPaise = Math.round(payableAmount * 100);

    // Stage 5: razorpay_order_create
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

    const rzpStart = Date.now();
    const order = await razorpay.orders.create(orderOptions);
    safePaymentLog('razorpay_order_create', {
      requestId,
      status: 'created',
      orderId: order.id,
      amountPaise,
      currency: 'INR',
      durationMs: Date.now() - rzpStart,
    });

    // Stage 6: db_payment_persist
    currentStep = 'db_payment_persist';
    const persistStart = Date.now();
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
    safePaymentLog('db_payment_persist', {
      requestId,
      status: 'persisted',
      paymentId: String(payment._id),
      durationMs: Date.now() - persistStart,
    });

    currentStep = 'response';
    safePaymentLog('response', {
      requestId,
      status: 'success',
      totalDurationMs: Date.now() - requestStartTime,
    });

    // Return safe public checkout parameters
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
      requestId,
    });
  } catch (error) {
    const parsed = parseRazorpayError(error);

    // Safe diagnostic log without sensitive data or PII
    safePaymentLog(currentStep, {
      requestId,
      error: true,
      source: parsed.source,
      code: parsed.code,
      statusCode: parsed.statusCode,
      description: parsed.description,
      field: parsed.field,
      totalDurationMs: Date.now() - requestStartTime,
    });

    // Determine appropriate client response and status code
    if (parsed.source === 'razorpay_api') {
      if (parsed.statusCode === 401) {
        return res.status(502).json({
          success: false,
          message: 'Payment gateway authentication failed. Please contact administrator.',
          requestId,
          stage: currentStep,
          code: parsed.code,
        });
      }
      if (parsed.statusCode === 400) {
        return res.status(400).json({
          success: false,
          message: parsed.description || 'Invalid payment parameters for gateway order',
          requestId,
          stage: currentStep,
          code: parsed.code,
        });
      }
      return res.status(502).json({
        success: false,
        message: 'Payment gateway is currently experiencing difficulties. Please try again.',
        requestId,
        stage: currentStep,
        code: parsed.code,
      });
    }

    if (parsed.source === 'network') {
      return res.status(504).json({
        success: false,
        message: 'Payment gateway connection timed out. Please try again in a few moments.',
        requestId,
        stage: currentStep,
        code: parsed.code,
      });
    }

    if (parsed.source === 'database') {
      return res.status(500).json({
        success: false,
        message: 'Database service error during order initiation. Please try again.',
        requestId,
        stage: currentStep,
        code: parsed.code,
      });
    }

    // Default application / internal error
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate payment order. Please try again.',
      requestId,
      stage: currentStep,
      code: parsed.code,
      detail: process.env.NODE_ENV === 'development' ? parsed.description : undefined,
    });
  }
}
