import mongoose from 'mongoose';

// Collection: courses. Related colleges are referenced by id; the pair (name, level) must be unique so
// courses cannot be duplicated.
const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 150 },
    code: { type: String, trim: true, uppercase: true, maxlength: 20, default: '' },
    level: { type: String, enum: ['Diploma', 'UG', 'PG', 'Doctorate', 'Certificate', 'Other'], default: 'UG' },
    category: { type: String, trim: true, maxlength: 100, default: '' }, // department / stream
    description: { type: String, trim: true, maxlength: 1500, default: '' },
    eligibility: { type: String, trim: true, maxlength: 600, default: '' },
    duration: { type: String, trim: true, maxlength: 40, default: '' },
    colleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
    isActive: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'courses' }
);

CourseSchema.index({ name: 1, level: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
