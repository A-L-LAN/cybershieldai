from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ai.security_assistant import security_chat

router = APIRouter(
    tags=["AI Security Chat"]
)


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


@router.post(
    "/chat",
    response_model=ChatResponse
)
async def chat_endpoint(data: ChatRequest):
    """
    CyberShield AI Security Assistant
    """

    try:

        response = security_chat(
            data.question
        )

        return ChatResponse(
            answer=response
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat failed: {str(e)}"
        )