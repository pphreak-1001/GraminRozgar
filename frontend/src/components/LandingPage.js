import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Briefcase, Target, MessageSquare, Mic, FileText, Phone } from 'lucide-react';
import AuthModal from './AuthModal';
import ChatbotSignup from './ChatbotSignup';
import AudioSignup from './AudioSignup';

function LandingPage({ onLogin }) {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAudioSignup, setShowAudioSignup] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Taj Mahal and Indian Motifs */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-saffron/10 via-white to-heritage-green/10">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9933' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Taj Mahal SVG Illustration */}
        <div className="absolute top-20 right-10 w-64 h-64 opacity-10 animate-float hidden lg:block">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Taj Mahal Dome */}
            <ellipse cx="100" cy="60" rx="40" ry="30" fill="#FF9933" opacity="0.3"/>
            <path d="M 100 30 Q 85 60, 100 60 Q 115 60, 100 30" fill="#138808" opacity="0.4"/>
            
            {/* Main Structure */}
            <rect x="70" y="60" width="60" height="80" fill="#FF9933" opacity="0.3"/>
            <rect x="75" y="65" width="50" height="70" fill="white" opacity="0.5"/>
            
            {/* Minarets */}
            <rect x="50" y="80" width="15" height="60" fill="#FF9933" opacity="0.3"/>
            <ellipse cx="57.5" cy="75" rx="10" ry="8" fill="#138808" opacity="0.4"/>
            <rect x="135" y="80" width="15" height="60" fill="#FF9933" opacity="0.3"/>
            <ellipse cx="142.5" cy="75" rx="10" ry="8" fill="#138808" opacity="0.4"/>
            
            {/* Decorative Arches */}
            <path d="M 85 90 Q 100 75, 115 90" fill="none" stroke="#138808" strokeWidth="2" opacity="0.5"/>
            <path d="M 85 110 Q 100 95, 115 110" fill="none" stroke="#138808" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>

        {/* Mandala Pattern Bottom Right */}
        <div className="absolute bottom-10 right-0 w-96 h-96 opacity-5 hidden lg:block">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(100,100)">
              {[...Array(12)].map((_, i) => (
                <g key={i} transform={`rotate(${i * 30})`}>
                  <circle cx="0" cy="-60" r="15" fill="#FF9933" opacity="0.6"/>
                  <circle cx="0" cy="-40" r="10" fill="#138808" opacity="0.6"/>
                  <path d="M 0 -70 L -8 -85 L 8 -85 Z" fill="#000080" opacity="0.4"/>
                </g>
              ))}
            </g>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            {/* Animated Title with Indian Flag Colors */}
            <div className="mb-8 inline-block">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="h-1 w-16 bg-saffron animate-pulse"></div>
                <div className="h-1 w-16 bg-white"></div>
                <div className="h-1 w-16 bg-heritage-green animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-saffron via-heritage-orange to-heritage-green bg-clip-text text-transparent animate-gradient" 
                  data-testid="hero-title"
                  style={{
                    backgroundSize: '200% auto',
                    animation: 'gradient 3s ease infinite'
                  }}>
                {t('heroTitle')}
              </h1>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="h-1 w-16 bg-heritage-green animate-pulse"></div>
                <div className="h-1 w-16 bg-white"></div>
                <div className="h-1 w-16 bg-saffron animate-pulse"></div>
              </div>
            </div>

            <p className="text-2xl md:text-4xl text-gray-800 mb-4 font-bold">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
            
            <button
              onClick={() => setShowAuthModal(true)}
              data-testid="get-started-button"
              className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-saffron via-orange-500 to-heritage-orange rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-heritage-green to-heritage-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center space-x-3">
                <span>{t('getStarted')}</span>
                <span className="text-2xl">🚀</span>
              </span>
            </button>

            {/* Toll-Free with Indian Phone Icon */}
            <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-saffron/20 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <Phone className="w-6 h-6 text-saffron animate-pulse" />
                <p className="text-gray-800 font-bold text-lg">{t('tollFreeText')}</p>
              </div>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-saffron to-heritage-green">
                1800-ROZGAR
              </p>
              <p className="text-sm text-gray-600 mt-2">{t('callForRegistration')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Signup Methods with Premium Design */}
      <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" data-testid="signup-methods-title">
              <span className="bg-gradient-to-r from-saffron to-heritage-green bg-clip-text text-transparent">
                {t('signupTitle')}
              </span>
            </h2>
            <p className="text-xl text-gray-600">{t('signupChooseMethod')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Normal Signup Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-heritage-green/20 hover:border-heritage-green transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-heritage-green to-green-600"></div>
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-heritage-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                  {t('signupNormal')}
                </h3>
                <p className="text-center text-gray-700 mb-6 text-lg">
                  {t('signupNormalDesc')}
                </p>
                <button
                  onClick={() => setShowAuthModal(true)}
                  data-testid="normal-signup-button"
                  className="w-full bg-gradient-to-r from-heritage-green to-green-600 hover:from-green-600 hover:to-heritage-green text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t('register')}
                </button>
              </div>
            </div>

            {/* Chatbot Signup Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-saffron/20 hover:border-saffron transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron to-orange-600"></div>
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-saffron to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                  {t('signupChatbot')}
                </h3>
                <p className="text-center text-gray-700 mb-6 text-lg">
                  {t('signupChatbotDesc')}
                </p>
                <button
                  onClick={() => setShowChatbot(true)}
                  data-testid="chatbot-signup-button"
                  className="w-full bg-gradient-to-r from-saffron to-orange-600 hover:from-orange-600 hover:to-saffron text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t('getStarted')}
                </button>
              </div>
            </div>

            {/* Audio Signup Card */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-4 border-indigo/20 hover:border-indigo transform hover:-translate-y-2">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo to-purple-600"></div>
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Mic className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                  {t('signupAudio')}
                </h3>
                <p className="text-center text-gray-700 mb-6 text-lg">
                  {t('signupAudioDesc')}
                </p>
                <button
                  onClick={() => setShowAudioSignup(true)}
                  data-testid="audio-signup-button"
                  className="w-full bg-gradient-to-r from-indigo to-purple-600 hover:from-purple-600 hover:to-indigo text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                >
                  {t('getStarted')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Premium Icons */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-saffron rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-heritage-green rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20">
            <span className="bg-gradient-to-r from-saffron via-orange-400 to-heritage-green bg-clip-text text-transparent">
              {t('features')}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('featureWorker')}</h3>
              <p className="text-gray-300 text-lg">{t('featureWorkerDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-saffron to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <Briefcase className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('featureEmployer')}</h3>
              <p className="text-gray-300 text-lg">{t('featureEmployerDesc')}</p>
            </div>

            <div className="text-center group">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                <Target className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t('featureMatching')}</h3>
              <p className="text-gray-300 text-lg">{t('featureMatchingDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Indian Flag Colors */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-12 border-t-4 border-saffron">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-saffron via-white to-heritage-green bg-clip-text text-transparent">
              {t('appName')}
            </h3>
            <p className="text-xl text-gray-400 mb-8">{t('tagline')}</p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors text-lg font-medium">
                {t('aboutUs')}
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors text-lg font-medium">
                {t('contact')}
              </a>
              <a href="#" className="text-gray-400 hover:text-saffron transition-colors text-lg font-medium">
                {t('helpline')}
              </a>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-500 mb-2">{t('madeWithLove')}</p>
              <p className="text-gray-600 text-sm">{t('copyright')}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            onLogin();
          }}
        />
      )}

      {showChatbot && (
        <ChatbotSignup
          onClose={() => setShowChatbot(false)}
          onSuccess={() => {
            setShowChatbot(false);
            onLogin();
          }}
        />
      )}

      {showAudioSignup && (
        <AudioSignup
          onClose={() => setShowAudioSignup(false)}
          onSuccess={() => {
            setShowAudioSignup(false);
            onLogin();
          }}
        />
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
