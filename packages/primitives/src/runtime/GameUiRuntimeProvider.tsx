import React, { createContext, useContext, useMemo, useState, useSyncExternalStore } from 'react';
import type { ReactNode } from 'react';
import {
  createGameUiRuntime,
  type GameUiLayerName,
  type GameUiRuntime,
  type GameUiRuntimeOptions,
  type GameUiRuntimeState,
} from '@tiny-playworks/game-ui-runtime';

const GameUiRuntimeContext = createContext<GameUiRuntime | null>(null);

export interface GameUiRuntimeProviderProps extends GameUiRuntimeOptions {
  children: ReactNode;
  runtime?: GameUiRuntime;
}

export function GameUiRuntimeProvider({
  children,
  runtime,
  ...options
}: GameUiRuntimeProviderProps) {
  const stableOptions = useMemo(() => options, [
    options.damageLimit,
    options.toastLimit,
    options.now,
    options.createId,
  ]);
  const [createdRuntime] = useState(() => runtime ?? createGameUiRuntime(stableOptions));

  return (
    <GameUiRuntimeContext.Provider value={runtime ?? createdRuntime}>
      {children}
    </GameUiRuntimeContext.Provider>
  );
}

export function useGameUiRuntime() {
  const runtime = useContext(GameUiRuntimeContext);

  if (!runtime) {
    throw new Error('useGameUiRuntime must be used inside GameUiRuntimeProvider');
  }

  return runtime;
}

export function useGameUiLayer<TLayer extends GameUiLayerName>(
  layer: TLayer,
): GameUiRuntimeState['layers'][TLayer] {
  const runtime = useGameUiRuntime();
  const state = useSyncExternalStore(runtime.subscribe, runtime.getState, runtime.getState);

  return state.layers[layer];
}
