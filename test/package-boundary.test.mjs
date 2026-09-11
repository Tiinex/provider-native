import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('package and release policy bind the provider-native repository identity and public provider surface', async () => {
  const pkg=JSON.parse(await readFile(new URL('../package.json', import.meta.url),'utf8'));
  const policy=JSON.parse(await readFile(new URL('../.github/release-policy.json', import.meta.url),'utf8'));
  assert.equal(pkg.name,'@tiinex/provider-native');
  assert.equal(pkg.repository.url,'git+https://github.com/Tiinex/provider-native.git');
  assert.equal(policy.repository,'Tiinex/provider-native');
  const publicModule=await import('../src/index.js');
  assert.deepEqual(Object.keys(publicModule).sort(),[
    'NATIVE_FILE_SOURCE_KIND',
    'NATIVE_FILESYSTEM_TRANSPORT',
    'NATIVE_PROVIDER_ID',
    'NATIVE_WORKSPACE_SOURCE_KIND',
    'createNativeProvider',
    'discoverNativeMarkdownRefs',
    'materializeNativeSource',
    'normalizeNativeWorkspacePath',
    'qualifyNativeFilesystemTarget',
    'qualifyNativeWorkspaceRoot',
    'readNativeMarkdown',
    'registerNativeSource',
    'resolveNativeWorkspacePath'
  ].sort());
});
