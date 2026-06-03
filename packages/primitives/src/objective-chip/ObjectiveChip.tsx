import React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  mergeClass,
  objectiveChipBodyClass,
  objectiveChipFillClass,
  objectiveChipIconClass,
  objectiveChipLabelClass,
  objectiveChipMetaClass,
  objectiveChipProgressClass,
  objectiveChipProgressTextClass,
  objectiveChipRecipe,
  objectiveChipTrackClass,
} from "../styles";

export type ObjectiveState = "active" | "complete" | "locked";

export interface ObjectiveChipProps {
  label: string;
  state?: ObjectiveState;
  progress?: number;
  max?: number;
  icon?: ReactNode;
  meta?: ReactNode;
  className?: string;
}

function getProgressText(progress?: number, max?: number) {
  if (typeof progress !== "number" || typeof max !== "number" || max <= 0) {
    return null;
  }

  return `${Math.round(progress)} / ${Math.round(max)}`;
}

function getProgressRatio(progress?: number, max?: number) {
  if (typeof progress !== "number" || typeof max !== "number" || max <= 0) {
    return null;
  }

  return `${Math.min(100, Math.max(0, (progress / max) * 100))}%`;
}

function getStateIcon(state: ObjectiveState) {
  if (state === "complete") {
    return "OK";
  }

  if (state === "locked") {
    return "L";
  }

  return ">";
}

export function ObjectiveChip({ label, state = "active", progress, max, icon, meta, className }: ObjectiveChipProps) {
  const progressText = getProgressText(progress, max);
  const progressRatio = getProgressRatio(progress, max);
  const ariaLabel = [label, state, progressText].filter(Boolean).join(" ");

  return (
    <article
      className={mergeClass(objectiveChipRecipe({ state }), className)}
      data-state={state}
      role="status"
      aria-label={ariaLabel}
      style={progressRatio ? ({ "--game-ui-objective-progress": progressRatio } as CSSProperties) : undefined}
    >
      <span className={objectiveChipIconClass} aria-hidden="true">
        {icon ?? getStateIcon(state)}
      </span>
      <span className={objectiveChipBodyClass}>
        <strong className={objectiveChipLabelClass}>{label}</strong>
        {meta ? <span className={objectiveChipMetaClass}>{meta}</span> : null}
      </span>
      {progressText ? (
        <span className={objectiveChipProgressClass}>
          <span className={objectiveChipProgressTextClass}>{progressText}</span>
          <span className={objectiveChipTrackClass} aria-hidden="true">
            <span className={objectiveChipFillClass} />
          </span>
        </span>
      ) : null}
    </article>
  );
}
