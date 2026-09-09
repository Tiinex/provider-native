# provider-native

First-party native provider for Tiinex — workspace-relative and local source resolution over provider-neutral Core and App contracts.

## Turn-2 boundary

Own native workspace-relative and filesystem-backed provider behavior without granting Native a privileged path through Core or App.

The repository is intentionally bootstrapped with a minimal public module while Turn-2 extraction defines and qualifies the real runtime surface. Do not move implementation here merely to populate the package.

## Distribution

- npm: `@tiinex/provider-native`
- branch: `master`
- release policy: `.github/release-policy.json`
- bootstrap command after repository/package qualification: `npm run publish:bootstrap`

Publication remains a separate gate from source readiness and technical qualification.
