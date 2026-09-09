# Continuity Context

- Envelope Schema: tiinex.root.v1
- Current
  - Current Schema: tiinex.workspace.v1
  - Created At: 2026-09-09 15:47:26
  - Authors: Anchor
  - Why: Native workspace-relative and filesystem-backed resolution. Do not absorb archive/static/export mechanics merely because they are local.
  - Summary: Portable Workspace entrypoint for Tiinex/provider-native.
  - Status: active/local

---

# Tiinex Provider Native

## Schema Origins

- Tiinex Docs canonical schemas
  - Kind: github-tree
  - Repository: Tiinex/docs
  - Ref: master
  - Root Path: .topics/.schemas
  - Trust Role: canonical-core

## Workspace Entrypoints

### Provider Native

- Source Kind: local-directory
- Repository: Tiinex/provider-native
- Root Path: .
- Repo Files Discovery: on

## Workspace Boundary

Native workspace-relative and filesystem-backed resolution. Do not absorb archive/static/export mechanics merely because they are local.

---

# Continuity Integrity

- [sha256-base64url-c14n-v2](https://github.com/Tiinex/docs/blob/3988951208eb9a8926e84ab42625d4b42fa00c2d/.topics/.validators/sha256-base64url-c14n-v2.validator.md)
  - Towards: self
  - Value: dJijtIFhj8uDgUUhaf5I3y_e-cFvLOTpVJ4jnmhO0j8