# backend/memory/long_term.py
import json
from typing import Any, Dict, List

from backend.config import BASE_DIR

LONG_TERM_PATH = BASE_DIR / "backend" / "state" / "long_term_memory.json"
LONG_TERM_PATH.parent.mkdir(parents=True, exist_ok=True)


class LongTermMemory:
    @staticmethod
    def load() -> Dict[str, Any]:
        if not LONG_TERM_PATH.exists():
            return {
                "project_priorities": ["Project Phoenix is the highest-priority project."],
                "user_preferences": [],
                "business_facts": [
                    "Project Phoenix has strategic importance for the executive team.",
                    "Q3 planning and delivery decisions are tracked in roadmap and ticket data.",
                    "The main execution risks include dependency failures, capacity constraints, and launch blockers.",
                ],
            }
        try:
            with open(LONG_TERM_PATH, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            return {}

    @staticmethod
    def save(payload: Dict[str, Any]) -> None:
        existing = LongTermMemory.load()
        existing.update(payload)
        with open(LONG_TERM_PATH, "w", encoding="utf-8") as fh:
            json.dump(existing, fh, indent=2)

    @staticmethod
    def get_relevant_facts(question: str) -> List[str]:
        memory = LongTermMemory.load()
        combined = memory.get("business_facts", []) + memory.get("project_priorities", [])
        if not question:
            return combined
        normalized = question.lower()
        relevant = []
        for fact in combined:
            fact_lower = fact.lower()
            if normalized in fact_lower:
                relevant.append(fact)
                continue
            if any(keyword in fact_lower for keyword in ["phoenix", "priority", "risk", "quarter", "roadmap", "delay", "dependency"]):
                if any(keyword in normalized for keyword in ["phoenix", "priority", "risk", "quarter", "roadmap", "delay", "dependency"]):
                    relevant.append(fact)
        return relevant or combined[:5]
