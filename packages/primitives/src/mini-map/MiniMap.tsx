import React from 'react';
import { MapMarker } from '../map-marker';
import type { MapMarkerProps } from '../map-marker';

export interface MiniMapMarker extends MapMarkerProps {
  id: string;
}

export interface MiniMapProps {
  markers: MiniMapMarker[];
  label?: string;
  className?: string;
}

export function MiniMap({ markers, label = 'Mini map', className }: MiniMapProps) {
  return (
    <section className={['game-ui-mini-map', className].filter(Boolean).join(' ')} role="img" aria-label={`${label} with ${markers.length} markers`}>
      <span className="game-ui-mini-map__grid" aria-hidden="true" />
      {markers.map(({ id, ...marker }) => (
        <MapMarker key={id} {...marker} />
      ))}
      <span className="game-ui-mini-map__label">{label}</span>
    </section>
  );
}
