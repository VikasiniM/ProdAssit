# backend/retrieval/vectordb.py
from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from backend.config import BASE_DIR


class HybridRetriever:
    """Simple hybrid retriever with lexical + metadata-based filtering."""

    def __init__(self, dataset_path: str) -> None:
        self.dataset_path = BASE_DIR / dataset_path

    def search(self, query: str, limit: int = 5, metadata_filter: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        if not self.dataset_path.exists():
            return []
        with open(self.dataset_path, "r", encoding="utf-8") as fh:
            rows = json.load(fh)

        normalized = query.lower()
        matches = []
        for row in rows:
            text = " ".join(str(value) for value in row.values()).lower()
            if metadata_filter:
                matched = True
                for key, expected in metadata_filter.items():
                    row_value = str(row.get(key, "")).lower()
                    if expected.lower() not in row_value:
                        matched = False
                        break
                if not matched:
                    continue
            score = 0.0
            score += 0.1 * sum(1 for keyword in normalized.split() if keyword in text)
            if "project phoenix" in text and "phoenix" in normalized:
                score += 0.5
            if score > 0:
                matches.append({
                    "title": row.get("summary") or row.get("title") or row.get("risk") or row.get("milestone") or "Record",
                    "content": row.get("notes") or row.get("description") or row.get("summary") or json.dumps(row, default=str),
                    "score": round(score, 4),
                    "metadata": row,
                })
        matches.sort(key=lambda item: item["score"], reverse=True)
        return matches[:limit]
