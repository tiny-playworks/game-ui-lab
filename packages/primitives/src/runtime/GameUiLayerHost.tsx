import React, { useEffect, useMemo } from "react";
import type { CSSProperties } from "react";
import type { ToastEventRecord } from "@tiny-playworks/game-ui-runtime";
import { AbilityBar } from "../ability-bar/AbilityBar";
import type { AbilityBarItem } from "../ability-bar/AbilityBar";
import { BuffBar } from "../buff-bar/BuffBar";
import type { BuffBarBuff } from "../buff-bar/BuffBar";
import { ChoicePrompt } from "../choice-prompt/ChoicePrompt";
import { ComboCounter } from "../combo-counter/ComboCounter";
import { DamageNumber } from "../damage-number/DamageNumber";
import { DialogueBox } from "../dialogue-box/DialogueBox";
import { FloatingToast } from "../floating-toast/FloatingToast";
import { InventoryGrid } from "../inventory-grid/InventoryGrid";
import { MiniMap } from "../mini-map/MiniMap";
import { PartyFrame } from "../party-frame/PartyFrame";
import type { PartyFrameMember } from "../party-frame/PartyFrame";
import { QuestLog } from "../quest-log/QuestLog";
import { QuestTracker } from "../quest-tracker/QuestTracker";
import { RewardReveal } from "../reward-reveal/RewardReveal";
import { ShopPanel } from "../shop-panel/ShopPanel";
import { TargetFrame } from "../target-frame/TargetFrame";
import {
  gameUiDebugLayerClass,
  gameUiFeedbackItemClass,
  gameUiFeedbackLayerClass,
  gameUiHudLayerClass,
  gameUiHudClusterClass,
  gameUiLayerClass,
  gameUiLayerHostClass,
  gameUiModalLayerClass,
  gameUiNarrativeLayerClass,
  gameUiNotificationLayerClass,
  mergeClass,
} from "../styles";
import { useGameUiLayer, useGameUiRuntime } from "./GameUiRuntimeProvider";

export interface GameUiLayerHostProps {
  className?: string;
}

function cooldownsToAbilities(
  cooldowns: Record<
    string,
    {
      id: string;
      label: string;
      progress: number;
      ready?: boolean;
      active?: boolean;
      disabled?: boolean;
      resourceCost?: React.ReactNode;
      comboHint?: React.ReactNode;
      cooldownText?: React.ReactNode;
      variant?: AbilityBarItem["variant"];
      triggerKey?: string;
    }
  >,
): AbilityBarItem[] {
  return Object.values(cooldowns).map((record) => ({
    id: record.id,
    label: record.label,
    icon: record.label.slice(0, 1),
    progress: record.progress,
    ready: record.ready,
    active: record.active,
    locked: record.disabled,
    resourceCost: record.resourceCost,
    comboHint: record.comboHint,
    cooldownText: record.cooldownText,
    variant: record.variant,
    triggerKey: record.triggerKey,
  }));
}

export function GameUiLayerHost({ className }: GameUiLayerHostProps) {
  const runtime = useGameUiRuntime();
  const hud = useGameUiLayer("hud");
  const feedback = useGameUiLayer("feedback");
  const notification = useGameUiLayer("notification");
  const narrative = useGameUiLayer("narrative");
  const modal = useGameUiLayer("modal");

  const abilityItems = useMemo(() => cooldownsToAbilities(hud.cooldowns), [hud.cooldowns]);
  const buffItems: BuffBarBuff[] = useMemo(
    () =>
      (hud.buffs ?? []).map((buff) => ({
        id: buff.id,
        label: buff.label,
        tone: buff.tone,
        count: buff.count,
        duration: buff.duration,
      })),
    [hud.buffs],
  );

  const partyMembers: PartyFrameMember[] = useMemo(
    () =>
      (hud.party?.members ?? []).map((member) => ({
        id: member.id,
        name: member.name,
        health: member.health,
        maxHealth: member.maxHealth,
        shield: member.shield,
        offline: member.offline,
        status: member.status
          ? {
              label: member.status.label,
              tone: member.status.tone,
              count: member.status.count,
              duration: member.status.duration,
            }
          : undefined,
      })),
    [hud.party?.members],
  );

  const activeDialogue = narrative?.dialogueQueue?.[0];

  const hasHudContent = Boolean(
    hud.combo || hud.target || hud.quest || hud.map || buffItems.length || abilityItems.length || partyMembers.length,
  );

  return (
    <div className={mergeClass(gameUiLayerHostClass, className)} data-game-ui-layer-host="">
      <div
        className={mergeClass(gameUiLayerClass, gameUiHudLayerClass)}
        data-game-ui-layer="hud"
        data-active={hasHudContent}
      >
        {hasHudContent ? (
          <div className={gameUiHudClusterClass}>
            {hud.combo ? <ComboCounter count={hud.combo.count} label={hud.combo.label} /> : null}
            {hud.target ? (
              <TargetFrame
                name={hud.target.name}
                health={hud.target.health}
                maxHealth={hud.target.maxHealth}
                shield={hud.target.shield}
                level={hud.target.level}
                elite={hud.target.elite}
                threat={hud.target.threat}
                weakness={hud.target.weakness}
                faction="enemy"
              />
            ) : null}
            {hud.quest ? (
              <QuestTracker title={hud.quest.title} subtitle={hud.quest.subtitle} objectives={hud.quest.objectives} />
            ) : null}
            {hud.map ? (
              <MiniMap
                label={hud.map.label}
                markers={hud.map.markers}
                paths={hud.map.paths}
                playerHeading={hud.map.playerHeading}
                scanRadius={hud.map.scanRadius}
                selectedId={hud.map.selectedId}
                zones={hud.map.zones}
                zoomLabel={hud.map.zoomLabel}
                onMarkerSelect={(id) => runtime.dispatch({ type: "map:select", id })}
              />
            ) : null}
            {buffItems.length ? <BuffBar buffs={buffItems} limit={8} /> : null}
            {abilityItems.length ? (
              <AbilityBar
                abilities={abilityItems}
                label="Abilities"
                selectedId={hud.selectedAbilityId}
                onAbilityClick={(id) => runtime.dispatch({ type: "ability:select", id })}
              />
            ) : null}
            {partyMembers.length ? (
              <PartyFrame
                members={partyMembers}
                selectedId={hud.party?.selectedId}
                label="Party"
                onMemberSelect={(id) => runtime.dispatch({ type: "party:select", id })}
              />
            ) : null}
          </div>
        ) : null}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiFeedbackLayerClass)} data-game-ui-layer="feedback">
        {feedback.damage.map((damage) => (
          <span
            key={damage.id}
            className={gameUiFeedbackItemClass}
            style={
              {
                "--game-ui-feedback-x": damage.anchor ? `${damage.anchor.x}%` : undefined,
                "--game-ui-feedback-y": damage.anchor ? `${damage.anchor.y}%` : undefined,
              } as CSSProperties
            }
          >
            <DamageNumber
              value={damage.value}
              variant={damage.variant}
              prefix={damage.prefix}
              size={damage.size}
              onExitComplete={() => runtime.dispatch({ type: "damage:complete", id: damage.id })}
            />
          </span>
        ))}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiNotificationLayerClass)} data-game-ui-layer="notification">
        {notification.toasts.map((toast) => (
          <RuntimeToast key={toast.id} toast={toast} />
        ))}
      </div>
      <div
        className={mergeClass(gameUiLayerClass, gameUiNarrativeLayerClass)}
        data-game-ui-layer="narrative"
        data-active={Boolean(activeDialogue || narrative?.choices)}
      >
        {activeDialogue ? (
          <div data-game-ui-dialogue-queue={narrative?.dialogueQueue?.length ?? 0}>
            <DialogueBox
              speaker={activeDialogue.speaker}
              text={activeDialogue.text}
              tone={activeDialogue.tone}
              portrait={activeDialogue.portrait}
              source={activeDialogue.source}
              typing={activeDialogue.typing}
            />
            {(narrative?.dialogueQueue?.length ?? 0) > 1 ? (
              <button type="button" onClick={() => runtime.advanceDialogue()}>
                Continue dialogue
              </button>
            ) : null}
          </div>
        ) : null}
        {narrative?.choices ? (
          <ChoicePrompt
            title={narrative.choices.title ?? "Choose"}
            choices={narrative.choices.options}
            selectedId={narrative.choices.selectedId}
            onChoice={(id) => {
              runtime.dispatch({ type: "choice:select", id });
              runtime.dispatch({ type: "choice:clear" });
            }}
          />
        ) : null}
      </div>
      <div
        className={mergeClass(gameUiLayerClass, gameUiModalLayerClass)}
        data-game-ui-layer="modal"
        data-active={Boolean(modal.reward || modal.shop || modal.questLog)}
      >
        {modal.reward ? (
          <RewardReveal
            title={modal.reward.title}
            items={modal.reward.items}
            state={modal.reward.state}
            revealLabel="Reveal"
            claimLabel="Claim"
            onReveal={() =>
              runtime.dispatch({ type: "reward-reveal:update", payload: { id: modal.reward!.id, state: "revealed" } })
            }
            onClaim={() => {
              runtime.dispatch({ type: "reward-reveal:clear" });
              runtime.notify({ title: "Loot claimed", message: "Reward moved to inventory.", variant: "loot" });
            }}
          />
        ) : null}
        {modal.shop ? (
          <ShopPanel
            title={modal.shop.title}
            items={modal.shop.items.map((item) => ({
              ...item,
              price: item.price ?? item.value ?? "0",
            }))}
            currencies={modal.shop.currencies}
            selectedId={modal.shop.selectedId}
            onItemSelect={(id) => runtime.dispatch({ type: "shop:item:select", id })}
            onPurchase={(id) => {
              runtime.notify({ title: "Purchased", message: `Bought ${id}`, variant: "success" });
              runtime.dispatch({ type: "shop:close" });
            }}
          />
        ) : null}
        {modal.inventory ? (
          <InventoryGrid
            label={modal.inventory.title ?? "Inventory"}
            slots={modal.inventory.slots}
            selectedId={modal.inventory.selectedId}
            onSlotSelect={(id) => runtime.dispatch({ type: "inventory:select", id })}
          />
        ) : null}
        {modal.questLog ? (
          <QuestLog
            title={modal.questLog.title}
            quests={modal.questLog.quests}
            activeId={modal.questLog.activeId}
            onActiveChange={(id) => runtime.dispatch({ type: "quest-log:activate", id })}
          />
        ) : null}
      </div>
      <div className={mergeClass(gameUiLayerClass, gameUiDebugLayerClass)} data-game-ui-layer="debug" />
    </div>
  );
}

function RuntimeToast({ toast }: { toast: ToastEventRecord }) {
  const runtime = useGameUiRuntime();

  useEffect(() => {
    const durationMs = toast.durationMs ?? 3200;
    if (durationMs <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      runtime.dismiss(toast.id);
    }, durationMs);

    return () => window.clearTimeout(timer);
  }, [runtime, toast.durationMs, toast.id]);

  return (
    <FloatingToast
      title={toast.title}
      message={toast.message}
      variant={toast.variant}
      icon={toast.icon}
      closable={toast.closable ?? true}
      onClose={() => runtime.dismiss(toast.id)}
    />
  );
}
