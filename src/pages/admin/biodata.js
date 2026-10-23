import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
  FaSearch, FaEye, FaSpinner, FaTimes, FaCheckCircle,
  FaClock, FaPhoneAlt, FaEdit, FaSave,
} from 'react-icons/fa';

const STATUS_STYLES = {
  pending:   'bg-yellow-100 text-yellow-700',
  reviewed:  'bg-blue-100 text-blue-700',
  contacted: 'bg-green-100 text-green-700',
};

export default function AdminBioData() {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, contacted: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
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
        setSubmissions(data.submissions);
        setStats(data.stats);
      }
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openModal = (record) => {
    setSelected(record);
    setEditStatus(record.status);
    setEditNotes(record.adminNotes || '');
    setEditing(false);
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
        setSelected(prev => ({ ...prev, status: editStatus, adminNotes: editNotes }));
        setSubmissions(prev =>
          prev.map(s => s._id === selected._id ? { ...s, status: editStatus, adminNotes: editNotes } : s)
        );
        setEditing(false);
        await fetchData();
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Bio Data Submissions">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={stats.total} color="gray" />
        <StatCard label="Pending" value={stats.pending} color="yellow" />
        <StatCard label="Reviewed" value={stats.reviewed} color="blue" />
        <StatCard label="Contacted" value={stats.contacted} color="green" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, mobile, course..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="contacted">Contacted</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No submissions found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Student</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Course</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Mobile</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Cut-Off</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-right px-5 py-4 text-sm font-semibold text-gray-600">View</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {submissions.map(s => (
                  <tr key={s._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800">{s.studentName}</p>
                      <p className="text-xs text-gray-400">{s.studentEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600 max-w-[200px] truncate">{s.courseApplied}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{s.studentMobile}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{s.expectedCutOff}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[s.status]}`}>
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => openModal(s)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between z-10">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{selected.studentName}</h3>
                <p className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <div className="flex items-center gap-2">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                  >
                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                    Save
                  </button>
                )}
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Notes */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-600 w-20">Status</label>
                  {editing ? (
                    <select
                      value={editStatus}
                      onChange={e => setEditStatus(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                    </select>
                  ) : (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[selected.status]}`}>
                      {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Admin Notes</label>
                  {editing ? (
                    <textarea
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      rows="2"
                      placeholder="Add notes..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{selected.adminNotes || <span className="text-gray-400 italic">No notes</span>}</p>
                  )}
                </div>
              </div>

              {/* Student Details */}
              <InfoSection title="Student Details">
                <Row label="Name" value={selected.studentName} />
                <Row label="Date of Birth" value={selected.dateOfBirth} />
                <Row label="Course Applied" value={selected.courseApplied} />
                <Row label="College" value={selected.collegeName} />
                <Row label="Quota" value={selected.quota} />
                <Row label="Father's Name" value={selected.fatherName} />
                <Row label="Community" value={selected.community} />
                <Row label="Address" value={selected.address} full />
              </InfoSection>

              <InfoSection title="Contact Information">
                <Row label="Student Mobile" value={selected.studentMobile} />
                <Row label="Student Email" value={selected.studentEmail} />
                <Row label="Aadhaar No." value={selected.aadhaarNumber} />
                <Row label="Father Mobile" value={selected.fatherMobile} />
                <Row label="Mother Mobile" value={selected.motherMobile} />
              </InfoSection>

              <InfoSection title="Academic Details">
                <Row label="+2 Group" value={selected.plusTwoGroup} />
                <Row label="Exam Number" value={selected.plusTwoExamNumber} />
                <Row label="Expected Cut-Off" value={selected.expectedCutOff} />
                <Row label="Last School" value={selected.lastSchoolAndPlace} />
                <Row label="Govt School" value={selected.isGovtSchool ? 'Yes' : 'No'} />
                <Row label="First Graduate" value={selected.isFirstGraduate ? 'Yes' : 'No'} />
              </InfoSection>

              {selected.documents?.length > 0 && (
                <InfoSection title="Documents Provided">
                  <div className="col-span-2 flex flex-wrap gap-2">
                    {selected.documents.map(doc => (
                      <span key={doc} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-xs" /> {doc}
                      </span>
                    ))}
                  </div>
                </InfoSection>
              )}

              {/* Contact Buttons */}
              <div className="flex gap-3 pt-2">
                <a
                  href={`tel:${selected.studentMobile}`}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                  <FaPhoneAlt /> Call Student
                </a>
                <a
                  href={`tel:${selected.fatherMobile}`}
                  className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                >
                  <FaPhoneAlt /> Call Father
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    gray:   'bg-white text-gray-800',
    yellow: 'bg-yellow-50 text-yellow-700',
    blue:   'bg-blue-50 text-blue-700',
    green:  'bg-green-50 text-green-700',
  };
  return (
    <div className={`rounded-xl p-4 shadow-sm ${colors[color]}`}>
      <p className="text-sm opacity-70">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function InfoSection({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, full }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800 break-words">{value || '—'}</p>
    </div>
  );
}
