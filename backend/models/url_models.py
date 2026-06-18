from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str

class URLResponse(BaseModel):
    url: str
    risk_score: int
    risk_level: str
    recommendation: str