import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['student', 'parent'],
    required: [true, 'Please select a feedback category'],
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  relatedCourse: {
    type: String,
    maxlength: [150, 'Course cannot exceed 150 characters'],
    trim: true,
    default: '',
  },
  relation: {
    type: String,
    maxlength: [100, 'Relationship cannot exceed 100 characters'],
    trim: true,
    default: '',
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating between 1 and 5'],
    min: [1, 'Minimum rating is 1'],
    max: [5, 'Maximum rating is 5'],
  },
  message: {
    type: String,
    required: [true, 'Please provide your feedback message'],
    maxlength: [1000, 'Feedback cannot exceed 1000 characters'],
    trim: true,
  },
  consent: {
    type: Boolean,
    required: [true, 'Consent is required to submit feedback'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'archived'],
    default: 'pending',
  },
  // --- moderation (private: never returned by public APIs) ---
  moderationNotes: { type: String, maxlength: 500, default: '' },
  moderatedBy: { type: String, default: '' },
  moderatedAt: { type: Date, default: null },
  displayOrder: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FeedbackSchema.index({ status: 1, displayOrder: 1, createdAt: -1 });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
