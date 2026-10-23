import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import {
  FaLock,
  FaCheckCircle,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaWallet,
  FaChevronRight,
  FaShieldAlt,
  FaAngleLeft,
} from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';

const FALLBACK_PURPOSES = [
  { id: 'counseling', label: 'Career Counseling Fee', amount: 0, isFixed: false },
  { id: 'admission', label: 'Admission Assistance Fee', amount: 0, isFixed: false },
  { id: 'scholarship_test', label: 'Scholarship Test Fee', amount: 0, isFixed: false },
  { id: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false },
  { id: 'donation', label: 'Donation', amount: 0, isFixed: false },
  { id: 'other', label: 'Other Payment', amount: 0, isFixed: false },
];

const TABS = [
  { id: 'upi', label: 'UPI', icon: FaMobileAlt },
  { id: 'card', label: 'Card', icon: FaCreditCard },
  { id: 'netbanking', label: 'Net Banking', icon: FaUniversity },
  { id: 'wallet', label: 'Wallet', icon: FaWallet },
];

export default function PaymentPage({ purposes = FALLBACK_PURPOSES, upiVpa = '' }) {
  const [step, setStep] = useState('details'); // details | pay | success
  const [activeTab, setActiveTab] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentId, setPaymentId] = useState('');


  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    purpose: '',
    studentName: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handlePurposeSelect = (purposeId) => {
    const p = purposes.find(x => x.id === purposeId);
    setForm(prev => ({
      ...prev,
      purpose: purposeId,
      amount: p && p.amount > 0 ? String(p.amount) : prev.amount,
    }));
    setError('');
  };

  const selectedPurpose = purposes.find(p => p.id === form.purpose);



  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) return 'Please enter a valid 10-digit phone number';
    if (!form.amount || parseFloat(form.amount) < 1) return 'Please enter a valid amount (minimum ₹1)';
    if (!form.purpose) return 'Please select a payment purpose';
    return null;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setStep('pay');
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          receipt: `rasi_${Date.now()}`,
          notes: { name: form.name, email: form.email, phone: form.phone, purpose: form.purpose },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || 'Failed to create order');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'RASI Foundation',
        description: purposes.find(p => p.id === form.purpose)?.label || 'Payment',
        image: '/logo.png',
        order_id: orderData.order.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentDetails: {
                  amount: parseFloat(form.amount),
                  currency: 'INR',
                  name: form.name,
                  email: form.email,
                  phone: form.phone,
                  purpose: form.purpose,
                  studentName: form.studentName,
                  notes: form.notes,
                },
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setStep('success');
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch {
            setError('Payment verification failed. Please contact support.');
          }
        },
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { purpose: form.purpose, studentName: form.studentName },
        theme: { color: '#528FF0' },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const purposeLabel = purposes.find(p => p.id === form.purpose)?.label || '—';
  const amountNum = parseFloat(form.amount) || 0;

  const openUpiApp = (appName) => {
    if (!upiVpa) { handlePayment(); return; }
    const ref = `RASI${Date.now()}`;
    const params = `pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent('RASI Foundation')}&am=${amountNum}&cu=INR&tn=${encodeURIComponent(ref)}`;
    const schemes = {
      'Google Pay':   `tez://upi/pay?${params}`,
      'PhonePe':      `phonepe://pay?${params}`,
      'Paytm':        `paytmmp://upi/pay?${params}`,
      'BHIM':         `upi://pay?${params}`,
      'Amazon Pay':   `amazonpay://pay?${params}`,
      'Other UPI':    `upi://pay?${params}`,
    };
    window.location.href = schemes[appName] || `upi://pay?${params}`;
  };

  if (step === 'success') {
    return (
      <>
        <Head>
          <title>Payment Successful — RASI Foundation</title>
        </Head>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-6">Your payment has been processed successfully.</p>

            <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left space-y-3">
              <Row label="Amount Paid" value={`₹${amountNum.toLocaleString('en-IN')}`} bold />
              <Row label="Purpose" value={purposeLabel} />
              <Row label="Name" value={form.name} />
              <Row label="Payment ID" value={paymentId} mono />
            </div>

            <p className="text-sm text-gray-400 mb-6">
              A confirmation has been sent to <span className="font-medium text-gray-600">{form.email}</span>
            </p>

            <Link
              href="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-center"
            >
              Back to Home
            </Link>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <FaShieldAlt />
              <span>Secured by Razorpay</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Pay — RASI Foundation</title>
        <meta name="description" content="Secure payment for RASI Foundation services" />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">

          {/* ── Left Panel ── */}
          <div className="md:w-80 bg-[#1a1a2e] text-white flex flex-col p-8">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">R</div>
              <div>
                <p className="font-bold text-lg leading-tight">RASI Foundation</p>
                <p className="text-xs text-gray-400">Education & Counseling</p>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-1">Total Amount</p>
              <p className="text-4xl font-bold">
                ₹{amountNum > 0 ? amountNum.toLocaleString('en-IN') : '0'}
              </p>
            </div>

            {/* Summary */}
            {step === 'pay' && (
              <div className="space-y-3 mb-8">
                <SummaryRow label="Purpose" value={purposeLabel} />
                <SummaryRow label="Name" value={form.name} />
                <SummaryRow label="Email" value={form.email} />
                <SummaryRow label="Phone" value={form.phone} />
              </div>
            )}

            {/* Security badges */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FaLock className="text-green-400" />
                <span>256-bit SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FaShieldAlt className="text-green-400" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-4 pt-4 border-t border-white/10">
                <SiRazorpay className="text-blue-400 text-base" />
                <span>Powered by Razorpay</span>
              </div>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div className="flex-1 flex flex-col">

            {/* Step: Details Form */}
            {step === 'details' && (
              <div className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Details</h2>

                <form onSubmit={handleContinue} className="space-y-4">
                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Payment Purpose <span className="text-red-500">*</span></label>
                    <select
                      name="purpose"
                      value={form.purpose}
                      onChange={e => handlePurposeSelect(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    >
                      <option value="">Select purpose</option>
                      {purposes.map(p => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Amount (₹) <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="1"
                        readOnly={selectedPurpose?.isFixed}
                        className={`w-full border border-gray-200 rounded-xl pl-8 pr-10 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 ${selectedPurpose?.isFixed ? 'cursor-not-allowed opacity-70' : ''}`}
                      />
                      {selectedPurpose?.isFixed && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-orange-500 font-medium">Fixed</span>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <div className="border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-gray-500 text-sm font-medium">+91</div>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        maxLength="10"
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Student Name <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      name="studentName"
                      value={form.studentName}
                      onChange={handleChange}
                      placeholder="If different from above"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Any additional information"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base mt-2"
                  >
                    Continue to Pay
                    <FaChevronRight className="text-sm" />
                  </button>
                </form>
              </div>
            )}

            {/* Step: Payment Method */}
            {step === 'pay' && (
              <div className="flex-1 flex flex-col">
                {/* Back */}
                <div className="px-8 pt-6">
                  <button
                    onClick={() => setStep('details')}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-4"
                  >
                    <FaAngleLeft /> Back
                  </button>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Choose Payment Method</h2>
                  <p className="text-sm text-gray-400 mb-6">Select how you&apos;d like to pay ₹{amountNum.toLocaleString('en-IN')}</p>
                </div>

                {/* Tabs */}
                <div className="px-8">
                  <div className="flex border-b border-gray-200 mb-6 gap-1">
                    {TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                          activeTab === tab.id
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <tab.icon />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* UPI Tab */}
                  {activeTab === 'upi' && (
                    <div className="pb-6">
                      <p className="text-sm text-gray-500 mb-4">Tap an app to open it directly and pay.</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { name: 'Google Pay',  icon: '/icons/gpay.png' },
                          { name: 'PhonePe',     icon: '/icons/phonepe.png' },
                          { name: 'Paytm',       icon: '/icons/paytm.png' },
                          { name: 'BHIM',        icon: '/icons/bhim.png' },
                          { name: 'Amazon Pay',  icon: '/icons/amazonpay.png' },
                          { name: 'Other UPI',   icon: null },
                        ].map(app => (
                          <button
                            key={app.name}
                            type="button"
                            onClick={() => openUpiApp(app.name)}
                            className="border border-gray-200 rounded-xl p-3 text-center text-sm font-medium text-gray-700 hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all flex flex-col items-center gap-2"
                          >
                            {app.icon ? (
                              <img src={app.icon} alt={app.name} className="w-8 h-8 object-contain" onError={e => { e.target.style.display='none'; }} />
                            ) : (
                              <FaMobileAlt className="text-2xl text-gray-400" />
                            )}
                            <span className="text-xs">{app.name}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-4">
                        Or click <strong>Pay ₹{amountNum}</strong> below to choose any payment method via Razorpay.
                      </p>
                    </div>
                  )}

                  {/* Card Tab */}
                  {activeTab === 'card' && (
                    <div className="space-y-4 pb-6">
                      <p className="text-sm text-gray-500">Pay using Credit or Debit card.</p>
                      <div className="space-y-3">
                        <input type="text" placeholder="Card Number" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" disabled />
                        <div className="flex gap-3">
                          <input type="text" placeholder="MM / YY" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" disabled />
                          <input type="text" placeholder="CVV" className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" disabled />
                        </div>
                        <p className="text-xs text-gray-400">Card details are handled securely by Razorpay</p>
                      </div>
                    </div>
                  )}

                  {/* Net Banking Tab */}
                  {activeTab === 'netbanking' && (
                    <div className="space-y-4 pb-6">
                      <p className="text-sm text-gray-500">Pay through your bank&apos;s internet banking portal.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Other Banks'].map(bank => (
                          <div key={bank} className="border border-gray-200 rounded-xl p-3 text-sm text-gray-600 font-medium hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                            {bank}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Wallet Tab */}
                  {activeTab === 'wallet' && (
                    <div className="space-y-4 pb-6">
                      <p className="text-sm text-gray-500">Pay using your digital wallet.</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['Paytm', 'Mobikwik', 'Freecharge', 'Airtel Money', 'Jio Money', 'Other'].map(w => (
                          <div key={w} className="border border-gray-200 rounded-xl p-3 text-center text-xs text-gray-600 font-medium hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all">
                            {w}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pay Button */}
                <div className="mt-auto px-8 pb-8 pt-4 border-t border-gray-100">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
                      {error}
                    </div>
                  )}
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaLock className="text-sm" />
                        Pay ₹{amountNum.toLocaleString('en-IN')}
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                    <FaShieldAlt /> Secured by Razorpay
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ label, value, bold, mono }) {
  return (
    <div className="flex justify-between items-start text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={`text-right ml-4 ${bold ? 'font-bold text-gray-800 text-base' : 'text-gray-700'} ${mono ? 'font-mono text-xs' : ''}`}>
        {value}
      </span>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="text-white text-sm font-medium truncate">{value || '—'}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { ref } = context.query;

  // Must come from bio data form
  if (!ref) {
    return { redirect: { destination: '/biodata', permanent: false } };
  }

  try {
    const dbConnect = (await import('@/backend/lib/mongodb')).default;
    const PaymentSetting = (await import('@/backend/models/PaymentSetting')).default;
    const SiteSetting = (await import('@/backend/models/SiteSetting')).default;
    const BioData = (await import('@/backend/models/BioData')).default;

    await dbConnect();

    // Validate bio data ref
    const bioRecord = await BioData.findById(ref).lean();
    if (!bioRecord) {
      return { redirect: { destination: '/biodata', permanent: false } };
    }

    const [settings, upiSetting] = await Promise.all([
      PaymentSetting.find({ isEnabled: true }).sort({ purpose: 1 }).lean(),
      SiteSetting.findOne({ key: 'upi_vpa' }).lean(),
    ]);

    const purposes = settings.map(s => ({
      id: s.purpose,
      label: s.label,
      amount: s.amount,
      isFixed: s.isFixed,
    }));

    return { props: { purposes, upiVpa: upiSetting?.value || '' } };
  } catch (err) {
    console.error('Failed to load payment settings:', err.message);
    return { redirect: { destination: '/biodata', permanent: false } };
  }
}
