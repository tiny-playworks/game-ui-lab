# Tiny Playworks Game UI Lab

[![CI](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml)

Modern Game UI primitives for web games, AI interactive content, and HUD-heavy indie experiences.

This is not another React business UI library. The project focuses on motion-first feedback primitives: combat numbers, loot pulses, combo states, rarity frames, and lightweight HUD feedback.

![Game UI Feedback Sandbox](./assets/gallery-sandbox.png)

## What This Project Is

- A React + TypeScript primitive kit for game-like web UI.
- A token-driven UI layer built on CSS variables.
- A gallery playground/docs surface for testing feedback behavior in motion.
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
- `RarityBorder`: token-driven rarity frame for common, rare, epic, and legendary states.
- `GameUiProvider`: theme root for Game UI primitives.

## Public API

Use the main package entry for components and props types:

```tsx
import {
  ComboCounter,
  DamageNumber,
  FloatingToast,
  GameUiProvider,
  RarityBorder,
  type ComboCounterProps,
  type DamageNumberProps,
  type FloatingToastProps,
  type RarityBorderProps,
} from '@tiny-playworks/game-ui';

import '@tiny-playworks/game-ui/styles.css';
```

Do not import from internal package paths such as `packages/primitives/src/*`.

## Commands

Use Node 24 and pnpm 11:

```bash
source ~/.nvm/nvm.sh
nvm use 24.15.0
pnpm install
```

Run the gallery:

```bash
pnpm dev
```

Gallery routes:

- `/` - Feedback Sandbox
- `/tokens` - Token Overview
- `/primitives` - Primitives Overview

Build all packages and the gallery:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run type checks:

```bash
pnpm typecheck
```

## Phase 1 Scope

Phase 1 is the minimum loop:

- pnpm monorepo
- `packages/tokens`
- `packages/primitives`
- `apps/gallery`
- CSS variable token foundation
- lightweight gallery routes for feedback, tokens, and primitives
- public API boundary from `@tiny-playworks/game-ui`
- feedback sandbox gallery
- basic render and token tests

Deferred:

- Pixi.js overlay package
- Rspress documentation site
- Figma plugin or sync automation
- business components
- npm publishing

## Token foundation

Current tokens are a CSS variables foundation exported from `@tiny-playworks/tokens`.

- The gallery treats them as project assets through structured metadata.
- This is not a full Figma sync pipeline in the current phase.
- Rspress remains deferred while the gallery carries the early playground/docs role.

## License

MIT
