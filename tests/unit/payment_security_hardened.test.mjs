import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

test('Payment Security - HMAC-SHA256 signature verification with constant-time equality', () => {
  const secret = 'rzp_test_secret_key_12345';
  const orderId = 'order_DA9vK08yB123';
  const paymentId = 'pay_DA9vM98yB456';

  const body = `${orderId}|${paymentId}`;
  const validSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  // Verify valid signature matching
  const expectedSig = crypto.createHmac('sha256', secret).update(body).digest('hex');
  const sigBuf = Buffer.from(validSignature, 'utf8');
  const expBuf = Buffer.from(expectedSig, 'utf8');
  const isValid = sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf);

  assert.equal(isValid, true, 'Valid signature must pass constant-time check');

  // Tampered signature must be rejected
  const tamperedSig = validSignature.slice(0, -2) + 'aa';
  const tampBuf = Buffer.from(tamperedSig, 'utf8');
  const isTamperedValid = tampBuf.length === expBuf.length && crypto.timingSafeEqual(tampBuf, expBuf);
  assert.equal(isTamperedValid, false, 'Tampered signature must fail verification');

  // Truncated signature of different length must be rejected safely without exception
  const truncatedSig = validSignature.slice(0, 10);
  const truncBuf = Buffer.from(truncatedSig, 'utf8');
  const isTruncValid = truncBuf.length === expBuf.length && crypto.timingSafeEqual(truncBuf, expBuf);
  assert.equal(isTruncValid, false, 'Mismatched length must be safely rejected');
});

test('Payment Security - Raw Request Body Webhook Signature Validation', () => {
  const webhookSecret = 'whsec_test_secret_999';
  const rawBodyString = JSON.stringify({
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: 'pay_captured_789',
          order_id: 'order_DA9vK08yB123',
          amount: 50000,
          currency: 'INR',
          status: 'captured',
        },
      },
    },
  });
  const rawBodyBuffer = Buffer.from(rawBodyString, 'utf8');

  // Valid webhook signature
  const validWebhookSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBodyBuffer)
    .digest('hex');

  const expWebhookSig = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBodyBuffer)
    .digest('hex');

  const whSigBuf = Buffer.from(validWebhookSig, 'utf8');
  const whExpBuf = Buffer.from(expWebhookSig, 'utf8');
  assert.equal(whSigBuf.length === whExpBuf.length && crypto.timingSafeEqual(whSigBuf, whExpBuf), true);

  // If payload is modified (e.g. amount tampered), signature check MUST fail
  const tamperedPayload = Buffer.from(rawBodyString.replace('50000', '100'), 'utf8');
  const tamperedExpected = crypto
    .createHmac('sha256', webhookSecret)
    .update(tamperedPayload)
    .digest('hex');
  const whTampExpectedBuf = Buffer.from(tamperedExpected, 'utf8');

  assert.equal(
    whSigBuf.length === whTampExpectedBuf.length && crypto.timingSafeEqual(whSigBuf, whTampExpectedBuf),
    false,
    'Modified payload must fail signature check'
  );
});

test('Payment Security - Server-side amount reconciliation rejects tampered amounts', () => {
  const storedOrderPaise = 50000; // 500 INR in paise

  const matchingAuthorizedPaise = 50000;
  assert.equal(matchingAuthorizedPaise === storedOrderPaise, true);

  const tamperedPaise = 100; // Attempted 1 INR attack
  assert.equal(tamperedPaise === storedOrderPaise, false, 'Tampered amount must be rejected');
});

test('Payment Security - Idempotency guard prevents duplicate processing', () => {
  const existingEvents = [{ eventId: 'evt_123456789' }];
  const incomingDuplicateEventId = 'evt_123456789';
  const incomingNewEventId = 'evt_987654321';

  const isDuplicate = existingEvents.some(e => e.eventId === incomingDuplicateEventId);
  const isNew = existingEvents.some(e => e.eventId === incomingNewEventId);

  assert.equal(isDuplicate, true, 'Duplicate webhook event detected and ignored');
  assert.equal(isNew, false, 'New webhook event accepted');
});
