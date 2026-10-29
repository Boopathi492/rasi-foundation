import dbConnect from '@/backend/lib/mongodb';
import CounsellingRecord from '@/backend/models/CounsellingRecord';

// Public endpoint: Submit student counselling booking requests.
// Admin review and status updates are managed securely via /api/admin/counselling.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const raw = req.body || {};
    const name = typeof raw.name === 'string' ? raw.name.trim() : (typeof raw.studentName === 'string' ? raw.studentName.trim() : '');
    const phoneRaw = typeof raw.phone === 'string' ? raw.phone.trim() : (typeof raw.studentPhone === 'string' ? raw.studentPhone.trim() : '');
    const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
    const course = typeof raw.course === 'string' ? raw.course.trim() : (typeof raw.interestedCourse === 'string' ? raw.interestedCourse.trim() : '');
    const college = typeof raw.college === 'string' ? raw.college.trim() : (typeof raw.preferredCollege === 'string' ? raw.preferredCollege.trim() : '');
    const qualification = typeof raw.qualification === 'string' ? raw.qualification.trim().slice(0, 100) : '';
    const district = typeof raw.district === 'string' ? raw.district.trim().slice(0, 100) : '';
    const contactMethod = typeof raw.contactMethod === 'string' ? raw.contactMethod.trim() : '';
    const contactTime = typeof raw.contactTime === 'string' ? raw.contactTime.trim() : '';
    const message = typeof raw.message === 'string' ? raw.message.trim().slice(0, 500) : '';

    // Validation
    if (!name || name.length > 100) {
      return res.status(400).json({ success: false, error: 'Please enter the student name (up to 100 characters).' });
    }

    const phoneDigits = phoneRaw.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return res.status(400).json({ success: false, error: 'Please provide a valid 10-digit mobile number.' });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!course || course.length > 150) {
      return res.status(400).json({ success: false, error: 'Please select a course of interest.' });
    }

    await dbConnect();

    // Prevent duplicate rapid submissions within 60 seconds
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const existingRecent = await CounsellingRecord.findOne({
      studentPhone: phoneDigits,
      interestedCourse: course,
      createdAt: { $gte: oneMinuteAgo },
    })
      .select('_id studentName status scheduledAt')
      .lean();

    if (existingRecent) {
      return res.status(200).json({
        success: true,
        message: 'Your counselling request has already been recorded.',
        booking: {
          _id: existingRecent._id,
          studentName: existingRecent.studentName,
          status: existingRecent.status,
          scheduledAt: existingRecent.scheduledAt,
        },
      });
    }

    // Determine target schedule time (next business day based on preference)
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 1);
    if (contactTime.includes('Morning')) {
      scheduledDate.setHours(10, 0, 0, 0);
    } else if (contactTime.includes('Afternoon')) {
      scheduledDate.setHours(14, 0, 0, 0);
    } else if (contactTime.includes('Evening')) {
      scheduledDate.setHours(17, 0, 0, 0);
    } else {
      scheduledDate.setHours(11, 0, 0, 0);
    }

    // Map communication type enum: ['in_person', 'phone', 'video', 'walk_in']
    let sessionType = 'phone';
    if (contactMethod.toLowerCase().includes('video')) {
      sessionType = 'video';
    } else if (contactMethod.toLowerCase().includes('person') || contactMethod.toLowerCase().includes('walk')) {
      sessionType = 'in_person';
    }

    const careerInterests = [
      district ? `District: ${district}` : '',
      qualification ? `Qualification: ${qualification}` : '',
    ].filter(Boolean).join(' | ');

    const notes = [
      email ? `Email: ${email}` : '',
      contactMethod ? `Preferred Contact: ${contactMethod}` : '',
      contactTime ? `Preferred Time: ${contactTime}` : '',
      message ? `Student Message: ${message}` : '',
    ].filter(Boolean).join('\n');

    // Create the record in counselling_records
    const record = await CounsellingRecord.create({
      studentRef: { kind: 'manual' },
      studentName: name,
      studentPhone: phoneDigits,
      scheduledAt: scheduledDate,
      counsellor: '',
      type: sessionType,
      preferredCollege: college,
      interestedCourse: course,
      careerInterests,
      notes,
      status: 'scheduled',
      createdBy: 'website_booking',
    });

    return res.status(201).json({
      success: true,
      message: 'Counselling booking submitted successfully',
      booking: {
        _id: record._id,
        studentName: record.studentName,
        status: record.status,
        scheduledAt: record.scheduledAt,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.error('[Public Counselling Booking Error]:', error.message);
    return res.status(500).json({ success: false, error: 'Could not process your counselling request. Please try again.' });
  }
}
