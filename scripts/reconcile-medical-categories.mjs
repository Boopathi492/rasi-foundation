import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });
import dbConnect from '../src/backend/lib/mongodb.js';
import College from '../src/backend/models/College.js';
import Course from '../src/backend/models/Course.js';

async function main() {
  await dbConnect();
  
  // 1. Group by medicalCategory field on College
  const byMedicalCategory = await College.aggregate([
    { $match: { type: 'Medical' } },
    { $group: { _id: '$medicalCategory', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  // 2. Inspect Paramedical/Allied Health institutions and their departmental/specialization overlap
  const paramedicalColleges = await College.find({
    type: 'Medical',
    medicalCategory: 'Paramedical / Allied Health Sciences'
  }).select('name specialization departments courses').populate('courses', 'name code').lean();

  // Helper flags for each sub-discipline
  let nursingCount = 0;
  let pharmacyCount = 0;
  let physioCount = 0;
  let alliedHealthCount = 0;

  const overlapBreakdown = {
    onlyNursing: 0,
    onlyPharmacy: 0,
    onlyPhysio: 0,
    onlyAlliedHealth: 0,
    multiDiscipline: []
  };

  paramedicalColleges.forEach(col => {
    const spec = (col.specialization || '').toLowerCase();
    const depts = (col.departments || []).join(' ').toLowerCase();
    const courses = (col.courses || []).map(c => c.name).join(' ').toLowerCase();
    const allText = `${col.name.toLowerCase()} ${spec} ${depts} ${courses}`;

    const isNursing = allText.includes('nursing') || allText.includes('gnm') || allText.includes('anm');
    const isPharmacy = allText.includes('pharm') || allText.includes('d.pharm') || allText.includes('b.pharm');
    const isPhysio = allText.includes('physio') || allText.includes('bpt') || allText.includes('mpt');
    const isAllied = allText.includes('allied') || allText.includes('cardiac') || allText.includes('dialysis') || allText.includes('radiology') || allText.includes('optom') || allText.includes('mlt') || allText.includes('operation theatre') || allText.includes('anaesthesia') || allText.includes('perfusion') || allText.includes('respiratory') || allText.includes('physician assistant');

    if (isNursing) nursingCount++;
    if (isPharmacy) pharmacyCount++;
    if (isPhysio) physioCount++;
    if (isAllied) alliedHealthCount++;

    const disciplines = [];
    if (isNursing) disciplines.push('Nursing');
    if (isPharmacy) disciplines.push('Pharmacy');
    if (isPhysio) disciplines.push('Physiotherapy');
    if (isAllied) disciplines.push('AlliedHealth');

    if (disciplines.length > 1) {
      overlapBreakdown.multiDiscipline.push({
        name: col.name,
        disciplines
      });
    } else if (disciplines.length === 1) {
      if (disciplines[0] === 'Nursing') overlapBreakdown.onlyNursing++;
      if (disciplines[0] === 'Pharmacy') overlapBreakdown.onlyPharmacy++;
      if (disciplines[0] === 'Physiotherapy') overlapBreakdown.onlyPhysio++;
      if (disciplines[0] === 'AlliedHealth') overlapBreakdown.onlyAlliedHealth++;
    }
  });

  // Distinct count
  const distinctParamedicalCount = paramedicalColleges.length;

  console.log(JSON.stringify({
    medicalCategoryFieldTotals: byMedicalCategory,
    totalMedicalColleges: byMedicalCategory.reduce((acc, c) => acc + c.count, 0),
    paramedicalDistinctColleges: distinctParamedicalCount,
    subdisciplineCounts: {
      nursingInstitutionsOffering: nursingCount,
      pharmacyInstitutionsOffering: pharmacyCount,
      physiotherapyInstitutionsOffering: physioCount,
      alliedHealthInstitutionsOffering: alliedHealthCount,
      sumOfIndividualDepartmentOffers: nursingCount + pharmacyCount + physioCount + alliedHealthCount
    },
    singleDisciplineCounts: {
      onlyNursing: overlapBreakdown.onlyNursing,
      onlyPharmacy: overlapBreakdown.onlyPharmacy,
      onlyPhysio: overlapBreakdown.onlyPhysio,
      onlyAlliedHealth: overlapBreakdown.onlyAlliedHealth
    },
    multiDisciplineInstitutionsCount: overlapBreakdown.multiDiscipline.length,
    sampleMultiDisciplineInstitutions: overlapBreakdown.multiDiscipline.slice(0, 10)
  }, null, 2));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
