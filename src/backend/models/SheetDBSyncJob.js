import mongoose from 'mongoose';

const SheetDBSyncJobSchema = new mongoose.Schema(
    {
        jobId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        recordReferenceId: {
            type: String,
            required: true,
            index: true,
        },
        destinationTab: {
            type: String,
            required: true,
            enum: ['Scholarship_Students', 'Scholarship_Results', 'Scholarship_Feedback'],
            index: true,
        },
        operationType: {
            type: String,
            required: true,
            enum: ['insert', 'update'],
            default: 'insert',
        },
        payloadVersion: {
            type: Number,
            default: 1,
        },
        payload: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'in_progress', 'completed', 'failed', 'requires_review'],
            default: 'pending',
            index: true,
        },
        attemptCount: {
            type: Number,
            default: 0,
        },
        maxAttempts: {
            type: Number,
            default: 5,
        },
        nextRetryTime: {
            type: Date,
            default: Date.now,
            index: true,
        },
        // Worker lease and lock tracking fields
        lockedAt: {
            type: Date,
            default: null,
        },
        lockedBy: {
            type: String,
            default: null,
        },
        leaseExpiresAt: {
            type: Date,
            default: null,
            index: true,
        },
        lastErrorCode: {
            type: String,
            default: null,
        },
        lastErrorMessage: {
            type: String,
            default: null,
        },
        successfulSyncTimestamp: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Compound indexes for efficient worker polling and stale lease sweeps
SheetDBSyncJobSchema.index({ status: 1, nextRetryTime: 1, destinationTab: 1 });
SheetDBSyncJobSchema.index({ status: 1, leaseExpiresAt: 1 });
SheetDBSyncJobSchema.index({ destinationTab: 1, recordReferenceId: 1 });

export default mongoose.models.SheetDBSyncJob || mongoose.model('SheetDBSyncJob', SheetDBSyncJobSchema);
