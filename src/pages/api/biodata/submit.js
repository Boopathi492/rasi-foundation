import dbConnect from '../../../backend/lib/mongodb.js';
import BioData from '../../../backend/models/BioData.js';
import StudentDocument from '../../../backend/models/StudentDocument.js';
import { appendBioDataRow } from '../../../backend/lib/googleSheets.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import {
  parseRequestBody,
  validateUpload,
  newStorageKey,
  saveBuffer,
  readStored,
  deleteStored,
  resolveStoragePath,
  verifyDocumentToken,
  decodeBase64Payload,
  DOC_NAME_TO_TYPE,
  DOC_TYPE_TO_NAME,
  MAX_DOCUMENT_BYTES,
} from '../../../backend/lib/uploads.js';

const limiter = rateLimiter({ windowMs: 60 * 1000, max: 30 });

export const config = {
  api: {
    bodyParser: false,
  },
};

const REQUIRED_FIELDS = [
  'studentName',
  'dateOfBirth',
  'courseApplied',
  'admissionType',
  'collegeName',
  'quota',
  'fatherName',
  'motherName',
  'community',
  'address',
  'studentMobile',
  'studentEmail',
  'aadhaarNumber',
  'fatherMobile',
  'motherMobile',
  'plusTwoGroup',
  'plusTwoExamNumber',
  'expectedCutOff',
  'lastSchoolAndPlace',
];

const ALLOWED_METADATA_FIELDS = [
  ...REQUIRED_FIELDS,
  'subCaste',
  'documents',
  'isGovtSchool',
  'isFirstGraduate',
  'gender',
  'district',
  'whatsappNumber',
  'marks10th',
  'marks12th',
  'groupName',
  'interestedArea',
  'reference',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!limiter(req, res)) {
    return res.status(429).json({ success: false, message: 'Too many submissions. Please slow down.' });
  }

  let parsed;
  try {
    parsed = await parseRequestBody(req);
  } catch (parseErr) {
    return res.status(400).json({ success: false, message: parseErr.message || 'Malformed request payload' });
  }

  const { fields = {}, files = {} } = parsed;

  await dbConnect();

  // 1. Validate required text fields
  for (const field of REQUIRED_FIELDS) {
    const val = fields[field];
    if (!val || (typeof val === 'string' && !val.trim())) {
      return res.status(400).json({ success: false, message: `${field} is required` });
    }
  }

  // 2. Normalize documents selection list
  let selectedDocs = [];
  if (Array.isArray(fields.documents)) {
    selectedDocs = fields.documents.map((d) => String(d).trim()).filter(Boolean);
  } else if (typeof fields.documents === 'string' && fields.documents.trim()) {
    try {
      const parsedJson = JSON.parse(fields.documents);
      selectedDocs = Array.isArray(parsedJson) ? parsedJson : [fields.documents.trim()];
    } catch {
      selectedDocs = [fields.documents.trim()];
    }
  }

  // 3. Normalize pre-uploaded documents metadata (from Vercel-compatible individual upload endpoint)
  let preUploadedDocs = [];
  if (Array.isArray(fields.uploadedDocuments)) {
    preUploadedDocs = fields.uploadedDocuments;
  } else if (typeof fields.uploadedDocuments === 'string' && fields.uploadedDocuments.trim()) {
    try {
      const parsedMeta = JSON.parse(fields.uploadedDocuments);
      preUploadedDocs = Array.isArray(parsedMeta) ? parsedMeta : [];
    } catch {
      preUploadedDocs = [];
    }
  }

  // 4. Verify each selected document has either a valid pre-uploaded entry or attached file
  const newlyStoredKeys = [];
  const uploadedDocsMetadata = [];

  try {
    for (const docName of selectedDocs) {
      const docType = DOC_NAME_TO_TYPE[docName] || docName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      const fieldKey = `file_${docType}`;

      // A: Check if pre-uploaded via dedicated upload endpoint
      const preUploaded = preUploadedDocs.find(
        (d) => d && (d.documentType === docType || d.documentName === docName)
      );

      if (preUploaded && preUploaded.storageKey) {
        // Validate storage key path traversal safety
        try {
          resolveStoragePath(preUploaded.storageKey);
        } catch {
          return res.status(400).json({
            success: false,
            message: `Invalid storage reference for "${docName}".`,
          });
        }

        // Verify cryptographic HMAC token if present
        if (preUploaded.token) {
          const valid = verifyDocumentToken(
            preUploaded.token,
            preUploaded.storageKey,
            preUploaded.documentType,
            preUploaded.size
          );
          if (!valid) {
            return res.status(400).json({
              success: false,
              message: `Security validation failed for uploaded document "${docName}". Please re-upload.`,
            });
          }
        }

        // Verify the file exists on storage
        try {
          await readStored(preUploaded.storageKey);
        } catch {
          return res.status(400).json({
            success: false,
            message: `Document "${docName}" was uploaded but could not be verified on storage. Please re-upload.`,
          });
        }

        uploadedDocsMetadata.push({
          documentType: docType,
          originalName: preUploaded.originalName || `${docType}.pdf`,
          storageKey: preUploaded.storageKey,
          mime: preUploaded.mime || 'application/octet-stream',
          size: preUploaded.size || 0,
          uploadStatus: 'uploaded',
          uploadedAt: new Date(),
          documentId: null,
        });
        continue;
      }

      // B: Check direct multipart file
      let fileObj = files[fieldKey] || files[docType] || files[docName];

      // C: Fallback check for base64 payload in fields
      if (!fileObj && fields[`fileData_${docType}`]) {
        const decoded = decodeBase64Payload(fields[`fileData_${docType}`], MAX_DOCUMENT_BYTES);
        if (!decoded.ok) {
          return res.status(400).json({ success: false, message: `File for "${docName}": ${decoded.error}` });
        }
        fileObj = {
          fieldname: fieldKey,
          filename: fields[`fileName_${docType}`] || `${docType}.pdf`,
          originalName: fields[`fileName_${docType}`] || `${docType}.pdf`,
          buffer: decoded.buffer,
          size: decoded.buffer.length,
          mimeType: 'application/octet-stream',
          truncated: false,
        };
      }

      if (!fileObj || !fileObj.buffer || fileObj.buffer.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Mandatory document "${docName}" was selected but no valid file was uploaded.`,
        });
      }

      if (fileObj.truncated || fileObj.size > MAX_DOCUMENT_BYTES) {
        return res.status(400).json({
          success: false,
          message: `File for "${docName}" exceeds the maximum allowed size of 5 MB.`,
        });
      }

      // Validate magic bytes and format security
      const validation = validateUpload({
        fileName: fileObj.originalName || fileObj.filename,
        buffer: fileObj.buffer,
        maxBytes: MAX_DOCUMENT_BYTES,
      });

      if (!validation.ok) {
        return res.status(400).json({
          success: false,
          message: `Invalid file for "${docName}": ${validation.error}`,
        });
      }

      const storageKey = newStorageKey('students', validation.ext);
      await saveBuffer(storageKey, fileObj.buffer);
      newlyStoredKeys.push(storageKey);

      uploadedDocsMetadata.push({
        documentType: docType,
        originalName: validation.displayName,
        storageKey,
        mime: validation.mime,
        size: validation.size,
        uploadStatus: 'uploaded',
        uploadedAt: new Date(),
        documentId: null,
      });
    }

    // Also include any standalone files passed with valid field keys
    for (const [key, f] of Object.entries(files)) {
      if (key.startsWith('file_')) {
        const typeKey = key.replace(/^file_/, '');
        if (!uploadedDocsMetadata.some((p) => p.documentType === typeKey) && f && f.buffer && f.buffer.length > 0) {
          const validation = validateUpload({
            fileName: f.originalName || f.filename,
            buffer: f.buffer,
            maxBytes: MAX_DOCUMENT_BYTES,
          });
          if (validation.ok) {
            const storageKey = newStorageKey('students', validation.ext);
            await saveBuffer(storageKey, f.buffer);
            newlyStoredKeys.push(storageKey);

            uploadedDocsMetadata.push({
              documentType: typeKey,
              originalName: validation.displayName,
              storageKey,
              mime: validation.mime,
              size: validation.size,
              uploadStatus: 'uploaded',
              uploadedAt: new Date(),
              documentId: null,
            });
          }
        }
      }
    }

    // 5. Construct BioData payload
    const bioDataPayload = {};
    for (const key of ALLOWED_METADATA_FIELDS) {
      if (key in fields) {
        bioDataPayload[key] = fields[key];
      }
    }

    bioDataPayload.documents = selectedDocs;
    bioDataPayload.uploadedDocuments = uploadedDocsMetadata;
    bioDataPayload.isGovtSchool = fields.isGovtSchool === 'yes' || fields.isGovtSchool === true || fields.isGovtSchool === 'true';
    bioDataPayload.isFirstGraduate = fields.isFirstGraduate === 'yes' || fields.isFirstGraduate === true || fields.isFirstGraduate === 'true';

    // Format numbers
    if (bioDataPayload.aadhaarNumber) {
      bioDataPayload.aadhaarNumber = String(bioDataPayload.aadhaarNumber).replace(/[\s-]/g, '');
    }
    if (bioDataPayload.studentMobile) {
      bioDataPayload.studentMobile = String(bioDataPayload.studentMobile).replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    }
    if (bioDataPayload.fatherMobile) {
      bioDataPayload.fatherMobile = String(bioDataPayload.fatherMobile).replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    }
    if (bioDataPayload.motherMobile) {
      bioDataPayload.motherMobile = String(bioDataPayload.motherMobile).replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    }

    // 6. Idempotency Guard: Avoid creating duplicate BioData records on network retries
    // If an unpaid application with the exact same Aadhaar and student mobile was created recently (< 15 mins), update it
    let record = null;
    let isUpdate = false;

    if (bioDataPayload.aadhaarNumber && bioDataPayload.studentMobile) {
      const recentThreshold = new Date(Date.now() - 15 * 60 * 1000);
      const existingUnpaid = await BioData.findOne({
        aadhaarNumber: bioDataPayload.aadhaarNumber,
        studentMobile: bioDataPayload.studentMobile,
        isPaid: false,
        createdAt: { $gte: recentThreshold },
      }).sort({ createdAt: -1 });

      if (existingUnpaid) {
        record = existingUnpaid;
        isUpdate = true;
        Object.assign(record, bioDataPayload);
      }
    }

    if (!record) {
      record = new BioData(bioDataPayload);
    }

    await record.save();

    // 7. Create or update StudentDocument entries for admin management & linkage
    if (isUpdate) {
      await StudentDocument.deleteMany({ biodataId: record._id }).catch(() => {});
    }

    for (let i = 0; i < uploadedDocsMetadata.length; i++) {
      const meta = uploadedDocsMetadata[i];
      const docRecord = await StudentDocument.create({
        biodataId: record._id,
        documentType: meta.documentType,
        originalName: meta.originalName,
        storageKey: meta.storageKey,
        mime: meta.mime,
        size: meta.size,
        uploadStatus: 'uploaded',
        verificationStatus: 'pending',
      });
      record.uploadedDocuments[i].documentId = docRecord._id;
    }
    await record.save();

    // 8. Fire-and-forget sync to Google Sheets
    appendBioDataRow(record).catch((err) =>
      console.error('Google Sheets sync failed:', err.message)
    );

    return res.status(isUpdate ? 200 : 201).json({
      success: true,
      id: record._id,
      documentsUploaded: uploadedDocsMetadata.length,
      updated: isUpdate,
    });
  } catch (err) {
    // Rollback any newly stored files written to disk during this request
    console.error('[Biodata Submit Error] Cleaning up stored files...', err);
    await Promise.all(
      newlyStoredKeys.map((key) =>
        deleteStored(key).catch((delErr) =>
          console.error(`[Orphan Cleanup Warning] Could not delete key ${key}:`, delErr.message)
        )
      )
    );

    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to process application. Please try again.',
    });
  }
}
