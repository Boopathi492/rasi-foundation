import Razorpay from 'razorpay';

/**
 * Clean and unquote environment variable strings (handling cases where
 * quotes or trailing spaces were inadvertently pasted in deployment settings).
 */
export function sanitizeEnv(val) {
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

  // Safe prefix for diagnostics without exposing the full key
  const keyPrefix = keyId ? `${keyId.slice(0, 8)}****` : 'none';

  return {
    configured: Boolean(keyId && keySecret),
    hasKeyId: Boolean(keyId),
    hasKeySecret: Boolean(keySecret),
    keyId,
    publicKeyId,
    keySecret,
    keyPrefix,
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

  return new Razorpay({
    key_id: creds.keyId,
    key_secret: creds.keySecret,
  });
}

/**
 * Normalizes errors thrown by Razorpay SDK, network layers, or database operations.
 * The Razorpay SDK throws plain object literals ({ statusCode, error: { code, description } }),
 * not standard Error instances. It can also throw TypeErrors if Axios receives no response.
 */
export function parseRazorpayError(err) {
  // 1. Razorpay SDK normalizeError bug where Axios received no response (network/DNS/timeout)
  if (
    err &&
    err.name === 'TypeError' &&
    (err.message?.includes("reading 'status'") || err.message?.includes("reading 'data'"))
  ) {
    return {
      statusCode: 504,
      code: 'GATEWAY_NETWORK_FAILURE',
      description: 'Payment gateway connection or network unreachable',
      field: null,
      source: 'network',
    };
  }

  // 2. Razorpay API response errors ({ statusCode, error })
  if (err && typeof err === 'object' && (err.statusCode || err.error)) {
    const statusCode = err.statusCode || 500;
    const rzpErr = err.error || {};
    const description = typeof rzpErr === 'string'
      ? rzpErr
      : rzpErr.description || rzpErr.message || 'Razorpay payment gateway rejected request';
    const code = typeof rzpErr === 'object' && rzpErr.code
      ? rzpErr.code
      : statusCode === 401
      ? 'AUTHENTICATION_ERROR'
      : statusCode === 400
      ? 'BAD_REQUEST_ERROR'
      : 'GATEWAY_ERROR';
    const field = (typeof rzpErr === 'object' && rzpErr.field) || null;

    return {
      statusCode,
      code,
      description,
      field,
      source: 'razorpay_api',
    };
  }

  // 3. Network / connection timeout errors
  if (err && (err.code === 'ECONNRESET' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT' || err.code === 'ECONNREFUSED')) {
    return {
      statusCode: 504,
      code: err.code,
      description: 'Network timeout while connecting to Razorpay payment gateway',
      field: null,
      source: 'network',
    };
  }

  // 4. MongoDB / Mongoose database errors
  if (err && (err.name === 'MongooseServerSelectionError' || err.name === 'MongoNetworkError' || err.name === 'MongoServerSelectionError')) {
    return {
      statusCode: 500,
      code: 'DB_CONNECTION_ERROR',
      description: 'Database connection failed or timed out',
      field: null,
      source: 'database',
    };
  }

  if (err && err.code === 11000) {
    return {
      statusCode: 500,
      code: 'DB_DUPLICATE_KEY',
      description: 'Database unique constraint violation',
      field: null,
      source: 'database',
    };
  }

  if (err && err.name === 'ValidationError') {
    return {
      statusCode: 400,
      code: 'DB_VALIDATION_ERROR',
      description: err.message,
      field: null,
      source: 'database',
    };
  }

  // 5. Application / internal error
  return {
    statusCode: err?.statusCode || 500,
    code: err?.code || 'INTERNAL_ERROR',
    description: err?.message || 'Internal server error during order creation',
    field: null,
    source: 'internal',
  };
}

const REDACT_KEYS = new Set([
  'keysecret', 'key_secret', 'secret', 'password', 'authorization', 'cookie',
  'token', 'phone', 'email', 'name', 'studentname', 'payername', 'contact',
  'notes', 'address', 'razorpay_key_secret'
]);

/**
 * Recursively cleans and redacts any sensitive keys from log objects.
 */
function redactObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(redactObject);

  const clean = {};
  for (const [k, v] of Object.entries(obj)) {
    const lowerKey = k.toLowerCase().replace(/[^a-z0-9_]/g, '');
    if (REDACT_KEYS.has(lowerKey)) {
      continue; // completely omit sensitive key
    }
    if (v && typeof v === 'object') {
      clean[k] = redactObject(v);
    } else {
      clean[k] = v;
    }
  }
  return clean;
}

/**
 * Structured diagnostic logger that redacts PII, card numbers, and secret keys.
 */
export function safePaymentLog(step, details = {}) {
  const cleanDetails = redactObject(details);
  const logPayload = {
    tag: 'PaymentDiagnostic',
    step,
    timestamp: new Date().toISOString(),
    ...cleanDetails,
  };

  console.error(JSON.stringify(logPayload));
}
