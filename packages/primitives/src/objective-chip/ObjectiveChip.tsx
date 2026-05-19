import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type ObjectiveState = 'active' | 'complete' | 'locked';

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
  if (typeof progress !== 'number' || typeof max !== 'number' || max <= 0) {
    return null;
  }

  return `${Math.round(progress)} / ${Math.round(max)}`;
}

function getProgressRatio(progress?: number, max?: number) {
  if (typeof progress !== 'number' || typeof max !== 'number' || max <= 0) {
    return null;
  }

  return `${Math.min(100, Math.max(0, (progress / max) * 100))}%`;
}

function getStateIcon(state: ObjectiveState) {
  if (state === 'complete') {
    return 'OK';
  }

  if (state === 'locked') {
    return 'L';
  }

  return '>';
}

export function ObjectiveChip({
  label,
  state = 'active',
  progress,
  max,
  icon,
  meta,
  className,
}: ObjectiveChipProps) {
  const progressText = getProgressText(progress, max);
  const progressRatio = getProgressRatio(progress, max);
  const ariaLabel = [label, state, progressText].filter(Boolean).join(' ');

  return (
    <article
      className={['game-ui-objective-chip', className].filter(Boolean).join(' ')}
      data-state={state}
      role="status"
      aria-label={ariaLabel}
      style={progressRatio ? ({ '--game-ui-objective-progress': progressRatio } as CSSProperties) : undefined}
    >
      <span className="game-ui-objective-chip__icon" aria-hidden="true">
        {icon ?? getStateIcon(state)}
      </span>
      <span className="game-ui-objective-chip__body">
        <strong className="game-ui-objective-chip__label">{label}</strong>
        {meta ? <span className="game-ui-objective-chip__meta">{meta}</span> : null}
      </span>
      {progressText ? (
        <span className="game-ui-objective-chip__progress">
          <span className="game-ui-objective-chip__progress-text">{progressText}</span>
          <span className="game-ui-objective-chip__track" aria-hidden="true">
            <span className="game-ui-objective-chip__fill" />
          </span>
        </span>
      ) : null}
    </article>
  );
}
