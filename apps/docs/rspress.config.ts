import { defineConfig } from '@rspress/core';

export default defineConfig({
  root: 'docs',
  base: '/game-ui-lab/',
  title: 'Tiny Playworks Game UI',
  description: 'Motion-first React primitives for game-like web interfaces.',
  themeConfig: {
    nav: [
      { text: '指南 / Guide', link: '/guide/getting-started' },
      { text: '原语 / Primitives', link: '/primitives/' },
      { text: '令牌 / Tokens', link: '/tokens/' },
      { text: '实验台 / Lab', link: '/lab/' },
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
