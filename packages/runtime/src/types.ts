import type { ReactNode } from "react";

export type GameUiLayerName = "hud" | "feedback" | "notification" | "narrative" | "modal" | "debug";

export type DamageEventVariant = "damage" | "heal" | "critical" | "miss";
export type ToastEventVariant = "info" | "success" | "warning" | "loot";
export type RewardRevealState = "sealed" | "revealed" | "claimed";
export type StatusBadgeTone = "buff" | "debuff" | "neutral" | "warning";
export type DialogueTone = "neutral" | "ally" | "warning";

export interface GameUiAnchor {
  x: number;
  y: number;
}

export interface RuntimeLootItem {
  id: string;
  name: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  quantity?: number;
  value?: string;
  subtitle?: string;
  price?: string | number;
  stock?: number;
  discount?: ReactNode;
  unavailableReason?: ReactNode;
  details?: ReactNode;
  state?: "new" | "claimed" | "locked";
  source?: string;
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
  active?: boolean;
  disabled?: boolean;
  resourceCost?: ReactNode;
  comboHint?: ReactNode;
  cooldownText?: ReactNode;
  variant?: "basic" | "ultimate" | "passive";
  triggerKey?: string;
}

export interface TargetHealthRuntimeRecord {
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
  level?: string;
  elite?: boolean;
  threat?: string;
  weakness?: string;
}

export interface ResourceRuntimeRecord {
  id: string;
  label: string;
  value: number;
  max: number;
  kind?: "mana" | "energy" | "stamina" | "rage";
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
  state?: "active" | "complete" | "locked";
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
  tone?: "ally" | "enemy" | "objective" | "neutral";
  label?: string;
  active?: boolean;
}

export interface MiniMapPathRuntimeRecord {
  id: string;
  points: GameUiAnchor[];
  label?: string;
}

export interface MiniMapZoneRuntimeRecord {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone?: "safe" | "danger" | "objective";
  label?: string;
}

export interface MapRuntimeRecord {
  label?: string;
  markers: MiniMapMarkerRuntimeRecord[];
  selectedId?: string;
  paths?: MiniMapPathRuntimeRecord[];
  zones?: MiniMapZoneRuntimeRecord[];
  scanRadius?: number;
  playerHeading?: number;
  zoomLabel?: string;
}

export interface DialogueRuntimeRecord {
  speaker: string;
  text: string;
  tone?: DialogueTone;
  portrait?: ReactNode;
  source?: ReactNode;
  typing?: boolean;
}

export interface ChoicePromptOptionRuntimeRecord {
  id: string;
  label: string;
  description?: ReactNode;
  cost?: ReactNode;
  resultPreview?: ReactNode;
  disabled?: boolean;
}

export interface ChoiceRuntimeRecord {
  title?: string;
  options: ChoicePromptOptionRuntimeRecord[];
  selectedId?: string;
}

export interface PartyMemberRuntimeRecord {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
  status?: StatusBadgeRuntimeRecord;
  offline?: boolean;
}

export interface PartyRuntimeRecord {
  members: PartyMemberRuntimeRecord[];
  selectedId?: string;
}

export interface QuestLogQuestRuntimeRecord {
  id: string;
  title: string;
  subtitle?: string;
  objectives: QuestTrackerObjectiveRuntimeRecord[];
}

export interface QuestLogRuntimeRecord {
  title?: string;
  quests: QuestLogQuestRuntimeRecord[];
  activeId?: string;
}

export interface ShopRuntimeRecord {
  id: string;
  title: string;
  items: RuntimeLootItem[];
  currencies: Array<{
    id: string;
    label: string;
    amount: number | string;
    tone?: "gold" | "silver" | "gem" | "token" | "neutral";
  }>;
  selectedId?: string;
}

export interface RewardRevealRuntimeRecord {
  id: string;
  title: string;
  items: RuntimeLootItem[];
  state: RewardRevealState;
}

export interface InventorySlotRuntimeRecord {
  id: string;
  item?: RuntimeLootItem;
  locked?: boolean;
  equipped?: boolean;
  slotType?: "bag" | "weapon" | "armor" | "trinket" | "quest" | "material";
  stackCount?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
  compareState?: "upgrade" | "downgrade" | "same";
}

export interface InventoryRuntimeRecord {
  title?: string;
  slots: InventorySlotRuntimeRecord[];
  selectedId?: string;
}

export interface GameUiRuntimeState {
  layers: {
    hud: {
      cooldowns: Record<string, CooldownRuntimeRecord>;
      selectedAbilityId?: string;
      target?: TargetHealthRuntimeRecord;
      combo?: { count: number; label?: string };
      quest?: QuestRuntimeRecord;
      map?: MapRuntimeRecord;
      resources?: Record<string, ResourceRuntimeRecord>;
      buffs?: StatusBadgeRuntimeRecord[];
      party?: PartyRuntimeRecord;
    };
    feedback: {
      damage: DamageEventRecord[];
    };
    notification: {
      toasts: ToastEventRecord[];
    };
    narrative?: {
      dialogueQueue: DialogueRuntimeRecord[];
      choices?: ChoiceRuntimeRecord;
    };
    modal: {
      reward?: RewardRevealRuntimeRecord;
      shop?: ShopRuntimeRecord;
      questLog?: QuestLogRuntimeRecord;
      inventory?: InventoryRuntimeRecord;
    };
    debug: {
      events: string[];
    };
  };
}

export type GameUiEvent =
  | { type: "damage:emit"; payload: DamageEventInput & { id?: string } }
  | { type: "damage:complete"; id: string }
  | { type: "toast:notify"; payload: ToastEventInput & { id?: string } }
  | { type: "toast:dismiss"; id: string }
  | { type: "cooldown:update"; payload: CooldownRuntimeRecord }
  | { type: "ability:select"; id: string }
  | { type: "resource:update"; payload: ResourceRuntimeRecord }
  | { type: "resource:remove"; id: string }
  | { type: "target-health:update"; payload: TargetHealthRuntimeRecord }
  | { type: "combo:set"; payload: { count: number; label?: string } }
  | { type: "combo:increment"; payload?: { amount?: number; label?: string } }
  | { type: "combo:reset" }
  | { type: "quest:track"; payload: QuestRuntimeRecord }
  | { type: "quest:objective:update"; payload: { id: string; patch: Partial<QuestTrackerObjectiveRuntimeRecord> } }
  | { type: "quest:clear" }
  | { type: "map:set"; payload: MapRuntimeRecord }
  | { type: "map:marker:update"; payload: MiniMapMarkerRuntimeRecord }
  | { type: "map:select"; id: string }
  | { type: "map:clear" }
  | { type: "buff:upsert"; payload: StatusBadgeRuntimeRecord }
  | { type: "buff:remove"; id: string }
  | { type: "buff:clear" }
  | { type: "dialogue:show"; payload: DialogueRuntimeRecord }
  | { type: "dialogue:enqueue"; payload: DialogueRuntimeRecord }
  | { type: "dialogue:advance" }
  | { type: "dialogue:dismiss" }
  | { type: "party:set"; payload: PartyRuntimeRecord }
  | { type: "party:member:update"; payload: { id: string; patch: Partial<PartyMemberRuntimeRecord> } }
  | { type: "party:select"; id: string }
  | { type: "party:clear" }
  | { type: "quest-log:open"; payload: QuestLogRuntimeRecord }
  | { type: "quest-log:close" }
  | { type: "quest-log:activate"; id: string }
  | { type: "inventory:set"; payload: InventoryRuntimeRecord }
  | { type: "inventory:slot:update"; payload: { id: string; patch: Partial<InventorySlotRuntimeRecord> } }
  | { type: "inventory:select"; id: string }
  | { type: "inventory:clear" }
  | { type: "choice:show"; payload: ChoiceRuntimeRecord }
  | { type: "choice:select"; id: string }
  | { type: "choice:clear" }
  | { type: "reward-reveal:show"; payload: RewardRevealRuntimeRecord }
  | { type: "reward-reveal:update"; payload: Partial<RewardRevealRuntimeRecord> & { id: string } }
  | { type: "reward-reveal:clear" }
  | { type: "shop:open"; payload: ShopRuntimeRecord }
  | { type: "shop:item:select"; id: string }
  | { type: "shop:close" }
  | { type: "layer:clear"; layer: GameUiLayerName };

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
  selectAbility(id: string): void;
  updateResource(resource: ResourceRuntimeRecord): void;
  upsertBuff(buff: StatusBadgeRuntimeRecord): void;
  showDialogue(dialogue: DialogueRuntimeRecord): void;
  enqueueDialogue(dialogue: DialogueRuntimeRecord): void;
  advanceDialogue(): void;
  setParty(party: PartyRuntimeRecord): void;
  openQuestLog(questLog: QuestLogRuntimeRecord): void;
  showChoices(choices: ChoiceRuntimeRecord): void;
  clearLayer(layer: GameUiLayerName): void;
}

export interface GameUiRuntimeOptions {
  damageLimit?: number;
  toastLimit?: number;
  now?: () => number;
  createId?: (scope: string) => string;
}
