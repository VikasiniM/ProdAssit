# backend/observability/langsmith.py
import os
from typing import Any, Dict, List

try:
    from langsmith import Client
except Exception:  # pragma: no cover
    Client = None


class LangSmithObserver:
    def __init__(self) -> None:
        self.enabled = bool(os.getenv("LANGSMITH_API_KEY"))
        self.client = Client() if self.enabled and Client else None
        self.project = os.getenv("LANGSMITH_PROJECT", "agentic-ai-assistant")

    def trace(self, name: str, payload: Dict[str, Any]) -> None:
        if not self.enabled or self.client is None:
            return
        try:
            self.client.create_run(
                name=name,
                inputs={"payload": payload},
                project_name=self.project,
            )
        except Exception:  # pragma: no cover
            pass

    def trace_many(self, events: List[Dict[str, Any]]) -> None:
        for event in events:
            self.trace(event["name"], event.get("payload", {}))
