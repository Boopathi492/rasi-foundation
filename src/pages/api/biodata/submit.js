import dbConnect from '@/backend/lib/mongodb';
import BioData from '@/backend/models/BioData';
import { appendBioDataRow } from '@/backend/lib/googleSheets';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  await dbConnect();

  const required = [
    'studentName', 'dateOfBirth', 'courseApplied', 'admissionType', 'collegeName', 'quota',
    'fatherName', 'motherName', 'community', 'address', 'studentMobile', 'studentEmail',
    'aadhaarNumber', 'fatherMobile', 'motherMobile', 'plusTwoGroup',
    'plusTwoExamNumber', 'expectedCutOff', 'lastSchoolAndPlace',
  ];

  for (const field of required) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }

  try {
    const record = new BioData(req.body);
    await record.save();

    // Sync to Google Sheets — fire and forget, never block the response
    appendBioDataRow(record).catch(err =>
      console.error('Google Sheets sync failed:', err.message)
    );

    return res.status(201).json({ success: true, id: record._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
