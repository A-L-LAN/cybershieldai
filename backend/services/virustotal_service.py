import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()


class VirusTotalService:

    BASE_URL = "https://www.virustotal.com/api/v3"

    API_KEY = os.getenv("VIRUSTOTAL_API_KEY")

    @classmethod
    def headers(cls):
        return {
            "x-apikey": cls.API_KEY
        }

    @classmethod
    def submit_url(cls, url: str):

        response = requests.post(
            f"{cls.BASE_URL}/urls",
            headers=cls.headers(),
            data={
                "url": url
            },
            timeout=30
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def get_analysis(cls, analysis_id: str):

        response = requests.get(
            f"{cls.BASE_URL}/analyses/{analysis_id}",
            headers=cls.headers(),
            timeout=30
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def scan_url(cls, url: str):

        submission = cls.submit_url(url)

        analysis_id = submission["data"]["id"]

        for _ in range(10):

            analysis = cls.get_analysis(
                analysis_id
            )

            status = analysis["data"]["attributes"]["status"]

            if status == "completed":
                return analysis

            time.sleep(2)

        return analysis

    @classmethod
    def summarize_url_scan(cls, url: str):

        result = cls.scan_url(url)

        stats = result["data"]["attributes"]["stats"]

        malicious = stats.get("malicious", 0)
        suspicious = stats.get("suspicious", 0)
        harmless = stats.get("harmless", 0)

        score = min(
            100,
            malicious * 15 + suspicious * 10
        )

        if score >= 80:
            risk = "HIGH"
        elif score >= 50:
            risk = "MEDIUM"
        else:
            risk = "LOW"

        return {
            "url": url,
            "risk_score": score,
            "risk_level": risk,
            "malicious": malicious,
            "suspicious": suspicious,
            "harmless": harmless
        }