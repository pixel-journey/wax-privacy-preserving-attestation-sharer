# Security — redaction by omission

## Closed in product rules / tests

| Issue | Behavior |
| --- | --- |
| Dropped keys | absent from the shared object |
| Sensitive keys still in `kept` | listed in `sensitiveStillPresent` |
| `private_key` in payload | toxic label path for warnings |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Encryption | Omission is **not** encryption |
| ZK | Omission is **not** a proof |
| Selective disclosure | Use [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) for salted hashes |
| Logs / analytics | May still retain fields you dropped in the UI share |
| Private keys | Never place wallet keys in a share payload |

## Attack angles

1. Calling a redacted JSON blob "encrypted."  
2. Hiding a field in the UI while exporting it.  
3. Treating omission as selective disclosure.  
4. Claiming ZK privacy from dropped keys.  
5. Shipping support tickets that reintroduce dropped fields.

## Honesty limits

No network. No wasm. Privacy triangle:

| Pattern | Lab |
| --- | --- |
| Omission | **This** |
| Salted hash + reveal | [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) |
| Zero knowledge | [ZK interface](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface) — `proof: false` |

[docs.wax.io](https://docs.wax.io/).
