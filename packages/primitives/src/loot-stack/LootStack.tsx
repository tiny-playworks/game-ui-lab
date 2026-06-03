import React from "react";
import type { CSSProperties, ReactNode } from "react";
import { LootCard } from "../loot-card/LootCard";
import type { LootRarity } from "../loot-card/LootCard";
import {
  lootStackClass,
  lootStackItemClass,
  lootStackLabelClass,
  lootStackListClass,
  lootStackOverflowClass,
  lootStackToplineClass,
  mergeClass,
} from "../styles";
import type { GameUiCollectionRenderer } from "../types";

export interface LootStackItem {
  id: string;
  name: string;
  rarity?: LootRarity;
  quantity?: number;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export interface LootStackProps {
  items: LootStackItem[];
  selectedId?: string;
  onItemSelect?: (id: string, item: LootStackItem) => void;
  renderItem?: GameUiCollectionRenderer<LootStackItem>;
  overflowLabel?: (count: number) => ReactNode;
  label?: string;
  limit?: number;
  className?: string;
  style?: CSSProperties;
}

function pluralizeItems(count: number) {
  return count === 1 ? "1 item" : `${count} items`;
}

export function LootStack({
  items,
  selectedId,
  onItemSelect,
  renderItem,
  overflowLabel,
  label = "Loot stack",
  limit = 4,
  className,
  style,
}: LootStackProps) {
  const visibleLimit = Math.max(0, Math.floor(limit));
  const visibleItems = items.slice(0, visibleLimit);
  const overflow = Math.max(0, items.length - visibleItems.length);
  const ariaLabel = `${label} ${pluralizeItems(items.length)}`;

  return (
    <div className={mergeClass(lootStackClass, className)} style={style}>
      <div className={lootStackToplineClass}>
        <span className={lootStackLabelClass}>{label}</span>
        <span className={lootStackLabelClass}>{pluralizeItems(items.length)}</span>
      </div>
      <ul className={lootStackListClass} aria-label={ariaLabel} data-overflow={overflow}>
        {visibleItems.map((item, index) => {
          const selected = selectedId === item.id;
          const defaultCard = (
            <LootCard
              name={item.name}
              rarity={item.rarity}
              quantity={item.quantity}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              selected={selected}
              onClick={onItemSelect ? () => onItemSelect(item.id, item) : undefined}
            />
          );
          const defaultNode = <li className={mergeClass(lootStackItemClass, item.className)}>{defaultCard}</li>;

          return (
            <React.Fragment key={item.id}>
              {renderItem ? renderItem(item, { index, selected, disabled: false }, defaultCard) : defaultNode}
            </React.Fragment>
          );
        })}
        {overflow > 0 ? (
          <li className={lootStackOverflowClass}>
            <span>{overflowLabel ? overflowLabel(overflow) : `+${overflow} more`}</span>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
