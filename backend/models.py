# backend/models.py
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class QuestionRequest(BaseModel):
    question: str = Field(..., min_length=3)
    session_id: Optional[str] = None


class EvidenceItem(BaseModel):
    source: str
    title: str
    content: str
    score: float
    metadata: Dict[str, Any]


class AgentTraceStep(BaseModel):
    name: str
    status: str
    details: Dict[str, Any]


class AnswerResponse(BaseModel):
    answer: str
    citations: List[Dict[str, Any]]
    trace: List[AgentTraceStep]
    tools_used: List[str]
    memory_used: List[str]
    execution_time_ms: int
