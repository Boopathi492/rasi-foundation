const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable inside .env.local');
    process.exit(1);
}

const CollegeSchema = new mongoose.Schema({
    name: String,
    location: String,
    district: String,
    isActive: Boolean,
});

const College = mongoose.models.College || mongoose.model('College', CollegeSchema);

async function checkColleges() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const colleges = await College.find({});
    console.log(`Total colleges in DB: ${colleges.length}`);
    colleges.forEach(c => {
        console.log(`- ${c.name} (${c.district}) - Active: ${c.isActive}`);
    });

    await mongoose.disconnect();
}

checkColleges().catch(err => {
    console.error(err);
    process.exit(1);
});
