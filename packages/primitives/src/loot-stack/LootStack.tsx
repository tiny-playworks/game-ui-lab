import React from 'react';
import type { ReactNode } from 'react';
import { LootCard } from '../loot-card';
import type { LootRarity } from '../loot-card';
import {
  lootStackClass,
  lootStackItemClass,
  lootStackLabelClass,
  lootStackListClass,
  lootStackOverflowClass,
  lootStackToplineClass,
  mergeClass,
} from '../styles';

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
  selectedId?: string;
  onItemSelect?: (id: string, item: LootStackItem) => void;
  label?: string;
  limit?: number;
  className?: string;
}

function pluralizeItems(count: number) {
  return count === 1 ? '1 item' : `${count} items`;
}

export function LootStack({
  items,
  selectedId,
  onItemSelect,
  label = 'Loot stack',
  limit = 4,
  className,
}: LootStackProps) {
  const visibleLimit = Math.max(0, Math.floor(limit));
  const visibleItems = items.slice(0, visibleLimit);
  const overflow = Math.max(0, items.length - visibleItems.length);
  const ariaLabel = `${label} ${pluralizeItems(items.length)}`;

  return (
    <div className={mergeClass(lootStackClass, className)}>
      <div className={lootStackToplineClass}>
        <span className={lootStackLabelClass}>{label}</span>
        <span className={lootStackLabelClass}>{pluralizeItems(items.length)}</span>
      </div>
      <ul className={lootStackListClass} aria-label={ariaLabel} data-overflow={overflow}>
        {visibleItems.map((item) => (
          <li key={item.id} className={lootStackItemClass}>
            <LootCard
              name={item.name}
              rarity={item.rarity}
              quantity={item.quantity}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              selected={selectedId === item.id}
              onClick={onItemSelect ? () => onItemSelect(item.id, item) : undefined}
            />
          </li>
        ))}
        {overflow > 0 ? (
          <li className={lootStackOverflowClass}>
            <span>+{overflow} more</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
