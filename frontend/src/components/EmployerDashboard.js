import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Plus, Users, Briefcase } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

function EmployerDashboard({ user, onLogout }) {
  const { t } = useTranslation();
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobMatches, setJobMatches] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    job_type: 'Labour',
    description: '',
    village: '',
    district: '',
    state: '',
    daily_wage_offered: '',
    contact_number: '',
    required_skills: ''
  });

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_URL}/jobs/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const jobData = {
        ...formData,
        daily_wage_offered: parseInt(formData.daily_wage_offered),
        required_skills: formData.required_skills.split(',').map(s => s.trim()).filter(Boolean)
      };

      await axios.post(`${API_URL}/jobs`, jobData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Job posted successfully!');
      setShowJobForm(false);
      setFormData({
        title: '',
        job_type: 'Labour',
        description: '',
        village: '',
        district: '',
        state: '',
        daily_wage_offered: '',
        contact_number: '',
        required_skills: ''
      });
      fetchMyJobs();
    } catch (error) {
      alert('Failed to post job. Please try again.');
    }
  };

  const viewMatches = async (job) => {
    setSelectedJob(job);
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.get(`${API_URL}/jobs/${job.job_id}/matches`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-saffron"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" data-testid="employer-dashboard-title">{t('welcomeEmployer')}, {user.name}! 👋</h1>
              <p className="text-white/90">{t('employerDashboard')}</p>
            </div>
            <button
              onClick={onLogout}
              data-testid="logout-button"
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Job Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowJobForm(true)}
            data-testid="post-job-button"
            className="flex items-center space-x-2 bg-gradient-to-r from-saffron to-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>{t('postJob')}</span>
          </button>
        </div>

        {/* My Jobs */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="w-8 h-8 text-indigo" />
            <h2 className="text-2xl font-bold text-gray-900">{t('myJobs')}</h2>
          </div>

          {myJobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">{t('noJobsPosted')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myJobs.map((job, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 border-2 border-indigo/20 hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-700 mb-3">{job.description}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📍 {job.village}, {job.district}, {job.state}</p>
                    <p className="font-bold text-green-600">💰 ₹{job.daily_wage_offered}{t('perDay')}</p>
                    <p>📞 {job.contact_number}</p>
                    <p className="bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                      {job.match_count} {t('workerMatches')}
                    </p>
                  </div>
                  <button
                    onClick={() => viewMatches(job)}
                    data-testid={`view-matches-button-${idx}`}
                    className="w-full bg-indigo text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-800 transition-all"
                  >
                    {t('viewMatchedWorkers')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Post Job Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowJobForm(false)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('postJob')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    data-testid="input-job-title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                  <select
                    name="job_type"
                    value={formData.job_type}
                    onChange={handleInputChange}
                    data-testid="select-job-type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  >
                    <option value="Mason">{t('mason')}</option>
                    <option value="Labour">{t('labour')}</option>
                    <option value="Plumber">{t('plumber')}</option>
                    <option value="Electrician">{t('electrician')}</option>
                    <option value="Painter">{t('painter')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    data-testid="input-job-description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village *</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      required
                      data-testid="input-job-village"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      required
                      data-testid="input-job-district"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    data-testid="input-job-state"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Daily Wage Offered (₹) *</label>
                  <input
                    type="number"
                    name="daily_wage_offered"
                    value={formData.daily_wage_offered}
                    onChange={handleInputChange}
                    required
                    data-testid="input-job-wage"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    required
                    data-testid="input-job-contact"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma-separated)</label>
                  <input
                    type="text"
                    name="required_skills"
                    value={formData.required_skills}
                    onChange={handleInputChange}
                    placeholder="e.g., Masonry, Brick laying"
                    data-testid="input-job-skills"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    data-testid="submit-job-form"
                    className="flex-1 bg-indigo text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-800 transition-all"
                  >
                    Post Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Job Matches Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedJob(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-8 h-8 text-indigo" />
                <h2 className="text-2xl font-bold text-gray-900">Matched Workers for: {selectedJob.title}</h2>
              </div>

              {jobMatches.length === 0 ? (
                <p className="text-center text-gray-600 py-8">No worker matches yet. The matching engine runs every 5 minutes.</p>
              ) : (
                <div className="space-y-4">
                  {jobMatches.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 border-2 border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{item.worker.name}</h3>
                          <p className="text-sm text-gray-600">{item.worker.job_type}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                          {Math.round(item.match.match_score)}% Match
                        </span>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>📍 {item.worker.area}, {item.worker.district}, {item.worker.state}</p>
                        <p>💰 Expected Wage: ₹{item.worker.expected_daily_wage}/day</p>
                        <p className="font-bold text-indigo">📞 {item.worker.phone_number}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedJob(null)}
                className="mt-6 w-full bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployerDashboard;
