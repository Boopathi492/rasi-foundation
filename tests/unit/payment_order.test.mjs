import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import createOrderHandler from '../../src/pages/api/payment/create-order.js';
import Payment from '../../src/backend/models/Payment.js';
import PaymentSetting from '../../src/backend/models/PaymentSetting.js';
import dbConnect from '../../src/backend/lib/mongodb.js';
import {
  getRazorpayCredentials,
  parseRazorpayError,
  safePaymentLog,
} from '../../src/backend/lib/razorpay.js';
import Razorpay from 'razorpay';

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

test('Razorpay Payment Order Creation — Comprehensive Robustness Suite', async (t) => {
  await dbConnect();

  // Ensure default PaymentSettings exist
  const existingCount = await PaymentSetting.countDocuments();
  if (existingCount === 0) {
    await PaymentSetting.insertMany([
      { purpose: 'counseling', label: 'Career Counseling Fee', amount: 500, isFixed: false, isEnabled: true },
      { purpose: 'admission', label: 'Admission Assistance Fee', amount: 1000, isFixed: false, isEnabled: true },
      { purpose: 'scholarship_test', label: 'Scholarship Test Fee', amount: 200, isFixed: true, isEnabled: true },
      { purpose: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false, isEnabled: true },
    ]);
  }

  await t.test('1. Credential Sanitization, Unquoting, and Mode Detection', () => {
    const origKeyId = process.env.RAZORPAY_KEY_ID;
    const origPubKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const origSecret = process.env.RAZORPAY_KEY_SECRET;

    try {
      // Test A: Strip quotes and whitespace
      process.env.RAZORPAY_KEY_ID = '  "rzp_test_1234567890"  \n';
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = ' "rzp_test_1234567890" ';
      process.env.RAZORPAY_KEY_SECRET = '  \'secret_key_value_here\'  ';

      const creds = getRazorpayCredentials();
      assert.equal(creds.keyId, 'rzp_test_1234567890');
      assert.equal(creds.publicKeyId, 'rzp_test_1234567890');
      assert.equal(creds.keySecret, 'secret_key_value_here');
      assert.equal(creds.isTest, true);
      assert.equal(creds.isLive, false);
      assert.equal(creds.modeMismatch, false);
      assert.equal(creds.keyPrefix, 'rzp_test****');

      // Test B: Detect mode mismatch
      process.env.RAZORPAY_KEY_ID = 'rzp_live_1234567890';
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = 'rzp_test_1234567890';
      const mismatchCreds = getRazorpayCredentials();
      assert.equal(mismatchCreds.modeMismatch, true);
    } finally {
      process.env.RAZORPAY_KEY_ID = origKeyId;
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = origPubKeyId;
      process.env.RAZORPAY_KEY_SECRET = origSecret;
    }
  });

  await t.test('2. Missing Credentials Handling (HTTP 500 with Safe User Message)', async () => {
    const origKeyId = process.env.RAZORPAY_KEY_ID;
    const origPubKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const origSecret = process.env.RAZORPAY_KEY_SECRET;

    delete process.env.RAZORPAY_KEY_ID;
    delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    delete process.env.RAZORPAY_KEY_SECRET;

    try {
      const res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.99', 'x-request-id': 'req_test_creds_missing' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Test Student',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 500);
      assert.equal(res.data.success, false);
      assert.equal(res.data.stage, 'credentials_check');
      assert.equal(res.data.code, 'CONFIG_MISSING');
      assert.equal(res.data.requestId, 'req_test_creds_missing');
      assert.match(res.data.message, /temporarily unavailable/i);
    } finally {
      if (origKeyId) process.env.RAZORPAY_KEY_ID = origKeyId;
      if (origPubKeyId) process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = origPubKeyId;
      if (origSecret) process.env.RAZORPAY_KEY_SECRET = origSecret;
    }
  });

  await t.test('3. Invalid Amount Rejection (Negative, Zero, Exceeding Maximum)', async () => {
    // Subtest A: Zero amount for variable fee
    let res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.101' },
      body: {
        purpose: 'counseling',
        amount: 0,
        name: 'Student One',
        email: 'student@example.com',
        phone: '9876543210',
      },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /minimum ₹1/i);
    assert.equal(res.data.code, 'INVALID_AMOUNT');

    // Subtest B: Negative amount
    res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.102' },
      body: {
        purpose: 'counseling',
        amount: -50,
        name: 'Student One',
        email: 'student@example.com',
        phone: '9876543210',
      },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /minimum ₹1/i);
    assert.equal(res.data.code, 'INVALID_AMOUNT');

    // Subtest C: Exceeding maximum limit ₹5,00,000
    res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.103' },
      body: {
        purpose: 'counseling',
        amount: 600000,
        name: 'Student One',
        email: 'student@example.com',
        phone: '9876543210',
      },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /cannot exceed ₹5,00,000/i);
    assert.equal(res.data.code, 'AMOUNT_EXCEEDS_MAX');
  });

  await t.test('4. Payload Input Validation (Missing purpose, invalid email, invalid phone)', async () => {
    // Missing purpose
    let res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.104' },
      body: { name: 'Student', email: 's@example.com', phone: '9876543210' },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /purpose is required/i);
    assert.equal(res.data.code, 'MISSING_PURPOSE');

    // Invalid email
    res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.105' },
      body: { purpose: 'counseling', name: 'Student', email: 'notanemail', phone: '9876543210' },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /valid email/i);
    assert.equal(res.data.code, 'INVALID_EMAIL');

    // Invalid phone
    res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.106' },
      body: { purpose: 'counseling', name: 'Student', email: 's@example.com', phone: '123' },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /10-digit mobile number/i);
    assert.equal(res.data.code, 'INVALID_PHONE');

    // Invalid BioData ObjectId
    res = createMockRes();
    await createOrderHandler({
      method: 'POST',
      headers: { 'x-forwarded-for': '127.0.0.107' },
      body: {
        purpose: 'counseling',
        amount: 500,
        name: 'Student',
        email: 's@example.com',
        phone: '9876543210',
        bioDataId: 'not-a-valid-mongo-id',
      },
    }, res);
    assert.equal(res.statusCode, 400);
    assert.match(res.data.message, /invalid student application reference/i);
    assert.equal(res.data.code, 'INVALID_BIODATA_REF');
  });

  await t.test('5. Successful Order Creation and Database Persistence Simulation', async () => {
    const origAddResources = Razorpay.prototype.addResources;
    let mockOrderCalledWith = null;
    const mockOrderId = `order_MOCK_${Date.now()}`;

    Razorpay.prototype.addResources = function () {
      origAddResources.call(this);
      this.orders = {
        create: async (opts) => {
          mockOrderCalledWith = opts;
          return {
            id: mockOrderId,
            entity: 'order',
            amount: opts.amount,
            amount_paid: 0,
            amount_due: opts.amount,
            currency: opts.currency,
            receipt: opts.receipt,
            status: 'created',
            attempts: 0,
            notes: opts.notes,
            created_at: Math.floor(Date.now() / 1000),
          };
        },
      };
    };

    try {
      const res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.108', 'x-request-id': 'req_succ_test' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Boopathi Ramasamy',
          email: 'boopathi@example.com',
          phone: '+91 9876543210',
          studentName: 'Boopathi Ramasamy',
          notes: 'Engineering admissions counselling request',
        },
      }, res);

      assert.equal(res.statusCode, 200);
      assert.equal(res.data.success, true);
      assert.equal(res.data.order.id, mockOrderId);
      assert.equal(res.data.order.amount, 50000);
      assert.equal(res.data.order.currency, 'INR');
      assert.equal(res.data.requestId, 'req_succ_test');
      assert.ok(res.data.receipt.startsWith('RCPT_'));
      assert.ok(res.data.key);
      assert.ok(res.data.internalPaymentId);

      // Verify Razorpay payload was properly formatted
      assert.equal(mockOrderCalledWith.amount, 50000); // 500 * 100 paise
      assert.equal(mockOrderCalledWith.currency, 'INR');
      assert.equal(mockOrderCalledWith.notes.purpose, 'counseling');

      // Verify MongoDB payment record was persisted with status 'created'
      const paymentDoc = await Payment.findOne({ razorpayOrderId: mockOrderId });
      assert.ok(paymentDoc, 'Payment record must be saved in database');
      assert.equal(paymentDoc.amount, 500);
      assert.equal(paymentDoc.amountPaise, 50000);
      assert.equal(paymentDoc.status, 'created');
      assert.equal(paymentDoc.name, 'Boopathi Ramasamy');
      assert.equal(paymentDoc.phone, '9876543210');
      assert.equal(paymentDoc.purpose, 'counseling');

      // Cleanup
      await Payment.deleteOne({ _id: paymentDoc._id });
    } finally {
      Razorpay.prototype.addResources = origAddResources;
    }
  });

  await t.test('6. Razorpay API Failure Normalization (401 Auth Failure, 400 Bad Request, Timeout, Axios TypeError)', async () => {
    const origAddResources = Razorpay.prototype.addResources;

    try {
      // Test A: 401 Unauthorized API error from Razorpay
      Razorpay.prototype.addResources = function () {
        origAddResources.call(this);
        this.orders = {
          create: async () => {
            throw {
              statusCode: 401,
              error: {
                code: 'BAD_REQUEST_ERROR',
                description: 'The id provided does not exist',
              },
            };
          },
        };
      };

      let res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.109' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student One',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 502);
      assert.equal(res.data.success, false);
      assert.equal(res.data.stage, 'razorpay_order_create');
      assert.match(res.data.message, /gateway authentication failed/i);

      // Test B: 400 Bad Request from Razorpay (e.g. invalid parameter)
      Razorpay.prototype.addResources = function () {
        origAddResources.call(this);
        this.orders = {
          create: async () => {
            throw {
              statusCode: 400,
              error: {
                code: 'BAD_REQUEST_ERROR',
                description: 'Amount exceeds maximum permitted limit for this account',
              },
            };
          },
        };
      };

      res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.110' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student One',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 400);
      assert.equal(res.data.success, false);
      assert.equal(res.data.stage, 'razorpay_order_create');
      assert.match(res.data.message, /exceeds maximum permitted limit/i);

      // Test C: Network Timeout
      Razorpay.prototype.addResources = function () {
        origAddResources.call(this);
        this.orders = {
          create: async () => {
            const netErr = new Error('Gateway timed out');
            netErr.code = 'ETIMEDOUT';
            throw netErr;
          },
        };
      };

      res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.111' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student One',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 504);
      assert.equal(res.data.success, false);
      assert.equal(res.data.stage, 'razorpay_order_create');
      assert.match(res.data.message, /timed out/i);

      // Test D: Axios normalizeError TypeError crash when response is undefined
      Razorpay.prototype.addResources = function () {
        origAddResources.call(this);
        this.orders = {
          create: async () => {
            const typeErr = new TypeError("Cannot read properties of undefined (reading 'status')");
            throw typeErr;
          },
        };
      };

      res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.112' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student One',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 504);
      assert.equal(res.data.success, false);
      assert.equal(res.data.code, 'GATEWAY_NETWORK_FAILURE');
      assert.match(res.data.message, /timed out/i);
    } finally {
      Razorpay.prototype.addResources = origAddResources;
    }
  });

  await t.test('7. PaymentSetting Auto-Seeding When Collection is Empty', async () => {
    // Temporarily clear settings
    const currentSettings = await PaymentSetting.find().lean();
    await PaymentSetting.deleteMany({});

    try {
      const origAddResources = Razorpay.prototype.addResources;
      Razorpay.prototype.addResources = function () {
        origAddResources.call(this);
        this.orders = {
          create: async (opts) => ({
            id: `order_AUTOSEED_${Date.now()}`,
            amount: opts.amount,
            currency: opts.currency,
            receipt: opts.receipt,
          }),
        };
      };

      const res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.113' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student Seed Test',
          email: 'seed@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 200);
      assert.equal(res.data.success, true);

      // Verify that settings were auto-seeded in database
      const newCount = await PaymentSetting.countDocuments();
      assert.ok(newCount > 0, 'Settings must have been auto-seeded');

      // Cleanup created payment
      await Payment.deleteOne({ receipt: res.data.receipt });
      Razorpay.prototype.addResources = origAddResources;
    } finally {
      // Restore previous settings
      await PaymentSetting.deleteMany({});
      await PaymentSetting.insertMany(currentSettings);
    }
  });

  await t.test('8. Strict Redaction of Secrets and PII in safePaymentLog', () => {
    let lastLog = null;
    const origConsoleError = console.error;
    console.error = (msg) => {
      lastLog = JSON.parse(msg);
    };

    try {
      safePaymentLog('test_stage', {
        requestId: 'req_12345',
        keySecret: 'super_secret_razorpay_secret_key',
        password: 'admin_password_123',
        authorization: 'Bearer secret_token',
        cookie: 'session=123',
        phone: '9876543210',
        email: 'student@example.com',
        name: 'Boopathi Ramasamy',
        studentName: 'Boopathi Ramasamy',
        orderId: 'order_123',
        amountPaise: 50000,
      });

      assert.ok(lastLog);
      assert.equal(lastLog.tag, 'PaymentDiagnostic');
      assert.equal(lastLog.step, 'test_stage');
      assert.equal(lastLog.requestId, 'req_12345');
      assert.equal(lastLog.orderId, 'order_123');
      assert.equal(lastLog.amountPaise, 50000);

      // Verify all sensitive keys are omitted
      assert.equal(lastLog.keySecret, undefined);
      assert.equal(lastLog.password, undefined);
      assert.equal(lastLog.authorization, undefined);
      assert.equal(lastLog.cookie, undefined);
      assert.equal(lastLog.phone, undefined);
      assert.equal(lastLog.email, undefined);
      assert.equal(lastLog.name, undefined);
      assert.equal(lastLog.studentName, undefined);
    } finally {
      console.error = origConsoleError;
    }
  });

  await t.test('9. Database Persistence Failure Handling during Order Creation', async () => {
    const origCreate = Payment.create;
    const origAddResources = Razorpay.prototype.addResources;

    Razorpay.prototype.addResources = function () {
      origAddResources.call(this);
      this.orders = {
        create: async (opts) => ({
          id: `order_DBFAIL_${Date.now()}`,
          amount: opts.amount,
          currency: opts.currency,
          receipt: opts.receipt,
        }),
      };
    };

    // Simulate database failure during payment document persistence
    Payment.create = async () => {
      const err = new Error('Database server selection timed out');
      err.name = 'MongooseServerSelectionError';
      throw err;
    };

    try {
      const res = createMockRes();
      await createOrderHandler({
        method: 'POST',
        headers: { 'x-forwarded-for': '127.0.0.115' },
        body: {
          purpose: 'counseling',
          amount: 500,
          name: 'Student Db Fail',
          email: 'student@example.com',
          phone: '9876543210',
        },
      }, res);

      assert.equal(res.statusCode, 500);
      assert.equal(res.data.success, false);
      assert.equal(res.data.stage, 'db_payment_persist');
      assert.equal(res.data.code, 'DB_CONNECTION_ERROR');
      assert.match(res.data.message, /Database service error/i);
    } finally {
      Payment.create = origCreate;
      Razorpay.prototype.addResources = origAddResources;
    }
  });

  t.after(async () => {
    try {
      await mongoose.disconnect();
    } catch (_) {}
  });
});
