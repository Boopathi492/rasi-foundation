const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

const CollegeSchema = new mongoose.Schema({
    name: String,
    district: String,
});

const College = mongoose.models.College || mongoose.model('College', CollegeSchema);

async function migrate() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const result = await College.updateMany(
        { district: 'Bengaluru Colleges' },
        { $set: { district: 'Bengaluru Zone' } }
    );

    console.log(`Updated ${result.modifiedCount} colleges from 'Bengaluru Colleges' to 'Bengaluru Zone'`);

    await mongoose.disconnect();
}

migrate().catch(err => {
    console.error(err);
    process.exit(1);
});
