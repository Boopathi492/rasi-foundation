// Run this script with: node scripts/seed-departments.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

// Comprehensive college data with departments from official websites
const collegesDepartments = {
    // ===== NAMAKKAL DISTRICT =====
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
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering",
        "B.Tech. Food Technology",
        "B.Tech. Agricultural Engineering"
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
        "B.Tech. AI & Data Science"
    ],
    "CMS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
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
    "Sengunthar Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Mahendra Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Excel College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "J.K.K. Nattraja College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],

    // ===== SALEM DISTRICT =====
    "Knowledge Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Electronics and Computer Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Computer Science and Business Systems"
    ],
    "R. P. Sarathy Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
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
    ],

    // ===== ERODE DISTRICT =====
    "Shree Venkateshwara Hi-Tech Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Cyber Security",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
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
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Chemical Engineering"
    ],
    "Nandha Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nandha College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
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
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Food Technology",
        "B.Tech. Textile Technology"
    ],

    // ===== COIMBATORE ZONE =====
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
        "B.Tech. AI & Data Science"
    ],
    "Karpagam Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Karpagam Academy of Higher Education": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nehru Institute of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Nehru Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
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
        "B.Tech. AI & Data Science"
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
        "B.Tech. AI & Data Science"
    ],
    "SNS College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "KGISL Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Coimbatore Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
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
        "B.Tech. AI & Data Science"
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
        "B.Tech. AI & Data Science"
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
        "B.Tech. AI & Data Science"
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

    // ===== WELL CONNECTED UNIVERSITIES =====
    "Vellore Institute of Technology": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (Artificial Intelligence & Machine Learning)",
        "B.Tech. CSE (Data Science)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. CSE (Bioinformatics)",
        "B.Tech. CSE (Blockchain)",
        "B.Tech. CSE (Artificial Intelligence & Data Engineering)",
        "B.Tech. CSE (Internet of Things)",
        "B.Tech. CSE (Information Security)",
        "B.Tech. CSE & Business Systems (with TCS)",
        "B.Tech. Information Technology",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electronics and Computer Engineering",
        "B.Tech. Electronics Engineering (VLSI Design & Technology)",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Mechanical Engineering (Automotive)",
        "B.Tech. Civil Engineering",
        "B.Tech. Chemical Engineering",
        "B.Tech. Biotechnology",
        "B.Tech. Aerospace Engineering"
    ],
    "Amrita Vishwa Vidyapeetham": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (Artificial Intelligence)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. Artificial Intelligence and Data Science",
        "B.Tech. AI & DS (Autonomous Agents & Robotic Systems)",
        "B.Tech. AI & DS (Cyber Physical Systems & Security)",
        "B.Tech. AI & DS (Quantum Technologies)",
        "B.Tech. AI & DS (Medical Engineering)",
        "B.Tech. Computer and Communication Engineering",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Electrical and Computer Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Chemical Engineering",
        "B.Tech. Aerospace Engineering",
        "B.Tech. Automation and Robotics"
    ],

    // ===== MISSING COIMBATORE ZONE COLLEGES =====
    "PSG College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Automobile Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Instrumentation and Control Engineering",
        "B.E. Metallurgical Engineering",
        "B.E. Production Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology",
        "B.Tech. Fashion Technology",
        "B.Tech. Textile Technology"
    ],
    "PSG Institute of Technology and Applied Research": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Instrumentation and Control Engineering",
        "B.Tech. AI & Data Science",
        "B.Tech. Electronics Engineering (VLSI Design & Technology)"
    ],
    "Coimbatore Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Chemical Engineering",
        "B.Tech. Information Technology",
        "B.E. AI & Data Science"
    ],
    "Kumaraguru College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Aeronautical Engineering",
        "B.E. Automobile Engineering",
        "B.E. Mechatronics Engineering",
        "B.E. Electronics & Instrumentation Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology",
        "B.Tech. Fashion Technology",
        "B.Tech. Textile Technology"
    ],
    "Sri Eshwar College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Computer and Communication Engineering",
        "B.E. Computer Science and Business Systems",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "KPR Institute of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Computer Science and Business Systems",
        "B.E. Biomedical Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Sri Krishna College of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (Cyber Security)",
        "B.E. Computer Science and Design",
        "B.E. Computer Science and Business Systems",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Instrumentation and Control Engineering",
        "B.E. Automobile Engineering",
        "B.E. Mechatronics Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "Sri Ramakrishna Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.E. Aeronautical Engineering",
        "B.E. Electronics and Instrumentation Engineering",
        "B.E. Robotics and Automation",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. AI & ML"
    ],
    "Sri Ramakrishna Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "KIT – Kalaignar Karunanidhi Institute of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sri Ranganathar Institute of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
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
        "B.E. Civil Engineering"
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
        "B.E. Civil Engineering"
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

    // ===== MISSING ERODE DISTRICT COLLEGES =====
    "J.K.K. Munirajah College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "M. P. Nachimuthu M. Jaganathan Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
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
        "B.E. CSE (AI & ML)",
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
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Aishwarya College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],

    // ===== MISSING NAMAKKAL DISTRICT COLLEGES =====
    "Paavai College of Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science",
        "B.Tech. Biotechnology"
    ],
    "Excel Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.E. Aeronautical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. AI & Data Science"
    ],
    "PGP College of Engineering and Technology": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Vidhya Vikas College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. AI & Data Science"
    ],
    "SSM College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Textile Technology"
    ],
    "Annai Mathammal Sheela Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. AI & Data Science"
    ],
    "S.R.G. Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],

    // ===== MISSING SALEM DISTRICT COLLEGES =====
    "Mahendra College of Engineering": [
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
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biomedical Engineering"
    ],
    "Annapoorana Engineering College": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
    ],
    "Sri Shanmugha College of Engineering": [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology"
    ],

    // ===== MISSING WELL CONNECTED UNIVERSITIES =====
    "Sree Balaji Institute of Science": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Dhanalakshmi Srinivasan University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Sri Venkateswaraa Medical University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. Biomedical Engineering",
        "B.Tech. Biotechnology",
        "B.Tech. Information Technology"
    ],
    "Kalasalingam University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Biotechnology",
        "B.Tech. Information Technology"
    ],
    "St. Joseph's University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Vel Tech University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. CSE (AI & Data Science)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. CSE (IoT)",
        "B.Tech. CSE (Blockchain)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Aeronautical Engineering",
        "B.Tech. Information Technology"
    ],
    "Saveetha University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. AI & Data Science",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Biomedical Engineering",
        "B.Tech. Information Technology"
    ],
    "Takshashila University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Chettinad University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Information Technology"
    ],
    "Dr. M.G.R University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. CSE (Data Science)",
        "B.Tech. CSE (Cyber Forensic & Information Security)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Aeronautical Engineering",
        "B.Tech. Automobile Engineering",
        "B.Tech. Biotechnology",
        "B.Tech. Information Technology"
    ],
    "Bharath University": [
        "B.Tech. Computer Science and Engineering",
        "B.Tech. CSE (AI & ML)",
        "B.Tech. CSE (Cyber Security)",
        "B.Tech. CSE (Data Science)",
        "B.Tech. CSE (IoT & Blockchain)",
        "B.Tech. Electronics and Communication Engineering",
        "B.Tech. Electrical and Electronics Engineering",
        "B.Tech. Mechanical Engineering",
        "B.Tech. Civil Engineering",
        "B.Tech. Aeronautical Engineering",
        "B.Tech. Aerospace Engineering",
        "B.Tech. Automobile Engineering",
        "B.Tech. Biomedical Engineering",
        "B.Tech. Biotechnology",
        "B.Tech. Information Technology"
    ]
};

async function seedDepartments() {
    console.log('🚀 Connecting to MongoDB...');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Get College model
        const College = mongoose.models.College || mongoose.model('College', new mongoose.Schema({
            name: String,
            location: String,
            district: String,
            tneaCode: String,
            note: String,
            departments: [String],
            website: String,
            isActive: Boolean,
            order: Number,
            createdAt: Date,
            updatedAt: Date
        }));

        let updatedCount = 0;
        let notFoundCount = 0;

        for (const [collegeName, departments] of Object.entries(collegesDepartments)) {
            // Find college by partial name match
            const college = await College.findOne({
                name: { $regex: collegeName, $options: 'i' }
            });

            if (college) {
                college.departments = departments;
                college.updatedAt = new Date();
                await college.save();
                console.log(`✅ Updated: ${college.name} (${departments.length} courses)`);
                updatedCount++;
            } else {
                console.log(`⚠️  Not found: ${collegeName}`);
                notFoundCount++;
            }
        }

        console.log('\n========================================');
        console.log(`✅ Updated: ${updatedCount} colleges`);
        console.log(`⚠️  Not found: ${notFoundCount} colleges`);
        console.log('========================================\n');

        await mongoose.disconnect();
        console.log('👋 Disconnected from MongoDB');

    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

seedDepartments();
