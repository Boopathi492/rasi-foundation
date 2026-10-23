import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please provide content']
    },
    link: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['general', 'scholarship', 'admission', 'urgent'],
        default: 'general'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    showOnHome: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
        default: 0
    },
    expiryDate: {
        type: Date
    }
}, {
    timestamps: true
});

export default mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);
