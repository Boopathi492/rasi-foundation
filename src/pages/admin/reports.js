import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaFileExcel,
  FaFilePdf,
  FaDownload,
  FaSpinner,
  FaHistory,
  FaFilter,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

export default function AdminReports() {
  const [reportType, setReportType] = useState('students');
  const [format, setFormat] = useState('xlsx');
  const [status, setStatus] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exporting, setExporting] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/reports', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data.exports || []);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleExport = async (e) => {
    e.preventDefault();
    setExporting(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/reports/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reportType,
          format,
          status: status === 'all' ? undefined : status,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `Export failed with status ${res.status}`);
      }

      // Read binary buffer from response
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      let filename = `Rasi_${reportType}_Export.${format}`;
      const match = disposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) filename = match[1];

      // Trigger browser download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setMessage(`Report "${filename}" generated and downloaded successfully!`);
      fetchHistory();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setExporting(false);
    }
  };

  const reportDescriptions = {
    students: 'Student BioData applications, contact information, chosen courses, district and masked Aadhaar numbers.',
    enquiries: 'Student enquiries, qualifications, internal follow-up statuses, assigned counsellors, and communication timestamps.',
    counselling: 'Counselling sessions, preferred colleges, recommendations, next steps, and follow-up schedules.',
    feedback: 'Student and parent testimonial submissions, approval statuses, ratings, and feedback messages.',
    colleges: 'Master catalogue of affiliated colleges across Tamil Nadu, TNEA codes, locations, and website links.',
    audit: 'Comprehensive administrative audit trail recording staff actions, logins, updates, and timestamps.',
  };

  return (
    <AdminLayout title="Reports & Export Center">
      <div className="space-y-6">
        {/* Header banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-base font-bold text-slate-800">Operational Reporting & Data Export</h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate authentic Excel (.xlsx) spreadsheets or printable branded PDF documents from live database records.
          </p>
        </div>

        {/* Export Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <form onSubmit={handleExport} className="space-y-5 text-xs">
            {/* Step 1: Select Report Type */}
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                1. Select Report Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {[
                  { id: 'students', label: 'Student BioData' },
                  { id: 'enquiries', label: 'Enquiries' },
                  { id: 'counselling', label: 'Counselling' },
                  { id: 'feedback', label: 'Feedback' },
                  { id: 'colleges', label: 'Colleges' },
                  { id: 'audit', label: 'Audit Trail' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setReportType(item.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      reportType === item.id
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-800 font-bold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {reportDescriptions[reportType]}
              </p>
            </div>

            {/* Step 2: Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status Filter</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed / Approved</option>
                  <option value="contacted">Contacted / Completed</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">From Date (Optional)</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">To Date (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* Step 3: Format */}
            <div className="pt-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-2">
                2. Choose Export Format
              </label>
              <div className="flex items-center gap-4">
                <label
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                    format === 'xlsx'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="xlsx"
                    checked={format === 'xlsx'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="sr-only"
                  />
                  <FaFileExcel className="text-emerald-600 text-base" />
                  <span>Microsoft Excel (.xlsx)</span>
                </label>

                <label
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border cursor-pointer transition-all ${
                    format === 'pdf'
                      ? 'border-rose-600 bg-rose-50/50 text-rose-800 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={(e) => setFormat(e.target.value)}
                    className="sr-only"
                  />
                  <FaFilePdf className="text-rose-600 text-base" />
                  <span>Branded Document (.pdf)</span>
                </label>
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  message.startsWith('Error')
                    ? 'bg-rose-50 border border-rose-200 text-rose-700'
                    : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={exporting}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/20 transition-all hover:scale-[1.01] inline-flex items-center gap-2"
              >
                {exporting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Compiling Report...</span>
                  </>
                ) : (
                  <>
                    <FaDownload className="text-xs" />
                    <span>Generate & Download Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* History Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory className="text-slate-400 text-xs" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Export History</h3>
          </div>

          {loadingHistory ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-xl text-blue-600" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No previous exports recorded</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Report Type</th>
                    <th className="px-4 py-2.5">Format</th>
                    <th className="px-4 py-2.5">Rows</th>
                    <th className="px-4 py-2.5">Generated By</th>
                    <th className="px-4 py-2.5">Status</th>
                    <th className="px-4 py-2.5">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((h) => (
                    <tr key={h._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800 capitalize">{h.reportType}</td>
                      <td className="px-4 py-3 uppercase text-[10px] font-mono font-bold text-slate-600">{h.format}</td>
                      <td className="px-4 py-3 font-mono">{h.rowCount || 0}</td>
                      <td className="px-4 py-3 text-slate-600">{h.requestedBy}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            h.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : h.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {h.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {h.createdAt ? new Date(h.createdAt).toLocaleString() : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
