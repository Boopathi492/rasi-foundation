import mongoose from 'mongoose';

const AchievementSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['milestone', 'success_story', 'stat', 'recognition', 'placement', 'spotlight'],
        required: [true, 'Please provide achievement type'],
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
        maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
        type: String,
        maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    year: {
        type: String,
        maxlength: [20, 'Year cannot be more than 20 characters'],
    },
    name: {
        type: String,
        maxlength: [200, 'Name cannot be more than 200 characters'],
    },
    achievement: {
        type: String,
        maxlength: [500, 'Achievement detail cannot be more than 500 characters'],
    },
    quote: {
        type: String,
        maxlength: [1000, 'Quote cannot be more than 1000 characters'],
    },
    image: {
        type: String,
        maxlength: [500, 'Image URL or initials'],
    },
    videoUrl: {
        type: String,
        maxlength: [500, 'YouTube or Vimeo URL'],
    },
    course: {
        type: String,
        maxlength: [100, 'Course cannot be more than 100 characters'],
    },
    value: {
        type: String,
        maxlength: [50, 'Value cannot be more than 50 characters'],
    },
    icon: {
        type: String,
        maxlength: [100, 'Icon identifier'],
    },
    color: {
        type: String,
        default: 'blue',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    reactions: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published',
    },
    journey: [{
        label: String,
        date: String
    }],
    tags: [String],
    isActive: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

AchievementSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Achievement || mongoose.model('Achievement', AchievementSchema);
