# Policy — privacy-preserving attestation sharer

**Trust label:** `educational-reference`  
**Updated:** 2026-11-02

## In scope

- Pure field omission (`redact`, `previewShare`, `sensitiveCleared`)
- Offline fixtures and unit tests
- Unsent request builders (catalog pattern)
- Education: myths, glossary, MD export

## Out of scope

- Encryption at rest or in transit
- Zero-knowledge proofs
- Salted commitment / selective disclosure (other repo)
- Live broadcast or wallet signing

## Rules

1. `npm test` never requires network.
2. Demo does not call hosts.
3. Documentation must not call omission “ZK” or “encrypted.”
4. Prefer WharfKit in any *future* host app that adds intentional chain actions — not eosjs / Anchor Link.
