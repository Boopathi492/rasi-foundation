import mongoose from 'mongoose';

// Collection: banners. Images live in private upload storage (storage keys only); the public site reads
// them through /api/banners/[id]/image. Visibility = isActive && !archived && within [startsAt, endsAt] && placement match.
const ImageRef = new mongoose.Schema(
  { storageKey: { type: String, default: '' }, mime: { type: String, default: '' }, width: Number, height: Number, size: Number },
  { _id: false }
);

export const BANNER_PLACEMENTS = ['home_hero', 'home_secondary', 'about', 'courses', 'colleges', 'scholarship', 'achievements', 'announcements', 'contact', 'feedback', 'global'];

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 300, default: '' },
    altText: { type: String, trim: true, maxlength: 160, default: '' },
    desktopImage: { type: ImageRef, default: () => ({}) },
    mobileImage: { type: ImageRef, default: () => ({}) },
    ctaText: { type: String, trim: true, maxlength: 40, default: '' },
    ctaUrl: { type: String, trim: true, maxlength: 300, default: '' },
    placement: { type: String, enum: BANNER_PLACEMENTS, required: true, default: 'home_hero' },
    targetPages: { type: [String], default: [] }, // optional extra path allowlist, e.g. ['/', '/courses']
    audience: { type: String, enum: ['all', 'students', 'parents'], default: 'all' },
    order: { type: Number, default: 0 },
    transitionMs: { type: Number, min: 800, max: 15000, default: 5000 },
    isActive: { type: Boolean, default: true },
    archived: { type: Boolean, default: false },
    startsAt: { type: Date, default: null },
    endsAt: { type: Date, default: null },
    createdBy: { type: String, default: '' },
    updatedBy: { type: String, default: '' },
  },
  { timestamps: true, collection: 'banners' }
);

BannerSchema.index({ placement: 1, isActive: 1, archived: 1, startsAt: 1, endsAt: 1, order: 1 });

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
