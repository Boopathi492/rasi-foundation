import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaHospital, FaStethoscope, FaLeaf, FaFlask, FaLaptopCode, FaCog, FaBuilding, FaSeedling, FaChartLine, FaCalculator, FaBalanceScale, FaChalkboardTeacher, FaBook, FaCompass, FaClipboardCheck, FaUniversity, FaSearch, FaCalendarCheck, FaArrowRight, FaClock, FaCheckCircle, FaGraduationCap, FaPhone } from 'react-icons/fa';
import Layout from '@/frontend/components/Layout';
import PageBanner from '@/frontend/components/PageBanner';
import Faq from '@/frontend/components/Faq';
import Reveal from '@/frontend/components/home/Reveal';
import BannerCrop from '@/frontend/components/home/BannerCrop';
import CourseGuidance from '@/frontend/components/courses/CourseGuidance';
import { CONTACT, ROUTES } from '@/data/siteConfig';

// Course records (unchanged from the previous page).
const COURSES = [
  // Medical Courses
  {
    id: 1,
    name: 'MBBS',
    fullName: 'Bachelor of Medicine, Bachelor of Surgery',
    category: 'medical',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Become a qualified medical doctor with this comprehensive undergraduate medical degree.',
    icon: FaHospital,
    color: 'red'
  },
  {
    id: 2,
    name: 'BDS',
    fullName: 'Bachelor of Dental Surgery',
    category: 'medical',
    duration: '5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Pursue a career in dentistry and oral healthcare with this professional degree.',
    icon: FaStethoscope,
    color: 'red'
  },
  {
    id: 3,
    name: 'BAMS',
    fullName: 'Bachelor of Ayurvedic Medicine and Surgery',
    category: 'medical',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Study traditional Ayurvedic medicine and holistic healthcare practices.',
    icon: FaLeaf,
    color: 'red'
  },
  {
    id: 4,
    name: 'BHMS',
    fullName: 'Bachelor of Homeopathic Medicine and Surgery',
    category: 'medical',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Learn homeopathic medicine and alternative treatment approaches.',
    icon: FaLeaf,
    color: 'red'
  },
  {
    id: 5,
    name: 'BSMS',
    fullName: 'Bachelor of Siddha Medicine and Surgery',
    category: 'medical',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Study traditional Siddha medicine originating from Tamil Nadu.',
    icon: FaLeaf,
    color: 'red'
  },
  {
    id: 6,
    name: 'BNYS',
    fullName: 'Bachelor of Naturopathy and Yogic Sciences',
    category: 'medical',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Combine naturopathy with yoga for holistic healthcare treatment.',
    icon: FaLeaf,
    color: 'red'
  },
  {
    id: 7,
    name: 'B.Sc Nursing',
    fullName: 'Bachelor of Science in Nursing',
    category: 'medical',
    duration: '4 years',
    eligibility: '10+2 with PCB, 45% minimum',
    description: 'Prepare for a rewarding career in patient care and nursing practice.',
    icon: FaHospital,
    color: 'red'
  },
  {
    id: 8,
    name: 'B.Pharm',
    fullName: 'Bachelor of Pharmacy',
    category: 'medical',
    duration: '4 years',
    eligibility: '10+2 with PCM/PCB',
    description: 'Study pharmaceutical sciences, drug formulation, and pharmacology.',
    icon: FaFlask,
    color: 'red'
  },
  {
    id: 9,
    name: 'BPT',
    fullName: 'Bachelor of Physiotherapy',
    category: 'medical',
    duration: '4.5 years',
    eligibility: '10+2 with PCB, 50% minimum',
    description: 'Learn physical rehabilitation and therapeutic movement techniques.',
    icon: FaStethoscope,
    color: 'red'
  },
  {
    id: 10,
    name: 'B.Sc MLT',
    fullName: 'B.Sc Medical Laboratory Technology',
    category: 'medical',
    duration: '3 years',
    eligibility: '10+2 with PCB',
    description: 'Train in diagnostic testing and laboratory analysis techniques.',
    icon: FaFlask,
    color: 'red'
  },
  {
    id: 11,
    name: 'B.Sc Radiology',
    fullName: 'B.Sc Radiology & Imaging Technology',
    category: 'medical',
    duration: '3 years',
    eligibility: '10+2 with PCB',
    description: 'Learn medical imaging including X-ray, CT, MRI, and ultrasound.',
    icon: FaHospital,
    color: 'red'
  },
  {
    id: 12,
    name: 'B.Sc OT Technology',
    fullName: 'B.Sc Operation Theatre & Anaesthesia Technology',
    category: 'medical',
    duration: '3 years',
    eligibility: '10+2 with PCB',
    description: 'Assist surgeons and manage operation theatre procedures.',
    icon: FaHospital,
    color: 'red'
  },
  {
    id: 13,
    name: 'B.Sc Cardiac Technology',
    fullName: 'B.Sc Cardiac Care & Perfusion Technology',
    category: 'medical',
    duration: '3-4 years',
    eligibility: '10+2 with PCB',
    description: 'Specialization in cardiac diagnostics and heart-lung machine operation.',
    icon: FaStethoscope,
    color: 'red'
  },
  {
    id: 14,
    name: 'B.Sc Dialysis Technology',
    fullName: 'B.Sc Renal Dialysis Technology',
    category: 'medical',
    duration: '3 years',
    eligibility: '10+2 with PCB',
    description: 'Specialize in kidney dialysis treatment and renal care.',
    icon: FaHospital,
    color: 'red'
  },
  {
    id: 15,
    name: 'Physician Assistant',
    fullName: 'B.Sc Physician Assistant',
    category: 'medical',
    duration: '3 years',
    eligibility: '10+2 with PCB',
    description: 'Train to assist physicians in diagnosis and patient management.',
    icon: FaStethoscope,
    color: 'red'
  },
  {
    id: 16,
    name: 'B.Sc Optometry',
    fullName: 'Bachelor of Optometry',
    category: 'medical',
    duration: '4 years',
    eligibility: '10+2 with PCB/PCM',
    description: 'Study eye care, vision correction, and optical science.',
    icon: FaStethoscope,
    color: 'red'
  },

  // Engineering Courses
  {
    id: 17,
    name: 'B.E. CSE',
    fullName: 'B.E. Computer Science and Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Core computer science covering programming, algorithms, databases, and software development.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 18,
    name: 'B.E. CSE (AI & ML)',
    fullName: 'CSE - Artificial Intelligence & Machine Learning',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Specialize in AI, machine learning, deep learning, and intelligent systems.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 19,
    name: 'B.Tech AI & DS',
    fullName: 'B.Tech Artificial Intelligence & Data Science',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Focus on data analytics, big data, AI applications, and data-driven solutions.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 20,
    name: 'B.E. Cyber Security',
    fullName: 'B.E. CSE (Cyber Security)',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Learn network security, ethical hacking, cryptography, and digital forensics.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 21,
    name: 'B.E. IoT',
    fullName: 'B.E. CSE (Internet of Things)',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Connected devices, sensors, embedded systems, and smart technology.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 22,
    name: 'B.Tech IT',
    fullName: 'B.Tech Information Technology',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Information systems, networking, web technologies, and IT infrastructure.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 23,
    name: 'B.E. ECE',
    fullName: 'B.E. Electronics & Communication Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Electronic circuits, communication systems, VLSI, and embedded systems.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 24,
    name: 'B.E. EEE',
    fullName: 'B.E. Electrical & Electronics Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Power systems, electrical machines, control systems, and renewable energy.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 25,
    name: 'B.E. Mechanical',
    fullName: 'B.E. Mechanical Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Design, manufacturing, thermodynamics, and mechanical systems.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 26,
    name: 'B.E. Civil',
    fullName: 'B.E. Civil Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Structural engineering, construction, transportation, and infrastructure.',
    icon: FaBuilding,
    color: 'blue'
  },
  {
    id: 27,
    name: 'B.E. Mechatronics',
    fullName: 'B.E. Mechatronics Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Integration of mechanical, electronics, and computer engineering.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 28,
    name: 'B.E. Robotics',
    fullName: 'B.E. Robotics & Automation',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Industrial robots, automation systems, and intelligent manufacturing.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 29,
    name: 'B.E. Biomedical',
    fullName: 'B.E. Biomedical Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM/PCB, TNEA/JEE',
    description: 'Medical devices, healthcare technology, and biological systems.',
    icon: FaStethoscope,
    color: 'blue'
  },
  {
    id: 30,
    name: 'B.E. Aeronautical',
    fullName: 'B.E. Aeronautical Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Aircraft design, propulsion systems, and aerospace technology.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 31,
    name: 'B.Tech Biotechnology',
    fullName: 'B.Tech Biotechnology',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM/PCB, TNEA/JEE',
    description: 'Genetic engineering, bioinformatics, and bioprocess technology.',
    icon: FaFlask,
    color: 'blue'
  },
  {
    id: 32,
    name: 'B.Tech Chemical',
    fullName: 'B.Tech Chemical Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Chemical processes, plant design, and process engineering.',
    icon: FaFlask,
    color: 'blue'
  },
  {
    id: 33,
    name: 'B.Tech Food Tech',
    fullName: 'B.Tech Food Technology',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM/PCB, TNEA/JEE',
    description: 'Food processing, preservation, quality control, and food safety.',
    icon: FaSeedling,
    color: 'blue'
  },
  {
    id: 34,
    name: 'B.E. VLSI',
    fullName: 'B.E. VLSI Design & Technology',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'Chip design, integrated circuits, and semiconductor technology.',
    icon: FaCog,
    color: 'blue'
  },
  {
    id: 35,
    name: 'B.Tech CSBS',
    fullName: 'B.Tech Computer Science & Business Systems',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM, TNEA/JEE',
    description: 'TCS-sponsored program combining CS with business analytics.',
    icon: FaLaptopCode,
    color: 'blue'
  },
  {
    id: 36,
    name: 'B.Tech Agriculture',
    fullName: 'B.Tech Agricultural Engineering',
    category: 'engineering',
    duration: '4 years',
    eligibility: '10+2 with PCM/PCB, TNEA/JEE',
    description: 'Farm machinery, irrigation systems, and agricultural technology.',
    icon: FaSeedling,
    color: 'blue'
  },
  {
    id: 37,
    name: 'B.Arch',
    fullName: 'Bachelor of Architecture',
    category: 'engineering',
    duration: '5 years',
    eligibility: '10+2 with Maths, NATA Qualified',
    description: 'Design buildings and spaces with this professional architecture degree.',
    icon: FaBuilding,
    color: 'blue'
  },
  {
    id: 38,
    name: 'Polytechnic',
    fullName: 'Diploma in Engineering',
    category: 'engineering',
    duration: '3 years',
    eligibility: '10th Pass',
    description: 'Technical diploma courses in various engineering branches.',
    icon: FaCog,
    color: 'blue'
  },

  // Management Courses
  {
    id: 39,
    name: 'MBA',
    fullName: 'Master of Business Administration',
    category: 'management',
    duration: '2 years',
    eligibility: 'Any Degree, CAT/MAT/TANCET',
    description: 'Advanced management degree with Finance, Marketing, HR, Operations specializations.',
    icon: FaChartLine,
    color: 'green'
  },
  {
    id: 40,
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    category: 'management',
    duration: '3 years',
    eligibility: '10+2 Pass',
    description: 'Undergraduate degree in business management and administration.',
    icon: FaChartLine,
    color: 'green'
  },
  {
    id: 41,
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    category: 'management',
    duration: '2 years',
    eligibility: 'BCA or Any Degree with Maths',
    description: 'Advanced computer science and applications program.',
    icon: FaLaptopCode,
    color: 'green'
  },
  {
    id: 42,
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    category: 'management',
    duration: '3 years',
    eligibility: '10+2 Pass',
    description: 'Undergraduate computer science program with practical applications.',
    icon: FaLaptopCode,
    color: 'green'
  },
  {
    id: 43,
    name: 'CA',
    fullName: 'Chartered Accountancy',
    category: 'management',
    duration: '3-5 years',
    eligibility: '10+2 Pass / Commerce Graduate',
    description: 'Prestigious professional course in accounting, taxation, and finance.',
    icon: FaCalculator,
    color: 'green'
  },
  {
    id: 44,
    name: 'B.Com',
    fullName: 'Bachelor of Commerce',
    category: 'management',
    duration: '3 years',
    eligibility: '10+2 Pass',
    description: 'Study accounting, economics, business law, and commerce.',
    icon: FaCalculator,
    color: 'green'
  },
  {
    id: 45,
    name: 'M.Com',
    fullName: 'Master of Commerce',
    category: 'management',
    duration: '2 years',
    eligibility: 'B.Com Degree',
    description: 'Advanced studies in commerce, accounting, and financial management.',
    icon: FaCalculator,
    color: 'green'
  },

  // Law Courses
  {
    id: 46,
    name: 'BA LLB',
    fullName: 'Integrated BA LLB (Hons)',
    category: 'law',
    duration: '5 years',
    eligibility: '10+2 Pass, CLAT/LSAT',
    description: '5-year integrated law program combining Arts with Law.',
    icon: FaBalanceScale,
    color: 'purple'
  },
  {
    id: 47,
    name: 'BBA LLB',
    fullName: 'Integrated BBA LLB (Hons)',
    category: 'law',
    duration: '5 years',
    eligibility: '10+2 Pass, CLAT/LSAT',
    description: 'Integrated program combining Business Administration with Law.',
    icon: FaBalanceScale,
    color: 'purple'
  },
  {
    id: 48,
    name: 'LLB',
    fullName: 'Bachelor of Laws (3 Years)',
    category: 'law',
    duration: '3 years',
    eligibility: 'Any Bachelor\'s Degree',
    description: 'Professional law degree for graduates from any discipline.',
    icon: FaBalanceScale,
    color: 'purple'
  },
  {
    id: 49,
    name: 'LLM',
    fullName: 'Master of Laws',
    category: 'law',
    duration: '1-2 years',
    eligibility: 'LLB Degree',
    description: 'Postgraduate specialization in various branches of law.',
    icon: FaBalanceScale,
    color: 'purple'
  },

  // Education Courses
  {
    id: 50,
    name: 'B.Ed',
    fullName: 'Bachelor of Education',
    category: 'education',
    duration: '2 years',
    eligibility: 'Any Degree, TET Qualified',
    description: 'Become a qualified teacher with this professional education degree.',
    icon: FaChalkboardTeacher,
    color: 'amber'
  },
  {
    id: 51,
    name: 'M.Ed',
    fullName: 'Master of Education',
    category: 'education',
    duration: '2 years',
    eligibility: 'B.Ed Degree',
    description: 'Advanced degree in education for teaching and research.',
    icon: FaBook,
    color: 'amber'
  },
  {
    id: 52,
    name: 'D.T.Ed',
    fullName: 'Diploma in Teacher Education',
    category: 'education',
    duration: '2 years',
    eligibility: '10+2 Pass',
    description: 'Diploma course for primary school teaching.',
    icon: FaChalkboardTeacher,
    color: 'amber'
  },
  {
    id: 53,
    name: 'D.El.Ed',
    fullName: 'Diploma in Elementary Education',
    category: 'education',
    duration: '2 years',
    eligibility: '10+2 Pass',
    description: 'Prepare for teaching at elementary school level.',
    icon: FaChalkboardTeacher,
    color: 'amber'
  },

  // Arts & Science
  {
    id: 54,
    name: 'B.Sc',
    fullName: 'Bachelor of Science',
    category: 'arts',
    duration: '3 years',
    eligibility: '10+2 with Science',
    description: 'Physics, Chemistry, Mathematics, Biology, Computer Science and more.',
    icon: FaFlask,
    color: 'teal'
  },
  {
    id: 55,
    name: 'B.A.',
    fullName: 'Bachelor of Arts',
    category: 'arts',
    duration: '3 years',
    eligibility: '10+2 Pass',
    description: 'English, Tamil, History, Political Science, Economics and more.',
    icon: FaBook,
    color: 'teal'
  },
  {
    id: 56,
    name: 'M.Sc',
    fullName: 'Master of Science',
    category: 'arts',
    duration: '2 years',
    eligibility: 'B.Sc in relevant subject',
    description: 'Postgraduate science programs in various specializations.',
    icon: FaFlask,
    color: 'teal'
  },
  {
    id: 57,
    name: 'M.A.',
    fullName: 'Master of Arts',
    category: 'arts',
    duration: '2 years',
    eligibility: 'B.A. in relevant subject',
    description: 'Postgraduate arts and humanities programs.',
    icon: FaBook,
    color: 'teal'
  },

  // Agriculture
  {
    id: 58,
    name: 'B.Sc Agriculture',
    fullName: 'B.Sc (Hons) Agriculture',
    category: 'agriculture',
    duration: '4 years',
    eligibility: '10+2 with PCB/PCM',
    description: 'Study agricultural sciences, crop production, and farm management.',
    icon: FaSeedling,
    color: 'emerald'
  },
  {
    id: 59,
    name: 'B.Sc Horticulture',
    fullName: 'B.Sc Horticulture',
    category: 'agriculture',
    duration: '4 years',
    eligibility: '10+2 with PCB',
    description: 'Cultivation of fruits, vegetables, and ornamental plants.',
    icon: FaSeedling,
    color: 'emerald'
  },
  {
    id: 60,
    name: 'B.Sc Forestry',
    fullName: 'B.Sc Forestry',
    category: 'agriculture',
    duration: '4 years',
    eligibility: '10+2 with PCB',
    description: 'Forest management, conservation, and environmental science.',
    icon: FaSeedling,
    color: 'emerald'
  },
  {
    id: 61,
    name: 'B.V.Sc',
    fullName: 'Bachelor of Veterinary Science',
    category: 'agriculture',
    duration: '5.5 years',
    eligibility: '10+2 with PCB, NEET Qualified',
    description: 'Become a veterinary doctor for animal healthcare and surgery.',
    icon: FaLeaf,
    color: 'emerald'
  },
];

const PAGE_SIZE = 12;

// Category cards: label, icon and a photo crop from the supplied banners (4:3 regions on the 2000x750 grid).
const CATEGORIES = [
  { id: 'medical', name: 'Medical', icon: FaStethoscope, src: '/images/banners/hero-2-right-guidance.png', region: { x: 880, y: 60, w: 320, h: 240 } },
  { id: 'engineering', name: 'Engineering', icon: FaCog, src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', region: { x: 1260, y: 270, w: 440, h: 330 } },
  { id: 'management', name: 'Management', icon: FaChartLine, src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', region: { x: 880, y: 260, w: 480, h: 360 } },
  { id: 'arts', name: 'Arts & Science', icon: FaFlask, src: '/images/banners/hero-5-students-today-leaders-tomorrow.png', region: { x: 900, y: 30, w: 480, h: 360 } },
  { id: 'law', name: 'Law', icon: FaBalanceScale, src: '/images/banners/hero-4-step-into-brighter-future.png', region: { x: 810, y: 70, w: 280, h: 210 } },
  { id: 'education', name: 'Education', icon: FaChalkboardTeacher, src: '/images/banners/hero-4-step-into-brighter-future.png', region: { x: 1150, y: 380, w: 360, h: 270 } },
  { id: 'agriculture', name: 'Agriculture', icon: FaSeedling, src: '/images/banners/hero-2-right-guidance.png', region: { x: 1490, y: 390, w: 300, h: 225 } },
];

const CATEGORY_NAME = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.name]));
const find = (name) => COURSES.find((c) => c.name === name);

const GUIDANCE = [
  { icon: FaCompass, title: 'Choose a course', text: 'A counsellor talks through your marks, interests and goals so you can shortlist courses that fit you.', href: ROUTES.counselling, cta: 'Book Counselling' },
  { icon: FaClipboardCheck, title: 'Understand eligibility', text: 'Each course card lists the eligibility requirement, such as 10+2 subjects or an entrance exam, so you know what is needed.', href: '#course-discovery', cta: 'Check eligibility' },
  { icon: FaUniversity, title: 'Explore colleges', text: 'Browse the colleges in our directory by zone and department, then ask us about the ones you like.', href: '/colleges', cta: 'Browse Colleges' },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [duration, setDuration] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const discoveryRef = useRef(null);

  const durations = useMemo(() => [...new Set(COURSES.map((c) => c.duration))], []);

  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COURSES.filter((course) => {
      if (activeCategory !== 'all' && course.category !== activeCategory) return false;
      if (duration !== 'all' && course.duration !== duration) return false;
      if (!q) return true;
      return course.name.toLowerCase().includes(q) || course.fullName.toLowerCase().includes(q) || course.eligibility.toLowerCase().includes(q);
    });
  }, [activeCategory, searchQuery, duration]);

  useEffect(() => { setVisible(PAGE_SIZE); }, [activeCategory, searchQuery, duration]);

  const chooseCategory = (id) => {
    setActiveCategory(id);
    discoveryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const clearFilters = () => { setActiveCategory('all'); setSearchQuery(''); setDuration('all'); };
  const filtersActive = activeCategory !== 'all' || searchQuery || duration !== 'all';

  // Answers quote the course data above so they cannot drift from the cards.
  const mbbs = find('MBBS');
  const be = COURSES.find((c) => c.category === 'engineering');
  const faqs = [
    { q: 'How do I find the right course?', a: 'Use the search and filters on this page to compare courses by category, duration and eligibility. For personal advice, book a counselling session and a counsellor will talk through your marks and interests.' },
    ...(mbbs ? [{ q: 'What does a medical course such as MBBS require?', a: `As listed on this page, ${mbbs.name} (${mbbs.fullName}) takes ${mbbs.duration} and its eligibility is: ${mbbs.eligibility}.` }] : []),
    ...(be ? [{ q: `What is the eligibility for ${be.name}?`, a: `As listed on this page, ${be.name} (${be.fullName}) takes ${be.duration} and its eligibility is: ${be.eligibility}.` }] : []),
    { q: 'Can Rasi Foundation guarantee admission?', a: 'No. We provide information and guidance on courses, colleges, admission steps and scholarships. Admission and scholarship decisions are made by the institutions and awarding bodies under their own rules.' },
    { q: 'Where can I see colleges offering these courses?', a: 'Open the College Directory to search colleges by name, location and department, then enquire about the ones that interest you.' },
    { q: 'How do I book a counselling session?', a: 'Use any Book Counselling button on this site. It opens the counselling booking form where you share your details.' },
  ];

  const field = 'w-full rounded-full border-2 border-gray-200 bg-white px-4 py-3 text-sm focus:border-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/30';

  return (
    <Layout
      title="Courses"
      description="Explore courses in medical, engineering, management, law, education, arts & science and agriculture with Rasi Foundation's career guidance."
      keywords="courses after 12th, MBBS, engineering courses, MBA, law courses, B.Ed, arts and science courses Tamil Nadu"
    >
      {/* 1. Hero */}
      <PageBanner
        eyebrow="Course Discovery"
        title="Discover the course that fits your future"
        tone="maroon"
        stats={[
          { value: COURSES.length, label: 'Courses listed' },
          { value: CATEGORIES.length, label: 'Categories' },
        ]}
        actions={
          <>
            <button type="button" onClick={() => discoveryRef.current?.scrollIntoView({ behavior: 'smooth' })} className="rf-btn-gold px-6 py-3"><FaSearch aria-hidden="true" /> Explore Courses</button>
            <Link href={ROUTES.counselling} className="rf-btn border border-white/40 px-6 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-crimson"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
          </>
        }
        aside={
          <Reveal>
            <BannerCrop
              src="/images/banners/hero-3-explore-perfect-course.png"
              alt="A smiling student holding books on a college campus"
              region={{ x: 930, y: 30, w: 360, h: 432 }}
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="mx-auto aspect-[5/6] max-h-[420px] rounded-[3rem] shadow-card-hover ring-8 ring-white/20"
            />
          </Reveal>
        }
      >
        Compare courses by category, duration and eligibility, then talk to a counsellor about the ones that interest you.
      </PageBanner>

      {/* 2. Popular categories */}
      <section aria-labelledby="categories-heading" className="bg-[#fbfaf6] pb-6 pt-2">
        <div className="container mx-auto">
          <p className="rf-eyebrow">Popular categories</p>
          <h2 id="categories-heading" className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">Start with a field you like</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {CATEGORIES.map((cat, i) => {
              const count = COURSES.filter((c) => c.category === cat.id).length;
              return (
                <Reveal as="li" key={cat.id} delay={(i % 4) * 0.05}>
                  <button
                    type="button"
                    onClick={() => chooseCategory(cat.id)}
                    className="group relative block w-full overflow-hidden rounded-3xl text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2"
                  >
                    <BannerCrop src={cat.src} alt="" region={cat.region} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw" className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/30 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white">
                      <span>
                        <span className="block font-heading text-lg font-bold leading-tight">{cat.name}</span>
                        <span className="text-xs text-white/80">{count} course{count === 1 ? '' : 's'}</span>
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-sm"><cat.icon aria-hidden="true" /></span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 3. Course search and discovery */}
      <section ref={discoveryRef} id="course-discovery" aria-labelledby="discovery-heading" className="scroll-mt-24 bg-[#fbfaf6] py-12">
        <div className="container mx-auto">
          <p className="rf-eyebrow">Search courses</p>
          <h2 id="discovery-heading" className="font-heading text-3xl font-bold text-gray-900 md:text-4xl">Find a course</h2>

          <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-4 shadow-card">
            <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
              <div className="relative">
                <label htmlFor="course-search" className="sr-only">Search courses by name or eligibility</label>
                <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                <input id="course-search" type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by course name or eligibility" className={`${field} pl-11`} />
              </div>
              <div>
                <label htmlFor="course-duration" className="sr-only">Filter by duration</label>
                <select id="course-duration" value={duration} onChange={(e) => setDuration(e.target.value)} className={field}>
                  <option value="all">Any duration</option>
                  {durations.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div role="group" aria-label="Filter by category" className="mt-4 flex flex-wrap gap-2">
              {[{ id: 'all', name: 'All Courses' }, ...CATEGORIES].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${activeCategory === cat.id ? 'bg-forest text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-forest/10'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600" aria-live="polite">
            Showing {Math.min(visible, filteredCourses.length)} of {filteredCourses.length} courses
            {filtersActive && <button type="button" onClick={clearFilters} className="ml-3 font-semibold text-crimson underline">Clear filters</button>}
          </p>

          {filteredCourses.length > 0 ? (
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.slice(0, visible).map((course, i) => {
                const Icon = course.icon || FaGraduationCap;
                return (
                  <Reveal as="li" key={course.id} delay={(i % 3) * 0.05} className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-card-hover">
                    <div className="flex items-start gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-crimson/10 text-xl text-crimson"><Icon aria-hidden="true" /></span>
                      <div className="min-w-0">
                        <h3 className="font-sans text-lg font-bold leading-tight text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.fullName}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{course.description}</p>
                    <dl className="mt-3 space-y-1.5 text-sm">
                      <div className="flex items-center gap-2"><dt className="sr-only">Duration</dt><FaClock className="text-forest" aria-hidden="true" /><dd className="text-gray-700">{course.duration}</dd></div>
                      <div className="flex items-start gap-2"><dt className="sr-only">Eligibility</dt><FaCheckCircle className="mt-0.5 shrink-0 text-forest" aria-hidden="true" /><dd className="text-gray-700">{course.eligibility}</dd></div>
                    </dl>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="rounded-full bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest">{CATEGORY_NAME[course.category] || course.category}</span>
                      <Link href={ROUTES.counselling} className="inline-flex items-center gap-1.5 text-xs font-semibold text-crimson hover:underline">Ask a counsellor <FaArrowRight aria-hidden="true" /></Link>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          ) : (
            <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-10 text-center">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-400"><FaSearch aria-hidden="true" /></span>
              <h3 className="font-sans text-lg font-semibold text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-600">Try a different keyword or clear the filters.</p>
              <button type="button" onClick={clearFilters} className="mt-4 font-semibold text-crimson underline">Clear all filters</button>
            </div>
          )}

          {visible < filteredCourses.length && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="rf-btn-primary !rounded-full px-8 py-3">
                Load more courses ({filteredCourses.length - visible} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Guidance */}
      <section aria-labelledby="guidance-heading" className="bg-gradient-to-br from-forest-dark to-forest py-14 text-white md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-300">How we help</p>
            <h2 id="guidance-heading" className="mt-1 font-heading text-3xl font-bold md:text-4xl">Choosing a course with confidence</h2>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {GUIDANCE.map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 0.07} className="flex flex-col rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-lg text-forest-dark"><g.icon aria-hidden="true" /></span>
                <h3 className="font-sans text-lg font-semibold">{g.title}</h3>
                <p className="mt-2 text-sm text-white/80">{g.text}</p>
                {g.href.startsWith('#') ? (
                  <a href={g.href} className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-gold-300 hover:text-white">{g.cta} <FaArrowRight aria-hidden="true" /></a>
                ) : (
                  <Link href={g.href} className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-gold-300 hover:text-white">{g.cta} <FaArrowRight aria-hidden="true" /></Link>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Academic Streams Guidance & Preparation */}
      <CourseGuidance />

      {/* 5. FAQs */}
      <section aria-labelledby="course-faq-heading" className="bg-white py-14 md:py-16">
        <div className="container mx-auto">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="rf-eyebrow">FAQs</p>
            <h2 id="course-faq-heading" className="mt-1 font-heading text-3xl font-bold text-gray-900 md:text-4xl">Questions about courses</h2>
          </div>
          <Faq items={faqs} idPrefix="course-faq" />
        </div>
      </section>

      {/* 6. Final CTA */}
      <section aria-labelledby="courses-cta" className="bg-white pb-16">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7d0a1f] to-crimson px-8 py-12 text-center text-white">
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
            <h2 id="courses-cta" className="font-heading text-3xl font-bold md:text-4xl">Need help choosing the right course?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">Our counsellors can help you compare options for your marks and interests.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.counselling} className="rf-btn-gold px-7 py-3"><FaCalendarCheck aria-hidden="true" /> Book Counselling</Link>
              <a href={`tel:${CONTACT.phoneTel}`} className="rf-btn border border-white/40 px-7 py-3 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-crimson"><FaPhone aria-hidden="true" /> Call {CONTACT.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
