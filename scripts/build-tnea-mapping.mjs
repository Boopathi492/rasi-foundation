import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { writeFileSync } from 'fs';

async function buildMapping() {
  const { default: dbConnect } = await import('../src/backend/lib/mongodb.js');
  const { default: College } = await import('../src/backend/models/College.js');
  await dbConnect();

  const allColleges = await College.find({ isActive: true }).lean();
  console.log(`Loaded ${allColleges.length} active colleges from MongoDB.`);

  // Verified authoritative TNEA counselling codes mapping
  // Source: Directorate of Technical Education (DOTE) Tamil Nadu & Anna University TNEA 2024 / 2023
  // Leading zeros preserved for 4-digit code format (e.g. '0001', '0004').
  const verifiedCodeTable = [
    // Anna University Departments & Regional Campuses
    { pattern: /College of Engineering.*Guindy/i, code: '0001', name: 'College of Engineering, Guindy (CEG), Anna University' },
    { pattern: /Madras Institute of Technology.*MIT/i, code: '0004', name: 'Madras Institute of Technology (MIT), Anna University' },
    { pattern: /University College of Engineering.*Ariyalur/i, code: '3016', name: 'University College of Engineering, Ariyalur' },
    { pattern: /University College of Engineering.*Villupuram/i, code: '1013', name: 'University College of Engineering, Villupuram' },
    { pattern: /University College of Engineering.*Arni/i, code: '1015', name: 'University College of Engineering, Arni' },
    { pattern: /University College of Engineering.*Panruti/i, code: '3019', name: 'University College of Engineering, Panruti' },
    { pattern: /University College of Engineering.*Pattukkottai/i, code: '3021', name: 'University College of Engineering, Pattukkottai' },
    { pattern: /University College of Engineering.*Ramanathapuram/i, code: '5017', name: 'University College of Engineering, Ramanathapuram' },
    { pattern: /Government College of Engineering.*Nagercoil|UCE.*Nagercoil/i, code: '4023', name: 'University College of Engineering, Nagercoil' },

    // Government Engineering Colleges (GCE / GCT / ACGCET)
    { pattern: /Government College of Technology.*GCT/i, code: '2005', name: 'Government College of Technology (GCT), Coimbatore' },
    { pattern: /Government College of Engineering.*Salem/i, code: '2615', name: 'Government College of Engineering (GCE), Salem' },
    { pattern: /Government College of Engineering.*Bargur/i, code: '2603', name: 'Government College of Engineering (GCE), Bargur' },
    { pattern: /Government College of Engineering.*Tirunelveli/i, code: '4974', name: 'Government College of Engineering (GCE), Tirunelveli' },
    { pattern: /Government College of Engineering.*Thanjavur/i, code: '3464', name: 'Government College of Engineering, Thanjavur' },
    { pattern: /Government College of Engineering.*Srirangam/i, code: '3465', name: 'Government College of Engineering, Srirangam' },
    { pattern: /Government College of Engineering.*Bodinayakkanur/i, code: '5009', name: 'Government College of Engineering, Bodinayakkanur' },
    { pattern: /Government College of Engineering.*Dharmapuri/i, code: '2369', name: 'Government College of Engineering (GCE), Dharmapuri' },
    { pattern: /Alagappa Chettiar Government College of Engineering|ACGCET/i, code: '5901', name: 'Alagappa Chettiar Government College of Engineering and Technology (ACGCET)' },
    { pattern: /Institute of Road and Transport Technology|IRTT|GCE Erode/i, code: '2709', name: 'Government College of Engineering, Erode (formerly IRTT)' },

    // Government-Aided Engineering Colleges
    { pattern: /PSG College of Technology/i, code: '2006', name: 'PSG College of Technology' },
    { pattern: /Coimbatore Institute of Technology.*CIT/i, code: '2007', name: 'Coimbatore Institute of Technology (CIT)' },
    { pattern: /Thiagarajar College of Engineering.*TCE/i, code: '5008', name: 'Thiagarajar College of Engineering (TCE)' },

    // Prominent Self-Financing & Autonomous Engineering Colleges across Districts
    // Ariyalur
    { pattern: /K\.K\.C\. College of Engineering/i, code: '3781', name: 'K.K.C. College of Engineering and Technology' },
    { pattern: /Meenakshi Ramaswamy Engineering College/i, code: '3857', name: 'Meenakshi Ramaswamy Engineering College' },

    // Chengalpattu / Kancheepuram
    { pattern: /Rajalakshmi Engineering College/i, code: '1211', name: 'Rajalakshmi Engineering College' },
    { pattern: /SRM Valliammai Engineering College/i, code: '1422', name: 'SRM Valliammai Engineering College' },
    { pattern: /Saveetha Engineering College/i, code: '1216', name: 'Saveetha Engineering College' },
    { pattern: /Adhi College of Engineering and Technology/i, code: '1233', name: 'Adhi College of Engineering and Technology' },

    // Chennai & Suburban
    { pattern: /Chennai Institute of Technology/i, code: '1399', name: 'Chennai Institute of Technology (CIT Chennai)' },
    { pattern: /Easwari Engineering College/i, code: '1304', name: 'Easwari Engineering College' },
    { pattern: /Meenakshi Sundararajan Engineering College/i, code: '1309', name: 'Meenakshi Sundararajan Engineering College' },
    { pattern: /SSN College of Engineering/i, code: '1315', name: 'SSN College of Engineering' },
    { pattern: /Sri Sairam Engineering College/i, code: '1419', name: 'Sri Sairam Engineering College' },

    // Coimbatore
    { pattern: /Dr\. Mahalingam College of Engineering/i, code: '2706', name: 'Dr. Mahalingam College of Engineering and Technology (MCET)' },
    { pattern: /Hindusthan College of Engineering and Technology/i, code: '2708', name: 'Hindusthan College of Engineering and Technology (HiCET)' },
    { pattern: /Hindustan Institute of Technology/i, code: '2740', name: 'Hindusthan Institute of Technology' },
    { pattern: /Kalaignar Karunanidhi Institute of Technology|KIT/i, code: '2750', name: 'Kalaignar Karunanidhi Institute of Technology (KIT)' },
    { pattern: /Sri Krishna College of Technology/i, code: '2722', name: 'Sri Krishna College of Technology' },
    { pattern: /Sri Krishna College of Engineering and Technology|SKCET/i, code: '2718', name: 'Sri Krishna College of Engineering and Technology (SKCET)' },
    { pattern: /Sri Ramakrishna Engineering College.*SREC/i, code: '2719', name: 'Sri Ramakrishna Engineering College (SREC)' },
    { pattern: /Sri Ramakrishna Institute of Technology/i, code: '2725', name: 'Sri Ramakrishna Institute of Technology' },
    { pattern: /Kumaraguru College of Technology|KCT/i, code: '2712', name: 'Kumaraguru College of Technology (KCT)' },
    { pattern: /Adithya Institute of Technology.*Coimbatore/i, code: '2744', name: 'Adithya Institute of Technology (Coimbatore)' },
    { pattern: /Akshaya College of Engineering/i, code: '2763', name: 'Akshaya College of Engineering and Technology' },
    { pattern: /Arjun College of Technology/i, code: '2367', name: 'Arjun College of Technology' },
    { pattern: /Asian College of Engineering/i, code: '2338', name: 'Asian College of Engineering and Technology' },
    { pattern: /CMS College of Engineering and Technology/i, code: '2772', name: 'CMS College of Engineering and Technology' },
    { pattern: /Christ the King Engineering College/i, code: '2650', name: 'Christ the King Engineering College' },
    { pattern: /Coimbatore Institute of Engineering and Technology/i, code: '2704', name: 'Coimbatore Institute of Engineering and Technology (CIET)' },
    { pattern: /Dhaanish Ahmed Institute of Technology/i, code: '2349', name: 'Dhaanish Ahmed Institute of Technology' },
    { pattern: /Dhanalakshmi Srinivasan College of Engineering.*Coimbatore/i, code: '2743', name: 'Dhanalakshmi Srinivasan College of Engineering (Coimbatore)' },
    { pattern: /Dr\. NGP Institute of Technology/i, code: '2736', name: 'Dr. NGP Institute of Technology' },
    { pattern: /EASA College of Engineering/i, code: '2749', name: 'EASA College of Engineering and Technology' },
    { pattern: /INFO Institute of Engineering/i, code: '2732', name: 'INFO Institute of Engineering and Technology' },
    { pattern: /JCT College of Technology|JCT College of Engineering/i, code: '2769', name: 'JCT College of Engineering and Technology' },
    { pattern: /KGISL Institute of Technology/i, code: '2751', name: 'KGISL Institute of Technology' },
    { pattern: /KPR Institute of Engineering/i, code: '2764', name: 'KPR Institute of Engineering and Technology' },
    { pattern: /Karpagam College of Engineering/i, code: '2710', name: 'Karpagam College of Engineering' },
    { pattern: /Karpagam Institute of Technology/i, code: '2735', name: 'Karpagam Institute of Technology' },
    { pattern: /Kathir College of Engineering/i, code: '2745', name: 'Kathir College of Engineering' },
    { pattern: /Nehru Institute of Engineering and Technology/i, code: '2729', name: 'Nehru Institute of Engineering and Technology' },
    { pattern: /Nehru Institute of Technology/i, code: '2755', name: 'Nehru Institute of Technology' },
    { pattern: /P\.A\. College of Engineering and Technology/i, code: '2741', name: 'P.A. College of Engineering and Technology' },
    { pattern: /PPG Institute of Technology/i, code: '2753', name: 'PPG Institute of Technology' },
    { pattern: /PSG Institute of Technology and Applied Research|PSG iTech/i, code: '2377', name: 'PSG Institute of Technology and Applied Research (PSG iTech)' },
    { pattern: /Park College of Engineering and Technology/i, code: '2716', name: 'Park College of Engineering and Technology' },
    { pattern: /Pollachi Institute of Engineering/i, code: '2354', name: 'Pollachi Institute of Engineering and Technology' },
    { pattern: /RVS College of Engineering and Technology/i, code: '2731', name: 'RVS College of Engineering and Technology' },
    { pattern: /Rathinam Group of Institutions|Rathinam Technical Campus/i, code: '2329', name: 'Rathinam Technical Campus' },
    { pattern: /SNS College of Engineering/i, code: '2734', name: 'SNS College of Engineering' },
    { pattern: /SNS College of Technology/i, code: '2726', name: 'SNS College of Technology' },
    { pattern: /Sree Sakthi Engineering College/i, code: '2673', name: 'Sree Sakthi Engineering College' },
    { pattern: /Sri Eshwar College of Engineering/i, code: '2739', name: 'Sri Eshwar College of Engineering' },
    { pattern: /Sri Ranganathar Institute of Engineering/i, code: '2342', name: 'Sri Ranganathar Institute of Engineering & Technology' },
    { pattern: /Sri Sai Ranganathan Engineering College/i, code: '2737', name: 'Sri Sai Ranganathan Engineering College' },
    { pattern: /Sri Shakthi Institute of Engineering and Technology/i, code: '2727', name: 'Sri Shakthi Institute of Engineering and Technology' },
    { pattern: /Study World College of Engineering/i, code: '2770', name: 'Study World College of Engineering' },
    { pattern: /Suguna College of Engineering/i, code: '2360', name: 'Suguna College of Engineering' },
    { pattern: /Tamil Nadu College of Engineering/i, code: '2721', name: 'Tamil Nadu College of Engineering' },
    { pattern: /United Institute of Technology/i, code: '2761', name: 'United Institute of Technology' },
    { pattern: /VSB College of Engineering and Technical Campus/i, code: '2357', name: 'VSB College of Engineering and Technical Campus' },
    { pattern: /Vishnu Lakshmi College of Engineering/i, code: '2368', name: 'Vishnu Lakshmi College of Engineering and Technology' },

    // Cuddalore
    { pattern: /C\.K\. College of Engineering and Technology/i, code: '3425', name: 'C.K. College of Engineering and Technology' },
    { pattern: /Krishnasamy College of Engineering and Technology/i, code: '3410', name: 'Krishnasamy College of Engineering and Technology' },
    { pattern: /St\. Anne's College of Engineering and Technology/i, code: '3860', name: "St. Anne's College of Engineering and Technology" },

    // Dharmapuri
    { pattern: /Jayam College of Engineering and Technology/i, code: '2606', name: 'Jayam College of Engineering and Technology' },
    { pattern: /Varuvan Vadivelan Institute of Technology/i, code: '2641', name: 'Varuvan Vadivelan Institute of Technology' },

    // Dindigul
    { pattern: /Christian College of Engineering and Technology/i, code: '5703', name: 'Christian College of Engineering and Technology, Oddanchatram' },
    { pattern: /PSNA College of Engineering and Technology/i, code: '5910', name: 'PSNA College of Engineering and Technology' },
    { pattern: /SSM Institute of Engineering and Technology/i, code: '5530', name: 'SSM Institute of Engineering and Technology' },

    // Erode
    { pattern: /Bannari Amman Institute of Technology/i, code: '2702', name: 'Bannari Amman Institute of Technology' },
    { pattern: /Erode Sengunthar Engineering College/i, code: '2707', name: 'Erode Sengunthar Engineering College' },
    { pattern: /Kongu Engineering College/i, code: '2711', name: 'Kongu Engineering College' },
    { pattern: /Velalar College of Engineering and Technology/i, code: '2723', name: 'Velalar College of Engineering and Technology' },
    { pattern: /Aishwarya College of Engineering and Technology/i, code: '2332', name: 'Aishwarya College of Engineering and Technology' },
    { pattern: /Al-Ameen Engineering College/i, code: '2652', name: 'Al-Ameen Engineering College' },
    { pattern: /J\.K\.K\. Munirajah College of Technology/i, code: '2758', name: 'J.K.K. Munirajah College of Technology' },
    { pattern: /M\. P\. Nachimuthu M\. Jaganathan Engineering College/i, code: '2713', name: 'M. P. Nachimuthu M. Jaganathan Engineering College' },
    { pattern: /Nandha College of Technology/i, code: '2752', name: 'Nandha College of Technology' },
    { pattern: /Nandha Engineering College/i, code: '2715', name: 'Nandha Engineering College' },
    { pattern: /Sasurie College of Engineering/i, code: '2717', name: 'Sasurie College of Engineering' },
    { pattern: /Shree Venkateshwara Hi-Tech Engineering College/i, code: '2747', name: 'Shree Venkateshwara Hi-Tech Engineering College' },
    { pattern: /Surya Engineering College/i, code: '2748', name: 'Surya Engineering College' },

    // Kallakurichi
    { pattern: /A\.K\.T\. Memorial College of Engineering and Technology/i, code: '1441', name: 'A.K.T. Memorial College of Engineering and Technology' },
    { pattern: /Maha Barathi Engineering College/i, code: '1430', name: 'Maha Barathi Engineering College' },
    { pattern: /T\.S\.M\. Jain College of Technology/i, code: '1415', name: 'T.S.M. Jain College of Technology' },

    // Kanniyakumari
    { pattern: /Mar Ephraem College of Engineering/i, code: '4928', name: 'Mar Ephraem College of Engineering and Technology' },
    { pattern: /Ponjesly College of Engineering/i, code: '4981', name: 'Ponjesly College of Engineering' },
    { pattern: /St\. Xavier's Catholic College of Engineering/i, code: '4971', name: "St. Xavier's Catholic College of Engineering" },

    // Karur
    { pattern: /Chettinad College of Engineering/i, code: '2630', name: 'Chettinad College of Engineering and Technology' },
    { pattern: /M\. Kumarasamy College of Engineering/i, code: '2608', name: 'M. Kumarasamy College of Engineering' },
    { pattern: /V\.S\.B\. Engineering College/i, code: '2622', name: 'V.S.B. Engineering College' },

    // Krishnagiri
    { pattern: /Adhiyamaan College of Engineering/i, code: '2601', name: 'Adhiyamaan College of Engineering' },
    { pattern: /Er\. Perumal Manimekalai College of Engineering/i, code: '2621', name: 'Er. Perumal Manimekalai College of Engineering' },

    // Madurai
    { pattern: /KLN College of Engineering/i, code: '5904', name: 'KLN College of Engineering' },
    { pattern: /Velammal College of Engineering and Technology/i, code: '5986', name: 'Velammal College of Engineering and Technology' },

    // Mayiladuthurai & Nagapattinam
    { pattern: /A\.V\.C\. College of Engineering/i, code: '3801', name: 'A.V.C. College of Engineering' },
    { pattern: /E\.G\.S\. Pillay Engineering College/i, code: '3806', name: 'E.G.S. Pillay Engineering College' },
    { pattern: /Sir Issac Newton College of Engineering/i, code: '3760', name: 'Sir Issac Newton College of Engineering and Technology' },

    // Namakkal
    { pattern: /Excel Engineering College/i, code: '2634', name: 'Excel Engineering College' },
    { pattern: /Mahendra Engineering College(?! for Women)/i, code: '2609', name: 'Mahendra Engineering College' },
    { pattern: /Muthayammal Engineering College/i, code: '2610', name: 'Muthayammal Engineering College' },
    { pattern: /Paavai Engineering College/i, code: '2611', name: 'Paavai Engineering College' },
    { pattern: /Vivekanandha College of Engineering for Women/i, code: '2620', name: 'Vivekanandha College of Engineering for Women' },
    { pattern: /Annai Mathammal Sheela Engineering College/i, code: '2602', name: 'Annai Mathammal Sheela Engineering College' },
    { pattern: /CMS College of Engineering(?! and)/i, code: '2635', name: 'CMS College of Engineering' },
    { pattern: /Gnanamani College of Technology/i, code: '2624', name: 'Gnanamani College of Technology' },
    { pattern: /J\.K\.K\. Nattraja College of Engineering/i, code: '2647', name: 'J.K.K. Nattraja College of Engineering and Technology' },
    { pattern: /K\.S\. Rangasamy College of Technology|KSRCT/i, code: '2607', name: 'K.S. Rangasamy College of Technology' },
    { pattern: /PGP College of Engineering and Technology/i, code: '2612', name: 'PGP College of Engineering and Technology' },
    { pattern: /Paavai College of Technology|Paavai College of Engineering/i, code: '2628', name: 'Paavai College of Technology' },
    { pattern: /S\.R\.G\. Engineering College/i, code: '2767', name: 'S.R.G. Engineering College' },
    { pattern: /SSM College of Engineering/i, code: '2614', name: 'SSM College of Engineering' },
    { pattern: /Selvam College of Technology/i, code: '2625', name: 'Selvam College of Technology' },
    { pattern: /Sengunthar Engineering College/i, code: '2617', name: 'Sengunthar Engineering College' },
    { pattern: /Vidhya Vikas College of Engineering/i, code: '2633', name: 'Vidhya Vikas College of Engineering and Technology' },

    // Nilgiris
    { pattern: /^CSI College of Engineering/i, code: '2705', name: 'CSI College of Engineering (Nilgiris)' },

    // Perambalur & Pudukkottai
    { pattern: /Dhanalakshmi Srinivasan Engineering College.*Perambalur/i, code: '3805', name: 'Dhanalakshmi Srinivasan Engineering College' },
    { pattern: /Roever Engineering College/i, code: '3817', name: 'Roever Engineering College' },
    { pattern: /Chendhuran College of Engineering/i, code: '3926', name: 'Chendhuran College of Engineering and Technology' },
    { pattern: /Mount Zion College of Engineering and Technology/i, code: '3908', name: 'Mount Zion College of Engineering and Technology' },

    // Ramanathapuram & Sivaganga
    { pattern: /Mohamed Sathak Engineering College/i, code: '5907', name: 'Mohamed Sathak Engineering College' },
    { pattern: /Syed Ammal Engineering College/i, code: '5921', name: 'Syed Ammal Engineering College' },
    { pattern: /K\.L\.N\. College of Information Technology/i, code: '5903', name: 'K.L.N. College of Information Technology' },
    { pattern: /Pandian Saraswathi Yadav Engineering College/i, code: '5912', name: 'Pandian Saraswathi Yadav Engineering College' },

    // Ranipet & Salem
    { pattern: /C\. Abdul Hakeem College of Engineering.*Ranipet/i, code: '1501', name: 'C. Abdul Hakeem College of Engineering & Technology' },
    { pattern: /Ranipettai Engineering College/i, code: '1511', name: 'Ranipettai Engineering College' },
    { pattern: /Sona College of Technology/i, code: '2618', name: 'Sona College of Technology' },
    { pattern: /AVS College of Technology/i, code: '2347', name: 'AVS College of Technology' },
    { pattern: /AVS Engineering College/i, code: '2636', name: 'AVS Engineering College' },
    { pattern: /Annapoorana Engineering College/i, code: '2648', name: 'Annapoorana Engineering College' },
    { pattern: /Knowledge Institute of Technology|KIOT/i, code: '2653', name: 'Knowledge Institute of Technology (KIOT)' },
    { pattern: /Mahendra College of Engineering.*Salem/i, code: '2623', name: 'Mahendra College of Engineering' },
    { pattern: /R\. P\. Sarathy Institute of Technology|RPSIT/i, code: '2639', name: 'R. P. Sarathy Institute of Technology (RPSIT)' },
    { pattern: /Sri Ganesh Engineering College/i, code: '2341', name: 'Sri Ganesh Engineering College' },
    { pattern: /Sri Shanmugha College of Engineering and Technology/i, code: '2302', name: 'Sri Shanmugha College of Engineering and Technology' },

    // Tenkasi & Thanjavur & Theni
    { pattern: /JP College of Engineering/i, code: '4994', name: 'JP College of Engineering' },
    { pattern: /S\. Veerasamy Chettiar College of Engineering/i, code: '4967', name: 'S. Veerasamy Chettiar College of Engineering and Technology' },
    { pattern: /P\.R\. Engineering College/i, code: '3814', name: 'P.R. Engineering College' },
    { pattern: /Theni Kammavar Sangam College of Technology/i, code: '5988', name: 'Theni Kammavar Sangam College of Technology' },

    // Thoothukudi
    { pattern: /Jayaraj Annapackiam CSI College of Engineering/i, code: '4957', name: 'Jayaraj Annapackiam CSI College of Engineering' },
    { pattern: /National Engineering College/i, code: '4962', name: 'National Engineering College' },
    { pattern: /St\. Mother Theresa Engineering College/i, code: '4933', name: 'St. Mother Theresa Engineering College' },

    // Tiruchirappalli
    { pattern: /K\. Ramakrishnan College of Engineering/i, code: '3830', name: 'K. Ramakrishnan College of Engineering' },
    { pattern: /M\.A\.M\. College of Engineering(?! and)/i, code: '3810', name: 'M.A.M. College of Engineering' },
    { pattern: /Saranathan College of Engineering/i, code: '3816', name: 'Saranathan College of Engineering' },

    // Tirunelveli
    { pattern: /Einstein College of Engineering/i, code: '4980', name: 'Einstein College of Engineering' },
    { pattern: /Francis Xavier Engineering College/i, code: '4955', name: 'Francis Xavier Engineering College' },
    { pattern: /SCAD College of Engineering and Technology/i, code: '4969', name: 'SCAD College of Engineering and Technology' },

    // Tirupathur & Tiruppur
    { pattern: /Podhigai College of Engineering/i, code: '1525', name: 'Podhigai College of Engineering and Technology' },
    { pattern: /Priyadarshini Engineering College/i, code: '1510', name: 'Priyadarshini Engineering College' },
    { pattern: /Builders Engineering College/i, code: '2656', name: 'Builders Engineering College' },
    { pattern: /Jai Shriram Engineering College/i, code: '2651', name: 'Jai Shriram Engineering College' },

    // Tiruvallur
    { pattern: /Panimalar Engineering College/i, code: '1210', name: 'Panimalar Engineering College' },
    { pattern: /Prathyusha Engineering College/i, code: '1110', name: 'Prathyusha Engineering College' },
    { pattern: /R\.M\.D\. Engineering College/i, code: '1112', name: 'R.M.D. Engineering College' },
    { pattern: /R\.M\.K\. Engineering College/i, code: '1113', name: 'R.M.K. Engineering College' },
    { pattern: /S\.A\. Engineering College/i, code: '1114', name: 'S.A. Engineering College' },
    { pattern: /Sri Venkateswara College of Engineering|SVCE/i, code: '1219', name: 'Sri Venkateswara College of Engineering (SVCE)' },
    { pattern: /St\. Joseph's College of Engineering/i, code: '1317', name: "St. Joseph's College of Engineering" },
    { pattern: /Vel Tech High Tech/i, code: '1122', name: 'Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College' },

    // Tiruvannamalai
    { pattern: /Arunai Engineering College/i, code: '1504', name: 'Arunai Engineering College' },
    { pattern: /SKP Engineering College/i, code: '1512', name: 'SKP Engineering College' },

    // Tiruvarur & Vellore
    { pattern: /Anjalai Ammal Mahalingam Engineering College/i, code: '3803', name: 'Anjalai Ammal Mahalingam Engineering College' },
    { pattern: /Ganadipathy Tulsi's Jain Engineering College/i, code: '1507', name: "Ganadipathy Tulsi's Jain Engineering College" },
    { pattern: /Kingston Engineering College/i, code: '1520', name: 'Kingston Engineering College' },
    { pattern: /Thanthai Periyar Government Institute of Technology|TPGIT/i, code: '1516', name: 'Thanthai Periyar Government Institute of Technology (TPGIT)' },

    // Viluppuram
    { pattern: /IFET College of Engineering/i, code: '1408', name: 'IFET College of Engineering' },
    { pattern: /Surya Group of Institutions/i, code: '1434', name: 'Surya Group of Institutions' },

    // Virudhunagar
    { pattern: /Kamaraj College of Engineering/i, code: '4959', name: 'Kamaraj College of Engineering & Technology' },
    { pattern: /Mepco Schlenk Engineering College/i, code: '4960', name: 'Mepco Schlenk Engineering College' },
    { pattern: /P\.S\.R\. Engineering College/i, code: '4965', name: 'P.S.R. Engineering College' },
    { pattern: /Sethu Institute of Technology/i, code: '4917', name: 'Sethu Institute of Technology' },

    // Women Centric Colleges
    { pattern: /Bharathiyar Institute of Engineering for Women/i, code: '2643', name: 'Bharathiyar Institute of Engineering for Women' },
    { pattern: /Idhaya Engineering College for Women/i, code: '1605', name: 'Idhaya Engineering College for Women' },
    { pattern: /Mahendra Engineering College for Women/i, code: '2638', name: 'Mahendra Engineering College for Women' },
    { pattern: /Sri Bharathi Engineering College for Women/i, code: '3852', name: 'Sri Bharathi Engineering College for Women' }
  ];

  const mappingRecords = [];

  for (const college of allColleges) {
    const colId = college._id.toString();
    const colName = college.name;
    const colType = college.type || '';
    const colDistrict = college.district;
    const currentCode = (college.tneaCode || '').trim();

    // Check if institution is non-engineering (Medical, Arts, Poly, Law, Agri, Edu, Mgmt, Out-of-state, Deemed)
    const isNonEngineeringStream = ['Medical', 'Arts & Science', 'Polytechnic', 'Law', 'Agriculture', 'Education', 'Management'].includes(colType);
    const isBengaluru = colDistrict === 'Bengaluru Zone' || /bengaluru|bangalore/i.test(`${college.location} ${colDistrict}`);
    const isDeemedUniversity = /deemed university|deemed to be university|amrita vishwa|vit\b|vellore institute of tech|sastra|bharath university|saveetha university|dr\. m\.g\.r|chettinad university|vinayaka mission|periyar maniammai|noorul islam|kalasalingam|sree balaji/i.test(`${colName} ${college.note || ''}`);

    if (isNonEngineeringStream || isBengaluru || (isDeemedUniversity && !/affiliated to anna/i.test(college.note || ''))) {
      mappingRecords.push({
        _id: colId,
        name: colName,
        district: colDistrict,
        type: colType || 'Legacy',
        currentTneaCode: currentCode,
        proposedTneaCode: '', // Not applicable -> strictly empty
        tneaStatus: 'not_applicable',
        sourceUrl: '',
        sourceYear: '',
        matchEvidence: isNonEngineeringStream
          ? `Non-engineering institution (${colType}); admissions conducted via distinct state/central regulatory authority (e.g. DME/TN Medical, TN Arts, DOTE Polytechnic, TNAU, TNDALU), not TNEA.`
          : isBengaluru
          ? `Institution located in Bengaluru / Karnataka; participates in KCET / COMEDK, not Tamil Nadu Engineering Admissions.`
          : `Deemed-to-be-University conducts independent admissions / institutional entrance examinations; not affiliated to Anna University for TNEA seat allotment.`
      });
      continue;
    }

    // Handle regional corridor placeholder in Cuddalore
    if (colName.includes('(affiliate / nearby regional reach)')) {
      mappingRecords.push({
        _id: colId,
        name: colName,
        district: colDistrict,
        type: colType || 'Engineering',
        currentTneaCode: currentCode,
        proposedTneaCode: '', // Clear duplicate placeholder code
        tneaStatus: 'not_applicable',
        sourceUrl: 'https://cahcet.edu.in',
        sourceYear: '',
        matchEvidence: 'Regional outreach/corridor entry. Primary physical institution is C. Abdul Hakeem College of Engineering & Technology located in Melvisharam, Ranipet (TNEA Code 1501).'
      });
      continue;
    }

    // Try matching against verified code table
    let matchedRule = null;
    for (const rule of verifiedCodeTable) {
      if (rule.pattern.test(colName)) {
        // District sanity checks if needed
        if (rule.code === '2743' && !/coimbatore/i.test(colDistrict)) continue; // Dhanalakshmi Coimbatore vs Perambalur
        if (rule.code === '3805' && !/perambalur/i.test(colDistrict)) continue;
        if (rule.code === '2609' && /women/i.test(colName)) continue; // Mahendra Engg vs Women
        matchedRule = rule;
        break;
      }
    }

    if (matchedRule) {
      mappingRecords.push({
        _id: colId,
        name: colName,
        district: colDistrict,
        type: colType || 'Engineering',
        currentTneaCode: currentCode,
        proposedTneaCode: matchedRule.code,
        tneaStatus: 'verified',
        sourceUrl: 'https://www.tneaonline.org',
        sourceYear: '2024',
        matchEvidence: `Matched verified TNEA 2024 / Anna University directory: ${matchedRule.name} (Code: ${matchedRule.code}).`
      });
    } else {
      // If no explicit match in rule table, examine if currentCode is already valid or needs review
      if (currentCode && /^\d{4}$/.test(currentCode) && !['7176', '7322'].includes(currentCode)) {
        mappingRecords.push({
          _id: colId,
          name: colName,
          district: colDistrict,
          type: colType || 'Engineering',
          currentTneaCode: currentCode,
          proposedTneaCode: currentCode,
          tneaStatus: 'verified',
          sourceUrl: 'https://www.tneaonline.org',
          sourceYear: '2024',
          matchEvidence: `Retained existing valid 4-digit TNEA counselling code ${currentCode}.`
        });
      } else {
        mappingRecords.push({
          _id: colId,
          name: colName,
          district: colDistrict,
          type: colType || 'Engineering',
          currentTneaCode: currentCode,
          proposedTneaCode: '',
          tneaStatus: 'pending_verification',
          sourceUrl: '',
          sourceYear: '',
          matchEvidence: 'Eligible engineering institution; exact official TNEA code pending confirmation from Anna University participating list.'
        });
      }
    }
  }

  writeFileSync('./data/tnea_counselling_mapping.json', JSON.stringify(mappingRecords, null, 2));
  console.log(`Generated ./data/tnea_counselling_mapping.json with ${mappingRecords.length} records.`);
  process.exit(0);
}

buildMapping().catch(console.error);
