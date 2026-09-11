# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.handoff.v1](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.schemas/coordination/handoff/tiinex.handoff.v1.schema.md)
  - Created At: 2026-09-09 19:45:38
  - Trace: [001-anchor-to-anchor-provider-family-implementation.trace.md](001-anchor-to-anchor-provider-family-implementation.trace.md)
  - Origin:
    - [relative](001-anchor-to-anchor-provider-family-implementation.trace.md)
- Current
  - Current Schema: [tiinex.handoff.v1](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.schemas/coordination/handoff/tiinex.handoff.v1.schema.md)
  - Created At: 2026-09-09 20:14:50
  - Authors: Anchor
  - Why: Satisfy the delegated Provider-family completion expectation with one normal Tiinex Handoff over the two completed first-party provider Workspaces.
  - Summary: Return completed provider-native and provider-github source, exact technical qualification and a bounded Core/App reconciliation proposal to Anchor.
  - Status: ready/local

---

## Handoff Parties

- Purpose: return the completed provider-native and provider-github implementation/technical-qualification lane to Refactor Anchor with exact qualification evidence and the smallest owner-side reconciliation proposal needed for remaining Core/App integration.
- From: Anchor
- From Kind: role
- From Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)
- To: Anchor
- To Kind: role
- To Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)

## Transfers

- native-provider-completed-implementation
  - Transfer Kind: work-and-responsibility
  - Description: return complete current provider-native source implementing explicit Node filesystem/workspace-relative Markdown registration, bounded discovery and materialization over public neutral Core contracts, with traversal and symbolic-link escape protection.
  - Controlling Artifact: [Native provider boundary and extraction](provider-native::.topics/refactor/001-native-provider-boundary-and-extraction.trace.md)
  - Boundary: provider-native owns only genuinely native filesystem/workspace-relative behavior; archive/static/export/browser FileList/generic Git mechanics remain outside this provider.

- github-provider-completed-implementation
  - Transfer Kind: work-and-responsibility
  - Description: return complete current provider-github source implementing explicit GitHub/GitHub-compatible host qualification, repository/default-ref/exact-commit discovery and materialization, plus plan-bound fail-closed publication execution over public neutral Core contracts.
  - Controlling Artifact: [GitHub provider boundary and extraction](provider-github::.topics/refactor/001-github-provider-boundary-and-extraction.trace.md)
  - Boundary: custom hosts require explicit `githubCompatible:true` and explicit HTTPS web/API bases; unrelated forges are never inferred as GitHub from URL shape; generic browse/git semantics remain outside this provider.

## Required Context

- provider-native-current-workspace
  - Material: complete modified provider-native Workspace including source, tests, README, repo-local Task lineage and exact technical qualification receipts.
  - Material Reference: [Provider Native Workspace](provider-native::.topics/.workspaces/tiinex-provider-native.workspace.md)
  - Purpose: canonical current implementation returned by this Handoff.
  - Availability: available

- provider-native-qualification
  - Material: sealed Evidence plus exact TAP, package dry-run JSON and SHA-256 technical qualification receipt for provider-native.
  - Material Reference: [Native provider technical qualification](provider-native::.topics/refactor/qualification/evidence/001-native-provider-technical-qualification.trace.md)
  - Purpose: prove focused local behavior and package closure for the returned Native implementation.
  - Availability: available

- provider-github-current-workspace
  - Material: complete modified provider-github Workspace including source, tests, README, repo-local Task lineage and exact technical qualification receipts.
  - Material Reference: [Provider GitHub Workspace](provider-github::.topics/.workspaces/tiinex-provider-github.workspace.md)
  - Purpose: canonical current GitHub implementation returned by this Handoff.
  - Availability: available

- provider-github-qualification
  - Material: sealed Evidence plus exact TAP, package dry-run JSON and SHA-256 technical qualification receipt for provider-github, including the bounded Core/App reconciliation proposal.
  - Material Reference: [GitHub provider technical qualification](provider-github::.topics/refactor/qualification/evidence/001-github-provider-technical-qualification.trace.md)
  - Purpose: prove focused local behavior, mutation gates, package closure and the remaining owner-side contract gap.
  - Availability: available

## Reference Context

- core-publication-owner-gap
  - Material: read-only Core currently branches on GitHub provider identity and hard-codes github.com social-target parsing in `src/publication/publication.targetContract.js` and `src/sources/github/github.issueTarget.js`.
  - Purpose: owner-side reconciliation target; provider-github therefore blocks custom-host issue/comment mutation before any fetch/write rather than bypassing Core truth.
  - Availability: available

- app-provider-integration
  - Material: read-only App still contains concrete GitHub adapter/registry and guided publication modules under its concurrent provider-neutral integration lane.
  - Purpose: App-owned wiring/removal reconciliation after provider package acceptance.
  - Availability: available

## Retained Responsibilities

- core-and-app-reconciliation
  - Retained By: Anchor
  - Responsibility: accept or reject the proposed Core publication-target neutralization and reconcile App provider wiring/removal with its concurrent lane.
  - Boundary: this returned provider lane did not mutate Core or App.

- semantic-authority
  - Retained By: Docs and owning semantic surfaces
  - Responsibility: Parent, Origin, recovery-route, integrity and publication-result semantic truth.
  - Boundary: provider discovery/materialization/publication execution does not make those semantic claims independently.

- publication-and-versioning
  - Retained By: Anchor
  - Responsibility: npm publication, package version decision and registry release policy.
  - Boundary: this Handoff contains technical test/pack qualification only and performs no registry publication.

## Exclusions And Dependencies

- core-or-app-mutation
  - Kind: excluded-scope
  - Description: no Core or App source was modified; remaining shared-owner changes are returned as a bounded proposal in GitHub technical Evidence.
  - Responsible Party Or Role: Anchor / App lane

- arbitrary-forge-generalization
  - Kind: excluded-scope
  - Description: Gitea, Forgejo, GitLab and arbitrary Git hosts remain outside provider-github unless a future owner lane explicitly qualifies compatible behavior and authority.
  - Responsible Party Or Role: future provider lane / Anchor

- custom-host-social-contract
  - Kind: unresolved-dependency
  - Description: custom GitHub-compatible issue/comment publication remains intentionally blocked before write until Core exposes provider-neutral exact-target semantics/capability data; built-in github.com social publication and qualified repo-file publication are covered by current provider behavior.
  - Responsible Party Or Role: Core owner / Anchor

## Completion Expectation

- Signal Kind: disposition
- Signal Meaning: review the returned provider-native and provider-github implementations and exact qualification evidence, then accept/reject them and reconcile the bounded Core/App owner-side proposal without broadening provider ownership.
- Return To: Anchor
- Return To Reference: [Anchor Role](business::.topics/roles/001-1-anchor-role.trace.md)
- Expected Result Reference: [GitHub provider technical qualification](provider-github::.topics/refactor/qualification/evidence/001-github-provider-technical-qualification.trace.md)

## Interpretation Limits

- Does Not Mean: provider-native owns every local mechanism, provider-github owns generic Git/browse semantics, or either provider owns artifact/integrity/publication truth.
- Must Not Be Used To Claim: npm publication, App integration completion, arbitrary forge compatibility, custom-host social publication readiness, or provider-family completeness beyond Native and GitHub.
- Authority Limits: provider-native and provider-github implementation plus local technical qualification only; Core/App semantic and integration changes remain with their owners.
- Transport Limits: the return carrier must include the complete current modified provider-native and provider-github Workspaces rather than stale parent snapshots.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-anchor-to-anchor-provider-family-implementation.trace.md](001-anchor-to-anchor-provider-family-implementation.trace.md)
  - Value: Mo59D0aegs3oQhAq8aVLZMp5yvaUiOSDmsEKC0cE3pk

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: Ei3fKGiTCm44O-vh1rUDxmdI0YazPWbwidZRqUkgD4w