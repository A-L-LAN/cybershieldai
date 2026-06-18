from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.virustotal_service import scan_url
from services.risk_service import classify_risk
from ai.security_assistant import security_chat

router = APIRouter()


class URLRequest(BaseModel):
    url: str


@router.post("/scan-url")
async def scan_url_endpoint(data: URLRequest):
    """
    Scan URL using VirusTotal and generate AI explanation.
    """

    try:
        vt_result = scan_url(data.url)

        # Extract statistics safely
        stats = (
            vt_result.get("data", {})
            .get("attributes", {})
            .get("last_analysis_stats", {})
        )

        malicious = stats.get("malicious", 0)
        suspicious = stats.get("suspicious", 0)
        harmless = stats.get("harmless", 0)

        # Simple risk calculation
        risk_score = min(
            (malicious * 15) +
            (suspicious * 10),
            100
        )

        risk_level = classify_risk(risk_score)

        prompt = f"""
        Analyze the following URL security scan.

        URL:
        {data.url}

        Scan Results:
        - Malicious detections: {malicious}
        - Suspicious detections: {suspicious}
        - Harmless detections: {harmless}
        - Risk Score: {risk_score}
        - Risk Level: {risk_level}

        Explain:
        1. Whether the URL appears dangerous.
        2. Why it may be risky.
        3. Recommended actions.
        4. How users can avoid similar threats.
        """

        ai_analysis = security_chat(prompt)

        return {
            "url": data.url,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "scan_results": {
                "malicious": malicious,
                "suspicious": suspicious,
                "harmless": harmless
            },
            "analysis": ai_analysis
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"URL scan failed: {str(e)}"
        )