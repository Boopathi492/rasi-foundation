import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { summarizeChanges } from '@/backend/lib/redact';
import {
  decodeBase64Payload,
  validateUpload,
  newStorageKey,
  saveBuffer,
  deleteStored,
  MAX_IMAGE_BYTES,
} from '@/backend/lib/uploads';
import College from '@/backend/models/College';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '6mb',
    },
  },
};

async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  const college = await College.findById(id);
  if (!college) {
    return res.status(404).json({ message: 'College not found' });
  }

  if (req.method === 'GET') {
    if (!can(req.user?.role, 'colleges:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const doc = college.toObject();
    doc.logoUrl = `/api/colleges/${college._id}/logo`;
    return res.status(200).json(doc);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    if (!can(req.user?.role, 'colleges:edit')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const before = college.toObject();
    const {
      name,
      location,
      district,
      tneaCode,
      note,
      isActive,
      order,
      departments,
      website,
      type,
      logoData,
      logoName,
      removeLogo,
    } = req.body || {};

    if (name !== undefined) college.name = name.trim();
    if (location !== undefined) college.location = location.trim();
    if (district !== undefined) college.district = district.trim();
    if (tneaCode !== undefined) college.tneaCode = tneaCode.trim();
    if (note !== undefined) college.note = note.trim();
    if (isActive !== undefined) college.isActive = Boolean(isActive);
    if (order !== undefined) college.order = parseInt(order, 10) || 0;
    if (departments !== undefined) {
      college.departments = Array.isArray(departments) ? departments : [];
    }
    if (website !== undefined) college.website = website.trim();
    if (type !== undefined) college.type = type;

    // Handle logo upload
    if (logoData) {
      const decoded = decodeBase64Payload(logoData, MAX_IMAGE_BYTES);
      if (!decoded.ok) return res.status(400).json({ message: `Logo error: ${decoded.error}` });
      const valid = validateUpload({
        fileName: logoName || 'logo.png',
        buffer: decoded.buffer,
        maxBytes: MAX_IMAGE_BYTES,
        allowedKinds: ['jpeg', 'png', 'webp'],
      });
      if (!valid.ok) return res.status(400).json({ message: `Logo error: ${valid.error}` });

      const oldKey = college.logo?.storageKey;
      const storageKey = newStorageKey('colleges', valid.ext);
      await saveBuffer(storageKey, decoded.buffer);
      if (oldKey) deleteStored(oldKey).catch(() => {});

      college.logo = { storageKey, mime: valid.mime };
    } else if (removeLogo && college.logo?.storageKey) {
      deleteStored(college.logo.storageKey).catch(() => {});
      college.logo = { storageKey: '', mime: '' };
    }

    await college.save();

    await recordAudit(req, {
      action: 'college.update',
      resourceType: 'college',
      resourceId: id,
      summary: summarizeChanges(before, college.toObject()),
    });

    const doc = college.toObject();
    doc.logoUrl = `/api/colleges/${college._id}/logo`;
    return res.status(200).json(doc);
  }

  if (req.method === 'DELETE') {
    if (!can(req.user?.role, 'colleges:manage')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (college.logo?.storageKey) {
      deleteStored(college.logo.storageKey).catch(() => {});
    }
    await College.findByIdAndDelete(id);

    await recordAudit(req, {
      action: 'college.delete',
      resourceType: 'college',
      resourceId: id,
      summary: { name: college.name, district: college.district },
    });

    return res.status(200).json({ message: 'College deleted successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
