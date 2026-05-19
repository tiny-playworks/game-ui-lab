import React from 'react';
import type { CSSProperties } from 'react';
import type { MapMarkerTone } from '../map-marker';
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
  label?: string;
  className?: string;
}

function headingLabel(heading: number) {
  const normalized = ((Math.round(heading) % 360) + 360) % 360;
  return `${normalized}deg`;
}

function markerPosition(heading: number) {
  return `${Math.min(100, Math.max(0, (heading / 360) * 100))}%`;
}

export function CompassBar({ heading, markers = [], label = 'Compass', className }: CompassBarProps) {
  return (
    <div className={mergeClass(compassBarClass, className)} role="status" aria-label={`${label} ${headingLabel(heading)}`}>
      <span className={compassBarHeadingClass}>{headingLabel(heading)}</span>
      <span className={compassBarTrackClass}>
        {markers.map((marker) => (
          <span
            key={marker.id}
            className={compassBarMarkerRecipe({ tone: marker.tone ?? 'neutral' })}
            data-tone={marker.tone ?? 'neutral'}
            style={{ '--game-ui-compass-position': markerPosition(marker.heading) } as CSSProperties}
          >
            {marker.label}
          </span>
        ))}
      </span>
    </div>
  );
}
