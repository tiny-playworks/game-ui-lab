# Getting Started

Install the public packages:

```bash
pnpm add @tiny-playworks/game-ui @tiny-playworks/tokens
```

Import the components from the package entry and load the shared CSS once:

```tsx
import { DamageNumber, GameUiProvider } from '@tiny-playworks/game-ui';
import '@tiny-playworks/game-ui/styles.css';

export function CombatPulse() {
  return (
    <GameUiProvider>
      <DamageNumber value="512" variant="critical" prefix="CRIT" />
    </GameUiProvider>
  );
}
```

Do not import from internal paths such as `packages/primitives/src/*`. The stable public API is `@tiny-playworks/game-ui`.

## Requirements

- React 18.2 or newer.
- React DOM 18.2 or newer.
- A bundler that supports CSS imports.
