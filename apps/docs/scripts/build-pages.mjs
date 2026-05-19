import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsBuild = resolve(docsDir, 'doc_build');
const repoRoot = resolve(docsDir, '..', '..');

rmSync(docsBuild, { force: true, recursive: true });
mkdirSync(docsBuild, { recursive: true });

process.env.PUBLIC_BASE_PATH = '/game-ui-lab/';
const tokensBuild = spawnSync('pnpm', ['--filter', '@tiny-playworks/tokens', 'build'], {
  cwd: repoRoot,
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (tokensBuild.status !== 0) {
  process.exit(tokensBuild.status ?? 1);
}

const result = spawnSync('pnpm', ['exec', 'rspress', 'build'], {
  cwd: docsDir,
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

writeFileSync(resolve(docsBuild, '.nojekyll'), '', 'utf8');
