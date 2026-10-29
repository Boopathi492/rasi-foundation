import dbConnect from '../../../backend/lib/mongodb.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import { isObjectId } from '../../../backend/lib/validators.js';
import {
  parseRequestBody,
  decodeBase64Payload,
  validateUpload,
  newStorageKey,
  saveBuffer,
  deleteStored,
  signDocumentToken,
  DOC_NAME_TO_TYPE,
  MAX_DOCUMENT_BYTES,
} from '../../../backend/lib/uploads.js';
import BioData from '../../../backend/models/BioData.js';
import StudentDocument from '../../../backend/models/StudentDocument.js';

const limiter = rateLimiter({ windowMs: 60 * 1000, max: 30 });

export const config = {
  api: {
    bodyParser: false,
  },
};

const VALID_TYPES = [
  'photo',
  'aadhaar',
  'marksheet_10',
  'marksheet_12',
  'community_certificate',
  'transfer_certificate',
  'first_graduate',
  'other',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!limiter(req, res)) {
    return res.status(429).json({ success: false, message: 'Too many upload attempts. Please wait.' });
  }

  let parsed;
  try {
    parsed = await parseRequestBody(req);
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: parseErr.message || 'Malformed upload payload' });
  }

  const { fields = {}, files = {} } = parsed;

  // Resolve document type
  let documentType = fields.documentType || '';
  if (!documentType && fields.documentName && DOC_NAME_TO_TYPE[fields.documentName]) {
    documentType = DOC_NAME_TO_TYPE[fields.documentName];
  }
  if (!documentType) {
    // Check if a file key reveals the document type (e.g. file_marksheet_10)
    for (const key of Object.keys(files)) {
      if (key.startsWith('file_')) {
        const inferred = key.replace(/^file_/, '');
        if (VALID_TYPES.includes(inferred)) {
          documentType = inferred;
          break;
        }
      }
    }
  }

  if (!documentType || !VALID_TYPES.includes(documentType)) {
    return res.status(400).json({
      success: false,
      message: `Invalid or missing document type. Allowed: ${VALID_TYPES.join(', ')}`,
    });
  }

  // Extract file buffer and filename from multipart files or base64 payload
  let buffer = null;
  let fileName = fields.fileName || '';

  // 1. Look for uploaded file in multipart files map
  const fileKey = Object.keys(files).find(
    (k) => k === 'file' || k === 'document' || k === `file_${documentType}` || k === documentType
  ) || Object.keys(files)[0];

  const fileObj = fileKey ? files[fileKey] : null;

  if (fileObj && fileObj.buffer && fileObj.buffer.length > 0) {
    if (fileObj.truncated || fileObj.size > MAX_DOCUMENT_BYTES) {
      return res.status(413).json({
        success: false,
        message: 'File exceeds the maximum allowed size of 5 MB.',
      });
    }
    buffer = fileObj.buffer;
    fileName = fileObj.originalName || fileObj.filename || fileName;
  } else if (fields.fileData) {
    // 2. Fallback for base64 JSON upload
    const decoded = decodeBase64Payload(fields.fileData, MAX_DOCUMENT_BYTES);
    if (!decoded.ok) {
      return res.status(400).json({ success: false, message: decoded.error });
    }
    buffer = decoded.buffer;
  }

  if (!buffer || buffer.length === 0) {
    return res.status(400).json({ success: false, message: 'No valid file was uploaded' });
  }

  // Magic bytes and security validation
  const validation = validateUpload({
    fileName,
    buffer,
    maxBytes: MAX_DOCUMENT_BYTES,
  });

  if (!validation.ok) {
    return res.status(400).json({ success: false, message: validation.error });
  }

  let storageKey = null;
  try {
    storageKey = newStorageKey('students', validation.ext);
    await saveBuffer(storageKey, buffer);

    const { biodataId } = fields;

    // Case A: Post-submission document upload linked to an existing BioData record
    if (biodataId) {
      if (!isObjectId(biodataId)) {
        await deleteStored(storageKey).catch(() => {});
        return res.status(400).json({ success: false, message: 'A valid student BioData ID is required' });
      }

      await dbConnect();
      const student = await BioData.findById(biodataId);
      if (!student) {
        await deleteStored(storageKey).catch(() => {});
        return res.status(404).json({ success: false, message: 'Student application not found' });
      }

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
        staged: false,
        document: {
          id: docRecord._id,
          documentType: docRecord.documentType,
          originalName: docRecord.originalName,
          size: docRecord.size,
          verificationStatus: docRecord.verificationStatus,
          createdAt: docRecord.createdAt,
        },
      });
    }

    // Case B: Pre-submission staged document upload (prior to final BioData creation)
    const token = signDocumentToken(storageKey, documentType, validation.size);

    return res.status(200).json({
      success: true,
      staged: true,
      document: {
        documentType,
        originalName: validation.displayName,
        storageKey,
        mime: validation.mime,
        size: validation.size,
        token,
        uploadStatus: 'uploaded',
      },
    });
  } catch (err) {
    if (storageKey) {
      await deleteStored(storageKey).catch(() => {});
    }
    console.error('[Upload Error]', err);
    return res.status(500).json({ success: false, message: 'Failed to securely store document' });
  }
}
