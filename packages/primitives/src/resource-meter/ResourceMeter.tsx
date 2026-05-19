import React from 'react';
import type { CSSProperties } from 'react';
import {
  mergeClass,
  resourceMeterFillClass,
  resourceMeterLabelClass,
  resourceMeterRecipe,
  resourceMeterTrackClass,
  resourceMeterValueClass,
} from '../styles';

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
      className={mergeClass(resourceMeterRecipe({ kind }), className)}
      data-kind={kind}
      role="status"
      aria-label={`${label} ${formatAmount(value)} of ${formatAmount(max)}`}
      style={{ '--game-ui-resource-ratio': `${ratio * 100}%` } as CSSProperties}
    >
      <span className={resourceMeterLabelClass}>{label}</span>
      <span className={resourceMeterTrackClass} aria-hidden="true">
        <span className={resourceMeterFillClass} />
      </span>
      <span className={resourceMeterValueClass}>
        {formatAmount(value)} / {formatAmount(max)}
      </span>
    </div>
  );
}
