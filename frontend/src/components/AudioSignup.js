import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Mic, Square } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001/api';

function AudioSignup({ onClose, onSuccess }) {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    // Mock recording simulation
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setLoading(true);

    try {
      // Mock audio transcription (in production, would send actual audio file)
      const response = await axios.post(`${API_URL}/audio/transcribe`, {
        language: 'hi'
      });
      setTranscription(response.data.transcribed_text);
    } catch (error) {
      alert('Transcription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">{t('signupAudio')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="mb-8">
            <p className="text-gray-700 mb-4 font-medium text-lg">
              {t('clickMicAndSpeak')}
            </p>
            <ul className="text-left text-gray-600 space-y-2 mb-6 max-w-md mx-auto">
              <li>• {t('yourName')}</li>
              <li>• {t('yourVillage')}</li>
              <li>• {t('yourDistrict')}</li>
              <li>• {t('typeOfWork')}</li>
              <li>• {t('expectedDailyWage')}</li>
              <li>• {t('phoneNumber')}</li>
            </ul>
          </div>

          {!isRecording && !transcription && (
            <button
              onClick={startRecording}
              data-testid="start-recording-button"
              className="w-32 h-32 bg-gradient-to-br from-indigo to-purple-600 rounded-full flex items-center justify-center mx-auto hover:scale-105 transition-all shadow-2xl"
            >
              <Mic className="w-16 h-16 text-white" />
            </button>
          )}

          {isRecording && (
            <div className="space-y-4">
              <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Square className="w-16 h-16 text-white" />
              </div>
              <p className="text-red-600 font-bold">Recording... Speak now!</p>
            </div>
          )}

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing audio...</p>
            </div>
          )}

          {transcription && (
            <div className="mt-6">
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                <p className="font-medium text-gray-800">{transcription}</p>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  ⚠️ <strong>DEMO MODE:</strong> Audio transcription is currently a mock feature. 
                  In production, this would use OpenAI Whisper API to convert your speech to text.
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please use the normal signup form to complete registration.
              </p>
              <button
                onClick={onClose}
                className="bg-indigo text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-800 transition-all"
              >
                {t('close')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AudioSignup;
