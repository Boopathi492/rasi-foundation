// Script to add departments for remaining colleges
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://rasifoundationadmission_db_user:LN3JnRfZMzhLCwJc@cluster1.n12u8v2.mongodb.net/rasi-foundation?retryWrites=true&w=majority&appName=Cluster1';

// Default courses for engineering colleges (standard branches)
const defaultEngineeringCourses = [
    "B.E. Computer Science and Engineering",
    "B.E. Electronics and Communication Engineering",
    "B.E. Electrical and Electronics Engineering",
    "B.E. Mechanical Engineering",
    "B.E. Civil Engineering"
];

// Enhanced courses for colleges with AI/ML specializations
const enhancedCourses = [
    "B.E. Computer Science and Engineering",
    "B.E. CSE (AI & ML)",
    "B.E. Electronics and Communication Engineering",
    "B.E. Electrical and Electronics Engineering",
    "B.E. Mechanical Engineering",
    "B.E. Civil Engineering",
    "B.Tech. Information Technology"
];

// Specific courses for some colleges based on official information
const specificColleges = {
    "Vidhya Vikas College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "SSM College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Annai Mathammal Sheela Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "AVS College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Vinayaka Missions University": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology"
    ],
    "J.K.K. Munirajah College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "M. P. Nachimuthu M. Jaganathan Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Surya Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sasurie College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Al-Ameen Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Aishwarya College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sri Ranganathar Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Study World College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Pollachi Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sri Sai Ranganathan Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Asian College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Vishnu Lakshmi College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Dhaanish Ahmed Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "VSB College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Tamil Nadu College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Suguna College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "CMS College of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Christ the King Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "KIT – Kalaignar Karunanidhi Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Annapoorana Medical College": [
        "MBBS",
        "B.Sc. Nursing",
        "B.Sc. Allied Health Sciences",
        "B.Pharm",
        "Paramedical Courses"
    ],
    "Sri Shanmugha College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ]
};

async function addRemainingDepartments() {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const College = mongoose.model('College', new mongoose.Schema({
        name: String,
        departments: [String],
        district: String,
        updatedAt: Date
    }));

    const allColleges = await College.find({}).lean();
    const withoutDepts = allColleges.filter(c => !c.departments || c.departments.length === 0);

    console.log(`Found ${withoutDepts.length} colleges without courses\n`);

    let updated = 0;

    for (const college of withoutDepts) {
        // Find matching specific courses or use default
        let courses = null;

        for (const [name, depts] of Object.entries(specificColleges)) {
            if (college.name.toLowerCase().includes(name.toLowerCase())) {
                courses = depts;
                break;
            }
        }

        // If no specific match, use enhanced courses
        if (!courses) {
            courses = enhancedCourses;
        }

        await College.updateOne(
            { _id: college._id },
            {
                $set: {
                    departments: courses,
                    updatedAt: new Date()
                }
            }
        );

        console.log(`✅ ${college.name}: ${courses.length} courses`);
        updated++;
    }

    console.log(`\n========================================`);
    console.log(`✅ Updated ${updated} colleges with courses`);
    console.log(`========================================\n`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
}

addRemainingDepartments();
