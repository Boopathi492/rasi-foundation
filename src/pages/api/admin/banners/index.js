import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { isSafeUrl } from '@/backend/lib/validators';
import {
  decodeBase64Payload,
  validateUpload,
  newStorageKey,
  saveBuffer,
  imageDimensions,
  MAX_IMAGE_BYTES,
} from '@/backend/lib/uploads';
import Banner, { BANNER_PLACEMENTS } from '@/backend/models/Banner';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

function parseScheduleDate(dateStr, isEnd = false) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  if (isEnd && typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    d.setUTCHours(23, 59, 59, 999);
  }
  return d;
}

async function handler(req, res) {
  await dbConnect();

  // GET: List all banners with filters
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'banners:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const { placement, status, search, page = 1, limit = 50 } = req.query;
    const query = { archived: { $ne: true } };

    if (placement && placement !== 'all') {
      query.placement = placement;
    }
    if (status === 'active') {
      query.isActive = true;
    } else if (status === 'inactive') {
      query.isActive = false;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    const [banners, totalMatching] = await Promise.all([
      Banner.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Banner.countDocuments(query),
    ]);

    const formatted = banners.map((b) => ({
      ...b,
      desktopImageUrl: b.desktopImage?.storageKey ? `/api/banners/${b._id}/image?type=desktop` : '',
      mobileImageUrl: b.mobileImage?.storageKey ? `/api/banners/${b._id}/image?type=mobile` : '',
    }));

    return res.status(200).json({
      success: true,
      banners: formatted,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalMatching,
        pages: Math.ceil(totalMatching / limitNum) || 1,
      },
    });
  }

  // POST: Create banner
  if (req.method === 'POST') {
    if (!can(req.user?.role, 'banners:create')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const {
      title,
      description = '',
      altText = '',
      ctaText = '',
      ctaUrl = '',
      placement = 'home_hero',
      targetPages = [],
      audience = 'all',
      order = 0,
      transitionMs = 5000,
      isActive = true,
      startsAt = null,
      endsAt = null,
      desktopImageData = null,
      desktopImageName = '',
      mobileImageData = null,
      mobileImageName = '',
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Banner title is required' });
    }

    if (!BANNER_PLACEMENTS.includes(placement)) {
      return res.status(400).json({ success: false, message: `Invalid placement. Allowed: ${BANNER_PLACEMENTS.join(', ')}` });
    }

    if (ctaUrl && !isSafeUrl(ctaUrl)) {
      return res.status(400).json({ success: false, message: 'Invalid CTA URL' });
    }

    const bannerDoc = {
      title: title.trim(),
      description: description.trim(),
      altText: altText.trim() || title.trim(),
      ctaText: ctaText.trim(),
      ctaUrl: ctaUrl.trim(),
      placement,
      targetPages: Array.isArray(targetPages) ? targetPages : [],
      audience,
      order: parseInt(order, 10) || 0,
      transitionMs: Math.max(800, Math.min(15000, parseInt(transitionMs, 10) || 5000)),
      isActive: Boolean(isActive),
      startsAt: parseScheduleDate(startsAt, false),
      endsAt: parseScheduleDate(endsAt, true),
      createdBy: req.user?.username || req.user?.name || 'admin',
    };

    // Handle desktop image
    if (desktopImageData) {
      const decoded = decodeBase64Payload(desktopImageData, MAX_IMAGE_BYTES);
      if (!decoded.ok) return res.status(400).json({ success: false, message: `Desktop image: ${decoded.error}` });
      const valid = validateUpload({
        fileName: desktopImageName || 'desktop.jpg',
        buffer: decoded.buffer,
        maxBytes: MAX_IMAGE_BYTES,
        allowedKinds: ['jpeg', 'png', 'webp'],
      });
      if (!valid.ok) return res.status(400).json({ success: false, message: `Desktop image: ${valid.error}` });

      const storageKey = newStorageKey('banners', valid.ext);
      await saveBuffer(storageKey, decoded.buffer);
      const dims = imageDimensions(decoded.buffer);
      bannerDoc.desktopImage = {
        storageKey,
        mime: valid.mime,
        width: dims?.width || null,
        height: dims?.height || null,
        size: valid.size,
      };
    }

    // Handle mobile image
    if (mobileImageData) {
      const decoded = decodeBase64Payload(mobileImageData, MAX_IMAGE_BYTES);
      if (!decoded.ok) return res.status(400).json({ success: false, message: `Mobile image: ${decoded.error}` });
      const valid = validateUpload({
        fileName: mobileImageName || 'mobile.jpg',
        buffer: decoded.buffer,
        maxBytes: MAX_IMAGE_BYTES,
        allowedKinds: ['jpeg', 'png', 'webp'],
      });
      if (!valid.ok) return res.status(400).json({ success: false, message: `Mobile image: ${valid.error}` });

      const storageKey = newStorageKey('banners', valid.ext);
      await saveBuffer(storageKey, decoded.buffer);
      const dims = imageDimensions(decoded.buffer);
      bannerDoc.mobileImage = {
        storageKey,
        mime: valid.mime,
        width: dims?.width || null,
        height: dims?.height || null,
        size: valid.size,
      };
    }

    const created = await Banner.create(bannerDoc);

    await recordAudit(req, {
      action: 'banner.create',
      resourceType: 'banner',
      resourceId: created._id,
      summary: { title: created.title, placement: created.placement },
    });

    return res.status(201).json({
      success: true,
      banner: {
        ...created.toObject(),
        desktopImageUrl: created.desktopImage?.storageKey ? `/api/banners/${created._id}/image?type=desktop` : '',
        mobileImageUrl: created.mobileImage?.storageKey ? `/api/banners/${created._id}/image?type=mobile` : '',
      },
    });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
