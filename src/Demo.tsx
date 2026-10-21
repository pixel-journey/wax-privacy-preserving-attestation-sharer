"use client";

import { redact } from "./redact";

export function Demo() {
  const result = redact({ name: "Oak", secret: "hide", note: "ok" }, ["secret"]);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>secret is dropped</h1>
      <p className="lede">name and note stay. Nothing is encrypted. The input is an argument.</p>
      {result.ok ? <p>Kept: {Object.keys(result.kept).join(", ")}.</p> : <p>{result.reason}</p>}
    </main>
  );
}
