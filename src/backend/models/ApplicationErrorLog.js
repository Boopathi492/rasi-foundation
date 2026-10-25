import mongoose from 'mongoose';

// Collection: application_error_logs. Bounded: documents expire automatically (TTL on expiresAt).
// Repeated identical errors are de-duplicated via the fingerprint field (occurrences++ / lastSeenAt) to avoid log floods.
const ApplicationErrorLogSchema = new mongoose.Schema(
  {
    fingerprint: { type: String, required: true, index: true },
    severity: { type: String, enum: ['info', 'warning', 'error', 'critical'], default: 'error', index: true },
    category: { type: String, default: 'server' }, // server | validation | auth | database | storage | export | external
    module: { type: String, default: 'general', index: true },
    message: { type: String, default: '' },
    stack: { type: String, default: '' }, // only returned to authorised admins
    method: { type: String, default: '' },
    path: { type: String, default: '' }, // sanitised, no query string
    status: { type: Number, default: 500 },
    requestId: { type: String, default: '', index: true },
    environment: { type: String, default: '' },
    durationMs: { type: Number, default: 0 },
    occurrences: { type: Number, default: 1 },
    firstSeenAt: { type: Date, default: Date.now },
    lastSeenAt: { type: Date, default: Date.now, index: true },
    resolved: { type: Boolean, default: false, index: true },
    resolvedBy: { type: String, default: '' },
    resolvedAt: { type: Date, default: null },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 90 * 24 * 3600 * 1000) },
  },
  { collection: 'application_error_logs', versionKey: false }
);

ApplicationErrorLogSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
ApplicationErrorLogSchema.index({ module: 1, lastSeenAt: -1 });

export default mongoose.models.ApplicationErrorLog || mongoose.model('ApplicationErrorLog', ApplicationErrorLogSchema);
