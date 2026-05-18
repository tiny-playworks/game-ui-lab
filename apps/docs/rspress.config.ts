import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: 'docs',
  base: '/game-ui-lab/',
  title: 'Tiny Playworks Game UI',
  description: 'Motion-first React primitives for game-like web interfaces.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Primitives', link: '/primitives/' },
      { text: 'Tokens', link: '/tokens/' },
      { text: 'Lab', link: '/lab/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
        },
      ],
      '/primitives/': [
        {
          text: 'Primitives',
          items: [{ text: 'Overview', link: '/primitives/' }],
        },
      ],
      '/tokens/': [
        {
          text: 'Tokens',
          items: [{ text: 'Overview', link: '/tokens/' }],
        },
      ],
    },
  },
});
