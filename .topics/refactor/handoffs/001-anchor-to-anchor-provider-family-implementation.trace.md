# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 15:48:15
  - Trace: [001-native-provider-boundary-and-extraction.trace.md](../001-native-provider-boundary-and-extraction.trace.md)
  - Origin:
    - [relative](../001-native-provider-boundary-and-extraction.trace.md)
- Current
  - Current Schema: [tiinex.handoff.v1](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.schemas/coordination/handoff/tiinex.handoff.v1.schema.md)
  - Created At: 2026-09-09 19:45:38
  - Authors: Anchor
  - Why: Advance the concrete Provider family independently while shared Core/App authority remains with Refactor Anchor and the App lane.
  - Summary: Delegate provider-native and provider-github implementation and technical qualification.
  - Status: ready/local

---

## Handoff Parties

- Purpose: delegate the first concrete Provider-family implementation lane so native and GitHub providers become real independently testable packages over existing provider-neutral Core/App contracts without moving generic capability semantics out of their owners.
- From: Anchor
- From Kind: role
- From Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)
- To: Anchor
- To Kind: role
- To Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)

## Transfers

- native-provider-implementation
  - Transfer Kind: work-and-responsibility
  - Description: implement and technically qualify provider-native against its repo-owned contract, migration and qualification Tasks using only genuinely native/workspace-relative/filesystem-backed behavior.
  - Controlling Artifact: [Native provider boundary and extraction](provider-native::.topics/refactor/001-native-provider-boundary-and-extraction.trace.md)
  - Boundary: provider-native source is writable; generic archive/static/export/git mechanics remain outside unless the current contracts prove otherwise.

- github-provider-implementation
  - Transfer Kind: work-and-responsibility
  - Description: implement and technically qualify provider-github for GitHub/GitHub-family discovery, browse/git resolution and publication behavior against provider-neutral contracts.
  - Controlling Artifact: [GitHub provider boundary and extraction](provider-github::.topics/refactor/001-github-provider-boundary-and-extraction.trace.md)
  - Boundary: provider-github source is writable; do not classify unrelated forges as GitHub merely from URL shape and do not redefine generic browse+git semantics.

## Required Context

- provider-native-workspace
  - Material: complete current provider-native source and repo-local Task lineage.
  - Material Reference: [Provider Native Workspace](provider-native::.topics/.workspaces/tiinex-provider-native.workspace.md)
  - Purpose: writable native-provider implementation scope.
  - Availability: available

- provider-github-workspace
  - Material: complete current provider-github source and repo-local Task lineage.
  - Material Reference: [Provider GitHub Workspace](provider-github::.topics/.workspaces/tiinex-provider-github.workspace.md)
  - Purpose: writable GitHub-provider implementation scope.
  - Availability: available

- core-workspace
  - Material: current provider-neutral Core contracts/mechanics.
  - Material Reference: [Core Workspace](core::.topics/.workspaces/tiinex-core.workspace.md)
  - Purpose: read-only shared dependency; return generic contract gaps rather than copying private Core source.
  - Availability: available

- app-workspace
  - Material: current App provider integration/data-plane surfaces.
  - Material Reference: [App Workspace](app::.topics/.workspaces/tiinex-app.workspace.md)
  - Purpose: read-only real consumer/host boundary and compatibility evidence.
  - Availability: available

- docs-workspace
  - Material: canonical recovery/Origin/Parent/provider-independent semantic constraints.
  - Material Reference: [Docs Workspace](docs::.topics/.workspaces/tiinex-docs.workspace.md)
  - Purpose: keep providers as resolution/materialization implementations rather than semantic authority.
  - Availability: available

- business-workspace
  - Material: controlling Turn-2 objective and Anchor Role boundaries.
  - Material Reference: [Business Workspace](business::.topics/.workspaces/tiinex-business.workspace.md)
  - Purpose: scope and return discipline.
  - Availability: available

## Reference Context

- none

## Retained Responsibilities

- shared-contract-acceptance
  - Retained By: Anchor
  - Responsibility: accept/reject proposed Core/App contract changes and reconcile concurrent App work.
  - Boundary: recipient must not edit Core or App even when a local provider implementation would be easier with a shared change.

- semantic-authority
  - Retained By: Docs and owning semantic surfaces
  - Responsibility: Parent, Origin, recovery-route and integrity meaning.
  - Boundary: provider resolution never makes semantic truth or integrity claims by itself.

## Exclusions And Dependencies

- core-or-app-mutation
  - Kind: excluded-scope
  - Description: Core and App are read-only in this lane; return exact blockers/change proposals with the smallest needed public surface.
  - Responsible Party Or Role: Anchor / App lane

- forge-generalization
  - Kind: excluded-scope
  - Description: do not fold Gitea, Forgejo or arbitrary Git hosts into provider-github without explicit proven compatibility and authority.
  - Responsible Party Or Role: future provider lane / Anchor

- publication
  - Kind: excluded-scope
  - Description: no npm publication or package-version decision; package tests/pack checks are allowed and expected.
  - Responsible Party Or Role: Anchor

## Completion Expectation

- Signal Kind: return
- Signal Meaning: return one normal Tiinex Handoff carrying complete current provider-native and provider-github source, exact tests/pack receipts for both, explicit capability/contract mapping, and any narrowly scoped Core/App blocker/change proposal.
- Return To: Anchor
- Return To Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)

## Interpretation Limits

- Does Not Mean: providers own artifact semantics, integrity truth, App host behavior or non-GitHub forge identity.
- Must Not Be Used To Claim: provider family completeness beyond the two transferred first-party implementations.
- Authority Limits: provider-native and provider-github implementation/technical qualification only.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-native-provider-boundary-and-extraction.trace.md](../001-native-provider-boundary-and-extraction.trace.md)
  - Value: fG80GUtnuJoy9MVPvbhZJF45MWRPPgVLnxUVZkzmA7U

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: Mo59D0aegs3oQhAq8aVLZMp5yvaUiOSDmsEKC0cE3pk