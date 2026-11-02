"use client";

import { useMemo, useState } from "react";
import { redact } from "./redact";
import { REDACT_MYTHS } from "./myths";

const SAMPLE = { name: "Oak", secret: "hide", note: "ok" };

export function Demo() {
  const [dropSecret, setDropSecret] = useState(true);
  const [dropNote, setDropNote] = useState(false);
  const drop = useMemo(() => {
    const names: string[] = [];
    if (dropSecret) names.push("secret");
    if (dropNote) names.push("note");
    return names;
  }, [dropSecret, dropNote]);

  const result = useMemo(() => {
    if (drop.length === 0) {
      return { ok: false as const, reason: "Select at least one field to drop" };
    }
    return redact(SAMPLE, drop);
  }, [drop]);

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Drop the named fields</h1>
      <p className="lede">
        Named keys are omitted from the result. Nothing is encrypted. The input is an
        argument.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "1rem", marginTop: 0 }}>Myths vs reality</h2>
        {REDACT_MYTHS.map((m) => (
          <div key={m.myth} style={{ marginBottom: "0.75rem", fontSize: "0.9rem" }}>
            <p style={{ margin: 0 }}>
              <strong>Myth:</strong> {m.myth}
            </p>
            <p style={{ margin: "0.25rem 0 0" }}>
              <strong>Reality:</strong> {m.reality}
            </p>
          </div>
        ))}
      </section>

      <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}>
        Sample: {JSON.stringify(SAMPLE)}
      </p>

      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={dropSecret}
          onChange={(e) => setDropSecret(e.target.checked)}
        />
        Drop secret
      </label>
      <label style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
        <input
          type="checkbox"
          checked={dropNote}
          onChange={(e) => setDropNote(e.target.checked)}
        />
        Drop note
      </label>

      {result.ok ? (
        <p>
          Kept: <strong>{Object.keys(result.kept).join(", ") || "(none)"}</strong>
          <br />
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}>
            {JSON.stringify(result.kept)}
          </span>
        </p>
      ) : (
        <p>{result.reason}</p>
      )}

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See POLICY.md · companions: verifiable-credential-patterns, zk-attestation-interface
      </p>
    </main>
  );
}
