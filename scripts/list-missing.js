// Script to list colleges without departments
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://rasifoundationadmission_db_user:LN3JnRfZMzhLCwJc@cluster1.n12u8v2.mongodb.net/rasi-foundation?retryWrites=true&w=majority&appName=Cluster1';

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
