import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const distDir = join(currentDir, '..', 'dist');
const basePathInput = process.env.PUBLIC_BASE_PATH ?? '/game-ui-lab/';
const normalizedBasePath = `/${basePathInput.replace(/^\/+|\/+$/g, '')}/`;

const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tiny Playworks Game UI Lab</title>
    <script>
      (function() {
        var basePath = ${JSON.stringify(normalizedBasePath)};
        var current = window.location;
        var requestedPath = current.pathname.indexOf(basePath) === 0
          ? current.pathname.slice(basePath.length - 1)
          : current.pathname;
        var target = new URL(basePath, current.origin);
        target.searchParams.set('p', requestedPath || '/');

        if (current.search) {
          target.searchParams.set('q', current.search.slice(1));
        }

        if (current.hash) {
          target.searchParams.set('h', current.hash.slice(1));
        }

        window.location.replace(target.toString());
      })();
    </script>
  </head>
  <body></body>
</html>
`;

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, '404.html'), fallbackHtml, 'utf8');
writeFileSync(join(distDir, '.nojekyll'), '', 'utf8');

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

if (!indexHtml.includes('Tiny Playworks Game UI Lab')) {
  throw new Error('Expected gallery index.html to exist before writing fallback files.');
}
