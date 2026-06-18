from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, IPvAnyAddress

from services.abuseipdb_service import check_ip
from services.risk_service import classify_risk
from ai.security_assistant import security_chat

router = APIRouter(tags=["IP Scanner"])


class IPRequest(BaseModel):
    ip: IPvAnyAddress


@router.post("/scan-ip")
async def scan_ip_endpoint(data: IPRequest):
    """
    Scan an IP address using AbuseIPDB and
    generate an AI-powered explanation.
    """

    try:
        ip_address = str(data.ip)

        abuse_result = check_ip(ip_address)

        if "data" not in abuse_result:
            raise HTTPException(
                status_code=400,
                detail="Invalid response from AbuseIPDB"
            )

        result = abuse_result["data"]

        abuse_score = result.get("abuseConfidenceScore", 0)
        country_code = result.get("countryCode", "Unknown")
        isp = result.get("isp", "Unknown")
        domain = result.get("domain", "Unknown")
        total_reports = result.get("totalReports", 0)
        last_reported = result.get("lastReportedAt")

        risk_level = classify_risk(abuse_score)

        prompt = f"""
        Analyze this IP reputation report.

        IP Address: {ip_address}

        Details:
        - Abuse Confidence Score: {abuse_score}
        - Risk Level: {risk_level}
        - Country: {country_code}
        - ISP: {isp}
        - Domain: {domain}
        - Total Reports: {total_reports}
        - Last Reported: {last_reported}

        Explain:
        1. What this score means.
        2. Whether the IP appears malicious.
        3. Possible risks of interacting with it.
        4. Recommended actions.
        5. How organizations can protect themselves.
        """

        ai_analysis = security_chat(prompt)

        return {
            "ip": ip_address,
            "risk_score": abuse_score,
            "risk_level": risk_level,
            "details": {
                "country_code": country_code,
                "isp": isp,
                "domain": domain,
                "total_reports": total_reports,
                "last_reported": last_reported
            },
            "analysis": ai_analysis
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"IP scan failed: {str(e)}"
        )