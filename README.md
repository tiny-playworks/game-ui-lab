# Tiny Playworks Game UI Lab

[![CI](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml)

[中文说明](./README.zh-CN.md)

Modern Game UI primitives for web games, AI interactive content, and HUD-heavy indie experiences.

This is not another React business UI library. The project focuses on motion-first feedback primitives: combat numbers, loot pulses, combo states, rarity frames, and lightweight HUD feedback.

![Game UI Feedback Lab](./assets/lab-sandbox.png)

## Packages (0.5.0)

| Package | Description |
| --- | --- |
| `@tiny-playworks/game-ui` | React primitives, `GameUiProvider`, `GameUiLayerHost` |
| `@tiny-playworks/game-ui-runtime` | Headless event runtime (no React) |
| `@tiny-playworks/tokens` | Design tokens, themes, Panda preset |
| `@tiny-playworks/game-ui-pixi` | Pixi.js feedback bridge (0.1.0 alpha) |

See [CHANGELOG.md](./CHANGELOG.md) for release notes.

## What This Project Is

- A React + TypeScript primitive kit for game-like web UI (35 public primitives).
- A Panda CSS driven UI layer built on design tokens, recipes, and static CSS output.
- A headless runtime for combat feedback, HUD, narrative, and modal flows.
- Rspress docs with per-component demos, API tables, tokens, Lab, and Encounter Demo.

## Current Primitives (by area)

**Combat HUD:** `AbilityBar`, `AbilityTooltip`, `CastBar`, `CooldownSlot`, `TargetFrame`, `HealthBar`, `ResourceMeter`, `ComboCounter`, `BuffBar`, `StatusBadge`

**Map / world:** `MiniMap`, `MapMarker`, `CompassBar`, `LocationTag`

**Narrative / quest:** `DialogueBox`, `ChoicePrompt`, `QuestTracker`, `QuestLog`, `ObjectiveChip`

**Feedback / loot:** `DamageNumber`, `FloatingToast`, `NotificationStack`, `LootCard`, `LootStack`, `RewardReveal`, `RarityBorder`

**Inventory / party / economy:** `InventoryGrid`, `CurrencyBar`, `PartyFrame`, `ShopPanel`

**System screens:** `PauseMenu`, `GameTimer`, `LoadingOverlay`, `DeathScreen`, `ChatFeed`

**Infrastructure:** `GameUiProvider`, `GameUiRuntimeProvider`, `GameUiLayerHost`, hooks `useGameUiRuntime` / `useGameUiLayer`

Full list with demos: [Component docs](https://tiny-playworks.github.io/game-ui-lab/primitives/) (local: `pnpm dev` → `/primitives`).

## Public API

```tsx
import {
  AbilityBar,
  BuffBar,
  GameUiLayerHost,
  GameUiProvider,
  GameUiRuntimeProvider,
  InventoryGrid,
  PartyFrame,
  QuestLog,
  QuestTracker,
  useGameUiRuntime,
  // ...see packages/primitives/src/index.ts
} from '@tiny-playworks/game-ui';

import '@tiny-playworks/game-ui/styles.css';
```

Do not import from `packages/primitives/src/*`. The JS entry does not inject CSS.

### Headless runtime

```ts
import { createGameUiRuntime } from '@tiny-playworks/game-ui-runtime';

const runtime = createGameUiRuntime();
runtime.emitDamage({ value: 128, variant: 'critical', anchor: { x: 50, y: 34 } });
runtime.setCombo(4, 'Combo');
runtime.trackQuest({ title: 'Beacon', objectives: [{ id: 'a', label: 'Find beacon' }] });
runtime.setParty({ members: [{ id: 'pilot', name: 'Pilot', health: 80, maxHealth: 100 }] });
runtime.enqueueDialogue({ speaker: 'Guide', text: 'Hold the line.' });
runtime.openQuestLog({ title: 'Log', quests: [{ id: 'q1', title: 'Hunt', objectives: [] }] });
```

Wire React with `GameUiRuntimeProvider` + `GameUiLayerHost`. Event reference: docs site `/runtime/runtime-api`.

### Pixi (alpha)

```ts
import { createPixiFeedbackBridge } from '@tiny-playworks/game-ui-pixi';
```

## Commands

Node 24 + pnpm 11:

```bash
nvm use 24.15.0
pnpm install
pnpm dev          # docs + lab
pnpm test
pnpm typecheck
pnpm build
pnpm build:pages  # GitHub Pages
```

Site routes:

- `/guide/getting-started` — install, packages, runtime quick start
- `/primitives` — 35 component pages (demo + API + tokens)
- `/runtime/encounter-demo` — full runtime vertical slice
- `/runtime/runtime-api` — layers and events
- `/integrations/pixi` — canvas bridge
- `/lab` — combined HUD sandbox

## Release

```bash
pnpm release 0.5.0
```

Updates `tokens`, `runtime`, and `game-ui` versions, runs checks, and packs tarballs under `.release/v0.5.0/`. Publish `game-ui-pixi` separately when ready.

## Roadmap

**Done in 0.4–0.5:** core + system primitives, runtime HUD/narrative/modal, party + dialogue queue, inventory drag, Pixi alpha bridge.

**Next candidates:** `ActionBar` / hotbar polish, `CharacterSheet`, `SkillTree`, Figma token sync, `styles.ts` split.

## License

MIT
