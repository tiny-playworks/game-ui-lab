import { defineConfig } from '@rspress/core';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export default defineConfig({
  root: 'docs',
  base: '/game-ui-lab/',
  title: 'Tiny Playworks Game UI',
  description: 'Motion-first React primitives for game-like web interfaces.',
  builderConfig: {
    resolve: {
      alias: {
        '@tiny-playworks/game-ui': resolve(repoRoot, 'packages/primitives/src/index.ts'),
        '@tiny-playworks/game-ui/styles.css': resolve(repoRoot, 'packages/primitives/dist/styles.css'),
        '@tiny-playworks/tokens': resolve(repoRoot, 'packages/tokens/src/index.ts'),
        '@tiny-playworks/tokens/css': resolve(repoRoot, 'packages/tokens/dist/index.css'),
      },
    },
  },
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
          items: [
            { text: 'Overview', link: '/primitives/' },
            { text: 'Live Lab', link: '/lab/' },
            { text: 'AbilityBar', link: '/primitives/ability-bar' },
            { text: 'AbilityTooltip', link: '/primitives/ability-tooltip' },
            { text: 'CastBar', link: '/primitives/cast-bar' },
            { text: 'TargetFrame', link: '/primitives/target-frame' },
            { text: 'MiniMap', link: '/primitives/mini-map' },
            { text: 'MapMarker', link: '/primitives/map-marker' },
            { text: 'CompassBar', link: '/primitives/compass-bar' },
            { text: 'LocationTag', link: '/primitives/location-tag' },
            { text: 'DialogueBox', link: '/primitives/dialogue-box' },
            { text: 'ChoicePrompt', link: '/primitives/choice-prompt' },
            { text: 'QuestLog', link: '/primitives/quest-log' },
            { text: 'NotificationStack', link: '/primitives/notification-stack' },
            { text: 'DamageNumber', link: '/primitives/damage-number' },
            { text: 'HealthBar', link: '/primitives/health-bar' },
            { text: 'ResourceMeter', link: '/primitives/resource-meter' },
            { text: 'ComboCounter', link: '/primitives/combo-counter' },
            { text: 'CooldownSlot', link: '/primitives/cooldown-slot' },
            { text: 'StatusBadge', link: '/primitives/status-badge' },
            { text: 'ObjectiveChip', link: '/primitives/objective-chip' },
            { text: 'QuestTracker', link: '/primitives/quest-tracker' },
            { text: 'FloatingToast', link: '/primitives/floating-toast' },
            { text: 'RarityBorder', link: '/primitives/rarity-border' },
            { text: 'LootCard', link: '/primitives/loot-card' },
            { text: 'LootStack', link: '/primitives/loot-stack' },
            { text: 'RewardReveal', link: '/primitives/reward-reveal' },
          ],
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
