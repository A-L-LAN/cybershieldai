from pydantic import BaseModel


class EmailScanRequest(BaseModel):
    email: str


class EmailScanResponse(BaseModel):
    risk_score: int
    risk_level: str
    analysis: str
    recommendation: str