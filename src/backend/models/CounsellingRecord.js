import mongoose from 'mongoose';

// Collection: counselling_records. The notes and recommendations fields are confidential: returned only to roles with
// counselling:view and never written to general logs or public APIs.
const CounsellingRecordSchema = new mongoose.Schema(
  {
    studentRef: {
      kind: { type: String, enum: ['biodata', 'scholarship', 'enquiry', 'manual'], default: 'manual' },
      id: { type: mongoose.Schema.Types.ObjectId, default: null },
    },
    studentName: { type: String, required: true, trim: true, maxlength: 100 },
    studentPhone: { type: String, trim: true, maxlength: 20, default: '' },
    scheduledAt: { type: Date, required: true, index: true },
    counsellor: { type: String, trim: true, maxlength: 100, default: '', index: true },
    type: { type: String, enum: ['in_person', 'phone', 'video', 'walk_in'], default: 'in_person' },
    preferredCollege: { type: String, trim: true, maxlength: 200, default: '' },
    interestedCourse: { type: String, trim: true, maxlength: 150, default: '' },
    careerInterests: { type: String, trim: true, maxlength: 500, default: '' },
    notes: { type: String, trim: true, maxlength: 4000, default: '' },
    recommendations: { type: String, trim: true, maxlength: 2000, default: '' },
    followUpDate: { type: Date, default: null, index: true },
    followUpStatus: { type: String, enum: ['none', 'pending', 'done'], default: 'none' },
    outcome: { type: String, trim: true, maxlength: 500, default: '' },
    nextSteps: { type: String, trim: true, maxlength: 1000, default: '' },
    status: { type: String, enum: ['scheduled', 'completed', 'follow_up_required', 'cancelled'], default: 'scheduled', index: true },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
  },
  { timestamps: true, collection: 'counselling_records' }
);

CounsellingRecordSchema.index({ 'studentRef.kind': 1, 'studentRef.id': 1, scheduledAt: -1 });

export default mongoose.models.CounsellingRecord || mongoose.model('CounsellingRecord', CounsellingRecordSchema);
