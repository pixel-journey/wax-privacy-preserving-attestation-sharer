import { describe, expect, it } from "vitest";
import { SAMPLE_ATTESTATION, SAMPLE_PROFILE } from "./fixtures";
import {
  isFieldName,
  previewShare,
  redact,
  sensitiveCleared,
} from "./redact";

describe("isFieldName", () => {
  it("accepts lowercase identifiers", () => {
    expect(isFieldName("secret")).toBe(true);
    expect(isFieldName("private_key")).toBe(true);
  });
  it("rejects bad names", () => {
    expect(isFieldName("Secret")).toBe(false);
    expect(isFieldName("1bad")).toBe(false);
  });
});

describe("redact", () => {
  it("drops secret and keeps name/note", () => {
    const r = redact(SAMPLE_PROFILE, ["secret"]);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.kept).toEqual({
      name: "Oak",
      note: "community holder",
      email: "oak@example.invalid",
    });
    expect(r.dropped).toEqual(["secret"]);
  });

  it("reports sensitive keys still present", () => {
    const r = redact(SAMPLE_PROFILE, ["secret"], {
      sensitiveKeys: ["secret", "email"],
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.sensitiveStillPresent).toEqual(["email"]);
  });

  it("rejects empty drop list", () => {
    expect(redact(SAMPLE_PROFILE, []).ok).toBe(false);
  });

  it("rejects duplicate drop names", () => {
    const r = redact(SAMPLE_PROFILE, ["secret", "secret"]);
    expect(r.ok).toBe(false);
  });

  it("rejects invalid field tokens", () => {
    const r = redact(SAMPLE_PROFILE, ["Not Valid"]);
    expect(r.ok).toBe(false);
  });
});

describe("sensitiveCleared", () => {
  it("true when all sensitive gone", () => {
    const r = redact(SAMPLE_ATTESTATION, ["private_key"], {
      sensitiveKeys: ["private_key"],
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(sensitiveCleared(r.kept, ["private_key"])).toBe(true);
  });
});

describe("previewShare", () => {
  it("warns when email remains", () => {
    const p = previewShare(SAMPLE_PROFILE, ["secret"], ["secret", "email"]);
    expect("warning" in p && p.warning).toMatch(/email/);
  });
});
