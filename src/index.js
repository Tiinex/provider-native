export {
  NATIVE_FILE_SOURCE_KIND,
  NATIVE_FILESYSTEM_TRANSPORT,
  NATIVE_PROVIDER_ID,
  NATIVE_WORKSPACE_SOURCE_KIND,
  createNativeProvider,
  discoverNativeMarkdownRefs,
  materializeNativeSource,
  readNativeMarkdown,
  registerNativeSource
} from './native.provider.js';

export {
  normalizeNativeWorkspacePath,
  qualifyNativeFilesystemTarget,
  qualifyNativeWorkspaceRoot,
  resolveNativeWorkspacePath
} from './native.paths.js';
