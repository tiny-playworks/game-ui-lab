import React from 'react';
import type { ReactNode } from 'react';
import { LootCard } from '../loot-card';
import type { LootRarity } from '../loot-card';

export interface LootStackItem {
  id: string;
  name: string;
  rarity?: LootRarity;
  quantity?: number;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
}

export interface LootStackProps {
  items: LootStackItem[];
  label?: string;
  limit?: number;
  className?: string;
}

function pluralizeItems(count: number) {
  return count === 1 ? '1 item' : `${count} items`;
}

export function LootStack({ items, label = 'Loot stack', limit = 4, className }: LootStackProps) {
  const visibleLimit = Math.max(0, Math.floor(limit));
  const visibleItems = items.slice(0, visibleLimit);
  const overflow = Math.max(0, items.length - visibleItems.length);
  const ariaLabel = `${label} ${pluralizeItems(items.length)}`;

  return (
    <div className={['game-ui-loot-stack', className].filter(Boolean).join(' ')}>
      <div className="game-ui-loot-stack__topline">
        <span className="game-ui-loot-stack__label">{label}</span>
        <span className="game-ui-loot-stack__count">{pluralizeItems(items.length)}</span>
      </div>
      <ul className="game-ui-loot-stack__list" aria-label={ariaLabel} data-overflow={overflow}>
        {visibleItems.map((item) => (
          <li key={item.id} className="game-ui-loot-stack__item">
            <LootCard
              name={item.name}
              rarity={item.rarity}
              quantity={item.quantity}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          </li>
        ))}
        {overflow > 0 ? (
          <li className="game-ui-loot-stack__overflow">
            <span>+{overflow} more</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
