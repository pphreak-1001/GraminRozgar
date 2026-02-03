import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, Briefcase, Bell } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

function WorkerDashboard({ user, onLogout }) {
  const { t } = useTranslation();
  const [matches, setMatches] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const [matchesRes, notificationsRes] = await Promise.all([
        axios.get(`${API_URL}/workers/matches`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setMatches(matchesRes.data);
      setNotifications(notificationsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
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
      <header className="bg-gradient-to-r from-saffron to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold" data-testid="worker-dashboard-title">{t('welcomeWorker')}, {user.name}! 🙏</h1>
              <p className="text-white/90">{t('workerDashboard')}</p>
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
        {/* Job Matches */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Briefcase className="w-8 h-8 text-saffron" />
            <h2 className="text-2xl font-bold text-gray-900">Matched Jobs for You</h2>
          </div>

          {matches.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No job matches yet. We'll notify you when we find suitable work!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matches.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 border-2 border-green-200 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.job.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                      {Math.round(item.match.match_score)}% Match
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{item.job.description}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 {item.job.village}, {item.job.district}, {item.job.state}</p>
                    <p className="font-bold text-green-600">💰 ₹{item.job.daily_wage_offered}/day</p>
                    <p>📞 Contact: {item.job.contact_number}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notifications */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-8 h-8 text-saffron" />
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-600">No notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-saffron">
                  <p className="text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notif.sent_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default WorkerDashboard;
