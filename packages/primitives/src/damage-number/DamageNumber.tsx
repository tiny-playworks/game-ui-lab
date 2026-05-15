import { motion, type Transition } from 'motion/react';
import React from 'react';
import type { CSSProperties } from 'react';

export type DamageNumberVariant = 'damage' | 'heal' | 'critical' | 'miss';

export interface DamageNumberProps {
  value: number | string;
  variant?: DamageNumberVariant;
  prefix?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const transitions: Record<DamageNumberVariant, Transition> = {
  damage: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  heal: { duration: 0.82, ease: [0.16, 1, 0.3, 1] },
  critical: { duration: 0.86, ease: [0.16, 1, 0.3, 1] },
  miss: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
};

export function DamageNumber({
  value,
  variant = 'damage',
  prefix,
  size,
  className,
  style,
}: DamageNumberProps) {
  const isCritical = variant === 'critical';

  return (
    <motion.span
      className={['game-ui-damage-number', className].filter(Boolean).join(' ')}
      data-variant={variant}
      style={{ ...style, '--game-ui-damage-size': size ? `${size}px` : undefined } as CSSProperties}
      initial={{ opacity: 0, y: 18, scale: isCritical ? 0.62 : 0.84, rotate: isCritical ? -5 : 0 }}
      animate={{ opacity: [0, 1, 1, 0], y: [18, -8, -28, -44], scale: isCritical ? [0.62, 1.32, 1, 0.92] : [0.84, 1.05, 1, 0.92] }}
      transition={transitions[variant]}
      role="status"
      aria-label={`${variant} ${value}`}
    >
      {prefix ? <span className="game-ui-damage-number__prefix">{prefix}</span> : null}
      {value}
    </motion.span>
  );
}
