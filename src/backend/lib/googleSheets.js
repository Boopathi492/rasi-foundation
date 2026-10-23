export async function appendBioDataRow(record) {
  const url = process.env.SHEETDB_URL;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        'Date': new Date(record.createdAt).toLocaleString('en-IN'),
        'Student Name': record.studentName,
        'DOB': record.dateOfBirth,
        'Course Applied': record.courseApplied,
        'Admission Type': record.admissionType,
        'College': record.collegeName,
        'Quota': record.quota,
        'Father Name': record.fatherName,
        'Mother Name': record.motherName,
        'Community': record.community,
        'Sub Caste': record.subCaste || '',
        'Address': record.address,
        'Student Mobile': record.studentMobile,
        'Student Email': record.studentEmail,
        'Addaar': record.aadhaarNumber,
        'Father Mobile': record.fatherMobile,
        'Mother Mobile': record.motherMobile,
        '12th group': record.plusTwoGroup,
        'Exam No': record.plusTwoExamNumber,
        'Expected Cut-Off': record.expectedCutOff,
        'Last School': record.lastSchoolAndPlace,
        'Govt School': record.isGovtSchool ? 'Yes' : 'No',
        'First Graduate': record.isFirstGraduate ? 'Yes' : 'No',
        'Documents': (record.documents || []).join(', '),
      }]
    }),
  });
}
