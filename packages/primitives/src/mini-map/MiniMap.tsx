import React from 'react';
import type { CSSProperties } from 'react';
import { MapMarker } from '../map-marker/MapMarker';
import type { MapMarkerProps } from '../map-marker/MapMarker';
import { mergeClass, miniMapClass, miniMapGridClass, miniMapLabelClass } from '../styles';
import type { GameUiCollectionRenderer } from '../types';

export interface MiniMapMarker extends MapMarkerProps {
  id: string;
}

export interface MiniMapProps {
  markers: MiniMapMarker[];
  selectedId?: string;
  onMarkerSelect?: (id: string, marker: MiniMapMarker) => void;
  renderMarker?: GameUiCollectionRenderer<MiniMapMarker>;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function MiniMap({
  markers,
  selectedId,
  onMarkerSelect,
  renderMarker,
  label = 'Mini map',
  className,
  style,
}: MiniMapProps) {
  return (
    <section className={mergeClass(miniMapClass, className)} role="img" aria-label={`${label} with ${markers.length} markers`} style={style}>
      <span className={miniMapGridClass} aria-hidden="true" />
      {markers.map(({ id, ...marker }, index) => {
        const item = { id, ...marker };
        const selected = selectedId === id;
        const defaultNode = (
          <MapMarker
            {...marker}
            selected={selected}
            onClick={onMarkerSelect ? () => onMarkerSelect(id, item) : undefined}
          />
        );

        return (
          <React.Fragment key={id}>
            {renderMarker ? renderMarker(item, { index, selected, disabled: false }, defaultNode) : defaultNode}
          </React.Fragment>
        );
      })}
      <span className={miniMapLabelClass}>{label}</span>
    </section>
  );
}
