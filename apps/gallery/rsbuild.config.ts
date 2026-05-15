import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const basePath = process.env.PUBLIC_BASE_PATH ?? '/';
const normalizedBasePath = basePath === '/' ? '/' : `/${basePath.replace(/^\/+|\/+$/g, '')}/`;

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      __LAB_BASE_PATH__: JSON.stringify(normalizedBasePath),
    },
    entry: {
      index: './src/main.tsx',
    },
  },
  output: {
    assetPrefix: normalizedBasePath,
  },
  html: {
    title: 'Tiny Playworks Game UI Lab',
  },
  server: {
    port: 4300,
  },
});
