import dbConnect from '../../../backend/lib/mongodb.js';
import Payment from '../../../backend/models/Payment.js';
import BioData from '../../../backend/models/BioData.js';
import College from '../../../backend/models/College.js';
import Course from '../../../backend/models/Course.js';
import { buildStudentPaymentReceipt, PDF_MIME } from '../../../backend/lib/pdf.js';
import { maskAadhaar } from '../../../backend/lib/redact.js';
import { verifyToken } from '../../../backend/lib/auth.js';
import { can } from '../../../backend/lib/rbac.js';
import { rateLimiter } from '../../../backend/lib/rateLimit.js';
import { CONTACT } from '../../../data/siteConfig.js';

const limiter = rateLimiter({ windowMs: 60_000, max: 60 });

function escapeRegex(str) {
  return String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { paymentId, receipt: receiptQuery } = req.query;
  const rawId = String(paymentId || receiptQuery || '').trim();

  if (!rawId) {
    return res.status(400).json({ message: 'Payment identifier is required' });
  }

  try {
    if (!limiter(req, res)) {
      return res.status(429).json({ message: 'Too many receipt download requests. Please wait.' });
    }

    await dbConnect();

    // Security & IDOR Guard:
    // If the requester queries using an arbitrary 24-char hex MongoDB _id,
    // require an authorized admin session. High-entropy payment tokens
    // (razorpayPaymentId, razorpayOrderId, secret receipt number) are permitted for students.
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(rawId);
    let query;

    if (receiptQuery) {
      query = { receipt: receiptQuery };
    } else if (rawId.startsWith('pay_')) {
      query = { razorpayPaymentId: rawId };
    } else if (rawId.startsWith('order_')) {
      query = { razorpayOrderId: rawId };
    } else if (rawId.startsWith('RCPT_')) {
      query = { receipt: rawId };
    } else if (isMongoId) {
      const user = verifyToken(req);
      const isAuthorizedAdmin = user && (user.role === 'admin' || can(user.role, 'payments:view'));
      if (!isAuthorizedAdmin) {
        return res.status(403).json({
          message: 'Authorization required to access receipt by internal ID. Please use your Razorpay payment ID or receipt number.',
        });
      }
      query = {
        $or: [
          { _id: rawId },
          { razorpayPaymentId: rawId },
          { receipt: rawId },
        ],
      };
    } else {
      query = {
        $or: [
          { razorpayPaymentId: rawId },
          { receipt: rawId },
          { razorpayOrderId: rawId },
        ],
      };
    }

    const payment = await Payment.findOne(query).lean();
    if (!payment) {
      return res.status(404).json({ message: 'Verified completed payment record not found' });
    }

    // Only allow verified completed payments (or refunded transactions) to have receipts
    if (payment.status !== 'completed' && payment.status !== 'refunded') {
      return res.status(400).json({
        message: `Receipt is unavailable for payment in '${payment.status}' status. Only verified completed payments can be issued an official receipt.`,
        status: payment.status,
      });
    }

    // Fetch linked Student BioData application record
    let bioData = null;
    if (payment.bioDataId) {
      bioData = await BioData.findById(payment.bioDataId).lean();
    }
    if (!bioData) {
      bioData = await BioData.findOne({ paymentId: payment._id }).lean();
    }
    if (!bioData && payment.receipt) {
      bioData = await BioData.findOne({ receipt: payment.receipt }).lean();
    }
    if (!bioData && payment.phone) {
      bioData = await BioData.findOne({ studentMobile: payment.phone }).lean();
    }

    // Lookup College & Course if available to retrieve TNEA code and academic metadata
    let college = null;
    let course = null;

    if (bioData?.collegeName) {
      try {
        college = await College.findOne({
          name: { $regex: new RegExp(`^${escapeRegex(bioData.collegeName.trim())}$`, 'i') },
        })
          .select('name location district tneaCode tneaStatus')
          .lean();
      } catch (_) {}
    }

    if (bioData?.courseApplied) {
      try {
        course = await Course.findOne({
          name: { $regex: new RegExp(`^${escapeRegex(bioData.courseApplied.trim())}$`, 'i') },
        })
          .select('name code level category specialization duration')
          .lean();
      } catch (_) {}
    }

    const receiptNo = payment.receipt || `RCPT_${payment._id}`;
    const paidDate = payment.completedAt || payment.createdAt || new Date();
    const formattedDate = new Date(paidDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const purposeMap = {
      counseling: {
        title: 'Career Counseling Guidance Fee',
        desc: 'One-on-One Higher Education Career Counseling & Guidance Support',
      },
      admission: {
        title: 'Admission Assistance Service Fee',
        desc: 'College Choice, Admission Application & Quota Seat Guidance Support',
      },
      scholarship_test: {
        title: 'State Level Scholarship Examination Fee',
        desc: 'Scholarship Registration, Hall Ticket & Online Assessment Access',
      },
      course_fee: {
        title: 'Higher Education Course Fee',
        desc: 'Direct Higher Education Institutional Admission Enrollment Assistance',
      },
      donation: {
        title: 'Foundation Educational Support Donation',
        desc: 'Voluntary Trust Contribution for Student Educational Empowerment',
      },
      other: {
        title: 'General Educational Service Fee',
        desc: 'Higher Education Guidance & Document Verification Support',
      },
    };

    const purposeInfo = purposeMap[payment.purpose] || {
      title: String(payment.purpose || 'EDUCATIONAL SERVICE FEE').toUpperCase(),
      desc: 'Rasi Foundation Student Educational Guidance Services',
    };

    const pdfBuffer = buildStudentPaymentReceipt({
      receiptNo,
      paymentDate: formattedDate,
      status: payment.status === 'refunded' || payment.refundStatus === 'full' ? 'refunded' : 'PAID',
      refundStatus: payment.refundStatus,
      paymentId: payment.razorpayPaymentId || 'pay_direct_capture',
      orderId: payment.razorpayOrderId || 'order_direct_capture',
      amount: Number(payment.amount || 0),
      currency: payment.currency || 'INR',
      paymentMethod: payment.paymentMethod || 'Online Gateway',
      bank: payment.bank || null,
      vpa: payment.vpa || null,

      // Student / Applicant Info
      studentName: bioData?.studentName || payment.studentName || payment.name || 'Candidate',
      applicationRef: bioData?._id ? `APP-${String(bioData._id).slice(-8).toUpperCase()}` : receiptNo,
      studentMobile: bioData?.studentMobile || payment.phone || '',
      studentEmail: bioData?.studentEmail || payment.email || '',
      fatherName: bioData?.fatherName || '',
      community: bioData?.community || '',
      district: college?.district || bioData?.district || '',
      maskedAadhaar: maskAadhaar(bioData?.aadhaarNumber),

      // Academic & Admission Info
      courseApplied: course?.name || bioData?.courseApplied || '',
      collegeName: college?.name || bioData?.collegeName || '',
      tneaCode: college?.tneaCode || '',
      admissionType: course?.level || bioData?.admissionType || 'Undergraduate (UG)',
      quota: bioData?.quota || 'GQ',
      isFirstGraduate: typeof bioData?.isFirstGraduate === 'boolean' ? bioData.isFirstGraduate : null,
      isGovtSchool: typeof bioData?.isGovtSchool === 'boolean' ? bioData.isGovtSchool : null,
      expectedCutOff: bioData?.expectedCutOff || '',
      plusTwoExamNumber: bioData?.plusTwoExamNumber || '',

      // Fee Details
      purposeTitle: purposeInfo.title,
      purposeDescription: purposeInfo.desc,

      // Organization info
      phoneDisplay: CONTACT?.phoneDisplay || '+91 97 89 44 61 00',
      email: CONTACT?.email || 'rasipuramrasifoundation@gmail.com',
      website: 'www.rasifoundation.com',
    });

    res.setHeader('Content-Type', PDF_MIME);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="Rasi_Payment_Receipt_${receiptNo}.pdf"`
    );
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('[Receipt Generator] Error building PDF receipt:', error);
    return res.status(500).json({ message: 'Failed to generate receipt', error: error.message });
  }
}
