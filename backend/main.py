```python
import os
from typing import Optional

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

# =====================================================
# CONFIG
# =====================================================

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
VIRUSTOTAL_API_KEY = os.getenv("VIRUSTOTAL_API_KEY")
ABUSEIPDB_API_KEY = os.getenv("ABUSEIPDB_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

# =====================================================
# FASTAPI
# =====================================================

app = FastAPI(
    title="CyberShield AI",
    description="AI Cybersecurity Assistant",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# MODELS
# =====================================================

class ChatRequest(BaseModel):
    question: str

class EmailRequest(BaseModel):
    email: str

class URLRequest(BaseModel):
    url: str

class IPRequest(BaseModel):
    ip: str

# =====================================================
# HELPERS
# =====================================================

def classify_risk(score: int):
    if score >= 80:
        return "HIGH"

    if score >= 50:
        return "MEDIUM"

    return "LOW"


def ask_ai(system_prompt: str, user_prompt: str):

    response = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    return response.choices[0].message.content

# =====================================================
# ROOT
# =====================================================

@app.get("/")
async def home():
    return {
        "name": "CyberShield AI",
        "status": "running",
        "version": "1.0.0"
    }

# =====================================================
# HEALTH CHECK
# =====================================================

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }

# =====================================================
# AI SECURITY CHAT
# =====================================================

@app.post("/chat")
async def chat(data: ChatRequest):

    answer = ask_ai(
        "You are a professional cybersecurity analyst.",
        data.question
    )

    return {
        "response": answer
    }

# =====================================================
# EMAIL PHISHING ANALYZER
# =====================================================

@app.post("/scan-email")
async def scan_email(data: EmailRequest):

    prompt = f"""
    Analyze the following email.

    Return:
    1. Risk Level
    2. Phishing Indicators
    3. Explanation
    4. Recommended Action

    Email:

    {data.email}
    """

    result = ask_ai(
        "You are an expert phishing analyst.",
        prompt
    )

    return {
        "analysis": result
    }

# =====================================================
# URL ANALYZER
# =====================================================

@app.post("/scan-url")
async def scan_url(data: URLRequest):

    if not VIRUSTOTAL_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="VirusTotal API key missing"
        )

    headers = {
        "x-apikey": VIRUSTOTAL_API_KEY
    }

    response = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers=headers,
        data={
            "url": data.url
        }
    )

    if response.status_code not in [200, 202]:
        raise HTTPException(
            status_code=500,
            detail="VirusTotal request failed"
        )

    return response.json()

# =====================================================
# IP REPUTATION CHECK
# =====================================================

@app.post("/check-ip")
async def check_ip(data: IPRequest):

    if not ABUSEIPDB_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="AbuseIPDB API key missing"
        )

    response = requests.get(
        "https://api.abuseipdb.com/api/v2/check",
        headers={
            "Accept": "application/json",
            "Key": ABUSEIPDB_API_KEY
        },
        params={
            "ipAddress": data.ip,
            "maxAgeInDays": 90
        }
    )

    return response.json()

# =====================================================
# CYBERSECURITY ADVISOR
# =====================================================

@app.post("/security-advice")
async def security_advice(data: ChatRequest):

    result = ask_ai(
        "You are a cybersecurity advisor helping small businesses.",
        data.question
    )

    return {
        "advice": result
    }

# =====================================================
# DASHBOARD
# =====================================================

@app.get("/dashboard")
async def dashboard():

    return {
        "threats_today": 12,
        "high_risk": 3,
        "medium_risk": 5,
        "low_risk": 4,
        "status": "Protected"
    }

# =====================================================
# RISK SCORE DEMO
# =====================================================

@app.get("/risk-score/{score}")
async def risk_score(score: int):

    return {
        "score": score,
        "level": classify_risk(score)
    }
```
