import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  // Razorpay fields
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    default: null
  },
  razorpaySignature: {
    type: String,
    default: null
  },

  // Payment details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },

  // Customer details
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },

  // Additional info
  purpose: {
    type: String,
    enum: ['counseling', 'admission', 'scholarship_test', 'course_fee', 'donation', 'other'],
    required: true
  },
  studentName: {
    type: String,
    default: null
  },
  notes: {
    type: String,
    default: null
  },

  // Status
  status: {
    type: String,
    enum: ['created', 'pending', 'completed', 'failed', 'refunded'],
    default: 'created'
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

// Pre-save hook to set completedAt
PaymentSchema.pre('save', function (next) {
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
