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

// Update the updatedAt field before saving
CollegeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.College || mongoose.model('College', CollegeSchema);
