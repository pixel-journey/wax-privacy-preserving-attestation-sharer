# Security — redaction by omission

## Closed in product rules

| Issue | Behavior |
| --- | --- |
| Dropped keys | absent from the shared object |
| Sensitive keys still in `kept` | listed in `sensitiveStillPresent` |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Encryption | Omission is not encryption |
| ZK | Omission is not a proof |
| Logs / analytics | May still retain fields you dropped in the UI share |
| Private keys | Never place wallet keys in a share payload |

## Attack angles

1. Calling a redacted JSON blob "encrypted."  
2. Hiding a field in the UI while exporting it.  
3. Treating omission as selective disclosure (use the VC lab for hashes).

## Honesty limits

No network. No wasm. [docs.wax.io](https://docs.wax.io/) · [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) · [ZK non-proof](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface).
