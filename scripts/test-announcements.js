
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

const announcementSchema = new mongoose.Schema({
    title: String,
    content: String,
    isActive: Boolean,
    expiryDate: Date,
    priority: Number
});

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

async function test() {
    try {
        console.log('Connecting to:', MONGODB_URI);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected!');

        const count = await Announcement.countDocuments();
        console.log('Total announcements:', count);

        const results = await Announcement.find({
            isActive: true,
            $or: [
                { expiryDate: { $exists: false } },
                { expiryDate: { $gt: new Date() } }
            ]
        }).sort({ priority: -1, createdAt: -1 });

        console.log('Filtered announcements:', results.length);
        process.exit(0);
    } catch (err) {
        console.error('ERROR:', err);
        process.exit(1);
    }
}

test();
