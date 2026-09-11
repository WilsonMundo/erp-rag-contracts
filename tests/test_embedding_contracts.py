from __future__ import annotations

import math

import pytest
from pydantic import ValidationError

from erp_rag_contracts.models.contracts import EmbeddingArtifactV1, EmbeddingReleaseManifestV1

HASH = "sha256:" + "a" * 64


def artifact(**changes: object) -> EmbeddingArtifactV1:
    values: dict[str, object] = {
        "schema_version": "2.0",
        "document_id": "ventas.query.total.v1",
        "document_version": 1,
        "content_hash": HASH,
        "embedding_provider": "openai",
        "embedding_model": "text-embedding-3-small",
        "embedding_dimensions": 3,
        "vector": [0.1, 0.2, 0.3],
        "generated_at_epoch_ms": 0,
    }
    values.update(changes)
    return EmbeddingArtifactV1.model_validate(values)


def test_embedding_artifact_requires_schema_and_provider() -> None:
    value = artifact()
    assert value.schema_version == "2.0"
    assert value.embedding_provider == "openai"


@pytest.mark.parametrize("vector", [[], [0.1], [0.1, math.nan, 0.3], [0.1, math.inf, 0.3]])
def test_embedding_artifact_rejects_invalid_vectors(vector: list[float]) -> None:
    with pytest.raises(ValidationError):
        artifact(vector=vector)


def test_embedding_release_manifest_accounts_for_all_records() -> None:
    manifest = EmbeddingReleaseManifestV1(
        contract_version="2.0.0",
        package_version="2.0.0",
        normalized_release="2026-09-08-v1",
        catalog_records_sha256=HASH,
        embedding_provider="openai",
        embedding_model="text-embedding-3-small",
        embedding_dimensions=3,
        normalized_records=4,
        embedding_eligible=3,
        embedding_ineligible=1,
        artifacts_generated=3,
        cache_hits=2,
        cache_misses=1,
        embedding_artifacts_sha256=HASH,
        result="valid",
    )
    assert manifest.cache_hits + manifest.cache_misses == manifest.artifacts_generated


def test_valid_embedding_manifest_rejects_incoherent_counts() -> None:
    with pytest.raises(ValidationError):
        EmbeddingReleaseManifestV1(
            contract_version="2.0.0",
            package_version="2.0.0",
            normalized_release="release",
            catalog_records_sha256=HASH,
            embedding_provider="openai",
            embedding_model="model",
            embedding_dimensions=3,
            normalized_records=4,
            embedding_eligible=3,
            embedding_ineligible=1,
            artifacts_generated=2,
            cache_hits=1,
            cache_misses=1,
            embedding_artifacts_sha256=HASH,
            result="valid",
        )
