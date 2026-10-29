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
  FaFileDownload,
  FaInfoCircle,
} from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';

const FALLBACK_PURPOSES = [
  { id: 'counseling', label: 'Career Counseling Fee', amount: 500, isFixed: false },
  { id: 'admission', label: 'Admission Assistance Fee', amount: 1000, isFixed: false },
  { id: 'scholarship_test', label: 'Scholarship Test Fee', amount: 200, isFixed: true },
  { id: 'course_fee', label: 'Course Fee', amount: 0, isFixed: false },
  { id: 'donation', label: 'Donation', amount: 0, isFixed: false },
  { id: 'other', label: 'Other Payment', amount: 0, isFixed: false },
];

export default function PaymentPage({ purposes = FALLBACK_PURPOSES, initialStudent = null }) {
  const [step, setStep] = useState('details'); // details | pay | success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  // Pre-fill form from student application if available
  const [form, setForm] = useState(() => {
    const defaultPurpose = initialStudent ? 'admission' : (purposes[0]?.id || '');
    const matched = purposes.find(p => p.id === defaultPurpose);
    return {
      name: initialStudent?.name || '',
      email: initialStudent?.email || '',
      phone: initialStudent?.phone || '',
      amount: matched && matched.amount > 0 ? String(matched.amount) : '',
      purpose: defaultPurpose,
      studentName: initialStudent?.studentName || '',
      notes: '',
    };
  });

  const selectedPurpose = purposes.find(p => p.id === form.purpose);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePurposeSelect = (purposeId) => {
    const p = purposes.find(x => x.id === purposeId);
    setForm(prev => ({
      ...prev,
      purpose: purposeId,
      amount: p && p.amount > 0 ? String(p.amount) : (p?.isFixed ? '' : prev.amount),
    }));
    setError('');
  };

  const validate = () => {
    if (!form.purpose) return 'Please select a payment category';
    if (!form.name.trim()) return 'Please enter your full name';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) return 'Please enter a valid email address';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) {
      return 'Please enter a valid 10-digit mobile number';
    }
    const amt = parseFloat(form.amount);
    if (isNaN(amt) || amt < 1) return 'Please enter a valid payment amount (minimum ₹1)';
    if (selectedPurpose?.isFixed && amt !== selectedPurpose.amount) {
      return `Fee for ${selectedPurpose.label} is strictly fixed at ₹${selectedPurpose.amount}`;
    }
    return null;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setStep('pay');
  };

  const handlePayment = async () => {
    if (loading) return; // Prevent double submit
    setLoading(true);
    setError('');

    try {
      // 1. Create server-side order and persist 'created' payment record
      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: form.purpose,
          amount: parseFloat(form.amount),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          studentName: form.studentName ? form.studentName.trim() : null,
          notes: form.notes ? form.notes.trim() : null,
          bioDataId: initialStudent?.bioDataId || null,
        }),
      });

      let orderData;
      const responseText = await orderRes.text();
      try {
        orderData = JSON.parse(responseText);
      } catch {
        throw new Error(
          orderRes.status === 500
            ? 'Payment server encountered a temporary error. Please try again in a moment.'
            : 'Invalid server response. Please try again.'
        );
      }

      if (!orderRes.ok) {
        throw new Error(orderData?.message || 'Failed to create payment order');
      }

      if (!window.Razorpay) {
        throw new Error('Payment gateway failed to load. Please refresh and check your internet connection.');
      }

      // 2. Configure official Razorpay Checkout modal
      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'RASI Foundation',
        description: selectedPurpose?.label || 'Educational Fee',
        image: '/logo.png',
        order_id: orderData.order.id,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },
        notes: {
          purpose: form.purpose,
          receipt: orderData.order.receipt,
        },
        theme: { color: '#047857' }, // Emerald forest brand color
        handler: async (response) => {
          try {
            // 3. Cryptographically verify signature and reconcile on server
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            let verifyData;
            const vText = await verifyRes.text();
            try {
              verifyData = JSON.parse(vText);
            } catch {
              throw new Error('Unexpected response verifying transaction.');
            }
            if (verifyRes.ok && verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setReceiptNumber(verifyData.receipt || orderData.order.receipt || '');
              setStep('success');
            } else {
              setError(verifyData.message || 'Payment verification failed. Please contact foundation administration.');
            }
          } catch (vErr) {
            console.error('Verification error:', vErr);
            setError('Network error verifying transaction. Our automated reconciliation system will verify your payment shortly.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (failResponse) => {
        setError(`Payment failed: ${failResponse.error?.description || 'Transaction declined by issuer'}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  const purposeLabel = selectedPurpose?.label || 'General Payment';
  const amountNum = parseFloat(form.amount) || 0;

  return (
    <>
      <Head>
        <title>Secure Payment Portal — Rasi Foundation</title>
        <meta name="description" content="Secure online payment for Rasi Foundation educational and counseling services." />
      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row border border-slate-200/80">

          {/* Left Panel: Summary & Security Credentials */}
          <div className="md:w-80 bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#0f172a] text-white flex flex-col p-8 justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center font-bold text-xl shadow-md border border-white/20">
                  R
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">Rasi Foundation</p>
                  <p className="text-xs text-slate-400">Education & Guidance Portal</p>
                </div>
              </div>

              {/* Amount Display */}
              <div className="mb-6 rounded-2xl bg-white/5 border border-white/10 p-5">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Payable Amount</p>
                <p className="text-3xl font-black text-white">
                  ₹{amountNum > 0 ? amountNum.toLocaleString('en-IN') : '0'}
                </p>
                {selectedPurpose?.isFixed && (
                  <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
                    Fixed Institutional Fee
                  </span>
                )}
              </div>

              {/* Review details when on 'pay' step */}
              {step === 'pay' && (
                <div className="space-y-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div>
                    <span className="text-slate-400">Purpose:</span>
                    <p className="font-semibold text-slate-100">{purposeLabel}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Payer Name:</span>
                    <p className="font-semibold text-slate-100">{form.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Mobile:</span>
                    <p className="font-semibold text-slate-100">{form.phone}</p>
                  </div>
                  {initialStudent && (
                    <div>
                      <span className="text-slate-400">Application Linked:</span>
                      <p className="font-semibold text-emerald-400">BioData Form ID Attached</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Security Guarantee Badges */}
            <div className="space-y-2.5 pt-6 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FaLock className="text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-400 shrink-0" />
                <span>PCI-DSS Level 1 Compliant Security</span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-slate-400">
                <SiRazorpay className="text-sky-400 text-base shrink-0" />
                <span>Authorized Razorpay Payment Gateway</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Content Form or Success View */}
          <div className="flex-1 flex flex-col">

            {/* STEP 1: Details Entry Form */}
            {step === 'details' && (
              <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Fee & Contribution Payment</h2>
                <p className="text-sm text-gray-500 mb-6">Complete your payment details to proceed to secure checkout.</p>

                {initialStudent && (
                  <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200/80 p-4 flex items-start gap-3">
                    <FaInfoCircle className="text-forest mt-0.5 shrink-0" />
                    <div className="text-xs text-emerald-900">
                      <p className="font-bold">Student Application Attached</p>
                      <p className="mt-0.5">Payment will be automatically synchronized with your admission application for <strong>{initialStudent.studentName}</strong>.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleContinue} className="space-y-4">
                  {/* Purpose Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Payment Category <span className="text-crimson">*</span>
                    </label>
                    <select
                      name="purpose"
                      value={form.purpose}
                      onChange={e => handlePurposeSelect(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                    >
                      <option value="">Select Category</option>
                      {purposes.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.label} {p.amount > 0 ? `(₹${p.amount}${p.isFixed ? ' - Fixed' : ''})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Amount (₹ INR) <span className="text-crimson">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">₹</span>
                      <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="1"
                        readOnly={selectedPurpose?.isFixed}
                        className={`w-full border border-gray-300 rounded-xl pl-8 pr-16 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white ${
                          selectedPurpose?.isFixed ? 'bg-slate-50 cursor-not-allowed opacity-80' : ''
                        }`}
                      />
                      {selectedPurpose?.isFixed && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          Fixed Fee
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Payer Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Payer / Candidate Full Name <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. S. Boopathi"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Candidate / Student Name <span className="text-gray-400 font-normal text-[11px]">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={form.studentName}
                        onChange={handleChange}
                        placeholder="Candidate name if different"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="student@example.com"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Mobile Number <span className="text-crimson">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        maxLength="10"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                      />
                    </div>
                  </div>

                  {/* Remarks / Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Notes / Reference Remarks <span className="text-gray-400 font-normal text-[11px]">(optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows="2"
                      placeholder="Add any specific course or college guidance notes"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-forest bg-white resize-none"
                    />
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm mt-4"
                  >
                    Continue to Payment Method
                    <FaChevronRight className="text-xs" />
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Payment Gateway Prompt */}
            {step === 'pay' && (
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <button
                    type="button"
                    onClick={() => { setStep('details'); setError(''); }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors mb-4"
                  >
                    <FaAngleLeft /> Edit Details
                  </button>

                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Confirm and Pay</h2>
                  <p className="text-sm text-gray-500 mb-6">Review your payment breakdown before launching secure checkout.</p>

                  <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm pb-3 border-b border-slate-200">
                      <span className="text-gray-600 font-medium">{purposeLabel}</span>
                      <span className="font-bold text-gray-900">₹{amountNum.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Gateway Convenience Charges:</span>
                      <span className="text-emerald-700 font-semibold">Waived / Free</span>
                    </div>
                    <div className="flex justify-between items-center text-base pt-2 font-bold text-gray-900">
                      <span>Total Net Payable:</span>
                      <span className="text-forest text-lg">₹{amountNum.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Supported Payment Channels Info */}
                  <div className="rounded-2xl border border-sky-100 bg-sky-50/60 p-4 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-sky-900 mb-2">Supported Payment Instruments</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-white rounded-lg p-2.5 border border-sky-100 shadow-xs flex flex-col items-center gap-1">
                        <FaMobileAlt className="text-forest text-base" />
                        <span className="font-semibold text-gray-800">UPI / QR</span>
                        <span className="text-[10px] text-gray-400">GPay, PhonePe, Paytm</span>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-sky-100 shadow-xs flex flex-col items-center gap-1">
                        <FaCreditCard className="text-blue-600 text-base" />
                        <span className="font-semibold text-gray-800">Cards</span>
                        <span className="text-[10px] text-gray-400">Visa, MC, RuPay</span>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-sky-100 shadow-xs flex flex-col items-center gap-1">
                        <FaUniversity className="text-amber-600 text-base" />
                        <span className="font-semibold text-gray-800">Net Banking</span>
                        <span className="text-[10px] text-gray-400">50+ Indian Banks</span>
                      </div>
                      <div className="bg-white rounded-lg p-2.5 border border-sky-100 shadow-xs flex flex-col items-center gap-1">
                        <FaWallet className="text-purple-600 text-base" />
                        <span className="font-semibold text-gray-800">Wallets</span>
                        <span className="text-[10px] text-gray-400">Amazon, Mobikwik</span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 font-medium mb-4">
                      {error}
                    </div>
                  )}
                </div>

                {/* Checkout Trigger */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-forest hover:bg-forest-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting to Razorpay...
                      </>
                    ) : (
                      <>
                        <FaLock className="text-sm" />
                        Pay ₹{amountNum.toLocaleString('en-IN')} via Razorpay
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1">
                    <FaShieldAlt className="text-emerald-600" /> Transactions are processed securely by Razorpay
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Success Screen */}
            {step === 'success' && (
              <div className="flex-1 p-6 md:p-10 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-5 text-forest text-4xl shadow-sm">
                  <FaCheckCircle />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h2>
                <p className="text-sm text-gray-500 mb-6">Your transaction has been verified and recorded.</p>

                <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200">
                    <span className="text-gray-500">Amount Paid:</span>
                    <span className="font-bold text-gray-900 text-sm">₹{amountNum.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Payment Reference:</span>
                    <span className="font-mono font-bold text-forest">{receiptNumber || 'RCPT_CONFIRMED'}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Gateway Transaction ID:</span>
                    <span className="font-mono text-gray-700">{paymentId}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Purpose:</span>
                    <span className="font-semibold text-gray-800">{purposeLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Payer Name:</span>
                    <span className="font-semibold text-gray-800">{form.name}</span>
                  </div>
                </div>

                <div className="w-full max-w-md space-y-3">
                  <a
                    href={`/api/payment/receipt?paymentId=${paymentId || receiptNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-forest hover:bg-forest-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    <FaFileDownload className="text-sm" />
                    Download Official Receipt (PDF)
                  </a>

                  <Link
                    href="/"
                    className="block w-full bg-slate-100 hover:bg-slate-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-center text-sm"
                  >
                    Back to Homepage
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { ref } = context.query;
  let initialStudent = null;

  try {
    const dbConnect = (await import('@/backend/lib/mongodb')).default;
    const PaymentSetting = (await import('@/backend/models/PaymentSetting')).default;
    const BioData = (await import('@/backend/models/BioData')).default;

    await dbConnect();

    // If ref is provided, attempt to prefill from BioData record
    if (ref) {
      try {
        const bioRecord = await BioData.findById(ref).lean();
        if (bioRecord) {
          initialStudent = {
            name: bioRecord.studentName || '',
            email: bioRecord.studentEmail || '',
            phone: bioRecord.studentMobile || '',
            studentName: bioRecord.studentName || '',
            bioDataId: String(bioRecord._id),
          };
        }
      } catch (err) {
        console.warn('[payment] Invalid bioData ref format:', ref);
      }
    }

    const settings = await PaymentSetting.find({ isEnabled: true }).sort({ purpose: 1 }).lean();

    const purposes = settings.map(s => ({
      id: s.purpose,
      label: s.label,
      amount: s.amount,
      isFixed: s.isFixed,
    }));

    return {
      props: {
        purposes: purposes.length > 0 ? purposes : FALLBACK_PURPOSES,
        initialStudent,
      },
    };
  } catch (err) {
    console.error('[payment] Failed to load server settings:', err.message);
    return {
      props: {
        purposes: FALLBACK_PURPOSES,
        initialStudent: null,
      },
    };
  }
}
