import React from 'react';
import { HealthBar } from '../health-bar/HealthBar';
import type { HealthBarTone } from '../health-bar/HealthBar';
import { StatusBadge } from '../status-badge/StatusBadge';
import type { StatusBadgeProps } from '../status-badge/StatusBadge';
import {
  mergeClass,
  targetFrameCopyClass,
  targetFrameHeaderClass,
  targetFrameMetaClass,
  targetFrameRecipe,
  targetFrameStatusesClass,
} from '../styles';

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

const emptyStatuses: StatusBadgeProps[] = [];

export function TargetFrame({
  name,
  health,
  maxHealth,
  shield,
  faction = 'enemy',
  level,
  statuses = emptyStatuses,
  className,
}: TargetFrameProps) {
  return (
    <section
      className={mergeClass(targetFrameRecipe({ faction }), className)}
      data-faction={faction}
      role="status"
      aria-label={`${name} ${faction} target`}
    >
      <header className={targetFrameHeaderClass}>
        <span className={targetFrameCopyClass}>
          <strong>{name}</strong>
          {level ? <em className={targetFrameMetaClass}>{level}</em> : null}
        </span>
        <span className={targetFrameMetaClass}>{faction}</span>
      </header>
      <HealthBar value={health} max={maxHealth} shield={shield} tone={healthToneByFaction[faction]} label="Target HP" showValue />
      {statuses.length ? (
        <div className={targetFrameStatusesClass}>
          {statuses.map((status) => (
            <StatusBadge key={status.label} {...status} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
