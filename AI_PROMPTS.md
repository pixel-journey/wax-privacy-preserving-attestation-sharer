# AI handoff — field omission sharer

## Non-negotiables

1. Share means copy a subset of plaintext fields.
2. Dropping `secret` leaves `email` readable if it was kept.
3. `sensitiveStillPresent` warns when a sensitive key remains in `kept`.
4. **Not** encryption, **not** zero knowledge, **not** a W3C credential.
5. Salted disclosure is the VC lab. Hash-match-is-not-ZK is the ZK non-proof lab.

## Prompt seeds

- "Drop secret, keep email — is email still plaintext?"
- "Sensitive key left in kept — what warning?"
- "Refuse calling omission encryption or ZK."

## Do not

- Hash or encrypt inside this omission lab and still cite these tests.
- Store the omitted field "securely" in the same object.
