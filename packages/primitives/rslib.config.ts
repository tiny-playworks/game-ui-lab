import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2022',
      bundle: true,
      autoExternal: false,
      dts: true,
    },
    {
      format: 'cjs',
      syntax: 'es2022',
      bundle: true,
      autoExternal: false,
    },
  ],
  source: {
    entry: {
      index: './src/index.ts',
    },
  },
  output: {
    externals: ['react', 'react-dom', 'react/jsx-runtime', 'motion/react', '@tiny-playworks/tokens', '@tiny-playworks/game-ui-runtime'],
  },
});
