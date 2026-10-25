import mongoose from 'mongoose';

const BioDataSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    dateOfBirth: { type: String, default: '' },
    gender: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
    educationQualification: { type: String, default: '' },
    admissionType: { type: String, enum: ['UG', 'PG', 'Lateral Entry', ''], default: 'UG' },
    courseApplied: { type: String, default: '' },
    collegeName: { type: String, default: '' },
    quota: { type: String, enum: ['GQ', 'MQ', ''], default: 'GQ' },

    fatherName: { type: String, required: true, trim: true },
    motherName: { type: String, default: '' },
    community: { type: String, default: 'BC' },
    subCaste: { type: String, default: '' },
    address: { type: String, default: '' },
    district: { type: String, default: '' },

    studentMobile: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, default: '', trim: true },
    studentEmail: { type: String, required: true, trim: true, lowercase: true },
    fatherMobile: { type: String, default: '', trim: true },
    motherMobile: { type: String, default: '', trim: true },

    aadhaarNumber: { type: String, required: true, trim: true },

    plusTwoGroup: { type: String, default: '' },
    groupName: { type: String, default: '' },
    plusTwoExamNumber: { type: String, default: '' },
    expectedCutOff: { type: String, default: '' },
    marks10th: { type: String, default: '' },
    marks12th: { type: String, default: '' },
    lastSchoolAndPlace: { type: String, default: '' },
    isGovtSchool: { type: Boolean, default: false },
    isFirstGraduate: { type: Boolean, default: false },

    interestedArea: { type: String, default: '' },
    reference: { type: String, default: '' },

    documents: [{ type: String }],
    status: { type: String, enum: ['pending', 'reviewed', 'contacted'], default: 'pending', index: true },
    adminNotes: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { collection: 'biodatas', timestamps: true }
);

BioDataSchema.index({ studentEmail: 1 });
BioDataSchema.index({ studentMobile: 1 });
BioDataSchema.index({ createdAt: -1 });

export default mongoose.models.BioData || mongoose.model('BioData', BioDataSchema);
