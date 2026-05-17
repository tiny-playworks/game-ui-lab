import React from 'react';
import type { CSSProperties } from 'react';

export type ResourceMeterKind = 'mana' | 'energy' | 'stamina';

export interface ResourceMeterProps {
  value: number;
  max: number;
  kind: ResourceMeterKind;
  label?: string;
  className?: string;
}

const defaultLabels: Record<ResourceMeterKind, string> = {
  mana: 'Mana',
  energy: 'Energy',
  stamina: 'Stamina',
};

function clampRatio(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, value / max));
}

function formatAmount(value: number) {
  return Math.round(value).toString();
}

export function ResourceMeter({
  value,
  max,
  kind,
  label = defaultLabels[kind],
  className,
}: ResourceMeterProps) {
  const ratio = clampRatio(value, max);

  return (
    <div
      className={['game-ui-resource-meter', className].filter(Boolean).join(' ')}
      data-kind={kind}
      role="status"
      aria-label={`${label} ${formatAmount(value)} of ${formatAmount(max)}`}
      style={{ '--game-ui-resource-ratio': `${ratio * 100}%` } as CSSProperties}
    >
      <span className="game-ui-resource-meter__label">{label}</span>
      <span className="game-ui-resource-meter__track" aria-hidden="true">
        <span className="game-ui-resource-meter__fill" />
      </span>
      <span className="game-ui-resource-meter__value">
        {formatAmount(value)} / {formatAmount(max)}
      </span>
    </div>
  );
}
