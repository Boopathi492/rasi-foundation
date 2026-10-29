import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  FaMapMarkerAlt, FaUniversity, FaCode, FaGraduationCap, FaFemale, FaArrowRight, FaTimes, FaSearch, FaCalendarCheck, FaGlobe, FaExternalLinkAlt
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import BengaluruColleges from '@/frontend/components/BengaluruColleges';
import CollegeGuidance from '@/frontend/components/colleges/CollegeGuidance';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import Reveal from '@/frontend/components/home/Reveal';
import Marquee from '@/frontend/components/home/Marquee';
import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';
import { CONTACT, ROUTES } from '@/data/siteConfig';

// Fallback static data in case database is empty
// Courses updated from official college websites (December 2024)
const fallbackData = [
  {
    district: 'Namakkal District',
    colleges: [
      {
        name: 'K.S. Rangasamy College of Technology (KSRCT)',
        location: 'Tiruchengode',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (AI & ML)',
          'B.Tech. Information Technology',
          'B.E. Electronics and Communication Engineering',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.E. VLSI Design and Technology',
          'B.E. Mechanical Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Civil Engineering',
          'B.E. Mechatronics Engineering',
          'B.Tech. Computer Science and Business System',
          'B.Tech. Biotechnology',
          'B.Tech. Food Technology',
          'B.Tech. Textile Technology'
        ]
      },
      {
        name: 'Paavai Engineering College / Paavai College of Technology',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (AI & ML)',
          'B.E. CSE (IoT)',
          'B.E. Cyber Security',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Mechatronics Engineering',
          'B.E. Civil Engineering',
          'B.E. Aeronautical Engineering',
          'B.E. Biomedical Engineering',
          'B.E. Robotics & Automation',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence & Data Science',
          'B.Tech. Biotechnology',
          'B.Tech. Chemical Engineering',
          'B.Tech. Food Technology',
          'B.Tech. Agricultural Engineering',
          'B.Tech. Pharmaceutical Technology'
        ]
      },
      {
        name: 'Selvam College of Technology (Autonomous)',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Biomedical Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Biotechnology',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'CMS College of Engineering',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering'
        ]
      },
      {
        name: 'Gnanamani College of Technology',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.Tech. Food Technology',
          'B.Tech. Pharmaceutical Technology',
          'B.Tech. Chemical Engineering'
        ]
      },
      {
        name: 'Muthayammal Engineering College',
        location: 'Rasipuram',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (Cyber Security)',
          'B.E. CSE (AI & ML)',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Mechatronics Engineering',
          'B.E. Biomedical Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.Tech. Biotechnology'
        ]
      },
      {
        name: 'Sengunthar Engineering College (Autonomous)',
        location: 'Tiruchengode',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Medical Electronics',
          'B.E. Robotics and Automation',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'Mahendra Engineering College',
        location: 'Mallasamudram',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (Cyber Security)',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Mechatronics Engineering',
          'B.E. Aeronautical Engineering',
          'B.E. Aerospace Engineering',
          'B.E. Agriculture Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.Tech. Food Technology',
          'B.Tech. Pharmaceutical Technology',
          'B.Tech. Chemical Engineering'
        ]
      },
      {
        name: 'Excel College of Engineering and Technology',
        location: 'Komarapalayam',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Aeronautical Engineering',
          'B.E. Biomedical Engineering',
          'B.E. Agriculture Engineering',
          'B.E. Safety and Fire Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.Tech. Food Technology',
          'B.Tech. Textile Technology',
          'B.Tech. Petrochemical Technology'
        ]
      },
      {
        name: 'J.K.K. Nattraja College of Engineering and Technology',
        location: 'Komarapalayam',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'PGP College of Engineering and Technology',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering'
        ]
      },
      {
        name: 'Vidhya Vikas College of Engineering and Technology',
        location: 'Tiruchengode',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'SSM College of Engineering',
        location: 'Komarapalayam',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Textile Technology',
          'B.Tech. Petrochemical Technology'
        ]
      },
      {
        name: 'Annai Mathammal Sheela Engineering College',
        location: 'Erumapatti',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'S.R.G. Engineering College',
        location: 'Namakkal',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering'
        ]
      }
    ]
  },
  {
    district: 'Salem District',
    colleges: [
      {
        name: 'Knowledge Institute of Technology (KIOT)',
        location: 'Salem',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Electronics and Computer Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science',
          'B.Tech. Computer Science and Business Systems'
        ]
      },
      {
        name: 'R. P. Sarathy Institute of Technology (RPSIT)',
        location: 'Salem',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (Cyber Security)',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence & Data Science'
        ]
      },
      { name: 'Mahendra College of Engineering', location: 'Salem' },
      { name: 'Sri Ganesh Engineering College', location: 'Salem' },
      { name: 'AVS Engineering College', location: 'Salem' },
      { name: 'AVS College of Technology', location: 'Salem' },
      { name: 'Vinayaka Missions University', location: 'Salem' },
      { name: 'Annapoorana Medical College and Hospital', location: 'Salem' },
      { name: 'Sri Shanmugha College of Engineering and Technology', location: 'Salem' }
    ]
  },
  {
    district: 'Erode District',
    colleges: [
      {
        name: 'Shree Venkateshwara Hi-Tech Engineering College',
        location: 'Gobichettipalayam',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Biomedical Engineering',
          'B.E. Cyber Security',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence & Data Science',
          'B.Tech. Pharmaceutical Technology'
        ]
      },
      {
        name: 'Erode Sengunthar Engineering College (ESEC)',
        location: 'Perundurai',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (Cyber Security)',
          'B.E. CSE (AI & ML)',
          'B.E. CSE (IoT)',
          'B.E. Computer Science and Design',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electronics and Instrumentation Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.E. Biomedical Engineering',
          'B.E. Agricultural Engineering',
          'B.E. Robotics and Automation',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence & Data Science',
          'B.Tech. Biotechnology',
          'B.Tech. Chemical Engineering'
        ]
      },
      { name: 'J.K.K. Munirajah College of Technology', location: 'Gobichettipalayam' },
      { name: 'M. P. Nachimuthu M. Jaganathan Engineering College (MPNMJ)', location: 'Chennimalai' },
      { name: 'Nandha College of Technology', location: 'Erode' },
      { name: 'Nandha Engineering College', location: 'Perundurai' },
      { name: 'Surya Engineering College', location: 'Erode' },
      { name: 'Sasurie College of Engineering', location: 'Vijayamangalam' },
      { name: 'Al-Ameen Engineering College', location: 'Erode' },
      { name: 'Aishwarya College of Engineering & Technology', location: 'Erode' }
    ]
  },
  {
    district: 'Coimbatore Zone',
    colleges: [
      {
        name: 'Karpagam College of Engineering (Autonomous)',
        location: 'Coimbatore',
        tneaCode: '2710',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. CSE (Cyber Security)',
          'B.E. Computer Science and Technology',
          'B.E. Computer Science and Design',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electronics Engineering (VLSI Design)',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      {
        name: 'Karpagam Institute of Technology (Autonomous)',
        location: 'Coimbatore',
        tneaCode: '2735',
        departments: [
          'B.E. Computer Science and Engineering',
          'B.E. Electronics and Communication Engineering',
          'B.E. Electrical and Electronics Engineering',
          'B.E. Mechanical Engineering',
          'B.E. Civil Engineering',
          'B.Tech. Information Technology',
          'B.Tech. Artificial Intelligence and Data Science'
        ]
      },
      { name: 'Karpagam Academy of Higher Education (KAHE – University)', location: 'Coimbatore' },
      { name: 'Sree Sakthi Engineering College (Autonomous)', location: 'Karamadai', tneaCode: '2673' },
      { name: 'Adithya Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2744' },
      { name: 'PPG Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2753' },
      { name: 'Rathinam Group of Institutions (Autonomous)', location: 'Coimbatore', tneaCode: '2329', note: 'R-Smart / Sunstone supported' },
      { name: 'Dr. NGP Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2736' },
      { name: 'KGISL Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2751' },
      { name: 'Nehru Institute of Engineering and Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2729' },
      { name: 'Nehru Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2755' },
      { name: 'Coimbatore Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2704' },
      { name: 'RVS College of Engineering and Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2731' },
      { name: 'United Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2761' },
      { name: 'Hindusthan College of Engineering and Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2708' },
      { name: 'Hindustan Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2740' },
      { name: 'Akshaya College of Engineering and Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2763' },
      { name: 'INFO Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2732' },
      { name: 'KIT – Kalaignar Karunanidhi Institute of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2750' },
      { name: 'Dhanalakshmi Srinivasan College of Engineering (Autonomous)', location: 'Coimbatore', tneaCode: '2743' },
      { name: 'Sri Ranganathar Institute of Engineering & Technology (Autonomous)', location: 'Athipalayam', tneaCode: '2342' },
      { name: 'Study World College of Engineering', location: 'Coimbatore', tneaCode: '2770' },
      { name: 'EASA College of Engineering and Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2749' },
      { name: 'Arjun College of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2367' },
      { name: 'JCT College of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2762' },
      { name: 'Pollachi Institute of Engineering & Technology', location: 'Coimbatore', tneaCode: '2354' },
      { name: 'P.A. College of Engineering and Technology (Autonomous)', location: 'Pollachi', tneaCode: '2741' },
      { name: 'SNS College of Technology (Autonomous)', location: 'Coimbatore', tneaCode: '2726' },
      { name: 'SNS College of Engineering (Autonomous)', location: 'Coimbatore', tneaCode: '2734' },
      { name: 'Sri Sai Ranganathan Engineering College', location: 'Thondamuthur', tneaCode: '2737' },
      { name: 'Asian College of Engineering and Technology', location: 'Saravanampatti', tneaCode: '2338' },
      { name: 'Vishnu Lakshmi College of Engineering and Technology', location: 'Coimbatore', tneaCode: '2368' },
      { name: 'Dhaanish Ahmed Institute of Technology', location: 'Coimbatore', tneaCode: '2349' },
      { name: 'VSB College of Engineering & Technical Campus', location: 'Coimbatore', tneaCode: '2357' },
      { name: 'Park College of Engineering and Technology', location: 'Coimbatore', tneaCode: '2716' },
      { name: 'Tamil Nadu College of Engineering', location: 'Coimbatore', tneaCode: '2721' },
      { name: 'Sri Shakthi Institute of Engineering and Technology', location: 'L&T By-Pass', tneaCode: '2727' },
      { name: 'Kathir College of Engineering', location: 'Coimbatore', tneaCode: '2745' },
      { name: 'Suguna College of Engineering', location: 'Coimbatore', tneaCode: '2360' },
      { name: 'CMS College of Engineering and Technology', location: 'Coimbatore', tneaCode: '2772' },
      { name: 'Christ the King Engineering College', location: 'Karamadai', tneaCode: '2650' }
    ]
  },
  {
    district: 'Bengaluru Zone',
    colleges: [
      { name: 'Akash Group of Institutions', location: 'Bengaluru' },
      { name: 'East Point College', location: 'Bengaluru' },
      { name: 'Alliance University', location: 'Bengaluru' },
      { name: 'Adithya Institute of Technology', location: 'Bengaluru' },
      { name: 'SEA College of Engineering & Technology', location: 'Bengaluru' },
      { name: 'T. John Group of Institutions', location: 'Bengaluru' },
      { name: 'S-VYASA University', location: 'Bengaluru' },
      { name: 'RR Institutions', location: 'Bengaluru' },
      { name: 'Harsha Institutions', location: 'Bengaluru' },
      { name: 'Atria Institute of Technology', location: 'Bengaluru' },
      { name: 'Garden City University', location: 'Bengaluru' },
      { name: 'Spurthy Institutions', location: 'Bengaluru' },
      { name: 'Yenepoya University', location: 'Bengaluru' },
      { name: 'Krupanidhi Group of Institutions', location: 'Bengaluru' },
      { name: 'ISBR Bangalore', location: 'Bengaluru' },
      { name: 'MVJ College of Engineering', location: 'Bengaluru' }
    ]
  },
];

export async function getStaticProps() {
  try {
    await dbConnect();
    const Course = (await import('@/backend/models/Course')).default;

    const [colleges, courseLinks] = await Promise.all([
      College.find({ isActive: true })
        .populate('courses', 'name code level category specialization duration')
        .sort({ district: 1, order: 1, name: 1 })
        .lean(),
      Course.find({ isActive: true, 'colleges.0': { $exists: true } })
        .select('name code level category specialization duration colleges')
        .lean()
    ]);

    const collegeCoursesMap = new Map();
    courseLinks.forEach(c => {
      (c.colleges || []).forEach(colId => {
        const idStr = String(colId);
        if (!collegeCoursesMap.has(idStr)) collegeCoursesMap.set(idStr, []);
        collegeCoursesMap.get(idStr).push({
          _id: c._id?.toString() || '',
          name: c.name || '',
          code: c.code || '',
          level: c.level || '',
          category: c.category || '',
          specialization: c.specialization || '',
          duration: c.duration || '',
        });
      });
    });

    if (colleges.length > 0) {
      // Group colleges by district
      const groupedColleges = colleges.reduce((acc, college) => {
        const district = college.district || 'Other';
        if (!acc[district]) {
          acc[district] = [];
        }
        const idStr = String(college._id);
        const resolvedCourses = (Array.isArray(college.courses) && college.courses.length > 0)
          ? college.courses.map(cr => ({
              _id: cr._id?.toString() || '',
              name: cr.name || '',
              code: cr.code || '',
              level: cr.level || '',
              category: cr.category || '',
              specialization: cr.specialization || '',
              duration: cr.duration || ''
            }))
          : (collegeCoursesMap.get(idStr) || []);

        acc[district].push({
          _id: college._id.toString(),
          name: college.name || '',
          location: college.location || '',
          district: college.district || '',
          type: college.type || 'Engineering',
          specialization: college.specialization || '',
          institutionType: college.institutionType || '',
          courses: resolvedCourses,
          tneaCode: college.tneaCode || '',
          tneaStatus: college.tneaStatus || (college.tneaCode ? 'verified' : 'not_applicable'),
          tneaSourceYear: college.tneaSourceYear || '',
          note: college.note || '',
          departments: Array.isArray(college.departments) ? college.departments : [],
          website: college.website || '',
          logoUrl: college.logo?.storageKey ? `/api/colleges/${college._id}/logo` : null,
          isActive: college.isActive !== false,
        });
        return acc;
      }, {});

      const collegesData = Object.keys(groupedColleges).map(district => ({
        district,
        colleges: groupedColleges[district]
      }));

      return {
        props: {
          collegesData: JSON.parse(JSON.stringify(collegesData)),
        },
        revalidate: 60,
      };
    }

    return {
      props: {
        collegesData: JSON.parse(JSON.stringify(fallbackData)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return {
      props: {
        collegesData: JSON.parse(JSON.stringify(fallbackData)),
      },
      revalidate: 60,
    };
  }
}


const PAGE_SIZE = 12;

export const TAMIL_NADU_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
  'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai',
  'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
  'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
  'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const STREAMS = [
  { id: 'all', label: 'All Streams' },
  { id: 'Engineering', label: 'Engineering' },
  { id: 'Medical', label: 'Medical & Healthcare' },
  { id: 'Arts & Science', label: 'Arts & Science' },
  { id: 'Management', label: 'Management' },
  { id: 'Law', label: 'Law' },
  { id: 'Agriculture', label: 'Agriculture' },
  { id: 'Education', label: 'Education' },
  { id: 'Polytechnic', label: 'Polytechnic' }
];

export const INSTITUTION_TYPES = [
  { id: 'all', label: 'All Types' },
  { id: 'Government', label: 'Government' },
  { id: 'Government-Aided', label: 'Government-Aided' },
  { id: 'Autonomous', label: 'Autonomous' },
  { id: 'Private', label: 'Private / Self-Financing' }
];

export const STREAM_SPECIALIZATIONS = {
  Medical: [
    'Pharmacy',
    'Nursing',
    'Dentistry',
    'Physiotherapy',
    'Occupational Therapy',
    'Allied Health Sciences',
    'Medical Laboratory Technology',
    'Radiology & Imaging',
    'Operation Theatre & Anaesthesia',
    'Cardiac Care',
    'Veterinary Science',
    'Fisheries Science'
  ],
  Engineering: [
    'Computer Science & IT',
    'Artificial Intelligence & Data Science',
    'Electronics & Communication',
    'Electrical & Electronics',
    'Mechanical Engineering',
    'Civil Engineering',
    'Biotechnology',
    'Mechatronics & Robotics',
    'Chemical Engineering'
  ],
  'Arts & Science': [
    'Computer Science & Applications',
    'Commerce & Accounting',
    'Mathematics & Statistics',
    'Physics & Chemistry',
    'Life Sciences & Biotechnology',
    'English & Literature',
    'Tamil & Languages',
    'Economics & Management'
  ],
  Agriculture: [
    'Agriculture',
    'Horticulture',
    'Agricultural Engineering',
    'Forestry',
    'Food Technology'
  ],
  Polytechnic: [
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical & Electronics',
    'Electronics & Communication',
    'Computer Engineering',
    'Automobile Engineering'
  ],
  Management: [
    'Business Administration (BBA)',
    'Master of Business Administration (MBA)',
    'Finance & Banking',
    'Logistics & Supply Chain'
  ],
  Law: [
    '5-Year Integrated Law (BA/BBA/BCom LLB)',
    '3-Year LLB',
    'Master of Laws (LLM)'
  ],
  Education: [
    'Bachelor of Education (B.Ed)',
    'Master of Education (M.Ed)',
    'Special Education',
    'Diploma in Elementary Education (D.El.Ed)'
  ]
};

export const STREAM_COURSES = {
  Medical: [
    'MBBS', 'BDS', 'B.Pharm', 'Pharm.D', 'B.Sc Nursing', 'BPT', 'BOT',
    'B.Sc MLT', 'B.Sc Operation Theatre and Anaesthesia', 'B.Sc Cardiac Care',
    'B.Sc Radiology', 'M.Pharm', 'MDS', 'B.V.Sc', 'B.F.Sc'
  ],
  Engineering: [
    'B.E. Computer Science and Engineering',
    'B.Tech. Artificial Intelligence and Data Science',
    'B.Tech. Information Technology',
    'B.E. Electronics and Communication Engineering',
    'B.E. Electrical and Electronics Engineering',
    'B.E. Mechanical Engineering',
    'B.E. Civil Engineering',
    'B.E. Mechatronics Engineering',
    'B.Tech. Biotechnology'
  ],
  'Arts & Science': [
    'B.Sc Computer Science', 'B.Sc Information Technology', 'B.Sc Mathematics',
    'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Biotechnology',
    'B.Com General', 'B.Com Corporate Secretaryship', 'B.Com Professional Accounting',
    'B.A. English', 'B.A. Tamil', 'B.A. Economics', 'BBA', 'BCA'
  ],
  Agriculture: [
    'B.Sc (Hons) Agriculture', 'B.Sc (Hons) Horticulture',
    'B.Tech Agricultural Engineering', 'B.Sc (Hons) Forestry', 'B.F.Sc Fisheries Science'
  ],
  Polytechnic: [
    'Diploma in Mechanical Engineering', 'Diploma in Civil Engineering',
    'Diploma in Electrical and Electronics Engineering',
    'Diploma in Electronics and Communication Engineering',
    'Diploma in Computer Engineering'
  ],
  Management: [
    'BBA', 'MBA', 'MBA Finance', 'MBA Marketing', 'MBA Human Resource'
  ],
  Law: [
    'BA LLB (Hons)', 'BBA LLB (Hons)', 'B.Com LLB (Hons)', 'LLB (3 Years)', 'LLM'
  ],
  Education: [
    'B.Ed', 'M.Ed', 'B.Ed Special Education', 'D.El.Ed'
  ]
};

function CollegeModal({ college, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const departments = college.departments || [];
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="college-dialog-title"
        className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-forest to-forest-dark p-6 pr-14 text-white">
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <FaTimes aria-hidden="true" />
          </button>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{college.type || 'Engineering'}</span>
            {college.specialization && (
              <span className="rounded-full bg-gold-400 text-forest-dark px-2.5 py-0.5 text-xs font-bold">
                {college.specialization}
              </span>
            )}
            {college.institutionType && (
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
                {college.institutionType}
              </span>
            )}
            {college.zone && <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">{college.zone}</span>}
          </div>
          <h2 id="college-dialog-title" className="font-heading text-xl font-bold">{college.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80"><FaMapMarkerAlt aria-hidden="true" /> {college.location}</p>
          {college.tneaStatus === 'verified' && college.tneaCode && (
            <p className="mt-1 text-sm text-gold-300 font-semibold">
              TNEA Code: {college.tneaCode} {college.tneaSourceYear ? `(${college.tneaSourceYear})` : ''}
            </p>
          )}
          {college.tneaStatus === 'pending_verification' && (
            <p className="mt-1 text-sm text-amber-200 font-medium">
              TNEA Code: Pending Verification
            </p>
          )}
          {college.note && <p className="mt-1 text-xs text-white/80">{college.note}</p>}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {Array.isArray(college.courses) && college.courses.length > 0 && (
            <div>
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-forest mb-2">
                Degree Offerings ({college.courses.length})
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {college.courses.map((cr) => (
                  <span
                    key={cr._id || cr.name}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 text-xs font-semibold text-emerald-800"
                  >
                    <FaGraduationCap className="text-forest text-[11px]" />
                    {cr.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans text-base font-semibold text-gray-900">
                Departments {departments.length > 0 && <span className="text-sm font-normal text-gray-500">({departments.length})</span>}
              </h3>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest hover:underline"
                >
                  <FaGlobe aria-hidden="true" /> Official Website <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
                </a>
              )}
            </div>
            {departments.length > 0 ? (
              <ul className="space-y-2">
                {departments.map((dept) => (
                  <li key={dept} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700">
                    <FaGraduationCap className="shrink-0 text-forest" aria-hidden="true" /> {dept}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-2 text-center text-sm text-gray-500">No department information is listed for this college yet.</p>
            )}
          </div>
        </div>
        <div className="flex gap-3 border-t border-gray-100 bg-gray-50 p-4">
          <button type="button" onClick={onClose} className="flex-1 rounded-full border-2 border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">Close</button>
          <Link href={`/contact?college=${encodeURIComponent(college.name)}`} className="flex-1 rounded-full bg-crimson py-2.5 text-center text-sm font-semibold text-white hover:bg-crimson-dark">Enquire about this college</Link>
        </div>
      </div>
    </div>
  );
}

export default function Colleges({ collegesData }) {
  const [data, setData] = useState(collegesData || []);
  const [showWomenColleges, setShowWomenColleges] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zone, setZone] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState('all');
  const [onlyTnea, setOnlyTnea] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const directoryRef = useRef(null);

  // Client-side hydration from /api/colleges
  useEffect(() => {
    let cancelled = false;
    async function loadFresh() {
      try {
        const res = await fetch('/api/colleges');
        if (res.ok) {
          const fresh = await res.json();
          if (!cancelled && Array.isArray(fresh) && fresh.length > 0) {
            setData(fresh);
          }
        }
      } catch (_) {}
    }
    loadFresh();
    return () => { cancelled = true; };
  }, []);

  // Flatten the zone groups; include specialization, institutionType, website, etc.
  const allColleges = useMemo(() => {
    const seen = new Set();
    const list = [];
    (data || []).forEach((group) => {
      (group.colleges || []).forEach((c) => {
        const key = `${group.district}|${(c.name || '').toLowerCase()}`;
        if (!c.name || seen.has(key)) return;
        seen.add(key);
        list.push({
          ...c,
          zone: group.district,
          type: c.type || 'Engineering',
          specialization: c.specialization || '',
          institutionType: c.institutionType || '',
          courses: Array.isArray(c.courses) ? c.courses : [],
          website: c.website || '',
          departments: Array.isArray(c.departments) ? c.departments : [],
        });
      });
    });
    return list;
  }, [data]);

  const { officialDistricts, legacyZones, zones } = useMemo(() => {
    const rawDistricts = new Set(allColleges.map((c) => c.zone));
    const officialSet = new Set(TAMIL_NADU_DISTRICTS);

    const official = TAMIL_NADU_DISTRICTS.slice().sort();
    const legacy = [];

    rawDistricts.forEach((d) => {
      if (d && !officialSet.has(d)) {
        legacy.push(d);
      }
    });
    legacy.sort();

    return { officialDistricts: official, legacyZones: legacy, zones: [...official, ...legacy] };
  }, [allColleges]);

  // Available specializations based on selected stream or all
  const availableSpecializations = useMemo(() => {
    if (selectedStream !== 'all' && STREAM_SPECIALIZATIONS[selectedStream]) {
      return STREAM_SPECIALIZATIONS[selectedStream];
    }
    const specs = new Set();
    allColleges.forEach((c) => {
      if (c.specialization) specs.add(c.specialization);
    });
    return Array.from(specs).sort();
  }, [selectedStream, allColleges]);

  // Available courses based on selected stream
  const availableCourses = useMemo(() => {
    if (selectedStream !== 'all' && STREAM_COURSES[selectedStream]) {
      return STREAM_COURSES[selectedStream];
    }
    const coursesSet = new Set();
    allColleges.forEach((c) => {
      (c.departments || []).forEach((d) => {
        if (d && d.length < 50) coursesSet.add(d);
      });
    });
    return Array.from(coursesSet).slice(0, 30).sort();
  }, [selectedStream, allColleges]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const specLower = selectedSpecialization.trim().toLowerCase();
    const courseLower = selectedCourse.trim().toLowerCase();
    const instTypeLower = selectedInstitutionType.trim().toLowerCase();

    return allColleges.filter((c) => {
      // 1. District
      if (zone !== 'all' && c.zone !== zone) return false;

      // 2. Stream
      if (selectedStream !== 'all' && (c.type || 'Engineering') !== selectedStream) return false;

      // 3. Institution Type
      if (selectedInstitutionType !== 'all') {
        const cType = (c.institutionType || '').toLowerCase();
        const cName = (c.name || '').toLowerCase();
        if (instTypeLower === 'government') {
          if (!cType.includes('government') && !cName.includes('government')) return false;
        } else if (instTypeLower === 'government-aided') {
          if (!cType.includes('aided') && !cName.includes('aided')) return false;
        } else if (instTypeLower === 'autonomous') {
          if (!cType.includes('autonomous') && !cName.includes('(autonomous)')) return false;
        } else if (instTypeLower === 'private') {
          if (cType.includes('government') || cName.includes('government')) return false;
        }
      }

      // 4. Specialization
      if (selectedSpecialization !== 'all') {
        const colSpec = (c.specialization || '').toLowerCase();
        const colDepts = (c.departments || []).map((d) => d.toLowerCase());
        const match =
          colSpec.includes(specLower) ||
          colDepts.some((d) => d.includes(specLower));
        if (!match) return false;
      }

      // 5. Course
      if (selectedCourse !== 'all') {
        const colDepts = (c.departments || []).map((d) => d.toLowerCase());
        const colSpec = (c.specialization || '').toLowerCase();
        const colCourses = (c.courses || []).map((cr) => (cr.name || '').toLowerCase());
        const match =
          colDepts.some((d) => d.includes(courseLower)) ||
          colSpec.includes(courseLower) ||
          colCourses.some((cn) => cn.includes(courseLower));
        if (!match) return false;
      }

      // 6. TNEA code
      if (onlyTnea && (c.tneaStatus !== 'verified' || !c.tneaCode)) return false;

      // 7. Search keyword
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.location || '').toLowerCase().includes(q) ||
        (c.zone || '').toLowerCase().includes(q) ||
        (c.type || '').toLowerCase().includes(q) ||
        (c.specialization && c.specialization.toLowerCase().includes(q)) ||
        (c.institutionType && c.institutionType.toLowerCase().includes(q)) ||
        (c.tneaCode && c.tneaCode.toLowerCase().includes(q)) ||
        (c.departments || []).some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [allColleges, searchTerm, zone, selectedStream, selectedSpecialization, selectedCourse, selectedInstitutionType, onlyTnea]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [searchTerm, zone, selectedStream, selectedSpecialization, selectedCourse, selectedInstitutionType, onlyTnea]);

  const clearFilters = () => {
    setSearchTerm('');
    setZone('all');
    setSelectedStream('all');
    setSelectedSpecialization('all');
    setSelectedCourse('all');
    setSelectedInstitutionType('all');
    setOnlyTnea(false);
  };

  const isAnyFilterActive =
    Boolean(searchTerm) ||
    zone !== 'all' ||
    selectedStream !== 'all' ||
    selectedSpecialization !== 'all' ||
    selectedCourse !== 'all' ||
    selectedInstitutionType !== 'all' ||
    onlyTnea;

  const shown = filtered.slice(0, visible);
  const showcase = allColleges.filter((c) => !/bengaluru|bangalore/i.test(`${c.zone} ${c.location}`)).slice(0, 24);
  const closeCollege = useCallback(() => setSelectedCollege(null), []);

  const jumpToCollege = (name) => {
    setSearchTerm(name);
    setZone('all');
    setSelectedStream('all');
    directoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Women-Centric Engineering Colleges Data with Departments (Updated from official websites)
  const womenColleges = [
    {
      name: "Avinashilingam University for Women",
      location: "Coimbatore",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. CSE (IoT & Cyber Security)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Instrumentation",
        "B.Tech. Food Processing Technology",
        "B.Tech. Printing Technology"
      ]
    },
    {
      name: "Bharathiyar Institute of Engineering for Women",
      location: "Attur",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering"
      ]
    },
    {
      name: "Idhaya Engineering College for Women",
      location: "Villupuram",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering"
      ]
    },
    {
      name: "Mahendra Engineering College for Women",
      location: "Tiruchengode",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.Tech. Information Technology"
      ]
    },
    {
      name: "Periyar Maniammai University",
      location: "Vallam (Thanjavur)",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Mechanical Engineering",
        "B.E. Civil Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology"
      ]
    },
    {
      name: "Sri Bharathi Engineering College for Women",
      location: "Alangudi",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering"
      ]
    },
    {
      name: "Vivekanandha College of Engineering for Women",
      location: "Tiruchengode",
      departments: [
        "B.E. Computer Science and Engineering",
        "B.E. CSE (AI & ML)",
        "B.E. Electronics and Communication Engineering",
        "B.E. Electrical and Electronics Engineering",
        "B.E. Civil Engineering",
        "B.E. Biomedical Engineering",
        "B.Tech. Information Technology",
        "B.Tech. Biotechnology",
        "B.Tech. Artificial Intelligence & Data Science",
        "B.Tech. Agricultural Engineering"
      ]
    },
  ];

  // Extract women-centric colleges from dynamic data for the modal
  const dbWomenColleges = collegesData.find(d => d.district === 'Women Centric Colleges')?.colleges || [];

  // Use DB data if available, otherwise use static fallback
  const displayWomenColleges = dbWomenColleges.length > 0 ? dbWomenColleges : womenColleges;

  useEffect(() => {
    if (!showWomenColleges) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setShowWomenColleges(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showWomenColleges]);

  const field = 'w-full rounded-full border-2 border-gray-200 bg-white px-4 py-3 text-sm focus:border-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/30';

  return (
    <Layout
      title="Colleges Available"
      description="Explore engineering colleges in Tamil Nadu - Namakkal, Salem, Erode, and Coimbatore. Get expert guidance for college admissions from Rasi Foundation."
      keywords="engineering colleges Tamil Nadu, colleges in Namakkal, colleges in Salem, colleges in Erode, colleges in Coimbatore, TNEA counseling, engineering admission"
    >
      <PageBanner
        eyebrow="College Directory"
        title="Find the right college for your course"
        stats={[
          { value: allColleges.length, label: 'Colleges listed' },
          { value: zones.length, label: 'Zones / districts' },
        ]}
        actions={
          <>
            <button type="button" onClick={() => directoryRef.current?.scrollIntoView({ behavior: 'smooth' })} className="rf-btn-gold px-6 py-3">
              <FaSearch aria-hidden="true" /> Search Colleges
            </button>
            <Link href={ROUTES.counselling} className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">
              <FaCalendarCheck aria-hidden="true" /> Book Counselling
            </Link>
          </>
        }
        aside={
          <Reveal className="relative">
            <BannerCrop
              src="/images/banners/hero-5-students-today-leaders-tomorrow.png"
              alt="Students walking together on a college campus"
              region={{ x: 900, y: 80, w: 640, h: 560 }}
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="aspect-[8/7] rounded-[2.5rem] shadow-card-hover ring-8 ring-white/20"
            />
          </Reveal>
        }
      >
        Browse the colleges in the Rasi Foundation directory by zone, location and department, and talk to a counsellor before you decide.
      </PageBanner>

      {/* Automatic showcase of listed colleges (no logos are stored, so an icon is shown rather than an invented logo) */}
      {showcase.length > 0 && (
        <section aria-labelledby="college-showcase-heading" className="bg-[#fbfaf6] pb-6 pt-2">
          <div className="container mx-auto">
            <h2 id="college-showcase-heading" className="mb-4 font-heading text-2xl font-bold text-gray-900">Colleges in our directory</h2>
            <Marquee label="Colleges in our directory" speed={0.5} arrows>
              {showcase.map((c) => (
                <button
                  key={`${c.zone}-${c.name}`}
                  type="button"
                  onClick={() => jumpToCollege(c.name)}
                  aria-label={`Show ${c.name} in the directory`}
                  className="group flex h-36 w-52 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:w-56"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-xl text-forest transition-colors group-hover:bg-forest group-hover:text-white"><FaUniversity aria-hidden="true" /></span>
                  <span className="line-clamp-2 text-[13px] font-semibold leading-snug text-gray-900">{c.name}</span>
                  <span className="flex items-center gap-1 text-[11px] text-gray-600"><FaMapMarkerAlt className="text-crimson" aria-hidden="true" />{c.location}</span>
                </button>
              ))}
            </Marquee>
          </div>
        </section>
      )}

      {/* Directory */}
      <section ref={directoryRef} aria-labelledby="directory-heading" className="scroll-mt-24 bg-[#fbfaf6] py-12">
        <div className="container mx-auto">
          <p className="rf-eyebrow">Directory</p>
          <h2 id="directory-heading" className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">Search and filter colleges</h2>

          {/* Stream / Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {STREAMS.map((s) => {
              const isSelected = selectedStream === s.id;
              const count = s.id === 'all'
                ? allColleges.length
                : allColleges.filter((c) => (c.type || 'Engineering') === s.id).length;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStream(s.id)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-forest text-white shadow-sm ring-2 ring-forest ring-offset-2'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {s.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Combined Filters Panel */}
          <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-card space-y-3">
            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
              <div className="relative">
                <label htmlFor="college-search" className="sr-only">Search colleges by name, location, course or specialization</label>
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input
                  id="college-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by college name, city, branch, degree..."
                  className={`${field} pl-11`}
                />
              </div>

              <div>
                <label htmlFor="college-zone" className="sr-only">Filter by district</label>
                <select id="college-zone" value={zone} onChange={(e) => setZone(e.target.value)} className={field}>
                  <option value="all">All Tamil Nadu Districts & Zones ({allColleges.length})</option>
                  <optgroup label="Official Tamil Nadu Districts (38)">
                    {officialDistricts.map((d) => {
                      const count = allColleges.filter((c) => c.zone === d).length;
                      return (
                        <option key={d} value={d}>
                          {d} {count > 0 ? `(${count})` : ''}
                        </option>
                      );
                    })}
                  </optgroup>
                  {legacyZones.length > 0 && (
                    <optgroup label="Legacy Zones & Regional Clusters">
                      {legacyZones.map((z) => {
                        const count = allColleges.filter((c) => c.zone === z).length;
                        return (
                          <option key={z} value={z}>
                            {z} {count > 0 ? `(${count})` : ''}
                          </option>
                        );
                      })}
                    </optgroup>
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="college-inst-type" className="sr-only">Filter by institution type</label>
                <select
                  id="college-inst-type"
                  value={selectedInstitutionType}
                  onChange={(e) => setSelectedInstitutionType(e.target.value)}
                  className={field}
                >
                  {INSTITUTION_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-[1.2fr_1.2fr_auto] items-center pt-1 border-t border-gray-100">
              <div>
                <label htmlFor="college-specialization" className="sr-only">Filter by specialization</label>
                <select
                  id="college-specialization"
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className={field}
                >
                  <option value="all">All Specializations ({availableSpecializations.length})</option>
                  {availableSpecializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="college-course" className="sr-only">Filter by course or degree</label>
                <select
                  id="college-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={field}
                >
                  <option value="all">All Degrees / Courses Offered ({availableCourses.length})</option>
                  {availableCourses.map((crs) => (
                    <option key={crs} value={crs}>
                      {crs}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4 px-2">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={onlyTnea}
                    onChange={(e) => setOnlyTnea(e.target.checked)}
                    className="h-4 w-4 accent-forest"
                  />
                  Verified TNEA Code
                </label>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600" aria-live="polite">
            Showing {Math.min(shown.length, filtered.length)} of {filtered.length} colleges
            {isAnyFilterActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-3 font-semibold text-crimson underline"
              >
                Clear all filters
              </button>
            )}
          </p>

          {shown.length > 0 ? (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((c, i) => (
                <Reveal as="li" key={`${c.zone}-${c._id || c.name}`} delay={(i % 3) * 0.05} className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover">
                  <div className="flex items-start gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-xl text-forest"><FaUniversity aria-hidden="true" /></span>
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-sans text-base font-semibold leading-snug text-gray-900">{c.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600"><FaMapMarkerAlt className="shrink-0 text-xs text-crimson" aria-hidden="true" />{c.location}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">{c.type || 'Engineering'}</span>
                    {c.specialization && (
                      <span className="rounded-full bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
                        {c.specialization}
                      </span>
                    )}
                    {c.institutionType && (
                      <span className="rounded-full bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                        {c.institutionType}
                      </span>
                    )}
                    <span className="rounded-full bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest">{c.zone}</span>
                    {c.tneaStatus === 'verified' && c.tneaCode && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-700" title={`Verified TNEA Code: ${c.tneaCode}${c.tneaSourceYear ? ` (${c.tneaSourceYear})` : ''}`}>
                        <FaCode aria-hidden="true" /> TNEA {c.tneaCode}
                      </span>
                    )}
                    {c.tneaStatus === 'pending_verification' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800" title="TNEA counselling code pending verification">
                        <FaCode aria-hidden="true" /> TNEA Pending
                      </span>
                    )}
                    {c.note && <span className="rounded-full bg-crimson/10 px-2.5 py-0.5 text-xs font-semibold text-crimson">{c.note}</span>}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    {c.departments && c.departments.length > 0 && (
                      <button type="button" onClick={() => setSelectedCollege(c)} className="inline-flex items-center gap-2 rounded-full border border-forest px-4 py-2 text-xs font-semibold text-forest hover:bg-forest hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2">
                        View {c.departments.length} departments <FaArrowRight aria-hidden="true" />
                      </button>
                    )}
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                        <FaGlobe aria-hidden="true" /> Website
                      </a>
                    )}
                    <Link href={`/contact?college=${encodeURIComponent(c.name)}`} className="inline-flex items-center gap-2 text-xs font-semibold text-crimson hover:underline">
                      Enquire <FaArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-10 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-400"><FaSearch aria-hidden="true" /></span>
              <h3 className="font-sans text-lg font-semibold text-gray-900">No colleges found</h3>
              <p className="mt-1 text-sm text-gray-600">Try a different keyword or clear the filters.</p>
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="rf-btn-primary !rounded-full px-8 py-3">
                Load more colleges ({filtered.length - visible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Women-centric colleges (existing content) */}
      <section aria-labelledby="women-heading" className="bg-white py-10">
        <div className="container mx-auto">
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-gradient-to-r from-[#7d0a1f] via-crimson to-[#7d0a1f] p-6 text-white shadow-card-hover md:flex-row md:items-center md:p-8">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl"><FaFemale aria-hidden="true" /></span>
              <div>
                <h2 id="women-heading" className="font-heading text-xl font-bold md:text-2xl">Women-Centric Engineering Colleges</h2>
                <p className="text-sm text-white/80">Engineering institutions for women in Tamil Nadu.</p>
              </div>
            </div>
            <button type="button" onClick={() => setShowWomenColleges(true)} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-crimson hover:bg-gold-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-crimson">
              View Women Colleges <FaArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* College Selection & Regional Guidance */}
      <CollegeGuidance
        zones={zones}
        onSelectZone={(z) => {
          setZone(z);
          directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Bengaluru College Tie-Ups (existing component) */}
      <BengaluruColleges />

      {/* CTA */}
      <section aria-labelledby="colleges-cta" className="bg-white py-14">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-dark to-forest px-8 py-12 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <FaGraduationCap className="mx-auto mb-4 text-4xl text-gold-300" aria-hidden="true" />
            <h2 id="colleges-cta" className="font-heading text-3xl font-bold md:text-4xl">Need help choosing the right college?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/85">Talk to a counsellor about your marks, preferences and career goals before you apply.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-7 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
              <a href={`tel:${CONTACT.phoneTel}`} className="rf-btn border border-white/40 px-7 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-forest">Call {CONTACT.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Women-Centric Colleges dialog */}
      {showWomenColleges && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" onClick={() => setShowWomenColleges(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="women-dialog-title" className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-gradient-to-r from-[#7d0a1f] to-crimson p-6 pr-14 text-white">
              <button type="button" autoFocus onClick={() => setShowWomenColleges(false)} aria-label="Close dialog" className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"><FaTimes aria-hidden="true" /></button>
              <h2 id="women-dialog-title" className="font-heading text-2xl font-bold">Women-Centric Engineering Colleges</h2>
              <p className="text-sm text-white/80">Select a college to ask a counsellor about it.</p>
            </div>
            <ul className="space-y-3 overflow-y-auto p-6">
              {displayWomenColleges.map((college) => (
                <li key={college.name}>
                  <Link href={`/contact?college=${encodeURIComponent(college.name)}`} className="group block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all hover:border-gold-300 hover:shadow-card">
                    <h3 className="font-sans text-base font-semibold text-gray-900 group-hover:text-crimson">{college.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600"><FaMapMarkerAlt className="text-crimson" aria-hidden="true" />{college.location}</p>
                    {(college.departments || []).length > 0 && (
                      <p className="mt-2 flex flex-wrap gap-1.5">
                        {college.departments.map((d) => <span key={d} className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-700">{d}</span>)}
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-crimson">Enquire <FaArrowRight aria-hidden="true" /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedCollege && <CollegeModal college={selectedCollege} onClose={closeCollege} />}
    </Layout>
  );
}
