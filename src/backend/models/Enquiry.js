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
    enum: ['pending', 'contacted', 'enrolled', 'closed'],
    default: 'pending',
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
