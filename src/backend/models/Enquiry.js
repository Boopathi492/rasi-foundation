import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  course: {
    type: String,
    required: [true, 'Please select a course'],
  },
  qualification: {
    type: String,
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot be more than 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    // 'pending' is the stored value for NEW enquiries (legacy compatible; shown as "New" in the UI).
    enum: ['pending', 'contacted', 'follow_up', 'in_progress', 'resolved', 'enrolled', 'closed'],
    default: 'pending',
  },
  source: { type: String, enum: ['website', 'popup', 'counselling', 'manual'], default: 'website' },
  category: { type: String, maxlength: 100, default: '' },
  preferredContact: { type: String, enum: ['', 'phone', 'whatsapp', 'email'], default: '' },
  consent: { type: Boolean, default: false },
  // --- staff workflow (never exposed publicly) ---
  assignedTo: { type: String, maxlength: 100, default: '' },
  followUpDate: { type: Date, default: null },
  internalNotes: [{ text: { type: String, maxlength: 1000 }, by: String, at: { type: Date, default: Date.now }, _id: false }],
  contactAttempts: [{ at: { type: Date, default: Date.now }, by: String, method: { type: String, enum: ['phone', 'whatsapp', 'email', 'in_person'], default: 'phone' }, outcome: { type: String, maxlength: 300, default: '' }, _id: false }],
  resolution: { type: String, maxlength: 1000, default: '' },
  resolvedAt: { type: Date, default: null },
  statusHistory: [{ status: String, by: String, at: { type: Date, default: Date.now }, _id: false }],
}, { timestamps: { createdAt: false, updatedAt: true } });

EnquirySchema.index({ status: 1, createdAt: -1 });
EnquirySchema.index({ assignedTo: 1, followUpDate: 1 });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
