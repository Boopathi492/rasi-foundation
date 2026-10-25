import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
import { maskAadhaar } from '@/backend/lib/redact';
import { buildXlsx, XLSX_MIME } from '@/backend/lib/xlsx';
import { buildPdf, buildPdfReport, PDF_MIME } from '@/backend/lib/pdf';
import BioData from '@/backend/models/BioData';
import Enquiry from '@/backend/models/Enquiry';
import CounsellingRecord from '@/backend/models/CounsellingRecord';
import Feedback from '@/backend/models/Feedback';
import College from '@/backend/models/College';
import AdminAuditLog from '@/backend/models/AdminAuditLog';
import ReportExport from '@/backend/models/ReportExport';

export default withAuth(async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (!can(req.user?.role, 'reports:export')) {
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges to export reports' });
  }

  await dbConnect();
  const startTime = Date.now();

  const {
    reportType = 'students',
    format = 'xlsx',
    status,
    district,
    startDate,
    endDate,
  } = (req.method === 'POST' ? req.body : req.query) || {};

  if (!['pdf', 'xlsx'].includes(format)) {
    return res.status(400).json({ success: false, message: "Format must be 'xlsx' or 'pdf'" });
  }

  const exportRecord = await ReportExport.create({
    reportType,
    format,
    status: 'processing',
    filters: { status, district, startDate, endDate },
    requestedBy: req.user?.username || req.user?.name || 'admin',
    requestedRole: req.user?.role || 'admin',
  });

  try {
    let title = '';
    let columns = [];
    let rows = [];

    // Build data based on reportType
    if (reportType === 'students') {
      title = 'Student Biodata Applications Report';
      const q = {};
      if (status && status !== 'all') q.status = status;
      if (district && district !== 'all') q.district = district;
      if (startDate || endDate) {
        q.createdAt = {};
        if (startDate) q.createdAt.$gte = new Date(startDate);
        if (endDate) q.createdAt.$lte = new Date(endDate);
      }

      const docs = await BioData.find(q).sort({ createdAt: -1 }).limit(2000).lean();
      columns = [
        { header: 'Student Name', key: 'studentName', width: 22 },
        { header: 'Email', key: 'studentEmail', width: 26 },
        { header: 'Mobile', key: 'studentMobile', width: 16 },
        { header: 'Course', key: 'courseApplied', width: 24 },
        { header: 'College', key: 'collegeName', width: 24 },
        { header: 'District', key: 'district', width: 16 },
        { header: 'Quota', key: 'quota', width: 10 },
        { header: 'Aadhaar (Masked)', key: 'aadhaarNumber', width: 18 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Date', key: 'createdAt', width: 16, type: 'date' },
      ];
      rows = docs.map((d) => ({
        studentName: d.studentName,
        studentEmail: d.studentEmail,
        studentMobile: d.studentMobile,
        courseApplied: d.courseApplied || '',
        collegeName: d.collegeName || '',
        district: d.district || '',
        quota: d.quota || '',
        aadhaarNumber: maskAadhaar(d.aadhaarNumber),
        status: d.status || 'pending',
        createdAt: d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : '',
      }));
    } else if (reportType === 'enquiries') {
      title = 'Student Enquiries and Follow-ups Report';
      const q = {};
      if (status && status !== 'all') q.status = status;
      const docs = await Enquiry.find(q).sort({ createdAt: -1 }).limit(2000).lean();
      columns = [
        { header: 'Name', key: 'name', width: 22 },
        { header: 'Email', key: 'email', width: 26 },
        { header: 'Phone', key: 'phone', width: 16 },
        { header: 'Course', key: 'course', width: 24 },
        { header: 'Qualification', key: 'qualification', width: 16 },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Assigned To', key: 'assignedTo', width: 18 },
        { header: 'Date', key: 'createdAt', width: 16, type: 'date' },
      ];
      rows = docs.map((d) => ({
        name: d.name,
        email: d.email,
        phone: d.phone,
        course: d.course,
        qualification: d.qualification || '',
        status: d.status,
        assignedTo: d.assignedTo || 'Unassigned',
        createdAt: d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : '',
      }));
    } else if (reportType === 'counselling') {
      title = 'Student Counselling Sessions Report';
      const q = {};
      if (status && status !== 'all') q.status = status;
      const docs = await CounsellingRecord.find(q).sort({ scheduledAt: -1 }).limit(2000).lean();
      columns = [
        { header: 'Student Name', key: 'studentName', width: 22 },
        { header: 'Phone', key: 'studentPhone', width: 16 },
        { header: 'Scheduled Date', key: 'scheduledAt', width: 16, type: 'date' },
        { header: 'Counsellor', key: 'counsellor', width: 20 },
        { header: 'Type', key: 'type', width: 14 },
        { header: 'Preferred College', key: 'preferredCollege', width: 24 },
        { header: 'Course', key: 'interestedCourse', width: 24 },
        { header: 'Status', key: 'status', width: 16 },
      ];
      rows = docs.map((d) => ({
        studentName: d.studentName,
        studentPhone: d.studentPhone || '',
        scheduledAt: d.scheduledAt ? new Date(d.scheduledAt).toISOString().split('T')[0] : '',
        counsellor: d.counsellor || 'Unassigned',
        type: d.type || 'in_person',
        preferredCollege: d.preferredCollege || '',
        interestedCourse: d.interestedCourse || '',
        status: d.status || 'scheduled',
      }));
    } else if (reportType === 'feedback') {
      title = 'Student and Parent Feedback Report';
      const q = {};
      if (status && status !== 'all') q.status = status;
      const docs = await Feedback.find(q).sort({ createdAt: -1 }).limit(2000).lean();
      columns = [
        { header: 'Name', key: 'name', width: 22 },
        { header: 'Category', key: 'category', width: 14 },
        { header: 'Course', key: 'relatedCourse', width: 24 },
        { header: 'Rating', key: 'rating', width: 10, type: 'number' },
        { header: 'Status', key: 'status', width: 14 },
        { header: 'Message', key: 'message', width: 40 },
        { header: 'Date', key: 'createdAt', width: 16, type: 'date' },
      ];
      rows = docs.map((d) => ({
        name: d.name,
        category: d.category,
        relatedCourse: d.relatedCourse || '',
        rating: d.rating,
        status: d.status,
        message: d.message,
        createdAt: d.createdAt ? new Date(d.createdAt).toISOString().split('T')[0] : '',
      }));
    } else if (reportType === 'colleges') {
      title = 'Affiliated Colleges Directory';
      const docs = await College.find({}).sort({ district: 1, name: 1 }).lean();
      columns = [
        { header: 'College Name', key: 'name', width: 32 },
        { header: 'District', key: 'district', width: 18 },
        { header: 'Location', key: 'location', width: 20 },
        { header: 'TNEA Code', key: 'tneaCode', width: 14 },
        { header: 'Type', key: 'type', width: 16 },
        { header: 'Website', key: 'website', width: 28 },
      ];
      rows = docs.map((d) => ({
        name: d.name,
        district: d.district,
        location: d.location,
        tneaCode: d.tneaCode || '',
        type: d.type || 'Engineering',
        website: d.website || '',
      }));
    } else if (reportType === 'audit') {
      title = 'Administrative Audit Trail Report';
      const docs = await AdminAuditLog.find({}).sort({ createdAt: -1 }).limit(1000).lean();
      columns = [
        { header: 'Timestamp', key: 'createdAt', width: 20, type: 'date' },
        { header: 'Actor', key: 'actorName', width: 18 },
        { header: 'Role', key: 'actorRole', width: 14 },
        { header: 'Action', key: 'action', width: 24 },
        { header: 'Resource', key: 'resourceType', width: 16 },
        { header: 'Outcome', key: 'outcome', width: 12 },
        { header: 'IP', key: 'ip', width: 16 },
      ];
      rows = docs.map((d) => ({
        createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : '',
        actorName: d.actorName || d.actorId || 'system',
        actorRole: d.actorRole || '',
        action: d.action,
        resourceType: d.resourceType || '',
        outcome: d.outcome,
        ip: d.ip || '',
      }));
    } else {
      return res.status(400).json({ success: false, message: `Unsupported report type: ${reportType}` });
    }

    let buffer;
    let mimeType;
    let filename;
    const fileTimestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    if (format === 'xlsx') {
      buffer = buildXlsx({
        sheets: [
          {
            name: reportType.slice(0, 31),
            title,
            columns,
            rows,
          },
        ],
      });
      mimeType = XLSX_MIME;
      filename = `Rasi_${reportType}_${fileTimestamp}.xlsx`;
    } else {
      buffer = buildPdfReport({
        title,
        subtitle: 'Rasi Foundation — Educational Guidance & Counselling Trust',
        filters: Object.fromEntries(Object.entries({ status, district, startDate, endDate }).filter(([, v]) => Boolean(v))),
        metrics: [{ label: 'Total Records', value: String(rows.length) }],
        columns: columns.slice(0, 7), // Fit within A4 landscape/portrait width
        rows,
        footer: 'Confidential — For Internal Administrative Review Only',
      });
      mimeType = PDF_MIME;
      filename = `Rasi_${reportType}_${fileTimestamp}.pdf`;
    }

    exportRecord.status = 'completed';
    exportRecord.rowCount = rows.length;
    exportRecord.durationMs = Date.now() - startTime;
    exportRecord.completedAt = new Date();
    await exportRecord.save();

    await recordAudit(req, {
      action: 'report.export',
      resourceType: 'report',
      resourceId: exportRecord._id,
      summary: { reportType, format, rowCount: rows.length },
    });

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.send(buffer);
  } catch (err) {
    console.error('[Export Error]', err);
    exportRecord.status = 'failed';
    exportRecord.failureReason = err.message || 'Export error';
    exportRecord.durationMs = Date.now() - startTime;
    await exportRecord.save().catch(() => {});
    return res.status(500).json({ success: false, message: 'Failed to generate report export' });
  }
});
