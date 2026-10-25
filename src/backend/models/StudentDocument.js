import mongoose from 'mongoose';

// Collection: student_documents. Metadata only - file bytes live in private storage and are addressed by
// storageKey (relative key, never an absolute path). Access is always through an authorised API route.
const StudentDocumentSchema = new mongoose.Schema(
  {
    biodataId: { type: mongoose.Schema.Types.ObjectId, ref: 'BioData', required: true, index: true },
    documentType: { type: String, enum: ['photo', 'aadhaar', 'marksheet_10', 'marksheet_12', 'community_certificate', 'other'], required: true },
    originalName: { type: String, trim: true, maxlength: 120, default: 'file' },
    storageKey: { type: String, required: true, unique: true },
    mime: { type: String, required: true },
    size: { type: Number, required: true, min: 1 },
    uploadStatus: { type: String, enum: ['uploaded', 'removed'], default: 'uploaded' },
    verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending', index: true },
    verifiedBy: { type: String, default: '' },
    verifiedAt: { type: Date, default: null },
    rejectionReason: { type: String, trim: true, maxlength: 300, default: '' },
  },
  { timestamps: true, collection: 'student_documents' }
);

StudentDocumentSchema.index({ biodataId: 1, documentType: 1 });

export default mongoose.models.StudentDocument || mongoose.model('StudentDocument', StudentDocumentSchema);
