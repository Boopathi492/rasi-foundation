import mongoose from 'mongoose';

const SiteSettingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteSetting ||
  mongoose.model('SiteSetting', SiteSettingSchema);
