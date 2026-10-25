import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import { isSafeUrl } from '@/backend/lib/validators';
import {
  decodeBase64Payload,
  validateUpload,
  newStorageKey,
  saveBuffer,
  deleteStored,
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

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const banner = await Banner.findById(id);
  if (!banner) {
    return res.status(404).json({ success: false, message: 'Banner not found' });
  }

  // GET: Single banner
  if (req.method === 'GET') {
    if (!can(req.user?.role, 'banners:view')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const doc = banner.toObject();
    return res.status(200).json({
      success: true,
      banner: {
        ...doc,
        desktopImageUrl: doc.desktopImage?.storageKey ? `/api/banners/${doc._id}/image?type=desktop` : '',
        mobileImageUrl: doc.mobileImage?.storageKey ? `/api/banners/${doc._id}/image?type=mobile` : '',
      },
    });
  }

  // PUT: Update banner
  if (req.method === 'PUT') {
    if (!can(req.user?.role, 'banners:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const before = banner.toObject();
    const {
      title,
      description,
      altText,
      ctaText,
      ctaUrl,
      placement,
      targetPages,
      audience,
      order,
      transitionMs,
      isActive,
      startsAt,
      endsAt,
      desktopImageData,
      desktopImageName,
      mobileImageData,
      mobileImageName,
    } = req.body || {};

    if (title !== undefined) {
      if (!title.trim()) return res.status(400).json({ success: false, message: 'Banner title cannot be empty' });
      banner.title = title.trim();
    }
    if (description !== undefined) banner.description = description.trim();
    if (altText !== undefined) banner.altText = altText.trim();
    if (ctaText !== undefined) banner.ctaText = ctaText.trim();
    if (ctaUrl !== undefined) {
      if (ctaUrl && !isSafeUrl(ctaUrl)) return res.status(400).json({ success: false, message: 'Invalid CTA URL' });
      banner.ctaUrl = ctaUrl.trim();
    }
    if (placement !== undefined) {
      if (!BANNER_PLACEMENTS.includes(placement)) {
        return res.status(400).json({ success: false, message: 'Invalid placement value' });
      }
      banner.placement = placement;
    }
    if (targetPages !== undefined) banner.targetPages = Array.isArray(targetPages) ? targetPages : [];
    if (audience !== undefined) banner.audience = audience;
    if (order !== undefined) banner.order = parseInt(order, 10) || 0;
    if (transitionMs !== undefined) banner.transitionMs = Math.max(800, Math.min(15000, parseInt(transitionMs, 10) || 5000));
    if (isActive !== undefined) banner.isActive = Boolean(isActive);
    if (startsAt !== undefined) banner.startsAt = startsAt ? new Date(startsAt) : null;
    if (endsAt !== undefined) banner.endsAt = endsAt ? new Date(endsAt) : null;

    // Optional replacement of desktop image
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

      const oldKey = banner.desktopImage?.storageKey;
      const storageKey = newStorageKey('banners', valid.ext);
      await saveBuffer(storageKey, decoded.buffer);
      if (oldKey) deleteStored(oldKey).catch(() => {});

      const dims = imageDimensions(decoded.buffer);
      banner.desktopImage = {
        storageKey,
        mime: valid.mime,
        width: dims?.width || null,
        height: dims?.height || null,
        size: valid.size,
      };
    }

    // Optional replacement of mobile image
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

      const oldKey = banner.mobileImage?.storageKey;
      const storageKey = newStorageKey('banners', valid.ext);
      await saveBuffer(storageKey, decoded.buffer);
      if (oldKey) deleteStored(oldKey).catch(() => {});

      const dims = imageDimensions(decoded.buffer);
      banner.mobileImage = {
        storageKey,
        mime: valid.mime,
        width: dims?.width || null,
        height: dims?.height || null,
        size: valid.size,
      };
    }

    banner.updatedBy = req.user?.username || req.user?.name || 'admin';
    await banner.save();

    await recordAudit(req, {
      action: 'banner.update',
      resourceType: 'banner',
      resourceId: id,
      summary: summarizeChanges(before, banner.toObject()),
    });

    return res.status(200).json({
      success: true,
      banner: {
        ...banner.toObject(),
        desktopImageUrl: banner.desktopImage?.storageKey ? `/api/banners/${banner._id}/image?type=desktop` : '',
        mobileImageUrl: banner.mobileImage?.storageKey ? `/api/banners/${banner._id}/image?type=mobile` : '',
      },
    });
  }

  // DELETE: Soft delete / archive
  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'banners:edit')) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    banner.archived = true;
    banner.isActive = false;
    await banner.save();

    await recordAudit(req, {
      action: 'banner.archive',
      resourceType: 'banner',
      resourceId: id,
      summary: { title: banner.title },
    });

    return res.status(200).json({ success: true, message: 'Banner archived successfully' });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default withAuth(handler);
