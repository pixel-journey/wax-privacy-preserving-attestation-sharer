# Education — privacy by omission

## What this repo teaches

1. **Omission is not encryption.** Dropping `secret` from a JSON object leaves every other field readable.
2. **Omission is not zero knowledge.** A verifier who never received a field learned nothing about it *from this share*, but that is not a ZK proof system.
3. **Omission is not selective disclosure.** Selective disclosure usually means commitments + reveal-with-salt (see `wax-verifiable-credential-patterns`). Here we only copy a subset of plaintext fields.
4. **UI hide ≠ safe share.** `previewShare` and `sensitiveStillPresent` exist so product copy can warn when a sensitive key is still in `kept`.

## Worked examples

### Profile

```ts
redact(
  { name: "Oak", secret: "hide-me", email: "oak@example.invalid" },
  ["secret"],
  { sensitiveKeys: ["secret", "email"] }
);
// kept still has email → sensitiveStillPresent: ["email"]
```

### Attestation-shaped row

```ts
redact(
  { subject: "alice", claim: "completed_quest_12", private_key: "…" },
  ["private_key"]
);
// private_key gone; claim stays plaintext
```

## Antelope / WAX notes

Field names in this lab are lowercase identifiers (`a-z`, digits, `_`). That is a **teaching constraint**, not an on-chain schema. Real AtomicAssets attributes and contract tables use their own naming rules — re-read those ABIs.

Never put a wallet private key into a share payload. This demo’s `private_key` field is a deliberately toxic label so the warning path is obvious.

## Best practice

**Do** list sensitive keys explicitly in product policy.  
**Do** show the user the exact keys that will be exported.  
**Do not** call a redacted JSON blob “encrypted” or “ZK.”  
**Do not** assume logs, analytics, or support tickets respect the same drop list.

## Related

| Repo | Relationship |
|------|----------------|
| `wax-verifiable-credential-patterns` | Commitments + reveal (still not full W3C VC / BBS+) |
| `wax-client-side-zk-attestation-interface` | Explicit `proof: false` non-claim |
| `wax-private-attestation-and-encrypted-vault` | Different privacy sketch — read its own verification log |
