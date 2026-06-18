import os
import requests
from dotenv import load_dotenv

load_dotenv()


class HIBPService:

    BASE_URL = "https://haveibeenpwned.com/api/v3"

    API_KEY = os.getenv("HIBP_API_KEY")

    USER_AGENT = "CyberShieldAI"

    @classmethod
    def headers(cls):
        return {
            "hibp-api-key": cls.API_KEY,
            "User-Agent": cls.USER_AGENT
        }

    @classmethod
    def check_email(cls, email: str):
        """
        Check if an email address has appeared
        in known breaches.
        """

        response = requests.get(
            f"{cls.BASE_URL}/breachedaccount/{email}",
            headers=cls.headers(),
            params={
                "truncateResponse": False
            },
            timeout=30
        )

        if response.status_code == 404:
            return []

        response.raise_for_status()

        return response.json()

    @classmethod
    def summarize_email_breach(
        cls,
        email: str
    ):
        """
        Return a user-friendly summary.
        """

        breaches = cls.check_email(email)

        if not breaches:
            return {
                "email": email,
                "risk_level": "LOW",
                "breach_count": 0,
                "breaches": [],
                "recommendation":
                    "No known public breaches found."
            }

        breach_count = len(breaches)

        if breach_count >= 10:
            risk_level = "HIGH"

        elif breach_count >= 3:
            risk_level = "MEDIUM"

        else:
            risk_level = "LOW"

        breach_details = []

        for breach in breaches:

            breach_details.append({
                "name": breach.get("Name"),
                "title": breach.get("Title"),
                "domain": breach.get("Domain"),
                "breach_date": breach.get("BreachDate"),
                "pwn_count": breach.get("PwnCount"),
                "data_classes":
                    breach.get("DataClasses", [])
            })

        recommendations = {
            "HIGH":
                [
                    "Change passwords immediately.",
                    "Enable MFA on all accounts.",
                    "Monitor accounts for suspicious activity.",
                    "Review password reuse."
                ],
            "MEDIUM":
                [
                    "Change affected passwords.",
                    "Enable MFA where possible.",
                    "Monitor login activity."
                ],
            "LOW":
                [
                    "Review affected accounts.",
                    "Update passwords if reused elsewhere."
                ]
        }

        return {
            "email": email,
            "risk_level": risk_level,
            "breach_count": breach_count,
            "breaches": breach_details,
            "recommendations":
                recommendations[risk_level]
        }

    @classmethod
    def get_breach(cls, breach_name: str):
        """
        Retrieve information about a specific breach.
        """

        response = requests.get(
            f"{cls.BASE_URL}/breach/{breach_name}",
            headers=cls.headers(),
            timeout=30
        )

        if response.status_code == 404:
            return {
                "error": "Breach not found"
            }

        response.raise_for_status()

        return response.json()

    @classmethod
    def get_all_breaches(cls):
        """
        Retrieve all public breaches.
        """

        response = requests.get(
            f"{cls.BASE_URL}/breaches",
            headers=cls.headers(),
            timeout=30
        )

        response.raise_for_status()

        return response.json()

    @classmethod
    def get_latest_breaches(
        cls,
        limit: int = 10
    ):
        """
        Return latest breaches.
        """

        breaches = cls.get_all_breaches()

        breaches.sort(
            key=lambda x: x.get(
                "BreachDate",
                ""
            ),
            reverse=True
        )

        return breaches[:limit]