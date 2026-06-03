import { createRuntimeIdFactory } from "./id-factory";
import { createInitialState, reduceState } from "./reducer";
import type { GameUiEvent, GameUiRuntime, GameUiRuntimeOptions, GameUiRuntimeState } from "./types";

export type {
  ChoicePromptOptionRuntimeRecord,
  ChoiceRuntimeRecord,
  CooldownRuntimeRecord,
  DamageEventInput,
  DamageEventRecord,
  DamageEventVariant,
  DialogueRuntimeRecord,
  DialogueTone,
  GameUiAnchor,
  GameUiEvent,
  GameUiLayerName,
  GameUiRuntime,
  GameUiRuntimeOptions,
  GameUiRuntimeState,
  InventoryRuntimeRecord,
  InventorySlotRuntimeRecord,
  MapRuntimeRecord,
  MiniMapMarkerRuntimeRecord,
  MiniMapPathRuntimeRecord,
  MiniMapZoneRuntimeRecord,
  PartyMemberRuntimeRecord,
  PartyRuntimeRecord,
  QuestLogQuestRuntimeRecord,
  QuestLogRuntimeRecord,
  QuestRuntimeRecord,
  QuestTrackerObjectiveRuntimeRecord,
  ResourceRuntimeRecord,
  RewardRevealRuntimeRecord,
  RewardRevealState,
  RuntimeLootItem,
  ShopRuntimeRecord,
  StatusBadgeRuntimeRecord,
  StatusBadgeTone,
  TargetHealthRuntimeRecord,
  ToastEventInput,
  ToastEventRecord,
  ToastEventVariant,
} from "./types";

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
    setState(
      reduceState(state, event, {
        createId,
        damageLimit: runtimeOptions.damageLimit,
        now,
        toastLimit: runtimeOptions.toastLimit,
      }),
    );
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    dispatch,
    emitDamage(input) {
      const id = createId("damage");
      dispatch({ type: "damage:emit", payload: { ...input, id } });
      return id;
    },
    notify(input) {
      const id = createId("toast");
      dispatch({ type: "toast:notify", payload: { ...input, id } });
      return id;
    },
    dismiss(id) {
      dispatch({ type: "toast:dismiss", id });
    },
    setCombo(count, label) {
      dispatch({ type: "combo:set", payload: { count, label } });
    },
    incrementCombo(amount = 1, label) {
      dispatch({ type: "combo:increment", payload: { amount, label } });
    },
    resetCombo() {
      dispatch({ type: "combo:reset" });
    },
    trackQuest(quest) {
      dispatch({ type: "quest:track", payload: quest });
    },
    setMapMarkers(map) {
      dispatch({ type: "map:set", payload: map });
    },
    selectAbility(id) {
      dispatch({ type: "ability:select", id });
    },
    updateResource(resource) {
      dispatch({ type: "resource:update", payload: resource });
    },
    upsertBuff(buff) {
      dispatch({ type: "buff:upsert", payload: buff });
    },
    showDialogue(dialogue) {
      dispatch({ type: "dialogue:show", payload: dialogue });
    },
    enqueueDialogue(dialogue) {
      dispatch({ type: "dialogue:enqueue", payload: dialogue });
    },
    advanceDialogue() {
      dispatch({ type: "dialogue:advance" });
    },
    setParty(party) {
      dispatch({ type: "party:set", payload: party });
    },
    openQuestLog(questLog) {
      dispatch({ type: "quest-log:open", payload: questLog });
    },
    showChoices(choices) {
      dispatch({ type: "choice:show", payload: choices });
    },
    clearLayer(layer) {
      dispatch({ type: "layer:clear", layer });
    },
  };
}
