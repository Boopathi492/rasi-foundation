import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import College from '@/backend/models/College';

// Initial seed data
const initialColleges = [
  // Namakkal District
  { name: 'K.S. Rangasamy College of Technology (KSRCT)', location: 'Tiruchengode', district: 'Namakkal District', tneaCode: '2607' },
  { name: 'Paavai Engineering College', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2611' },
  { name: 'Paavai College of Technology', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2628' },
  { name: 'Selvam College of Technology (Autonomous)', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2625' },
  { name: 'CMS College of Engineering', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2635' },
  { name: 'Gnanamani College of Technology', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2624' },
  { name: 'Muthayammal Engineering College', location: 'Rasipuram', district: 'Namakkal District', tneaCode: '2610' },
  { name: 'Sengunthar Engineering College (Autonomous)', location: 'Tiruchengode', district: 'Namakkal District', tneaCode: '2617' },
  { name: 'Mahendra Engineering College', location: 'Mallasamudram', district: 'Namakkal District', tneaCode: '2609' },
  { name: 'Excel Engineering College', location: 'Komarapalayam', district: 'Namakkal District', tneaCode: '2634' },
  { name: 'J.K.K. Nattraja College of Engineering and Technology', location: 'Komarapalayam', district: 'Namakkal District', tneaCode: '2647' },
  { name: 'PGP College of Engineering and Technology', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2612' },
  { name: 'Vidhya Vikas College of Engineering and Technology', location: 'Tiruchengode', district: 'Namakkal District', tneaCode: '2633' },
  { name: 'SSM College of Engineering', location: 'Komarapalayam', district: 'Namakkal District', tneaCode: '2614' },
  { name: 'Annai Mathammal Sheela Engineering College', location: 'Erumapatti', district: 'Namakkal District', tneaCode: '2602' },
  { name: 'S.R.G. Engineering College', location: 'Namakkal', district: 'Namakkal District', tneaCode: '2767' },

  // Salem District
  { name: 'Knowledge Institute of Technology (KIOT)', location: 'Salem', district: 'Salem District', tneaCode: '2653' },
  { name: 'R. P. Sarathy Institute of Technology (RPSIT)', location: 'Salem', district: 'Salem District', tneaCode: '2639' },
  { name: 'Mahendra College of Engineering', location: 'Salem', district: 'Salem District', tneaCode: '2623' },
  { name: 'Sri Ganesh Engineering College', location: 'Salem', district: 'Salem District', tneaCode: '2341' },
  { name: 'AVS Engineering College', location: 'Salem', district: 'Salem District', tneaCode: '2636' },
  { name: 'AVS College of Technology', location: 'Salem', district: 'Salem District', tneaCode: '2347' },
  { name: 'Vinayaka Missions University', location: 'Salem', district: 'Salem District', note: 'Deemed University – Not under TNEA' },
  { name: 'Annapoorana Engineering College', location: 'Salem', district: 'Salem District', tneaCode: '2648' },
  { name: 'Sri Shanmugha College of Engineering and Technology', location: 'Salem', district: 'Salem District', tneaCode: '2302' },

  // Erode District
  { name: 'Shree Venkateshwara Hi-Tech Engineering College', location: 'Gobichettipalayam', district: 'Erode District', tneaCode: '2747' },
  { name: 'Erode Sengunthar Engineering College (ESEC)', location: 'Perundurai', district: 'Erode District', tneaCode: '2708' },
  { name: 'J.K.K. Munirajah College of Technology', location: 'Gobichettipalayam', district: 'Erode District', tneaCode: '2758' },
  { name: 'M. P. Nachimuthu M. Jaganathan Engineering College (MPNMJ)', location: 'Chennimalai', district: 'Erode District', tneaCode: '2713' },
  { name: 'Nandha College of Technology', location: 'Erode', district: 'Erode District', tneaCode: '2752' },
  { name: 'Nandha Engineering College', location: 'Perundurai', district: 'Erode District', tneaCode: '7322' },
  { name: 'Surya Engineering College', location: 'Erode', district: 'Erode District', tneaCode: '2748' },
  { name: 'Sasurie College of Engineering', location: 'Vijayamangalam', district: 'Erode District', tneaCode: '2717' },
  { name: 'Al-Ameen Engineering College', location: 'Erode', district: 'Erode District', tneaCode: '2652' },
  { name: 'Aishwarya College of Engineering and Technology', location: 'Erode', district: 'Erode District', tneaCode: '2332' },

  // Coimbatore Zone
  { name: 'PSG College of Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2006' },
  { name: 'PSG Institute of Technology and Applied Research (PSG iTech)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2377' },
  { name: 'Coimbatore Institute of Technology (CIT)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '7176' },
  { name: 'Kumaraguru College of Technology (KCT)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2712' },
  { name: 'Sri Eshwar College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2739' },
  { name: 'KPR Institute of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2764' },
  { name: 'Sri Krishna College of Engineering and Technology (SKCET)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2718' },
  { name: 'Sri Ramakrishna Engineering College', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2719' },
  { name: 'Sri Ramakrishna Institute of Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2725' },
  { name: 'Karpagam College of Engineering (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2710' },
  { name: 'Karpagam Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2735' },
  { name: 'Karpagam Academy of Higher Education (KAHE – University)', location: 'Coimbatore', district: 'Coimbatore Zone' },
  { name: 'Sree Sakthi Engineering College (Autonomous)', location: 'Karamadai', district: 'Coimbatore Zone', tneaCode: '2673' },
  { name: 'Adithya Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2744' },
  { name: 'PPG Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2753' },
  { name: 'Rathinam Group of Institutions (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2329', note: 'R-Smart / Sunstone supported' },
  { name: 'Dr. NGP Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2736' },
  { name: 'KGISL Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2751' },
  { name: 'Nehru Institute of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2729' },
  { name: 'Nehru Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2755' },
  { name: 'Coimbatore Institute of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2704' },
  { name: 'RVS College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2731' },
  { name: 'United Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2761' },
  { name: 'Hindusthan College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2777' },
  { name: 'Hindustan Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2740' },
  { name: 'Akshaya College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2763' },
  { name: 'INFO Institute of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2732' },
  { name: 'KIT – Kalaignar Karunanidhi Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2750' },
  { name: 'Dhanalakshmi Srinivasan College of Engineering (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2743' },
  { name: 'Sri Ranganathar Institute of Engineering and Technology (Autonomous)', location: 'Athipalayam', district: 'Coimbatore Zone', tneaCode: '2342' },
  { name: 'Study World College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2770' },
  { name: 'EASA College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2749' },
  { name: 'Arjun College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2367' },
  { name: 'JCT College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2762' },
  { name: 'Pollachi Institute of Engineering and Technology', location: 'Pollachi', district: 'Coimbatore Zone', tneaCode: '2354' },
  { name: 'P.A. College of Engineering and Technology (Autonomous)', location: 'Pollachi', district: 'Coimbatore Zone', tneaCode: '2741' },
  { name: 'SNS College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2726' },
  { name: 'SNS College of Engineering (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2734' },
  { name: 'Sri Sai Ranganathan Engineering College', location: 'Thondamuthur', district: 'Coimbatore Zone', tneaCode: '2737' },
  { name: 'Asian College of Engineering and Technology', location: 'Saravanampatti', district: 'Coimbatore Zone', tneaCode: '2338' },
  { name: 'Vishnu Lakshmi College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2368' },
  { name: 'Dhaanish Ahmed Institute of Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2349' },
  { name: 'VSB College of Engineering and Technical Campus', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2357' },
  { name: 'Park College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2716' },
  { name: 'Tamil Nadu College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2721' },
  { name: 'Sri Shakthi Institute of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2727' },
  { name: 'Kathir College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2745' },
  { name: 'Suguna College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2360' },
  { name: 'CMS College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2772' },
  { name: 'Christ the King Engineering College', location: 'Karamadai', district: 'Coimbatore Zone', tneaCode: '2650' },

  // Bengaluru Zone
  { name: "Akash Group of Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "East Point College", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Alliance University", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Adithya Institute of Technology", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "SEA College of Engineering & Technology", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "T. John Group of Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "S-VYASA University", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "RR Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Harsha Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Atria Institute of Technology", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Garden City University", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Spurthy Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Yenepoya University", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "Krupanidhi Group of Institutions", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "ISBR Bangalore", location: "Bengaluru", district: "Bengaluru Zone" },
  { name: "MVJ College of Engineering", location: "Bengaluru", district: "Bengaluru Zone" },

  // Women Centric Colleges
  { name: "Avinashilingam University for Women", location: "Coimbatore", district: "Women Centric Colleges" },
  { name: "Bharathiyar Institute of Engineering for Women", location: "Attur", district: "Women Centric Colleges" },
  { name: "Idhaya Engineering College for Women", location: "Villupuram", district: "Women Centric Colleges" },
  { name: "Mahendra Engineering College for Women", location: "Tiruchengode", district: "Women Centric Colleges" },
  { name: "Periyar Maniammai University", location: "Vallam", district: "Women Centric Colleges" },
  { name: "Sri Bharathi Engineering College for Women", location: "Alangudi", district: "Women Centric Colleges" },
  { name: 'Vivekanandha College of Engineering for Women', location: 'Tiruchengode', district: 'Women Centric Colleges' },

  // Well Connected Universities
  { name: 'Sree Balaji Institute of Science & Technology', location: 'Chrompet, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Dhanalakshmi Srinivasan University', location: 'Mamandur, Chengalpattu', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Sri Venkateswaraa Medical University', location: 'Red Hills, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Kalasalingam University', location: 'OMR, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: "St. Joseph's University", location: 'Tindivanam, Nallathur', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Vel Tech University', location: 'Avadi, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Saveetha University', location: 'Thandalam, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Takshashila University', location: 'Tindivanam', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Chettinad University', location: 'Kelambakkam Road, OMR, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Dr. M.G.R University', location: 'Maduravoyal, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Bharath University', location: 'Selaiyur, Chennai', district: 'Well Connected Universities', note: 'Deemed University – Direct Admission' },
  { name: 'Vellore Institute of Technology (VIT)', location: 'Vellore, Tamil Nadu', district: 'Well Connected Universities', note: 'Deemed University – NIRF Top-Ranked Private University' },
  { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore, Tamil Nadu', district: 'Well Connected Universities', note: 'Deemed University – NIRF #8, NAAC A++' },
];

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Check if colleges already exist
      const existingCount = await College.countDocuments();

      if (existingCount > 0) {
        return res.status(400).json({
          message: 'Colleges already exist in database',
          count: existingCount
        });
      }

      // Insert all colleges with order
      const collegesWithOrder = initialColleges.map((college, index) => ({
        ...college,
        order: index,
        isActive: true,
      }));

      await College.insertMany(collegesWithOrder);

      res.status(201).json({
        message: 'Colleges seeded successfully',
        count: collegesWithOrder.length
      });
    } catch (error) {
      console.error('Error seeding colleges:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
