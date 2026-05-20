import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.DOCS_SMOKE_PORT ?? 4320);
const host = '127.0.0.1';
const baseUrl = `http://${host}:${port}`;
const docsDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = resolve(docsDir, 'doc_build');
const artifactDir = resolve(docsDir, 'smoke-artifacts');
const chromePath = process.env.CHROME_BIN ?? findChrome();
const publicBase = '/game-ui-lab/';

const routes = [
  { path: '/game-ui-lab/', name: 'docs-home', keyText: '游戏 UI 组件库' },
  { path: '/game-ui-lab/primitives/', name: 'primitives-overview', keyText: '组件总览' },
  { path: '/game-ui-lab/primitives/ability-bar', name: 'primitive-ability-bar', keyText: 'AbilityBar' },
  { path: '/game-ui-lab/primitives/mini-map', name: 'primitive-mini-map', keyText: 'MiniMap' },
  { path: '/game-ui-lab/primitives/dialogue-box', name: 'primitive-dialogue-box', keyText: 'DialogueBox' },
  { path: '/game-ui-lab/primitives/damage-number', name: 'primitive-damage-number', keyText: 'DamageNumber' },
  { path: '/game-ui-lab/primitives/quest-tracker', name: 'primitive-quest-tracker', keyText: 'QuestTracker' },
  { path: '/game-ui-lab/primitives/loot-card', name: 'primitive-loot-card', keyText: 'LootCard' },
  { path: '/game-ui-lab/primitives/buff-bar', name: 'primitive-buff-bar', keyText: 'BuffBar' },
  { path: '/game-ui-lab/primitives/inventory-grid', name: 'primitive-inventory-grid', keyText: 'InventoryGrid' },
  { path: '/game-ui-lab/primitives/shop-panel', name: 'primitive-shop-panel', keyText: 'ShopPanel' },
  { path: '/game-ui-lab/runtime/runtime-api', name: 'runtime-api', keyText: 'Runtime API' },
  { path: '/game-ui-lab/integrations/pixi', name: 'integration-pixi', keyText: 'Pixi.js 反馈桥接' },
  { path: '/game-ui-lab/runtime/encounter-demo', name: 'runtime-encounter-demo', keyText: 'Encounter Demo' },
  { path: '/game-ui-lab/lab/', name: 'lab-home', keyText: '同一个设计系统里的实验舞台' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000, mobile: false, minScreenshotBytes: 25_000 },
  { name: 'mobile', width: 390, height: 900, mobile: true, minScreenshotBytes: 18_000 },
];

if (!chromePath) {
  throw new Error('Chrome was not found. Set CHROME_BIN to a Chrome executable to run docs visual smoke.');
}

if (!existsSync(buildDir)) {
  throw new Error(`Docs build output was not found at ${buildDir}. Run pnpm build:pages first.`);
}

rmSync(artifactDir, { force: true, recursive: true });
mkdirSync(artifactDir, { recursive: true });

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', baseUrl);
  const filePath = resolveFilePath(url.pathname);

  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'content-type': contentType(filePath) });
  response.end(readFileSync(filePath));
});

await new Promise((resolveListen) => {
  server.listen(port, host, resolveListen);
});

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const url = `${baseUrl}${route.path}`;
      const response = await fetch(url, { headers: { accept: 'text/html' } });
      if (!response.ok) {
        throw new Error(`Route ${route.path} returned HTTP ${response.status}`);
      }

      const slug = `${route.name}-${viewport.name}`;
      const screenshotPath = join(artifactDir, `${slug}.png`);
      await captureRoute({
        route,
        screenshotPath,
        url,
        userDataDir: join(artifactDir, `.chrome-${slug}`),
        viewport,
      });

      const screenshotSize = statSync(screenshotPath).size;
      if (screenshotSize < viewport.minScreenshotBytes) {
        throw new Error(`Screenshot looks too small for ${route.path} ${viewport.name}: ${screenshotSize} bytes`);
      }
    }
  }

  console.log(`Docs smoke passed. Screenshots: ${artifactDir}`);
} finally {
  await new Promise((resolveClose) => {
    server.close(resolveClose);
  });
}

function resolveFilePath(pathname) {
  const strippedPath = pathname.startsWith(publicBase)
    ? pathname.slice(publicBase.length)
    : pathname.replace(/^\/+/, '');
  const safePath = normalize(strippedPath).replace(/^(\.\.(\/|\\|$))+/, '');
  const candidates = [];

  if (!safePath || safePath.endsWith('/')) {
    candidates.push(resolve(buildDir, safePath, 'index.html'));
  } else if (extname(safePath)) {
    candidates.push(resolve(buildDir, safePath));
  } else {
    candidates.push(resolve(buildDir, safePath, 'index.html'));
    candidates.push(resolve(buildDir, `${safePath}.html`));
  }

  return candidates.find((candidate) => candidate.startsWith(buildDir) && existsSync(candidate));
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.png')) return 'image/png';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

async function captureRoute({ route, screenshotPath, userDataDir, url, viewport }) {
  const debuggingPort = 9_430 + routes.indexOf(route) * 10 + viewports.indexOf(viewport);
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

async function waitForDebugger(portNumber) {
  const endpoint = `http://127.0.0.1:${portNumber}/json/list`;
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

  throw new Error(`Chrome debugging endpoint did not start on port ${portNumber}`);
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
        message.error ? waiter.reject(new Error(message.error.message)) : waiter.resolve(message.result ?? {});
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
    spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { stdio: 'ignore' });
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
