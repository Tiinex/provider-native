import path from 'node:path';
import { lstat, realpath } from 'node:fs/promises';

export function normalizeNativeWorkspacePath(value = '') {
  const raw = String(value ?? '').trim();
  if (!raw) throw nativeError('native.path.required', 'Native workspace path is required.');
  if (raw.includes('\0')) throw nativeError('native.path.nul', 'Native workspace path cannot contain NUL bytes.');
  const portable = raw.replace(/\\/g, '/');
  if (portable.startsWith('/') || /^[A-Za-z]:\//.test(portable) || /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(portable)) {
    throw nativeError('native.path.relative-required', 'Native workspace paths must be workspace-relative.');
  }
  const parts = portable.split('/');
  const clean = [];
  for (const part of parts) {
    if (!part || part === '.') continue;
    if (part === '..') throw nativeError('native.path.traversal', 'Native workspace path traversal is not allowed.');
    clean.push(part);
  }
  if (!clean.length) throw nativeError('native.path.required', 'Native workspace path is required.');
  return clean.join('/');
}

export function qualifyNativeWorkspaceRoot(value = '') {
  const raw = String(value ?? '').trim();
  if (!raw) throw nativeError('native.root.required', 'Native provider requires an explicit workspace root.');
  if (!path.isAbsolute(raw)) throw nativeError('native.root.absolute-required', 'Native provider workspace root must be an explicit absolute filesystem path.');
  return path.resolve(raw);
}

export function resolveNativeWorkspacePath(workspaceRoot, relativePath) {
  const root = qualifyNativeWorkspaceRoot(workspaceRoot);
  const relative = normalizeNativeWorkspacePath(relativePath);
  const target = path.resolve(root, ...relative.split('/'));
  const relation = path.relative(root, target);
  if (!relation || relation.startsWith('..' + path.sep) || relation === '..' || path.isAbsolute(relation)) {
    throw nativeError('native.path.outside-root', 'Native workspace path must remain inside the explicit workspace root.');
  }
  return target;
}

export async function qualifyNativeFilesystemTarget(workspaceRoot, relativePath, options = {}) {
  const root = qualifyNativeWorkspaceRoot(workspaceRoot);
  const rootRealPath = await realpath(root).catch((error) => {
    throw nativeError('native.root.unavailable', `Native workspace root is unavailable: ${error?.message || error}`);
  });
  const relative = normalizeNativeWorkspacePath(relativePath);
  const parts = relative.split('/');
  let current = rootRealPath;
  for (const part of parts) {
    current = path.join(current, part);
    const stat = await lstat(current).catch((error) => {
      throw nativeError('native.path.unavailable', `Native workspace target is unavailable: ${relative}`, { cause: error });
    });
    if (stat.isSymbolicLink() && options.allowSymlinks !== true) {
      throw nativeError('native.path.symlink-rejected', `Native workspace target crosses a symbolic link: ${relative}`);
    }
  }
  const targetRealPath = await realpath(current).catch((error) => {
    throw nativeError('native.path.unavailable', `Native workspace target is unavailable: ${relative}`, { cause: error });
  });
  const relation = path.relative(rootRealPath, targetRealPath);
  if (relation.startsWith('..' + path.sep) || relation === '..' || path.isAbsolute(relation)) {
    throw nativeError('native.path.outside-root', `Native workspace target resolves outside the explicit workspace root: ${relative}`);
  }
  return Object.freeze({
    workspaceRoot: root,
    rootRealPath,
    relativePath: relative,
    targetPath: current,
    targetRealPath
  });
}

export function nativeError(code, message, extra = {}) {
  const error = new Error(message);
  error.code = code;
  Object.assign(error, extra);
  return error;
}
