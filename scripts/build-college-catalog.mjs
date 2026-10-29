import fs from 'fs';
import path from 'path';
import { additionalColleges } from './additional-colleges.mjs';

export const TAMIL_NADU_DISTRICTS = [
  'Ariyalur',
  'Chengalpattu',
  'Chennai',
  'Coimbatore',
  'Cuddalore',
  'Dharmapuri',
  'Dindigul',
  'Erode',
  'Kallakurichi',
  'Kancheepuram',
  'Kanniyakumari',
  'Karur',
  'Krishnagiri',
  'Madurai',
  'Mayiladuthurai',
  'Nagapattinam',
  'Namakkal',
  'Nilgiris',
  'Perambalur',
  'Pudukkottai',
  'Ramanathapuram',
  'Ranipet',
  'Salem',
  'Sivaganga',
  'Tenkasi',
  'Thanjavur',
  'Theni',
  'Thoothukudi',
  'Tiruchirappalli',
  'Tirunelveli',
  'Tirupathur',
  'Tiruppur',
  'Tiruvallur',
  'Tiruvannamalai',
  'Tiruvarur',
  'Vellore',
  'Viluppuram',
  'Virudhunagar'
];

export const COLLEGE_TYPES = [
  'Engineering',
  'Arts & Science',
  'Medical',
  'Polytechnic',
  'Law',
  'Management',
  'Education',
  'Agriculture',
  'Other'
];

// Curated comprehensive Tamil Nadu Colleges dataset covering all 38 districts and all 7 course streams
export const collegesData = [
  // ==========================================
  // 1. CHENNAI
  // ==========================================
  {
    name: 'College of Engineering, Guindy (CEG), Anna University',
    location: 'Guindy, Chennai',
    district: 'Chennai',
    type: 'Engineering',
    tneaCode: '1',
    note: 'Premier State University campus, Estd. 1794, NIRF Top 15, NBA & NAAC A++ accredited',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'B.E. Biomedical Engineering', 'B.E. Geo-Informatics', 'B.E. Manufacturing Engineering', 'M.E. Software Engineering', 'M.B.A.'],
    website: 'https://ceg.annauniv.edu'
  },
  {
    name: 'Madras Institute of Technology (MIT), Anna University',
    location: 'Chromepet, Chennai',
    district: 'Chennai',
    type: 'Engineering',
    tneaCode: '4',
    note: 'Constituent college of Anna University, renowned for Aeronautical, Automobile and Rubber Technology',
    departments: ['B.E. Aeronautical Engineering', 'B.E. Automobile Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.Tech. Rubber and Plastic Technology', 'B.E. Production Engineering', 'B.Tech. Robotics and Automation'],
    website: 'https://mitindia.edu'
  },
  {
    name: 'Madras Medical College (MMC)',
    location: 'Park Town, Chennai',
    district: 'Chennai',
    type: 'Medical',
    tneaCode: '',
    note: 'Apex Government Medical College in Tamil Nadu, Estd. 1835, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'B.Sc. Nursing', 'B.Pharm.', 'B.P.T. Physiotherapy'],
    website: 'https://www.mmc.tn.gov.in'
  },
  {
    name: 'Stanley Medical College',
    location: 'Old Washermanpet, Chennai',
    district: 'Chennai',
    type: 'Medical',
    tneaCode: '',
    note: 'Estd. 1938, renowned Center of Excellence in Plastic Surgery and Liver Transplantation',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Obstetrics and Gynaecology', 'M.D. Dermatology', 'M.S. ENT', 'M.Ch. Plastic Surgery', 'B.Sc. Allied Health Sciences'],
    website: 'https://www.stanleymedicalcollege.ac.in'
  },
  {
    name: 'Kilpauk Medical College (KMC)',
    location: 'Kilpauk, Chennai',
    district: 'Chennai',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1960, specialized Burn and Trauma Center',
    departments: ['M.B.B.S.', 'M.D. Internal Medicine', 'M.S. General Surgery', 'M.D. Radiodiagnosis', 'M.D. Pathology', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://www.gkmc.tn.gov.in'
  },
  {
    name: 'Loyola College (Autonomous)',
    location: 'Nungambakkam, Chennai',
    district: 'Chennai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 10 College in India, NAAC A++ (CGPA 3.55), Estd. 1925',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Visual Communication', 'B.Com. General', 'B.Com. Corporate Secretaryship', 'B.Com. Accounting and Finance', 'B.A. Economics', 'B.A. English Literature', 'M.Sc. Data Science', 'M.S.W.'],
    website: 'https://www.loyolacollege.edu'
  },
  {
    name: 'Madras Christian College (MCC)',
    location: 'Tambaram, Chennai',
    district: 'Chennai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Autonomous, Estd. 1837, NAAC A+, sprawling 320-acre lush green campus',
    departments: ['B.Sc. Computer Science', 'B.Sc. Statistics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Plant Biology', 'B.Com. General', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. Political Science', 'B.A. History', 'B.S.W.', 'M.Sc. Applied Microbiology'],
    website: 'https://www.mcc.edu.in'
  },
  {
    name: 'Presidency College (Autonomous)',
    location: 'Kamarajar Salai, Chennai',
    district: 'Chennai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 3 College in India, Mother of University of Madras, Estd. 1840',
    departments: ['B.Sc. Mathematics', 'B.Sc. Statistics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Geology', 'B.Com.', 'B.A. Economics', 'B.A. History', 'B.A. Tamil', 'B.A. English', 'M.Sc. Mathematics', 'Ph.D. Research'],
    website: 'https://www.presidencycollegechennai.ac.in'
  },
  {
    name: 'Stella Maris College for Women (Autonomous)',
    location: 'Cathedral Road, Chennai',
    district: 'Chennai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Premier higher education institute for women, NAAC A+, Estd. 1947',
    departments: ['B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Plant Biology', 'B.Com. General', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. Sociology', 'M.A. Public Relations', 'M.S.W.'],
    website: 'https://www.stellamariscollege.edu.in'
  },
  {
    name: 'The Tamil Nadu Dr. Ambedkar Law University - School of Excellence in Law (SOEL)',
    location: 'Taramani, Chennai',
    district: 'Chennai',
    type: 'Law',
    tneaCode: '',
    note: 'Apex State Law University in Tamil Nadu, Bar Council of India approved, NAAC accredited',
    departments: ['B.A. LL.B. (Hons.)', 'B.B.A. LL.B. (Hons.)', 'B.Com. LL.B. (Hons.)', 'B.C.A. LL.B. (Hons.)', '3-Year LL.B. (Hons.)', 'LL.M. Constitutional Law', 'LL.M. Corporate Law', 'LL.M. Intellectual Property Law', 'Ph.D. in Law'],
    website: 'https://www.tndalu.ac.in'
  },
  {
    name: 'Government Law College, Chennai',
    location: 'Pattabiram / George Town, Chennai',
    district: 'Chennai',
    type: 'Law',
    tneaCode: '',
    note: 'One of the oldest law colleges in India, Estd. 1891, alma mater of prominent Chief Justices and statesmen',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. International Law', 'LL.M. Property Law', 'LL.M. Labour Law'],
    website: 'https://glcchennai.ac.in'
  },
  {
    name: 'Loyola Institute of Business Administration (LIBA)',
    location: 'Nungambakkam, Chennai',
    district: 'Chennai',
    type: 'Management',
    tneaCode: '',
    note: 'Premier Jesuit Business School, SAQS Accredited, approved by AICTE, NIRF Top Management Institution',
    departments: ['Post Graduate Diploma in Management (PGDM)', 'PGDM Weekend', 'Executive Diploma in Business Analytics', 'Executive Diploma in Financial Management', 'Executive Diploma in Human Resource Management', 'Ph.D. in Business Administration'],
    website: 'https://liba.edu'
  },
  {
    name: 'Department of Management Studies (DoMS), Anna University',
    location: 'Guindy, Chennai',
    district: 'Chennai',
    type: 'Management',
    tneaCode: '',
    note: 'Leading state university business school offering specialized MBA programs with high ROI',
    departments: ['M.B.A. General Management', 'M.B.A. Technology Management', 'M.B.A. Tourism Management', 'Ph.D. in Management Studies'],
    website: 'https://domsannauniv.ac.in'
  },
  {
    name: 'Madras Veterinary College, TANUVAS',
    location: 'Vepery, Chennai',
    district: 'Chennai',
    type: 'Agriculture',
    tneaCode: '',
    note: 'First veterinary college in India, Estd. 1903, Tamil Nadu Veterinary and Animal Sciences University',
    departments: ['B.V.Sc. & A.H. (Bachelor of Veterinary Science and Animal Husbandry)', 'B.Tech. Food Technology', 'M.V.Sc. Veterinary Surgery & Radiology', 'M.V.Sc. Animal Genetics & Breeding', 'Ph.D. in Veterinary Sciences'],
    website: 'https://www.tanuvas.ac.in'
  },
  {
    name: 'Lady Willingdon Institute of Advanced Study in Education (Autonomous)',
    location: 'Triplicane, Chennai',
    district: 'Chennai',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1922, Government Teacher Training Institute affiliated to TNTEU, NAAC accredited',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.', 'M.Phil. in Education', 'Ph.D. in Education'],
    website: 'https://ladywillingdoniase.edu.in'
  },
  {
    name: 'Central Polytechnic College',
    location: 'Taramani, Chennai',
    district: 'Chennai',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'Premier Government Polytechnic College in Tamil Nadu, Directorate of Technical Education (DOTE)',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering', 'Diploma in Mechanical (Sandwich)'],
    website: 'https://www.cptchennai.ac.in'
  },
  {
    name: 'SSN College of Engineering',
    location: 'Kalavakkam, Old Mahabalipuram Road, Chennai',
    district: 'Chennai',
    type: 'Engineering',
    tneaCode: '1315',
    note: 'Autonomous, NAAC A++, NIRF Rank 45, founded by Shiv Nadar, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Chemical Engineering', 'B.E. Biomedical Engineering', 'B.E. Civil Engineering'],
    website: 'https://www.ssn.edu.in'
  },

  // ==========================================
  // 2. COIMBATORE
  // ==========================================
  {
    name: 'PSG College of Technology (Autonomous)',
    location: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Engineering',
    tneaCode: '2006',
    note: 'Govt. Aided Autonomous Institution, Estd. 1951, NIRF Top 55, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Robotics and Automation', 'B.E. Production Engineering', 'B.Tech. Biotechnology', 'B.E. Electrical and Electronics Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.psgtech.edu'
  },
  {
    name: 'Government College of Technology (GCT)',
    location: 'Thadagam Road, Coimbatore',
    district: 'Coimbatore',
    type: 'Engineering',
    tneaCode: '2005',
    note: 'Estd. 1945, premier Government Autonomous engineering college, Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'B.E. Electronics and Instrumentation Engineering', 'B.Tech. Industrial Biotechnology'],
    website: 'https://gct.ac.in'
  },
  {
    name: 'Coimbatore Institute of Technology (CIT)',
    location: 'Civil Aerodrome Post, Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Engineering',
    tneaCode: '2007',
    note: 'Government-Aided Autonomous Institution, Estd. 1956, NIRF ranked',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Chemical Engineering', 'B.E. Civil Engineering', 'M.Sc. Software Systems (5-Year Integrated)'],
    website: 'https://www.cit.edu.in'
  },
  {
    name: 'Coimbatore Medical College',
    location: 'Avinashi Road, Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1966, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'M.D. Paediatrics', 'B.Sc. Nursing', 'B.Sc. Radiography and Imaging Technology'],
    website: 'https://cmc-cbe.org'
  },
  {
    name: 'PSG Institute of Medical Sciences and Research (PSG IMS&R)',
    location: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Medical',
    tneaCode: '',
    note: 'NABH and NABL accredited tertiary teaching hospital, NAAC accredited',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Respiratory Medicine', 'M.D. Dermatology', 'M.S. Ophthalmology', 'B.Sc. Critical Care Technology', 'B.Sc. Operation Theatre Technology'],
    website: 'https://psgimsr.ac.in'
  },
  {
    name: 'Agricultural College and Research Institute, TNAU Coimbatore',
    location: 'Lawley Road, Coimbatore',
    district: 'Coimbatore',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Headquarters campus of Tamil Nadu Agricultural University, premier agricultural institution in India',
    departments: ['B.Sc. (Hons.) Agriculture', 'B.Sc. (Hons.) Horticulture', 'B.Tech. Agricultural Engineering', 'B.Tech. Food Technology', 'B.Tech. Biotechnology', 'B.Tech. Energy and Environmental Engineering', 'B.Sc. (Hons.) Agribusiness Management', 'M.Sc. Agronomy', 'Ph.D. in Agriculture'],
    website: 'https://tnau.ac.in'
  },
  {
    name: 'Forest College and Research Institute, TNAU',
    location: 'Mettupalayam, Coimbatore',
    district: 'Coimbatore',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, dedicated to forestry, sericulture and agro-industrial research',
    departments: ['B.Sc. (Hons.) Forestry', 'B.Sc. (Hons.) Sericulture', 'M.Sc. Forestry', 'M.Sc. Wood Science and Technology', 'Ph.D. in Forestry'],
    website: 'https://tnau.ac.in/fcri-mettupalayam'
  },
  {
    name: 'PSG College of Arts and Science (Autonomous)',
    location: 'Civil Aerodrome Post, Coimbatore',
    district: 'Coimbatore',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 20 College in India, NAAC A++ (CGPA 3.62), Estd. 1947',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Computer Technology', 'B.Sc. Biotechnology', 'B.Sc. Mathematics', 'B.Com. General', 'B.Com. Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Analytics', 'B.B.A.', 'B.A. English Literature', 'M.Com.', 'M.Sc. Applied Psychology'],
    website: 'https://www.psgcas.ac.in'
  },
  {
    name: 'Government Arts College (Autonomous), Coimbatore',
    location: 'Arts College Road, Coimbatore',
    district: 'Coimbatore',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1852, Grade A by NAAC, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'B.A. History', 'M.Sc. Physics', 'Ph.D.'],
    website: 'https://gacbe.ac.in'
  },
  {
    name: 'Government Law College, Coimbatore',
    location: 'Maruthamalai Main Road, Coimbatore',
    district: 'Coimbatore',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 1979, affiliated to Tamil Nadu Dr. Ambedkar Law University, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Business Law', 'LL.M. Taxation Law'],
    website: 'https://glccbe.ac.in'
  },
  {
    name: 'PSG Institute of Management (PSGIM)',
    location: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Management',
    tneaCode: '',
    note: 'First B-School in India to receive ACBSP international accreditation, NIRF Top Management Institute',
    departments: ['M.B.A. Full Time', 'M.B.A. Waste Management & Social Entrepreneurship', 'Post Graduate Diploma in Management (PGDM)', 'Ph.D. in Management'],
    website: 'https://psgim.ac.in'
  },
  {
    name: 'GRG School of Management Studies (GRGSMS)',
    location: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Management',
    tneaCode: '',
    note: 'Dedicated women management institute under PSGR Krishnammal College for Women, ACBSP accredited',
    departments: ['M.B.A. Finance', 'M.B.A. Marketing', 'M.B.A. Human Resources', 'M.B.A. Business Analytics', 'Executive MBA', 'Ph.D. in Management'],
    website: 'https://www.grgsms.ac.in'
  },
  {
    name: 'Sri Ramakrishna Mission Vidyalaya College of Education (Autonomous)',
    location: 'Perianaickenpalayam, Coimbatore',
    district: 'Coimbatore',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1950, NAAC A+ accredited, renowned teacher education center affiliated to TNTEU',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'M.Ed.', 'M.Phil. in Education', 'Ph.D. in Education'],
    website: 'https://srkvcoe.org'
  },
  {
    name: 'PSG Polytechnic College',
    location: 'Peelamedu, Coimbatore',
    district: 'Coimbatore',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'Estd. 1939, first private polytechnic in Tamil Nadu, government aided',
    departments: ['Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering', 'Diploma in Automobile Engineering', 'Diploma in Foundry Technology', 'Diploma in Mechatronics'],
    website: 'https://www.psgpolytech.ac.in'
  },
  {
    name: 'Kumaraguru College of Technology (KCT)',
    location: 'Chinnavedampatti, Coimbatore',
    district: 'Coimbatore',
    type: 'Engineering',
    tneaCode: '2712',
    note: 'Autonomous, NAAC A++, renowned innovation ecosystem and Forge incubator',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech. Biotechnology', 'B.Tech. Fashion Technology', 'B.E. Aeronautical Engineering'],
    website: 'https://www.kct.ac.in'
  },
  {
    name: 'Sri Krishna College of Engineering and Technology (SKCET)',
    location: 'Kuniamuthur, Coimbatore',
    district: 'Coimbatore',
    type: 'Engineering',
    tneaCode: '2718',
    note: 'Autonomous, NAAC A++, NIRF top 75 engineering institution, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Computer Science and Business Systems (CSBS with TCS)', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'M.B.A.'],
    website: 'https://www.skcet.ac.in'
  },

  // ==========================================
  // 3. MADURAI
  // ==========================================
  {
    name: 'Thiagarajar College of Engineering (TCE)',
    location: 'Thiruparankundram, Madurai',
    district: 'Madurai',
    type: 'Engineering',
    tneaCode: '5008',
    note: 'Govt. Aided Autonomous Institution, Estd. 1957, NIRF ranked, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'B.Arch. Architecture', 'M.C.A.', 'M.Tech. Data Science'],
    website: 'https://www.tce.edu'
  },
  {
    name: 'Madurai Medical College',
    location: 'Panagal Road, Madurai',
    district: 'Madurai',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1954, tertiary referral Government Rajaji Hospital',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'M.D. Anaesthesiology', 'B.Pharm.', 'B.Sc. Nursing', 'Diploma in Medical Radiography'],
    website: 'https://www.mdumc.ac.in'
  },
  {
    name: 'Agricultural College and Research Institute, TNAU Madurai',
    location: 'Othakadai, Madurai',
    district: 'Madurai',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, Estd. 1965, center for dryland agriculture and pulses research',
    departments: ['B.Sc. (Hons.) Agriculture', 'B.Sc. (Hons.) Community Science', 'M.Sc. Agricultural Entomology', 'M.Sc. Plant Pathology', 'M.Sc. Agricultural Economics', 'Ph.D. in Agricultural Sciences'],
    website: 'https://tnau.ac.in/acrimadurai'
  },
  {
    name: 'Thiagarajar College (Autonomous)',
    location: 'Teppakulam, Madurai',
    district: 'Madurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 25 College in India, NAAC A++ (CGPA 3.63), Estd. 1949',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Biotechnology', 'B.Com. General', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Sc. Data Analytics', 'Ph.D.'],
    website: 'https://www.tcarts.in'
  },
  {
    name: 'The American College (Autonomous)',
    location: 'Goripalayam, Madurai',
    district: 'Madurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'One of the oldest colleges in India, Estd. 1881, NAAC A+ accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Visual Communication', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. English Literature', 'B.A. Economics', 'M.B.A.', 'M.C.A.'],
    website: 'https://americancollege.edu.in'
  },
  {
    name: 'Lady Doak College (Autonomous)',
    location: 'Tallakulam, Madurai',
    district: 'Madurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'First women college in Madurai, Estd. 1948, NAAC A+ accredited, pioneer in women higher education',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Biotechnology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Com.', 'B.Com. Banking and Insurance', 'B.B.A.', 'B.A. English', 'B.A. History', 'M.S.W.'],
    website: 'https://www.ladydoakcollege.edu.in'
  },
  {
    name: 'Government Law College, Madurai',
    location: 'K.K. Nagar, Madurai',
    district: 'Madurai',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 1974, affiliated to Tamil Nadu Dr. Ambedkar Law University, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Property Law', 'LL.M. Crime and Tort'],
    website: 'https://glcmadurai.ac.in'
  },
  {
    name: 'Thiagarajar School of Management (TSM)',
    location: 'Pamban Swamy Nagar, Madurai',
    district: 'Madurai',
    type: 'Management',
    tneaCode: '',
    note: 'Autonomous, NIRF Top 90 Management Institute, NBA & AICTE accredited, Estd. 1962',
    departments: ['Post Graduate Diploma in Management (PGDM)', 'Master of Business Administration (M.B.A.)', 'Executive M.B.A.', 'Fellow Programme in Management (Ph.D.)'],
    website: 'https://tsm.ac.in'
  },
  {
    name: 'St. Justin College of Education',
    location: 'Kamarajar Salai, Madurai',
    district: 'Madurai',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1968, affiliated to TNTEU, recognized by NCTE, Grade A by NAAC',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.'],
    website: 'https://stjustin.edu.in'
  },
  {
    name: 'KLN College of Engineering',
    location: 'Pottapalayam, Madurai Sivagangai Border',
    district: 'Madurai',
    type: 'Engineering',
    tneaCode: '5901',
    note: 'First self-financing co-educational engineering college in Madurai, Estd. 1994, Autonomous',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.klnce.edu'
  },

  // ==========================================
  // 4. TIRUCHIRAPPALLI (TRICHY)
  // ==========================================
  {
    name: 'St. Joseph\'s College (Autonomous), Trichy',
    location: 'Chathiram Bus Stand, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1844, Heritage Status by UGC, NAAC A++ (CGPA 3.58), alma mater of Dr. A.P.J. Abdul Kalam',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Statistics', 'B.Com. General', 'B.Com. Computer Applications', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Data Science', 'M.B.A.'],
    website: 'https://www.sjctni.edu'
  },
  {
    name: 'Bishop Heber College (Autonomous)',
    location: 'Vayalur Road, Puthur, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 35 College in India, NAAC A++ (CGPA 3.69), Estd. 1966',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Actuarial Science', 'B.Sc. Biotechnology', 'B.Sc. Physics', 'B.Com. General', 'B.Com. International Accounting', 'B.B.A.', 'B.A. English', 'B.Voc. Information Technology', 'M.S.W.', 'M.C.A.'],
    website: 'https://bhc.edu.in'
  },
  {
    name: 'K.A.P. Viswanatham Government Medical College',
    location: 'Periyamilaguparai, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1997, Mahatma Gandhi Memorial Government Hospital',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Obstetrics and Gynaecology', 'M.D. Anaesthesiology', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://kapvgmc.ac.in'
  },
  {
    name: 'Bharathidasan Institute of Management (BIM Trichy)',
    location: 'MHD Complex, BHEL, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Management',
    tneaCode: '',
    note: 'Premier Public B-School established in partnership with BHEL, NIRF Top Management Institute',
    departments: ['Master of Business Administration (M.B.A. - Two Year Full Time)', 'Ph.D. in Management Studies'],
    website: 'https://bim.edu'
  },
  {
    name: 'Anbil Dharmalingam Agricultural College and Research Institute (ADAC&RI), TNAU',
    location: 'Navalur Kuttapattu, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, specialized research center for sodic and salt-affected soils',
    departments: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Soil Science and Agricultural Chemistry', 'M.Sc. Agronomy', 'Ph.D. in Agricultural Sciences'],
    website: 'https://tnau.ac.in/site/adacri-trichy'
  },
  {
    name: 'Government Law College, Tiruchirappalli',
    location: 'Race Course Road, K.J. Nagar, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 1979, affiliated to Tamil Nadu Dr. Ambedkar Law University, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Constitutional Law', 'LL.M. Labour and Industrial Relations Law'],
    website: 'https://glctrichy.ac.in'
  },
  {
    name: 'Saranathan College of Engineering',
    location: 'Venkateswara Nagar, Panjappur, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Engineering',
    tneaCode: '3819',
    note: 'Autonomous, NAAC A+ accredited, premier engineering institution in Central Tamil Nadu',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Instrumentation and Control Engineering', 'M.B.A.'],
    website: 'https://saranathan.ac.in'
  },
  {
    name: 'National College (Autonomous), Trichy',
    location: 'Dindigul Road, Tiruchirappalli',
    district: 'Tiruchirappalli',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1919, College with Potential for Excellence by UGC, NAAC A+ accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Biotechnology', 'B.Sc. Geology', 'B.Sc. Physics', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Computer Applications', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Applied Geology', 'Ph.D.'],
    website: 'https://nct.ac.in'
  },

  // ==========================================
  // 5. SALEM
  // ==========================================
  {
    name: 'Government College of Engineering (GCE), Salem',
    location: 'Bangalore Highway, Karuppur, Salem',
    district: 'Salem',
    type: 'Engineering',
    tneaCode: '2615',
    note: 'Premier Government Autonomous Engineering College, Estd. 1966, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'B.E. Metallurgical Engineering', 'M.E. Structural Engineering', 'M.E. CAD'],
    website: 'https://gcesalem.edu.in'
  },
  {
    name: 'Government Mohan Kumaramangalam Medical College',
    location: 'Steel Plant Road, Salem',
    district: 'Salem',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1986, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmkmc.ac.in'
  },
  {
    name: 'Sona College of Technology (Autonomous)',
    location: 'Junction Main Road, Salem',
    district: 'Salem',
    type: 'Engineering',
    tneaCode: '2618',
    note: 'Autonomous, NAAC A++, NIRF top ranked engineering institution, partner for ISRO research projects',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Design', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech. Fashion Technology', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.sonatech.ac.in'
  },
  {
    name: 'Government Arts College (Autonomous), Salem',
    location: 'Cherry Road, Salem',
    district: 'Salem',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1857, one of the oldest arts colleges in Tamil Nadu, Grade A by NAAC',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Statistics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Geology', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.A. Economics', 'B.A. English', 'B.A. History', 'B.A. Tamil', 'M.Sc. Mathematics', 'Ph.D.'],
    website: 'https://gacsalem7.ac.in'
  },
  {
    name: 'Thiagarajar Polytechnic College',
    location: 'Junction Main Road, Salem',
    district: 'Salem',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'Premier Government-Aided Autonomous Polytechnic, Estd. 1958, national award winner for excellence',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering', 'Diploma in Architectural Assistantship', 'Diploma in Textile Technology'],
    website: 'https://www.tpt.edu.in'
  },
  {
    name: 'Salem Sowdeswari College',
    location: 'Kondalampatti, Salem',
    district: 'Salem',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government-aided institution, Estd. 1975, affiliated to Periyar University, NAAC accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Corporate Economics', 'M.Com.', 'M.Sc. Computer Science'],
    website: 'https://sowdeswari.edu.in'
  },
  {
    name: 'Central Law College, Salem',
    location: 'Yercaud Foot Hills, Salem',
    district: 'Salem',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 1984, pioneer self-financing law college in Tamil Nadu, affiliated to TNDALU, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', '5-Year Integrated B.Com. LL.B.', 'LL.M. Business Law', 'LL.M. Criminal Law'],
    website: 'https://clcsalem.edu.in'
  },

  // ==========================================
  // 6. NAMAKKAL
  // ==========================================
  {
    name: 'K.S. Rangasamy College of Technology (KSRCT)',
    location: 'KSR Kalvi Nagar, Tiruchengode, Namakkal',
    district: 'Namakkal',
    type: 'Engineering',
    tneaCode: '2607',
    note: 'Autonomous, NAAC A++, NBA accredited, top research hub in Namakkal region',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech. Biotechnology', 'B.Tech. Food Technology', 'B.E. Civil Engineering', 'M.B.A.'],
    website: 'https://ksrct.ac.in'
  },
  {
    name: 'Veterinary College and Research Institute (VC&RI), Namakkal',
    location: 'Ladhaavadi, Mohanur Road, Namakkal',
    district: 'Namakkal',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TANUVAS, poultry capital research hub of India, Estd. 1985',
    departments: ['B.V.Sc. & A.H.', 'M.V.Sc. Poultry Science', 'M.V.Sc. Veterinary Pathology', 'M.V.Sc. Animal Nutrition', 'Ph.D. in Poultry Sciences'],
    website: 'https://www.tanuvas.ac.in/vcrinl.php'
  },
  {
    name: 'Muthayammal Engineering College (Autonomous)',
    location: 'Kakkaveri, Rasipuram, Namakkal',
    district: 'Namakkal',
    type: 'Engineering',
    tneaCode: '2610',
    note: 'Autonomous, NAAC A accredited, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. CSE (Cyber Security)', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'M.B.A.', 'M.C.A.'],
    website: 'https://mec.edu.in'
  },
  {
    name: 'Paavai Engineering College (Autonomous)',
    location: 'NH-44, Pachal, Namakkal',
    district: 'Namakkal',
    type: 'Engineering',
    tneaCode: '2611',
    note: 'Autonomous, NAAC A Grade, Microsoft Innovation Center, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Food Technology', 'B.Tech. Pharmaceutical Technology', 'B.Tech. Agricultural Engineering', 'M.B.A.'],
    website: 'https://pec.paavai.edu.in'
  },
  {
    name: 'Government College of Education, Komarapalayam',
    location: 'Komarapalayam, Namakkal',
    district: 'Namakkal',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1955, Government Teacher Training College affiliated to TNTEU, NAAC accredited',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.', 'Ph.D. in Education'],
    website: 'https://gcekomarapalayam.org'
  },
  {
    name: 'Selvam College of Technology (Autonomous)',
    location: 'Salem Road, Namakkal',
    district: 'Namakkal',
    type: 'Engineering',
    tneaCode: '2622',
    note: 'Autonomous, NAAC B++, specialized training in drone technology and CAD/CAM',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.E. Biomedical Engineering', 'M.B.A.'],
    website: 'https://selvamtech.edu.in'
  },
  {
    name: 'Government Arts and Science College, Namakkal',
    location: 'Sanyasikaradu, Namakkal',
    district: 'Namakkal',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1969, affiliated to Periyar University, Grade B++ by NAAC',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://gacnamakkal.edu.in'
  },

  // ==========================================
  // 7. ERODE
  // ==========================================
  {
    name: 'Kongu Engineering College (Autonomous)',
    location: 'Perundurai, Erode',
    district: 'Erode',
    type: 'Engineering',
    tneaCode: '2711',
    note: 'Autonomous, NAAC A++, NIRF top 100 engineering institution, TBI technology business incubator supported by DST',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Artificial Intelligence and Machine Learning', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech. Chemical Engineering', 'B.Tech. Food Technology', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.kongu.ac.in'
  },
  {
    name: 'Bannari Amman Institute of Technology (BIT)',
    location: 'Alathukombai, Sathyamangalam, Erode',
    district: 'Erode',
    type: 'Engineering',
    tneaCode: '2702',
    note: 'Autonomous, NAAC A+, sprawling 181-acre campus, NIRF top 100, excellent industry linkages',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.Tech. Food Technology', 'B.Tech. Agricultural Engineering', 'B.E. Biomedical Engineering'],
    website: 'https://www.bitsathy.ac.in'
  },
  {
    name: 'Government Medical College, Erode (IRTT Medical)',
    location: 'Perundurai, Erode',
    district: 'Erode',
    type: 'Medical',
    tneaCode: '',
    note: 'Established as IRT Perundurai Medical College, now Government Medical College, Dr. M.G.R. Medical University affiliate',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Anaesthesiology', 'M.D. Paediatrics', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcerode.ac.in'
  },
  {
    name: 'Erode Arts and Science College (Autonomous)',
    location: 'Rangampalayam, Erode',
    district: 'Erode',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1971, NAAC A Grade, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.C.A.', 'M.B.A.'],
    website: 'https://easc.ac.in'
  },
  {
    name: 'Vellalar College for Women (Autonomous)',
    location: 'Thindal, Erode',
    district: 'Erode',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Premier women college in Erode, Estd. 1970, NAAC A+ accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Foods and Nutrition', 'B.Sc. Costume Design and Fashion', 'B.Com.', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. English', 'M.Sc. Foods and Nutrition', 'M.Com.'],
    website: 'https://vcw.ac.in'
  },
  {
    name: 'Institute of Road and Transport Technology (IRTT), GCE Erode',
    location: 'Vasavi College Post, Erode',
    district: 'Erode',
    type: 'Engineering',
    tneaCode: '2709',
    note: 'Government College of Engineering, Erode, Estd. 1984, premier state engineering campus',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Automobile Engineering', 'B.E. Civil Engineering', 'M.E. Structural Engineering'],
    website: 'https://gceerode.ac.in'
  },

  // ==========================================
  // 8. TIRUNELVELI
  // ==========================================
  {
    name: 'Government College of Engineering (GCE), Tirunelveli',
    location: 'Tiruchendur Road, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Engineering',
    tneaCode: '4974',
    note: 'Premier Government Autonomous Engineering College, Estd. 1981, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.E. Applied Electronics', 'M.E. Engineering Design'],
    website: 'https://gcetly.ac.in'
  },
  {
    name: 'Tirunelveli Medical College (TVMC)',
    location: 'High Ground, Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1965, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'M.D. Anaesthesiology', 'B.Sc. Nursing', 'B.Pharm.', 'B.P.T.'],
    website: 'https://tvmc.ac.in'
  },
  {
    name: 'St. Xavier\'s College (Autonomous), Palayamkottai',
    location: 'Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1923, College with Potential for Excellence, NAAC A++ (CGPA 3.66), Oxford of South India',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Com. General', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Data Science', 'Ph.D.'],
    website: 'https://stxavierstn.edu.in'
  },
  {
    name: 'Government Law College, Tirunelveli',
    location: 'Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 1996, affiliated to Tamil Nadu Dr. Ambedkar Law University, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Constitutional and Administrative Law', 'LL.M. Labour Law'],
    website: 'https://glctirunelveli.ac.in'
  },
  {
    name: 'Veterinary College and Research Institute (VC&RI), Tirunelveli',
    location: 'Ramayanpatti, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TANUVAS, Estd. 2011, advanced livestock disease diagnosis and research',
    departments: ['B.V.Sc. & A.H.', 'M.V.Sc. Veterinary Gynaecology & Obstetrics', 'M.V.Sc. Livestock Production Management', 'Ph.D. in Veterinary Sciences'],
    website: 'https://www.tanuvas.ac.in/vcritnl.php'
  },
  {
    name: 'Sarah Tucker College (Autonomous)',
    location: 'Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'First college for women in South India, Estd. 1895, NAAC A+ accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Food Science and Nutrition', 'B.Com.', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. English', 'B.A. History', 'M.Sc. Physics', 'M.Com.'],
    website: 'https://sarahtuckercollege.edu.in'
  },
  {
    name: 'St. Ignatius College of Education (Autonomous)',
    location: 'Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1957, Grade A by NAAC, affiliated to TNTEU, recognized by NCTE',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.', 'Ph.D. in Education'],
    website: 'https://ignatiuscollegeofeducation.com'
  },

  // ==========================================
  // 9. VELLORE
  // ==========================================
  {
    name: 'Christian Medical College (CMC), Vellore',
    location: 'Ida Scudder Road, Vellore',
    district: 'Vellore',
    type: 'Medical',
    tneaCode: '',
    note: 'World-renowned medical institution, NIRF Top 3 Medical College in India, Estd. 1900',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Anaesthesiology', 'M.D. Paediatrics', 'M.Ch. Neurosurgery', 'D.M. Cardiology', 'B.Sc. Nursing', 'B.P.T.', 'B.Sc. Medical Laboratory Technology'],
    website: 'https://www.cmch-vellore.edu'
  },
  {
    name: 'Government Vellore Medical College',
    location: 'Adukkamparai, Vellore',
    district: 'Vellore',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2005, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. Internal Medicine', 'M.S. General Surgery', 'M.D. Obstetrics and Gynaecology', 'M.D. Anaesthesia', 'B.Sc. Nursing', 'Diploma in Emergency Care'],
    website: 'https://gvmc.tn.gov.in'
  },
  {
    name: 'Thanthai Periyar Government Institute of Technology (TPGIT)',
    location: 'Bagayam, Vellore',
    district: 'Vellore',
    type: 'Engineering',
    tneaCode: '1504',
    note: 'Government Engineering College, Estd. 1990, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.E. Applied Electronics', 'M.C.A.'],
    website: 'https://tpgit.edu.in'
  },
  {
    name: 'Government Law College, Vellore',
    location: 'Katpadi Road, Vellore',
    district: 'Vellore',
    type: 'Law',
    tneaCode: '',
    note: 'Government Law College, Estd. 2008, affiliated to TNDALU, approved by Bar Council of India',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Criminal Law', 'LL.M. Labour Law'],
    website: 'https://glcvellore.ac.in'
  },
  {
    name: 'Voorhees College',
    location: 'Officers Line, Anna Salai, Vellore',
    district: 'Vellore',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1898, NAAC accredited, alma mater of Dr. S. Radhakrishnan (2nd President of India)',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Zoology', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://voorheescollege.edu.in'
  },
  {
    name: 'Government College of Education, Vellore',
    location: 'Gandhinagar, Vellore',
    district: 'Vellore',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1955, Government Teacher Training Institute, affiliated to TNTEU',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.'],
    website: 'https://gcevellore.in'
  },

  // ==========================================
  // 10. CHENGALPATTU
  // ==========================================
  {
    name: 'Chengalpattu Medical College',
    location: 'GST Road, Chengalpattu',
    district: 'Chengalpattu',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1965, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'M.D. Obstetrics and Gynaecology', 'B.Sc. Nursing', 'Diploma in Medical Lab Technology'],
    website: 'https://chengalpattumedicalcollege.tn.gov.in'
  },
  {
    name: 'Government Law College, Chengalpattu',
    location: 'JC Nagar, Chengalpattu',
    district: 'Chengalpattu',
    type: 'Law',
    tneaCode: '',
    note: 'Estd. 2002, affiliated to Tamil Nadu Dr. Ambedkar Law University, approved by BCI',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Constitutional Law'],
    website: 'https://glccpt.ac.in'
  },
  {
    name: 'SRM Valliammai Engineering College (Autonomous)',
    location: 'SRM Nagar, Kattankulathur, Chengalpattu',
    district: 'Chengalpattu',
    type: 'Engineering',
    tneaCode: '1422',
    note: 'Autonomous, NAAC A Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Cyber Security', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Agricultural Engineering', 'M.B.A.'],
    website: 'https://srmvalliammai.ac.in'
  },
  {
    name: 'Rajalakshmi Engineering College (Autonomous)',
    location: 'Rajalakshmi Nagar, Thandalam, Chengalpattu border',
    district: 'Chengalpattu',
    type: 'Engineering',
    tneaCode: '1211',
    note: 'Autonomous, NAAC A++, NIRF top 100 engineering institution, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Machine Learning', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.Tech. Food Technology', 'B.E. Biomedical Engineering', 'M.B.A.'],
    website: 'https://www.rajalakshmi.org'
  },
  {
    name: 'Rajeshwari Vedachalam Government Arts College',
    location: 'Chengalpattu',
    district: 'Chengalpattu',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college, Estd. 1970, affiliated to University of Madras, NAAC accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Com.', 'M.A. English'],
    website: 'https://rvgachengalpattu.in'
  },

  // ==========================================
  // 11. KANCHEEPURAM
  // ==========================================
  {
    name: 'Pachaiyappa\'s College for Men, Kanchipuram',
    location: 'Bangalore Road, Kancheepuram',
    district: 'Kancheepuram',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1888, historic institution founded by Pachaiyappa Mudaliar Trust, NAAC accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.A. Economics', 'B.A. History', 'B.A. English', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://pachaiyappascollegekanchi.edu.in'
  },
  {
    name: 'Sri Sivasubramaniya Nadar (SSN) School of Management',
    location: 'Kalavakkam, Kancheepuram',
    district: 'Kancheepuram',
    type: 'Management',
    tneaCode: '',
    note: 'Autonomous management institute within SSN campus, NAAC A++, Anna University affiliate',
    departments: ['Master of Business Administration (M.B.A. - Two Year Full Time)', 'Ph.D. in Management Studies'],
    website: 'https://www.ssn.edu.in/som'
  },
  {
    name: 'Meenakshi Medical College Hospital and Research Institute',
    location: 'Enathur, Kancheepuram',
    district: 'Kancheepuram',
    type: 'Medical',
    tneaCode: '',
    note: 'Tertiary care medical institute and super-specialty hospital, NABH accredited',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'B.Sc. Cardiac Technology', 'B.Sc. Dialysis Technology'],
    website: 'https://mmchri.res.in'
  },
  {
    name: 'Adhi College of Engineering and Technology',
    location: 'Sankarapuram, Walajabad, Kancheepuram',
    district: 'Kancheepuram',
    type: 'Engineering',
    tneaCode: '1432',
    note: 'Estd. 2008, NBA accredited, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Electrical and Electronics Engineering'],
    website: 'https://adhi.edu.in'
  },
  {
    name: 'Kanchi Shri Krishna College of Arts and Science',
    location: 'Kilambi, Kancheepuram',
    district: 'Kancheepuram',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1994, affiliated to University of Madras, NAAC accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Biochemistry', 'B.Sc. Microbiology', 'B.Sc. Mathematics', 'B.Com.', 'B.B.A.', 'B.A. English', 'M.Sc. Computer Science'],
    website: 'https://kskcas.edu.in'
  },

  // ==========================================
  // 12. THANJAVUR
  // ==========================================
  {
    name: 'Thanjavur Medical College',
    location: 'Medical College Road, Thanjavur',
    district: 'Thanjavur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 1958, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'M.D. Anaesthesiology', 'B.Sc. Nursing', 'B.Pharm.', 'B.P.T.'],
    website: 'https://tmc.tn.gov.in'
  },
  {
    name: 'Agricultural College and Research Institute, Eachangkottai, TNAU',
    location: 'Eachangkottai, Thanjavur',
    district: 'Thanjavur',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, premier rice bowl agricultural education campus in the Cauvery delta',
    departments: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Plant Breeding and Genetics', 'Ph.D. in Agriculture'],
    website: 'https://tnau.ac.in/site/acri-thanjavur'
  },
  {
    name: 'Veterinary College and Research Institute (VC&RI), Orathanadu',
    location: 'Orathanadu, Thanjavur',
    district: 'Thanjavur',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TANUVAS, Estd. 2011, Cauvery Delta Veterinary research campus',
    departments: ['B.V.Sc. & A.H.', 'M.V.Sc. Veterinary Medicine', 'M.V.Sc. Veterinary Public Health', 'Ph.D. in Veterinary Sciences'],
    website: 'https://www.tanuvas.ac.in/vcri_ond.php'
  },
  {
    name: 'Rajah Serfoji Government College (Autonomous)',
    location: 'Trichy Main Road, Thanjavur',
    district: 'Thanjavur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1955, Grade A by NAAC, affiliated to Bharathidasan University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Biotechnology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Physics', 'Ph.D.'],
    website: 'https://rsgc.ac.in'
  },
  {
    name: 'Government College of Education, Orathanad',
    location: 'Orathanad, Thanjavur',
    district: 'Thanjavur',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1957, Government Teacher Education College affiliated to TNTEU',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.'],
    website: 'https://gceorathanad.edu.in'
  },
  {
    name: 'Periyar Maniammai Institute of Science & Technology (Deemed University)',
    location: 'Periyar Nagar, Vallam, Thanjavur',
    district: 'Thanjavur',
    type: 'Engineering',
    tneaCode: '',
    note: 'Deemed-to-be-University, NAAC A+ accredited, pioneer in eco-friendly green campus and technical education',
    departments: ['B.Tech. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Aerospace Engineering', 'B.Tech. Biotechnology', 'B.Tech. Mechanical Engineering', 'B.Arch.', 'B.Sc. Animation and Multimedia', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.pmu.edu'
  },

  // ==========================================
  // 13. DINDIGUL
  // ==========================================
  {
    name: 'Government Medical College, Dindigul',
    location: 'Nallampatti, Dindigul',
    district: 'Dindigul',
    type: 'Medical',
    tneaCode: '',
    note: 'New Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre & Anaesthesia Technology', 'Diploma in Medical Lab Technology'],
    website: 'https://gmcdindigul.tn.gov.in'
  },
  {
    name: 'Horticultural College and Research Institute, TNAU Periyakulam / Dindigul border',
    location: 'Periyakulam Highway, near Dindigul',
    district: 'Dindigul',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, premier horticultural education campus in Tamil Nadu',
    departments: ['B.Sc. (Hons.) Horticulture', 'M.Sc. Fruit Science', 'M.Sc. Vegetable Science', 'M.Sc. Floriculture', 'Ph.D. in Horticulture'],
    website: 'https://tnau.ac.in/hcripk'
  },
  {
    name: 'PSNA College of Engineering and Technology (Autonomous)',
    location: 'Kothandaraman Nagar, Dindigul',
    district: 'Dindigul',
    type: 'Engineering',
    tneaCode: '5812',
    note: 'Autonomous, NAAC A++, NBA accredited, established in 1984, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Biomedical Engineering', 'B.E. Civil Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://psnacet.edu.in'
  },
  {
    name: 'G.T.N. Arts College (Autonomous)',
    location: 'Old Karur Road, Dindigul',
    district: 'Dindigul',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1964, NAAC A+ accredited, affiliated to Madurai Kamaraj University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Forensic Science', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. English', 'M.Sc. Chemistry', 'Ph.D.'],
    website: 'https://gtnartscollege.ac.in'
  },
  {
    name: 'SSM Institute of Engineering and Technology',
    location: 'Dindigul-Palani Highway, Dindigul',
    district: 'Dindigul',
    type: 'Engineering',
    tneaCode: '5817',
    note: 'Estd. 2011, NAAC accredited, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ssmiet.ac.in'
  },

  // ==========================================
  // 14. KANNIYAKUMARI
  // ==========================================
  {
    name: 'Kanyakumari Government Medical College',
    location: 'Asaripallam, Nagercoil, Kanniyakumari',
    district: 'Kanniyakumari',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2001, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Anaesthesiology', 'M.D. Paediatrics', 'M.S. Obstetrics and Gynaecology', 'B.Sc. Nursing', 'Diploma in Radiotherapy'],
    website: 'https://kgmc.tn.gov.in'
  },
  {
    name: 'Scott Christian College (Autonomous)',
    location: 'KP Road, Nagercoil, Kanniyakumari',
    district: 'Kanniyakumari',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1893, NAAC A Grade, affiliated to Manonmaniam Sundaranar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Com.', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Microbiology', 'Ph.D.'],
    website: 'https://scottchristian.org'
  },
  {
    name: 'Government College of Engineering, Nagercoil (GCE Nagercoil)',
    location: 'Konam, Nagercoil, Kanniyakumari',
    district: 'Kanniyakumari',
    type: 'Engineering',
    tneaCode: '4982',
    note: 'Constituent College of Anna University, Estd. 2009',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ucenk.ac.in'
  },
  {
    name: 'South Travancore Hindu College',
    location: 'Nagercoil, Kanniyakumari',
    district: 'Kanniyakumari',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1952, Grade A by NAAC, affiliated to MS University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.B.A.', 'B.A. History', 'B.A. English', 'M.Com.', 'M.Sc. Mathematics'],
    website: 'https://sthcollege.ac.in'
  },
  {
    name: 'Noorul Islam Centre for Higher Education (Deemed University)',
    location: 'Kumaracoil, Thuckalay, Kanniyakumari',
    district: 'Kanniyakumari',
    type: 'Engineering',
    tneaCode: '',
    note: 'Deemed University, NAAC A Grade, pioneering aerospace and nano-satellite research',
    departments: ['B.E. Aerospace Engineering', 'B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Biomedical Engineering', 'B.E. Marine Engineering', 'B.E. Electronics and Communication Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.niuniv.com'
  },

  // ==========================================
  // 15. THOOTHUKUDI (TUTICORIN)
  // ==========================================
  {
    name: 'Government Thoothukudi Medical College',
    location: '3rd Mile, Kamaraj Nagar, Thoothukudi',
    district: 'Thoothukudi',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2000, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'B.Sc. Nursing', 'Diploma in Medical Record Science'],
    website: 'https://gtdmc.ac.in'
  },
  {
    name: 'Fisheries College and Research Institute (FC&RI), TNJFU',
    location: 'Harbour Bypass Road, Thoothukudi',
    district: 'Thoothukudi',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Pioneer fisheries institution under Tamil Nadu Dr. J. Jayalalithaa Fisheries University, Estd. 1977',
    departments: ['B.F.Sc. (Bachelor of Fisheries Science)', 'M.F.Sc. Aquaculture', 'M.F.Sc. Fisheries Resource Management', 'M.F.Sc. Aquatic Animal Health', 'Ph.D. in Fisheries Science'],
    website: 'https://www.tnjfu.ac.in/fcri-thoothukudi'
  },
  {
    name: 'Agricultural College and Research Institute, Killikulam, TNAU',
    location: 'Killikulam, Vallanadu, Thoothukudi',
    district: 'Thoothukudi',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, Estd. 1984, premier agricultural institute in Southern Tamil Nadu',
    departments: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Soil Science', 'M.Sc. Agricultural Entomology', 'Ph.D. in Agricultural Sciences'],
    website: 'https://tnau.ac.in/site/acri-killikulam'
  },
  {
    name: 'V.O. Chidambaram College (Autonomous)',
    location: 'Palayamkottai Road, Thoothukudi',
    district: 'Thoothukudi',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1951, NAAC A Grade, affiliated to Manonmaniam Sundaranar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Geology', 'B.Sc. Chemistry', 'B.Sc. Physics', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Chemistry', 'Ph.D.'],
    website: 'https://voccollege.ac.in'
  },
  {
    name: 'National Engineering College (Autonomous)',
    location: 'K.R. Nagar, Kovilpatti, Thoothukudi',
    district: 'Thoothukudi',
    type: 'Engineering',
    tneaCode: '4962',
    note: 'Autonomous, Estd. 1984, NAAC A Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://nec.edu.in'
  },

  // ==========================================
  // 16. TIRUPPUR
  // ==========================================
  {
    name: 'Government Medical College, Tiruppur',
    location: 'Uthukuli Road, Tiruppur',
    district: 'Tiruppur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Anaesthesia and Operation Theatre Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmctiruppur.tn.gov.in'
  },
  {
    name: 'NIFT-TEA College of Knitwear Fashion',
    location: 'TIDEL Park Road, Mudalipalayam, Tiruppur',
    district: 'Tiruppur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Pioneer knitwear fashion and apparel design college initiated by TEA export association, NAAC accredited',
    departments: ['B.Sc. Apparel Fashion Designing', 'B.Sc. Costume Design and Fashion', 'B.Sc. Garment Production and Quality Control', 'B.Com. Computer Applications', 'B.B.A. International Business', 'M.Sc. Apparel Fashion Designing'],
    website: 'https://nifttea.ac.in'
  },
  {
    name: 'Chikkanna Government Arts College',
    location: 'College Road, Tiruppur',
    district: 'Tiruppur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college, Estd. 1966, Grade A by NAAC, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Costume Design and Fashion', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.A. Economics', 'B.A. English', 'M.Sc. Computer Science', 'Ph.D.'],
    website: 'https://cgac.in'
  },
  {
    name: 'Jai Shriram Engineering College',
    location: 'Dharapuram Road, Avinashipalayam, Tiruppur',
    district: 'Tiruppur',
    type: 'Engineering',
    tneaCode: '2762',
    note: 'NBA and NAAC A+ accredited, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.B.A.'],
    website: 'https://jayshriram.edu.in'
  },
  {
    name: 'L.R.G. Government Arts College for Women',
    location: 'Palladam Road, Tiruppur',
    district: 'Tiruppur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government college for women, Estd. 1971, NAAC accredited, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.A. English', 'B.A. Tamil', 'B.A. History', 'M.Com.', 'M.A. English'],
    website: 'https://lrggacw.org'
  },

  // ==========================================
  // 17. CUDDALORE
  // ==========================================
  {
    name: 'Rajiv Gandhi Institute of Medical Sciences (Rajah Muthiah Medical College)',
    location: 'Annamalai Nagar, Chidambaram, Cuddalore',
    district: 'Cuddalore',
    type: 'Medical',
    tneaCode: '',
    note: 'Estd. 1985, Government Medical College (formerly Annamalai University Medical Faculty), Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.S. Orthopaedics', 'B.D.S. Dental Surgery', 'B.Sc. Nursing', 'B.P.T.'],
    website: 'https://rmmc.tn.gov.in'
  },
  {
    name: 'Faculty of Agriculture, Annamalai University',
    location: 'Annamalai Nagar, Chidambaram, Cuddalore',
    district: 'Cuddalore',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Estd. 1958, one of the premier agricultural faculties in South India, ICAR accredited',
    departments: ['B.Sc. (Hons.) Agriculture', 'B.Sc. (Hons.) Horticulture', 'M.Sc. (Ag.) Agronomy', 'M.Sc. (Ag.) Agricultural Entomology', 'M.Sc. (Ag.) Genetics and Plant Breeding', 'Ph.D. in Agriculture'],
    website: 'https://annamalaiuniversity.ac.in/faculty_agri.php'
  },
  {
    name: 'University College of Engineering, Panruti (Anna University)',
    location: 'Panruti, Cuddalore',
    district: 'Cuddalore',
    type: 'Engineering',
    tneaCode: '1026',
    note: 'Constituent college of Anna University, Estd. 2008',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ucep.edu.in'
  },
  {
    name: 'Periyar Arts College',
    location: 'Silver Beach Road, Devanampattinam, Cuddalore',
    district: 'Cuddalore',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college, Estd. 1964, Grade B++ by NAAC, affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Zoology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Sc. Chemistry', 'Ph.D.'],
    website: 'https://periyarartscollege.ac.in'
  },
  {
    name: 'C. Abdul Hakeem College of Engineering and Technology (affiliate / nearby regional reach)',
    location: 'Melvisharam / Cuddalore regional corridor',
    district: 'Cuddalore',
    type: 'Engineering',
    tneaCode: '1501',
    note: 'NBA and NAAC accredited institution offering core engineering disciplines',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'M.B.A.'],
    website: 'https://cahcet.edu.in'
  },

  // ==========================================
  // 18. DHARMAPURI
  // ==========================================
  {
    name: 'Government Medical College, Dharmapuri',
    location: 'Nethaji Bypass Road, Dharmapuri',
    district: 'Dharmapuri',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2008, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Obstetrics and Gynaecology', 'B.Sc. Nursing', 'Diploma in Medical Lab Technology'],
    website: 'https://dmcdpi.ac.in'
  },
  {
    name: 'Government College of Engineering (GCE), Dharmapuri',
    location: 'Settikarai, Dharmapuri',
    district: 'Dharmapuri',
    type: 'Engineering',
    tneaCode: '2661',
    note: 'Government Engineering College established in 2013, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://gcedpi.edu.in'
  },
  {
    name: 'Government Arts College, Dharmapuri',
    location: 'Pennagaram Road, Dharmapuri',
    district: 'Dharmapuri',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1965, Grade B++ by NAAC, affiliated to Periyar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://gacdpi.in'
  },
  {
    name: 'College of Agricultural Technology (CAT), TNAU affiliate',
    location: 'Kullapuram / Dharmapuri region',
    district: 'Dharmapuri',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Affiliated to Tamil Nadu Agricultural University, modern farm machinery and polyhouse facilities',
    departments: ['B.Sc. (Hons.) Agriculture', 'B.Tech. Agricultural Engineering'],
    website: 'https://catagri.edu.in'
  },

  // ==========================================
  // 19. KRISHNAGIRI
  // ==========================================
  {
    name: 'Government Medical College, Krishnagiri',
    location: 'Bolupalli, Krishnagiri',
    district: 'Krishnagiri',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre & Anaesthesia Technology', 'Diploma in Medical Radiography'],
    website: 'https://gmckrishnagiri.tn.gov.in'
  },
  {
    name: 'Government College of Engineering (GCE), Bargur',
    location: 'Bargur, Krishnagiri',
    district: 'Krishnagiri',
    type: 'Engineering',
    tneaCode: '2603',
    note: 'Government Autonomous Engineering College, Estd. 1994, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.E. Applied Electronics', 'M.E. Computer Science'],
    website: 'https://gcebargur.ac.in'
  },
  {
    name: 'Government Arts College for Men, Krishnagiri',
    location: 'Bangalore Road, Krishnagiri',
    district: 'Krishnagiri',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1964, Grade A by NAAC, affiliated to Periyar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Mathematics', 'Ph.D.'],
    website: 'https://gackrishnagiri.ac.in'
  },
  {
    name: 'Adhiyamaan College of Engineering (Autonomous)',
    location: 'AERI Campus, Hosur, Krishnagiri',
    district: 'Krishnagiri',
    type: 'Engineering',
    tneaCode: '2601',
    note: 'Autonomous, Estd. 1987, NAAC A Grade, NBA accredited, proximity to Hosur industrial belt',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.Arch.', 'B.Tech. Chemical Engineering', 'M.B.A.'],
    website: 'https://adhiyamaan.ac.in'
  },

  // ==========================================
  // 20. KARUR
  // ==========================================
  {
    name: 'Government Medical College, Karur',
    location: 'Sanapiratti, Gandhigramam, Karur',
    district: 'Karur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2019, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Cardiac Technology', 'Diploma in Medical Lab Technology'],
    website: 'https://gmckarur.tn.gov.in'
  },
  {
    name: 'Government Arts College (Autonomous), Karur',
    location: 'Thanthonimalai, Karur',
    district: 'Karur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1966, Grade A by NAAC, affiliated to Bharathidasan University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Sc. Computer Science', 'Ph.D.'],
    website: 'https://gackarur.ac.in'
  },
  {
    name: 'M. Kumarasamy College of Engineering (Autonomous)',
    location: 'Thalavapalayam, Karur',
    district: 'Karur',
    type: 'Engineering',
    tneaCode: '2708',
    note: 'Autonomous, NAAC A Grade, NBA accredited, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'M.B.A.', 'M.C.A.'],
    website: 'https://mkce.ac.in'
  },
  {
    name: 'V.S.B. Engineering College (Autonomous)',
    location: 'NH-67, Covai Road, Karudayampalayam, Karur',
    district: 'Karur',
    type: 'Engineering',
    tneaCode: '2722',
    note: 'Autonomous, NAAC A Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Biomedical Engineering', 'M.E. Applied Electronics'],
    website: 'https://vsbec.com'
  },

  // ==========================================
  // 21. NAGAPATTINAM
  // ==========================================
  {
    name: 'Government Medical College, Nagapattinam',
    location: 'Orathur, Nagapattinam',
    district: 'Nagapattinam',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre Technology', 'Diploma in Medical Lab Technology'],
    website: 'https://gmcnagapattinam.tn.gov.in'
  },
  {
    name: 'Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU Main Campus)',
    location: 'Nagapattinam',
    district: 'Nagapattinam',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Apex State Fisheries University campus in Tamil Nadu, dedicated to marine resources and coastal aquaculture',
    departments: ['B.Tech. Fisheries Engineering', 'B.B.A. Fisheries Business Management', 'M.Tech. Fisheries Engineering', 'Ph.D. in Fisheries Technology'],
    website: 'https://www.tnjfu.ac.in'
  },
  {
    name: 'A.D.M. College for Women (Autonomous)',
    location: 'Nagore Road, Velipalayam, Nagapattinam',
    district: 'Nagapattinam',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1975, NAAC A Grade, premier women institution in coastal delta region',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Computer Science', 'M.Com.'],
    website: 'https://adjmc.ac.in'
  },
  {
    name: 'E.G.S. Pillay Engineering College (Autonomous)',
    location: 'Old Nagore Road, Thethi, Nagapattinam',
    district: 'Nagapattinam',
    type: 'Engineering',
    tneaCode: '3806',
    note: 'Autonomous, NAAC A Grade, NBA accredited, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biomedical Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://egspec.org'
  },

  // ==========================================
  // 22. MAYILADUTHURAI
  // ==========================================
  {
    name: 'A.V.C. College (Autonomous)',
    location: 'Mannampandal, Mayiladuthurai',
    district: 'Mayiladuthurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1955, College with Potential for Excellence by UGC, NAAC A+ accredited',
    departments: ['B.Sc. Computer Science', 'B.Sc. Visual Communication', 'B.Sc. Biotechnology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.B.A.', 'B.A. English', 'B.A. History', 'M.Sc. Wildlife Biology', 'Ph.D.'],
    website: 'https://avccollege.net'
  },
  {
    name: 'A.V.C. College of Engineering',
    location: 'Mannampandal, Mayiladuthurai',
    district: 'Mayiladuthurai',
    type: 'Engineering',
    tneaCode: '3801',
    note: 'Estd. 1996, NBA and NAAC accredited, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.C.A.', 'M.B.A.'],
    website: 'https://avcce.net'
  },
  {
    name: 'Dharmapuram Adhinam Arts College',
    location: 'Dharmapuram, Mayiladuthurai',
    district: 'Mayiladuthurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1946 by Dharmapuram Adhinam, traditional Tamil and Oriental studies center, NAAC accredited',
    departments: ['B.A. Tamil Literature', 'B.Lit. Tamil', 'B.Com.', 'B.Sc. Computer Science', 'B.Sc. Mathematics', 'M.A. Tamil', 'Ph.D. in Tamil'],
    website: 'https://daacollege.org'
  },
  {
    name: 'Mayiladuthurai Government Arts College for Women',
    location: 'Kullambandal, Mayiladuthurai',
    district: 'Mayiladuthurai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college for women, affiliated to Bharathidasan University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Com.', 'B.A. English', 'B.A. Tamil', 'M.Com.'],
    website: 'https://gacwmayiladuthurai.ac.in'
  },

  // ==========================================
  // 23. PUDUKKOTTAI
  // ==========================================
  {
    name: 'Government Medical College, Pudukkottai',
    location: 'Mullur, Pudukkottai',
    district: 'Pudukkottai',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2017, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'B.Sc. Nursing', 'Diploma in Medical Lab Technology'],
    website: 'https://gmcpudukkottai.tn.gov.in'
  },
  {
    name: 'Agricultural College and Research Institute, Kudumiyanmalai, TNAU',
    location: 'Kudumiyanmalai, Pudukkottai',
    district: 'Pudukkottai',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, Estd. 2014, center for arid zone agriculture and pulse improvement',
    departments: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Agricultural Extension', 'Ph.D. in Agriculture'],
    website: 'https://tnau.ac.in/site/acri-kudumiyanmalai'
  },
  {
    name: 'H.H. The Rajah\'s College (Autonomous)',
    location: 'Pudukkottai',
    district: 'Pudukkottai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1857 by King of Pudukkottai, premier heritage Government Autonomous College, NAAC Grade A',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Mathematics', 'Ph.D.'],
    website: 'https://hhrc.ac.in'
  },
  {
    name: 'Government College of Education, Pudukkottai',
    location: 'Pudukkottai',
    district: 'Pudukkottai',
    type: 'Education',
    tneaCode: '',
    note: 'Estd. 1955, Government Teacher Education College affiliated to TNTEU',
    departments: ['B.Ed. Tamil', 'B.Ed. English', 'B.Ed. Mathematics', 'B.Ed. Physical Science', 'B.Ed. Biological Science', 'B.Ed. History', 'M.Ed.'],
    website: 'https://gcepudukkottai.edu.in'
  },
  {
    name: 'Mount Zion College of Engineering and Technology',
    location: 'Lena Vilakku, Pilivalam Post, Pudukkottai',
    district: 'Pudukkottai',
    type: 'Engineering',
    tneaCode: '3813',
    note: 'Autonomous, NAAC A+ Grade, NBA accredited, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://mzcet.in'
  },

  // ==========================================
  // 24. ARIYALUR
  // ==========================================
  {
    name: 'Government Medical College, Ariyalur',
    location: 'Jayankondam Road, Ariyalur',
    district: 'Ariyalur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Anaesthesia Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcariyalur.tn.gov.in'
  },
  {
    name: 'Government Arts College, Ariyalur',
    location: 'Medical College Road, Ariyalur',
    district: 'Ariyalur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1965, affiliated to Bharathidasan University, Grade B by NAAC',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Sc. Environmental Science', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'B.A. History', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://gacariyalur.ac.in'
  },
  {
    name: 'University College of Engineering, Ariyalur (Anna University)',
    location: 'Kathankudikadu, Thelur Post, Ariyalur',
    district: 'Ariyalur',
    type: 'Engineering',
    tneaCode: '1027',
    note: 'Constituent college of Anna University, Estd. 2008',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ucea.edu.in'
  },
  {
    name: 'Government Polytechnic College, Ariyalur',
    location: 'Keelapalur, Ariyalur',
    district: 'Ariyalur',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'State Directorate of Technical Education (DOTE) approved Government Polytechnic',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering'],
    website: 'https://gptcariyalur.in'
  },

  // ==========================================
  // 25. PERAMBALUR
  // ==========================================
  {
    name: 'Dhanalakshmi Srinivasan Medical College and Hospital',
    location: 'Siruvachur, Perambalur',
    district: 'Perambalur',
    type: 'Medical',
    tneaCode: '',
    note: 'Tertiary care medical teaching hospital, affiliated to Dr. M.G.R. Medical University, NAAC A accredited',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Radiodiagnosis', 'B.Sc. Nursing', 'B.Sc. Cardiac Technology'],
    website: 'https://dsmch.ac.in'
  },
  {
    name: 'Dhanalakshmi Srinivasan Engineering College (Autonomous)',
    location: 'Thuraiyur Road, Perambalur',
    district: 'Perambalur',
    type: 'Engineering',
    tneaCode: '3805',
    note: 'Autonomous, NAAC A Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Biomedical Engineering', 'B.Tech. Biotechnology', 'B.Tech. Food Technology', 'B.E. Mechanical Engineering', 'M.B.A.'],
    website: 'https://dsec.ac.in'
  },
  {
    name: 'Thanthai Hans Roever College (Autonomous)',
    location: 'Elambalur, Perambalur',
    district: 'Perambalur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1985, NAAC A Grade, affiliated to Bharathidasan University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Com.', 'B.Com. Computer Applications', 'B.B.A.', 'B.A. English', 'M.Sc. Microbiology', 'M.C.A.'],
    website: 'https://roever.edu.in'
  },
  {
    name: 'Government Arts and Science College, Veppanthattai',
    location: 'Veppanthattai, Perambalur',
    district: 'Perambalur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college established to serve rural students in Perambalur district',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Com.', 'B.B.A.', 'B.A. Tamil', 'B.A. English'],
    website: 'https://gascveppanthattai.edu.in'
  },

  // ==========================================
  // 26. RAMANATHAPURAM
  // ==========================================
  {
    name: 'Government Medical College, Ramanathapuram',
    location: 'Collectorate Complex, Ramanathapuram',
    district: 'Ramanathapuram',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre & Anaesthesia Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcramanathapuram.tn.gov.in'
  },
  {
    name: 'University College of Engineering, Ramanathapuram (Anna University)',
    location: 'Pullangudi, Ramanathapuram',
    district: 'Ramanathapuram',
    type: 'Engineering',
    tneaCode: '5017',
    note: 'Constituent college of Anna University, Estd. 2008',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://uceramnad.edu.in'
  },
  {
    name: 'Syed Ammal Engineering College (Autonomous)',
    location: 'Dr. E.M. Abdullah Nagar, Ramanathapuram',
    district: 'Ramanathapuram',
    type: 'Engineering',
    tneaCode: '5919',
    note: 'Autonomous, NAAC A+ Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.B.A.'],
    website: 'https://syedengg.ac.in'
  },
  {
    name: 'Government Arts College, Paramakudi',
    location: 'Paramakudi, Ramanathapuram',
    district: 'Ramanathapuram',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1995, affiliated to Alagappa University, Grade B by NAAC',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'M.Com.', 'M.Sc. Mathematics'],
    website: 'https://gacparamakudi.edu.in'
  },

  // ==========================================
  // 27. SIVAGANGA
  // ==========================================
  {
    name: 'Alagappa Chettiar Government College of Engineering and Technology (ACGCET)',
    location: 'College Road, Karaikudi, Sivaganga',
    district: 'Sivaganga',
    type: 'Engineering',
    tneaCode: '5004',
    note: 'Premier Government Autonomous Engineering College, Estd. 1952 by Dr. RM. Alagappa Chettiar, Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.E. Structural Engineering', 'M.E. Environmental Engineering'],
    website: 'https://accetedu.in'
  },
  {
    name: 'Government Medical College, Sivagangai',
    location: 'Manamadurai Road, Sivaganga',
    district: 'Sivaganga',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2012, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Anaesthesiology', 'M.D. Paediatrics', 'B.Sc. Nursing', 'Diploma in Medical Lab Technology'],
    website: 'https://gmcsivagangai.tn.gov.in'
  },
  {
    name: 'Alagappa Institute of Management (AIM), Alagappa University',
    location: 'Karaikudi, Sivaganga',
    district: 'Sivaganga',
    type: 'Management',
    tneaCode: '',
    note: 'Premier university business school, NAAC A+ University campus, AICTE approved',
    departments: ['Master of Business Administration (M.B.A. General)', 'M.B.A. International Business', 'M.B.A. Banking and Insurance', 'Ph.D. in Management'],
    website: 'https://alagappauniversity.ac.in/department/16'
  },
  {
    name: 'Raja Doraisingam Government Arts College',
    location: 'Sivaganga',
    district: 'Sivaganga',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1947, Grade B++ by NAAC, affiliated to Alagappa University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Mathematics', 'Ph.D.'],
    website: 'https://rdgacollege.in'
  },

  // ==========================================
  // 28. THENI
  // ==========================================
  {
    name: 'Government Theni Medical College',
    location: 'K.V.R. Maligai Road, Kanavilakku, Theni',
    district: 'Theni',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2004, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'B.Sc. Nursing', 'Diploma in Emergency Care Technology'],
    website: 'https://tmctheni.ac.in'
  },
  {
    name: 'Horticultural College and Research Institute, Periyakulam, TNAU',
    location: 'Periyakulam, Theni',
    district: 'Theni',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, Estd. 1973, national nodal center for mango and citrus research',
    departments: ['B.Sc. (Hons.) Horticulture', 'M.Sc. (Hort.) Fruit Science', 'M.Sc. (Hort.) Vegetable Science', 'M.Sc. (Hort.) Spices and Plantation Crops', 'Ph.D. in Horticulture'],
    website: 'https://tnau.ac.in/site/hcri-periyakulam'
  },
  {
    name: 'C.P.A. College (Chinnamanaur Poduthozhilalar Sangam College)',
    location: 'Pankajam Colony, Bodinayakanur, Theni',
    district: 'Theni',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1972, NAAC accredited, affiliated to Madurai Kamaraj University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Com.', 'B.Com. Computer Applications', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Com.', 'M.Sc. Mathematics'],
    website: 'https://cpacollege.in'
  },
  {
    name: 'Theni Kammavar Sangam College of Technology',
    location: 'Kammavar Nagar, Koduvilarpatti, Theni',
    district: 'Theni',
    type: 'Engineering',
    tneaCode: '5816',
    note: 'Estd. 2007, affiliated to Anna University, approved by AICTE',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.B.A.'],
    website: 'https://tksct.ac.in'
  },

  // ==========================================
  // 29. VIRUDHUNAGAR
  // ==========================================
  {
    name: 'Government Medical College, Virudhunagar',
    location: 'Collectorate Complex, Kooraikundu, Virudhunagar',
    district: 'Virudhunagar',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Critical Care Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcvirudhunagar.tn.gov.in'
  },
  {
    name: 'Mepco Schlenk Engineering College (Autonomous)',
    location: 'Mepco Nagar, Sivakasi, Virudhunagar',
    district: 'Virudhunagar',
    type: 'Engineering',
    tneaCode: '4960',
    note: 'Autonomous, NIRF Top 150 Engineering College, NAAC A Grade, NBA accredited departments',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.E. Civil Engineering', 'B.E. Biomedical Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://www.mepcoeng.ac.in'
  },
  {
    name: 'Ayya Nadar Janaki Ammal College (Autonomous)',
    location: 'Sivakasi, Virudhunagar',
    district: 'Virudhunagar',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 30 College in India, College of Excellence by UGC, NAAC A+ (CGPA 3.48)',
    departments: ['B.Sc. Computer Science', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.Sc. Data Science', 'Ph.D.'],
    website: 'https://anjaconline.org'
  },
  {
    name: 'Kalasalingam Academy of Research and Education (Deemed University)',
    location: 'Anand Nagar, Krishnankoil, Virudhunagar',
    district: 'Virudhunagar',
    type: 'Engineering',
    tneaCode: '',
    note: 'Deemed University, NAAC A++ (CGPA 3.58), NIRF Top 40 Engineering Institution, ABET accredited',
    departments: ['B.Tech. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Machine Learning', 'B.Tech. Electronics and Communication Engineering', 'B.Tech. Agricultural Engineering', 'B.Tech. Biotechnology', 'B.Sc. (Hons.) Agriculture', 'B.Arch.', 'B.Com.', 'M.B.A.'],
    website: 'https://kalasalingam.ac.in'
  },
  {
    name: 'VHNSN College (Autonomous)',
    location: 'College Road, Virudhunagar',
    district: 'Virudhunagar',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1947, NAAC A Grade, affiliated to Madurai Kamaraj University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Professional Accounting', 'B.B.A.', 'B.A. English', 'B.A. History', 'M.B.A.', 'M.C.A.'],
    website: 'https://vhnsnc.edu.in'
  },

  // ==========================================
  // 30. TENKASI
  // ==========================================
  {
    name: 'Sri Parasakthi College for Women (Autonomous)',
    location: 'Courtallam, Tenkasi',
    district: 'Tenkasi',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1964, premier residential women college in Courtallam, NAAC A Grade, MS University affiliate',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Plant Biology', 'B.Com.', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://sriparasakthicollege.edu.in'
  },
  {
    name: 'Government Arts and Science College, Sankarankovil',
    location: 'Kalappakulam, Sankarankovil, Tenkasi',
    district: 'Tenkasi',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college serving rural students across Tenkasi region, MS University affiliate',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Com.', 'B.B.A.', 'B.A. English', 'B.A. Tamil'],
    website: 'https://gascsankaran.ac.in'
  },
  {
    name: 'JP College of Engineering',
    location: 'College Road, Ayikudy, Tenkasi',
    district: 'Tenkasi',
    type: 'Engineering',
    tneaCode: '4994',
    note: 'Estd. 2007, affiliated to Anna University, approved by AICTE',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://jpcoe.ac.in'
  },
  {
    name: 'Government Polytechnic College, Tenkasi',
    location: 'Kadayanallur / Tenkasi region',
    district: 'Tenkasi',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'DOTE approved Government Polytechnic providing technical diploma education',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering'],
    website: 'https://gptctenkasi.edu.in'
  },

  // ==========================================
  // 31. TIRUVANNAMALAI
  // ==========================================
  {
    name: 'Government Medical College, Tiruvannamalai',
    location: 'Vengikkal, Tiruvannamalai',
    district: 'Tiruvannamalai',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2013, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmctvm.tn.gov.in'
  },
  {
    name: 'Agricultural College and Research Institute, Vazhavachanur, TNAU',
    location: 'Vazhavachanur, Tiruvannamalai',
    district: 'Tiruvannamalai',
    type: 'Agriculture',
    tneaCode: '',
    note: 'Constituent college of TNAU, Estd. 2014, center for rainfed and dry farming research',
    departments: ['B.Sc. (Hons.) Agriculture', 'M.Sc. Agronomy', 'M.Sc. Soil Science', 'Ph.D. in Agriculture'],
    website: 'https://tnau.ac.in/site/acri-vazhavachanur'
  },
  {
    name: 'Government Arts College, Tiruvannamalai',
    location: 'Chengham Road, Tiruvannamalai',
    district: 'Tiruvannamalai',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1966, Grade B++ by NAAC, affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'B.A. Tamil', 'M.Sc. Physics', 'Ph.D.'],
    website: 'https://gactvm.org'
  },
  {
    name: 'University College of Engineering, Arni (Anna University)',
    location: 'Thatchur, Arni, Tiruvannamalai',
    district: 'Tiruvannamalai',
    type: 'Engineering',
    tneaCode: '1025',
    note: 'Constituent college of Anna University, Estd. 2009',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ucea.ac.in'
  },

  // ==========================================
  // 32. TIRUPATHUR
  // ==========================================
  {
    name: 'Sacred Heart College (Autonomous), Tirupattur',
    location: 'Vaniyambadi Road, Tirupathur',
    district: 'Tirupathur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'NIRF Top 50 College in India, NAAC A++ (CGPA 3.61), Estd. 1951, Jesuit institution',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Biochemistry', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. Economics', 'B.A. English', 'M.S.W.', 'M.C.A.', 'M.Sc. Data Science', 'Ph.D.'],
    website: 'https://www.shctpt.edu'
  },
  {
    name: 'Islamiah College (Autonomous), Vaniyambadi',
    location: 'New Town, Vaniyambadi, Tirupathur',
    district: 'Tirupathur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1919, NAAC A Grade, affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Biotechnology', 'B.Sc. Chemistry', 'B.Sc. Mathematics', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. English', 'B.A. History', 'M.Sc. Chemistry', 'M.Com.', 'Ph.D.'],
    website: 'https://islamiahcollege.edu.in'
  },
  {
    name: 'Priyadarshini Engineering College',
    location: 'Vaniyambadi, Tirupathur',
    district: 'Tirupathur',
    type: 'Engineering',
    tneaCode: '1509',
    note: 'Estd. 1995, affiliated to Anna University, approved by AICTE',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://priyadarshini.net.in'
  },
  {
    name: 'Government Arts and Science College, Tirupathur',
    location: 'Tirupathur',
    district: 'Tirupathur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college serving youth across Tirupathur and Yelagiri hills border',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Com.', 'B.B.A.', 'B.A. Tamil', 'B.A. English'],
    website: 'https://gasctirupattur.edu.in'
  },

  // ==========================================
  // 33. RANIPET
  // ==========================================
  {
    name: 'C. Abdul Hakeem College of Engineering & Technology',
    location: 'Hakeem Nagar, Melvisharam, Ranipet',
    district: 'Ranipet',
    type: 'Engineering',
    tneaCode: '1501',
    note: 'NBA and NAAC accredited institution, Estd. 1998, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.B.A.', 'M.C.A.'],
    website: 'https://cahcet.edu.in'
  },
  {
    name: 'C. Abdul Hakeem College (Autonomous)',
    location: 'Melvisharam, Ranipet',
    district: 'Ranipet',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1965, NAAC A Grade, affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Zoology', 'B.Com.', 'B.Com. Corporate Secretaryship', 'B.B.A.', 'B.A. History', 'B.A. English', 'M.Sc. Zoology', 'M.Com.'],
    website: 'https://cahc.edu.in'
  },
  {
    name: 'Government Arts and Science College, Arakkonam',
    location: 'Arakkonam, Ranipet',
    district: 'Ranipet',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government arts college affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Com.', 'B.B.A.', 'B.A. English', 'B.A. Tamil'],
    website: 'https://gascarakkonam.in'
  },
  {
    name: 'Government Polytechnic College, Ranipet',
    location: 'Walajapet / Ranipet',
    district: 'Ranipet',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'DOTE approved Government Polytechnic providing technical education in leather and engineering corridor',
    departments: ['Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Civil Engineering'],
    website: 'https://gptcranipet.in'
  },

  // ==========================================
  // 34. TIRUVALLUR
  // ==========================================
  {
    name: 'Government Medical College, Tiruvallur',
    location: 'Perumalpattu, Tiruvallur',
    district: 'Tiruvallur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmctiruvallur.tn.gov.in'
  },
  {
    name: 'Sri Venkateswara College of Engineering (SVCE)',
    location: 'Pennalur, Sriperumbudur / Tiruvallur border',
    district: 'Tiruvallur',
    type: 'Engineering',
    tneaCode: '1219',
    note: 'Autonomous, Estd. 1985, NAAC A Grade, NBA accredited departments, Anna University affiliate',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.Tech. Chemical Engineering', 'B.E. Marine Engineering'],
    website: 'https://www.svce.ac.in'
  },
  {
    name: 'Panimalar Engineering College (Autonomous)',
    location: 'Bangalore Trunk Road, Varadharajapuram, Poonamallee, Tiruvallur',
    district: 'Tiruvallur',
    type: 'Engineering',
    tneaCode: '1210',
    note: 'Autonomous, NAAC A Grade, NBA accredited, extensive placement ecosystem',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.Tech. Information Technology', 'B.Tech. Computer Science and Business Systems', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'M.B.A.'],
    website: 'https://panimalar.ac.in'
  },
  {
    name: 'St. Joseph\'s College of Engineering (Autonomous)',
    location: 'Jeppiaar Nagar, OMR / Tiruvallur regional corridor',
    district: 'Tiruvallur',
    type: 'Engineering',
    tneaCode: '1317',
    note: 'Autonomous, NAAC A+ Grade, NBA accredited, premier technical institution',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Machine Learning', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.Tech. Biotechnology', 'B.Tech. Chemical Engineering', 'M.B.A.'],
    website: 'https://stjosephs.ac.in'
  },
  {
    name: 'Murugappa Polytechnic College',
    location: 'Sathyamurthy Nagar, Avadi, Tiruvallur',
    district: 'Tiruvallur',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'Government-aided Autonomous Polytechnic, Estd. 1954, Murugappa Group, National Award Winner',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering', 'Diploma in Mechanical (Sandwich)'],
    website: 'https://www.murugappapoly.ac.in'
  },

  // ==========================================
  // 35. TIRUVARUR
  // ==========================================
  {
    name: 'Government Medical College, Tiruvarur',
    location: 'Master Plan Complex, Vilamal, Tiruvarur',
    district: 'Tiruvarur',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2010, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Obstetrics and Gynaecology', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmctiruvarur.tn.gov.in'
  },
  {
    name: 'Thiru. Vi. Ka. Government Arts College',
    location: 'Kidarankondan, Tiruvarur',
    district: 'Tiruvarur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1970, named after pioneer scholar Thiru. V. Kalyanasundaram, affiliated to Bharathidasan University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Zoology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. Tamil', 'B.A. History', 'M.Sc. Mathematics', 'M.Com.'],
    website: 'https://thiruvikagacollege.in'
  },
  {
    name: 'University College of Engineering, Pattukkottai / Tiruvarur region (Anna University)',
    location: 'Rajamadam / Tiruvarur coastal corridor',
    district: 'Tiruvarur',
    type: 'Engineering',
    tneaCode: '1028',
    note: 'Constituent college of Anna University offering state curriculum degrees',
    departments: ['B.E. Computer Science and Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://ucetiruvarur.edu.in'
  },
  {
    name: 'Anjuman Arts and Science College',
    location: 'Vijayapuram, Tiruvarur',
    district: 'Tiruvarur',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Affiliated to Bharathidasan University, serving delta students',
    departments: ['B.Sc. Computer Science', 'B.Sc. Information Technology', 'B.Com.', 'B.B.A.', 'B.A. English'],
    website: 'https://anjumancollege.edu.in'
  },

  // ==========================================
  // 36. VILUPPURAM
  // ==========================================
  {
    name: 'Government Medical College, Viluppuram',
    location: 'Mundiyampakkam, Viluppuram',
    district: 'Viluppuram',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2010, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'M.D. General Medicine', 'M.S. General Surgery', 'M.D. Paediatrics', 'M.D. Anaesthesiology', 'M.S. Orthopaedics', 'B.Sc. Nursing', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcvillupuram.tn.gov.in'
  },
  {
    name: 'University College of Engineering, Villupuram (Anna University)',
    location: 'Kakkur, Viluppuram',
    district: 'Viluppuram',
    type: 'Engineering',
    tneaCode: '1022',
    note: 'Constituent college of Anna University, Estd. 2008',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'M.E. Internal Combustion Engineering'],
    website: 'https://ucev.edu.in'
  },
  {
    name: 'Government Law College, Viluppuram',
    location: 'Master Plan Complex, Viluppuram',
    district: 'Viluppuram',
    type: 'Law',
    tneaCode: '',
    note: 'Government Law College, Estd. 2017, affiliated to TNDALU, approved by Bar Council of India',
    departments: ['3-Year LL.B.', '5-Year Integrated B.A. LL.B.', 'LL.M. Criminal Law'],
    website: 'https://glcvillupuram.ac.in'
  },
  {
    name: 'Arignar Anna Government Arts College, Villupuram',
    location: 'V. Salai, Viluppuram',
    district: 'Viluppuram',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1968, Grade B++ by NAAC, affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'B.A. Tamil', 'M.Sc. Mathematics', 'Ph.D.'],
    website: 'https://aagacvpm.org'
  },

  // ==========================================
  // 37. KALLAKURICHI
  // ==========================================
  {
    name: 'Government Medical College, Kallakurichi',
    location: 'Siruvangur, Kallakurichi',
    district: 'Kallakurichi',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, affiliated to Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Operation Theatre & Anaesthesia Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmckallakurichi.tn.gov.in'
  },
  {
    name: 'Government Arts and Science College, Kallakurichi',
    location: 'Prithivimangalam, Kallakurichi',
    district: 'Kallakurichi',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Government Arts and Science College affiliated to Thiruvalluvar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Chemistry', 'B.Com.', 'B.B.A.', 'B.A. Tamil', 'B.A. English'],
    website: 'https://gasckallakurichi.in'
  },
  {
    name: 'Maha Barathi Engineering College',
    location: 'A-Vasudevanur, Chinnasalem, Kallakurichi',
    district: 'Kallakurichi',
    type: 'Engineering',
    tneaCode: '1442',
    note: 'Estd. 2008, affiliated to Anna University, approved by AICTE',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Artificial Intelligence and Data Science', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering'],
    website: 'https://mbec.ac.in'
  },
  {
    name: 'Government Polytechnic College, Sankarapuram, Kallakurichi',
    location: 'Sankarapuram, Kallakurichi',
    district: 'Kallakurichi',
    type: 'Polytechnic',
    tneaCode: '',
    note: 'DOTE approved Government Polytechnic providing skill development and diploma engineering',
    departments: ['Diploma in Civil Engineering', 'Diploma in Mechanical Engineering', 'Diploma in Electrical and Electronics Engineering', 'Diploma in Electronics and Communication Engineering', 'Diploma in Computer Engineering'],
    website: 'https://gptcsankarapuram.edu.in'
  },

  // ==========================================
  // 38. NILGIRIS
  // ==========================================
  {
    name: 'Government Medical College, The Nilgiris',
    location: 'Fingerpost, Ooty (Udhagamandalam), Nilgiris',
    district: 'Nilgiris',
    type: 'Medical',
    tneaCode: '',
    note: 'Government Medical College, Estd. 2021, highest altitude medical college in Tamil Nadu, Dr. M.G.R. Medical University',
    departments: ['M.B.B.S.', 'B.Sc. Nursing', 'B.Sc. Emergency & Critical Care Technology', 'Diploma in Medical Laboratory Technology'],
    website: 'https://gmcnilgiris.tn.gov.in'
  },
  {
    name: 'Government Arts College, Ooty (Autonomous)',
    location: 'Stone House Hill, Udhagamandalam, Nilgiris',
    district: 'Nilgiris',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1955, Grade A by NAAC, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Physics', 'B.Sc. Chemistry', 'B.Sc. Botany', 'B.Sc. Zoology', 'B.Com.', 'B.A. Economics', 'B.A. English', 'B.A. History', 'B.A. Tamil', 'M.Sc. Botany', 'Ph.D.'],
    website: 'https://gacooty.ac.in'
  },
  {
    name: 'JSS College of Pharmacy',
    location: 'Rock Cottage, Ooty (Udhagamandalam), Nilgiris',
    district: 'Nilgiris',
    type: 'Medical',
    tneaCode: '',
    note: 'NIRF Top 10 Pharmacy College in India, constituent college of JSS AHER, Estd. 1980',
    departments: ['B.Pharm.', 'Pharm.D. (Doctor of Pharmacy)', 'M.Pharm. Pharmacology', 'M.Pharm. Pharmaceutics', 'M.Pharm. Pharmaceutical Analysis', 'Ph.D. in Pharmaceutical Sciences'],
    website: 'https://jssuni.edu.in/jssweb/ooty-pharmacy'
  },
  {
    name: 'CSI College of Engineering',
    location: 'Ketti Valley, Ooty / Coonoor, Nilgiris',
    district: 'Nilgiris',
    type: 'Engineering',
    tneaCode: '2752',
    note: 'Estd. 1998, picturesque campus in Ketti Valley, affiliated to Anna University',
    departments: ['B.E. Computer Science and Engineering', 'B.Tech. Information Technology', 'B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'B.E. Mechanical Engineering', 'B.E. Civil Engineering', 'M.B.A.'],
    website: 'https://csice.edu.in'
  },
  {
    name: 'Providence College for Women (Autonomous)',
    location: 'Springfield, Coonoor, Nilgiris',
    district: 'Nilgiris',
    type: 'Arts & Science',
    tneaCode: '',
    note: 'Estd. 1966, Grade A+ by NAAC, affiliated to Bharathiar University',
    departments: ['B.Sc. Computer Science', 'B.Sc. Mathematics', 'B.Sc. Botany', 'B.Com.', 'B.B.A.', 'B.A. Economics', 'B.A. English Literature', 'B.A. History', 'M.Com.', 'M.A. English Literature'],
    website: 'https://providencecollege.org'
  }
];

// Helper to write catalog
export function buildCatalog() {
  const dataDir = path.resolve('data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const combined = [...collegesData, ...additionalColleges];
  const seen = new Set();
  const deduped = [];

  for (const c of combined) {
    const key = `${c.name.trim().toLowerCase()}|${c.district.trim().toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(c);
    }
  }

  // Assign order and defaults
  const normalized = deduped.map((c, idx) => ({
    name: c.name.trim(),
    location: c.location.trim(),
    district: c.district.trim(),
    type: c.type || 'Engineering',
    tneaCode: c.tneaCode ? String(c.tneaCode).trim() : '',
    note: (c.note || '').trim(),
    departments: Array.isArray(c.departments) ? c.departments.map(d => d.trim()) : [],
    website: (c.website || '').trim(),
    isActive: true,
    order: idx + 1
  }));

  const outputPath = path.join(dataDir, 'tamil_nadu_colleges_master.json');
  fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2), 'utf8');
  console.log(`Successfully generated college catalog with ${normalized.length} colleges at ${outputPath}`);
  return normalized;
}

if (process.argv[1] && process.argv[1].endsWith('build-college-catalog.mjs')) {
  buildCatalog();
}
