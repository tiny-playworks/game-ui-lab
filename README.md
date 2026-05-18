# Tiny Playworks Game UI Lab

[![CI](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml)

Modern Game UI primitives for web games, AI interactive content, and HUD-heavy indie experiences.

This is not another React business UI library. The project focuses on motion-first feedback primitives: combat numbers, loot pulses, combo states, rarity frames, and lightweight HUD feedback.

![Game UI Feedback Sandbox](./assets/gallery-sandbox.png)

## What This Project Is

- A React + TypeScript primitive kit for game-like web UI.
- A token-driven UI layer built on CSS variables.
- A public gallery/lab surface for testing feedback behavior in motion.
- A foundation for future Pixi.js overlay experiments.

## What This Project Is Not

- Not an enterprise admin component library.
- Not a replacement for Ant Design, shadcn/ui, or Radix.
- Not a Table/Form/Modal business component set.
- Not a game engine.
- Not a Figma plugin project in Phase 1.

## Current Primitives

- `DamageNumber`: floating combat text for damage, heal, critical, and miss states.
- `FloatingToast`: short-lived game feedback messages for info, success, warning, and loot events.
- `ComboCounter`: compact HUD counter for combo chains.
- `HealthBar`: persistent HP and shield readout for player, boss, and encounter HUD states.
- `ResourceMeter`: compact mana, energy, and stamina meter for ability costs and movement state.
- `CooldownSlot`: ability slot with cooldown mask, ready state, disabled state, and compact label.
- `StatusBadge`: small persistent status marker for buffs, debuffs, warnings, stacks, and durations.
- `LootCard`: compact loot item surface for rarity, quantity, value, and item metadata.
- `LootStack`: capped post-wave drop list with overflow handling.
- `RewardReveal`: sealed, revealed, and claimed reward panel for loot flow moments.
- `RarityBorder`: token-driven rarity frame for common, rare, epic, and legendary states.
- `GameUiProvider`: theme root for Game UI primitives.

## Public API

Use the main package entry for components and props types:

```tsx
import {
  ComboCounter,
  CooldownSlot,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  HealthBar,
  LootCard,
  LootStack,
  RarityBorder,
  ResourceMeter,
  RewardReveal,
  StatusBadge,
  type ComboCounterProps,
  type CooldownSlotProps,
  type DamageNumberProps,
  type FloatingToastProps,
  type RarityBorderProps,
  type HealthBarProps,
  type LootCardProps,
  type LootStackProps,
  type ResourceMeterProps,
  type RewardRevealProps,
  type StatusBadgeProps,
} from '@tiny-playworks/game-ui';

import '@tiny-playworks/game-ui/styles.css';
```

Do not import from internal package paths such as `packages/primitives/src/*`.
The `@tiny-playworks/game-ui` entry already brings in its styles, so consumers do not need a separate CSS import.

## Commands

Use Node 24 and pnpm 11:

```bash
source ~/.nvm/nvm.sh
nvm use 24.15.0
pnpm install
```

Run the Rspress docs site:

```bash
pnpm dev
```

Run the live gallery/lab directly:

```bash
pnpm dev:lab
```

Public site routes:

- `/` - Rspress docs home
- `/guide/getting-started` - installation and usage
- `/primitives` - Primitive overview
- `/tokens` - Token overview
- `/lab` - live feedback gallery

Build all packages and the gallery:

```bash
pnpm build
```

Build the GitHub Pages bundle:

```bash
pnpm build:pages
```

Run tests:

```bash
pnpm test
```

Run type checks:

```bash
pnpm typecheck
```

## Phase 2 Scope

Phase 2 makes the project publicly consumable:

- pnpm monorepo
- `packages/tokens`
- `packages/primitives`
- `apps/gallery`
- `apps/docs`
- CSS variable token foundation
- Rspress docs as the public Pages entry
- gallery mounted under `/lab`
- public API boundary from `@tiny-playworks/game-ui`
- npm-ready `@tiny-playworks/tokens` and `@tiny-playworks/game-ui`
- basic render and token tests

Deferred:

- Pixi.js overlay package
- Figma plugin or sync automation
- business components

## Token foundation

Current tokens are a CSS variables foundation exported from `@tiny-playworks/tokens`.

- The gallery treats them as project assets through structured metadata.
- This is not a full Figma sync pipeline in the current phase.
- Rspress carries the public docs role while the gallery remains the live lab.

## Public site structure

The static site target is the GitHub Pages project URL:

- `https://tiny-playworks.github.io/game-ui-lab/`

Recommended structure:

- `/` - Docs entry / installation path
- `/tokens` - Token foundation overview
- `/primitives` - Primitive overview
- `/lab` - live feedback lab

The Pages build keeps clean URLs through a `404.html` fallback and uses `/game-ui-lab/` as the production base path.

## License

MIT
