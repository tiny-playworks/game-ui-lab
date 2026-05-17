import React from 'react';
import type { ReactNode } from 'react';

export type LootRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface LootCardProps {
  name: string;
  rarity?: LootRarity;
  quantity?: number;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  selected?: boolean;
  className?: string;
}

function formatQuantity(quantity?: number) {
  if (!quantity || quantity <= 1) {
    return null;
  }

  return `x${Math.round(quantity)}`;
}

export function LootCard({
  name,
  rarity = 'common',
  quantity,
  value,
  subtitle,
  icon,
  selected = false,
  className,
}: LootCardProps) {
  const quantityText = formatQuantity(quantity);

  return (
    <article
      className={['game-ui-loot-card', className].filter(Boolean).join(' ')}
      data-rarity={rarity}
      data-selected={selected}
      aria-label={`${name} ${rarity} loot`}
    >
      <span className="game-ui-loot-card__icon" aria-hidden="true">
        {icon ?? name.slice(0, 1)}
      </span>
      <span className="game-ui-loot-card__body">
        <span className="game-ui-loot-card__name">{name}</span>
        {subtitle ? <span className="game-ui-loot-card__subtitle">{subtitle}</span> : null}
      </span>
      <span className="game-ui-loot-card__meta">
        {quantityText ? <span className="game-ui-loot-card__quantity">{quantityText}</span> : null}
        {value ? <span className="game-ui-loot-card__value">{value}</span> : null}
      </span>
    </article>
  );
}
