import React from 'react';
import { LootStack } from '../loot-stack';
import type { LootStackItem } from '../loot-stack';
import {
  mergeClass,
  rewardRevealActionClass,
  rewardRevealHeaderClass,
  rewardRevealRecipe,
  rewardRevealStateClass,
  rewardRevealTitleClass,
} from '../styles';

export type RewardRevealState = 'sealed' | 'revealed' | 'claimed';

export interface RewardRevealProps {
  title: string;
  items: LootStackItem[];
  state?: RewardRevealState;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const stateLabels: Record<RewardRevealState, string> = {
  sealed: 'Sealed',
  revealed: 'Revealed',
  claimed: 'Claimed',
};

function pluralizeItems(count: number) {
  return count === 1 ? '1 item' : `${count} items`;
}

export function RewardReveal({
  title,
  items,
  state = 'sealed',
  actionLabel,
  onAction,
  className,
}: RewardRevealProps) {
  const canAct = Boolean(actionLabel) && state !== 'claimed';

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
      {canAct ? (
        <button className={rewardRevealActionClass} type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
