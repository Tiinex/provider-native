# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.topic.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/topic/tiinex.topic.v1.schema.md)
  - Created At: 2026-09-09 15:45:03
  - Trace: [001-turn-2-repository-decomposition-frontier.trace.md](../../business::.topics/initiatives/refactor/repositories/001-turn-2-repository-decomposition-frontier.trace.md)
  - Origin:
    - [relative](../../business::.topics/initiatives/refactor/repositories/001-turn-2-repository-decomposition-frontier.trace.md)
- Current
  - Current Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 15:48:15
  - Authors: Anchor
  - Why: Give provider-native its own executable Task lineage while retaining the cross-repository objective in Business.
  - Summary: Establish Native as an ordinary first-party provider over provider-neutral contracts, then migrate workspace-relative/filesystem behavior without leaving a privileged local path in Core or App.
  - Status: ready/local

---

# Native provider boundary and extraction

## Objective

Establish Native as an ordinary first-party provider over provider-neutral contracts, then migrate workspace-relative/filesystem behavior without leaving a privileged local path in Core or App.

## Done Criteria

- The repository boundary is explicit and independently understandable.
- Package/release identity matches `Tiinex/provider-native` and `@tiinex/provider-native`.
- Shared contracts are consumed through public neutral surfaces rather than copied sibling implementation.
- Qualification is fast, use-case oriented and fail-closed where lineage, source identity, authority or destructive behavior is involved.

## Scope

Native workspace-relative and filesystem-backed resolution. Do not absorb archive/static/export mechanics merely because they are local.

## Dependencies

- Controlling Business lineage: `business::.topics/initiatives/refactor/repositories/001-turn-2-repository-decomposition-frontier.trace.md`.
- Shared contract changes remain owned by their current repository/semantic authority and are returned to Refactor Anchor for reconciliation.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-turn-2-repository-decomposition-frontier.trace.md](../../business::.topics/initiatives/refactor/repositories/001-turn-2-repository-decomposition-frontier.trace.md)
  - Value: FSTPBfQmP7ZXOwuLt5OxiGGRIC7uF4WtwqPKJO54Dzw

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: fG80GUtnuJoy9MVPvbhZJF45MWRPPgVLnxUVZkzmA7U