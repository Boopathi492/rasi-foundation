import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import BioData from '@/backend/models/BioData';
import Contact from '@/backend/models/Contact';
import Enquiry from '@/backend/models/Enquiry';
import College from '@/backend/models/College';
import Course from '@/backend/models/Course';
import Banner from '@/backend/models/Banner';
import Feedback from '@/backend/models/Feedback';
import CounsellingRecord from '@/backend/models/CounsellingRecord';
import StudentDocument from '@/backend/models/StudentDocument';
import ApplicationErrorLog from '@/backend/models/ApplicationErrorLog';
import AdminAuditLog from '@/backend/models/AdminAuditLog';
import ScholarshipStudent from '@/backend/models/ScholarshipStudent';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Run parallel counts across all core collections
    const [
      totalStudents,
      newStudents30d,
      pendingStudents,
      totalScholarships,
      totalContacts,
      newContacts,
      totalEnquiries,
      pendingEnquiries,
      totalColleges,
      activeColleges,
      totalCourses,
      activeCourses,
      activeBanners,
      totalFeedback,
      pendingFeedback,
      approvedFeedback,
      totalCounselling,
      scheduledCounselling,
      pendingDocuments,
      unresolvedErrors,
    ] = await Promise.all([
      BioData.countDocuments(),
      BioData.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
      BioData.countDocuments({ status: 'pending' }),
      ScholarshipStudent ? ScholarshipStudent.countDocuments().catch(() => 0) : 0,
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'pending' }),
      College.countDocuments(),
      College.countDocuments({ isActive: true }),
      Course.countDocuments(),
      Course.countDocuments({ isActive: true }),
      Banner.countDocuments({ isActive: true, archived: { $ne: true } }),
      Feedback.countDocuments(),
      Feedback.countDocuments({ status: 'pending' }),
      Feedback.countDocuments({ status: 'approved' }),
      CounsellingRecord.countDocuments(),
      CounsellingRecord.countDocuments({ status: 'scheduled' }),
      StudentDocument.countDocuments({ verificationStatus: 'pending', uploadStatus: 'uploaded' }),
      ApplicationErrorLog.countDocuments({ resolved: false }),
    ]);

    // Top districts by student count (real MongoDB aggregation)
    const districtDist = await BioData.aggregate([
      { $match: { district: { $exists: true, $ne: '' } } },
      { $group: { _id: '$district', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    // Enquiry status distribution
    const enquiryDist = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Recent administrative audit trail
    const recentActivity = await AdminAuditLog.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    // Recent enquiries
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Recent counselling requests
    const recentCounselling = await CounsellingRecord.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return res.status(200).json({
      success: true,
      stats: {
        students: { total: totalStudents, new30d: newStudents30d, pending: pendingStudents },
        scholarships: { total: totalScholarships },
        contacts: { total: totalContacts, new: newContacts },
        enquiries: { total: totalEnquiries, pending: pendingEnquiries },
        colleges: { total: totalColleges, active: activeColleges },
        courses: { total: totalCourses, active: activeCourses },
        banners: { active: activeBanners },
        feedback: { total: totalFeedback, pending: pendingFeedback, approved: approvedFeedback },
        counselling: { total: totalCounselling, scheduled: scheduledCounselling },
        documents: { pendingVerification: pendingDocuments },
        monitoring: { unresolvedErrors },
      },
      distributions: {
        districts: districtDist.map((d) => ({ name: d._id, count: d.count })),
        enquiryStatuses: enquiryDist.map((e) => ({ status: e._id, count: e.count })),
      },
      recent: {
        activity: recentActivity,
        enquiries: recentEnquiries,
        contacts: recentContacts,
        counselling: recentCounselling,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

export default withAuth(handler);
