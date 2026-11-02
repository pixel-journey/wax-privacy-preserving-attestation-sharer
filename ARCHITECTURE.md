# Architecture

```
fixtures / UI inputs
        │
        ▼
   redact(record, drop, { sensitiveKeys })
        │
        ├── kept (plaintext subset)
        ├── dropped (names only)
        └── sensitiveStillPresent (warnings)
        │
        ├── previewShare → keysShown / keysHidden / warning
        └── exportRedactMarkdown → offline MD report
```

## Layers

| Layer | Responsibility |
|-------|----------------|
| `redact.ts` | Pure validation + omission |
| `fixtures.ts` | Offline samples |
| `Demo.tsx` | Education UI |
| `api.ts` / `usecases.ts` | Unsent HTTP shapes (`executed: false`) |

## Honesty boundary

No `fetch`, no wallet, no encryption library, no proof system. Expanding this repo must not quietly add a “ZK” claim without renaming and rewriting the trust label.
