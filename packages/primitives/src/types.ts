import type { ReactNode } from 'react';

export type GameUiMotionMode = 'live' | 'static' | 'none';

export interface GameUiCollectionItemState {
  index: number;
  selected: boolean;
  disabled: boolean;
}

export type GameUiCollectionRenderer<TItem> = (
  item: TItem,
  state: GameUiCollectionItemState,
  defaultNode: ReactNode,
) => ReactNode;
