import test from 'node:test';
import assert from 'node:assert/strict';

test('Statistics Calculation Logic - Dynamic Homepage Statistics', () => {
  // Test distinct TN district normalization and count
  const rawDistricts = [
    'Salem', 'salem', 'SALEM', 'Salem District',
    'Chennai', 'chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli',
    'Namakkal', 'Erode', 'Dharmapuri', 'Other State', ''
  ];

  const TN_DISTRICTS = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
    'Erode', 'Kallakurichi', 'Kancheepuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai',
    'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
    'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
    'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
  ];

  const tnDistrictSet = new Set(TN_DISTRICTS.map(d => d.toLowerCase()));

  const normalized = new Set();
  rawDistricts.forEach(d => {
    const clean = String(d || '').replace(/\s*district\s*$/i, '').trim().toLowerCase();
    if (clean && tnDistrictSet.has(clean)) {
      normalized.add(clean);
    }
  });

  assert.equal(normalized.has('salem'), true);
  assert.equal(normalized.has('other state'), false);
  assert.equal(normalized.size, 8); // Salem, Chennai, Coimbatore, Madurai, Tiruchirappalli, Namakkal, Erode, Dharmapuri
});

test('Statistics Streams Count - Matches Supported Academic Streams', () => {
  const supportedStreams = [
    'Engineering',
    'Medical',
    'Arts & Science',
    'Management',
    'Law',
    'Agriculture',
    'Education',
    'Polytechnic'
  ];

  assert.equal(supportedStreams.length, 8);
  assert.equal(new Set(supportedStreams).size, 8);
});

test('Statistics Admission Roadmap Steps - Official 6-Step Journey', () => {
  const roadmapSteps = [
    { step: 1, title: 'Profile & Marks Review' },
    { step: 2, title: 'Stream & Course Shortlisting' },
    { step: 3, title: 'College Matching & Quota Analysis' },
    { step: 4, title: 'Application & Scholarship Support' },
    { step: 5, title: 'Counselling & Seat Allocation' },
    { step: 6, title: 'Campus Joining & Verification' }
  ];

  assert.equal(roadmapSteps.length, 6);
});
