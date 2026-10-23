import mongoose from 'mongoose';

const PaymentSettingSchema = new mongoose.Schema({
  purpose: {
    type: String,
    enum: ['counseling', 'admission', 'scholarship_test', 'course_fee', 'donation', 'other'],
    required: true,
    unique: true,
  },
  label: { type: String, required: true },
  amount: { type: Number, default: 0 },
  isFixed: { type: Boolean, default: false }, // true = user cannot change the amount
  isEnabled: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
});

PaymentSettingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.PaymentSetting ||
  mongoose.model('PaymentSetting', PaymentSettingSchema);
