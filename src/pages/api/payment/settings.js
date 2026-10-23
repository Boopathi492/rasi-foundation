import dbConnect from '@/backend/lib/mongodb';
import PaymentSetting from '@/backend/models/PaymentSetting';

const DEFAULTS = [
  { purpose: 'counseling', label: 'Career Counseling Fee', amount: 500, isFixed: false, isEnabled: true },
  { purpose: 'admission', label: 'Admission Assistance Fee', amount: 1000, isFixed: false, isEnabled: true },
  { purpose: 'scholarship_test', label: 'Scholarship Test Fee', amount: 200, isFixed: true, isEnabled: true },
  { purpose: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'donation', label: 'Donation', amount: 0, isFixed: false, isEnabled: true },
  { purpose: 'other', label: 'Other Payment', amount: 0, isFixed: false, isEnabled: true },
];

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  await dbConnect();
  const count = await PaymentSetting.countDocuments();
  if (count === 0) await PaymentSetting.insertMany(DEFAULTS);

  const settings = await PaymentSetting.find({ isEnabled: true }).sort({ purpose: 1 }).lean();
  return res.status(200).json({ settings });
}
