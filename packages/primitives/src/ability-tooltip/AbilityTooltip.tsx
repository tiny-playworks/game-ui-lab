import React from 'react';
import type { ReactNode } from 'react';

export type AbilityTooltipState = 'ready' | 'cooling' | 'locked';

export interface AbilityTooltipProps {
  name: string;
  description: ReactNode;
  cost?: ReactNode;
  cooldown?: ReactNode;
  state?: AbilityTooltipState;
  kind?: string;
  className?: string;
}

export function AbilityTooltip({
  name,
  description,
  cost,
  cooldown,
  state = 'ready',
  kind = 'Ability',
  className,
}: AbilityTooltipProps) {
  return (
    <article
      className={['game-ui-ability-tooltip', className].filter(Boolean).join(' ')}
      data-state={state}
      role="tooltip"
      aria-label={`${name} ${state}`}
    >
      <span className="game-ui-ability-tooltip__kind">{kind}</span>
      <strong className="game-ui-ability-tooltip__name">{name}</strong>
      <span className="game-ui-ability-tooltip__description">{description}</span>
      <span className="game-ui-ability-tooltip__meta">
        {cost ? <span>Cost {cost}</span> : null}
        {cooldown ? <span>Cooldown {cooldown}</span> : null}
      </span>
    </article>
  );
}
