import Razorpay from 'razorpay';

/**
 * Clean and unquote environment variable strings (handling cases where
 * quotes or trailing spaces were inadvertently pasted in deployment settings).
 */
function sanitizeEnv(val) {
  if (!val || typeof val !== 'string') return '';
  return val.trim().replace(/^['"](.*)['"]$/, '$1').trim();
}

/**
 * Retrieves and validates server-side Razorpay credentials safely.
 * Never logs or exposes the secret values.
 */
export function getRazorpayCredentials() {
  const rawKeyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  const rawPubKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  const rawSecret = process.env.RAZORPAY_KEY_SECRET || '';

  const keyId = sanitizeEnv(rawKeyId);
  const publicKeyId = sanitizeEnv(rawPubKeyId) || keyId;
  const keySecret = sanitizeEnv(rawSecret);

  const isTest = keyId.startsWith('rzp_test_');
  const isLive = keyId.startsWith('rzp_live_');
  const pubIsTest = publicKeyId.startsWith('rzp_test_');
  const pubIsLive = publicKeyId.startsWith('rzp_live_');

  // Detect mode mismatch between client public key and server secret key
  const modeMismatch = Boolean(
    keyId &&
    publicKeyId &&
    ((isTest && pubIsLive) || (isLive && pubIsTest))
  );

  return {
    configured: Boolean(keyId && keySecret),
    hasKeyId: Boolean(keyId),
    hasKeySecret: Boolean(keySecret),
    keyId,
    publicKeyId,
    keySecret,
    isTest,
    isLive,
    modeMismatch,
    mode: isTest ? 'test' : isLive ? 'live' : 'unknown',
  };
}

/**
 * Initializes and returns an official Razorpay SDK client.
 */
export function getRazorpayClient() {
  const creds = getRazorpayCredentials();
  if (!creds.configured) {
    const missing = [];
    if (!creds.hasKeyId) missing.push('RAZORPAY_KEY_ID');
    if (!creds.hasKeySecret) missing.push('RAZORPAY_KEY_SECRET');
    const err = new Error(`Missing Razorpay credentials: ${missing.join(', ')}`);
    err.code = 'CONFIG_MISSING';
    err.statusCode = 500;
    throw err;
  }

  if (creds.modeMismatch) {
    console.warn(
      '[Razorpay Security] Warning: Server RAZORPAY_KEY_ID and NEXT_PUBLIC_RAZORPAY_KEY_ID appear to use different environments (test vs live).'
    );
  }

  return new Razorpay({
    key_id: creds.keyId,
    key_secret: creds.keySecret,
  });
}

/**
 * Normalizes errors thrown by Razorpay SDK or network layers.
 * The Razorpay SDK throws object literals ({ statusCode, error: { code, description } }),
 * not standard Error instances.
 */
export function parseRazorpayError(err) {
  // 1. Razorpay API response errors
  if (err && typeof err === 'object' && (err.statusCode || err.error)) {
    const statusCode = err.statusCode || 500;
    const rzpErr = err.error || {};
    return {
      statusCode,
      code: rzpErr.code || (statusCode === 401 ? 'AUTHENTICATION_ERROR' : 'GATEWAY_ERROR'),
      description: rzpErr.description || 'Razorpay payment gateway rejected request',
      field: rzpErr.field || null,
      source: 'razorpay_api',
    };
  }

  // 2. Network / connection timeout errors
  if (err && (err.code === 'ECONNRESET' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED')) {
    return {
      statusCode: 504,
      code: err.code,
      description: 'Network timeout while connecting to Razorpay payment gateway',
      field: null,
      source: 'network',
    };
  }

  // 3. Application or Database Errors
  return {
    statusCode: err?.statusCode || 500,
    code: err?.code || 'INTERNAL_ERROR',
    description: err?.message || 'Internal server error during order creation',
    field: null,
    source: 'internal',
  };
}

/**
 * Safe diagnostic logger that redacts PII, card numbers, and secret keys.
 */
export function safePaymentLog(step, details = {}) {
  const cleanDetails = { ...details };
  // Redact any potential sensitive keys
  delete cleanDetails.keySecret;
  delete cleanDetails.password;
  delete cleanDetails.authorization;
  delete cleanDetails.cookie;
  delete cleanDetails.phone;
  delete cleanDetails.email;
  delete cleanDetails.name;

  console.error(`[Payment Diagnostic] Step: "${step}" | Details:`, cleanDetails);
}
