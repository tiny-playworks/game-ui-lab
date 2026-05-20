import React from 'react';
import { MapMarker } from '../map-marker';
import type { MapMarkerProps } from '../map-marker';
import { mergeClass, miniMapClass, miniMapGridClass, miniMapLabelClass } from '../styles';

export interface MiniMapMarker extends MapMarkerProps {
  id: string;
}

export interface MiniMapProps {
  markers: MiniMapMarker[];
  selectedId?: string;
  onMarkerSelect?: (id: string, marker: MiniMapMarker) => void;
  label?: string;
  className?: string;
}

export function MiniMap({
  markers,
  selectedId,
  onMarkerSelect,
  label = 'Mini map',
  className,
}: MiniMapProps) {
  return (
    <section className={mergeClass(miniMapClass, className)} role="img" aria-label={`${label} with ${markers.length} markers`}>
      <span className={miniMapGridClass} aria-hidden="true" />
      {markers.map(({ id, ...marker }) => {
        const item = { id, ...marker };

        return (
          <MapMarker
            key={id}
            {...marker}
            selected={selectedId === id}
            onClick={onMarkerSelect ? () => onMarkerSelect(id, item) : undefined}
          />
        );
      })}
      <span className={miniMapLabelClass}>{label}</span>
    </section>
  );
}
