import { cpSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const packageDir = resolve(import.meta.dirname, '..');
const distDir = resolve(packageDir, 'dist');

rmSync(distDir, { force: true, recursive: true });

const result = spawnSync('pnpm', ['exec', 'tsc', '-p', 'tsconfig.build.json'], {
  cwd: packageDir,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

cpSync(resolve(packageDir, 'src/index.css'), resolve(distDir, 'index.css'));
