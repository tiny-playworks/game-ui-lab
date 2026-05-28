import React from 'react';
import type { CSSProperties } from 'react';
import type { MapMarkerTone } from '../map-marker/MapMarker';
import {
  compassBarClass,
  compassBarHeadingClass,
  compassBarMarkerRecipe,
  compassBarTrackClass,
  mergeClass,
} from '../styles';

export interface CompassMarker {
  id: string;
  label: string;
  heading: number;
  tone?: MapMarkerTone;
}

export interface CompassBarProps {
  heading: number;
  markers?: CompassMarker[];
  range?: number;
  label?: string;
  className?: string;
}

const emptyMarkers: CompassMarker[] = [];

function headingLabel(heading: number) {
  const normalized = ((Math.round(heading) % 360) + 360) % 360;
  return `${normalized}deg`;
}

function shortestHeadingDelta(target: number, current: number) {
  return ((((target - current) % 360) + 540) % 360) - 180;
}

function markerPosition(target: number, current: number, range: number) {
  const safeRange = Math.max(1, range);
  const delta = shortestHeadingDelta(target, current);
  return `${Math.min(100, Math.max(0, 50 + (delta / safeRange) * 100))}%`;
}

export function CompassBar({ heading, markers = emptyMarkers, range = 120, label = 'Compass', className }: CompassBarProps) {
  return (
    <output className={mergeClass(compassBarClass, className)} aria-label={`${label} ${headingLabel(heading)}`}>
      <span className={compassBarHeadingClass}>{headingLabel(heading)}</span>
      <span className={compassBarTrackClass}>
        {markers.map((marker) => (
          <span
            key={marker.id}
            className={compassBarMarkerRecipe({ tone: marker.tone ?? 'neutral' })}
            data-tone={marker.tone ?? 'neutral'}
            style={{ '--game-ui-compass-position': markerPosition(marker.heading, heading, range) } as CSSProperties}
          >
            {marker.label}
          </span>
        ))}
      </span>
    </output>
  );
}
