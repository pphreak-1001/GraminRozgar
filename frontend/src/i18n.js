import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources for major Indian languages
const resources = {
  en: {
    translation: {
      appName: "GraminRozgar",
      tagline: "Employment at Your Doorstep",
      subtitle: "Connecting daily wage workers with local opportunities across India",
      
      // Navigation
      home: "Home",
      findWork: "Find Work",
      postJob: "Post Job",
      login: "Login",
      register: "Register",
      logout: "Logout",
      myProfile: "My Profile",
      myJobs: "My Jobs",
      
      // Hero
      heroTitle: "Work Near You, Fair Wage for You",
      heroSubtitle: "No middlemen. No confusion. Just honest work.",
      getStarted: "Get Started",
      tollFreeText: "Toll-Free Helpline:",
      callForRegistration: "Call for audio-based registration",
      
      // Features
      features: "How It Works",
      featureWorker: "For Workers",
      featureWorkerDesc: "Sign up in your language, find work nearby, get fair wages",
      featureEmployer: "For Employers",
      featureEmployerDesc: "Post jobs, find skilled workers, hire instantly",
      featureMatching: "Smart Matching",
      featureMatchingDesc: "We match workers with jobs based on location, skills & wage",
      
      // Signup methods
      signupTitle: "Three Easy Ways to Sign Up",
      signupChooseMethod: "Choose the method that works best for you",
      signupNormal: "Normal Signup",
      signupNormalDesc: "Fill a simple form",
      signupChatbot: "Chatbot Signup",
      signupChatbotDesc: "Just answer a few questions",
      signupAudio: "Audio Signup",
      signupAudioDesc: "Speak your details",
      
      // Job types
      mason: "Mason",
      labour: "Labour",
      plumber: "Plumber",
      electrician: "Electrician",
      painter: "Painter",
      
      // Common
      name: "Name",
      phoneNumber: "Phone Number",
      password: "Password",
      area: "Area/Village",
      district: "District",
      state: "State",
      jobType: "Type of Work",
      expectedWage: "Expected Daily Wage (₹)",
      description: "Description",
      skills: "Skills",
      submit: "Submit",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      role: "I am a",
      
      // Worker Dashboard
      welcomeWorker: "Namaskar",
      workerDashboard: "Worker Dashboard",
      matchedJobs: "Matched Jobs for You",
      noMatchesYet: "No job matches yet. We'll notify you when we find suitable work!",
      matchScore: "Match",
      perDay: "/day",
      contact: "Contact",
      notifications: "Notifications",
      noNotifications: "No notifications yet.",
      
      // Employer Dashboard
      welcomeEmployer: "Welcome",
      employerDashboard: "Employer Dashboard",
      noJobsPosted: "No jobs posted yet. Post your first job!",
      workerMatches: "worker matches",
      viewMatchedWorkers: "View Matched Workers",
      matchedWorkersFor: "Matched Workers for:",
      noWorkersMatched: "No worker matches yet. The matching engine runs every 5 minutes.",
      expectedWage: "Expected Wage",
      
      // Job Form
      jobTitle: "Job Title",
      dailyWageOffered: "Daily Wage Offered (₹)",
      contactNumber: "Contact Number",
      requiredSkills: "Required Skills (comma-separated)",
      village: "Village",
      postJobSuccess: "Job posted successfully!",
      
      // Auth
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      registerHere: "Register here",
      loginHere: "Login here",
      createAccount: "Create an Account",
      joinUs: "Join us to find your next opportunity",
      welcomeBack: "Welcome back!",
      
      // Messages
      loading: "Loading...",
      success: "Success!",
      error: "Error",
      noResults: "No results found",
      
      // Footer
      aboutUs: "About Us",
      contact: "Contact",
      helpline: "Helpline",
      language: "Language",
      madeWithLove: "Made with ❤️ for Rural India",
      copyright: "© 2025 GraminRozgar. All rights reserved.",
      
      // Chatbot
      conversationalRegistration: "Conversational Registration",
      typeYourAnswer: "Type your answer...",
      allInfoCollected: "All information collected! Click below to complete registration.",
      completeRegistration: "Complete Registration",
      completing: "Completing...",
      
      // Audio
      clickMicAndSpeak: "Click the microphone and speak your details:",
      yourName: "Your name",
      yourVillage: "Your village/area",
      yourDistrict: "Your district and state",
      typeOfWork: "Type of work you do",
      expectedDailyWage: "Expected daily wage",
      phoneNumber: "Phone number",
      recordingSpeakNow: "Recording... Speak now!",
      processingAudio: "Processing audio...",
      demoMode: "DEMO MODE",
      audioTranscriptionDemo: "Audio transcription is currently a mock feature. In production, this would use OpenAI Whisper API to convert your speech to text.",
      useNormalSignup: "Please use the normal signup form to complete registration.",
    }
  },
  hi: {
    translation: {
      appName: "ग्रामीण रोज़गार",
      tagline: "कामकाज आपके पास",
      subtitle: "पूरे भारत में दिहाड़ी मजदूरों को स्थानीय अवसरों से जोड़ना",
      
      home: "होम",
      findWork: "काम खोजें",
      postJob: "काम पोस्ट करें",
      login: "लॉगिन",
      register: "रजिस्टर करें",
      logout: "लॉगआउट",
      myProfile: "मेरी प्रोफाइल",
      myJobs: "मेरे काम",
      
      heroTitle: "पास में काम, सही दाम",
      heroSubtitle: "बिना बिचौलिए। बिना झंझट। सिर्फ ईमानदार काम।",
      getStarted: "शुरू करें",
      tollFreeText: "टोल-फ्री हेल्पलाइन:",
      callForRegistration: "ऑडियो-आधारित पंजीकरण के लिए कॉल करें",
      
      features: "यह कैसे काम करता है",
      featureWorker: "मजदूरों के लिए",
      featureWorkerDesc: "अपनी भाषा में साइन अप करें, पास में काम खोजें, उचित मजदूरी पाएं",
      featureEmployer: "नियोक्ताओं के लिए",
      featureEmployerDesc: "नौकरियां पोस्ट करें, कुशल कर्मचारी खोजें, तुरंत नियुक्त करें",
      featureMatching: "स्मार्ट मैचिंग",
      featureMatchingDesc: "हम स्थान, कौशल और मजदूरी के आधार पर मजदूरों का मिलान करते हैं",
      
      signupTitle: "साइन अप के तीन आसान तरीके",
      signupChooseMethod: "वह तरीका चुनें जो आपके लिए सबसे अच्छा काम करे",
      signupNormal: "सामान्य साइन अप",
      signupNormalDesc: "एक साधारण फॉर्म भरें",
      signupChatbot: "चैटबॉट साइन अप",
      signupChatbotDesc: "बस कुछ सवालों के जवाब दें",
      signupAudio: "ऑडियो साइन अप",
      signupAudioDesc: "अपना विवरण बोलें",
      
      mason: "राजमिस्त्री",
      labour: "मजदूर",
      plumber: "प्लंबर",
      electrician: "बिजली मिस्त्री",
      painter: "पेंटर",
      
      name: "नाम",
      phoneNumber: "फ़ोन नंबर",
      password: "पासवर्ड",
      area: "इलाका/गांव",
      district: "जिला",
      state: "राज्य",
      jobType: "काम का प्रकार",
      expectedWage: "अपेक्षित दैनिक मजदूरी (₹)",
      description: "विवरण",
      skills: "कौशल",
      submit: "जमा करें",
      cancel: "रद्द करें",
      close: "बंद करें",
      save: "सहेजें",
      role: "मैं हूँ",
      
      welcomeWorker: "नमस्ते",
      workerDashboard: "मजदूर डैशबोर्ड",
      matchedJobs: "आपके लिए मिलान किए गए काम",
      noMatchesYet: "अभी तक कोई काम नहीं मिला। जब हमें उपयुक्त काम मिलेगा तो हम आपको सूचित करेंगे!",
      matchScore: "मिलान",
      perDay: "/दिन",
      contact: "संपर्क",
      notifications: "सूचनाएं",
      noNotifications: "अभी तक कोई सूचना नहीं।",
      
      welcomeEmployer: "स्वागत है",
      employerDashboard: "नियोक्ता डैशबोर्ड",
      noJobsPosted: "अभी तक कोई काम पोस्ट नहीं किया गया। अपना पहला काम पोस्ट करें!",
      workerMatches: "मजदूर मिलान",
      viewMatchedWorkers: "मिलान किए गए मजदूर देखें",
      matchedWorkersFor: "मिलान किए गए मजदूर:",
      noWorkersMatched: "अभी तक कोई मजदूर मिलान नहीं हुआ। मैचिंग इंजन हर 5 मिनट में चलता है।",
      
      jobTitle: "काम का शीर्षक",
      dailyWageOffered: "दी जाने वाली दैनिक मजदूरी (₹)",
      contactNumber: "संपर्क नंबर",
      requiredSkills: "आवश्यक कौशल (अल्पविराम से अलग)",
      village: "गांव",
      postJobSuccess: "काम सफलतापूर्वक पोस्ट किया गया!",
      
      dontHaveAccount: "खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
      registerHere: "यहाँ रजिस्टर करें",
      loginHere: "यहाँ लॉगिन करें",
      createAccount: "खाता बनाएं",
      joinUs: "अपना अगला अवसर खोजने के लिए हमसे जुड़ें",
      welcomeBack: "वापस स्वागत है!",
      
      loading: "लोड हो रहा है...",
      success: "सफलता!",
      error: "त्रुटि",
      noResults: "कोई परिणाम नहीं मिला",
      
      aboutUs: "हमारे बारे में",
      contact: "संपर्क करें",
      helpline: "हेल्पलाइन",
      language: "भाषा",
      madeWithLove: "ग्रामीण भारत के लिए ❤️ से बनाया गया",
      copyright: "© 2025 ग्रामीण रोज़गार। सर्वाधिकार सुरक्षित।",
      
      conversationalRegistration: "बातचीत पंजीकरण",
      typeYourAnswer: "अपना उत्तर टाइप करें...",
      allInfoCollected: "सभी जानकारी एकत्र की गई! पंजीकरण पूरा करने के लिए नीचे क्लिक करें।",
      completeRegistration: "पंजीकरण पूरा करें",
      completing: "पूर्ण हो रहा है...",
      
      clickMicAndSpeak: "माइक्रोफोन पर क्लिक करें और अपना विवरण बोलें:",
      yourName: "आपका नाम",
      yourVillage: "आपका गांव/क्षेत्र",
      yourDistrict: "आपका जिला और राज्य",
      typeOfWork: "आप जो काम करते हैं",
      recordingSpeakNow: "रिकॉर्डिंग... अभी बोलें!",
      processingAudio: "ऑडियो प्रोसेसिंग...",
      demoMode: "डेमो मोड",
      audioTranscriptionDemo: "ऑडियो ट्रांसक्रिप्शन वर्तमान में एक मॉक फीचर है। प्रोडक्शन में, यह आपकी आवाज को टेक्स्ट में बदलने के लिए OpenAI Whisper API का उपयोग करेगा।",
      useNormalSignup: "कृपया पंजीकरण पूरा करने के लिए सामान्य साइन अप फॉर्म का उपयोग करें।",
    }
  },
  bn: {
    translation: {
      appName: "গ্রামীণ রোজগার",
      tagline: "আপনার দোরগোড়ায় কাজ",
      subtitle: "ভারত জুড়ে দৈনিক মজুরি শ্রমিকদের স্থানীয় সুযোগের সাথে সংযুক্ত করা",
      heroTitle: "আপনার কাছে কাজ, আপনার জন্য ন্যায্য মজুরি",
      heroSubtitle: "কোন মধ্যস্থতাকারী নেই। কোন বিভ্রান্তি নেই। শুধু সৎ কাজ।",
      getStarted: "শুরু করুন",
      mason: "রাজমিস্ত্রি",
      labour: "শ্রমিক",
      plumber: "প্লাম্বার",
      electrician: "ইলেকট্রিশিয়ান",
      painter: "পেইন্টার",
    }
  },
  te: {
    translation: {
      appName: "గ్రామీణ రోజ్‌గార్",
      tagline: "మీ ఇంటి వద్ద ఉద్యోగం",
      subtitle: "భారతదేశం అంతటా రోజువారీ కూలీ కార్మికులను స్థానిక అవకాశాలతో కలుపుతోంది",
      heroTitle: "మీ దగ్గర పని, మీకు న్యాయమైన వేతనం",
      heroSubtitle: "మధ్యవర్తులు లేరు। గందరగోళం లేదు। నిజాయితీగా పని మాత్రమే।",
      getStarted: "ప్రారంభించండి",
      mason: "మేస్త్రీ",
      labour: "కూలీ",
      plumber: "ప్లంబర్",
      electrician: "ఎలక్ట్రీషియన్",
      painter: "పెయింటర్",
    }
  },
  mr: {
    translation: {
      appName: "ग्रामीण रोजगार",
      tagline: "कामकाज तुमच्या जवळ",
      subtitle: "संपूर्ण भारतातील दैनिक मजुरांना स्थानिक संधींशी जोडणे",
      heroTitle: "जवळ काम, योग्य दाम",
      heroSubtitle: "मध्यस्थ नाहीत। गोंधळ नाही। फक्त प्रामाणिक काम।",
      getStarted: "सुरू करा",
      mason: "बांधकाम कामगार",
      labour: "मजूर",
      plumber: "प्लंबर",
      electrician: "इलेक्ट्रिशियन",
      painter: "पेंटर",
    }
  },
  ta: {
    translation: {
      appName: "கிராமீண் ரோஸ்கார்",
      tagline: "உங்கள் வீட்டில் வேலை",
      subtitle: "இந்தியா முழுவதும் தினசரி கூலி தொழிலாளர்களை உள்ளூர் வாய்ப்புகளுடன் இணைக்கிறது",
      heroTitle: "உங்களுக்கு அருகில் வேலை, உங்களுக்கு நியாயமான ஊதியம்",
      heroSubtitle: "இடைத்தரகர்கள் இல்லை. குழப்பம் இல்லை. நேர்மையான வேலை மட்டும்.",
      getStarted: "தொடங்குங்கள்",
      mason: "கொத்தனார்",
      labour: "கூலி",
      plumber: "பிளம்பர்",
      electrician: "எலக்ட்ரீஷியன்",
      painter: "பெயிண்டர்",
    }
  },
  gu: {
    translation: {
      appName: "ગ્રામીણ રોજગાર",
      tagline: "તમારા ઘરે કામ",
      subtitle: "સમગ્ર ભારતમાં દૈનિક મજૂરોને સ્થાનિક તકો સાથે જોડવું",
      heroTitle: "નજીકમાં કામ, યોગ્ય કિંમત",
      heroSubtitle: "કોઈ દલાલો નહીં. કોઈ ગૂંચવણ નહીં. માત્ર પ્રામાણિક કામ.",
      getStarted: "શરૂ કરો",
      mason: "મિસ્ત્રી",
      labour: "મજૂર",
      plumber: "પ્લમ્બર",
      electrician: "ઇલેક્ટ્રિશિયન",
      painter: "પેઇન્ટર",
    }
  },
  kn: {
    translation: {
      appName: "ಗ್ರಾಮೀಣ ರೋಜ್‌ಗಾರ್",
      tagline: "ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಲ್ಲಿ ಕೆಲಸ",
      subtitle: "ಭಾರತದಾದ್ಯಂತ ದೈನಂದಿನ ಕೂಲಿ ಕಾರ್ಮಿಕರನ್ನು ಸ್ಥಳೀಯ ಅವಕಾಶಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು",
      heroTitle: "ಹತ್ತಿರ ಕೆಲಸ, ನ್ಯಾಯಯುತ ವೇತನ",
      heroSubtitle: "ಯಾವುದೇ ಮಧ್ಯವರ್ತಿಗಳಿಲ್ಲ. ಗೊಂದಲವಿಲ್ಲ. ಕೇವಲ ಪ್ರಾಮಾಣಿಕ ಕೆಲಸ.",
      getStarted: "ಪ್ರಾರಂಭಿಸಿ",
      mason: "ಮೇಸ್ತ್ರಿ",
      labour: "ಕೂಲಿ",
      plumber: "ಪ್ಲಂಬರ್",
      electrician: "ಎಲೆಕ್ಟ್ರೀಷಿಯನ್",
      painter: "ಪೇಂಟರ್",
    }
  },
  ml: {
    translation: {
      appName: "ഗ്രാമീണ് റോസ്‌ഗാർ",
      tagline: "നിങ്ങളുടെ വാതിൽപ്പടിയിൽ തൊഴിൽ",
      subtitle: "ഇന്ത്യയിലുടനീളം ദിവസവേതന തൊഴിലാളികളെ പ്രാദേശിക അവസരങ്ങളുമായി ബന്ധിപ്പിക്കുന്നു",
      heroTitle: "അടുത്ത് ജോലി, ന്യായമായ വേതനം",
      heroSubtitle: "ഇടനിലക്കാരില്ല. ആശയക്കുഴപ്പമില്ല. സത്യസന്ധമായ ജോലി മാത്രം.",
      getStarted: "ആരംഭിക്കുക",
      mason: "മേസ്ത്രി",
      labour: "തൊഴിലാളി",
      plumber: "പ്ലംബർ",
      electrician: "ഇലക്ട്രീഷ്യൻ",
      painter: "പെയിന്റർ",
    }
  },
  pa: {
    translation: {
      appName: "ਗ੍ਰਾਮੀਣ ਰੋਜ਼ਗਾਰ",
      tagline: "ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ 'ਤੇ ਕੰਮ",
      subtitle: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਰੋਜ਼ਾਨਾ ਮਜ਼ਦੂਰੀ ਕਰਨ ਵਾਲੇ ਮਜ਼ਦੂਰਾਂ ਨੂੰ ਸਥਾਨਕ ਮੌਕਿਆਂ ਨਾਲ ਜੋੜਨਾ",
      heroTitle: "ਨੇੜੇ ਕੰਮ, ਸਹੀ ਮਜ਼ਦੂਰੀ",
      heroSubtitle: "ਕੋਈ ਵਿਚੋਲੇ ਨਹੀਂ। ਕੋਈ ਉਲਝਣ ਨਹੀਂ। ਸਿਰਫ਼ ਇਮਾਨਦਾਰ ਕੰਮ।",
      getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
      mason: "ਰਾਜ ਮਿਸਤਰੀ",
      labour: "ਮਜ਼ਦੂਰ",
      plumber: "ਪਲੰਬਰ",
      electrician: "ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ",
      painter: "ਪੇਂਟਰ",
    }
  },
  or: {
    translation: {
      appName: "ଗ୍ରାମୀଣ ରୋଜଗାର",
      tagline: "ଆପଣଙ୍କ ଦ୍ୱାରରେ ନିଯୁକ୍ତି",
      subtitle: "ସମଗ୍ର ଭାରତରେ ଦୈନିକ ମଜୁରୀ କର୍ମଚାରୀମାନଙ୍କୁ ସ୍ଥାନୀୟ ସୁଯୋଗ ସହିତ ସଂଯୋଗ କରିବା",
      heroTitle: "ନିକଟରେ କାମ, ଉଚିତ ମଜୁରୀ",
      getStarted: "ଆରମ୍ଭ କରନ୍ତୁ",
    }
  },
  as: {
    translation: {
      appName: "গ্ৰামীণ ৰোজগাৰ",
      tagline: "আপোনাৰ দুৱাৰমুখত নিয়োগ",
      subtitle: "সমগ্ৰ ভাৰতত দৈনিক মজুৰি শ্ৰমিকসকলক স্থানীয় সুযোগৰ সৈতে সংযোগ কৰা",
      heroTitle: "ওচৰত কাম, ন্যায্য মজুৰি",
      getStarted: "আৰম্ভ কৰক",
    }
  },
  ur: {
    translation: {
      appName: "گرامین روزگار",
      tagline: "آپ کے دروازے پر روزگار",
      subtitle: "پورے بھارت میں یومیہ مزدوری کرنے والوں کو مقامی مواقع سے جوڑنا",
      heroTitle: "قریب کام، مناسب مزدوری",
      heroSubtitle: "کوئی بیچوالا نہیں۔ کوئی الجھن نہیں۔ صرف ایمانداری سے کام۔",
      getStarted: "شروع کریں",
      mason: "مستری",
      labour: "مزدور",
      plumber: "پلمبر",
      electrician: "بجلی کا کاریگر",
      painter: "پینٹر",
    }
  },
  // Add more languages as needed
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi', // Default to Hindi
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
