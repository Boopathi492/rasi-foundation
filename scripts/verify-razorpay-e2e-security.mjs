import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Ensure strict Razorpay Test Mode isolation for this audit
// Test credentials prevent any production key usage or real payment execution
process.env.RAZORPAY_KEY_ID = process.env.RAZORPAY_TEST_KEY_ID || 'rzp_test_sec_audit_key_9999';
process.env.RAZORPAY_KEY_SECRET = process.env.RAZORPAY_TEST_KEY_SECRET || 'sec_audit_test_secret_hex_32bytes';
process.env.RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_TEST_WEBHOOK_SECRET || 'sec_audit_test_webhook_secret';
process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

import crypto from 'crypto';
import dbConnect from '../src/backend/lib/mongodb.js';
import Payment from '../src/backend/models/Payment.js';
import PaymentSetting from '../src/backend/models/PaymentSetting.js';
import BioData from '../src/backend/models/BioData.js';
import { getRazorpayCredentials } from '../src/backend/lib/razorpay.js';
import verifyHandler from '../src/pages/api/payment/verify.js';
import webhookHandler from '../src/pages/api/payment/webhook.js';

function createMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(k, v) {
      this.headers[k] = v;
      return this;
    },
    json(payload) {
      this.data = payload;
      return this;
    },
  };
  return res;
}

async function runSecurityAudit() {
  console.log('--- 1. Razorpay Credentials Mode & Isolation Audit ---');
  const creds = getRazorpayCredentials();
  console.log(`  Key ID configured: ${Boolean(creds.keyId)}`);
  console.log(`  Key ID prefix: ${creds.keyId ? creds.keyId.slice(0, 8) : 'none'}`);
  console.log(`  Mode: ${creds.mode}`);
  console.log(`  Is test mode? ${creds.isTest}`);

  if (creds.mode === 'live') {
    throw new Error('SECURITY VIOLATION: Production live credentials detected! Test must use test credentials only.');
  }

  await dbConnect();

  console.log('\n--- 2. End-to-End Test Payment Lifecycle Creation ---');
  // Create test biodata registration
  const testBioData = await BioData.create({
    studentName: 'Security Audit Candidate',
    dateOfBirth: '2005-05-15',
    gender: 'Male',
    courseApplied: 'B.E. Computer Science and Engineering',
    admissionType: 'UG',
    collegeName: 'Paavai Engineering College',
    quota: 'GQ',
    fatherName: 'Shanmugam R',
    motherName: 'Meenakshi S',
    community: 'BC',
    address: '10 Test Street, Salem',
    studentMobile: '9842011223',
    studentEmail: 'security.test@example.com',
    aadhaarNumber: '112233445566',
    isPaid: false,
  });

  const testOrderId = `order_test_${Date.now()}`;
  const testPaymentId = `pay_test_${Date.now()}`;
  const orderAmountPaise = 50000; // 500 INR in paise

  const paymentRecord = await Payment.create({
    receipt: `RCPT_AUDIT_${Date.now()}`,
    razorpayOrderId: testOrderId,
    amount: 500,
    amountPaise: orderAmountPaise,
    currency: 'INR',
    name: 'Security Audit Candidate',
    email: 'security.test@example.com',
    phone: '9842011223',
    purpose: 'counseling',
    status: 'created',
    bioDataId: testBioData._id,
  });

  console.log(`✓ Order recorded in DB with status: "${paymentRecord.status}", amountPaise: ${paymentRecord.amountPaise}, linked BioData: ${testBioData._id}`);

  console.log('\n--- 3. Testing Signature Verification Scenarios ---');

  // Scenario A: Tampered / Invalid signature rejection
  console.log('Testing tampered signature rejection...');
  const fakeSignature = 'bad_forged_signature_1234567890abcdef';
  const resInvalid = createMockRes();
  const reqInvalid = {
    method: 'POST',
    body: {
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: fakeSignature,
    },
    headers: {},
  };

  await verifyHandler(reqInvalid, resInvalid);
  console.log(`  Invalid signature status: ${resInvalid.statusCode}`);
  console.log(`  Response message: "${resInvalid.data?.message}"`);
  if (resInvalid.statusCode !== 400 || !resInvalid.data?.message?.includes('mismatch')) {
    throw new Error('FAILED: Tampered signature was NOT rejected with 400 mismatch!');
  }
  console.log('✓ Tampered signature was strictly rejected with 400.');

  // Scenario B: Valid cryptographic signature verification
  console.log('Testing valid cryptographic HMAC-SHA256 signature verification...');
  const bodyString = `${testOrderId}|${testPaymentId}`;
  const validSignature = crypto
    .createHmac('sha256', creds.keySecret || 'test_secret')
    .update(bodyString)
    .digest('hex');

  const resValid = createMockRes();
  const reqValid = {
    method: 'POST',
    body: {
      razorpay_order_id: testOrderId,
      razorpay_payment_id: testPaymentId,
      razorpay_signature: validSignature,
    },
    headers: {},
  };

  await verifyHandler(reqValid, resValid);
  console.log(`  Valid signature status: ${resValid.statusCode}`);
  console.log(`  Response message: "${resValid.data?.message}"`);

  // Verify DB state
  const updatedPayment = await Payment.findById(paymentRecord._id);
  const updatedBioData = await BioData.findById(testBioData._id);
  console.log(`  Payment status in DB: "${updatedPayment.status}"`);
  console.log(`  Payment ID in DB: "${updatedPayment.razorpayPaymentId}"`);
  console.log(`  BioData isPaid in DB: ${updatedBioData.isPaid}`);
  console.log(`  BioData paidAmount in DB: ${updatedBioData.paidAmount}`);

  if (updatedPayment.status !== 'completed' || !updatedBioData.isPaid) {
    throw new Error('FAILED: Payment status or BioData linkage was not updated to completed/paid!');
  }
  console.log('✓ Valid signature accepted and BioData registration synchronized.');

  console.log('\n--- 4. Testing Webhook Security & Idempotency ---');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'test_webhook_secret';
  const eventId = `evt_audit_${Date.now()}`;
  const webhookPayloadObj = {
    entity: 'event',
    account_id: 'acc_test_123',
    event: 'payment.captured',
    id: eventId,
    contains: ['payment'],
    payload: {
      payment: {
        entity: {
          id: testPaymentId,
          order_id: testOrderId,
          amount: orderAmountPaise,
          currency: 'INR',
          status: 'captured',
          method: 'upi',
          vpa: 'user@okaxis',
        },
      },
    },
  };
  const rawWebhookBody = Buffer.from(JSON.stringify(webhookPayloadObj), 'utf8');

  // Scenario C: Tampered Webhook Body
  console.log('Testing modified webhook body rejection...');
  const validWebhookSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawWebhookBody)
    .digest('hex');

  // Simulate modified amount (e.g. attacker changes amount in body to 100 paise)
  const tamperedRawBody = Buffer.from(JSON.stringify({ ...webhookPayloadObj, id: 'evt_tamp' }).replace(String(orderAmountPaise), '100'), 'utf8');
  const resTampWh = createMockRes();
  const reqTampWh = {
    method: 'POST',
    headers: {
      'x-razorpay-signature': validWebhookSig, // Old signature on modified body
    },
    async *[Symbol.asyncIterator]() {
      yield tamperedRawBody;
    },
  };

  await webhookHandler(reqTampWh, resTampWh);
  console.log(`  Tampered webhook status: ${resTampWh.statusCode}`);
  console.log(`  Tampered webhook error: "${resTampWh.data?.error}"`);
  if (resTampWh.statusCode !== 400) {
    throw new Error('FAILED: Modified webhook body was NOT rejected with 400!');
  }
  console.log('✓ Tampered webhook payload was strictly rejected.');

  // Scenario D: Valid Webhook Delivery
  console.log('Testing valid raw-body webhook delivery...');
  const resValidWh = createMockRes();
  const reqValidWh = {
    method: 'POST',
    headers: {
      'x-razorpay-signature': validWebhookSig,
    },
    async *[Symbol.asyncIterator]() {
      yield rawWebhookBody;
    },
  };

  await webhookHandler(reqValidWh, resValidWh);
  console.log(`  Valid webhook response:`, resValidWh.data);

  // Scenario E: Duplicate Webhook Delivery
  console.log('Testing duplicate webhook delivery (Idempotency)...');
  const resDupWh = createMockRes();
  const reqDupWh = {
    method: 'POST',
    headers: {
      'x-razorpay-signature': validWebhookSig,
    },
    async *[Symbol.asyncIterator]() {
      yield rawWebhookBody;
    },
  };

  await webhookHandler(reqDupWh, resDupWh);
  console.log(`  Duplicate webhook status: ${resDupWh.statusCode}`);
  console.log(`  Duplicate webhook result: "${resDupWh.data?.status}"`);
  if (resDupWh.data?.status !== 'already_processed') {
    throw new Error('FAILED: Duplicate webhook event was not recognized as already_processed!');
  }
  console.log('✓ Duplicate webhook delivery idempotently handled without duplicate crediting.');

  // Cleanup test documents
  await Payment.findByIdAndDelete(paymentRecord._id);
  await BioData.findByIdAndDelete(testBioData._id);
  console.log('✓ Test audit records cleaned up from database.');

  console.log('\n========================================');
  console.log('RAZORPAY END-TO-END SECURITY AUDIT PASSED');
  console.log('========================================');
  process.exit(0);
}

runSecurityAudit().catch(err => {
  console.error('Fatal Razorpay security audit error:', err);
  process.exit(1);
});
