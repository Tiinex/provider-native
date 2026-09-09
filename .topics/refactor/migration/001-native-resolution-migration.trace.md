# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 15:48:15
  - Trace: [001-native-provider-boundary-and-extraction.trace.md](../001-native-provider-boundary-and-extraction.trace.md)
  - Origin:
    - [relative](../001-native-provider-boundary-and-extraction.trace.md)
- Current
  - Current Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 15:48:17
  - Authors: Anchor
  - Why: Decompose provider-native work so progress and later Reduction remain local and auditable.
  - Summary: Move only qualified Native-specific resolution behavior behind the provider boundary while preserving exact recovery semantics.
  - Status: ready/local

---

# Native resolution migration

## Objective

Move only qualified Native-specific resolution behavior behind the provider boundary while preserving exact recovery semantics.

## Done Criteria

- The scoped result is represented in repository source/evidence.
- Any shared-boundary dependency is returned explicitly rather than implemented outside repository authority.
- A focused qualification protects the affected public/use-case behavior.

## Scope

Repository-local work for this subarea only. Do not expand into sibling repository implementation.

## Dependencies

- Parent repository Task: `.topics/refactor/001-native-provider-boundary-and-extraction.trace.md`.
- Cross-repository blockers return to Refactor Anchor for reconciliation.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-native-provider-boundary-and-extraction.trace.md](../001-native-provider-boundary-and-extraction.trace.md)
  - Value: fG80GUtnuJoy9MVPvbhZJF45MWRPPgVLnxUVZkzmA7U

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: Vva6JCCr9WXdtpm05aHn9FwFHVIZ5f1YVj0cxGXnAiE