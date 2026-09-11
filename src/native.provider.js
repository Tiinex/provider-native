import path from 'node:path';
import { readdir, readFile, realpath, stat } from 'node:fs/promises';
import {
  AdapterAvailability,
  makeAdapterDefinition,
  makeAdapterResult,
  makeSourceRegistration
} from '@tiinex/core/adapters/adapter.contracts.js';
import { createRecordFromMarkdown } from '@tiinex/core/artifacts/artifact.record.js';
import {
  nativeError,
  normalizeNativeWorkspacePath,
  qualifyNativeFilesystemTarget,
  qualifyNativeWorkspaceRoot
} from './native.paths.js';

export const NATIVE_PROVIDER_ID = 'native';
export const NATIVE_WORKSPACE_SOURCE_KIND = 'native.workspace';
export const NATIVE_FILE_SOURCE_KIND = 'native.file';
export const NATIVE_FILESYSTEM_TRANSPORT = 'native-filesystem';

const MARKDOWN_FILE_RE = /\.(?:md|markdown)$/i;

export function createNativeProvider() {
  return makeAdapterDefinition({
    id: NATIVE_PROVIDER_ID,
    label: 'Native filesystem',
    availability: AdapterAvailability.available,
    sourceKinds: [NATIVE_WORKSPACE_SOURCE_KIND, NATIVE_FILE_SOURCE_KIND],
    capabilities: {
      registerSource: true,
      materialize: true,
      discover: true,
      resolveAsset: false,
      openExternal: false,
      exportMaterial: false,
      requiresBridge: false
    },
    configShape: {
      workspaceRoot: 'explicit absolute filesystem path supplied by the Node host',
      rootPaths: 'optional workspace-relative discovery roots',
      fileRefs: 'optional explicit workspace-relative Markdown paths',
      maxFiles: 'bounded discovery limit'
    },
    boundary: 'Node-native filesystem/workspace-relative resolution only; archive, static, export and git mechanics remain outside this provider.',
    notes: [
      'Workspace-relative targets are fail-closed against traversal and symlink escape by default.',
      'The provider never infers a workspace root from process.cwd() or transport identity.'
    ]
  });
}

export function registerNativeSource(input = {}) {
  const config = input.config || {};
  const workspaceRoot = qualifyNativeWorkspaceRoot(input.workspaceRoot || config.workspaceRoot || input.rootPath || config.rootPath || input.path || '');
  const rootPaths = normalizeRootPaths(input.rootPaths ?? config.rootPaths ?? []);
  const fileRefs = normalizeOptionalRefs(input.fileRefs ?? config.fileRefs ?? []);
  const maxFiles = normalizeMaxFiles(input.maxFiles ?? config.maxFiles);
  return makeSourceRegistration({
    id: input.id || '',
    adapterId: NATIVE_PROVIDER_ID,
    sourceKind: input.sourceKind || NATIVE_WORKSPACE_SOURCE_KIND,
    label: input.label || path.basename(workspaceRoot) || workspaceRoot,
    config: {
      workspaceRoot,
      ...(rootPaths.length ? { rootPaths } : {}),
      ...(fileRefs.length ? { fileRefs } : {}),
      ...(maxFiles ? { maxFiles } : {})
    },
    boundary: createNativeProvider().boundary,
    closeable: input.closeable !== false
  }, createNativeProvider());
}

export async function discoverNativeMarkdownRefs(source = {}, input = {}, options = {}) {
  const workspaceRoot = sourceWorkspaceRoot(source);
  const rootRealPath = await realpath(workspaceRoot).catch((error) => {
    throw nativeError('native.root.unavailable', `Native workspace root is unavailable: ${error?.message || error}`);
  });
  const configuredRoots = normalizeRootPaths(input.rootPaths ?? sourceConfig(source).rootPaths ?? []);
  const roots = configuredRoots.length ? configuredRoots : ['.'];
  const maxFiles = normalizeMaxFiles(input.maxFiles ?? sourceConfig(source).maxFiles ?? options.maxFiles) || 2000;
  const refs = [];
  const warnings = [];
  let visitedFiles = 0;
  let visitedDirectories = 0;
  let skippedSymlinks = 0;
  let bounded = false;

  const walk = async (relativeDir) => {
    if (bounded) return;
    const dirPath = relativeDir === '.' ? rootRealPath : path.join(rootRealPath, ...relativeDir.split('/'));
    const entries = await readdir(dirPath, { withFileTypes: true }).catch((error) => {
      throw nativeError('native.discovery.read-directory-failed', `Cannot read native workspace directory: ${relativeDir}`, { cause: error });
    });
    visitedDirectories += 1;
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (bounded) break;
      const rel = relativeDir === '.' ? entry.name : `${relativeDir}/${entry.name}`;
      if (entry.isSymbolicLink()) {
        skippedSymlinks += 1;
        continue;
      }
      if (entry.isDirectory()) {
        await walk(rel);
        continue;
      }
      if (!entry.isFile()) continue;
      visitedFiles += 1;
      if (!MARKDOWN_FILE_RE.test(entry.name)) continue;
      if (refs.length >= maxFiles) {
        bounded = true;
        break;
      }
      refs.push(normalizeNativeWorkspacePath(rel));
    }
  };

  for (const rootRef of roots) {
    if (bounded) break;
    if (rootRef === '.') {
      await walk('.');
      continue;
    }
    const qualified = await qualifyNativeFilesystemTarget(rootRealPath, rootRef, options);
    const rootStat = await stat(qualified.targetRealPath);
    if (rootStat.isDirectory()) await walk(rootRef);
    else if (rootStat.isFile() && MARKDOWN_FILE_RE.test(rootRef) && refs.length < maxFiles) refs.push(rootRef);
  }

  refs.sort((a, b) => a.localeCompare(b));
  const uniqueRefs = [...new Set(refs)];
  if (skippedSymlinks) warnings.push({
    code: 'native.discovery.symlink-skipped',
    message: `Skipped ${skippedSymlinks} symbolic link${skippedSymlinks === 1 ? '' : 's'} during native workspace discovery.`,
    count: skippedSymlinks
  });
  if (bounded) warnings.push({
    code: 'native.discovery.bounded',
    message: `Native discovery was bounded at ${maxFiles} Markdown files.`,
    maxFiles
  });
  return Object.freeze({
    refs: Object.freeze(uniqueRefs),
    warnings: Object.freeze(warnings),
    diagnostics: Object.freeze({
      transport: NATIVE_FILESYSTEM_TRANSPORT,
      rootCount: roots.length,
      visitedDirectories,
      visitedFiles,
      skippedSymlinks,
      maxFiles,
      bounded
    })
  });
}

export async function readNativeMarkdown(source = {}, ref = '', options = {}) {
  const workspaceRoot = sourceWorkspaceRoot(source);
  const qualified = await qualifyNativeFilesystemTarget(workspaceRoot, ref, options);
  const fileStat = await stat(qualified.targetRealPath);
  if (!fileStat.isFile()) throw nativeError('native.path.not-file', `Native workspace target is not a file: ${qualified.relativePath}`);
  if (!MARKDOWN_FILE_RE.test(qualified.relativePath)) throw nativeError('native.file.unsupported', `Native provider materializes Markdown files only: ${qualified.relativePath}`);
  const markdown = await readFile(qualified.targetRealPath, 'utf8');
  return Object.freeze({
    relativePath: qualified.relativePath,
    markdown,
    size: fileStat.size,
    sourceTarget: Object.freeze({
      schema: 'tiinex.source.material.target.v1',
      adapterId: NATIVE_PROVIDER_ID,
      sourceArtifactPath: qualified.relativePath,
      transportTier: NATIVE_FILESYSTEM_TRANSPORT,
      loaded: true
    })
  });
}

export async function materializeNativeSource(source = {}, input = {}, options = {}) {
  const normalizedSource = ensureNativeSource(source);
  const sourceId = normalizedSource.id || `${NATIVE_PROVIDER_ID}:workspace`;
  const configuredRefs = normalizeOptionalRefs(input.fileRefs ?? sourceConfig(normalizedSource).fileRefs ?? []);
  let refs = configuredRefs;
  const warnings = [];
  let discoveryDiagnostics = null;
  if (!refs.length) {
    const discovery = await discoverNativeMarkdownRefs(normalizedSource, input, options);
    refs = [...discovery.refs];
    warnings.push(...discovery.warnings);
    discoveryDiagnostics = discovery.diagnostics;
  }

  const records = [];
  const workspaceEntries = [];
  const errors = [];
  for (const ref of refs) {
    try {
      const loaded = await readNativeMarkdown(normalizedSource, ref, options);
      const record = Object.assign(createRecordFromMarkdown(loaded.markdown, {
        path: loaded.relativePath,
        name: path.posix.basename(loaded.relativePath),
        sourceMode: NATIVE_FILESYSTEM_TRANSPORT
      }), {
        source: Object.freeze({
          id: sourceId,
          adapterId: NATIVE_PROVIDER_ID,
          sourceKind: normalizedSource.sourceKind || NATIVE_WORKSPACE_SOURCE_KIND,
          sourceMode: NATIVE_FILESYSTEM_TRANSPORT,
          sourceArtifactPath: loaded.relativePath
        }),
        sourceTarget: loaded.sourceTarget
      });
      records.push(record);
      workspaceEntries.push(Object.freeze({
        path: loaded.relativePath,
        kind: 'file',
        mediaType: 'text/markdown',
        bytes: loaded.size,
        sourceMode: NATIVE_FILESYSTEM_TRANSPORT
      }));
    } catch (error) {
      errors.push(Object.freeze({
        code: String(error?.code || 'native.materialize.failed'),
        ref: String(ref || ''),
        message: String(error?.message || error)
      }));
    }
  }

  return makeAdapterResult({
    adapterId: NATIVE_PROVIDER_ID,
    sourceId,
    records,
    workspaceEntries,
    errors,
    warnings,
    diagnostics: {
      sourceBoundary: 'explicit-native-workspace',
      transport: NATIVE_FILESYSTEM_TRANSPORT,
      requestedCount: refs.length,
      discovery: discoveryDiagnostics
    }
  });
}

function ensureNativeSource(source = {}) {
  if (source?.schema === 'tiinex.source.registration.v1') {
    sourceWorkspaceRoot(source);
    return source;
  }
  return registerNativeSource(source);
}

function sourceConfig(source = {}) {
  return source?.config && typeof source.config === 'object' ? source.config : source;
}

function sourceWorkspaceRoot(source = {}) {
  const config = sourceConfig(source);
  return qualifyNativeWorkspaceRoot(config.workspaceRoot || config.rootPath || source.workspaceRoot || source.rootPath || source.path || '');
}

function normalizeOptionalRefs(value) {
  const list = Array.isArray(value) ? value : (String(value || '').trim() ? [value] : []);
  return [...new Set(list.map((item) => normalizeNativeWorkspacePath(item)))];
}

function normalizeRootPaths(value) {
  const list = Array.isArray(value) ? value : String(value || '').split(/\r?\n|,/);
  const out = [];
  for (const item of list) {
    const raw = String(item || '').trim();
    if (!raw || raw === '.' || raw === './') {
      if (raw) out.push('.');
      continue;
    }
    out.push(normalizeNativeWorkspacePath(raw));
  }
  return [...new Set(out)];
}

function normalizeMaxFiles(value) {
  const number = Number(value || 0);
  if (!Number.isFinite(number) || number <= 0) return 0;
  return Math.max(1, Math.min(Math.floor(number), 10000));
}
