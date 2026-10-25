import mongoose from 'mongoose';

// Collection: admin_audit_logs. APPEND-ONLY: update/delete operations are blocked at the model level.
// Only redacted change summaries are stored (see backend/lib/redact.js) - never passwords or full documents.
const AdminAuditLogSchema = new mongoose.Schema(
  {
    actorId: { type: String, default: '', index: true },
    actorName: { type: String, default: '' },
    actorRole: { type: String, default: '' },
    action: { type: String, required: true, index: true }, // e.g. banner.create, feedback.approve, auth.login.failed
    resourceType: { type: String, default: '', index: true },
    resourceId: { type: String, default: '' },
    outcome: { type: String, enum: ['success', 'failure', 'denied'], default: 'success' },
    summary: { type: mongoose.Schema.Types.Mixed, default: {} },
    ip: { type: String, default: '' },
    requestId: { type: String, default: '', index: true },
    createdAt: { type: Date, default: Date.now, immutable: true, index: true },
  },
  { collection: 'admin_audit_logs', versionKey: false }
);

AdminAuditLogSchema.index({ resourceType: 1, resourceId: 1, createdAt: -1 });

const blocked = function (next) {
  next(new Error('Audit logs are append-only and cannot be modified or deleted'));
};
['updateOne', 'updateMany', 'findOneAndUpdate', 'findOneAndReplace', 'replaceOne', 'deleteOne', 'deleteMany', 'findOneAndDelete', 'findOneAndRemove'].forEach((op) => AdminAuditLogSchema.pre(op, blocked));
AdminAuditLogSchema.pre('save', function (next) {
  if (!this.isNew) return next(new Error('Audit logs are append-only and cannot be modified'));
  next();
});

export default mongoose.models.AdminAuditLog || mongoose.model('AdminAuditLog', AdminAuditLogSchema);
