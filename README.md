# @tiinex/provider-native

First-party Native provider for Tiinex. The package implements Node filesystem/workspace-relative source resolution over the public provider-neutral Core adapter and artifact contracts.

## Boundary

`provider-native` owns only genuinely native behavior: an explicit absolute workspace root, deterministic workspace-relative Markdown discovery, and filesystem-backed reads. It does **not** own archive intake, static sources, export packaging, generic Git recovery, or browser-local File/FileList intake.

The provider never infers a root from `process.cwd()`. Workspace-relative paths reject traversal and absolute targets. Filesystem materialization rejects symbolic-link crossings by default so a registered workspace cannot silently escape its explicit root.

## Public API

```js
import {
  createNativeProvider,
  registerNativeSource,
  discoverNativeMarkdownRefs,
  materializeNativeSource
} from '@tiinex/provider-native';
```

`createNativeProvider()` returns `tiinex.adapter.definition.v1` using `@tiinex/core/adapters/adapter.contracts.js`. `registerNativeSource()` returns the shared `tiinex.source.registration.v1` shape. `materializeNativeSource()` returns the shared `tiinex.adapter.result.v1` shape and records created through `@tiinex/core/artifacts/artifact.record.js`.

```js
const source = registerNativeSource({
  workspaceRoot: '/absolute/path/to/workspace',
  rootPaths: ['.topics']
});

const result = await materializeNativeSource(source);
```

Explicit paths can be supplied with `{ fileRefs: ['README.md'] }`. Discovery is bounded (`maxFiles`, default 2000; hard cap 10000) and Markdown-only.

## Capability / contract mapping

| Provider capability | Implementation | Shared contract |
| --- | --- | --- |
| Register source | `registerNativeSource` | `makeSourceRegistration` |
| Discover | `discoverNativeMarkdownRefs` | provider capability flag + explicit source boundary |
| Materialize | `materializeNativeSource` | `makeAdapterResult` |
| Record construction | `readNativeMarkdown` + materialization | `createRecordFromMarkdown` |
| Workspace-relative target qualification | `normalizeNativeWorkspacePath`, `qualifyNativeFilesystemTarget` | provider-owned native policy |

## Qualification

Run `npm test` for use-case qualification and `npm run pack:check` for package closure. Tests use temporary workspaces and prove deterministic discovery, traversal rejection, symlink escape rejection, Core contract shapes, and package identity.
