/** Offline sample records for demos and tests. */

export const SAMPLE_PROFILE = {
  name: "Oak",
  note: "community holder",
  secret: "hide-me",
  email: "oak@example.invalid",
} as const;

export const SAMPLE_ATTESTATION = {
  subject: "alice",
  claim: "completed_quest_12",
  private_key: "NOT-A-REAL-KEY",
  issuer: "pxjlearn.gm",
} as const;

export const DEFAULT_SENSITIVE = ["secret", "password", "private_key", "email"] as const;
