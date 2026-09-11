import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  NATIVE_PROVIDER_ID,
  createNativeProvider,
  discoverNativeMarkdownRefs,
  materializeNativeSource,
  normalizeNativeWorkspacePath,
  registerNativeSource
} from '../src/index.js';

test('native provider exposes an ordinary provider-neutral adapter contract', () => {
  const provider = createNativeProvider();
  assert.equal(provider.schema, 'tiinex.adapter.definition.v1');
  assert.equal(provider.id, NATIVE_PROVIDER_ID);
  assert.equal(provider.capabilities.registerSource, true);
  assert.equal(provider.capabilities.materialize, true);
  assert.equal(provider.capabilities.discover, true);
  assert.equal(provider.capabilities.exportMaterial, false);
  assert.match(provider.boundary, /filesystem\/workspace-relative/);
});

test('native source registration requires an explicit absolute root', () => {
  assert.throws(() => registerNativeSource({ workspaceRoot: 'relative/workspace' }), /absolute filesystem path/);
  const source = registerNativeSource({ workspaceRoot: path.resolve('/tmp/tiinex-native-contract'), label: 'fixture' });
  assert.equal(source.adapterId, NATIVE_PROVIDER_ID);
  assert.equal(source.sourceKind, 'native.workspace');
  assert.equal(source.config.workspaceRoot, path.resolve('/tmp/tiinex-native-contract'));
});

test('workspace-relative normalization fails closed on traversal and absolute paths', () => {
  assert.equal(normalizeNativeWorkspacePath('./docs\\one.trace.md'), 'docs/one.trace.md');
  assert.throws(() => normalizeNativeWorkspacePath('../outside.md'), /traversal/);
  assert.throws(() => normalizeNativeWorkspacePath('docs/../../outside.md'), /traversal/);
  assert.throws(() => normalizeNativeWorkspacePath('/absolute.md'), /workspace-relative/);
  assert.throws(() => normalizeNativeWorkspacePath('C:\\absolute.md'), /workspace-relative/);
});

test('native discovery is deterministic, Markdown-only, and skips symlink surfaces', async (t) => {
  const root = await mkdtemp(path.join(tmpdir(), 'tiinex-provider-native-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'docs', 'nested'), { recursive: true });
  await writeFile(path.join(root, 'docs', 'b.md'), '# B\n');
  await writeFile(path.join(root, 'docs', 'a.trace.md'), '# A\n');
  await writeFile(path.join(root, 'docs', 'nested', 'c.markdown'), '# C\n');
  await writeFile(path.join(root, 'docs', 'skip.txt'), 'skip\n');
  await symlink(path.join(root, 'docs', 'a.trace.md'), path.join(root, 'docs', 'linked.md'));
  const source = registerNativeSource({ workspaceRoot: root, rootPaths: ['docs'] });
  const discovered = await discoverNativeMarkdownRefs(source);
  assert.deepEqual(discovered.refs, ['docs/a.trace.md', 'docs/b.md', 'docs/nested/c.markdown']);
  assert.equal(discovered.warnings.some((item) => item.code === 'native.discovery.symlink-skipped'), true);
});

test('native materialization preserves workspace-relative source identity and rejects escape attempts', async (t) => {
  const parent = await mkdtemp(path.join(tmpdir(), 'tiinex-provider-native-boundary-'));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const root = path.join(parent, 'workspace');
  await mkdir(path.join(root, 'docs'), { recursive: true });
  await writeFile(path.join(root, 'docs', 'one.md'), '# One\n\nNative record.\n');
  await writeFile(path.join(parent, 'outside.md'), '# Secret\n');
  await symlink(path.join(parent, 'outside.md'), path.join(root, 'docs', 'outside-link.md'));

  const source = registerNativeSource({ workspaceRoot: root, id: 'native:test' });
  const good = await materializeNativeSource(source, { fileRefs: ['docs/one.md'] });
  assert.equal(good.state, 'ok');
  assert.equal(good.records.length, 1);
  assert.equal(good.records[0].path, 'docs/one.md');
  assert.equal(good.records[0].source.adapterId, NATIVE_PROVIDER_ID);
  assert.equal(good.records[0].source.sourceArtifactPath, 'docs/one.md');
  assert.equal(good.records[0].sourceTarget.transportTier, 'native-filesystem');
  assert.equal(good.records[0].markdown.includes('Secret'), false);

  const symlinked = await materializeNativeSource(source, { fileRefs: ['docs/outside-link.md'] });
  assert.equal(symlinked.state, 'failed');
  assert.equal(symlinked.errors[0].code, 'native.path.symlink-rejected');

  assert.throws(() => normalizeNativeWorkspacePath('../outside.md'), /traversal/);
});
