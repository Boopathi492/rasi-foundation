import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';
import jwt from 'jsonwebtoken';

// Comprehensive college data with departments from official websites
const collegesDepartments = {
    // Namakkal District
    "K.S. Rangasamy College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.Tech. Information Technology",
        "B.E. Electronics and Communication Engineering",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.E. VLSI Design and Technology",
        "B.E. Mechanical Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Mechatronics Engineering",
        "B.Tech. Computer Science and Business System",
        "B.Tech. Biotechnology",
        "B.Tech. Food Technology",
        "B.Tech. Textile Technology"
    ],
    "Paavai Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (IoT)",
        "B.E. Cyber Security",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Aeronautical Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Robotics & Automation",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering",
        "B.Tech. Food Technology",
        "B.Tech. Agricultural Engineering",
        "B.Tech. Pharmaceutical Technology"
    ],
    "Selvam College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],

    // Salem District
    "Knowledge Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Electronics and Computer Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.Tech. Computer Science and Business Systems"
    ],
    "R. P. Sarathy Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence & Data Science"
    ],

    // Erode District
    "Shree Venkateshwara Hi-Tech Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Cyber Security",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence & Data Science",
        "B.Tech. Pharmaceutical Technology"
    ],
    "Erode Sengunthar Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (IoT)",
        "B.E. Computer Science and Design",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electronics and Instrumentation Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Agricultural Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering"
    ],

    // Coimbatore Zone
    "Karpagam College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. Computer Science and Technology",
        "B.E. Computer Science and Design",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electronics Engineering (VLSI Design)",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Karpagam Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Nehru Institute of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Sri Krishna College of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.Tech. Biotechnology"
    ],
    "SNS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Kongu Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Food Technology",
        "B.Tech. Textile Technology"
    ],
    "Kumaraguru College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Fashion Technology",
        "B.Tech. Textile Technology"
    ],
    "PSG College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. Textile Technology",
        "B.Tech. Fashion Technology"
    ],
    "Coimbatore Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    // Additional Coimbatore Zone Colleges
    "Dr. NGP Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "KGISL Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "SNS College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Hindusthan College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Automobile Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Hindustan Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Rathinam Group of Institutions": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Adithya Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "PPG Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sree Sakthi Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "RVS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "United Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "INFO Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "P.A. College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sri Shakthi Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Kathir College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Park College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Akshaya College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "EASA College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Nehru Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Karpagam Academy of Higher Education": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Dhanalakshmi Srinivasan College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "JCT College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Arjun College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    // Namakkal District Additional
    "Mahendra College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Gnanamani College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Muthayammal Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "CMS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sengunthar Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    // Erode District Additional
    "Nandha Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Artificial Intelligence and Data Science"
    ],
    "Nandha College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    // Salem District Additional
    "AVS Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sri Ganesh Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ]
};

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Verify admin token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET || 'rasi-secret-key');
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await dbConnect();

        const updatedColleges = [];
        const notFoundColleges = [];

        // Update each college with its departments
        for (const [collegeName, departments] of Object.entries(collegesDepartments)) {
            // Try to find college by partial name match
            const college = await College.findOne({
                name: { $regex: collegeName, $options: 'i' }
            });

            if (college) {
                college.departments = departments;
                await college.save();
                updatedColleges.push(college.name);
            } else {
                notFoundColleges.push(collegeName);
            }
        }

        res.status(200).json({
            message: 'Departments updated successfully',
            updated: updatedColleges.length,
            updatedColleges,
            notFound: notFoundColleges.length,
            notFoundColleges,
        });
    } catch (error) {
        console.error('Error updating college departments:', error);
        res.status(500).json({ message: 'Failed to update departments', error: error.message });
    }
}
