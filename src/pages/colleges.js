import { useState, useEffect } from 'react';
import Layout from '@/frontend/components/Layout';
import BengaluruColleges from '@/frontend/components/BengaluruColleges';
import Link from 'next/link';
import { FaMapMarkerAlt, FaUniversity, FaCode, FaGraduationCap, FaSpinner, FaFemale, FaArrowRight, FaTimes, FaSearch } from 'react-icons/fa';
import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';

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

const districtColors = {
  'Namakkal District': 'from-red-500 to-red-600',
  'Salem District': 'from-green-500 to-green-600',
  'Erode District': 'from-blue-500 to-blue-600',
  'Coimbatore Zone': 'from-purple-500 to-purple-600',
  'Bengaluru Zone': 'from-indigo-500 to-indigo-600',
  'Women Centric Colleges': 'from-pink-500 to-rose-600',
  'Well Connected Universities': 'from-teal-500 to-cyan-600',
};

// Use Static Site Generation with Incremental Static Regeneration for faster loading
export async function getStaticProps() {
  try {
    await dbConnect();

    const colleges = await College.find({ isActive: true })
      .sort({ district: 1, order: 1, name: 1 })
      .lean();

    // Group colleges by district
    const groupedColleges = colleges.reduce((acc, college) => {
      const district = college.district;
      if (!acc[district]) {
        acc[district] = [];
      }
      acc[district].push({
        _id: college._id.toString(),
        name: college.name,
        location: college.location,
        tneaCode: college.tneaCode || '',
        note: college.note || '',
        departments: college.departments || [],
      });
      return acc;
    }, {});

    // MERGE logic: If DB has data, it overlays/augments fallbackData
    // Create a map of districts from fallback for easy lookup
    const dataMap = {};
    fallbackData.forEach(d => {
      dataMap[d.district] = [...d.colleges];
    });

    // Overlay DB data
    Object.keys(groupedColleges).forEach(district => {
      // If the district exists in DB, we use DB data for that district
      // BUT if the user just added ONE college, we might want to APPEND instead of REPLACE?
      // For now, if a district has entries in DB, we use the DB as source of truth for THAT district.
      dataMap[district] = groupedColleges[district];
    });

    const collegesData = Object.keys(dataMap).map(district => ({
      district,
      colleges: dataMap[district]
    }));

    return {
      props: {
        collegesData: collegesData,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return {
      props: {
        collegesData: fallbackData,
      },
      revalidate: 60,
    };
  }
}

export default function Colleges({ collegesData }) {
  const [showWomenColleges, setShowWomenColleges] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter colleges based on search term
  const filteredCollegesData = collegesData.map(district => ({
    ...district,
    colleges: district.colleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (college.departments && college.departments.some(dept => dept.toLowerCase().includes(searchTerm.toLowerCase())))
    )
  })).filter(district => district.colleges.length > 0);

  const totalColleges = collegesData.reduce((acc, district) => acc + district.colleges.length, 0);

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


  return (
    <Layout
      title="Colleges Available"
      description="Explore top engineering colleges in Tamil Nadu - Namakkal, Salem, Erode, and Coimbatore districts. Get expert guidance for college admissions from Rasi Foundation."
      keywords="engineering colleges Tamil Nadu, colleges in Namakkal, colleges in Salem, colleges in Erode, colleges in Coimbatore, TNEA counseling, engineering admission"
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-green-700 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaUniversity className="text-amber-300" />
              <span className="text-sm font-medium">Partner Institutions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Colleges <span className="text-amber-300">Available</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Explore {totalColleges}+ Top Engineering Colleges across Tamil Nadu
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">{collegesData.length}</span>
                <p className="text-sm">Districts</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">{totalColleges}+</span>
                <p className="text-sm">Colleges</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-amber-300">100%</span>
                <p className="text-sm">Guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Women-Centric Colleges Highlight Banner */}
      <section className="py-8 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce-slow">
                <FaFemale className="text-3xl text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  🌸 Women-Centric Engineering Colleges
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  Discover exclusive engineering institutions for women in Tamil Nadu
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowWomenColleges(true)}
              className="group flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-xl font-bold hover:bg-pink-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>View Women Colleges</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Sparkle decorations */}
        <div className="absolute top-2 left-10 text-white/30 text-2xl">✦</div>
        <div className="absolute bottom-2 right-16 text-white/30 text-xl">✦</div>
        <div className="absolute top-1/2 right-1/3 text-white/20 text-lg">✦</div>
      </section>

      {/* Bengaluru College Tie-Ups */}
      <BengaluruColleges />

      {/* Colleges by District */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search colleges, locations, or departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 rounded-full border-2 border-gray-200 focus:border-red-500 focus:outline-none shadow-sm text-lg transition-colors"
              />
              <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>

          {filteredCollegesData.length > 0 ? (
            filteredCollegesData.map((district, districtIndex) => (
              <div key={districtIndex} className="mb-12 last:mb-0">
                {/* District Header */}
                <div className={`bg-gradient-to-r ${districtColors[district.district] || 'from-gray-500 to-gray-600'} text-white rounded-2xl p-6 mb-6 shadow-lg`}>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-2xl" />
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {district.district} – Engineering Colleges
                    </h2>
                  </div>
                  <p className="mt-2 text-white/80">
                    {district.colleges.length} institutions available
                  </p>
                </div>

                {/* Colleges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {district.colleges.map((college, collegeIndex) => (
                    <div
                      key={college._id || collegeIndex}
                      className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-1 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${districtColors[district.district] || 'from-gray-500 to-gray-600'} text-white rounded-lg flex items-center justify-center font-bold text-sm`}>
                          {collegeIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => setSelectedCollege({ ...college, districtColor: districtColors[district.district] })}
                            className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 text-left hover:underline cursor-pointer"
                          >
                            {college.name}
                          </button>
                          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <FaMapMarkerAlt className="text-xs text-red-500" />
                            <span>{college.location}</span>
                          </div>
                          {college.tneaCode && (
                            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                              <FaCode className="text-xs text-blue-500" />
                              <span>TNEA Code: <strong className="text-blue-600">{college.tneaCode}</strong></span>
                            </div>
                          )}
                          {college.note && (
                            <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              {college.note}
                            </span>
                          )}

                          {/* View Departments Button */}
                          {college.departments && college.departments.length > 0 && (
                            <button
                              onClick={() => setSelectedCollege({ ...college, districtColor: districtColors[district.district] })}
                              className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                              📚 View {college.departments.length} Departments
                              <FaArrowRight className="text-xs" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No colleges found</h3>
              <p className="text-gray-500">
                We couldn&apos;t find any colleges matching &quot;{searchTerm}&quot;. Try a different keyword.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaGraduationCap className="text-5xl mx-auto mb-6 text-amber-300" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right College?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert counselors. We&apos;ll help you find the perfect college based on your rank, preferences, and career goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Free Counseling
            </Link>
            <a
              href="tel:+919789446100"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Call: +91 97894 46100
            </a>
          </div>
        </div>
      </section>

      {/* Women-Centric Colleges Modal */}
      {showWomenColleges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-6 text-white relative">
              <button
                onClick={() => setShowWomenColleges(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FaFemale className="text-3xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">🌸 Women-Centric Engineering Colleges</h2>
                  <p className="text-white/80">Exclusive institutions for women in Tamil Nadu</p>
                </div>
              </div>
            </div>

            {/* Modal Body - Colleges List */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-sm text-gray-500 mb-4 text-center">Click on any college to get counseling</p>
              <div className="space-y-4">
                {displayWomenColleges.map((college, index) => (
                  <Link
                    key={index}
                    href={`/contact?college=${encodeURIComponent(college.name)}`}
                    className="group block p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-pink-700 transition-colors text-lg">
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                          <FaMapMarkerAlt className="text-pink-500" />
                          <span>{college.location}</span>
                        </div>

                        {/* Departments */}
                        <div className="mt-3">
                          <p className="text-xs text-gray-500 font-medium mb-2">📚 Departments Available:</p>
                          <div className="flex flex-wrap gap-2">
                            {(college.departments || []).map((dept, deptIndex) => (
                              <span
                                key={deptIndex}
                                className="inline-flex items-center text-xs bg-white text-purple-700 px-2 py-1 rounded-full border border-purple-200"
                              >
                                {dept}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Click indicator */}
                        <div className="mt-3 flex items-center gap-2 text-pink-600 text-sm font-medium">
                          <span>Get Counseling</span>
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Total Count */}
              <div className="mt-6 text-center">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
                  <FaUniversity />
                  Total: {displayWomenColleges.length} Colleges
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => setShowWomenColleges(false)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* College Departments Modal */}
      {selectedCollege && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedCollege(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${selectedCollege.districtColor || 'from-red-500 to-red-600'} p-6 text-white relative`}>
              <button
                onClick={() => setSelectedCollege(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
              <div className="flex items-center gap-4 pr-10">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <FaUniversity className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedCollege.name}</h2>
                  <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                    <FaMapMarkerAlt />
                    <span>{selectedCollege.location}</span>
                  </div>
                  {selectedCollege.tneaCode && (
                    <div className="flex items-center gap-1 text-white/80 text-sm mt-1">
                      <FaCode />
                      <span>TNEA Code: {selectedCollege.tneaCode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body - Departments List */}
            <div className="p-6 overflow-y-auto flex-1" style={{ maxHeight: '60vh' }}>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                📚 Departments Available
                <span className="text-sm font-normal text-gray-500">
                  ({selectedCollege.departments?.length || 0} courses)
                </span>
              </h3>

              {selectedCollege.departments && selectedCollege.departments.length > 0 ? (
                <div className="space-y-3">
                  {selectedCollege.departments.map((dept, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${selectedCollege.districtColor || 'from-red-500 to-red-600'} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-700">{dept}</span>
                      <FaGraduationCap className="ml-auto text-gray-400" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No department information available</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setSelectedCollege(null)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300"
              >
                Close
              </button>
              <Link
                href="/contact"
                className={`flex-1 bg-gradient-to-r ${selectedCollege.districtColor || 'from-red-500 to-red-600'} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-center`}
              >
                Get Counseling
              </Link>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
