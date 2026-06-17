import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


class SecurityAssistant:

    SYSTEM_PROMPT = """
    You are CyberShield AI, an expert cybersecurity assistant.

    Your responsibilities:

    - Explain cybersecurity threats clearly.
    - Analyze phishing emails.
    - Analyze suspicious URLs.
    - Explain malware, ransomware, spyware, and vulnerabilities.
    - Recommend security best practices.
    - Help small businesses improve security.
    - Provide risk assessments.
    - Explain technical concepts in simple language.

    Rules:
    - Be concise and accurate.
    - Never invent facts.
    - If unsure, say so.
    - Explain reasoning.
    - Prioritize user safety.
    """

    @staticmethod
    def ask(question: str):

        response = client.chat.completions.create(
            model="gpt-5",
            messages=[
                {
                    "role": "system",
                    "content": SecurityAssistant.SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": question
                }
            ],
            temperature=0.3,
            max_tokens=1000
        )

        return response.choices[0].message.content

    @staticmethod
    def analyze_email(email_content: str):

        prompt = f"""
        Analyze this email for phishing indicators.

        Return:

        1. Risk Level
        2. Phishing Indicators
        3. Explanation
        4. Recommended Action

        EMAIL:

        {email_content}
        """

        return SecurityAssistant.ask(prompt)

    @staticmethod
    def analyze_url(url: str):

        prompt = f"""
        Analyze this URL:

        {url}

        Explain:

        1. Potential risks
        2. Signs of phishing
        3. User recommendations
        """

        return SecurityAssistant.ask(prompt)

    @staticmethod
    def explain_vulnerability(vulnerability: str):

        prompt = f"""
        Explain this cybersecurity vulnerability:

        {vulnerability}

        Include:

        - What it is
        - Impact
        - Severity
        - Mitigation
        """

        return SecurityAssistant.ask(prompt)

    @staticmethod
    def security_advice(problem: str):

        prompt = f"""
        Provide cybersecurity guidance for:

        {problem}

        Include:
        - Risk assessment
        - Best practices
        - Recommended actions
        """

        return SecurityAssistant.ask(prompt)