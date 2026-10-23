import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
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
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    maxlength: [200, 'Subject cannot be more than 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    maxlength: [2000, 'Message cannot be more than 2000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new',
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
