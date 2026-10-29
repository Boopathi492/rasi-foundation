import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import College from '@/backend/models/College';

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const colleges = await College.find().sort({ district: 1, order: 1, name: 1 }).lean();
      res.status(200).json(colleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        name,
        location,
        district,
        tneaCode,
        tneaStatus,
        tneaSourceYear,
        note,
        isActive,
        order,
        type,
        specialization,
        institutionType,
        courses,
        sourceUrl,
        verificationStatus,
        departments,
        website
      } = req.body;

      if (!name || !location || !district) {
        return res.status(400).json({ message: 'Name, location, and district are required' });
      }

      const college = await College.create({
        name: name.trim(),
        location: location.trim(),
        district: district.trim(),
        type: type || 'Engineering',
        specialization: specialization ? String(specialization).trim() : '',
        institutionType: institutionType ? String(institutionType).trim() : '',
        courses: Array.isArray(courses) ? courses : [],
        sourceUrl: sourceUrl ? String(sourceUrl).trim() : '',
        verificationStatus: verificationStatus ? String(verificationStatus).trim() : 'directory_listed',
        tneaCode: tneaCode ? String(tneaCode).trim() : '',
        tneaStatus: tneaStatus ? String(tneaStatus).trim() : 'not_applicable',
        tneaSourceYear: tneaSourceYear ? String(tneaSourceYear).trim() : '',
        note: note ? String(note).trim() : '',
        departments: Array.isArray(departments)
          ? departments.map(d => String(d).trim()).filter(Boolean)
          : (typeof departments === 'string' && departments.trim()
              ? departments.split(/[\n,]+/).map(d => d.trim()).filter(Boolean)
              : []),
        website: website ? String(website).trim() : '',
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        order: order ? parseInt(order, 10) || 0 : 0,
      });

      res.status(201).json(college);
    } catch (error) {
      console.error('Error creating college:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export default withAuth(handler);
