import mongoose from 'mongoose';

// Collection: admin_users. Passwords are stored ONLY as scrypt hashes (see backend/lib/password.js).
// The legacy single administrator configured via ADMIN_USERNAME / ADMIN_PASSWORD env vars keeps working
// (as super_admin) and does not need a document here.
const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3, maxlength: 60 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254, default: '' },
    displayName: { type: String, trim: true, maxlength: 100, default: '' },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['super_admin', 'admin', 'counsellor', 'exam_manager'], required: true, default: 'admin' },
    isActive: { type: Boolean, default: true },
    failedLoginCount: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    createdBy: { type: String, default: 'setup' },
  },
  { timestamps: true, collection: 'admin_users' }
);

export default mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
