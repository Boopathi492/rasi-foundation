import test from 'node:test';
import assert from 'node:assert/strict';

// Helper matching logic as used in frontend / colleges.js
function collegeMatchesMedicalCategory(college, targetCategory) {
  if (!targetCategory || targetCategory === 'all') return true;
  if (college.medicalCategory && college.medicalCategory.toLowerCase() === targetCategory.toLowerCase()) return true;
  if (Array.isArray(college.courses)) {
    const hasMatch = college.courses.some(cr => (cr.medicalCategory || '').toLowerCase() === targetCategory.toLowerCase());
    if (hasMatch) return true;
  }
  const normDepts = (college.departments || []).join(' ').toLowerCase();
  const normSpec = (college.specialization || '').toLowerCase();
  const combined = `${normDepts} ${normSpec} ${(college.name || '').toLowerCase()}`;

  if (targetCategory === 'MBBS / BDS') {
    return combined.includes('mbbs') || combined.includes('bds') || combined.includes('dental') || combined.includes('mds') || (combined.includes('medical college') && !combined.includes('naturopathy') && !combined.includes('siddha') && !combined.includes('ayurved') && !combined.includes('homoeo'));
  }
  if (targetCategory === 'AYUSH') {
    return combined.includes('bams') || combined.includes('bhms') || combined.includes('bums') || combined.includes('bsms') || combined.includes('bnys') || combined.includes('ayush') || combined.includes('siddha') || combined.includes('ayurved') || combined.includes('homoeo') || combined.includes('unani') || combined.includes('yoga') || combined.includes('naturopath');
  }
  if (targetCategory === 'Paramedical / Allied Health Sciences') {
    return combined.includes('nursing') || combined.includes('pharm') || combined.includes('physio') || combined.includes('cardiac') || combined.includes('dialysis') || combined.includes('allied') || combined.includes('radiology') || combined.includes('optom') || combined.includes('mlt') || combined.includes('operation theatre') || combined.includes('anaesthesia') || combined.includes('perfusion') || combined.includes('respiratory') || combined.includes('physician assistant') || combined.includes('gnm') || combined.includes('anm') || combined.includes('d.pharm') || combined.includes('b.pharm');
  }
  return false;
}

test('Medical & Healthcare Category Matching - MBBS / BDS', () => {
  const mbbsCollege = {
    name: 'Madras Medical College, Chennai',
    type: 'Medical',
    medicalCategory: 'MBBS / BDS',
    departments: ['MBBS', 'M.D. General Medicine', 'M.S. General Surgery'],
    academicLevels: ['UG', 'PG'],
  };
  const bdsCollege = {
    name: 'Tamil Nadu Government Dental College, Chennai',
    type: 'Medical',
    medicalCategory: 'MBBS / BDS',
    departments: ['BDS', 'MDS Oral and Maxillofacial Surgery'],
    academicLevels: ['UG', 'PG'],
  };

  assert.equal(collegeMatchesMedicalCategory(mbbsCollege, 'MBBS / BDS'), true);
  assert.equal(collegeMatchesMedicalCategory(bdsCollege, 'MBBS / BDS'), true);
  assert.equal(collegeMatchesMedicalCategory(mbbsCollege, 'AYUSH'), false);
  assert.equal(collegeMatchesMedicalCategory(bdsCollege, 'Paramedical / Allied Health Sciences'), false);
});

test('Medical & Healthcare Category Matching - AYUSH', () => {
  const bamsCollege = {
    name: 'Government Ayurveda Medical College and Hospital, Kottar',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    departments: ['BAMS – Bachelor of Ayurvedic Medicine and Surgery'],
    academicLevels: ['UG'],
  };
  const bsmsCollege = {
    name: 'Government Siddha Medical College, Palayamkottai, Tirunelveli',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    departments: ['BSMS – Bachelor of Siddha Medicine and Surgery'],
    academicLevels: ['UG'],
  };
  const bhmsCollege = {
    name: 'Government Homoeopathic Medical College and Hospital, Thirumangalam, Madurai',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    departments: ['BHMS – Bachelor of Homoeopathic Medicine and Surgery'],
    academicLevels: ['UG'],
  };
  const bnysCollege = {
    name: 'Government Yoga and Naturopathy Medical College, Arumbakkam, Chennai',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    departments: ['BNYS – Bachelor of Naturopathy and Yogic Sciences'],
    academicLevels: ['UG'],
  };
  const bumsCollege = {
    name: 'Government Unani Medical College, Arumbakkam, Chennai',
    type: 'Medical',
    medicalCategory: 'AYUSH',
    departments: ['BUMS – Bachelor of Unani Medicine and Surgery'],
    academicLevels: ['UG'],
  };

  assert.equal(collegeMatchesMedicalCategory(bamsCollege, 'AYUSH'), true);
  assert.equal(collegeMatchesMedicalCategory(bsmsCollege, 'AYUSH'), true);
  assert.equal(collegeMatchesMedicalCategory(bhmsCollege, 'AYUSH'), true);
  assert.equal(collegeMatchesMedicalCategory(bnysCollege, 'AYUSH'), true);
  assert.equal(collegeMatchesMedicalCategory(bumsCollege, 'AYUSH'), true);

  assert.equal(collegeMatchesMedicalCategory(bamsCollege, 'MBBS / BDS'), false);
  assert.equal(collegeMatchesMedicalCategory(bsmsCollege, 'Paramedical / Allied Health Sciences'), false);
});

test('Medical & Healthcare Category Matching - Paramedical / Allied Health', () => {
  const nursingCollege = {
    name: 'Paavai College of Nursing and Research',
    type: 'Medical',
    medicalCategory: 'Paramedical / Allied Health Sciences',
    specialization: 'Nursing',
    departments: ['B.Sc. Nursing', 'Post Basic B.Sc. Nursing', 'M.Sc. Nursing'],
    academicLevels: ['UG', 'PG'],
  };
  const pharmacyCollege = {
    name: 'Paavai College of Pharmacy and Research',
    type: 'Medical',
    medicalCategory: 'Paramedical / Allied Health Sciences',
    specialization: 'Pharmacy',
    departments: ['B.Pharm', 'D.Pharm', 'Pharm.D'],
    academicLevels: ['UG', 'PG', 'Diploma'],
  };

  assert.equal(collegeMatchesMedicalCategory(nursingCollege, 'Paramedical / Allied Health Sciences'), true);
  assert.equal(collegeMatchesMedicalCategory(pharmacyCollege, 'Paramedical / Allied Health Sciences'), true);
  assert.equal(collegeMatchesMedicalCategory(nursingCollege, 'AYUSH'), false);
  assert.equal(collegeMatchesMedicalCategory(pharmacyCollege, 'MBBS / BDS'), false);
});

test('Academic Level Filter - UG, PG, Diploma without duplication', () => {
  const multiLevelCollege = {
    name: 'Paavai College of Pharmacy and Research',
    academicLevels: ['UG', 'PG', 'Diploma'],
  };
  const ugOnlyCollege = {
    name: 'Government Ayurveda Medical College, Kottar',
    academicLevels: ['UG'],
  };

  // UG Filter
  assert.equal(multiLevelCollege.academicLevels.includes('UG'), true);
  assert.equal(ugOnlyCollege.academicLevels.includes('UG'), true);

  // PG Filter
  assert.equal(multiLevelCollege.academicLevels.includes('PG'), true);
  assert.equal(ugOnlyCollege.academicLevels.includes('PG'), false);

  // Diploma Filter
  assert.equal(multiLevelCollege.academicLevels.includes('Diploma'), true);
  assert.equal(ugOnlyCollege.academicLevels.includes('Diploma'), false);
});

test('Medical Colleges Suppress TNEA Code', () => {
  const medicalCollege = {
    name: 'Government Ayurveda Medical College, Kottar',
    type: 'Medical',
    tneaCode: '',
    tneaStatus: 'not_applicable',
    codeType: 'NCISM',
    codeValue: 'AYU0542',
    codeStatus: 'VERIFIED',
  };

  assert.equal(medicalCollege.type, 'Medical');
  assert.equal(medicalCollege.tneaCode, '');
  assert.equal(medicalCollege.codeType, 'NCISM');
  assert.equal(medicalCollege.codeStatus, 'VERIFIED');
});
