from pydantic import BaseModel

class IPRequest(BaseModel):
    ip: str

class IPResponse(BaseModel):
    ip_address: str
    risk_score: int
    risk_level: str
    total_reports: int
    country: str
    isp: str
    usage_type: str
    recommendation: str