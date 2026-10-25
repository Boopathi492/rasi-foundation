import mongoose from 'mongoose';
import fs from 'node:fs/promises';
import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { uploadRoot } from '@/backend/lib/uploads';
import ApplicationErrorLog from '@/backend/models/ApplicationErrorLog';
import AdminAuditLog from '@/backend/models/AdminAuditLog';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!can(req.user?.role, 'logs:view')) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }

  await dbConnect();

  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // MongoDB connection state: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbStateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    const dbStatus = dbStateMap[mongoose.connection.readyState] || 'unknown';

    // Errors in last 24 hours
    const [recentErrors, criticalRecent, authFailures, unresolvedTotal] = await Promise.all([
      ApplicationErrorLog.countDocuments({ lastSeenAt: { $gte: oneDayAgo } }),
      ApplicationErrorLog.countDocuments({ severity: 'critical', lastSeenAt: { $gte: oneDayAgo } }),
      AdminAuditLog.countDocuments({ action: { $regex: /auth/i }, outcome: { $ne: 'success' }, createdAt: { $gte: oneDayAgo } }),
      ApplicationErrorLog.countDocuments({ resolved: false }),
    ]);

    // Check private storage access
    let storageStatus = 'accessible';
    let storagePath = uploadRoot();
    try {
      await fs.access(storagePath);
    } catch {
      storageStatus = 'not_created_or_inaccessible';
    }

    const mem = process.memoryUsage();

    return res.status(200).json({
      success: true,
      timestamp: new Date(),
      database: {
        status: dbStatus,
        host: mongoose.connection.host || 'configured',
        name: mongoose.connection.name || 'db',
      },
      errors: {
        last24Hours: recentErrors,
        criticalLast24Hours: criticalRecent,
        unresolvedTotal,
      },
      security: {
        failedAuthAttempts24h: authFailures,
      },
      storage: {
        status: storageStatus,
      },
      runtime: {
        nodeVersion: process.version,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round(mem.rss / 1024 / 1024),
        memoryHeapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
      },
    });
  } catch (err) {
    console.error('[Monitoring Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve system status' });
  }
}

export default withAuth(handler);
