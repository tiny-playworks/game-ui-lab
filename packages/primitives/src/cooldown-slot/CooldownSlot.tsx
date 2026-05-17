import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface CooldownSlotProps {
  progress: number;
  label: string;
  icon?: ReactNode;
  ready?: boolean;
  disabled?: boolean;
  className?: string;
}

function clampProgress(progress: number) {
  return Math.min(1, Math.max(0, progress));
}

export function CooldownSlot({
  progress,
  label,
  icon,
  ready = progress >= 1,
  disabled = false,
  className,
}: CooldownSlotProps) {
  const clampedProgress = clampProgress(progress);
  const percent = Math.round(clampedProgress * 100);
  const ariaLabel = disabled ? `${label} disabled` : ready ? `${label} ready` : `${label} cooldown ${percent}%`;

  return (
    <div
      className={['game-ui-cooldown-slot', className].filter(Boolean).join(' ')}
      data-ready={ready}
      data-disabled={disabled}
      role="status"
      aria-label={ariaLabel}
      style={{ '--game-ui-cooldown-progress': `${100 - percent}%` } as CSSProperties}
    >
      <span className="game-ui-cooldown-slot__icon" aria-hidden="true">
        {icon ?? label.slice(0, 1)}
      </span>
      <span className="game-ui-cooldown-slot__mask" aria-hidden="true" />
      <span className="game-ui-cooldown-slot__label">{label}</span>
    </div>
  );
}
