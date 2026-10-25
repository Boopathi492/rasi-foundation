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
  note: {
    type: String,
    maxlength: [500, 'Note cannot be more than 500 characters'],
  },
  departments: {
    type: [String],
    default: [],
  },
  website: {
    type: String,
    maxlength: [200, 'Website URL cannot be more than 200 characters'],
  },
  type: {
    type: String,
    enum: ['Engineering', 'Arts & Science', 'Medical', 'Polytechnic', 'Law', 'Management', 'Education', 'Other'],
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
CollegeSchema.index({ name: 1, district: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

// Update the updatedAt field before saving
CollegeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.College || mongoose.model('College', CollegeSchema);
