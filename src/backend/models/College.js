import mongoose from 'mongoose';

const CollegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide college name'],
    maxlength: [200, 'Name cannot be more than 200 characters'],
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    maxlength: [100, 'Location cannot be more than 100 characters'],
  },
  district: {
    type: String,
    required: [true, 'Please provide district'],
    maxlength: [100, 'District cannot be more than 100 characters'],
  },
  state: {
    type: String,
    trim: true,
    maxlength: [50, 'State cannot be more than 50 characters'],
    default: 'Tamil Nadu',
  },
  medicalCategory: {
    type: String,
    trim: true,
    maxlength: [100, 'Medical category cannot be more than 100 characters'],
    default: '',
  },
  isWomenCentric: {
    type: Boolean,
    default: false,
  },
  isDeemedUniversity: {
    type: Boolean,
    default: false,
  },
  fees: {
    tuitionFeeGovt: { type: String, default: '' },
    tuitionFeeMgmt: { type: String, default: '' },
    hostelFee: { type: String, default: '' },
    academicYear: { type: String, default: '2026–2027' },
  },
  academicYear: {
    type: String,
    trim: true,
    maxlength: [30, 'Academic year cannot be more than 30 characters'],
    default: '2026–2027',
  },
  // Official Institutional / Admission Code (TNEA, AISHE, DOTE, NMC, DCI, PCI, INC, KEA, UGC, etc.)
  codeType: {
    type: String,
    trim: true,
    maxlength: [50, 'Code type cannot be more than 50 characters'],
    default: '',
  },
  codeValue: {
    type: String,
    trim: true,
    maxlength: [50, 'Code value cannot be more than 50 characters'],
    default: '',
  },
  issuingAuthority: {
    type: String,
    trim: true,
    maxlength: [150, 'Issuing authority cannot be more than 150 characters'],
    default: '',
  },
  codeStatus: {
    type: String,
    enum: ['VERIFIED', 'NOT_AVAILABLE', 'PENDING_VERIFICATION', ''],
    default: '',
  },
  codeExplanation: {
    type: String,
    trim: true,
    maxlength: [500, 'Code explanation cannot be more than 500 characters'],
    default: '',
  },
  verificationDate: {
    type: String,
    trim: true,
    maxlength: [30, 'Verification date cannot be more than 30 characters'],
    default: '2026-11-04',
  },
  tneaCode: {
    type: String,
    maxlength: [20, 'TNEA Code cannot be more than 20 characters'],
  },
  tneaStatus: {
    type: String,
    enum: ['verified', 'not_applicable', 'pending_verification'],
    default: 'not_applicable',
  },
  tneaSourceYear: {
    type: String,
    default: '',
  },
  note: {
    type: String,
    maxlength: [500, 'Note cannot be more than 500 characters'],
  },
  departments: {
    type: [String],
    default: [],
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  specialization: {
    type: String,
    trim: true,
    maxlength: [100, 'Specialization cannot be more than 100 characters'],
    default: '',
  },
  institutionType: {
    type: String,
    trim: true,
    maxlength: [50, 'Institution type cannot be more than 50 characters'],
    default: '',
  },
  sourceUrl: {
    type: String,
    trim: true,
    maxlength: [500, 'Source URL cannot be more than 500 characters'],
    default: '',
  },
  verificationStatus: {
    type: String,
    trim: true,
    maxlength: [50, 'Verification status cannot be more than 50 characters'],
    default: 'directory_listed',
  },
  website: {
    type: String,
    maxlength: [200, 'Website URL cannot be more than 200 characters'],
  },
  type: {
    type: String,
    enum: ['Engineering', 'Arts & Science', 'Medical', 'Polytechnic', 'Law', 'Management', 'Education', 'Agriculture', 'Other'],
    default: 'Engineering',
  },
  // Optional logo kept in private storage; served via /api/colleges/[id]/logo. Absent = default placeholder.
  logo: {
    storageKey: { type: String, default: '' },
    mime: { type: String, default: '' },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

CollegeSchema.index({ isActive: 1, district: 1, order: 1 });
CollegeSchema.index({ type: 1, district: 1 });
CollegeSchema.index({ courses: 1 });
CollegeSchema.index({ tneaCode: 1 });
CollegeSchema.index({ name: 1, district: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

// Update the updatedAt field before saving
CollegeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.College || mongoose.model('College', CollegeSchema);
