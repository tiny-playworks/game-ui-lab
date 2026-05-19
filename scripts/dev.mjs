import { spawn, spawnSync } from 'node:child_process';
import { createServer } from 'node:net';

for (const args of [
  ['--filter', '@tiny-playworks/tokens', 'build'],
  ['--filter', '@tiny-playworks/game-ui', 'build'],
]) {
  const bootstrap = spawnSync('pnpm', args, {
    env: process.env,
    shell: process.platform === 'win32',
    stdio: 'inherit',
  });

if (bootstrap.status !== 0) {
    process.exit(bootstrap.status ?? 1);
  }
}

try {
  await assertPortAvailable(4300);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const commands = [
  {
    name: 'docs',
    args: ['--filter', '@tiny-playworks/game-ui-docs', 'dev'],
    cwd: process.cwd(),
  },
  {
    name: 'gallery',
    args: ['exec', 'rsbuild', 'dev'],
    cwd: new URL('../apps/gallery/', import.meta.url),
  },
];

const children = commands.map(({ name, args, cwd }) => {
  const child = spawn('pnpm', args, {
    cwd,
    env: process.env,
    shell: process.platform === 'win32',
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (chunk) => {
    process.stdout.write(prefixOutput(name, chunk));
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(prefixOutput(name, chunk));
  });

  child.on('exit', (code, signal) => {
    if (stopping) {
      return;
    }

    stopAll();
    process.exitCode = code ?? (signal ? 1 : 0);
  });

  return child;
});

let stopping = false;

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);

function stopAll() {
  stopping = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
}

function prefixOutput(name, chunk) {
  return chunk
    .toString()
    .split(/\n/)
    .map((line, index, lines) => (line || index < lines.length - 1 ? `[${name}] ${line}` : line))
    .join('\n');
}

function assertPortAvailable(port) {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.once('error', () => {
      reject(new Error(`Gallery dev port ${port} is already in use. Stop the old dev server first.`));
    });

    server.once('listening', () => {
      server.close(resolve);
    });

    server.listen(port, '127.0.0.1');
  });
}
