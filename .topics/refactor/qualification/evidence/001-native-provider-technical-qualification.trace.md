# Continuity Context

- Envelope Schema: tiinex.root.v1
- Parent
  - Parent Schema: [tiinex.task.v1](https://github.com/Tiinex/docs/blob/053d46ce082d4ec261b82abc44ecca403d61e240/.topics/.schemas/core/task/tiinex.task.v1.schema.md)
  - Created At: 2026-09-09 15:48:17
  - Trace: [001-native-provider-qualification.trace.md](../001-native-provider-qualification.trace.md)
  - Origin:
    - [relative](../001-native-provider-qualification.trace.md)
- Current
  - Current Schema: tiinex.evidence.v1
  - Created At: 2026-09-09 20:13:24
  - Authors: Anchor
  - Why: Seal exact local qualification and boundary evidence for the transferred Native provider implementation before return.
  - Summary: Provider-native passes exact focused tests and package closure over a bounded filesystem/workspace-relative Core contract surface.
  - Status: ready/local

---

## Supported Claim Or Question

- Supported Claim Or Question: does `@tiinex/provider-native` now provide an independently consumable first-party Native provider over public neutral Core contracts while limiting itself to explicit workspace-relative/filesystem-backed behavior and failing closed on path escape
- Evidence Role: qualifies the provider-native implementation, package surface and local filesystem safety boundary against the repo-owned Task lineage

## Provenance

- Known Source: current provider-native Workspace materialized from the qualified 001 Anchor-to-Anchor Provider-family Handoff plus read-only Core contract material from the same qualified carrier
- Provenance Limits: exact local qualification only; no claim of remote publication, registry state, or owner-side integration completion
- Preservation Basis: source changes are confined to provider-native; Core/App bytes remained read-only and the local `node_modules/@tiinex/core` link is runtime-only qualification plumbing excluded from canonical manufacture
- Receipt: `evidence/receipts/001-provider-native-technical-qualification.json`
- Exact Test Output: `evidence/receipts/001-provider-native-npm-test.tap` (`sha256:9397e4be495148bc05cd332f237db1a54c1fc8e566010196def5bc5766689ebb`)
- Exact Pack Output: `evidence/receipts/001-provider-native-npm-pack-dry-run.json` (`sha256:b603152a3487f679babb71629150725f77dec36d4c7d29e309e3b8d39c7b05dc`)
- Technical Receipt Digest: `sha256:c9414288e11a58a500d03d9a5983c99a1f94e0911b7a8d7eba3c792a65366539`

## Evidence Material

- Material: current provider source plus exact local qualification receipts sealed under this Evidence artifact
- Material Kind: package source, focused Node test suite, package dry-run receipt and exact source manifest
- `npm test`: passed **6/6**, failed **0**
- `npm pack --dry-run --json`: exit **0**, package `@tiinex/provider-native@0.1.0`, **7** publishable entries, package size **9482** bytes, unpacked size **29838** bytes
- Pack SHA-1: `ce7d33984a4a95de772ae20767c1e962c5a5defd`
- Pack Integrity: `sha512-T9Ry2sL1o4Fbe1fXQLQ9PSaJ9T0WQpgHzZrA6OQtlpkKW/aalAfDhuqnujaZqhWg4LrVH1PjMfKiSxy1dT+abw==`
- Safety Qualification: workspace roots must be explicit absolute filesystem paths; workspace-relative refs reject traversal and absolute paths; materialization rejects symbolic-link crossings by default; discovery is deterministic, Markdown-only and bounded
- Boundary Qualification: archive intake, static sources, browser-local File/FileList intake, export mechanics and generic Git behavior are not implemented by this provider

## Capability And Contract Mapping

- Register source: `registerNativeSource` -> public Core `makeSourceRegistration`
- Provider definition: `createNativeProvider` -> public Core `makeAdapterDefinition`
- Materialization result: `materializeNativeSource` -> public Core `makeAdapterResult`
- Artifact record construction: Native file bytes -> public Core `createRecordFromMarkdown`
- Native-owned policy: explicit filesystem root, workspace-relative path qualification, directory discovery and filesystem read

## Preservation And Fidelity

- Preservation State: provider-neutral adapter/result/record semantics remain in Core; no Core/App implementation was copied into provider-native
- Fidelity Notes: the implementation intentionally does not infer `process.cwd()` and does not treat local archive/static/export behavior as Native merely because those mechanisms may execute on the same host
- Known Losses: browser File/FileList intake remains App/local-adapter behavior and is not represented as Native filesystem capability

## Interpretation Limits

- Not Yet Used As: owner acceptance, npm publication authority, or proof of cross-repository integration completion
- Does Not Prove: remote publication, npm publication, browser-local file intake, archive extraction, generic Git recovery, App integration wiring, or provider family completeness beyond Native
- Must Not Be Treated As: authority to mutate Core/App, permission to follow arbitrary filesystem symlinks, or evidence that every local source mechanism belongs to provider-native

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: [001-native-provider-qualification.trace.md](../001-native-provider-qualification.trace.md)
  - Value: 84HNZf7dUdkKBHRMWYELqOpVxANRy7-SnKwxT1cSe4M

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: aJrfAEpcWOhoJnMmdrJyBmN0hSvyl6zFfRc-03PnMwg