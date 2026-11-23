# Education — privacy by omission

> **Rung:** `npm test` passes. Dropping a field leaves every other field readable. Nothing is encrypted, hashed, or proven.  
> **The test is the rule.** Selective disclosure with salts: [wax-verifiable-credential-patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns). Non-proof: [wax-client-side-zk-attestation-interface](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Drop `secret` and see `email` still readable |
| Intermediate | Use `sensitiveStillPresent` and empty/duplicate refusals |
| Masterclass | Separate omission from encryption, ZK, and salted disclosure |

---

## Beginner — one scene

| Call | Locked result |
| --- | --- |
| drop `["secret"]` on SAMPLE_PROFILE | kept has `name`, `note`, `email`; dropped `["secret"]` |
| same + sensitiveKeys `["secret", "email"]` | `sensitiveStillPresent` is `["email"]` |
| drop `[]` | not ok |
| drop `["secret", "secret"]` | not ok |
| drop `["Not Valid"]` | not ok |
| drop attestation `private_key` only | `sensitiveCleared` true for that key |

```bash
npm test
```

---

## Intermediate — rules

| Rule | Detail |
| --- | --- |
| Drop list length | 1 .. 10 |
| Field names | `^[a-z][a-z0-9_]{0,31}$` |
| Duplicates | refused |
| `previewShare` | warns when sensitive keys remain in `kept` |

UI hide ≠ safe share. `previewShare` exists so product copy can warn before export.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Call redacted JSON encrypted | refused in docs |
| Leave email while dropping secret | `sensitiveStillPresent: ["email"]` |
| Empty drop list | refused |
| Uppercase field `Secret` | not a field name |

---

## Masterclass

| Claim | Reality here |
| --- | --- |
| Encryption | No |
| Zero knowledge | No |
| Selective disclosure | No — that is salted hashes in the VC lab |
| Signature check | No |

Field names are teaching identifiers, not an AtomicAssets schema. Never put a wallet private key into a share payload; the demo `private_key` label is deliberately toxic.

### Exercises

1. After dropping only `secret`, is `email` gone? (**No**.)  
2. Empty drop list ok? (**No**.)  
3. Is this a ZK proof? (**No**.)

---

## What this course will not teach

- Encryption or hashing of fields
- Issuer signatures
- That logs and analytics respect the drop list
