# backend/agents/planner.py
from __future__ import annotations

from typing import Any, Dict, List


def generate_plan(question: str) -> Dict[str, Any]:
    query = (question or "").lower()
    tasks = [
        "retrieve project goals",
        "retrieve completed work",
        "retrieve blockers",
        "retrieve timeline changes",
        "retrieve open risks",
    ]
    if "risk" in query or "threat" in query:
        tasks = [
            "retrieve open risks",
            "retrieve blockers",
            "retrieve dependency failures",
            "retrieve project goals",
            "retrieve timeline changes",
        ]
    if "timeline" in query or "q3" in query or "quarter" in query:
        tasks = [
            "retrieve timeline changes",
            "retrieve roadmap",
            "retrieve completed work",
            "retrieve blockers",
            "retrieve open risks",
        ]

    sub_questions = [
        "What are the project goals and expected outcomes?",
        "What work was completed in Q3?",
        "What blockers or dependencies are impacting delivery?",
        "How did the timeline or roadmap shift?",
        "What are the top active risks and mitigations?",
    ]
    return {
        "tasks": tasks,
        "sub_questions": sub_questions,
        "user_question": question,
    }
