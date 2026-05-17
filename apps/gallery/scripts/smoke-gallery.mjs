import { existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.GALLERY_SMOKE_PORT ?? 4310);
const host = '127.0.0.1';
const baseUrl = `http://${host}:${port}`;
const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

process.chdir(packageDir);

const artifactDir = resolve('smoke-artifacts');
const chromePath = process.env.CHROME_BIN ?? findChrome();

const routes = [
  { path: '/', name: 'home', keyText: 'A moving Game UI Lab' },
  { path: '/tokens', name: 'tokens', keyText: 'Token Overview' },
  { path: '/primitives', name: 'primitives', keyText: 'Primitives Overview' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000, mobile: false },
  { name: 'mobile', width: 390, height: 900, mobile: true },
];

if (!chromePath) {
  throw new Error('Chrome was not found. Set CHROME_BIN to a Chrome executable to run gallery visual smoke.');
}

rmSync(artifactDir, { force: true, recursive: true });
mkdirSync(artifactDir, { recursive: true });

const preview = spawn(`pnpm exec rsbuild preview --host ${host} --port ${port}`, {
  shell: process.platform === 'win32',
  stdio: ['ignore', 'pipe', 'pipe'],
});

let previewOutput = '';
preview.stdout.on('data', (chunk) => {
  previewOutput += chunk.toString();
});
preview.stderr.on('data', (chunk) => {
  previewOutput += chunk.toString();
});

try {
  await waitForPreview();

  for (const route of routes) {
    for (const viewport of viewports) {
      const url = `${baseUrl}${route.path}`;
      const slug = `${route.name}-${viewport.name}`;
      const userDataDir = join(artifactDir, `.chrome-${slug}`);
      const screenshotPath = join(artifactDir, `${slug}.png`);
      const response = await fetch(url, { headers: { accept: 'text/html' } });
      if (!response.ok) {
        throw new Error(`Route ${route.path} returned HTTP ${response.status}`);
      }

      await captureRoute({ route, screenshotPath, userDataDir, url, viewport });

      const screenshotSize = statSync(screenshotPath).size;
      if (screenshotSize < 80_000) {
        throw new Error(`Screenshot looks too small for ${route.path} ${viewport.name}: ${screenshotSize} bytes`);
      }
    }
  }

  console.log(`Gallery smoke passed. Screenshots: ${artifactDir}`);
} finally {
  stopPreview();
}

async function waitForPreview() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await delay(500);
    }
  }

  throw new Error(`Gallery preview did not start on ${baseUrl}.\n${previewOutput}`);
}

function stopPreview() {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(preview.pid), '/T', '/F'], {
      stdio: 'ignore',
    });
    return;
  }

  preview.kill();
}

async function captureRoute({ route, screenshotPath, userDataDir, url, viewport }) {
  const debuggingPort = 9_330 + routes.indexOf(route) * 10 + viewports.indexOf(viewport);
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${debuggingPort}`,
    `--user-data-dir=${userDataDir}`,
    `--window-size=${viewport.width},${viewport.height}`,
    'about:blank',
  ], {
    stdio: 'ignore',
  });

  try {
    const webSocketDebuggerUrl = await waitForDebugger(debuggingPort);
    const cdp = await createCdpClient(webSocketDebuggerUrl);

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile,
    });

    const loadPromise = cdp.waitFor('Page.loadEventFired');
    await cdp.send('Page.navigate', { url });
    await loadPromise;
    await waitForText(cdp, route.keyText);

    const screenshot = await cdp.send('Page.captureScreenshot', {
      captureBeyondViewport: false,
      format: 'png',
    });

    writeFileSync(screenshotPath, Buffer.from(screenshot.data, 'base64'));
    cdp.close();
  } finally {
    stopProcessTree(chrome.pid);
  }
}

async function waitForDebugger(port) {
  const endpoint = `http://127.0.0.1:${port}/json/list`;
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const targets = await response.json();
        const pageTarget = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
        if (pageTarget) {
          return pageTarget.webSocketDebuggerUrl;
        }
      }
    } catch {
      await delay(200);
    }
  }

  throw new Error(`Chrome debugging endpoint did not start on port ${port}`);
}

async function waitForText(cdp, text) {
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    const result = await cdp.send('Runtime.evaluate', {
      expression: 'document.body.innerText',
      returnByValue: true,
    });

    if (String(result.result?.value ?? '').includes(text)) {
      return;
    }

    await delay(200);
  }

  throw new Error(`Timed out waiting for rendered text: ${text}`);
}

function createCdpClient(url) {
  return new Promise((resolveClient, rejectClient) => {
    const socket = new WebSocket(url);
    let id = 0;
    const pending = new Map();
    const eventWaiters = new Map();

    socket.addEventListener('open', () => {
      resolveClient({
        close: () => socket.close(),
        send(method, params = {}) {
          const messageId = ++id;
          socket.send(JSON.stringify({ id: messageId, method, params }));

          return new Promise((resolve, reject) => {
            pending.set(messageId, { reject, resolve });
          });
        },
        waitFor(method) {
          return new Promise((resolve) => {
            const waiters = eventWaiters.get(method) ?? [];
            waiters.push(resolve);
            eventWaiters.set(method, waiters);
          });
        },
      });
    });

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.id && pending.has(message.id)) {
        const waiter = pending.get(message.id);
        pending.delete(message.id);

        if (message.error) {
          waiter.reject(new Error(message.error.message));
        } else {
          waiter.resolve(message.result ?? {});
        }

        return;
      }

      if (message.method && eventWaiters.has(message.method)) {
        const waiters = eventWaiters.get(message.method) ?? [];
        eventWaiters.delete(message.method);
        for (const waiter of waiters) {
          waiter(message.params ?? {});
        }
      }
    });

    socket.addEventListener('error', () => {
      rejectClient(new Error('Chrome DevTools WebSocket failed'));
    });
  });
}

function stopProcessTree(pid) {
  if (!pid) {
    return;
  }

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], {
      stdio: 'ignore',
    });
    return;
  }

  try {
    process.kill(pid);
  } catch {
    // Process already exited.
  }
}

function findChrome() {
  const candidates =
    process.platform === 'win32'
      ? [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          join(process.env.LOCALAPPDATA ?? '', 'Google\\Chrome\\Application\\chrome.exe'),
        ]
      : process.platform === 'darwin'
        ? ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']
        : ['/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser'];

  return candidates.find((candidate) => candidate && existsSync(candidate));
}
