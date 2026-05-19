import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  cooldownSlotIconClass,
  cooldownSlotLabelClass,
  cooldownSlotMaskClass,
  cooldownSlotRecipe,
  mergeClass,
} from '../styles';

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
      className={mergeClass(cooldownSlotRecipe({ ready, disabled }), className)}
      data-ready={ready}
      data-disabled={disabled}
      role="status"
      aria-label={ariaLabel}
      style={{ '--game-ui-cooldown-progress': `${100 - percent}%` } as CSSProperties}
    >
      <span className={cooldownSlotIconClass} aria-hidden="true">
        {icon ?? label.slice(0, 1)}
      </span>
      <span className={cooldownSlotMaskClass} aria-hidden="true" />
      <span className={cooldownSlotLabelClass}>{label}</span>
    </div>
  );
}
