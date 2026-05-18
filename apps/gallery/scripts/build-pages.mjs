import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

process.env.PUBLIC_BASE_PATH = '/game-ui-lab/lab/';

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

process.chdir(packageDir);

const primitiveBuild = spawnSync('pnpm', ['--filter', '@tiny-playworks/game-ui', 'build'], {
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (primitiveBuild.status !== 0) {
  process.exit(primitiveBuild.status ?? 1);
}

const result = spawnSync('pnpm', ['exec', 'rsbuild', 'build'], {
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await import('./write-pages-fallback.mjs');
