import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import Drawer from '@/frontend/components/admin/Drawer';
import {
  FaSearch,
  FaEye,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaPhoneAlt,
  FaEdit,
  FaSave,
  FaFileAlt,
  FaDownload,
  FaCheck,
  FaBan,
} from 'react-icons/fa';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-800',
  reviewed: 'bg-blue-100 text-blue-800',
  contacted: 'bg-emerald-100 text-emerald-800',
};

export default function AdminBioData() {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, contacted: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`/api/admin/biodata?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        setStats(data.stats || { total: 0, pending: 0, reviewed: 0, contacted: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const openModal = async (record) => {
    setSelected(record);
    setEditStatus(record.status);
    setEditNotes(record.adminNotes || '');
    setEditing(false);
    setSelectedDocs([]);

    // Fetch detailed record and uploaded documents
    setLoadingDocs(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/biodata/${record._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setSelectedDocs(json.documents || []);
      }
    } catch (err) {
      console.error('Error fetching student documents:', err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/biodata/${selected._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
      });
      if (res.ok) {
        setSelected((prev) => ({ ...prev, status: editStatus, adminNotes: editNotes }));
        setSubmissions((prev) =>
          prev.map((s) => (s._id === selected._id ? { ...s, status: editStatus, adminNotes: editNotes } : s))
        );
        setEditing(false);
        await fetchData();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleVerifyDocument = async (docId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ verificationStatus: newStatus }),
      });
      if (res.ok) {
        setSelectedDocs((prev) =>
          prev.map((d) => (d._id === docId ? { ...d, verificationStatus: newStatus } : d))
        );
      }
    } catch (err) {
      console.error('Verify doc error:', err);
    }
  };

  return (
    <AdminLayout title="Student BioData Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Applications" value={stats.total} color="gray" />
          <StatCard label="Pending Review" value={stats.pending} color="yellow" />
          <StatCard label="Reviewed" value={stats.reviewed} color="blue" />
          <StatCard label="Contacted" value={stats.contacted} color="green" />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by student name, email, mobile, or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 text-xs outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="all">All Application Statuses</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="contacted">Contacted</option>
          </select>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs font-medium">No student applications found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Student</th>
                    <th className="px-5 py-3.5">Contact</th>
                    <th className="px-5 py-3.5">Course & College</th>
                    <th className="px-5 py-3.5">District</th>
                    <th className="px-5 py-3.5">Quota</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-800">{sub.studentName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">Aadhaar: {sub.aadhaarNumber}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-slate-700">{sub.studentEmail}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{sub.studentMobile}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800">{sub.courseApplied || '—'}</p>
                        <p className="text-[11px] text-slate-400">{sub.collegeName || ''}</p>
                      </td>
                      <td className="px-5 py-4 text-slate-700">{sub.district || '—'}</td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                          {sub.quota || 'GQ'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            STATUS_STYLES[sub.status] || 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => openModal(sub)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs inline-flex items-center gap-1.5 transition-colors"
                        >
                          <FaEye className="text-[10px]" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Review Drawer */}
        <Drawer
          isOpen={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected?.studentName || 'Student Application Review'}
          subtitle={selected ? `Application Ref: ${selected._id}` : ''}
          width="2xl"
          footer={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {selected?.studentMobile && (
                  <a
                    href={`tel:${selected.studentMobile}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-950/20"
                  >
                    <FaPhoneAlt className="text-xs" />
                    <span>Call Student ({selected.studentMobile})</span>
                  </a>
                )}
                {selected?.fatherMobile && (
                  <a
                    href={`tel:${selected.fatherMobile}`}
                    className="inline-flex items-center gap-2 px-3 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
                  >
                    <FaPhoneAlt className="text-xs text-slate-400" />
                    <span>Call Parent</span>
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          }
        >
          {selected && (
            <div className="space-y-6 text-xs">
              {/* Status & Internal Notes */}
              <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="font-bold text-slate-700">Application Status:</label>
                    {editing ? (
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="border border-slate-300 rounded-lg px-2.5 py-1 text-xs bg-white outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                      </select>
                    ) : (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[selected.status]}`}>
                        {selected.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {editing ? (
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg inline-flex items-center gap-1"
                    >
                      {saving && <FaSpinner className="animate-spin text-[10px]" />}
                      <span>Save Notes</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      Edit Notes / Status
                    </button>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-600 block mb-1">Administrative Notes</label>
                  {editing ? (
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows={2}
                      placeholder="Internal notes regarding counselling call, quota eligibility, certificate verification..."
                      className="w-full border border-slate-200 rounded-xl p-2.5 text-xs bg-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                    />
                  ) : (
                    <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-100">
                      {selected.adminNotes || 'No notes added yet'}
                    </p>
                  )}
                </div>
              </div>

              {/* Student Details Grid */}
              <InfoSection title="Student Identity & Academic Background">
                <Row label="Full Name" value={selected.studentName} />
                <Row label="Gender" value={selected.gender || '—'} />
                <Row label="Date of Birth" value={selected.dateOfBirth} />
                <Row label="Aadhaar (Masked)" value={selected.aadhaarNumber} />
                <Row label="Community" value={selected.community} />
                <Row label="District" value={selected.district || '—'} />
                <Row label="Father's Name" value={selected.fatherName} />
                <Row label="Mother's Name" value={selected.motherName || '—'} />
                <Row label="First Graduate?" value={selected.isFirstGraduate ? 'Yes' : 'No'} />
                <Row label="Govt School?" value={selected.isGovtSchool ? 'Yes' : 'No'} />
                <Row label="10th Marks" value={selected.marks10th || '—'} />
                <Row label="12th Marks / Cut-Off" value={selected.marks12th || selected.expectedCutOff || '—'} />
              </InfoSection>

              <InfoSection title="Admission Preferences">
                <Row label="Course Applied" value={selected.courseApplied} />
                <Row label="Preferred College" value={selected.collegeName} />
                <Row label="Admission Type" value={selected.admissionType} />
                <Row label="Quota" value={selected.quota} />
                <Row label="Interested Area" value={selected.interestedArea || '—'} />
                <Row label="Reference / Referral" value={selected.reference || '—'} />
                <Row label="Address" value={selected.address} full />
              </InfoSection>

              {/* Uploaded Documents Drawer */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Uploaded Supporting Documents
                </h4>
                {loadingDocs ? (
                  <div className="flex items-center gap-2 text-slate-400 py-3">
                    <FaSpinner className="animate-spin text-xs" />
                    <span>Loading documents...</span>
                  </div>
                ) : selectedDocs.length === 0 ? (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-400 text-center">
                    No uploaded digital documents on file. (Self-attested copies may be provided offline).
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDocs.map((doc) => (
                      <div
                        key={doc._id}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <FaFileAlt className="text-blue-500 text-base shrink-0" />
                            <div>
                              <p className="font-bold text-slate-800 capitalize">
                                {doc.documentType.replace(/_/g, ' ')}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {doc.originalName} ({Math.round(doc.size / 1024)} KB)
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              doc.verificationStatus === 'verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : doc.verificationStatus === 'rejected'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {doc.verificationStatus}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                          <a
                            href={`/api/admin/documents/${doc._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1"
                          >
                            <FaEye className="text-[10px]" />
                            <span>View File</span>
                          </a>
                          <div className="flex items-center gap-1.5">
                            {doc.verificationStatus !== 'verified' && (
                              <button
                                onClick={() => handleVerifyDocument(doc._id, 'verified')}
                                className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                              >
                                Verify
                              </button>
                            )}
                            {doc.verificationStatus !== 'rejected' && (
                              <button
                                onClick={() => handleVerifyDocument(doc._id, 'rejected')}
                                className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-bold"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    gray: 'bg-white text-slate-800 border-slate-200',
    yellow: 'bg-amber-50 text-amber-800 border-amber-200',
    blue: 'bg-blue-50 text-blue-800 border-blue-200',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  };
  return (
    <div className={`rounded-2xl p-4 border shadow-xs ${colors[color]}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">{label}</p>
      <p className="text-2xl font-extrabold mt-1">{value || 0}</p>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div>
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value, full }) {
  return (
    <div className={full ? 'col-span-full' : ''}>
      <p className="text-[10px] text-slate-400 font-medium uppercase">{label}</p>
      <p className="text-xs font-semibold text-slate-800 break-words">{value || '—'}</p>
    </div>
  );
}
