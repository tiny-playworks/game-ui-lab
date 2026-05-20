# Tiny Playworks Game UI Lab

[![CI](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/tiny-playworks/game-ui-lab/actions/workflows/ci.yml)

[English README](./README.md)

面向网页游戏、AI 互动内容与 HUD 重度独立游戏的现代 Game UI 组件库。

## 包（0.5.0）

| 包 | 说明 |
| --- | --- |
| `@tiny-playworks/game-ui` | React 组件、`GameUiProvider`、`GameUiLayerHost` |
| `@tiny-playworks/game-ui-runtime` | 无 React 的 headless 事件运行时 |
| `@tiny-playworks/tokens` | 设计令牌、主题、Panda preset |
| `@tiny-playworks/game-ui-pixi` | Pixi.js 反馈桥接（0.1.0 alpha） |

详见 [CHANGELOG.md](./CHANGELOG.md)。

## 文档站

本地：`pnpm dev` 后打开文档站，右上角可切换 **中/英**。

- 35 个组件页：live 演示、示例代码、**与源码对齐的双语 Props API 表**
- Runtime API、Encounter Demo、Pixi 集成、Lab 实验台

## 快速开始

```bash
pnpm add @tiny-playworks/game-ui @tiny-playworks/game-ui-runtime
```

```tsx
import { GameUiProvider, GameUiLayerHost, GameUiRuntimeProvider } from '@tiny-playworks/game-ui';
import { createGameUiRuntime } from '@tiny-playworks/game-ui-runtime';
import '@tiny-playworks/game-ui/styles.css';

const runtime = createGameUiRuntime();

export function App() {
  return (
    <GameUiProvider>
      <GameUiRuntimeProvider runtime={runtime}>
        <GameUiLayerHost />
      </GameUiRuntimeProvider>
    </GameUiProvider>
  );
}
```

## 集合类 API 提示

以下组件支持 `GameUiCollectionRenderer` 自定义子项渲染，以及 `overflowLabel`（溢出计数）等：

- `LootStack` — `renderItem`、`onItemSelect`
- `NotificationStack` — `renderNotification`
- `AbilityBar` — `renderAbility`
- `BuffBar` — `renderBuff`
- `MiniMap` — `renderMarker`、`onMarkerSelect`
- `InventoryGrid` — `renderSlot`、`onSlotMove`
- `PartyFrame` — `renderMember`
- `QuestLog` — `renderQuest`

完整字段以文档站 API 表为准（已与 `packages/primitives` 源码逐项核对）。
