export type GameUiLayerName = 'hud' | 'feedback' | 'notification' | 'modal' | 'debug';

export type DamageEventVariant = 'damage' | 'heal' | 'critical' | 'miss';
export type ToastEventVariant = 'info' | 'success' | 'warning' | 'loot';
export type RewardRevealState = 'sealed' | 'revealed' | 'claimed';

export interface GameUiAnchor {
  x: number;
  y: number;
}

export interface RuntimeLootItem {
  id: string;
  name: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  quantity?: number;
  value?: string;
  subtitle?: string;
}

export interface DamageEventInput {
  value: number | string;
  variant?: DamageEventVariant;
  prefix?: string;
  size?: number;
  anchor?: GameUiAnchor;
  durationMs?: number;
}

export interface DamageEventRecord extends DamageEventInput {
  id: string;
  variant: DamageEventVariant;
  createdAt: number;
}

export interface ToastEventInput {
  title?: string;
  message: string;
  variant?: ToastEventVariant;
  icon?: string;
  durationMs?: number;
  closable?: boolean;
}

export interface ToastEventRecord extends ToastEventInput {
  id: string;
  variant: ToastEventVariant;
  createdAt: number;
}

export interface CooldownRuntimeRecord {
  id: string;
  label: string;
  progress: number;
  ready?: boolean;
  disabled?: boolean;
}

export interface TargetHealthRuntimeRecord {
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
}

export interface RewardRevealRuntimeRecord {
  id: string;
  title: string;
  items: RuntimeLootItem[];
  state: RewardRevealState;
}

export interface GameUiRuntimeState {
  layers: {
    hud: {
      cooldowns: Record<string, CooldownRuntimeRecord>;
      target?: TargetHealthRuntimeRecord;
    };
    feedback: {
      damage: DamageEventRecord[];
    };
    notification: {
      toasts: ToastEventRecord[];
    };
    modal: {
      reward?: RewardRevealRuntimeRecord;
    };
    debug: {
      events: string[];
    };
  };
}

export type GameUiEvent =
  | { type: 'damage:emit'; payload: DamageEventInput & { id?: string } }
  | { type: 'damage:complete'; id: string }
  | { type: 'toast:notify'; payload: ToastEventInput & { id?: string } }
  | { type: 'toast:dismiss'; id: string }
  | { type: 'cooldown:update'; payload: CooldownRuntimeRecord }
  | { type: 'target-health:update'; payload: TargetHealthRuntimeRecord }
  | { type: 'reward-reveal:show'; payload: RewardRevealRuntimeRecord }
  | { type: 'reward-reveal:update'; payload: Partial<RewardRevealRuntimeRecord> & { id: string } }
  | { type: 'reward-reveal:clear' }
  | { type: 'layer:clear'; layer: GameUiLayerName };

export interface GameUiRuntime {
  getState(): GameUiRuntimeState;
  subscribe(listener: (state: GameUiRuntimeState) => void): () => void;
  dispatch(event: GameUiEvent): void;
  emitDamage(input: DamageEventInput): string;
  notify(input: ToastEventInput): string;
  dismiss(id: string): void;
  clearLayer(layer: GameUiLayerName): void;
}

export interface GameUiRuntimeOptions {
  damageLimit?: number;
  toastLimit?: number;
  now?: () => number;
  createId?: (scope: string) => string;
}

const defaultOptions = {
  damageLimit: 12,
  toastLimit: 4,
};

export function createGameUiRuntime(options: GameUiRuntimeOptions = {}): GameUiRuntime {
  const runtimeOptions = { ...defaultOptions, ...options };
  const now = options.now ?? (() => Date.now());
  const createId = options.createId ?? createRuntimeIdFactory();
  const listeners = new Set<(state: GameUiRuntimeState) => void>();
  let state = createInitialState();

  function setState(nextState: GameUiRuntimeState) {
    state = nextState;
    listeners.forEach((listener) => listener(state));
  }

  function dispatch(event: GameUiEvent) {
    setState(reduceState(state, event, {
      createId,
      damageLimit: runtimeOptions.damageLimit,
      now,
      toastLimit: runtimeOptions.toastLimit,
    }));
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch,
    emitDamage(input) {
      const id = createId('damage');
      dispatch({ type: 'damage:emit', payload: { ...input, id } });
      return id;
    },
    notify(input) {
      const id = createId('toast');
      dispatch({ type: 'toast:notify', payload: { ...input, id } });
      return id;
    },
    dismiss(id) {
      dispatch({ type: 'toast:dismiss', id });
    },
    clearLayer(layer) {
      dispatch({ type: 'layer:clear', layer });
    },
  };
}

function createInitialState(): GameUiRuntimeState {
  return {
    layers: {
      hud: {
        cooldowns: {},
      },
      feedback: {
        damage: [],
      },
      notification: {
        toasts: [],
      },
      modal: {},
      debug: {
        events: [],
      },
    },
  };
}

function reduceState(
  current: GameUiRuntimeState,
  event: GameUiEvent,
  options: {
    createId: (scope: string) => string;
    damageLimit: number;
    now: () => number;
    toastLimit: number;
  },
): GameUiRuntimeState {
  switch (event.type) {
    case 'damage:emit': {
      const record: DamageEventRecord = {
        ...event.payload,
        id: event.payload.id ?? options.createId('damage'),
        variant: event.payload.variant ?? 'damage',
        createdAt: options.now(),
      };

      return {
        ...current,
        layers: {
          ...current.layers,
          feedback: {
            damage: [...current.layers.feedback.damage, record].slice(-options.damageLimit),
          },
        },
      };
    }
    case 'damage:complete':
      return {
        ...current,
        layers: {
          ...current.layers,
          feedback: {
            damage: current.layers.feedback.damage.filter((item) => item.id !== event.id),
          },
        },
      };
    case 'toast:notify': {
      const record: ToastEventRecord = {
        ...event.payload,
        id: event.payload.id ?? options.createId('toast'),
        variant: event.payload.variant ?? 'info',
        createdAt: options.now(),
      };

      return {
        ...current,
        layers: {
          ...current.layers,
          notification: {
            toasts: [...current.layers.notification.toasts, record].slice(-options.toastLimit),
          },
        },
      };
    }
    case 'toast:dismiss':
      return {
        ...current,
        layers: {
          ...current.layers,
          notification: {
            toasts: current.layers.notification.toasts.filter((item) => item.id !== event.id),
          },
        },
      };
    case 'cooldown:update':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            cooldowns: {
              ...current.layers.hud.cooldowns,
              [event.payload.id]: event.payload,
            },
          },
        },
      };
    case 'target-health:update':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            target: event.payload,
          },
        },
      };
    case 'reward-reveal:show':
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            reward: event.payload,
          },
        },
      };
    case 'reward-reveal:update': {
      if (!current.layers.modal.reward || current.layers.modal.reward.id !== event.payload.id) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            reward: {
              ...current.layers.modal.reward,
              ...event.payload,
            },
          },
        },
      };
    }
    case 'reward-reveal:clear':
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {},
        },
      };
    case 'layer:clear':
      return clearRuntimeLayer(current, event.layer);
  }
}

function clearRuntimeLayer(current: GameUiRuntimeState, layer: GameUiLayerName): GameUiRuntimeState {
  if (layer === 'hud') {
    return { ...current, layers: { ...current.layers, hud: { cooldowns: {} } } };
  }

  if (layer === 'feedback') {
    return { ...current, layers: { ...current.layers, feedback: { damage: [] } } };
  }

  if (layer === 'notification') {
    return { ...current, layers: { ...current.layers, notification: { toasts: [] } } };
  }

  if (layer === 'modal') {
    return { ...current, layers: { ...current.layers, modal: {} } };
  }

  return { ...current, layers: { ...current.layers, debug: { events: [] } } };
}

function createRuntimeIdFactory() {
  let nextId = 0;

  return (scope: string) => {
    nextId += 1;
    return `${scope}-${nextId}`;
  };
}
