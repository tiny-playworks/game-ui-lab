import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
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

const { createGameUiThemeCss, gameUiThemeNames } = await import('../dist/index.js');
const css = [
  '/* Generated from @tiny-playworks/tokens. Do not edit by hand. */',
  ':root,',
  '[data-game-ui-theme="default"] {',
  '  color-scheme: dark;',
  ...createGameUiThemeCss('default'),
  '}',
  '',
  ...gameUiThemeNames
    .filter((themeName) => themeName !== 'default')
    .flatMap((themeName) => [
      `[data-game-ui-theme="${themeName}"] {`,
      '  color-scheme: dark;',
      ...createGameUiThemeCss(themeName),
      '}',
      '',
    ]),
].join('\n');

mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, 'index.css'), `${css}\n`);
