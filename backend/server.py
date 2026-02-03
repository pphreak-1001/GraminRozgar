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
    """Get job matches for the logged-in worker"""
    if current_user["role"] != UserRole.WORKER:
        raise HTTPException(status_code=403, detail="Only workers can access this")
    
    # Get worker profile
    worker = await workers_collection.find_one({"user_id": current_user["user_id"]})
    if not worker:
        raise HTTPException(status_code=404, detail="Worker profile not found")
    
    # Get matches
    matches = await matches_collection.find(
        {"worker_id": worker["worker_id"], "status": "pending"}
    ).sort("match_score", -1).to_list(50)
    
    # Populate job details
    result = []
    for match in matches:
        job = await jobs_collection.find_one({"job_id": match["job_id"]})
        if job:
            job.pop("_id", None)
            match.pop("_id", None)
            result.append({"match": match, "job": job})
    
    return result


# ============ CHATBOT ROUTES ============

@app.post("/api/chatbot/conversation")
async def chatbot_conversation(msg: ChatbotMessage):
    """Handle chatbot conversation for worker signup"""
    
    # Get or create session
    session = await chatbot_sessions_collection.find_one({"session_id": msg.session_id})
    
    if not session:
        # New session - initialize
        session = {
            "session_id": msg.session_id,
            "messages": [],
            "data": {},
            "step": "greeting",
            "language": msg.language,
            "created_at": datetime.utcnow()
        }
        await chatbot_sessions_collection.insert_one(session)
    
    # Append user message
    session["messages"].append({"role": "user", "content": msg.message})
    
    # Create chatbot instance
    system_prompt = """You are a helpful assistant for GraminRozgar, a rural employment platform in India. 
    Your job is to help workers sign up by collecting their information in a conversational way.
    Ask one question at a time. Be warm, friendly, and use simple language.
    
    Collect the following information in order:
    1. Name (Aapka naam kya hai?)
    2. Area/Village (Aap kahan rehte hain? Gaon ya shehar?)
    3. District (Aapka zilaa?)
    4. State (Aapka raajya?)
    5. Job Type (Aap kya kaam karte hain? Mason, Labour, Plumber, Electrician, ya Painter?)
    6. Expected daily wage (Aapko roz kitne paise chahiye?)
    7. Phone number (Aapka mobile number?)
    
    After collecting all information, confirm and say registration is complete."""
    
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=msg.session_id,
        system_message=system_prompt
    ).with_model("openai", "gpt-5.2")
    
    user_message = UserMessage(text=msg.message)
    response = await chat.send_message(user_message)
    
    # Append bot response
    session["messages"].append({"role": "assistant", "content": response})
    
    # Update session in database
    await chatbot_sessions_collection.update_one(
        {"session_id": msg.session_id},
        {"$set": {"messages": session["messages"], "updated_at": datetime.utcnow()}}
    )
    
    return {"response": response, "session_id": msg.session_id}


@app.post("/api/chatbot/complete-registration")
async def complete_chatbot_registration(session_id: str):
    """Complete worker registration from chatbot session"""
    session = await chatbot_sessions_collection.find_one({"session_id": session_id})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Extract data from conversation using AI
    messages_text = "\n".join([f"{m['role']}: {m['content']}" for m in session["messages"]])
    
    extraction_prompt = f"""From this conversation, extract the worker's information and return ONLY a JSON object with these exact fields:
    {{
        "name": "extracted name",
        "area": "village/town name",
        "district": "district name",
        "state": "state name",
        "job_type": "one of: Mason, Labour, Plumber, Electrician, Painter",
        "expected_daily_wage": numeric value,
        "phone_number": "phone number"
    }}
    
    Conversation:
    {messages_text}
    
    Return ONLY the JSON, no other text."""
    
    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id + "_extract",
        system_message="You extract structured data from conversations and return only JSON."
    ).with_model("openai", "gpt-5.2")
    
    extracted = await chat.send_message(UserMessage(text=extraction_prompt))
    
    # Parse the extracted data
    import json
    try:
        data = json.loads(extracted)
    except:
        raise HTTPException(status_code=400, detail="Could not extract complete information from conversation")
    
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
    """Mock SMS/Voice notification system"""
    notification_doc = {
        "notification_id": str(uuid.uuid4()),
        "worker_id": worker["worker_id"],
        "job_id": job["job_id"],
        "type": "sms",
        "message": f"Namaskar {worker['name']}! Aapke liye ek naya kaam mil gaya hai. {job['title']} - {job['village']}, {job['district']}. Daily wage: ₹{job['daily_wage_offered']}. Contact: {job['contact_number']}. Match score: {score:.0f}%",
        "phone_number": worker["phone_number"],
        "status": "mock_sent",
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


# ============ AUDIO TRANSCRIPTION (Mock) ============

@app.post("/api/audio/transcribe")
async def transcribe_audio(file: UploadFile = File(...), language: str = "hi"):
    """
    Mock audio transcription endpoint
    In production, this would use OpenAI Whisper API
    """
    # For now, return a mock response
    return {
        "transcribed_text": "Mera naam Raj hai. Main Agra se hoon. Main mason ka kaam karta hoon.",
        "language": language,
        "message": "Audio transcription successful (MOCK)"
    }


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
