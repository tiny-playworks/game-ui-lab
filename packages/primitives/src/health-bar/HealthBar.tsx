import React from "react";
import type { CSSProperties } from "react";
import {
  healthBarFillClass,
  healthBarLabelClass,
  healthBarRecipe,
  healthBarShieldClass,
  healthBarShieldValueClass,
  healthBarToplineClass,
  healthBarTrackClass,
  healthBarValueClass,
  mergeClass,
} from "../styles";

export type HealthBarTone = "hero" | "danger" | "boss";

export interface HealthBarProps {
  value: number;
  max: number;
  shield?: number;
  label?: string;
  tone?: HealthBarTone;
  showValue?: boolean;
  className?: string;
}

function clampRatio(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }

  return Math.min(1, Math.max(0, value / max));
}

function formatAmount(value: number) {
  return Math.round(value).toString();
}

export function HealthBar({
  value,
  max,
  shield = 0,
  label = "Health",
  tone = "hero",
  showValue = false,
  className,
}: HealthBarProps) {
  const healthRatio = clampRatio(value, max);
  const shieldRatio = clampRatio(shield, max);
  const hasShield = shield > 0;
  const isEmpty = value <= 0;
  const isFull = max > 0 && value >= max;
  const ariaLabel = `${label} ${formatAmount(value)} of ${formatAmount(max)}${hasShield ? ` plus ${formatAmount(shield)} shield` : ""}`;

  return (
    <output
      className={mergeClass(healthBarRecipe({ tone, empty: isEmpty }), className)}
      data-tone={tone}
      data-empty={isEmpty}
      data-full={isFull}
      data-shielded={hasShield}
      aria-label={ariaLabel}
      style={
        {
          "--game-ui-health-ratio": `${healthRatio * 100}%`,
          "--game-ui-shield-ratio": `${shieldRatio * 100}%`,
        } as CSSProperties
      }
    >
      <span className={healthBarToplineClass}>
        <span className={healthBarLabelClass}>{label}</span>
        {showValue ? (
          <span className={healthBarValueClass}>
            {formatAmount(value)} / {formatAmount(max)}
          </span>
        ) : null}
      </span>
      <span className={healthBarTrackClass} aria-hidden="true">
        <span className={healthBarFillClass} />
        {hasShield ? <span className={healthBarShieldClass} /> : null}
      </span>
      {hasShield ? <span className={healthBarShieldValueClass}>+{formatAmount(shield)}</span> : null}
    </output>
  );
}
