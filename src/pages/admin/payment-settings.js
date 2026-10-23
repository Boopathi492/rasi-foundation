import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaSave,
  FaSpinner,
  FaRupeeSign,
  FaLock,
  FaUnlock,
  FaToggleOn,
  FaToggleOff,
  FaInfoCircle,
  FaMobileAlt,
} from 'react-icons/fa';

export default function PaymentSettings() {
  const [settings, setSettings] = useState([]);
  const [upiVpa, setUpiVpa] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [payRes, siteRes] = await Promise.all([
        fetch('/api/admin/payment-settings', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/site-settings', { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (payRes.ok) {
        const data = await payRes.json();
        setSettings(data.settings);
      }
      if (siteRes.ok) {
        const data = await siteRes.json();
        setUpiVpa(data.settings.upi_vpa || '');
      }
    } catch {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (purpose, field, value) => {
    setSettings(prev =>
      prev.map(s => s.purpose === purpose ? { ...s, [field]: value } : s)
    );
    setSaved(false);
  };

  const handleSave = async () => {
    if (!upiVpa.trim()) {
      setError('UPI ID is required for QR code payments');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const [payRes, siteRes] = await Promise.all([
        fetch('/api/admin/payment-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ settings }),
        }),
        fetch('/api/admin/site-settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ settings: { upi_vpa: upiVpa.trim() } }),
        }),
      ]);
      if (payRes.ok && siteRes.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError('Failed to save settings');
      }
    } catch {
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Payment Settings">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Payment Settings</h1>
            <p className="text-sm text-gray-500 mt-1">
              Set default amounts and configure payment categories for the payment page.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm mb-4">
            Settings saved successfully.
          </div>
        )}

        {/* UPI ID */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-1 flex items-center gap-2">
            <FaMobileAlt className="text-blue-500" /> UPI ID for QR Code
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            This UPI ID is encoded in the QR code shown on the payment page. Customers scan it to pay directly via any UPI app.
          </p>
          <div className="flex gap-3 items-center max-w-md">
            <input
              type="text"
              value={upiVpa}
              onChange={e => { setUpiVpa(e.target.value); setSaved(false); }}
              placeholder="e.g. 9876543210@paytm or name@okaxis"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          {upiVpa && (
            <p className="text-xs text-green-600 mt-2 font-medium">✓ QR will use: {upiVpa}</p>
          )}
          {!upiVpa && (
            <p className="text-xs text-red-500 mt-2">⚠ No UPI ID set — QR code will not work</p>
          )}
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex gap-3 mb-6 text-sm text-blue-700">
          <FaInfoCircle className="mt-0.5 shrink-0" />
          <div>
            <strong>Fixed Amount:</strong> When enabled, the customer cannot change the amount — it is automatically filled and locked on the payment page.
            If disabled, the amount shown is a suggestion the customer can edit.
          </div>
        </div>

        {/* Settings Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Payment Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Amount (₹)</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Fixed Amount</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Enabled</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {settings.map(setting => (
                  <tr key={setting.purpose} className={`hover:bg-gray-50 ${!setting.isEnabled ? 'opacity-50' : ''}`}>
                    {/* Label */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{setting.label}</p>
                      <p className="text-xs text-gray-400 font-mono">{setting.purpose}</p>
                    </td>

                    {/* Amount Input */}
                    <td className="px-6 py-4">
                      <div className="relative w-36">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <FaRupeeSign className="text-xs" />
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={setting.amount}
                          onChange={e => handleChange(setting.purpose, 'amount', parseFloat(e.target.value) || 0)}
                          disabled={!setting.isEnabled}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 disabled:cursor-not-allowed"
                        />
                      </div>
                      {setting.amount === 0 && setting.isEnabled && (
                        <p className="text-xs text-gray-400 mt-1">Customer enters amount</p>
                      )}
                    </td>

                    {/* Fixed Toggle */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleChange(setting.purpose, 'isFixed', !setting.isFixed)}
                        disabled={!setting.isEnabled || setting.amount === 0}
                        title={setting.amount === 0 ? 'Set an amount first' : setting.isFixed ? 'Fixed: customer cannot change amount' : 'Not fixed: customer can change amount'}
                        className={`text-2xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                          setting.isFixed ? 'text-orange-500' : 'text-gray-300'
                        }`}
                      >
                        {setting.isFixed ? <FaLock /> : <FaUnlock />}
                      </button>
                      <p className="text-xs text-gray-400 mt-1">{setting.isFixed ? 'Fixed' : 'Editable'}</p>
                    </td>

                    {/* Enabled Toggle */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleChange(setting.purpose, 'isEnabled', !setting.isEnabled)}
                        className={`text-3xl transition-colors ${
                          setting.isEnabled ? 'text-green-500' : 'text-gray-300'
                        }`}
                      >
                        {setting.isEnabled ? <FaToggleOn /> : <FaToggleOff />}
                      </button>
                      <p className="text-xs text-gray-400 mt-1">{setting.isEnabled ? 'Shown' : 'Hidden'}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-400">
            <p className="text-sm font-semibold text-gray-700 mb-1">Amount = 0</p>
            <p className="text-xs text-gray-500">Customer types any amount they want.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-400">
            <p className="text-sm font-semibold text-gray-700 mb-1">Amount + Fixed</p>
            <p className="text-xs text-gray-500">Amount is pre-filled and locked — customer cannot edit it.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-400">
            <p className="text-sm font-semibold text-gray-700 mb-1">Amount + Editable</p>
            <p className="text-xs text-gray-500">Amount is pre-filled as a suggestion — customer can change it.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
