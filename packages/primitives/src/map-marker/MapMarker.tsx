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
  selected?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

function clampCoordinate(value: number) {
  return `${Math.min(100, Math.max(0, value))}%`;
}

export function MapMarker({
  x,
  y,
  tone = 'neutral',
  label,
  active = false,
  selected = false,
  icon,
  onClick,
  className,
}: MapMarkerProps) {
  const Component = onClick ? 'button' : 'span';
  const componentProps = onClick
    ? {
        type: 'button' as const,
        onClick,
        'aria-pressed': selected,
        'aria-label': label ? `${label} ${tone} marker` : `${tone} marker`,
      }
    : {
        role: 'img',
        'aria-label': label ? `${label} ${tone} marker` : `${tone} marker`,
      };

  return (
    <Component
      className={mergeClass(mapMarkerRecipe({ tone, active: active || selected }), className)}
      data-tone={tone}
      data-active={active}
      data-selected={selected}
      style={{
        '--game-ui-marker-x': clampCoordinate(x),
        '--game-ui-marker-y': clampCoordinate(y),
      } as CSSProperties}
      {...componentProps}
    >
      <span className={mapMarkerDotRecipe({ active: active || selected })} aria-hidden="true">{icon}</span>
      {label ? <span className={mapMarkerLabelClass}>{label}</span> : null}
    </Component>
  );
}
