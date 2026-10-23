import { useState, useEffect } from 'react';
import AdminLayout from '@/frontend/components/AdminLayout';
import { 
  FaSearch, 
  FaFilter, 
  FaEye,
  FaTrash,
  FaSpinner,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaReply,
  FaCheck,
  FaGlobe
} from 'react-icons/fa';

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/questions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAnswer = async () => {
    if (!answer.trim()) return;
    setSaving(true);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/questions/${selectedQuestion._id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          answer, 
          isAnswered: true,
          answeredAt: new Date()
        })
      });
      
      if (response.ok) {
        const updated = { ...selectedQuestion, answer, isAnswered: true, answeredAt: new Date() };
        setQuestions(questions.map(q => q._id === selectedQuestion._id ? updated : q));
        setSelectedQuestion(updated);
      }
    } catch (error) {
      console.error('Failed to save answer:', error);
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (id, isPublished) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ isPublished })
      });
      
      if (response.ok) {
        setQuestions(questions.map(q => q._id === id ? { ...q, isPublished } : q));
        if (selectedQuestion?._id === id) {
          setSelectedQuestion({ ...selectedQuestion, isPublished });
        }
      }
    } catch (error) {
      console.error('Failed to update publish status:', error);
    }
  };

  const deleteQuestion = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/questions/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        setQuestions(questions.filter(q => q._id !== id));
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'answered' && question.isAnswered) ||
                          (statusFilter === 'unanswered' && !question.isAnswered) ||
                          (statusFilter === 'published' && question.isPublished);
    return matchesSearch && matchesStatus;
  });

  const openQuestion = (question) => {
    setSelectedQuestion(question);
    setAnswer(question.answer || '');
    setShowModal(true);
  };

  const categoryColors = {
    medical: 'bg-red-100 text-red-700',
    engineering: 'bg-blue-100 text-blue-700',
    management: 'bg-green-100 text-green-700',
    law: 'bg-purple-100 text-purple-700',
    arts: 'bg-amber-100 text-amber-700',
    other: 'bg-gray-100 text-gray-700'
  };

  return (
    <AdminLayout title="Questions">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          {/* Filter */}
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Questions</option>
              <option value="unanswered">Unanswered</option>
              <option value="answered">Answered</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-red-600" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <FaQuestionCircle className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No questions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Question</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">From</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredQuestions.map((question) => (
                  <tr key={question._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-gray-800 line-clamp-2 max-w-md">{question.question}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">{question.name}</p>
                        <p className="text-sm text-gray-500">{question.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${categoryColors[question.category]}`}>
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full w-fit ${
                          question.isAnswered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {question.isAnswered ? 'Answered' : 'Pending'}
                        </span>
                        {question.isPublished && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700 w-fit">
                            Published
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openQuestion(question)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View & Answer"
                        >
                          <FaReply />
                        </button>
                        <button
                          onClick={() => deleteQuestion(question._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Answer Modal */}
      {showModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">Question Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">From</label>
                  <p className="font-medium text-gray-800">{selectedQuestion.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Category</label>
                  <p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${categoryColors[selectedQuestion.category]}`}>
                      {selectedQuestion.category}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium text-gray-800 flex items-center gap-2">
                    <FaEnvelope className="text-gray-400" />
                    <a href={`mailto:${selectedQuestion.email}`} className="text-blue-600 hover:underline">
                      {selectedQuestion.email}
                    </a>
                  </p>
                </div>
                {selectedQuestion.phone && (
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                      <FaPhone className="text-gray-400" />
                      <a href={`tel:${selectedQuestion.phone}`} className="text-blue-600 hover:underline">
                        {selectedQuestion.phone}
                      </a>
                    </p>
                  </div>
                )}
              </div>
              
              {/* Question */}
              <div>
                <label className="text-sm text-gray-500">Question</label>
                <p className="text-gray-800 bg-gray-50 p-4 rounded-lg">{selectedQuestion.question}</p>
              </div>
              
              {/* Answer */}
              <div>
                <label className="text-sm text-gray-500 mb-2 block">Your Answer</label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Type your answer here..."
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={saveAnswer}
                    disabled={saving || !answer.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? <FaSpinner className="animate-spin" /> : <FaCheck />}
                    Save Answer
                  </button>
                </div>
              </div>
              
              {/* Publish Toggle */}
              {selectedQuestion.isAnswered && (
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Publish to FAQ</p>
                    <p className="text-sm text-gray-500">Make this Q&A visible on the website</p>
                  </div>
                  <button
                    onClick={() => togglePublish(selectedQuestion._id, !selectedQuestion.isPublished)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      selectedQuestion.isPublished
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <FaGlobe />
                    {selectedQuestion.isPublished ? 'Published' : 'Publish'}
                  </button>
                </div>
              )}
              
              <div>
                <label className="text-sm text-gray-500">Received On</label>
                <p className="text-gray-600">
                  {new Date(selectedQuestion.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
