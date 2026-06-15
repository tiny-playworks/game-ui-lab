import React from "react";
import { LootStack } from "../loot-stack/LootStack";
import type { LootStackItem } from "../loot-stack/LootStack";
import { mergeClass } from "../styles";
import {
  rewardRevealActionClass,
  rewardRevealHeaderClass,
  rewardRevealRecipe,
  rewardRevealStateClass,
  rewardRevealTitleClass,
} from "./styles";

export type RewardRevealState = "sealed" | "revealed" | "claimed";

export interface RewardRevealProps {
  title: string;
  items: LootStackItem[];
  state?: RewardRevealState;
  actionLabel?: string;
  onAction?: () => void;
  revealLabel?: string;
  claimLabel?: string;
  onReveal?: () => void;
  onClaim?: () => void;
  className?: string;
}

const stateLabels: Record<RewardRevealState, string> = {
  sealed: "Sealed",
  revealed: "Revealed",
  claimed: "Claimed",
};

function pluralizeItems(count: number) {
  return count === 1 ? "1 item" : `${count} items`;
}

export function RewardReveal({
  title,
  items,
  state = "sealed",
  actionLabel,
  onAction,
  revealLabel = "Reveal",
  claimLabel = "Claim",
  onReveal,
  onClaim,
  className,
}: RewardRevealProps) {
  const derivedActionLabel =
    actionLabel ?? (state === "sealed" ? revealLabel : state === "revealed" ? claimLabel : undefined);
  const derivedAction = onAction ?? (state === "sealed" ? onReveal : state === "revealed" ? onClaim : undefined);
  const shouldRenderAction =
    state !== "claimed" && Boolean(derivedActionLabel) && (Boolean(actionLabel) || Boolean(derivedAction));

  return (
    <section
      className={mergeClass(rewardRevealRecipe({ state }), className)}
      data-state={state}
      role="status"
      aria-label={`${title} ${state} reward with ${pluralizeItems(items.length)}`}
    >
      <div className={rewardRevealHeaderClass}>
        <span className={rewardRevealStateClass}>{stateLabels[state]}</span>
        <strong className={rewardRevealTitleClass}>{title}</strong>
      </div>
      <LootStack items={items} label="Reward contents" limit={3} />
      {shouldRenderAction ? (
        <button className={rewardRevealActionClass} type="button" onClick={derivedAction}>
          {derivedActionLabel}
        </button>
      ) : null}
    </section>
  );
}
