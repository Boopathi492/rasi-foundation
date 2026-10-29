import mongoose from 'mongoose';

const WebhookEventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true },
    event: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PaymentSchema = new mongoose.Schema({
  // Unique internal receipt reference (e.g. RCPT_1730000000_A1B2)
  receipt: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },

  // Razorpay Gateway Identifiers
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  razorpayPaymentId: {
    type: String,
    default: null,
    trim: true,
  },
  razorpaySignature: {
    type: String,
    default: null,
  },

  // Payment amounts (Rupees and Integer Paise for precision)
  amount: {
    type: Number,
    required: true,
    min: [1, 'Amount must be at least ₹1'],
  },
  amountPaise: {
    type: Number,
    default: function () {
      return Math.round((this.amount || 0) * 100);
    },
  },
  currency: {
    type: String,
    default: 'INR',
    uppercase: true,
  },

  // Customer details
  name: {
    type: String,
    required: [true, 'Payer name is required'],
    trim: true,
    maxlength: 150,
  },
  email: {
    type: String,
    required: [true, 'Payer email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Valid email required'],
  },
  phone: {
    type: String,
    required: [true, 'Payer phone is required'],
    trim: true,
    maxlength: 20,
  },

  // Purpose & Application References
  purpose: {
    type: String,
    enum: ['counseling', 'admission', 'scholarship_test', 'course_fee', 'donation', 'other'],
    required: true,
  },
  studentName: {
    type: String,
    default: null,
    trim: true,
    maxlength: 150,
  },
  notes: {
    type: String,
    default: null,
    maxlength: 1000,
  },
  bioDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BioData',
    default: null,
  },

  // Payment Rail & Method Metadata
  paymentMethod: {
    type: String,
    default: null, // 'upi', 'card', 'netbanking', 'wallet', 'emi'
  },
  bank: {
    type: String,
    default: null,
  },
  vpa: {
    type: String,
    default: null,
  },

  // Error Details (if payment fails)
  errorCode: {
    type: String,
    default: null,
  },
  errorDescription: {
    type: String,
    default: null,
  },

  // Lifecycle Status
  status: {
    type: String,
    enum: ['created', 'pending', 'completed', 'failed', 'refunded'],
    default: 'created',
  },

  // Refund Tracking
  refundStatus: {
    type: String,
    enum: ['none', 'partial', 'full'],
    default: 'none',
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundId: {
    type: String,
    default: null,
  },
  refundedAt: {
    type: Date,
    default: null,
  },

  // Webhook Event Audit Log (for duplicate event deduplication)
  webhookEvents: {
    type: [WebhookEventSchema],
    default: [],
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  failedAt: {
    type: Date,
    default: null,
  },
});

// Indexes for high performance querying and integrity
PaymentSchema.index({ status: 1, createdAt: -1 });
PaymentSchema.index({ bioDataId: 1 });
PaymentSchema.index({ email: 1 });
PaymentSchema.index({ phone: 1 });
PaymentSchema.index({ 'webhookEvents.eventId': 1 });

// Pre-save lifecycle hooks
PaymentSchema.pre('save', function (next) {
  this.updatedAt = new Date();

  if (this.amount && !this.amountPaise) {
    this.amountPaise = Math.round(this.amount * 100);
  }

  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }

  if (this.status === 'failed' && !this.failedAt) {
    this.failedAt = new Date();
  }

  next();
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
