from typing import Dict, List, Optional
from app.models.schemas import GrievanceResponse, ContactEntity

SITUATIONS_DB = {
    "money_transferred": {
        "title": "Money Transferred to Suspicious Entity / Scammer",
        "title_ta": "சந்தேகத்திற்கிடமான நபருக்கு பணம் அனுப்பப்பட்டுவிட்டது",
        "title_hi": "संदिग्ध व्यक्ति या धोखेबाज को पैसे ट्रांसफर कर दिए गए हैं",
        "immediate_steps": [
            "ACT WITHIN THE GOLDEN HOUR (FIRST 2 HOURS): Call 1930 (National Cyber Crime Helpline) immediately to flag the transaction and request freezing of the beneficiary account.",
            "Call your bank's 24x7 fraud helpline to report the transaction ID (UTR/RRN) and request an immediate recall / freeze.",
            "File a formal complaint on the official National Cyber Crime Reporting Portal at https://cybercrime.gov.in under 'Financial Fraud'.",
            "Do NOT pay any additional 'release fees', 'income tax clearing charges', or 'conversion fees' demanded to return your funds."
        ],
        "immediate_steps_ta": [
            "முதல் 2 மணி நேரத்திற்குள் 1930 (தேசிய சைபர் கிரைம் உதவி எண்) என்ற எண்ணை அழைத்து உடனடியாக பரிவர்த்தனையை முடக்கக் கோருங்கள்.",
            "உங்கள் வங்கியின் 24x7 அவசர எண்ணை அழைத்து, அந்த பரிவர்த்தனை எண்ணை (UTR) தெரிவித்து கணக்கை முடக்கக் கோருங்கள்.",
            "cybercrime.gov.in என்ற அதிகாரப்பூர்வ அரசு இணையதளத்தில் 'நிதி மோசடி' பிரிவில் உடனே புகார் பதிவு செய்யவும்.",
            "பணத்தைத் திரும்பத் தர 'வரி' அல்லது 'செயலாக்கக் கட்டணம்' கேட்கப்பட்டால் எக்காரணம் கொண்டும் கூடுதல் பணம் செலுத்தாதீர்கள்."
        ],
        "immediate_steps_hi": [
            "गोल्डन आवर (पहले 2 घंटे) में कार्रवाई करें: तुरंत 1930 (राष्ट्रीय साइबर अपराध हेल्पलाइन) पर कॉल करें और लाभार्थी खाते को फ्रीज करने का अनुरोध करें।",
            "लेनदेन आईडी (UTR/RRN) दर्ज कराने और तत्काल रोक लगाने के लिए अपने बैंक की 24x7 हेल्पलाइन पर कॉल करें।",
            "आधिकारिक राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) पर 'वित्तीय धोखाधड़ी' के तहत शिकायत दर्ज करें।",
            "पैसे वापस पाने के लिए किसी भी अतिरिक्त 'रिलीज़ शुल्क', 'आयकर शुल्क' या 'प्रसंस्करण शुल्क' का भुगतान बिल्कुल न करें।"
        ],
        "evidence": [
            "Bank statement showing debit date, time, amount, and 12-digit UTR/RRN number.",
            "Screenshots of entire WhatsApp/Telegram chats including phone numbers, profile handles, and group messages.",
            "Payment screenshots showing recipient UPI ID or account name.",
            "Website URLs, download links (APK files), or fake certificate copies provided by the entity."
        ],
        "contacts": [
            ContactEntity(
                name="National Cyber Crime Helpline",
                portal="https://cybercrime.gov.in",
                helpline="1930 (Toll Free, 24x7)",
                description="Primary government agency for freezing fraudulent bank accounts in real-time.",
                type="cybercrime"
            ),
            ContactEntity(
                name="SEBI SCORES 2.0 Portal",
                portal="https://scores.sebi.gov.in",
                helpline="1800 22 7575 / 1800 266 7575",
                description="Official SEBI platform for investor complaints against registered and unregistered intermediaries.",
                type="regulatory"
            ),
            ContactEntity(
                name="RBI Sachet Portal",
                portal="https://sachet.rbi.org.in",
                helpline="14440",
                description="RBI forum to report illegal deposit-taking schemes and Ponzi activities.",
                type="banking"
            )
        ],
        "info_needed": [
            "Bank account number and registered mobile number.",
            "Transaction reference number (UTR/IMPS/UPI Ref ID).",
            "Beneficiary account number / UPI VPA and IFSC if known.",
            "Time-stamped screenshots of communications."
        ],
        "escalation_path": [
            "Step 1: Emergency dial 1930 + Local Bank Fraud Notification (0-2 hrs)",
            "Step 2: File at cybercrime.gov.in and obtain an Acknowledgement Number (Day 1)",
            "Step 3: Submit FIR copy and Cyber acknowledgement to your bank home branch (Day 1-2)",
            "Step 4: Report to SEBI SCORES if an entity falsely claimed SEBI affiliation"
        ],
        "complaint_template": (
            "To,\n"
            "The Station House Officer / Cyber Crime Cell,\n\n"
            "Subject: Urgent complaint regarding fraudulent money transfer through deceptive investment scheme\n\n"
            "Respected Sir/Madam,\n\n"
            "I, [Your Name], residing at [Your Address], state that on [Date] at [Time], I was misled by an unknown entity on [WhatsApp/Telegram/Website] operating under the name '[Entity/Name]'. "
            "They induced me to transfer a sum of Rs. [Amount] under the false promise of guaranteed investment returns. "
            "The money was transferred from my [Bank Name] Account No. [Your Account No] to beneficiary UPI ID / Account [Beneficiary Details] with UTR/Transaction ID: [Transaction ID].\n\n"
            "When I requested to withdraw my funds, they demanded additional fees and refused my capital. "
            "I request your immediate intervention to freeze the beneficiary account and trace the culprits.\n\n"
            "Enclosed: Bank statement, chat screenshots, and transaction receipt.\n\n"
            "Yours faithfully,\n[Your Name]\n[Mobile No]"
        )
    },
    "unable_to_withdraw": {
        "title": "Trading App / Platform Refusing Withdrawal / Demanding Extra Fees",
        "title_ta": "முதலீட்டு ஆப் பணத்தை திரும்பத் தர மறுக்கிறது / கூடுதல் கட்டணம் கேட்கிறது",
        "title_hi": "ट्रेडिंग ऐप निकासी से इनकार कर रहा है / अतिरिक्त शुल्क मांग रहा है",
        "immediate_steps": [
            "DO NOT send any additional money for 'tax', 'clearance', 'margin deposit', or 'VIP verification'. This is a common advance-fee tactic.",
            "Take complete video screen-recording and screenshots of your account balance, withdrawal refusal messages, and customer support chats.",
            "Check if the broker is genuinely registered on SEBI portal (sebi.gov.in). Fake clone apps often simulate fictitious profits on screen.",
            "Lodge an immediate complaint on National Cyber Crime Helpline (1930) and cybercrime.gov.in."
        ],
        "immediate_steps_ta": [
            "'வரி', 'அங்கீகாரக் கட்டணம்' என்ற பெயரில் கேட்கப்படும் கூடுதல் பணத்தை ஒருபோதும் செலுத்தாதீர்கள்.",
            "ஆப்பில் உள்ள தொகை, பணம் எடுக்க மறுக்கும் செய்தி, மற்றும் உரையாடல்களை முழுமையாக ஸ்கிரீன்ஷாட் மற்றும் வீடியோ பதிவு செய்து கொள்ளவும்.",
            "அந்த நிறுவனம் SEBI-யில் பதிவு செய்யப்பட்டுள்ளதா என்பதை அதிகாரப்பூர்வ sebi.gov.in தளத்தில் சரிபார்க்கவும்.",
            "1930 உதவி எண்ணை அழைத்து உடனடியாக சைபர் கிரைம் புகார் பதிவு செய்யவும்."
        ],
        "immediate_steps_hi": [
            "'टैक्स' या 'मार्जिन डिपॉजिट' के नाम पर कोई अतिरिक्त पैसा न भेजें। यह एक आम अग्रिम-शुल्क धोखाधड़ी रणनीति है।",
            "अपने खाते के शेष, निकासी अस्वीकृति संदेश और ग्राहक सहायता चैट की स्क्रीन-रिकॉर्डिंग और स्क्रीनशॉट लें।",
            "जाँचें कि क्या ब्रोकर वास्तव में SEBI पोर्टल (sebi.gov.in) पर पंजीकृत है। नकली ऐप्स अक्सर स्क्रीन पर काल्पनिक लाभ दिखाते हैं।",
            "तुरंत राष्ट्रीय साइबर अपराध हेल्पलाइन (1930) और cybercrime.gov.in पर शिकायत दर्ज करें।"
        ],
        "evidence": [
            "Screen recording of login, balance display, and withdrawal rejection.",
            "Chat history where support agent demands payment to enable withdrawal.",
            "Original bank deposit slips showing funds transferred to the platform."
        ],
        "contacts": [
            ContactEntity(
                name="Cyber Crime Portal",
                portal="https://cybercrime.gov.in",
                helpline="1930",
                description="To freeze connected fraudulent merchant gateways and accounts.",
                type="cybercrime"
            ),
            ContactEntity(
                name="SEBI Toll-Free Investor Helpline",
                portal="https://scores.sebi.gov.in",
                helpline="1800 22 7575",
                description="To report unauthorized trading applications claiming SEBI registration.",
                type="regulatory"
            )
        ],
        "info_needed": [
            "App download link or APK source.",
            "Details of virtual wallet / payment gateway used.",
            "Total deposited amount with bank transaction proofs."
        ],
        "escalation_path": [
            "Step 1: Cease all further fund transfers immediately",
            "Step 2: Preserve digital evidence (app files, server IPs, chats)",
            "Step 3: Call 1930 to report fake trading platform",
            "Step 4: Lodge cyber complaint and submit to bank nodal officer"
        ],
        "complaint_template": (
            "To,\n"
            "Cyber Crime Investigation Cell,\n\n"
            "Subject: Complaint against fraudulent trading platform refusing capital withdrawal\n\n"
            "Sir/Madam,\n\n"
            "I was induced into investing on an online trading portal named '[Platform Name]' via the URL/App link [Insert Link]. "
            "I deposited a total amount of Rs. [Amount] across transactions. Although the platform dashboard reflects a balance, my withdrawal request has been unlawfully withheld. "
            "The administrators are coercively demanding an additional Rs. [Extra Amount] as 'processing fees/taxes' to unlock my funds.\n\n"
            "This is a deceptive advance-fee fraud. I request you to investigate and freeze the receiving accounts.\n\n"
            "Yours sincerely,\n[Your Name]\n[Contact Info]"
        )
    },
    "broker_dispute": {
        "title": "Broker Dispute / Unauthorized Trades Executed",
        "title_ta": "பங்குத் தரகர் தகராறு / அனுமதியின்றி செய்யப்பட்ட வர்த்தகம்",
        "title_hi": "ब्रोकर विवाद / अनधिकृत ट्रेड किए गए",
        "immediate_steps": [
            "Raise an immediate formal grievance ticket with your broker's designated Compliance Officer in writing.",
            "Check NSDL / CDSL Consolidated Account Statement (CAS) and exchange SMS trade alerts to determine exact unauthorized orders.",
            "If broker does not resolve within 15 days, lodge complaint on SEBI SCORES 2.0 portal.",
            "If unresolved via SCORES, invoke SMART ODR (Online Dispute Resolution) portal for independent conciliation/arbitration."
        ],
        "immediate_steps_ta": [
            "உங்கள் பங்குத் தரகரின் (Broker) புகார் பிரிவிற்கு உடனடியாக மின்னஞ்சல் மூலம் புகார் அளிக்கவும்.",
            "NSDL அல்லது CDSL கணக்கு அறிக்கை மற்றும் பங்குச்சந்தை SMS-களை ஒப்பிட்டு சரிபார்க்கவும்.",
            "15 நாட்களுக்குள் தரகர் தீர்வு காணாவிட்டால், SEBI SCORES 2.0 தளத்தில் புகார் பதிவு செய்யவும்.",
            "தேவைப்பட்டால் SMART ODR இணையதளம் மூலம் நடுவர் தீர்ப்பாயத்தை அணுகவும்."
        ],
        "immediate_steps_hi": [
            "अपने ब्रोकर के अनुपालन अधिकारी (Compliance Officer) को लिखित रूप में तुरंत औपचारिक शिकायत दर्ज करें।",
            "अनधिकृत ट्रेडों की पहचान के लिए NSDL / CDSL खाता विवरण और एक्सचेंज SMS की जाँच करें।",
            "यदि ब्रोकर 15 दिनों के भीतर समाधान नहीं करता है, तो SEBI SCORES 2.0 पोर्टल पर शिकायत दर्ज करें।",
            "यदि SCORES के माध्यम से समाधान नहीं होता है, तो स्वतंत्र मध्यस्थता के लिए SMART ODR पोर्टल का उपयोग करें।"
        ],
        "evidence": [
            "Contract notes for the disputed trade dates.",
            "Exchange SMS/Email trade confirmation records.",
            "Broker ticket ID and email response history.",
            "Depository Transaction Statement from NSDL / CDSL."
        ],
        "contacts": [
            ContactEntity(
                name="SEBI SCORES 2.0",
                portal="https://scores.sebi.gov.in",
                helpline="1800 266 7575",
                description="Statutory grievance redressal system with time-bound broker escalation.",
                type="regulatory"
            ),
            ContactEntity(
                name="SMART ODR Portal",
                portal="https://smartodr.in",
                helpline="022 6864 3636",
                description="Online Dispute Resolution platform for Indian securities market participants.",
                type="regulatory"
            ),
            ContactEntity(
                name="NSDL Investor Grievance",
                portal="https://nsdl.co.in/grievances.php",
                helpline="022 2499 7000",
                description="Depository helpline for demat account debit discrepancies.",
                type="depository"
            )
        ],
        "info_needed": [
            "Client UCC (Unique Client Code).",
            "Demat Account (BOID / DP ID).",
            "Dates and symbols of disputed executions."
        ],
        "escalation_path": [
            "Step 1: Written complaint to Broker Compliance Officer (15-day resolution window)",
            "Step 2: Escalate to SEBI SCORES 2.0 with ticket proof (21 days)",
            "Step 3: Escalate to SMART ODR (Conciliation / Arbitration)",
            "Step 4: SEBI Appellate Tribunal if applicable"
        ],
        "complaint_template": (
            "To,\n"
            "The Compliance Officer,\n"
            "[Brokerage Firm Name],\n\n"
            "Subject: Formal grievance regarding unauthorized trades executed in UCC: [Your UCC]\n\n"
            "Dear Sir/Madam,\n\n"
            "I hold trading account UCC [Your UCC] and Demat ID [Demat ID] with your firm. "
            "On [Date], I noticed unauthorized trade executions in the scrips [Scrip Names] amounting to Rs. [Amount], for which no consent, order placement, or OTP authorization was provided by me.\n\n"
            "I request you to immediately reverse the trades, rectify the margin debit, and provide order audit trail logs within 7 business days, failing which I shall escalate to SEBI SCORES and SMART ODR.\n\n"
            "Regards,\n[Your Name]\n[UCC No]"
        )
    },
    "fake_advisor": {
        "title": "Unregistered Advisor / Telegram Group Promising Sure Tips",
        "title_ta": "பதிவு செய்யப்படாத பங்கு ஆலோசகர் / வாட்ஸ்அப் குழு",
        "title_hi": "अपंजीकृत सलाहकार / पक्की टिप्स देने वाला टेलीग्राम ग्रुप",
        "immediate_steps": [
            "Verify registration status on SEBI portal (sebi.gov.in -> Intermediaries -> Investment Advisers / Research Analysts).",
            "Refuse profit-sharing arrangements, fee deposits, or handing over demat login credentials.",
            "Export full chat logs and report the group to WhatsApp/Telegram anti-abuse desks.",
            "Report the unregistered entity to SEBI's Enforcement Division via SCORES."
        ],
        "immediate_steps_ta": [
            "SEBI தளத்தில் அவர்கள் பதிவு பெற்ற ஆலோசகர்களா என்பதை உறுதிப்படுத்தவும்.",
            "லாபப் பகிர்வு ஒப்பந்தங்கள் அல்லது டிமேட் லாகின் விவரங்களை எவருக்கும் தர வேண்டாம்.",
            "வாட்ஸ்அப் அல்லது டெலிகிராம் குழு உரையாடல்களைப் பதிவிறக்கி, அக்குழுவை பிளாக் செய்து புகார் அளிக்கவும்.",
            "SEBI SCORES தளத்தில் சட்டவிரோத ஆலோசனை குறித்து புகார் அளிக்கவும்."
        ],
        "immediate_steps_hi": [
            "SEBI पोर्टल (sebi.gov.in -> Intermediaries -> Investment Advisers) पर पंजीकरण स्थिति की पुष्टि करें।",
            "मुनाफ़ा साझा करने के प्रस्ताव या डीमैट लॉगिन क्रेडेंशियल किसी को न दें।",
            "चैट इतिहास डाउनलोड करें और ग्रुप को व्हाट्सएप/टेलीग्राम पर रिपोर्ट करें।",
            "SEBI SCORES पोर्टल पर गैर-पंजीकृत सलाहकार के रूप में शिकायत दर्ज करें।"
        ],
        "evidence": [
            "Screenshots of guaranteed return promises and subscription fee rate-cards.",
            "Payment receipts for tip subscriptions.",
            "Admin contact numbers and channel invitation links."
        ],
        "contacts": [
            ContactEntity(
                name="SEBI Enforcement / SCORES",
                portal="https://scores.sebi.gov.in",
                helpline="1800 22 7575",
                description="For reporting unregistered investment advisory (Section 12A SEBI Act).",
                type="regulatory"
            ),
            ContactEntity(
                name="National Cyber Crime Reporting",
                portal="https://cybercrime.gov.in",
                helpline="1930",
                description="To report fraudulent social media tipster networks.",
                type="cybercrime"
            )
        ],
        "info_needed": [
            "Telegram/WhatsApp channel links and Admin mobile numbers.",
            "UPI IDs or account details provided for tip fees.",
            "Flyers or brochures claiming SEBI approvals."
        ],
        "escalation_path": [
            "Step 1: Do not execute suggested trades",
            "Step 2: Collect channel invite link, UPI ID, and screenshots",
            "Step 3: Lodge complaint on SEBI SCORES portal under 'Unregistered Intermediary'",
            "Step 4: Report channel to platform moderation"
        ],
        "complaint_template": (
            "To,\n"
            "Securities and Exchange Board of India (SEBI),\n"
            "Enforcement Department / Investor Education and Protection,\n\n"
            "Subject: Information regarding unregistered entity providing illegal investment advice & promising guaranteed returns\n\n"
            "Respected Sir/Madam,\n\n"
            "I wish to bring to your attention an entity operating under the channel name '[Channel/Entity Name]' on [Telegram/WhatsApp/Instagram]. "
            "They are soliciting public funds and offering guaranteed return tips without valid SEBI Research Analyst (RA) or Investment Adviser (RIA) registration. "
            "Admin contact: [Phone/Handle], Payment UPI: [UPI ID].\n\n"
            "I request SEBI to examine this activity to protect retail investors from potential financial loss.\n\n"
            "Sincerely,\n[A Vigilant Retail Investor]"
        )
    }
}


def get_grievance_guide(situation_id: str) -> GrievanceResponse:
    sit = SITUATIONS_DB.get(situation_id, SITUATIONS_DB["money_transferred"])
    return GrievanceResponse(
        situation_id=situation_id,
        situation_title=sit["title"],
        situation_title_ta=sit["title_ta"],
        situation_title_hi=sit.get("title_hi"),
        immediate_steps=sit["immediate_steps"],
        immediate_steps_ta=sit["immediate_steps_ta"],
        immediate_steps_hi=sit.get("immediate_steps_hi"),
        evidence_to_preserve=sit["evidence"],
        who_to_contact=sit["contacts"],
        info_to_keep_ready=sit["info_needed"],
        escalation_path=sit["escalation_path"],
        complaint_draft_template=sit["complaint_template"]
    )
