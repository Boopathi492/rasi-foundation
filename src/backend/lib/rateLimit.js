// Fixed-window in-memory rate limiter.
// LIMITATION: state is per server instance. On serverless/multi-instance hosting each instance keeps its own
// counters, so this is a best-effort brute-force/abuse brake, not a hard global guarantee.
// For strict global limits, back it with a shared store (Redis/Mongo) later.

const buckets = new Map();
const MAX_BUCKETS = 5000;

export function createRateLimiter({ windowMs = 60_000, max = 10 } = {}) {
  return {
    /** Returns { allowed, remaining, retryAfterSec }. */
    check(key, now = Date.now()) {
      let b = buckets.get(key);
      if (!b || now >= b.reset) {
        if (buckets.size >= MAX_BUCKETS) prune(now);
        b = { count: 0, reset: now + windowMs };
        buckets.set(key, b);
      }
      b.count += 1;
      const allowed = b.count <= max;
      return {
        allowed,
        remaining: Math.max(0, max - b.count),
        retryAfterSec: allowed ? 0 : Math.max(1, Math.ceil((b.reset - now) / 1000)),
      };
    },
  };
}

function prune(now) {
  for (const [k, v] of buckets) if (now >= v.reset) buckets.delete(k);
  if (buckets.size >= MAX_BUCKETS) buckets.clear();
}

export function resetRateLimits() {
  buckets.clear();
}

/** Best-effort client IP (trusting the first X-Forwarded-For hop as set by the hosting proxy). */
export function clientIp(req) {
  const fwd = req?.headers?.['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim().slice(0, 64);
  return String(req?.socket?.remoteAddress || 'unknown').slice(0, 64);
}

/**
 * Express/Next.js middleware-friendly rate limiter returning boolean
 */
export function rateLimiter({ windowMs = 60_000, max = 10 } = {}) {
  const limiter = createRateLimiter({ windowMs, max });
  return function (req, res) {
    const ip = clientIp(req);
    const result = limiter.check(ip);
    if (!result.allowed && res && typeof res.setHeader === 'function') {
      res.setHeader('Retry-After', result.retryAfterSec);
    }
    return result.allowed;
  };
}
