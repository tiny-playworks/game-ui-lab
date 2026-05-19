import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  mapMarkerDotRecipe,
  mapMarkerLabelClass,
  mapMarkerRecipe,
  mergeClass,
} from '../styles';

export type MapMarkerTone = 'ally' | 'enemy' | 'objective' | 'neutral';

export interface MapMarkerProps {
  x: number;
  y: number;
  tone?: MapMarkerTone;
  label?: string;
  active?: boolean;
  icon?: ReactNode;
  className?: string;
}

function clampCoordinate(value: number) {
  return `${Math.min(100, Math.max(0, value))}%`;
}

export function MapMarker({ x, y, tone = 'neutral', label, active = false, icon, className }: MapMarkerProps) {
  return (
    <span
      className={mergeClass(mapMarkerRecipe({ tone, active }), className)}
      data-tone={tone}
      data-active={active}
      role="img"
      aria-label={label ? `${label} ${tone} marker` : `${tone} marker`}
      style={{
        '--game-ui-marker-x': clampCoordinate(x),
        '--game-ui-marker-y': clampCoordinate(y),
      } as CSSProperties}
    >
      <span className={mapMarkerDotRecipe({ active })} aria-hidden="true">{icon}</span>
      {label ? <span className={mapMarkerLabelClass}>{label}</span> : null}
    </span>
  );
}
