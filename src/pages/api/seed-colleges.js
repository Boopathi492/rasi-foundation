import dbConnect from '@/backend/lib/mongodb';
import College from '@/backend/models/College';

// Initial seed data - all colleges
const initialColleges = [
    // Namakkal District
    { name: 'K.S. Rangasamy College of Technology (KSRCT)', location: 'Tiruchengode', district: 'Namakkal District' },
    { name: 'Paavai Engineering College / Paavai College of Technology', location: 'Namakkal', district: 'Namakkal District' },
    { name: 'Selvam College of Technology (Autonomous)', location: 'Namakkal', district: 'Namakkal District' },
    { name: 'CMS College of Engineering', location: 'Namakkal', district: 'Namakkal District' },
    { name: 'Gnanamani College of Technology', location: 'Namakkal', district: 'Namakkal District' },
    { name: 'Muthayammal Engineering College', location: 'Rasipuram', district: 'Namakkal District' },
    { name: 'Sengunthar Engineering College (Autonomous)', location: 'Tiruchengode', district: 'Namakkal District' },
    { name: 'Mahendra Engineering College', location: 'Mallasamudram', district: 'Namakkal District' },
    { name: 'Excel College of Engineering and Technology', location: 'Komarapalayam', district: 'Namakkal District' },
    { name: 'J.K.K. Nattraja College of Engineering and Technology', location: 'Komarapalayam', district: 'Namakkal District' },
    { name: 'PGP College of Engineering and Technology', location: 'Namakkal', district: 'Namakkal District' },
    { name: 'Vidhya Vikas College of Engineering and Technology', location: 'Tiruchengode', district: 'Namakkal District' },
    { name: 'SSM College of Engineering', location: 'Komarapalayam', district: 'Namakkal District' },
    { name: 'Annai Mathammal Sheela Engineering College', location: 'Erumapatti', district: 'Namakkal District' },
    { name: 'S.R.G. Engineering College', location: 'Namakkal', district: 'Namakkal District' },

    // Salem District
    { name: 'Knowledge Institute of Technology (KIOT)', location: 'Salem', district: 'Salem District' },
    { name: 'R. P. Sarathy Institute of Technology (RPSIT)', location: 'Salem', district: 'Salem District' },
    { name: 'Mahendra College of Engineering', location: 'Salem', district: 'Salem District' },
    { name: 'Sri Ganesh Engineering College', location: 'Salem', district: 'Salem District' },
    { name: 'AVS Engineering College', location: 'Salem', district: 'Salem District' },
    { name: 'AVS College of Technology', location: 'Salem', district: 'Salem District' },
    { name: 'Vinayaka Missions University', location: 'Salem', district: 'Salem District' },
    { name: 'Annapoorana Medical College and Hospital', location: 'Salem', district: 'Salem District' },
    { name: 'Sri Shanmugha College of Engineering and Technology', location: 'Salem', district: 'Salem District' },

    // Erode District
    { name: 'Shree Venkateshwara Hi-Tech Engineering College', location: 'Gobichettipalayam', district: 'Erode District' },
    { name: 'Erode Sengunthar Engineering College (ESEC)', location: 'Perundurai', district: 'Erode District' },
    { name: 'J.K.K. Munirajah College of Technology', location: 'Gobichettipalayam', district: 'Erode District' },
    { name: 'M. P. Nachimuthu M. Jaganathan Engineering College (MPNMJ)', location: 'Chennimalai', district: 'Erode District' },
    { name: 'Nandha College of Technology', location: 'Erode', district: 'Erode District' },
    { name: 'Nandha Engineering College', location: 'Perundurai', district: 'Erode District' },
    { name: 'Surya Engineering College', location: 'Erode', district: 'Erode District' },
    { name: 'Sasurie College of Engineering', location: 'Vijayamangalam', district: 'Erode District' },
    { name: 'Al-Ameen Engineering College', location: 'Erode', district: 'Erode District' },
    { name: 'Aishwarya College of Engineering & Technology', location: 'Erode', district: 'Erode District' },

    // Coimbatore Zone
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
    { name: 'Coimbatore Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2704' },
    { name: 'RVS College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2731' },
    { name: 'United Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2761' },
    { name: 'Hindusthan College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2708' },
    { name: 'Hindustan Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2740' },
    { name: 'Akshaya College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2763' },
    { name: 'INFO Institute of Engineering & Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2732' },
    { name: 'KIT – Kalaignar Karunanidhi Institute of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2750' },
    { name: 'Dhanalakshmi Srinivasan College of Engineering (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2743' },
    { name: 'Sri Ranganathar Institute of Engineering & Technology (Autonomous)', location: 'Athipalayam', district: 'Coimbatore Zone', tneaCode: '2342' },
    { name: 'Study World College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2770' },
    { name: 'EASA College of Engineering and Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2749' },
    { name: 'Arjun College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2367' },
    { name: 'JCT College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2762' },
    { name: 'Pollachi Institute of Engineering & Technology', location: 'Pollachi', district: 'Coimbatore Zone', tneaCode: '2354' },
    { name: 'P.A. College of Engineering and Technology (Autonomous)', location: 'Pollachi', district: 'Coimbatore Zone', tneaCode: '2741' },
    { name: 'SNS College of Technology (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2726' },
    { name: 'SNS College of Engineering (Autonomous)', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2734' },
    { name: 'Sri Sai Ranganathan Engineering College', location: 'Thondamuthur', district: 'Coimbatore Zone', tneaCode: '2737' },
    { name: 'Asian College of Engineering and Technology', location: 'Saravanampatti', district: 'Coimbatore Zone', tneaCode: '2338' },
    { name: 'Vishnu Lakshmi College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2368' },
    { name: 'Dhaanish Ahmed Institute of Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2349' },
    { name: 'VSB College of Engineering & Technical Campus', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2357' },
    { name: 'Park College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2716' },
    { name: 'Tamil Nadu College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2721' },
    { name: 'Sri Shakthi Institute of Engineering and Technology', location: 'L&T By-Pass', district: 'Coimbatore Zone', tneaCode: '2727' },
    { name: 'Kathir College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2745' },
    { name: 'Suguna College of Engineering', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2360' },
    { name: 'CMS College of Engineering and Technology', location: 'Coimbatore', district: 'Coimbatore Zone', tneaCode: '2772' },
    { name: 'Christ the King Engineering College', location: 'Karamadai', district: 'Coimbatore Zone', tneaCode: '2650' },
];

export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        // Check existing count
        const existingCount = await College.countDocuments();

        if (existingCount > 0) {
            return res.status(200).json({
                message: 'Colleges already exist in database',
                count: existingCount,
                action: 'none'
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
            message: 'Colleges seeded successfully!',
            count: collegesWithOrder.length,
            action: 'seeded'
        });
    } catch (error) {
        console.error('Error seeding colleges:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
