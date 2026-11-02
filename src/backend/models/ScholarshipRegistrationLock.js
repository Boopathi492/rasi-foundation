import mongoose from 'mongoose';

/**
 * Short-lived registration guard (NOT a student profile).
 *
 * SheetDB is not transactional and cannot enforce uniqueness, so concurrent / retried
 * submissions are serialised here. It stores NO personal data:
 *  - `keys`    : keyed hashes (HMAC) of the normalised mobile / email - irreversible without the server secret
 *  - `idemHash`: keyed hash of the client idempotency key
 *  - reference ids that are also written to the SheetDB row
 * Documents expire automatically (TTL), so nothing accumulates in MongoDB.
 */
const ScholarshipRegistrationLockSchema = new mongoose.Schema(
    {
        keys: {
            type: [String],
            required: true,
            validate: [(v) => Array.isArray(v) && v.length > 0, 'At least one identity key is required'],
        },
        idemHash: { type: String, default: null },
        studentReferenceId: { type: String, required: true },
        applicationNumber: { type: String, required: true },
        state: { type: String, enum: ['pending', 'registered'], default: 'pending' },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
    },
    { versionKey: false }
);

// Each identity key may appear in at most one live lock document (multikey unique index).
ScholarshipRegistrationLockSchema.index({ keys: 1 }, { unique: true });
ScholarshipRegistrationLockSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.ScholarshipRegistrationLock
    || mongoose.model('ScholarshipRegistrationLock', ScholarshipRegistrationLockSchema, 'scholarship_registration_locks');
