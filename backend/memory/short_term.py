# backend/memory/short_term.py
import json
from typing import Any, Dict, List

from backend.config import BASE_DIR

SESSION_STORE = BASE_DIR / "backend" / "state" / "short_term_memory.json"
SESSION_STORE.parent.mkdir(parents=True, exist_ok=True)


class ShortTermMemory:
    def __init__(self, session_id: str = "default") -> None:
        self.session_id = session_id

    def load(self) -> List[Dict[str, Any]]:
        if not SESSION_STORE.exists():
            return []
        try:
            with open(SESSION_STORE, "r", encoding="utf-8") as fh:
                payload = json.load(fh)
            return payload.get(self.session_id, [])
        except Exception:
            return []

    def save(self, message: str, response: str) -> None:
        store = {}
        if SESSION_STORE.exists():
            try:
                with open(SESSION_STORE, "r", encoding="utf-8") as fh:
                    store = json.load(fh)
            except Exception:
                store = {}
        entries = store.setdefault(self.session_id, [])
        entries.append({"user_message": message, "assistant_response": response})
        if len(entries) > 20:
            entries = entries[-20:]
        store[self.session_id] = entries
        with open(SESSION_STORE, "w", encoding="utf-8") as fh:
            json.dump(store, fh, indent=2)
