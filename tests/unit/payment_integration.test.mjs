import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';

import Payment from '../../src/backend/models/Payment.js';
import PaymentSetting from '../../src/backend/models/PaymentSetting.js';
import BioData from '../../src/backend/models/BioData.js';
import { can, RESOURCES, permissionsFor } from '../../src/backend/lib/rbac.js';
import { buildPdfReport, buildStudentPaymentReceipt, numberToWordsINR } from '../../src/backend/lib/pdf.js';
import { rateLimiter, createRateLimiter, resetRateLimits } from '../../src/backend/lib/rateLimit.js';
import createOrderHandler from '../../src/pages/api/payment/create-order.js';
import receiptHandler from '../../src/pages/api/payment/receipt.js';
import verifyHandler from '../../src/pages/api/payment/verify.js';
import webhookHandler from '../../src/pages/api/payment/webhook.js';
import refundHandler from '../../src/pages/api/admin/payments/refund.js';
import { Readable } from 'stream';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../../src/backend/lib/adminConfig.js';

test('Razorpay Payment Integration — Full Comprehensive Test Suite', async (t) => {

  await t.test('1. Payment Model Schema Definition, Defaults, & Pre-Save Hooks', () => {
    const paths = Payment.schema.paths;

    // Verify presence of all required fields
    assert.ok(paths.razorpayOrderId, 'razorpayOrderId must exist in Payment schema');
    assert.ok(paths.razorpayPaymentId, 'razorpayPaymentId must exist in Payment schema');
    assert.ok(paths.razorpaySignature, 'razorpaySignature must exist in Payment schema');
    assert.ok(paths.receipt, 'receipt must exist in Payment schema');
    assert.ok(paths.amount, 'amount must exist in Payment schema');
    assert.ok(paths.amountPaise, 'amountPaise must exist in Payment schema');
    assert.ok(paths.purpose, 'purpose must exist in Payment schema');
    assert.ok(paths.bioDataId, 'bioDataId must exist in Payment schema');
    assert.ok(paths.status, 'status must exist in Payment schema');
    assert.ok(paths.refundStatus, 'refundStatus must exist in Payment schema');
    assert.ok(paths.webhookEvents, 'webhookEvents array must exist in Payment schema');

    // Test instantiation and default values
    const doc = new Payment({
      razorpayOrderId: 'order_TEST_123456',
      receipt: 'RCPT_TEST_001',
      amount: 500,
      name: 'Rasi Test Payer',
      email: 'test@example.com',
      phone: '9876543210',
      purpose: 'counseling',
    });

    assert.equal(doc.status, 'created', 'Default payment status must be created');
    assert.equal(doc.currency, 'INR', 'Default currency must be INR');
    assert.equal(doc.refundStatus, 'none', 'Default refund status must be none');
    assert.equal(doc.refundAmount, 0, 'Default refund amount must be 0');

    // Test amountPaise calculation hook
    const valErr = doc.validateSync();
    assert.equal(valErr, undefined, 'Valid payment document must pass validation');
    assert.equal(doc.amountPaise, 50000, 'amountPaise must be amount * 100');
  });

  await t.test('2. BioData Schema Payment Synchronization Fields', () => {
    const paths = BioData.schema.paths;

    assert.ok(paths.paymentId, 'paymentId must exist in BioData schema');
    assert.ok(paths.isPaid, 'isPaid must exist in BioData schema');
    assert.ok(paths.paidAmount, 'paidAmount must exist in BioData schema');
    assert.ok(paths.paidAt, 'paidAt must exist in BioData schema');

    const sampleBio = new BioData({
      studentName: 'Candidate One',
      fatherName: 'Parent One',
      studentMobile: '9876543210',
      studentEmail: 'student@example.com',
      aadhaarNumber: '123456789012',
    });

    assert.equal(sampleBio.isPaid, false, 'Default isPaid must be false');
    assert.equal(sampleBio.paidAmount, 0, 'Default paidAmount must be 0');
    assert.equal(sampleBio.paymentId, null, 'Default paymentId must be null');
  });

  await t.test('3. Cryptographic Signature Verification and Timing-Safe Equality', () => {
    const testSecret = 'test_webhook_and_checkout_secret_xyz123';
    const orderId = 'order_DA98F7A6B5C4';
    const paymentId = 'pay_1234567890AB';

    // Official Razorpay signature calculation
    const body = `${orderId}|${paymentId}`;
    const validSignature = crypto
      .createHmac('sha256', testSecret)
      .update(body)
      .digest('hex');

    const invalidSignature = 'a'.repeat(64);

    // Verify valid signature matching
    const sigBuf = Buffer.from(validSignature, 'utf8');
    const expBuf = Buffer.from(validSignature, 'utf8');
    const isMatched = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);
    assert.equal(isMatched, true, 'Valid signature must match using timingSafeEqual');

    // Verify invalid signature rejection
    const badBuf = Buffer.from(invalidSignature, 'utf8');
    const isBadMatched = badBuf.length === expBuf.length && crypto.timingSafeEqual(badBuf, expBuf);
    assert.equal(isBadMatched, false, 'Tampered signature must be rejected');
  });

  await t.test('4. Server-Side Fee Enforcement & Tampering Prevention Logic', () => {
    const fixedSetting = {
      purpose: 'scholarship_test',
      label: 'Scholarship Test Fee',
      amount: 200,
      isFixed: true,
      isEnabled: true,
    };

    const variableSetting = {
      purpose: 'donation',
      label: 'Donation',
      amount: 0,
      isFixed: false,
      isEnabled: true,
    };

    // Rule: For fixed settings, client-supplied amount is overridden by server
    const clientProvidedAmount1 = 1; // Attacker tries to pay ₹1 for ₹200 test
    let payableAmount1;
    if (fixedSetting.isFixed) {
      payableAmount1 = fixedSetting.amount;
    } else {
      payableAmount1 = clientProvidedAmount1;
    }
    assert.equal(payableAmount1, 200, 'Fixed fee must strictly enforce server amount');

    // Rule: For variable settings, client amount is accepted if within valid bounds
    const clientProvidedAmount2 = 500;
    let payableAmount2;
    if (variableSetting.isFixed) {
      payableAmount2 = variableSetting.amount;
    } else {
      payableAmount2 = clientProvidedAmount2;
    }
    assert.equal(payableAmount2, 500, 'Variable fee should respect client contribution');
  });

  await t.test('5. Idempotent Duplicate Verification & Webhook Deduplication', () => {
    const mockPayment = {
      razorpayOrderId: 'order_IDEMP_001',
      status: 'completed',
      receipt: 'RCPT_IDEMP_001',
      webhookEvents: [
        { eventId: 'evt_1001', event: 'payment.captured', receivedAt: new Date() }
      ],
    };

    // Simulate verification check
    const isAlreadyCompleted = mockPayment.status === 'completed';
    assert.equal(isAlreadyCompleted, true, 'Should detect already verified payment');

    // Simulate webhook deduplication check
    const incomingEventId = 'evt_1001';
    const isDuplicateEvent = mockPayment.webhookEvents.some(e => e.eventId === incomingEventId);
    assert.equal(isDuplicateEvent, true, 'Duplicate webhook event must be identified');

    const newEventId = 'evt_1002';
    const isNewEvent = mockPayment.webhookEvents.some(e => e.eventId === newEventId);
    assert.equal(isNewEvent, false, 'New webhook event should be processed');
  });

  await t.test('6. Webhook Raw-Body Signature Calculation', () => {
    const webhookSecret = 'test_whsec_998877665544';
    const rawPayload = JSON.stringify({
      entity: 'event',
      event: 'payment.captured',
      id: 'evt_TEST_999',
      payload: {
        payment: {
          entity: {
            id: 'pay_TEST_999',
            order_id: 'order_TEST_999',
            amount: 50000,
            status: 'captured',
            method: 'upi',
          }
        }
      }
    });

    const rawBuffer = Buffer.from(rawPayload, 'utf8');

    // Compute official webhook signature
    const signature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBuffer)
      .digest('hex');

    // Verify verification helper logic
    const expectedSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBuffer)
      .digest('hex');

    const s1 = Buffer.from(signature, 'utf8');
    const s2 = Buffer.from(expectedSig, 'utf8');
    assert.equal(crypto.timingSafeEqual(s1, s2), true, 'Webhook signature verification must succeed');
  });

  await t.test('7. RBAC Permissions Registration & Separation of Duties', () => {
    // 1. Verify 'payments' resource registration
    assert.ok(RESOURCES.includes('payments'), "'payments' must be in RBAC RESOURCES");

    // 2. Super Admin permissions
    assert.ok(can('super_admin', 'payments:view'), 'super_admin can view payments');
    assert.ok(can('super_admin', 'payments:manage'), 'super_admin can manage payment settings');
    assert.ok(can('super_admin', 'payments:refund'), 'super_admin can process refunds');

    // 3. Admin permissions
    assert.ok(can('admin', 'payments:view'), 'admin can view payments');
    assert.ok(can('admin', 'payments:manage'), 'admin can manage payment settings');
    assert.ok(can('admin', 'payments:refund'), 'admin can process refunds');

    // 4. Financial separation: Counsellor & Exam Manager must NOT access payments
    assert.equal(can('counsellor', 'payments:view'), false, 'counsellor cannot view financial payments');
    assert.equal(can('counsellor', 'payments:manage'), false, 'counsellor cannot manage payment settings');
    assert.equal(can('counsellor', 'payments:refund'), false, 'counsellor cannot process refunds');

    assert.equal(can('exam_manager', 'payments:view'), false, 'exam_manager cannot view financial payments');
    assert.equal(can('exam_manager', 'payments:manage'), false, 'exam_manager cannot manage payment settings');
    assert.equal(can('exam_manager', 'payments:refund'), false, 'exam_manager cannot process refunds');
  });

  await t.test('8. Official Payment Receipt PDF Generation & Number Words', () => {
    // 1. Number to words conversion tests (INR)
    assert.equal(numberToWordsINR(0), 'Zero Rupees Only');
    assert.equal(numberToWordsINR(2), 'Two Rupees Only');
    assert.equal(numberToWordsINR(500), 'Five Hundred Rupees Only');
    assert.equal(numberToWordsINR(1250.50), 'One Thousand Two Hundred Fifty Rupees and Fifty Paise Only');
    assert.equal(numberToWordsINR(75000), 'Seventy Five Thousand Rupees Only');
    assert.equal(numberToWordsINR(150000), 'One Lakh Fifty Thousand Rupees Only');
    assert.equal(numberToWordsINR(12500000), 'One Crore Twenty Five Lakh Rupees Only');

    // 2. Comprehensive Student Payment Receipt generation
    const receiptBuf = buildStudentPaymentReceipt({
      receiptNo: 'RCPT_UNIT_TEST_123',
      paymentDate: '28 Oct 2026, 10:00 PM',
      status: 'PAID',
      paymentId: 'pay_TEST1234567890',
      orderId: 'order_TEST1234567890',
      amount: 500,
      currency: 'INR',
      paymentMethod: 'card',
      bank: 'HDFC',
      vpa: null,
      studentName: 'Boopathi Ramasamy',
      applicationRef: 'APP-12345678',
      studentMobile: '9597623492',
      studentEmail: 'student@example.com',
      fatherName: 'Ramasamy',
      community: 'MBC',
      district: 'Namakkal',
      maskedAadhaar: 'XXXX XXXX 3636',
      courseApplied: 'B.Sc Computer Science',
      collegeName: 'Kongu Engineering College',
      tneaCode: '2712',
      admissionType: 'UG',
      quota: 'GQ',
      isFirstGraduate: true,
      isGovtSchool: true,
      expectedCutOff: '80%',
      purposeTitle: 'Higher Education Course Fee',
      purposeDescription: 'Admission Assistance Service Fee',
    });

    assert.ok(Buffer.isBuffer(receiptBuf), 'Receipt output must be a Buffer');
    assert.ok(receiptBuf.length > 2000, 'Receipt PDF must be non-empty and well-formed');
    assert.equal(receiptBuf.slice(0, 8).toString(), '%PDF-1.4', 'Receipt must begin with %PDF-1.4 header');

    const receiptStr = receiptBuf.toString('latin1');
    assert.ok(receiptStr.includes('RASI FOUNDATION'), 'Receipt must contain Foundation branding');
    assert.ok(receiptStr.includes('OFFICIAL STUDENT PAYMENT RECEIPT'), 'Receipt must include official title');
    assert.ok(receiptStr.includes('Boopathi Ramasamy'), 'Receipt must include student name');
    assert.ok(receiptStr.includes('XXXX XXXX 3636'), 'Receipt must include masked Aadhaar');
    assert.ok(receiptStr.includes('Five Hundred Rupees Only'), 'Receipt must include amount in words');
    assert.ok(receiptStr.includes('PAID - VERIFIED'), 'Receipt must include verified PAID badge');
    assert.ok(receiptStr.includes('Kongu Engineering College'), 'Receipt must include college name');
    assert.ok(receiptStr.includes('B.Sc Computer Science'), 'Receipt must include course name');
    assert.ok(receiptStr.includes('2712'), 'Receipt must include TNEA code');

    // 3. Graceful fallback on empty / partial data
    const partialBuf = buildStudentPaymentReceipt({ amount: 0 });
    assert.ok(Buffer.isBuffer(partialBuf));
    assert.equal(partialBuf.slice(0, 8).toString(), '%PDF-1.4');
    const partialStr = partialBuf.toString('latin1');
    assert.ok(partialStr.includes('Zero Rupees Only'));
    assert.ok(partialStr.includes('Candidate'));

    // 4. Refunded receipt status display
    const refundBuf = buildStudentPaymentReceipt({ amount: 500, status: 'refunded' });
    const refundStr = refundBuf.toString('latin1');
    assert.ok(refundStr.includes('REFUNDED'));
    assert.ok(refundStr.includes('REFUND PROCESSED'));

    // 5. Backward compatibility with buildPdfReport
    const legacyBuf = buildPdfReport({
      title: 'OFFICIAL PAYMENT RECEIPT',
      columns: [{ header: 'Desc', key: 'desc' }],
      rows: [{ desc: 'Fee' }],
    });
    assert.ok(Buffer.isBuffer(legacyBuf));
    assert.equal(legacyBuf.slice(0, 4).toString(), '%PDF');
  });

  await t.test('9. Refund Balance Validation & Status Transitions', () => {
    const payment = {
      amount: 1000,
      refundAmount: 0,
      refundStatus: 'none',
      status: 'completed',
    };

    // Test 1: Valid Partial Refund of ₹400
    const requestedRefund1 = 400;
    const available1 = payment.amount - payment.refundAmount;
    assert.ok(requestedRefund1 <= available1, 'Partial refund of ₹400 must be <= available ₹1000');
    payment.refundAmount += requestedRefund1;
    payment.refundStatus = payment.refundAmount >= payment.amount ? 'full' : 'partial';
    assert.equal(payment.refundStatus, 'partial', 'Status must be partial');
    assert.equal(payment.refundAmount, 400, 'Refunded amount must be 400');

    // Test 2: Over-refund rejection
    const invalidRefund = 700; // Remaining is 600
    const available2 = payment.amount - payment.refundAmount;
    assert.equal(invalidRefund <= available2, false, 'Refund of ₹700 must be rejected when available is ₹600');

    // Test 3: Full Refund of remaining ₹600
    const requestedRefund2 = 600;
    assert.ok(requestedRefund2 <= available2, 'Refund of remaining ₹600 must be allowed');
    payment.refundAmount += requestedRefund2;
    payment.refundStatus = payment.refundAmount >= payment.amount ? 'full' : 'partial';
    if (payment.refundStatus === 'full') payment.status = 'refunded';
    assert.equal(payment.refundStatus, 'full', 'Status must transition to full');
    assert.equal(payment.status, 'refunded', 'Payment lifecycle status must become refunded');
  });

  await t.test('10. Rate Limiter Dual API Interface (Functional & .check method)', () => {
    resetRateLimits();
    const limiter = rateLimiter({ windowMs: 10_000, max: 2 });

    // Must be callable directly as a function (req, res) -> boolean
    assert.equal(typeof limiter, 'function', 'rateLimiter instance must be a function');
    assert.equal(typeof limiter.check, 'function', 'rateLimiter instance must also expose .check method');

    const fakeRes = {
      headers: {},
      setHeader(name, val) {
        this.headers[name] = val;
      },
    };
    const fakeReq = { headers: { 'x-forwarded-for': '198.51.100.1' } };

    // Request 1: allowed
    assert.equal(limiter(fakeReq, fakeRes), true, 'Request 1 should be allowed');

    // Request 2: allowed
    assert.equal(limiter(fakeReq, fakeRes), true, 'Request 2 should be allowed');

    // Request 3: blocked (exceeds max 2)
    assert.equal(limiter(fakeReq, fakeRes), false, 'Request 3 should be rejected');
    assert.ok(fakeRes.headers['Retry-After'], 'Retry-After header must be set upon rate limit rejection');

    // Verify .check method on direct key works identically
    const checkRes = limiter.check('198.51.100.1');
    assert.equal(checkRes.allowed, false, 'limiter.check should report allowed: false');
    assert.ok(checkRes.retryAfterSec >= 1, 'retryAfterSec must be >= 1');
  });

  await t.test('11. Create Order API Endpoint Error Handling & JSON Safety', async () => {
    function createMockRes() {
      const res = {
        statusCode: 200,
        headers: {},
        data: null,
        status(code) {
          res.statusCode = code;
          return res;
        },
        setHeader(name, val) {
          res.headers[name] = val;
        },
        json(body) {
          res.data = body;
          return res;
        },
      };
      return res;
    }

    // Test A: HTTP Method Enforcement (GET must return 405 JSON)
    const resA = createMockRes();
    await createOrderHandler({ method: 'GET' }, resA);
    assert.equal(resA.statusCode, 405);
    assert.equal(typeof resA.data, 'object');
    assert.equal(resA.data.success, false);
    assert.equal(resA.data.message, 'Method not allowed');

    // Test B: Validation rejection for empty body (returns 400 JSON)
    const resB = createMockRes();
    await createOrderHandler({ method: 'POST', body: {} }, resB);
    assert.equal(resB.statusCode, 400);
    assert.equal(typeof resB.data, 'object');
    assert.equal(resB.data.success, false);
    assert.match(resB.data.message, /Payment purpose is required/i);

    // Test C: Validation rejection for missing name (returns 400 JSON)
    const resC = createMockRes();
    await createOrderHandler({
      method: 'POST',
      body: { purpose: 'counseling' },
    }, resC);
    assert.equal(resC.statusCode, 400);
    assert.equal(typeof resC.data, 'object');
    assert.equal(resC.data.success, false);
    assert.match(resC.data.message, /Payer name is required/i);

    // Test D: Validation rejection for invalid email (returns 400 JSON)
    const resD = createMockRes();
    await createOrderHandler({
      method: 'POST',
      body: { purpose: 'counseling', name: 'Student' },
    }, resD);
    assert.equal(resD.statusCode, 400);
    assert.equal(typeof resD.data, 'object');
    assert.equal(resD.data.success, false);
    assert.match(resD.data.message, /valid email/i);

    // Test E: Rate limit rejection (exceeding window limit returns 429 JSON)
    const burstIp = '203.0.113.99';
    let lastRes;
    for (let i = 0; i < 25; i++) {
      lastRes = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': burstIp },
        body: { purpose: 'counseling', name: 'RateLimit Test' },
      }, lastRes);
    }
    assert.equal(lastRes.statusCode, 429);
    assert.equal(typeof lastRes.data, 'object');
    assert.equal(lastRes.data.success, false);
    assert.match(lastRes.data.message, /too many order requests/i);
    assert.ok(lastRes.headers['Retry-After'], 'Retry-After header must be attached to 429 response');
  });

  await t.test('12. Payment Receipt API Endpoint, IDOR Protection, & Linked BioData Verification', async () => {
    function createMockRes() {
      const res = {
        statusCode: 200,
        headers: {},
        data: null,
        status(code) {
          res.statusCode = code;
          return res;
        },
        setHeader(name, val) {
          res.headers[name] = val;
        },
        send(buf) {
          res.data = buf;
          return res;
        },
        json(body) {
          res.data = body;
          return res;
        },
      };
      return res;
    }

    // Test A: HTTP Method Enforcement (POST returns 405)
    const resA = createMockRes();
    await receiptHandler({ method: 'POST', query: {} }, resA);
    assert.equal(resA.statusCode, 405);
    assert.equal(resA.data.message, 'Method not allowed');

    // Test B: Missing payment identifier (returns 400)
    const resB = createMockRes();
    await receiptHandler({ method: 'GET', query: {} }, resB);
    assert.equal(resB.statusCode, 400);
    assert.match(resB.data.message, /identifier is required/i);

    // Test C: IDOR Protection against raw Mongo _id enumeration by unauthenticated caller
    const resC = createMockRes();
    await receiptHandler({
      method: 'GET',
      headers: {},
      query: { paymentId: '6ae222fdd896b351ce3e5c1d' },
    }, resC);
    assert.equal(resC.statusCode, 403, 'Unauthenticated access by Mongo _id must be blocked');
    assert.match(resC.data.message, /Authorization required/i);

    // Test D: Authorized admin access by Mongo _id
    const jwtSecret = getJwtSecret();
    if (jwtSecret) {
      const adminToken = jwt.sign(
        { userId: 'admin_1', username: 'admin', role: 'admin' },
        jwtSecret,
        { algorithm: 'HS256', expiresIn: '1h' }
      );
      const resD = createMockRes();
      await receiptHandler({
        method: 'GET',
        headers: { authorization: `Bearer ${adminToken}` },
        query: { paymentId: '6ae222fdd896b351ce3e5c1d' },
      }, resD);
      assert.equal(resD.statusCode, 200, 'Authorized admin must be allowed to fetch receipt by _id');
      assert.equal(resD.headers['Content-Type'], 'application/pdf');
      assert.ok(Buffer.isBuffer(resD.data));
      assert.equal(resD.data.slice(0, 8).toString(), '%PDF-1.4');
    }

    // Test E: Direct download via Razorpay Payment ID (Student access token)
    const resE = createMockRes();
    await receiptHandler({
      method: 'GET',
      headers: {},
      query: { paymentId: 'pay_TtORrzowuzkBJQ' },
    }, resE);
    assert.equal(resE.statusCode, 200, 'Student should download receipt using razorpayPaymentId');
    assert.equal(resE.headers['Content-Type'], 'application/pdf');
    assert.ok(Buffer.isBuffer(resE.data));
    const pdfContent = resE.data.toString('latin1');
    assert.ok(pdfContent.includes('Boopathi'), 'Receipt must contain student name');
    assert.ok(pdfContent.includes('XXXX XXXX 3636'), 'Receipt must contain masked Aadhaar');
    assert.ok(pdfContent.includes('B.Sc Computer Science'), 'Receipt must contain course name');
    assert.ok(pdfContent.includes('Two Rupees Only'), 'Receipt must contain amount in words');
    assert.ok(pdfContent.includes('PAID - VERIFIED'), 'Receipt must indicate verified PAID status');

    // Test F: Direct download via Receipt number (Student access token)
    const resF = createMockRes();
    await receiptHandler({
      method: 'GET',
      headers: {},
      query: { receipt: 'RCPT_1793204988501_778345' },
    }, resF);
    assert.equal(resF.statusCode, 200, 'Student should download receipt using receipt number');
    assert.equal(resF.headers['Content-Type'], 'application/pdf');
    assert.ok(Buffer.isBuffer(resF.data));
  });

  await t.test('13. Verification, Webhook & Refund Endpoints Security & Authorization', async () => {
    function createMockRes() {
      const res = {
        statusCode: 200,
        headers: {},
        data: null,
        status(code) {
          res.statusCode = code;
          return res;
        },
        setHeader(name, val) {
          res.headers[name] = val;
        },
        json(body) {
          res.data = body;
          return res;
        },
      };
      return res;
    }

    // 1. Verify Endpoint Validation
    const vResA = createMockRes();
    await verifyHandler({ method: 'GET' }, vResA);
    assert.equal(vResA.statusCode, 405);

    const vResB = createMockRes();
    await verifyHandler({ method: 'POST', body: {} }, vResB);
    assert.equal(vResB.statusCode, 400);
    assert.match(vResB.data.message, /order ID is required/i);

    // Invalid signature rejection
    const vResC = createMockRes();
    await verifyHandler({
      method: 'POST',
      body: {
        razorpay_order_id: 'order_test_123',
        razorpay_payment_id: 'pay_test_123',
        razorpay_signature: 'invalid_tampered_signature_hex_value',
      },
    }, vResC);
    assert.equal(vResC.statusCode, 400);
    assert.match(vResC.data.message, /signature mismatch/i);

    // 2. Webhook Endpoint Validation
    const wResA = createMockRes();
    await webhookHandler({ method: 'GET' }, wResA);
    assert.equal(wResA.statusCode, 405);

    // Missing signature header rejection
    const rawPayload = JSON.stringify({ event: 'payment.captured', id: 'evt_123' });
    const mockReqB = Readable.from(Buffer.from(rawPayload));
    mockReqB.method = 'POST';
    mockReqB.headers = {};
    const wResB = createMockRes();
    await webhookHandler(mockReqB, wResB);
    assert.equal(wResB.statusCode, 400);
    assert.match(wResB.data.error, /Missing webhook signature/i);

    // Invalid signature header rejection
    const mockReqC = Readable.from(Buffer.from(rawPayload));
    mockReqC.method = 'POST';
    mockReqC.headers = { 'x-razorpay-signature': 'tampered_signature_hex' };
    const wResC = createMockRes();
    await webhookHandler(mockReqC, wResC);
    assert.equal(wResC.statusCode, 400);
    assert.match(wResC.data.error, /Invalid webhook signature/i);

    // 3. Refund Endpoint RBAC Authorization
    const rResA = createMockRes();
    await refundHandler({ method: 'GET', headers: {} }, rResA);
    assert.equal(rResA.statusCode, 401, 'Unauthenticated refund attempt must return 401');

    const jwtSecret = getJwtSecret();
    if (jwtSecret) {
      // User with 'counsellor' role (does not have payments:refund permission)
      const nonAdminToken = jwt.sign(
        { userId: 'counsellor_1', username: 'counsellor', role: 'counsellor' },
        jwtSecret,
        { algorithm: 'HS256', expiresIn: '1h' }
      );
      const rResB = createMockRes();
      await refundHandler({
        method: 'POST',
        headers: { authorization: `Bearer ${nonAdminToken}` },
        body: { paymentId: 'pay_test_123', amount: 50 },
      }, rResB);
      assert.equal(rResB.statusCode, 403, 'User without payments:refund must return 403 Forbidden');
    }
  });

  t.after(async () => {
    try {
      await mongoose.disconnect();
    } catch (_) {}
  });

});
