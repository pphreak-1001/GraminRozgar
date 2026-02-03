# GraminRozgar - Product Requirements Document

## Original Problem Statement
Build a digital employment platform for daily wage workers in India called "GraminRozgar" with the following key requirements:

1. **Multilingual Platform**: Support all major Indian languages with language selection on first interaction
2. **Multiple Signup Methods**:
   - Chatbot Signup: Conversational, voice-friendly questions in chosen language
   - Audio Signup: Speech-to-text for users to speak their answers
   - Normal Signup: Standard form-based registration
3. **Job Posting**: Simple panel for employers to post jobs
4. **Smart Matching Engine**: Backend cron job to match workers with jobs
5. **Notifications**: SMS and/or voice call alerts to matched workers
6. **UI/UX**: "Desi, Warm, Trustworthy" design with Indian heritage color palette

## Technology Stack
- **Backend**: FastAPI (Python), MongoDB
- **Frontend**: React with i18next for internationalization
- **AI/LLM**: OpenAI GPT-5.2 (via Emergent LLM Key) for chatbot and translations
- **Speech-to-Text**: OpenAI Whisper (via Emergent LLM Key)
- **Process Management**: Supervisor

## Core Features

### Completed Features ✅

#### 1. Multilingual Support (December 2025)
- Full support for 13 Indian languages: Hindi, English, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu
- Language selector with flag icons in top-right corner
- Dynamic UI translation using i18next
- Backend chatbot responds in selected language

#### 2. Chatbot Signup (December 2025)
- Conversational registration flow
- Language-aware greetings and questions
- Step-by-step data collection: name, area, district, state, job type, wage, phone
- Session management for conversation state
- Complete registration endpoint creates user account and worker profile

#### 3. Audio Signup (December 2025)
- Real microphone recording using MediaRecorder API
- OpenAI Whisper integration for speech-to-text transcription
- AI-powered parsing to extract registration details from transcribed text
- Support for all Indian languages in transcription
- Automatic user registration from audio data

#### 4. Normal Signup (December 2025)
- Standard form-based registration
- Role selection (Worker/Employer)
- JWT-based authentication
- Worker profile creation

#### 5. Job Posting System (December 2025)
- Employers can post jobs with title, description, location, wage
- Job listing display
- Contact number for workers to call

#### 6. Smart Matching Engine (December 2025)
- APScheduler-based cron job (runs every 5 minutes)
- Location-based matching (district/state)
- Job type matching
- Wage compatibility scoring
- Match score calculation (0-100%)

#### 7. Notification System (December 2025)
- Multilingual notification templates
- Mock SMS notifications stored in database
- Notification display on worker dashboard

#### 8. Indian Heritage UI/UX (December 2025)
- Saffron, orange, green color palette
- Mandala pattern overlays
- Premium cards with shadows and gradients
- Responsive design
- Indian worker imagery

### Pending Features 🔄

#### P1 - High Priority
1. **Real SMS/Voice Notifications**: Integrate Twilio or similar service for actual SMS/voice calls
2. **Database Content Translation**: Real-time translation of job titles/descriptions on dashboards

#### P2 - Medium Priority
1. **Location-based Filtering**: Filter jobs by GPS or user location
2. **Toll-Free Number Integration**: IVR-based registration

#### P3 - Future Enhancements
1. **Payment Integration**: For premium job postings
2. **Rating System**: Worker/employer ratings
3. **Job Application Tracking**: Track job applications
4. **Admin Dashboard**: Platform management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Workers
- `POST /api/workers/profile` - Create worker profile
- `GET /api/workers/profile` - Get worker profile
- `GET /api/workers/matches` - Get job matches (with translations)

### Jobs
- `POST /api/jobs` - Create job (employer only)
- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs/my-jobs` - Get employer's jobs
- `GET /api/jobs/{job_id}/matches` - Get worker matches for job

### Chatbot
- `POST /api/chatbot/conversation` - Handle chatbot conversation
- `POST /api/chatbot/complete-registration` - Complete registration from chatbot

### Audio
- `POST /api/audio/transcribe` - Transcribe audio to text
- `POST /api/audio/parse-registration` - Parse registration data from text

### Notifications
- `GET /api/notifications` - Get user notifications

## Database Schema

### Users Collection
```json
{
  "user_id": "uuid",
  "name": "string",
  "phone_number": "string",
  "password": "hashed",
  "role": "worker|employer",
  "language": "hi|en|bn|te|mr|ta|gu|kn|ml|pa|or|as|ur",
  "created_at": "datetime"
}
```

### Workers Collection
```json
{
  "worker_id": "uuid",
  "user_id": "uuid",
  "name": "string",
  "phone_number": "string",
  "area": "string",
  "district": "string",
  "state": "string",
  "job_type": "Mason|Labour|Plumber|Electrician|Painter",
  "expected_daily_wage": "number",
  "skills": ["array"],
  "language": "string",
  "created_at": "datetime"
}
```

### Jobs Collection
```json
{
  "job_id": "uuid",
  "employer_id": "uuid",
  "title": "string",
  "job_type": "string",
  "description": "string",
  "village": "string",
  "district": "string",
  "state": "string",
  "daily_wage_offered": "number",
  "contact_number": "string",
  "required_skills": ["array"],
  "status": "active|inactive",
  "created_at": "datetime"
}
```

### Matches Collection
```json
{
  "match_id": "uuid",
  "job_id": "uuid",
  "worker_id": "uuid",
  "match_score": "number (0-100)",
  "status": "pending|accepted|rejected",
  "created_at": "datetime"
}
```

## File Structure
```
/app/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   ├── server.py
│   └── tests/
│       └── test_multilingual_api.py
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── i18n.js
│       ├── index.css
│       └── components/
│           ├── AudioSignup.js
│           ├── AuthModal.js
│           ├── ChatbotSignup.js
│           ├── EmployerDashboard.js
│           ├── LandingPage.js
│           ├── LanguageSelector.js
│           └── WorkerDashboard.js
└── memory/
    └── PRD.md
```

## Testing Status
- Backend tests: 17/17 passed (100%)
- Frontend tests: 5/5 passed (100%)
- Test report: `/app/test_reports/iteration_1.json`

## Known Issues Resolved
1. ✅ Chatbot showing English in non-English modes - Fixed by passing language to API
2. ✅ Audio signup was mock - Implemented real OpenAI Whisper integration
3. ✅ Missing useEffect import in ChatbotSignup.js - Fixed
4. ✅ Incomplete translations - Added full translations for en, hi, bn
