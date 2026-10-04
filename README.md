# NiveshRakshak AI 🛡️
> **"Before You Trust. Check with AI."**
> **Applied AI for Investor Protection, Financial Literacy, and Resilience**
> *Developed for the SANGYAN Hackathon organized by SNTC, IIT (BHU) Varanasi in collaboration with SEBI and NSDL.*

---

## 🏆 Project Overview

**NiveshRakshak** is an AI-powered investor safety copilot and financial literacy platform tailored for Indian retail investors, with special accessibility emphasis on first-time investors and users from Tier-2 and Tier-3 cities.

In recent years, millions of retail investors have entered Indian capital markets via smartphones. Unfortunately, fraudulent operators leverage messaging apps (WhatsApp, Telegram), social media ads, and fake regulatory certificates to solicit funds with deceptive promises of *"guaranteed 30% monthly profits"*, *"SEBI-approved AI trading bots"*, and *"insider stock tips"*.

**NiveshRakshak strictly does NOT:**
- Provide stock tips, buy/sell/hold calls, or trading advice.
- Predict stock prices or speculate on financial market outcomes.
- Upsell financial products or broker accounts.
- Collect OTPs, PINs, passwords, bank logins, or sensitive personal data.

**Instead, NiveshRakshak acts as a defensive safety shield:**
- **PAUSE**: Encourages investors to slow down before parting with funds.
- **DETECT**: Identifies objective fraud and high-risk signals with verbatim evidence extraction.
- **UNDERSTAND**: Simplifies complex regulatory disclaimers into plain English and natural colloquial Tamil.
- **ACT SAFELY**: Provides step-by-step verification checklists, emergency golden-hour instructions (1930 Cyber Helpline & SEBI SCORES), and formal complaint drafts.

---

## 🚀 Key Features

### 1. 🛡️ Investor Safety Analyzer (Primary Workflow)
- **Input Modes**: Paste message text or upload screenshots (WhatsApp chats, Telegram forwards, Instagram ads, fake certificates).
- **OCR Engine**: Extracts text from screenshots and highlights flagged regions visually.
- **Investor Safety Meter (0–100)**:
  - `0–30`: **LOW CONCERN** (Green) — Compliant disclosures, standard educational disclaimers.
  - `31–60`: **CAUTION** (Amber) — Unclear terms, unverified advisory claims.
  - `61–80`: **HIGH CONCERN** (Orange) — High return promises without risk warnings.
  - `81–100`: **CRITICAL CONCERN** (Red) — Prohibited guaranteed returns, fake SEBI approvals, urgency countdowns, personal UPI transfer requests.
- **Evidence-Grounded Signals**: Every flag displays the verbatim snippet from the message, why it is dangerous, and what the investor must do.
- **Safe Action Plan**: Interactive checklist with direct links to the SEBI Intermediaries Directory and Cybercrime portal.

### 2. 📖 "Explain This to Me" (Financial Language Simplifier)
- Converts dense financial disclaimers, F&O risk disclosures, and mutual fund exit load conditions into:
  1. **Simple English** (crystal clear, jargon-free).
  2. **Simple Tamil (எளிய தமிழ்)** (accessible, everyday language for Tier-2/3 investors).
  3. **What It Actually Means** (the practical real-world consequence).
  4. **Hidden Risks to Understand** (early withdrawal penalties, capital fluctuation).
  5. **Important Terms Glossary** (Market Volatility, Liquidity Risk, Exit Load, Derivatives).

### 3. 🔍 Investment Claim Checker
- Specialized single-claim analysis tool.
- Deconstructs promotional statements (e.g. *"Guaranteed 40% returns in 3 months through our AI bot"*).
- Visual breakdown:
  - Extracted Return Claim
  - Guarantee Language Indicator
  - Time Pressure / Artificial Horizon
  - Misleading Claim Flags
  - Safety Interpretation & Regulatory Status

### 4. 🆘 "What Should I Do Now?" (Grievance Assistant)
- Guided assistance for 4 common investor distress scenarios:
  1. *Transferred money to a fraudulent account or entity*
  2. *Platform refuses withdrawal or demands advance "tax/clearance" fees*
  3. *Broker dispute or unauthorized order executions*
  4. *Unregistered advisory tips / Telegram pump-and-dump channel*
- Provides:
  - **Golden Hour Emergency Protocol** (dialing 1930 within 2 hours to freeze recipient accounts).
  - **Evidence to Preserve** (UTR reference numbers, chat exports, screenshots).
  - **Official Contacts** (National Cyber Crime 1930, SEBI SCORES 2.0, NSDL Grievance Cell, RBI Sachet).
  - **Formal Escalation Ladder** (Broker -> SCORES -> SMART ODR).
  - **Ready-to-Use Complaint Draft Template** with 1-click copy.

### 5. 📊 Investor Safety Intelligence Dashboard
- Interactive Recharts analytics displaying:
  - Real-time scan telemetry and risk distribution.
  - **Top Scam Patterns Detected** (Guaranteed Returns, Fake Regulatory Claims, Urgency Tactics, Personal UPI Demands).
  - **Threat Channel Breakdown** (WhatsApp, Telegram, Social Media Ads, SMS).

### 6. ⚡ Built-in 5 Demo Scenarios (<60s Judge Evaluation)
Judges can click any demo scenario to test the application instantly:
1. **Demo 1**: *Guaranteed-Return Investment Scam* (35% monthly, AI bot, GPay transfer) -> Score: 94/100 CRITICAL.
2. **Demo 2**: *Fake SEBI Impersonation* ("Senior Director Sharma", ₹25,000 security deposit) -> Score: 92/100 CRITICAL.
3. **Demo 3**: *Urgent WhatsApp Offer* ("Double money in 7 days, 2 slots left, closing in 45 mins") -> Score: 88/100 CRITICAL.
4. **Demo 4**: *Phishing URL & OTP Scam* ("Work from home stock rating, enter OTP") -> Score: 96/100 CRITICAL.
5. **Demo 5**: *Legitimate Mutual Fund Message* (Proper risk disclosure, AMFI ARN verification) -> Score: 12/100 LOW CONCERN.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────┐
│               USER INTERFACE (React + Vite)            │
│  - Regional Language Toggle (English | தமிழ்)           │
│  - Investor Safety Meter & SVG Gauge                   │
│  - Visual Screenshot Annotator (Flagged Regions)       │
│  - 5 Built-in One-Click Demo Scenarios                 │
└───────────────────────────▲────────────────────────────┘
                            │ REST JSON
┌───────────────────────────▼────────────────────────────┐
│                 FASTAPI BACKEND SERVICE                 │
│                 (http://127.0.0.1:8080)                │
├────────────────────────────────────────────────────────┤
│  API Endpoints:                                        │
│  - POST /api/analyze         (Text Analysis)           │
│  - POST /api/analyze-image   (Screenshot OCR Analysis) │
│  - POST /api/explain         (Language Simplifier)     │
│  - POST /api/check-claim     (Claim Checker)           │
│  - POST /api/grievance-guide (Grievance Assistance)    │
│  - GET  /api/scenarios       (Built-in Demo Scenarios) │
│  - GET  /api/dashboard/stats (Telemetry & Patterns)    │
├────────────────────────────────────────────────────────┤
│                  HYBRID AI ENGINE                      │
│                                                        │
│  ┌─────────────────────────┐ ┌──────────────────────┐  │
│  │ Local NLP Safety Engine │ │  Gemini LLM Layer    │  │
│  │ (Deterministic Rules)   │ │  (API Key Optional)  │  │
│  │ - 8 Core Signal Classes │ │ - Synthesis          │  │
│  │ - Verbatim Evidence     │ │ - Bilingual Framing  │  │
│  │ - Grounded 0-100 Score  │ │ - Safe Guardrails    │  │
│  └─────────────────────────┘ └──────────────────────┘  │
│                                                        │
│  Zero-Fail Resilience: Works 100% offline & locally    │
└────────────────────────────────────────────────────────┘
```

---

## 🔒 Privacy & Data Ethics

- **Zero Permanent Storage**: Uploaded screenshots and message texts are analyzed strictly in-memory and discarded.
- **No Credential Harvesting**: The system never asks for, records, or logs OTPs, bank credentials, PAN, Aadhaar, or passwords.
- **Non-Speculative Public Good**: No commercial partnerships, trading commissions, or financial upsells.
- **Transparent Uncertainty**: The engine explicitly displays:
  > *"This score reflects risk indicators detected in the submitted content. It is not a legal or regulatory determination that the sender or investment is fraudulent. Always verify independently on official SEBI (sebi.gov.in) and NSDL registries."*

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts |
| **Backend** | Python 3.13, FastAPI, Uvicorn, Pydantic v2, Pillow, HTTPX |
| **AI Layer** | Hybrid Architecture: Deterministic Local NLP Rule Engine + LLM Abstraction (Gemini API) |
| **Accessibility** | Dual Language: English + Natural Colloquial Tamil (தமிழ்) |

---

## 💻 Local Setup & Quickstart

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.10+)

### 1. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt
python run.py
```
*The FastAPI backend will start on `http://127.0.0.1:8080`.*
*Interactive API Swagger Documentation: `http://127.0.0.1:8080/docs`.*

### 2. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*The Vite application will start on `http://127.0.0.1:5173`.*

*(Optional)* To enable Gemini LLM API enrichment, set the environment variable:
```bash
# Windows PowerShell
$env:GEMINI_API_KEY="your_api_key_here"
# Or run without API key — the deterministic local engine works 100% out of the box!
```

---

## ⚡ Demo Checklist for Judges (<60 Seconds)

1. Open `http://127.0.0.1:5173/` in your browser.
2. In the **Built-in Demo Scenarios** row, click **"1. Guaranteed-Return Investment Scam"**.
3. Observe:
   - Automated message population and analysis execution.
   - **Investor Safety Meter**: `94/100 CRITICAL CONCERN`.
   - **Detected Signals**: Guaranteed Returns, Fake Regulatory Claim, Urgency, Personal UPI Request.
   - **Evidence Quotations**: Verbatim lines extracted from the message.
   - **Visual Signal Annotator**: Highlighted risk boxes.
   - **Safe Action Plan**: Step-by-step checklist.
4. Click the **"தமிழ்"** button in the top navbar or **"தமிழில் விளக்கம்"** to toggle natural Tamil explanations.
5. Click **"Explain This"** to test financial language simplification into plain English and Tamil.
6. Click **"Claim Checker"** to test a promotional statement breakdown.
7. Click **"Grievance Guide"** to inspect the 1930 Cyber helpline instructions and copyable complaint draft.
8. Click **"Dashboard"** to view risk distributions and scam pattern charts.

---

## 🔮 Limitations & Future Scalability

1. **WhatsApp & Telegram Chatbot Integration**: Package the safety engine as an official WhatsApp business chatbot where retail users can directly forward messages for instant safety verdicts.
2. **Additional Regional Languages**: Expand beyond English and Tamil into Hindi, Telugu, Kannada, Bengali, and Marathi to cover pan-India Tier-2/3 investors.
3. **SEBI SCORES 2.0 Direct API Integration**: Partner with regulatory bodies to allow one-click complaint filing pre-populated with verified digital evidence.
4. **Crowdsourced Scam Intelligence Database**: Enable community reporting of fraudulent UPI IDs and fake Telegram channels to create a public blacklist.

---

## 📜 Acknowledgements & Collaboration

Developed with pride for the **SANGYAN Hackathon** organized by **SNTC, IIT (BHU) Varanasi** in collaboration with **SEBI** (Securities and Exchange Board of India) and **NSDL** (National Securities Depository Limited).
