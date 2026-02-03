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
      
      features: "यह कैसे काम करता है",
      featureWorker: "मजदूरों के लिए",
      featureWorkerDesc: "अपनी भाषा में साइन अप करें, पास में काम खोजें, उचित मजदूरी पाएं",
      featureEmployer: "नियोक्ताओं के लिए",
      featureEmployerDesc: "नौकरियां पोस्ट करें, कुशल कर्मचारी खोजें, तुरंत नियुक्त करें",
      featureMatching: "स्मार्ट मैचिंग",
      featureMatchingDesc: "हम स्थान, कौशल और मजदूरी के आधार पर मजदूरों का मिलान करते हैं",
      
      signupTitle: "साइन अप के तीन आसान तरीके",
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
      
      loading: "लोड हो रहा है...",
      success: "सफलता!",
      error: "त्रुटि",
      noResults: "कोई परिणाम नहीं मिला",
      
      aboutUs: "हमारे बारे में",
      contact: "संपर्क करें",
      helpline: "हेल्पलाइन",
      language: "भाषा",
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
