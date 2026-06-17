from typing import Dict


class ThreatClassifier:

    @staticmethod
    def classify_risk(score: int) -> str:
        """
        Convert numerical score into risk level.
        """

        if score >= 80:
            return "HIGH"

        if score >= 50:
            return "MEDIUM"

        return "LOW"

    @staticmethod
    def calculate_url_risk(
        malicious_votes: int,
        suspicious_votes: int,
        harmless_votes: int
    ) -> Dict:

        score = (
            malicious_votes * 15
            + suspicious_votes * 10
            - harmless_votes * 2
        )

        score = max(0, min(score, 100))

        return {
            "risk_score": score,
            "risk_level": ThreatClassifier.classify_risk(score)
        }

    @staticmethod
    def calculate_email_risk(
        has_urgent_language: bool,
        contains_link: bool,
        sender_spoofed: bool,
        attachment_present: bool
    ) -> Dict:

        score = 0

        if has_urgent_language:
            score += 25

        if contains_link:
            score += 20

        if sender_spoofed:
            score += 35

        if attachment_present:
            score += 20

        score = min(score, 100)

        return {
            "risk_score": score,
            "risk_level": ThreatClassifier.classify_risk(score)
        }

    @staticmethod
    def calculate_ip_risk(
        abuse_confidence_score: int
    ) -> Dict:

        score = min(abuse_confidence_score, 100)

        return {
            "risk_score": score,
            "risk_level": ThreatClassifier.classify_risk(score)
        }

    @staticmethod
    def generate_recommendation(
        risk_level: str
    ) -> str:

        recommendations = {
            "HIGH":
                "Block immediately and investigate.",
            "MEDIUM":
                "Review carefully before proceeding.",
            "LOW":
                "No immediate action required."
        }

        return recommendations.get(
            risk_level,
            "Review manually."
        )