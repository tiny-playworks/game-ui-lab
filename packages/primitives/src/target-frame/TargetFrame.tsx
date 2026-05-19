import React from 'react';
import { HealthBar } from '../health-bar';
import { StatusBadge } from '../status-badge';
import type { HealthBarTone } from '../health-bar';
import type { StatusBadgeProps } from '../status-badge';

export type TargetFaction = 'ally' | 'enemy' | 'neutral' | 'boss';

export interface TargetFrameProps {
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
  faction?: TargetFaction;
  level?: string;
  statuses?: StatusBadgeProps[];
  className?: string;
}

const healthToneByFaction: Record<TargetFaction, HealthBarTone> = {
  ally: 'hero',
  enemy: 'danger',
  neutral: 'hero',
  boss: 'boss',
};

export function TargetFrame({
  name,
  health,
  maxHealth,
  shield,
  faction = 'enemy',
  level,
  statuses = [],
  className,
}: TargetFrameProps) {
  return (
    <section
      className={['game-ui-target-frame', className].filter(Boolean).join(' ')}
      data-faction={faction}
      role="status"
      aria-label={`${name} ${faction} target`}
    >
      <header className="game-ui-target-frame__header">
        <span>
          <strong>{name}</strong>
          {level ? <em>{level}</em> : null}
        </span>
        <span className="game-ui-target-frame__faction">{faction}</span>
      </header>
      <HealthBar value={health} max={maxHealth} shield={shield} tone={healthToneByFaction[faction]} label="Target HP" showValue />
      {statuses.length ? (
        <div className="game-ui-target-frame__statuses">
          {statuses.map((status) => (
            <StatusBadge key={status.label} {...status} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
