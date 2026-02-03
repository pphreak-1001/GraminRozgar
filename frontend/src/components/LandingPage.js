import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Briefcase, Target, MessageSquare, Mic, FileText } from 'lucide-react';
import AuthModal from './AuthModal';
import ChatbotSignup from './ChatbotSignup';
import AudioSignup from './AudioSignup';

function LandingPage({ onLogin }) {
  const { t } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showAudioSignup, setShowAudioSignup] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Indian Heritage Design */}
      <section className="relative bg-gradient-to-br from-saffron via-heritage-orange to-heritage-green heritage-pattern min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border-4 border-white">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6" data-testid="hero-title">
              {t('heroTitle')}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-semibold">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowAuthModal(true)}
                data-testid="get-started-button"
                className="bg-heritage-green hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {t('getStarted')}
              </button>
            </div>

            {/* Toll-Free Number */}
            <div className="mt-8 p-4 bg-indigo/10 rounded-xl">
              <p className="text-gray-700 font-medium">
                📞 Toll-Free Helpline: <span className="text-2xl font-bold text-indigo">1800-ROZGAR</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">Call for audio-based registration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Signup Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4" data-testid="signup-methods-title">
            {t('signupTitle')}
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Choose the method that works best for you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Normal Signup */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-heritage-green">
              <div className="w-16 h-16 bg-heritage-green rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                {t('signupNormal')}
              </h3>
              <p className="text-center text-gray-700 mb-6">
                {t('signupNormalDesc')}
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                data-testid="normal-signup-button"
                className="w-full bg-heritage-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                {t('register')}
              </button>
            </div>

            {/* Chatbot Signup */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-saffron">
              <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                {t('signupChatbot')}
              </h3>
              <p className="text-center text-gray-700 mb-6">
                {t('signupChatbotDesc')}
              </p>
              <button
                onClick={() => setShowChatbot(true)}
                data-testid="chatbot-signup-button"
                className="w-full bg-saffron hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                {t('getStarted')}
              </button>
            </div>

            {/* Audio Signup */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-indigo">
              <div className="w-16 h-16 bg-indigo rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
                {t('signupAudio')}
              </h3>
              <p className="text-center text-gray-700 mb-6">
                {t('signupAudioDesc')}
              </p>
              <button
                onClick={() => setShowAudioSignup(true)}
                data-testid="audio-signup-button"
                className="w-full bg-indigo hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                {t('getStarted')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t('features')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('featureWorker')}
              </h3>
              <p className="text-gray-700 text-lg">
                {t('featureWorkerDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-saffron to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('featureEmployer')}
              </h3>
              <p className="text-gray-700 text-lg">
                {t('featureEmployerDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('featureMatching')}
              </h3>
              <p className="text-gray-700 text-lg">
                {t('featureMatchingDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">{t('appName')}</h3>
            <p className="text-gray-400 mb-6">{t('tagline')}</p>
            <div className="flex justify-center space-x-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t('aboutUs')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t('contact')}
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                {t('helpline')}
              </a>
            </div>
            <div className="mt-8 text-gray-500 text-sm">
              © 2025 GraminRozgar. Made with ❤️ for Rural India.
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
    </div>
  );
}

export default LandingPage;
