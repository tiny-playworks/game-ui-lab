import React from 'react';
import type { ReactNode } from 'react';
import { LootStack } from '../loot-stack';
import type { LootStackItem } from '../loot-stack';

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
      className={['game-ui-reward-reveal', className].filter(Boolean).join(' ')}
      data-state={state}
      role="status"
      aria-label={`${title} ${state} reward with ${pluralizeItems(items.length)}`}
    >
      <div className="game-ui-reward-reveal__header">
        <span className="game-ui-reward-reveal__state">{stateLabels[state]}</span>
        <strong className="game-ui-reward-reveal__title">{title}</strong>
      </div>
      <LootStack items={items} label="Reward contents" limit={3} />
      {canAct ? (
        <button className="game-ui-reward-reveal__action" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
