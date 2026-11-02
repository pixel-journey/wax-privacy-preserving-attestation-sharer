"use client";

import { useMemo, useState } from "react";
import { downloadText, exportRedactMarkdown } from "./exportReport";
import {
  DEFAULT_SENSITIVE,
  SAMPLE_ATTESTATION,
  SAMPLE_PROFILE,
} from "./fixtures";
import { GLOSSARY, REDACT_MYTHS } from "./myths";
import { previewShare, redact } from "./redact";

type FixtureId = "profile" | "attestation";

const FIXTURES: Record<
  FixtureId,
  { label: string; record: Record<string, string>; defaultDrop: string[] }
> = {
  profile: {
    label: "Community profile",
    record: { ...SAMPLE_PROFILE },
    defaultDrop: ["secret"],
  },
  attestation: {
    label: "Attestation-shaped row",
    record: { ...SAMPLE_ATTESTATION },
    defaultDrop: ["private_key"],
  },
};

export function Demo() {
  const [fixtureId, setFixtureId] = useState<FixtureId>("profile");
  const fixture = FIXTURES[fixtureId];
  const keys = Object.keys(fixture.record);
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(keys.map((k) => [k, fixture.defaultDrop.includes(k)]))
  );

  // Reset selection when fixture changes
  const onFixture = (id: FixtureId) => {
    setFixtureId(id);
    const f = FIXTURES[id];
    setSelected(
      Object.fromEntries(
        Object.keys(f.record).map((k) => [k, f.defaultDrop.includes(k)])
      )
    );
  };

  const drop = useMemo(
    () => Object.keys(selected).filter((k) => selected[k]),
    [selected]
  );

  const result = useMemo(() => {
    if (drop.length === 0) {
      return { ok: false as const, reason: "Select at least one field to drop" };
    }
    return redact(fixture.record, drop, {
      sensitiveKeys: [...DEFAULT_SENSITIVE],
    });
  }, [fixture.record, drop]);

  const preview = useMemo(() => {
    if (drop.length === 0) return null;
    const p = previewShare(fixture.record, drop, [...DEFAULT_SENSITIVE]);
    return "ok" in p && p.ok === false ? null : p;
  }, [fixture.record, drop]);

  return (
    <main className="wrap">
      <p className="kicker">Educational reference · Pixel Journey</p>
      <h1>Privacy-preserving share (by omission)</h1>
      <p className="lede">
        Drop named fields before a share. Remaining values stay plaintext. This is not
        encryption, not a commitment scheme, and not a zero-knowledge proof.
      </p>

      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #a855f744",
          borderRadius: "12px",
        }}
        aria-label="Myths"
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {(Object.keys(FIXTURES) as FixtureId[]).map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={fixtureId === id}
            onClick={() => onFixture(id)}
          >
            {FIXTURES[id].label}
          </button>
        ))}
      </div>

      <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}>
        Source: {JSON.stringify(fixture.record)}
      </p>

      <fieldset style={{ border: "1px solid #333", borderRadius: 8, marginBottom: "1rem" }}>
        <legend>Fields to drop</legend>
        {keys.map((k) => (
          <label
            key={k}
            style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={!!selected[k]}
              onChange={(e) =>
                setSelected((prev) => ({ ...prev, [k]: e.target.checked }))
              }
            />
            <code>{k}</code>
            {DEFAULT_SENSITIVE.includes(k as (typeof DEFAULT_SENSITIVE)[number]) ? (
              <span style={{ opacity: 0.6, fontSize: "0.8rem" }}>sensitive</span>
            ) : null}
          </label>
        ))}
      </fieldset>

      {result.ok ? (
        <>
          <p>
            Dropped: <strong>{result.dropped.join(", ")}</strong>
            <br />
            Kept keys: <strong>{Object.keys(result.kept).join(", ") || "(none)"}</strong>
          </p>
          <pre style={{ overflow: "auto", fontSize: "0.85rem" }}>
            {JSON.stringify(result.kept, null, 2)}
          </pre>
          {result.sensitiveStillPresent.length > 0 && (
            <p role="alert" style={{ color: "#fbbf24" }}>
              Warning: still exposing {result.sensitiveStillPresent.join(", ")}
            </p>
          )}
          {preview && "warning" in preview && preview.warning && (
            <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>{preview.warning}</p>
          )}
          <button
            type="button"
            onClick={() =>
              downloadText(
                "redact-share.md",
                exportRedactMarkdown("Share preview", keys, result)
              )
            }
          >
            Download MD report
          </button>
        </>
      ) : (
        <p>{result.reason}</p>
      )}

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1rem" }}>Glossary</h2>
        <dl>
          {GLOSSARY.map((g) => (
            <div key={g.term} style={{ marginBottom: "0.5rem" }}>
              <dt>
                <strong>{g.term}</strong>
              </dt>
              <dd style={{ margin: 0 }}>{g.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p style={{ marginTop: "2rem", fontSize: "0.85rem", opacity: 0.75 }}>
        See EDUCATION.md · POLICY.md · ARCHITECTURE.md
      </p>
    </main>
  );
}
