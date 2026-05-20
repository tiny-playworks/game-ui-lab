# Changelog

## 0.4.0

- Added 10 primitives: `BuffBar`, `InventoryGrid`, `CurrencyBar`, `PartyFrame`, `PauseMenu`, `GameTimer`, `LoadingOverlay`, `DeathScreen`, `ShopPanel`, `ChatFeed`.
- Extended headless runtime with HUD fields (combo, quest, map, buffs), `narrative` layer, and `modal.shop`.
- Wired `GameUiLayerHost` for HUD, narrative, shop, and reward flows.
- Added `/runtime/runtime-api` docs and expanded Encounter Demo.

## 0.5.0

- Runtime: `hud.party`, narrative `dialogueQueue` (`enqueue` / `advance`), `modal.questLog`.
- `GameUiLayerHost` renders `PartyFrame`, quest log modal, and dialogue continue control.
- `InventoryGrid`: `onSlotMove`, `draggingId`, HTML5 drag-and-drop between slots.
- Encounter Demo: full runtime slice (quest, map, dialogue queue, shop, choices).
- New package `@tiny-playworks/game-ui-pixi` (0.1.0 alpha) and `/integrations/pixi` docs.
- Docs: expanded Getting Started, Runtime API reference, README 0.5.0, component API tables updated.
