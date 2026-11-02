# wax-privacy-preserving-attestation-sharer

> **Trust label:** `educational-reference`  
> **Status:** Full-thrust education pass (2026-11-02)  
> **Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**One-sentence goal:** Teach **field omission** before share — with pure, unit-tested helpers — without pretending the result is encrypted or zero-knowledge.

## Why this exists

Product language often says “privacy-preserving share” when the implementation only deletes a few JSON keys. That can be useful, but it is not cryptography. This blueprint makes the distinction loud, testable, and hard to accidentally invert.

## What is actually in the repo

| Piece | Role |
|-------|------|
| `src/redact.ts` | `redact`, `previewShare`, `sensitiveCleared`, field-name rules |
| `src/redact.test.ts` | Executed claims |
| `src/fixtures.ts` | Profile + attestation-shaped samples |
| `src/myths.ts` | Myths + glossary |
| `src/exportReport.ts` | Markdown share report |
| `src/Demo.tsx` | Fixture switcher, per-field drop, warnings, export |
| `src/api.ts` / `usecases.ts` | Unsent HTTP builders (`executed: false`) |
| `EDUCATION.md` | Teaching notes + Antelope caveats |
| `ARCHITECTURE.md` | Layer diagram + honesty boundary |
| `POLICY.md` | In / out of scope |

## Quick start

```bash
npm install
npm test
npm run dev
```

```ts
import { redact } from "./src/redact";

const result = redact(
  { name: "Oak", secret: "hide", note: "ok" },
  ["secret"],
  { sensitiveKeys: ["secret", "email"] }
);
// result.kept has name + note; secret is listed in result.dropped
```

## Learning outcomes

- Validate drop lists (1–10 unique lowercase field names)
- Distinguish **omission** vs **encryption** vs **selective disclosure** vs **ZK**
- Surface warnings when sensitive keys remain in `kept`
- Export an offline markdown report of what a share would expose

## Related

- [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) — salted commitments
- [wax-client-side-zk-attestation-interface](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface) — explicit `proof: false`

## License

MIT — Pixel Journey
