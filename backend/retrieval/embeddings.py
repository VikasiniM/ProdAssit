# backend/retrieval/embeddings.py
from __future__ import annotations

from typing import List


class EmbeddingAdapter:
    """Minimal embedding adapter. In production this would use an embedding model."""

    @staticmethod
    def embed_text(text: str) -> List[float]:
        if not text:
            return [0.0] * 3
        values = []
        for char in text[:32]:
            values.append(float(ord(char) % 10) / 10.0)
        if len(values) < 3:
            values.extend([0.0] * (3 - len(values)))
        return values[:3]
