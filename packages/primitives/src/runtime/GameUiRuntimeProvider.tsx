import React, { createContext, use, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import {
  createGameUiRuntime,
  type GameUiLayerName,
  type GameUiRuntime,
  type GameUiRuntimeOptions,
  type GameUiRuntimeState,
} from "@tiny-playworks/game-ui-runtime";

const GameUiRuntimeContext = createContext<GameUiRuntime | null>(null);

export interface GameUiRuntimeProviderProps extends GameUiRuntimeOptions {
  children: ReactNode;
  runtime?: GameUiRuntime;
}

export function GameUiRuntimeProvider({ children, runtime, ...options }: GameUiRuntimeProviderProps) {
  const [createdRuntime] = useState(() => runtime ?? createGameUiRuntime(options));

  return <GameUiRuntimeContext.Provider value={runtime ?? createdRuntime}>{children}</GameUiRuntimeContext.Provider>;
}

export function useGameUiRuntime() {
  const runtime = use(GameUiRuntimeContext);

  if (!runtime) {
    throw new Error("useGameUiRuntime must be used inside GameUiRuntimeProvider");
  }

  return runtime;
}

export function useGameUiLayer<TLayer extends GameUiLayerName>(layer: TLayer): GameUiRuntimeState["layers"][TLayer] {
  const runtime = useGameUiRuntime();
  return useSyncExternalStore(
    runtime.subscribe,
    () => runtime.getState().layers[layer],
    () => runtime.getState().layers[layer],
  );
}

/**
 * Select a specific piece of state from the Game UI runtime.
 *
 * @warning **CRITICAL**: The `selector` function MUST be stable and its return value should ideally be stable.
 * If you use an inline anonymous function that returns a NEW object or array on every call
 * (e.g. `state => state.items.filter(...)`), `useSyncExternalStore` will detect a difference
 * on every single state change, potentially causing infinite re-renders or severe performance degradation.
 *
 * Either return primitive values, or memoize your selector function using `useCallback` or move it outside the component.
 */
export function useGameUiSelector<T>(selector: (state: GameUiRuntimeState) => T): T {
  const runtime = useGameUiRuntime();
  return useSyncExternalStore(
    runtime.subscribe,
    () => selector(runtime.getState()),
    () => selector(runtime.getState()),
  );
}
