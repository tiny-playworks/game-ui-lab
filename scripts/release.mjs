import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';
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
const packageTags = [`tokens-v${version}`, `game-ui-v${version}`];
const releaseCommitMessage = `chore: release ${releaseTag}`;
const releaseTempDir = mkdtempSync(join(tmpdir(), 'game-ui-release-'));
const releaseAssetsDir = resolve(releaseTempDir, 'assets');
mkdirSync(releaseAssetsDir, { recursive: true });

run('git', ['diff', '--quiet'], { allowFailure: false });
run('git', ['diff', '--cached', '--quiet'], { allowFailure: false });
const worktreeStatus = run('git', ['status', '--porcelain'], { allowFailure: false }).stdout.trim();
const currentBranch = run('git', ['branch', '--show-current'], { allowFailure: false }).stdout.trim();

if (worktreeStatus) {
  fail('Release requires a clean git worktree, including untracked files.');
}

if (currentBranch !== 'main') {
  fail('Release must run from main.');
}

run('git', ['fetch', '--tags', 'origin'], { allowFailure: false });

if (run('git', ['rev-parse', '--verify', '--quiet', releaseTag], { allowFailure: true }).status === 0) {
  fail(`Local tag ${releaseTag} already exists.`);
}

if (run('git', ['ls-remote', '--tags', 'origin', releaseTag], { allowFailure: true }).stdout.trim()) {
  fail(`Remote tag ${releaseTag} already exists.`);
}

run('gh', ['auth', 'status'], { allowFailure: false });
run('npm', ['whoami'], { allowFailure: false });

updatePackageVersion(tokensDir, version);
updatePackageVersion(primitivesDir, version);

run('pnpm', ['test'], { allowFailure: false });
run('pnpm', ['typecheck'], { allowFailure: false });
run('pnpm', ['build'], { allowFailure: false });

run('pnpm', ['--filter', '@tiny-playworks/tokens', 'pack', '--pack-destination', releaseAssetsDir], { allowFailure: false });
run('pnpm', ['--filter', '@tiny-playworks/game-ui', 'pack', '--pack-destination', releaseAssetsDir], { allowFailure: false });

run('git', ['add', 'packages/tokens/package.json', 'packages/primitives/package.json'], { allowFailure: false });
run('git', ['commit', '-m', releaseCommitMessage], { allowFailure: false });

run('pnpm', ['--filter', '@tiny-playworks/tokens', 'publish', '--access', 'public', '--no-git-checks'], {
  allowFailure: false,
});
run('pnpm', ['--filter', '@tiny-playworks/game-ui', 'publish', '--access', 'public', '--no-git-checks'], {
  allowFailure: false,
});

run('git', ['tag', releaseTag], { allowFailure: false });

for (const tag of packageTags) {
  run('git', ['tag', tag], { allowFailure: false });
}

run('git', ['push', 'origin', 'main'], { allowFailure: false });
run('git', ['push', 'origin', releaseTag, ...packageTags], { allowFailure: false });

const releaseNotes = [
  'Published packages:',
  `- @tiny-playworks/tokens@${version}`,
  `- @tiny-playworks/game-ui@${version}`,
  '',
  'npm publish completed before this release was created.',
].join('\n');

const assets = findTarballs(releaseAssetsDir).map((filePath) => `${filePath}#${basename(filePath)}`);
run(
  'gh',
  [
    'release',
    'create',
    releaseTag,
    '--title',
    releaseTag,
    '--generate-notes',
    '--notes',
    releaseNotes,
    '--verify-tag',
    ...assets,
  ],
  { allowFailure: false },
);

rmSync(releaseTempDir, { force: true, recursive: true });

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
