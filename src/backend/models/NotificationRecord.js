import mongoose from 'mongoose';

// Collection: notification_records. Dedupe by (type, refId) so re-running a generator never duplicates items.
const NotificationRecordSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ['enquiry', 'registration', 'feedback', 'followup', 'document', 'report_failure', 'error', 'scholarship'], index: true },
    title: { type: String, required: true, maxlength: 160 },
    body: { type: String, default: '', maxlength: 300 },
    link: { type: String, default: '' },
    refId: { type: String, default: '' },
    severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    audienceRoles: { type: [String], default: [] }, // empty = all roles that can see the dashboard
    readBy: { type: [String], default: [] }, // admin ids who have read it
    expiresAt: { type: Date, default: () => new Date(Date.now() + 60 * 24 * 3600 * 1000) },
  },
  { timestamps: true, collection: 'notification_records' }
);

NotificationRecordSchema.index({ type: 1, refId: 1 }, { unique: true, partialFilterExpression: { refId: { $gt: '' } } });
NotificationRecordSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
NotificationRecordSchema.index({ createdAt: -1 });

export default mongoose.models.NotificationRecord || mongoose.model('NotificationRecord', NotificationRecordSchema);
