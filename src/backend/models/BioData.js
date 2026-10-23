import mongoose from 'mongoose';

const BioDataSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  courseApplied: { type: String, required: true },
  admissionType: { type: String, enum: ['UG', 'PG', 'Lateral Entry'], required: true },
  collegeName: { type: String, required: true },
  quota: { type: String, enum: ['GQ', 'MQ'], required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  community: { type: String, required: true },
  subCaste: { type: String, default: '' },
  address: { type: String, required: true },
  studentMobile: { type: String, required: true },
  studentEmail: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  fatherMobile: { type: String, required: true },
  motherMobile: { type: String, required: true },
  plusTwoGroup: { type: String, required: true },
  plusTwoExamNumber: { type: String, required: true },
  expectedCutOff: { type: String, required: true },
  lastSchoolAndPlace: { type: String, required: true },
  isGovtSchool: { type: Boolean, required: true },
  isFirstGraduate: { type: Boolean, required: true },
  documents: [{ type: String }],
  status: { type: String, enum: ['pending', 'reviewed', 'contacted'], default: 'pending' },
  adminNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.BioData || mongoose.model('BioData', BioDataSchema);
