import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standardized educational disciplines mapped to schema category values:
// 'medical', 'engineering', 'management', 'arts', 'law', 'education', 'agriculture'

const courses = [
  // =========================================================================
  // 1. MEDICAL & HEALTHCARE (medical) - 56 Programs
  // =========================================================================
  {
    name: 'MBBS',
    code: 'MBBS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with Physics, Chemistry, Biology (PCB) with minimum 50% marks (40% for reserved categories) and qualifying rank in NEET-UG. Check specific institution and NMC guidelines.',
    description: 'Premier undergraduate medical qualification preparing students to diagnose, treat, and prevent human illnesses through rigorous clinical training, anatomy, pathology, pharmacology, and a mandatory 1-year rotating internship.',
    order: 1
  },
  {
    name: 'BDS',
    code: 'BDS',
    level: 'UG',
    category: 'medical',
    duration: '5 Years',
    eligibility: '10+2 with PCB and valid NEET-UG score. Check DCI and university-specific admission requirements.',
    description: 'Bachelor of Dental Surgery training students in comprehensive oral healthcare, maxillofacial surgery, prosthodontics, periodontics, and dental therapeutics with clinical chairside practice.',
    order: 2
  },
  {
    name: 'BAMS',
    code: 'BAMS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB and qualifying rank in NEET-UG. Check NCISM guidelines for specific eligibility.',
    description: 'Bachelor of Ayurvedic Medicine and Surgery integrating traditional Ayurvedic principles with modern clinical diagnostics, pharmacology, Panchakarma, and holistic healing systems.',
    order: 3
  },
  {
    name: 'BHMS',
    code: 'BHMS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB and NEET-UG qualification. Check NCH and admission authority guidelines.',
    description: 'Bachelor of Homeopathic Medicine and Surgery focusing on holistic alternative healthcare, homeopathic repertory, materia medica, clinical pathology, and organon of medicine.',
    order: 4
  },
  {
    name: 'BSMS',
    code: 'BSMS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB, Tamil language proficiency at 10th/12th level, and NEET-UG qualification. Check TN Health and NCISM criteria.',
    description: 'Bachelor of Siddha Medicine and Surgery rooted in ancient Tamil medicine, herbal formulations, Varmam therapy, diagnostic pulse reading, and holistic health science.',
    order: 5
  },
  {
    name: 'BNYS',
    code: 'BNYS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB with minimum 50% marks. NEET or state merit criteria as notified by health universities.',
    description: 'Bachelor of Naturopathy and Yogic Sciences emphasizing drugless natural healing, hydrotherapy, mud therapy, therapeutic dietetics, acupuncture, and yogic therapy.',
    order: 6
  },
  {
    name: 'BUMS',
    code: 'BUMS',
    level: 'UG',
    category: 'medical',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB, Urdu language proficiency at 10th/12th, and NEET-UG qualification. Check regulatory guidelines.',
    description: 'Bachelor of Unani Medicine and Surgery based on Greco-Arabic medicine principles, humoral therapy, herbal pharmacology, and clinical diagnostics.',
    order: 7
  },
  {
    name: 'B.Sc Nursing',
    code: 'BSC-NURS',
    level: 'UG',
    category: 'medical',
    duration: '4 Years',
    eligibility: '10+2 with PCB and English with minimum 45% aggregate marks. State entrance or NEET-UG as per institution norms.',
    description: 'Professional nursing degree offering hands-on patient care training, pharmacology, medical-surgical nursing, community health, pediatrics, and critical intensive care.',
    order: 8
  },
  {
    name: 'Post Basic B.Sc Nursing',
    code: 'PB-BSC-NUR',
    level: 'UG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'Registered Nurse and Registered Midwife (RNRM) with GNM diploma certificate. Check state nursing council criteria.',
    description: 'Advanced degree program for practicing diploma nurses to upgrade clinical competencies, nursing research skills, healthcare leadership, and hospital administration.',
    order: 9
  },
  {
    name: 'M.Sc Medical-Surgical Nursing',
    code: 'MSC-MSN',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Nursing / Post Basic B.Sc Nursing with minimum 55% marks and at least 1 year of clinical experience. Check INC norms.',
    description: 'Specialized postgraduate nursing program focusing on adult intensive care, oncology, cardiology, nephrology, advanced clinical assessment, and nursing education.',
    order: 10
  },
  {
    name: 'M.Sc Pediatric Nursing',
    code: 'MSC-PED-NUR',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Nursing or PB B.Sc Nursing with 55% marks and clinical experience. Check INC and university guidelines.',
    description: 'Postgraduate program in child healthcare, neonatal intensive care (NICU), pediatric emergencies, growth and development assessment, and pediatric pharmacology.',
    order: 11
  },
  {
    name: 'M.Sc Obstetrics and Gynecological Nursing',
    code: 'MSC-OBG-NUR',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Nursing / PB B.Sc Nursing with minimum 55% marks and 1 year experience. Check INC norms.',
    description: 'Advanced clinical specialization in maternal health, antenatal care, high-risk labor management, neonatal resuscitation, and women healthcare leadership.',
    order: 12
  },
  {
    name: 'M.Sc Community Health Nursing',
    code: 'MSC-CHN',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Nursing / PB B.Sc Nursing with 55% aggregate and 1 year clinical work experience.',
    description: 'Public health and epidemiology-focused nursing specialization addressing preventive healthcare, family health welfare, rural healthcare delivery, and health policy.',
    order: 13
  },
  {
    name: 'M.Sc Psychiatric Nursing',
    code: 'MSC-PSY-NUR',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Nursing or Post Basic B.Sc Nursing with 55% aggregate marks and clinical experience.',
    description: 'Mental health nursing program focusing on psychiatric assessment, psychopharmacology, psychotherapy, addiction counseling, and rehabilitation care.',
    order: 14
  },
  {
    name: 'GNM (General Nursing and Midwifery)',
    code: 'GNM',
    level: 'Diploma',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 in any stream (preferably PCB/English) with minimum 40% aggregate marks. Check state nursing board norms.',
    description: 'Foundational nursing diploma qualifying candidates to deliver patient care, assist in surgical units, administer medications, and provide maternal-child healthcare.',
    order: 15
  },
  {
    name: 'ANM (Auxiliary Nurse Midwifery)',
    code: 'ANM',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 in any stream with minimum 40% marks. Age criteria as per state nursing council.',
    description: 'Community-oriented healthcare training focusing on basic healthcare delivery, maternal care, child immunization, and primary health centre support.',
    order: 16
  },
  {
    name: 'B.Pharm',
    code: 'BPHARM',
    level: 'UG',
    category: 'medical',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 50% marks. Lateral entry available for D.Pharm holders.',
    description: 'Undergraduate pharmaceutical degree covering medicinal chemistry, drug formulation, industrial manufacturing, pharmacology, biopharmaceutics, and clinical trials.',
    order: 17
  },
  {
    name: 'B.Pharm (Lateral Entry)',
    code: 'BPHARM-LE',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: 'Pass in D.Pharm from a PCI-approved institution with minimum 50% marks.',
    description: 'Direct entry into the second year of B.Pharm for diploma graduates to attain a professional graduate degree in pharmaceutical sciences.',
    order: 18
  },
  {
    name: 'Pharm.D',
    code: 'PHARMD',
    level: 'UG',
    category: 'medical',
    duration: '6 Years',
    eligibility: '10+2 with PCM or PCB with 50% marks or D.Pharm pass. Check PCI and university norms.',
    description: 'Doctor of Pharmacy professional doctorate program focusing on clinical pharmacy, hospital therapeutics, patient counseling, adverse drug monitoring, and clinical research.',
    order: 19
  },
  {
    name: 'Pharm.D (Post Baccalaureate)',
    code: 'PHARMD-PB',
    level: 'PG',
    category: 'medical',
    duration: '3 Years',
    eligibility: 'Pass in B.Pharm from a recognized PCI-approved college or university.',
    description: 'Postgraduate clinical pharmacy doctorate enabling B.Pharm graduates to achieve clinical doctor of pharmacy credentials with 2 years didactic and 1 year residency.',
    order: 20
  },
  {
    name: 'M.Pharm Pharmaceutics',
    code: 'MPHARM-PCEU',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Pharm with minimum 55% marks and GPAT / university entrance. Check PCI norms.',
    description: 'Advanced study of novel drug delivery systems (NDDS), nanomedicine, industrial formulation design, biopharmaceutics, and scale-up manufacturing.',
    order: 21
  },
  {
    name: 'M.Pharm Pharmacology',
    code: 'MPHARM-PCOL',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Pharm with minimum 55% marks and qualifying GPAT or state PG entrance.',
    description: 'Specialization in drug mechanisms, toxicological screening, pre-clinical animal models, molecular pharmacology, and clinical trial monitoring.',
    order: 22
  },
  {
    name: 'M.Pharm Pharmaceutical Chemistry',
    code: 'MPHARM-PCHM',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Pharm degree with 55% marks from an accredited institution.',
    description: 'Focuses on computer-aided drug design (CADD), organic synthesis of new chemical entities, spectral analysis, and structure-activity relationships.',
    order: 23
  },
  {
    name: 'M.Pharm Regulatory Affairs',
    code: 'MPHARM-RA',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Pharm with minimum 55% marks. Check PCI guidelines.',
    description: 'Postgraduate study of global drug registration, USFDA / EMA documentation, dossier compilation (CTD/eCTD), intellectual property rights, and pharmaceutical audits.',
    order: 24
  },
  {
    name: 'M.Pharm Pharmaceutical Analysis',
    code: 'MPHARM-PANL',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Pharm with minimum 55% aggregate marks.',
    description: 'Expertise in modern instrumental analytical techniques (HPLC, LC-MS, GC, NMR), method validation, quality control, and stability testing of drugs.',
    order: 25
  },
  {
    name: 'D.Pharm',
    code: 'DPHARM',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with PCM or PCB from a recognized state or central board.',
    description: 'Foundational pharmacy diploma qualifying students as registered retail and hospital pharmacists competent in drug dispensing and community pharmacy management.',
    order: 26
  },
  {
    name: 'BPT (Bachelor of Physiotherapy)',
    code: 'BPT',
    level: 'UG',
    category: 'medical',
    duration: '4.5 Years',
    eligibility: '10+2 with PCB with minimum 50% marks. 4.5 years includes 6 months compulsory rotatory clinical internship.',
    description: 'Physical therapy degree developing expertise in neuro-rehabilitation, orthopedic mobilization, sports biomechanics, electrotherapy, and exercise therapy.',
    order: 27
  },
  {
    name: 'MPT Orthopedics',
    code: 'MPT-ORTHO',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'BPT degree with 50% aggregate marks and completion of 6 months internship.',
    description: 'Specialization in musculo-skeletal rehabilitation, joint mobilization, spine disorders, sports trauma recovery, and post-surgical orthopedic therapy.',
    order: 28
  },
  {
    name: 'MPT Neurology',
    code: 'MPT-NEURO',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'Pass in BPT with internship completion from a recognized university.',
    description: 'Focuses on rehabilitation of stroke, traumatic brain injury, spinal cord lesions, cerebral palsy, Parkinsonism, and peripheral nerve disorders.',
    order: 29
  },
  {
    name: 'MPT Cardio-Respiratory',
    code: 'MPT-CARDIO',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'BPT degree from a recognized institution with 50% aggregate marks.',
    description: 'Expertise in intensive care chest physiotherapy, cardiac rehabilitation, pulmonary function recovery, and post-CABG physical reconditioning.',
    order: 30
  },
  {
    name: 'MPT Sports Physiotherapy',
    code: 'MPT-SPORTS',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'BPT with 50% aggregate marks from an accredited college/university.',
    description: 'Focused on athletic conditioning, acute sports injury assessment, biomechanical motion analysis, taping techniques, and rapid return-to-play protocols.',
    order: 31
  },
  {
    name: 'BOT (Bachelor of Occupational Therapy)',
    code: 'BOT',
    level: 'UG',
    category: 'medical',
    duration: '4.5 Years',
    eligibility: '10+2 with PCB with minimum 50% marks. Includes 6 months mandatory internship.',
    description: 'Prepares practitioners to assist individuals with physical, cognitive, or sensory challenges in regaining functional independence and daily living skills.',
    order: 32
  },
  {
    name: 'MOT (Master of Occupational Therapy)',
    code: 'MOT',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'BOT with minimum 50% marks and completed internship.',
    description: 'Advanced occupational therapy specializing in developmental disabilities, sensory integration therapy, hand rehabilitation, and geriatric ergonomics.',
    order: 33
  },
  {
    name: 'B.Sc Medical Laboratory Technology',
    code: 'BSC-MLT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB or vocational MLT with 50% marks.',
    description: 'Diagnostic laboratory science program teaching automated clinical biochemistry, medical microbiology, hematology, histopathology, and blood banking.',
    order: 34
  },
  {
    name: 'M.Sc Medical Laboratory Technology',
    code: 'MSC-MLT',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc MLT with minimum 50% marks from a recognized university.',
    description: 'Postgraduate diagnostic laboratory specialization in advanced molecular diagnostics, clinical immunology, automated cytology, and lab accreditation management.',
    order: 35
  },
  {
    name: 'B.Sc Radiology and Imaging Technology',
    code: 'BSC-RAD',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with Physics, Chemistry, Biology / Mathematics with 50% marks.',
    description: 'Teaches medical imaging modalities including digital radiography, computed tomography (CT), magnetic resonance imaging (MRI), mammography, and ultrasound.',
    order: 36
  },
  {
    name: 'B.Sc Operation Theatre and Anaesthesia Technology',
    code: 'BSC-OTAT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% marks.',
    description: 'Trains surgical technologists in sterilization, surgical instrumentation, anesthesia workstation setup, intra-operative monitoring, and patient recovery care.',
    order: 37
  },
  {
    name: 'B.Sc Cardiac Care Technology',
    code: 'BSC-CCT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Cardiovascular diagnostics program covering electrocardiography (ECG), echocardiography, treadmill testing, cardiac catheterization lab assistance, and pacemaker checks.',
    order: 38
  },
  {
    name: 'B.Sc Perfusion Technology',
    code: 'BSC-PERF',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% marks.',
    description: 'Specialized clinical discipline training technologist in managing heart-lung bypass machines and ECMO support during open-heart surgeries and critical care.',
    order: 39
  },
  {
    name: 'B.Sc Renal Dialysis Technology',
    code: 'BSC-RDT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Prepares hemodialysis technologists in dialyzer reprocessing, vascular access management, peritoneal dialysis, water treatment plants, and renal care monitoring.',
    order: 40
  },
  {
    name: 'B.Sc Optometry',
    code: 'BSC-OPTO',
    level: 'UG',
    category: 'medical',
    duration: '4 Years',
    eligibility: '10+2 with PCB / PCM with 50% marks. 4-year program includes 1-year clinical internship.',
    description: 'Comprehensive primary eye and vision care degree covering refractive errors, contact lens fitting, binocular vision therapy, low vision aids, and ocular disease detection.',
    order: 41
  },
  {
    name: 'Master of Optometry (M.Optom)',
    code: 'M-OPTOM',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'B.Sc Optometry / B.Optom from a recognized university with minimum 50% marks.',
    description: 'Advanced postgraduate vision science specializing in pediatric optometry, specialty contact lenses, ocular therapeutics, binocular vision anomalies, and clinical research.',
    order: 42
  },
  {
    name: 'B.Sc Physician Assistant',
    code: 'BSC-PA',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Trains healthcare professionals to perform diagnostic exams, assist in medical surgeries, interpret routine lab tests, and coordinate patient treatment under doctors.',
    order: 43
  },
  {
    name: 'B.Sc Respiratory Therapy',
    code: 'BSC-RESP',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with 50% aggregate marks.',
    description: 'Focuses on mechanical ventilation, arterial blood gas analysis, aerosol medications, pulmonary rehabilitation, and intensive care airway management.',
    order: 44
  },
  {
    name: 'B.Sc Critical Care Technology',
    code: 'BSC-CCT-ICU',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Prepares ICU technologists in advanced vital monitoring, hemodynamic support systems, infusion management, and resuscitation protocols for critically ill patients.',
    order: 45
  },
  {
    name: 'B.Sc Emergency and Trauma Care Technology',
    code: 'BSC-ETCT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Emergency medicine technology program training students in acute triage, polytrauma stabilization, basic and advanced life support, and emergency room coordination.',
    order: 46
  },
  {
    name: 'B.Sc Neuro Electrophysiology',
    code: 'BSC-NEP',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks.',
    description: 'Trains technologists in EEG, EMG, nerve conduction velocity (NCV), polysomnography (sleep studies), and intraoperative neuromonitoring.',
    order: 47
  },
  {
    name: 'B.Sc Nuclear Medicine Technology',
    code: 'BSC-NMT',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with PCB or PCM with minimum 50% aggregate marks.',
    description: 'Focuses on diagnostic and therapeutic radiopharmaceuticals, gamma cameras, SPECT-CT, PET-CT scans, and radiation safety protocols.',
    order: 48
  },
  {
    name: 'B.Sc Medical Record Science',
    code: 'BSC-MRS',
    level: 'UG',
    category: 'medical',
    duration: '3 Years',
    eligibility: '10+2 with any stream / Science with minimum 45% aggregate marks.',
    description: 'Health information management program covering ICD-10 clinical coding, electronic health records (EHR), hospital statistics, medicolegal compliance, and data analytics.',
    order: 49
  },
  {
    name: 'BASLP',
    code: 'BASLP',
    level: 'UG',
    category: 'medical',
    duration: '4 Years',
    eligibility: '10+2 with PCB / PCM with 50% marks. RCI-approved curriculum including 1-year clinical internship.',
    description: 'Bachelor of Audiology and Speech-Language Pathology training professionals to evaluate and rehabilitate hearing loss, speech disorders, stammering, and voice pathologies.',
    order: 50
  },
  {
    name: 'MASLP',
    code: 'MASLP',
    level: 'PG',
    category: 'medical',
    duration: '2 Years',
    eligibility: 'Pass in BASLP / B.Sc (Speech & Hearing) with minimum 50% marks from an RCI-recognized institution.',
    description: 'Postgraduate specialization in cochlear implants, pediatric audiology, neurogenic communication disorders, dysphagia management, and voice science.',
    order: 51
  },
  {
    name: 'Diploma in Medical Laboratory Technology (DMLT)',
    code: 'DMLT',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with PCB / Science with minimum 40% aggregate marks.',
    description: 'Paramedical diploma training laboratory technicians in basic routine hematology, urine analysis, clinical microbiology, and biochemical testing.',
    order: 52
  },
  {
    name: 'Diploma in X-Ray and Radiology Technology',
    code: 'D-XRAY',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with Science (PCB/PCM) with minimum 40% marks.',
    description: 'Practical training in radiographic positioning, darkroom and digital imaging procedures, radiation safety, and routine diagnostic X-ray operation.',
    order: 53
  },
  {
    name: 'Diploma in Operation Theatre Technology',
    code: 'DOTT',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with Science stream from a recognized board.',
    description: 'Diploma course covering surgical theater disinfection, instrument packaging, suction apparatus handling, and assisting surgeons in routine procedures.',
    order: 54
  },
  {
    name: 'Diploma in Dialysis Technology',
    code: 'DDT',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with Science subjects with minimum 40% marks.',
    description: 'Focuses on machine setup, dialyzer priming, vital sign monitoring during dialysis sessions, and emergency management of dialysis complications.',
    order: 55
  },
  {
    name: 'Diploma in Health Inspector / Sanitary Inspector',
    code: 'DHI',
    level: 'Diploma',
    category: 'medical',
    duration: '2 Years',
    eligibility: '10+2 with Science subjects or equivalent from a recognized board.',
    description: 'Public health sanitation training covering municipal waste disposal, food hygiene inspection, water quality testing, disease surveillance, and epidemic control.',
    order: 56
  },

  // =========================================================================
  // 2. ENGINEERING & TECHNOLOGY (engineering) - 86 Programs
  // =========================================================================
  {
    name: 'B.E. Computer Science and Engineering',
    code: 'BE-CSE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Mathematics and Chemistry / Computer Science with minimum 45% marks (40% for reserved categories). TNEA / JEE or state entrance merit.',
    description: 'Flagship engineering discipline covering data structures, algorithms, computer architecture, operating systems, cloud computing, database systems, and software engineering.',
    order: 1
  },
  {
    name: 'B.E. CSE (Artificial Intelligence and Machine Learning)',
    code: 'BE-CSE-AIML',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA counselling or JEE score.',
    description: 'Specialized CSE degree focusing on deep learning, neural networks, natural language processing, computer vision, reinforcement learning, and autonomous systems.',
    order: 2
  },
  {
    name: 'B.E. CSE (Data Science)',
    code: 'BE-CSE-DS',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA / State counselling.',
    description: 'Core engineering curriculum enriched with big data analytics, statistical modeling, data visualization, predictive algorithms, and distributed computing frameworks.',
    order: 3
  },
  {
    name: 'B.E. CSE (Cyber Security)',
    code: 'BE-CSE-CS',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA counselling or equivalent entrance.',
    description: 'Teaches network defense, ethical hacking, digital forensics, cryptography, vulnerability assessment, secure coding, and cyber incident management.',
    order: 4
  },
  {
    name: 'B.E. CSE (Internet of Things)',
    code: 'BE-CSE-IOT',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA merit.',
    description: 'Integrates smart hardware, embedded sensors, wireless communication protocols, edge computing, and cloud architectures for industrial automation and smart cities.',
    order: 5
  },
  {
    name: 'B.E. CSE (Cloud Computing and Virtualization)',
    code: 'BE-CSE-CC',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with 45% marks. TNEA counselling or JEE score.',
    description: 'Focuses on scalable cloud architectures, containerization (Docker, Kubernetes), microservices, AWS/Azure infrastructure, and DevOps methodologies.',
    order: 6
  },
  {
    name: 'B.E. Computer Science and Design',
    code: 'BE-CSD',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Combines computer science computing foundations with UI/UX design, human-computer interaction, digital media creation, and interactive product development.',
    order: 7
  },
  {
    name: 'B.Tech Information Technology',
    code: 'BTECH-IT',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA counselling or equivalent entrance.',
    description: 'Focuses on enterprise networking, web technologies, database administration, information security, distributed systems, and enterprise software engineering.',
    order: 8
  },
  {
    name: 'B.Tech Artificial Intelligence and Data Science',
    code: 'BTECH-AIDS',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA / state admission norms.',
    description: 'Cutting-edge program blending computational mathematics, modern AI algorithms, machine learning workflows, large-scale data engineering, and intelligence systems.',
    order: 9
  },
  {
    name: 'B.Tech Computer Science and Business Systems',
    code: 'BTECH-CSBS',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with 45% aggregate marks. TNEA admission process.',
    description: 'Industry-partnered curriculum designed with TCS combining computer science with business strategy, design thinking, financial management, and innovation.',
    order: 10
  },
  {
    name: 'B.E. Electronics and Communication Engineering',
    code: 'BE-ECE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE counselling.',
    description: 'Foundational electronics discipline covering analog and digital circuits, microprocessors, wireless communication, signal processing, VLSI design, and optical fibers.',
    order: 11
  },
  {
    name: 'B.E. Electrical and Electronics Engineering',
    code: 'BE-EEE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE counselling.',
    description: 'Comprehensive electrical engineering program focusing on power systems, electrical machines, power electronics, renewable energy, high voltage engineering, and smart grids.',
    order: 12
  },
  {
    name: 'B.E. Electronics and Instrumentation Engineering',
    code: 'BE-EIE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA merit.',
    description: 'Specialization in industrial sensors, transducers, PLC/SCADA systems, process control automation, biomedical instrumentation, and measurement engineering.',
    order: 13
  },
  {
    name: 'B.E. Electronics and Computer Engineering',
    code: 'BE-ECM',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Interdisciplinary program bridging electronic hardware engineering and advanced computer software, embedded systems, and digital system design.',
    order: 14
  },
  {
    name: 'B.E. VLSI Design and Technology',
    code: 'BE-VLSI',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / AICTE semiconductor initiative.',
    description: 'Semiconductor design program focused on chip design, ASIC development, FPGA programming, physical layout design, semiconductor physics, and verification.',
    order: 15
  },
  {
    name: 'B.Tech Telecommunication Engineering',
    code: 'BTECH-TELE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks.',
    description: 'Covers modern 5G/6G mobile communication networks, satellite communication, microwave engineering, antenna theory, and optical communication networks.',
    order: 16
  },
  {
    name: 'B.E. Mechanical Engineering',
    code: 'BE-MECH',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE counselling.',
    description: 'Core engineering discipline encompassing thermodynamics, fluid mechanics, CAD/CAM, machine design, manufacturing processes, materials science, and energy conversion.',
    order: 17
  },
  {
    name: 'B.E. Mechatronics Engineering',
    code: 'BE-MCT',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA counselling.',
    description: 'Synergistic integration of mechanical engineering, electronic control systems, computer programming, sensors, and robotics for modern automated production.',
    order: 18
  },
  {
    name: 'B.E. Robotics and Automation',
    code: 'BE-ROBO',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA merit.',
    description: 'Focuses on autonomous mobile robots, robotic arm kinematics, computer vision, machine learning for robotics, industrial cobots, and automated manufacturing lines.',
    order: 19
  },
  {
    name: 'B.E. Automobile Engineering',
    code: 'BE-AUTO',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA merit.',
    description: 'Teaches internal combustion engines, electric vehicle (EV) battery systems, vehicle dynamics, chassis design, automotive electronics, and crash testing.',
    order: 20
  },
  {
    name: 'B.E. Production Engineering',
    code: 'BE-PROD',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Emphasizes manufacturing technology, tool design, metrology and quality inspection, CNC machining, metal casting, and advanced industrial production.',
    order: 21
  },
  {
    name: 'B.E. Industrial Engineering',
    code: 'BE-IND',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Focuses on operations research, supply chain optimization, plant layout design, ergonomics, quality management (Six Sigma), and productivity improvement.',
    order: 22
  },
  {
    name: 'B.E. Manufacturing Engineering',
    code: 'BE-MFG',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks.',
    description: 'Prepares engineers in modern additive manufacturing (3D printing), precision tooling, computer-integrated manufacturing (CIM), and laser processing.',
    order: 23
  },
  {
    name: 'B.Tech Aeronautical Engineering',
    code: 'BTECH-AERO',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE merit.',
    description: 'Focuses on aerodynamics, aircraft structures, jet propulsion systems, flight mechanics, avionics, and aircraft maintenance principles.',
    order: 24
  },
  {
    name: 'B.Tech Aerospace Engineering',
    code: 'BTECH-AERO-SP',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE merit.',
    description: 'Encompasses both atmospheric flight and space exploration systems, rocket propulsion, orbital mechanics, satellite engineering, and space mission design.',
    order: 25
  },
  {
    name: 'B.E. Marine Engineering',
    code: 'BE-MARINE',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM (minimum 60% in PCM and 50% in English) and medical fitness with 6/6 vision. IMU-CET qualification.',
    description: 'DG Shipping-approved program training marine engineers in ocean-going ship propulsion, marine diesel engines, auxiliary boilers, electrical generators, and ship safety.',
    order: 26
  },
  {
    name: 'B.Tech Naval Architecture and Offshore Engineering',
    code: 'BTECH-NAVAL',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 50% marks. IMU-CET / state entrance.',
    description: 'Specialized discipline covering ship hull design, hydrodynamics, offshore oil platform structural design, marine salvage, and shipyard management.',
    order: 27
  },
  {
    name: 'B.E. Civil Engineering',
    code: 'BE-CIVIL',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE merit.',
    description: 'Foundational civil engineering covering structural analysis, concrete technology, geotechnical foundation engineering, transportation systems, and surveying.',
    order: 28
  },
  {
    name: 'B.E. Environmental Engineering',
    code: 'BE-ENV',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Dedicated to air and water pollution control, municipal effluent treatment design, solid waste management, environmental impact assessment (EIA), and sustainability.',
    order: 29
  },
  {
    name: 'B.Tech Geo-Informatics',
    code: 'BTECH-GEO',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Combines satellite remote sensing, Geographic Information Systems (GIS), GPS positioning, digital photogrammetry, and spatial spatial data analytics.',
    order: 30
  },
  {
    name: 'B.Arch (Bachelor of Architecture)',
    code: 'BARCH',
    level: 'UG',
    category: 'engineering',
    duration: '5 Years',
    eligibility: '10+2 with Physics, Chemistry and Mathematics with 50% marks and valid qualifying score in NATA (National Aptitude Test in Architecture) or JEE Main Paper-2.',
    description: 'COA-approved 5-year professional architecture degree developing competencies in architectural design, building construction technology, urban design, structural mechanics, and sustainable spaces.',
    order: 31
  },
  {
    name: 'B.Plan (Bachelor of Planning)',
    code: 'BPLAN',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with Mathematics with minimum 50% marks. JEE Main Paper 3 / State merit.',
    description: 'Professional urban and regional planning degree covering city master planning, transportation networks, land use policies, housing, and infrastructure planning.',
    order: 32
  },
  {
    name: 'B.Des (Bachelor of Design)',
    code: 'BDES',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 in any stream / Science with minimum 50% marks. Design entrance exam (UCEED / institution test).',
    description: 'Covers industrial product design, communication design, ergonomics, 3D modeling, prototype fabrication, user experience research, and design thinking.',
    order: 33
  },
  {
    name: 'B.Tech Chemical Engineering',
    code: 'BTECH-CHEM',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA / JEE merit.',
    description: 'Focuses on mass and heat transfer, chemical reaction engineering, petroleum refining, plant design, biochemical processing, and process safety.',
    order: 34
  },
  {
    name: 'B.Tech Biotechnology',
    code: 'BTECH-BIOTECH',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 45% marks. TNEA counselling.',
    description: 'Applies engineering principles to biological systems, genetic engineering, bioprocess technology, bioinformatics, immunology, and pharmaceutical production.',
    order: 35
  },
  {
    name: 'B.Tech Biomedical Engineering',
    code: 'BTECH-BIOMED',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 45% marks. TNEA merit.',
    description: 'Integrates engineering and life sciences to design medical imaging devices, artificial organs, biometric monitors, prosthetics, and clinical hospital systems.',
    order: 36
  },
  {
    name: 'B.Tech Food Technology',
    code: 'BTECH-FOOD',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 45% aggregate marks. TNEA merit.',
    description: 'Covers post-harvest food preservation, industrial dairy and grain processing, packaging technology, sensory evaluation, and food safety standards (FSSAI).',
    order: 37
  },
  {
    name: 'B.Tech Agricultural Engineering',
    code: 'BTECH-AGRI',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 45% aggregate marks. TNEA merit.',
    description: 'Focuses on farm tractors and machinery design, precision irrigation systems, soil and water conservation engineering, greenhouse technology, and post-harvest equipment.',
    order: 38
  },
  {
    name: 'B.Tech Textile Technology',
    code: 'BTECH-TEXT',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA counselling.',
    description: 'Encompasses yarn manufacturing, fabric weaving, knitting, chemical textile processing, dyeing, garment testing, and technical textiles (medical and geotextiles).',
    order: 39
  },
  {
    name: 'B.Tech Fashion Technology',
    code: 'BTECH-FASH',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks. TNEA merit.',
    description: 'Blends apparel engineering, industrial pattern making, garment manufacturing technology, supply chain logistics, and quality assurance for fashion export houses.',
    order: 40
  },
  {
    name: 'B.Tech Petroleum Engineering',
    code: 'BTECH-PETRO',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / JEE merit.',
    description: 'Teaches upstream oil and gas exploration, reservoir engineering, well drilling technology, production operations, and offshore petroleum extraction.',
    order: 41
  },
  {
    name: 'B.Tech Polymer Technology',
    code: 'BTECH-POLY',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA counselling.',
    description: 'Focuses on synthetic polymers, rubber processing, composite materials, plastic injection molding, degradation kinetics, and advanced nanomaterials.',
    order: 42
  },
  {
    name: 'B.Tech Ceramic Technology',
    code: 'BTECH-CERAMIC',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% aggregate marks.',
    description: 'Specialized study in advanced refractories, electronic ceramics, structural bioceramics, glass technology, and high-temperature materials.',
    order: 43
  },
  {
    name: 'B.Tech Mining Engineering',
    code: 'BTECH-MINING',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA / state counselling.',
    description: 'Covers mineral extraction, open-cast and underground mine design, rock mechanics, explosive blasting engineering, mine ventilation, and mine safety.',
    order: 44
  },
  {
    name: 'B.Tech Metallurgical and Materials Engineering',
    code: 'BTECH-METAL',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks. TNEA merit.',
    description: 'Focuses on extractive metallurgy, alloy development, heat treatment, phase transformations, non-destructive testing (NDT), and structural failure analysis.',
    order: 45
  },
  {
    name: 'B.Tech Plastic Technology',
    code: 'BTECH-PLASTIC',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM with minimum 45% marks.',
    description: 'Covers polymer chemistry, plastic product design, extrusion, blow molding, thermoforming, mold manufacturing, and bioplastics recycling.',
    order: 46
  },
  {
    name: 'B.Tech Dairy Technology',
    code: 'BTECH-DAIRY',
    level: 'UG',
    category: 'engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM / PCB with minimum 45% aggregate marks.',
    description: 'Focuses on industrial milk collection, pasteurization, cheese and butter production, dairy plant engineering, quality assurance, and packaging.',
    order: 47
  },
  {
    name: 'M.E. Computer Science and Engineering',
    code: 'ME-CSE',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in CSE / IT with minimum 50% marks (45% for reserved categories) and TANCET / GATE score.',
    description: 'Advanced postgraduate engineering degree covering advanced algorithms, distributed computing, cloud architectures, network security, and machine learning research.',
    order: 48
  },
  {
    name: 'M.E. AI and Machine Learning',
    code: 'ME-AIML',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in CSE / IT / ECE / EEE or related branch with 50% marks and TANCET/GATE.',
    description: 'In-depth research and engineering in deep neural architectures, natural language understanding, cognitive computing, and automated reasoning.',
    order: 49
  },
  {
    name: 'M.E. Data Science',
    code: 'ME-DS',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in relevant branch with 50% marks and valid PG entrance.',
    description: 'Advanced specialization in statistical computing, massive data infrastructure, graph analytics, predictive modeling, and applied deep learning.',
    order: 50
  },
  {
    name: 'M.E. Cyber Security',
    code: 'ME-CYBER',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in CSE/IT/ECE with 50% aggregate marks.',
    description: 'Advanced postgraduate curriculum in advanced cryptography, malware analysis, security architectures, cloud security, and cyber law compliance.',
    order: 51
  },
  {
    name: 'M.E. Software Engineering',
    code: 'ME-SE',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in CSE/IT with 50% aggregate marks.',
    description: 'Focuses on modern agile architectures, software design patterns, enterprise system integration, automated testing pipelines, and software metrics.',
    order: 52
  },
  {
    name: 'M.E. VLSI Design',
    code: 'ME-VLSI',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in ECE / EEE / EIE with minimum 50% marks and TANCET / GATE.',
    description: 'Postgraduate specialization in analog and digital CMOS design, Verilog/VHDL, system-on-chip (SoC) architectures, low-power design, and physical synthesis.',
    order: 53
  },
  {
    name: 'M.E. Embedded Systems Technologies',
    code: 'ME-EMBEDDED',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in ECE / EEE / CSE / IT with 50% aggregate marks.',
    description: 'Advanced training in real-time operating systems (RTOS), ARM processors, automotive ECU design, IoT firmware, and hardware-software co-design.',
    order: 54
  },
  {
    name: 'M.E. Communication Systems',
    code: 'ME-COMM',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in ECE / Telecommunication with minimum 50% marks.',
    description: 'Focuses on next-generation wireless communications, MIMO architectures, software-defined radio (SDR), cognitive radio, and optical network design.',
    order: 55
  },
  {
    name: 'M.E. Applied Electronics',
    code: 'ME-APPLIED-ELEC',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in ECE / EEE / EIE with 50% marks and TANCET/GATE.',
    description: 'Specialization in advanced digital signal processing, power management ICs, modern sensor interfacing, and smart electronic instrumentation.',
    order: 56
  },
  {
    name: 'M.E. Power Systems Engineering',
    code: 'ME-POWER-SYS',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in EEE with minimum 50% marks and TANCET / GATE.',
    description: 'Covers smart electrical grids, power system stability and control, renewable integration, FACTS devices, and modern digital substation automation.',
    order: 57
  },
  {
    name: 'M.E. Power Electronics and Drives',
    code: 'ME-POWER-ELEC',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in EEE / EIE with 50% marks.',
    description: 'Focuses on high-efficiency DC-DC converters, inverters, electric motor drive control, EV powertrains, and wide-bandgap semiconductor devices.',
    order: 58
  },
  {
    name: 'M.E. Control and Instrumentation Engineering',
    code: 'ME-CONTROL',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in EIE / ICE / EEE with minimum 50% aggregate marks.',
    description: 'Advanced study of optimal control theory, state estimation, robust control, distributed industrial control systems, and automated process loops.',
    order: 59
  },
  {
    name: 'M.E. Thermal Engineering',
    code: 'ME-THERMAL',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Mechanical / Automobile with minimum 50% marks.',
    description: 'Advanced thermodynamics, computational fluid dynamics (CFD), cryogenic systems, gas turbine propulsion, and heat exchanger design.',
    order: 60
  },
  {
    name: 'M.E. CAD / CAM',
    code: 'ME-CADCAM',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Mechanical / Production with 50% aggregate marks.',
    description: 'Advanced finite element analysis (FEA), geometric modeling, computer-aided manufacturing, rapid tooling, and structural optimization.',
    order: 61
  },
  {
    name: 'M.E. Engineering Design',
    code: 'ME-ENG-DESIGN',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Mechanical / Production with 50% marks.',
    description: 'Focuses on design of mechanical transmission elements, vibration analysis, failure analysis, composite materials modeling, and tribology.',
    order: 62
  },
  {
    name: 'M.E. Mechatronics',
    code: 'ME-MCT',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Mechatronics / Mech / ECE / EEE with 50% marks.',
    description: 'Integrates advanced electro-hydraulic actuators, micro-electro-mechanical systems (MEMS), machine vision, and intelligent robotic automation.',
    order: 63
  },
  {
    name: 'M.E. Industrial Safety Engineering',
    code: 'ME-SAFETY',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in any engineering branch with minimum 50% marks.',
    description: 'Specialization in industrial occupational health, hazard identification (HAZOP), risk assessment, fire engineering, and statutory environmental compliance.',
    order: 64
  },
  {
    name: 'M.E. Structural Engineering',
    code: 'ME-STRUCTURAL',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Civil Engineering with minimum 50% marks and TANCET / GATE.',
    description: 'Advanced design of high-rise earthquake-resistant concrete structures, steel bridges, pre-stressed elements, and dynamic structural health monitoring.',
    order: 65
  },
  {
    name: 'M.E. Construction Engineering and Management',
    code: 'ME-CEM',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Civil Engineering with 50% marks.',
    description: 'Postgraduate management of infrastructure mega-projects, construction scheduling (Primavera/BIM), contract management, and heavy equipment logistics.',
    order: 66
  },
  {
    name: 'M.E. Environmental Engineering',
    code: 'ME-ENV',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Civil / Environmental / Chemical with 50% marks.',
    description: 'Advanced biological wastewater treatment, hazardous waste remediation, air dispersion modeling, and environmental sustainability frameworks.',
    order: 67
  },
  {
    name: 'M.Tech Biotechnology',
    code: 'MTECH-BIOTECH',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.Tech Biotechnology / Chemical / B.Pharm or M.Sc Life Sciences with 50% marks.',
    description: 'Advanced study of recombinant therapeutic proteins, metabolic engineering, downstream bioseparation, vaccine development, and bioreactor design.',
    order: 68
  },
  {
    name: 'M.Tech Information Technology',
    code: 'MTECH-IT',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in IT / CSE / ECE with minimum 50% marks.',
    description: 'Postgraduate study in enterprise cloud systems, information retrieval, distributed storage engines, and advanced cybersecurity protocols.',
    order: 69
  },
  {
    name: 'M.Tech Chemical Engineering',
    code: 'MTECH-CHEM',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in Chemical / Petroleum / Polymer with 50% marks.',
    description: 'Advanced computational transport phenomena, process intensification, multi-phase reactor modeling, and chemical plant synthesis.',
    order: 70
  },
  {
    name: 'M.Tech Food Technology',
    code: 'MTECH-FOOD',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.Tech Food Tech / Biotechnology / Agricultural Engg with 50% marks.',
    description: 'Advanced food rheology, thermal and non-thermal food preservation, active packaging systems, and food safety risk assessment.',
    order: 71
  },
  {
    name: 'M.Tech Nanotechnology',
    code: 'MTECH-NANO',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.E./B.Tech in any branch or M.Sc Physics/Chemistry with 50% marks.',
    description: 'Synthesis and characterization of nanostructured materials, carbon nanotubes, quantum dots, nano-electronics, and targeted nanomedicines.',
    order: 72
  },
  {
    name: 'M.Arch (General Architecture)',
    code: 'MARCH-GEN',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'Pass in B.Arch with minimum 50% marks and COA registration.',
    description: 'Postgraduate architectural theory, critical regionalism, advanced digital parametric design, spatial analytics, and urban conservation.',
    order: 73
  },
  {
    name: 'M.Arch (Landscape Architecture)',
    code: 'MARCH-LAND',
    level: 'PG',
    category: 'engineering',
    duration: '2 Years',
    eligibility: 'B.Arch degree from an accredited institution with 50% aggregate marks.',
    description: 'Focuses on regional ecological planning, site grading and hydrology, urban landscape design, public park systems, and plant science.',
    order: 74
  },
  {
    name: 'Diploma in Mechanical Engineering',
    code: 'DIP-MECH',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Mathematics and Science. Direct 2nd year entry for 12th Vocational/Science / ITI.',
    description: 'Practical polytechnic diploma covering machine workshop practice, lathe and milling operations, thermodynamics, engineering drawing, and CNC programming.',
    order: 75
  },
  {
    name: 'Diploma in Civil Engineering',
    code: 'DIP-CIVIL',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC). Lateral entry available for 12th Vocational or 2-year ITI holders.',
    description: 'Hands-on polytechnic training in building construction, theodolite and total station surveying, structural drafting, estimation and costing.',
    order: 76
  },
  {
    name: 'Diploma in Electrical and Electronics Engineering',
    code: 'DIP-EEE',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) from a recognized state or central board.',
    description: 'Practical technician training in electrical house wiring, transformer maintenance, AC/DC motor winding, panel board wiring, and power distribution.',
    order: 77
  },
  {
    name: 'Diploma in Electronics and Communication Engineering',
    code: 'DIP-ECE',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Mathematics and Science.',
    description: 'Teaches PCB soldering and testing, microcontrollers, mobile phone circuit troubleshooting, audio/video systems, and digital communication devices.',
    order: 78
  },
  {
    name: 'Diploma in Computer Engineering',
    code: 'DIP-CSE',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) from a recognized board.',
    description: 'Focuses on computer hardware assembly, PC troubleshooting, Linux/Windows operating system administration, web design, and Python/Java programming.',
    order: 79
  },
  {
    name: 'Diploma in Information Technology',
    code: 'DIP-IT',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC).',
    description: 'Polytechnic training in local area network (LAN) administration, database management, web applications, and desktop application support.',
    order: 80
  },
  {
    name: 'Diploma in Automobile Engineering',
    code: 'DIP-AUTO',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Science and Maths.',
    description: 'Practical automobile service training covering two-wheeler and four-wheeler engine overhauling, wheel alignment, brake servicing, and electrical systems.',
    order: 81
  },
  {
    name: 'Diploma in Mechatronics',
    code: 'DIP-MCT',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC).',
    description: 'Combines mechanical fabrication, pneumatic and hydraulic circuits, sensor wiring, PLC ladder programming, and industrial robot operation.',
    order: 82
  },
  {
    name: 'Diploma in Tool and Die Making',
    code: 'DIP-TOOL-DIE',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Mathematics and Science.',
    description: 'Specialized polytechnic program in precision die manufacturing, press tools, plastic injection molds, EDM wire cutting, and surface grinding.',
    order: 83
  },
  {
    name: 'Diploma in Chemical Engineering',
    code: 'DIP-CHEM',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Science subjects.',
    description: 'Trains chemical plant operators in unit operations, distillation column monitoring, boiler operations, fluid flow pumps, and chemical safety.',
    order: 84
  },
  {
    name: 'Diploma in Architecture Assistantship',
    code: 'DIP-ARCH-ASST',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Drawing / Mathematics.',
    description: 'Prepares architectural draftsmen in AutoCAD 2D/3D building plans, structural elevations, building bye-laws compliance, and physical model making.',
    order: 85
  },
  {
    name: 'Diploma in Agricultural Engineering',
    code: 'DIP-AGRI-ENG',
    level: 'Diploma',
    category: 'engineering',
    duration: '3 Years',
    eligibility: 'Pass in 10th Standard (SSLC) from a recognized board.',
    description: 'Polytechnic training in farm implement repair, tractor maintenance, drip and sprinkler irrigation piping, and grain silo operations.',
    order: 86
  },

  // =========================================================================
  // 3. MANAGEMENT & BUSINESS (management) - 49 Programs
  // =========================================================================
  {
    name: 'BBA (General Business Administration)',
    code: 'BBA-GEN',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream (Commerce / Arts / Science) with minimum 50% aggregate marks. Check institution admission guidelines.',
    description: 'Foundational business degree covering principles of management, organizational behavior, marketing fundamentals, financial accounting, and business communication.',
    order: 1
  },
  {
    name: 'BBA International Business',
    code: 'BBA-IB',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Focuses on global trade policies, export-import documentation, foreign exchange management, cross-cultural negotiations, and international marketing.',
    order: 2
  },
  {
    name: 'BBA Business Analytics',
    code: 'BBA-BA',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics / Statistics / Commerce with 50% marks.',
    description: 'Bridges business administration with data analysis, Excel modeling, predictive business metrics, Power BI dashboarding, and market intelligence.',
    order: 3
  },
  {
    name: 'BBA Digital Marketing',
    code: 'BBA-DM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any discipline with minimum 50% marks.',
    description: 'Covers search engine optimization (SEO), social media marketing, content strategy, Google Ads, email automation, and web performance tracking.',
    order: 4
  },
  {
    name: 'BBA Banking and Financial Services',
    code: 'BBA-BFS',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Mathematics with minimum 50% marks.',
    description: 'Specialization in commercial banking operations, credit risk analysis, mutual funds, insurance regulations, investment products, and retail banking.',
    order: 5
  },
  {
    name: 'BBA Hospital and Healthcare Management',
    code: 'BBA-HHM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Prepares healthcare administrators in hospital front-office operations, patient care coordination, NABH accreditation standards, and billing systems.',
    order: 6
  },
  {
    name: 'BBA Aviation and Airport Management',
    code: 'BBA-AVIATION',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Covers airport ground handling, airline terminal operations, air cargo logistics, aviation safety regulations (DGCA), and passenger customer service.',
    order: 7
  },
  {
    name: 'BBA Logistics and Supply Chain Management',
    code: 'BBA-LSCM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any discipline with minimum 50% marks.',
    description: 'Focuses on freight forwarding, warehouse inventory control, port management, multimodal transportation, procurement, and distribution logistics.',
    order: 8
  },
  {
    name: 'BBA Human Resource Management',
    code: 'BBA-HRM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Teaches talent acquisition, employee onboarding, labor law compliance, payroll management, performance appraisal systems, and organizational development.',
    order: 9
  },
  {
    name: 'BBA Event Management',
    code: 'BBA-EVENT',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Prepares professionals in corporate event planning, conference logistics, wedding design, artist management, production budgeting, and venue staging.',
    order: 10
  },
  {
    name: 'BBA Retail and Sales Management',
    code: 'BBA-RETAIL',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Focuses on store merchandising, point-of-sale operations, consumer purchasing behavior, omnichannel retail strategies, and sales team leadership.',
    order: 11
  },
  {
    name: 'BBA Entrepreneurship',
    code: 'BBA-ENTREP',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Develops venture ideation, startup business modeling, venture capital pitch creation, angel investment mechanisms, and entrepreneurial legal frameworks.',
    order: 12
  },
  {
    name: 'B.Com (General Commerce)',
    code: 'BCOM-GEN',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Accountancy / Mathematics with minimum 50% aggregate marks.',
    description: 'Foundational commerce degree encompassing financial accounting, corporate law, business economics, income tax computation, auditing, and banking theory.',
    order: 13
  },
  {
    name: 'B.Com Accounting and Finance',
    code: 'BCOM-AF',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce and Accountancy with minimum 50% marks.',
    description: 'Specialized commerce degree focusing on advanced cost accounting, financial management, portfolio analysis, IFRS standards, and capital markets.',
    order: 14
  },
  {
    name: 'B.Com Corporate Secretaryship',
    code: 'BCOM-CS',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Business Studies with minimum 50% marks.',
    description: 'Focuses on company secretarial practices, corporate governance, board meeting documentation, SEBI compliance, securities laws, and industrial drafting.',
    order: 15
  },
  {
    name: 'B.Com Computer Applications',
    code: 'BCOM-CA',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Computer Science / Mathematics with minimum 50% marks.',
    description: 'Combines accounting principles with Tally ERP, computerized accounting software, database management, e-commerce, and office automation tools.',
    order: 16
  },
  {
    name: 'B.Com Professional Accounting',
    code: 'BCOM-PA',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Accountancy with minimum 55% marks. Integrated curriculum for CA/CMA aspirants.',
    description: 'Aligned with Institute of Chartered Accountants of India (ICAI) syllabus covering advanced taxation, corporate auditing, financial reporting, and cost law.',
    order: 17
  },
  {
    name: 'B.Com Banking and Insurance',
    code: 'BCOM-BI',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Mathematics with minimum 50% marks.',
    description: 'Covers retail and corporate banking regulations, actuarial principles, life and general insurance underwriting, claims settlement, and risk mitigation.',
    order: 18
  },
  {
    name: 'B.Com Honors',
    code: 'BCOM-HONS',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Mathematics with minimum 60% aggregate marks.',
    description: 'Rigorous commerce honours curriculum with research project requirements, corporate finance modeling, quantitative economics, and strategic business law.',
    order: 19
  },
  {
    name: 'B.Com E-Commerce',
    code: 'BCOM-ECOM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce or Computer Science with minimum 50% marks.',
    description: 'Specialization in online payment gateways, digital marketplace operations, electronic commercial laws, cyber security for retail, and digital consumer rights.',
    order: 20
  },
  {
    name: 'B.Com Taxation',
    code: 'BCOM-TAX',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Accountancy with minimum 50% aggregate marks.',
    description: 'Deep dive into direct taxation (Income Tax Act), indirect taxation (Goods and Services Tax - GST), customs duties, corporate tax planning, and filing.',
    order: 21
  },
  {
    name: 'B.Com Financial Markets',
    code: 'BCOM-FM',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce or Mathematics with minimum 50% marks.',
    description: 'Teaches stock exchange trading mechanisms, derivatives (futures and options), debt market instruments, technical chart analysis, and SEBI regulations.',
    order: 22
  },
  {
    name: 'B.Com Business Process Services',
    code: 'BCOM-BPS',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Commerce / Science with minimum 50% marks. Industry-linked program.',
    description: 'Designed in collaboration with major IT/BPS corporate entities covering global finance and accounting outsourcing, payroll processing, and shared services.',
    order: 23
  },
  {
    name: 'BCA (Bachelor of Computer Applications)',
    code: 'BCA-GEN',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream / Science / Commerce with Mathematics or Computer Science preferred, minimum 50% marks.',
    description: 'Practical computing degree teaching Python, Java, C++, relational database management systems (RDBMS), web development, and software design.',
    order: 24
  },
  {
    name: 'BCA Cloud Computing and Cyber Security',
    code: 'BCA-CLOUD-CS',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Specialized application programming degree covering public cloud deployment, server virtualization, vulnerability assessment, and defensive security.',
    order: 25
  },
  {
    name: 'BCA Data Analytics',
    code: 'BCA-DA',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics / Computer Science / Statistics with 50% marks.',
    description: 'Focuses on business data visualization, Python for data analysis, SQL querying, statistical data mining, and machine learning libraries for business solutions.',
    order: 26
  },
  {
    name: 'BCA Mobile Application Development',
    code: 'BCA-MOBILE',
    level: 'UG',
    category: 'management',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Specialization in native Android (Kotlin), iOS (Swift), cross-platform Flutter/React Native frameworks, mobile UI/UX, and cloud backend integration.',
    order: 27
  },
  {
    name: 'MBA (General Management)',
    code: 'MBA-GEN',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any discipline with minimum 50% marks (45% for reserved categories) and qualifying score in TANCET, MAT, CAT, CMAT, or XAT.',
    description: 'Flagship master of business administration covering strategic leadership, managerial economics, corporate financial decision-making, marketing, and operations.',
    order: 28
  },
  {
    name: 'MBA Finance',
    code: 'MBA-FIN',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any stream with 50% marks and valid national/state entrance score.',
    description: 'Specialization in corporate investment banking, portfolio management, international finance, mergers and acquisitions, risk valuation, and derivative markets.',
    order: 29
  },
  {
    name: 'MBA Marketing',
    code: 'MBA-MKT',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree with minimum 50% aggregate marks and MBA entrance test.',
    description: 'Focuses on strategic brand management, consumer psychology, global product launch, sales distribution networks, omnichannel retailing, and digital growth.',
    order: 30
  },
  {
    name: 'MBA Human Resource Management',
    code: 'MBA-HRM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any field with minimum 50% marks and entrance exam.',
    description: 'Develops executive competencies in strategic talent management, collective bargaining, labor jurisprudence, leadership succession, and organizational transformation.',
    order: 31
  },
  {
    name: 'MBA Operations Management',
    code: 'MBA-OPS',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree (preferably Engineering / Science / Commerce) with 50% marks.',
    description: 'Teaches advanced lean operations, supply chain modeling, total quality management (TQM), project risk management, and service operations optimization.',
    order: 32
  },
  {
    name: 'MBA Business Analytics and Big Data',
    code: 'MBA-BABD',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree with quantitative background (Maths/Stats/Engg/Commerce) with 50% marks.',
    description: 'Postgraduate management program integrating predictive analytics, Tableau/PowerBI visual storytelling, AI for executive decision-making, and big data strategy.',
    order: 33
  },
  {
    name: 'MBA Logistics and Supply Chain Management',
    code: 'MBA-LSCM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline with minimum 50% aggregate marks.',
    description: 'Specialization in global container shipping logistics, customs documentation, cold chain management, automated fulfillment centers, and reverse logistics.',
    order: 34
  },
  {
    name: 'MBA Healthcare and Hospital Management',
    code: 'MBA-HHM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree (Medical / Allied Health / Nursing / Science / Arts) with 50% marks.',
    description: 'Hospital administration specialization covering clinical quality accreditations (NABH/JCI), medical insurance TPA management, telemedicine, and healthcare economics.',
    order: 35
  },
  {
    name: 'MBA Aviation and Airport Management',
    code: 'MBA-AVIATION',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline with minimum 50% marks and MBA entrance.',
    description: 'Prepares executives in airline fleet planning, airline revenue management, airport concession leasing, security operations (ICAO), and air traffic logistics.',
    order: 36
  },
  {
    name: 'MBA Digital Marketing',
    code: 'MBA-DM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any stream with minimum 50% marks.',
    description: 'Focuses on digital enterprise marketing, conversion rate optimization (CRO), marketing analytics, programmatic advertising, and performance marketing leadership.',
    order: 37
  },
  {
    name: 'MBA International Business',
    code: 'MBA-IB',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Graduation in any stream with minimum 50% aggregate marks.',
    description: 'Teaches multinational corporate strategy, WTO regulations, international geopolitical risk assessment, global supply sourcing, and cross-border currency hedges.',
    order: 38
  },
  {
    name: 'MBA Agribusiness Management',
    code: 'MBA-AGRI',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in Agriculture / Allied Sciences / Life Sciences / any stream with 50% marks.',
    description: 'Focuses on rural commodity marketing, agricultural finance and micro-lending, farm input supply chains, food processing business, and cooperative management.',
    order: 39
  },
  {
    name: 'MBA Tourism and Hospitality Management',
    code: 'MBA-TOURISM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Graduation in any stream with minimum 50% aggregate marks.',
    description: 'Covers luxury resort operations, international tourism destination planning, heritage travel marketing, eco-tourism sustainability, and hospitality franchising.',
    order: 40
  },
  {
    name: 'PGDM (Post Graduate Diploma in Management)',
    code: 'PGDM',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any field with 50% marks and CAT/MAT/XAT/CMAT score. AICTE-approved autonomous curriculum.',
    description: 'Industry-driven management diploma emphasizing practical case study methodology, corporate internships, leadership labs, and dual specializations.',
    order: 41
  },
  {
    name: 'M.Com (General)',
    code: 'MCOM-GEN',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'B.Com / BBA / BBM with minimum 50% aggregate marks from a recognized university.',
    description: 'Advanced postgraduate commerce degree covering advanced business statistics, corporate financial accounting, managerial taxation, and research methodology.',
    order: 42
  },
  {
    name: 'M.Com Accounting and Finance',
    code: 'MCOM-AF',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'B.Com with Accounting / Finance specialization with minimum 50% marks.',
    description: 'Specialization in forensic accounting, security analysis, advanced corporate financial reporting, treasury management, and audit ethics.',
    order: 43
  },
  {
    name: 'M.Com Corporate Secretaryship',
    code: 'MCOM-CS',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'B.Com (CS) or B.Com with minimum 50% marks from a recognized university.',
    description: 'Postgraduate corporate legal management focusing on advanced corporate restructurings, insider trading prevention, securities exchange listing, and boardroom administration.',
    order: 44
  },
  {
    name: 'MCA (Master of Computer Applications)',
    code: 'MCA-GEN',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'BCA, B.Sc Computer Science / IT, or any graduation with Mathematics at 10+2 or degree level with 50% marks (45% for reserved categories). TANCET / state entrance.',
    description: 'Professional computing master degree covering full-stack enterprise development, cloud native apps, advanced DBMS, system architectures, and software testing.',
    order: 45
  },
  {
    name: 'MCA Artificial Intelligence and Data Science',
    code: 'MCA-AIDS',
    level: 'PG',
    category: 'management',
    duration: '2 Years',
    eligibility: 'BCA / B.Sc (CS/IT) or graduation with Mathematics with minimum 50% marks.',
    description: 'Postgraduate computer application specialization focusing on machine learning pipelines, deep learning algorithms, computer vision, and AI system engineering.',
    order: 46
  },
  {
    name: 'Professional CA (Chartered Accountancy)',
    code: 'PROF-CA',
    level: 'Other',
    category: 'management',
    duration: '3-5 Years',
    eligibility: 'Pass in 10+2 for Foundation route, or Graduation (Commerce min 55%, other streams min 60%) for Direct Entry route under ICAI.',
    description: 'Prestigious statutory accounting credential awarded by the Institute of Chartered Accountants of India (ICAI), conferring statutory authority to audit financial accounts, tax compliance, and financial consulting.',
    order: 47
  },
  {
    name: 'Professional CMA (Cost and Management Accountancy)',
    code: 'PROF-CMA',
    level: 'Other',
    category: 'management',
    duration: '3-4 Years',
    eligibility: '10+2 for Foundation or Degree for Intermediate entry as regulated by the Institute of Cost Accountants of India (ICMAI).',
    description: 'Professional qualification focusing on cost audit, industrial cost reduction, business valuation, corporate governance, pricing strategies, and strategic management.',
    order: 48
  },
  {
    name: 'Professional CS (Company Secretary)',
    code: 'PROF-CS',
    level: 'Other',
    category: 'management',
    duration: '3-4 Years',
    eligibility: '10+2 pass for CSEET entrance or Graduation for Executive stage under the Institute of Company Secretaries of India (ICSI).',
    description: 'Premier corporate compliance and governance professional qualification empowering professionals as legal advisers to corporate boards on corporate laws and secretarial audits.',
    order: 49
  },

  // =========================================================================
  // 4. ARTS, SCIENCE & HUMANITIES (arts) - 60 Programs
  // =========================================================================
  {
    name: 'B.Sc Mathematics',
    code: 'BSC-MATHS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics as a core subject with minimum 50% aggregate marks.',
    description: 'Pure and applied mathematics degree covering calculus, linear algebra, real and complex analysis, differential equations, graph theory, and mathematical modeling.',
    order: 1
  },
  {
    name: 'B.Sc Physics',
    code: 'BSC-PHYSICS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Physics and Mathematics with minimum 50% aggregate marks.',
    description: 'Foundational study of classical mechanics, quantum mechanics, electromagnetism, thermodynamics, optics, nuclear physics, solid-state physics, and experimental labs.',
    order: 2
  },
  {
    name: 'B.Sc Chemistry',
    code: 'BSC-CHEMISTRY',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Chemistry and Physics / Biology / Mathematics with 50% marks.',
    description: 'Comprehensive study of inorganic synthesis, organic reaction mechanisms, physical chemistry kinetics, spectroscopy, analytical instrumentation, and industrial chemicals.',
    order: 3
  },
  {
    name: 'B.Sc Computer Science',
    code: 'BSC-CS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics or Computer Science with minimum 50% aggregate marks.',
    description: 'Foundational science program teaching programming languages, data structures, algorithms, operating systems, database systems, computer networks, and web development.',
    order: 4
  },
  {
    name: 'B.Sc Information Technology',
    code: 'BSC-IT',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics or Computer Science with minimum 50% marks.',
    description: 'Focuses on web application architecture, network administration, database design, mobile programming, information security, and enterprise software tools.',
    order: 5
  },
  {
    name: 'B.Sc Data Science',
    code: 'BSC-DS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics / Statistics / Computer Science with 50% marks.',
    description: 'Combines computational mathematics, statistics, Python data analysis, predictive machine learning algorithms, and modern data visualization techniques.',
    order: 6
  },
  {
    name: 'B.Sc Artificial Intelligence',
    code: 'BSC-AI',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics with minimum 50% aggregate marks.',
    description: 'Undergraduate science degree covering neural computing, heuristic search, natural language processing, computer vision, and cognitive automated systems.',
    order: 7
  },
  {
    name: 'B.Sc Statistics',
    code: 'BSC-STATS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics or Statistics with minimum 50% marks.',
    description: 'Teaches probability theory, statistical inference, sampling methodologies, regression modeling, time-series forecasting, and statistical computing using R and SPSS.',
    order: 8
  },
  {
    name: 'B.Sc Electronics',
    code: 'BSC-ELEC',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Physics and Mathematics with minimum 50% aggregate marks.',
    description: 'Focuses on electronic devices, semiconductor physics, operational amplifiers, digital logic design, microcontrollers, and communication circuits.',
    order: 9
  },
  {
    name: 'B.Sc Biotechnology',
    code: 'BSC-BIOTECH',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Biology / Biotechnology / Chemistry with minimum 50% marks.',
    description: 'Covers molecular biology, recombinant DNA technology, cell biology, microbiology, plant and animal tissue culture, immunology, and bioinformatics.',
    order: 10
  },
  {
    name: 'B.Sc Microbiology',
    code: 'BSC-MICRO',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Biology and Chemistry with minimum 50% marks.',
    description: 'Study of bacteria, viruses, fungi, and protozoa, clinical medical microbiology, industrial fermentation, environmental microbial ecology, and genetics.',
    order: 11
  },
  {
    name: 'B.Sc Biochemistry',
    code: 'BSC-BIOCHEM',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Chemistry and Biology with minimum 50% aggregate marks.',
    description: 'Investigates chemical processes at molecular level in living organisms, enzymology, biomolecules, metabolic pathways, clinical biochemistry, and molecular genetics.',
    order: 12
  },
  {
    name: 'B.Sc Botany',
    code: 'BSC-BOTANY',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Biology or Botany with minimum 50% aggregate marks.',
    description: 'Comprehensive study of plant taxonomy, plant physiology, ecology, phytochemistry, herbal medicine, agricultural botany, and economic plant conservation.',
    order: 13
  },
  {
    name: 'B.Sc Zoology',
    code: 'BSC-ZOOLOGY',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Biology or Zoology with minimum 50% aggregate marks.',
    description: 'Covers animal diversity, comparative anatomy, physiology, developmental biology, animal behavior, wildlife conservation, entomology, and evolutionary biology.',
    order: 14
  },
  {
    name: 'B.Sc Nutrition and Dietetics',
    code: 'BSC-NUTRITION',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Chemistry and Biology / Home Science with minimum 50% marks.',
    description: 'Prepares clinical dietitians and nutritionists in human nutritional biochemistry, therapeutic meal planning for metabolic disorders, community nutrition, and food analysis.',
    order: 15
  },
  {
    name: 'B.Sc Food Science and Quality Control',
    code: 'BSC-FOOD-QC',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Science (PCB/PCM) with minimum 50% marks.',
    description: 'Focuses on food chemistry, microbiological safety, quality control testing, food adulteration detection, sensory analysis, and food packaging technologies.',
    order: 16
  },
  {
    name: 'B.Sc Psychology',
    code: 'BSC-PSYCH',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream (Science / Arts / Commerce) with minimum 50% aggregate marks.',
    description: 'Scientific study of human behavior, cognitive psychology, developmental psychology, social interactions, abnormal psychology, psychological testing, and counseling.',
    order: 17
  },
  {
    name: 'B.Sc Visual Communication (VisCom)',
    code: 'BSC-VISCOM',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Covers photography, digital cinematography, television production, graphic design, 2D/3D animation, sound design, advertising media, and mass communication.',
    order: 18
  },
  {
    name: 'B.Sc Costume Design and Fashion',
    code: 'BSC-CDF',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Teaches garment construction, fashion illustration, textile design, draping techniques, computer-aided pattern design (CAD), and runway apparel marketing.',
    order: 19
  },
  {
    name: 'B.Sc Interior Design',
    code: 'BSC-INT-DESIGN',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Focuses on residential and commercial spatial layout planning, color theory, building services, furniture design, 3D architectural rendering, and acoustics.',
    order: 20
  },
  {
    name: 'B.Sc Hotel Management and Catering Science',
    code: 'BSC-HMCS',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with English as a compulsory subject with 50% marks.',
    description: 'Professional hospitality training in food production, bakery and confectionery, food and beverage service, accommodation operations, and hotel front office.',
    order: 21
  },
  {
    name: 'B.Sc Forensic Science',
    code: 'BSC-FORENSIC',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Physics, Chemistry, Biology / Mathematics with 50% marks.',
    description: 'Covers crime scene investigation techniques, forensic toxicology, fingerprint classification, ballistics analysis, forensic serology, and digital forensics.',
    order: 22
  },
  {
    name: 'B.Sc Geography',
    code: 'BSC-GEOG',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream / Science with minimum 50% aggregate marks.',
    description: 'Study of physical geography, geomorphology, climatology, oceanography, human settlements, cartography, and introductory Geographic Information Systems (GIS).',
    order: 23
  },
  {
    name: 'B.Sc Geology',
    code: 'BSC-GEOLOGY',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Science stream (Physics / Chemistry / Mathematics / Biology) with 50% marks.',
    description: 'Earth science degree covering mineralogy, petrology, structural geology, palaeontology, stratigraphy, hydrogeology, and mineral exploration fieldwork.',
    order: 24
  },
  {
    name: 'B.Sc Animation and Multimedia',
    code: 'BSC-ANIMATION',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Focuses on classical 2D animation, 3D character modeling, texturing, digital rigging, visual effects (VFX), game asset design, and post-production editing.',
    order: 25
  },
  {
    name: 'B.Sc Environmental Science',
    code: 'BSC-ENV-SCI',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 with Science stream with minimum 50% marks.',
    description: 'Covers ecology, pollution monitoring, biodiversity conservation, environmental laws, natural resource management, and climate change mitigation.',
    order: 26
  },
  {
    name: 'B.A. English Literature',
    code: 'BA-ENG',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks in English.',
    description: 'Encompasses British, American, Indian, and Commonwealth literatures, literary criticism, phonetics and linguistics, journalism writing, and creative composition.',
    order: 27
  },
  {
    name: 'B.A. Tamil Literature',
    code: 'BA-TAMIL',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with Tamil as first/part-1 language with minimum 50% marks.',
    description: 'Deep exploration of Sangam literature, Silappathikaram, modern Tamil poetry, linguistics, Tamil grammar (Tholkappiyam), drama, and literary history.',
    order: 28
  },
  {
    name: 'B.A. Economics',
    code: 'BA-ECON',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream (Commerce / Science / Arts) with minimum 50% aggregate marks.',
    description: 'Microeconomics, macroeconomics, Indian economic policies, public finance, monetary economics, international trade, econometrics, and developmental planning.',
    order: 29
  },
  {
    name: 'B.A. History',
    code: 'BA-HIST',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Study of ancient, medieval, and modern Indian history, Tamil Nadu history and culture, world civilizations, archaeology, epigraphy, and archival science.',
    order: 30
  },
  {
    name: 'B.A. Political Science',
    code: 'BA-POL-SCI',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Covers political theory, Indian constitutional framework, comparative politics, international relations, public policy analysis, and geopolitics.',
    order: 31
  },
  {
    name: 'B.A. Sociology',
    code: 'BA-SOCIO',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any discipline with minimum 50% marks.',
    description: 'Explores sociological theories, Indian social structures, caste and family dynamics, gender studies, urban and rural sociology, and social research methods.',
    order: 32
  },
  {
    name: 'B.A. Public Administration',
    code: 'BA-PUB-ADMIN',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Study of administrative theories, public civil services, district governance, administrative law, public financial management, and developmental administration.',
    order: 33
  },
  {
    name: 'B.A. Journalism and Mass Communication',
    code: 'BA-JMC',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any discipline with minimum 50% aggregate marks.',
    description: 'Covers print news reporting, broadcast journalism, media ethics and laws, public relations, digital content creation, and media research.',
    order: 34
  },
  {
    name: 'B.A. Philosophy',
    code: 'BA-PHIL',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% marks.',
    description: 'Explores classical Indian philosophical systems (Vedanta, Buddhism, Jainism), Western philosophy, logic, ethics, epistemology, and metaphysics.',
    order: 35
  },
  {
    name: 'B.A. Criminology and Police Administration',
    code: 'BA-CRIM',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any discipline with minimum 50% aggregate marks.',
    description: 'Focuses on criminal behavior etiology, penology, victimology, police administration systems, correctional institutions, and juvenile justice.',
    order: 36
  },
  {
    name: 'BSW (Bachelor of Social Work)',
    code: 'BSW',
    level: 'UG',
    category: 'arts',
    duration: '3 Years',
    eligibility: '10+2 in any stream with minimum 50% aggregate marks.',
    description: 'Professional social service degree integrating community organization, social case work, child welfare, medical and psychiatric social work, and fieldwork.',
    order: 37
  },
  {
    name: 'M.Sc Mathematics',
    code: 'MSC-MATHS',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Mathematics with minimum 50% aggregate marks from a recognized university.',
    description: 'Advanced postgraduate mathematics covering abstract algebra, topology, measure theory, functional analysis, fluid dynamics, and partial differential equations.',
    order: 38
  },
  {
    name: 'M.Sc Physics',
    code: 'MSC-PHYSICS',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Physics with Mathematics as allied with minimum 50% marks.',
    description: 'Postgraduate study in advanced quantum mechanics, electrodynamics, statistical mechanics, condensed matter physics, spectroscopy, and laser physics.',
    order: 39
  },
  {
    name: 'M.Sc Chemistry',
    code: 'MSC-CHEMISTRY',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Chemistry with minimum 50% aggregate marks from a recognized university.',
    description: 'In-depth study of organic synthesis, coordination chemistry, bioinorganic chemistry, quantum chemistry, advanced analytical methods, and research project.',
    order: 40
  },
  {
    name: 'M.Sc Computer Science',
    code: 'MSC-CS',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Computer Science / BCA / B.Sc IT with minimum 50% marks.',
    description: 'Postgraduate computing degree focusing on advanced data structures, compiler design, machine learning, cloud architecture, and distributed databases.',
    order: 41
  },
  {
    name: 'M.Sc Data Science and Analytics',
    code: 'MSC-DSA',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Graduation in Mathematics / Statistics / Computer Science / IT / BCA with 50% marks.',
    description: 'Advanced analytics degree covering multivariate data analysis, deep learning, natural language processing, big data platforms, and business intelligence.',
    order: 42
  },
  {
    name: 'M.Sc Information Technology',
    code: 'MSC-IT',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc IT / B.Sc CS / BCA with minimum 50% aggregate marks.',
    description: 'Focuses on enterprise networking, mobile computing, web services, database architecture, and cybersecurity management.',
    order: 43
  },
  {
    name: 'M.Sc Biotechnology',
    code: 'MSC-BIOTECH',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc in Biotechnology / Microbiology / Biochemistry / Botany / Zoology with 50% marks.',
    description: 'Advanced genetic engineering, bioprocess kinetics, plant and animal molecular biology, structural bioinformatics, and biopharmaceutical formulation.',
    order: 44
  },
  {
    name: 'M.Sc Microbiology',
    code: 'MSC-MICRO',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc in Microbiology / Biotechnology / Life Sciences with minimum 50% marks.',
    description: 'Postgraduate research in medical virology, microbial genetics, advanced immunology, industrial fermentation, and infectious disease diagnostics.',
    order: 45
  },
  {
    name: 'M.Sc Biochemistry',
    code: 'MSC-BIOCHEM',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc in Biochemistry / Chemistry / Life Sciences with 50% marks.',
    description: 'Focuses on clinical biochemistry diagnostics, molecular endocrinology, advanced enzyme mechanisms, signal transduction, and cancer biology.',
    order: 46
  },
  {
    name: 'M.Sc Applied Psychology',
    code: 'MSC-PSYCH',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.A. / B.Sc in Psychology or any degree with 50% marks from a recognized university.',
    description: 'Advanced training in psychotherapeutic interventions, clinical assessment, organizational psychology, neuropsychology, and psychological counseling.',
    order: 47
  },
  {
    name: 'M.Sc Statistics',
    code: 'MSC-STATS',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Statistics or B.Sc Mathematics with minimum 50% aggregate marks.',
    description: 'Advanced statistical theory, stochastic processes, Bayesian inference, biostatistics, design of experiments, and multivariate statistical modeling.',
    order: 48
  },
  {
    name: 'M.Sc Visual Communication',
    code: 'MSC-VISCOM',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Any bachelor degree with minimum 50% aggregate marks.',
    description: 'Postgraduate media production covering advanced digital filmmaking, documentary direction, media theories, visual branding, and interactive media research.',
    order: 49
  },
  {
    name: 'M.Sc Foods and Nutrition',
    code: 'MSC-FOODS-NUT',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc in Nutrition and Dietetics / Food Science with minimum 50% marks.',
    description: 'Advanced clinical nutrition therapy, maternal and child nutrition, nutritional epidemiology, food service management, and nutritional biochemistry.',
    order: 50
  },
  {
    name: 'M.Sc Environmental Science',
    code: 'MSC-ENV-SCI',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc in any Science stream with minimum 50% marks from a recognized university.',
    description: 'Postgraduate specialization in environmental pollution monitoring, environmental impact assessment (EIA), geospatial analysis, and ecological restoration.',
    order: 51
  },
  {
    name: 'M.Sc Organic Chemistry',
    code: 'MSC-ORG-CHEM',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.Sc Chemistry with minimum 50% aggregate marks.',
    description: 'Advanced stereochemistry, asymmetric synthesis, retrosynthetic analysis, medicinal chemistry, natural product isolation, and spectroscopic elucidation.',
    order: 52
  },
  {
    name: 'M.A. English Literature',
    code: 'MA-ENG',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.A. English or any bachelor degree with minimum 50% marks.',
    description: 'Advanced study of critical theories (postcolonialism, structuralism, feminism), Shakespearean drama, world literature in translation, and linguistics.',
    order: 53
  },
  {
    name: 'M.A. Tamil Literature',
    code: 'MA-TAMIL',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.A. Tamil or any degree with Tamil as Part-1 language with 50% marks.',
    description: 'Comprehensive research in Sangam anthologies, Tolkappiyam poetics, epics, modern literary criticism, comparative literature, and folk arts.',
    order: 54
  },
  {
    name: 'M.A. Economics',
    code: 'MA-ECON',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'B.A. Economics or related discipline with minimum 50% aggregate marks.',
    description: 'Advanced microeconomic analysis, macroeconomic dynamics, econometric modeling, development economics, public economics, and policy evaluation.',
    order: 55
  },
  {
    name: 'M.A. History',
    code: 'MA-HIST',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Graduation in any stream with minimum 50% marks from a recognized university.',
    description: 'In-depth historiography, historical research methods, socio-economic history of Tamil Nadu, modern international relations, and heritage management.',
    order: 56
  },
  {
    name: 'M.A. Political Science',
    code: 'MA-POL-SCI',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any stream with minimum 50% aggregate marks.',
    description: 'Advanced political philosophy, global international relations, Indian political thought, security studies, public policy, and diplomatic history.',
    order: 57
  },
  {
    name: 'M.A. Journalism and Mass Communication',
    code: 'MA-JMC',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Any bachelor degree with minimum 50% aggregate marks.',
    description: 'Advanced media research, investigative journalism, digital media publishing, television documentary production, and communication policy.',
    order: 58
  },
  {
    name: 'MSW (Master of Social Work)',
    code: 'MSW',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline with minimum 50% aggregate marks.',
    description: 'Professional postgraduate social work degree specializing in Community Development (CD), Medical and Psychiatric Social Work (M&PSW), or Human Resource Management (HRM).',
    order: 59
  },
  {
    name: 'MLISC (Master of Library and Information Science)',
    code: 'MLISC',
    level: 'PG',
    category: 'arts',
    duration: '2 Years',
    eligibility: 'Any graduation with minimum 50% aggregate marks from a recognized university.',
    description: 'Teaches digital library architectures, information classification and cataloguing, digital archives, bibliographic management, and library automation software.',
    order: 60
  },

  // =========================================================================
  // 5. LAW & LEGAL STUDIES (law) - 20 Programs
  // =========================================================================
  {
    name: 'B.A. LL.B. (Honours)',
    code: 'BALLB-HONS',
    level: 'UG',
    category: 'law',
    duration: '5 Years',
    eligibility: '10+2 in any stream with minimum 45% aggregate marks (40% for SC/ST). CLAT, AILET, LSAT-India, or state law entrance counselling.',
    description: '5-year integrated professional law degree approved by the Bar Council of India (BCI) combining humanities (history, political science, sociology) with core constitutional, civil, criminal, and corporate legal education.',
    order: 1
  },
  {
    name: 'B.B.A. LL.B. (Honours)',
    code: 'BBALLB-HONS',
    level: 'UG',
    category: 'law',
    duration: '5 Years',
    eligibility: '10+2 in any stream with minimum 45% aggregate marks. CLAT or law entrance test.',
    description: 'BCI-recognized integrated program merging business administration, corporate finance, and marketing with corporate law, mergers & acquisitions, competition law, and commercial arbitration.',
    order: 2
  },
  {
    name: 'B.Com. LL.B. (Honours)',
    code: 'BCOMLLB-HONS',
    level: 'UG',
    category: 'law',
    duration: '5 Years',
    eligibility: '10+2 with Commerce / Mathematics with minimum 45% aggregate marks. Law entrance merit.',
    description: 'Integrated legal curriculum tailored for commercial law practice, combining financial accounting, auditing, and corporate taxation with company law, insolvency, and banking jurisprudence.',
    order: 3
  },
  {
    name: 'B.Sc. LL.B. (Honours)',
    code: 'BSCLLB-HONS',
    level: 'UG',
    category: 'law',
    duration: '5 Years',
    eligibility: '10+2 with Science stream with minimum 45% marks. CLAT / national law entrance.',
    description: 'Interdisciplinary program integrating scientific concepts with intellectual property rights, patent law, cyber forensics, environmental jurisprudence, and biotechnology regulations.',
    order: 4
  },
  {
    name: 'B.Tech. LL.B. (Honours)',
    code: 'BTECHLLB-HONS',
    level: 'UG',
    category: 'law',
    duration: '6 Years',
    eligibility: '10+2 with PCM with minimum 50% marks. Law entrance qualification.',
    description: 'Specialized techno-legal integrated degree designed for practice in cyber law, software patents, telecommunication regulations, and technology dispute resolution.',
    order: 5
  },
  {
    name: 'LL.B. (3 Years)',
    code: 'LLB-3YR',
    level: 'UG',
    category: 'law',
    duration: '3 Years',
    eligibility: 'Bachelor degree in any discipline (B.A., B.Sc., B.Com., B.E., etc.) with minimum 45% marks (40% for SC/ST). State law entrance or university merit.',
    description: 'BCI-approved professional law degree for graduates, encompassing constitutional law, criminal jurisprudence (IPC/CrPC), contract law, law of torts, evidence law, property law, and moot court training.',
    order: 6
  },
  {
    name: 'LL.M. Constitutional and Administrative Law',
    code: 'LLM-CONST',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. (3-year or 5-year integrated) with minimum 50% marks (45% for SC/ST) from a BCI-recognized university. CLAT-PG or university PG entrance.',
    description: 'Postgraduate specialization in comparative constitutional law, judicial review, fundamental rights jurisprudence, administrative adjudication, and center-state relations.',
    order: 7
  },
  {
    name: 'LL.M. Corporate and Commercial Law',
    code: 'LLM-CORP',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. with minimum 50% aggregate marks.',
    description: 'Advanced study of corporate governance, securities regulations (SEBI), cross-border mergers, insolvency and bankruptcy laws, and international commercial arbitration.',
    order: 8
  },
  {
    name: 'LL.M. Criminal Law and Criminology',
    code: 'LLM-CRIM',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. from a recognized institution with minimum 50% marks.',
    description: 'Specialization in substantive criminal law, comparative criminal procedure, penology and victimology, white-collar crime investigations, and forensic evidence laws.',
    order: 9
  },
  {
    name: 'LL.M. Intellectual Property Rights',
    code: 'LLM-IPR',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. with minimum 50% marks from an accredited university.',
    description: 'Postgraduate focus on patent drafting and litigation, copyright and digital rights management, trademark law, trade secrets, and WIPO treaties.',
    order: 10
  },
  {
    name: 'LL.M. Cyber Law and Information Technology',
    code: 'LLM-CYBER',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. with minimum 50% aggregate marks.',
    description: 'Covers the Information Technology Act, international cybercrime treaties, privacy and data protection compliance (GDPR/DPDP), digital contracts, and e-evidence.',
    order: 11
  },
  {
    name: 'LL.M. International Law and Human Rights',
    code: 'LLM-INT-HR',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'LL.B. degree with minimum 50% aggregate marks.',
    description: 'In-depth study of public international law, humanitarian law, international criminal courts, refugee laws, and universal human rights mechanisms.',
    order: 12
  },
  {
    name: 'LL.M. Labour and Industrial Relations Law',
    code: 'LLM-LABOUR',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'LL.B. degree from a recognized institution with 50% marks.',
    description: 'Focuses on the new Labour Codes, industrial disputes resolution, trade union jurisprudence, social security laws, and occupational workplace safety norms.',
    order: 13
  },
  {
    name: 'LL.M. Environmental Law',
    code: 'LLM-ENV',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. with minimum 50% marks.',
    description: 'Covers international environmental protocols, climate change litigation, pollution control jurisprudence, forest conservation laws, and National Green Tribunal practice.',
    order: 14
  },
  {
    name: 'LL.M. Taxation Law',
    code: 'LLM-TAX',
    level: 'PG',
    category: 'law',
    duration: '2 Years',
    eligibility: 'Pass in LL.B. with minimum 50% aggregate marks.',
    description: 'Specialization in advanced direct tax litigation, GST disputes, international transfer pricing, double taxation avoidance agreements (DTAA), and anti-avoidance rules.',
    order: 15
  },
  {
    name: 'PG Diploma in Cyber Law and Cyber Security',
    code: 'PGD-CYBER-LAW',
    level: 'Diploma',
    category: 'law',
    duration: '1 Year',
    eligibility: 'Bachelor degree in Law, Science, IT, Engineering, or any graduate with 50% marks.',
    description: 'Professional diploma covering computer crime investigations, digital evidence preservation, data privacy compliance, and IT Act legal defense.',
    order: 16
  },
  {
    name: 'PG Diploma in Intellectual Property Rights',
    code: 'PGD-IPR',
    level: 'Diploma',
    category: 'law',
    duration: '1 Year',
    eligibility: 'Graduation in any discipline from a recognized university.',
    description: 'Teaches patent search methodologies, trademark filing procedures, copyright registration, commercialization of intellectual assets, and licensing agreements.',
    order: 17
  },
  {
    name: 'PG Diploma in Labour Laws and Administrative Law',
    code: 'PGD-LABOUR-LAW',
    level: 'Diploma',
    category: 'law',
    duration: '1 Year',
    eligibility: 'Any graduate from a recognized university with minimum 45% marks.',
    description: 'Specialized diploma for HR professionals and advocates covering industrial dispute procedures, factory compliance, wages acts, and maternity benefit regulations.',
    order: 18
  },
  {
    name: 'PG Diploma in Alternative Dispute Resolution',
    code: 'PGD-ADR',
    level: 'Diploma',
    category: 'law',
    duration: '1 Year',
    eligibility: 'Graduation in any discipline with minimum 50% marks.',
    description: 'Practical training in arbitration procedures, mediation facilitation, commercial conciliation, lok adalat administration, and negotiation ethics.',
    order: 19
  },
  {
    name: 'PG Diploma in Medical Law and Ethics',
    code: 'PGD-MED-LAW',
    level: 'Diploma',
    category: 'law',
    duration: '1 Year',
    eligibility: 'Graduation in Medicine, Nursing, Law, or Allied Sciences from a recognized university.',
    description: 'Addresses medical negligence jurisprudence, consent protocols, organ transplant regulations, clinical trial legalities, and hospital legal risk management.',
    order: 20
  },

  // =========================================================================
  // 6. EDUCATION & TEACHING (education) - 17 Programs
  // =========================================================================
  {
    name: 'B.Ed (Bachelor of Education)',
    code: 'BED-GEN',
    level: 'UG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Bachelor degree or Master degree in Sciences, Social Sciences, Humanities, or Commerce with minimum 50% marks (45% for reserved categories). Check TNTEU and NCTE criteria.',
    description: 'NCTE-approved professional teacher education program developing pedagogical competencies, teaching methodology for secondary schools, educational psychology, curriculum planning, and school internship.',
    order: 1
  },
  {
    name: 'B.Ed Special Education (Hearing Impairment)',
    code: 'BED-SPED-HI',
    level: 'UG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any stream with minimum 50% marks from a recognized university. RCI-approved.',
    description: 'Specialized teacher preparation program focusing on pedagogical strategies for deaf and hard-of-hearing students, sign language fluency, auditory training, and assistive technology.',
    order: 2
  },
  {
    name: 'B.Ed Special Education (Visual Impairment)',
    code: 'BED-SPED-VI',
    level: 'UG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline with minimum 50% marks. RCI-accredited.',
    description: 'Trains educators in Braille reading and writing, orientation and mobility instruction, assistive screen reader tools, and tailored learning materials for visually impaired learners.',
    order: 3
  },
  {
    name: 'B.Ed Special Education (Intellectual Disability)',
    code: 'BED-SPED-ID',
    level: 'UG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Graduation with minimum 50% marks from a recognized university. RCI-approved.',
    description: 'Focuses on customized educational programming for students with intellectual and developmental challenges, behavioral modification, functional academics, and life-skills training.',
    order: 4
  },
  {
    name: 'B.P.Ed (Bachelor of Physical Education)',
    code: 'BPED',
    level: 'UG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Bachelor degree in any stream with participation in sports, or B.Sc in Physical Education with minimum 50% marks and physical fitness test.',
    description: 'NCTE-recognized program training physical education instructors in sports pedagogy, exercise physiology, kinesiology, athletic coaching, and school tournament management.',
    order: 5
  },
  {
    name: 'Integrated B.A. B.Ed (ITEP)',
    code: 'BA-BED-ITEP',
    level: 'UG',
    category: 'education',
    duration: '4 Years',
    eligibility: '10+2 in Arts / Commerce / Science with minimum 50% marks. NCET (National Common Entrance Test) merit under NCTE ITEP.',
    description: 'Integrated 4-year dual-degree teacher preparation program saving one full academic year, combining a bachelor of arts degree with professional school teaching pedagogy.',
    order: 6
  },
  {
    name: 'Integrated B.Sc. B.Ed (ITEP)',
    code: 'BSC-BED-ITEP',
    level: 'UG',
    category: 'education',
    duration: '4 Years',
    eligibility: '10+2 with Science subjects (PCM/PCB) with minimum 50% marks. NCET entrance merit.',
    description: 'Dual-degree integrated program integrating foundational scientific training in Mathematics, Physics, Chemistry, or Biology with secondary school science teaching methodology.',
    order: 7
  },
  {
    name: 'M.Ed (Master of Education)',
    code: 'MED-GEN',
    level: 'PG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Pass in B.Ed, B.A. B.Ed, B.Sc. B.Ed, or D.El.Ed with an undergraduate degree with minimum 50% marks. NCTE norms.',
    description: 'Postgraduate education degree preparing teacher educators, educational researchers, and school principals in advanced philosophy of education, curriculum design, and psychometrics.',
    order: 8
  },
  {
    name: 'M.Ed Special Education',
    code: 'MED-SPED',
    level: 'PG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'B.Ed Special Education with minimum 50% marks from an RCI-recognized institution.',
    description: 'Advanced postgraduate specialization in inclusive education policies, cross-disability assessment methodologies, research in assistive technologies, and special school leadership.',
    order: 9
  },
  {
    name: 'M.P.Ed (Master of Physical Education)',
    code: 'MPED',
    level: 'PG',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Pass in B.P.Ed with minimum 50% marks and physical fitness proficiency test. NCTE norms.',
    description: 'Postgraduate degree focusing on sports biomechanics, sports psychology, sports nutrition, athletic conditioning sciences, and university sports department administration.',
    order: 10
  },
  {
    name: 'PG Diploma in Educational Management and Administration',
    code: 'PGD-EMA',
    level: 'Diploma',
    category: 'education',
    duration: '1 Year',
    eligibility: 'Bachelor degree in any discipline or B.Ed with minimum 50% marks.',
    description: 'Equips school administrators, vice-principals, and education coordinators with institutional finance, school safety regulations, teacher appraisal, and academic accreditation.',
    order: 11
  },
  {
    name: 'PG Diploma in Guidance and Counselling',
    code: 'PGD-GC',
    level: 'Diploma',
    category: 'education',
    duration: '1 Year',
    eligibility: 'Graduation in Psychology, Education, Social Work, or any discipline with 50% marks.',
    description: 'Prepares school career and emotional counselors in adolescent developmental crises, learning disability remediation, career guidance testing, and mental health counseling.',
    order: 12
  },
  {
    name: 'D.El.Ed (Diploma in Elementary Education)',
    code: 'DELED',
    level: 'Diploma',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Pass in 10+2 in any stream with minimum 50% aggregate marks (45% for reserved categories). Check SCERT guidelines.',
    description: 'NCTE-approved teacher training diploma qualifying educators to teach in primary and upper primary schools (Classes 1 through 8), covering child pedagogy and multi-grade teaching.',
    order: 13
  },
  {
    name: 'D.T.Ed (Diploma in Teacher Education)',
    code: 'DTED',
    level: 'Diploma',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Pass in 10+2 with minimum 50% marks from a recognized board.',
    description: 'Foundational teacher education diploma in Tamil Nadu focusing on early child development, regional language literacy instruction, basic numeracy, and classroom engagement.',
    order: 14
  },
  {
    name: 'D.P.Ed (Diploma in Physical Education)',
    code: 'DPED',
    level: 'Diploma',
    category: 'education',
    duration: '2 Years',
    eligibility: 'Pass in 10+2 in any stream with sports participation and physical fitness clearance.',
    description: 'Prepares physical training instructors (PET) for primary and middle schools in basic gymnastics, calisthenics, team game rules, and student fitness tracking.',
    order: 15
  },
  {
    name: 'Diploma in Early Childhood Care and Education (ECCE / NTT)',
    code: 'DIP-ECCE',
    level: 'Diploma',
    category: 'education',
    duration: '1 Year',
    eligibility: 'Pass in 10+2 in any stream from a recognized state or central board.',
    description: 'Prepares nursery, kindergarten, and pre-primary educators in play-based learning methodologies (Montessori/Froebel), early sensory development, and child safety.',
    order: 16
  },
  {
    name: 'Diploma in Special Education',
    code: 'DIP-SPED',
    level: 'Diploma',
    category: 'education',
    duration: '2 Years',
    eligibility: '10+2 in any discipline with minimum 50% marks. RCI-approved.',
    description: 'RCI-certified diploma qualifying educators for inclusive and special primary classrooms, focusing on early intervention, individual educational plans (IEP), and adaptive learning.',
    order: 17
  },

  // =========================================================================
  // 7. AGRICULTURE & ALLIED SCIENCES (agriculture) - 30 Programs
  // =========================================================================
  {
    name: 'B.Sc (Hons) Agriculture',
    code: 'BSC-AGRI',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Biology / Mathematics / Agriculture with minimum 50% aggregate marks. TNAU counselling or ICAR AIEEA entrance score.',
    description: 'ICAR-accredited comprehensive agricultural sciences degree covering crop agronomy, soil chemistry, plant breeding and genetics, agricultural entomology, farm economics, and a mandatory rural agricultural work experience (RAWE) program.',
    order: 1
  },
  {
    name: 'B.Sc (Hons) Horticulture',
    code: 'BSC-HORT',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCB / PCM / Agriculture with minimum 50% marks. TNAU admission or ICAR merit.',
    description: 'Focuses on the cultivation of fruit crops (pomology), vegetables (olericulture), floriculture, aromatic and medicinal plants, commercial post-harvest handling, and greenhouse technology.',
    order: 2
  },
  {
    name: 'B.Sc (Hons) Forestry',
    code: 'BSC-FORESTRY',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCB with minimum 50% aggregate marks. TNAU / ICAR counselling.',
    description: 'Covers silviculture, forest mensuration and tree inventory, wildlife habitat management, agroforestry systems, wood science and technology, and forest conservation laws.',
    order: 3
  },
  {
    name: 'B.Sc (Hons) Sericulture',
    code: 'BSC-SERI',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCB / PCM with minimum 50% marks. TNAU merit.',
    description: 'Specialized study in mulberry agronomy, silkworm rearing, silkworm genetics and pathology, cocoon harvesting, silk reeling technology, and raw silk grading.',
    order: 4
  },
  {
    name: 'B.Sc (Hons) Community Science',
    code: 'BSC-COMM-SCI',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCB / PCM with minimum 50% aggregate marks. TNAU / ICAR merit.',
    description: 'Encompasses rural family resource management, human development, community nutrition, apparel and textile science, and agricultural extension communication.',
    order: 5
  },
  {
    name: 'B.Tech Agricultural Engineering (ICAR/TNAU)',
    code: 'BTECH-AGRI-ENG',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCM / PCB with minimum 50% marks. TNAU / TNEA engineering counselling.',
    description: 'Focuses on design of modern tractors and tillage machinery, precision drip irrigation, watershed management, renewable farm energy, and post-harvest grain processing.',
    order: 6
  },
  {
    name: 'B.Tech Food Technology (Agriculture stream)',
    code: 'BTECH-AGRI-FOOD',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 50% marks. TNAU / ICAR counselling.',
    description: 'Dedicated to post-harvest grain, fruit and vegetable processing, dairy technology, commercial food packaging, industrial fermentation, and food quality safety inspection.',
    order: 7
  },
  {
    name: 'B.Tech Biotechnology (Agriculture specialization)',
    code: 'BTECH-AGRI-BIOTECH',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCM or PCB with minimum 50% marks. TNAU counselling.',
    description: 'Applies molecular marker-assisted selection, plant tissue culture, transgenic crop development, microbial biofertilizers, and bioinformatics in crop improvement.',
    order: 8
  },
  {
    name: 'B.Tech Energy and Environmental Engineering',
    code: 'BTECH-EEE-AGRI',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCM / PCB with minimum 50% aggregate marks. TNAU merit.',
    description: 'Focuses on agricultural biomass gasification, solar and wind energy for farms, rural waste-to-energy conversion, carbon footprint reduction, and environmental audits.',
    order: 9
  },
  {
    name: 'B.Tech Commercial Agriculture and Agribusiness',
    code: 'BTECH-AGRIBUSINESS',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCM / PCB with minimum 50% aggregate marks. TNAU counselling.',
    description: 'Integrates commercial farming technologies with agribusiness supply chain logistics, agricultural export trade, commodities futures, and contract farming management.',
    order: 10
  },
  {
    name: 'B.V.Sc & A.H. (Bachelor of Veterinary Science & Animal Husbandry)',
    code: 'BVSC-AH',
    level: 'UG',
    category: 'agriculture',
    duration: '5.5 Years',
    eligibility: '10+2 with PCB (minimum 60% in PCB and 50% in English) and NEET-UG or TANUVAS veterinary counselling merit. VCI-approved program.',
    description: 'Veterinary Council of India-recognized professional degree training veterinary doctors in animal medicine, livestock surgery, veterinary pharmacology, livestock breeding, and animal nutrition with 1-year clinical internship.',
    order: 11
  },
  {
    name: 'B.F.Sc (Bachelor of Fisheries Science)',
    code: 'BFSC',
    level: 'UG',
    category: 'agriculture',
    duration: '4 Years',
    eligibility: '10+2 with PCB with minimum 50% marks. TNJFU (Tamil Nadu Dr. J. Jayalalithaa Fisheries University) / ICAR entrance merit.',
    description: 'ICAR-recognized fisheries science degree covering aquaculture engineering, marine fish biology, fish processing and quality assurance, fishing gear technology, and aquatic pathology.',
    order: 12
  },
  {
    name: 'M.Sc (Agri) Agronomy',
    code: 'MSC-AGRI-AGRONOMY',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture with minimum OGPA 6.5/10.0 (6.0 for SC/ST) from an ICAR/SAU recognized university. ICAR AIEEA-PG or TNAU PG entrance.',
    description: 'Advanced postgraduate research in crop ecology, integrated weed management, nutrient use efficiency, precision farming, climate-resilient farming, and water management.',
    order: 13
  },
  {
    name: 'M.Sc (Agri) Agricultural Entomology',
    code: 'MSC-AGRI-ENTO',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture with required OGPA and PG entrance.',
    description: 'Focuses on insect physiology, toxicology of chemical and biological insecticides, biological pest control, economic entomology, and integrated pest management (IPM).',
    order: 14
  },
  {
    name: 'M.Sc (Agri) Plant Pathology',
    code: 'MSC-AGRI-PATH',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture from a recognized agricultural university.',
    description: 'Specialization in fungal, bacterial, and viral plant pathogens, plant disease epidemiology, molecular disease diagnostics, and integrated disease management.',
    order: 15
  },
  {
    name: 'M.Sc (Agri) Genetics and Plant Breeding',
    code: 'MSC-AGRI-BREED',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture with minimum qualifying OGPA.',
    description: 'Advanced postgraduate breeding program in hybrid seed production, quantitative genetics, molecular cytogenetics, genomics-assisted breeding, and crop variety release.',
    order: 16
  },
  {
    name: 'M.Sc (Agri) Soil Science and Agricultural Chemistry',
    code: 'MSC-AGRI-SOIL',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture with qualifying OGPA.',
    description: 'Advanced study of soil physics, soil chemistry, soil microbiology, micronutrient chemistry, remote sensing for soil mapping, and soil fertility evaluation.',
    order: 17
  },
  {
    name: 'M.Sc (Agri) Agricultural Economics',
    code: 'MSC-AGRI-ECON',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture from an accredited university.',
    description: 'Covers farm production economics, agricultural price analysis, econometric modeling, rural credit and microfinance, international agricultural trade, and agricultural policy.',
    order: 18
  },
  {
    name: 'M.Sc (Agri) Agricultural Extension and Communication',
    code: 'MSC-AGRI-EXT',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Agriculture / Horticulture with minimum qualifying OGPA.',
    description: 'Focuses on technology transfer strategies, participatory rural appraisal (PRA), ICT in agriculture, farmer producer organization (FPO) development, and adult learning.',
    order: 19
  },
  {
    name: 'M.Sc (Hort) Fruit Science',
    code: 'MSC-HORT-FRUIT',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Horticulture / Agriculture with qualifying OGPA.',
    description: 'Postgraduate research in tropical, subtropical, and temperate pomology, canopy architecture management, high-density orcharding, and post-harvest physiology of fruits.',
    order: 20
  },
  {
    name: 'M.Sc (Hort) Vegetable Science',
    code: 'MSC-HORT-VEG',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Horticulture / Agriculture with minimum qualifying OGPA.',
    description: 'Focuses on commercial breeding of solanaceous, cucurbitaceous, and cole crops, precision greenhouse protected cultivation, and organic vegetable production.',
    order: 21
  },
  {
    name: 'M.Sc (Hort) Floriculture and Landscaping',
    code: 'MSC-HORT-FLORI',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Sc (Hons) Horticulture with qualifying OGPA and entrance score.',
    description: 'Specialization in commercial cut flower cultivation (roses, carnations, orchids), landscape design principles, turf management, and essential oil extraction.',
    order: 22
  },
  {
    name: 'M.Tech Agricultural Processing and Food Engineering',
    code: 'MTECH-AGRI-PROC',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Tech Agricultural Engg / Food Tech / Mechanical with 50% marks and GATE/TANCET.',
    description: 'Advanced design of grain drying equipment, cold chain refrigerated storage, extrusion processing, modified atmosphere packaging, and food engineering plant layout.',
    order: 23
  },
  {
    name: 'M.Tech Farm Machinery and Power Engineering',
    code: 'MTECH-FARM-MACH',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.Tech Agricultural Engg / Mechanical Engg with minimum 50% marks.',
    description: 'Advanced study of tractor ergonomics, automated harvesting equipment, soil-tool mechanics, UAV/drone sprayers, and autonomous agricultural machinery.',
    order: 24
  },
  {
    name: 'M.F.Sc (Master of Fisheries Science)',
    code: 'MFSC',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.F.Sc with minimum OGPA 6.5/10.0 from an ICAR/SAU recognized university.',
    description: 'Postgraduate fisheries specialization in fish biotechnology, aquatic environment health, fish nutrition, fisheries resource management, and seafood quality assurance.',
    order: 25
  },
  {
    name: 'M.V.Sc Veterinary Clinical Medicine',
    code: 'MVSC-CLINICAL',
    level: 'PG',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'B.V.Sc & A.H. from a VCI-recognized veterinary college with qualifying OGPA.',
    description: 'Advanced veterinary master degree covering canine and feline internal medicine, equine and bovine intensive care, veterinary ultrasonography, and infectious disease management.',
    order: 26
  },
  {
    name: 'Diploma in Agriculture (2 Years)',
    code: 'DIP-AGRI-2YR',
    level: 'Diploma',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with minimum 50% marks. TNAU polytechnic admission.',
    description: 'Practical agricultural diploma training field extension workers in seasonal crop production, organic manuring, pest identification, weed control, and tractor operations.',
    order: 27
  },
  {
    name: 'Diploma in Horticulture (2 Years)',
    code: 'DIP-HORT-2YR',
    level: 'Diploma',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with minimum 50% marks.',
    description: 'Hands-on training in commercial nursery grafting, seed propagation, orchard maintenance, mushroom cultivation, and ornamental garden upkeep.',
    order: 28
  },
  {
    name: 'Diploma in Animal Husbandry',
    code: 'DIP-ANIMAL-HUSB',
    level: 'Diploma',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'Pass in 10th Standard (SSLC) from a recognized board. TANUVAS admission.',
    description: 'Trains livestock assistants in dairy cattle management, poultry farming operations, artificial insemination assistance, basic wound dressing, and livestock vaccination.',
    order: 29
  },
  {
    name: 'Diploma in Fisheries Technology',
    code: 'DIP-FISH-TECH',
    level: 'Diploma',
    category: 'agriculture',
    duration: '2 Years',
    eligibility: 'Pass in 10th Standard (SSLC) with Science.',
    description: 'Hands-on coastal and inland aquaculture training covering fish pond preparation, fingerling stocking, net fabrication, fish feed preparation, and post-catch icing.',
    order: 30
  }
];

// Ensure all records have isActive true and trimmed fields
const processedCourses = courses.map((c) => ({
  name: c.name.trim(),
  code: c.code.trim().toUpperCase(),
  level: c.level.trim(),
  category: c.category.trim().toLowerCase(),
  duration: c.duration.trim(),
  eligibility: c.eligibility.trim(),
  description: c.description.trim(),
  isActive: true,
  order: c.order || 0
}));

// Output paths
const targetPath1 = path.join(__dirname, '..', 'data', 'courses_master_catalog.json');
const targetPath2 = path.join(__dirname, '..', 'src', 'data', 'courses_master_catalog.json');

fs.writeFileSync(targetPath1, JSON.stringify(processedCourses, null, 2), 'utf8');
fs.writeFileSync(targetPath2, JSON.stringify(processedCourses, null, 2), 'utf8');

console.log(`Generated ${processedCourses.length} courses successfully!`);
console.log(`Saved to ${targetPath1} and ${targetPath2}`);
