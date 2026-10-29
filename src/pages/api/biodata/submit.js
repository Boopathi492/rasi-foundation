import dbConnect from '@/backend/lib/mongodb';
import BioData from '@/backend/models/BioData';
import StudentDocument from '@/backend/models/StudentDocument';
import { appendBioDataRow } from '@/backend/lib/googleSheets';
import { rateLimiter } from '@/backend/lib/rateLimit';
import {
  parseRequestBody,
  validateUpload,
  newStorageKey,
  saveBuffer,
  deleteStored,
  decodeBase64Payload,
  DOC_NAME_TO_TYPE,
  MAX_DOCUMENT_BYTES,
} from '@/backend/lib/uploads';

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
    // Might be JSON stringified array or single string
    try {
      const parsedJson = JSON.parse(fields.documents);
      selectedDocs = Array.isArray(parsedJson) ? parsedJson : [fields.documents.trim()];
    } catch {
      selectedDocs = [fields.documents.trim()];
    }
  }

  // 3. For every checked/selected document, enforce that an attached file exists
  const filesToProcess = [];

  for (const docName of selectedDocs) {
    const docType = DOC_NAME_TO_TYPE[docName] || docName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const fieldKey = `file_${docType}`;

    // Look for file in multipart files map (by fieldKey, by docType, or by docName)
    let fileObj = files[fieldKey] || files[docType] || files[docName];

    // Also check for base64 payload fallback in fields (e.g. fields[`fileData_${docType}`])
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

    // Validate using magic bytes and extension security
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

    filesToProcess.push({
      docName,
      docType,
      fileObj,
      validation,
    });
  }

  // Also include any standalone files passed with valid field keys even if not in documents array
  for (const [key, f] of Object.entries(files)) {
    if (key.startsWith('file_')) {
      const typeKey = key.replace(/^file_/, '');
      if (!filesToProcess.some((p) => p.docType === typeKey) && f && f.buffer && f.buffer.length > 0) {
        const validation = validateUpload({
          fileName: f.originalName || f.filename,
          buffer: f.buffer,
          maxBytes: MAX_DOCUMENT_BYTES,
        });
        if (validation.ok) {
          filesToProcess.push({
            docName: typeKey.replace(/_/g, ' '),
            docType: typeKey,
            fileObj: f,
            validation,
          });
        }
      }
    }
  }

  // 4. Safe file storage with rollback on error
  const storedKeys = [];
  const uploadedDocsMetadata = [];

  try {
    for (const item of filesToProcess) {
      const storageKey = newStorageKey('students', item.validation.ext);
      await saveBuffer(storageKey, item.fileObj.buffer);
      storedKeys.push(storageKey);

      uploadedDocsMetadata.push({
        documentType: item.docType,
        originalName: item.validation.displayName,
        storageKey,
        mime: item.validation.mime,
        size: item.validation.size,
        uploadStatus: 'uploaded',
        uploadedAt: new Date(),
        documentId: null, // populated below after StudentDocument creation
      });
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

    const record = new BioData(bioDataPayload);
    await record.save();

    // 6. Create StudentDocument entries for admin management & linkage
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

    // 7. Fire-and-forget sync to Google Sheets
    appendBioDataRow(record).catch((err) =>
      console.error('Google Sheets sync failed:', err.message)
    );

    return res.status(201).json({
      success: true,
      id: record._id,
      documentsUploaded: uploadedDocsMetadata.length,
    });
  } catch (err) {
    // Rollback all files written to disk to prevent orphaned files
    console.error('[Biodata Submit Error] Cleaning up stored files...', err);
    await Promise.all(
      storedKeys.map((key) =>
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
