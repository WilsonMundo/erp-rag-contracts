"""Normative, representation-specific hashing helpers."""

from __future__ import annotations

import hashlib
import unicodedata


def canonicalize_semantic_text(value: str) -> str:
    normalized = unicodedata.normalize("NFC", value).replace("\r\n", "\n").replace("\r", "\n")
    return "\n".join(line.rstrip() for line in normalized.split("\n")).strip()


def semantic_text_hash(value: str) -> str:
    digest = hashlib.sha256(canonicalize_semantic_text(value).encode("utf-8")).hexdigest()
    return f"sha256:{digest}"


semantic_content_hash = semantic_text_hash


def source_file_sha256(value: bytes) -> str:
    """Hash authoritative source bytes as lowercase hex without a prefix."""
    return hashlib.sha256(value).hexdigest()


def release_file_hash(value: bytes) -> str:
    """Hash release bytes using the exact prefixed release-manifest representation."""
    return f"sha256:{hashlib.sha256(value).hexdigest()}"
