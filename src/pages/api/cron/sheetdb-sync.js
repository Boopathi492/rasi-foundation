import dbConnect from '../../../backend/lib/mongodb.js';
import { reconcilePendingJobs } from '../../../backend/lib/sheetdb/index.js';

/**
 * Vercel Scheduled Cron Worker for SheetDB Synchronization
 * 
 * Invoked by Vercel Cron or secure orchestrator.
 * Strictly protected by process.env.CRON_SECRET.
 */
export default async function handler(req, res) {
    // Only accept GET (standard Vercel Cron) and POST (manual triggers)
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    // Set strict no-cache headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // 1. Validate Cron Secret Authentication
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers['authorization'];
    const customHeader = req.headers['x-cron-secret'];

    let providedToken = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        providedToken = authHeader.slice(7).trim();
    } else if (customHeader) {
        providedToken = String(customHeader).trim();
    }

    // In production, CRON_SECRET must be configured and match
    if (!cronSecret || providedToken !== cronSecret) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or missing Cron Secret',
        });
    }

    try {
        await dbConnect();

        // Process a bounded batch of up to 25 pending, failed, or stale-leased jobs
        const result = await reconcilePendingJobs(25);

        return res.status(200).json({
            success: true,
            message: `Cron sync executed successfully: ${result.completedCount} completed, ${result.failedCount} failed, ${result.reclaimedStaleCount} stale reclaimed.`,
            data: {
                processedCount: result.processedCount,
                completedCount: result.completedCount,
                failedCount: result.failedCount,
                reclaimedStaleCount: result.reclaimedStaleCount,
                timestamp: new Date().toISOString(),
            },
        });

    } catch (error) {
        console.error('[SheetDB Cron Worker Error]:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during scheduled sync execution',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
}
