import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsBuild = resolve(docsDir, 'doc_build');

rmSync(docsBuild, { force: true, recursive: true });
mkdirSync(docsBuild, { recursive: true });

process.env.PUBLIC_BASE_PATH = '/game-ui-lab/';

const { spawnSync } = await import('node:child_process');

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
