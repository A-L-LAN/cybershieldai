# 🛡️ CyberShield AI

**AI-Powered Cybersecurity Assistant for Small Businesses**

CyberShield AI helps organizations identify, understand, and respond to cybersecurity threats using Artificial Intelligence and real-time threat intelligence. The platform analyzes phishing emails, suspicious URLs, malicious IP addresses, and cybersecurity questions while providing clear explanations and actionable recommendations in plain language.

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/f8ccba8e-3319-4fc8-aad4-1fbc21f9f8e2" />


## 🚀 Features

### 🤖 AI Security Assistant

Ask cybersecurity questions in natural language and receive understandable guidance powered by Google Gemini.

### 📧 Phishing Email Analyzer

Detect phishing attempts by analyzing suspicious emails for:

* Urgency language
* Credential requests
* Social engineering tactics
* Suspicious content patterns

### 🌐 URL Threat Scanner

Scan websites using VirusTotal threat intelligence to identify:

* Malware
* Phishing websites
* Suspicious domains
* Malicious URLs

### 🔍 IP Reputation Checker

Analyze IP addresses using AbuseIPDB to identify:

* Malicious actors
* Abuse reports
* Suspicious activity
* Reputation scores

### 📊 Risk Scoring

Generate understandable risk levels:

* Low
* Medium
* High
* Critical

### 🛡️ Human-in-the-Loop Security

CyberShield AI provides recommendations and explanations while keeping humans responsible for critical security decisions.


## 🏗️ Architecture

```text
User Input
    │
    ▼
CyberShield AI
    │
    ├── Google Gemini
    │      ├── Threat Explanation
    │      ├── Security Guidance
    │      └── Risk Interpretation
    │
    ├── VirusTotal API
    │      └── URL Reputation
    │
    ├── AbuseIPDB API
    │      └── IP Reputation
    │
    ├── Have I Been Pwned
    │      └── Breach Detection
    │
    └── NIST NVD
           └── CVE Intelligence

            ▼

    Risk Assessment
            ▼

 Security Recommendations
```


## 🛠️ Tech Stack

### Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* Shadcn/UI

### Backend

* FastAPI
* Python
* Pydantic
* SQLAlchemy

### AI Layer

* Google Gemini 2.5 Flash
* Google Gemini API

### Threat Intelligence

* VirusTotal API
* AbuseIPDB API
* Have I Been Pwned API
* NIST National Vulnerability Database (NVD)

### Development Tools

* GitHub
* VS Code


## 📂 Project Structure

```text
cybershield-ai/
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── scan-email/
│   │   ├── scan-url/
│   │   ├── check-ip/
│   │   └── chat/
│   │
│   └── components/
│
├── backend/
│   ├── main.py
│   ├── security_assistant.py
│   ├── services/
│   ├── models/
│   ├── requirements.txt
│   └── .env
│
└── README.md
```


## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/A-L-LAN/cybershield-ai.git

cd cybershield-ai
```


## Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create Environment Variables

Create:

```text
backend/.env
```

Add:

```env
GEMINI_API_KEY=CREATE_YOUR_OWN_GEMINI_API_KEY

VIRUSTOTAL_API_KEY=CREATE_YOUR_OWN_VIRUSTOTAL_API_KEY

ABUSEIPDB_API_KEY=CREATE_YOUR_OWN_ABUSEIPDB_API_KEY

HIBP_API_KEY=CREATE_YOUR_OWN_HIBP_API_KEY

NVD_API_KEY=CREATE_YOUR_OWN_NVD_API_KEY

I Can't share my API keys
```

### Run Backend

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```


## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```


## API Endpoints

### AI Chat

```http
POST /chat
```

### Email Analysis

```http
POST /scan-email
```

### URL Scan

```http
POST /scan-url
```

### IP Reputation Check

```http
POST /check-ip
```

### Security Advice

```http
POST /security-advice
```

### Dashboard

```http
GET /dashboard
```


## Responsible AI

CyberShield AI follows a Human-in-the-Loop approach.

The AI system:

✅ Explains threats

✅ Provides risk assessments

✅ Recommends actions

The AI does NOT:

❌ Block users automatically

❌ Delete files

❌ Isolate systems

❌ Respond to incidents autonomously

Critical decisions remain under human control to ensure accountability and responsible AI usage.


## Future Roadmap

* Real-time network monitoring
* Browser extension for phishing detection
* Vulnerability assessment
* Security compliance assistance
* Employee awareness training
* Ransomware detection
* Predictive threat intelligence
* AI-assisted incident response


## Demo Video

Watch the project demo:

https://youtu.be/FWAK46RG5js


## Screenshots

### Dashboard

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/cd28312a-acea-417e-8f9a-a99aba822209" />


### AI Assistant

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/73227950-93bb-41db-b8d7-f33a64254aa0" />


### Email Analyzer

Add email analyzer screenshot here.

### URL Scanner

Add URL scanner screenshot here.

### IP Reputation Checker

Add IP reputation screenshot here.


## Team

### Allan Sang and Timothy Mutuma

Founders

CyberShield AI was created to make cybersecurity more accessible, understandable, and actionable for small businesses and underserved organizations worldwide.


## License

MIT License

Copyright (c) 2026 CyberShield AI
