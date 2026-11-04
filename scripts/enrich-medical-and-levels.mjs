import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

import dbConnect from '../src/backend/lib/mongodb.js';
import College from '../src/backend/models/College.js';
import Course from '../src/backend/models/Course.js';

const VERIFIED_AYUSH_COLLEGES = [
  {
    name: 'Government Siddha Medical College, Chennai',
    location: 'Arumbakkam, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Siddha',
    institutionType: 'Government',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-01',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BSMS', 'MD (Siddha)'],
    academicLevels: ['UG', 'PG'],
    courseCodes: ['BSMS'],
    website: 'https://gsmcchennai.ac.in',
  },
  {
    name: 'Government Siddha Medical College, Palayamkottai',
    location: 'Palayamkottai, Tirunelveli',
    district: 'Tirunelveli',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Siddha',
    institutionType: 'Government',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-02',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BSMS', 'MD (Siddha)'],
    academicLevels: ['UG', 'PG'],
    courseCodes: ['BSMS'],
    website: 'https://gsmcpalayamkottai.edu.in',
  },
  {
    name: 'Government Homoeopathic Medical College and Hospital',
    location: 'Thirumangalam, Madurai',
    district: 'Madurai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Homoeopathy',
    institutionType: 'Government',
    codeType: 'NCH',
    codeValue: 'TN-HOM-01',
    issuingAuthority: 'National Commission for Homoeopathy (NCH) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BHMS', 'MD (Homoeopathy)'],
    academicLevels: ['UG', 'PG'],
    courseCodes: ['BHMS'],
    website: 'https://ghmcmadurai.tn.gov.in',
  },
  {
    name: 'Government Ayurveda Medical College and Hospital',
    location: 'Kottar, Nagercoil, Kanniyakumari',
    district: 'Kanniyakumari',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Ayurveda',
    institutionType: 'Government',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-03',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BAMS'],
    academicLevels: ['UG'],
    courseCodes: ['BAMS'],
    website: 'https://gamckottar.tn.gov.in',
  },
  {
    name: 'Government Yoga and Naturopathy Medical College and Hospital',
    location: 'Arumbakkam, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Naturopathy & Yoga',
    institutionType: 'Government',
    codeType: 'AYUSH',
    codeValue: 'TN-NAT-01',
    issuingAuthority: 'Directorate of Indian Medicine & Homoeopathy / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BNYS', 'MD (Yoga & Naturopathy)'],
    academicLevels: ['UG', 'PG'],
    courseCodes: ['BNYS'],
    website: 'https://gynmc.tn.gov.in',
  },
  {
    name: 'Government Unani Medical College',
    location: 'Arumbakkam, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Unani',
    institutionType: 'Government',
    codeType: 'NCISM',
    codeValue: 'TN-UNA-01',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BUMS'],
    academicLevels: ['UG'],
    courseCodes: ['BUMS'],
    website: 'https://gumcchennai.tn.gov.in',
  },
  {
    name: 'Sarada Krishna Homoeopathic Medical College',
    location: 'Kulasekharam, Kanniyakumari',
    district: 'Kanniyakumari',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Homoeopathy',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCH',
    codeValue: 'TN-HOM-02',
    issuingAuthority: 'National Commission for Homoeopathy (NCH) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BHMS', 'MD (Homoeopathy)'],
    academicLevels: ['UG', 'PG'],
    courseCodes: ['BHMS'],
    website: 'https://skhmc.org',
  },
  {
    name: 'Sri Sairam Ayurveda Medical College and Hospital',
    location: 'Sai Leo Nagar, West Tambaram, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Ayurveda',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-04',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BAMS'],
    academicLevels: ['UG'],
    courseCodes: ['BAMS'],
    website: 'https://sairamayur.edu.in',
  },
  {
    name: 'Sivaraj Siddha Medical College',
    location: 'Siddhar Kovil Road, Thumbathulipatty, Salem',
    district: 'Salem',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Siddha',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-05',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BSMS'],
    academicLevels: ['UG'],
    courseCodes: ['BSMS'],
    website: 'https://sivarajinstitutions.com/siddha',
  },
  {
    name: 'Sivaraj Homoeopathic Medical College and Hospital',
    location: 'Siddhar Kovil Road, Thumbathulipatty, Salem',
    district: 'Salem',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Homoeopathy',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCH',
    codeValue: 'TN-HOM-03',
    issuingAuthority: 'National Commission for Homoeopathy (NCH) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BHMS'],
    academicLevels: ['UG'],
    courseCodes: ['BHMS'],
    website: 'https://sivarajinstitutions.com/homoeo',
  },
  {
    name: 'Sivaraj Naturopathy and Yoga Medical College',
    location: 'Siddhar Kovil Road, Thumbathulipatty, Salem',
    district: 'Salem',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Naturopathy & Yoga',
    institutionType: 'Private / Self-Financing',
    codeType: 'AYUSH',
    codeValue: 'TN-NAT-02',
    issuingAuthority: 'Directorate of Indian Medicine & Homoeopathy / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BNYS'],
    academicLevels: ['UG'],
    courseCodes: ['BNYS'],
    website: 'https://sivarajinstitutions.com/yoga',
  },
  {
    name: 'Ayurveda College, Coimbatore',
    location: 'Sulur / Ramanathapuram, Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Ayurveda',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-06',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BAMS'],
    academicLevels: ['UG'],
    courseCodes: ['BAMS'],
    website: 'https://ayurvedacollege.com',
  },
  {
    name: 'R.V.S. Siddha Medical College and Hospital',
    location: 'Kumaran Kottam Campus, Kannampalayam, Sulur, Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Siddha',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-07',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BSMS'],
    academicLevels: ['UG'],
    courseCodes: ['BSMS'],
    website: 'https://rvssiddha.ac.in',
  },
  {
    name: 'R.V.S. Homoeopathic Medical College and Hospital',
    location: 'Kumaran Kottam Campus, Kannampalayam, Sulur, Coimbatore',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Homoeopathy',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCH',
    codeValue: 'TN-HOM-04',
    issuingAuthority: 'National Commission for Homoeopathy (NCH) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BHMS'],
    academicLevels: ['UG'],
    courseCodes: ['BHMS'],
    website: 'https://rvshomoeo.ac.in',
  },
  {
    name: 'J.K.K. Nattraja Naturopathy and Yoga Medical College',
    location: 'Natarajapuram, NH-544, Komarapalayam',
    district: 'Namakkal',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Naturopathy & Yoga',
    institutionType: 'Private / Self-Financing',
    codeType: 'AYUSH',
    codeValue: 'TN-NAT-03',
    issuingAuthority: 'Directorate of Indian Medicine & Homoeopathy / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BNYS'],
    academicLevels: ['UG'],
    courseCodes: ['BNYS'],
    website: 'https://jkkn.ac.in/yoga-naturopathy',
  },
  {
    name: 'Excel Medical College for Naturopathy and Yoga',
    location: 'NH-544, Pallakkapalayam, Komarapalayam',
    district: 'Namakkal',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Naturopathy & Yoga',
    institutionType: 'Private / Self-Financing',
    codeType: 'AYUSH',
    codeValue: 'TN-NAT-04',
    issuingAuthority: 'Directorate of Indian Medicine & Homoeopathy / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BNYS'],
    academicLevels: ['UG'],
    courseCodes: ['BNYS'],
    website: 'https://excelinstitutions.com/naturopathy-yoga',
  },
  {
    name: 'Dharma Ayurveda Medical College and Hospital',
    location: 'Bangalore Trunk Road, Sriperumbudur',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Ayurveda',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-08',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BAMS'],
    academicLevels: ['UG'],
    courseCodes: ['BAMS'],
    website: 'https://dharmamedical.org',
  },
  {
    name: 'Velumailu Siddha Medical College and Hospital',
    location: 'No. 48, G.S.T. Road, Sriperumbudur',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Siddha',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-09',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BSMS'],
    academicLevels: ['UG'],
    courseCodes: ['BSMS'],
    website: 'https://velumailusiddha.com',
  },
  {
    name: 'Venkateswara Homoeopathy Medical College and Hospital',
    location: 'No. 4/11, Samayapuram Main Road, Porur, Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Homoeopathy',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCH',
    codeValue: 'TN-HOM-05',
    issuingAuthority: 'National Commission for Homoeopathy (NCH) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BHMS'],
    academicLevels: ['UG'],
    courseCodes: ['BHMS'],
    website: 'https://vhmc.org',
  },
  {
    name: 'Nandha Ayurveda Medical College and Hospital',
    location: 'Pitchandampalayam Post, Perundurai Main Road, Erode',
    district: 'Erode',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Ayurveda',
    institutionType: 'Private / Self-Financing',
    codeType: 'NCISM',
    codeValue: 'TN-AYU-10',
    issuingAuthority: 'National Commission for Indian System of Medicine (NCISM) / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BAMS'],
    academicLevels: ['UG'],
    courseCodes: ['BAMS'],
    website: 'https://nandhaayurveda.org',
  },
  {
    name: 'Nandha Naturopathy and Yoga Medical College',
    location: 'Pitchandampalayam Post, Perundurai Main Road, Erode',
    district: 'Erode',
    state: 'Tamil Nadu',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    specialization: 'Naturopathy & Yoga',
    institutionType: 'Private / Self-Financing',
    codeType: 'AYUSH',
    codeValue: 'TN-NAT-05',
    issuingAuthority: 'Directorate of Indian Medicine & Homoeopathy / TN Dr. M.G.R. Medical University',
    codeStatus: 'VERIFIED',
    verificationStatus: 'verified',
    departments: ['BNYS'],
    academicLevels: ['UG'],
    courseCodes: ['BNYS'],
    website: 'https://nandhayoga.org',
  },
];

async function runEnrichment() {
  await dbConnect();

  console.log('=== STEP 1: ENRICHING COURSES (Setting medicalCategory & levels) ===');
  const allCourses = await Course.find({}).lean();
  let courseUpdatedCount = 0;

  for (const c of allCourses) {
    let medCat = '';
    const nameUpper = (c.name || '').toUpperCase();
    const codeUpper = (c.code || '').toUpperCase();

    // 1. AYUSH courses
    if (['BAMS', 'BHMS', 'BSMS', 'BNYS', 'BUMS'].includes(codeUpper) || ['BAMS', 'BHMS', 'BSMS', 'BNYS', 'BUMS'].includes(nameUpper)) {
      medCat = 'AYUSH';
    }
    // 2. Core Medical: MBBS / BDS
    else if (
      nameUpper === 'MBBS' || codeUpper === 'MBBS' ||
      nameUpper === 'BDS' || codeUpper === 'BDS' ||
      nameUpper.startsWith('MDS ') || codeUpper.startsWith('MDS-')
    ) {
      medCat = 'MBBS / BDS';
    }
    // 3. Paramedical / Allied Health Sciences
    else if (
      c.category === 'medical' ||
      /nursing|pharm|physio|allied|medical laboratory|radiology|optom|cardiac|dialysis|perfusion|operation theatre|anaesthesia|physician assistant|respiratory|critical care|emergency|trauma|neuro electrophysiology|nuclear medicine|medical record|audiology|baslp|maslp|bot|mot/i.test(`${c.name} ${c.specialization || ''}`)
    ) {
      medCat = 'Paramedical / Allied Health Sciences';
    }

    if (medCat && c.medicalCategory !== medCat) {
      await Course.updateOne(
        { _id: c._id },
        { $set: { medicalCategory: medCat, category: 'medical' } }
      );
      courseUpdatedCount++;
    }
  }
  console.log(`Updated ${courseUpdatedCount} Course records with correct medicalCategory.`);

  console.log('\n=== STEP 2: FIXING NULL TYPE ENGINEERING COLLEGES ===');
  const nullTypeRes = await College.updateMany(
    { type: null },
    { $set: { type: 'Engineering' } }
  );
  console.log(`Updated ${nullTypeRes.modifiedCount} colleges with null type to 'Engineering'.`);

  console.log('\n=== STEP 3: ENRICHING EXISTING MEDICAL COLLEGES ===');
  const medicalColleges = await College.find({ type: 'Medical' });
  let medUpdatedCount = 0;

  for (const col of medicalColleges) {
    const spec = (col.specialization || '').toLowerCase();
    const name = col.name.toLowerCase();
    const depts = (col.departments || []).join(' ').toLowerCase();

    let targetCategory = '';
    let codeType = col.codeType || '';
    let issuingAuthority = col.issuingAuthority || '';

    // If Dental or BDS
    if (spec === 'dental' || name.includes('dental') || depts.includes('bds') || depts.includes('mds')) {
      targetCategory = 'MBBS / BDS';
      if (!codeType || codeType === 'TNEA') {
        codeType = 'DCI';
        issuingAuthority = 'Dental Council of India (DCI)';
      }
    }
    // If Core Medical / MBBS / General Medical College
    else if (
      name.includes('medical college') &&
      !name.includes('naturopathy') &&
      !name.includes('ayurveda') &&
      !name.includes('siddha') &&
      !name.includes('homoeo') &&
      !name.includes('nursing') &&
      !name.includes('pharmacy') &&
      !name.includes('physiotherapy')
    ) {
      targetCategory = 'MBBS / BDS';
      if (!codeType || codeType === 'TNEA') {
        codeType = 'NMC';
        issuingAuthority = 'National Medical Commission (NMC)';
      }
    }
    // If Pharmacy
    else if (spec === 'pharmacy' || name.includes('pharmacy') || depts.includes('b.pharm') || depts.includes('d.pharm')) {
      targetCategory = 'Paramedical / Allied Health Sciences';
      if (!codeType || codeType === 'TNEA') {
        codeType = 'PCI';
        issuingAuthority = 'Pharmacy Council of India (PCI)';
      }
    }
    // If Nursing
    else if (spec === 'nursing' || name.includes('nursing') || depts.includes('b.sc nursing') || depts.includes('b.sc. nursing')) {
      targetCategory = 'Paramedical / Allied Health Sciences';
      if (!codeType || codeType === 'TNEA') {
        codeType = 'INC';
        issuingAuthority = 'Indian Nursing Council (INC)';
      }
    }
    // If Physiotherapy
    else if (spec === 'physiotherapy' || name.includes('physiotherapy') || depts.includes('bpt') || depts.includes('mpt')) {
      targetCategory = 'Paramedical / Allied Health Sciences';
      if (!codeType || codeType === 'TNEA') {
        codeType = 'TN_MGR';
        issuingAuthority = 'The Tamil Nadu Dr. M.G.R. Medical University';
      }
    }
    // Other Allied Health
    else if (spec === 'allied health' || name.includes('allied health') || spec === 'veterinary' || spec === 'fisheries') {
      targetCategory = 'Paramedical / Allied Health Sciences';
    } else {
      // Default fallback based on depts
      if (depts.includes('mbbs')) {
        targetCategory = 'MBBS / BDS';
        codeType = 'NMC';
      } else {
        targetCategory = 'Paramedical / Allied Health Sciences';
      }
    }

    const updates = {
      medicalCategory: targetCategory,
      codeType,
      issuingAuthority,
      tneaCode: '', // Medical colleges do NOT use TNEA codes
      tneaStatus: 'not_applicable',
    };

    await College.updateOne({ _id: col._id }, { $set: updates });
    medUpdatedCount++;
  }
  console.log(`Updated ${medUpdatedCount} existing Medical colleges with accurate medicalCategory and regulatory codeType.`);

  console.log('\n=== STEP 4: SEEDING / UPSERTING 21 VERIFIED AYUSH COLLEGES ===');
  let ayushAdded = 0;
  let ayushUpdated = 0;

  // Cache AYUSH courses
  const ayushCourses = await Course.find({
    code: { $in: ['BAMS', 'BHMS', 'BSMS', 'BNYS', 'BUMS'] }
  });
  const ayushCourseMap = new Map(ayushCourses.map(c => [c.code, c]));

  for (const ac of VERIFIED_AYUSH_COLLEGES) {
    const existing = await College.findOne({
      name: ac.name,
      district: ac.district
    });

    const targetCourseIds = [];
    for (const cCode of ac.courseCodes) {
      const cr = ayushCourseMap.get(cCode);
      if (cr) targetCourseIds.push(cr._id);
    }

    if (existing) {
      await College.updateOne(
        { _id: existing._id },
        {
          $set: {
            ...ac,
            courses: targetCourseIds,
            tneaCode: '',
            tneaStatus: 'not_applicable',
          }
        }
      );
      // Link college back to Course.colleges
      for (const crId of targetCourseIds) {
        await Course.updateOne(
          { _id: crId },
          { $addToSet: { colleges: existing._id } }
        );
      }
      ayushUpdated++;
    } else {
      const created = await College.create({
        ...ac,
        courses: targetCourseIds,
        tneaCode: '',
        tneaStatus: 'not_applicable',
        isActive: true,
      });
      for (const crId of targetCourseIds) {
        await Course.updateOne(
          { _id: crId },
          { $addToSet: { colleges: created._id } }
        );
      }
      ayushAdded++;
    }
  }
  console.log(`AYUSH colleges: ${ayushAdded} added, ${ayushUpdated} updated.`);

  console.log('\n=== STEP 5: LINKING CORE MEDICAL & DENTAL COURSES TO COLLEGES ===');
  const mbbsCourse = await Course.findOne({ code: 'MBBS' });
  const bdsCourse = await Course.findOne({ code: 'BDS' });

  if (mbbsCourse) {
    const mbbsColleges = await College.find({
      type: 'Medical',
      medicalCategory: 'MBBS / BDS',
      $or: [
        { departments: { $regex: /m\.?b\.?b\.?s/i } },
        { name: { $regex: /medical college/i } }
      ],
      name: { $not: /dental/i }
    });
    for (const col of mbbsColleges) {
      await College.updateOne(
        { _id: col._id },
        { $addToSet: { courses: mbbsCourse._id } }
      );
      await Course.updateOne(
        { _id: mbbsCourse._id },
        { $addToSet: { colleges: col._id } }
      );
    }
    console.log(`Linked MBBS course to ${mbbsColleges.length} Core Medical colleges.`);
  }

  if (bdsCourse) {
    const bdsColleges = await College.find({
      type: 'Medical',
      medicalCategory: 'MBBS / BDS',
      $or: [
        { departments: { $regex: /bds/i } },
        { name: { $regex: /dental/i } }
      ]
    });
    for (const col of bdsColleges) {
      await College.updateOne(
        { _id: col._id },
        { $addToSet: { courses: bdsCourse._id } }
      );
      await Course.updateOne(
        { _id: bdsCourse._id },
        { $addToSet: { colleges: col._id } }
      );
    }
    console.log(`Linked BDS course to ${bdsColleges.length} Dental colleges.`);
  }

  console.log('\n=== STEP 6: COMPUTING ACADEMIC LEVELS (UG / PG / Diploma) FOR ALL COLLEGES ===');
  const allCollegesAfter = await College.find({}).populate('courses', 'level');
  let levelUpdateCount = 0;

  for (const col of allCollegesAfter) {
    const levelsSet = new Set();

    // 1. From linked courses
    (col.courses || []).forEach(cr => {
      if (cr && cr.level && ['UG', 'PG', 'Diploma'].includes(cr.level)) {
        levelsSet.add(cr.level);
      }
    });

    // 2. From departments strings
    const depts = (col.departments || []);
    depts.forEach(d => {
      const dUpper = d.toUpperCase();
      // Diploma indicators
      if (dUpper.includes('DIPLOMA') || dUpper.includes('D.PHARM') || dUpper.includes('GNM') || dUpper.includes('ANM') || dUpper.includes('DMLT') || dUpper.startsWith('D.')) {
        levelsSet.add('Diploma');
      }
      // PG indicators
      if (
        dUpper.startsWith('M.E.') || dUpper.startsWith('M.TECH') || dUpper.startsWith('M.E ') ||
        dUpper.startsWith('M.S.') || dUpper.startsWith('M.D.') || dUpper.startsWith('MDS') ||
        dUpper.startsWith('M.SC') || dUpper.startsWith('M.PHARM') || dUpper.startsWith('MPT') ||
        dUpper.startsWith('MOT') || dUpper.startsWith('MBA') || dUpper.startsWith('M.B.A') ||
        dUpper.startsWith('MCA') || dUpper.startsWith('M.C.A') || dUpper.startsWith('M.COM') ||
        dUpper.startsWith('M.A.') || dUpper.startsWith('M.ED') || dUpper.includes('(PG)') ||
        dUpper.includes('POST GRADUATE')
      ) {
        levelsSet.add('PG');
      }
      // UG indicators
      if (
        dUpper.startsWith('B.E.') || dUpper.startsWith('B.TECH') || dUpper.startsWith('B.E ') ||
        dUpper.startsWith('MBBS') || dUpper.startsWith('M.B.B.S') || dUpper.startsWith('BDS') ||
        dUpper.startsWith('BAMS') || dUpper.startsWith('BHMS') || dUpper.startsWith('BSMS') ||
        dUpper.startsWith('BNYS') || dUpper.startsWith('BUMS') || dUpper.startsWith('B.SC') ||
        dUpper.startsWith('B.PHARM') || dUpper.startsWith('BPT') || dUpper.startsWith('BOT') ||
        dUpper.startsWith('BASLP') || dUpper.startsWith('BBA') || dUpper.startsWith('B.B.A') ||
        dUpper.startsWith('B.COM') || dUpper.startsWith('B.A.') || dUpper.startsWith('BCA') ||
        dUpper.startsWith('B.C.A') || dUpper.startsWith('B.ED') || dUpper.startsWith('LL.B') ||
        dUpper.startsWith('B.A. LL.B') || dUpper.startsWith('B.B.A. LL.B') || dUpper.includes('PHARM.D')
      ) {
        levelsSet.add('UG');
      }
    });

    // If still empty, determine from college type
    if (levelsSet.size === 0) {
      if (col.type === 'Polytechnic') {
        levelsSet.add('Diploma');
      } else {
        levelsSet.add('UG');
      }
    }

    const levelsArray = Array.from(levelsSet).sort();
    await College.updateOne(
      { _id: col._id },
      { $set: { academicLevels: levelsArray } }
    );
    levelUpdateCount++;
  }
  console.log(`Computed and updated academicLevels on all ${levelUpdateCount} colleges.`);

  console.log('\n=== FINAL VERIFICATION COUNTS ===');
  const totalColleges = await College.countDocuments({});
  const totalMed = await College.countDocuments({ type: 'Medical' });
  const mbbsCount = await College.countDocuments({ type: 'Medical', medicalCategory: 'MBBS / BDS' });
  const ayushCount = await College.countDocuments({ type: 'Medical', medicalCategory: 'AYUSH' });
  const paramedCount = await College.countDocuments({ type: 'Medical', medicalCategory: 'Paramedical / Allied Health Sciences' });
  
  const ugColleges = await College.countDocuments({ academicLevels: 'UG' });
  const pgColleges = await College.countDocuments({ academicLevels: 'PG' });
  const dipColleges = await College.countDocuments({ academicLevels: 'Diploma' });

  console.log(`Total colleges: ${totalColleges}`);
  console.log(`Medical colleges: ${totalMed}`);
  console.log(`  - MBBS / BDS: ${mbbsCount}`);
  console.log(`  - AYUSH: ${ayushCount}`);
  console.log(`  - Paramedical / Allied Health Sciences: ${paramedCount}`);
  console.log(`Academic Levels:`);
  console.log(`  - UG colleges: ${ugColleges}`);
  console.log(`  - PG colleges: ${pgColleges}`);
  console.log(`  - Diploma colleges: ${dipColleges}`);

  process.exit(0);
}

runEnrichment().catch(err => {
  console.error('Enrichment error:', err);
  process.exit(1);
});
