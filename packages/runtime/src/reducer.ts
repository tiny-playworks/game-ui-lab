import type { DamageEventRecord, GameUiEvent, GameUiLayerName, GameUiRuntimeState, ToastEventRecord } from "./types";

const emptyHud = (): GameUiRuntimeState["layers"]["hud"] => ({
  cooldowns: {},
});

type NarrativeLayerState = NonNullable<GameUiRuntimeState["layers"]["narrative"]>;

function narrativeLayer(current: GameUiRuntimeState): NarrativeLayerState {
  return {
    dialogueQueue: current.layers.narrative?.dialogueQueue ?? [],
    choices: current.layers.narrative?.choices,
  };
}

export function createInitialState(): GameUiRuntimeState {
  return {
    layers: {
      hud: emptyHud(),
      feedback: {
        damage: [],
      },
      notification: {
        toasts: [],
      },
      narrative: { dialogueQueue: [] },
      modal: {},
      debug: {
        events: [],
      },
    },
  };
}

export function reduceState(
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
    case "damage:emit": {
      const record: DamageEventRecord = {
        ...event.payload,
        id: event.payload.id ?? options.createId("damage"),
        variant: event.payload.variant ?? "damage",
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
    case "damage:complete":
      return {
        ...current,
        layers: {
          ...current.layers,
          feedback: {
            damage: current.layers.feedback.damage.filter((item) => item.id !== event.id),
          },
        },
      };
    case "toast:notify": {
      const record: ToastEventRecord = {
        ...event.payload,
        id: event.payload.id ?? options.createId("toast"),
        variant: event.payload.variant ?? "info",
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
    case "toast:dismiss":
      return {
        ...current,
        layers: {
          ...current.layers,
          notification: {
            toasts: current.layers.notification.toasts.filter((item) => item.id !== event.id),
          },
        },
      };
    case "cooldown:update":
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
    case "ability:select":
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            selectedAbilityId: event.id,
          },
        },
      };
    case "resource:update":
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            resources: {
              ...current.layers.hud.resources,
              [event.payload.id]: event.payload,
            },
          },
        },
      };
    case "resource:remove": {
      const { [event.id]: _removed, ...resources } = current.layers.hud.resources ?? {};

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            resources,
          },
        },
      };
    }
    case "target-health:update":
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
    case "combo:set":
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
    case "combo:increment": {
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
    case "combo:reset":
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
    case "quest:track":
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
    case "quest:objective:update": {
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
    case "quest:clear":
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
    case "map:set":
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
    case "map:marker:update": {
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
    case "map:select": {
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
    case "map:clear":
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
    case "buff:upsert": {
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
    case "buff:remove":
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
    case "buff:clear":
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
    case "dialogue:show":
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrativeLayer(current),
            dialogueQueue: [event.payload],
          },
        },
      };
    case "dialogue:enqueue": {
      const narrative = narrativeLayer(current);
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrative,
            dialogueQueue: [...narrative.dialogueQueue, event.payload],
          },
        },
      };
    }
    case "dialogue:advance": {
      const narrative = narrativeLayer(current);
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrative,
            dialogueQueue: narrative.dialogueQueue.slice(1),
          },
        },
      };
    }
    case "dialogue:dismiss":
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrativeLayer(current),
            dialogueQueue: [],
          },
        },
      };
    case "party:set":
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            party: event.payload,
          },
        },
      };
    case "party:member:update": {
      const party = current.layers.hud.party;
      if (!party) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            party: {
              ...party,
              members: party.members.map((member) =>
                member.id === event.payload.id ? { ...member, ...event.payload.patch } : member,
              ),
            },
          },
        },
      };
    }
    case "party:select": {
      const party = current.layers.hud.party;
      if (!party) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            party: { ...party, selectedId: event.id },
          },
        },
      };
    }
    case "party:clear":
      return {
        ...current,
        layers: {
          ...current.layers,
          hud: {
            ...current.layers.hud,
            party: undefined,
          },
        },
      };
    case "quest-log:open":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            questLog: event.payload,
            reward: undefined,
            shop: undefined,
          },
        },
      };
    case "quest-log:close":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            questLog: undefined,
          },
        },
      };
    case "quest-log:activate": {
      const questLog = current.layers.modal.questLog;
      if (!questLog) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            questLog: { ...questLog, activeId: event.id },
          },
        },
      };
    }
    case "inventory:set":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            inventory: event.payload,
            questLog: undefined,
            reward: undefined,
            shop: undefined,
          },
        },
      };
    case "inventory:slot:update": {
      const inventory = current.layers.modal.inventory;
      if (!inventory) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            inventory: {
              ...inventory,
              slots: inventory.slots.map((slot) =>
                slot.id === event.payload.id ? { ...slot, ...event.payload.patch } : slot,
              ),
            },
          },
        },
      };
    }
    case "inventory:select": {
      const inventory = current.layers.modal.inventory;
      if (!inventory) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            inventory: { ...inventory, selectedId: event.id },
          },
        },
      };
    }
    case "inventory:clear":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            inventory: undefined,
          },
        },
      };
    case "choice:show":
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrativeLayer(current),
            choices: event.payload,
          },
        },
      };
    case "choice:select": {
      const narrative = narrativeLayer(current);
      if (!narrative.choices) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrative,
            choices: { ...narrative.choices, selectedId: event.id },
          },
        },
      };
    }
    case "choice:clear":
      return {
        ...current,
        layers: {
          ...current.layers,
          narrative: {
            ...narrativeLayer(current),
            choices: undefined,
          },
        },
      };
    case "reward-reveal:show":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            reward: event.payload,
            shop: undefined,
            questLog: undefined,
          },
        },
      };
    case "reward-reveal:update": {
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
    case "reward-reveal:clear":
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
    case "shop:open":
      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            shop: event.payload,
            reward: undefined,
            questLog: undefined,
          },
        },
      };
    case "shop:item:select": {
      const shop = current.layers.modal.shop;
      if (!shop) {
        return current;
      }

      return {
        ...current,
        layers: {
          ...current.layers,
          modal: {
            ...current.layers.modal,
            shop: { ...shop, selectedId: event.id },
          },
        },
      };
    }
    case "shop:close":
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
    case "layer:clear":
      return clearRuntimeLayer(current, event.layer);
  }
}

function clearRuntimeLayer(current: GameUiRuntimeState, layer: GameUiLayerName): GameUiRuntimeState {
  if (layer === "hud") {
    return { ...current, layers: { ...current.layers, hud: emptyHud() } };
  }

  if (layer === "feedback") {
    return { ...current, layers: { ...current.layers, feedback: { damage: [] } } };
  }

  if (layer === "notification") {
    return { ...current, layers: { ...current.layers, notification: { toasts: [] } } };
  }

  if (layer === "narrative") {
    return { ...current, layers: { ...current.layers, narrative: { dialogueQueue: [] } } };
  }

  if (layer === "modal") {
    return { ...current, layers: { ...current.layers, modal: {} } };
  }

  return { ...current, layers: { ...current.layers, debug: { events: [] } } };
}
