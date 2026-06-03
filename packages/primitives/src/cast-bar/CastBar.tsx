import React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  castBarFillClass,
  castBarRecipe,
  castBarToplineClass,
  castBarToplineStrongClass,
  castBarTrackClass,
  mergeClass,
} from "../styles";

export type CastBarState = "casting" | "channeling" | "complete" | "interrupted";

export interface CastBarProps {
  label: string;
  progress: number;
  state?: CastBarState;
  meta?: ReactNode;
  className?: string;
}

function clampPercent(progress: number) {
  return `${Math.min(100, Math.max(0, progress * 100))}%`;
}

export function CastBar({ label, progress, state = "casting", meta, className }: CastBarProps) {
  const percent = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  return (
    <output
      className={mergeClass(castBarRecipe({ state }), className)}
      data-state={state}
      aria-label={`${label} ${state} ${percent}%`}
      style={{ "--game-ui-cast-progress": clampPercent(progress) } as CSSProperties}
    >
      <span className={castBarToplineClass}>
        <strong className={castBarToplineStrongClass}>{label}</strong>
        <span>{meta ?? `${percent}%`}</span>
      </span>
      <span className={castBarTrackClass} aria-hidden="true">
        <span className={castBarFillClass} />
      </span>
    </output>
  );
}
