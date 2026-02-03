import os
import asyncio
from datetime import datetime, timedelta
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from dotenv import load_dotenv
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import uuid
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Load environment variables
load_dotenv()

# Configuration
MONGO_URL = os.getenv("MONGO_URL")
JWT_SECRET = os.getenv("JWT_SECRET", "graminrozgar_secret_key_2025")
EMERGENT_LLM_KEY = os.getenv("EMERGENT_LLM_KEY")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# Translation cache to avoid repeated API calls
translation_cache = {}

async def translate_text(text: str, target_language: str) -> str:
    """Translate text to target language using OpenAI"""
    if not text or target_language == "en":
        return text
    
    # Check cache
    cache_key = f"{text}_{target_language}"
    if cache_key in translation_cache:
        return translation_cache[cache_key]
    
    try:
        # Language names for prompt
        lang_names = {
            "hi": "Hindi",
            "bn": "Bengali", 
            "te": "Telugu",
            "mr": "Marathi",
            "ta": "Tamil",
            "gu": "Gujarati",
            "kn": "Kannada",
            "ml": "Malayalam",
            "pa": "Punjabi",
            "or": "Odia",
            "as": "Assamese",
            "ur": "Urdu"
        }
        
        target_lang_name = lang_names.get(target_language, "Hindi")
        
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"translate_{cache_key}",
            system_message=f"You are a professional translator. Translate the given text to {target_lang_name}. Return ONLY the translated text, nothing else. Keep the meaning accurate and natural."
        ).with_model("openai", "gpt-5.2")
        
        translated = await chat.send_message(UserMessage(text=text))
        
        # Cache the result
        translation_cache[cache_key] = translated
        return translated
        
    except Exception as e:
        print(f"Translation error: {e}")
        return text  # Return original on error

# Initialize FastAPI
app = FastAPI(title="GraminRozgar API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer()

# MongoDB connection
client = AsyncIOMotorClient(MONGO_URL)
db = client.graminrozgar

# Collections
users_collection = db.users
workers_collection = db.workers
jobs_collection = db.jobs
matches_collection = db.matches
notifications_collection = db.notifications
chatbot_sessions_collection = db.chatbot_sessions

# Scheduler for matching engine
scheduler = AsyncIOScheduler()


# ============ MODELS ============

class UserRole:
    WORKER = "worker"
    EMPLOYER = "employer"

class JobType:
    MASON = "Mason"
    LABOUR = "Labour"
    PLUMBER = "Plumber"
    ELECTRICIAN = "Electrician"
    PAINTER = "Painter"

class UserRegister(BaseModel):
    name: str
    phone_number: str
    password: str
    role: str  # worker or employer
    language: str = "hi"  # Default to Hindi

class UserLogin(BaseModel):
    phone_number: str
    password: str

class WorkerProfile(BaseModel):
    user_id: str
    name: str
    phone_number: str
    area: str
    district: str
    state: str
    job_type: str
    expected_daily_wage: int
    skills: List[str] = []
    language: str = "hi"

class JobCreate(BaseModel):
    title: str
    job_type: str
    description: str
    village: str
    district: str
    state: str
    daily_wage_offered: int
    contact_number: str
    required_skills: List[str] = []

class ChatbotMessage(BaseModel):
    session_id: str
    message: str
    language: str = "hi"

class AudioTranscribe(BaseModel):
    session_id: str
    language: str = "hi"


# ============ HELPER FUNCTIONS ============

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        
        user = await users_collection.find_one({"user_id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")


# ============ DISTANCE CALCULATION ============

def calculate_distance_score(location1: dict, location2: dict) -> float:
    """
    Simple location matching based on district and state.
    Returns a score from 0-100 (100 = same district, 50 = same state, 0 = different state)
    """
    if location1["district"].lower() == location2["district"].lower():
        return 100.0
    elif location1["state"].lower() == location2["state"].lower():
        return 50.0
    else:
        return 0.0


# ============ AUTHENTICATION ROUTES ============

@app.post("/api/auth/register")
async def register_user(user: UserRegister):
    # Check if user already exists
    existing_user = await users_collection.find_one({"phone_number": user.phone_number})
    if existing_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    hashed_password = hash_password(user.password)
    
    user_doc = {
        "user_id": user_id,
        "name": user.name,
        "phone_number": user.phone_number,
        "password": hashed_password,
        "role": user.role,
        "language": user.language,
        "created_at": datetime.utcnow()
    }
    
    await users_collection.insert_one(user_doc)
    
    # Create access token
    token = create_access_token({"user_id": user_id, "role": user.role})
    
    return {"token": token, "user_id": user_id, "role": user.role}


@app.post("/api/auth/login")
async def login_user(user: UserLogin):
    # Find user
    user_doc = await users_collection.find_one({"phone_number": user.phone_number})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Verify password
    if not verify_password(user.password, user_doc["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create access token
    token = create_access_token({"user_id": user_doc["user_id"], "role": user_doc["role"]})
    
    return {
        "token": token,
        "user_id": user_doc["user_id"],
        "role": user_doc["role"],
        "name": user_doc["name"]
    }


@app.get("/api/auth/me")
async def get_me(current_user = Depends(get_current_user)):
    return {
        "user_id": current_user["user_id"],
        "name": current_user["name"],
        "phone_number": current_user["phone_number"],
        "role": current_user["role"],
        "language": current_user.get("language", "hi")
    }


# ============ WORKER ROUTES ============

@app.post("/api/workers/profile")
async def create_worker_profile(profile: WorkerProfile, current_user = Depends(get_current_user)):
    if current_user["role"] != UserRole.WORKER:
        raise HTTPException(status_code=403, detail="Only workers can create profiles")
    
    # Check if profile already exists
    existing_profile = await workers_collection.find_one({"user_id": current_user["user_id"]})
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    
    profile_doc = {
        "worker_id": str(uuid.uuid4()),
        "user_id": current_user["user_id"],
        "name": profile.name,
        "phone_number": profile.phone_number,
        "area": profile.area,
        "district": profile.district,
        "state": profile.state,
        "job_type": profile.job_type,
        "expected_daily_wage": profile.expected_daily_wage,
        "skills": profile.skills,
        "language": profile.language,
        "created_at": datetime.utcnow()
    }
    
    await workers_collection.insert_one(profile_doc)
    
    return {"message": "Profile created successfully", "worker_id": profile_doc["worker_id"]}


@app.get("/api/workers/profile")
async def get_worker_profile(current_user = Depends(get_current_user)):
    if current_user["role"] != UserRole.WORKER:
        raise HTTPException(status_code=403, detail="Only workers can access this")
    
    profile = await workers_collection.find_one({"user_id": current_user["user_id"]})
    if not profile:
        return None
    
    profile.pop("_id", None)
    return profile


@app.get("/api/workers/matches")
async def get_worker_matches(current_user = Depends(get_current_user)):
    """Get job matches for the logged-in worker with translated content"""
    if current_user["role"] != UserRole.WORKER:
        raise HTTPException(status_code=403, detail="Only workers can access this")
    
    # Get worker profile
    worker = await workers_collection.find_one({"user_id": current_user["user_id"]})
    if not worker:
        raise HTTPException(status_code=404, detail="Worker profile not found")
    
    # Get worker's language preference
    worker_lang = worker.get("language", "hi")
    
    # Get matches
    matches = await matches_collection.find(
        {"worker_id": worker["worker_id"], "status": "pending"}
    ).sort("match_score", -1).to_list(50)
    
    # Populate job details with translation
    result = []
    for match in matches:
        job = await jobs_collection.find_one({"job_id": match["job_id"]})
        if job:
            # Translate job title and description if not in worker's language
            if worker_lang != "en":
                job["title"] = await translate_text(job["title"], worker_lang)
                job["description"] = await translate_text(job["description"], worker_lang)
            
            job.pop("_id", None)
            match.pop("_id", None)
            result.append({"match": match, "job": job})
    
    return result


# ============ CHATBOT ROUTES ============

@app.post("/api/chatbot/conversation")
async def chatbot_conversation(msg: ChatbotMessage):
    """Handle chatbot conversation for worker signup - Language Adaptive"""
    
    # Get or create session
    session = await chatbot_sessions_collection.find_one({"session_id": msg.session_id})
    
    if not session:
        # New session - initialize with language-specific greeting
        greetings = {
            "hi": "नमस्ते! मैं आपका साथी हूं। आइए शुरू करते हैं। आपका नाम क्या है?",
            "en": "Hello! I'm here to help you register. What is your name?",
            "bn": "নমস্কার! আমি আপনার সাহায্যকারী। আপনার নাম কি?",
            "te": "నమస్కారం! నేను మీకు సహాయం చేస్తాను। మీ పేరు ఏమిటి?",
            "mr": "नमस्कार! मी तुम्हाला मदत करेन। तुमचे नाव काय आहे?",
            "ta": "வணக்கம்! நான் உங்களுக்கு உதவுவேன். உங்கள் பெயர் என்ன?",
            "gu": "નમસ્તે! હું તમારી મદદ કરીશ। તમારું નામ શું છે?",
        }
        
        session = {
            "session_id": msg.session_id,
            "messages": [],
            "data": {},
            "current_step": "name",
            "language": msg.language,
            "created_at": datetime.utcnow()
        }
        await chatbot_sessions_collection.insert_one(session)
        
        greeting = greetings.get(msg.language, greetings["hi"])
        session["messages"].append({"role": "assistant", "content": greeting})
        await chatbot_sessions_collection.update_one(
            {"session_id": msg.session_id},
            {"$set": {"messages": session["messages"]}}
        )
        
        return {"response": greeting, "session_id": msg.session_id}
    
    # Append user message
    session["messages"].append({"role": "user", "content": msg.message})
    
    # Determine current step and next question
    current_step = session.get("current_step", "name")
    
    # Language-specific questions
    questions = {
        "hi": {
            "area": "बहुत अच्छा! आप कहाँ रहते हैं? (गाँव/शहर का नाम)",
            "district": "धन्यवाद! आपका जिला कौन सा है?",
            "state": "अच्छा! आपका राज्य कौन सा है?",
            "job_type": "समझ गया! आप किस तरह का काम करते हैं?\n1. राजमिस्त्री (Mason)\n2. मजदूर (Labour)\n3. प्लंबर (Plumber)\n4. बिजली मिस्त्री (Electrician)\n5. पेंटर (Painter)",
            "wage": "बढ़िया! आप रोज़ कितने पैसे की उम्मीद करते हैं? (₹)",
            "phone": "लगभग हो गया! आपका मोबाइल नंबर क्या है?",
            "complete": "बहुत बढ़िया! मैंने सारी जानकारी इकट्ठा कर ली है। अब 'Complete Registration' बटन पर क्लिक करें।"
        },
        "en": {
            "area": "Great! Where do you live? (Village/Town name)",
            "district": "Thank you! Which district are you in?",
            "state": "Good! Which state?",
            "job_type": "Understood! What type of work do you do?\n1. Mason\n2. Labour\n3. Plumber\n4. Electrician\n5. Painter",
            "wage": "Excellent! What daily wage do you expect? (₹)",
            "phone": "Almost done! What is your mobile number?",
            "complete": "Perfect! I have collected all information. Now click the 'Complete Registration' button."
        },
        "bn": {
            "area": "দুর্দান্ত! আপনি কোথায় থাকেন? (গ্রাম/শহর)",
            "district": "ধন্যবাদ! আপনার জেলা কোনটি?",
            "state": "ভাল! কোন রাজ্য?",
            "job_type": "বুঝলাম! আপনি কী ধরনের কাজ করেন?\n1. রাজমিস্ত্রি\n2. শ্রমিক\n3. প্লাম্বার\n4. ইলেকট্রিশিয়ান\n5. পেইন্টার",
            "wage": "চমৎকার! আপনি কত দৈনিক মজুরি আশা করেন? (₹)",
            "phone": "প্রায় শেষ! আপনার মোবাইল নম্বর কত?",
            "complete": "নিখুঁত! আমি সব তথ্য সংগ্রহ করেছি। এখন 'Complete Registration' বোতামে ক্লিক করুন।"
        }
    }
    
    lang_questions = questions.get(msg.language, questions["hi"])
    
    # Store the user's response and determine next step
    response_text = ""
    next_step = current_step
    
    if current_step == "name":
        session["data"]["name"] = msg.message
        response_text = lang_questions["area"]
        next_step = "area"
    
    elif current_step == "area":
        session["data"]["area"] = msg.message
        response_text = lang_questions["district"]
        next_step = "district"
    
    elif current_step == "district":
        session["data"]["district"] = msg.message
        response_text = lang_questions["state"]
        next_step = "state"
    
    elif current_step == "state":
        session["data"]["state"] = msg.message
        response_text = lang_questions["job_type"]
        next_step = "job_type"
    
    elif current_step == "job_type":
        # Map responses to job types
        job_mapping = {
            "1": "Mason", "mason": "Mason", "राजमिस्त्री": "Mason", "রাজমিস্ত্রি": "Mason",
            "2": "Labour", "labour": "Labour", "मजदूर": "Labour", "শ্রমিক": "Labour",
            "3": "Plumber", "plumber": "Plumber", "प्लंबर": "Plumber", "প্লাম্বার": "Plumber",
            "4": "Electrician", "electrician": "Electrician", "बिजली": "Electrician", "ইলেকট্রিশিয়ান": "Electrician",
            "5": "Painter", "painter": "Painter", "पेंटर": "Painter", "পেইন্টার": "Painter"
        }
        user_input = msg.message.lower().strip()
        session["data"]["job_type"] = job_mapping.get(user_input, "Labour")
        response_text = lang_questions["wage"]
        next_step = "wage"
    
    elif current_step == "wage":
        # Extract number from response
        import re
        numbers = re.findall(r'\d+', msg.message)
        wage = int(numbers[0]) if numbers else 500
        session["data"]["expected_daily_wage"] = wage
        response_text = lang_questions["phone"]
        next_step = "phone"
    
    elif current_step == "phone":
        # Extract phone number
        import re
        numbers = re.findall(r'\d+', msg.message)
        phone = ''.join(numbers) if numbers else msg.message
        session["data"]["phone_number"] = phone
        response_text = lang_questions["complete"]
        next_step = "complete"
    
    # Append bot response
    session["messages"].append({"role": "assistant", "content": response_text})
    
    # Update session in database
    await chatbot_sessions_collection.update_one(
        {"session_id": msg.session_id},
        {"$set": {
            "messages": session["messages"],
            "data": session["data"],
            "current_step": next_step,
            "updated_at": datetime.utcnow()
        }}
    )
    
    return {"response": response_text, "session_id": msg.session_id, "step": next_step}


@app.post("/api/chatbot/complete-registration")
async def complete_chatbot_registration(session_id: str):
    """Complete worker registration from chatbot session"""
    session = await chatbot_sessions_collection.find_one({"session_id": session_id})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    data = session.get("data", {})
    
    # Validate all required fields
    required_fields = ["name", "area", "district", "state", "job_type", "expected_daily_wage", "phone_number"]
    for field in required_fields:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")
    
    # Create user account
    user_id = str(uuid.uuid4())
    password = str(uuid.uuid4())[:8]  # Generate temporary password
    hashed_password = hash_password(password)
    
    user_doc = {
        "user_id": user_id,
        "name": data["name"],
        "phone_number": data["phone_number"],
        "password": hashed_password,
        "role": UserRole.WORKER,
        "language": session.get("language", "hi"),
        "created_at": datetime.utcnow()
    }
    await users_collection.insert_one(user_doc)
    
    # Create worker profile
    worker_id = str(uuid.uuid4())
    profile_doc = {
        "worker_id": worker_id,
        "user_id": user_id,
        "name": data["name"],
        "phone_number": data["phone_number"],
        "area": data["area"],
        "district": data["district"],
        "state": data["state"],
        "job_type": data["job_type"],
        "expected_daily_wage": data["expected_daily_wage"],
        "skills": [],
        "language": session.get("language", "hi"),
        "created_at": datetime.utcnow()
    }
    await workers_collection.insert_one(profile_doc)
    
    # Create token
    token = create_access_token({"user_id": user_id, "role": UserRole.WORKER})
    
    return {
        "message": "Registration complete!",
        "token": token,
        "temp_password": password,
        "phone_number": data["phone_number"]
    }


# ============ JOB ROUTES ============

@app.post("/api/jobs")
async def create_job(job: JobCreate, current_user = Depends(get_current_user)):
    if current_user["role"] != UserRole.EMPLOYER:
        raise HTTPException(status_code=403, detail="Only employers can post jobs")
    
    job_id = str(uuid.uuid4())
    job_doc = {
        "job_id": job_id,
        "employer_id": current_user["user_id"],
        "title": job.title,
        "job_type": job.job_type,
        "description": job.description,
        "village": job.village,
        "district": job.district,
        "state": job.state,
        "daily_wage_offered": job.daily_wage_offered,
        "contact_number": job.contact_number,
        "required_skills": job.required_skills,
        "status": "active",
        "created_at": datetime.utcnow()
    }
    
    await jobs_collection.insert_one(job_doc)
    
    return {"message": "Job posted successfully", "job_id": job_id}


@app.get("/api/jobs")
async def get_all_jobs():
    jobs = await jobs_collection.find({"status": "active"}).sort("created_at", -1).to_list(100)
    for job in jobs:
        job.pop("_id", None)
    return jobs


@app.get("/api/jobs/my-jobs")
async def get_my_jobs(current_user = Depends(get_current_user)):
    if current_user["role"] != UserRole.EMPLOYER:
        raise HTTPException(status_code=403, detail="Only employers can access this")
    
    jobs = await jobs_collection.find({"employer_id": current_user["user_id"]}).sort("created_at", -1).to_list(100)
    
    # Get match count for each job
    result = []
    for job in jobs:
        job.pop("_id", None)
        match_count = await matches_collection.count_documents({"job_id": job["job_id"]})
        job["match_count"] = match_count
        result.append(job)
    
    return result


@app.get("/api/jobs/{job_id}/matches")
async def get_job_matches(job_id: str, current_user = Depends(get_current_user)):
    """Get worker matches for a specific job"""
    if current_user["role"] != UserRole.EMPLOYER:
        raise HTTPException(status_code=403, detail="Only employers can access this")
    
    # Verify job belongs to employer
    job = await jobs_collection.find_one({"job_id": job_id, "employer_id": current_user["user_id"]})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Get matches
    matches = await matches_collection.find({"job_id": job_id}).sort("match_score", -1).to_list(100)
    
    # Populate worker details
    result = []
    for match in matches:
        worker = await workers_collection.find_one({"worker_id": match["worker_id"]})
        if worker:
            worker.pop("_id", None)
            match.pop("_id", None)
            result.append({"match": match, "worker": worker})
    
    return result


# ============ MATCHING ENGINE ============

async def run_matching_engine():
    """
    Cron job that runs every 5 minutes to match workers with jobs
    """
    print(f"[{datetime.utcnow()}] Running matching engine...")
    
    # Get all active jobs
    jobs = await jobs_collection.find({"status": "active"}).to_list(1000)
    
    # Get all workers
    workers = await workers_collection.find({}).to_list(1000)
    
    match_count = 0
    
    for job in jobs:
        for worker in workers:
            # Check if match already exists
            existing_match = await matches_collection.find_one({
                "job_id": job["job_id"],
                "worker_id": worker["worker_id"]
            })
            
            if existing_match:
                continue
            
            # Calculate match score
            score = 0.0
            
            # 1. Location score (40% weight)
            location_score = calculate_distance_score(
                {"district": job["district"], "state": job["state"]},
                {"district": worker["district"], "state": worker["state"]}
            )
            score += location_score * 0.4
            
            # 2. Job type match (30% weight)
            if job["job_type"] == worker["job_type"]:
                score += 30.0
            
            # 3. Wage compatibility (30% weight)
            wage_diff = abs(job["daily_wage_offered"] - worker["expected_daily_wage"])
            if wage_diff == 0:
                score += 30.0
            elif wage_diff <= 50:
                score += 25.0
            elif wage_diff <= 100:
                score += 20.0
            elif wage_diff <= 200:
                score += 10.0
            
            # Only create match if score is above threshold
            if score >= 40:
                match_doc = {
                    "match_id": str(uuid.uuid4()),
                    "job_id": job["job_id"],
                    "worker_id": worker["worker_id"],
                    "match_score": score,
                    "status": "pending",
                    "created_at": datetime.utcnow()
                }
                await matches_collection.insert_one(match_doc)
                match_count += 1
                
                # Send mock notification
                await send_mock_notification(worker, job, score)
    
    print(f"[{datetime.utcnow()}] Matching complete. Created {match_count} new matches.")


async def send_mock_notification(worker: dict, job: dict, score: float):
    """Mock SMS/Voice notification system with multilingual support"""
    
    # Get worker's language preference
    worker_lang = worker.get("language", "hi")
    
    # Language-specific notification templates
    templates = {
        "hi": f"नमस्कार {worker['name']}! आपके लिए एक नया काम मिल गया है। {job['title']} - {job['village']}, {job['district']}। दैनिक मजदूरी: ₹{job['daily_wage_offered']}। संपर्क: {job['contact_number']}। मैच स्कोर: {score:.0f}%",
        "en": f"Hello {worker['name']}! A new job has been found for you. {job['title']} - {job['village']}, {job['district']}. Daily wage: ₹{job['daily_wage_offered']}. Contact: {job['contact_number']}. Match score: {score:.0f}%",
        "bn": f"নমস্কার {worker['name']}! আপনার জন্য একটি নতুন কাজ পাওয়া গেছে। {job['title']} - {job['village']}, {job['district']}। দৈনিক মজুরি: ₹{job['daily_wage_offered']}। যোগাযোগ: {job['contact_number']}। মিল স্কোর: {score:.0f}%",
        "te": f"నమస్కారం {worker['name']}! మీ కోసం ఒక కొత్త ఉద్యోగం దొరికింది। {job['title']} - {job['village']}, {job['district']}। రోజువారీ వేతనం: ₹{job['daily_wage_offered']}। సంప్రదించండి: {job['contact_number']}। మ్యాచ్ స్కోర్: {score:.0f}%",
        "mr": f"नमस्कार {worker['name']}! तुमच्यासाठी नवीन काम सापडले आहे। {job['title']} - {job['village']}, {job['district']}। दैनिक मजुरी: ₹{job['daily_wage_offered']}। संपर्क: {job['contact_number']}। मॅच स्कोअर: {score:.0f}%",
        "ta": f"வணக்கம் {worker['name']}! உங்களுக்காக ஒரு புதிய வேலை கிடைத்துள்ளது। {job['title']} - {job['village']}, {job['district']}। தினசரி ஊதியம்: ₹{job['daily_wage_offered']}। தொடர்பு: {job['contact_number']}। பொருத்த மதிப்பெண்: {score:.0f}%",
        "gu": f"નમસ્તે {worker['name']}! તમારા માટે નવી નોકરી મળી છે। {job['title']} - {job['village']}, {job['district']}। દૈનિક મજૂરી: ₹{job['daily_wage_offered']}। સંપર્ક: {job['contact_number']}। મેચ સ્કોર: {score:.0f}%",
        "kn": f"ನಮಸ್ಕಾರ {worker['name']}! ನಿಮಗಾಗಿ ಹೊಸ ಕೆಲಸ ಸಿಕ್ಕಿದೆ। {job['title']} - {job['village']}, {job['district']}। ದೈನಂದಿನ ವೇತನ: ₹{job['daily_wage_offered']}। ಸಂಪರ್ಕಿಸಿ: {job['contact_number']}। ಮ್ಯಾಚ್ ಸ್ಕೋರ್: {score:.0f}%",
        "ml": f"നമസ്കാരം {worker['name']}! നിങ്ങൾക്കായി ഒരു പുതിയ ജോലി കണ്ടെത്തി। {job['title']} - {job['village']}, {job['district']}। ദിവസ വേതനം: ₹{job['daily_wage_offered']}। ബന്ധപ്പെടുക: {job['contact_number']}। മാച്ച് സ്കോർ: {score:.0f}%",
        "pa": f"ਸਤ ਸ੍ਰੀ ਅਕਾਲ {worker['name']}! ਤੁਹਾਡੇ ਲਈ ਨਵੀਂ ਨੌਕਰੀ ਮਿਲੀ ਹੈ। {job['title']} - {job['village']}, {job['district']}। ਰੋਜ਼ਾਨਾ ਮਜ਼ਦੂਰੀ: ₹{job['daily_wage_offered']}। ਸੰਪਰਕ: {job['contact_number']}। ਮੈਚ ਸਕੋਰ: {score:.0f}%",
    }
    
    # Get message in worker's language, fallback to Hindi
    message = templates.get(worker_lang, templates["hi"])
    
    notification_doc = {
        "notification_id": str(uuid.uuid4()),
        "worker_id": worker["worker_id"],
        "job_id": job["job_id"],
        "type": "sms",
        "message": message,
        "phone_number": worker["phone_number"],
        "status": "mock_sent",
        "language": worker_lang,
        "sent_at": datetime.utcnow()
    }
    await notifications_collection.insert_one(notification_doc)


@app.get("/api/notifications")
async def get_notifications(current_user = Depends(get_current_user)):
    """Get notifications for logged-in user"""
    if current_user["role"] == UserRole.WORKER:
        worker = await workers_collection.find_one({"user_id": current_user["user_id"]})
        if not worker:
            return []
        notifications = await notifications_collection.find(
            {"worker_id": worker["worker_id"]}
        ).sort("sent_at", -1).to_list(50)
    else:
        notifications = []
    
    for notif in notifications:
        notif.pop("_id", None)
    
    return notifications


# ============ AUDIO TRANSCRIPTION (Real with OpenAI Whisper) ============

from emergentintegrations.llm.openai import OpenAISpeechToText
import tempfile
import re

@app.post("/api/audio/transcribe")
async def transcribe_audio(file: UploadFile = File(...), language: str = "hi"):
    """
    Real audio transcription endpoint using OpenAI Whisper API
    Supports multiple Indian languages
    """
    try:
        # Map language codes to ISO-639-1 for Whisper
        lang_map = {
            "hi": "hi",  # Hindi
            "bn": "bn",  # Bengali
            "te": "te",  # Telugu
            "mr": "mr",  # Marathi
            "ta": "ta",  # Tamil
            "gu": "gu",  # Gujarati
            "kn": "kn",  # Kannada
            "ml": "ml",  # Malayalam
            "pa": "pa",  # Punjabi
            "or": "or",  # Odia
            "as": "as",  # Assamese
            "ur": "ur",  # Urdu
            "en": "en",  # English
        }
        
        whisper_lang = lang_map.get(language, "hi")
        
        # Save uploaded file to temp location
        contents = await file.read()
        
        # Create temp file with appropriate extension
        file_ext = file.filename.split('.')[-1] if '.' in file.filename else 'webm'
        with tempfile.NamedTemporaryFile(delete=False, suffix=f'.{file_ext}') as temp_file:
            temp_file.write(contents)
            temp_path = temp_file.name
        
        # Initialize Whisper STT
        stt = OpenAISpeechToText(api_key=EMERGENT_LLM_KEY)
        
        # Transcribe the audio
        with open(temp_path, "rb") as audio_file:
            response = await stt.transcribe(
                file=audio_file,
                model="whisper-1",
                response_format="json",
                language=whisper_lang
            )
        
        # Clean up temp file
        import os as os_module
        os_module.unlink(temp_path)
        
        transcribed_text = response.text
        
        return {
            "transcribed_text": transcribed_text,
            "language": language,
            "message": "Audio transcription successful"
        }
        
    except Exception as e:
        print(f"Transcription error: {e}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


@app.post("/api/audio/parse-registration")
async def parse_registration_from_audio(data: dict):
    """
    Parse transcribed audio text to extract registration details using AI
    """
    try:
        text = data.get("text", "")
        language = data.get("language", "hi")
        
        # Language names for prompt
        lang_names = {
            "hi": "Hindi",
            "bn": "Bengali", 
            "te": "Telugu",
            "mr": "Marathi",
            "ta": "Tamil",
            "gu": "Gujarati",
            "kn": "Kannada",
            "ml": "Malayalam",
            "pa": "Punjabi",
            "or": "Odia",
            "as": "Assamese",
            "ur": "Urdu",
            "en": "English"
        }
        
        target_lang = lang_names.get(language, "Hindi")
        
        # Use LLM to extract structured data from the transcribed text
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"parse_audio_{uuid.uuid4()}",
            system_message=f"""You are an AI assistant that extracts structured registration information from transcribed speech.
The speech is in {target_lang}. Extract the following fields if present:
- name: The person's name
- area: Village or area name
- district: District name
- state: State name
- job_type: Type of work (Mason, Labour, Plumber, Electrician, Painter)
- expected_daily_wage: Expected daily wage in rupees (just the number)
- phone_number: Phone number (10 digits)

Return the data as a valid JSON object with these exact field names. If a field is not found, use null.
Example output: {{"name": "Raj Kumar", "area": "Agra", "district": "Agra", "state": "Uttar Pradesh", "job_type": "Mason", "expected_daily_wage": 500, "phone_number": "9876543210"}}
Only output the JSON, nothing else."""
        ).with_model("openai", "gpt-5.2")
        
        result = await chat.send_message(UserMessage(text=f"Extract registration details from this speech: {text}"))
        
        # Parse the JSON response
        import json
        try:
            # Clean up the response in case there's markdown formatting
            clean_result = result.strip()
            if clean_result.startswith("```"):
                clean_result = clean_result.split("```")[1]
                if clean_result.startswith("json"):
                    clean_result = clean_result[4:]
            clean_result = clean_result.strip()
            
            parsed_data = json.loads(clean_result)
        except json.JSONDecodeError:
            parsed_data = {}
        
        return {
            "parsed_data": parsed_data,
            "original_text": text,
            "language": language
        }
        
    except Exception as e:
        print(f"Parsing error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to parse registration data: {str(e)}")


# ============ STARTUP & SHUTDOWN ============

@app.on_event("startup")
async def startup_event():
    """Start the matching engine scheduler"""
    # Run matching engine every 5 minutes
    scheduler.add_job(run_matching_engine, 'interval', minutes=5)
    scheduler.start()
    print("✅ Matching engine scheduler started (runs every 5 minutes)")


@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    scheduler.shutdown()
    client.close()


# ============ HEALTH CHECK ============

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "GraminRozgar API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
