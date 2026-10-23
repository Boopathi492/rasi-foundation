import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import PaymentSetting from '@/backend/models/PaymentSetting';

const DEFAULTS = [
  { purpose: 'counseling', label: 'Career Counseling Fee', amount: 500, isFixed: false, isEnabled: true },
  { purpose: 'admission', label: 'Admission Assistance Fee', amount: 1000, isFixed: false, isEnabled: true },
  { purpose: 'scholarship_test', label: 'Scholarship Test Fee', amount: 200, isFixed: true, isEnabled: true },
  { purpose: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'donation', label: 'Donation', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'other', label: 'Other Payment', amount: 0, isFixed: false, isEnabled: true },
];

async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    // Seed defaults if collection is empty
    const count = await PaymentSetting.countDocuments();
    if (count === 0) {
      await PaymentSetting.insertMany(DEFAULTS);
    }
    const settings = await PaymentSetting.find().sort({ purpose: 1 }).lean();
    return res.status(200).json({ settings });
  }

  if (req.method === 'PUT') {
    const { settings } = req.body;
    if (!Array.isArray(settings)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const ops = settings.map(s =>
      PaymentSetting.findOneAndUpdate(
        { purpose: s.purpose },
        { label: s.label, amount: s.amount, isFixed: s.isFixed, isEnabled: s.isEnabled, updatedAt: new Date() },
        { upsert: true, new: true }
      )
    );
    await Promise.all(ops);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
