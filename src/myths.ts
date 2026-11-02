export const REDACT_MYTHS = [
  {
    myth: "This encrypts or zero-knowledge-hides fields",
    reality:
      "It only drops named keys from a record. Remaining values stay plaintext in memory and in any export you make.",
  },
  {
    myth: "This is a ZK attestation or selective-disclosure proof",
    reality:
      "Omission ≠ commitment. See wax-verifiable-credential-patterns for salted hashes, and wax-client-side-zk-attestation-interface for an explicit proof: false non-claim.",
  },
  {
    myth: "Dropped fields are gone from the universe",
    reality:
      "They are omitted from kept. Anyone who still has the original record, logs, or backups still has them.",
  },
  {
    myth: "If the UI hides a field, the share is safe",
    reality:
      "Use previewShare / sensitiveStillPresent. A hidden checkbox does not remove a key you forgot to list in drop.",
  },
] as const;

export const GLOSSARY = [
  {
    term: "redact",
    meaning: "Omit keys from a copy of a record. Pure function; original unchanged.",
  },
  {
    term: "sensitive key",
    meaning:
      "A label the product treats as high-risk if shared (secret, email, private_key). Used for warnings only.",
  },
  {
    term: "selective disclosure",
    meaning:
      "Revealing some committed claims with salts/proofs — different from mere omission. Not implemented here.",
  },
] as const;
