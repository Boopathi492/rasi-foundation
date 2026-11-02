// Script to list colleges without departments
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env.local' });
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('Error: MONGODB_URI environment variable is required.'); process.exit(1); }

async function listMissingColleges() {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const College = mongoose.model('College', new mongoose.Schema({
        name: String,
        departments: [String],
        district: String
    }));

    const allColleges = await College.find({}).select('name departments district').lean();
    const withoutDepts = allColleges.filter(c => !c.departments || c.departments.length === 0);

    console.log('\n=== Colleges missing courses (' + withoutDepts.length + ') ===\n');
    withoutDepts.forEach((c, i) => console.log((i + 1) + '. ' + c.name + ' (' + c.district + ')'));

    await mongoose.disconnect();
}

listMissingColleges();
