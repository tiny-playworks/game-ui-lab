import React from 'react';

export type StatusBadgeTone = 'buff' | 'debuff' | 'neutral' | 'warning';

export interface StatusBadgeProps {
  label: string;
  tone: StatusBadgeTone;
  count?: number;
  duration?: string;
  className?: string;
}

export function StatusBadge({
  label,
  tone,
  count,
  duration,
  className,
}: StatusBadgeProps) {
  const stackLabel = count ? ` ${count} stacks` : '';
  const durationLabel = duration ? ` ${duration}` : '';

  return (
    <span
      className={['game-ui-status-badge', className].filter(Boolean).join(' ')}
      data-tone={tone}
      role="status"
      aria-label={`${label} ${tone}${stackLabel}${durationLabel}`}
    >
      <span className="game-ui-status-badge__label">{label}</span>
      {count ? <span className="game-ui-status-badge__count">x{count}</span> : null}
      {duration ? <span className="game-ui-status-badge__duration">{duration}</span> : null}
    </span>
  );
}
