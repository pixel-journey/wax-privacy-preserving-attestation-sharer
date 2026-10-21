import { describe, expect, it } from "vitest";
import { redact } from "./redact";

describe("redact", () => {
  it("drops the named fields and keeps the rest", () => {
    const result = redact({ name: "Oak", secret: "hide", note: "ok" }, ["secret"]);
    expect(result).toEqual({ ok: true, kept: { name: "Oak", note: "ok" } });
    expect(redact({ name: "Oak" }, ["Secret"]).ok).toBe(false);
  });
});
