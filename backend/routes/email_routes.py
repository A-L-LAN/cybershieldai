from fastapi import APIRouter, HTTPException

from models.email_models import (
    EmailScanRequest,
    EmailScanResponse
)

from ai.security_assistant import SecurityAssistant

router = APIRouter(
    prefix="/email",
    tags=["Email Security"]
)


@router.post(
    "/scan",
    response_model=EmailScanResponse
)
async def scan_email(
    data: EmailScanRequest
):

    try:

        analysis = (
            SecurityAssistant.analyze_email(
                data.email
            )
        )

        text = analysis.lower()

        risk_score = 20

        phishing_keywords = [
            "urgent",
            "verify",
            "click",
            "password",
            "login",
            "suspended",
            "bank",
            "account",
            "immediately"
        ]

        for keyword in phishing_keywords:
            if keyword in text:
                risk_score += 10

        risk_score = min(
            risk_score,
            100
        )

        if risk_score >= 80:
            risk_level = "HIGH"

        elif risk_score >= 50:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        recommendations = {
            "HIGH":
                "Do not interact with this email. Report and delete it.",

            "MEDIUM":
                "Verify the sender before taking any action.",

            "LOW":
                "Appears relatively safe, but remain cautious."
        }

        return EmailScanResponse(
            risk_score=risk_score,
            risk_level=risk_level,
            analysis=analysis,
            recommendation=recommendations[
                risk_level
            ]
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )