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
      recordingSpeakNow: "Recording... Speak now!",
      processingAudio: "Processing audio...",
      demoMode: "DEMO MODE",
      audioTranscriptionDemo: "Audio transcription is currently a mock feature. In production, this would use OpenAI Whisper API to convert your speech to text.",
      useNormalSignup: "Please use the normal signup form to complete registration.",
      send: "Send",
      callEmployer: "Call Employer",
      jobsPosted: "Jobs Posted",
      totalMatches: "Total Matches",
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
      send: "भेजें",
      callEmployer: "नियोक्ता को कॉल करें",
      jobsPosted: "काम पोस्ट किए गए",
      totalMatches: "कुल मिलान",
    }
  },
  bn: {
    translation: {
      appName: "গ্রামীণ রোজগার",
      tagline: "আপনার দোরগোড়ায় কাজ",
      subtitle: "ভারত জুড়ে দৈনিক মজুরি শ্রমিকদের স্থানীয় সুযোগের সাথে সংযুক্ত করা",
      
      home: "হোম",
      findWork: "কাজ খুঁজুন",
      postJob: "কাজ পোস্ট করুন",
      login: "লগইন",
      register: "রেজিস্টার করুন",
      logout: "লগআউট",
      myProfile: "আমার প্রোফাইল",
      myJobs: "আমার কাজ",
      
      heroTitle: "কাছাকাছি কাজ, ন্যায্য মজুরি",
      heroSubtitle: "কোন মধ্যস্থতাকারী নেই। কোন বিভ্রান্তি নেই। শুধু সৎ কাজ।",
      getStarted: "শুরু করুন",
      tollFreeText: "টোল-ফ্রি হেল্পলাইন:",
      callForRegistration: "অডিও-ভিত্তিক নিবন্ধনের জন্য কল করুন",
      
      features: "এটি কীভাবে কাজ করে",
      featureWorker: "শ্রমিকদের জন্য",
      featureWorkerDesc: "আপনার ভাষায় সাইন আপ করুন, কাছাকাছি কাজ খুঁজুন, ন্যায্য মজুরি পান",
      featureEmployer: "নিয়োগকর্তাদের জন্য",
      featureEmployerDesc: "চাকরি পোস্ট করুন, দক্ষ কর্মী খুঁজুন, তাৎক্ষণিক নিয়োগ করুন",
      featureMatching: "স্মার্ট ম্যাচিং",
      featureMatchingDesc: "আমরা অবস্থান, দক্ষতা এবং মজুরির উপর ভিত্তি করে শ্রমিকদের মিলিয়ে দিই",
      
      signupTitle: "সাইন আপ করার তিনটি সহজ উপায়",
      signupChooseMethod: "আপনার জন্য সবচেয়ে ভাল কাজ করে এমন পদ্ধতি চয়ন করুন",
      signupNormal: "সাধারণ সাইন আপ",
      signupNormalDesc: "একটি সাধারণ ফর্ম পূরণ করুন",
      signupChatbot: "চ্যাটবট সাইন আপ",
      signupChatbotDesc: "শুধু কয়েকটি প্রশ্নের উত্তর দিন",
      signupAudio: "অডিও সাইন আপ",
      signupAudioDesc: "আপনার বিবরণ বলুন",
      
      mason: "রাজমিস্ত্রি",
      labour: "শ্রমিক",
      plumber: "প্লাম্বার",
      electrician: "ইলেকট্রিশিয়ান",
      painter: "পেইন্টার",
      
      name: "নাম",
      phoneNumber: "ফোন নম্বর",
      password: "পাসওয়ার্ড",
      area: "এলাকা/গ্রাম",
      district: "জেলা",
      state: "রাজ্য",
      jobType: "কাজের ধরন",
      expectedWage: "প্রত্যাশিত দৈনিক মজুরি (₹)",
      description: "বিবরণ",
      skills: "দক্ষতা",
      submit: "জমা দিন",
      cancel: "বাতিল করুন",
      close: "বন্ধ করুন",
      save: "সংরক্ষণ করুন",
      role: "আমি",
      
      welcomeWorker: "নমস্কার",
      workerDashboard: "শ্রমিক ড্যাশবোর্ড",
      matchedJobs: "আপনার জন্য মিলেছে এমন কাজ",
      noMatchesYet: "এখনও কোন কাজ মেলেনি। আমরা উপযুক্ত কাজ খুঁজে পেলে আপনাকে অবহিত করব!",
      matchScore: "মিল",
      perDay: "/দিন",
      contact: "যোগাযোগ",
      notifications: "বিজ্ঞপ্তি",
      noNotifications: "এখনও কোন বিজ্ঞপ্তি নেই।",
      
      welcomeEmployer: "স্বাগতম",
      employerDashboard: "নিয়োগকর্তা ড্যাশবোর্ড",
      noJobsPosted: "এখনও কোন কাজ পোস্ট করা হয়নি। আপনার প্রথম কাজ পোস্ট করুন!",
      workerMatches: "শ্রমিক মিল",
      viewMatchedWorkers: "মিলে যাওয়া শ্রমিক দেখুন",
      matchedWorkersFor: "এর জন্য মিলেছে:",
      noWorkersMatched: "এখনও কোন শ্রমিক মেলেনি। ম্যাচিং ইঞ্জিন প্রতি 5 মিনিটে চলে।",
      
      jobTitle: "কাজের শিরোনাম",
      dailyWageOffered: "প্রদত্ত দৈনিক মজুরি (₹)",
      contactNumber: "যোগাযোগ নম্বর",
      requiredSkills: "প্রয়োজনীয় দক্ষতা (কমা দ্বারা পৃথক)",
      village: "গ্রাম",
      postJobSuccess: "কাজ সফলভাবে পোস্ট করা হয়েছে!",
      
      dontHaveAccount: "অ্যাকাউন্ট নেই?",
      alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      registerHere: "এখানে রেজিস্টার করুন",
      loginHere: "এখানে লগইন করুন",
      createAccount: "অ্যাকাউন্ট তৈরি করুন",
      joinUs: "আপনার পরবর্তী সুযোগ খুঁজতে আমাদের সাথে যোগ দিন",
      welcomeBack: "আবার স্বাগতম!",
      
      loading: "লোড হচ্ছে...",
      success: "সফল!",
      error: "ত্রুটি",
      noResults: "কোন ফলাফল পাওয়া যায়নি",
      
      aboutUs: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ করুন",
      helpline: "হেল্পলাইন",
      language: "ভাষা",
      madeWithLove: "গ্রামীণ ভারতের জন্য ❤️ দিয়ে তৈরি",
      copyright: "© 2025 গ্রামীণ রোজগার। সর্বস্বত্ব সংরক্ষিত।",
      
      conversationalRegistration: "কথোপকথন নিবন্ধন",
      typeYourAnswer: "আপনার উত্তর টাইপ করুন...",
      allInfoCollected: "সমস্ত তথ্য সংগ্রহ করা হয়েছে! নিবন্ধন সম্পূর্ণ করতে নীচে ক্লিক করুন।",
      completeRegistration: "নিবন্ধন সম্পূর্ণ করুন",
      completing: "সম্পূর্ণ হচ্ছে...",
      
      clickMicAndSpeak: "মাইক্রোফোনে ক্লিক করুন এবং আপনার বিবরণ বলুন:",
      yourName: "আপনার নাম",
      yourVillage: "আপনার গ্রাম/এলাকা",
      yourDistrict: "আপনার জেলা এবং রাজ্য",
      typeOfWork: "আপনি যে ধরনের কাজ করেন",
      recordingSpeakNow: "রেকর্ডিং... এখন বলুন!",
      processingAudio: "অডিও প্রক্রিয়াকরণ...",
      demoMode: "ডেমো মোড",
      audioTranscriptionDemo: "অডিও ট্রান্সক্রিপশন বর্তমানে একটি মক বৈশিষ্ট্য। উত্পাদনে, এটি আপনার বক্তৃতাকে পাঠ্যে রূপান্তর করতে OpenAI Whisper API ব্যবহার করবে।",
      useNormalSignup: "নিবন্ধন সম্পূর্ণ করতে দয়া করে সাধারণ সাইন আপ ফর্ম ব্যবহার করুন।",
      send: "পাঠান",
      callEmployer: "নিয়োগকর্তাকে কল করুন",
      jobsPosted: "কাজ পোস্ট করা হয়েছে",
      totalMatches: "মোট মিল",
    }
  },
  te: {
    translation: {
      appName: "గ్రామీణ రోజ్‌గార్", tagline: "మీ ఇంటి వద్ద ఉద్యోగం", subtitle: "భారతదేశం అంతటా రోజువారీ కూలీ కార్మికులను స్థానిక అవకాశాలతో కలుపుతోంది",
      home: "హోమ్", findWork: "పని వెతకండి", postJob: "ఉద్యోగం పోస్ట్ చేయండి", login: "లాగిన్", register: "రిజిస్టర్", logout: "లాగౌట్", myProfile: "నా ప్రొఫైల్", myJobs: "నా ఉద్యోగాలు",
      heroTitle: "మీ దగ్గర పని, మీకు న్యాయమైన వేతనం", heroSubtitle: "మధ్యవర్తులు లేరు। గందరగోళం లేదు। నిజాయితీగా పని మాత్రమే।", getStarted: "ప్రారంభించండి", tollFreeText: "టోల్-ఫ్రీ హెల్ప్‌లైన్:", callForRegistration: "ఆడియో-ఆధారిత నమోదు కోసం కాల్ చేయండి",
      features: "ఇది ఎలా పనిచేస్తుంది", featureWorker: "కార్మికుల కోసం", featureWorkerDesc: "మీ భాషలో సైన్ అప్ చేయండి, సమీపంలో పని కనుగొనండి", featureEmployer: "యజమానుల కోసం", featureEmployerDesc: "ఉద్యోగాలు పోస్ట్ చేయండి, నైపుణ్యం కలిగిన కార్మికులను కనుగొనండి", featureMatching: "స్మార్ట్ మ్యాచింగ్", featureMatchingDesc: "స్థానం, నైపుణ్యాలు మరియు వేతనం ఆధారంగా",
      signupTitle: "సైన్ అప్ చేయడానికి మూడు సులభ మార్గాలు", signupChooseMethod: "మీకు ఉత్తమంగా పనిచేసే పద్ధతిని ఎంచుకోండి", signupNormal: "సాధారణ సైన్ అప్", signupNormalDesc: "సాధారణ ఫారమ్ పూరించండి", signupChatbot: "చాట్‌బాట్ సైన్ అప్", signupChatbotDesc: "కొన్ని ప్రశ్నలకు సమాధానం ఇవ్వండి", signupAudio: "ఆడియో సైన్ అప్", signupAudioDesc: "మీ వివరాలను చెప్పండి",
      mason: "మేస్త్రీ", labour: "కూలీ", plumber: "ప్లంబర్", electrician: "ఎలక్ట్రీషియన్", painter: "పెయింటర్",
      name: "పేరు", phoneNumber: "ఫోన్ నంబర్", password: "పాస్‌వర్డ్", area: "ప్రాంతం/గ్రామం", district: "జిల్లా", state: "రాష్ట్రం", jobType: "పని రకం", expectedWage: "అంచనా రోజువారీ వేతనం (₹)", description: "వివరణ", skills: "నైపుణ్యాలు", submit: "సమర్పించండి", cancel: "రద్దు చేయండి", close: "మూసివేయండి", save: "సేవ్ చేయండి", role: "నేను",
      welcomeWorker: "నమస్కారం", workerDashboard: "కార్మిక డ్యాష్‌బోర్డ్", matchedJobs: "మీకు సరిపోలిన ఉద్యోగాలు", noMatchesYet: "ఇంకా ఉద్యోగ మ్యాచ్‌లు లేవు। మేము తగిన పనిని కనుగొన్నప్పుడు మీకు తెలియజేస్తాము!", matchScore: "మ్యాచ్", perDay: "/రోజుకు", contact: "సంప్రదించండి", notifications: "నోటిఫికేషన్‌లు", noNotifications: "ఇంకా నోటిఫికేషన్‌లు లేవు।",
      welcomeEmployer: "స్వాగతం", employerDashboard: "యజమాని డ్యాష్‌బోర్డ్", noJobsPosted: "ఇంకా ఉద్యోగాలు పోస్ట్ చేయలేదు। మీ మొదటి ఉద్యోగాన్ని పోస్ట్ చేయండి!", workerMatches: "కార్మిక మ్యాచ్‌లు", viewMatchedWorkers: "సరిపోలిన కార్మికులను చూడండి", matchedWorkersFor: "దీని కోసం సరిపోలినవారు:", noWorkersMatched: "ఇంకా కార్మికులు సరిపోలలేదు।",
      jobTitle: "ఉద్యోగ శీర్షిక", dailyWageOffered: "అందించే రోజువారీ వేతనం (₹)", contactNumber: "సంప్రదింపు నంబర్", requiredSkills: "అవసరమైన నైపుణ్యాలు", village: "గ్రామం", postJobSuccess: "ఉద్యోగం విజయవంతంగా పోస్ట్ చేయబడింది!",
      dontHaveAccount: "ఖాతా లేదా?", alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?", registerHere: "ఇక్కడ రిజిస్టర్ చేయండి", loginHere: "ఇక్కడ లాగిన్ అవ్వండి", createAccount: "ఖాతా సృష్టించండి", joinUs: "మాతో చేరండి", welcomeBack: "తిరిగి స్వాగతం!",
      loading: "లోడ్ అవుతోంది...", success: "విజయం!", error: "లోపం", noResults: "ఫలితాలు కనుగొనబడలేదు",
      aboutUs: "మా గురించి", helpline: "హెల్ప్‌లైన్", language: "భాష", madeWithLove: "గ్రామీణ భారతదేశం కోసం ❤️తో", copyright: "© 2025 గ్రామీణ రోజ్‌గార్। అన్ని హక్కులు రక్షించబడ్డాయి।",
      conversationalRegistration: "సంభాషణ నమోదు", typeYourAnswer: "మీ సమాధానాన్ని టైప్ చేయండి...", allInfoCollected: "అన్ని సమాచారం సేకరించబడింది!", completeRegistration: "నమోదును పూర్తి చేయండి", completing: "పూర్తి అవుతోంది...",
      clickMicAndSpeak: "మైక్రోఫోన్‌పై క్లిక్ చేసి మీ వివరాలను చెప్పండి:", yourName: "మీ పేరు", yourVillage: "మీ గ్రామం", yourDistrict: "మీ జిల్లా", typeOfWork: "మీరు చేసే పని", recordingSpeakNow: "రికార్డింగ్... ఇప్పుడు మాట్లాడండి!", processingAudio: "ఆడియో ప్రాసెస్ చేస్తోంది...", demoMode: "డెమో మోడ్", audioTranscriptionDemo: "ఆడియో ట్రాన్స్‌క్రిప్షన్ ప్రస్తుతం మాక్ ఫీచర్।", useNormalSignup: "సాధారణ సైన్ అప్ ఫారమ్‌ను ఉపయోగించండి।",
      send: "పంపండి", callEmployer: "యజమానిని కాల్ చేయండి", jobsPosted: "ఉద్యోగాలు పోస్ట్ చేయబడ్డాయి", totalMatches: "మొత్తం మ్యాచ్‌లు",
    }
  },
  mr: {
    translation: {
      appName: "ग्रामीण रोजगार", tagline: "कामकाज तुमच्या जवळ", subtitle: "संपूर्ण भारतातील दैनिक मजुरांना स्थानिक संधींशी जोडणे",
      home: "होम", findWork: "काम शोधा", postJob: "काम पोस्ट करा", login: "लॉगिन", register: "नोंदणी करा", logout: "लॉगआउट", myProfile: "माझे प्रोफाइल", myJobs: "माझी कामे",
      heroTitle: "जवळ काम, योग्य दाम", heroSubtitle: "मध्यस्थ नाहीत। गोंधळ नाही। फक्त प्रामाणिक काम।", getStarted: "सुरू करा", tollFreeText: "टोल-फ्री हेल्पलाइन:", callForRegistration: "ऑडिओ-आधारित नोंदणीसाठी कॉल करा",
      features: "हे कसे काम करते", featureWorker: "कामगारांसाठी", featureWorkerDesc: "तुमच्या भाषेत साइन अप करा, जवळपास काम शोधा", featureEmployer: "नियोक्त्यांसाठी", featureEmployerDesc: "नोकर्‍या पोस्ट करा, कुशल कामगार शोधा", featureMatching: "स्मार्ट मॅचिंग", featureMatchingDesc: "स्थान, कौशल्य आणि मजुरी यावर आधारित",
      signupTitle: "साइन अप करण्याचे तीन सोपे मार्ग", signupChooseMethod: "तुमच्यासाठी सर्वोत्तम काम करणारी पद्धत निवडा", signupNormal: "सामान्य साइन अप", signupNormalDesc: "साधा फॉर्म भरा", signupChatbot: "चॅटबॉट साइन अप", signupChatbotDesc: "फक्त काही प्रश्नांची उत्तरे द्या", signupAudio: "ऑडिओ साइन अप", signupAudioDesc: "तुमचे तपशील सांगा",
      mason: "बांधकाम कामगार", labour: "मजूर", plumber: "प्लंबर", electrician: "इलेक्ट्रिशियन", painter: "पेंटर",
      name: "नाव", phoneNumber: "फोन नंबर", password: "पासवर्ड", area: "क्षेत्र/गाव", district: "जिल्हा", state: "राज्य", jobType: "कामाचा प्रकार", expectedWage: "अपेक्षित दैनिक मजुरी (₹)", description: "वर्णन", skills: "कौशल्ये", submit: "सबमिट करा", cancel: "रद्द करा", close: "बंद करा", save: "सेव्ह करा", role: "मी आहे",
      welcomeWorker: "नमस्कार", workerDashboard: "कामगार डॅशबोर्ड", matchedJobs: "तुमच्यासाठी जुळणारी कामे", noMatchesYet: "अद्याप कोणतेही काम जुळलेले नाही। आम्ही योग्य काम सापडल्यास तुम्हाला सूचित करू!", matchScore: "मॅच", perDay: "/दिवस", contact: "संपर्क", notifications: "सूचना", noNotifications: "अद्याप कोणत्याही सूचना नाहीत।",
      welcomeEmployer: "स्वागत आहे", employerDashboard: "नियोक्ता डॅशबोर्ड", noJobsPosted: "अद्याप कोणतेही काम पोस्ट केलेले नाही। तुमचे पहिले काम पोस्ट करा!", workerMatches: "कामगार जुळणी", viewMatchedWorkers: "जुळणारे कामगार पहा", matchedWorkersFor: "यासाठी जुळणारे:", noWorkersMatched: "अद्याप कोणतेही कामगार जुळलेले नाहीत।",
      jobTitle: "कामाचे शीर्षक", dailyWageOffered: "दैनिक मजुरी दिली (₹)", contactNumber: "संपर्क क्रमांक", requiredSkills: "आवश्यक कौशल्ये", village: "गाव", postJobSuccess: "काम यशस्वीरित्या पोस्ट केले!",
      dontHaveAccount: "खाते नाही?", alreadyHaveAccount: "आधीच खाते आहे?", registerHere: "येथे नोंदणी करा", loginHere: "येथे लॉगिन करा", createAccount: "खाते तयार करा", joinUs: "आमच्यात सामील व्हा", welcomeBack: "पुन्हा स्वागत आहे!",
      loading: "लोड होत आहे...", success: "यश!", error: "त्रुटी", noResults: "कोणतेही परिणाम सापडले नाहीत",
      aboutUs: "आमच्याबद्दल", helpline: "हेल्पलाइन", language: "भाषा", madeWithLove: "ग्रामीण भारतासाठी ❤️सह बनवले", copyright: "© 2025 ग्रामीण रोजगार। सर्व हक्क राखीव।",
      conversationalRegistration: "संभाषण नोंदणी", typeYourAnswer: "तुमचे उत्तर टाइप करा...", allInfoCollected: "सर्व माहिती गोळा केली!", completeRegistration: "नोंदणी पूर्ण करा", completing: "पूर्ण होत आहे...",
      clickMicAndSpeak: "मायक्रोफोनवर क्लिक करा आणि तपशील सांगा:", yourName: "तुमचे नाव", yourVillage: "तुमचे गाव", yourDistrict: "तुमचा जिल्हा", typeOfWork: "तुम्ही करता ते काम", recordingSpeakNow: "रेकॉर्डिंग... आता बोला!", processingAudio: "ऑडिओ प्रोसेस होत आहे...", demoMode: "डेमो मोड", audioTranscriptionDemo: "ऑडिओ ट्रान्सक्रिप्शन सध्या मॉक फीचर आहे।", useNormalSignup: "नोंदणी पूर्ण करण्यासाठी सामान्य साइन अप फॉर्म वापरा।",
      send: "पाठवा", callEmployer: "नियोक्त्याला कॉल करा", jobsPosted: "नोकर्‍या पोस्ट केल्या", totalMatches: "एकूण जुळणी",
    }
  },
  ta: {
    translation: {
      appName: "கிராமீண் ரோஸ்கார்", tagline: "உங்கள் வீட்டில் வேலை", subtitle: "இந்தியா முழுவதும் தினசரி கூலி தொழிலாளர்களை உள்ளூர் வாய்ப்புகளுடன் இணைக்கிறது",
      home: "முகப்பு", findWork: "வேலை தேடு", postJob: "வேலை இடுகை", login: "உள்நுழை", register: "பதிவு செய்", logout: "வெளியேறு", myProfile: "என் சுயவிவரம்", myJobs: "என் வேலைகள்",
      heroTitle: "உங்களுக்கு அருகில் வேலை, உங்களுக்கு நியாயமான ஊதியம்", heroSubtitle: "இடைத்தரகர்கள் இல்லை. குழப்பம் இல்லை. நேர்மையான வேலை மட்டும்.", getStarted: "தொடங்குங்கள்", tollFreeText: "கட்டணமில்லா உதவி எண்:", callForRegistration: "ஆடியோ அடிப்படையிலான பதிவுக்கு அழைக்கவும்",
      features: "இது எவ்வாறு செயல்படுகிறது", featureWorker: "தொழிலாளர்களுக்கு", featureWorkerDesc: "உங்கள் மொழியில் பதிவு செய்யுங்கள், அருகில் வேலை கண்டறியுங்கள்", featureEmployer: "முதலாளிகளுக்கு", featureEmployerDesc: "வேலைகளை இடுகையிடுங்கள், திறமையான தொழிலாளர்களைக் கண்டறியுங்கள்", featureMatching: "ஸ்மார்ட் பொருத்தம்", featureMatchingDesc: "இடம், திறன் மற்றும் ஊதியம் அடிப்படையில்",
      signupTitle: "பதிவு செய்ய மூன்று எளிய வழிகள்", signupChooseMethod: "உங்களுக்கு சிறந்த முறையைத் தேர்ந்தெடுக்கவும்", signupNormal: "சாதாரண பதிவு", signupNormalDesc: "எளிய படிவத்தை நிரப்பவும்", signupChatbot: "சாட்பாட் பதிவு", signupChatbotDesc: "சில கேள்விகளுக்கு பதிலளிக்கவும்", signupAudio: "ஆடியோ பதிவு", signupAudioDesc: "உங்கள் விவரங்களை கூறுங்கள்",
      mason: "கொத்தனார்", labour: "கூலி", plumber: "பிளம்பர்", electrician: "எலக்ட்ரீஷியன்", painter: "பெயிண்டர்",
      name: "பெயர்", phoneNumber: "தொலைபேசி எண்", password: "கடவுச்சொல்", area: "பகுதி/கிராமம்", district: "மாவட்டம்", state: "மாநிலம்", jobType: "வேலை வகை", expectedWage: "எதிர்பார்க்கப்படும் தினசரி ஊதியம் (₹)", description: "விளக்கம்", skills: "திறன்கள்", submit: "சமர்ப்பிக்கவும்", cancel: "ரத்து செய்", close: "மூடு", save: "சேமி", role: "நான்",
      welcomeWorker: "வணக்கம்", workerDashboard: "தொழிலாளர் டாஷ்போர்டு", matchedJobs: "உங்களுக்கான பொருத்தமான வேலைகள்", noMatchesYet: "இன்னும் வேலை பொருத்தங்கள் இல்லை। பொருத்தமான வேலை கிடைக்கும்போது உங்களுக்கு அறிவிப்போம்!", matchScore: "பொருத்தம்", perDay: "/நாள்", contact: "தொடர்பு", notifications: "அறிவிப்புகள்", noNotifications: "இன்னும் அறிவிப்புகள் இல்லை।",
      welcomeEmployer: "வரவேற்கிறோம்", employerDashboard: "முதலாளி டாஷ்போர்டு", noJobsPosted: "இன்னும் வேலைகள் இடுகையிடப்படவில்லை। உங்கள் முதல் வேலையை இடுகையிடுங்கள்!", workerMatches: "தொழிலாளர் பொருத்தங்கள்", viewMatchedWorkers: "பொருத்தமான தொழிலாளர்களைக் காண்க", matchedWorkersFor: "இதற்கான பொருத்தங்கள்:", noWorkersMatched: "இன்னும் தொழிலாளர்கள் பொருத்தப்படவில்லை।",
      jobTitle: "வேலை தலைப்பு", dailyWageOffered: "வழங்கப்படும் தினசரி ஊதியம் (₹)", contactNumber: "தொடர்பு எண்", requiredSkills: "தேவையான திறன்கள்", village: "கிராமம்", postJobSuccess: "வேலை வெற்றிகரமாக இடுகையிடப்பட்டது!",
      dontHaveAccount: "கணக்கு இல்லையா?", alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?", registerHere: "இங்கே பதிவு செய்யுங்கள்", loginHere: "இங்கே உள்நுழையுங்கள்", createAccount: "கணக்கு உருவாக்கு", joinUs: "எங்களுடன் சேருங்கள்", welcomeBack: "மீண்டும் வரவேற்கிறோம்!",
      loading: "ஏற்றுகிறது...", success: "வெற்றி!", error: "பிழை", noResults: "முடிவுகள் இல்லை",
      aboutUs: "எங்களைப் பற்றி", helpline: "உதவி எண்", language: "மொழி", madeWithLove: "கிராமப்புற இந்தியாவுக்காக ❤️உடன்", copyright: "© 2025 கிராமீண் ரோஸ்கார். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை।",
      conversationalRegistration: "உரையாடல் பதிவு", typeYourAnswer: "உங்கள் பதிலை தட்டச்சு செய்யுங்கள்...", allInfoCollected: "அனைத்து தகவல்களும் சேகரிக்கப்பட்டன!", completeRegistration: "பதிவை முடிக்கவும்", completing: "முடிக்கிறது...",
      clickMicAndSpeak: "மைக்ரோஃபோனைக் கிளிக் செய்து உங்கள் விவரங்களைச் சொல்லுங்கள்:", yourName: "உங்கள் பெயர்", yourVillage: "உங்கள் கிராமம்", yourDistrict: "உங்கள் மாவட்டம்", typeOfWork: "நீங்கள் செய்யும் வேலை", recordingSpeakNow: "பதிவு செய்கிறது... இப்போது பேசுங்கள்!", processingAudio: "ஆடியோ செயலாக்கம்...", demoMode: "டெமோ முறை", audioTranscriptionDemo: "ஆடியோ டிரான்ஸ்கிரிப்ஷன் தற்போது மாக் அம்சம்.", useNormalSignup: "பதிவை முடிக்க சாதாரண படிவத்தைப் பயன்படுத்தவும்.",
      send: "அனுப்பு", callEmployer: "முதலாளியை அழை", jobsPosted: "வேலைகள் இடுகையிடப்பட்டன", totalMatches: "மொத்த பொருத்தங்கள்",
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
