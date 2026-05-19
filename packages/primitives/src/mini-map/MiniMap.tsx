import React from 'react';
import { MapMarker } from '../map-marker';
import type { MapMarkerProps } from '../map-marker';
import { mergeClass, miniMapClass, miniMapGridClass, miniMapLabelClass } from '../styles';

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
    <section className={mergeClass(miniMapClass, className)} role="img" aria-label={`${label} with ${markers.length} markers`}>
      <span className={miniMapGridClass} aria-hidden="true" />
      {markers.map(({ id, ...marker }) => (
        <MapMarker key={id} {...marker} />
      ))}
      <span className={miniMapLabelClass}>{label}</span>
    </section>
  );
}
