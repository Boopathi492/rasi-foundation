import fs from 'fs';

const masterCourses = JSON.parse(fs.readFileSync('data/courses_master_catalog.json', 'utf8'));
const masterKeys = new Set(masterCourses.map(c => `${c.name.toLowerCase().trim()}|${c.level.toLowerCase().trim()}`));

export const candidateExpansionCourses = [
  // Dental (MDS)
  {
    name: "MDS Orthodontics and Dentofacial Orthopedics",
    code: "MDS-ORTHO",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree from a DCI recognized dental college and NEET-MDS qualification.",
    description: "Specialist postgraduate clinical master's degree in malocclusion correction, dentofacial orthopedics, clear aligners, and cleft lip/palate rehabilitation.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 601
  },
  {
    name: "MDS Oral and Maxillofacial Surgery",
    code: "MDS-OMFS",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree and NEET-MDS qualification.",
    description: "Advanced surgical postgraduate specialty in facial trauma, maxillofacial pathology, orthognathic surgery, dental implants, and temporomandibular joint disorders.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 602
  },
  {
    name: "MDS Conservative Dentistry and Endodontics",
    code: "MDS-ENDO",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree recognized by DCI and NEET-MDS qualification.",
    description: "Clinical dental specialization in root canal therapy, aesthetic dentistry, microsurgical endodontics, tooth preservation, and restorative materials.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 603
  },
  {
    name: "MDS Periodontology",
    code: "MDS-PERIO",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree and NEET-MDS qualification.",
    description: "Specialized training in periodontics, gum surgeries, periodontal plastic surgery, bone grafting, and dental implantology.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 604
  },
  {
    name: "MDS Prosthodontics and Crown & Bridge",
    code: "MDS-PROSTHO",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree and NEET-MDS qualification.",
    description: "Advanced dental prosthetics, full mouth rehabilitation, complete and partial dentures, fixed crown & bridge prostheses, and implant-supported prosthetics.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 605
  },
  {
    name: "MDS Paedodontics and Preventive Dentistry",
    code: "MDS-PEDO",
    level: "PG",
    category: "medical",
    specialization: "Dental",
    duration: "3 Years",
    eligibility: "BDS degree from a DCI recognized dental college and NEET-MDS qualification.",
    description: "Specialized pediatric dental healthcare, interceptive orthodontics, dental management of children with special healthcare needs, and preventive dental therapies.",
    sourceUrl: "https://dciindia.gov.in",
    isActive: true,
    order: 606
  },

  // Pharmacy Specializations
  {
    name: "M.Pharm Pharmacognosy",
    code: "MPHARM-PCOG",
    level: "PG",
    category: "medical",
    specialization: "Pharmacy",
    duration: "2 Years",
    eligibility: "B.Pharm degree from a PCI-approved college with minimum 55% aggregate marks.",
    description: "Postgraduate specialization in natural product drug discovery, phytochemistry, herbal formulation technology, standardization of herbal medicines, and marine pharmacology.",
    sourceUrl: "https://pci.nic.in",
    isActive: true,
    order: 607
  },
  {
    name: "M.Pharm Pharmacy Practice",
    code: "MPHARM-PP",
    level: "PG",
    category: "medical",
    specialization: "Pharmacy",
    duration: "2 Years",
    eligibility: "B.Pharm from PCI approved institution.",
    description: "Specialized hospital and patient-care pharmacy practice focusing on pharmacotherapy, patient counselling, drug information services, and pharmacoepidemiology.",
    sourceUrl: "https://pci.nic.in",
    isActive: true,
    order: 608
  },
  {
    name: "M.Pharm Industrial Pharmacy",
    code: "MPHARM-IP",
    level: "PG",
    category: "medical",
    specialization: "Pharmacy",
    duration: "2 Years",
    eligibility: "B.Pharm from PCI approved institution with minimum 55% marks.",
    description: "Advanced industrial scale-up, unit operations in pharmaceutical manufacturing, sterile product manufacturing, quality management systems, and technology transfer.",
    sourceUrl: "https://pci.nic.in",
    isActive: true,
    order: 609
  },
  {
    name: "M.Pharm Pharmaceutical Quality Assurance",
    code: "MPHARM-QA",
    level: "PG",
    category: "medical",
    specialization: "Pharmacy",
    duration: "2 Years",
    eligibility: "B.Pharm with minimum 55% from PCI recognized institution.",
    description: "cGMP guidelines, GLP, validation protocols, regulatory audit preparedness, pharmaceutical process validation, and documentation standards in pharmaceutical production.",
    sourceUrl: "https://pci.nic.in",
    isActive: true,
    order: 610
  },

  // Physiotherapy Specializations
  {
    name: "MPT Paediatrics",
    code: "MPT-PEDO",
    level: "PG",
    category: "medical",
    specialization: "Physiotherapy",
    duration: "2 Years",
    eligibility: "BPT degree with compulsory 6 months internship completed.",
    description: "Clinical physical therapy specializing in cerebral palsy, neurodevelopmental delays, pediatric torticollis, muscular dystrophy, and early childhood motor intervention.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 611
  },
  {
    name: "MPT Community Physiotherapy and Rehabilitation",
    code: "MPT-COMM",
    level: "PG",
    category: "medical",
    specialization: "Physiotherapy",
    duration: "2 Years",
    eligibility: "BPT degree with internship.",
    description: "Community-based rehabilitation (CBR), geriatric physical therapy, occupational health and ergonomics, women's health, and disability prevention in community populations.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 612
  },

  // Allied Health Sciences
  {
    name: "B.Sc Optometry and Ophthalmic Techniques",
    code: "BSC-OPTO-TECH",
    level: "UG",
    category: "medical",
    specialization: "Allied Health",
    duration: "3 Years + 1 Year Internship",
    eligibility: "10+2 with PCB with minimum 50% marks from a recognized board.",
    description: "Comprehensive training in refraction, visual acuity testing, contact lens fitting, binocular vision anomalies, low vision aids, and diagnostic ophthalmic equipment.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 613
  },
  {
    name: "B.Sc Emergency Medicine Technology",
    code: "BSC-EMT",
    level: "UG",
    category: "medical",
    specialization: "Allied Health",
    duration: "3 Years + 1 Year Internship",
    eligibility: "10+2 with PCB.",
    description: "Paramedical emergency curriculum covering advanced trauma life support assistance, emergency triage, disaster management, defibrillation, and ambulance transport care.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 614
  },
  {
    name: "Master of Public Health (MPH)",
    code: "MPH",
    level: "PG",
    category: "medical",
    specialization: "Public Health",
    duration: "2 Years",
    eligibility: "Bachelor's degree in medicine, dentistry, nursing, AYUSH, allied health, or life sciences from a recognized university.",
    description: "Interdisciplinary master's program covering epidemiology, biostatistics, health economics, health policy, disease surveillance, and community health management.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 615
  },
  {
    name: "M.Sc Medical Laboratory Technology (Hematology)",
    code: "MSC-MLT-HEM",
    level: "PG",
    category: "medical",
    specialization: "Allied Health",
    duration: "2 Years",
    eligibility: "B.Sc MLT from a recognized university.",
    description: "Advanced post-graduate diagnostic training in automated hematology, coagulation disorders, bone marrow cytology, blood banking, and immunopathology.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 616
  },
  {
    name: "M.Sc Medical Imaging Technology",
    code: "MSC-MIT",
    level: "PG",
    category: "medical",
    specialization: "Allied Health",
    duration: "2 Years",
    eligibility: "B.Sc Radiology / Imaging Technology from a recognized university.",
    description: "Specialized post-graduate training in multi-detector CT, high-field MRI physics, vascular interventional radiology assistance, and radiation safety protocols.",
    sourceUrl: "https://www.tnmgrmu.ac.in",
    isActive: true,
    order: 617
  },

  // Veterinary & Fisheries
  {
    name: "M.V.Sc Veterinary Surgery and Radiology",
    code: "MVSC-SURG",
    level: "PG",
    category: "agriculture",
    specialization: "Veterinary Science",
    duration: "2 Years",
    eligibility: "B.V.Sc & A.H. from a VCI recognized veterinary college with minimum 6.0/10.0 OGPA. TANUVAS admission.",
    description: "Advanced surgical procedures, anaesthesia protocols, diagnostic ultrasound, digital radiography, and orthopaedic surgery for companion animals, livestock, and wildlife.",
    sourceUrl: "https://tanuvas.ac.in",
    isActive: true,
    order: 618
  },
  {
    name: "M.V.Sc Veterinary Pathology",
    code: "MVSC-PATH",
    level: "PG",
    category: "agriculture",
    specialization: "Veterinary Science",
    duration: "2 Years",
    eligibility: "B.V.Sc & A.H. degree recognized by VCI.",
    description: "Postgraduate veterinary diagnostic pathology, histopathology, necropsy, clinical veterinary pathology, and oncopathology under TANUVAS.",
    sourceUrl: "https://tanuvas.ac.in",
    isActive: true,
    order: 619
  },
  {
    name: "M.F.Sc Aquaculture",
    code: "MFSC-AQUA",
    level: "PG",
    category: "agriculture",
    specialization: "Fisheries Science",
    duration: "2 Years",
    eligibility: "B.F.Sc degree from an ICAR recognized fisheries university. TNJFU admission.",
    description: "Master's degree in freshwater and marine finfish and shellfish culture, hatchery management, aqua-feed technology, water quality, and aquatic animal health.",
    sourceUrl: "https://tnjfu.ac.in",
    isActive: true,
    order: 620
  },

  // Agriculture Diplomas
  {
    name: "Diploma in Agriculture",
    code: "DIP-AGRI",
    level: "Diploma",
    category: "agriculture",
    specialization: "Agriculture",
    duration: "2 Years",
    eligibility: "10th standard pass or 10+2 from recognized school board. Offered under TNAU constituent and affiliated institutions.",
    description: "Two-year practical diploma in agronomy, soil fertility, seed production, plant protection, organic farming, and farm machinery maintenance.",
    sourceUrl: "https://tnau.ac.in",
    isActive: true,
    order: 621
  },
  {
    name: "Diploma in Horticulture",
    code: "DIP-HORT",
    level: "Diploma",
    category: "agriculture",
    specialization: "Horticulture",
    duration: "2 Years",
    eligibility: "10th standard pass or 10+2. TNAU affiliated curriculum.",
    description: "Two-year hands-on diploma in orchard management, vegetable production, nursery raising, protected cultivation, and landscape gardening.",
    sourceUrl: "https://tnau.ac.in",
    isActive: true,
    order: 622
  },
  {
    name: "Diploma in Petrochemical Engineering",
    code: "DIP-PETRO",
    level: "Diploma",
    category: "engineering",
    specialization: "Petrochemical",
    duration: "3 Years",
    eligibility: "10th standard pass with Science and Mathematics. Approved by DOTE Tamil Nadu.",
    description: "Polytechnic curriculum covering petroleum refining, unit operations, chemical reaction engineering, process safety, and instrumentation.",
    sourceUrl: "https://www.dote.tn.gov.in",
    isActive: true,
    order: 623
  },

  // Engineering & Polytechnic Diplomas
  {
    name: "Diploma in Artificial Intelligence and Machine Learning",
    code: "DIP-AIML",
    level: "Diploma",
    category: "engineering",
    specialization: "Artificial Intelligence",
    duration: "3 Years",
    eligibility: "10th standard pass with Science and Mathematics. Approved by DOTE Tamil Nadu and AICTE.",
    description: "State polytechnic diploma covering Python programming, machine learning basics, computer vision, data preprocessing, and AI application development.",
    sourceUrl: "https://www.dote.tn.gov.in",
    isActive: true,
    order: 624
  },
  {
    name: "Diploma in Cloud Computing and Big Data",
    code: "DIP-CLOUD",
    level: "Diploma",
    category: "engineering",
    specialization: "Cloud Computing",
    duration: "3 Years",
    eligibility: "10th standard pass. Approved by DOTE Tamil Nadu and AICTE.",
    description: "Polytechnic curriculum covering cloud architecture, virtualization, Linux administration, database management, and cloud security.",
    sourceUrl: "https://www.dote.tn.gov.in",
    isActive: true,
    order: 625
  },
  {
    name: "Diploma in Robotics and Automation",
    code: "DIP-ROBOT",
    level: "Diploma",
    category: "engineering",
    specialization: "Robotics",
    duration: "3 Years",
    eligibility: "10th standard pass. Approved by DOTE and AICTE.",
    description: "Practical polytechnic course in industrial robotics, sensors and actuators, PLC programming, microcontrollers, and hydraulic/pneumatic automation systems.",
    sourceUrl: "https://www.dote.tn.gov.in",
    isActive: true,
    order: 626
  },
  {
    name: "Diploma in Mechatronics Engineering",
    code: "DIP-MECHATRO",
    level: "Diploma",
    category: "engineering",
    specialization: "Mechatronics",
    duration: "3 Years",
    eligibility: "10th standard pass. Approved by DOTE Tamil Nadu.",
    description: "Integration of mechanical systems, electronics, sensor technologies, CNC machines, microcontrollers, and automated production lines.",
    sourceUrl: "https://www.dote.tn.gov.in",
    isActive: true,
    order: 627
  },
  {
    name: "M.Tech Data Science",
    code: "MTECH-DS",
    level: "PG",
    category: "engineering",
    specialization: "Data Science",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in relevant branch with TANCET / GATE.",
    description: "Advanced data engineering, statistical modeling, deep learning architectures, big data distributed computing, and natural language processing.",
    sourceUrl: "https://www.annauniv.edu",
    isActive: true,
    order: 628
  },
  {
    name: "M.E. Energy Engineering",
    code: "ME-ENERGY",
    level: "PG",
    category: "engineering",
    specialization: "Energy Engineering",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Mechanical, Chemical, Electrical, or Energy Engineering with valid TANCET / GATE score.",
    description: "Advanced renewable energy systems, solar thermal and photovoltaic technologies, wind energy, biomass conversion, and energy auditing.",
    sourceUrl: "https://www.annauniv.edu",
    isActive: true,
    order: 629
  },
  {
    name: "M.E. Environmental Management",
    code: "ME-ENVIRO",
    level: "PG",
    category: "engineering",
    specialization: "Environmental Engineering",
    duration: "2 Years",
    eligibility: "B.E./B.Tech in Civil, Chemical, or Environmental Engineering with TANCET / GATE.",
    description: "Advanced environmental impact assessment, industrial wastewater treatment technologies, air pollution control, solid waste management, and GIS applications in environment.",
    sourceUrl: "https://www.annauniv.edu",
    isActive: true,
    order: 630
  },

  // Arts & Science Specializations
  {
    name: "B.Sc Clinical Psychology",
    code: "BSC-CLIN-PSY",
    level: "UG",
    category: "arts",
    specialization: "Psychology",
    duration: "3 Years",
    eligibility: "10+2 in any stream (Science preferred) from a recognized board.",
    description: "Foundational undergraduate studies in human cognition, abnormal psychology, psychological assessment, counselling theories, and psychopathology.",
    sourceUrl: "https://www.ugc.gov.in",
    isActive: true,
    order: 631
  },
  {
    name: "M.Sc Clinical Psychology",
    code: "MSC-CLIN-PSY",
    level: "PG",
    category: "arts",
    specialization: "Psychology",
    duration: "2 Years",
    eligibility: "B.A. or B.Sc in Psychology from a recognized university.",
    description: "Advanced clinical diagnostics, psychometry, neuropsychology, cognitive behavioural therapies, and hospital psychiatric clinical postings.",
    sourceUrl: "https://www.ugc.gov.in",
    isActive: true,
    order: 632
  },
  {
    name: "B.Sc Cyber Forensics and Information Security",
    code: "BSC-CYBER-FOR",
    level: "UG",
    category: "arts",
    specialization: "Cyber Security",
    duration: "3 Years",
    eligibility: "10+2 with Mathematics/Computer Science/Science stream.",
    description: "Undergraduate curriculum covering digital evidence recovery, incident response, network forensic analysis, ethical hacking, and cyber law.",
    sourceUrl: "https://www.ugc.gov.in",
    isActive: true,
    order: 633
  },
  {
    name: "B.Sc Interior Design and Decoration",
    code: "BSC-INTERIOR",
    level: "UG",
    category: "arts",
    specialization: "Interior Design",
    duration: "3 Years",
    eligibility: "10+2 in any stream from a recognized board.",
    description: "Spatial planning, architectural CAD, lighting design, material selection, furniture design, and commercial/residential interior styling.",
    sourceUrl: "https://www.ugc.gov.in",
    isActive: true,
    order: 634
  },
  {
    name: "B.Com FinTech (Financial Technology)",
    code: "BCOM-FINTECH",
    level: "UG",
    category: "arts",
    specialization: "FinTech",
    duration: "3 Years",
    eligibility: "10+2 with Commerce, Accountancy, or Mathematics.",
    description: "Modern commercial curriculum combining financial accounting, banking regulations, algorithmic trading, blockchain fundamentals, and digital payment gateways.",
    sourceUrl: "https://www.ugc.gov.in",
    isActive: true,
    order: 635
  },

  // Law Specializations
  {
    name: "PG Diploma in Cyber Law and Information Security",
    code: "PGD-CYBER-LAW",
    level: "PG",
    category: "law",
    specialization: "Cyber Law",
    duration: "1 Year",
    eligibility: "Bachelor's degree in Law or any discipline from a recognized university. Offered under TNDALU.",
    description: "Specialized postgraduate legal diploma in IT Act regulations, electronic contracts, digital privacy, cybercrime prosecution, and international cyber warfare law.",
    sourceUrl: "https://tndalu.ac.in",
    isActive: true,
    order: 636
  },
  {
    name: "PG Diploma in Intellectual Property Rights",
    code: "PGD-IPR",
    level: "PG",
    category: "law",
    specialization: "Intellectual Property",
    duration: "1 Year",
    eligibility: "Graduation in any discipline or law graduate.",
    description: "Patent drafting, trademark registration, copyright licensing, design laws, trade secrets, and international WIPO treaties.",
    sourceUrl: "https://tndalu.ac.in",
    isActive: true,
    order: 637
  },
  {
    name: "PG Diploma in Alternative Dispute Resolution (ADR)",
    code: "PGD-ADR",
    level: "PG",
    category: "law",
    specialization: "Dispute Resolution",
    duration: "1 Year",
    eligibility: "Bachelor's degree from a recognized university. TNDALU curriculum.",
    description: "Arbitration mechanisms, mediation ethics, conciliation proceedings, international commercial arbitration, and Lok Adalat framework.",
    sourceUrl: "https://tndalu.ac.in",
    isActive: true,
    order: 638
  },

  // Management Specializations
  {
    name: "MBA Hospital and Healthcare Management",
    code: "MBA-HHM",
    level: "PG",
    category: "management",
    specialization: "Healthcare Management",
    duration: "2 Years",
    eligibility: "Any undergraduate degree with minimum 50% marks and TANCET/MAT/CAT score.",
    description: "Hospital operations management, NABH accreditation standards, health insurance, medical ethics, patient satisfaction metrics, and clinical inventory control.",
    sourceUrl: "https://www.aicte-india.org",
    isActive: true,
    order: 639
  },
  {
    name: "MBA Business Analytics",
    code: "MBA-BA",
    level: "PG",
    category: "management",
    specialization: "Business Analytics",
    duration: "2 Years",
    eligibility: "Bachelor's degree with Mathematics/Statistics background preferred.",
    description: "Data-driven managerial decision making, predictive business analytics, spreadsheet modeling, customer lifetime value analytics, and executive dashboards.",
    sourceUrl: "https://www.aicte-india.org",
    isActive: true,
    order: 640
  },
  {
    name: "MBA Agri-Business Management",
    code: "MBA-AGRI",
    level: "PG",
    category: "management",
    specialization: "Agri-Business",
    duration: "2 Years",
    eligibility: "Bachelor's degree in Agriculture, Allied Sciences, or any discipline with valid entrance score.",
    description: "Agricultural supply chains, commodity trading, food retail management, microfinance in agriculture, and rural marketing strategies.",
    sourceUrl: "https://www.aicte-india.org",
    isActive: true,
    order: 641
  },

  // Education Specializations
  {
    name: "B.Ed Special Education (Autism Spectrum Disorder)",
    code: "BED-SE-ASD",
    level: "UG",
    category: "education",
    specialization: "Special Education",
    duration: "2 Years",
    eligibility: "Bachelor's degree with minimum 50% marks from a recognized university. Approved by Rehabilitation Council of India (RCI) and NCTE.",
    description: "Professional teacher training qualification specializing in pedagogy for learners with Autism Spectrum Disorder (ASD), sensory therapies, and individualized education programs (IEPs).",
    sourceUrl: "https://ncte.gov.in",
    isActive: true,
    order: 642
  },
  {
    name: "M.Ed Special Education (Hearing Impairment)",
    code: "MED-SE-HI",
    level: "PG",
    category: "education",
    specialization: "Special Education",
    duration: "2 Years",
    eligibility: "B.Ed Special Education (HI) or B.Ed with D.Ed Special Education. Recognized by RCI.",
    description: "Advanced teacher educator preparation in audiology for educators, speech development strategies, sign language, and inclusive school administration.",
    sourceUrl: "https://ncte.gov.in",
    isActive: true,
    order: 643
  }
];

// Check duplicate against master
const duplicateInMaster = candidateExpansionCourses.filter(c => masterKeys.has(`${c.name.toLowerCase().trim()}|${c.level.toLowerCase().trim()}`));
if (duplicateInMaster.length > 0) {
  console.error("Collision with master courses detected:", duplicateInMaster.map(c => `${c.name} (${c.level})`));
  process.exit(1);
}

fs.writeFileSync('data/tamil_nadu_courses_expansion.json', JSON.stringify(candidateExpansionCourses, null, 2), 'utf8');
console.log(`SUCCESS: Generated data/tamil_nadu_courses_expansion.json with ${candidateExpansionCourses.length} genuine unique courses (0 duplicates against master catalog).`);
