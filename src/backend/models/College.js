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
