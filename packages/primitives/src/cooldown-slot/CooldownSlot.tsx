import React from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  cooldownSlotIconClass,
  cooldownSlotLabelClass,
  cooldownSlotMaskClass,
  cooldownSlotRecipe,
  mergeClass,
} from "../styles";

export interface CooldownSlotProps {
  progress: number;
  label: string;
  icon?: ReactNode;
  ready?: boolean;
  disabled?: boolean;
  selected?: boolean;
  shortcut?: ReactNode;
  charges?: number;
  cooldownLabel?: ReactNode;
  onClick?: () => void;
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
  selected = false,
  shortcut,
  charges,
  cooldownLabel,
  onClick,
  className,
}: CooldownSlotProps) {
  const clampedProgress = clampProgress(progress);
  const percent = Math.round(clampedProgress * 100);
  const ariaLabel = disabled ? `${label} disabled` : ready ? `${label} ready` : `${label} cooldown ${percent}%`;
  const Component = onClick ? "button" : "div";
  const componentProps = onClick
    ? {
        type: "button" as const,
        disabled,
        onClick,
        "aria-label": ariaLabel,
        "aria-pressed": selected,
      }
    : {
        role: "status",
        "aria-label": ariaLabel,
      };

  return (
    <Component
      className={mergeClass(cooldownSlotRecipe({ ready, disabled, selected }), className)}
      data-ready={ready}
      data-disabled={disabled}
      data-selected={selected}
      style={{ "--game-ui-cooldown-progress": `${100 - percent}%` } as CSSProperties}
      {...componentProps}
    >
      <span className={cooldownSlotIconClass} aria-hidden="true">
        {icon ?? label.slice(0, 1)}
        <span className={cooldownSlotMaskClass} data-game-ui-slot="cooldown-mask" />
      </span>
      <span className={cooldownSlotLabelClass}>{label}</span>
      {shortcut ? <span className={cooldownSlotLabelClass}>{shortcut}</span> : null}
      {typeof charges === "number" ? <span className={cooldownSlotLabelClass}>x{charges}</span> : null}
      {cooldownLabel ? <span className={cooldownSlotLabelClass}>{cooldownLabel}</span> : null}
    </Component>
  );
}
