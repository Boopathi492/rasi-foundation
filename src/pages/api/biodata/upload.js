import dbConnect from '@/backend/lib/mongodb';
import { rateLimiter } from '@/backend/lib/rateLimit';
import { isObjectId } from '@/backend/lib/validators';
import {
  decodeBase64Payload,
  validateUpload,
  newStorageKey,
  saveBuffer,
  MAX_DOCUMENT_BYTES,
} from '@/backend/lib/uploads';
import BioData from '@/backend/models/BioData';
import StudentDocument from '@/backend/models/StudentDocument';

const limiter = rateLimiter({ windowMs: 60 * 1000, max: 20 });

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!limiter(req, res)) {
    return res.status(429).json({ success: false, message: 'Too many upload attempts. Please wait.' });
  }

  await dbConnect();

  const { biodataId, documentType, fileName, fileData } = req.body || {};

  if (!biodataId || !isObjectId(biodataId)) {
    return res.status(400).json({ success: false, message: 'A valid student BioData ID is required' });
  }

  const validTypes = [
    'photo',
    'aadhaar',
    'marksheet_10',
    'marksheet_12',
    'community_certificate',
    'transfer_certificate',
    'first_graduate',
    'other',
  ];
  if (!documentType || !validTypes.includes(documentType)) {
    return res.status(400).json({ success: false, message: `Invalid document type. Allowed: ${validTypes.join(', ')}` });
  }

  const student = await BioData.findById(biodataId);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student application not found' });
  }

  const decoded = decodeBase64Payload(fileData, MAX_DOCUMENT_BYTES);
  if (!decoded.ok) {
    return res.status(400).json({ success: false, message: decoded.error });
  }

  const validation = validateUpload({
    fileName,
    buffer: decoded.buffer,
    maxBytes: MAX_DOCUMENT_BYTES,
  });

  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.error });
  }

  try {
    const storageKey = newStorageKey('students', validation.ext);
    await saveBuffer(storageKey, decoded.buffer);

    const docRecord = await StudentDocument.create({
      biodataId: student._id,
      documentType,
      originalName: validation.displayName,
      storageKey,
      mime: validation.mime,
      size: validation.size,
      uploadStatus: 'uploaded',
      verificationStatus: 'pending',
    });

    // Also track document metadata in student.uploadedDocuments & student.documents
    if (!student.uploadedDocuments) student.uploadedDocuments = [];
    student.uploadedDocuments.push({
      documentType: docRecord.documentType,
      originalName: docRecord.originalName,
      storageKey: docRecord.storageKey,
      mime: docRecord.mime,
      size: docRecord.size,
      uploadStatus: 'uploaded',
      uploadedAt: docRecord.createdAt,
      documentId: docRecord._id,
    });

    if (!student.documents.includes(validation.displayName)) {
      student.documents.push(validation.displayName);
    }
    await student.save();

    return res.status(201).json({
      success: true,
      document: {
        id: docRecord._id,
        documentType: docRecord.documentType,
        originalName: docRecord.originalName,
        size: docRecord.size,
        verificationStatus: docRecord.verificationStatus,
        createdAt: docRecord.createdAt,
      },
    });
  } catch (err) {
    console.error('[Upload Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to securely store document' });
  }
}
