import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import {
    FaPlus,
    FaTrash,
    FaEdit,
    FaSpinner,
    FaTrophy,
    FaEye,
    FaTimes,
    FaCheckCircle,
    FaExclamationCircle,
    FaStar,
    FaGraduationCap
} from 'react-icons/fa';

export default function AdminAchievements() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        type: 'milestone',
        title: '',
        description: '',
        name: '',
        achievement: '',
        year: new Date().getFullYear().toString(),
        course: '',
        quote: '',
        videoUrl: '',
        status: 'published',
        isVerified: false,
        journey: [],
        isActive: true,
        order: 0
    });

    const [journeyPoint, setJourneyPoint] = useState({ label: '', date: '' });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/admin/achievements', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAchievements(data);
            }
        } catch (error) {
            console.error('Failed to fetch achievements:', error);
        } finally {
            setLoading(false);
        }
    };

    const addJourneyPoint = () => {
        if (!journeyPoint.label || !journeyPoint.date) return;
        setFormData({
            ...formData,
            journey: [...formData.journey, journeyPoint]
        });
        setJourneyPoint({ label: '', date: '' });
    };

    const removeJourneyPoint = (index) => {
        const newJourney = [...formData.journey];
        newJourney.splice(index, 1);
        setFormData({ ...formData, journey: newJourney });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditing ? `/api/admin/achievements/${formData._id}` : '/api/admin/achievements';
            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                fetchAchievements();
                resetForm();
            }
        } catch (error) {
            console.error('Failed to save achievement:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAchievement = async (id) => {
        if (!confirm('Are you sure you want to delete this achievement?')) return;
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/admin/achievements/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                fetchAchievements();
            }
        } catch (error) {
            console.error('Failed to delete achievement:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            type: 'milestone',
            title: '',
            description: '',
            name: '',
            achievement: '',
            year: new Date().getFullYear().toString(),
            course: '',
            quote: '',
            videoUrl: '',
            status: 'published',
            isVerified: false,
            journey: [],
            isActive: true,
            order: 0
        });
        setIsEditing(false);
    };

    return (
        <AdminLayout title="Manage Achievements">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Achievements</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Celebrate milestones & recognitions</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="bg-red-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-red-600 border-2 border-transparent hover:border-red-600 transition-all shadow-lg shadow-red-600/20"
                >
                    <FaPlus /> Post Achievement
                </button>
            </div>

            {loading && achievements.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <FaSpinner className="animate-spin text-4xl text-red-600" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item) => (
                        <div key={item._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <FaTrophy />
                                        </div>
                                        {item.isVerified && (
                                            <div className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded-lg font-black uppercase tracking-wider flex items-center gap-1">
                                                <FaCheckCircle className="text-[10px]" /> Verified
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setFormData(item); setIsEditing(true); setShowModal(true); }}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteAchievement(item._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-xs text-gray-500 font-medium mb-4">{item.name} • {item.year}</p>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.type === 'success_story' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {item.type.replace('_', ' ')}
                                        </span>
                                        {!item.isActive && (
                                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest">Hidden</span>
                                        )}
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.status === 'published' ? 'bg-green-100 text-green-700' :
                                        item.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                                {isEditing ? 'Edit Achievement' : 'Post Achievement'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold text-gray-700"
                                    >
                                        <option value="milestone">Milestone</option>
                                        <option value="stat">Statistic</option>
                                        <option value="recognition">Recognition</option>
                                        <option value="placement">Placement</option>
                                        <option value="spotlight">Spotlight (Featured)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold text-gray-700"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                                        placeholder="e.g., NEET 2024 State Topper"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Year/Date</label>
                                    <input
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                                        placeholder="2024"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Name (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Course/College</label>
                                    <input
                                        type="text"
                                        value={formData.course}
                                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                                        placeholder="MBBS / Madras Medical College"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Video Testimonial URL (YouTube/Vimeo)</label>
                                <input
                                    type="text"
                                    value={formData.videoUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold"
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-red-500/20 font-bold resize-none"
                                    placeholder="Enter details about this achievement..."
                                />
                            </div>

                            <div className="space-y-4 border-t pt-6">
                                <label className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Student Journey Timeline</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={journeyPoint.date}
                                        onChange={(e) => setJourneyPoint({ ...journeyPoint, date: e.target.value })}
                                        className="w-1/3 bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none font-bold text-xs"
                                        placeholder="Year/Month"
                                    />
                                    <input
                                        type="text"
                                        value={journeyPoint.label}
                                        onChange={(e) => setJourneyPoint({ ...journeyPoint, label: e.target.value })}
                                        className="flex-1 bg-gray-50 border border-gray-200 p-3 rounded-xl outline-none font-bold text-xs"
                                        placeholder="Milestone (e.g., Joined Coaching)"
                                    />
                                    <button
                                        type="button"
                                        onClick={addJourneyPoint}
                                        className="bg-gray-900 text-white px-4 rounded-xl text-xs font-black uppercase tracking-widest"
                                    >Add</button>
                                </div>
                                <div className="space-y-2">
                                    {formData.journey?.map((pt, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 rounded-xl flex items-center justify-between border border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-red-600 font-bold text-[10px] uppercase">{pt.date}</span>
                                                <span className="text-gray-900 font-bold text-[11px]">{pt.label}</span>
                                            </div>
                                            <button type="button" onClick={() => removeJourneyPoint(idx)} className="text-red-500 hover:text-red-700">
                                                <FaTrash className="text-[10px]" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-8 py-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-5 h-5 accent-red-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isVerified}
                                        onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                                        className="w-5 h-5 accent-blue-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Verified Success</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-8 py-4 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-red-600/20"
                                >
                                    {isEditing ? 'Update Achievement' : 'Publish to Site'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
