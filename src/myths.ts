export const REDACT_MYTHS = [
  {
    myth: "This encrypts or zero-knowledge-hides fields",
    reality:
      "It only drops named keys from a record. Remaining values stay plaintext.",
  },
  {
    myth: "This is a ZK attestation product",
    reality:
      "Neighboring repo wax-client-side-zk-attestation-interface deliberately returns proof: false.",
  },
  {
    myth: "Dropped fields are recoverable from the output",
    reality:
      "They are omitted from kept. Anyone who still has the original record still has them.",
  },
] as const;
