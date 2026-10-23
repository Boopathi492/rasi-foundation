import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
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
  },
  category: {
    type: String,
    enum: ['medical', 'engineering', 'management', 'law', 'arts', 'other'],
    default: 'other',
  },
  question: {
    type: String,
    required: [true, 'Please provide your question'],
    maxlength: [2000, 'Question cannot be more than 2000 characters'],
  },
  answer: {
    type: String,
    default: '',
  },
  isAnswered: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  answeredAt: {
    type: Date,
  },
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
