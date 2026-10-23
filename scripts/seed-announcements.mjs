import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define MONGODB_URI in .env.local');
    process.exit(1);
}

// Announcement Schema
const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    link: { type: String, trim: true },
    type: { type: String, enum: ['general', 'scholarship', 'admission', 'urgent'], default: 'general' },
    isActive: { type: Boolean, default: true },
    showOnHome: { type: Boolean, default: true },
    priority: { type: Number, default: 0 },
    expiryDate: { type: Date },
}, { timestamps: true });

const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);

// Current Examination Announcements (February 2026)
const announcements = [
    {
        title: '🚨 NEET UG 2026 – Registration Open',
        content: 'NTA has opened the registration for NEET UG 2026. The exam is expected to be held in May 2026. Students who wish to pursue MBBS, BDS, BAMS, BHMS, and other medical courses must register before the deadline. Contact Rasi Foundation for complete guidance on application, preparation tips, and college selection.',
        type: 'urgent',
        link: 'https://neet.nta.nic.in/',
        isActive: true,
        showOnHome: true,
        priority: 10,
        expiryDate: new Date('2026-05-31'),
    },
    {
        title: '📝 JEE Main 2026 – Session 2 Registration',
        content: 'JEE Main 2026 Session 2 registration is now open. Session 2 exam is scheduled for April 2026. This is a crucial exam for BTech/BE admissions across NITs, IIITs, and other centrally funded institutions. Get expert counselling from Rasi Foundation for rank analysis and college prediction.',
        type: 'admission',
        link: 'https://jeemain.nta.ac.in/',
        isActive: true,
        showOnHome: true,
        priority: 9,
        expiryDate: new Date('2026-04-30'),
    },
    {
        title: '🎓 TNEA 2026 – Tamil Nadu Engineering Admissions',
        content: 'TNEA 2026 online counselling for Engineering admissions in Tamil Nadu will begin after +2 results. Students who appeared for TN HSC 2026 are eligible. Rasi Foundation provides complete TNEA counselling support including college selection, branch guidance, and seat allotment assistance.',
        type: 'admission',
        isActive: true,
        showOnHome: true,
        priority: 8,
        expiryDate: new Date('2026-09-30'),
    },
    {
        title: '📋 TN HSC (12th) Board Exams 2026 – March/April',
        content: 'Tamil Nadu HSC Board Examinations 2026 are scheduled to begin in March 2026. All +2 students should focus on final preparation. Your +2 marks are crucial for TNEA engineering counselling cutoff. Best wishes from Rasi Foundation to all students!',
        type: 'general',
        isActive: true,
        showOnHome: true,
        priority: 7,
        expiryDate: new Date('2026-04-30'),
    },
    {
        title: '🏥 NEET PG 2026 – Registration Updates',
        content: 'NEET PG 2026 exam notification is expected soon from NBEMS. Medical graduates pursuing MD/MS/Diploma courses should stay updated. Rasi Foundation can guide you through the entire process from registration to admission.',
        type: 'admission',
        link: 'https://natboard.edu.in/',
        isActive: true,
        showOnHome: true,
        priority: 6,
        expiryDate: new Date('2026-08-31'),
    },
    {
        title: '💰 TN Government Scholarship 2026 – Apply Now',
        content: 'Tamil Nadu Government scholarships for BC/MBC/SC/ST students are open for the academic year 2026-27. Eligible students can apply through the official portal. Rasi Foundation assists with documentation and application process. Don\'t miss the deadline!',
        type: 'scholarship',
        isActive: true,
        showOnHome: true,
        priority: 7,
        expiryDate: new Date('2026-06-30'),
    },
    {
        title: '🎯 COMEDK UGET 2026 – Karnataka Engineering Entrance',
        content: 'COMEDK UGET 2026 registration for engineering admissions in Karnataka private colleges is expected to open soon. This is an important exam for students looking at top colleges in Bengaluru. Contact Rasi Foundation for guidance on Bengaluru college admissions.',
        type: 'admission',
        isActive: true,
        showOnHome: true,
        priority: 5,
        expiryDate: new Date('2026-07-31'),
    },
    {
        title: '📚 JEE Advanced 2026 – For IIT Admissions',
        content: 'JEE Advanced 2026 for IIT admissions will be conducted after JEE Main results. Only top 2,50,000 JEE Main qualifiers are eligible. Exam is expected in June 2026. Rasi Foundation provides comprehensive guidance for IIT aspirants.',
        type: 'general',
        link: 'https://jeeadv.ac.in/',
        isActive: true,
        showOnHome: true,
        priority: 5,
        expiryDate: new Date('2026-07-31'),
    },
    {
        title: '🏫 Management Quota Admissions 2026 – Open',
        content: 'Management quota admissions for Engineering and Medical colleges are now open for the 2026-27 academic year. Rasi Foundation has direct tie-ups with well-connected universities for hassle-free admission. Contact us for transparent fee structure and ethical counselling.',
        type: 'admission',
        isActive: true,
        showOnHome: true,
        priority: 8,
        expiryDate: new Date('2026-10-31'),
    },
    {
        title: '✅ Free Career Counselling – Rasi Foundation',
        content: 'Confused about which course or college to choose after 12th? Rasi Foundation offers FREE career counselling for students and parents. Get personalized guidance based on your marks, interests, and career goals. Visit our office in Rasipuram or call us today!',
        type: 'general',
        isActive: true,
        showOnHome: true,
        priority: 6,
    },
];

async function seedAnnouncements() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected successfully!');

        // Clear existing announcements
        const deleteResult = await Announcement.deleteMany({});
        console.log(`Cleared ${deleteResult.deletedCount} existing announcements`);

        // Insert all announcements
        const result = await Announcement.insertMany(announcements);
        console.log(`\n✅ Successfully seeded ${result.length} announcements!\n`);

        // Print summary
        const summary = announcements.reduce((acc, a) => {
            acc[a.type] = (acc[a.type] || 0) + 1;
            return acc;
        }, {});

        console.log('📊 Summary:');
        Object.entries(summary).forEach(([type, count]) => {
            const emoji = { urgent: '🚨', admission: '🏫', scholarship: '💰', general: '📢' }[type];
            console.log(`   ${emoji} ${type}: ${count} announcements`);
        });

        console.log('\n📋 Announcements created:');
        result.forEach((a, i) => {
            console.log(`   ${i + 1}. [${a.type.toUpperCase()}] ${a.title}`);
        });

    } catch (error) {
        console.error('Error seeding announcements:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

seedAnnouncements();
