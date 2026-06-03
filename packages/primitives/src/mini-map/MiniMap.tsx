import React from "react";
import type { CSSProperties } from "react";
import { MapMarker } from "../map-marker/MapMarker";
import type { MapMarkerProps } from "../map-marker/MapMarker";
import {
  mergeClass,
  miniMapClass,
  miniMapGridClass,
  miniMapLabelClass,
  miniMapPathClass,
  miniMapPlayerClass,
  miniMapScanClass,
  miniMapZoneClass,
  miniMapZoomClass,
} from "../styles";
import type { GameUiCollectionRenderer } from "../types";

export interface MiniMapMarker extends MapMarkerProps {
  id: string;
}

export interface MiniMapPoint {
  x: number;
  y: number;
}

export interface MiniMapPath {
  id: string;
  points: MiniMapPoint[];
  label?: string;
}

export interface MiniMapZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone?: "safe" | "danger" | "objective";
  label?: string;
}

export interface MiniMapProps {
  markers: MiniMapMarker[];
  paths?: MiniMapPath[];
  zones?: MiniMapZone[];
  selectedId?: string;
  scanRadius?: number;
  playerHeading?: number;
  zoomLabel?: string;
  onMarkerSelect?: (id: string, marker: MiniMapMarker) => void;
  renderMarker?: GameUiCollectionRenderer<MiniMapMarker>;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function MiniMap({
  markers,
  paths = [],
  zones = [],
  selectedId,
  scanRadius,
  playerHeading,
  zoomLabel,
  onMarkerSelect,
  renderMarker,
  label = "Mini map",
  className,
  style,
}: MiniMapProps) {
  return (
    <section
      className={mergeClass(miniMapClass, className)}
      role="img"
      aria-label={`${label} with ${markers.length} markers`}
      style={style}
    >
      <span className={miniMapGridClass} aria-hidden="true" />
      {zones.map((zone) => (
        <span
          key={zone.id}
          className={miniMapZoneClass}
          data-game-ui-map-zone={zone.id}
          data-tone={zone.tone ?? "safe"}
          style={
            {
              "--game-ui-zone-x": `${zone.x}%`,
              "--game-ui-zone-y": `${zone.y}%`,
              "--game-ui-zone-width": `${zone.width}%`,
              "--game-ui-zone-height": `${zone.height}%`,
            } as CSSProperties
          }
        >
          {zone.label}
        </span>
      ))}
      {paths.map((path) => (
        <span
          key={path.id}
          className={miniMapPathClass}
          data-game-ui-map-path={path.id}
          data-point-count={path.points.length}
        >
          {path.label}
        </span>
      ))}
      {typeof scanRadius === "number" ? (
        <span
          className={miniMapScanClass}
          data-scan-radius={scanRadius}
          style={{ "--game-ui-scan-radius": `${scanRadius}%` } as CSSProperties}
          aria-hidden="true"
        />
      ) : null}
      {typeof playerHeading === "number" ? (
        <span
          className={miniMapPlayerClass}
          data-player-heading={playerHeading}
          style={{ "--game-ui-player-heading": `${playerHeading}deg` } as CSSProperties}
          aria-hidden="true"
        />
      ) : null}
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
      {zoomLabel ? <span className={miniMapZoomClass}>{zoomLabel}</span> : null}
      <span className={miniMapLabelClass}>{label}</span>
    </section>
  );
}
