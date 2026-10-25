import crypto from 'crypto';
import dbConnect from './mongodb.js';
import { verifyToken } from './auth.js';
import { can, roleFromTokenPayload } from './rbac.js';
import { rateLimiter } from './rateLimit.js';
import { redactDeep, redactString, sanitizePath } from './redact.js';
import ApplicationErrorLog from '../models/ApplicationErrorLog.js';
import AdminAuditLog from '../models/AdminAuditLog.js';

/**
 * Generates or extracts correlation ID from request headers.
 */
export function getRequestId(req) {
  const existing = req.headers['x-request-id'];
  if (existing && typeof existing === 'string' && existing.length <= 64) {
    return existing.trim();
  }
  return crypto.randomUUID();
}

/**
 * Computes a stable fingerprint for de-duplicating error logs.
 */
function computeFingerprint(method, path, err) {
  const normPath = sanitizePath(path).replace(/\/[0-9a-fA-F]{24}/g, '/:id');
  const base = `${method}:${normPath}:${err?.name || 'Error'}:${(err?.message || '').slice(0, 80)}`;
  return crypto.createHash('sha256').update(base).digest('hex').slice(0, 16);
}

/**
 * Asynchronously log an unhandled error to ApplicationErrorLog.
 * Never throws — server-side logging must never crash the request.
 */
export async function logApplicationError(err, req, { status = 500, category = 'server', module = 'general', durationMs = 0 } = {}) {
  try {
    await dbConnect();
    const method = req?.method || 'UNKNOWN';
    const path = sanitizePath(req?.url || '');
    const requestId = req?.id || getRequestId(req);
    const fingerprint = computeFingerprint(method, path, err);

    await ApplicationErrorLog.findOneAndUpdate(
      { fingerprint, resolved: false },
      {
        $setOnInsert: {
          fingerprint,
          severity: status >= 500 ? 'error' : 'warning',
          category,
          module,
          message: redactString(err?.message || 'Unknown error', 500),
          method,
          path,
          status,
          requestId,
          environment: process.env.NODE_ENV || 'development',
          firstSeenAt: new Date(),
        },
        $set: {
          lastSeenAt: new Date(),
          durationMs,
          stack: redactString(err?.stack || '', 3000),
        },
        $inc: { occurrences: 1 },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (logErr) {
    console.error('[ApplicationErrorLog] Failed to record error log:', logErr?.message || logErr);
  }
}

/**
 * Record an audit log entry safely.
 */
export async function recordAudit(req, {
  action,
  resourceType = '',
  resourceId = '',
  outcome = 'success',
  summary = {},
}) {
  try {
    await dbConnect();
    const actorId = req?.user?.id || req?.user?._id || req?.user?.username || 'system';
    const actorName = req?.user?.name || req?.user?.username || 'System';
    const actorRole = req?.user?.role || 'anonymous';
    const ip = req?.headers['x-forwarded-for']?.split(',')[0]?.trim() || req?.socket?.remoteAddress || '';
    const requestId = req?.id || getRequestId(req);

    await AdminAuditLog.create({
      actorId: String(actorId),
      actorName: String(actorName),
      actorRole: String(actorRole),
      action,
      resourceType,
      resourceId: String(resourceId),
      outcome,
      summary: redactDeep(summary),
      ip: redactString(ip, 64),
      requestId,
    });
  } catch (auditErr) {
    console.error('[AdminAuditLog] Failed to record audit log:', auditErr?.message || auditErr);
  }
}

/**
 * Comprehensive API Handler wrapper.
 */
export function createApiHandler(handlers, options = {}) {
  const {
    methods = null,
    requireAuth = false,
    permission = null,
    rateLimit = null,
    module = 'api',
  } = options;

  return async function (req, res) {
    const startTime = Date.now();
    const requestId = getRequestId(req);
    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);

    // Method check
    if (methods && !methods.includes(req.method)) {
      res.setHeader('Allow', methods);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`,
        requestId,
      });
    }

    // Rate limit check
    if (rateLimit) {
      const limiter = typeof rateLimit === 'object'
        ? rateLimiter(rateLimit)
        : rateLimiter({ windowMs: 60000, max: 60 });
      const allowed = limiter(req, res);
      if (!allowed) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.',
          requestId,
        });
      }
    }

    // Auth & Permission checks
    if (requireAuth || permission) {
      const user = verifyToken(req);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Authentication required',
          requestId,
        });
      }
      user.role = roleFromTokenPayload(user) || 'admin';
      req.user = user;

      if (permission && !can(user.role, permission)) {
        await recordAudit(req, {
          action: 'auth.permission.denied',
          resourceType: permission.split(':')[0],
          outcome: 'denied',
          summary: { requiredPermission: permission, userRole: user.role },
        });
        return res.status(403).json({
          success: false,
          message: `Forbidden: Lacks permission '${permission}'`,
          requestId,
        });
      }
    }

    // Connect to database
    try {
      await dbConnect();
    } catch (dbErr) {
      const durationMs = Date.now() - startTime;
      await logApplicationError(dbErr, req, { status: 503, category: 'database', module, durationMs });
      return res.status(503).json({
        success: false,
        message: 'Database connection unavailable',
        requestId,
      });
    }

    // Execute route handler
    try {
      const handlerFn = typeof handlers === 'function' ? handlers : handlers[req.method];
      if (!handlerFn) {
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`,
          requestId,
        });
      }

      await handlerFn(req, res);
    } catch (handlerErr) {
      const durationMs = Date.now() - startTime;
      await logApplicationError(handlerErr, req, { status: 500, category: 'server', module, durationMs });

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: 'An internal server error occurred',
          requestId,
        });
      }
    } finally {
      const durationMs = Date.now() - startTime;
      if (!res.headersSent) {
        res.setHeader('X-Response-Time', `${durationMs}ms`);
      }
    }
  };
}
