# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX context |
| [VC patterns](https://github.com/pixel-journey/wax-verifiable-credential-patterns) | Salted disclosure |
| [ZK non-proof](https://github.com/pixel-journey/wax-client-side-zk-attestation-interface) | Hash match is not ZK |

## Product facts

- Share = copy a subset of plaintext fields.
- Dropping `secret` leaves `email` readable if kept.
- `sensitiveStillPresent` warns when a sensitive key remains in `kept`.
- **Not** encryption, **not** zero knowledge, **not** a W3C credential.
