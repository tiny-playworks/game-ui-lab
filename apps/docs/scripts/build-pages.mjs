import { cpSync, existsSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = resolve(docsDir, '..', '..');
const galleryDist = resolve(workspaceRoot, 'apps/gallery/dist');
const docsBuild = resolve(docsDir, 'doc_build');
const labTarget = join(docsBuild, 'lab');

run('pnpm', ['--filter', '@tiny-playworks/game-ui-gallery', 'build:lab'], workspaceRoot);
run('pnpm', ['exec', 'rspress', 'build'], docsDir);

if (!existsSync(galleryDist)) {
  throw new Error(`Gallery dist was not found at ${galleryDist}`);
}

rmSync(labTarget, { force: true, recursive: true });
cpSync(galleryDist, labTarget, { recursive: true });

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    env: process.env,
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
