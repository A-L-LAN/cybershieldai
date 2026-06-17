import os
import requests
from dotenv import load_dotenv

load_dotenv()


class AbuseIPDBService:

    BASE_URL = "https://api.abuseipdb.com/api/v2"

    API_KEY = os.getenv("ABUSEIPDB_API_KEY")

    @classmethod
    def headers(cls):
        return {
            "Accept": "application/json",
            "Key": cls.API_KEY
        }

    @classmethod
    def check_ip(cls, ip_address: str):

        response = requests.get(
            f"{cls.BASE_URL}/check",
            headers=cls.headers(),
            params={
                "ipAddress": ip_address,
                "maxAgeInDays": 90,
                "verbose": True
            },
            timeout=30
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def summarize_ip_reputation(
        cls,
        ip_address: str
    ):

        result = cls.check_ip(ip_address)

        data = result.get("data", {})

        abuse_score = data.get(
            "abuseConfidenceScore",
            0
        )

        total_reports = data.get(
            "totalReports",
            0
        )

        country = data.get(
            "countryCode",
            "Unknown"
        )

        isp = data.get(
            "isp",
            "Unknown"
        )

        usage_type = data.get(
            "usageType",
            "Unknown"
        )

        if abuse_score >= 80:
            risk_level = "HIGH"

        elif abuse_score >= 50:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        recommendation = {
            "HIGH":
                "Block this IP and investigate immediately.",
            "MEDIUM":
                "Monitor traffic and review activity.",
            "LOW":
                "No immediate action required."
        }

        return {
            "ip_address": ip_address,
            "risk_score": abuse_score,
            "risk_level": risk_level,
            "total_reports": total_reports,
            "country": country,
            "isp": isp,
            "usage_type": usage_type,
            "recommendation":
                recommendation[risk_level]
        }