import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { maskAadhaar } from '@/backend/lib/redact';
import BioData from '@/backend/models/BioData';
import Enquiry from '@/backend/models/Enquiry';
import CounsellingRecord from '@/backend/models/CounsellingRecord';
import College from '@/backend/models/College';
import Course from '@/backend/models/Course';
import Feedback from '@/backend/models/Feedback';

export default withAuth(async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const query = String(req.query.q || '').trim();
  if (!query || query.length < 2) {
    return res.status(200).json({ success: true, results: {} });
  }

  await dbConnect();
  const role = req.user?.role || 'admin';
  const regex = { $regex: query, $options: 'i' };

  try {
    const promises = [];
    const keys = [];

    // Students search
    if (can(role, 'students:view')) {
      keys.push('students');
      promises.push(
        BioData.find({
          $or: [{ studentName: regex }, { studentEmail: regex }, { studentMobile: regex }, { courseApplied: regex }],
        })
          .limit(6)
          .select('studentName studentEmail studentMobile courseApplied status createdAt aadhaarNumber')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.studentName,
              subtitle: `${it.courseApplied || 'Student'} • ${it.studentMobile}`,
              status: it.status,
              type: 'Student',
              link: `/admin/biodata?search=${encodeURIComponent(it.studentName)}`,
            }))
          )
      );
    }

    // Enquiries search
    if (can(role, 'enquiries:view')) {
      keys.push('enquiries');
      promises.push(
        Enquiry.find({
          $or: [{ name: regex }, { email: regex }, { phone: regex }, { course: regex }],
        })
          .limit(6)
          .select('name email phone course status createdAt')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.name,
              subtitle: `${it.course} • ${it.phone}`,
              status: it.status,
              type: 'Enquiry',
              link: `/admin/enquiries?search=${encodeURIComponent(it.name)}`,
            }))
          )
      );
    }

    // Counselling search
    if (can(role, 'counselling:view')) {
      keys.push('counselling');
      promises.push(
        CounsellingRecord.find({
          $or: [{ studentName: regex }, { studentPhone: regex }, { counsellor: regex }, { interestedCourse: regex }],
        })
          .limit(6)
          .select('studentName studentPhone counsellor interestedCourse status scheduledAt')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.studentName,
              subtitle: `Counselling • ${it.interestedCourse || ''} • ${it.counsellor || 'Unassigned'}`,
              status: it.status,
              type: 'Counselling',
              link: `/admin/counselling?search=${encodeURIComponent(it.studentName)}`,
            }))
          )
      );
    }

    // Colleges search
    if (can(role, 'colleges:view')) {
      keys.push('colleges');
      promises.push(
        College.find({
          $or: [{ name: regex }, { district: regex }, { location: regex }, { tneaCode: regex }],
        })
          .limit(6)
          .select('name district location type isActive')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.name,
              subtitle: `${it.district} • ${it.type || 'College'}`,
              status: it.isActive ? 'Active' : 'Inactive',
              type: 'College',
              link: `/admin/colleges?search=${encodeURIComponent(it.name)}`,
            }))
          )
      );
    }

    // Courses search
    if (can(role, 'courses:view')) {
      keys.push('courses');
      promises.push(
        Course.find({
          $or: [{ name: regex }, { code: regex }, { category: regex }],
        })
          .limit(6)
          .select('name code level category isActive')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.name,
              subtitle: `${it.level} • ${it.category || ''}`,
              status: it.isActive ? 'Active' : 'Inactive',
              type: 'Course',
              link: `/admin/courses?search=${encodeURIComponent(it.name)}`,
            }))
          )
      );
    }

    // Feedback search
    if (can(role, 'feedback:view')) {
      keys.push('feedback');
      promises.push(
        Feedback.find({
          $or: [{ name: regex }, { message: regex }, { relatedCourse: regex }],
        })
          .limit(6)
          .select('name category rating status relatedCourse')
          .lean()
          .then((items) =>
            items.map((it) => ({
              id: it._id,
              title: it.name,
              subtitle: `${it.category} feedback • ${it.rating}★`,
              status: it.status,
              type: 'Feedback',
              link: `/admin/feedback?search=${encodeURIComponent(it.name)}`,
            }))
          )
      );
    }

    const resolved = await Promise.all(promises);
    const results = {};
    keys.forEach((key, idx) => {
      results[key] = resolved[idx] || [];
    });

    const totalMatches = Object.values(results).reduce((acc, arr) => acc + arr.length, 0);

    return res.status(200).json({ success: true, count: totalMatches, results });
  } catch (err) {
    console.error('[Global Search Error]', err);
    return res.status(500).json({ success: false, message: 'Search query failed' });
  }
});
