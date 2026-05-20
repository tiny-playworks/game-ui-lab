import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const repoRoot = resolve(import.meta.dirname, '..');
const tokensDir = resolve(repoRoot, 'packages/tokens');
const primitivesDir = resolve(repoRoot, 'packages/primitives');
const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?$/.test(version)) {
  console.error('Usage: pnpm release <version>');
  process.exit(1);
}

const releaseTag = `v${version}`;
const releaseDir = resolve(repoRoot, '.release', releaseTag);

run('git', ['diff', '--quiet'], { allowFailure: false });
run('git', ['diff', '--cached', '--quiet'], { allowFailure: false });
const worktreeStatus = run('git', ['status', '--porcelain'], { allowFailure: false }).stdout.trim();

if (worktreeStatus) {
  fail('Release preparation requires a clean git worktree, including untracked files.');
}

updatePackageVersion(tokensDir, version);
updatePackageVersion(primitivesDir, version);

run('pnpm', ['test'], { allowFailure: false });
run('pnpm', ['typecheck'], { allowFailure: false });
run('pnpm', ['build'], { allowFailure: false });

rmSync(releaseDir, { force: true, recursive: true });
mkdirSync(releaseDir, { recursive: true });

run('pnpm', ['--filter', '@tiny-playworks/tokens', 'pack', '--pack-destination', releaseDir], { allowFailure: false });
run('pnpm', ['--filter', '@tiny-playworks/game-ui', 'pack', '--pack-destination', releaseDir], { allowFailure: false });

const tarballs = findTarballs(releaseDir);

if (tarballs.length !== 2) {
  fail(`Expected 2 tarballs in ${releaseDir}, got ${tarballs.length}.`);
}

const nextSteps = [
  `Prepared ${releaseTag}`,
  '',
  'Version files updated:',
  `- packages/tokens/package.json -> ${version}`,
  `- packages/primitives/package.json -> ${version}`,
  '',
  'Tarballs:',
  ...tarballs.map((filePath) => `- ${filePath}`),
  '',
  'Manual publish commands:',
  `- cd ${tokensDir} && npm publish --access public`,
  `- cd ${primitivesDir} && npm publish --access public`,
  '',
  'After npm publish succeeds:',
  `- git add packages/tokens/package.json packages/primitives/package.json pnpm-lock.yaml`,
  `- git commit -m "chore: release ${releaseTag}"`,
  `- git tag ${releaseTag}`,
  `- git push origin HEAD`,
  `- git push origin ${releaseTag}`,
].join('\n');

process.stdout.write(`${nextSteps}\n`);

function updatePackageVersion(packageDir, nextVersion) {
  const packageJsonPath = resolve(packageDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = nextVersion;
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
}

function findTarballs(dir) {
  const result = run('find', [dir, '-maxdepth', '1', '-name', '*.tgz', '-type', 'f'], { allowFailure: false });
  return result.stdout
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .sort();
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function run(command, args, { allowFailure }) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (!allowFailure && result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result;
}
