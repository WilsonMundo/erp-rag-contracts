"""Small contract-level helpers; this is not a production normalizer or ingestion CLI."""

from __future__ import annotations

from typing import Any

INHERITABLE_FIELDS = ("schema_version", "catalog_version", "module", "language", "document_type")


class EnvelopeFieldConflict(ValueError):
    code = "ENVELOPE_FIELD_CONFLICT"


def effective_envelope(document: dict[str, Any], envelope: dict[str, Any]) -> dict[str, Any]:
    """Apply the normative inheritance rule to a copy for conformance testing."""
    effective = dict(document)
    for field in INHERITABLE_FIELDS:
        document_value = document.get(field)
        envelope_value = envelope.get(field)
        if (
            document_value is not None
            and envelope_value is not None
            and document_value != envelope_value
        ):
            raise EnvelopeFieldConflict(
                f"{field}: document={document_value!r}, envelope={envelope_value!r}"
            )
        if document_value is None and envelope_value is not None:
            effective[field] = envelope_value
    return effective
