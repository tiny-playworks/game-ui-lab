import React from 'react';
import type { CSSProperties } from 'react';

export type HealthBarTone = 'hero' | 'danger' | 'boss';

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
  label = 'Health',
  tone = 'hero',
  showValue = false,
  className,
}: HealthBarProps) {
  const healthRatio = clampRatio(value, max);
  const shieldRatio = clampRatio(shield, max);
  const hasShield = shield > 0;
  const isEmpty = value <= 0;
  const isFull = max > 0 && value >= max;
  const ariaLabel = `${label} ${formatAmount(value)} of ${formatAmount(max)}${hasShield ? ` plus ${formatAmount(shield)} shield` : ''}`;

  return (
    <div
      className={['game-ui-health-bar', className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-empty={isEmpty}
      data-full={isFull}
      data-shielded={hasShield}
      role="status"
      aria-label={ariaLabel}
      style={{
        '--game-ui-health-ratio': `${healthRatio * 100}%`,
        '--game-ui-shield-ratio': `${shieldRatio * 100}%`,
      } as CSSProperties}
    >
      <span className="game-ui-health-bar__topline">
        <span className="game-ui-health-bar__label">{label}</span>
        {showValue ? (
          <span className="game-ui-health-bar__value">
            {formatAmount(value)} / {formatAmount(max)}
          </span>
        ) : null}
      </span>
      <span className="game-ui-health-bar__track" aria-hidden="true">
        <span className="game-ui-health-bar__fill" />
        {hasShield ? <span className="game-ui-health-bar__shield" /> : null}
      </span>
      {hasShield ? <span className="game-ui-health-bar__shield-value">+{formatAmount(shield)}</span> : null}
    </div>
  );
}
