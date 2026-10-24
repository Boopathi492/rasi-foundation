import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  FaMapMarkerAlt, FaUniversity, FaCode, FaGraduationCap, FaFemale, FaArrowRight, FaTimes, FaSearch, FaCalendarCheck,
} from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import BengaluruColleges from '@/frontend/components/BengaluruColleges';
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


const PAGE_SIZE = 12;

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
          <h2 id="college-dialog-title" className="font-heading text-xl font-bold">{college.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-white/80"><FaMapMarkerAlt aria-hidden="true" /> {college.location}</p>
          {college.tneaCode && <p className="mt-1 text-sm text-white/80">TNEA Code: {college.tneaCode}</p>}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="mb-3 font-sans text-base font-semibold text-gray-900">
            Departments {departments.length > 0 && <span className="text-sm font-normal text-gray-500">({departments.length})</span>}
          </h3>
          {departments.length > 0 ? (
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700">
                  <FaGraduationCap className="shrink-0 text-forest" aria-hidden="true" /> {dept}
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-4 text-center text-sm text-gray-600">No department information is listed for this college yet.</p>
          )}
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
  const [showWomenColleges, setShowWomenColleges] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zone, setZone] = useState('all');
  const [onlyTnea, setOnlyTnea] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const directoryRef = useRef(null);

  // Flatten the zone groups; only real fields are used (name, location, zone, TNEA code, note, departments).
  const allColleges = useMemo(() => {
    const seen = new Set();
    const list = [];
    (collegesData || []).forEach((group) => {
      (group.colleges || []).forEach((c) => {
        const key = `${group.district}|${(c.name || '').toLowerCase()}`;
        if (!c.name || seen.has(key)) return;
        seen.add(key);
        list.push({ ...c, zone: group.district });
      });
    });
    return list;
  }, [collegesData]);

  const zones = useMemo(() => [...new Set(allColleges.map((c) => c.zone))], [allColleges]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return allColleges.filter((c) => {
      if (zone !== 'all' && c.zone !== zone) return false;
      if (onlyTnea && !c.tneaCode) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        (c.location || '').toLowerCase().includes(q) ||
        (c.departments || []).some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [allColleges, searchTerm, zone, onlyTnea]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [searchTerm, zone, onlyTnea]);

  const shown = filtered.slice(0, visible);
  const showcase = allColleges.filter((c) => !/bengaluru|bangalore/i.test(`${c.zone} ${c.location}`)).slice(0, 24);
  const closeCollege = useCallback(() => setSelectedCollege(null), []);

  const jumpToCollege = (name) => {
    setSearchTerm(name);
    setZone('all');
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

          <div className="mt-6 grid gap-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-card md:grid-cols-[1.6fr_1fr_auto] md:items-center">
            <div className="relative">
              <label htmlFor="college-search" className="sr-only">Search colleges by name, location or department</label>
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input id="college-search" type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by college, location or department" className={`${field} pl-11`} />
            </div>
            <div>
              <label htmlFor="college-zone" className="sr-only">Filter by zone or district</label>
              <select id="college-zone" value={zone} onChange={(e) => setZone(e.target.value)} className={field}>
                <option value="all">All zones and districts</option>
                {zones.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <label className="flex cursor-pointer items-center gap-2 px-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={onlyTnea} onChange={(e) => setOnlyTnea(e.target.checked)} className="h-4 w-4 accent-forest" />
              Has TNEA code
            </label>
          </div>

          <p className="mt-4 text-sm text-gray-600" aria-live="polite">
            Showing {Math.min(shown.length, filtered.length)} of {filtered.length} colleges
            {(searchTerm || zone !== 'all' || onlyTnea) && (
              <button type="button" onClick={() => { setSearchTerm(''); setZone('all'); setOnlyTnea(false); }} className="ml-3 font-semibold text-crimson underline">Clear filters</button>
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
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest">{c.zone}</span>
                    {c.tneaCode && <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-1 text-xs font-semibold text-gold-600"><FaCode aria-hidden="true" /> TNEA {c.tneaCode}</span>}
                    {c.note && <span className="rounded-full bg-crimson/10 px-2.5 py-1 text-xs font-semibold text-crimson">{c.note}</span>}
                  </div>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                    {c.departments && c.departments.length > 0 && (
                      <button type="button" onClick={() => setSelectedCollege(c)} className="inline-flex items-center gap-2 rounded-full border border-forest px-4 py-2 text-xs font-semibold text-forest hover:bg-forest hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2">
                        View {c.departments.length} departments <FaArrowRight aria-hidden="true" />
                      </button>
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
