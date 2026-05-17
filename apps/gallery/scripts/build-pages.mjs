import { spawnSync } from 'node:child_process';

process.env.PUBLIC_BASE_PATH = '/game-ui-lab/';

const result = spawnSync('pnpm exec rsbuild build', {
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await import('./write-pages-fallback.mjs');
