import mongoose from 'mongoose';

// Collection: report_exports. Tracks who generated which report (no file contents stored).
const ReportExportSchema = new mongoose.Schema(
  {
    reportType: { type: String, required: true, index: true },
    format: { type: String, enum: ['pdf', 'xlsx'], required: true },
    status: { type: String, enum: ['requested', 'processing', 'completed', 'failed'], default: 'requested', index: true },
    filters: { type: mongoose.Schema.Types.Mixed, default: {} },
    rowCount: { type: Number, default: 0 },
    requestedBy: { type: String, default: '' },
    requestedRole: { type: String, default: '' },
    failureReason: { type: String, default: '' }, // safe message only
    durationMs: { type: Number, default: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true, collection: 'report_exports' }
);

export default mongoose.models.ReportExport || mongoose.model('ReportExport', ReportExportSchema);
