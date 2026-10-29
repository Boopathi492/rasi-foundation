import dbConnect from '@/backend/lib/mongodb';
import { withAuth } from '@/backend/lib/auth';
import { can } from '@/backend/lib/rbac';
import { recordAudit } from '@/backend/lib/apiHandler';
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
    if (!can(req.user?.role, 'payments:view')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Seed defaults if collection is empty
    const count = await PaymentSetting.countDocuments();
    if (count === 0) {
      await PaymentSetting.insertMany(DEFAULTS);
    }
    const settings = await PaymentSetting.find().sort({ purpose: 1 }).lean();
    return res.status(200).json({ settings });
  }

  if (req.method === 'PUT') {
    if (!can(req.user?.role, 'payments:manage')) {
      return res.status(403).json({ message: 'Forbidden: Insufficient privileges to alter payment fees' });
    }

    const { settings } = req.body || {};
    if (!Array.isArray(settings)) {
      return res.status(400).json({ message: 'Invalid payload: array expected' });
    }

    const ops = settings.map(s =>
      PaymentSetting.findOneAndUpdate(
        { purpose: s.purpose },
        {
          label: s.label,
          amount: Math.max(0, parseInt(s.amount, 10) || 0),
          isFixed: Boolean(s.isFixed),
          isEnabled: Boolean(s.isEnabled),
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      )
    );
    await Promise.all(ops);

    await recordAudit(req, {
      action: 'payment_settings_update',
      resourceType: 'payment_settings',
      summary: { updatedPurposes: settings.map(s => s.purpose) },
    });

    return res.status(200).json({ success: true, message: 'Payment settings updated successfully' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

export default withAuth(handler);
