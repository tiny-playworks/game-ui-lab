import type { ReactNode } from 'react';

export type GameUiLayerName = 'hud' | 'feedback' | 'notification' | 'narrative' | 'modal' | 'debug';

export type DamageEventVariant = 'damage' | 'heal' | 'critical' | 'miss';
export type ToastEventVariant = 'info' | 'success' | 'warning' | 'loot';
export type RewardRevealState = 'sealed' | 'revealed' | 'claimed';
export type StatusBadgeTone = 'buff' | 'debuff' | 'neutral' | 'warning';
export type DialogueTone = 'neutral' | 'ally' | 'warning';

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
  price?: string | number;
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

export interface StatusBadgeRuntimeRecord {
  id: string;
  label: string;
  tone: StatusBadgeTone;
  count?: number;
  duration?: string;
}

export interface QuestTrackerObjectiveRuntimeRecord {
  id: string;
  label: string;
  state?: 'active' | 'complete' | 'locked';
  progress?: number;
  max?: number;
  meta?: string;
}

export interface QuestRuntimeRecord {
  title: string;
  subtitle?: string;
  objectives: QuestTrackerObjectiveRuntimeRecord[];
}

export interface MiniMapMarkerRuntimeRecord {
  id: string;
  x: number;
  y: number;
  tone?: 'ally' | 'enemy' | 'objective' | 'neutral';
  label?: string;
  active?: boolean;
}

export interface MapRuntimeRecord {
  label?: string;
  markers: MiniMapMarkerRuntimeRecord[];
  selectedId?: string;
}

export interface DialogueRuntimeRecord {
  speaker: string;
  text: string;
  tone?: DialogueTone;
  portrait?: ReactNode;
}

export interface ChoicePromptOptionRuntimeRecord {
  id: string;
  label: string;
  description?: ReactNode;
  disabled?: boolean;
}

export interface ChoiceRuntimeRecord {
  title?: string;
  options: ChoicePromptOptionRuntimeRecord[];
  selectedId?: string;
}

export interface ShopRuntimeRecord {
  id: string;
  title: string;
  items: RuntimeLootItem[];
  currencies: Array<{ id: string; label: string; amount: number | string; tone?: 'gold' | 'silver' | 'gem' | 'token' | 'neutral' }>;
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
      combo?: { count: number; label?: string };
      quest?: QuestRuntimeRecord;
      map?: MapRuntimeRecord;
      buffs?: StatusBadgeRuntimeRecord[];
    };
    feedback: {
      damage: DamageEventRecord[];
    };
    notification: {
      toasts: ToastEventRecord[];
    };
    narrative?: {
      dialogue?: DialogueRuntimeRecord;
      choices?: ChoiceRuntimeRecord;
    };
    modal: {
      reward?: RewardRevealRuntimeRecord;
      shop?: ShopRuntimeRecord;
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
  | { type: 'combo:set'; payload: { count: number; label?: string } }
  | { type: 'combo:increment'; payload?: { amount?: number; label?: string } }
  | { type: 'combo:reset' }
  | { type: 'quest:track'; payload: QuestRuntimeRecord }
  | { type: 'quest:objective:update'; payload: { id: string; patch: Partial<QuestTrackerObjectiveRuntimeRecord> } }
  | { type: 'quest:clear' }
  | { type: 'map:set'; payload: MapRuntimeRecord }
  | { type: 'map:marker:update'; payload: MiniMapMarkerRuntimeRecord }
  | { type: 'map:select'; id: string }
  | { type: 'map:clear' }
  | { type: 'buff:upsert'; payload: StatusBadgeRuntimeRecord }
  | { type: 'buff:remove'; id: string }
  | { type: 'buff:clear' }
  | { type: 'dialogue:show'; payload: DialogueRuntimeRecord }
  | { type: 'dialogue:dismiss' }
  | { type: 'choice:show'; payload: ChoiceRuntimeRecord }
  | { type: 'choice:select'; id: string }
  | { type: 'choice:clear' }
  | { type: 'reward-reveal:show'; payload: RewardRevealRuntimeRecord }
  | { type: 'reward-reveal:update'; payload: Partial<RewardRevealRuntimeRecord> & { id: string } }
  | { type: 'reward-reveal:clear' }
  | { type: 'shop:open'; payload: ShopRuntimeRecord }
  | { type: 'shop:close' }
  | { type: 'layer:clear'; layer: GameUiLayerName };

export interface GameUiRuntime {
  getState(): GameUiRuntimeState;
  subscribe(listener: (state: GameUiRuntimeState) => void): () => void;
  dispatch(event: GameUiEvent): void;
  emitDamage(input: DamageEventInput): string;
  notify(input: ToastEventInput): string;
  dismiss(id: string): void;
  setCombo(count: number, label?: string): void;
  incrementCombo(amount?: number, label?: string): void;
  resetCombo(): void;
  trackQuest(quest: QuestRuntimeRecord): void;
  setMapMarkers(map: MapRuntimeRecord): void;
  upsertBuff(buff: StatusBadgeRuntimeRecord): void;
  showDialogue(dialogue: DialogueRuntimeRecord): void;
  showChoices(choices: ChoiceRuntimeRecord): void;
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

const emptyHud = (): GameUiRuntimeState['layers']['hud'] => ({
  cooldowns: {},
});

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
    setCombo(count, label) {
      dispatch({ type: 'combo:set', payload: { count, label } });
    },
    incrementCombo(amount = 1, label) {
      dispatch({ type: 'combo:increment', payload: { amount, label } });
    },
    resetCombo() {
      dispatch({ type: 'combo:reset' });
    },
    trackQuest(quest) {
      dispatch({ type: 'quest:track', payload: quest });
    },
    setMapMarkers(map) {
      dispatch({ type: 'map:set', payload: map });
    },
    upsertBuff(buff) {
      dispatch({ type: 'buff:upsert', payload: buff });
    },
    showDialogue(dialogue) {
      dispatch({ type: 'dialogue:show', payload: dialogue });
    },
    showChoices(choices) {
      dispatch({ type: 'choice:show', payload: choices });
    },
    clearLayer(layer) {
      dispatch({ type: 'layer:clear', layer });
    },
  };
}

function createInitialState(): GameUiRuntimeState {
  return {
    layers: {
      hud: emptyHud(),
      feedback: {
        damage: [],
      },
      notification: {
        toasts: [],
      },
      narrative: {},
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
    case 'combo:set':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            combo: { count: event.payload.count, label: event.payload.label },
          },
        },
      };
    case 'combo:increment': {
      const amount = event.payload?.amount ?? 1;
      const currentCount = current.layers.hud.combo?.count ?? 0;
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            combo: {
              count: currentCount + amount,
              label: event.payload?.label ?? current.layers.hud.combo?.label,
            },
          },
        },
      };
    }
    case 'combo:reset':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            combo: undefined,
          },
        },
      };
    case 'quest:track':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            quest: event.payload,
          },
        },
      };
    case 'quest:objective:update': {
      const quest = current.layers.hud.quest;
      if (!quest) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            quest: {
              ...quest,
              objectives: quest.objectives.map((objective) =>
                objective.id === event.payload.id ? { ...objective, ...event.payload.patch } : objective,
              ),
            },
          },
        },
      };
    }
    case 'quest:clear':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            quest: undefined,
          },
        },
      };
    case 'map:set':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            map: event.payload,
          },
        },
      };
    case 'map:marker:update': {
      const map = current.layers.hud.map;
      if (!map) {
        return current;
      }

      const markers = map.markers.some((marker) => marker.id === event.payload.id)
        ? map.markers.map((marker) => (marker.id === event.payload.id ? { ...marker, ...event.payload } : marker))
        : [...map.markers, event.payload];

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            map: { ...map, markers },
          },
        },
      };
    }
    case 'map:select': {
      const map = current.layers.hud.map;
      if (!map) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            map: { ...map, selectedId: event.id },
          },
        },
      };
    }
    case 'map:clear':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            map: undefined,
          },
        },
      };
    case 'buff:upsert': {
      const buffs = current.layers.hud.buffs ?? [];
      const nextBuffs = buffs.some((buff) => buff.id === event.payload.id)
        ? buffs.map((buff) => (buff.id === event.payload.id ? event.payload : buff))
        : [...buffs, event.payload];

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            buffs: nextBuffs,
          },
        },
      };
    }
    case 'buff:remove':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            buffs: (current.layers.hud.buffs ?? []).filter((buff) => buff.id !== event.id),
          },
        },
      };
    case 'buff:clear':
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            buffs: undefined,
          },
        },
      };
    case 'dialogue:show':
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...current.layers.narrative,
            dialogue: event.payload,
          },
        },
      };
    case 'dialogue:dismiss':
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...current.layers.narrative,
            dialogue: undefined,
          },
        },
      };
    case 'choice:show':
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...current.layers.narrative,
            choices: event.payload,
          },
        },
      };
    case 'choice:select': {
      const choices = current.layers.narrative?.choices;
      if (!choices) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...current.layers.narrative,
            choices: { ...choices, selectedId: event.id },
          },
        },
      };
    }
    case 'choice:clear':
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...current.layers.narrative,
            choices: undefined,
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
            shop: undefined,
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
            ...current.layers.modal,
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
          modal: {
            ...current.layers.modal,
            reward: undefined,
          },
        },
      };
    case 'shop:open':
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            shop: event.payload,
            reward: undefined,
          },
        },
      };
    case 'shop:close':
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            shop: undefined,
          },
        },
      };
    case 'layer:clear':
      return clearRuntimeLayer(current, event.layer);
  }
}

function clearRuntimeLayer(current: GameUiRuntimeState, layer: GameUiLayerName): GameUiRuntimeState {
  if (layer === 'hud') {
    return { ...current, layers: { ...current.layers, hud: emptyHud() } };
  }

  if (layer === 'feedback') {
    return { ...current, layers: { ...current.layers, feedback: { damage: [] } } };
  }

  if (layer === 'notification') {
    return { ...current, layers: { ...current.layers, notification: { toasts: [] } } };
  }

  if (layer === 'narrative') {
    return { ...current, layers: { ...current.layers, narrative: {} } };
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
